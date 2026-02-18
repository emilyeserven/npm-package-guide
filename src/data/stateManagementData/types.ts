export interface TechData {
  id: string
  name: string
  color: string
  icon: string
  tagline: string
  description: string
  strengths: string[]
  weaknesses: string[]
  codeExample: string
  withReactQuery: string
  bestFor: string
  avoidFor: string
  complexity: number
  bundle: string
  boilerplate: string
  learning: string
}

export interface ComparisonRow {
  label: string
  context: string
  zustand: string
  redux: string
}

export interface DecisionStep {
  question: string
  yes: string
  yesColor: string
  no: string
}

export interface ArchLayer {
  layer: string
  tool: string
  color: string
  desc: string
  examples: string
}

export interface AntiPattern {
  bad: string
  good: string
}
