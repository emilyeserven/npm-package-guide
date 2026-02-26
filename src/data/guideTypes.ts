export interface GuideSection {
  label: string | null
  ids: string[]
}

export type GuideCategory = 'frontend' | 'infrastructure' | 'security' | 'ai-tooling' | 'fundamentals'

export const GUIDE_CATEGORY_LABELS: Record<GuideCategory, string> = {
  frontend: 'Frontend',
  infrastructure: 'Infrastructure',
  security: 'Security',
  'ai-tooling': 'AI & Tooling',
  fundamentals: 'Fundamentals',
}

export interface GuideDefinition {
  id: string
  icon: string
  title: string
  startPageId: string
  description: string
  sections: GuideSection[]
  singlePage?: boolean
  category: GuideCategory
  dateCreated: string
  dateModified: string
}

// ── Start page data types ────────────────────────────────────────────

export interface StartPageSubItem {
  title: string
  description: string
  jumpTo: string
  jumpType?: 'page' | 'guide-filter'
  tags?: { icon: string; name: string }[]
}

export interface StartPageStep {
  type: 'numbered' | 'bonus'
  num?: number
  title: string
  description: string
  jumpTo?: string
  sectionLabel?: string
  subItemDescriptions?: Record<string, string>
  customSubItems?: StartPageSubItem[]
}

export interface StartPageData {
  subtitle: string
  tip: string
  headingText?: string
  headingDescription?: string
  steps: StartPageStep[]
  relatedGuides?: string[]
}

// ── Guide manifest (co-located in each guide's data file) ───────────

/**
 * Each guide data file exports a GUIDE_MANIFEST that bundles the
 * guide definition with its start page data. The guide registry
 * auto-discovers all manifests via import.meta.glob.
 */
export interface GuideManifest {
  def: GuideDefinition
  startPageData?: StartPageData
}
