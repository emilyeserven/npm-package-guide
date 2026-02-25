# Creating a New Guide — Guide CLAUDE.md

## Audience & Purpose

Project contributors who want to add a new guide to this educational SPA. Covers the full workflow: writing a content artifact, prompting Claude with `/add-guide`, understanding the scaffold pipeline, filling in MDX content, adding links and glossary entries, and validating the build.

## Guide-Specific Conventions

- **No custom components** — this guide is entirely text, code blocks, and shared layout components (SectionNote, Explainer, Gotcha, DefinitionTable, SectionList).
- **Self-referential** — this guide describes the same project architecture it lives in. Keep examples generic (e.g., "docker-compose") rather than self-referencing to avoid confusion.
- **Code examples** — scaffold commands and MDX snippets are illustrative, not runnable project code. Use fenced code blocks, not CodeAccordion, since they're short.
- **Link registry** — links point to project docs and Anthropic documentation. IDs use the `gcr-` prefix.
