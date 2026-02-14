# Testing Guide — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning frontend testing fundamentals. Assumes familiarity with backend testing concepts (unit tests, mocking, CI). Teaches the testing pyramid, what to test at each level, and tool selection.

## Section Structure

Defined in `TESTING_GUIDE_SECTIONS` in `src/data/testingData.ts`. All data in this single file.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `test-start` |
| Testing Fundamentals | `test-overview`, `test-unit`, `test-component`, `test-e2e` |
| Comparing Tests | `test-comparison`, `test-best-practices` |
| Reference | `test-tools` |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `TestingPyramid` | *(none)* | Interactive 3-level pyramid; clicking a level navigates to its page |
| `TestTypeDetail` | `type: TestType` | "What to test" vs. "What NOT to test" card with code example |
| `TestPracticeCards` | *(none)* | Do's and don'ts cards (green/red border) |
| `TestChecklist` | *(none)* | Interactive checkbox list with progress bar |
| `TestToolsGrid` | *(none)* | Filterable grid of testing tools by test type |

## Guide-Specific Conventions

- **Testing pyramid model:** Content organized around `TestType` union: `'unit' | 'component' | 'e2e'`. Each level in `PYRAMID_LEVELS` with colors, "what to test"/"what NOT to test" arrays, and code example.
- **Test type pages:** Each (`test-unit.mdx`, etc.) uses `<TestTypeDetail type="..." />`.
- **Tag-based filtering:** `TestToolsGrid` uses `TAG_COLORS` to map test types to badge colors. Tools have `tags` array of `TestType` values.
