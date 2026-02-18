/* ── S3 Basics ─────────────────────────────── */

export interface S3Concept {
  id: string
  icon: string
  title: string
  description: string
  color: string
  darkColor: string
}

/* ── Storage Classes ──────────────────────── */

export type CostTier = 'low' | 'med' | 'high'

export interface StorageClass {
  id: string
  name: string
  icon: string
  description: string
  tag: string
  color: string
  darkColor: string
  storageCostPerGB: number
  retrievalCostPerGB: number
  retrievalCostLabel: string
  retrievalSpeed: string
  availability: string
  durability: string
  minDuration: string
  storageCostTier: CostTier
  retrievalCostTier: CostTier
}

/* ── Lifecycle Rules ─────────────────────── */

export interface LifecycleStage {
  day: number
  label: string
  className: string
  color: string
}

/* ── Scenario Picker ─────────────────────── */

export interface Scenario {
  id: string
  icon: string
  label: string
  description: string
  title: string
  body: string
  chips: string[]
}

/* ── Frontend Patterns ───────────────────── */

export interface S3Header {
  name: string
  description: string
  color: string
  darkColor: string
}

/* ── Quiz ────────────────────────────────── */

export interface S3QuizQuestion {
  q: string
  options: string[]
  answer: number
  explanation: string
}
