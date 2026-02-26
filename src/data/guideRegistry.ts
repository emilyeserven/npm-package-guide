import type { GuideSection, GuideDefinition, GuideManifest, StartPageData, ChecklistManifest } from './guideTypes'

export type { GuideSection, GuideDefinition, StartPageData }

// ── Auto-discover guide + checklist manifests ────────────────────────
//
// Each guide's data file exports a *_GUIDE_MANIFEST and optionally a
// *_CHECKLIST_MANIFEST. import.meta.glob discovers both — adding a new
// guide or checklist only requires exporting the manifest from the data
// file. No manual list needed.

type GuideDataModule = { [key: string]: GuideManifest | ChecklistManifest | unknown }

const dataModules = import.meta.glob<GuideDataModule>(
  ['./*Data.ts', './*Data/index.ts'],
  { eager: true },
)

/** Extract the first export whose key ends with the given suffix */
function findExport<T>(mod: GuideDataModule, suffix: string): T | undefined {
  for (const [key, val] of Object.entries(mod)) {
    if (key.endsWith(suffix)) return val as T
  }
  return undefined
}

// Collect all manifests from discovered data modules
const manifests: GuideManifest[] = []
const checklistManifests: ChecklistManifest[] = []

for (const mod of Object.values(dataModules)) {
  const manifest = findExport<GuideManifest>(mod, '_GUIDE_MANIFEST')
  if (manifest) manifests.push(manifest)
  const checklist = findExport<ChecklistManifest>(mod, '_CHECKLIST_MANIFEST')
  if (checklist) checklistManifests.push(checklist)
}

// ── Build the guides array ──────────────────────────────────────────

export const guides: GuideDefinition[] = manifests.map(m => m.def)

// Start page data lookup (populated from manifests)
const startPageByGuide = new Map<string, StartPageData>()
for (const m of manifests) {
  if (m.startPageData) startPageByGuide.set(m.def.id, m.startPageData)
}

// ── Single Page Guides (combined virtual nav) ───────────────────────

const singlePageGuides = guides.filter(g => g.singlePage)

export const singlePageNavDef: GuideDefinition = {
  id: 'single-page-guides',
  icon: '\u{1F4C4}',        // 📄
  title: 'Single Page Guides',
  startPageId: singlePageGuides[0]?.startPageId ?? '',
  description: 'Quick reference guides on focused topics.',
  sections: [{ label: null, ids: singlePageGuides.flatMap(g => g.sections.flatMap(s => s.ids)) }],
  singlePage: true,
  category: 'fundamentals',
  dateCreated: '2026-02-16',
  dateModified: '2026-02-26',
}

// ── Checklists (auto-discovered from *_CHECKLIST_MANIFEST exports) ──

export const checklistPages = checklistManifests
  .filter(m => m.pageId)
  .map(m => ({ id: m.pageId!, sourceGuideId: m.sourceGuideId }))

/** Checklist data lookup for GuideChecklist component */
export const checklistRegistry = new Map(
  checklistManifests.map(m => [m.id, { title: m.title, sections: m.sections }]),
)

export const checklistsNavDef: GuideDefinition = {
  id: 'checklists',
  icon: '\u2705',        // ✅
  title: 'Checklists',
  startPageId: 'checklist',
  description: 'Implementation checklists from all guides.',
  sections: [{ label: null, ids: checklistPages.map(p => p.id) }],
  category: 'fundamentals',
  dateCreated: '2026-02-16',
  dateModified: '2026-02-26',
}

// ── Derived lookups ─────────────────────────────────────────────────

const pageToGuide = new Map<string, string>()
for (const guide of guides) {
  for (const section of guide.sections) {
    for (const id of section.ids) {
      pageToGuide.set(id, guide.id)
    }
  }
}
// Legacy route: #/architecture renders ArchStartPage
pageToGuide.set('architecture', 'architecture')
// Checklist pages map to the checklists nav def for sidebar auto-sync
for (const cp of checklistPages) {
  pageToGuide.set(cp.id, 'checklists')
}
// Single-page guide pages map to the combined virtual nav
for (const g of singlePageGuides) {
  for (const section of g.sections) {
    for (const id of section.ids) {
      pageToGuide.set(id, 'single-page-guides')
    }
  }
}

export function getGuideForPage(pageId: string): GuideDefinition | undefined {
  const guideId = pageToGuide.get(pageId)
  if (guideId === 'checklists') return checklistsNavDef
  if (guideId === 'single-page-guides') return singlePageNavDef
  return guideId ? guides.find(g => g.id === guideId) : undefined
}

export function getNavOrderForPage(pageId: string): string[] {
  const guide = getGuideForPage(pageId)
  if (!guide) return []
  return guide.sections.flatMap(s => s.ids)
}

// ── Start page data lookup ───────────────────────────────────────────

export function getStartPageData(guideId: string): StartPageData | undefined {
  return startPageByGuide.get(guideId)
}
