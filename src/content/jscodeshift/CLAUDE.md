# jscodeshift Codemods — Guide CLAUDE.md

## Audience & Purpose

Engineers who need to automate large-scale JavaScript/TypeScript code transformations. Covers AST concepts, the jscodeshift API, writing and testing transforms, running them at scale, and integrating with AI coding agents.

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `JcsPipeline` | — | Horizontal pipeline diagram (Source → Parse → Transform → Print → Output) |
| `JcsConceptCards` | — | Grid of 4 core concept cards (AST, Collection, Transform, NodePath) |
| `JcsAstDemo` | — | Interactive AST explorer with cycling examples |
| `JcsMethodTable` | — | Collection methods reference table |
| `JcsCliFlagsTable` | — | CLI flags reference table |
| `JcsNodeTypeTable` | — | Common AST node types table |
| `JcsBuilderTable` | — | Builder cheat sheet table |
| `JcsPlayground` | `patternId: string` | Side-by-side transform playground with before/after |
| `JcsRecipeAccordion` | — | Accordion of real-world recipes (uses shared AccordionList) |
| `JcsTestingChecklist` | — | Grid of testing checklist items |
| `JcsRolloutTimeline` | — | Rollout strategy timeline (uses shared TimelineFlow) |
| `JcsPitfallAccordion` | — | Common pitfalls accordion (uses shared AccordionList) |
| `JcsEcosystemCards` | — | Ecosystem link cards grid |
| `JcsAgentCards` | — | AI integration approach cards |
| `JcsClaudeWorkflow` | — | Claude Code integration timeline (uses shared TimelineFlow) |
| `JcsAgentDecisionTable` | — | When to use jscodeshift vs direct edits |

## Guide-Specific Conventions

- All data lives in `src/data/jscodeshiftData.ts` — no inline data in components or MDX.
- Transform patterns use `JcsPlayground` with `patternId` prop to look up data.
- Recipes and pitfalls use the shared `AccordionList` base.
- Rollout and Claude Code workflows use the shared `TimelineFlow` base.
- Code examples use standard markdown fenced code blocks in MDX pages.
