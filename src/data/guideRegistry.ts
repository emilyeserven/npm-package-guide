import type { GuideSection, GuideDefinition, GuideCategory, StartPageData } from './guideTypes'

export type { GuideSection, GuideDefinition, StartPageData }

// ── Guide metadata ──────────────────────────────────────────────────
//
// Each entry defines the guide's identity. Sections and start page data
// are auto-discovered from the corresponding data modules via
// import.meta.glob — no manual import list needed.

interface GuideMeta {
  id: string
  icon: string
  title: string
  startPageId: string
  description: string
  singlePage?: boolean
  category: GuideCategory
}

const guideMetas: GuideMeta[] = [
  { id: 'npm-package', icon: '\u{1F4E6}', title: 'Web App vs. NPM Package', startPageId: 'roadmap', description: 'Learn the differences between building a web app and an npm package, from project setup through CI/CD and publishing.', category: 'fundamentals' },
  { id: 'architecture', icon: '\u{1F3D7}\uFE0F', title: 'Architecture Guide', startPageId: 'arch-start', description: 'Understand common frontend architecture patterns and how to structure your projects for maintainability and scale.', category: 'frontend' },
  { id: 'testing', icon: '\u{1F9EA}', title: 'Testing Guide', startPageId: 'test-start', description: 'Learn frontend testing fundamentals \u2014 the testing pyramid, best practices, and how to choose the right tools for unit, component, and E2E tests.', category: 'fundamentals' },
  { id: 'prompt-engineering', icon: '\u{1F9E0}', title: 'Prompt Engineering', startPageId: 'prompt-start', description: 'Practical patterns for working with AI coding assistants \u2014 common mistakes to watch for, context management techniques, and CLI commands.', category: 'ai-tooling' },
  { id: 'ci-cd', icon: '\u2699\uFE0F', title: 'CI/CD & GitHub Actions', startPageId: 'cicd-start', description: 'Learn CI/CD from scratch \u2014 pipelines, GitHub Actions, YAML workflows, and the patterns that keep teams shipping safely.', category: 'infrastructure' },
  { id: 'auth', icon: '\u{1F510}', title: 'Auth for Frontend Engineers', startPageId: 'auth-start', description: 'Authentication & Authorization \u2014 from zero to confident implementation.', category: 'security' },
  { id: 'kubernetes', icon: '\u2638\uFE0F', title: 'Kubernetes & Helm', startPageId: 'k8s-start', description: 'Understand containers, Kubernetes, and Helm \u2014 from Docker basics to deployment pipelines, with analogies for frontend engineers.', category: 'infrastructure' },
  { id: 'ai-infra', icon: '\u{1F916}', title: 'AI Infrastructure', startPageId: 'ai-start', description: 'Understand AI infrastructure from a frontend engineer\u2019s perspective \u2014 from the API calls your React app makes to model serving, vector databases, and GPU clusters.', category: 'ai-tooling' },
  { id: 'nextjs-abstractions', icon: '\u{1F9F1}', title: 'Next.js Abstractions', startPageId: 'nja-start', description: 'The backend & middleware concepts that Next.js abstracts away \u2014 and how to handle them yourself when separating frontend from backend.', category: 'frontend' },
  { id: 'wp-agents', icon: '\u{1F50C}', title: 'WordPress API & Agents', startPageId: 'wp-agents-guide', description: 'Generate TypeScript interfaces and test mocks from your WordPress REST API schema using Claude Code Web.', singlePage: true, category: 'ai-tooling' },
  { id: 'git-worktrees', icon: '\u{1F333}', title: 'Git Worktrees & Claude Code', startPageId: 'git-worktrees-guide', description: 'Use git worktrees for parallel development with Claude Code \u2014 isolated branches, simultaneous sessions, and real workflows.', singlePage: true, category: 'ai-tooling' },
  { id: 'security', icon: '\u{1F6E1}\uFE0F', title: 'Security Awareness', startPageId: 'sec-start', description: 'Common web security vulnerabilities explained for developers \u2014 how each attack works, real-world scenarios, and copy-pasteable prevention patterns.', category: 'security' },
  { id: 'state-management', icon: '\u26A1', title: 'React State Management', startPageId: 'sm-start', description: 'Context vs Zustand vs Redux \u2014 deep dives, side-by-side comparison, and how React Query changes everything.', category: 'frontend' },
  { id: 'tanstack-query', icon: '\u{1F504}', title: 'TanStack Query', startPageId: 'tsq-start', description: 'Server state management with TanStack Query \u2014 caching, deduplication, and the async data layer React is missing.', category: 'frontend' },
  { id: 'tanstack-router', icon: '\u{1F9ED}', title: 'TanStack Router Deep Dive', startPageId: 'tsr-start', description: 'A deep comparison of TanStack Router vs React Router vs Next.js \u2014 type safety, search params, data loading, and when to use what.', category: 'frontend' },
  { id: 's3-storage', icon: '\u{1F5C4}\uFE0F', title: 'Amazon S3 Storage Classes', startPageId: 's3-start', description: 'Understand Amazon S3 storage classes from a frontend engineer\u2019s perspective \u2014 buckets, objects, lifecycle rules, cost optimization, and practical usage patterns.', category: 'infrastructure' },
  { id: 'aws-decoded', icon: '\u2601\uFE0F', title: 'AWS Decoded', startPageId: 'aws-start', description: 'Every AWS service explained like you\u2019re a frontend engineer who just learned what a server is \u2014 62 services, 11 categories, zero buzzwords.', category: 'infrastructure' },
  { id: 'claude-skills', icon: '\u{1F9E9}', title: 'Anatomy of a Claude Skill', startPageId: 'cs-start', description: 'How to write high-quality Claude skills \u2014 from description fields and body writing to bundled resources, do\u2019s & don\u2019ts, and a shipping checklist.', category: 'ai-tooling' },
  { id: 'zustand', icon: '\u{1F43B}', title: 'Zustand Deep Dive', startPageId: 'zst-start', description: 'Everything about Zustand \u2014 from first store to slices, middleware, and production patterns with interactive demos.', category: 'frontend' },
  { id: 'pwa', icon: '\u{1F4F1}', title: 'Progressive Web Apps', startPageId: 'pwa-start', description: 'Build installable, offline-capable web apps with Service Workers, Web App Manifest, and modern caching strategies \u2014 from fundamentals to Vite + React integration.', category: 'frontend' },
  { id: 'cowork', icon: '\u{1F4C2}', title: 'Cowork Organization Guide', startPageId: 'cw-start', description: 'Organize files with Claude Cowork \u2014 local documents, Google Drive, and media server workflows with step-by-step prompts.', category: 'ai-tooling' },
  { id: 'coolify-deploy', icon: '\u{1F680}', title: 'Deploy on Coolify', startPageId: 'cd-start', description: 'Deploy React + Vite on Coolify \u2014 from DNS fundamentals to production gotchas, including Raspberry Pi self-hosting with Cloudflare Tunnel.', category: 'infrastructure' },
  { id: 'jscodeshift', icon: '🔧', title: 'jscodeshift Codemods', startPageId: 'jcs-start', description: 'A toolkit for running codemods over JavaScript and TypeScript source code \u2014 automating large-scale refactors with AST-level precision.', category: 'ai-tooling' },
  { id: 'info-architecture', icon: '🗺️', title: 'Information Architecture', startPageId: 'ia-start', description: 'The art of organizing information so people and AI agents can find what they need and understand where they are.', category: 'fundamentals' },
  { id: 'nginx', icon: '\u{1F310}', title: 'Nginx Essentials', startPageId: 'nginx-start', description: 'Nginx from zero to production \u2014 reverse proxy, static files, SSL/TLS, load balancing, security hardening, and Raspberry Pi homelab setups.', category: 'infrastructure' },
  { id: 'guide-creation', icon: '📝', title: 'Creating a New Guide', startPageId: 'guide-creation-guide', description: 'End-to-end walkthrough for adding a new guide to this project \u2014 from writing your content artifact through prompting, scaffolding, and validation.', singlePage: true, category: 'ai-tooling' },
  { id: 'claude-md', icon: '📋', title: 'Writing Effective CLAUDE.md Files', startPageId: 'cmd-start', description: 'How to write, structure, and maintain CLAUDE.md files \u2014 file hierarchy, writing principles, anti-patterns, and a self-review checklist.', category: 'ai-tooling' },
  { id: 'shell-scripting', icon: '🐚', title: 'Shell Scripting for AI Agents', startPageId: 'shell-start', description: 'Master shell scripting patterns that make AI agents faster, safer, and more reliable.', category: 'ai-tooling' },
  { id: 'tanstack-ai', icon: '\u2728', title: 'TanStack AI', startPageId: 'tsai-start', description: 'Build type-safe, provider-agnostic AI experiences with TanStack AI \u2014 streaming, isomorphic tools, and tool approval flows.', category: 'frontend' },
  { id: 'payload-cms', icon: '🎯', title: 'Payload CMS Field Guide', startPageId: 'payload-start', description: 'Payload CMS \u2014 the open-source, code-first headless CMS built on TypeScript and React. Config-first schemas, three API surfaces, and AI tooling.', category: 'infrastructure' },
]

