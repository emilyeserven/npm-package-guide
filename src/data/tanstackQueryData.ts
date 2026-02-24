import type { GuideSection, GuideDefinition, StartPageData } from './guideTypes'

// ── Guide sections (sidebar & navigation) ─────────────────────────
export const TSQ_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['tsq-start'] },
  { label: 'The Problem', ids: ['tsq-problem', 'tsq-side-by-side'] },
  {
    label: 'Deep Dive',
    ids: ['tsq-feature-matrix', 'tsq-cache-demo', 'tsq-lifecycle', 'tsq-mutations'],
  },
  { label: 'Architecture', ids: ['tsq-state-taxonomy', 'tsq-architecture'] },
  { label: 'Assessment', ids: ['tsq-strengths-weaknesses', 'tsq-decision'] },
]

// ── Start page data ───────────────────────────────────────────────
export const TSQ_START_PAGE_DATA: StartPageData = {
  subtitle:
    'Not a replacement for fetch. Not a replacement for Redux. A powerful async state manager that sits between your UI and your server.',
  tip: 'Each section builds on the last \u2014 start with "The Problem" if you\u2019re new to server state management, or jump to any section that interests you.',
  headingText: '\u{1F504} Understanding TanStack Query',
  headingDescription:
    'Follow the sections in order for a complete picture, or jump to what you need.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'The Problem',
      description:
        'Understand why fetch/axios alone aren\u2019t enough and see the same feature built four different ways.',
      sectionLabel: 'The Problem',
      subItemDescriptions: {
        'tsq-problem':
          'Data fetching is solved \u2014 managing it isn\u2019t. See the questions every app must answer.',
        'tsq-side-by-side':
          'The same user-list feature built with fetch, XHR, Axios, and TanStack Query.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Deep Dive',
      description:
        'Explore the feature matrix, try the interactive cache demo, and step through the full query lifecycle.',
      sectionLabel: 'Deep Dive',
      subItemDescriptions: {
        'tsq-feature-matrix':
          'A filterable comparison of what each data-fetching approach gives you out of the box.',
        'tsq-cache-demo':
          'Interactive demo \u2014 fetch, cache, invalidate, and see staleness in real time.',
        'tsq-lifecycle':
          'Step through all 10 stages from mount to garbage collection.',
        'tsq-mutations':
          'Optimistic updates with automatic rollback \u2014 the write side of TanStack Query.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Architecture',
      description:
        'Learn why different types of state need different tools, and how TanStack Query fits with Zustand, Redux, and Context.',
      sectionLabel: 'Architecture',
      subItemDescriptions: {
        'tsq-state-taxonomy':
          'Server state, client state, derived state, and form state \u2014 each needs its own tool.',
        'tsq-architecture':
          'TanStack Query + Zustand/Redux/Context: complements, not competitors.',
      },
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Assessment',
      description:
        'An honest look at strengths, weaknesses, and a decision framework for when to adopt.',
      sectionLabel: 'Assessment',
      subItemDescriptions: {
        'tsq-strengths-weaknesses':
          'Eight strengths and eight weaknesses \u2014 every tool has tradeoffs.',
        'tsq-decision':
          'Strong yes, maybe, or skip it \u2014 a clear decision framework.',
      },
    },
  ],
  relatedGuides: ['architecture', 'testing'],
}

// ── Problem page questions ────────────────────────────────────────
export interface TsqQuestion {
  q: string
  icon: string
}

export const TSQ_PROBLEM_QUESTIONS: TsqQuestion[] = [
  { q: 'When should I refetch?', icon: '\u{1F504}' },
  { q: 'How do I cache responses?', icon: '\u{1F4BE}' },
  { q: 'What if 3 components need the same data?', icon: '\u{1F500}' },
  { q: 'How do I show stale data while refreshing?', icon: '\u231B' },
  { q: 'What about optimistic UI updates?', icon: '\u26A1' },
  { q: 'How do I handle pagination?', icon: '\u{1F4C4}' },
]

