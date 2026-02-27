import type { GuideSection, StartPageData, GuideManifest } from '../guideTypes'

export const GO_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['go-start'] },
  { label: 'Fundamentals', ids: ['go-overview'] },
  { label: 'Comparisons', ids: ['go-vs-python', 'go-vs-typescript'] },
  { label: 'Practical', ids: ['go-frontend-lens', 'go-starter-projects'] },
]

export const GO_START_PAGE_DATA: StartPageData = {
  subtitle: 'Go language \u00b7 TypeScript comparisons \u00b7 starter projects \u2014 from concepts to your first Go binary.',
  tip: 'Designed for frontend engineers who know TypeScript and want to understand Go for backend services, CLI tools, and cloud infrastructure.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'What Is Go?',
      description: 'Understand where Go shines, its design philosophy, and why companies like Google, Uber, and Twitch use it.',
      jumpTo: 'go-overview',
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Language Comparisons',
      description: 'See Go side-by-side with Python and TypeScript \u2014 the languages you already know.',
      jumpTo: 'go-vs-python',
    },
    {
      type: 'bonus',
      title: 'Comparison Deep Dive',
      description: 'Detailed syntax mappings and interactive quizzes.',
      sectionLabel: 'Comparisons',
      subItemDescriptions: {
        'go-vs-python': 'Performance, ecosystem, deployment, and error handling compared.',
        'go-vs-typescript': 'A rosetta stone mapping TypeScript concepts to Go equivalents.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Start Building',
      description: 'Apply your knowledge with practical use cases and hands-on starter projects.',
      jumpTo: 'go-frontend-lens',
    },
    {
      type: 'bonus',
      title: 'Practical Deep Dive',
      description: 'From mindset shifts to your first Go binary.',
      sectionLabel: 'Practical',
      subItemDescriptions: {
        'go-frontend-lens': 'What\u2019ll feel familiar, what\u2019ll feel alien, and the big mental adjustments.',
        'go-starter-projects': 'Five hands-on projects from beginner to intermediate.',
      },
    },
  ],
}

export const GO_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'go-lang',
    icon: '\u{1F439}',
    title: 'Go for Frontend Engineers',
    startPageId: 'go-start',
    description: 'A pragmatic guide to Go for developers coming from TypeScript and the frontend ecosystem.',
    category: 'infrastructure',
    dateCreated: '2026-02-27',
    dateModified: '2026-02-27',
    sections: GO_GUIDE_SECTIONS,
  },
  startPageData: GO_START_PAGE_DATA,
}
