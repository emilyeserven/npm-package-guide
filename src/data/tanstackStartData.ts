import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Types ────────────────────────────────────────────────────────────

export interface TssFeature {
  id: string
  icon: string
  title: string
  description: string
  accent: string
  darkAccent: string
}

export interface TssArchLayer {
  id: string
  label: string
  description: string
  icon: string
  accent: string
  darkAccent: string
}

export interface TssFileNode {
  name: string
  type: 'file' | 'folder'
  description?: string
  highlight?: boolean
  children?: TssFileNode[]
}

export interface TssCodeTab {
  id: string
  label: string
  filename: string
  dotColor: string
  code: string
  description?: string
}

export interface TssCodeGroup {
  tabs: TssCodeTab[]
}

export interface TssComparisonRow {
  feature: string
  tanstackStart: string
  nextjs: string
  winner?: 'start' | 'next'
}

export interface TssWhenToUse {
  label: string
  color: string
  darkColor: string
  items: string[]
}

// ── Feature cards (Intro page) ──────────────────────────────────────

export const TSS_FEATURES: TssFeature[] = [
  {
    id: 'type-safety',
    icon: '🔒',
    title: 'End-to-End Type Safety',
    description: 'Fully inferred types from route params to server function responses.',
    accent: '#3b82f6',
    darkAccent: '#60a5fa',
  },
  {
    id: 'vite-powered',
    icon: '⚡',
    title: 'Vite-Powered',
    description: 'Instant HMR, optimized builds, and the entire Vite plugin ecosystem.',
    accent: '#22c55e',
    darkAccent: '#4ade80',
  },
  {
    id: 'streaming-ssr',
    icon: '🌊',
    title: 'Streaming SSR',
    description: 'Progressive page loading with built-in streaming hydration.',
    accent: '#06b6d4',
    darkAccent: '#22d3ee',
  },
  {
    id: 'deploy-anywhere',
    icon: '☁',
    title: 'Deploy Anywhere',
    description: 'Cloudflare, Vercel, Netlify, Node, Bun, Deno — your choice.',
    accent: '#a855f7',
    darkAccent: '#c084fc',
  },
  {
    id: 'server-functions',
    icon: '📡',
    title: 'Server Functions',
    description: 'Type-safe RPCs that replace the need for tRPC, GraphQL, or REST.',
    accent: '#f97316',
    darkAccent: '#fb923c',
  },
  {
    id: 'middleware',
    icon: '🧩',
    title: 'Composable Middleware',
    description: 'Chain authentication, logging, and context injection with full type safety.',
    accent: '#ec4899',
    darkAccent: '#f472b6',
  },
]

// ── Architecture layers ─────────────────────────────────────────────

export const TSS_ARCH_LAYERS: TssArchLayer[] = [
  {
    id: 'deploy',
    label: 'Deployment',
    description: 'Any JS runtime — Cloudflare, Vercel, Netlify, Node, Bun, Deno.',
    icon: '☁',
    accent: '#a855f7',
    darkAccent: '#c084fc',
  },
  {
    id: 'nitro',
    label: 'Nitro',
    description: 'Universal server engine — handles adapters, presets, and deployment targets.',
    icon: '⚡',
    accent: '#f97316',
    darkAccent: '#fb923c',
  },
  {
    id: 'start',
    label: 'TanStack Start',
    description: 'SSR, streaming, server functions, full-stack bundling, API routes.',
    icon: '◆',
    accent: '#2dd4bf',
    darkAccent: '#5eead4',
  },
  {
    id: 'router',
    label: 'TanStack Router',
    description: 'Type-safe file routing, nested layouts, search params, data loaders.',
    icon: '⟡',
    accent: '#3b82f6',
    darkAccent: '#60a5fa',
  },
  {
    id: 'vite',
    label: 'Vite',
    description: 'Lightning-fast HMR, optimized builds, plugin ecosystem.',
    icon: '▲',
    accent: '#22c55e',
    darkAccent: '#4ade80',
  },
]

// ── File tree ───────────────────────────────────────────────────────

