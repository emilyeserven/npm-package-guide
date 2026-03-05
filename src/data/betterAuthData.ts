import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'
import type { QuizQuestion } from '../components/mdx/QuizBase'

/* ───────────────────────── TYPES ───────────────────────── */

export interface BauthFeatureCard {
  label: string
  detail: string
}

export interface BauthPlugin {
  name: string
  desc: string
  cat: 'auth' | 'enterprise' | 'infra'
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface BauthComparisonFeature {
  name: string
  betterAuth: boolean | string
  authjs: boolean | string
  clerk: boolean | string
}

export interface BauthSessionStrategy {
  label: string
  desc: string
  color: string
}

/* ───────────────────────── OVERVIEW CARDS ───────────────────────── */

export const BAUTH_FEATURE_CARDS: BauthFeatureCard[] = [
  { label: 'TypeScript-first', detail: 'End-to-end type safety from server to client' },
  { label: 'Framework agnostic', detail: 'Hono, Express, Fastify, Elysia, TanStack Start, & more' },
  { label: 'Your database', detail: 'Drizzle, Prisma, MongoDB, raw SQL \u2014 your data stays yours' },
  { label: 'Plugin architecture', detail: 'Add 2FA, passkeys, orgs, SSO \u2014 each in ~3 lines' },
  { label: 'AI-friendly', detail: 'Ships with MCP server, Claude Code skills, llms.txt' },
  { label: 'Open source & free', detail: 'MIT licensed, YC-backed, active community' },
]

/* ───────────────────────── PLUGINS ───────────────────────── */

export const BAUTH_PLUGINS: BauthPlugin[] = [
  { name: 'twoFactor', desc: 'TOTP, backup codes, device trust', cat: 'auth', difficulty: 'easy' },
  { name: 'passkey', desc: 'WebAuthn / FIDO2 passwordless login', cat: 'auth', difficulty: 'easy' },
  { name: 'magicLink', desc: 'Email-based passwordless sign-in', cat: 'auth', difficulty: 'easy' },
  { name: 'emailOtp', desc: 'One-time password via email', cat: 'auth', difficulty: 'easy' },
  { name: 'phoneNumber', desc: 'SMS-based authentication', cat: 'auth', difficulty: 'medium' },
  { name: 'username', desc: 'Username/password credential auth', cat: 'auth', difficulty: 'easy' },
  { name: 'anonymous', desc: 'Guest sessions, convert later', cat: 'auth', difficulty: 'easy' },
  { name: 'organization', desc: 'Multi-tenant teams, roles, RBAC', cat: 'enterprise', difficulty: 'medium' },
  { name: 'sso', desc: 'SAML 2.0 & OIDC enterprise SSO', cat: 'enterprise', difficulty: 'hard' },
  { name: 'scim', desc: 'SCIM provisioning & directory sync', cat: 'enterprise', difficulty: 'hard' },
  { name: 'admin', desc: 'User management dashboard APIs', cat: 'enterprise', difficulty: 'medium' },
  { name: 'jwt', desc: 'JWT access tokens for APIs', cat: 'infra', difficulty: 'easy' },
  { name: 'bearer', desc: 'Bearer token authentication', cat: 'infra', difficulty: 'easy' },
  { name: 'apiKey', desc: 'API key issuance & validation', cat: 'infra', difficulty: 'easy' },
  { name: 'multiSession', desc: 'Multiple concurrent sessions', cat: 'infra', difficulty: 'medium' },
  { name: 'oauthProvider', desc: 'Become an OAuth 2.1 server', cat: 'infra', difficulty: 'hard' },
  { name: 'openAPI', desc: 'Auto-generate OpenAPI spec', cat: 'infra', difficulty: 'easy' },
]

/* ───────────────────────── COMPARISON TABLE ───────────────────────── */

export const BAUTH_COMPARISON_FEATURES: BauthComparisonFeature[] = [
  { name: 'Framework agnostic', betterAuth: true, authjs: false, clerk: false },
  { name: 'Type-safe client', betterAuth: true, authjs: 'partial', clerk: true },
  { name: 'Own your database', betterAuth: true, authjs: true, clerk: false },
  { name: 'Auto schema generation', betterAuth: true, authjs: false, clerk: 'n/a' },
  { name: 'Built-in 2FA', betterAuth: true, authjs: false, clerk: true },
  { name: 'Passkeys', betterAuth: true, authjs: 'partial', clerk: true },
  { name: 'Multi-tenancy / Orgs', betterAuth: true, authjs: false, clerk: true },
  { name: 'SSO / SAML', betterAuth: true, authjs: false, clerk: true },
  { name: 'Plugin system', betterAuth: true, authjs: false, clerk: false },
  { name: 'Stateless sessions', betterAuth: true, authjs: true, clerk: 'n/a' },
  { name: 'Open source', betterAuth: true, authjs: true, clerk: false },
  { name: 'Pre-built UI components', betterAuth: 'community', authjs: false, clerk: true },
  { name: 'Free tier', betterAuth: 'free', authjs: 'free', clerk: 'limited' },
]

/* ───────────────────────── SESSION STRATEGIES ───────────────────────── */

export const BAUTH_SESSION_STRATEGIES: BauthSessionStrategy[] = [
  { label: 'compact', desc: 'Base64url + HMAC. Smallest cookie size. Default.', color: '#22c55e' },
  { label: 'jwt', desc: 'Standard JWT. Readable, signed, not encrypted.', color: '#3b82f6' },
  { label: 'jwe', desc: 'Encrypted JWT. Maximum security. Larger cookie.', color: '#a855f7' },
]

/* ───────────────────────── QUIZ QUESTIONS ───────────────────────── */

export const BAUTH_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'Which of these is NOT a core advantage of BetterAuth over Clerk?',
    options: [
      'You own and host the database yourself',
      'It includes pre-built, polished sign-in UI components out of the box',
      'It works with any JavaScript/TypeScript framework',
      'It has a plugin architecture for extending functionality',
    ],
    answer: 1,
    explanation: 'BetterAuth is headless \u2014 it doesn\u2019t ship pre-built UI. Community projects like better-auth-ui provide shadcn-based components, but it\u2019s not built-in like Clerk\u2019s components. The trade-off is total control over your auth UI.',
  },
  {
    q: 'What does BetterAuth\u2019s CLI \'generate\' command do?',
    options: [
      'Generates random auth secrets',
      'Creates the database schema for your ORM based on your auth config and plugins',
      'Generates React components for sign-in/sign-up',
      'Creates API documentation for your endpoints',
    ],
    answer: 1,
    explanation: 'The generate command inspects your betterAuth() config \u2014 including any plugins you\u2019ve added \u2014 and outputs the correct schema (Drizzle, Prisma, etc.) so your ORM can migrate the database with the tables BetterAuth needs.',
  },
  {
    q: 'When might you still choose Clerk over BetterAuth?',
    options: [
      'You need SSO / SAML support',
      'You want polished pre-built auth UI with zero custom code',
      'You need multi-tenancy and organization management',
      'You want to use Drizzle ORM with your database',
    ],
    answer: 1,
    explanation: 'Clerk\u2019s pre-built, polished UI components are still its killer feature. If you want zero custom auth UI code and don\u2019t mind the vendor lock-in and pricing, Clerk is a great choice. BetterAuth matches Clerk on features like SSO and multi-tenancy, but it\u2019s headless \u2014 you build or source your own UI.',
  },
]

