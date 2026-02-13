export interface GlossaryTerm {
  term: string
  definition: string
  linkId: string
  sectionId?: string
}

export interface GlossaryCategory {
  category: string
  terms: GlossaryTerm[]
}

import { npmPackageGlossary } from './npmPackageTerms'
import { architectureGlossary } from './architectureTerms'
import { testingGlossary } from './testingTerms'
import { promptGlossary } from './promptTerms'
import { cicdGlossary } from './cicdTerms'
import { authGlossary } from './authTerms'
import { aiInfraGlossary } from './aiInfraTerms'

export const glossaryTerms: GlossaryCategory[] = [
  ...npmPackageGlossary,
  ...architectureGlossary,
  ...testingGlossary,
  ...promptGlossary,
  ...cicdGlossary,
  ...authGlossary,
  ...aiInfraGlossary,
]
