import type { GlossaryCategory } from './index'

export const tanstackQueryGlossary: GlossaryCategory[] = [
  {
    category: 'TanStack Query \u2014 Core Concepts',
    terms: [
      {
        term: 'Query Key',
        definition:
          'A unique, serializable array (e.g. <code>[\'users\', userId]</code>) that identifies a cached query. TanStack Query uses query keys for cache lookup, deduplication, and invalidation.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-lifecycle',
      },
      {
        term: 'staleTime',
        definition:
          'The duration (in ms) that cached data is considered "fresh." During staleTime, subsequent mounts return cached data with zero network requests. After staleTime, data is marked stale and eligible for background refetch.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-lifecycle',
      },
      {
        term: 'gcTime (Garbage Collection Time)',
        definition:
          'The duration (in ms) that inactive cached data is kept in memory. After all subscribers unmount, data stays for gcTime (default 5 min) before being garbage collected. Formerly called <code>cacheTime</code>.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-lifecycle',
      },
      {
        term: 'Query Invalidation',
        definition:
          'Marking cached queries as stale, triggering a background refetch. Typically called after a mutation: <code>queryClient.invalidateQueries({ queryKey: [\'posts\'] })</code>.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-mutations',
      },
      {
        term: 'useQuery',
        definition:
          'The primary hook for declarative data fetching. Accepts a query key and query function, returns loading/error/success states plus the cached data.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-side-by-side',
      },
      {
        term: 'useMutation',
        definition:
          'Hook for data mutations (create/update/delete). Provides lifecycle callbacks (onMutate, onSuccess, onError, onSettled) for optimistic updates and cache invalidation.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-mutations',
      },
    ],
  },
  {
    category: 'TanStack Query \u2014 Patterns',
    terms: [
      {
        term: 'Optimistic Update',
        definition:
          'A pattern where the UI is updated immediately before the server confirms the change. If the server rejects the mutation, the update is rolled back to the previous state.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-mutations',
      },
      {
        term: 'Background Refetch',
        definition:
          'When stale data exists in cache, TanStack Query serves it immediately while silently fetching fresh data in the background. The UI updates seamlessly when new data arrives.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-lifecycle',
      },
      {
        term: 'Request Deduplication',
        definition:
          'When multiple components request the same query key simultaneously, TanStack Query fires only one network request and shares the result across all subscribers.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-feature-matrix',
      },
      {
        term: 'Structural Sharing',
        definition:
          'When refetched data is deeply equal to the cached data, TanStack Query preserves the original object references. This prevents unnecessary React re-renders.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-strengths-weaknesses',
      },
      {
        term: 'Server State',
        definition:
          'Data that originates from a remote server. It is asynchronous, potentially shared between users, and can become stale. Managed by tools like TanStack Query, not Redux or Context.',
        linkId: 'tsq-docs',
        sectionId: 'tsq-state-taxonomy',
      },
      {
        term: 'Client State',
        definition:
          'Data that lives entirely in the browser: UI theme, sidebar visibility, selected tabs. It is synchronous, owned by the current session, and always "fresh." Managed by Zustand, Redux, or Context.',
        linkId: 'tsq-zustand',
        sectionId: 'tsq-state-taxonomy',
      },
    ],
  },
]
