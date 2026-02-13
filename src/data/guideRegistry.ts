import type { GuideSection, GuideDefinition, PageHeading } from './guideTypes'
import { NPM_GUIDE_SECTIONS } from './npmPackageData'
import { ARCH_GUIDE_SECTIONS } from './archData'
import { TESTING_GUIDE_SECTIONS } from './testingData'
import { PROMPT_GUIDE_SECTIONS } from './promptData'

export type { GuideSection, GuideDefinition, PageHeading }

// ── All guides ───────────────────────────────────────────────────────

export const guides: GuideDefinition[] = [
  {
    id: 'npm-package',
    icon: '\u{1F4E6}',        // 📦
    title: 'Web App vs. NPM Package',
    startPageId: 'roadmap',
    description:
      'Learn the differences between building a web app and an npm package, from project setup through CI/CD and publishing.',
    sections: NPM_GUIDE_SECTIONS,
  },
  {
    id: 'architecture',
    icon: '\u{1F3D7}\uFE0F',  // 🏗️
    title: 'Architecture Guide',
    startPageId: 'arch-start',
    description:
      'Understand common frontend architecture patterns and how to structure your projects for maintainability and scale.',
    sections: ARCH_GUIDE_SECTIONS,
  },
  {
    id: 'testing',
    icon: '\u{1F9EA}',        // 🧪
    title: 'Testing Guide',
    startPageId: 'test-start',
    description:
      'Learn frontend testing fundamentals \u2014 the testing pyramid, best practices, and how to choose the right tools for unit, component, and E2E tests.',
    sections: TESTING_GUIDE_SECTIONS,
  },
  {
    id: 'prompt-engineering',
    icon: '\u{1F9E0}',        // 🧠
    title: 'Prompt Engineering',
    startPageId: 'prompt-start',
    description:
      'Practical patterns for working with AI coding assistants \u2014 common mistakes to watch for, context management techniques, and CLI commands.',
    sections: PROMPT_GUIDE_SECTIONS,
  },
]

// ── Derived lookups ─────────────────────────────────────────────────

const pageToGuide = new Map<string, string>()
for (const guide of guides) {
  for (const section of guide.sections) {
    for (const id of section.ids) {
      pageToGuide.set(id, guide.id)
    }
  }
}
// Legacy route: #/architecture renders ArchStartPage
pageToGuide.set('architecture', 'architecture')

export function getGuideForPage(pageId: string): GuideDefinition | undefined {
  const guideId = pageToGuide.get(pageId)
  return guideId ? guides.find(g => g.id === guideId) : undefined
}

export function getNavOrderForPage(pageId: string): string[] {
  const guide = getGuideForPage(pageId)
  if (!guide) return []
  return guide.sections.flatMap(s => s.ids)
}

// ── Page headings ─────────────────────────────────────────────────────
// Maps page IDs to their section headings (TocLink / SectionSubheading).
// Used by CMD-K for sub-item search. Pages without headings are omitted.
// When adding or modifying page headings, update this map to keep
// CMD-K search in sync.