export const TSS_FILE_TREE: TssFileNode[] = [
  {
    name: 'src/',
    type: 'folder',
    children: [
      {
        name: 'routes/',
        type: 'folder',
        children: [
          { name: '__root.tsx', type: 'file', description: 'root layout wrapping all pages', highlight: true },
          { name: 'index.tsx', type: 'file', description: 'home page at /', highlight: true },
          { name: 'about.tsx', type: 'file', description: 'page at /about' },
          {
            name: 'posts/',
            type: 'folder',
            children: [
              { name: 'index.tsx', type: 'file', description: 'list at /posts' },
              { name: '$postId.tsx', type: 'file', description: 'dynamic at /posts/:postId', highlight: true },
            ],
          },
        ],
      },
      {
        name: 'utils/',
        type: 'folder',
        children: [
          { name: 'posts.functions.ts', type: 'file', description: 'server function wrappers' },
          { name: 'posts.server.ts', type: 'file', description: 'server-only logic (DB, etc.)' },
        ],
      },
      { name: 'router.tsx', type: 'file', description: 'router configuration' },
      { name: 'routeTree.gen.ts', type: 'file', description: 'auto-generated route tree' },
    ],
  },
  { name: 'app.config.ts', type: 'file', description: 'TanStack Start configuration' },
  { name: 'tsconfig.json', type: 'file' },
  { name: 'package.json', type: 'file' },
]

// ── Code examples (tabbed) ──────────────────────────────────────────

