import type { GuideSection, StartPageData, GuideManifest, ChecklistManifest, ChecklistBaseSection } from './guideTypes'

// ── Types ────────────────────────────────────────────────────────────

export interface CmdPrinciple {
  name: string
  description: string
  do: string
  dont: string
}

export interface CmdAntiPattern {
  name: string
  problem: string
  consequence: string
  fix: string
}

export interface CmdCategory {
  name: string
  items: string[]
  example: string
}

export interface CmdLayout {
  name: string
  description: string
  code: string
}

export interface CmdFeature {
  name: string
  description: string
  code: string | null
}

export interface CmdHierarchyRow {
  type: string
  location: string
  purpose: string
  sharedWith: string
}

// ── Intro data ──────────────────────────────────────────────────────

export const CMD_INTRO_KEY_POINTS: string[] = [
  'Loaded automatically at the start of every Claude Code session',
  'The highest-leverage configuration point in the entire Claude Code harness',
  'Affects every phase of your workflow \u2014 planning, implementation, testing, review',
  'Can be shared with your team via source control',
]

export const CMD_INTRO_WARNING =
  'Because CLAUDE.md goes into every session, a bad line here has exponentially more impact than a bad line of code. Craft it carefully.'

// ── File hierarchy data ─────────────────────────────────────────────

export const CMD_HIERARCHY_ROWS: CmdHierarchyRow[] = [
  {
    type: 'Enterprise Policy',
    location: 'macOS: /Library/Application Support/ClaudeCode/CLAUDE.md\nLinux: /etc/claude-code/CLAUDE.md\nWindows: C:\\Program Files\\ClaudeCode\\CLAUDE.md',
    purpose: 'Org-wide standards managed by IT/DevOps',
    sharedWith: 'All users in org',
  },
  {
    type: 'Project Memory',
    location: './CLAUDE.md or ./.claude/CLAUDE.md',
    purpose: 'Team-shared project instructions',
    sharedWith: 'Team via source control',
  },
  {
    type: 'User Memory',
    location: '~/.claude/CLAUDE.md',
    purpose: 'Personal preferences for all projects',
    sharedWith: 'Just you (all projects)',
  },
  {
    type: 'Local Project',
    location: './CLAUDE.local.md',
    purpose: 'Personal project-specific preferences',
    sharedWith: 'Just you (this project only)',
  },
]

export const CMD_HIERARCHY_KEY_POINTS: string[] = [
  'Claude recursively reads CLAUDE.md files from cwd up to the root directory',
  'Nested CLAUDE.md files in subdirectories load only when Claude reads files in those subtrees',
  'CLAUDE.local.md is auto-added to .gitignore \u2014 ideal for private preferences',
  'Use the .claude/rules/ directory to split rules into multiple focused files',
]

// ── What to include (WHY / WHAT / HOW) ──────────────────────────────

export const CMD_CATEGORIES: CmdCategory[] = [
  {
    name: 'WHY \u2014 Purpose & Context',
    items: [
      'What the project does and who it\u2019s for',
      'Key architectural decisions and the reasoning behind them',
      'Business constraints or domain-specific context Claude needs',
    ],
    example: `# Project Overview
Acme Dashboard \u2014 internal analytics tool for the sales team.
Built with React + TanStack Router + TanStack Query.
Data comes from our REST API at /api/v2/.`,
  },
  {
    name: 'WHAT \u2014 Tech Stack & Structure',
    items: [
      'Languages, frameworks, and key libraries',
      'Project structure and where things live (especially in monorepos)',
      'Important patterns: state management, data fetching, routing',
    ],
    example: `# Stack
- TypeScript strict mode
- React 19 with TanStack Router for routing
- TanStack Query for server state
- Zustand for client state (see src/stores/)
- Vite for bundling`,
  },
  {
    name: 'HOW \u2014 Workflows & Commands',
    items: [
      'Build, test, and lint commands',
      'How to verify changes (run specific tests, not the whole suite)',
      'Git workflow preferences',
      'Package manager (pnpm, bun, npm, etc.)',
    ],
    example: `# Commands
- pnpm dev          # start dev server
- pnpm test:unit    # run unit tests
- pnpm typecheck    # TypeScript check
- pnpm lint:fix     # auto-fix lint issues

# Workflow
- Run typecheck after making code changes
- Prefer running single test files over the full suite`,
  },
]

// ── Core writing principles ─────────────────────────────────────────

