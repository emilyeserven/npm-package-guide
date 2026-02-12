import type { GuideSection, GuideDefinition } from './guideTypes'
import { ARCH_GUIDE_SECTIONS } from './archData'
import { TESTING_GUIDE_SECTIONS } from './testingData'
import { PROMPT_GUIDE_SECTIONS } from './promptData'

export type { GuideSection, GuideDefinition }

// ── NPM Package Guide sections (no separate data file needed) ────────

const NPM_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['roadmap'] },
  { label: 'Building a Package', ids: [
    'bigpicture', 'monorepo', 'npm-vs-pnpm',
    'build', 'tsconfig', 'deps', 'dist',
    'packagejson', 'typescript', 'versioning', 'workflow',
  ]},
  { label: 'CI Pipeline & Checks', ids: [
    'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
  ]},
  { label: 'Developer Experience', ids: ['storybook'] },
  { label: 'Learning Resources', ids: ['checklist'] },
]

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