// ── Auto-discover guide data modules ────────────────────────────────
//
// Convention: each guide has a data file/directory that exports
// *_GUIDE_SECTIONS (GuideSection[]) and optionally *_START_PAGE_DATA.
// import.meta.glob discovers them — adding a new guide only requires
// a new data file + metadata entry above.

type GuideDataModule = { [key: string]: GuideSection[] | StartPageData | unknown }

const dataModules = import.meta.glob<GuideDataModule>(
  ['./*Data.ts', './*Data/index.ts'],
  { eager: true },
)

/** Extract a named export matching a suffix pattern from a module */
function findExport<T>(mod: GuideDataModule, suffix: string): T | undefined {
  for (const [key, val] of Object.entries(mod)) {
    if (key.endsWith(suffix)) return val as T
  }
  return undefined
}

/** Build a lookup from all data modules: search for GUIDE_SECTIONS and START_PAGE_DATA */
const sectionsByGuide = new Map<string, GuideSection[]>()
const startPageByGuide = new Map<string, StartPageData>()

for (const mod of Object.values(dataModules)) {
  const sections = findExport<GuideSection[]>(mod, '_GUIDE_SECTIONS')
  const startPage = findExport<StartPageData>(mod, '_START_PAGE_DATA')

  if (sections) {
    // Match this module to its guide by checking which guide's startPageId
    // appears in the sections
    for (const meta of guideMetas) {
      const allIds = sections.flatMap(s => s.ids)
      if (allIds.includes(meta.startPageId)) {
        sectionsByGuide.set(meta.id, sections)
        if (startPage) startPageByGuide.set(meta.id, startPage)
        break
      }
    }
  }
}

// ── Build the guides array ──────────────────────────────────────────

export const guides: GuideDefinition[] = guideMetas.map(meta => {
  const sections = sectionsByGuide.get(meta.id)
  if (!sections) {
    throw new Error(
      `[guideRegistry] No sections found for guide "${meta.id}". ` +
      `Ensure the guide data file exports a *_GUIDE_SECTIONS array ` +
      `containing startPageId "${meta.startPageId}".`
    )
  }
  return { ...meta, sections }
})

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
  { id: 'cmd-review-checklist', sourceGuideId: 'claude-md' },
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

export function getStartPageData(guideId: string): StartPageData | undefined {
  return startPageByGuide.get(guideId)
}