export const CMD_PRINCIPLES: CmdPrinciple[] = [
  {
    name: 'Less Is More',
    description:
      'Frontier thinking models can reliably follow ~150\u2013200 instructions. Claude Code\u2019s system prompt already uses ~50 of those. Every instruction you add competes for attention.',
    do: 'Keep your CLAUDE.md under 60\u2013100 lines. HumanLayer\u2019s root file is under 60 lines.',
    dont: 'Don\u2019t stuff every possible command, edge case, or style rule into the file.',
  },
  {
    name: 'Be Specific, Not Vague',
    description:
      'Concrete instructions are followed more reliably than abstract ones.',
    do: '\u201CUse 2-space indentation\u201D or \u201CUse ES modules (import/export), not CommonJS (require)\u201D',
    dont: '\u201CFormat code properly\u201D or \u201CFollow best practices\u201D',
  },
  {
    name: 'Keep It Universally Applicable',
    description:
      'CLAUDE.md loads in every session. If an instruction only matters for some tasks, it dilutes attention for all other tasks.',
    do: 'Include only instructions that apply to virtually every task in the project.',
    dont: 'Don\u2019t include task-specific instructions like database schema conventions unless that\u2019s your whole project.',
  },
  {
    name: 'Use Progressive Disclosure',
    description:
      'Instead of front-loading all information, point Claude to where it can find details when it needs them.',
    do: 'Create an agent_docs/ folder with detailed references, then list them in CLAUDE.md: \u201CSee @agent_docs/testing.md for test conventions\u201D',
    dont: 'Don\u2019t paste entire architecture docs or code snippets inline.',
  },
  {
    name: 'Prefer Pointers to Copies',
    description:
      'Code snippets in CLAUDE.md go stale. File references stay accurate.',
    do: '\u201CSee src/stores/authStore.ts for the auth state pattern\u201D',
    dont: 'Don\u2019t paste example code blocks that will drift from the actual codebase.',
  },
  {
    name: 'Don\u2019t Use Claude as a Linter',
    description:
      'LLMs are slow and expensive compared to deterministic formatters. Claude is an in-context learner \u2014 it picks up patterns from your existing code.',
    do: 'Set up a Stop hook that runs your formatter/linter (like Biome) and feeds errors back to Claude.',
    dont: 'Don\u2019t fill CLAUDE.md with code style rules that a linter could enforce.',
  },
]

// ── Structuring larger projects ─────────────────────────────────────

export const CMD_LAYOUTS: CmdLayout[] = [
  {
    name: 'Rules Directory',
    description:
      'All .md files in .claude/rules/ auto-load as project memory with the same priority as .claude/CLAUDE.md. Rules can be scoped to specific files using YAML frontmatter.',
    code: `your-project/
\u251C\u2500\u2500 .claude/
\u2502   \u251C\u2500\u2500 CLAUDE.md           # Main project instructions
\u2502   \u2514\u2500\u2500 rules/
\u2502       \u251C\u2500\u2500 code-style.md   # Code style guidelines
\u2502       \u251C\u2500\u2500 testing.md      # Testing conventions
\u2502       \u2514\u2500\u2500 security.md     # Security requirements`,
  },
  {
    name: 'Progressive Disclosure with @imports',
    description:
      'CLAUDE.md can import additional files using @path/to/import syntax. Imports support relative and absolute paths, with recursive imports up to 5 levels deep.',
    code: `# CLAUDE.md
See @README for project overview.
See @package.json for available commands.

# Detailed Guides
- Git workflow: @docs/git-instructions.md
- API patterns: @docs/api-conventions.md`,
  },
  {
    name: 'Scoped Rules with Frontmatter',
    description:
      'Rules files can target specific file patterns so they only apply when Claude is working on matching files.',
    code: `---
# .claude/rules/react-components.md
paths:
  - "src/components/**"
  - "src/pages/**"
---
# React Component Rules
- Use functional components with hooks
- Co-locate tests as ComponentName.test.tsx`,
  },
]

// ── Common anti-patterns ────────────────────────────────────────────

