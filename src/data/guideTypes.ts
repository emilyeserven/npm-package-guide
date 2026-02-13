export interface GuideSection {
  label: string | null
  ids: string[]
}

export interface GuideDefinition {
  id: string
  icon: string
  title: string
  startPageId: string
  description: string
  sections: GuideSection[]
}
