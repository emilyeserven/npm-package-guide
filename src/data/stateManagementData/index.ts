import type { GuideDefinition } from '../guideTypes'
import { SM_GUIDE_SECTIONS } from './navigation'

export { SM_GUIDE_SECTIONS, SM_START_PAGE_DATA } from './navigation'
export { TECH_DATA, COMPARISON_DATA, DECISION_TREE, ARCH_LAYERS, ANTI_PATTERNS, SM_COLORS } from './techData'
export type { TechData, ComparisonRow, DecisionStep, ArchLayer, AntiPattern } from './types'

export const guideDefinition: GuideDefinition = {
  id: 'state-management',
  icon: '\u26A1',
  title: 'React State Management',
  startPageId: 'sm-start',
  description:
    'Context vs Zustand vs Redux \u2014 deep dives, side-by-side comparison, and how React Query changes everything.',
  order: 12,
  sections: SM_GUIDE_SECTIONS,
}

export { SM_START_PAGE_DATA as startPageData } from './navigation'