/* ───────────────────────── ARCHITECTURE DIAGRAM DATA ───────────────────────── */

export interface BauthArchBox {
  label: string
  sub: string
  x: number
  y: number
  w: number
  color: string
}

export interface BauthArchArrow {
  x1: number
  y1: number
  x2: number
  y2: number
}

export const BAUTH_ARCH_BOXES: BauthArchBox[] = [
  { label: 'React / TanStack Start', sub: 'Client', x: 130, y: 10, w: 180, color: '#3b82f6' },
  { label: 'createAuthClient()', sub: 'Auth Client SDK', x: 130, y: 85, w: 180, color: '#8b5cf6' },
  { label: '/api/auth/**', sub: 'BetterAuth Handler', x: 130, y: 160, w: 180, color: '#e879a0' },
  { label: 'Plugins', sub: '2FA, Passkey, Org\u2026', x: 350, y: 160, w: 140, color: '#f59e0b' },
  { label: 'Drizzle / Prisma', sub: 'DB Adapter', x: 80, y: 240, w: 150, color: '#22c55e' },
  { label: 'Redis / Memory', sub: 'Secondary Storage', x: 260, y: 240, w: 150, color: '#06b6d4' },
]

export const BAUTH_ARCH_ARROWS: BauthArchArrow[] = [
  { x1: 220, y1: 44, x2: 220, y2: 82 },
  { x1: 220, y1: 118, x2: 220, y2: 157 },
  { x1: 312, y1: 180, x2: 347, y2: 180 },
  { x1: 195, y1: 194, x2: 155, y2: 237 },
  { x1: 250, y1: 194, x2: 310, y2: 237 },
]

