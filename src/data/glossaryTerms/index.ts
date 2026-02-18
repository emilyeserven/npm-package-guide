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

import { npmPackageGlossary } from './npmPackageTerms'
import { architectureGlossary } from './architectureTerms'
import { testingGlossary } from './testingTerms'
import { promptGlossary } from './promptTerms'
import { cicdGlossary } from './cicdTerms'
import { authGlossary } from './authTerms'
import { kubernetesGlossary } from './kubernetesTerms'
import { aiInfraGlossary } from './aiInfraTerms'
import { njaGlossary } from './njaTerms'
import { wpAgentsGlossary } from './wpAgentsTerms'
import { gitWorktreesGlossary } from './gitWorktreesTerms'
import { securityGlossary } from './securityTerms'
import { tanstackQueryGlossary } from './tanstackQueryTerms'

export const glossaryTerms: GlossaryCategory[] = [
  ...npmPackageGlossary,
  ...architectureGlossary,
  ...testingGlossary,
  ...promptGlossary,
  ...cicdGlossary,
  ...authGlossary,
  ...kubernetesGlossary,
  ...aiInfraGlossary,
  ...njaGlossary,
  ...wpAgentsGlossary,
  ...gitWorktreesGlossary,
  ...securityGlossary,
  ...tanstackQueryGlossary,
]
