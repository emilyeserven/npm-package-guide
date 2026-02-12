import { contentPages } from '../content/registry'
import { getNavOrderForPage } from './guideRegistry'

// Title overrides for non-MDX pages (component-rendered start pages, resource pages)
const staticTitles: Record<string, string> = {
  'roadmap': 'Start Here \u{1F680}',
  'checklist': 'Publish Checklist \u2705',
  'external-resources': 'External Resources \u{1F4DA}',
  'glossary': 'Glossary \u{1F4D6}',
  'architecture': 'Architecture Guide \u{1F3D7}\uFE0F',
  'arch-start': 'Start Here \u{1F3D7}\uFE0F',
  'test-start': 'Start Here \u{1F9EA}',
  'prompt-start': 'Start Here \u{1F9E0}',
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
