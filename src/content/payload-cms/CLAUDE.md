# Payload CMS Field Guide — Guide CLAUDE.md

## Audience & Purpose

Developers evaluating headless CMS options or getting started with Payload CMS — especially those coming from traditional CMS platforms like WordPress. The guide covers config-first schemas, three API surfaces (REST, GraphQL, Local), TypeScript type generation, key features (Lexical editor, jobs queue, auth, live preview), and the AI tooling ecosystem.

## Sections

| Section | Pages | Topics |
|---------|-------|--------|
| Fundamentals | payload-overview, payload-concepts | What is Payload, headless CMS, config-first, Collections/Globals/Fields/Hooks/Access Control |
| Architecture | payload-architecture, payload-collections | Data flow diagram, database adapters, collection config anatomy |
| Integration | payload-apis, payload-frontend | REST/GraphQL/Local API, type-safe TanStack Router + Query frontend |
| Advanced | payload-features, payload-ai-tooling | Lexical editor, jobs queue, auth, live preview, MCP plugin, Claude Code, AI content generation |
| Knowledge Check | payload-quiz | 4-question quiz on headless CMS, APIs, MCP, config-first |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `PayloadConceptAccordion` | *(none)* | `PAYLOAD_CONCEPTS` | Expandable accordion for core concepts (Collections, Globals, Fields, Hooks, Access Control) |
| `PayloadFlowDiagram` | *(none)* | `PAYLOAD_FLOW_NODES` | Interactive Config → Database → APIs → Frontend flow diagram using `useExplorer` |
| `PayloadFeatureAccordion` | *(none)* | `PAYLOAD_FEATURES` | Expandable accordion for key features (Lexical, Jobs Queue, Auth, Live Preview) |
| `PayloadAiWorkflowAccordion` | *(none)* | `PAYLOAD_AI_WORKFLOWS` | Expandable accordion for AI workflow patterns |
| `PayloadQuiz` | *(none)* | `PAYLOAD_QUIZ_QUESTIONS` | 4-question quiz wrapping `QuizBase` |

## Guide-Specific Conventions

- All interactive data lives in `src/data/payloadData.ts`.
- Accordion components are thin wrappers around `AccordionList` — data lookup only.
- Flow diagram uses `useExplorer` hook pattern from shared hooks.
- Quiz uses `QuizBase` with orange accent (`#f97316` / `#fb923c`).
- Code examples use `CodeAccordion` for collapsible blocks with copy.
- HTML in data strings uses `dangerouslySetInnerHTML` for `<code>` tags in concept/feature descriptions.
