import type { GlossaryCategory } from './types'

export const tanstackRouterGlossary: GlossaryCategory[] = [
  {
    category: 'Routing Concepts',
    terms: [
      {
        term: 'TanStack Router',
        definition: 'A fully type-safe, client-first router for React that validates route paths, params, and search params at compile time.',
        linkId: 'tanstack-router-docs',
        sectionId: 'tsr-overview',
      },
      {
        term: 'File-based Routing',
        definition: 'A routing pattern where the file system structure defines the route tree. TanStack Router uses a Vite plugin to generate route config from file conventions.',
        linkId: 'tanstack-router-docs',
        sectionId: 'tsr-routing',
        guides: ['tanstack-router', 'nextjs-abstractions'],
      },
      {
        term: 'Type-safe Routing',
        definition: 'Routing where TypeScript validates route paths, params, and search params at compile time \u2014 catching typos and type mismatches before runtime.',
        linkId: 'tanstack-router-docs',
        sectionId: 'tsr-typesafety',
      },
      {
        term: 'Route Masking',
        definition: 'A TanStack Router feature that displays a different URL to the user than what\u2019s actually matched internally. Useful for modals and preview states.',
        linkId: 'tanstack-router-docs',
        sectionId: 'tsr-unique',
      },
      {
        term: 'Route Context',
        definition: 'A hierarchical dependency injection system in TanStack Router where typed context is injected at any route level and inherited by child routes.',
        linkId: 'tanstack-router-docs',
        sectionId: 'tsr-unique',
      },
    ],
  },
  {
    category: 'Data & Performance',
    terms: [
      {
        term: 'Structural Sharing',
        definition: 'A technique borrowed from TanStack Query where only the changed parts of search params trigger re-renders \u2014 unchanged subscriptions are skipped.',
        linkId: 'tanstack-router-docs',
        sectionId: 'tsr-searchparams',
      },
      {
        term: 'Route Loader',
        definition: 'A function that fetches data before a route\u2019s component renders. In TanStack Router, loaders run in parallel with parent route loaders and return fully typed data.',
        linkId: 'tanstack-router-docs',
        sectionId: 'tsr-dataloading',
      },
      {
        term: 'loaderDeps',
        definition: 'A TanStack Router API that declares which search params a loader depends on. The loader only re-runs when those specific dependencies change.',
        linkId: 'tanstack-router-docs',
        sectionId: 'tsr-unique',
      },
      {
        term: 'TanStack Start',
        definition: 'A full-stack framework built on TanStack Router that adds SSR, server functions, and streaming \u2014 the TanStack ecosystem\u2019s answer to Next.js and Remix.',
        linkId: 'tanstack-start-docs',
        sectionId: 'tsr-weaknesses',
      },
    ],
  },
]
