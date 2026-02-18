# TanStack Router Deep Dive — Guide CLAUDE.md

## Audience & Purpose

Backend engineers (and frontend engineers expanding their routing knowledge) who want a thorough comparison of TanStack Router against React Router and Next.js. The guide is structured as a deep-dive comparison, not a tutorial.

## Section Structure

| Section | Page IDs | Content |
|---------|----------|---------|
| Start | `tsr-start` | Auto-generated start page |
| Core Concepts | `tsr-overview`, `tsr-typesafety`, `tsr-searchparams` | What TanStack Router is, its type safety, and search param handling |
| Architecture | `tsr-dataloading`, `tsr-routing`, `tsr-codesplit` | Data loading, route definitions, and code splitting |
| Comparison | `tsr-comparison`, `tsr-unique`, `tsr-weaknesses`, `tsr-verdict` | Feature matrix, unique features, weaknesses, and use-case verdicts |

## Interactive Component

**`TsrTopicDetail`** — Single component that renders all section content based on `topicId` prop. Located at `src/components/mdx/tanstack-router/TsrTopicDetail.tsx`.

Usage in MDX:
```mdx
<TsrTopicDetail topicId="overview" />
```

Valid topic IDs: `overview`, `typesafety`, `searchparams`, `dataloading`, `routing`, `codesplit`, `comparison`, `unique`, `weaknesses`, `verdict`.

## Data File

All content data lives in `src/data/tanstackRouterData.ts`. This includes:
- Code examples (organized by section)
- Comparison table features (20 rows, 4 router columns)
- Unique features list (8 items)
- Weakness items with severity ratings
- Use-case verdict scenarios (4 routers)

## Conventions

- Each former "tab" from the original component is now its own MDX page
- All text content and code examples are in the data file, not inline in the component
- The component supports both light and dark themes via `ds()` and `tc()` helpers
- Badge colors match the original design: TanStack (#e94560), React Router Library (#f44250), React Router Framework (#3992ff), Next.js (#fff)
