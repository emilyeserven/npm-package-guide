import type { RegistryLink } from './index'

export const betterAuthLinks: RegistryLink[] = [
  {
    id: 'betterauth-docs',
    url: 'https://www.better-auth.com/docs',
    label: 'BetterAuth documentation',
    source: 'BetterAuth',
    desc: 'Official BetterAuth documentation covering setup, plugins, adapters, and client SDK.',
    tags: ['docs', 'free', 'guide:better-auth'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'betterauth-github',
    url: 'https://github.com/better-auth/better-auth',
    label: 'BetterAuth GitHub repository',
    source: 'GitHub',
    desc: 'Open-source BetterAuth repository with source code, issues, and community discussions.',
    tags: ['github', 'free', 'guide:better-auth'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'authjs-docs',
    url: 'https://authjs.dev',
    label: 'Auth.js documentation',
    source: 'Auth.js',
    desc: 'Official Auth.js (formerly NextAuth) documentation for comparison purposes.',
    tags: ['docs', 'free', 'guide:better-auth'],
    resourceCategory: 'Related Tools',
  },
  {
    id: 'clerk-docs',
    url: 'https://clerk.com/docs',
    label: 'Clerk documentation',
    source: 'Clerk',
    desc: 'Clerk authentication platform documentation for comparison purposes.',
    tags: ['docs', 'freemium', 'guide:better-auth'],
    resourceCategory: 'Related Tools',
  },
]
