// ── Types ────────────────────────────────────────────────────────────
export type { AwsCategoryId, AwsLevel, AwsService, AwsCategory } from './types'

// ── Categories & colors ─────────────────────────────────────────────
export { AWS_CATEGORIES, LEVEL_COLORS } from './categories'

// ── Services by category ────────────────────────────────────────────
export { COMPUTE_SERVICES } from './compute'
export { STORAGE_SERVICES } from './storage'
export { DATABASE_SERVICES } from './database'
export { NETWORKING_SERVICES } from './networking'
export { SECURITY_SERVICES } from './security'
export { SERVERLESS_SERVICES } from './serverless'
export { CONTAINER_SERVICES } from './containers'
export { DEVTOOLS_SERVICES } from './devtools'
export { AI_ML_SERVICES } from './aiMl'
export { MONITORING_SERVICES } from './monitoring'
export { FRONTEND_WEB_SERVICES } from './frontendWeb'

// ── Navigation ──────────────────────────────────────────────────────
export { AWS_GUIDE_SECTIONS, AWS_START_PAGE_DATA , AWS_GUIDE_MANIFEST } from './navigation'

// ── All services combined ───────────────────────────────────────────
import { COMPUTE_SERVICES } from './compute'
import { STORAGE_SERVICES } from './storage'
import { DATABASE_SERVICES } from './database'
import { NETWORKING_SERVICES } from './networking'
import { SECURITY_SERVICES } from './security'
import { SERVERLESS_SERVICES } from './serverless'
import { CONTAINER_SERVICES } from './containers'
import { DEVTOOLS_SERVICES } from './devtools'
import { AI_ML_SERVICES } from './aiMl'
import { MONITORING_SERVICES } from './monitoring'
import { FRONTEND_WEB_SERVICES } from './frontendWeb'
import type { AwsCategoryId, AwsService } from './types'

export const ALL_AWS_SERVICES: AwsService[] = [
  ...COMPUTE_SERVICES,
  ...STORAGE_SERVICES,
  ...DATABASE_SERVICES,
  ...NETWORKING_SERVICES,
  ...SECURITY_SERVICES,
  ...SERVERLESS_SERVICES,
  ...CONTAINER_SERVICES,
  ...DEVTOOLS_SERVICES,
  ...AI_ML_SERVICES,
  ...MONITORING_SERVICES,
  ...FRONTEND_WEB_SERVICES,
]

/** Lookup: category ID → services in that category */
export const SERVICE_BY_CATEGORY: Record<AwsCategoryId, AwsService[]> = {
  compute: COMPUTE_SERVICES,
  storage: STORAGE_SERVICES,
  database: DATABASE_SERVICES,
  networking: NETWORKING_SERVICES,
  security: SECURITY_SERVICES,
  serverless: SERVERLESS_SERVICES,
  containers: CONTAINER_SERVICES,
  devtools: DEVTOOLS_SERVICES,
  ai_ml: AI_ML_SERVICES,
  monitoring: MONITORING_SERVICES,
  frontend_web: FRONTEND_WEB_SERVICES,
}
