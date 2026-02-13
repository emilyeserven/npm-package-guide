import { contentPages } from '../content/registry'
import { guides, getNavOrderForPage } from './guideRegistry'

// Titles for non-MDX pages that can't be derived from the guide registry.
// Start page titles for new guides are auto-derived below — only add entries
// here for pages that DON'T follow the "Start Here {icon}" convention.
const staticTitles: Record<string, string> = {
  'roadmap': 'Start Here \u{1F680}',
  'checklist': 'Publish Checklist \u2705',
  'external-resources': 'External Resources \u{1F4DA}',
  'glossary': 'Glossary \u{1F4D6}',
  'architecture': 'Architecture Guide \u{1F3D7}\uFE0F',
}

// Derive start page titles from guide registry (convention: "Start Here" + guide icon).
// Guides whose startPageId already has a staticTitles entry keep their override.
const startPageTitles = new Map<string, string>()
for (const guide of guides) {
  if (!staticTitles[guide.startPageId]) {
    startPageTitles.set(guide.startPageId, `Start Here ${guide.icon}`)
  }
}

export function getNavOrder(currentId?: string): string[] {
  if (!currentId) return getNavOrderForPage('roadmap')
  return getNavOrderForPage(currentId)
}

export function getNavTitle(id: string): string {
  if (staticTitles[id]) return staticTitles[id]
  const derived = startPageTitles.get(id)
  if (derived) return derived
  const page = contentPages.get(id)
  if (page) return page.title
  return id
}