// ── Code examples (side-by-side comparison) ───────────────────────
export const TSQ_CODE_EXAMPLES: Record<string, { label: string; code: string }> = {
  tanstack: {
    label: 'TanStack Query',
    code: `// TanStack Query — declare what you need
function UserList() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    isFetching,    // true during background refetches
    isStale,       // data is past staleTime
  } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('/api/users').then(r => r.json()),
    staleTime: 30_000,       // fresh for 30s
    gcTime: 5 * 60_000,      // garbage collect after 5min
    retry: 3,                // auto-retry on failure
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Skeleton />;
  if (isError) return <Error message={error.message} />;

  return <UserTable data={users} />;
}
// That's it. Caching, deduplication, retries,
// background refetching — all handled.
// Every component using ['users'] shares one cache.`,
  },
  fetch: {
    label: 'fetch()',
    code: `// Vanilla fetch — you manage EVERYTHING
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  let cancelled = false;
  setLoading(true);

  fetch('/api/users')
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data => {
      if (!cancelled) setUsers(data);
    })
    .catch(err => {
      if (!cancelled) setError(err);
    })
    .finally(() => {
      if (!cancelled) setLoading(false);
    });

  return () => { cancelled = true; };
}, []);
// No caching. No retries. No deduplication.
// Race conditions? You're on your own.
// Another component needs the same data? Fetch again.`,
  },
  xhr: {
    label: 'XHR',
    code: `// XMLHttpRequest — the OG, verbose approach
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const xhr = new XMLHttpRequest();
  setLoading(true);

  xhr.open('GET', '/api/users');
  xhr.onload = () => {
    if (xhr.status === 200) {
      setUsers(JSON.parse(xhr.responseText));
    }
    setLoading(false);
  };
  xhr.onerror = () => setLoading(false);
  // One advantage: upload progress events
  xhr.upload.onprogress = (e) => {
    console.log(\`\${(e.loaded/e.total*100)}%\`);
  };
  xhr.send();

  return () => xhr.abort();
}, []);
// Even more boilerplate than fetch.
// But: progress events work (fetch still lacks this).`,
  },
  axios: {
    label: 'Axios',
    code: `// Axios — nicer API, still no caching layer
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const controller = new AbortController();
  setLoading(true);

  axios.get('/api/users', {
    signal: controller.signal,
  })
    .then(({ data }) => setUsers(data))
    .catch(err => {
      if (!axios.isCancel(err)) setError(err);
    })
    .finally(() => setLoading(false));

  return () => controller.abort();
}, []);
// Better than fetch: interceptors, auto JSON,
// request/response transforms.
// Still missing: caching, deduplication, retries,
// background refetching, optimistic updates...`,
  },
}

// ── Feature comparison matrix ─────────────────────────────────────
export type FeatureCategory = 'cache' | 'network' | 'ux' | 'perf' | 'dx'

export interface TsqFeature {
  name: string
  fetch: boolean
  xhr: boolean
  axios: boolean
  rq: boolean
  category: FeatureCategory
}

export interface TsqFeatureCategoryDef {
  key: FeatureCategory
  label: string
  /** [light, dark] color */
  color: readonly [string, string]
}

export const TSQ_FEATURE_CATEGORIES: TsqFeatureCategoryDef[] = [
  { key: 'cache', label: 'Caching', color: ['#0d9488', '#14b8a6'] },
  { key: 'network', label: 'Network', color: ['#0284c7', '#38bdf8'] },
  { key: 'ux', label: 'UX', color: ['#d97706', '#f59e0b'] },
  { key: 'perf', label: 'Performance', color: ['#7c3aed', '#8b5cf6'] },
  { key: 'dx', label: 'DX', color: ['#e11d48', '#f43f5e'] },
]

