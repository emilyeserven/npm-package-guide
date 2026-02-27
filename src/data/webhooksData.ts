import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Types ────────────────────────────────────────────────────────────

export interface WebhookFlowStep {
  icon: string
  label: string
  sub: string
}

export interface WebhookProviderExample {
  icon: string
  title: string
  desc: string
  color: string
  darkColor: string
}

export interface WebhookSecurityMeasure {
  measure: string
  prevents: string
}

export interface WebhookPitfall {
  pitfall: string
  result: string
  fix: string
}

export interface WebhookTool {
  icon: string
  title: string
  desc: string
  color: string
  darkColor: string
}

export interface WebhookRelayPattern {
  icon: string
  title: string
  desc: string
  color: string
  darkColor: string
}

export interface SimulatorEvent {
  type: string
  icon: string
  label: string
  color: 'green' | 'amber' | 'red'
  action: string
}

// ── Flow steps ───────────────────────────────────────────────────────

export const WEBHOOK_FLOW_STEPS: WebhookFlowStep[] = [
  { icon: '🏢', label: 'Provider', sub: 'e.g. Stripe' },
  { icon: '📡', label: 'HTTP POST', sub: 'JSON payload' },
  { icon: '🖥️', label: 'Your Server', sub: '/api/webhooks' },
  { icon: '✅', label: '200 OK', sub: 'acknowledge' },
]

// ── Provider examples ────────────────────────────────────────────────

export const WEBHOOK_PROVIDERS: WebhookProviderExample[] = [
  {
    icon: '💳',
    title: 'Stripe / Payment providers',
    desc: 'Payment succeeded, subscription cancelled, invoice created',
    color: '#f59e0b',
    darkColor: '#f59e0b',
  },
  {
    icon: '🔀',
    title: 'GitHub',
    desc: 'Push events, PR opened, issue commented, deployment status',
    color: '#60a5fa',
    darkColor: '#60a5fa',
  },
  {
    icon: '💬',
    title: 'Slack / Discord',
    desc: 'Slash commands, interactive messages, event subscriptions',
    color: '#a78bfa',
    darkColor: '#a78bfa',
  },
  {
    icon: '📝',
    title: 'CMS platforms',
    desc: 'Content published, entry updated, asset uploaded',
    color: '#34d399',
    darkColor: '#34d399',
  },
]

// ── Relay patterns ───────────────────────────────────────────────────

export const WEBHOOK_RELAY_PATTERNS: WebhookRelayPattern[] = [
  {
    icon: '🔄',
    title: 'TanStack Query Invalidation',
    desc: 'Webhook updates a DB → Your frontend uses TanStack Query with polling or refetch-on-focus to pick up changes. Simplest approach.',
    color: '#34d399',
    darkColor: '#34d399',
  },
  {
    icon: '📡',
    title: 'Server-Sent Events (SSE)',
    desc: 'Webhook hits your server → Server pushes to client via SSE → React updates instantly. Great for real-time UIs.',
    color: '#60a5fa',
    darkColor: '#60a5fa',
  },
  {
    icon: '🔌',
    title: 'WebSocket',
    desc: 'Webhook hits server → Server broadcasts via WebSocket → Client receives. Best for bidirectional, high-frequency updates.',
    color: '#a78bfa',
    darkColor: '#a78bfa',
  },
  {
    icon: '🗄️',
    title: 'Database + Polling',
    desc: 'Webhook writes to DB → TanStack Query polls at a reasonable interval. Simple, reliable, works at any scale.',
    color: '#f59e0b',
    darkColor: '#f59e0b',
  },
]

// ── HMAC flow steps ──────────────────────────────────────────────────

export const HMAC_FLOW_STEPS: WebhookFlowStep[] = [
  { icon: '🔑', label: 'Shared Secret', sub: 'whsec_abc123' },
  { icon: '📦', label: 'Request Body', sub: 'JSON payload' },
  { icon: '🔐', label: 'HMAC-SHA256', sub: 'hash function' },
  { icon: '✓', label: 'Compare', sub: 'signatures match?' },
]

// ── Security measures ────────────────────────────────────────────────

export const WEBHOOK_SECURITY_MEASURES: WebhookSecurityMeasure[] = [
  { measure: 'Signature verification', prevents: 'Forged/tampered requests' },
  { measure: 'Timestamp checking', prevents: 'Replay attacks (re-sending old events)' },
  { measure: 'Idempotency keys', prevents: 'Duplicate processing if retried' },
  { measure: 'IP allowlisting', prevents: 'Requests from unknown sources' },
  { measure: 'HTTPS only', prevents: 'Payload interception in transit' },
]

// ── Pitfalls ─────────────────────────────────────────────────────────

export const WEBHOOK_PITFALLS: WebhookPitfall[] = [
  {
    pitfall: 'Slow handler',
    result: 'Provider retries, you process the event twice',
    fix: 'Respond 200 immediately, process async',
  },
  {
    pitfall: 'No idempotency',
    result: 'Retries create duplicate orders, emails, etc.',
    fix: 'Deduplicate by event ID',
  },
  {
    pitfall: 'Parsed body for verification',
    result: 'Signature always fails',
    fix: 'Use raw request body for HMAC',
  },
  {
    pitfall: 'No signature check',
    result: 'Anyone can forge events',
    fix: 'Always verify HMAC signatures',
  },
  {
    pitfall: 'Trusting event data blindly',
    result: 'Stale or manipulated data in payload',
    fix: 'Fetch the resource from the API to confirm',
  },
]

