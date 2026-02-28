# AI Tools Research: Developer Experience, Context Window Management & Code Quality

Research identifying tools and techniques across the MCP, hooks, Skills, CLI, and context management ecosystem that would improve developer experience when working with AI coding assistants.

## Current Coverage in the Guide

The prompt engineering guide's "Advanced Tool Usage" page (`prompt-tools-advanced`) already covers:
- **MCP Servers**: Basic setup (`.mcp.json`), 5 community servers (GitHub, Filesystem, Fetch, Brave Search, Memory)
- **Custom Slash Commands**: `.claude/commands/` convention, `$ARGUMENTS`, team sharing
- **Hooks**: PreToolUse, PostToolUse, Notification basics
- **Performance Optimization**: Headless mode, piping, `--allowedTools`, `/compact`

The sections below identify **new tools and techniques not yet covered** that would strengthen the guide.

---

## 1. MCP Servers (New Recommendations)

### Context & Documentation Servers

| Server | What It Does | Why It Matters |
|--------|-------------|----------------|
| **Context7** (Upstash) | Dynamically injects up-to-date, version-specific library documentation into prompts. Two tools: `resolve-library-id` and `get-library-docs`. | Eliminates hallucinated APIs — the #1 mistake category in the guide. Instead of relying on training data, Claude gets current docs for React 19, Next.js 15, etc. 45k+ GitHub stars. |
| **Sequential Thinking** | Structured step-by-step reasoning server from the official MCP repo. | Improves complex task quality by forcing the model through a deliberate reasoning chain before generating code. |
| **Memory Keeper** | Persistent context management for Claude Code. Stores context in `~/mcp-data/memory-keeper/` with configurable token limits (`MCP_MAX_TOKENS` default 25K). | Solves context loss across sessions. Offers tool profiles (minimal/standard/full) to control context overhead. |
| **Neural Memory** | Production-grade Knowledge Graph server. Tracks goals, architectural constraints, strategies with automatic learning, and code-to-goal semantic relationships. | Goes beyond simple key-value memory — builds a structured understanding of project state that persists and evolves. |

### Code Quality Servers

| Server | What It Does | Why It Matters |
|--------|-------------|----------------|
| **ESLint MCP** | Official ESLint MCP server (`npx @eslint/mcp@latest`). Lets AI assistants run ESLint directly and understand rule violations. | Offloads linting to the actual tool rather than asking the LLM to guess at lint rules. Reduces token usage and improves accuracy. |
| **mcp-code-checker** | Exposes `pylint` and `pytest` as MCP tools with structured results. | Pattern applicable to any language — lets the AI run real quality checks rather than simulating them. |
| **mcp-language-server** | Bridges Language Server Protocol (LSP) to MCP: go-to-definition, find references, rename, diagnostics. | Gives AI agents the same semantic understanding that IDEs have — critical for accurate refactoring. |
| **RepoMapper** | Standalone MCP server implementing Aider's repo-map approach (tree-sitter parsing + PageRank symbol ranking). | Provides intelligent code context selection within a token budget, rather than dumping entire files. |

### Installation Pattern (Claude Code CLI)

```bash
# Context7 — live library docs
claude mcp add context7 -- npx -y @upstash/context7-mcp

# ESLint — real linting in-context
claude mcp add eslint -- npx -y @eslint/mcp@latest

# Memory Keeper — persistent cross-session memory
claude mcp add memory-keeper -- npx -y @mkreyman/mcp-memory-keeper

# Sequential Thinking — structured reasoning
claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking
```

### MCP Ecosystem Infrastructure

| Resource | Description |
|----------|-------------|
| **Official MCP Registry** (`registry.modelcontextprotocol.io`) | Standards-backed registry, growing |
| **Smithery.ai** | Largest open marketplace, 7,300+ tools |
| **MCP.so** | Community knowledge base, 3,000+ servers |
| **MCP Market** (`mcpmarket.com`) | Enterprise-focused, curated with SLAs |
| **mcp.run** | Hosted registry and control plane for secure, portable servers |

### MCP Best Practices (Not Currently in Guide)

