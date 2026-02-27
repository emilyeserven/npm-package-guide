# Webhooks — Guide CLAUDE.md

## Audience & Purpose

Frontend developers who need to understand webhooks — what they are, how to consume them from services like Stripe and GitHub, how to build webhook systems as a provider, and how to secure endpoints with HMAC verification. Assumes familiarity with HTTP, JSON, and basic Node.js/Express.

## Sections

| Section | Pages | Focus |
|---------|-------|-------|
| Fundamentals | wh-what, wh-how | What webhooks are, polling vs push, the lifecycle |
| Consuming | wh-consuming, wh-frontend | Setting up endpoints, relaying to React |
| Building | wh-building, wh-retries | Provider architecture, retry strategies |
| Security | wh-security, wh-patterns | HMAC verification, idempotency, pitfalls |
| Appendix | wh-tools | ngrok, webhook.site, managed infrastructure |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `WebhookFlowDiagram` | *(none)* | Visual flow of the webhook lifecycle (Provider → POST → Server → 200) |
| `WebhookHmacFlow` | *(none)* | Visual flow of HMAC signature verification |
| `WebhookPitfallTable` | *(none)* | Styled table of common pitfalls with fixes |
| `WebhookSimulator` | *(none)* | Interactive demo simulating webhook events and forged requests |

## Guide-Specific Conventions

- All data in `src/data/webhooksData.ts`, never inline in MDX
- Code examples use `CodeAccordion` for all multi-line code blocks
- Simulator events are data-driven from `SIMULATOR_EVENTS`
- Link IDs use the `wh-` prefix to avoid collisions with other guides
- Flow diagram components read from `WEBHOOK_FLOW_STEPS` and `HMAC_FLOW_STEPS`
