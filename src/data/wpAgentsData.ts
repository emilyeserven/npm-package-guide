import type { GuideSection, GuideManifest } from './guideTypes'

export const WP_AGENTS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['wp-agents-guide'] },
]

export const WP_AGENTS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'wp-agents',
    icon: '🔌',
    title: 'WordPress API & Agents',
    startPageId: 'wp-agents-guide',
    description: 'Generate TypeScript interfaces and test mocks from your WordPress REST API schema using Claude Code Web.',
    category: 'ai-tooling',
    singlePage: true,
    sections: WP_AGENTS_GUIDE_SECTIONS,
  },
}
