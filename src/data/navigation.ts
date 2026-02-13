import { contentPages } from '../content/registry'
import { getNavOrderForPage } from './guideRegistry'

export const STORYBOOK_URL = 'https://emilyserven.net/npm-package-guide/storybook'

// Titles for non-MDX pages that can't be derived from the content registry.
const staticTitles: Record<string, string> = {
  'external-resources': 'External Resources \u{1F4DA}',
  'glossary': 'Glossary \u{1F4D6}',
  'architecture': 'Architecture Guide \u{1F3D7}\uFE0F',  // Legacy route
}

export function getNavOrder(currentId?: string): string[] {
  if (!currentId) return getNavOrderForPage('roadmap')
  return getNavOrderForPage(currentId)
}

export function getNavTitle(id: string): string {
  if (staticTitles[id]) return staticTitles[id]
  const page = contentPages.get(id)
  if (page) return page.title
  return id
}
