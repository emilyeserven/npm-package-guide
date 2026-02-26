import type { ChecklistBaseSection } from '../../components/mdx/ChecklistBase'
import type { ChecklistManifest } from '../guideTypes'

export const ARCH_CHECKLIST: ChecklistBaseSection[] = [
  {
    id: 'requirements',
    name: 'Requirements & Constraints',
    icon: '\u{1F4CB}',  // 📋
    items: [
      { label: 'Identify the four stack layers your project needs: runtime, backend framework, frontend framework, and database' },
      { label: 'List non-negotiable constraints \u2014 team language expertise, hosting environment, compliance requirements' },
      { label: 'Define expected traffic patterns \u2014 read-heavy, write-heavy, real-time, or batch' },
      { label: 'Decide whether you need server-side rendering, static generation, or a pure SPA' },
      { label: 'Document data relationships \u2014 relational (SQL) vs. document-based (NoSQL) vs. hybrid' },
    ],
  },
  {
    id: 'stack-selection',
    name: 'Stack Selection',
    icon: '\u{1F9E9}',  // 🧩
    items: [
      { label: 'Evaluate at least two stack alternatives against your requirements (e.g., MERN vs. PFRN vs. LAMP)' },
      { label: 'Compare database options: PostgreSQL for relational integrity, MongoDB for flexible schemas, or both' },
      { label: 'Choose a backend framework \u2014 Express, Fastify, Django, Rails, or a fullstack framework\u2019s API layer' },
      { label: 'Choose a frontend framework \u2014 React, Vue, Angular, or a fullstack framework like Next.js' },
      { label: 'Verify community support, documentation quality, and ecosystem maturity for each choice' },
      { label: 'Confirm the team has (or can acquire) expertise in the chosen technologies' },
    ],
  },
  {
    id: 'framework-evaluation',
    name: 'Fullstack Framework Evaluation',
    icon: '\u{1F3D7}\uFE0F',  // 🏗️
    items: [
      { label: 'Decide if a fullstack framework (Next.js, React Router v7, TanStack Start) fits your use case' },
      { label: 'Evaluate routing strategy: file-system routing vs. code-based route definitions' },
      { label: 'Assess data fetching patterns: server components, loaders, or client-side hooks' },
      { label: 'Check deployment constraints \u2014 does the framework require Node.js at runtime, or can it output static files?' },
      { label: 'Consider vendor lock-in \u2014 does the framework strongly favor a specific hosting platform?' },
    ],
  },
  {
    id: 'project-structure',
    name: 'Project Structure & Data Flow',
    icon: '\u{1F4C1}',  // 📁
    items: [
      { label: 'Define folder structure: monorepo with <code>/frontend</code>, <code>/backend</code>, <code>/shared</code>, or separate repos' },
      { label: 'Set up shared TypeScript types/interfaces for API contracts between frontend and backend' },
      { label: 'Trace a user action end-to-end: UI event \u2192 API call \u2192 backend logic \u2192 database \u2192 response \u2192 UI update' },
      { label: 'Establish state management strategy: URL state, server state (TanStack Query), or client state (Context, Zustand)' },
      { label: 'Define API design conventions: REST resource naming, error response format, pagination strategy' },
      { label: 'Set up a monorepo tool (Turborepo, Nx) if using a monorepo, or configure CI for multi-repo' },
    ],
  },
  {
    id: 'quality-deployment',
    name: 'Quality & Deployment Readiness',
    icon: '\u{1F680}',  // 🚀
    items: [
      { label: 'Configure TypeScript strict mode and ESLint for consistent code quality' },
      { label: 'Set up a testing strategy: unit tests for logic, integration tests for API, E2E tests for critical flows' },
      { label: 'Choose and configure a CI/CD pipeline for automated builds, tests, and deploys' },
      { label: 'Define environment variable management strategy across frontend and backend' },
      { label: 'Document the architecture decisions and trade-offs for the team (ADRs or a lightweight wiki)' },
    ],
  },
]

export const ARCH_CHECKLIST_MANIFEST: ChecklistManifest = {
  id: 'arch',
  pageId: 'arch-checklist',
  sourceGuideId: 'architecture',
  title: 'Architecture Checklist',
  sections: ARCH_CHECKLIST,
}
