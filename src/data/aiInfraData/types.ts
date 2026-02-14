export interface InfraConcept {
  name: string
  what: string
  analogy: string
  tools: string[]
}

export interface InfraLayer {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  accent: string
  darkAccent: string
  summary: string
  concepts: InfraConcept[]
}

export interface WorkflowStep {
  layer: string
  label: string
  icon: string
}

export interface InfraWorkflow {
  id: string
  title: string
  description: string
  steps: WorkflowStep[]
}
