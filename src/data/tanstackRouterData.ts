import type { GuideSection, StartPageData } from './guideTypes'

// ── Types ────────────────────────────────────────────────────────────

export interface RouterColorSet {
  bg: string
  accent: string
  text: string
  badge: string
}

export interface ComparisonFeature {
  feature: string
  tanstack: string
  reactRouter: string
  reactFramework: string
  nextjs: string
}

export interface UniqueFeature {
  title: string
  desc: string
}

export type WeaknessSeverity = 'high' | 'medium' | 'low'

export interface Weakness {
  title: string
  desc: string
  severity: WeaknessSeverity
}

export interface UseCaseScenario {
  router: string
  color: string
  items: string[]
}

export interface RouterStat {
  num: string
  label: string
}

export interface Contender {
  badge: string
  color: string
  desc: string
}

export interface CodeExample {
  label: string
  code: string
}

export interface SectionCodeExamples {
  [key: string]: CodeExample[]
}

// ── Color palettes ──────────────────────────────────────────────────

export const ROUTER_COLORS: Record<string, RouterColorSet> = {
  tanstack: { bg: '#1a1a2e', accent: '#e94560', text: '#eaeaea', badge: '#e94560' },
  reactrouter: { bg: '#1a1a2e', accent: '#f44250', text: '#eaeaea', badge: '#f44250' },
  reactframework: { bg: '#1a1a2e', accent: '#3992ff', text: '#eaeaea', badge: '#3992ff' },
  nextjs: { bg: '#1a1a2e', accent: '#fff', text: '#eaeaea', badge: '#ffffff' },
}

export const SEVERITY_COLORS: Record<WeaknessSeverity, string> = {
  high: '#f87171',
  medium: '#facc15',
  low: '#4ade80',
}

// ── Overview data ───────────────────────────────────────────────────

export const OVERVIEW_STATS: RouterStat[] = [
  { num: '~12kb', label: 'Gzipped bundle' },
  { num: '100%', label: 'TypeScript type-safe' },
  { num: 'v1', label: 'Stable release' },
  { num: 'Vite', label: 'Built on Vite' },
]

export const FOUR_CONTENDERS: Contender[] = [
  { badge: 'TanStack Router', color: '#e94560', desc: 'Type-safe, client-first router with built-in caching and search param management' },
  { badge: 'React Router (Library)', color: '#f44250', desc: 'Classic client-side SPA routing \u2014 BrowserRouter, Routes, useNavigate' },
  { badge: 'React Router (Framework)', color: '#3992ff', desc: 'Framework mode (v7) \u2014 file-based routing, loaders, actions, SSR via Vite' },
  { badge: 'Next.js', color: '#fff', desc: 'Full-stack framework \u2014 App Router, RSC, SSR/SSG/ISR, Vercel-optimized' },
]

export const OVERVIEW_INTRO = 'TanStack Router is a <strong>client-first, fully type-safe router</strong> for React (and Solid) applications. Built by the same team behind TanStack Query, it was designed from scratch with TypeScript at its core \u2014 not bolted on as an afterthought.'

export const OVERVIEW_DETAIL = 'Unlike traditional routers that treat URLs as opaque strings, TanStack Router makes <em>every part</em> of your route \u2014 path params, search params, loaders, and context \u2014 fully typed and validated. Your IDE knows your entire route tree.'

// ── Type safety data ────────────────────────────────────────────────

export const TYPE_SAFETY_INTRO = 'TanStack Router\u2019s defining advantage: <strong>every route path, param, search param, and loader return type is inferred and validated by TypeScript</strong>. Mistype a path? TS error. Forget a required param? TS error. Pass the wrong type to a search param? Believe it or not, TS error.'

export const TYPE_SAFETY_TAKEAWAY = 'No other major React router validates your route paths, params, AND search params at compile time. TanStack Router is in a class of its own here.'

// ── Search params data ──────────────────────────────────────────────

