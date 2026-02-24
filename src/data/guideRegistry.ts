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
import { WP_AGENTS_GUIDE_SECTIONS } from './wpAgentsData'
import { GIT_WORKTREES_GUIDE_SECTIONS } from './gitWorktreesData'
import { SECURITY_GUIDE_SECTIONS, SECURITY_START_PAGE_DATA } from './securityData'
import { SM_GUIDE_SECTIONS, SM_START_PAGE_DATA } from './stateManagementData'
import { TSQ_GUIDE_SECTIONS, TSQ_START_PAGE_DATA } from './tanstackQueryData'
import { TSR_GUIDE_SECTIONS, TSR_START_PAGE_DATA } from './tanstackRouterData'
import { S3_GUIDE_SECTIONS, S3_START_PAGE_DATA } from './s3Data'
import { AWS_GUIDE_SECTIONS, AWS_START_PAGE_DATA } from './awsDecodedData'
import { CS_GUIDE_SECTIONS, CS_START_PAGE_DATA } from './claudeSkillsData'
import { ZST_GUIDE_SECTIONS, ZST_START_PAGE_DATA } from './zustandData'
import { PWA_GUIDE_SECTIONS, PWA_START_PAGE_DATA } from './pwaData'
import { COWORK_GUIDE_SECTIONS, COWORK_START_PAGE_DATA } from './coworkData'
import { COOLIFY_GUIDE_SECTIONS, COOLIFY_START_PAGE_DATA } from './coolifyData'
import { JCS_GUIDE_SECTIONS, JCS_START_PAGE_DATA } from './jscodeshiftData'
import { IA_GUIDE_SECTIONS, IA_START_PAGE_DATA } from './iaData'

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
    category: 'fundamentals',
  },
  {
    id: 'architecture',
    icon: '\u{1F3D7}\uFE0F',  // 🏗️
    title: 'Architecture Guide',
    startPageId: 'arch-start',
    description:
      'Understand common frontend architecture patterns and how to structure your projects for maintainability and scale.',
    sections: ARCH_GUIDE_SECTIONS,
    category: 'frontend',
  },
  {
    id: 'testing',
    icon: '\u{1F9EA}',        // 🧪
    title: 'Testing Guide',
    startPageId: 'test-start',
    description:
      'Learn frontend testing fundamentals \u2014 the testing pyramid, best practices, and how to choose the right tools for unit, component, and E2E tests.',
    sections: TESTING_GUIDE_SECTIONS,
    category: 'fundamentals',
  },
  {
    id: 'prompt-engineering',
    icon: '\u{1F9E0}',        // 🧠
    title: 'Prompt Engineering',
    startPageId: 'prompt-start',
    description:
      'Practical patterns for working with AI coding assistants \u2014 common mistakes to watch for, context management techniques, and CLI commands.',
    sections: PROMPT_GUIDE_SECTIONS,
    category: 'ai-tooling',
  },
  {
    id: 'ci-cd',
    icon: '\u2699\uFE0F',           // ⚙️
    title: 'CI/CD & GitHub Actions',
    startPageId: 'cicd-start',
    description:
      'Learn CI/CD from scratch \u2014 pipelines, GitHub Actions, YAML workflows, and the patterns that keep teams shipping safely.',
    sections: CICD_GUIDE_SECTIONS,
    category: 'infrastructure',
  },
  {
    id: 'auth',
    icon: '\u{1F510}',        // 🔐
    title: 'Auth for Frontend Engineers',
    startPageId: 'auth-start',
    description:
      'Authentication & Authorization \u2014 from zero to confident implementation.',
    sections: AUTH_GUIDE_SECTIONS,
    category: 'security',
  },
  {
    id: 'kubernetes',
    icon: '\u2638\uFE0F',        // ☸️
    title: 'Kubernetes & Helm',
    startPageId: 'k8s-start',
    description:
      'Understand containers, Kubernetes, and Helm \u2014 from Docker basics to deployment pipelines, with analogies for frontend engineers.',
    sections: K8S_GUIDE_SECTIONS,
    category: 'infrastructure',
  },
  {
    id: 'ai-infra',
    icon: '\u{1F916}',        // 🤖
    title: 'AI Infrastructure',
    startPageId: 'ai-start',
    description:
      'Understand AI infrastructure from a frontend engineer\u2019s perspective \u2014 from the API calls your React app makes to model serving, vector databases, and GPU clusters.',
    sections: AI_INFRA_GUIDE_SECTIONS,
    category: 'ai-tooling',
  },
  {
    id: 'nextjs-abstractions',
    icon: '\u{1F9F1}',        // 🧱
    title: 'Next.js Abstractions',
    startPageId: 'nja-start',
    description:
      'The backend & middleware concepts that Next.js abstracts away \u2014 and how to handle them yourself when separating frontend from backend.',
    sections: NJA_GUIDE_SECTIONS,
    category: 'frontend',
  },
  {
    id: 'wp-agents',
    icon: '\u{1F50C}',        // 🔌
    title: 'WordPress API & Agents',
    startPageId: 'wp-agents-guide',
    description:
      'Generate TypeScript interfaces and test mocks from your WordPress REST API schema using Claude Code Web.',
    sections: WP_AGENTS_GUIDE_SECTIONS,
    singlePage: true,
    category: 'ai-tooling',
  },
  {
    id: 'git-worktrees',
    icon: '\u{1F333}',        // 🌳
    title: 'Git Worktrees & Claude Code',
    startPageId: 'git-worktrees-guide',
    description:
      'Use git worktrees for parallel development with Claude Code \u2014 isolated branches, simultaneous sessions, and real workflows.',
    sections: GIT_WORKTREES_GUIDE_SECTIONS,
    singlePage: true,
    category: 'ai-tooling',
  },
  {
    id: 'security',
    icon: '\u{1F6E1}\uFE0F',  // 🛡️
    title: 'Security Awareness',
    startPageId: 'sec-start',
    description:
      'Common web security vulnerabilities explained for developers \u2014 how each attack works, real-world scenarios, and copy-pasteable prevention patterns.',
    sections: SECURITY_GUIDE_SECTIONS,
    category: 'security',
  },
  {
    id: 'state-management',
    icon: '\u26A1',              // ⚡
    title: 'React State Management',
    startPageId: 'sm-start',
    description:
      'Context vs Zustand vs Redux \u2014 deep dives, side-by-side comparison, and how React Query changes everything.',
    sections: SM_GUIDE_SECTIONS,
    category: 'frontend',
  },
  {
    id: 'tanstack-query',
    icon: '\u{1F504}',        // 🔄
    title: 'TanStack Query',
    startPageId: 'tsq-start',
    description:
      'Server state management with TanStack Query \u2014 caching, deduplication, and the async data layer React is missing.',
    sections: TSQ_GUIDE_SECTIONS,
    category: 'frontend',
  },
  {
    id: 'tanstack-router',
    icon: '\u{1F9ED}',        // 🧭
    title: 'TanStack Router Deep Dive',
    startPageId: 'tsr-start',
    description:
      'A deep comparison of TanStack Router vs React Router vs Next.js \u2014 type safety, search params, data loading, and when to use what.',
    sections: TSR_GUIDE_SECTIONS,
    category: 'frontend',
  },
  {
    id: 's3-storage',
    icon: '\u{1F5C4}\uFE0F',  // 🗄️
    title: 'Amazon S3 Storage Classes',
    startPageId: 's3-start',
    description:
      'Understand Amazon S3 storage classes from a frontend engineer\u2019s perspective \u2014 buckets, objects, lifecycle rules, cost optimization, and practical usage patterns.',
    sections: S3_GUIDE_SECTIONS,
    category: 'infrastructure',
  },
  {
    id: 'aws-decoded',
    icon: '\u2601\uFE0F',  // ☁️
    title: 'AWS Decoded',
    startPageId: 'aws-start',
    description:
      'Every AWS service explained like you\u2019re a frontend engineer who just learned what a server is \u2014 62 services, 11 categories, zero buzzwords.',
    sections: AWS_GUIDE_SECTIONS,
    category: 'infrastructure',
  },
  {
    id: 'claude-skills',
    icon: '\u{1F9E9}',        // 🧩
    title: 'Anatomy of a Claude Skill',
    startPageId: 'cs-start',
    description:
      'How to write high-quality Claude skills \u2014 from description fields and body writing to bundled resources, do\u2019s & don\u2019ts, and a shipping checklist.',
    sections: CS_GUIDE_SECTIONS,
    category: 'ai-tooling',
  },
  {
    id: 'zustand',
    icon: '\u{1F43B}',        // 🐻
    title: 'Zustand Deep Dive',
    startPageId: 'zst-start',
    description:
      'Everything about Zustand \u2014 from first store to slices, middleware, and production patterns with interactive demos.',
    sections: ZST_GUIDE_SECTIONS,
    category: 'frontend',
  },
  {
    id: 'pwa',
    icon: '\u{1F4F1}',        // 📱
    title: 'Progressive Web Apps',
    startPageId: 'pwa-start',
    description:
      'Build installable, offline-capable web apps with Service Workers, Web App Manifest, and modern caching strategies \u2014 from fundamentals to Vite + React integration.',
    sections: PWA_GUIDE_SECTIONS,
    category: 'frontend',
  },
  {
    id: 'cowork',
    icon: '\u{1F4C2}',        // 📂
    title: 'Cowork Organization Guide',
    startPageId: 'cw-start',
    description:
      'Organize files with Claude Cowork \u2014 local documents, Google Drive, and media server workflows with step-by-step prompts.',
    sections: COWORK_GUIDE_SECTIONS,
    category: 'ai-tooling',
  },
  {
    id: 'coolify-deploy',
    icon: '\u{1F680}',        // 🚀
    title: 'Deploy on Coolify',
    startPageId: 'cd-start',
    description:
      'Deploy React + Vite on Coolify \u2014 from DNS fundamentals to production gotchas, including Raspberry Pi self-hosting with Cloudflare Tunnel.',
    sections: COOLIFY_GUIDE_SECTIONS,
    category: 'infrastructure',
  },
  {
    id: 'jscodeshift',
    icon: '🔧',
    title: 'jscodeshift Codemods',
    startPageId: 'jcs-start',
    description:
      'A toolkit for running codemods over JavaScript and TypeScript source code — automating large-scale refactors with AST-level precision.',
    sections: JCS_GUIDE_SECTIONS,
    category: 'ai-tooling',
  },
  {
    id: 'info-architecture',
    icon: '🗺️',
    title: 'Information Architecture',
    startPageId: 'ia-start',
    description:
      'The art of organizing information so people and AI agents can find what they need and understand where they are.',
    sections: IA_GUIDE_SECTIONS,
    category: 'fundamentals',
  },
]