export const TSQ_FEATURES: TsqFeature[] = [
  { name: 'Automatic Caching', fetch: false, xhr: false, axios: false, rq: true, category: 'cache' },
  { name: 'Background Refetching', fetch: false, xhr: false, axios: false, rq: true, category: 'cache' },
  { name: 'Stale-While-Revalidate', fetch: false, xhr: false, axios: false, rq: true, category: 'cache' },
  { name: 'Cache Invalidation', fetch: false, xhr: false, axios: false, rq: true, category: 'cache' },
  { name: 'Request Deduplication', fetch: false, xhr: false, axios: false, rq: true, category: 'network' },
  { name: 'Retry Logic', fetch: false, xhr: false, axios: false, rq: true, category: 'network' },
  { name: 'Pagination / Infinite Scroll', fetch: false, xhr: false, axios: false, rq: true, category: 'ux' },
  { name: 'Optimistic Updates', fetch: false, xhr: false, axios: false, rq: true, category: 'ux' },
  { name: 'Window Focus Refetching', fetch: false, xhr: false, axios: false, rq: true, category: 'ux' },
  { name: 'DevTools', fetch: false, xhr: false, axios: false, rq: true, category: 'dx' },
  { name: 'Structural Sharing', fetch: false, xhr: false, axios: false, rq: true, category: 'perf' },
  { name: 'Garbage Collection', fetch: false, xhr: false, axios: false, rq: true, category: 'perf' },
  { name: 'SSR / Hydration Support', fetch: false, xhr: false, axios: false, rq: true, category: 'dx' },
  { name: 'Interceptors', fetch: false, xhr: false, axios: true, rq: false, category: 'network' },
  { name: 'Progress Events', fetch: false, xhr: true, axios: true, rq: false, category: 'network' },
  { name: 'Zero Dependencies', fetch: true, xhr: true, axios: false, rq: false, category: 'dx' },
  { name: 'Browser Built-in', fetch: true, xhr: true, axios: false, rq: false, category: 'dx' },
]

// ── Cache demo endpoints ──────────────────────────────────────────
export interface TsqCacheEndpoint {
  key: string
  label: string
  emoji: string
}

export const TSQ_CACHE_ENDPOINTS: TsqCacheEndpoint[] = [
  { key: 'users', label: '/api/users', emoji: '\u{1F464}' },
  { key: 'posts', label: '/api/posts', emoji: '\u{1F4DD}' },
  { key: 'comments', label: '/api/comments', emoji: '\u{1F4AC}' },
]

// ── Query lifecycle steps ─────────────────────────────────────────
export interface TsqLifecycleStep {
  label: string
  desc: string
  icon: string
  /** [light, dark] accent color */
  color: readonly [string, string]
}

export const TSQ_LIFECYCLE_STEPS: TsqLifecycleStep[] = [
  {
    label: 'Mount',
    desc: "Component mounts. useQuery checks the cache for queryKey ['users'].",
    icon: '\u{1F50D}',
    color: ['#0284c7', '#38bdf8'],
  },
  {
    label: 'Cache Miss',
    desc: "No cached data found. Query enters 'loading' state. queryFn fires.",
    icon: '\u{1F4E1}',
    color: ['#d97706', '#f59e0b'],
  },
  {
    label: 'Fetching',
    desc: "Network request in flight. isLoading=true. Any other component using ['users'] will NOT trigger a duplicate request.",
    icon: '\u231B',
    color: ['#7c3aed', '#8b5cf6'],
  },
  {
    label: 'Success',
    desc: "Data received. Stored in cache under ['users']. isSuccess=true. All subscribers re-render with the data.",
    icon: '\u2705',
    color: ['#0d9488', '#14b8a6'],
  },
  {
    label: 'Fresh',
    desc: "Data is within staleTime. Subsequent mounts with ['users'] return cached data instantly. Zero network requests.",
    icon: '\u{1F9CA}',
    color: ['#0d9488', '#14b8a6'],
  },
  {
    label: 'Stale',
    desc: 'staleTime exceeded. Data is still shown but marked stale. Next trigger (mount, focus, interval) will refetch in background.',
    icon: '\u23F0',
    color: ['#d97706', '#f59e0b'],
  },
  {
    label: 'Background Refetch',
    desc: 'User still sees cached data. Meanwhile, fresh data is being fetched silently. isFetching=true, isLoading=false.',
    icon: '\u{1F504}',
    color: ['#7c3aed', '#8b5cf6'],
  },
  {
    label: 'Updated',
    desc: 'New data replaces old in cache. If deeply equal (structural sharing), React skips re-render. Otherwise, smooth update.',
    icon: '\u2728',
    color: ['#0d9488', '#14b8a6'],
  },
  {
    label: 'Inactive',
    desc: 'All subscribers unmount. Data stays in cache for gcTime (default 5min). If re-subscribed before GC, instant cache hit.',
    icon: '\u{1F4A4}',
    color: ['#64748b', '#94a3b8'],
  },
  {
    label: 'Garbage Collected',
    desc: 'gcTime exceeded with no subscribers. Cache entry removed. Next request starts fresh from step 1.',
    icon: '\u{1F5D1}\uFE0F',
    color: ['#e11d48', '#f43f5e'],
  },
]