- **Start with read-only servers** and expand scope gradually
- **Scope per-project**: Use project-level `.mcp.json` for team consistency, user-level for personal tools
- **Lazy loading** (2026): Claude Code now loads MCP servers on demand, reducing context overhead by up to 95%. Having many servers no longer bloats the context window.
- **HTTP transport** for remote servers: `claude mcp add --transport http notion https://mcp.notion.com/mcp`
- **Disable unused servers**: Each active server's tool schemas consume ~500-2000 tokens of context

---

## 2. Hooks (New Features & Patterns)

### New Hook Types (Not in Guide)

The guide covers command hooks only. Claude Code now supports three hook types:

| Type | What It Does |
|------|-------------|
| **`"type": "command"`** | Runs a shell command (current guide coverage) |
| **`"type": "prompt"`** | Sends a prompt to a Claude model (Haiku by default) for a yes/no judgment. Useful for nuanced decisions that can't be captured in a regex or shell script. |
| **`"type": "agent"`** | Spawns a subagent that can read files, search code, and use tools to verify conditions before returning a decision. Most powerful but most expensive. |

### New Hook Events (Not in Guide)

The guide mentions PreToolUse, PostToolUse, and Notification. Additional events now available:

| Event | When It Fires | Use Case |
|-------|--------------|----------|
| `SessionStart` | Session begins, resumes, or recovers from compaction | Re-inject critical context after `/compact` |
| `UserPromptSubmit` | When you submit a prompt, before Claude processes it | Validate/transform user input |
| `Stop` | When Claude finishes responding | Verify tests pass before the turn ends |
| `SubagentStart` / `SubagentStop` | Subagent lifecycle | Monitor parallel work |
| `PreCompact` | Before context compaction | Preserve critical context |
| `TaskCompleted` | Task marked as completed | Verify completion criteria |

### High-Value Hook Patterns

**Re-inject context after compaction** (solves the "Claude forgot my rules" problem):
```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: use pnpm, not npm. Run pnpm validate before committing.'"
          }
        ]
      }
    ]
  }
}
```

**Agent-based verification before stopping:**
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Verify that all unit tests pass. Run the test suite and check the results.",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

**PreToolUse input modification** (v2.0.10+): Hooks can now modify tool inputs before execution — enabling transparent sandboxing, automatic dry-run flags, and convention enforcement without blocking and retrying.

### Key Hook Caveat Not in Guide

- PostToolUse hooks **cannot undo actions** (the tool already executed)
- Hook configuration is **snapshotted at session start** — editing mid-session requires a restart
- PermissionRequest hooks **do not fire** in non-interactive mode (`-p`) — use PreToolUse instead

---

## 3. Skills System (Major Update)

### Slash Commands Merged into Skills (v2.1.3)

The guide still describes the old `.claude/commands/` system. As of v2.1.3, **custom slash commands have been merged into the Skills system**. Both `.claude/commands/review.md` and `.claude/skills/review/SKILL.md` create `/review` and work the same way. Existing `.claude/commands/` files continue to work.

