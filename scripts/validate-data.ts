/**
 * Build-time validation script for cross-reference integrity.
 *
 * Checks that glossary terms, guide sections, and link references
 * all point to valid targets. Run via: pnpm validate:data
 *
 * Uses fs-based discovery (not import.meta.glob) so it runs in Node.js via tsx.
 */

import fs from 'node:fs'
import path from 'node:path'

const dataDir = path.resolve(import.meta.dirname, '../src/data')

// ── Discovery helpers ─────────────────────────────────────────────────

async function discoverModules(dir: string, pattern: RegExp): Promise<Record<string, unknown>[]> {
  const files = fs.readdirSync(dir).filter(f => pattern.test(f) && f !== 'index.ts')
  return Promise.all(files.map(f => import(path.join(dir, f))))
}

// ── Discover link registry ──────────────────────────────────────────

interface RegistryLink {
  id: string; url: string; label: string; source: string
  desc?: string; tags?: string[]; resourceCategory?: string
}

const linkModules = await discoverModules(path.join(dataDir, 'linkRegistry'), /Links\.ts$/)
const linkRegistry: RegistryLink[] = linkModules.flatMap(
  mod => Object.values(mod as Record<string, RegistryLink[]>).flat()
)
const linkById = new Map(linkRegistry.map(l => [l.id, l]))

// ── Discover glossary terms ──────────────────────────────────────────

interface GlossaryTerm {
  term: string; definition: string; linkId: string
  linkIds?: string[]; sectionId?: string; sectionIds?: string[]; guides?: string[]
}
interface GlossaryCategory { category: string; terms: GlossaryTerm[] }

const glossaryModules = await discoverModules(path.join(dataDir, 'glossaryTerms'), /Terms\.ts$/)
const glossaryTerms: GlossaryCategory[] = glossaryModules.flatMap(
  mod => Object.values(mod as Record<string, GlossaryCategory[]>).flat()
)

// ── Discover guide definitions ───────────────────────────────────────

interface GuideSection { label: string | null; ids: string[] }
interface GuideDefinition {
  id: string; icon: string; title: string; startPageId: string
  description: string; sections: GuideSection[]; singlePage?: boolean; order?: number
}

const guideDataPaths = [
  ...fs.readdirSync(dataDir)
    .filter(f => f.endsWith('Data.ts'))
    .map(f => path.join(dataDir, f)),
  ...fs.readdirSync(dataDir)
    .filter(f => {
      const full = path.join(dataDir, f)
      return f.endsWith('Data') && fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, 'index.ts'))
    })
    .map(f => path.join(dataDir, f, 'index.ts')),
]

const guideModules = await Promise.all(guideDataPaths.map(f => import(f)))
const guides: GuideDefinition[] = guideModules
  .filter(mod => mod.guideDefinition)
  .map(mod => mod.guideDefinition as GuideDefinition)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

// ── Static data ──────────────────────────────────────────────────────

const checklistPages = [
  { id: 'checklist', sourceGuideId: 'npm-package' },
  { id: 'test-review-checklist', sourceGuideId: 'testing' },
  { id: 'prompt-claudemd-checklist', sourceGuideId: 'prompt-engineering' },
  { id: 'auth-checklist', sourceGuideId: 'auth' },
  { id: 'nja-checklist', sourceGuideId: 'nextjs-abstractions' },
  { id: 'arch-checklist', sourceGuideId: 'architecture' },
  { id: 'cicd-checklist', sourceGuideId: 'ci-cd' },
  { id: 'k8s-checklist', sourceGuideId: 'kubernetes' },
  { id: 'ai-checklist', sourceGuideId: 'ai-infra' },
]

// ── Derived lookups ──────────────────────────────────────────────────

const pageToGuide = new Map<string, string>()
for (const guide of guides) {
  for (const section of guide.sections) {
    for (const id of section.ids) {
      pageToGuide.set(id, guide.id)
    }
  }
}
pageToGuide.set('architecture', 'architecture')

function getGuideForPage(pageId: string): GuideDefinition | undefined {
  const guideId = pageToGuide.get(pageId)
  return guideId ? guides.find(g => g.id === guideId) : undefined
}

// ── Validation ───────────────────────────────────────────────────────

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
        const derivedGuide = getGuideForPage(term.sectionId)?.id
        if (derivedGuide && !term.guides.includes(derivedGuide)) {
          error(
            `Glossary term "${term.term}" (category: ${category.category}) ` +
            `has sectionId "${term.sectionId}" (guide: "${derivedGuide}") ` +
            `which is not included in its guides array. Add "${derivedGuide}" to the guides array.`
          )
        }
      }
      if (term.sectionIds) {
        for (const sid of term.sectionIds) {
          const derivedGuide = getGuideForPage(sid)?.id
          if (derivedGuide && !term.guides.includes(derivedGuide)) {
            error(
              `Glossary term "${term.term}" (category: ${category.category}) ` +
              `has sectionIds entry "${sid}" (guide: "${derivedGuide}") ` +
              `which is not included in its guides array. Add "${derivedGuide}" to the guides array.`
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

// ── Results ────────────────────────────────────────────────────────

console.log('')
if (errors > 0) {
  console.error(`Validation failed with ${errors} error(s).`)
  process.exit(1)
} else {
  console.log('All data validations passed.')
}
