import type { GuideSection, GuideDefinition } from './guideTypes'

export const WP_AGENTS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['wp-agents-guide'] },
]

export const guideDefinition: GuideDefinition = {
  id: 'wp-agents',
  icon: '\u{1F50C}',
  title: 'WordPress API & Agents',
  startPageId: 'wp-agents-guide',
  description:
    'Generate TypeScript interfaces and test mocks from your WordPress REST API schema using Claude Code Web.',
  order: 9,
  sections: WP_AGENTS_GUIDE_SECTIONS,
  singlePage: true,
}
