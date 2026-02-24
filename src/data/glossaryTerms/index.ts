export interface GlossaryTerm {
  term: string
  definition: string
  linkId: string
  /** Additional external references beyond the primary linkId. */
  linkIds?: string[]
  sectionId?: string
  /** Additional internal page links beyond the primary sectionId. */
  sectionIds?: string[]
  /** Guide IDs this term is relevant to (e.g., ['npm-package', 'ci-cd']). If omitted, derived from sectionId. */
  guides?: string[]
}

export interface GlossaryCategory {
  category: string
  terms: GlossaryTerm[]
}

// Auto-discover all *Terms.ts files in this directory
const modules = import.meta.glob<Record<string, GlossaryCategory[]>>(
  ['./*Terms.ts'],
  { eager: true },
)

export const glossaryTerms: GlossaryCategory[] = Object.values(modules)
  .flatMap(mod => Object.values(mod).flat())
