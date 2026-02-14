import type { NjaConcept } from './types'

export const NJA_CONCEPTS: NjaConcept[] = [
  {
    id: 'routing',
    title: 'Routing & URL Handling',
    icon: '\u{1F9ED}',  // 🧭
    color: '#6366f1',
    darkColor: '#818cf8',
    whatNextDoes:
      'Next.js uses file-system routing \u2014 drop a file in <code>/app</code> or <code>/pages</code> and it becomes a URL. Dynamic routes use <code>[brackets]</code>, catch-alls use <code>[...slug]</code>, and layouts nest automatically.',
    whatYouNeed:
      'A dedicated routing library on the frontend (React Router, TanStack Router, etc.). On the backend, you define route handlers manually (e.g., <code>app.get(\'/api/users/:id\', handler)</code>).',
    keyTerms: ['Route Parameters', 'Query Strings', 'Path Matching', 'Route Guards', 'Nested Routes', 'History API'],
    difficulty: 'beginner',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Define routes with <code>app.get()</code>, <code>app.post()</code>, etc. Use <code>express.Router()</code> for modular route files. Route parameters are accessed via <code>req.params</code>.',
        packages: ['express'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Declare routes with <code>fastify.get()</code> or use the <code>@fastify/autoload</code> plugin for file-system-based route loading. Supports JSON Schema validation out of the box.',
        packages: ['fastify', '@fastify/autoload'],
      },
    ],
  },
  {
    id: 'ssr',
    title: 'Server-Side Rendering (SSR)',
    icon: '\u{1F5A5}\uFE0F',  // 🖥️
    color: '#8b5cf6',
    darkColor: '#a78bfa',
    whatNextDoes:
      'Next.js can render React components on the server before sending HTML to the browser. With the App Router, components are Server Components by default \u2014 they run on the server, never ship JS to the client.',
    whatYouNeed:
      'Without Next.js, your React app is typically a Single Page Application (SPA) \u2014 an empty HTML shell that JavaScript fills in. If you need SSR, you\u2019d set up something like <code>ReactDOMServer.renderToString()</code> with a Node.js server, or just accept SPA trade-offs.',
    keyTerms: ['SSR vs CSR vs SSG', 'Hydration', 'Time to First Byte', 'Core Web Vitals', 'SEO'],
    difficulty: 'advanced',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Most internal apps work fine as SPAs. If you need SSR, call <code>ReactDOMServer.renderToString()</code> inside an Express handler and serve the resulting HTML. Consider a meta-framework like Remix if SSR is critical.',
        packages: ['react-dom/server'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Fastify can serve SSR responses using <code>@fastify/vite</code> or manual <code>ReactDOMServer</code> calls. For most cases an SPA with good loading states is sufficient.',
        packages: ['@fastify/vite', '@fastify/static'],
      },
    ],
  },
  {
    id: 'api-routes',
    title: 'API Routes / Route Handlers',
    icon: '\u{1F4E1}',  // 📡
    color: '#0ea5e9',
    darkColor: '#38bdf8',
    whatNextDoes:
      'Next.js lets you write backend API endpoints right alongside your frontend code in <code>/app/api/</code> folders. These run on the server and can talk to databases, external services, etc.',
    whatYouNeed:
      'A separate backend server (Express, Fastify, Koa, Hono, etc.) that defines REST or GraphQL endpoints. This server runs independently from your frontend.',
    keyTerms: ['REST API', 'HTTP Methods', 'Request/Response Cycle', 'Status Codes', 'JSON Parsing', 'API Versioning'],
    difficulty: 'intermediate',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'This is the biggest architectural shift. Every Next.js API route becomes an Express route handler. Group routes into modules with <code>express.Router()</code> and mount them on the app.',
        packages: ['express', 'express-async-errors'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Fastify routes support JSON Schema for request/response validation, automatic serialization, and lifecycle hooks. Use <code>@fastify/autoload</code> for automatic route registration from a directory.',
        packages: ['fastify', '@fastify/autoload', '@fastify/sensible'],
      },
    ],
  },
  {
    id: 'middleware',
    title: 'Middleware',
    icon: '\u{1F517}',  // 🔗
    color: '#14b8a6',
    darkColor: '#2dd4bf',
    whatNextDoes:
      'Next.js middleware (<code>middleware.ts</code>) runs BEFORE a request is completed. It can redirect, rewrite URLs, set headers, or check authentication \u2014 all at the edge.',
    whatYouNeed:
      'In Express/Fastify, middleware is a core concept \u2014 functions that execute in order during the request-response cycle. Auth checks, logging, CORS, body parsing \u2014 all middleware.',
    keyTerms: ['Request Pipeline', 'next() Function', 'Middleware Chain', 'Order of Execution', 'Error-Handling Middleware', 'Application-Level vs Router-Level Middleware'],
    difficulty: 'intermediate',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Express middleware is more flexible than Next.js middleware. Define functions and apply them globally with <code>app.use()</code> or per-route. Think of it as a conveyor belt \u2014 each middleware inspects or modifies the request.',
        packages: ['express', 'morgan', 'helmet'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Fastify uses hooks (<code>onRequest</code>, <code>preHandler</code>, <code>onSend</code>) rather than Express-style middleware. Hooks give you finer control over the request lifecycle and run in a defined order.',
        packages: ['fastify', '@fastify/auth'],
      },
    ],
  },
  {
    id: 'auth',
    title: 'Authentication & Session Management',
    icon: '\u{1F510}',  // 🔐
    color: '#f43f5e',
    darkColor: '#fb7185',
    whatNextDoes:
      'Libraries like NextAuth.js / Auth.js handle login flows, sessions, JWT tokens, and OAuth providers with minimal setup. Sessions can be stored in cookies that the server reads automatically.',
    whatYouNeed:
      'You\u2019ll implement auth yourself or use a library like Passport.js. This means: setting up session stores, configuring cookie settings, managing JWT creation/verification, handling refresh tokens, and protecting routes with auth middleware.',
    keyTerms: ['JWT (JSON Web Tokens)', 'Session vs Token Auth', 'OAuth 2.0 Flow', 'Refresh Tokens', 'Cookie Flags (HttpOnly, Secure, SameSite)', 'CORS Credentials', 'Password Hashing'],
    difficulty: 'advanced',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Use Passport.js for strategy-based authentication (local, OAuth, SAML). Pair with <code>express-session</code> for session-based auth or <code>jsonwebtoken</code> for JWT-based flows.',
        packages: ['passport', 'express-session', 'jsonwebtoken', 'bcrypt'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Use <code>@fastify/passport</code> (a Passport.js adapter) or <code>@fastify/jwt</code> for token-based auth. <code>@fastify/secure-session</code> provides encrypted cookie sessions.',
        packages: ['@fastify/passport', '@fastify/jwt', '@fastify/secure-session', '@fastify/cookie'],
      },
    ],
  },
  {
    id: 'data-fetching',
    title: 'Data Fetching & Caching',
    icon: '\u{1F504}',  // 🔄
    color: '#f59e0b',
    darkColor: '#fbbf24',
    whatNextDoes:
      'Next.js extends <code>fetch()</code> with automatic caching, revalidation, and deduplication. Server Components can fetch data directly. The framework manages cache invalidation with <code>revalidatePath</code>/<code>revalidateTag</code>.',
    whatYouNeed:
      'On the frontend, use a data-fetching library (TanStack Query, SWR, RTK Query) for caching, deduplication, and background refetching. On the backend, implement caching with Redis, in-memory stores, or HTTP cache headers (ETag, Cache-Control).',
    keyTerms: ['Cache Invalidation', 'Stale-While-Revalidate', 'ETags', 'Cache-Control Headers', 'Query Keys', 'Optimistic Updates', 'HTTP Caching Layers'],
    difficulty: 'intermediate',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Set proper HTTP cache headers (<code>Cache-Control</code>, <code>ETag</code>) on responses. For expensive queries, add a Redis caching layer with <code>ioredis</code>. Use <code>apicache</code> for simple in-memory route caching.',
        packages: ['ioredis', 'apicache'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Fastify\u2019s <code>@fastify/caching</code> plugin handles ETags and <code>Cache-Control</code> headers. For server-side caching, use <code>@fastify/redis</code> or <code>fastify-caching</code> with a Redis backend.',
        packages: ['@fastify/caching', '@fastify/redis', '@fastify/etag'],
      },
    ],
  },
  {
    id: 'env-config',
    title: 'Environment Variables & Configuration',
    icon: '\u2699\uFE0F',  // ⚙️
    color: '#64748b',
    darkColor: '#94a3b8',
    whatNextDoes:
      'Next.js splits env vars: <code>NEXT_PUBLIC_*</code> is exposed to the browser, everything else stays server-only. The framework handles this automatically at build time.',
    whatYouNeed:
      'With separate frontend/backend, you manage two <code>.env</code> files. Frontend vars are baked in at build time (Vite uses <code>VITE_*</code> prefix). Backend vars are loaded at runtime with <code>dotenv</code>. NEVER expose secrets to the frontend bundle.',
    keyTerms: ['.env Files', 'Build-Time vs Runtime Variables', 'Secret Management', 'dotenv', 'Config Validation'],
    difficulty: 'beginner',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Load env vars with <code>dotenv</code> at the top of your entry file. Validate required vars at startup with a schema library to fail fast on missing config.',
        packages: ['dotenv', 'zod'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Use <code>@fastify/env</code> which integrates <code>dotenv</code> and JSON Schema validation. Missing or invalid env vars cause the server to fail at startup with clear error messages.',
        packages: ['@fastify/env'],
      },
    ],
  },
  {
    id: 'cors',
    title: 'CORS (Cross-Origin Resource Sharing)',
    icon: '\u{1F310}',  // 🌐
    color: '#ec4899',
    darkColor: '#f472b6',
    whatNextDoes:
      'Since your frontend and API live on the same origin in Next.js, CORS is mostly a non-issue. The framework handles it behind the scenes.',
    whatYouNeed:
      'With separate frontend (<code>localhost:5173</code>) and backend (<code>localhost:3001</code>) servers, the browser will BLOCK cross-origin API requests by default. You MUST configure CORS on your backend to whitelist your frontend\u2019s origin.',
    keyTerms: ['Origin', 'Preflight Requests (OPTIONS)', 'Access-Control-Allow-Origin', 'Credentials Mode', 'Simple vs Preflighted Requests'],
    difficulty: 'intermediate',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Install the <code>cors</code> package, configure allowed origins, and set <code>credentials: true</code> if you\u2019re sending cookies. This is a 5-minute fix but a confusing error if you\u2019ve never seen it.',
        packages: ['cors'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Use <code>@fastify/cors</code> for the same functionality. It supports dynamic origin functions for multi-domain setups and handles preflight requests automatically.',
        packages: ['@fastify/cors'],
      },
    ],
  },
  {
    id: 'csp',
    title: 'Content Security Policy',
    icon: '\u{1F6E1}\uFE0F',  // 🛡️
    color: '#7c3aed',
    darkColor: '#a78bfa',
    whatNextDoes:
      'Next.js offers CSP support via <code>next.config.js</code> headers and a nonce-based system for inline scripts, but many teams skip CSP entirely because the framework makes it optional.',
    whatYouNeed:
      'Configure <code>Content-Security-Policy</code> headers manually on your backend or CDN. Define directives like <code>default-src</code>, <code>script-src</code>, <code>style-src</code>, and <code>connect-src</code>. Generate nonces for inline scripts and use <code>report-only</code> mode for safe rollout.',
    keyTerms: ['CSP Directives', 'Nonce', 'script-src', 'default-src', 'report-uri', 'report-to'],
    difficulty: 'intermediate',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Use <code>helmet</code> with its <code>contentSecurityPolicy()</code> middleware. Start with <code>Content-Security-Policy-Report-Only</code> to audit violations without breaking your app, then switch to enforcing mode once the policy is tuned.',
        packages: ['helmet'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Use <code>@fastify/helmet</code> which wraps the same Helmet library. Configure CSP directives in the plugin options. For nonce generation, use a <code>preHandler</code> hook to inject a unique nonce per request.',
        packages: ['@fastify/helmet'],
      },
    ],
  },
  {
    id: 'build-bundling',
    title: 'Build & Bundling Pipeline',
    icon: '\u{1F4E6}',  // 📦
    color: '#0891b2',
    darkColor: '#22d3ee',
    whatNextDoes:
      'Next.js uses Webpack/Turbopack internally. It handles code splitting, tree shaking, image optimization, font optimization, CSS extraction, and bundle analysis. You rarely configure it directly.',
    whatYouNeed:
      'Use Vite (or similar) for your frontend build. For the backend, use <code>tsx</code> for development and <code>tsc</code> or <code>tsup</code> for production builds. You\u2019ll need separate build scripts, Docker containers, and deployment pipelines for each piece.',
    keyTerms: ['Code Splitting', 'Tree Shaking', 'Bundle Analysis', 'Source Maps', 'Hot Module Replacement', 'Production vs Development Builds'],
    difficulty: 'intermediate',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Build the backend with <code>tsc</code> or <code>tsup</code> for production. Use <code>tsx</code> (a fast TypeScript executor) during development for instant reloads. Consider a monorepo tool to keep shared types in sync.',
        packages: ['tsx', 'tsup'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Same build tooling applies. Fastify\u2019s plugin system means most of your code is modular and easy to compile. Use <code>fastify-cli</code> for scaffolding and development.',
        packages: ['tsx', 'tsup', 'fastify-cli'],
      },
    ],
  },
  {
    id: 'error-handling',
    title: 'Error Handling & Boundaries',
    icon: '\u{1F6A8}',  // 🚨
    color: '#ef4444',
    darkColor: '#f87171',
    whatNextDoes:
      'Next.js provides <code>error.tsx</code> and <code>not-found.tsx</code> files for automatic error boundaries and 404 pages. Server-side errors are caught and displayed gracefully.',
    whatYouNeed:
      'Frontend: React Error Boundaries catch render errors. Backend: error-handling middleware catches thrown errors. You need to design a consistent error response format (status codes, error messages, error codes) for your API.',
    keyTerms: ['Error Boundary', 'try/catch', 'Global Error Handler', 'Error Response Format', '4xx vs 5xx Errors', 'Unhandled Promise Rejections', 'Process Error Events'],
    difficulty: 'intermediate',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Use a 4-argument error handler <code>(err, req, res, next)</code> registered last in the middleware chain. Design your API error format early: <code>{ error: { code: \'NOT_FOUND\', message: \'...\', status: 404 } }</code>.',
        packages: ['express-async-errors', 'http-errors'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Fastify has a built-in <code>setErrorHandler()</code> that catches all route errors. It also auto-generates 4xx/5xx responses with proper status codes. Use <code>@fastify/sensible</code> for convenient HTTP error constructors.',
        packages: ['@fastify/sensible', 'http-errors'],
      },
    ],
  },
  {
    id: 'database',
    title: 'Database Access & ORMs',
    icon: '\u{1F5C4}\uFE0F',  // 🗄️
    color: '#059669',
    darkColor: '#34d399',
    whatNextDoes:
      'Server Components and API routes can import Prisma/Drizzle and query databases directly. The framework ensures this code never reaches the client.',
    whatYouNeed:
      'Your backend owns all database access. Choose an ORM (Prisma, Drizzle, TypeORM) or a query builder (Knex). Implement connection pooling, migrations, and seed scripts. The frontend NEVER talks to the database \u2014 only through your API.',
    keyTerms: ['ORM', 'Connection Pooling', 'Migrations', 'Seeds', 'N+1 Query Problem', 'Transactions', 'Prepared Statements', 'SQL Injection Prevention'],
    difficulty: 'advanced',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Instantiate your ORM/query builder at startup, then inject or import it into route handlers. Define clear data access patterns and validate all inputs.',
        packages: ['prisma', 'drizzle-orm', 'knex'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Register the database client as a Fastify decorator (<code>fastify.decorate(\'db\', client)</code>) so every route can access it via <code>request.server.db</code>. This keeps connection management centralized.',
        packages: ['prisma', 'drizzle-orm', '@fastify/postgres'],
      },
      {
        framework: 'PostgreSQL',
        icon: '\u{1F418}',
        note: 'PostgreSQL is the most common choice for production workloads. Use Prisma or Drizzle ORM for type-safe queries, or <code>pg</code> (node-postgres) for raw SQL. Always enable connection pooling (built into Prisma, or use <code>pg-pool</code>).',
        packages: ['pg', 'prisma', 'drizzle-orm', 'pg-pool'],
      },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment & Infrastructure',
    icon: '\u{1F680}',  // 🚀
    color: '#d946ef',
    darkColor: '#e879f9',
    whatNextDoes:
      'Vercel deploys Next.js with zero config \u2014 serverless functions, edge network, automatic scaling, preview deployments. It\u2019s magic, but it\u2019s vendor lock-in.',
    whatYouNeed:
      'You deploy TWO things: a static frontend (CDN, S3, Nginx) and a running backend server (Docker, PM2, systemd). This means containers, reverse proxies, health checks, and monitoring \u2014 all managed by your team.',
    keyTerms: ['Docker', 'Reverse Proxy (Nginx)', 'Process Manager (PM2)', 'Health Checks', 'Load Balancing', 'CI/CD Pipelines', 'Static Hosting vs Server Hosting'],
    difficulty: 'advanced',
    stackNotes: [
      {
        framework: 'Express',
        icon: '\u{1F7E2}',
        note: 'Containerize with Docker, use PM2 or systemd as a process manager, and deploy behind Nginx as a reverse proxy. Docker Compose can run your frontend (Nginx serving static files) and backend (Node.js) as separate services.',
        packages: ['pm2'],
      },
      {
        framework: 'Fastify',
        icon: '\u26A1',
        note: 'Same deployment patterns apply. Fastify\u2019s built-in <code>fastify.listen()</code> is production-ready. Use <code>fastify-cli</code> for graceful shutdown handling. Fastify\u2019s lower overhead may reduce container resource requirements.',
        packages: ['fastify-cli', 'pm2'],
      },
      {
        framework: 'PostgreSQL',
        icon: '\u{1F418}',
        note: 'Run PostgreSQL in a managed service (AWS RDS, Google Cloud SQL, Supabase) or as a Docker container. For production, always use connection pooling via PgBouncer or the ORM\u2019s built-in pool.',
        packages: ['pg', 'pgbouncer'],
      },
    ],
  },
]
