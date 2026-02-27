import type { RegistryLink } from './types'

export const webhooksLinks: RegistryLink[] = [
  // ─── Provider documentation ─────────────────────────────────────────
  {
    id: 'wh-stripe-webhooks',
    url: 'https://docs.stripe.com/webhooks',
    label: 'Stripe Webhooks',
    source: 'Stripe',
    desc: 'Stripe\u2019s webhook documentation \u2014 the gold standard for provider UX, covering endpoint setup, verification, and testing',
    tags: ['docs', 'free', 'guide:webhooks'],
    resourceCategory: 'Provider Documentation',
  },
  {
    id: 'wh-github-webhooks',
    url: 'https://docs.github.com/en/webhooks',
    label: 'GitHub Webhooks',
    source: 'GitHub',
    desc: 'GitHub\u2019s webhook documentation for repository and organization events',
    tags: ['docs', 'free', 'guide:webhooks'],
    resourceCategory: 'Provider Documentation',
  },

  // ─── Infrastructure & tools ─────────────────────────────────────────
  {
    id: 'wh-svix-docs',
    url: 'https://docs.svix.com/',
    label: 'Svix Documentation',
    source: 'Svix',
    desc: 'Open-source webhook delivery infrastructure with built-in retries, signature verification, and consumer management',
    tags: ['docs', 'free', 'open-source', 'guide:webhooks'],
    resourceCategory: 'Libraries & Tools',
  },
  {
    id: 'wh-hookdeck',
    url: 'https://hookdeck.com/docs',
    label: 'Hookdeck',
    source: 'Hookdeck',
    desc: 'Managed webhook infrastructure \u2014 automatic retries, signature verification, delivery monitoring, and replay capabilities',
    tags: ['tool', 'free', 'guide:webhooks'],
    resourceCategory: 'Libraries & Tools',
  },
  {
    id: 'wh-ngrok',
    url: 'https://ngrok.com/docs',
    label: 'ngrok',
    source: 'ngrok',
    desc: 'The most popular tunneling tool for exposing local servers to the internet \u2014 essential for local webhook development',
    tags: ['tool', 'free', 'guide:webhooks'],
    resourceCategory: 'Libraries & Tools',
  },
  {
    id: 'wh-bullmq',
    url: 'https://docs.bullmq.io/',
    label: 'BullMQ',
    source: 'BullMQ',
    desc: 'Redis-based job queue for Node.js with built-in retry, backoff, rate limiting, and job prioritization',
    tags: ['tool', 'free', 'open-source', 'guide:webhooks'],
    resourceCategory: 'Libraries & Tools',
  },
  {
    id: 'wh-inngest',
    url: 'https://www.inngest.com/docs',
    label: 'Inngest',
    source: 'Inngest',
    desc: 'Serverless event-driven functions with automatic retries, scheduling, and fan-out \u2014 no queue infrastructure to manage',
    tags: ['tool', 'free', 'guide:webhooks'],
    resourceCategory: 'Libraries & Tools',
  },

  // ─── Framework documentation ────────────────────────────────────────
  {
    id: 'wh-hono',
    url: 'https://hono.dev/',
    label: 'Hono',
    source: 'Hono',
    desc: 'Lightweight web framework for edge and Node.js environments \u2014 a popular choice for webhook endpoints',
    tags: ['docs', 'free', 'open-source', 'guide:webhooks'],
    resourceCategory: 'Frameworks',
  },
  {
    id: 'wh-tanstack-query',
    url: 'https://tanstack.com/query/latest',
    label: 'TanStack Query',
    source: 'TanStack',
    desc: 'Data fetching and caching library for React \u2014 refetching and cache invalidation patterns work well with webhook-driven updates',
    tags: ['docs', 'free', 'open-source', 'guide:webhooks'],
    resourceCategory: 'Frameworks',
  },

  // ─── Security references ────────────────────────────────────────────
  {
    id: 'wh-mdn-subtle-crypto',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto',
    label: 'Web Crypto API (SubtleCrypto)',
    source: 'MDN',
    desc: 'MDN reference for the Web Crypto API \u2014 the modern way to perform cryptographic operations in JavaScript',
    tags: ['docs', 'free', 'guide:webhooks'],
    resourceCategory: 'Security',
  },
  {
    id: 'wh-owasp-webhook',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Webhook_Security_Cheat_Sheet.html',
    label: 'OWASP Webhook Security Cheat Sheet',
    source: 'OWASP',
    desc: 'OWASP best practices for securing webhook endpoints \u2014 covers signature verification, replay prevention, and input validation',
    tags: ['docs', 'free', 'guide:webhooks'],
    resourceCategory: 'Security',
  },
  {
    id: 'wh-mdn-sse',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events',
    label: 'Server-Sent Events (SSE)',
    source: 'MDN',
    desc: 'MDN reference for Server-Sent Events \u2014 one-way real-time push from server to browser, commonly used to relay webhook events',
    tags: ['docs', 'free', 'guide:webhooks'],
    resourceCategory: 'Web APIs',
  },
]
