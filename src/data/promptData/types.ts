// ── Interfaces ────────────────────────────────────────────────────────

export interface MistakeItem {
  id: string
  mistake: string
  example: string
  fix: string
}

export interface MistakeCategory {
  id: string
  name: string
  icon: string
  severity: 'high' | 'medium' | 'low'
  items: MistakeItem[]
}

export interface SeverityTheme {
  bg: string
  border: string
  badge: string
  text: string
}

export interface ContextTechnique {
  id: string
  name: string
  icon: string
  description: string
  details: string[]
  example: string
}

export interface CLICommand {
  cmd: string
  desc: string
  human: boolean
  category: string
}

export interface CLIGroup {
  name: string
  commands: CLICommand[]
}

export interface TestingMistake {
  context: 'e2e' | 'unit'
  mistake: string
  example: string
  fix: string
}

export interface ChecklistItem {
  label: string
  description: string
}

export interface ChecklistSection {
  id: string
  name: string
  icon: string
  items: ChecklistItem[]
}

export interface ToolTechnique {
  id: string
  name: string
  icon: string
  description: string
  details: string[]
  example: string
}

export interface MetaToolItem {
  id: string
  name: string
  icon: string
  description: string
  details: string[]
}
