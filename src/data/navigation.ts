import { findNavItem } from '../helpers/findNavItem'
import { ARCH_NAV_ORDER, ARCH_PAGE_IDS } from './archData'
import { PROMPT_NAV_ORDER, PROMPT_PAGE_IDS } from './promptData'

const ciPageIds = [
  'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
]

const bonusIds = ['storybook']

const npmNavOrder = [
  "roadmap",
  "bigpicture", "monorepo", "npm-vs-pnpm",
  "build", "tsconfig", "deps", "dist",
  "packagejson", "typescript", "versioning", "workflow",
  ...ciPageIds,
  ...bonusIds,
  "checklist",
]

export function getNavOrder(currentId?: string): string[] {
  if (currentId && ARCH_PAGE_IDS.has(currentId)) {
    return [...ARCH_NAV_ORDER]
  }
  if (currentId && PROMPT_PAGE_IDS.has(currentId)) {
    return [...PROMPT_NAV_ORDER]
  }
  // Order matches the Start Page roadmap steps and sidebar sections
  return [...npmNavOrder]
}

const staticTitles: Record<string, string> = {
  roadmap: "\u{1F680} Start Here",
  checklist: "\u2705 Publish Checklist",
  "external-resources": "\u{1F4DA} External Resources",
  glossary: "\u{1F4D6} Glossary",
  architecture: "\u{1F3D7}\uFE0F Architecture Guide",
  "arch-start": "\u{1F3D7}\uFE0F Start Here",
  "arch-what-is-a-stack": "\u{1F4DA} What is a Stack?",
  "arch-stack-mern": "\u{1F517} MERN Stack",
  "arch-stack-pfrn": "\u26A1 PFRN Stack",
  "arch-stack-mean": "\u{1F537} MEAN Stack",
  "arch-stack-lamp": "\u{1F4A1} LAMP Stack",
  "arch-stack-django": "\u{1F40D} Django Stack",
  "arch-stack-rails": "\u{1F6E4}\uFE0F Rails Stack",
  "arch-frameworks-intro": "\u{1F3E0} Full-Stack Frameworks",
  "arch-fw-nextjs": "\u25B2 Next.js",
  "arch-fw-react-router": "\u{1F500} React Router Framework",
  "arch-fw-tanstack-start": "\u{1F525} TanStack Start",
  "arch-fw-remix": "\u{1F4BF} Remix",
  "arch-how-it-connects": "\u{1F504} How it all Connects",
  "prompt-start": "\u{1F9E0} Start Here",
  "prompt-mistakes-logic": "\u26A1 Logic & Condition Errors",
  "prompt-mistakes-apis": "\u{1F47B} Hallucinated APIs & Packages",
  "prompt-mistakes-structural": "\u{1F3D7}\uFE0F Structural & Architectural Issues",
  "prompt-mistakes-style": "\u{1F3A8} Style & Formatting Drift",
  "prompt-ctx-system-prompt": "\u{1F4D0} System Prompt Architecture",
  "prompt-ctx-claude-md": "\u{1F4DD} CLAUDE.md / Memory Files",
  "prompt-ctx-chaining": "\u{1F517} Prompt Chaining & Decomposition",
  "prompt-ctx-few-shot": "\u{1F3AF} Few-Shot Examples",
  "prompt-ctx-window": "\u{1F4CA} Context Window Management",
  "prompt-ctx-thinking": "\u{1F4AD} Thinking & Reflection",
  "prompt-testing": "\u{1F9EA} Testing Best Practices",
  "prompt-claudemd-checklist": "\u2705 CLAUDE.md Checklist",
  "prompt-cli-reference": "\u2328\uFE0F CLI Quick Reference",
  "prompt-tools-advanced": "\u{1F527} Advanced Tool Usage",
  "prompt-meta-tooling": "\u{1F3ED} Meta-Tooling & Workflows",
}

export function getNavTitle(id: string): string {
  if (staticTitles[id]) return staticTitles[id]
  return findNavItem(id)?.title ?? id
}
