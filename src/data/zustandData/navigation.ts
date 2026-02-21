import type { GuideSection, StartPageData } from '../guideTypes'

export const ZST_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['zst-start'] },
  {
    label: 'Fundamentals',
    ids: ['zst-basics', 'zst-incorrect', 'zst-correct'],
  },
  {
    label: 'Pitfalls & Patterns',
    ids: ['zst-gotchas', 'zst-slices'],
  },
  {
    label: 'Production',
    ids: ['zst-middleware', 'zst-advanced'],
  },
]

export const ZST_START_PAGE_DATA: StartPageData = {
  subtitle:
    'Everything you need to know about Zustand \u2014 from first store to production patterns.',
  tip: 'Start with Basics to learn the core API, then explore common mistakes, patterns, and advanced techniques.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Fundamentals',
      description:
        'Learn the core API, understand common mistakes, and see the correct patterns for clean, performant stores.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        'zst-basics': 'Create your first store, use selectors, and understand how set() works.',
        'zst-incorrect': 'The five most common Zustand mistakes \u2014 each causes unnecessary re-renders or bugs.',
        'zst-correct': 'Clean store organization, reusable selectors, outside-React access, and TanStack Query integration.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Pitfalls & Patterns',
      description:
        'Understand equality checks, race conditions, and the slices pattern for scaling stores.',
      sectionLabel: 'Pitfalls & Patterns',
      subItemDescriptions: {
        'zst-gotchas': 'Equality checks, async race conditions, SSR hydration, and TypeScript typing.',
        'zst-slices': 'Split a large store into composable slices with cross-slice access.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Production',
      description:
        'Add middleware (persist, devtools, immer) and learn advanced patterns for real apps.',
      sectionLabel: 'Production',
      subItemDescriptions: {
        'zst-middleware': 'persist, devtools, immer, subscribeWithSelector \u2014 and how to stack them.',
        'zst-advanced': 'Transient updates, computed state, external actions, reset patterns, and testing.',
      },
    },
  ],
  relatedGuides: ['state-management', 'tanstack-query'],
}
