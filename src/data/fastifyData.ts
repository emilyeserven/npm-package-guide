import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Types ───────────────────────────────────────────────────────────

export interface FastifyLifecycleStep {
  id: string
  label: string
  isHook: boolean
  description: string
}

export interface FastifyPlugin {
  id: string
  name: string
  description: string
  tag: 'essential' | 'recommended' | 'integration'
}

export interface FastifyServerPattern {
  id: string
  label: string
  description: string
  code: string
  filename: string
  lang: string
  tip: string
}

// ── Lifecycle Data ──────────────────────────────────────────────────

export const FASTIFY_LIFECYCLE_STEPS: FastifyLifecycleStep[] = [
  { id: 'incoming', label: 'Incoming Request', isHook: false, description: 'Raw HTTP request arrives at the server.' },
  { id: 'routing', label: 'Routing', isHook: false, description: 'Fastify resolves the route using the find-my-way radix-tree router in O(k) time.' },
  { id: 'onRequest', label: 'onRequest', isHook: true, description: 'First hook. Body not yet parsed. Perfect for auth token validation, logging, or CORS checks.' },
  { id: 'preParsing', label: 'preParsing', isHook: true, description: 'Before body parsing. Can transform or decompress the incoming stream.' },
  { id: 'parsing', label: 'Parsing', isHook: false, description: 'Request body is parsed according to the content type.' },
  { id: 'preValidation', label: 'preValidation', isHook: true, description: 'After parsing, before schema validation. Good for custom input sanitization.' },
  { id: 'validation', label: 'Validation', isHook: false, description: 'JSON Schema validation runs against params, query, body, and headers.' },
  { id: 'preHandler', label: 'preHandler', isHook: true, description: 'After validation, right before your handler. Most common hook for auth guards and permission checks.' },
  { id: 'handler', label: 'Handler', isHook: false, description: 'Your route handler runs. Return a value or use reply.send() to respond.' },
  { id: 'preSerialization', label: 'preSerialization', isHook: true, description: 'Before serializing the response payload. Can reshape output data.' },
  { id: 'onSend', label: 'onSend', isHook: true, description: 'After serialization. Can modify the final payload string or set custom headers.' },
  { id: 'response', label: 'Response', isHook: false, description: 'The HTTP response is sent to the client.' },
  { id: 'onResponse', label: 'onResponse', isHook: true, description: 'After response is sent. Fire-and-forget. Perfect for logging, metrics, or analytics.' },
]

// ── Security Plugins ────────────────────────────────────────────────

export const FASTIFY_SECURITY_PLUGINS: FastifyPlugin[] = [
  {
    id: 'helmet',
    name: '@fastify/helmet',
    description: 'Sets critical HTTP security headers \u2014 CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and more.',
    tag: 'essential',
  },
  {
    id: 'cors',
    name: '@fastify/cors',
    description: 'Configures Cross-Origin Resource Sharing. When your React app on localhost:5173 talks to Fastify on :3001, this makes it work.',
    tag: 'essential',
  },
  {
    id: 'rate-limit',
    name: '@fastify/rate-limit',
    description: 'Throttles requests per client. Prevents brute-force attacks on auth endpoints and protects against abusive traffic.',
    tag: 'essential',
  },
  {
    id: 'csrf',
    name: '@fastify/csrf-protection',
    description: 'CSRF token generation and verification. Critical if your SPA uses cookie-based auth.',
    tag: 'essential',
  },
  {
    id: 'cookie',
    name: '@fastify/cookie',
    description: 'Parses and sets cookies with optional secret-based signing. Foundation for session management and CSRF.',
    tag: 'recommended',
  },
  {
    id: 'jwt',
    name: '@fastify/jwt',
    description: 'JWT utilities using fast-jwt under the hood. Sign, verify, and decode tokens with Bearer or cookie strategies.',
    tag: 'recommended',
  },
  {
    id: 'secure-session',
    name: '@fastify/secure-session',
    description: 'Stateless encrypted sessions via sodium-native. No server-side store needed \u2014 perfect for horizontal scaling.',
    tag: 'recommended',
  },
  {
    id: 'sensible',
    name: '@fastify/sensible',
    description: 'Adds useful defaults: HTTP error constructors (reply.notFound()), assertions, reply.vary(), and ergonomic touches.',
    tag: 'recommended',
  },
]

// ── Server Patterns (Tabs) ──────────────────────────────────────────

export const FASTIFY_SERVER_PATTERNS: FastifyServerPattern[] = [
  {
    id: 'separate',
    label: 'Separate Servers',
    description: 'The simplest approach: Vite dev server serves the SPA, Fastify serves the API. In production, serve Vite build output via @fastify/static or a CDN.',
    code: `my-app/
├── api/                     ← Fastify server
│   ├── src/
│   │   ├── server.ts
│   │   ├── plugins/
│   │   └── routes/
│   └── package.json
│
├── web/                     ← Vite + React + TanStack Router
│   ├── src/
│   │   ├── main.tsx
│   │   ├── routes/
│   │   └── lib/api.ts       ← fetch wrapper pointing at API
│   ├── vite.config.ts
│   └── package.json
│
└── package.json             ← Workspace root`,
    filename: 'project structure',
    lang: 'layout',
    tip: 'This is the recommended pattern for most teams. Clean separation of concerns, independent deployability, and the simplest mental model.',
  },
  {
    id: 'unified',
    label: 'Unified Server',
    description: 'Run both from a single process using Vite\u2019s configureServer API. The community plugin fastify-vite-plugin simplifies this.',
    code: `import Fastify from 'fastify'
import { fastifyVitePlugin } from 'fastify-vite-plugin'

const app = Fastify({ logger: true })

// Register API routes FIRST
await app.register(import('./routes/api.js'), {
  prefix: '/api'
})

// Then the Vite SPA catch-all
await app.register(fastifyVitePlugin)

await app.listen({ port: 3000 })`,
    filename: 'server.ts',
    lang: 'TypeScript',
    tip: 'API routes take precedence because they\u2019re registered first. The Vite plugin adds a wildcard route for client-side routing.',
  },
  {
    id: 'fastify-vite',
    label: '@fastify/vite',
    description: 'The official @fastify/vite plugin integrates Vite\u2019s dev server and production bundle serving, with optional SSR support.',
    code: `import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'

const app = Fastify({ logger: true })

await app.register(FastifyVite, {
  root: import.meta.dirname,
  spa: true  // Pure SPA mode, no SSR
})

await app.vite.ready()
await app.listen({ port: 3000 })`,
    filename: 'server.js',
    lang: 'JavaScript',
    tip: 'In production, assets are served via @fastify/static automatically. Configure the Vite plugin from @fastify/vite/plugin.',
  },
]

