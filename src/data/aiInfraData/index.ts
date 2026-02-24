import type { GuideDefinition } from '../guideTypes'
import { AI_INFRA_GUIDE_SECTIONS } from './navigation'

export type { InfraLayer, InfraConcept, InfraWorkflow, WorkflowStep } from './types'
export { INFRA_LAYERS } from './layers'
export { INFRA_WORKFLOWS } from './workflows'
export { AI_INFRA_GUIDE_SECTIONS, AI_INFRA_START_PAGE_DATA } from './navigation'
export { AI_INFRA_CHECKLIST } from './checklist'

export const guideDefinition: GuideDefinition = {
  id: 'ai-infra',
  icon: '\u{1F916}',
  title: 'AI Infrastructure',
  startPageId: 'ai-start',
  description:
    'Understand AI infrastructure from a frontend engineer\u2019s perspective \u2014 from the API calls your React app makes to model serving, vector databases, and GPU clusters.',
  order: 7,
  sections: AI_INFRA_GUIDE_SECTIONS,
}

export { AI_INFRA_START_PAGE_DATA as startPageData } from './navigation'
