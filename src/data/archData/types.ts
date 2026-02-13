/* ───────────────────────── TYPES ───────────────────────── */

export interface StackComponent {
  id: string
  name: string
  role: string
  icon: string
  color: string
  accent: string
  darkAccent: string
  purpose: string
  description: string
  keyFeatures: string[]
  analogy: string
  /* PFRN-only: comparison fields */
  changed?: boolean
  traditionalName?: string
  traditionalDesc?: string
  modifiedDesc?: string
}

export interface StackPageData {
  id: string
  name: string
  pieces: string[]
  overview: string
  color: string
  accent: string
  darkAccent: string
  components: StackComponent[]
  pros: string[]
  cons: string[]
  bestFor: string
}

export interface DataFlowItem {
  step: string
  text: string
  tag: string
  colorId: string
}

/* ───────────────────────── FRAMEWORK TYPES ───────────────────────── */

export interface FrameworkCapability {
  id: string
  name: string
  icon: string
  description: string
  keyPoints: string[]
}

export interface FrameworkPageData {
  id: string
  name: string
  tagline: string
  overview: string
  color: string
  accent: string
  darkAccent: string
  builtOn: string[]
  capabilities: FrameworkCapability[]
  pros: string[]
  cons: string[]
  bestFor: string
  analogy: string
}