export const SEARCH_PARAMS_INTRO = 'URL search params are often treated as second-class citizens. TanStack Router promotes them to a <strong>fully validated, serialized, typed state management layer</strong> \u2014 with schemas, defaults, pre/post processing, and structural sharing to prevent unnecessary re-renders.'

export const SEARCH_PARAMS_RR_DESC = 'Uses <code>useSearchParams()</code> which returns raw <code>URLSearchParams</code>. All values are strings. No validation, no schemas, no type-safety. You parse and validate manually.'

export const SEARCH_PARAMS_NEXT_DESC = 'Uses <code>useSearchParams()</code> with <code>.get()</code> returning <code>string | null</code>. No built-in validation or schema support. Requires manual parsing and third-party libs like <code>nuqs</code>.'

export const STRUCTURAL_SHARING_DESC = 'TanStack Router uses structural sharing on search params \u2014 if only <code>page</code> changes but <code>filters</code> stays the same, components subscribed only to <code>filters</code> won\u2019t re-render. This is borrowed from TanStack Query\u2019s approach and is unique to this router.'

// ── Data loading data ───────────────────────────────────────────────

export const DATA_LOADING_INTRO = 'TanStack Router has a built-in loader system with <strong>parallel execution</strong> (no waterfalls), built-in SWR-style caching, and first-class integration with TanStack Query for more advanced scenarios.'

export interface LoaderComparisonItem {
  badge: string
  color: string
  desc: string
}

export const LOADER_COMPARISONS: LoaderComparisonItem[] = [
  { badge: 'React Router (Framework)', color: '#3992ff', desc: 'Has loaders and actions (inherited from Remix). Loaders run before render, actions handle mutations. No built-in caching layer \u2014 you manage staleness yourself or add a library.' },
  { badge: 'React Router (Library)', color: '#f44250', desc: 'No built-in data loading. You fetch in components with useEffect or bring your own solution (TanStack Query, SWR, etc). Prone to waterfall fetching with nested routes.' },
  { badge: 'Next.js', color: '#fff', desc: 'Server Components fetch data during render. Has a fetch-level cache, Route Segment caching, and revalidation APIs. Very powerful but complex mental model with Cache Components, ISR, and PPR. Server-first philosophy.' },
]

// ── Routing data ────────────────────────────────────────────────────

export const ROUTING_INTRO = 'TanStack Router uniquely supports <strong>both file-based and code-based routing simultaneously</strong>. With file-based routing, a Vite plugin generates the route tree config, but you always retain full control.'

export interface RoutingComparisonItem {
  badge: string
  color: string
  desc: string
}

export const ROUTING_COMPARISONS: RoutingComparisonItem[] = [
  { badge: 'React Router (Library)', color: '#f44250', desc: 'Code-based only. JSX <code>&lt;Route&gt;</code> elements or <code>createBrowserRouter</code> config objects. No file-based option.' },
  { badge: 'Next.js', color: '#fff', desc: 'File-based only (App Router). Folder structure IS the route config. Magic files: <code>page.tsx</code>, <code>layout.tsx</code>, <code>loading.tsx</code>, <code>error.tsx</code>.' },
]

// ── Code splitting data ─────────────────────────────────────────────

export const CODE_SPLIT_INTRO = 'TanStack Router splits route code into <strong>critical</strong> (path parsing, validation, data loading) and <strong>non-critical</strong> (UI components, error boundaries). The critical path is always loaded; UI is lazy by default with file-based routing.'

export interface CodeSplitComparisonItem {
  label: string
  color: string
  text: string
}

export const CODE_SPLIT_COMPARISONS: CodeSplitComparisonItem[] = [
  { label: 'React Router (Library)', color: '#f44250', text: 'Manual. Use React.lazy() and Suspense yourself. No automatic splitting.' },
  { label: 'React Router (Framework)', color: '#3992ff', text: 'Partial automatic splitting via Vite. Loaders can be split from components.' },
  { label: 'Next.js', color: '#fff', text: 'Fully automatic. Each page/layout is a separate chunk. Server Components reduce client JS.' },
]