const pageHeadings: Record<string, PageHeading[]> = {
  // ── NPM Package Guide: Building a Package ──────────────────────────

  'bigpicture': [
    { id: 'toc-webapp', title: 'Web App' },
    { id: 'toc-pkg', title: 'NPM Package' },
  ],
  'workflow': [
    { id: 'toc-webapp', title: 'Web App' },
    { id: 'toc-pkg', title: 'NPM Package' },
    { id: 'toc-explainer', title: "What's npm link / pnpm link?" },
    { id: 'toc-gotcha', title: 'Watch out' },
  ],
  'npm-vs-pnpm': [
    { id: 'toc-col1', title: 'npm' },
    { id: 'toc-col2', title: 'pnpm' },
    { id: 'toc-explainer', title: 'npm vs pnpm — a backend analogy' },
    { id: 'toc-gotcha', title: 'Watch out' },
  ],
  'packagejson': [
    { id: 'toc-webapp', title: 'Web App' },
    { id: 'toc-pkg', title: 'NPM Package' },
    { id: 'toc-explainer', title: "Why 'exports' instead of just 'main'?" },
  ],
  'deps': [
    { id: 'toc-webapp', title: 'Web App' },
    { id: 'toc-pkg', title: 'NPM Package' },
    { id: 'toc-explainer', title: "What's peerDependencies?" },
    { id: 'toc-gotcha', title: 'Watch out' },
  ],
  'typescript': [
    { id: 'toc-webapp', title: 'Web App' },
    { id: 'toc-pkg', title: 'NPM Package' },
    { id: 'toc-explainer', title: 'What are .d.ts files?' },
    { id: 'toc-gotcha', title: 'Watch out' },
  ],
  'tsconfig': [
    { id: 'toc-col1', title: 'Key Settings' },
    { id: 'toc-col2', title: 'Paths & Output' },
    { id: 'toc-explainer', title: 'tsconfig.json — a backend analogy' },
    { id: 'toc-gotcha', title: 'Watch out' },
  ],
  'build': [
    { id: 'toc-webapp', title: 'Web App' },
    { id: 'toc-pkg', title: 'NPM Package' },
    { id: 'toc-explainer', title: "What's a bundler?" },
    { id: 'toc-gotcha', title: 'Watch out' },
  ],
  'dist': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-col1', title: 'src/ (source)' },
    { id: 'toc-col2', title: 'dist/ (distributable)' },
    { id: 'toc-explainer', title: 'Why not just ship the source code?' },
    { id: 'toc-gotcha', title: 'Watch out' },
  ],
  'versioning': [
    { id: 'toc-webapp', title: 'Web App' },
    { id: 'toc-pkg', title: 'NPM Package' },
    { id: 'toc-explainer', title: "What's semver and how does CI help?" },
    { id: 'toc-gotcha', title: 'Watch out' },
  ],
  'monorepo': [
    { id: 'toc-monorepo-structure', title: 'Sample Monorepo Structure' },
    { id: 'toc-col1', title: 'Monolith' },
    { id: 'toc-col2', title: 'Monorepo' },
    { id: 'toc-explainer', title: 'Monorepo vs monolith — a backend analogy' },
    { id: 'toc-gotcha', title: 'Watch out' },
  ],

  // ── NPM Package Guide: CI Pipeline ─────────────────────────────────

  'ci-testing': [
    { id: 'toc-unit', title: 'Unit Tests' },
    { id: 'toc-e2e', title: 'E2E Tests' },
    { id: 'toc-component', title: 'Component Tests (Storybook)' },
    { id: 'toc-coverage', title: 'Test Coverage' },
    { id: 'toc-good-tests', title: 'What makes a good test?' },
  ],
  'ci-linting': [
    { id: 'toc-linting', title: 'Linting (ESLint)' },
    { id: 'toc-formatting', title: 'Formatting (Prettier)' },
    { id: 'toc-eslint-stylistic', title: 'eslint-stylistic — an alternative' },
    { id: 'toc-ide', title: 'IDE Integration' },
  ],
  'ci-repo-maintenance': [
    { id: 'toc-knip', title: 'knip' },
    { id: 'toc-syncpack', title: 'syncpack' },
  ],

  // ── NPM Package Guide: Bonus ───────────────────────────────────────

  'storybook': [
    { id: 'toc-bonus-0', title: 'What is it?' },
    { id: 'toc-bonus-1', title: 'Why is it important?' },
    { id: 'toc-bonus-2', title: 'How it helps development' },
    { id: 'toc-explainer', title: 'Storybook — a backend analogy' },
  ],

  // ── Architecture Guide ──────────────────────────────────────────────

  'arch-what-is-a-stack': [
    { id: 'toc-what', title: 'What is a tech stack?' },
    { id: 'toc-layers', title: 'The four essential layers' },
    { id: 'toc-naming', title: 'How stacks are named' },
    { id: 'toc-swapping', title: 'Swapping layers' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-stack-mern': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore each component' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-stack-mean': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore each component' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-stack-pfrn': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore each layer' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-stack-lamp': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore each component' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-stack-rails': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore each component' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-stack-django': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore each component' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-frameworks-intro': [
    { id: 'toc-what', title: 'What is a full-stack framework?' },
    { id: 'toc-stacks-vs-frameworks', title: 'Stacks vs. frameworks' },
    { id: 'toc-the-frameworks', title: 'The four frameworks' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-fw-nextjs': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore key capabilities' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-fw-remix': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore key capabilities' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-fw-react-router': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore key capabilities' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-fw-tanstack-start': [
    { id: 'toc-overview', title: 'Overview' },
    { id: 'toc-explore', title: 'Explore key capabilities' },
    { id: 'toc-tradeoffs', title: 'Strengths & tradeoffs' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'arch-how-it-connects': [
    { id: 'toc-cycle', title: 'The request-response cycle' },
    { id: 'toc-diagram', title: 'Data flow diagram' },
    { id: 'toc-key', title: 'Key takeaways' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],

  // ── Testing Guide ───────────────────────────────────────────────────

  'test-overview': [
    { id: 'toc-pyramid', title: 'The Testing Pyramid' },
    { id: 'toc-ratio', title: 'The ideal ratio' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'test-unit': [
    { id: 'toc-what', title: 'What are unit tests?' },
    { id: 'toc-detail', title: 'What to test & what not to test' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'test-component': [
    { id: 'toc-what', title: 'What are component tests?' },
    { id: 'toc-detail', title: 'What to test & what not to test' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'test-e2e': [
    { id: 'toc-what', title: 'What are E2E tests?' },
    { id: 'toc-detail', title: 'What to test & what not to test' },
    { id: 'toc-explainer', title: 'Backend analogy' },
  ],
  'test-comparison': [
    { id: 'toc-table', title: 'Comparison table' },
    { id: 'toc-when', title: 'When to use each type' },
  ],
  'test-best-practices': [
    { id: 'toc-do', title: 'What to do' },
    { id: 'toc-dont', title: 'What to avoid' },
  ],
  'test-tools': [
    { id: 'toc-tools', title: 'Tool directory' },
    { id: 'toc-choosing', title: 'Choosing the right tool' },
  ],
  'test-review-checklist': [
    { id: 'toc-checklist', title: 'Review checklist' },
    { id: 'toc-explainer', title: 'How to use this checklist' },
  ],

  // ── Prompt Engineering Guide: Common AI Mistakes ────────────────────

  'prompt-mistakes-logic': [
    { id: 'toc-off-by-one', title: 'Off-by-one errors in loops & boundaries' },
    { id: 'toc-wrong-boolean', title: 'Wrong boolean logic / inverted conditions' },
    { id: 'toc-edge-case-blindness', title: 'Edge case blindness (empty arrays, null, 0, NaN)' },
    { id: 'toc-math-formula', title: 'Math formula errors' },
  ],
  'prompt-mistakes-apis': [
    { id: 'toc-invents-packages', title: 'Invents non-existent npm packages or methods' },
    { id: 'toc-deprecated-apis', title: 'Uses deprecated or renamed APIs' },
    { id: 'toc-cross-language', title: 'Cross-language API confusion' },
  ],
  'prompt-mistakes-structural': [
    { id: 'toc-over-engineering', title: 'Over-engineering simple tasks' },
    { id: 'toc-incomplete-code', title: 'Incomplete code — missing imports, exports, error handling' },
    { id: 'toc-ignores-patterns', title: 'Ignores existing project patterns' },
    { id: 'toc-security-gaps', title: 'Security gaps — no input sanitization, XSS vectors' },
  ],
  'prompt-mistakes-style': [
    { id: 'toc-inconsistent-naming', title: 'Inconsistent naming conventions' },
    { id: 'toc-unnecessary-comments', title: 'Adds unnecessary comments or over-documents' },
    { id: 'toc-formatting-rules', title: 'Forgets semicolons, trailing commas, or formatting rules' },
  ],

  // ── Prompt Engineering Guide: Tooling & Reference ───────────────────

  'prompt-tools-advanced': [
    { id: 'toc-mcp', title: 'MCP Servers' },
    { id: 'toc-skills', title: 'Custom Slash Commands' },
    { id: 'toc-hooks', title: 'Hooks & Automation' },
    { id: 'toc-optimization', title: 'Performance Optimization' },
  ],
  'prompt-meta-tooling': [
    { id: 'toc-ci', title: 'CI/CD Integration' },
    { id: 'toc-versioning', title: 'Prompt Versioning' },
    { id: 'toc-team', title: 'Team Workflows' },
    { id: 'toc-eval', title: 'Evaluating AI Output' },
  ],
  'prompt-testing': [
    { id: 'toc-e2e', title: 'End-to-End (E2E) Testing' },
    { id: 'toc-unit', title: 'Unit Testing' },
  ],
}

/** Get headings for a page, or empty array if none */
export function getPageHeadings(pageId: string): PageHeading[] {
  return pageHeadings[pageId] ?? []
}

/** All page IDs that have headings registered (for build-time validation) */
export const pageHeadingPageIds = Object.keys(pageHeadings)
