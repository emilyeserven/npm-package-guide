# Testing Guide — Guide CLAUDE.md

> Root `/CLAUDE.md` covers project-wide patterns (MDX conventions, dark mode, styling, link registry, glossary, build commands). This file covers **testing**-specific context only.

## Audience & Purpose

Backend engineers learning frontend testing fundamentals. Assumes familiarity with backend testing concepts (unit tests, mocking, CI). Teaches the testing pyramid, what to test at each level, best practices, and how to choose the right tools for unit, component, and E2E tests.

## Section Structure

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `test-start` |
| Testing Fundamentals | `test-overview`, `test-unit`, `test-component`, `test-e2e` |
| Comparing Tests | `test-comparison`, `test-best-practices` |
| Reference | `test-tools` |

The `test-review-checklist` page is part of the cross-guide Checklists group (see `checklistPages` in `guideRegistry.ts`).

Defined in `TESTING_GUIDE_SECTIONS` in `src/data/testingData.ts`.

## File Locations

| Category | Path |
|----------|------|
| Content pages | `src/content/testing/*.mdx` |
| All guide data | `src/data/testingData.ts` (single file) |
| Interactive components | `src/components/mdx/testing/` |
| Link registry | `src/data/linkRegistry/testingLinks.ts` |
| Glossary terms | `src/data/glossaryTerms/testingTerms.ts` |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `TestingPyramid` | *(none)* | `PYRAMID_LEVELS` | Interactive 3-level pyramid; clicking a level navigates to its page |
| `TestTypeDetail` | `type: TestType` | `PYRAMID_LEVELS` | "What to test" vs. "What NOT to test" card with code example |
| `TestPracticeCards` | *(none)* | `PRACTICE_CARDS` | Do's and don'ts cards (green/red border) |
| `TestChecklist` | *(none)* | `CHECKLIST_ITEMS` | Interactive checkbox list with progress bar |
| `TestToolsGrid` | *(none)* | `TEST_TOOLS` + `TAG_COLORS` | Filterable grid of testing tools by test type |

## Guide-Specific Conventions

### Testing pyramid model

The guide organizes content around three test types defined as the `TestType` union: `'unit' | 'component' | 'e2e'`. Each level is defined in `PYRAMID_LEVELS` with `color`, `accent`, `darkAccent`, "what to test" / "what NOT to test" arrays, and a code example.

### Single data file

All data lives in `testingData.ts` — types, pyramid levels, practice cards, checklist items, test tools, tag colors, section definitions, and start page data. This is intentionally a single file since the data is compact.

### Test type page pattern

Each test type page (`test-unit.mdx`, `test-component.mdx`, `test-e2e.mdx`) uses:

```mdx
<TestTypeDetail type="unit" />
```

This renders the structured "what to test" / "what NOT to test" layout with a code example, all driven from `PYRAMID_LEVELS` data.

### Tag-based filtering

`TestToolsGrid` uses `TAG_COLORS` to map test type strings to light/dark color pairs for badge rendering. Tools in `TEST_TOOLS` have a `tags` array of `TestType` values.

## Adding a New Page

1. Create `src/content/testing/<page-id>.mdx` with frontmatter (`id`, `title` with emoji, `guide: "testing"`).
2. Add the page ID to `TESTING_GUIDE_SECTIONS` in `src/data/testingData.ts` under the correct section label.
3. Use standard layout components (`SectionTitle`, `Toc`, `SectionIntro`, `SectionSubheading`, `SectionList`, `ColItem`).
4. For test-type-specific pages, use `<TestTypeDetail type="..." />`.
