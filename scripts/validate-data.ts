/**
 * Build-time validation script for cross-reference integrity.
 *
 * Checks that glossary terms, guide sections, and link references
 * all point to valid targets. Run via: pnpm validate:data
 *
 * This script uses dynamic imports and fs discovery (not import.meta.glob)
 * because it runs in Node via tsx, not Vite.
 */

import fs from 'node:fs'
import path from 'node:path'
import type { RegistryLink } from '../src/data/linkRegistry/types.ts'
import type { GlossaryCategory } from '../src/data/glossaryTerms/types.ts'
import type { GuideDefinition } from '../src/data/guideTypes.ts'

// ── Build registries dynamically (no import.meta.glob in tsx) ────────

async function discoverArrayExports<T>(dir: string, suffix: string): Promise<T[]> {
  const files = fs.readdirSync(dir).filter(f => f.endsWith(suffix))
  const items: T[] = []
  for (const file of files) {
    const mod = await import(path.join(dir, file))
    for (const val of Object.values(mod)) {
      if (Array.isArray(val)) items.push(...(val as T[]))
    }
  }
  return items
}

// Build link registry
const linkDir = path.resolve(import.meta.dirname, '../src/data/linkRegistry')
const linkRegistry = await discoverArrayExports<RegistryLink>(linkDir, 'Links.ts')
const linkById = new Map<string, RegistryLink>(
  linkRegistry.map(link => [link.id, link])
)

// Build glossary
const glossaryDir = path.resolve(import.meta.dirname, '../src/data/glossaryTerms')
const glossaryTerms = await discoverArrayExports<GlossaryCategory>(glossaryDir, 'Terms.ts')

// Build guide registry — discover all *Data.ts and *Data/index.ts files
const dataDir = path.resolve(import.meta.dirname, '../src/data')
const guideDataFiles: string[] = []
for (const entry of fs.readdirSync(dataDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('Data.ts') && entry.name !== 'guideTypes.ts') {
    guideDataFiles.push(path.join(dataDir, entry.name))
  } else if (entry.isDirectory() && entry.name.endsWith('Data')) {
    const indexPath = path.join(dataDir, entry.name, 'index.ts')
    if (fs.existsSync(indexPath)) {
      guideDataFiles.push(indexPath)
    }
  }
}

// Discover guide manifests from data modules. Each guide data file exports a
// *_GUIDE_MANIFEST that bundles the full GuideDefinition and optional StartPageData.
// This mirrors the auto-discovery in guideRegistry.ts (which uses import.meta.glob).

import type { GuideManifest } from '../src/data/guideTypes.ts'

async function extractManifests(modPath: string): Promise<GuideDefinition[]> {
  const results: GuideDefinition[] = []
  try {
    const mod = await import(modPath)
    for (const [key, val] of Object.entries(mod)) {
      if (key.endsWith('_GUIDE_MANIFEST') && val && typeof val === 'object' && 'def' in (val as Record<string, unknown>)) {
        results.push((val as GuideManifest).def)
      }
    }
  } catch {
    // Skip — Vite build validates these
  }
  return results
}

const guides: GuideDefinition[] = []

for (const filePath of guideDataFiles) {
  let found = await extractManifests(filePath)

  // For directory-based data, also try navigation.ts directly
  if (found.length === 0) {
    const dir = path.dirname(filePath)
    const navPath = path.join(dir, 'navigation.ts')
    if (fs.existsSync(navPath)) {
      found = await extractManifests(navPath)
    }
  }

  guides.push(...found)
}

const registrySource = fs.readFileSync(
  path.resolve(dataDir, 'guideRegistry.ts'), 'utf-8'
)

// Checklist pages (hardcoded in guideRegistry.ts — parse from source)
const checklistMatch = registrySource.match(
  /export const checklistPages\s*=\s*\[([\s\S]*?)\]/
)
interface ChecklistPage { id: string; sourceGuideId: string }
const checklistPages: ChecklistPage[] = []
if (checklistMatch) {
  const entries = checklistMatch[1].matchAll(
    /id:\s*'([^']+)'.*?sourceGuideId:\s*'([^']+)'/g
  )
  for (const m of entries) {
    checklistPages.push({ id: m[1], sourceGuideId: m[2] })
  }
}

// Build page-to-guide lookup (simplified version of guideRegistry.ts)
const pageToGuide = new Map<string, string>()
for (const guide of guides) {
  for (const section of guide.sections) {
    for (const id of section.ids) {
      pageToGuide.set(id, guide.id)
    }
  }
}

function getGuideForPage(pageId: string): { id: string } | undefined {
  const guideId = pageToGuide.get(pageId)
  return guideId ? { id: guideId } : undefined
}

// ── Validation checks ───────────────────────────────────────────────

let errors = 0

function error(msg: string) {
  console.error(`  ERROR: ${msg}`)
  errors++
}

// ── 1. Link registry: check for duplicate IDs ──────────────────────

console.log('Checking link registry for duplicate IDs...')
const seenLinkIds = new Set<string>()
for (const link of linkRegistry) {
  if (seenLinkIds.has(link.id)) {
    error(`Duplicate link registry ID: "${link.id}"`)
  }
  seenLinkIds.add(link.id)
}

