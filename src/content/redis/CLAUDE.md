# Redis — Guide CLAUDE.md

## Audience & Purpose

Frontend developers who want to understand what Redis does behind the API endpoints they call. Covers what Redis is (with JavaScript analogies like localStorage, Set, Array), its data types, essential commands, common patterns that affect frontend performance (caching, sessions, real-time, rate limiting), and simplified architecture (event loop, persistence basics, scaling overview). Code examples use frontend-adjacent patterns (Next.js API routes, Server Actions, Socket.IO).

## Sections

| Page ID | Title | Content |
|---------|-------|---------|
| redis-overview | What is Redis | Intro with localStorage analogy, speed comparison, interactive terminal, key takeaways |
| redis-data-types | Data Types | Expandable cards for Strings, Lists, Sets, Hashes, Sorted Sets, Streams with FE use cases |
| redis-commands | Commands | Tabbed command reference with FE-context descriptions, interactive terminal |
| redis-patterns | Use Patterns | Cache-aside, write-through, pub/sub, rate limiting, session store with Next.js examples |
| redis-architecture | Architecture | Event loop (JS analogy), persistence basics, scaling overview |
| redis-quiz | Test Your Knowledge | 6-question quiz with frontend-framed scenarios |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `RedisTerminal` | (none) | self-contained | Simulated Redis CLI with SET/GET/DEL/INCR/EXISTS/KEYS |
| `SpeedComparison` | (none) | self-contained | Animated bar chart comparing API with Redis cache vs DB vs disk |
| `RedisDataTypeCards` | (none) | `REDIS_DATA_TYPES` | AccordionList wrapper showing expandable data type cards |
| `RedisCommandReference` | (none) | `REDIS_COMMANDS_DATA` | Tabbed command browser by category |
| `RedisPatternCards` | (none) | `REDIS_PATTERNS` | Pattern cards with diagram, pros/cons, collapsible code |
| `RedisArchitectureDiagram` | (none) | self-contained | Event loop, persistence options, scaling strategies |
| `RedisQuiz` | (none) | `REDIS_QUIZ_QUESTIONS` | QuizBase wrapper for knowledge check |

## Guide-Specific Conventions

- All data is in `src/data/redisData.ts` (single file).
- `RedisDataTypeCards` wraps the shared `AccordionList` component.
- `RedisQuiz` wraps the shared `QuizBase` component.
- The `RedisTerminal` component maintains its own in-memory store via `useRef` — not persisted.
- Color pairs for data types and commands use `color`/`darkColor` fields for light/dark mode via `ds()`.
- Code examples use Next.js patterns (API routes, Server Actions, middleware) to stay relevant for frontend developers.
