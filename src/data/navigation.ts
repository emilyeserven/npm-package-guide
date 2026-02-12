import { findNavItem } from '../helpers/findNavItem'

const ciPageIds = [
  'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
]

const bonusIds = ['storybook']

export function getNavOrder(): string[] {
  // Order matches the Start Page roadmap steps and sidebar sections
  return [
    "roadmap",
    "bigpicture", "monorepo", "npm-vs-pnpm",
    "build", "tsconfig", "deps", "dist",
    "packagejson", "typescript", "versioning", "workflow",
    ...ciPageIds,
    ...bonusIds,
    "checklist", "external-resources", "glossary",
  ]
}

const staticTitles: Record<string, string> = {
  roadmap: "\u{1F680} Start Here",
  checklist: "\u2705 Publish Checklist",
  "external-resources": "\u{1F4DA} External Resources",
  glossary: "\u{1F4D6} Glossary",
  architecture: "\u{1F3D7}\uFE0F Architecture Guide",
}

export function getNavTitle(id: string): string {
  if (staticTitles[id]) return staticTitles[id]
  return findNavItem(id)?.title ?? id
}
