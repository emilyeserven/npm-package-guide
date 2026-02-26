# Claude Agents Guide — Guide CLAUDE.md

## Audience & Purpose

Developers who want to understand the full Claude agent ecosystem: skills, agents, subagents, and the Agent SDK. Teaches when to use each approach, how to write effective instructions, and practical use cases — from code review bots to multi-agent development teams.

## Interactive Components

| Component | Props | Data Source | Purpose |
|-----------|-------|-------------|---------|
| `AgentsComparisonTable` | *(none)* | `SKILL_VS_AGENT_ROWS` | 3-column comparison table: Feature / Skills / Agents |
| `AgentsInstructionChecklist` | *(none)* | `INSTRUCTION_CHECKLIST` | Interactive progress checklist with check-all tracking |
| `AgentsUseCases` | *(none)* | `AGENT_USE_CASES` | Expandable accordion cards with difficulty badges and tool tags |
| `AgentsCodeViewer` | `tabs: Tab[]` | Inline JSON in MDX | Tabbed code viewer with copy button for multi-file examples |

## Guide-Specific Conventions

- **Data structure:** All content data arrays live in `src/data/agentsData.ts` (single file, under 500 lines).
- **Code examples:** Python and TypeScript SDK examples stored as exported string constants (`SDK_PYTHON_EXAMPLE`, `SDK_TS_EXAMPLE`). Skill anatomy files use `SKILL_ANATOMY_FILES` array.
- **AgentsCodeViewer tabs:** Passed as inline JSON in MDX via `tabs` prop. Each tab: `{ id, label, title, content }`.
- **Color theming:** Comparison table uses amber for Skills, indigo for Agents. Use case difficulty badges: emerald (Beginner), amber (Intermediate), rose (Advanced).
- **Checklist state:** `AgentsInstructionChecklist` uses local `useState` — not persisted. This is intentional (educational, not tracking).
