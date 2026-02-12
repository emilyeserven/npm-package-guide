import type { ComponentType } from 'react'
import type { SectionLink } from '../helpers/renderFootnotes'

export interface ContentPage {
  id: string
  title: string
  guide?: string
  group?: string
  links?: SectionLink[]
  usedFootnotes?: number[]
  component: ComponentType
}

const mdxModules = import.meta.glob<{
  default: ComponentType
  frontmatter: Record<string, unknown>
}>(['./**/*.mdx'], { eager: true })

export const contentPages = new Map<string, ContentPage>()

for (const [, mod] of Object.entries(mdxModules)) {
  const fm = mod.frontmatter as Record<string, unknown>
  const id = fm.id as string
  if (!id) continue
  contentPages.set(id, {
    id,
    title: (fm.title as string) ?? id,
    guide: fm.guide as string | undefined,
    group: fm.group as string | undefined,
    links: fm.links as SectionLink[] | undefined,
    usedFootnotes: fm.usedFootnotes as number[] | undefined,
    component: mod.default,
  })
}