// ── 2. Build the set of all known page IDs ─────────────────────────

const allPageIds = new Set<string>()

// Start page IDs and all section page IDs from guides
for (const guide of guides) {
  allPageIds.add(guide.startPageId)
  for (const section of guide.sections) {
    for (const id of section.ids) {
      allPageIds.add(id)
    }
  }
}

// Static route IDs (not part of any guide's sections)
const staticPageIds = ['external-resources', 'glossary', 'architecture']
for (const id of staticPageIds) {
  allPageIds.add(id)
}

// ── 3. Glossary: validate linkId and sectionId references ──────────

const validGuideIds = new Set(guides.map(g => g.id))

console.log('Checking glossary term references...')
for (const category of glossaryTerms) {
  for (const term of category.terms) {
    if (!linkById.has(term.linkId)) {
      error(
        `Glossary term "${term.term}" (category: ${category.category}) ` +
        `has unknown linkId "${term.linkId}". Add it to src/data/linkRegistry.ts.`
      )
    }
    if (term.linkIds) {
      for (const id of term.linkIds) {
        if (!linkById.has(id)) {
          error(
            `Glossary term "${term.term}" (category: ${category.category}) ` +
            `has unknown linkIds entry "${id}". Add it to src/data/linkRegistry.ts.`
          )
        }
      }
    }
    if (term.sectionId && !allPageIds.has(term.sectionId)) {
      error(
        `Glossary term "${term.term}" (category: ${category.category}) ` +
        `has unknown sectionId "${term.sectionId}". Valid page IDs are listed in guide sections.`
      )
    }
    if (term.sectionIds) {
      for (const id of term.sectionIds) {
        if (!allPageIds.has(id)) {
          error(
            `Glossary term "${term.term}" (category: ${category.category}) ` +
            `has unknown sectionIds entry "${id}". Valid page IDs are listed in guide sections.`
          )
        }
      }
    }
    if (term.guides) {
      for (const guideId of term.guides) {
        if (!validGuideIds.has(guideId)) {
          error(
            `Glossary term "${term.term}" (category: ${category.category}) ` +
            `has unknown guide ID "${guideId}" in guides array. ` +
            `Valid guide IDs: ${[...validGuideIds].join(', ')}`
          )
        }
      }
      if (term.sectionId) {
        const derivedGuide = getGuideForPage(term.sectionId)
        if (derivedGuide && !term.guides.includes(derivedGuide.id)) {
          error(
            `Glossary term "${term.term}" (category: ${category.category}) ` +
            `has sectionId "${term.sectionId}" (guide: "${derivedGuide.id}") ` +
            `which is not included in its guides array. Add "${derivedGuide.id}" to the guides array.`
          )
        }
      }
      if (term.sectionIds) {
        for (const sid of term.sectionIds) {
          const derivedGuide = getGuideForPage(sid)
          if (derivedGuide && !term.guides.includes(derivedGuide.id)) {
            error(
              `Glossary term "${term.term}" (category: ${category.category}) ` +
              `has sectionIds entry "${sid}" (guide: "${derivedGuide.id}") ` +
              `which is not included in its guides array. Add "${derivedGuide.id}" to the guides array.`
            )
          }
        }
      }
    }
  }
}

// ── 3b. Link registry: validate guide tags ───────────────────────

console.log('Checking link registry guide tags...')
for (const link of linkRegistry) {
  if (!link.tags) continue
  for (const tag of link.tags) {
    if (tag.startsWith('guide:')) {
      const guideId = tag.slice(6)
      if (!validGuideIds.has(guideId)) {
        error(
          `Link "${link.id}" has unknown guide tag "${tag}". ` +
          `Valid guide IDs: ${[...validGuideIds].join(', ')}`
        )
      }
    }
  }
}

// ── 4. Guide sections: check for duplicate page IDs across guides ──

console.log('Checking guide sections for duplicate page IDs...')
const seenPageIds = new Map<string, string>() // pageId → guideId
for (const guide of guides) {
  for (const section of guide.sections) {
    for (const id of section.ids) {
      const existing = seenPageIds.get(id)
      if (existing) {
        error(
          `Page ID "${id}" appears in both guide "${existing}" and guide "${guide.id}".`
        )
      }
      seenPageIds.set(id, guide.id)
    }
  }
}

// ── 5. Guide startPageId must appear in its own sections ─────────

console.log('Checking guide startPageId references...')
for (const guide of guides) {
  const sectionIds = guide.sections.flatMap(s => s.ids)
  if (!sectionIds.includes(guide.startPageId)) {
    error(
      `Guide "${guide.id}" has startPageId "${guide.startPageId}" ` +
      `which is not listed in its sections. Add it to the guide's section definitions.`
    )
  }
}

// ── 6. MDX frontmatter: scan all MDX files ────────────────────────

console.log('Scanning MDX frontmatter...')

const contentDir = path.resolve(import.meta.dirname, '../src/content')

/** Decode YAML unicode escapes (\uXXXX) in quoted strings. */
function decodeYamlEscapes(s: string): string {
  return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCodePoint(parseInt(hex, 16))
  )
}