export const CMD_ANTI_PATTERNS: CmdAntiPattern[] = [
  {
    name: 'The Over-Specified File',
    problem:
      'Your CLAUDE.md is hundreds of lines long, covering every possible scenario.',
    consequence:
      'Important rules get lost in the noise. Claude ignores half of it. Instruction-following quality degrades uniformly across ALL instructions as count increases.',
    fix: 'Ruthlessly prune. If Claude already does something correctly without the instruction, delete it. Convert task-specific instructions to separate docs or slash commands.',
  },
  {
    name: 'The Hotfix Dump',
    problem:
      'You append a new rule every time Claude does something wrong: \u201CNEVER use any on TypeScript types\u201D \u201CALWAYS run tests before committing\u201D etc.',
    consequence:
      'The file becomes a graveyard of one-off corrections that aren\u2019t universally applicable. Claude Code\u2019s system prompt actually tells Claude it can ignore CLAUDE.md contents it deems irrelevant.',
    fix: 'Ask yourself: does this apply to every task? If not, put it in a scoped rule, a slash command, or a hook instead.',
  },
  {
    name: 'The Style Guide',
    problem:
      'You paste your entire ESLint config or style guide into CLAUDE.md.',
    consequence:
      'You burn context tokens on something a linter handles better, faster, and cheaper. Claude\u2019s instruction-following on everything else gets worse.',
    fix: 'Use a Stop hook to run your linter/formatter. Claude learns patterns from your existing code \u2014 it doesn\u2019t need a style manual.',
  },
  {
    name: 'Auto-Generated & Never Edited',
    problem: 'You ran /init once and never touched the file again.',
    consequence:
      '/init gives you a reasonable starting point, but it can\u2019t know your team\u2019s actual conventions, priorities, or architectural decisions. The generated file may include unnecessary content.',
    fix: 'Use /init as a starting point, then manually curate every line. Review periodically as your project evolves.',
  },
  {
    name: 'Inline Code Snippets',
    problem:
      'You include example code blocks showing patterns to follow.',
    consequence:
      'Snippets go stale as your codebase evolves, leading Claude to follow outdated patterns.',
    fix: 'Use file:line references to point at the real code: \u201CSee src/stores/authStore.ts for the Zustand pattern\u201D.',
  },
]

// ── Useful features ─────────────────────────────────────────────────

export const CMD_FEATURES: CmdFeature[] = [
  {
    name: '# Shortcut',
    description:
      'Start your input with # to quickly add a memory. You\u2019ll be prompted to choose which memory file to store it in.',
    code: '# Always use descriptive variable names',
  },
  {
    name: '/memory Command',
    description:
      'Opens any memory file in your system editor for more extensive additions or organization.',
    code: '> /memory',
  },
  {
    name: '/init Command',
    description:
      'Generates a starter CLAUDE.md by analyzing your project\u2019s build systems, test frameworks, and code patterns. Use as a starting point, then refine.',
    code: '> /init',
  },
  {
    name: 'Auto Memory',
    description:
      'A persistent directory where Claude records its own learnings and patterns as it works. Unlike CLAUDE.md (instructions you write), auto memory contains notes Claude writes for itself. Opt in with CLAUDE_CODE_DISABLE_AUTO_MEMORY=0.',
    code: 'export CLAUDE_CODE_DISABLE_AUTO_MEMORY=0  # Force on',
  },
  {
    name: 'Hooks Instead of Instructions',
    description:
      'Convert mechanical rules into hooks that run automatically. A Stop hook running your formatter is more reliable than telling Claude to format code.',
    code: null,
  },
  {
    name: 'Slash Commands for Task-Specific Context',
    description:
      'Create commands in .claude/commands/ that inject relevant context only when invoked, keeping CLAUDE.md lean.',
    code: null,
  },
]

// ── Complete example ────────────────────────────────────────────────

export const CMD_FULL_EXAMPLE = `# Acme Dashboard

Internal analytics dashboard for the sales team.
React SPA with TanStack Router, TanStack Query, and Zustand.

## Stack

- TypeScript (strict mode)
- React 19 + Vite
- TanStack Router (file-based routes in src/routes/)
- TanStack Query for server state
- Zustand for client state (stores in src/stores/)
- Tailwind CSS for styling
- Vitest + React Testing Library for tests

## Commands

- pnpm dev             # dev server on :5173
- pnpm build           # production build
- pnpm test:unit       # run unit tests
- pnpm test -- path    # run a single test file
- pnpm typecheck       # TypeScript check
- pnpm lint:fix        # auto-fix with Biome

## Workflow

- Run typecheck after code changes
- Prefer running single tests, not the full suite
- Use Biome for formatting (do not format manually)
- Commit messages: conventional commits (feat:, fix:, chore:)

## Architecture

- API client: src/lib/api.ts (wraps fetch with auth headers)
- Auth: see src/stores/authStore.ts for the pattern
- Shared components: src/components/ui/ (shadcn-based)
- Route loaders handle data fetching via TanStack Query

## Guides

- Testing patterns: @docs/testing.md
- API conventions: @docs/api-patterns.md
- Component guidelines: @docs/components.md`

// ── Self-review checklist ───────────────────────────────────────────

