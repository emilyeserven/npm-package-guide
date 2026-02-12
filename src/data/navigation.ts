import { findNavItem } from '../helpers/findNavItem'
import { ARCH_NAV_ORDER, ARCH_PAGE_IDS } from './archData'

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
}

export function getNavTitle(id: string): string {
  if (staticTitles[id]) return staticTitles[id]
  return findNavItem(id)?.title ?? id
}
