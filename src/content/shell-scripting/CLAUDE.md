# Shell Scripting for AI Agents — Guide CLAUDE.md

## Audience & Purpose

Developers and AI agent builders who need to write reliable shell scripts for automation, validation, and tooling. Assumes basic command-line familiarity but no prior shell scripting experience. Teaches bash fundamentals, then focuses on patterns that make AI agents more efficient — pre-flight validation, error handling, structured output, and copy-paste-ready recipes.

## Section Structure

Defined in `SHELL_SCRIPTING_GUIDE_SECTIONS` in `src/data/shellScriptingData.ts`.

| Section Label | Page IDs |
|--------------|----------|
| *(start)* | `shell-start` |
| Foundations | `the-basics`, `variables-arguments`, `conditionals-tests`, `loops-iteration` |
| Agent Patterns | `preflight-validation`, `file-path-checks`, `error-handling`, `text-processing` |
| Recipes | `agent-scripts`, `cheat-sheet` |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `ShellQuiz` | `question`, `options`, `correctIndex`, `correctFeedback`, `incorrectFeedback` | Inline single-question knowledge check with correct/incorrect feedback. Used on 4 pages. |

## Guide-Specific Conventions

- **Agent callouts:** Use `<Explainer title="Agent Pattern">` or `<Explainer title="Agent Workflow">` for content explaining why AI agents benefit from a technique.
- **Code-heavy pages:** Most content is in `CodeAccordion` blocks with the `ext="bash"` prop. Pages are structured as concept intro → code example → optional callout.
- **Inline quizzes:** Each Foundations page and the error-handling page has one `ShellQuiz` at the bottom as a knowledge check. Quizzes have exactly 3 options.
- **No data arrays for content:** Unlike some guides, all code examples live directly in MDX rather than in the data file. The data file only contains sections and start page data.
- **Exit codes emphasis:** Multiple pages reinforce the pattern of `exit 0` for success, `exit 1` for failure, and `$?` for checking results — this is the core agent communication mechanism.
- **Progressive complexity:** Foundations pages teach syntax; Agent Patterns pages show real-world validation scripts; Recipes pages provide complete copy-paste-ready scripts.
