import { findNavItem } from '../helpers/findNavItem'
import { ARCH_NAV_ORDER, ARCH_PAGE_IDS } from './archData'
import { TESTING_NAV_ORDER, TESTING_PAGE_IDS } from './testingData'
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
  if (currentId && TESTING_PAGE_IDS.has(currentId)) {
    return [...TESTING_NAV_ORDER]
  }
  if (currentId && PROMPT_PAGE_IDS.has(currentId)) {
    return [...PROMPT_NAV_ORDER]
  }
  // Order matches the Start Page roadmap steps and sidebar sections
  return [...npmNavOrder]
}

const staticTitles: Record<string, string> = {
  roadmap: "Start Here \u{1F680}",
  checklist: "Publish Checklist \u2705",
  "external-resources": "External Resources \u{1F4DA}",
  glossary: "Glossary \u{1F4D6}",
  architecture: "Architecture Guide \u{1F3D7}\uFE0F",
  "arch-start": "Start Here \u{1F3D7}\uFE0F",
  "arch-what-is-a-stack": "What is a Stack? \u{1F4DA}",
  "arch-stack-mern": "MERN Stack \u{1F517}",
  "arch-stack-pfrn": "PFRN Stack \u26A1",
  "arch-stack-mean": "MEAN Stack \u{1F537}",
  "arch-stack-lamp": "LAMP Stack \u{1F4A1}",
  "arch-stack-django": "Django Stack \u{1F40D}",
  "arch-stack-rails": "Rails Stack \u{1F6E4}\uFE0F",
  "arch-frameworks-intro": "Full-Stack Frameworks \u{1F3E0}",
  "arch-fw-nextjs": "Next.js \u25B2",
  "arch-fw-react-router": "React Router Framework \u{1F500}",
  "arch-fw-tanstack-start": "TanStack Start \u{1F525}",
  "arch-fw-remix": "Remix \u{1F4BF}",
  "arch-how-it-connects": "How it all Connects \u{1F504}",
  "test-start": "Start Here \u{1F9EA}",
  "test-overview": "Testing Pyramid \u{1F53A}",
  "test-unit": "Unit Testing \u{1F9E9}",
  "test-component": "Component Testing \u{1F9F1}",
  "test-e2e": "E2E Testing \u{1F310}",
  "test-comparison": "At a Glance \u{1F4CA}",
  "test-best-practices": "Best Practices \u2705",
  "test-review-checklist": "Quick Test Review \u{1F4CB}",
  "test-tools": "Popular Tools \u{1F9F0}",
  "prompt-start": "Start Here \u{1F9E0}",
  "prompt-mistakes-logic": "Logic & Condition Errors \u26A1",
  "prompt-mistakes-apis": "Hallucinated APIs & Packages \u{1F47B}",
  "prompt-mistakes-structural": "Structural & Architectural Issues \u{1F3D7}\uFE0F",
  "prompt-mistakes-style": "Style & Formatting Drift \u{1F3A8}",
  "prompt-ctx-system-prompt": "System Prompt Architecture \u{1F4D0}",
  "prompt-ctx-claude-md": "CLAUDE.md / Memory Files \u{1F4DD}",
  "prompt-ctx-chaining": "Prompt Chaining & Decomposition \u{1F517}",
  "prompt-ctx-few-shot": "Few-Shot Examples \u{1F3AF}",
  "prompt-ctx-window": "Context Window Management \u{1F4CA}",
  "prompt-ctx-thinking": "Thinking & Reflection \u{1F4AD}",
  "prompt-testing": "Testing Best Practices \u{1F9EA}",
  "prompt-claudemd-checklist": "CLAUDE.md Checklist \u2705",
  "prompt-cli-reference": "CLI Quick Reference \u2328\uFE0F",
  "prompt-tools-advanced": "Advanced Tool Usage \u{1F527}",
  "prompt-meta-tooling": "Meta-Tooling & Workflows \u{1F3ED}",
}

export function getNavTitle(id: string): string {
  if (staticTitles[id]) return staticTitles[id]
  return findNavItem(id)?.title ?? id
}