// ── Plugin Tag Colors ───────────────────────────────────────────────

export const FASTIFY_TAG_COLORS = {
  essential: {
    bg: '#fef2f2', darkBg: 'rgba(245,107,107,0.12)',
    text: '#dc2626', darkText: '#f87171',
    border: '#fecaca', darkBorder: 'rgba(245,107,107,0.25)',
  },
  recommended: {
    bg: '#fefce8', darkBg: 'rgba(245,166,35,0.12)',
    text: '#ca8a04', darkText: '#fbbf24',
    border: '#fef08a', darkBorder: 'rgba(245,166,35,0.25)',
  },
  integration: {
    bg: '#ecfdf5', darkBg: 'rgba(93,232,197,0.12)',
    text: '#059669', darkText: '#34d399',
    border: '#a7f3d0', darkBorder: 'rgba(93,232,197,0.25)',
  },
} as const

// ── Navigation ──────────────────────────────────────────────────────

export const FASTIFY_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['fastify-start'] },
  { label: 'Foundations', ids: ['fastify-foundations', 'fastify-getting-started'] },
  { label: 'Plugin System', ids: ['fastify-plugins', 'fastify-lifecycle'] },
  { label: 'Validation & Security', ids: ['fastify-validation', 'fastify-security'] },
  { label: 'Integration', ids: ['fastify-vite-react', 'fastify-tanstack'] },
  { label: 'Production', ids: ['fastify-production', 'fastify-cheatsheet'] },
]

export const FASTIFY_START_PAGE_DATA: StartPageData = {
  subtitle: 'Foundations \u00b7 plugin system \u00b7 lifecycle hooks \u00b7 schema validation \u00b7 security \u00b7 Vite + React + TanStack integration.',
  tip: 'For frontend engineers who want to understand the backend framework their API is built on \u2014 or build one themselves.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Understand the Framework',
      description: 'Learn what makes Fastify fast, its core principles, and how to set up your first server with TypeScript.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'fastify-foundations': 'Architecture, performance model, and why Fastify outperforms Express at JSON serialization.',
        'fastify-getting-started': 'Minimal server setup with TypeScript, ESM, pino logger, and hot-reload via tsx.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Master the Plugin System',
      description: 'Internalize encapsulated scopes and the full request lifecycle \u2014 the two concepts that define Fastify development.',
      sectionLabel: 'Plugin System',
      subItemDescriptions: {
        'fastify-plugins': 'Plugins, decorators, encapsulation, and fastify-plugin for shared infrastructure.',
        'fastify-lifecycle': 'Request lifecycle hooks, application hooks, and the interactive lifecycle flow diagram.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Validate & Secure',
      description: 'Use JSON Schema for compiled validation and serialization, then wire up the essential security plugin stack.',
      sectionLabel: 'Validation & Security',
      subItemDescriptions: {
        'fastify-validation': 'JSON Schema validation, response whitelisting, and TypeBox for TypeScript-first schemas.',
        'fastify-security': 'Helmet, CORS, rate limiting, CSRF, JWT, and cookie-based auth \u2014 the full security baseline.',
      },
    },
    {
      type: 'bonus',
      title: 'Wire Up the Frontend',
      description: 'Connect Fastify to your Vite + React SPA and pair it with TanStack Query and Router.',
      sectionLabel: 'Integration',
      subItemDescriptions: {
        'fastify-vite-react': 'Three patterns for combining Fastify with Vite: separate servers, unified, and @fastify/vite.',
        'fastify-tanstack': 'API client setup, TanStack Query hooks, and TanStack Router loader integration.',
      },
    },
    {
      type: 'bonus',
      title: 'Ship to Production',
      description: 'Graceful shutdown, structured error handling, environment config, and a quick reference cheatsheet.',
      sectionLabel: 'Production',
      subItemDescriptions: {
        'fastify-production': 'Shutdown signals, error handlers, pino logging config, and @fastify/env validation.',
        'fastify-cheatsheet': 'API quick reference \u2014 instance, routing, request, reply, and lifecycle methods.',
      },
    },
  ],
  relatedGuides: ['nginx', 'tanstack-query', 'tanstack-router'],
}

export const FASTIFY_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'fastify',
    icon: '\u26A1',
    title: 'Fastify for Frontend Engineers',
    startPageId: 'fastify-start',
    description: 'A hands-on guide to the fastest Node.js framework \u2014 foundations, lifecycle, security scaffolding, and wiring it up with Vite + React + TanStack.',
    category: 'infrastructure',
    dateCreated: '2026-02-27',
    dateModified: '2026-02-27',
    sections: FASTIFY_GUIDE_SECTIONS,
  },
  startPageData: FASTIFY_START_PAGE_DATA,
}
