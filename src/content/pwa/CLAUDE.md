# Progressive Web Apps Guide

## Audience & Purpose

Frontend and full-stack developers who want to understand PWA fundamentals and build installable, offline-capable web apps. Covers Service Workers, Web App Manifest, caching strategies, and practical Vite + React integration.

## Interactive Components

### `PwaTopicDetail`

- **Location:** `src/components/mdx/pwa/PwaTopicDetail.tsx`
- **Props:** `topicId: string` (matches `PWA_TOPICS` key)
- **Renders:** Body paragraphs with HTML, key points list, optional interactive diagram, code block with copy button
- **Data source:** `PWA_TOPICS` from `src/data/pwaData.ts`

### `PwaLifecycleDiagram`

- **Location:** `src/components/mdx/pwa/PwaLifecycleDiagram.tsx`
- **Props:** none (standalone)
- **Renders:** Clickable Service Worker lifecycle phases (Register → Installing → Waiting → Active)
- **Data source:** `LIFECYCLE_PHASES` from `src/data/pwaData.ts`

### `PwaCachingDiagram`

- **Location:** `src/components/mdx/pwa/PwaCachingDiagram.tsx`
- **Props:** none (standalone)
- **Renders:** Selectable caching strategy comparison (Cache First, Network First, Stale While Revalidate) with flow visualization
- **Data source:** `CACHING_STRATEGIES` from `src/data/pwaData.ts`

## Guide-Specific Conventions

- Each MDX page is minimal: `<SectionTitle>` + `<PwaTopicDetail topicId="..." />`
- All content lives in `PWA_TOPICS` data record, not inline in MDX
- Topic IDs match the page ID suffix (e.g., page `pwa-lifecycle` uses `topicId="lifecycle"`)
- Body fields contain HTML (rendered via `dangerouslySetInnerHTML`) for inline formatting (`<strong>`, `<code>`)
- Code blocks have copy-to-clipboard functionality built in
- Two topics (`lifecycle`, `caching-strategies`) include interactive diagrams via the `diagram` field
