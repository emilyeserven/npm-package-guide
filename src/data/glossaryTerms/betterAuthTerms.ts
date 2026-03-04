import type { GlossaryCategory } from './index'

export const betterAuthGlossary: GlossaryCategory[] = [
  {
    category: 'Authentication',
    terms: [
      {
        term: 'BetterAuth',
        definition: 'A framework-agnostic, open-source authentication and authorization library for TypeScript with a plugin ecosystem for 2FA, passkeys, SSO, and more.',
        linkId: 'betterauth-docs',
        sectionId: 'ba-overview',
      },
      {
        term: 'Auth Handler',
        definition: 'A standard <code>Request → Response</code> function that BetterAuth exposes. Mounted as a catch-all route (e.g., <code>/api/auth/*</code>) on any backend framework.',
        linkId: 'betterauth-docs',
        sectionId: 'ba-architecture',
      },
      {
        term: 'Social Provider',
        definition: 'An OAuth 2.0 / OIDC identity provider (Google, GitHub, Discord, etc.) configured in BetterAuth for social sign-in.',
        linkId: 'betterauth-docs',
        sectionId: 'ba-social',
      },
      {
        term: 'Passkey',
        definition: 'A WebAuthn / FIDO2 credential for passwordless login. BetterAuth supports passkeys via the <code>passkey()</code> plugin.',
        linkId: 'betterauth-docs',
        sectionId: 'ba-plugins',
      },
    ],
  },
  {
    category: 'Architecture',
    terms: [
      {
        term: 'Database Adapter',
        definition: 'A connector that lets BetterAuth work with different ORMs (Drizzle, Prisma, MongoDB) or raw SQL connection strings.',
        linkId: 'betterauth-docs',
        sectionId: 'ba-database',
      },
      {
        term: 'Secondary Storage',
        definition: 'An optional high-speed store (typically Redis) used alongside the primary database for session caching and faster lookups.',
        linkId: 'betterauth-docs',
        sectionId: 'ba-database',
      },
      {
        term: 'Cookie Cache',
        definition: 'A BetterAuth session strategy that stores session data in cookies using compact, JWT, or JWE encoding to reduce database lookups.',
        linkId: 'betterauth-docs',
        sectionId: 'ba-sessions',
      },
    ],
  },
  {
    category: 'Plugins',
    terms: [
      {
        term: 'BetterAuth Plugin',
        definition: 'A modular extension that adds server endpoints, client methods, and database tables. Examples include <code>twoFactor()</code>, <code>passkey()</code>, and <code>organization()</code>.',
        linkId: 'betterauth-docs',
        sectionId: 'ba-plugins',
      },
      {
        term: 'tanstackStartCookies',
        definition: 'A BetterAuth plugin that ensures session cookies work correctly with TanStack Start\'s SSR cookie handling. Must be the last plugin in the array.',
        linkId: 'betterauth-docs',
        sectionId: 'ba-tanstack',
      },
    ],
  },
]
