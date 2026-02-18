# Amazon S3 Storage Classes — Guide CLAUDE.md

## Audience & Purpose

Backend-aware frontend engineers who interact with S3 indirectly (static hosting, presigned uploads, CDN-served assets) and need to understand storage class trade-offs, lifecycle automation, and cost implications without deep AWS expertise.

## Section Structure

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `s3-start` |
| Fundamentals | `s3-basics`, `s3-classes` |
| Analysis | `s3-comparison`, `s3-lifecycle` |
| Interactive Tools | `s3-calculator`, `s3-picker` |
| Practical | `s3-frontend`, `s3-quiz` |

## Data Directory

`src/data/s3Data/` — directory structure with:
- `types.ts` — TypeScript interfaces
- `storageClasses.ts` — 7 storage class definitions with pricing data
- `basics.ts` — S3 concept cards and bucket items
- `lifecycle.ts` — Lifecycle stages, JSON sample, waterfall order
- `scenarios.ts` — 7 scenario recommendations for class picker
- `frontend.ts` — Code snippets (presigned URL, static deploy) and S3 headers
- `quiz.ts` — 6 quiz questions with answers and explanations
- `navigation.ts` — Guide sections and start page data
- `index.ts` — Barrel re-exports

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `S3ConceptGrid` | *(none)* | Bucket diagram + 4 concept cards (Bucket, Object, Key, Region) |
| `StorageClassCards` | *(none)* | 7 storage class cards with tags + mental model spectrum |
| `S3ComparisonTable` | *(none)* | 7×7 comparison table with color-coded cost cells + expandable details |
| `S3LifecycleTimeline` | *(none)* | Vertical timeline (TimelineFlow base) + lifecycle JSON + waterfall rule |
| `S3CostCalculator` | *(none)* | Dual-slider calculator with real-time cost grid for all 7 classes |
| `S3ClassPicker` | *(none)* | Scenario selector (useExplorer hook) with recommendation display |
| `S3FrontendPatterns` | *(none)* | Presigned URL code, static hosting CLI, headers cards, CloudFront |
| `S3Quiz` | *(none)* | 6-question multiple-choice quiz with score tracking |

## Guide-Specific Conventions

- **Pricing data is educational:** All costs reflect US-East-1 approximate pricing for illustration. Not authoritative.
- **Color palette:** Amber (#f0a840 dark / #d97706 light) is the primary accent. Each storage class has its own color pair for cards and table cells.
- **Cost tier coloring:** Table cells use teal (low), amber (med), rose (high) to indicate relative cost levels.
- **Quiz follows AuthQuiz pattern:** Same state machine (current/selected/score/done) with amber accent instead of indigo.
- **Scenario picker uses useExplorer hook:** Shared select→detail pattern from the codebase.