export const TSS_CODE_EXAMPLES: Record<string, TssCodeGroup> = {
  routing: {
    tabs: [
      {
        id: 'file-based',
        label: 'File-Based Routes',
        filename: 'src/routes/index.tsx',
        dotColor: '#3b82f6',
        description: 'Routes are generated from your file structure. The route tree is auto-generated at routeTree.gen.ts — you never edit this file manually.',
        code: `export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return <h1>Welcome to TanStack Start</h1>
}`,
      },
      {
        id: 'dynamic-params',
        label: 'Dynamic Params',
        filename: 'src/routes/posts/$postId.tsx',
        dotColor: '#22c55e',
        description: 'Prefix a filename with $ to create a dynamic route parameter. The param is fully typed and available in loaders and components.',
        code: `export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    // params.postId is fully typed as string
    return fetchPost(params.postId)
  },
  component: PostPage,
})

function PostPage() {
  const post = Route.useLoaderData()
  return <article>{post.title}</article>
}`,
      },
      {
        id: 'search-params',
        label: 'Search Params',
        filename: 'src/routes/posts.tsx',
        dotColor: '#f97316',
        description: 'TanStack Router treats the URL as state. Search params get runtime validation and full type inference.',
        code: `const searchSchema = z.object({
  page: z.number().default(1),
  sort: z.enum(['newest', 'oldest']).default('newest'),
  q: z.string().optional(),
})

export const Route = createFileRoute('/posts')({
  validateSearch: searchSchema,
  component: PostsPage,
})

function PostsPage() {
  const { page, sort, q } = Route.useSearch()
  // All fully typed! page: number, sort: 'newest' | 'oldest'
  return <div>Page {page}, sorted by {sort}</div>
}`,
      },
      {
        id: 'nested-layouts',
        label: 'Nested Layouts',
        filename: 'src/routes/__root.tsx',
        dotColor: '#a855f7',
        description: 'The root route wraps your entire application. Nested directories automatically create layout boundaries.',
        code: `export const Route = createRootRoute({
  component: () => (
    <html lang="en">
      <body>
        <nav>{/* shared navigation */}</nav>
        <Outlet />
      </body>
    </html>
  ),
})`,
      },
    ],
  },
  'server-fns': {
    tabs: [
      {
        id: 'basic',
        label: 'Basic Usage',
        filename: 'src/utils/time.functions.ts',
        dotColor: '#3b82f6',
        description: 'Create a server function with createServerFn(). It runs on the server but can be called from anywhere.',
        code: `export const getServerTime = createServerFn()
  .handler(async () => {
    // This code ONLY runs on the server
    return new Date().toISOString()
  })

// Call from anywhere — client or server
const time = await getServerTime()`,
      },
      {
        id: 'validation',
        label: 'Input Validation',
        filename: 'src/utils/users.functions.ts',
        dotColor: '#22c55e',
        description: 'Validate inputs at runtime with Zod or any schema library. The validated type flows through to your handler automatically.',
        code: `const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
})

export const createUser = createServerFn({ method: 'POST' })
  .inputValidator(CreateUserSchema)
  .handler(async ({ data }) => {
    // data is typed as { name: string; email: string; role: 'admin' | 'user' }
    const user = await db.users.create(data)
    return user
  })`,
      },
      {
        id: 'http-methods',
        label: 'HTTP Methods',
        filename: 'src/utils/posts.functions.ts',
        dotColor: '#f97316',
        description: 'Server functions support GET and POST methods. GET functions can be cached and used with HTML forms.',
        code: `// GET — cacheable, safe for idempotent reads
export const getPosts = createServerFn({ method: 'GET' })
  .handler(async () => {
    return db.posts.findMany()
  })

// POST — for mutations and side effects
export const deletePost = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: postId }) => {
    await db.posts.delete(postId)
    return { success: true }
  })`,
      },
      {
        id: 'headers',
        label: 'Headers & Response',
        filename: 'src/utils/data.functions.ts',
        dotColor: '#a855f7',
        description: 'Access request headers and control response headers directly from within server functions.',
        code: `import {
  getRequestHeader,
  setResponseHeaders,
  setResponseStatus,
} from '@tanstack/react-start/server'

export const getCachedData = createServerFn({ method: 'GET' })
  .handler(async () => {
    const auth = getRequestHeader('Authorization')
    setResponseHeaders(new Headers({
      'Cache-Control': 'public, max-age=300',
    }))
    setResponseStatus(200)
    return fetchData()
  })`,
      },
    ],
  },
  middleware: {
    tabs: [
      {
        id: 'auth',
        label: 'Auth Middleware',
        filename: 'src/middleware/auth.ts',
        dotColor: '#3b82f6',
        description: 'Create an authentication middleware that verifies a session and injects the user into context.',
        code: `export const authMiddleware = createMiddleware({ type: 'function' })
  .server(async ({ next }) => {
    const session = await getUserSession()
    if (!session) {
      throw redirect({ to: '/login' })
    }
    // Inject typed context for downstream functions
    return next({ context: { user: session.user } })
  })`,
      },
      {
        id: 'using',
        label: 'Using Middleware',
        filename: 'src/utils/todos.functions.ts',
        dotColor: '#22c55e',
        description: 'Attach middleware to any server function. The injected context is fully typed.',
        code: `export const getTodos = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    // context.user is fully typed from authMiddleware!
    const todos = await todoRepository.get(context.user.id)
    return todos
  })`,
      },
      {
        id: 'composing',
        label: 'Composing Chains',
        filename: 'src/middleware/admin.ts',
        dotColor: '#f97316',
        description: 'Middleware can depend on other middleware, creating composable chains. Each layer adds its own typed context.',
        code: `// adminMiddleware depends on authMiddleware
export const adminMiddleware = createMiddleware({ type: 'function' })
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    // context.user is available from authMiddleware
    if (context.user.role !== 'admin') {
      throw new Error('Forbidden')
    }
    return next({
      context: { isAdmin: true }
    })
  })

// Using it: both user AND isAdmin are in context
const fn = createServerFn()
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    // context.user ✓  context.isAdmin ✓
  })`,
      },
    ],
  },
  'data-loading': {
    tabs: [
      {
        id: 'route-loaders',
        label: 'Route Loaders',
        filename: 'src/routes/posts/$postId.tsx',
        dotColor: '#3b82f6',
        description: 'Each route can define a loader that fetches data before the component renders. Call server functions directly from the loader.',
        code: `export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await getPost({ data: params.postId })
    return { post }
  },
  component: PostPage,
})

function PostPage() {
  const { post } = Route.useLoaderData()
  // post is fully typed, data is already loaded!
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  )
}`,
      },
      {
        id: 'tanstack-query',
        label: 'With TanStack Query',
        filename: 'src/routes/posts.tsx',
        dotColor: '#22c55e',
        description: 'For complex caching and background revalidation, integrate TanStack Query with your loaders.',
        code: `const postsQueryOptions = {
  queryKey: ['posts'],
  queryFn: () => getPosts(),
}

export const Route = createFileRoute('/posts')({
  loader: async ({ context }) => {
    // Prefetch during SSR/navigation
    await context.queryClient.ensureQueryData(postsQueryOptions)
  },
  component: PostsPage,
})

function PostsPage() {
  // SWR caching, background refetch, reactive updates
  const { data: posts } = useSuspenseQuery(postsQueryOptions)
  return <PostList posts={posts} />
}`,
      },
      {
        id: 'static',
        label: 'Static Server Fns',
        filename: 'src/utils/config.functions.ts',
        dotColor: '#f97316',
        description: 'For data that doesn\'t change at runtime, use static server functions. They execute at build time and cache the result as a static JSON asset.',
        code: `import { staticFunctionMiddleware } from
  '@tanstack/start-static-server-functions'

export const getSiteConfig = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    // Runs at BUILD TIME, result cached as static JSON
    return {
      siteName: 'My App',
      features: await loadFeatureFlags(),
    }
  })`,
      },
    ],
  },
  'getting-started': {
    tabs: [
      {
        id: 'quick-start',
        label: 'Quick Start',
        filename: 'terminal',
        dotColor: '#22c55e',
        description: 'Use degit to scaffold a new project instantly.',
        code: `npx degit TanStack/router/examples/react/start-basic my-app
cd my-app
npm install
npm run dev`,
      },
      {
        id: 'app-config',
        label: 'app.config.ts',
        filename: 'app.config.ts',
        dotColor: '#3b82f6',
        description: 'The main configuration file for TanStack Start. It extends Vite\'s config with Start-specific options.',
        code: `import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  // TanStack Start options
  server: {
    preset: 'node-server', // or 'cloudflare', 'vercel', etc.
  },
  // All Vite options are supported
  vite: {
    plugins: [],
  },
})`,
      },
      {
        id: 'dependencies',
        label: 'Key Dependencies',
        filename: 'package.json (excerpt)',
        dotColor: '#f97316',
        description: 'The core packages you\'ll need.',
        code: `{
  "dependencies": {
    "@tanstack/react-router": "^1.x",
    "@tanstack/react-start": "^1.x",
    "react": "^19.x",
    "react-dom": "^19.x"
  },
  "devDependencies": {
    "@tanstack/router-plugin": "^1.x",
    "typescript": "^5.x",
    "vite": "^6.x"
  }
}`,
      },
    ],
  },
}

