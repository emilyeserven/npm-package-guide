#!/usr/bin/env tsx
/**
 * Scaffold a new guide — creates stub files and updates all registries.
 *
 * Automates the boilerplate steps of guide creation so that the /add-guide
 * skill can focus on content rather than file wiring.
 *
 * Usage:
 *   pnpm scaffold-guide --id <guide-id> --title <title> --icon <emoji> \
 *     --desc <description> --prefix <PREFIX> --camel <camelName> --start <startPageId> \
 *     [--category <category>] [--single-page] \
 *     [--pages "Group:page-id:Title Emoji,Group:page-id2:Title2 Emoji2,..."] \
 *     [--check-links "link-id-1,link-id-2,..."]
 *
 * Example:
 *   pnpm scaffold-guide --id dns-deep-dive --title "DNS Deep Dive" --icon "🌐" \
 *     --desc "Everything about DNS for frontend engineers." \
 *     --prefix DNS --camel dnsDeepDive --start dns-start \
 *     --category infrastructure \
 *     --pages "Basics:dns-records:DNS Records 📋,Basics:dns-resolution:Resolution Flow 🔄,Advanced:dns-security:DNSSEC 🔒" \
 *     --check-links "mdn-dns,cloudflare-dns-guide"
 *
 * Options:
 *   --pages        Comma-separated page specs in "Group:pageId:Title Emoji" format.
 *                  Creates MDX stubs and populates *_GUIDE_SECTIONS automatically.
 *                  Pages are grouped by the Group label in the sections array.
 *   --check-links  Comma-separated link IDs to check against the existing registry.
 *                  Warns about IDs that already exist so you can reuse them instead
 *                  of creating duplicates.
 *
 * Created files:
 *   src/data/<camel>Data.ts                — Guide sections, start page data, and GUIDE_MANIFEST
 *   src/content/<guide-id>/<start>.mdx     — Start page MDX
 *   src/content/<guide-id>/<page-id>.mdx   — Additional page MDX stubs (if --pages)
 *   src/content/<guide-id>/CLAUDE.md       — Guide-specific documentation
 *   src/data/linkRegistry/<camel>Links.ts  — Link registry stub
 *   src/data/glossaryTerms/<camel>Terms.ts — Glossary terms stub
 *
 * Auto-discovered (no manual registration needed):
 *   guideRegistry.ts discovers *_GUIDE_MANIFEST via import.meta.glob
 *   linkRegistry/index.ts discovers *Links.ts via import.meta.glob
 *   glossaryTerms/index.ts discovers *Terms.ts via import.meta.glob
 *   mdx/index.ts discovers guide component barrels via import.meta.glob
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

// ── Parse CLI args ──────────────────────────────────────────────────

function parseArgs(): Record<string, string | boolean> {
  const args: Record<string, string | boolean> = {}
  const argv = process.argv.slice(2)
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2)
      if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) {
        args[key] = argv[++i]
      } else {
        args[key] = true
      }
    }
  }
  return args
}

const args = parseArgs()

const guideId = args.id as string
const title = args.title as string
const icon = args.icon as string
const desc = args.desc as string
const prefix = (args.prefix as string)?.toUpperCase()
const camel = args.camel as string
const startPageId = args.start as string
const singlePage = args['single-page'] === true
const pagesArg = args.pages as string | undefined
const checkLinksArg = args['check-links'] as string | undefined
const categoryArg = args.category as string | undefined

const VALID_CATEGORIES = ['frontend', 'infrastructure', 'security', 'ai-tooling', 'fundamentals'] as const
type GuideCategory = typeof VALID_CATEGORIES[number]

const category: GuideCategory = ((): GuideCategory => {
  if (!categoryArg) return 'fundamentals'
  if (!VALID_CATEGORIES.includes(categoryArg as GuideCategory)) {
    console.error(`Invalid --category "${categoryArg}". Valid values: ${VALID_CATEGORIES.join(', ')}`)
    process.exit(1)
  }
  return categoryArg as GuideCategory
})()

const required = { id: guideId, title, icon, desc, prefix, camel, start: startPageId }
const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k)
if (missing.length > 0) {
  console.error(`Missing required arguments: ${missing.map(k => `--${k}`).join(', ')}`)
  console.error(
    '\nUsage: pnpm scaffold-guide --id <id> --title <title> --icon <emoji> \\\n' +
    '  --desc <description> --prefix <PREFIX> --camel <camel> --start <startId> \\\n' +
    '  [--category <category>] [--single-page] [--pages "Group:pageId:Title Emoji,..."] \\\n' +
    '  [--check-links "link-id-1,link-id-2,..."]'
  )
  process.exit(1)
}

// ── Parse --pages specs ──────────────────────────────────────────────

interface PageSpec {
  group: string
  pageId: string
  title: string
}

const pageSpecs: PageSpec[] = []
if (pagesArg) {
  for (const entry of pagesArg.split(',')) {
    const parts = entry.trim().split(':')
    if (parts.length < 3) {
      console.error(`Invalid --pages entry: "${entry}". Expected "Group:pageId:Title Emoji".`)
      process.exit(1)
    }
    const [group, pageId, ...titleParts] = parts
    pageSpecs.push({ group, pageId, title: titleParts.join(':') })
  }
}

// ── Derived names ───────────────────────────────────────────────────

const dataFileName = `${camel}Data`
const linksVarName = `${camel}Links`
const glossaryVarName = `${camel}Glossary`

// ── Helpers ─────────────────────────────────────────────────────────

function resolve(...parts: string[]): string {
  return path.join(ROOT, ...parts)
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

let created = 0
let skipped = 0

function writeNew(filePath: string, content: string) {
  const rel = path.relative(ROOT, filePath)
  if (fs.existsSync(filePath)) {
    console.warn(`  SKIP (exists): ${rel}`)
    skipped++
    return
  }
  fs.writeFileSync(filePath, content)
  console.log(`  CREATE: ${rel}`)
  created++
}


// ── Pre-flight checks ───────────────────────────────────────────────

// Check if data file already exists (indicates guide is already set up)
const dataFilePath = resolve(`src/data/${dataFileName}.ts`)
if (fs.existsSync(dataFilePath)) {
  console.error(`\nData file src/data/${dataFileName}.ts already exists. Guide "${guideId}" may already be scaffolded. Aborting.`)
  process.exit(1)
}

// Check for duplicate link IDs against existing registry
if (checkLinksArg) {
  const idsToCheck = checkLinksArg.split(',').map(s => s.trim()).filter(Boolean)
  if (idsToCheck.length > 0) {
    // Collect all existing link IDs by scanning linkRegistry files
    const linkRegistryDir = resolve('src/data/linkRegistry')
    const existingIds = new Set<string>()
    const linkFiles = fs.readdirSync(linkRegistryDir).filter(f => f.endsWith('.ts') && f !== 'index.ts')
    for (const file of linkFiles) {
      const content = fs.readFileSync(path.join(linkRegistryDir, file), 'utf-8')
      const idMatches = content.matchAll(/id:\s*['"]([^'"]+)['"]/g)
      for (const m of idMatches) existingIds.add(m[1])
    }

    const duplicates = idsToCheck.filter(id => existingIds.has(id))
    if (duplicates.length > 0) {
      console.warn(`\n--- Link ID pre-check ---`)
      console.warn(`  The following link IDs already exist in the registry:`)
      for (const id of duplicates) {
        // Find which file contains it
        for (const file of linkFiles) {
          const content = fs.readFileSync(path.join(linkRegistryDir, file), 'utf-8')
          if (content.includes(`"${id}"`) || content.includes(`'${id}'`)) {
            console.warn(`    "${id}" — found in ${file}`)
            break
          }
        }
      }
      console.warn(`  Reuse these instead of creating duplicates. Add 'guide:${guideId}' to their tags.\n`)
    }

    const newIds = idsToCheck.filter(id => !existingIds.has(id))
    if (newIds.length > 0) {
      console.log(`\n--- Link ID pre-check ---`)
      console.log(`  ${newIds.length} new link ID(s) are safe to create: ${newIds.join(', ')}`)
    }
  }
}

// ── 1. Create data file ─────────────────────────────────────────────

console.log('\n--- Creating new files ---')

ensureDir(resolve('src/data'))

// Build sections array from --pages (or leave as stub)
function buildSectionsLiteral(): string {
  if (pageSpecs.length === 0) {
    return singlePage
      ? `  { label: null, ids: ['${startPageId}'] },\n`
      : `  { label: null, ids: ['${startPageId}'] },\n  // Add sections: { label: 'Section Name', ids: ['page-id-1', 'page-id-2'] },\n`
  }

  // Group pages by their group label, preserving order
  const groups: { label: string; ids: string[] }[] = []
  for (const spec of pageSpecs) {
    const existing = groups.find(g => g.label === spec.group)
    if (existing) {
      existing.ids.push(spec.pageId)
    } else {
      groups.push({ label: spec.group, ids: [spec.pageId] })
    }
  }

  let out = `  { label: null, ids: ['${startPageId}'] },\n`
  for (const g of groups) {
    out += `  { label: '${g.label.replace(/'/g, "\\'")}', ids: [${g.ids.map(id => `'${id}'`).join(', ')}] },\n`
  }
  return out
}

const sectionsLiteral = buildSectionsLiteral()

const dataContent = singlePage
  ? `import type { GuideSection, GuideManifest } from './guideTypes'

export const ${prefix}_GUIDE_SECTIONS: GuideSection[] = [
${sectionsLiteral}]

export const ${prefix}_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: '${guideId}',
    icon: '${icon}',
    title: '${title.replace(/'/g, "\\'")}',
    startPageId: '${startPageId}',
    description: '${desc.replace(/'/g, "\\'")}',
    category: '${category}',
    dateCreated: '${new Date().toISOString().slice(0, 10)}',
    dateModified: '${new Date().toISOString().slice(0, 10)}',
    singlePage: true,
    sections: ${prefix}_GUIDE_SECTIONS,
  },
}
`
  : `import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

export const ${prefix}_GUIDE_SECTIONS: GuideSection[] = [
${sectionsLiteral}]

export const ${prefix}_START_PAGE_DATA: StartPageData = {
  subtitle: '${desc.replace(/'/g, "\\'")}',
  tip: 'TBD — describe the target audience.',
  steps: [],
}

export const ${prefix}_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: '${guideId}',
    icon: '${icon}',
    title: '${title.replace(/'/g, "\\'")}',
    startPageId: '${startPageId}',
    description: '${desc.replace(/'/g, "\\'")}',
    category: '${category}',
    dateCreated: '${new Date().toISOString().slice(0, 10)}',
    dateModified: '${new Date().toISOString().slice(0, 10)}',
    sections: ${prefix}_GUIDE_SECTIONS,
  },
  startPageData: ${prefix}_START_PAGE_DATA,
}
`

writeNew(resolve(`src/data/${dataFileName}.ts`), dataContent)

// ── 2. Create content directory + start page MDX ────────────────────

const contentDir = resolve(`src/content/${guideId}`)
ensureDir(contentDir)

const startMdx = singlePage
  ? `---
id: "${startPageId}"
title: "${title} ${icon}"
guide: "${guideId}"
---

<SectionTitle>{frontmatter.title}</SectionTitle>

<Toc>
  <TocLink id="toc-overview">Overview</TocLink>
</Toc>

<SectionIntro>
TBD — add content here.
</SectionIntro>

<SectionSubheading id="toc-overview">Overview</SectionSubheading>

<SectionList>
<ColItem>TBD</ColItem>
</SectionList>
`
  : `---
id: "${startPageId}"
title: "Start Here 🔹"
guide: "${guideId}"
---

<GuideStartContent guideId="${guideId}" />
`

writeNew(path.join(contentDir, `${startPageId}.mdx`), startMdx)

// 2b. Create additional page MDX stubs from --pages
for (const spec of pageSpecs) {
  const pageMdx = `---
id: "${spec.pageId}"
title: "${spec.title}"
guide: "${guideId}"
group: "${spec.group}"
---

<SectionTitle>{frontmatter.title}</SectionTitle>

<Toc>
  <TocLink id="toc-overview">Overview</TocLink>
</Toc>

<SectionIntro>
TBD — add content here.
</SectionIntro>

<SectionSubheading id="toc-overview">Overview</SectionSubheading>
`
  writeNew(path.join(contentDir, `${spec.pageId}.mdx`), pageMdx)
}

// ── 3. Create guide CLAUDE.md ───────────────────────────────────────

const claudeMdContent = `# ${title} — Guide CLAUDE.md

## Audience & Purpose

TBD — describe the target audience and what this guide teaches.

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| *(none yet)* | | |

## Guide-Specific Conventions

TBD — add guide-specific patterns and data conventions.
`

writeNew(path.join(contentDir, 'CLAUDE.md'), claudeMdContent)

// ── 4. Create link registry file ────────────────────────────────────

const linksContent = `import type { RegistryLink } from './index'

export const ${linksVarName}: RegistryLink[] = [
  // ID convention: {source}-{topic-slug}
  // Include tags: ['guide:${guideId}'] and resourceCategory for External Resources visibility.
]
`

writeNew(resolve(`src/data/linkRegistry/${camel}Links.ts`), linksContent)

// ── 5. Create glossary terms file ───────────────────────────────────

const glossaryContent = `import type { GlossaryCategory } from './index'

export const ${glossaryVarName}: GlossaryCategory[] = [
  // Each entry: { category: 'Name', terms: [{ term, definition, linkId, sectionId?, guides? }] }
]
`

writeNew(resolve(`src/data/glossaryTerms/${camel}Terms.ts`), glossaryContent)

// ── All registries auto-discover via import.meta.glob ───────────────
//
// No manual registration needed:
//   guideRegistry.ts discovers *_GUIDE_MANIFEST
//   linkRegistry/index.ts discovers *Links.ts
//   glossaryTerms/index.ts discovers *Terms.ts

// ── Summary ─────────────────────────────────────────────────────────

console.log(`\n--- Summary ---`)
console.log(`  Created: ${created} files`)
if (skipped > 0) console.log(`  Skipped: ${skipped} (already exist)`)

console.log(`\n--- Next steps ---`)
if (pageSpecs.length > 0) {
  console.log(`  1. Fill in start page data in src/data/${dataFileName}.ts (steps array)`)
  console.log(`  2. Fill in TBD content in ${pageSpecs.length} page stubs in src/content/${guideId}/`)
} else {
  console.log(`  1. Fill in TBD content in src/data/${dataFileName}.ts (sections, start page data)`)
  console.log(`  2. Create MDX content pages in src/content/${guideId}/`)
}
console.log(`  3. Add links to src/data/linkRegistry/${camel}Links.ts`)
console.log(`  4. Add glossary terms to src/data/glossaryTerms/${camel}Terms.ts`)
if (!singlePage) {
  console.log(`  5. Add interactive components to src/components/mdx/${guideId}/ with a barrel index.ts`)
  console.log(`     (auto-discovered — no need to modify src/components/mdx/index.ts)`)
}
console.log(`  6. Run: pnpm validate`)

