# TanStack Router Deep Dive — Guide CLAUDE.md

## Audience & Purpose

Backend engineers (and frontend engineers expanding their routing knowledge) who want a thorough comparison of TanStack Router against React Router and Next.js. The guide is structured as a deep-dive comparison, not a tutorial.

## Interactive Component

**`TsrTopicDetail`** — Single component that renders all section content based on `topicId` prop. Located at `src/components/mdx/tanstack-router/TsrTopicDetail.tsx`.

Usage in MDX:
```mdx
<TsrTopicDetail topicId="overview" />
```

Valid topic IDs: `overview`, `typesafety`, `searchparams`, `dataloading`, `routing`, `codesplit`, `comparison`, `unique`, `weaknesses`, `verdict`.

## Conventions

- Each former "tab" from the original component is now its own MDX page
- All text content and code examples are in the data file, not inline in the component
- Badge colors: TanStack (#e94560), React Router Library (#f44250), React Router Framework (#3992ff), Next.js (#fff)
