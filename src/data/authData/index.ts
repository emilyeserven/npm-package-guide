import type { GuideDefinition } from '../guideTypes'
import { AUTH_GUIDE_SECTIONS } from './navigation'

export type {
  AuthConcept,
  AuthConceptSection,
  JwtPart,
  JwtSectionMeta,
  OAuthFlowStep,
  OAuthSectionMeta,
  AuthPattern,
  AuthPatternSectionMeta,
  ThreatSeverity,
  SecurityThreat,
  SecuritySectionMeta,
  AuthChecklistItem,
  ChecklistSectionMeta,
  QuizQuestion,
  PkceFlowStep,
  PkceSectionMeta,
  TokenLifecyclePattern,
  TokenLifecycleSectionMeta,
  RbacPattern,
  RbacSectionMeta,
  IntegrationScenario,
  IntegrationSectionMeta,
} from './types'

export {
  AUTH_CONCEPT_SECTIONS,
  JWT_SECTION_META,
  JWT_PARTS,
  OAUTH_SECTION_META,
  OAUTH_FLOW_STEPS,
  AUTH_PATTERN_SECTION_META,
  AUTH_PATTERNS,
  SECURITY_SECTION_META,
  SECURITY_THREATS,
  CHECKLIST_SECTION_META,
  AUTH_CHECKLIST_ITEMS,
  AUTH_QUIZ_QUESTIONS,
  PKCE_SECTION_META,
  PKCE_FLOW_STEPS,
  TOKEN_LIFECYCLE_SECTION_META,
  TOKEN_LIFECYCLE_PATTERNS,
  RBAC_SECTION_META,
  RBAC_PATTERNS,
  INTEGRATION_SECTION_META,
  INTEGRATION_SCENARIOS,
} from './concepts'

export { AUTH_GUIDE_SECTIONS, AUTH_START_PAGE_DATA } from './navigation'

export const guideDefinition: GuideDefinition = {
  id: 'auth',
  icon: '\u{1F510}',
  title: 'Auth for Frontend Engineers',
  startPageId: 'auth-start',
  description:
    'Authentication & Authorization \u2014 from zero to confident implementation.',
  order: 5,
  sections: AUTH_GUIDE_SECTIONS,
}

export { AUTH_START_PAGE_DATA as startPageData } from './navigation'
