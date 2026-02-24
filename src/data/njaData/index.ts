import type { GuideDefinition } from '../guideTypes'
import { NJA_GUIDE_SECTIONS } from './navigation'

export { NJA_GUIDE_SECTIONS, NJA_START_PAGE_DATA } from './navigation'
export { NJA_CONCEPTS } from './concepts'
export { NJA_CHECKLIST } from './checklist'
export type { NjaConcept, StackNote, ConceptDifficulty } from './types'

export const guideDefinition: GuideDefinition = {
  id: 'nextjs-abstractions',
  icon: '\u{1F9F1}',
  title: 'Next.js Abstractions',
  startPageId: 'nja-start',
  description:
    'The backend & middleware concepts that Next.js abstracts away \u2014 and how to handle them yourself when separating frontend from backend.',
  order: 8,
  sections: NJA_GUIDE_SECTIONS,
}

export { NJA_START_PAGE_DATA as startPageData } from './navigation'
