import type { ChecklistSection } from './types'
import type { GuideSection, StartPageData, GuideManifest, ChecklistManifest } from '../guideTypes'
import { META_TOOLS } from './techniques'

export const CLAUDEMD_CHECKLIST: ChecklistSection[] = [
  {
    id: 'project-identity',
    name: 'Project Identity',
    icon: '\u{1F3F7}\uFE0F',
    items: [
      { label: 'Project name and one-line description', description: 'Helps the AI understand the domain and scope immediately.' },
      { label: 'Tech stack with version numbers', description: 'e.g., "React 19, TypeScript 5.x, Vite 7, pnpm" \u2014 prevents hallucinated APIs from wrong versions.' },
      { label: 'Package manager', description: 'Specify npm, pnpm, yarn, or bun so generated commands use the right tool.' },
      { label: 'Node.js version', description: 'Prevents the AI from using APIs unavailable in your runtime.' },
    ],
  },
  {
    id: 'commands',
    name: 'Key Commands',
    icon: '\u2328\uFE0F',
    items: [
      { label: 'Dev server command', description: 'e.g., "pnpm dev" \u2014 the AI needs this to test changes.' },
      { label: 'Build command', description: 'e.g., "pnpm build" \u2014 for verifying production builds.' },
      { label: 'Lint command', description: 'e.g., "pnpm lint" or "pnpm lint --fix" \u2014 ensures generated code passes linting.' },
      { label: 'Test command', description: 'e.g., "pnpm test" or "vitest run" \u2014 so the AI can validate its changes.' },
      { label: 'Type-check command', description: 'e.g., "npx tsc --noEmit" if separate from build.' },
    ],
  },
  {
    id: 'conventions',
    name: 'Conventions & Patterns',
    icon: '\u{1F4CF}',
    items: [
      { label: 'Naming conventions', description: 'camelCase vs snake_case, PascalCase for components, kebab-case for files, etc.' },
      { label: 'File organization rules', description: 'Where new components go, how tests are co-located, barrel export patterns.' },
      { label: 'Import style', description: 'Path aliases (@/), absolute vs relative, barrel imports vs direct.' },
      { label: 'Styling approach', description: 'Tailwind, CSS modules, styled-components \u2014 and how to apply dark mode.' },
      { label: 'State management pattern', description: 'Which library (Zustand, TanStack Query, Redux) and when to use each.' },
      { label: 'Error handling pattern', description: 'Error boundaries, try/catch rules, how to log errors.' },
    ],
  },
  {
    id: 'pitfalls',
    name: 'Common Pitfalls to Avoid',
    icon: '\u26A0\uFE0F',
    items: [
      { label: 'Deprecated patterns', description: '"Do NOT use X \u2014 we migrated to Y" prevents the AI from reverting to old patterns.' },
      { label: 'Known bad dependencies', description: 'Packages that conflict with your setup or should never be installed.' },
      { label: 'Architecture boundaries', description: '"Never import from src/server in src/client" \u2014 enforces module boundaries.' },
      { label: 'Security requirements', description: 'OWASP rules, input sanitization requirements, auth patterns to follow.' },
    ],
  },
  {
    id: 'sync',
    name: 'Keeping It In Sync',
    icon: '\u{1F504}',
    items: [
      { label: 'Update after migrations', description: 'When you switch libraries or upgrade versions, update CLAUDE.md immediately.' },
      { label: 'Add corrections for repeated mistakes', description: 'If the AI keeps making the same error, add a "Do NOT" rule.' },
      { label: 'Review during PR reviews', description: 'If a PR changes conventions, the CLAUDE.md should change too.' },
      { label: 'Use folder-level CLAUDE.md for submodules', description: 'Place additional CLAUDE.md files in subdirectories for area-specific context.' },
    ],
  },
]

// ── Navigation ───────────────────────────────────────────────────────

export const PROMPT_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['prompt-start'] },
  { label: 'Common AI Mistakes', ids: [
    'prompt-mistakes-logic', 'prompt-mistakes-apis', 'prompt-mistakes-react', 'prompt-mistakes-security',
    'prompt-mistakes-csrf', 'prompt-mistakes-supply-chain', 'prompt-mistakes-prompt-injection',
    'prompt-mistakes-structural', 'prompt-mistakes-design', 'prompt-mistakes-tailwind', 'prompt-testing',
    'prompt-mistakes-style',
  ]},
  { label: 'Context Management', ids: [
    'prompt-ctx-system-prompt', 'prompt-ctx-claude-md', 'prompt-ctx-chaining',
    'prompt-ctx-few-shot', 'prompt-ctx-window', 'prompt-ctx-thinking',
  ]},
  { label: 'Tooling & Reference', ids: [
    'prompt-coding-tools', 'prompt-cli-reference', 'prompt-meta-tooling',
  ]},
  { label: 'Advanced Tools', ids: [
    'prompt-tools-overview', 'prompt-tools-mcp', 'prompt-tools-skills', 'prompt-tools-claude-skills', 'prompt-tools-hooks', 'prompt-tools-optimization',
  ]},
]

// ── Start page data ──────────────────────────────────────────────────