// ── Comparison data ─────────────────────────────────────────────────

export const TSS_COMPARISON_FEATURES: TssComparisonRow[] = [
  { feature: 'Router', tanstackStart: 'TanStack Router (fully type-safe)', nextjs: 'App Router / Pages Router', winner: 'start' },
  { feature: 'Build Tool', tanstackStart: 'Vite', nextjs: 'Turbopack / Webpack', winner: 'start' },
  { feature: 'Type Safety', tanstackStart: 'End-to-end inferred types', nextjs: 'Manual typing required', winner: 'start' },
  { feature: 'Search Params', tanstackStart: 'First-class, validated, typed', nextjs: 'Basic string parsing', winner: 'start' },
  { feature: 'Server Functions', tanstackStart: 'createServerFn with middleware', nextjs: "Server Actions ('use server')" },
  { feature: 'SSR / Streaming', tanstackStart: 'Built-in streaming SSR', nextjs: 'Built-in streaming SSR' },
  { feature: 'React Server Components', tanstackStart: 'On the roadmap', nextjs: 'Full support', winner: 'next' },
  { feature: 'Image Optimization', tanstackStart: 'Bring your own', nextjs: 'Built-in next/image', winner: 'next' },
  { feature: 'Deployment', tanstackStart: 'Universal (Nitro)', nextjs: 'Vercel-optimized, others via adapters', winner: 'start' },
  { feature: 'Bundle Size', tanstackStart: 'Smaller, leaner bundles', nextjs: 'Larger baseline', winner: 'start' },
  { feature: 'Community / Ecosystem', tanstackStart: 'Growing rapidly', nextjs: 'Massive, mature ecosystem', winner: 'next' },
  { feature: 'Learning Curve', tanstackStart: 'Steeper (explicit is better)', nextjs: 'Gentler (more conventions)' },
  { feature: 'Incremental Adoption', tanstackStart: 'Adopt piece by piece', nextjs: 'All-or-nothing framework', winner: 'start' },
  { feature: 'Client-First DX', tanstackStart: 'Core philosophy', nextjs: 'Server-first by default', winner: 'start' },
]

export const TSS_PHILOSOPHY_START = `TanStack Start takes a <strong>client-first</strong> approach. The browser is the primary runtime, and the server is a tool you reach for when needed. Everything is <strong>explicit and composable</strong> — you see exactly what code runs where. The router treats the <strong>URL as application state</strong>, with search params as first-class citizens.`

