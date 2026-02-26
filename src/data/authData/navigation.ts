import type { GuideSection, StartPageData, GuideManifest } from '../guideTypes'

export const AUTH_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['auth-start'] },
  { label: 'Foundations', ids: ['auth-core', 'auth-tokens', 'auth-jwt'] },
  { label: 'Protocols & Patterns', ids: ['auth-oauth', 'auth-pkce', 'auth-frontend', 'auth-refresh'] },
  { label: 'Advanced Patterns', ids: ['auth-rbac', 'auth-integration'] },
  { label: 'Security & Review', ids: ['auth-security', 'auth-quiz'] },
]

// ── Start page data ──────────────────────────────────────────────────

export const AUTH_START_PAGE_DATA: StartPageData = {
  subtitle: 'Authentication & Authorization \u2014 from zero to confident implementation.',
  tip: 'Designed for backend engineers who understand auth concepts server-side but need to implement them in a frontend context.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'The Big Picture',
      description: 'Understand the fundamental difference between authentication and authorization, with analogies and concrete examples.',
      jumpTo: 'auth-core',
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Tokens & Sessions',
      description: 'Learn how the browser remembers who you are \u2014 session-based vs token-based auth and when to use each.',
      jumpTo: 'auth-tokens',
    },
    {
      type: 'numbered',
      num: 3,
      title: 'JWTs Decoded',
      description: 'Examine the three parts of a JSON Web Token \u2014 header, payload, and signature \u2014 and understand what each does.',
      jumpTo: 'auth-jwt',
    },
    {
      type: 'numbered',
      num: 4,
      title: 'OAuth 2.0 & OIDC',
      description: 'Walk through the Authorization Code flow step by step and learn why PKCE matters for SPAs.',
      jumpTo: 'auth-oauth',
    },
    {
      type: 'numbered',
      num: 5,
      title: 'OAuth in Practice',
      description: 'Implement the Authorization Code flow with PKCE \u2014 the code your SPA actually runs during "Sign in with Google."',
      jumpTo: 'auth-pkce',
    },
    {
      type: 'numbered',
      num: 6,
      title: 'Frontend Patterns',
      description: 'Implement auth in React \u2014 token storage, context providers, protected routes, and silent refresh.',
      jumpTo: 'auth-frontend',
    },
    {
      type: 'numbered',
      num: 7,
      title: 'Token Lifecycle',
      description: 'Handle token expiry, refresh queuing, rotation, and error recovery without forcing users to re-login.',
      jumpTo: 'auth-refresh',
    },
    {
      type: 'bonus',
      title: 'Advanced Patterns',
      description: 'Role-based access control, backend integration, and the debugging skills that save hours.',
      sectionLabel: 'Advanced Patterns',
      subItemDescriptions: {
        'auth-rbac': 'Frontend RBAC patterns \u2014 permission hooks, gate components, and route guards \u2014 with backend code side by side.',
        'auth-integration': 'HttpOnly cookies end-to-end, CORS configuration, the BFF pattern, and debugging common auth failures.',
      },
    },
    {
      type: 'bonus',
      title: 'Security & Review',
      description: 'Threats to watch for, an implementation checklist, and a knowledge check to test your understanding.',
      sectionLabel: 'Security & Review',
      subItemDescriptions: {
        'auth-security': 'XSS, CSRF, token theft, and open redirects \u2014 the attacks that target auth and how to defend against them.',
        'auth-quiz': 'Eight questions to test what you\u2019ve learned across the guide.',
      },
    },
  ],
}

export const AUTH_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'auth',
    icon: '🔐',
    title: 'Auth for Frontend Engineers',
    startPageId: 'auth-start',
    description: 'Authentication & Authorization \u2014 from zero to confident implementation.',
    category: 'security',
    dateCreated: '2026-02-16',
    dateModified: '2026-02-26',
    sections: AUTH_GUIDE_SECTIONS,
  },
  startPageData: AUTH_START_PAGE_DATA,
}