// ── Comparison table data ───────────────────────────────────────────

export const COMPARISON_INTRO = 'A comprehensive feature matrix across all four routing approaches.'

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  { feature: '100% Type-safe Routes', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u274C' },
  { feature: 'Type-safe Search Params', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u274C' },
  { feature: 'Search Param Validation', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u274C' },
  { feature: 'Search Param Schemas', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u274C' },
  { feature: 'Auto-completed Paths', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u274C' },
  { feature: 'Nested Layouts', tanstack: '\u2705', reactRouter: '\u2705', reactFramework: '\u2705', nextjs: '\u2705' },
  { feature: 'Parallel Route Loaders', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u2705', nextjs: '\u{1F7E1}' },
  { feature: 'Built-in Cache', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u2705' },
  { feature: 'File-based Routing', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u2705', nextjs: '\u2705' },
  { feature: 'Code-based Routing', tanstack: '\u2705', reactRouter: '\u2705', reactFramework: '\u2705', nextjs: '\u274C' },
  { feature: 'Auto Code Splitting', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u{1F7E1}', nextjs: '\u2705' },
  { feature: 'SSR Support', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u2705', nextjs: '\u2705' },
  { feature: 'RSC Support', tanstack: '\u{1F7E1}', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u2705' },
  { feature: 'Devtools', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u274C' },
  { feature: 'Structural Sharing', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u274C' },
  { feature: 'Pending UI States', tanstack: '\u2705', reactRouter: '\u{1F7E1}', reactFramework: '\u2705', nextjs: '\u2705' },
  { feature: 'Route Masking', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u274C' },
  { feature: 'Route Context (DI)', tanstack: '\u2705', reactRouter: '\u274C', reactFramework: '\u274C', nextjs: '\u274C' },
  { feature: 'Ecosystem Size', tanstack: '\u{1F7E1}', reactRouter: '\u2705', reactFramework: '\u2705', nextjs: '\u2705' },
  { feature: 'Stability / Maturity', tanstack: '\u{1F7E1}', reactRouter: '\u2705', reactFramework: '\u2705', nextjs: '\u2705' },
]

// ── Unique features data ────────────────────────────────────────────

export const UNIQUE_INTRO = 'Features that are unique to TanStack Router and not available (or not first-class) in React Router or Next.js:'

export const UNIQUE_FEATURES: UniqueFeature[] = [
  {
    title: 'Type-safe Search Param Schemas',
    desc: 'Define, validate, parse, and serialize search params with Zod/Valibot schemas. Get full autocomplete and type checking. No other router does this.',
  },
  {
    title: 'Structural Sharing for Search Params',
    desc: 'Borrowed from TanStack Query \u2014 only re-renders components when the specific search param they subscribe to changes, not when any param changes.',
  },
  {
    title: 'Route Context (Hierarchical DI)',
    desc: 'Inject typed context at any level of the route tree. Child routes inherit and extend parent context. Perfect for auth, themes, feature flags \u2014 fully typed.',
  },
  {
    title: 'Route Masking',
    desc: 'Show a different URL to the user than what\u2019s actually matched. Useful for modals, preview states, or cleaner URLs while maintaining deep-link capability.',
  },
  {
    title: 'Auto-completed Paths in <Link>',
    desc: 'TypeScript auto-completes valid route paths in <Link to="..."> \u2014 including dynamic segments. Typos are caught at compile time, not in production.',
  },
  {
    title: 'Dedicated Router DevTools',
    desc: 'A built-in devtools panel (like React Query DevTools) that lets you inspect route state, loaders, cache, search params, and errors in real time.',
  },
  {
    title: 'Search Param Middleware',
    desc: 'Pre- and post-process search params before they hit the URL or your component. Normalize, transform, or strip params declaratively.',
  },
  {
    title: 'loaderDeps \u2014 Reactive Loader Dependencies',
    desc: 'Declare which search params your loader depends on. The loader re-runs only when those specific deps change \u2014 not on every navigation.',
  },
]

// ── Weaknesses data ─────────────────────────────────────────────────

export const WEAKNESSES_INTRO = 'No tool is perfect. Here\u2019s an honest assessment of where TanStack Router falls short compared to the competition:'

export const WEAKNESSES: Weakness[] = [
  {
    title: 'Smaller Ecosystem & Community',
    desc: 'React Router has a decade of Stack Overflow answers, blog posts, and tutorials. Next.js has massive Vercel backing. TanStack Router\u2019s community, while growing fast, is significantly smaller. Finding help or examples can be harder.',
    severity: 'high',
  },
  {
    title: 'RSC Support Still In Progress',
    desc: 'React Server Components are the future of React\u2019s rendering model. TanStack Router (via TanStack Start) is working on RSC integration, but it\u2019s not yet fully shipped. Next.js has had RSC in production for years.',
    severity: 'high',
  },
  {
    title: 'TanStack Start is Still Maturing',
    desc: 'If you need full-stack features (SSR, server functions, streaming), you need TanStack Start \u2014 which hit RC recently but is still newer than Remix or Next.js for production workloads.',
    severity: 'medium',
  },
  {
    title: 'TypeScript Compilation Cost',
    desc: 'The aggressive type inference that makes TanStack Router great also means large route trees can slow down TypeScript\u2019s type checker. The docs include specific guidance on optimizing TS performance.',
    severity: 'medium',
  },
  {
    title: 'Learning Curve for Search Params',
    desc: 'The search param system is powerful but adds concepts (schemas, validation, middleware, structural sharing) that simpler routers don\u2019t require. Teams accustomed to raw URLSearchParams may need ramp-up time.',
    severity: 'low',
  },
  {
    title: 'Vite-Only (No Webpack/Turbopack)',
    desc: 'File-based routing requires the Vite plugin or TanStack Router CLI. If your project is locked into Webpack or Turbopack (e.g., existing Next.js), migration isn\u2019t straightforward.',
    severity: 'low',
  },
  {
    title: 'No Built-in Image/Font Optimization',
    desc: 'Next.js provides next/image, next/font, and other built-in optimizations. TanStack Router is a router \u2014 these concerns are left to you or other libraries.',
    severity: 'low',
  },
]

// ── Verdict data ────────────────────────────────────────────────────

export const VERDICT_INTRO = 'There\u2019s no universal winner \u2014 each approach excels in different scenarios. Here\u2019s a pragmatic guide:'

export const VERDICT_BOTTOM_LINE = 'If you\u2019re starting a new React project, value TypeScript, and want the most modern routing DX available \u2014 TanStack Router is worth serious evaluation. Its type safety and search param handling are genuinely years ahead of the alternatives. But if you need the largest ecosystem, battle-tested SSR, or RSC today, Next.js remains the pragmatic choice. React Router sits comfortably in between as a flexible, standards-based option.'

export const USE_CASE_SCENARIOS: UseCaseScenario[] = [
  {
    router: 'TanStack Router',
    color: '#e94560',
    items: [
      'TypeScript-heavy teams who want compile-time routing safety',
      'SPAs and client-heavy apps (dashboards, admin panels, internal tools)',
      'Projects that heavily use URL search params as state',
      'Teams already using TanStack Query who want tight integration',
      'Greenfield React projects where you want a modern, Vite-based stack',
    ],
  },
  {
    router: 'React Router (Library Mode)',
    color: '#f44250',
    items: [
      'Simple SPAs that don\u2019t need SSR or advanced data loading',
      'Teams with deep existing React Router knowledge',
      'Brownfield projects already using React Router v5/v6',
      'Prototypes and MVPs where minimal setup matters most',
    ],
  },
  {
    router: 'React Router (Framework Mode)',
    color: '#3992ff',
    items: [
      'Full-stack React apps that care about web standards & progressive enhancement',
      'Teams migrating from Remix who want SSR + loaders + actions',
      'Projects that want deep nested routing with data colocated per route',
      'Apps deployed to diverse hosting (not locked to Vercel)',
    ],
  },
  {
    router: 'Next.js',
    color: '#fff',
    items: [
      'SEO-critical sites (marketing, e-commerce, content-heavy)',
      'Teams that want RSC and server-first rendering today',
      'Projects that benefit from Vercel\u2019s deployment + edge optimization',
      'Large teams that need the biggest ecosystem and community support',
      'Apps requiring ISR, PPR, or advanced caching strategies',
    ],
  },
]

// ── Code examples ───────────────────────────────────────────────────

export const CODE_EXAMPLES: SectionCodeExamples = {
  typesafety: [
    {
      label: 'TanStack Router \u2014 Auto-complete & type checking',
      code: `// \u2705 TypeScript knows ALL valid paths
<Link to="/users/$userId" params={{ userId: "123" }} />
// \u274C TS Error: '/users/$userID' is not assignable
<Link to="/users/$userID" params={{ userID: "123" }} />
// \u2705 Search params are typed too
<Link to="/products" search={{ page: 1, sort: "price" }} />
// \u274C TS Error: 'sort' expects 'price' | 'name' | 'date'
<Link to="/products" search={{ page: 1, sort: "invalid" }} />`,
    },
    {
      label: 'React Router \u2014 String-based, no compile-time safety',
      code: `// \u26A0\uFE0F No type error \u2014 typos become runtime bugs
<Link to="/users/123">User</Link>
<Link to="/usets/123">User</Link>  // Oops, no warning
// \u26A0\uFE0F Search params are manual string parsing
const [searchParams] = useSearchParams();
const page = Number(searchParams.get("page")); // any`,
    },
    {
      label: 'Next.js \u2014 File-convention-based, limited type inference',
      code: `// Params come as Promise<{ slug: string }>
// but paths in <Link> are still untyped strings
<Link href="/users/123">User</Link>
<Link href="/usets/123">User</Link>  // No warning
// Search params: untyped
const searchParams = useSearchParams();
const page = searchParams.get("page"); // string | null`,
    },
  ],
  searchparams: [
    {
      label: 'TanStack Router \u2014 Search param schema with validation',
      code: `export const Route = createFileRoute('/products')({
  // Define schema \u2014 parsed, validated, typed automatically
  // Works with Zod, Valibot, ArkType, or custom validators
  validateSearch: (search) => ({
    page: Number(search.page) || 1,
    sort: ['price','name','date'].includes(search.sort) ? search.sort : 'name',
    filters: Array.isArray(search.filters) ? search.filters : [],
  }),
  component: ProductsPage,
})
function ProductsPage() {
  // \u2705 Fully typed: { page: number, sort: 'price'|'name'|'date', filters: string[] }
  const { page, sort, filters } = Route.useSearch()
  // \u2705 Type-safe updates
  const navigate = Route.useNavigate()
  navigate({ search: (prev) => ({ ...prev, page: prev.page + 1 }) })
}`,
    },
  ],
  dataloading: [
    {
      label: 'TanStack Router \u2014 Route loader with built-in cache',
      code: `export const Route = createFileRoute('/users/$userId')({
  // loaderDeps lets you declare reactive dependencies
  loaderDeps: ({ search: { tab } }) => ({ tab }),
  // Loader runs in parallel with parent loaders
  loader: async ({ params, deps }) => {
    const user = await fetchUser(params.userId)
    const details = await fetchDetails(params.userId, deps.tab)
    return { user, details }
  },
  component: UserPage,
})
function UserPage() {
  const { user, details } = Route.useLoaderData() // \u2705 Fully typed
}`,
    },
  ],
  routing: [
    {
      label: 'TanStack Router \u2014 File-based route structure',
      code: `src/routes/
\u251C\u2500\u2500 __root.tsx          // Root layout
\u251C\u2500\u2500 index.tsx           // /
\u251C\u2500\u2500 about.tsx           // /about
\u251C\u2500\u2500 users/
\u2502   \u251C\u2500\u2500 index.tsx       // /users
\u2502   \u2514\u2500\u2500 $userId.tsx     // /users/:userId
\u2514\u2500\u2500 _auth/              // Pathless layout group
    \u251C\u2500\u2500 route.tsx       // Auth layout wrapper
    \u251C\u2500\u2500 login.tsx       // /login (under auth layout)
    \u2514\u2500\u2500 register.tsx    // /register (under auth layout)`,
    },
    {
      label: 'TanStack Router \u2014 Code-based (explicit route tree)',
      code: `const rootRoute = createRootRoute({ component: App })
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})
const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  component: UserPage,
})
const routeTree = rootRoute.addChildren([indexRoute, userRoute])`,
    },
  ],
  codesplit: [
    {
      label: 'Automatic code splitting with file-based routing',
      code: `// With file-based routing, TanStack auto-splits:
// \u2705 Critical path: route config, validation, loaders \u2192 always loaded
// \u2705 Non-critical: component, pendingComponent, errorComponent \u2192 lazy
// Or manually with .lazy.tsx files:
// routes/users.tsx        \u2192 loader, search validation (critical)
// routes/users.lazy.tsx   \u2192 component code (lazy loaded)`,
    },
  ],
}

// ── Lookup helper ───────────────────────────────────────────────────

export type TsrTopicId = 'overview' | 'typesafety' | 'searchparams' | 'dataloading' | 'routing' | 'codesplit' | 'comparison' | 'unique' | 'weaknesses' | 'verdict'

// ── Navigation ──────────────────────────────────────────────────────

export const TSR_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['tsr-start'] },
  { label: 'Core Concepts', ids: ['tsr-overview', 'tsr-typesafety', 'tsr-searchparams'] },
  { label: 'Architecture', ids: ['tsr-dataloading', 'tsr-routing', 'tsr-codesplit'] },
  { label: 'Comparison', ids: ['tsr-comparison', 'tsr-unique', 'tsr-weaknesses', 'tsr-verdict'] },
]

// ── Start page data ─────────────────────────────────────────────────

export const TSR_START_PAGE_DATA: StartPageData = {
  subtitle: 'A deep comparison of TanStack Router vs React Router vs Next.js \u2014 type safety, search params, data loading, and when to use what.',
  tip: 'This guide compares four routing approaches for React apps. Start with the overview, then explore each feature area.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Core Concepts',
      description: 'Understand what TanStack Router is and what makes it unique \u2014 type safety, search param management, and its position in the ecosystem.',
      sectionLabel: 'Core Concepts',
      subItemDescriptions: {
        'tsr-overview': 'What TanStack Router is, key stats, and the four routing contenders.',
        'tsr-typesafety': 'The killer feature \u2014 compile-time route path, param, and search param validation.',
        'tsr-searchparams': 'State-manager-grade search params with schemas, validation, and structural sharing.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Architecture',
      description: 'How TanStack Router handles data loading, route definitions, and code splitting compared to alternatives.',
      sectionLabel: 'Architecture',
      subItemDescriptions: {
        'tsr-dataloading': 'Built-in loaders with parallel execution and SWR-style caching.',
        'tsr-routing': 'File-based and code-based routing support simultaneously.',
        'tsr-codesplit': 'Automatic critical/non-critical code splitting.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Comparison',
      description: 'Head-to-head feature matrix, unique capabilities, honest weaknesses, and practical guidance on when to use each router.',
      sectionLabel: 'Comparison',
      subItemDescriptions: {
        'tsr-comparison': 'Full 20-feature comparison table across all four routing approaches.',
        'tsr-unique': 'Eight features only available in TanStack Router.',
        'tsr-weaknesses': 'Honest trade-offs with severity ratings.',
        'tsr-verdict': 'Pragmatic use-case recommendations for each router.',
      },
    },
  ],
}