export const CMD_REVIEW_CHECKLIST: ChecklistBaseSection[] = [
  {
    id: 'content',
    name: 'Content',
    icon: '\u{1F4DD}',
    items: [
      { label: 'Covers WHY (purpose), WHAT (stack/structure), and HOW (commands/workflow)' },
      { label: 'Every instruction is universally applicable to all tasks' },
      { label: 'No task-specific instructions that belong in scoped rules or slash commands' },
      { label: 'No code style rules that a linter/formatter should handle' },
      { label: 'No inline code snippets that could go stale (use file references instead)' },
    ],
  },
  {
    id: 'length-clarity',
    name: 'Length & Clarity',
    icon: '\u{1F4CF}',
    items: [
      { label: 'Under 100 lines (ideally under 60)' },
      { label: 'Each instruction is specific and actionable' },
      { label: 'Organized with clear markdown headings' },
      { label: 'Uses bullet points for individual instructions' },
      { label: 'Human-readable \u2014 a new team member could understand it' },
    ],
  },
  {
    id: 'structure',
    name: 'Structure',
    icon: '\u{1F4C1}',
    items: [
      { label: 'Task-specific docs live in separate files (agent_docs/ or .claude/rules/)' },
      { label: 'Uses @imports or references for detailed guides' },
      { label: 'Scoped rules use YAML frontmatter paths where appropriate' },
      { label: 'CLAUDE.local.md exists for personal preferences not shared with team' },
    ],
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    icon: '\u{1F504}',
    items: [
      { label: 'Reviewed and pruned in the last month' },
      { label: 'No leftover hotfix rules from one-off issues' },
      { label: 'File references point to files that still exist' },
      { label: 'Reflects current project architecture and conventions' },
    ],
  },
]

// ── Navigation ──────────────────────────────────────────────────────

export const CMD_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['cmd-start'] },
  { label: 'Foundations', ids: ['cmd-intro', 'cmd-hierarchy'] },
  { label: 'Writing', ids: ['cmd-content', 'cmd-principles', 'cmd-structure'] },
  { label: 'Pitfalls & Tools', ids: ['cmd-anti-patterns', 'cmd-features'] },
  { label: 'Reference', ids: ['cmd-example'] },
]

// ── Start page data ─────────────────────────────────────────────────

export const CMD_START_PAGE_DATA: StartPageData = {
  subtitle: 'How to write, structure, and maintain CLAUDE.md files \u2014 the highest-leverage configuration point in Claude Code.',
  tip: 'Sourced from Anthropic\u2019s official docs, best practices, and community insights.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Foundations',
      description: 'Understand what CLAUDE.md is, how the file hierarchy works, and where different types of instructions belong.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'cmd-intro': 'What CLAUDE.md is and why it\u2019s the most impactful file in your project.',
        'cmd-hierarchy': 'The four memory locations and how they load \u2014 enterprise, project, user, and local.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Writing Your File',
      description: 'Learn the WHY/WHAT/HOW framework, core writing principles, and how to scale for larger projects.',
      sectionLabel: 'Writing',
      subItemDescriptions: {
        'cmd-content': 'The three dimensions every CLAUDE.md should cover: purpose, stack, and workflow.',
        'cmd-principles': 'Six battle-tested principles \u2014 less is more, be specific, progressive disclosure, and more.',
        'cmd-structure': 'Rules directories, @imports, and scoped frontmatter for growing projects.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Pitfalls & Tools',
      description: 'Avoid common mistakes and leverage Claude Code features that complement your CLAUDE.md.',
      sectionLabel: 'Pitfalls & Tools',
      subItemDescriptions: {
        'cmd-anti-patterns': 'The five most common mistakes teams make \u2014 and how to fix each one.',
        'cmd-features': 'Memory shortcuts, /init, hooks, slash commands, and auto memory.',
      },
    },
    {
      type: 'bonus',
      title: 'Reference',
      description: 'A complete, well-structured example file and a self-review checklist for auditing your own.',
      sectionLabel: 'Reference',
      subItemDescriptions: {
        'cmd-example': 'A production-ready CLAUDE.md under 50 lines \u2014 copy and adapt.',
      },
    },
  ],
  relatedGuides: ['prompt-engineering', 'claude-skills'],
}

export const CMD_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'claude-md',
    icon: '📋',
    title: 'Writing Effective CLAUDE.md Files',
    startPageId: 'cmd-start',
    description: 'How to write, structure, and maintain CLAUDE.md files \u2014 file hierarchy, writing principles, anti-patterns, and a self-review checklist.',
    category: 'ai-tooling',
    dateCreated: '2026-02-24',
    dateModified: '2026-02-26',
    sections: CMD_GUIDE_SECTIONS,
  },
  startPageData: CMD_START_PAGE_DATA,
}

export const CMD_REVIEW_CHECKLIST_MANIFEST: ChecklistManifest = {
  id: 'cmd-review',
  pageId: 'cmd-review-checklist',
  sourceGuideId: 'claude-md',
  title: 'CLAUDE.md Self-Review',
  sections: CMD_REVIEW_CHECKLIST,
}
