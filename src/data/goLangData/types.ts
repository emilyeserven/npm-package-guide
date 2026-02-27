export interface GoUseCase {
  icon: string
  title: string
  description: string
  accent: string
  darkAccent: string
}

export interface GoAccordionItem {
  title: string
  body: string
}

export interface GoCompareRow {
  aspect: string
  go: string
  python: string
}

export interface GoCodeExample {
  id: string
  title: string
  leftLabel: string
  leftLang: string
  leftCode: string
  rightLabel: string
  rightLang: string
  rightCode: string
  note?: string
  noteType?: 'info' | 'warning' | 'tip'
}

export interface GoConceptRow {
  ts: string
  go: string
}

export interface GoProject {
  title: string
  difficulty: 'beginner' | 'intermediate'
  time: string
  concepts: string
  description: string
  tags: string[]
  steps: { label: string; desc: string }[]
  code?: string
}
