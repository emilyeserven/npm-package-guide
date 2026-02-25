export type { GlossaryTerm, GlossaryCategory } from './types'
import type { GlossaryCategory } from './types'

// ── Auto-discover all guide-specific glossary files ──────────────────
//
// Convention: every *Terms.ts file in this directory exports a
// GlossaryCategory[] as its sole named export. New guides just need
// to add a <guideId>Terms.ts file — no manual import list needed.

const glossaryModules = import.meta.glob<{ [key: string]: GlossaryCategory[] }>(
  ['./*Terms.ts'],
  { eager: true },
)

export const glossaryTerms: GlossaryCategory[] = Object.values(glossaryModules).flatMap(
  mod => {
    const arrays = Object.values(mod).filter(Array.isArray)
    return arrays.flatMap(a => a as GlossaryCategory[])
  },
)