/** Extract YAML frontmatter fields from an MDX file's raw text. */
function parseFrontmatter(text: string): Record<string, string> {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const fields: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?$/)
    if (kv) fields[kv[1]] = decodeYamlEscapes(kv[2])
  }
  return fields
}

// Build lookup: guide ID → set of directory names that map to it
// Directory names match guide IDs exactly (e.g., src/content/auth/ → "auth")
const guideIdSet = new Set(guides.map(g => g.id))

// Known page IDs that live outside guide sections (checklists, static routes)
const nonGuidePageIds = new Set([
  ...checklistPages.map(cp => cp.id),
  ...staticPageIds,
])

// IDs exempt from the emoji-suffix rule (prompt-engineering mistake pages use severity badges)
const emojiExemptPrefixes = ['prompt-mistakes-']

const subdirs = fs.readdirSync(contentDir, { withFileTypes: true })
  .filter(d => d.isDirectory())

for (const subdir of subdirs) {
  const dirPath = path.join(contentDir, subdir.name)
  const mdxFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx'))

  for (const file of mdxFiles) {
    const filePath = path.join(dirPath, file)
    const text = fs.readFileSync(filePath, 'utf-8')
    const fm = parseFrontmatter(text)
    const relPath = `src/content/${subdir.name}/${file}`

    if (!fm.id) continue // already caught by registry.ts at runtime

    // 6a. Title emoji suffix check
    const isExempt = emojiExemptPrefixes.some(p => fm.id.startsWith(p))
    if (fm.title && !isExempt) {
      const hasEmoji = /[\u0080-\u{10FFFF}]+$/u.test(fm.title.trim())
      if (!hasEmoji) {
        error(
          `MDX title missing emoji suffix in ${relPath}: "${fm.title}". ` +
          `Every title must end with an emoji (see CLAUDE.md).`
        )
      }
    }

    // 6b. Orphaned page detection — page ID not in any guide section or known non-guide list
    if (!allPageIds.has(fm.id) && !nonGuidePageIds.has(fm.id)) {
      error(
        `Orphaned page "${fm.id}" in ${relPath} — not listed in any guide's sections ` +
        `or known static pages. Add it to the appropriate *_GUIDE_SECTIONS array.`
      )
    }

    // 6c. Guide-folder mismatch — frontmatter guide field should match directory
    if (fm.guide && guideIdSet.has(fm.guide) && fm.guide !== subdir.name) {
      error(
        `Guide-folder mismatch in ${relPath}: frontmatter says guide="${fm.guide}" ` +
        `but file is in "${subdir.name}/". Move the file or fix the guide field.`
      )
    }
  }
}

// ── 7. Guide data consistency ────────────────────────────────────────

console.log('Checking guide data consistency...')

// With auto-discovery, manifests *are* the data modules. Verify each
// discovered guide's startPageId appears in its own sections.
for (const guide of guides) {
  const sectionIds = guide.sections.flatMap(s => s.ids)
  if (!sectionIds.includes(guide.startPageId)) {
    error(
      `Guide "${guide.id}" manifest has startPageId "${guide.startPageId}" ` +
      `which is not listed in its sections. Fix the *_GUIDE_MANIFEST in the data file.`
    )
  }
}

// ── 8. MDX component sectionId cross-references ─────────────────────

console.log('Checking MDX component sectionId references...')

// Scan MDX files for sectionId props used in JSX-like component invocations
// e.g., <K8sYamlExplorer sectionId="containers" />
const sectionIdPattern = /sectionId=["']([^"']+)["']/g

for (const subdir of subdirs) {
  const dirPath = path.join(contentDir, subdir.name)
  const mdxFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx'))

  for (const file of mdxFiles) {
    const filePath = path.join(dirPath, file)
    const text = fs.readFileSync(filePath, 'utf-8')
    const relPath = `src/content/${subdir.name}/${file}`

    let match: RegExpExecArray | null
    while ((match = sectionIdPattern.exec(text)) !== null) {
      const sectionId = match[1]
      // sectionId props in wrapper components refer to data section IDs,
      // not page IDs. These are validated at the component level.
      // For now, just check they're not obviously broken (empty or whitespace-only).
      if (!sectionId.trim()) {
        error(
          `Empty sectionId prop in ${relPath}. Remove or provide a valid section ID.`
        )
      }
    }
  }
}

// ── 9. Link registry completeness ────────────────────────────────────

console.log('Checking link registry completeness...')

// Verify every guide has at least one link tagged with guide:<id>
for (const guide of guides) {
  const guideLinkCount = linkRegistry.filter(
    link => link.tags?.includes(`guide:${guide.id}`)
  ).length
  if (guideLinkCount === 0) {
    // Warn but don't fail — some guides may not need tagged links
    console.log(`  INFO: Guide "${guide.id}" has no links tagged with "guide:${guide.id}" in the link registry.`)
  }
}

// ── Results ────────────────────────────────────────────────────────

console.log('')
if (errors > 0) {
  console.error(`Validation failed with ${errors} error(s).`)
  process.exit(1)
} else {
  console.log('All data validations passed.')
}