// ── State taxonomy types ──────────────────────────────────────────
export interface TsqStateType {
  key: string
  label: string
  icon: string
  /** [light, dark] accent color */
  color: readonly [string, string]
  tool: string
  desc: string
  examples: string[]
}

export const TSQ_STATE_TYPES: TsqStateType[] = [
  {
    key: 'server',
    label: 'Server State',
    icon: '\u{1F310}',
    color: ['#0d9488', '#14b8a6'],
    tool: 'TanStack Query',
    desc: "Data that lives on a remote server. It's async, shared between users, can become stale, and you don't own it.",
    examples: ['API responses', 'Database records', 'User profiles from backend', 'Search results'],
  },
  {
    key: 'client',
    label: 'Client State',
    icon: '\u{1F4BB}',
    color: ['#7c3aed', '#8b5cf6'],
    tool: 'Zustand / Redux / Context',
    desc: 'Data that lives entirely in the browser. It\'s synchronous, owned by this user session, and always "fresh".',
    examples: ['UI theme (dark/light)', 'Sidebar open/closed', 'Modal visibility', 'Selected tab'],
  },
  {
    key: 'derived',
    label: 'Derived / Computed',
    icon: '\u26A1',
    color: ['#d97706', '#f59e0b'],
    tool: 'useMemo / Selectors',
    desc: 'Data computed from other state. Not stored separately \u2014 recalculated when dependencies change.',
    examples: ['Filtered list from query', 'Cart total from items', 'Sorted table data'],
  },
  {
    key: 'form',
    label: 'Form State',
    icon: '\u{1F4CB}',
    color: ['#0284c7', '#38bdf8'],
    tool: 'React Hook Form / Formik',
    desc: 'Ephemeral UI state tied to user input. Lives for the lifetime of a form, then gets submitted.',
    examples: ['Input values', 'Validation errors', 'Touched/dirty fields', 'Submission status'],
  },
]

// ── Architecture: complementary tools ─────────────────────────────
export interface TsqToolComparison {
  tool: string
  verdict: string
  /** [light, dark] accent color */
  color: readonly [string, string]
  why: string
}

export const TSQ_TOOLS_COMPARISON: TsqToolComparison[] = [
  {
    tool: 'React Context',
    verdict: 'Use together',
    color: ['#0284c7', '#38bdf8'],
    why: "Context is for dependency injection and scoped values (theme, locale, auth). It's not optimized for frequent updates \u2014 that's fine because these values change rarely. TanStack Query handles the frequent, async stuff.",
  },
  {
    tool: 'Zustand',
    verdict: 'Use together',
    color: ['#7c3aed', '#8b5cf6'],
    why: 'Zustand excels at synchronous, client-owned state with fine-grained subscriptions. Modal open/closed, sidebar state, user preferences, UI filters. Zero boilerplate, no re-render issues. Perfect complement to TanStack Query.',
  },
  {
    tool: 'Redux / RTK',
    verdict: 'Use together (maybe)',
    color: ['#e11d48', '#f43f5e'],
    why: "If you already have Redux for complex client state (multi-step workflows, undo/redo, complex derived state), keep it. But RTK Query overlaps heavily with TanStack Query \u2014 pick one for server state, not both.",
  },
]

