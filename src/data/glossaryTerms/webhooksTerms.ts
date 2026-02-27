import type { GlossaryCategory } from './types'

export const webhooksGlossary: GlossaryCategory[] = [
  {
    category: 'Webhook Concepts',
    terms: [
      {
        term: 'Webhook',
        definition: 'An HTTP POST request that a server sends to your server when an event occurs \u2014 the reverse of polling. The provider pushes data to you instead of you asking for it.',
        linkId: 'wh-stripe-webhooks',
        sectionId: 'wh-what',
        guides: ['webhooks'],
      },
      {
        term: 'Webhook Provider',
        definition: 'The service that sends webhooks (e.g., Stripe, GitHub). Responsible for event detection, payload construction, signing, delivery, and retries.',
        linkId: 'wh-svix-docs',
        sectionId: 'wh-building',
        guides: ['webhooks'],
      },
      {
        term: 'Webhook Consumer',
        definition: 'The service that receives webhooks (your server). Responsible for signature verification, idempotent processing, and fast acknowledgement.',
        linkId: 'wh-stripe-webhooks',
        sectionId: 'wh-consuming',
        guides: ['webhooks'],
      },
      {
        term: 'Webhook Payload',
        definition: 'The JSON body of a webhook request containing event data \u2014 typically includes an event ID, type, timestamp, and the relevant resource data.',
        linkId: 'wh-stripe-webhooks',
        sectionId: 'wh-how',
        guides: ['webhooks'],
      },
    ],
  },
  {
    category: 'Webhook Security',
    terms: [
      {
        term: 'HMAC Signature',
        definition: 'A hash-based message authentication code used to verify webhook authenticity. The provider and consumer share a secret key; the provider hashes the payload with it and includes the hash in a header.',
        linkId: 'wh-mdn-subtle-crypto',
        sectionId: 'wh-security',
        guides: ['webhooks'],
      },
      {
        term: 'Timing-Safe Comparison',
        definition: 'A string comparison method that takes constant time regardless of where strings differ, preventing timing attacks that could leak information about expected signatures. In Node.js: <code>crypto.timingSafeEqual()</code>.',
        linkId: 'wh-mdn-subtle-crypto',
        sectionId: 'wh-security',
        guides: ['webhooks'],
      },
      {
        term: 'Replay Attack',
        definition: 'An attack where a previously valid webhook request is re-sent to trick the consumer into processing it again. Prevented by checking the timestamp header and rejecting old events.',
        linkId: 'wh-owasp-webhook',
        sectionId: 'wh-security',
        guides: ['webhooks'],
      },
    ],
  },
  {
    category: 'Webhook Patterns',
    terms: [
      {
        term: 'Idempotency',
        definition: 'The property of an operation that produces the same result whether executed once or multiple times. Webhook handlers must be idempotent because providers may retry delivery, sending the same event more than once.',
        linkId: 'wh-stripe-webhooks',
        sectionId: 'wh-patterns',
        guides: ['webhooks'],
      },
      {
        term: 'Exponential Backoff',
        definition: 'A retry strategy where each subsequent attempt waits longer than the previous one (e.g., 1 min, 5 min, 30 min, 2 hours). Prevents overwhelming a struggling endpoint.',
        linkId: 'wh-svix-docs',
        sectionId: 'wh-retries',
        guides: ['webhooks'],
      },
      {
        term: 'Webhook Tunnel',
        definition: 'A tool (like ngrok or Cloudflare Tunnel) that creates a publicly accessible URL pointing to your local development server, allowing webhook providers to reach localhost.',
        linkId: 'wh-ngrok',
        sectionId: 'wh-tools',
        guides: ['webhooks'],
      },
    ],
  },
]
