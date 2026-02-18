import type { GlossaryCategory } from './index'

export const stateManagementGlossary: GlossaryCategory[] = [
  {
    category: 'State Management',
    terms: [
      {
        term: 'React Context',
        definition:
          "React's built-in dependency injection mechanism for passing data through the component tree without prop drilling. Not a full state manager — best for rarely-changing globals like theme, locale, and auth.",
        linkId: 'react-context-docs',
        sectionId: 'sm-context',
        guides: ['state-management'],
      },
      {
        term: 'Zustand',
        definition:
          'A small (~1KB), fast state management library using a simplified flux pattern with hooks. Provides surgical re-renders via built-in selectors and works outside React.',
        linkId: 'zustand-docs',
        sectionId: 'sm-zustand',
        guides: ['state-management'],
      },
      {
        term: 'Redux Toolkit (RTK)',
        definition:
          "The official, opinionated toolset for Redux. Includes createSlice (reducers + actions), configureStore, RTK Query, and Immer for immutable updates. The industry standard for large-scale state management.",
        linkId: 'redux-toolkit-docs',
        sectionId: 'sm-redux',
        guides: ['state-management'],
      },
      {
        term: 'TanStack Query (React Query)',
        definition:
          'A server-state management library that handles fetching, caching, background refetching, pagination, and optimistic updates. Replaces the need to store API data in Redux or Zustand.',
        linkId: 'tanstack-query-docs',
        sectionId: 'sm-decide',
        guides: ['state-management'],
      },
      {
        term: 'Selector',
        definition:
          'A function that extracts a specific piece of state from a store. Selectors enable surgical re-renders — components only update when their selected slice changes, not when unrelated state changes.',
        linkId: 'zustand-docs',
        sectionId: 'sm-compare',
        guides: ['state-management'],
      },
      {
        term: 'Provider (React)',
        definition:
          'A React component that wraps a subtree and makes a value available to all descendants via useContext. Required by Context and Redux; not needed by Zustand.',
        linkId: 'react-context-docs',
        sectionId: 'sm-context',
        guides: ['state-management'],
      },
    ],
  },
]