/* ───────────────────────── NAVIGATION ───────────────────────── */

export const BAUTH_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['ba-start'] },
  { label: 'Fundamentals', ids: ['ba-overview', 'ba-why', 'ba-architecture'] },
  { label: 'Setup', ids: ['ba-setup', 'ba-database'] },
  { label: 'Integration', ids: ['ba-client', 'ba-social', 'ba-tanstack'] },
  { label: 'Advanced', ids: ['ba-plugins', 'ba-sessions'] },
  { label: 'Reference', ids: ['ba-comparison'] },
]

// ── Start page data ──────────────────────────────────────────────────

export const BAUTH_START_PAGE_DATA: StartPageData = {
  subtitle: 'TypeScript auth from zero to enterprise \u2014 setup, plugins, sessions, and TanStack integration.',
  tip: 'Designed for backend engineers evaluating or adopting BetterAuth for TypeScript projects.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Core Concepts',
      description: 'Understand what BetterAuth is, why it exists, and how its server-client architecture works.',
      jumpTo: 'ba-overview',
    },
    {
      type: 'bonus',
      title: 'Setup & Database',
      description: 'Install BetterAuth, configure your server, mount the handler, and connect your database adapter.',
      sectionLabel: 'Setup',
      subItemDescriptions: {
        'ba-setup': 'Install, configure, and mount the auth handler on any framework.',
        'ba-database': 'Connect Drizzle, Prisma, MongoDB, or raw SQL \u2014 plus Redis for session caching.',
      },
    },
    {
      type: 'bonus',
      title: 'Integration',
      description: 'Use the client SDK, add social OAuth providers, and integrate with TanStack Start.',
      sectionLabel: 'Integration',
      subItemDescriptions: {
        'ba-client': 'Create the auth client, use reactive hooks, and leverage full type inference.',
        'ba-social': 'Add Google, GitHub, Discord, and custom OAuth providers.',
        'ba-tanstack': 'First-class TanStack Start integration with SSR cookie handling and route guards.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Plugins & Sessions',
      description: 'Explore the plugin ecosystem (2FA, passkeys, orgs, SSO) and session management strategies.',
      jumpTo: 'ba-plugins',
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Compare Alternatives',
      description: 'Feature-by-feature comparison of BetterAuth vs Auth.js and Clerk.',
      jumpTo: 'ba-comparison',
    },
  ],
}

export const BAUTH_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'better-auth',
    icon: '\u{1F510}',
    title: 'BetterAuth',
    startPageId: 'ba-start',
    description: 'The comprehensive TypeScript authentication framework \u2014 setup, plugins, sessions, social auth, and TanStack integration.',
    category: 'security',
    dateCreated: '2026-03-04',
    dateModified: '2026-03-05',
    sections: BAUTH_GUIDE_SECTIONS,
  },
  startPageData: BAUTH_START_PAGE_DATA,
}
