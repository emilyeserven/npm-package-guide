export type ConceptDifficulty = 'beginner' | 'intermediate' | 'advanced'

export interface StackNote {
  framework: 'Express' | 'Fastify' | 'PostgreSQL'
  icon: string
  note: string
  packages?: string[]
}

export interface NjaConcept {
  id: string
  title: string
  icon: string
  color: string
  darkColor: string
  whatNextDoes: string
  whatYouNeed: string
  keyTerms: string[]
  difficulty: ConceptDifficulty
  stackNotes: StackNote[]
}
