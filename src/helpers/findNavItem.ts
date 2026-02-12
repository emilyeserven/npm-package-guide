import { contentPages } from '../content/registry'

export function findNavItem(id: string): { id: string; title: string } | undefined {
  const page = contentPages.get(id)
  if (page) return { id: page.id, title: page.title }
  return undefined
}
