import type { GuideDefinition } from '../guideTypes'
import { S3_GUIDE_SECTIONS } from './navigation'

export type { S3Concept, StorageClass, CostTier, LifecycleStage, Scenario, S3Header, S3QuizQuestion } from './types'
export { S3_CONCEPTS, BUCKET_ITEMS } from './basics'
export { STORAGE_CLASSES } from './storageClasses'
export { LIFECYCLE_STAGES, LIFECYCLE_JSON, WATERFALL_ORDER } from './lifecycle'
export { SCENARIOS } from './scenarios'
export { PRESIGNED_URL_CODE, STATIC_DEPLOY_CODE, S3_HEADERS } from './frontend'
export { S3_QUIZ_QUESTIONS } from './quiz'
export { S3_GUIDE_SECTIONS, S3_START_PAGE_DATA } from './navigation'

export const guideDefinition: GuideDefinition = {
  id: 's3-storage',
  icon: '\u{1F5C4}\uFE0F',
  title: 'Amazon S3 Storage Classes',
  startPageId: 's3-start',
  description:
    'Understand Amazon S3 storage classes from a frontend engineer\u2019s perspective \u2014 buckets, objects, lifecycle rules, cost optimization, and practical usage patterns.',
  order: 15,
  sections: S3_GUIDE_SECTIONS,
}

export { S3_START_PAGE_DATA as startPageData } from './navigation'
