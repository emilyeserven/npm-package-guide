import type { GuideSection, StartPageData, GuideManifest } from '../guideTypes'

export const NJA_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['nja-start'] },
  {
    label: 'Request Lifecycle',
    ids: ['nja-routing', 'nja-ssr', 'nja-api-routes', 'nja-middleware'],
  },
  {
    label: 'Security & Auth',
    ids: ['nja-auth', 'nja-cors', 'nja-csp'],
  },
  {
    label: 'Data & Config',
    ids: ['nja-data-fetching', 'nja-env-config', 'nja-database'],
  },
  {
    label: 'Build & Ship',
    ids: ['nja-build-bundling', 'nja-error-handling', 'nja-deployment'],
  },
]

// ── Start page data ──────────────────────────────────────────────────

export const NJA_START_PAGE_DATA: StartPageData = {
  subtitle: 'The backend & middleware concepts that fullstack frameworks abstract away \u2014 and how to handle them yourself.',
  tip: 'Designed for engineers moving from Next.js to a separated architecture with a standalone backend (Express, Fastify, etc.) and a React SPA frontend.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Request Lifecycle',
      description: 'How HTTP requests flow from URL to response when you no longer have a fullstack framework handling it.',
      sectionLabel: 'Request Lifecycle',
      subItemDescriptions: {
        'nja-routing': 'File-system routing vs. manual route definitions.',
        'nja-ssr': 'Server-side rendering vs. SPA trade-offs.',
        'nja-api-routes': 'Colocated API routes vs. a standalone backend server.',
        'nja-middleware': 'Next.js edge middleware vs. Express/Fastify middleware chains.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Security & Auth',
      description: 'Authentication, CORS, and content security policies that Next.js handled behind the scenes.',
      sectionLabel: 'Security & Auth',
      subItemDescriptions: {
        'nja-auth': 'Auth libraries vs. rolling your own session and token management.',
        'nja-cors': 'Same-origin vs. cross-origin and how to configure CORS.',
        'nja-csp': 'Content Security Policy headers for production deployments.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Data & Config',
      description: 'Fetching, caching, environment variables, and database access without framework magic.',
      sectionLabel: 'Data & Config',
      subItemDescriptions: {
        'nja-data-fetching': 'Framework-managed caching vs. client-side and server-side caching strategies.',
        'nja-env-config': 'Unified env vars vs. separate frontend/backend configuration.',
        'nja-database': 'Server Components with ORMs vs. a dedicated backend data layer.',
      },
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Build & Ship',
      description: 'Building, error handling, and deploying two separate applications instead of one.',
      sectionLabel: 'Build & Ship',
      subItemDescriptions: {
        'nja-build-bundling': 'Integrated build pipeline vs. separate frontend/backend builds.',
        'nja-error-handling': 'Automatic error boundaries vs. designing your own error strategy.',
        'nja-deployment': 'One-click Vercel deploys vs. Docker, Nginx, and your own infra.',
      },
    },
    {
      type: 'bonus',
      title: 'Resources',
      description: 'Checklists, glossary terms, and curated documentation for your migration.',
      customSubItems: [
        {
          title: '\u{1F9F1} Next.js Migration Checklist',
          description: 'A 6-phase checklist covering planning, backend setup, API migration, frontend refactor, DevOps, and testing.',
          jumpTo: 'nja-checklist',
        },
        {
          title: '\u{1F4DA} External Resources',
          description: 'Curated documentation, tutorials, and tools for separated architectures.',
          jumpTo: 'external-resources',
          jumpType: 'guide-filter',
        },
        {
          title: '\u{1F4D6} Glossary',
          description: 'Key terms for routing, middleware, auth, CORS, and deployment.',
          jumpTo: 'glossary',
          jumpType: 'guide-filter',
        },
      ],
    },
  ],
}

export const NJA_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'nextjs-abstractions',
    icon: '🧱',
    title: 'Next.js Abstractions',
    startPageId: 'nja-start',
    description: 'The backend & middleware concepts that Next.js abstracts away \u2014 and how to handle them yourself when separating frontend from backend.',
    category: 'frontend',
    sections: NJA_GUIDE_SECTIONS,
  },
  startPageData: NJA_START_PAGE_DATA,
}
