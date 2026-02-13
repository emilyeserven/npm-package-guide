import type { ComponentType } from 'react'
import type { SectionLink } from '../helpers/renderFootnotes'
import { resolveLink } from '../data/linkRegistry'
import { guides } from '../data/guideRegistry'

interface LinkRef {
  id: string
  note?: string
}

export interface ContentPage {
  id: string
  title: string
  guide?: string
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

const validGuideIds = new Set(guides.map(g => g.id))

export const contentPages = new Map<string, ContentPage>()

for (const [filePath, mod] of Object.entries(mdxModules)) {
  const fm = mod.frontmatter as Record<string, unknown>
  const id = fm.id as string

  if (!id) {
    console.warn(`[content/registry] MDX file missing required "id" field: ${filePath}`)
    continue
  }

  if (contentPages.has(id)) {
    throw new Error(
      `[content/registry] Duplicate page ID "${id}" found in ${filePath}. ` +
      `Each MDX file must have a unique "id" in its frontmatter.`
    )
  }

  if (!fm.title) {
    console.warn(`[content/registry] MDX page "${id}" (${filePath}) missing "title" — using id as fallback.`)
  }

  const guide = fm.guide as string | undefined
  if (guide && !validGuideIds.has(guide)) {
    console.warn(
      `[content/registry] MDX page "${id}" (${filePath}) has unknown guide "${guide}". ` +
      `Valid guides: ${[...validGuideIds].join(', ')}`
    )
  }

  const rawLinkRefs = fm.linkRefs as LinkRef[] | undefined
  const resolvedLinks = rawLinkRefs?.map(ref => resolveLink(ref.id, ref.note))
  const refIds = rawLinkRefs?.map(ref => ref.id)

  contentPages.set(id, {
    id,
    title: (fm.title as string) ?? id,
    guide,
    group: fm.group as string | undefined,
    links: resolvedLinks,
    linkRefIds: refIds,
    usedFootnotes: fm.usedFootnotes as number[] | undefined,
    component: mod.default,
  })
}