export const PROMPT_START_PAGE_DATA: StartPageData = {
  subtitle: 'Practical patterns for working with AI coding assistants.',
  tip: 'Learn what to watch for, how to steer AI effectively, and the CLI commands AI uses most.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Common AI Mistakes',
      description: 'Learn the most frequent mistakes AI coding assistants make and how to prevent them with better prompts.',
      sectionLabel: 'Common AI Mistakes',
      subItemDescriptions: {
        'prompt-mistakes-logic': 'Off-by-one errors, inverted conditions, edge case blindness, and math formula mistakes.',
        'prompt-mistakes-apis': 'Non-existent packages, deprecated APIs, and cross-language confusion.',
        'prompt-mistakes-react': 'Stale closures, broken hook rules, incorrect keys, and prop drilling.',
        'prompt-mistakes-security': 'XSS vectors, exposed secrets, insecure auth, and injection vulnerabilities.',
        'prompt-mistakes-csrf': 'Missing CSRF tokens, SameSite cookies, and GET routes that modify data.',
        'prompt-mistakes-supply-chain': 'Unvetted packages, permissive version ranges, and missing dependency auditing.',
        'prompt-mistakes-prompt-injection': 'Unvalidated LLM output execution, flat prompts, and overprivileged AI agents.',
        'prompt-mistakes-structural': 'Over-engineering, incomplete code, ignored project patterns, and security gaps.',
        'prompt-mistakes-design': 'Hardcoded layouts, missing accessibility, design spec drift, and z-index chaos.',
        'prompt-mistakes-tailwind': 'Arbitrary values, v3/v4 confusion, dynamic class purging, and missing dark mode.',
        'prompt-testing': 'Common AI mistakes in E2E and unit testing contexts.',
        'prompt-mistakes-style': 'Inconsistent naming, unnecessary comments, and formatting drift.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Context Management',
      description: 'Techniques for steering AI effectively \u2014 from system prompts and memory files to prompt chaining and few-shot examples.',
      sectionLabel: 'Context Management',
      subItemDescriptions: {
        'prompt-ctx-system-prompt': 'Structure your system prompt like a well-organized document for maximum impact.',
        'prompt-ctx-claude-md': 'Persistent project context that survives across sessions.',
        'prompt-ctx-chaining': 'Break complex tasks into sequential, focused steps to reduce hallucination.',
        'prompt-ctx-few-shot': 'Show 2\u20133 examples of desired output to establish a clear pattern.',
        'prompt-ctx-window': 'Keep your context lean and high-signal for better model performance.',
        'prompt-ctx-thinking': 'Ask the model to reason step-by-step before acting.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Tooling & Reference',
      description: 'CLI commands, tool comparisons, and the workflows that surround AI-assisted development.',
      customSubItems: [
        {
          title: 'AI Coding Tools Compared',
          description: 'Interactive comparison of Claude Code, Cursor, Copilot, Windsurf, and other AI coding tools.',
          jumpTo: 'prompt-coding-tools',
        },
        {
          title: 'CLI Quick Reference',
          description: 'Searchable, filterable table of CLI commands with category and type filters.',
          jumpTo: 'prompt-cli-reference',
        },
        {
          title: 'Meta-Tooling & Workflows',
          description: 'CI/CD integration, prompt versioning, team workflows, and evaluating AI output.',
          jumpTo: 'prompt-meta-tooling',
          tags: META_TOOLS.map(t => ({ icon: t.icon, name: t.name })),
        },
      ],
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Advanced Tools',
      description: 'Deep dives into MCP servers, custom slash commands, skills, hooks, and performance optimization.',
      sectionLabel: 'Advanced Tools',
      subItemDescriptions: {
        'prompt-tools-overview': 'Which tool to use when, and how they work together.',
        'prompt-tools-mcp': 'Configure MCP servers for external data, APIs, and custom tools.',
        'prompt-tools-skills': 'Create reusable slash commands for team-wide consistency.',
        'prompt-tools-claude-skills': 'Multi-step prompt workflows with verification and tool orchestration.',
        'prompt-tools-hooks': 'Automate workflows with event-driven shell command hooks.',
        'prompt-tools-optimization': 'Headless mode, batch processing, and context management strategies.',
      },
    },
  ],
}


export const PROMPT_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'prompt-engineering',
    icon: '🧠',
    title: 'Prompt Engineering',
    startPageId: 'prompt-start',
    description: 'Practical patterns for working with AI coding assistants \u2014 common mistakes to watch for, context management techniques, and CLI commands.',
    category: 'ai-tooling',
    dateCreated: '2026-02-16',
    dateModified: '2026-02-26',
    sections: PROMPT_GUIDE_SECTIONS,
  },
  startPageData: PROMPT_START_PAGE_DATA,
}

export const PROMPT_CHECKLIST_MANIFEST: ChecklistManifest = {
  id: 'claudemd',
  pageId: 'prompt-claudemd-checklist',
  sourceGuideId: 'prompt-engineering',
  title: 'CLAUDE.md Checklist',
  sections: CLAUDEMD_CHECKLIST,
}
