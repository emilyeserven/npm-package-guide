import type { GuideSection, GuideDefinition, StartPageData } from './guideTypes'

export type { GuideSection, GuideDefinition, StartPageData }

// ── Auto-discover guide definitions from *Data.ts and *Data/index.ts ─

const dataModules = import.meta.glob<{
  guideDefinition?: GuideDefinition
  startPageData?: StartPageData
}>(['./*Data.ts', './*Data/index.ts'], { eager: true })

const discovered: GuideDefinition[] = []
const startPages: Record<string, StartPageData> = {}

for (const mod of Object.values(dataModules)) {
  if (mod.guideDefinition) {
    discovered.push(mod.guideDefinition)
    if (mod.startPageData) {
      startPages[mod.guideDefinition.id] = mod.startPageData
    }
  }
}

// Sort by order field (lower = first), then alphabetically as fallback
discovered.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

export const guides: GuideDefinition[] = discovered

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
}

// ── Checklists (extracted from individual guides) ───────────────────

export const checklistPages = [
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

export const checklistsNavDef: GuideDefinition = {
  id: 'checklists',
  icon: '\u2705',        // ✅
  title: 'Checklists',
  startPageId: 'checklist',
  description: 'Implementation checklists from all guides.',
  sections: [{ label: null, ids: checklistPages.map(p => p.id) }],
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
  return startPages[guideId]
}
