import type { GuideDefinition } from '../guideTypes'
import { ZST_GUIDE_SECTIONS } from './navigation'

export { ZST_GUIDE_SECTIONS, ZST_START_PAGE_DATA } from './navigation'
export {
  ZUSTAND_STATS,
  API_REFERENCE,
  BASICS_EXAMPLES,
  INCORRECT_EXAMPLES,
  CORRECT_EXAMPLES,
  GOTCHA_EXAMPLES,
  SLICES_EXAMPLES,
  MIDDLEWARE_EXAMPLES,
  ADVANCED_EXAMPLES,
} from './codeExamples'
export type { CodeExample, CalloutData, ApiRefEntry, ZustandStat } from './types'

export const guideDefinition: GuideDefinition = {
  id: 'zustand',
  icon: '\u{1F43B}',
  title: 'Zustand Deep Dive',
  startPageId: 'zst-start',
  description:
    'Everything about Zustand \u2014 from first store to slices, middleware, and production patterns with interactive demos.',
  order: 18,
  sections: ZST_GUIDE_SECTIONS,
}

export { ZST_START_PAGE_DATA as startPageData } from './navigation'
