import type { ComponentType } from 'react'
import type { SectionLink } from '../helpers/renderFootnotes'
import { resolveLink } from '../data/linkRegistry'

interface LinkRef {
  id: string
  note?: string
}

export interface ContentPage {
  id: string
  title: string
  group?: string
  links?: SectionLink[]
  linkRefIds?: string[]
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

  const rawLinkRefs = fm.linkRefs as LinkRef[] | undefined
  const resolvedLinks = rawLinkRefs?.map(ref => resolveLink(ref.id, ref.note))
  const refIds = rawLinkRefs?.map(ref => ref.id)

  contentPages.set(id, {
    id,
    title: (fm.title as string) ?? id,
    group: fm.group as string | undefined,
    links: resolvedLinks,
    linkRefIds: refIds,
    usedFootnotes: fm.usedFootnotes as number[] | undefined,
    component: mod.default,
  })
}
