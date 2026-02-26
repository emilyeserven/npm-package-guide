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
