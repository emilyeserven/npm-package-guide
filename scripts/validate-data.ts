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

import type { GuideManifest, ChecklistManifest } from '../src/data/guideTypes.ts'

interface ExtractedData {
  guides: GuideDefinition[]
  checklists: ChecklistPage[]
  hasChecklistManifest: boolean
  orphanedChecklistExports: string[]  // export names that look like checklist data but have no manifest
}

/** Check if a value looks like a ChecklistBaseSection[] */
function looksLikeChecklistArray(val: unknown): boolean {
  if (!Array.isArray(val) || val.length === 0) return false
  const first = val[0] as Record<string, unknown>
  return typeof first === 'object' && first !== null &&
    'id' in first && 'name' in first && 'icon' in first && 'items' in first
}

async function extractManifests(modPath: string): Promise<ExtractedData> {
  const result: ExtractedData = { guides: [], checklists: [], hasChecklistManifest: false, orphanedChecklistExports: [] }
  try {
    const mod = await import(modPath)
    const checklistArrayExports: string[] = []
    for (const [key, val] of Object.entries(mod)) {
      if (key.endsWith('_GUIDE_MANIFEST') && val && typeof val === 'object' && 'def' in (val as Record<string, unknown>)) {
        result.guides.push((val as GuideManifest).def)
      }
      if (key.endsWith('_CHECKLIST_MANIFEST') && val && typeof val === 'object' && 'id' in (val as Record<string, unknown>)) {
        result.hasChecklistManifest = true
        const m = val as ChecklistManifest
        if (m.pageId) {
          result.checklists.push({ id: m.pageId, sourceGuideId: m.sourceGuideId })
        }
      }
      // Track exports that look like ChecklistBaseSection[] (name contains CHECKLIST)
      if (/CHECKLIST/i.test(key) && !key.endsWith('_MANIFEST') && looksLikeChecklistArray(val)) {
        checklistArrayExports.push(key)
      }
    }
    // If we found checklist-like arrays but no manifest, they're orphaned
    if (checklistArrayExports.length > 0 && !result.hasChecklistManifest) {
      result.orphanedChecklistExports = checklistArrayExports
    }
  } catch (err) {
    console.warn(`  WARN: Failed to import ${path.basename(modPath)}: ${err instanceof Error ? err.message : err}`)
  }
  return result
}

const guides: GuideDefinition[] = []
interface ChecklistPage { id: string; sourceGuideId: string }
const checklistPages: ChecklistPage[] = []
const orphanedChecklists: { file: string; exports: string[] }[] = []

