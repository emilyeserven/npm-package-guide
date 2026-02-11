import { sections } from './sections'
import { ciPages, ciPageIds } from './ciPages'
import { bonusSections, bonusIds } from './bonusSections'

export function getNavOrder(): string[] {
  // Order matches the Start Page roadmap steps and sidebar sections
  return [
    "roadmap",
    "bigpicture", "monorepo", "npm-vs-pnpm",
    "build", "tsconfig", "deps", "dist",
    "packagejson", "typescript", "versioning", "workflow",
    ...ciPageIds,
    ...bonusIds,
    "checklist", "all-references", "glossary",
  ]
}

export function getNavTitle(id: string): string {
  if (id === "roadmap") return "\u{1F680} Start Here"
  if (id === "checklist") return "\u2705 Publish Checklist"
  if (id === "all-references") return "\u{1F4DA} All References"
  if (id === "glossary") return "\u{1F4D6} Glossary"
  const ci = ciPages.find(p => p.id === id)
  if (ci) return ci.title
  const bonus = bonusSections.find(b => b.id === id)
  if (bonus) return bonus.title
  const s = sections.find(s => s.id === id)
  return s ? s.title : id
}