// ── Development tools ────────────────────────────────────────────────

export const WEBHOOK_TOOLS: WebhookTool[] = [
  {
    icon: '🌐',
    title: 'ngrok',
    desc: 'The classic. Run ngrok http 3000 and get a public URL that tunnels to your local server. Free tier available.',
    color: '#34d399',
    darkColor: '#34d399',
  },
  {
    icon: '⚡',
    title: 'Cloudflare Tunnel',
    desc: 'Free alternative to ngrok. Run cloudflared tunnel for a secure tunnel without exposing ports.',
    color: '#60a5fa',
    darkColor: '#60a5fa',
  },
  {
    icon: '🧪',
    title: 'webhook.site',
    desc: 'Instant URL that captures any incoming webhook. Perfect for inspecting payloads before writing any code.',
    color: '#a78bfa',
    darkColor: '#a78bfa',
  },
  {
    icon: '🔧',
    title: 'Svix / Hookdeck',
    desc: 'Managed webhook infrastructure. Handle retries, signature verification, and delivery logging as a service.',
    color: '#f59e0b',
    darkColor: '#f59e0b',
  },
]

// ── Simulator events ─────────────────────────────────────────────────

export const SIMULATOR_EVENTS: SimulatorEvent[] = [
  {
    type: 'payment_intent.succeeded',
    icon: '💳',
    label: 'Payment Succeeded',
    color: 'green',
    action: 'Order #1042 marked as paid, email sent',
  },
  {
    type: 'customer.subscription.deleted',
    icon: '🚫',
    label: 'Subscription Cancelled',
    color: 'amber',
    action: 'Access revoked, cancellation email queued',
  },
  {
    type: 'invoice.payment_failed',
    icon: '❌',
    label: 'Payment Failed',
    color: 'red',
    action: 'Payment retry scheduled, user notified',
  },
]

// ── Navigation ──────────────────────────────────────────────────────

export const WEBHOOKS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['wh-start'] },
  { label: 'Fundamentals', ids: ['wh-what', 'wh-how'] },
  { label: 'Consuming', ids: ['wh-consuming', 'wh-frontend'] },
  { label: 'Building', ids: ['wh-building', 'wh-retries'] },
  { label: 'Security', ids: ['wh-security', 'wh-patterns'] },
  { label: 'Appendix', ids: ['wh-tools'] },
]

// ── Start page data ─────────────────────────────────────────────────

export const WEBHOOKS_START_PAGE_DATA: StartPageData = {
  subtitle: 'Everything a frontend developer needs to know about webhooks \u2014 what they are, how to consume them, how to build them, and how to secure them. No black magic, just HTTP.',
  tip: 'Start with the fundamentals to understand the concept, then move to consuming or building webhooks depending on your immediate need.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Fundamentals',
      description: 'What webhooks are, why they exist, and how the full lifecycle works \u2014 from event trigger to delivery acknowledgement.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        'wh-what': 'The core concept \u2014 how webhooks differ from polling and where you\u2019ve already seen them.',
        'wh-how': 'The complete lifecycle \u2014 registration, event trigger, HTTP POST, and acknowledgement.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Consuming Webhooks',
      description: 'Receiving webhooks from third-party services and relaying events to your React frontend.',
      sectionLabel: 'Consuming',
      subItemDescriptions: {
        'wh-consuming': 'Setting up webhook endpoints in Express, Hono, and Elysia.',
        'wh-frontend': 'Patterns for getting webhook data into your React app \u2014 TanStack Query, SSE, WebSocket.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Building Webhooks',
      description: 'Designing a reliable webhook system when you\u2019re the provider sending events to your users.',
      sectionLabel: 'Building',
      subItemDescriptions: {
        'wh-building': 'Dispatcher architecture \u2014 registration, payload construction, signing, and delivery.',
        'wh-retries': 'Exponential backoff, job queues, and failure handling strategies.',
      },
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Security',
      description: 'HMAC signature verification, replay attack prevention, and production hardening.',
      sectionLabel: 'Security',
      subItemDescriptions: {
        'wh-security': 'HMAC-SHA256 verification, timestamp checking, and timing-safe comparison.',
        'wh-patterns': 'Common patterns that work and pitfalls that break production systems.',
      },
    },
    {
      type: 'numbered',
      num: 5,
      title: 'Appendix',
      description: 'Local development tools and managed infrastructure for webhook development.',
      sectionLabel: 'Appendix',
      subItemDescriptions: {
        'wh-tools': 'ngrok, Cloudflare Tunnel, webhook.site, and managed webhook services.',
      },
    },
  ],
}

export const WEBHOOKS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'webhooks',
    icon: '⚡',
    title: 'Webhooks',
    startPageId: 'wh-start',
    description: 'Everything a frontend developer needs to know about webhooks \u2014 what they are, how to consume them, how to build them, and how to secure them.',
    category: 'infrastructure',
    dateCreated: '2026-02-27',
    dateModified: '2026-02-27',
    sections: WEBHOOKS_GUIDE_SECTIONS,
  },
  startPageData: WEBHOOKS_START_PAGE_DATA,
}
