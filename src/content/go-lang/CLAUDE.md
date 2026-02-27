# Go for Frontend Engineers — Guide CLAUDE.md

## Audience & Purpose

Frontend engineers (React/TypeScript) learning Go for backend services, CLI tools, and cloud infrastructure. Covers Go's design philosophy, syntax comparisons with TypeScript and Python, practical use cases, and starter projects.

## Sections

| Section | Pages | Focus |
|---------|-------|-------|
| Fundamentals | `go-overview` | What Go is, use cases, opinionated philosophy |
| Comparisons | `go-vs-python`, `go-vs-typescript` | Side-by-side language comparisons, quiz |
| Practical | `go-frontend-lens`, `go-starter-projects` | Mindset shifts, where Go fits, hands-on projects |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `GoCodeCompare` | `exampleId: string` | `GO_HTTP_SERVER_EXAMPLE`, `GO_TS_CODE_EXAMPLES` | Side-by-side code comparison with language badges and copy buttons |
| `GoQuiz` | *(none)* | `GO_QUIZ_QUESTIONS` | Go vs Python quiz using `QuizBase` |
| `GoAccordion` | `section: 'philosophy' \| 'mindset'` | `GO_PHILOSOPHY_ITEMS`, `GO_MINDSET_ITEMS` | Expandable item list using `AccordionList` |
| `GoUseCaseGrid` | `section: 'useCases' \| 'frontendUses'` | `GO_USE_CASES`, `GO_FRONTEND_USES` | Themed card grid for use cases |
| `GoProjectCard` | `index: number` | `GO_STARTER_PROJECTS` | Project card with step timeline and optional code |
| `GoConceptMap` | *(none)* | `GO_CONCEPT_MAP` | TypeScript-to-Go concept mapping table |
| `GoCompareTable` | *(none)* | `GO_VS_PYTHON_TABLE` | Go vs Python feature comparison table |

## Guide-Specific Conventions

- Data lives in `src/data/goLangData/` (directory structure due to size).
- Code examples use HTML in data strings for inline formatting (`<code>`, `<em>`).
- The `GoCodeCompare` component supports `noteType` for callout styling: `'info'` (blue), `'warning'` (amber), `'tip'` (green).
- Accent colors follow Go's brand palette: cyan (`#0891b2`/`#22d3ee`), pink (`#be185d`/`#f472b6`), yellow (`#ca8a04`/`#facc15`).
