# Redis — Guide CLAUDE.md

## Audience & Purpose

Backend engineers learning Redis for the first time. Covers what Redis is, its data types, essential commands, common production patterns (caching, pub/sub, rate limiting, sessions), and architecture (event loop, persistence, scaling). The guide is hands-on — most pages include interactive components.

## Sections

| Page ID | Title | Content |
|---------|-------|---------|
| redis-overview | What is Redis | Intro, speed comparison, interactive terminal, key takeaways |
| redis-data-types | Data Types | Expandable cards for Strings, Lists, Sets, Hashes, Sorted Sets, Streams |
| redis-commands | Commands | Tabbed command reference by category, interactive terminal |
| redis-patterns | Use Patterns | Cache-aside, write-through, pub/sub, rate limiting, session store |
| redis-architecture | Architecture | Event loop, persistence (RDB/AOF), scaling (replication/sentinel/cluster) |
| redis-quiz | Test Your Knowledge | 6-question quiz using QuizBase |

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `RedisTerminal` | (none) | self-contained | Simulated Redis CLI with SET/GET/DEL/INCR/EXISTS/KEYS |
| `SpeedComparison` | (none) | self-contained | Animated bar chart comparing Redis vs PostgreSQL vs disk speed |
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
