import type { GuideSection, StartPageData, GuideManifest } from '../guideTypes'

export const SM_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['sm-start'] },
  {
    label: 'Deep Dives',
    ids: ['sm-context', 'sm-zustand', 'sm-redux'],
  },
  {
    label: 'Choosing & Building',
    ids: ['sm-compare', 'sm-decide', 'sm-architecture'],
  },
]

export const SM_START_PAGE_DATA: StartPageData = {
  subtitle:
    'Context vs Zustand vs Redux \u2014 and how React Query changes everything.',
  tip: 'Each deep dive includes standalone code examples and a variant showing how the tool pairs with React Query for server state.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Deep Dives',
      description:
        'Understand each state management option in depth \u2014 how it works, when to use it, and real code examples.',
      sectionLabel: 'Deep Dives',
      subItemDescriptions: {
        'sm-context': 'React\u2019s built-in dependency injection for rarely-changing globals.',
        'sm-zustand': 'Tiny, flexible state with surgical re-renders and zero boilerplate.',
        'sm-redux': 'Structured, predictable state management for large-scale apps.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Choosing & Building',
      description:
        'Compare the tools side-by-side, walk a decision tree, and learn the recommended layered architecture.',
      sectionLabel: 'Choosing & Building',
      subItemDescriptions: {
        'sm-compare': 'Side-by-side feature comparison across all three tools.',
        'sm-decide': 'A step-by-step decision tree to pick the right tool.',
        'sm-architecture': 'How to layer state tools in a real production app.',
      },
    },
  ],
}

export const SM_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'state-management',
    icon: '⚡',
    title: 'React State Management',
    startPageId: 'sm-start',
    description: 'Context vs Zustand vs Redux \u2014 deep dives, side-by-side comparison, and how React Query changes everything.',
    category: 'frontend',
    dateCreated: '2026-02-18',
    dateModified: '2026-02-26',
    sections: SM_GUIDE_SECTIONS,
  },
  startPageData: SM_START_PAGE_DATA,
}