for (const filePath of guideDataFiles) {
  let found = await extractManifests(filePath)

  // For directory-based data, also try navigation.ts directly
  if (found.guides.length === 0) {
    const dir = path.dirname(filePath)
    const navPath = path.join(dir, 'navigation.ts')
    if (fs.existsSync(navPath)) {
      const navFound = await extractManifests(navPath)
      found = {
        guides: navFound.guides,
        checklists: [...found.checklists, ...navFound.checklists],
        hasChecklistManifest: found.hasChecklistManifest || navFound.hasChecklistManifest,
        orphanedChecklistExports: found.hasChecklistManifest || navFound.hasChecklistManifest
          ? [] : [...found.orphanedChecklistExports, ...navFound.orphanedChecklistExports],
      }
    }
  }

  guides.push(...found.guides)
  checklistPages.push(...found.checklists)
  if (found.orphanedChecklistExports.length > 0) {
    orphanedChecklists.push({ file: path.relative(process.cwd(), filePath), exports: found.orphanedChecklistExports })
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

// ── Helpers: fuzzy matching for actionable error hints ────────────────

/** Simple Levenshtein distance for short strings. */
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length
  const d: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
  return d[m][n]
}

/** Return up to `max` closest matches from `candidates` for `target`. */
function suggestSimilar(target: string, candidates: Iterable<string>, max = 3): string[] {
  const scored: [string, number][] = []
  for (const c of candidates) {
    // Prefer prefix matches, then Levenshtein distance
    const dist = c.startsWith(target.slice(0, 4)) ? levenshtein(target, c) - 1 : levenshtein(target, c)
    if (dist <= Math.max(target.length * 0.6, 4)) scored.push([c, dist])
  }
  return scored.sort((a, b) => a[1] - b[1]).slice(0, max).map(([s]) => s)
}

// ── Validation checks ───────────────────────────────────────────────

let errors = 0
let warnings = 0

function error(msg: string) {
  console.error(`  ERROR: ${msg}`)
  errors++
}

function warn(msg: string) {
  console.warn(`  WARN: ${msg}`)
  warnings++
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
      const similar = suggestSimilar(term.linkId, linkById.keys())
      error(
        `Glossary term "${term.term}" (category: ${category.category}) ` +
        `has unknown linkId "${term.linkId}".` +
        (similar.length > 0 ? ` Did you mean: ${similar.join(', ')}?` : '') +
        ` Add it to src/data/linkRegistry/.`
      )
    }
    if (term.linkIds) {
      for (const id of term.linkIds) {
        if (!linkById.has(id)) {
          const similar = suggestSimilar(id, linkById.keys())
          error(
            `Glossary term "${term.term}" (category: ${category.category}) ` +
            `has unknown linkIds entry "${id}".` +
            (similar.length > 0 ? ` Did you mean: ${similar.join(', ')}?` : '') +
            ` Add it to src/data/linkRegistry/.`
          )
        }
      }
    }
    if (term.sectionId && !allPageIds.has(term.sectionId)) {
      const similar = suggestSimilar(term.sectionId, allPageIds)
      error(
        `Glossary term "${term.term}" (category: ${category.category}) ` +
        `has unknown sectionId "${term.sectionId}".` +
        (similar.length > 0 ? ` Did you mean: ${similar.join(', ')}?` : '') +
        ` Valid page IDs are listed in guide sections.`
      )
    }
    if (term.sectionIds) {
      for (const id of term.sectionIds) {
        if (!allPageIds.has(id)) {
          const similar = suggestSimilar(id, allPageIds)
          error(
            `Glossary term "${term.term}" (category: ${category.category}) ` +
            `has unknown sectionIds entry "${id}".` +
            (similar.length > 0 ? ` Did you mean: ${similar.join(', ')}?` : '') +
            ` Valid page IDs are listed in guide sections.`
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
      // Suggest the likely guide based on the directory name
      const likelyGuide = guides.find(g => g.id === subdir.name)
      const guideHint = likelyGuide
        ? ` This file is in the "${subdir.name}/" directory — add "${fm.id}" to the *_GUIDE_SECTIONS array in the "${subdir.name}" guide data file.`
        : ''
      error(
        `Orphaned page "${fm.id}" in ${relPath} — not listed in any guide's sections ` +
        `or known static pages.${guideHint}`
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

// Checklist data without a manifest (orphaned — won't be auto-discovered)
for (const orphan of orphanedChecklists) {
  for (const exp of orphan.exports) {
    error(
      `${orphan.file} exports "${exp}" (ChecklistBaseSection[]) but no *_CHECKLIST_MANIFEST. ` +
      `Add a manifest or the checklist won't be discoverable.`
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

// ── 10. Component barrel export validation ────────────────────────────

console.log('Checking component barrel exports...')

const mdxDir = path.resolve(import.meta.dirname, '../src/components/mdx')
const mdxSubdirs = fs.readdirSync(mdxDir, { withFileTypes: true })
  .filter(d => d.isDirectory())

for (const dir of mdxSubdirs) {
  const dirPath = path.join(mdxDir, dir.name)
  const barrelPath = path.join(dirPath, 'index.ts')

  // Get all .tsx files in this directory
  const tsxFiles = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'))

  if (tsxFiles.length === 0) continue

  if (!fs.existsSync(barrelPath)) {
    error(
      `Guide component directory "src/components/mdx/${dir.name}/" has ${tsxFiles.length} ` +
      `.tsx file(s) but no index.ts barrel file. Create one that re-exports all components.`
    )
    continue
  }

  // Check that each .tsx file is mentioned in the barrel
  const barrelContent = fs.readFileSync(barrelPath, 'utf-8')
  for (const file of tsxFiles) {
    const baseName = file.replace('.tsx', '')
    // Check for export { X } from './X' or export { default as X } from './X' patterns
    if (!barrelContent.includes(`./${baseName}`) && !barrelContent.includes(`'./${baseName}'`) && !barrelContent.includes(`"./${baseName}"`)) {
      warn(
        `Component "src/components/mdx/${dir.name}/${file}" may not be exported from ` +
        `its barrel file (index.ts). Add: export { ${baseName} } from './${baseName}'`
      )
    }
  }
}

// ── 11. dateModified staleness detection (git-aware) ──────────────────

// Only check if git is available and we're in a git repo
import { execSync } from 'node:child_process'

function getGitChangedFiles(): string[] {
  try {
    // Compare against the default branch (main/master) to detect all changed files
    const defaultBranch = (() => {
      try {
        return execSync('git rev-parse --verify main 2>/dev/null', { encoding: 'utf-8' }).trim() ? 'main' : 'master'
      } catch {
        try {
          execSync('git rev-parse --verify master 2>/dev/null', { encoding: 'utf-8' })
          return 'master'
        } catch { return null }
      }
    })()

    if (!defaultBranch) return []

    // Get files changed vs default branch (staged + unstaged + untracked)
    const diffOutput = execSync(
      `git diff --name-only ${defaultBranch} 2>/dev/null || git diff --name-only HEAD 2>/dev/null`,
      { encoding: 'utf-8' }
    ).trim()
    const untrackedOutput = execSync(
      'git ls-files --others --exclude-standard 2>/dev/null',
      { encoding: 'utf-8' }
    ).trim()

    return [...diffOutput.split('\n'), ...untrackedOutput.split('\n')].filter(Boolean)
  } catch {
    return []
  }
}

console.log('Checking dateModified staleness...')

const changedFiles = getGitChangedFiles()
if (changedFiles.length > 0) {
  // Map changed files to guide IDs
  const guidesWithChanges = new Set<string>()
  for (const file of changedFiles) {
    // Match content files: src/content/<guide-id>/
    const contentMatch = file.match(/^src\/content\/([^/]+)\//)
    if (contentMatch && guideIdSet.has(contentMatch[1])) {
      // Ignore CLAUDE.md changes — those don't warrant dateModified updates
      if (!file.endsWith('CLAUDE.md')) {
        guidesWithChanges.add(contentMatch[1])
      }
    }
    // Match component files: src/components/mdx/<guide-id>/
    const compMatch = file.match(/^src\/components\/mdx\/([^/]+)\//)
    if (compMatch && guideIdSet.has(compMatch[1])) {
      guidesWithChanges.add(compMatch[1])
    }
    // Match data files: src/data/<camelId>Data (file or directory)
    const dataMatch = file.match(/^src\/data\/([^/]+)Data/)
    if (dataMatch) {
      // camelCase data filename → try to find matching guide
      for (const guide of guides) {
        if (file.includes(`${guide.id}`) || file.toLowerCase().includes(guide.id.replace(/-/g, ''))) {
          guidesWithChanges.add(guide.id)
        }
      }
    }
  }

  // Check if dateModified was also updated for guides with substantive changes
  const today = new Date().toISOString().slice(0, 10)
  for (const guideId of guidesWithChanges) {
    const guide = guides.find(g => g.id === guideId)
    if (!guide) continue

    // Check if dateModified is current (within reason — same day)
    const isDataFileChanged = changedFiles.some(f =>
      f.match(/^src\/data\//) && (f.includes(guideId) || f.toLowerCase().includes(guideId.replace(/-/g, '')))
    )

    // If the data file itself was changed, the developer likely already updated dateModified
    if (isDataFileChanged) continue

    if (guide.dateModified !== today) {
      warn(
        `Guide "${guideId}" has changed files but dateModified is "${guide.dateModified}" (today: ${today}). ` +
        `Update dateModified in its *_GUIDE_MANIFEST if these are substantive changes.`
      )
    }
  }
} else {
  console.log('  (no git changes detected — skipping staleness check)')
}

// ── Results ────────────────────────────────────────────────────────

console.log('')
if (errors > 0) {
  console.error(`Validation failed with ${errors} error(s)${warnings > 0 ? ` and ${warnings} warning(s)` : ''}.`)
  process.exit(1)
} else if (warnings > 0) {
  console.log(`All data validations passed with ${warnings} warning(s).`)
} else {
  console.log('All data validations passed.')
}