export const TSS_PHILOSOPHY_NEXT = `Next.js takes a <strong>server-first</strong> approach with React Server Components. Components render on the server by default, and you opt into client interactivity with 'use client'. The framework is <strong>highly opinionated and convention-driven</strong> — image optimization, font loading, metadata, and caching are all built-in.`

export const TSS_WHEN_TO_USE: TssWhenToUse[] = [
  {
    label: 'Choose TanStack Start when you...',
    color: '#2dd4bf',
    darkColor: '#5eead4',
    items: [
      'Want end-to-end type safety without manual annotation',
      'Prefer explicit, composable patterns over framework magic',
      'Are building interactive, data-heavy SPAs that also need SSR',
      'Value deployment flexibility (not locked to any one host)',
      'Already use TanStack Router or TanStack Query',
      'Want server functions to replace tRPC / GraphQL / REST',
      'Need fine-grained control over caching and data fetching',
      'Prefer Vite\'s dev server speed and ecosystem',
    ],
  },
  {
    label: 'Next.js might be better when you...',
    color: '#94a3b8',
    darkColor: '#64748b',
    items: [
      'Need React Server Components today',
      'Want zero-config image optimization, fonts, and metadata',
      'Prioritize a massive ecosystem of examples and tutorials',
      'Are building content-heavy sites where SEO is the primary concern',
      'Need the stability of a well-established framework',
      'Your team prefers convention-over-configuration',
      'You\'re deploying primarily to Vercel',
    ],
  },
]

// ── Guide sections (sidebar & navigation) ───────────────────────────

export const TSS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['tss-start'] },
  { label: 'Core Concepts', ids: ['tss-intro', 'tss-architecture'] },
  { label: 'Routing & Server', ids: ['tss-routing', 'tss-server-fns', 'tss-middleware'] },
  { label: 'Integration', ids: ['tss-data-loading', 'tss-comparison', 'tss-getting-started'] },
]

// ── Start page data ─────────────────────────────────────────────────

export const TSS_START_PAGE_DATA: StartPageData = {
  subtitle: 'Full-stack React with TanStack Start — SSR, streaming, server functions, and type-safe middleware on Vite and Nitro.',
  tip: 'This guide covers TanStack Start from core concepts through deployment. Start with "What is Start?" for context, or jump to any section.',
  headingText: '◆ Learning TanStack Start',
  headingDescription: 'Follow the sections in order for a complete picture, or jump to what you need.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Core Concepts',
      description: 'Understand what TanStack Start is, its architecture stack, and project structure.',
      sectionLabel: 'Core Concepts',
      subItemDescriptions: {
        'tss-intro': 'What TanStack Start is, key features, and current status.',
        'tss-architecture': 'The 5-layer architecture stack: Vite, Router, Start, Nitro, and deployment.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Routing & Server',
      description: 'File-based routing, server functions with validation, and composable middleware.',
      sectionLabel: 'Routing & Server',
      subItemDescriptions: {
        'tss-routing': 'File-based routes, dynamic params, search params, and nested layouts.',
        'tss-server-fns': 'Type-safe server functions with input validation and HTTP methods.',
        'tss-middleware': 'Auth middleware, dependency injection, and middleware composition.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Integration',
      description: 'Data loading patterns, comparison with Next.js, and getting started.',
      sectionLabel: 'Integration',
      subItemDescriptions: {
        'tss-data-loading': 'Route loaders, TanStack Query integration, and static server functions.',
        'tss-comparison': 'Feature table, philosophy comparison, and when-to-use guide.',
        'tss-getting-started': 'Quick start commands, configuration, and key dependencies.',
      },
    },
  ],
  relatedGuides: ['tanstack-router', 'tanstack-query', 'tanstack-ai'],
}

// ── Guide manifest ──────────────────────────────────────────────────

export const TSS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'tanstack-start',
    icon: '\u25C6',
    title: 'TanStack Start',
    startPageId: 'tss-start',
    description: 'Full-stack React with TanStack Start \u2014 SSR, streaming, server functions, and type-safe middleware on Vite and Nitro.',
    category: 'frontend',
    sections: TSS_GUIDE_SECTIONS,
  },
  startPageData: TSS_START_PAGE_DATA,
}
