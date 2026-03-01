// ── Interfaces ────────────────────────────────────────────────────────

export interface MistakeItem {
  id: string
  mistake: string
  example: string
  fix: string
  /** Short, copy-pasteable rule for CLAUDE.md / skills to prevent this mistake. */
  prompt: string
  /** Link to a page in the Security Awareness guide for a deeper explanation. */
  deepDivePageId?: string
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
  /** Short, copy-pasteable rule for CLAUDE.md / skills to prevent this mistake. */
  prompt: string
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

export interface ImplementationStep {
  title: string
  description: string
  code?: string
}

export interface ToolExample {
  title: string
  code: string
  description?: string
}

export interface ToolTechnique {
  id: string
  name: string
  icon: string
  description: string
  details: string[]
  bestFor: string[]
  implementation: ImplementationStep[]
  examples: ToolExample[]
  tips?: string[]
  pros?: string[]
  cons?: string[]
}

export interface MetaToolItem {
  id: string
  name: string
  icon: string
  description: string
  details: string[]
}

export interface AICodingTool {
  id: string
  name: string
  icon: string
  category: string
  description: string
  strengths: string[]
  considerations: string[]
  bestFor: string
  accent: string
  darkAccent: string
}
