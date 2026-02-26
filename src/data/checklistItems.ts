import { cmd } from '../helpers/cmd'
import type { ChecklistBaseSection } from '../components/mdx/ChecklistBase'
import type { ChecklistManifest } from './guideTypes'

export interface ChecklistItem {
  text: string
  cat: string
  badge: string
}

export const checklistItems: ChecklistItem[] = [
  { text: "Ships ESM format (and optionally CJS for older Node.js)", cat: "Build", badge: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300" },
  { text: "Includes TypeScript declarations (.d.ts files)", cat: "Types", badge: "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300" },
  { text: 'package.json "exports" field properly configured', cat: "Config", badge: "bg-pink-100 text-pink-800 dark:bg-pink-500/15 dark:text-pink-300" },
  { text: '"files" field limits published content to dist/ only', cat: "Config", badge: "bg-pink-100 text-pink-800 dark:bg-pink-500/15 dark:text-pink-300" },
  { text: "Framework deps (React, etc.) are peerDependencies, not dependencies", cat: "Deps", badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300" },
  { text: "README with: install command, basic usage example, API reference", cat: "Docs", badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300" },
  { text: "CHANGELOG tracks what changed in each version", cat: "Docs", badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300" },
  { text: "Ran " + cmd("npm pack --dry-run", "pnpm pack --dry-run") + " to verify published contents", cat: "Pre-publish", badge: "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300" },
  { text: "All tests pass against the public API", cat: "Pre-publish", badge: "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300" },
  { text: "LICENSE file included (MIT is most common for open source)", cat: "Legal", badge: "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400" },
  { text: "Version bumped following semver rules", cat: "Pre-publish", badge: "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300" },
  { text: ".npmignore or 'files' field excludes tests, source, and config files", cat: "Config", badge: "bg-pink-100 text-pink-800 dark:bg-pink-500/15 dark:text-pink-300" }
]

// ── Transformed for ChecklistBase ────────────────────────────────────

const PUBLISH_ICONS: Record<string, string> = {
  Build: '\uD83D\uDD27',
  Types: '\uD83D\uDC8E',
  Config: '\u2699\uFE0F',
  Deps: '\uD83D\uDCE6',
  Docs: '\uD83D\uDCDD',
  'Pre-publish': '\uD83D\uDE80',
  Legal: '\uD83D\uDCDC',
}

function groupByCategory(items: ChecklistItem[]): ChecklistBaseSection[] {
  const categories = [...new Set(items.map(it => it.cat))]
  return categories.map(cat => ({
    id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: cat,
    icon: PUBLISH_ICONS[cat] ?? '\u2705',
    items: items.filter(it => it.cat === cat).map(it => ({ label: it.text })),
  }))
}

export const PUBLISH_CHECKLIST: ChecklistBaseSection[] = groupByCategory(checklistItems)

export const NPM_CHECKLIST_MANIFEST: ChecklistManifest = {
  id: 'publish',
  pageId: 'checklist',
  sourceGuideId: 'npm-package',
  title: 'Publish Checklist',
  sections: PUBLISH_CHECKLIST,
}
