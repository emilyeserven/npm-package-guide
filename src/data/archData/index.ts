import type { GuideDefinition } from '../guideTypes'
import { ARCH_GUIDE_SECTIONS } from './navigation'

export type { StackComponent, FrameworkCapability, DataFlowItem } from './types'
export { LAYER_COLORS, DATA_FLOW, STACK_PAGES } from './stacks'
export { FRAMEWORK_PAGES } from './frameworks'
export { ARCH_GUIDE_SECTIONS, ARCH_START_PAGE_DATA } from './navigation'
export { ARCH_CHECKLIST } from './checklist'

export const guideDefinition: GuideDefinition = {
  id: 'architecture',
  icon: '\u{1F3D7}\uFE0F',
  title: 'Architecture Guide',
  startPageId: 'arch-start',
  description:
    'Understand common frontend architecture patterns and how to structure your projects for maintainability and scale.',
  order: 1,
  sections: ARCH_GUIDE_SECTIONS,
}

export { ARCH_START_PAGE_DATA as startPageData } from './navigation'
