/* ───────────────────────── AUTH GUIDE TYPES ───────────────────────── */

export interface AuthConcept {
  term: string
  definition: string
  analogy: string
  color: string
  darkColor: string
  examples: string[]
}

export interface AuthConceptSection {
  id: string
  heading: string
  intro: string
  keyTakeaway: string
  concepts: AuthConcept[]
}

export interface JwtPart {
  name: string
  color: string
  json: string
  desc: string
}

export interface JwtSectionMeta {
  heading: string
  intro: string
  keyTakeaway: string
}

export interface OAuthFlowStep {
  step: number
  label: string
  detail: string
  actor: string
}

export interface OAuthSectionMeta {
  heading: string
  intro: string
  keyTakeaway: string
}

export interface AuthPattern {
  name: string
  recommendation: string
  avoid: string
  code: string
}

export interface AuthPatternSectionMeta {
  heading: string
  intro: string
  keyTakeaway: string
}

export type ThreatSeverity = 'critical' | 'high' | 'medium'

export interface SecurityThreat {
  name: string
  risk: string
  defense: string
  severity: ThreatSeverity
}

export interface SecuritySectionMeta {
  heading: string
  intro: string
  keyTakeaway: string
}

export interface AuthChecklistItem {
  text: string
  category: string
}

export interface ChecklistSectionMeta {
  heading: string
  intro: string
}

export interface QuizQuestion {
  q: string
  options: string[]
  answer: number
  explanation: string
}
