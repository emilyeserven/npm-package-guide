import type { ChecklistSection } from './types'
import type { GuideSection } from '../guideTypes'

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
    'prompt-mistakes-logic', 'prompt-mistakes-apis', 'prompt-mistakes-structural',
    'prompt-mistakes-style', 'prompt-testing',
  ]},
  { label: 'Context Management', ids: [
    'prompt-ctx-system-prompt', 'prompt-ctx-claude-md', 'prompt-ctx-chaining',
    'prompt-ctx-few-shot', 'prompt-ctx-window', 'prompt-ctx-thinking',
    'prompt-claudemd-checklist',
  ]},
  { label: 'Tooling & Reference', ids: [
    'prompt-cli-reference', 'prompt-tools-advanced', 'prompt-meta-tooling',
  ]},
]

