import type { GlossaryCategory } from './types'

export const tanstackStartGlossary: GlossaryCategory[] = [
  {
    category: 'TanStack Start Core',
    terms: [
      {
        term: 'TanStack Start',
        definition: 'A full-stack React framework built on TanStack Router, Vite, and Nitro. Provides server functions, middleware, streaming SSR, and universal deployment.',
        linkId: 'tanstack-start-docs',
        sectionId: 'tss-intro',
      },
      {
        term: 'Server Function (createServerFn)',
        definition: 'A function created with <code>createServerFn()</code> that executes on the server but can be called from client code with full type safety across the network boundary.',
        linkId: 'tanstack-start-server-fns',
        sectionId: 'tss-server-fns',
      },
      {
        term: 'Middleware (TanStack Start)',
        definition: 'Composable server-side functions created with <code>createMiddleware()</code> that run before server functions. Used for authentication, logging, and typed dependency injection.',
        linkId: 'tanstack-start-middleware',
        sectionId: 'tss-middleware',
      },
      {
        term: 'Nitro',
        definition: 'A universal web server toolkit by the UnJS team. TanStack Start uses Nitro to deploy to any JavaScript runtime — Cloudflare Workers, Vercel, Netlify, Node.js, Deno, and Bun.',
        linkId: 'nitro-docs',
        sectionId: 'tss-architecture',
        guides: ['tanstack-start'],
      },
    ],
  },
  {
    category: 'TanStack Start Patterns',
    terms: [
      {
        term: 'Route Loader',
        definition: 'A function defined in the route config that runs before the route component renders. Fetches data in parallel with parent loaders, avoiding request waterfalls.',
        linkId: 'tanstack-start-docs',
        sectionId: 'tss-data-loading',
      },
      {
        term: 'Streaming SSR',
        definition: 'Server-side rendering that sends HTML to the browser in chunks as data becomes available, rather than waiting for all data before sending anything. TanStack Start includes built-in streaming hydration.',
        linkId: 'tanstack-start-docs',
        sectionId: 'tss-intro',
      },
      {
        term: 'app.config.ts',
        definition: 'The TanStack Start configuration file that extends Vite config with Start-specific options — server presets, deployment targets, and build configuration.',
        linkId: 'tanstack-start-docs',
        sectionId: 'tss-getting-started',
      },
    ],
  },
]