// ── Single Page Guides (combined virtual nav) ───────────────────────

const singlePageGuides = guides.filter(g => g.singlePage)

export const singlePageNavDef: GuideDefinition = {
  id: 'single-page-guides',
  icon: '\u{1F4C4}',        // 📄
  title: 'Single Page Guides',
  startPageId: singlePageGuides[0]?.startPageId ?? '',
  description: 'Quick reference guides on focused topics.',
  sections: [{ label: null, ids: singlePageGuides.flatMap(g => g.sections.flatMap(s => s.ids)) }],
  singlePage: true,
  category: 'fundamentals',
}

// ── Checklists (extracted from individual guides) ───────────────────

export const checklistPages = [
  { id: 'checklist', sourceGuideId: 'npm-package' },
  { id: 'test-review-checklist', sourceGuideId: 'testing' },
  { id: 'prompt-claudemd-checklist', sourceGuideId: 'prompt-engineering' },
  { id: 'auth-checklist', sourceGuideId: 'auth' },
  { id: 'nja-checklist', sourceGuideId: 'nextjs-abstractions' },
  { id: 'arch-checklist', sourceGuideId: 'architecture' },
  { id: 'cicd-checklist', sourceGuideId: 'ci-cd' },
  { id: 'k8s-checklist', sourceGuideId: 'kubernetes' },
  { id: 'ai-checklist', sourceGuideId: 'ai-infra' },
]