export const TSQ_ARCHITECTURE_CODE = `// The Perfect Architecture: Each tool for its job

// 1. TanStack Query \u2192 Server State
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => api.getUser(userId),
});

// 2. Zustand \u2192 Client State (global UI state)
const useStore = create((set) => ({
  theme: 'dark',
  sidebarOpen: true,
  toggleSidebar: () =>
    set(s => ({ sidebarOpen: !s.sidebarOpen })),
}));

// 3. React Context \u2192 Scoped Dependency Injection
const FeatureFlagContext = createContext();
// Provides config, not frequently-changing data

// 4. Component — wires it all together
function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: api.getCurrentUser,
  });
  const { theme, sidebarOpen } = useStore();
  const flags = useContext(FeatureFlagContext);

  return (
    <Layout dark={theme === 'dark'} sidebar={sidebarOpen}>
      {flags.newDashboard
        ? <NewDashboard user={user} />
        : <LegacyDashboard user={user} />
      }
    </Layout>
  );
}`

// ── Strengths & weaknesses ────────────────────────────────────────
export interface TsqAssessmentItem {
  title: string
  desc: string
}

export const TSQ_STRENGTHS: TsqAssessmentItem[] = [
  {
    title: 'Automatic Cache Management',
    desc: "Query keys create a normalized, intelligent cache. Multiple components sharing ['users'] make ONE network request. Data stays fresh via configurable staleTime and gcTime.",
  },
  {
    title: 'Background Refetching',
    desc: 'When data goes stale, TanStack Query refetches silently in the background while still showing cached data. Users see instant results, never loading spinners for data they\u2019ve seen before.',
  },
  {
    title: 'Request Deduplication',
    desc: "If 5 components mount simultaneously requesting ['users'], only ONE network request fires. This is impossible to achieve cleanly with raw fetch/axios without significant custom code.",
  },
  {
    title: 'Optimistic Updates',
    desc: 'Mutate local cache instantly, then reconcile when the server responds. If the mutation fails, automatically roll back to the previous state. Built-in, not bolted-on.',
  },
  {
    title: 'Structural Sharing',
    desc: "When refetched data is deeply equal to cached data, TanStack Query preserves object references. This prevents unnecessary React re-renders \u2014 something you'd never get from naive useState.",
  },
  {
    title: 'Infinite Queries & Pagination',
    desc: 'useInfiniteQuery handles cursor-based and offset pagination with built-in page management, automatic fetching of next/previous pages, and cache coordination.',
  },
  {
    title: 'DevTools',
    desc: 'A dedicated visual inspector showing every cached query, its state (fresh/stale/fetching/inactive), data payload, and timing. Invaluable for debugging data flow.',
  },
  {
    title: 'Parallel & Dependent Queries',
    desc: 'Run queries in parallel with useQueries, or chain dependent queries with the enabled option. Query orchestration that would be spaghetti code otherwise.',
  },
]

