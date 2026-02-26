import type { GuideSection, GuideManifest } from './guideTypes'

export const GCR_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['guide-creation-guide'] },
]

export const GCR_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'guide-creation',
    icon: '📝',
    title: 'Creating a New Guide',
    startPageId: 'guide-creation-guide',
    description: 'End-to-end walkthrough for adding a new guide to this project \u2014 from writing your content artifact through prompting, scaffolding, and validation.',
    category: 'ai-tooling',
    dateCreated: '2026-02-24',
    dateModified: '2026-02-26',
    singlePage: true,
    sections: GCR_GUIDE_SECTIONS,
  },
}
