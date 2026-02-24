# Deploy on Coolify — Guide CLAUDE.md

## Audience & Purpose

Frontend engineers deploying a React + Vite app to their own server for the first time. Covers DNS, TLS, Docker, reverse proxies, Coolify setup, deployment strategies, SPA routing fixes, environment variables, common gotchas, and Raspberry Pi self-hosting with Cloudflare Tunnel.

## Section Structure

Defined in `COOLIFY_GUIDE_SECTIONS` in `src/data/coolifyData.ts`. All data in this single file.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `cd-start` |
| Foundations | `cd-foundations` |
| Setup & Deploy | `cd-coolify-setup`, `cd-raspberry-pi`, `cd-deploy` |
| Configuration | `cd-spa-routing`, `cd-env-vars` |
| Reference | `cd-gotchas`, `cd-checklist` |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `TrafficDiagram` | *(none)* | Visualizes the 5-step traffic flow from browser to Docker container |
| `FoundationAccordion` | *(none)* | Expandable deep dives into DNS, TLS, reverse proxy, Docker, and ports |
| `SpaRoutingDiagram` | *(none)* | Side-by-side diagram showing client-side nav success vs. page refresh 404 |
| `CoolifyGotchaAccordion` | *(none)* | Expandable gotchas with severity, cause, and fix |
| `CoolifyChecklist` | *(none)* | Interactive checklist with checkboxes and progress counter |
| `PiModelTable` | *(none)* | Raspberry Pi model compatibility table with color-coded verdicts |
| `PiPerformanceAccordion` | *(none)* | Pi performance tuning tips (swap, Docker memory, USB SSD, thermal) |
| `PiGotchaAccordion` | *(none)* | Pi-specific gotchas (ARM images, build speed, NAT, crashes) |

## Guide-Specific Conventions

- **Traffic flow:** `TRAFFIC_STEPS` array of `{ label, sublabel?, color }` objects rendered as a horizontal diagram.
- **Foundation topics:** `FOUNDATION_TOPICS` array with paragraphs, optional bullets, and optional tips with types (`tip`, `info`, `warn`).
- **Gotcha severity:** `COOLIFY_GOTCHAS` and `PI_GOTCHAS` use `severity: 'red' | 'yellow'` for visual indicators.
- **Checklist groups:** `DEPLOY_CHECKLIST` is an array of `{ heading, items }` groups rendered as interactive checkboxes.
- **Pi models:** `PI_MODELS` array with `verdictColor` for per-row color coding in the compatibility table.
