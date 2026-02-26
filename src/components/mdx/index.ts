import type { MDXComponents } from 'mdx/types'

// ── Shared components (root-level, not guide-specific) ──────────────
import { Cmd } from './Cmd'
import { FnRef } from './FnRef'
import { NavLink, NavPill } from './NavLink'
import { StepJump } from './StepJump'
import { TocLink } from './TocLink'
import { SectionIntro, Toc, Explainer, Gotcha, ColItem, SectionNote, SectionTitle, SectionSubheading, SectionList, CodeAccordion, MdxPre, DefinitionTable, DefRow } from './SectionLayout'
import { GuideStartContent } from './GuideStartContent'
import { GuideChecklist } from './GuideChecklist'

const sharedComponents: MDXComponents = {
  pre: MdxPre,
  Cmd,
  FnRef,
  NavLink,
  NavPill,
  StepJump,
  TocLink,
  SectionIntro,
  Toc,
  Explainer,
  Gotcha,
  ColItem,
  SectionNote,
  SectionTitle,
  SectionSubheading,
  SectionList,
  CodeAccordion,
  DefinitionTable,
  DefRow,
  GuideStartContent,
  GuideChecklist,
}

// ── Auto-discover guide-specific components ─────────────────────────
//
// Each guide directory (e.g. ./auth/, ./nginx/) has a barrel index.ts
// that re-exports all its components. import.meta.glob discovers them
// so adding a new guide's components only requires the barrel file.

const guideModules = import.meta.glob<Record<string, unknown>>(
  './*/index.ts',
  { eager: true },
)

const guideComponents: MDXComponents = {}
for (const mod of Object.values(guideModules)) {
  for (const [name, component] of Object.entries(mod)) {
    if (typeof component === 'function' || typeof component === 'object') {
      guideComponents[name] = component as MDXComponents[string]
    }
  }
}

export const mdxComponents: MDXComponents = {
  ...sharedComponents,
  ...guideComponents,
}