Skills follow the [Agent Skills](https://agentskills.io) open standard, which works across multiple AI tools (not just Claude Code).

### New Skill Capabilities

| Feature | Description |
|---------|-------------|
| **Directory structure** | Skills can include templates, example output, and helper scripts alongside `SKILL.md` |
| **Dynamic context injection** | `` !`command` `` syntax runs shell commands before skill content is sent to Claude (e.g., `` !`gh pr diff` ``) |
| **Invocation control** | `disable-model-invocation: true` prevents auto-loading (manual `/name` only); `user-invocable: false` hides from menu but lets Claude auto-use it |
| **Context forking** | `context: fork` runs the skill in a separate subagent context window |
| **Scoped hooks** | Skills can define hooks that only apply while the skill is active |
| **Allowed tools** | Skills can specify which tools Claude can use without permission |

### Skill Frontmatter Reference

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
argument-hint: [pr-number]
context: fork
agent: Explore
allowed-tools: ["Bash(gh:*)", "Read"]
---
## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

Summarize the changes, highlight risks, and suggest reviewers.
```

### Context Budget

Skill descriptions consume context window space. Budget scales at **2% of context window** (fallback: 16K characters). Check with `/context` command.

---

## 4. Context Window Management (New Techniques)

### Subagent Isolation Strategy (Not in Guide)

Subagents are the most powerful context management tool, but the guide doesn't cover them in the context management section.

- **Built-in types**: Explore (read-only, fast), Plan (research), General-purpose (full capabilities)
- **Context isolation**: Research in separate context windows; only summarized results return to main conversation
- **Parallel execution**: Up to 7 simultaneous subagents
- **Custom subagents**: Define in `.claude/agents/` as Markdown with frontmatter, share via version control

### "Document & Clear" Pattern

A workflow pattern not currently in the guide:
1. Have Claude dump its plan and progress into a `.md` file
2. `/clear` the conversation state
3. Start a new session telling Claude to read the `.md` and continue

This is more aggressive than `/compact` — gives a completely fresh context with only the relevant state preserved.

### Selective Rewind

`Esc + Esc` or `/rewind` lets you select a checkpoint and choose "Summarize from here" to compact only part of the conversation, keeping earlier context intact.

### Compaction Instructions in CLAUDE.md

Add to CLAUDE.md to control what survives compaction:
```
When compacting, always preserve the full list of modified files and any test commands.
```

### Tasks (DAG-based, v2.1.16)

Persistent task tracking that survives across sessions and context compactions. Unlike ephemeral to-do lists:
- Tasks support blocking relationships (DAG structure)
- Prevent hallucinated completion errors
- Coordinate work across subagents

### Token Budget Awareness

The 200K context window breaks down as:
- ~5-15K for system prompt
- ~1-10K for CLAUDE.md files
- ~500-2000 per active MCP server
- ~40-45K reserved for response generation
- **~140-150K available** for conversation and tool results

---

## 5. Code Indexing & Codebase Understanding Tools

### Repomix

Packs entire repositories into a single AI-friendly file. Key features:
- Tree-sitter-based `--compress` mode extracts key code elements while reducing token count
- Per-file and total token counting
- Security scanning via Secretlint
- Available as an MCP server
- Works with remote public GitHub repos without cloning

### Aider Repo Map

Uses tree-sitter to parse source files and extract key symbols (classes, functions, call signatures), then applies a PageRank-like graph ranking algorithm to select the most relevant symbols within a token budget. Default budget ~1K tokens, expands dynamically.

### Cursor Semantic Indexing

Uses Merkle trees to detect changes, chunks code semantically, generates embeddings, stores in Turbopuffer vector database. Optimal for 500-2,000 files; degrades noticeably above 5,000.

### Augment Code Context Engine

Builds semantic dependency graphs of entire codebases. Indexed a 450K-file monorepo in 27 minutes with incremental updates under 20 seconds.

### Greptile

Indexes syntax trees, call graphs, and relationships for AI-powered code review that understands how changes ripple through the system. ~85% actionable signal-to-noise ratio.

---

## 6. Project Context Files (Cross-Tool)

### The Emerging Standard

| File | Tool | Scope |
|------|------|-------|
| `CLAUDE.md` | Claude Code | Root, nested directories, user-level |
| `.github/copilot-instructions.md` | GitHub Copilot | Repository-level |
| `.cursorrules` | Cursor | Project-level |
| `AGENTS.md` | VS Code (multi-agent) | Supports subfolder-level |
| `.windsurfrules` | Windsurf | Project-level |

### Unification Strategy

Maintain a single source of truth and symlink from tool-specific filenames. Many tools now check for each other's context files. A single well-crafted file can serve multiple tools.

### Key Insight

Auto-generated context files (e.g., from `/init`) are a starting point, not an endpoint. When Claude Code evaluated its own auto-generated `CLAUDE.md` against a manually refined one, it admitted the manual version was "significantly better" despite being much shorter (85 lines vs. 280 lines).

---

## 7. CLI Tools Complementing AI Coding

### AI Coding Agents (Beyond What's in the Guide)

The guide compares Claude Code, Cursor, Copilot, Windsurf, Lovable, and Bolt. Additional tools worth noting:

| Tool | Type | Differentiator |
|------|------|---------------|
| **Aider** | CLI agent (open source) | Git-native workflows with diffs, commits, branches built in. Repo map for intelligent context selection. |
| **Continue** | IDE extension (open source) | Any LLM provider, no vendor lock-in. VS Code + JetBrains. 20K+ GitHub stars. |
| **Cline** | IDE extension + CLI (open source) | Flexible LLM backend for complex autonomous tasks. |
| **Goose** (Block/Square) | Local agent framework (open source) | Extensible, runs entirely locally. |
| **Amp** (Sourcegraph) | Agent platform | Powered by Sourcegraph's code search infrastructure. Explicit manual context management (Handoff, Fork, Edit/Restore). |
| **Augment Code** | IDE extension | Semantic dependency graphs for large codebases. |

### Utility CLI Tools

| Tool | Purpose |
|------|---------|
| **ast-grep** | Structural code search using AST patterns (more precise than regex) |
| **Repomix** | Pack repos into AI-friendly single files with token counting |
| **Tokenlint** | VS Code extension for real-time token counting and cost estimation |
| **fd** | Fast, user-friendly alternative to `find` |

---

## 8. Recommended Additions to the Guide

Based on this research, the highest-impact additions would be:

### Priority 1: Update Existing Content

1. **Update the Skills section** — The guide still describes the old `.claude/commands/` system. Skills are now the unified system with significantly more capabilities (dynamic context injection, context forking, agent skills standard).

2. **Update the Hooks section** — Add the two new hook types (prompt, agent), new events (SessionStart compact matcher, Stop, PreCompact), and input modification capability.

3. **Add Context7 to MCP servers** — This directly addresses the "Hallucinated APIs & Packages" mistake category, creating a natural cross-reference within the guide.

4. **Add ESLint MCP** — Practical, zero-config code quality integration that's officially supported.

### Priority 2: New Content

5. **Subagent isolation in the Context Window Management page** — Subagents are the most impactful context management tool and aren't mentioned in that section.

6. **"Document & Clear" workflow pattern** — Simple but powerful pattern for managing long-running tasks.

7. **MCP ecosystem overview** — Registries, installation methods, lazy loading, best practices for server management.

8. **Project context file cross-reference** — Brief mention that other tools (Cursor, Copilot, Windsurf) have equivalent files, with the unification strategy.

### Priority 3: Glossary & Links

9. **New glossary terms**: Context7, MCP Registry, Agent Skills, Subagent, Repomix, Context Engineering
10. **New link registry entries**: Context7, ESLint MCP, Agent Skills spec, Smithery.ai, MCP Registry

---

## Sources

### MCP Ecosystem
- [MCP Specification](https://modelcontextprotocol.io/specification/2025-11-25)
- [Official MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
- [Claude Code MCP Documentation](https://code.claude.com/docs/en/mcp)
- [Context7 (Upstash)](https://github.com/upstash/context7)
- [ESLint MCP Server](https://eslint.org/docs/latest/use/mcp)
- [Memory Keeper](https://github.com/mkreyman/mcp-memory-keeper)
- [Neural Memory](https://github.com/Hexecu/mcp-neuralmemory)
- [RepoMapper MCP](https://mcpservers.org/servers/pdavis68/RepoMapper)
- [Smithery.ai](https://smithery.ai/)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)

### Hooks & Skills
- [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Claude Code Hooks Reference](https://docs.claude.com/en/docs/claude-code/hooks)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Agent Skills Open Standard](https://agentskills.io)
- [Hooks Mastery Examples](https://github.com/disler/claude-code-hooks-mastery)

### Context Management
- [Context Engineering for Coding Agents (Martin Fowler)](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)
- [AI Coding Workflow (Addy Osmani)](https://addyosmani.com/blog/ai-coding-workflow/)
- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [Claude Code Subagents](https://code.claude.com/docs/en/sub-agents)
- [Compaction API](https://platform.claude.com/docs/en/build-with-claude/compaction)

### Code Indexing
- [Aider Repository Map](https://aider.chat/docs/repomap.html)
- [Repomix](https://github.com/yamadashy/repomix)
- [How Cursor Indexes Your Codebase](https://towardsdatascience.com/how-cursor-actually-indexes-your-codebase/)
- [Augment Code](https://www.augmentcode.com/)
- [Greptile State of AI Coding](https://www.greptile.com/state-of-ai-coding-2025)

### Project Context Files
- [Mastering Project Context Files (EclipseSource)](https://eclipsesource.com/blogs/2025/11/20/mastering-project-context-files-for-ai-coding-agents/)
- [Using CLAUDE.md Files](https://claude.com/blog/using-claude-md-files)
- [Copilot Custom Instructions](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)

### AI Coding Tools
- [Best AI Coding Agents 2026 (Faros AI)](https://www.faros.ai/blog/best-ai-coding-agents-2026)
- [Awesome Claude Code Subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
