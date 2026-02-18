// ── AWS Decoded guide types ──────────────────────────────────────────

export type AwsCategoryId =
  | 'compute'
  | 'storage'
  | 'database'
  | 'networking'
  | 'security'
  | 'serverless'
  | 'containers'
  | 'devtools'
  | 'ai_ml'
  | 'monitoring'
  | 'frontend_web'

export type AwsLevel = 'beginner' | 'intermediate' | 'advanced'

export interface AwsService {
  id: string
  name: string
  fullName: string
  cat: AwsCategoryId
  level: AwsLevel
  icon: string
  short: string
  analogy: string
  detail: string
  useCases: string[]
  keyTerms: Record<string, string>
  pricing: string
  code?: string
}

export interface AwsCategory {
  label: string
  icon: string
  color: string
}