export const checklistsNavDef: GuideDefinition = {
  id: 'checklists',
  icon: '\u2705',        // ✅
  title: 'Checklists',
  startPageId: 'checklist',
  description: 'Implementation checklists from all guides.',
  sections: [{ label: null, ids: checklistPages.map(p => p.id) }],
  category: 'fundamentals',
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
// Single-page guide pages map to the combined virtual nav
for (const g of singlePageGuides) {
  for (const section of g.sections) {
    for (const id of section.ids) {
      pageToGuide.set(id, 'single-page-guides')
    }
  }
}

export function getGuideForPage(pageId: string): GuideDefinition | undefined {
  const guideId = pageToGuide.get(pageId)
  if (guideId === 'checklists') return checklistsNavDef
  if (guideId === 'single-page-guides') return singlePageNavDef
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
  'security': SECURITY_START_PAGE_DATA,
  'state-management': SM_START_PAGE_DATA,
  'tanstack-query': TSQ_START_PAGE_DATA,
  'tanstack-router': TSR_START_PAGE_DATA,
  's3-storage': S3_START_PAGE_DATA,
  'aws-decoded': AWS_START_PAGE_DATA,
  'claude-skills': CS_START_PAGE_DATA,
  'zustand': ZST_START_PAGE_DATA,
  'pwa': PWA_START_PAGE_DATA,
  'cowork': COWORK_START_PAGE_DATA,
  'coolify-deploy': COOLIFY_START_PAGE_DATA,
  'jscodeshift': JCS_START_PAGE_DATA,
  'info-architecture': IA_START_PAGE_DATA,
}

export function getStartPageData(guideId: string): StartPageData | undefined {
  return startPageDataMap[guideId]
}

