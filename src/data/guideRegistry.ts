import type { GuideSection, GuideDefinition, StartPageData } from './guideTypes'
import { NPM_GUIDE_SECTIONS, NPM_START_PAGE_DATA } from './npmPackageData'
import { ARCH_GUIDE_SECTIONS, ARCH_START_PAGE_DATA } from './archData'
import { TESTING_GUIDE_SECTIONS, TESTING_START_PAGE_DATA } from './testingData'
import { PROMPT_GUIDE_SECTIONS, PROMPT_START_PAGE_DATA } from './promptData'
import { CICD_GUIDE_SECTIONS, CICD_START_PAGE_DATA } from './cicdData'
import { AUTH_GUIDE_SECTIONS, AUTH_START_PAGE_DATA } from './authData'
import { K8S_GUIDE_SECTIONS, K8S_START_PAGE_DATA } from './k8sData'
import { AI_INFRA_GUIDE_SECTIONS, AI_INFRA_START_PAGE_DATA } from './aiInfraData'
import { NJA_GUIDE_SECTIONS, NJA_START_PAGE_DATA } from './njaData'

export type { GuideSection, GuideDefinition, StartPageData }

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
  {
    id: 'ci-cd',
    icon: '\u2699\uFE0F',           // ⚙️
    title: 'CI/CD & GitHub Actions',
    startPageId: 'cicd-start',
    description:
      'Learn CI/CD from scratch \u2014 pipelines, GitHub Actions, YAML workflows, and the patterns that keep teams shipping safely.',
    sections: CICD_GUIDE_SECTIONS,
  },
  {
    id: 'auth',
    icon: '\u{1F510}',        // 🔐
    title: 'Auth for Frontend Engineers',
    startPageId: 'auth-start',
    description:
      'Authentication & Authorization \u2014 from zero to confident implementation.',
    sections: AUTH_GUIDE_SECTIONS,
  },
  {
    id: 'kubernetes',
    icon: '\u2638\uFE0F',        // ☸️
    title: 'Kubernetes & Helm',
    startPageId: 'k8s-start',
    description:
      'Understand containers, Kubernetes, and Helm \u2014 from Docker basics to deployment pipelines, with analogies for frontend engineers.',
    sections: K8S_GUIDE_SECTIONS,
  },
  {
    id: 'ai-infra',
    icon: '\u{1F916}',        // 🤖
    title: 'AI Infrastructure',
    startPageId: 'ai-start',
    description:
      'Understand AI infrastructure from a frontend engineer\u2019s perspective \u2014 from the API calls your React app makes to model serving, vector databases, and GPU clusters.',
    sections: AI_INFRA_GUIDE_SECTIONS,
  },
  {
    id: 'nextjs-abstractions',
    icon: '\u{1F9F1}',        // 🧱
    title: 'Next.js Abstractions',
    startPageId: 'nja-start',
    description:
      'The backend & middleware concepts that Next.js abstracts away \u2014 and how to handle them yourself when separating frontend from backend.',
    sections: NJA_GUIDE_SECTIONS,
  },
]

// ── Checklists (extracted from individual guides) ───────────────────

export const checklistPages = [
  { id: 'checklist', sourceGuideId: 'npm-package' },
  { id: 'test-review-checklist', sourceGuideId: 'testing' },
  { id: 'prompt-claudemd-checklist', sourceGuideId: 'prompt-engineering' },
  { id: 'auth-checklist', sourceGuideId: 'auth' },
  { id: 'nja-checklist', sourceGuideId: 'nextjs-abstractions' },
]

export const checklistsNavDef: GuideDefinition = {
  id: 'checklists',
  icon: '\u2705',        // ✅
  title: 'Checklists',
  startPageId: 'checklist',
  description: 'Implementation checklists from all guides.',
  sections: [{ label: null, ids: checklistPages.map(p => p.id) }],
}

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
// Checklist pages map to the checklists nav def for sidebar auto-sync
for (const cp of checklistPages) {
  pageToGuide.set(cp.id, 'checklists')
}

export function getGuideForPage(pageId: string): GuideDefinition | undefined {
  const guideId = pageToGuide.get(pageId)
  if (guideId === 'checklists') return checklistsNavDef
  return guideId ? guides.find(g => g.id === guideId) : undefined
}

export function getNavOrderForPage(pageId: string): string[] {
  const guide = getGuideForPage(pageId)
  if (!guide) return []
  return guide.sections.flatMap(s => s.ids)
}

// ── Start page data lookup ───────────────────────────────────────────

const startPageDataMap: Record<string, StartPageData> = {
  'npm-package': NPM_START_PAGE_DATA,
  'architecture': ARCH_START_PAGE_DATA,
  'testing': TESTING_START_PAGE_DATA,
  'prompt-engineering': PROMPT_START_PAGE_DATA,
  'ci-cd': CICD_START_PAGE_DATA,
  'auth': AUTH_START_PAGE_DATA,
  'kubernetes': K8S_START_PAGE_DATA,
  'ai-infra': AI_INFRA_START_PAGE_DATA,
  'nextjs-abstractions': NJA_START_PAGE_DATA,
}

export function getStartPageData(guideId: string): StartPageData | undefined {
  return startPageDataMap[guideId]
}

