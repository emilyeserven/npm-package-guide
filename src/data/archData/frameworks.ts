import type { FrameworkPageData } from './types'

/* ───────────────────────── FRAMEWORK DATA ───────────────────────── */

export const FRAMEWORK_PAGES: FrameworkPageData[] = [
  /* ── Next.js ─────────────────────────────────────── */
  {
    id: "nextjs",
    name: "Next.js",
    tagline: "The React meta-framework by Vercel",
    overview: "Next.js is the most popular React framework. It adds server-side rendering, file-system routing, API routes, and optimized builds on top of React. Developed by Vercel, it\u2019s become the default way to build production React apps \u2014 used by Netflix, TikTok, and Notion.",
    color: "#000000",
    accent: "#f5f5f5",
    darkAccent: "#171717",
    builtOn: ["React", "Node.js"],
    capabilities: [
      {
        id: "rendering",
        name: "Rendering Strategies",
        icon: "\u{1F5A5}\uFE0F",
        description: "Next.js supports multiple rendering strategies in a single app: Server-Side Rendering (SSR) generates HTML on each request, Static Site Generation (SSG) pre-builds pages at build time, and the App Router introduces React Server Components (RSC) that render on the server without sending JavaScript to the client.",
        keyPoints: [
          "SSR \u2014 HTML generated per-request, great for dynamic content",
          "SSG \u2014 HTML pre-built at build time, fastest possible load times",
          "React Server Components \u2014 server-only rendering that reduces client JavaScript",
          "Mix and match \u2014 different pages can use different strategies",
        ],
      },
      {
        id: "routing",
        name: "File-System Routing",
        icon: "\u{1F4C1}",
        description: "Instead of manually defining routes, Next.js maps your file structure to URL paths. Create a file at app/dashboard/page.tsx and it automatically becomes /dashboard. Nested folders create nested routes, and special files (layout.tsx, loading.tsx, error.tsx) handle common patterns.",
        keyPoints: [
          "Zero-config routing \u2014 file structure = URL structure",
          "Nested layouts \u2014 shared UI across route segments",
          "Loading and error states \u2014 built-in per-route",
          "Dynamic routes \u2014 [id] folder conventions for parameterized URLs",
        ],
      },
      {
        id: "data",
        name: "Data Fetching",
        icon: "\u{1F504}",
        description: "Next.js provides server-side data fetching using async Server Components. You can fetch data directly inside components that run on the server, eliminating the need for separate API endpoints for your own frontend. Data is fetched before HTML is sent to the client.",
        keyPoints: [
          "Server Components fetch data directly \u2014 no useEffect or client-side loading spinners",
          "Server Actions \u2014 call server-side functions from client components like RPC",
          "Automatic request deduplication and caching",
          "Streaming \u2014 send parts of the page as they become ready",
        ],
      },
      {
        id: "deployment",
        name: "Deployment & Optimization",
        icon: "\u{1F680}",
        description: "Next.js includes built-in image optimization, font optimization, script loading strategies, and bundle analysis. It deploys seamlessly to Vercel\u2019s platform but also supports self-hosting on any Node.js server or via Docker.",
        keyPoints: [
          "Image component \u2014 automatic resizing, lazy loading, and format conversion",
          "Vercel integration \u2014 zero-config deployment with edge functions",
          "Self-hostable \u2014 works on any Node.js server or Docker container",
          "Bundle optimization \u2014 automatic code splitting per route",
        ],
      },
    ],
    pros: [
      "Most mature React framework \u2014 massive ecosystem, excellent documentation, huge community",
      "Multiple rendering strategies (SSR, SSG, RSC) in one framework",
      "Vercel provides seamless deployment with edge functions and analytics",
      "Built-in optimizations for images, fonts, and scripts out of the box",
    ],
    cons: [
      "Tight coupling with Vercel \u2014 some features work best (or only) on Vercel\u2019s platform",
      "App Router complexity \u2014 React Server Components add a new mental model to learn",
      "Caching behavior can be surprising and hard to debug",
      "Frequent breaking changes between major versions",
    ],
    bestFor: "Production React applications that need SEO, fast initial loads, and a mature ecosystem. Next.js is the safe, well-documented choice for most React projects, especially if you\u2019re deploying to Vercel.",
    analogy: "Next.js is like Spring Boot for React \u2014 it takes the core library and adds all the production infrastructure you\u2019d otherwise assemble yourself: routing, server rendering, build optimization, and deployment tooling.",
  },

  /* ── React Router Framework Mode ─────────────────── */
  {
    id: "react-router",
    name: "React Router Framework Mode",
    tagline: "Full-stack mode of React Router v7",
    overview: "React Router v7 introduced \u2018Framework Mode\u2019 \u2014 transforming the most popular React routing library into a full-stack framework. It\u2019s the spiritual successor to Remix (which merged into React Router), built on web standards like the Fetch API, FormData, and HTTP caching. It\u2019s the web-standards-first alternative to Next.js.",
    color: "#f44250",
    accent: "#fff5f5",
    darkAccent: "#450a0a",
    builtOn: ["React", "Node.js"],
    capabilities: [
      {
        id: "routing",
        name: "Nested Routing",
        icon: "\u{1F9E9}",
        description: "React Router pioneered nested routing in the React ecosystem. In Framework Mode, each route segment can define its own data loader, action handler, and error boundary. The layout hierarchy is explicit, and multiple route segments can load data in parallel.",
        keyPoints: [
          "Nested routes with parallel data loading \u2014 no waterfalls",
          "Each route segment has its own loader, action, and error boundary",
          "URL-based state \u2014 the URL is the primary source of truth",
          "Type-safe route definitions and parameters",
        ],
      },
      {
        id: "data",
        name: "Loaders & Actions",
        icon: "\u{1F504}",
        description: "Data flows through loaders (GET requests) and actions (mutations). Loaders run on the server before rendering, and actions handle form submissions and mutations. This model mirrors how traditional web apps work \u2014 built on web standard Request/Response objects.",
        keyPoints: [
          "Loaders \u2014 server-side functions that provide data for each route",
          "Actions \u2014 handle form submissions and mutations using web standard FormData",
          "Automatic revalidation \u2014 after a mutation, affected loaders re-run automatically",
          "Progressive enhancement \u2014 forms work without JavaScript by default",
        ],
      },
      {
        id: "standards",
        name: "Web Standards",
        icon: "\u{1F310}",
        description: "React Router Framework Mode is built on web platform APIs: Fetch Request/Response, FormData, URL, Headers. Skills you learn transfer directly to other frameworks and to the platform itself. It avoids custom abstractions wherever a web standard exists.",
        keyPoints: [
          "Built on Fetch API Request/Response \u2014 not custom abstractions",
          "FormData for mutations \u2014 standard HTML forms enhanced progressively",
          "HTTP caching headers \u2014 leverage browser and CDN caching natively",
          "Runs on any JavaScript runtime \u2014 Node.js, Deno, Cloudflare Workers",
        ],
      },
      {
        id: "rendering",
        name: "Rendering Modes",
        icon: "\u{1F5A5}\uFE0F",
        description: "React Router supports SSR, static pre-rendering, and SPA mode. You can choose per-route whether to server-render or statically generate, and the SPA mode option lets you use it as a traditional client-side app without a server.",
        keyPoints: [
          "Server rendering \u2014 HTML on each request with hydration",
          "Static pre-rendering \u2014 generate HTML at build time for specific routes",
          "SPA mode \u2014 opt-out of server rendering entirely for traditional SPA deployment",
          "Flexible deployment \u2014 adapters for Node, Cloudflare, Deno, Vercel, and more",
        ],
      },
    ],
    pros: [
      "Web standards first \u2014 skills transfer to the platform and other frameworks",
      "Progressive enhancement \u2014 forms and navigation work without JavaScript",
      "Mature routing library \u2014 React Router has 10+ years of battle-testing",
      "Flexible deployment \u2014 not tied to any specific hosting provider",
    ],
    cons: [
      "Newer framework mode \u2014 smaller community and fewer tutorials than Next.js",
      "Remix-to-React-Router migration caused community confusion",
      "No built-in image optimization or static asset handling like Next.js",
      "Less opinionated \u2014 requires more decisions about project structure",
    ],
    bestFor: "Teams that value web standards, progressive enhancement, and vendor independence. Great if you already use React Router for client-side routing and want to add server rendering without switching to an entirely different framework.",
    analogy: "React Router Framework Mode is like upgrading from Express to Fastify \u2014 you keep the same mental model (routes, middleware, request/response) but gain built-in validation, better performance, and modern patterns. It respects the platform rather than abstracting it away.",
  },

  /* ── TanStack Start ──────────────────────────────── */
  {
    id: "tanstack-start",
    name: "TanStack Start",
    tagline: "Full-stack framework from the TanStack ecosystem",
    overview: "TanStack Start is the newest entry, built by Tanner Linsley (creator of TanStack Query, TanStack Router, and TanStack Table). It combines TanStack Router\u2019s type-safe routing with Vinxi (a Vite-based server framework) to create a full-stack React framework with best-in-class TypeScript support.",
    color: "#e8590c",
    accent: "#fff4ed",
    darkAccent: "#431407",
    builtOn: ["React", "Vite/Vinxi", "Node.js"],
    capabilities: [
      {
        id: "typesafety",
        name: "End-to-End Type Safety",
        icon: "\u{1F512}",
        description: "TanStack Start provides type-safe routing where route parameters, search params, loaders, and actions are all fully typed. TypeScript errors surface at build time if you reference a route that doesn\u2019t exist or pass wrong parameters. No codegen required \u2014 types are inferred from your route definitions.",
        keyPoints: [
          "Route params and search params are fully typed without codegen",
          "Loader return types flow into components automatically",
          "Type-safe navigation \u2014 invalid links are caught at compile time",
          "Leverages TanStack Router\u2019s industry-leading type inference",
        ],
      },
      {
        id: "data",
        name: "Server Functions",
        icon: "\u{1F504}",
        description: "TanStack Start uses \u2018server functions\u2019 \u2014 functions that you write in your component files but execute on the server. They\u2019re similar to Next.js Server Actions but integrated with TanStack Query for caching, invalidation, and optimistic updates.",
        keyPoints: [
          "Server functions \u2014 define server-side logic alongside your components",
          "Built-in TanStack Query integration for caching and state management",
          "Automatic optimistic updates and cache invalidation",
          "RPC-style calls \u2014 call server functions like regular async functions",
        ],
      },
      {
        id: "routing",
        name: "File-Based Routing",
        icon: "\u{1F4C1}",
        description: "Routes are defined in a file-based system with TanStack Router under the hood. The route tree is generated automatically, with full support for nested layouts, parallel data loading, and search parameter validation.",
        keyPoints: [
          "File-based route definitions with automatic tree generation",
          "Nested layouts with parallel data loading",
          "Search parameter validation and serialization built-in",
          "Powered by TanStack Router \u2014 the most type-safe React router",
        ],
      },
      {
        id: "ecosystem",
        name: "TanStack Ecosystem",
        icon: "\u{1F9F1}",
        description: "TanStack Start is designed to work seamlessly with the rest of the TanStack ecosystem: Query for server state, Table for data grids, Form for form handling, and Virtual for large lists. Each library is independent but optimized to work together.",
        keyPoints: [
          "TanStack Query \u2014 built-in integration for server state management",
          "TanStack Table, Form, Virtual \u2014 composable companion libraries",
          "Framework-agnostic design \u2014 potential to support non-React frameworks in the future",
          "Active development with rapid iteration",
        ],
      },
    ],
    pros: [
      "Best-in-class TypeScript support \u2014 end-to-end type safety without codegen",
      "Built on TanStack ecosystem \u2014 best-in-class data fetching, routing, and tables",
      "Vite-powered \u2014 fast development experience with HMR",
      "Smaller, focused API surface \u2014 less to learn compared to Next.js",
    ],
    cons: [
      "Very new \u2014 still in early development, API may change",
      "Smallest community and fewest learning resources of the four",
      "Requires familiarity with TanStack Router and TanStack Query concepts",
      "Production track record is limited compared to Next.js or React Router",
    ],
    bestFor: "TypeScript-heavy teams that want maximum type safety, projects already using TanStack Router or TanStack Query, and developers who want a modern Vite-native framework built from the ground up on current best practices.",
    analogy: "TanStack Start is like building a service with gRPC instead of REST \u2014 you get stronger contracts, better tooling, and end-to-end type safety, but it\u2019s newer and has a smaller ecosystem. It trades community size for technical precision.",
  },

  /* ── Remix ───────────────────────────────────────── */
  {
    id: "remix",
    name: "Remix",
    tagline: "Web standards-focused framework (now part of React Router)",
    overview: "Remix was a pioneering full-stack React framework created by the React Router team (Ryan Florence and Michael Jackson). It championed web standards, progressive enhancement, and nested routing. In 2024, Remix merged into React Router v7 as \u2018Framework Mode\u2019 \u2014 so Remix\u2019s ideas live on, but new projects should use React Router v7 directly.",
    color: "#3992ff",
    accent: "#f0f7ff",
    darkAccent: "#172554",
    builtOn: ["React", "Node.js"],
    capabilities: [
      {
        id: "philosophy",
        name: "Web Standards Philosophy",
        icon: "\u{1F310}",
        description: "Remix was built on a core belief: the web platform already has great APIs, and frameworks should use them rather than invent new ones. This means Fetch API Request/Response objects, standard HTML forms, HTTP caching, and browser-native navigation. Everything you learn transfers to the platform itself.",
        keyPoints: [
          "Built on web standard APIs \u2014 Request, Response, FormData, Headers",
          "Progressive enhancement \u2014 apps work without JavaScript, then enhance",
          "HTTP caching as a first-class optimization strategy",
          "Skills transfer to any web platform or framework",
        ],
      },
      {
        id: "data",
        name: "Loader/Action Pattern",
        icon: "\u{1F504}",
        description: "Remix pioneered the loader/action pattern for React apps: loaders run on the server to provide data for GET requests, and actions handle form submissions (POST/PUT/DELETE). After a mutation, all affected loaders automatically re-run to keep the UI in sync \u2014 no manual cache invalidation.",
        keyPoints: [
          "Loaders \u2014 co-located server-side data fetching for each route",
          "Actions \u2014 handle mutations using standard form submissions",
          "Automatic revalidation \u2014 loaders re-run after mutations",
          "Parallel data loading \u2014 nested routes fetch simultaneously, preventing waterfalls",
        ],
      },
      {
        id: "errors",
        name: "Error Handling",
        icon: "\u{1F6E1}\uFE0F",
        description: "Remix introduced per-route error boundaries: if a nested route crashes, only that section of the page shows an error \u2014 the rest stays functional. This is fundamentally better than full-page error screens and was later adopted by other frameworks.",
        keyPoints: [
          "Per-route error boundaries \u2014 errors are contained, not catastrophic",
          "Graceful degradation \u2014 parent layouts stay functional when child routes fail",
          "Expected errors vs. unexpected errors \u2014 different handling for each",
          "Pattern later adopted by Next.js App Router and other frameworks",
        ],
      },
      {
        id: "legacy",
        name: "Legacy & Migration",
        icon: "\u{1F4E6}",
        description: "Remix v2 was the final standalone release. The team merged Remix into React Router v7, making Framework Mode the official successor. Existing Remix v2 apps can migrate with minimal changes. New projects should start with React Router v7 Framework Mode directly.",
        keyPoints: [
          "Remix ideas live on in React Router v7 Framework Mode",
          "Remix v2 \u2192 React Router v7 migration is mostly mechanical",
          "Existing Remix apps continue to work but won\u2019t receive new features",
          "Understanding Remix helps you understand React Router Framework Mode",
        ],
      },
    ],
    pros: [
      "Pioneered patterns now adopted industry-wide (nested routing, loader/action, per-route errors)",
      "Web standards focus means skills transfer to any framework or the platform",
      "Progressive enhancement \u2014 apps work without JavaScript by default",
      "Clean mental model \u2014 data in (loaders) and data out (actions)",
    ],
    cons: [
      "Merged into React Router v7 \u2014 no longer a standalone framework for new projects",
      "Community fragmented by the Remix \u2192 React Router transition",
      "Fewer tutorials and resources compared to Next.js",
      "Historical context needed \u2014 many Remix resources reference outdated APIs",
    ],
    bestFor: "Understanding the ideas behind modern React frameworks. Even though new projects should use React Router v7, studying Remix teaches you the loader/action pattern, progressive enhancement, and web-standards-first thinking that influenced the entire ecosystem.",
    analogy: "Remix is like the Unix philosophy applied to web frameworks \u2014 small, composable primitives built on the platform. It\u2019s like choosing POSIX-standard tools over vendor-specific CLI tools: you learn transferable skills that work everywhere, not just in one ecosystem.",
  },
]