export const TSQ_WEAKNESSES: TsqAssessmentItem[] = [
  {
    title: 'Learning Curve',
    desc: 'Understanding staleTime vs gcTime, query key serialization, cache invalidation strategies, and mutation lifecycles takes real investment. It\u2019s a paradigm shift from imperative fetching.',
  },
  {
    title: 'Bundle Size',
    desc: '~13KB gzipped for the core package. For a simple app with 2-3 API calls, this overhead isn\u2019t justified. Raw fetch is free.',
  },
  {
    title: 'Overkill for Simple Apps',
    desc: "If your app fetches data once on mount and rarely refetches, you're adding complexity without benefit. The ROI comes with apps that have frequent, overlapping, stale-prone data needs.",
  },
  {
    title: 'Not a Fetching Library',
    desc: "TanStack Query doesn't make HTTP requests \u2014 it manages async state. You still need fetch, axios, or graphql-request underneath. It's a layer on top, not a replacement.",
  },
  {
    title: 'Cache Invalidation Complexity',
    desc: '"Two hard things in CS: cache invalidation and naming things." TanStack Query gives you powerful tools, but deciding WHEN and WHAT to invalidate still requires careful thought.',
  },
  {
    title: 'Server-State Only',
    desc: "It doesn't manage UI state, form state, or client-only state. You still need Context, Zustand, or Redux for those concerns. It solves one problem brilliantly, not all problems.",
  },
  {
    title: 'Opinionated Defaults',
    desc: 'Aggressive refetching on window focus, retry=3, gcTime=5min can surprise newcomers. These defaults are good for most apps but require tuning for specific use cases.',
  },
  {
    title: 'SSR Complexity',
    desc: 'Server-side rendering requires hydration setup (prefetching, dehydration/rehydration). While well-supported, it adds configuration complexity compared to simpler data fetching.',
  },
]

// ── Decision framework ────────────────────────────────────────────
export interface TsqDecisionCategory {
  label: string
  /** [light, dark] accent color */
  color: readonly [string, string]
  monoLabel: string
  items: string[]
}

export const TSQ_DECISION_CATEGORIES: TsqDecisionCategory[] = [
  {
    label: 'Strong Yes',
    color: ['#0d9488', '#14b8a6'],
    monoLabel: '\u2726 STRONG YES',
    items: [
      'Multiple components consume the same API data',
      'Data should stay fresh without manual refetching',
      'You need optimistic updates or infinite scroll',
      'Building a dashboard, admin panel, or data-heavy SPA',
      'You want DevTools for debugging server state',
    ],
  },
  {
    label: 'Maybe',
    color: ['#d97706', '#f59e0b'],
    monoLabel: '\u25C9 MAYBE',
    items: [
      'Small app with 2-3 simple API calls',
      'Already using RTK Query (significant overlap)',
      'GraphQL with Apollo Client (has its own cache)',
      'Static site with minimal dynamic data',
    ],
  },
  {
    label: 'Skip It',
    color: ['#e11d48', '#f43f5e'],
    monoLabel: '\u2715 SKIP IT',
    items: [
      'App with zero server communication',
      'One-shot data loads with no caching needs',
      'Building a pure static marketing page',
      'Bundle size is an extreme constraint (<5KB budget)',
    ],
  },
]

// ── Mutation code example ─────────────────────────────────────────
export const TSQ_MUTATION_CODE = `// Mutations: the write side of TanStack Query
function CreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) =>
      fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
      }).then(r => r.json()),

    // \u26A1 Optimistic Update
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: ['posts']
      });
      const previous = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], (old) => [
        ...old,
        { ...newPost, id: 'temp-id', status: 'pending' },
      ]);
      return { previous };
    },

    // \u274C Rollback on error
    onError: (err, newPost, context) => {
      queryClient.setQueryData(
        ['posts'], context.previous
      );
    },

    // \u2705 Sync with server on success
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts']
      });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate({ title: 'New Post' })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Creating...' : 'Create Post'}
    </button>
  );
}`


export const guideDefinition: GuideDefinition = {
  id: 'tanstack-query',
  icon: '\u{1F504}',
  title: 'TanStack Query',
  startPageId: 'tsq-start',
  description:
    'Server state management with TanStack Query \u2014 caching, deduplication, and the async data layer React is missing.',
  order: 13,
  sections: TSQ_GUIDE_SECTIONS,
}

export { TSQ_START_PAGE_DATA as startPageData }
