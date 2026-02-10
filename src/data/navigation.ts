import { sections } from './sections'
import { ciPages, ciPageIds } from './ciPages'
import { bonusSections, bonusIds } from './bonusSections'

export function getNavOrder(): string[] {
  const conceptIds = sections.filter(s => s.group === "concepts").map(s => s.id)
  const comparisonIds = sections.filter(s => s.group !== "concepts" && s.id !== "bigpicture").map(s => s.id)
  return ["roadmap", "bigpicture", ...conceptIds, ...comparisonIds, ...ciPageIds, ...bonusIds, "checklist", "overall-resources", "section-links"]
}

export function getNavTitle(id: string): string {
  if (id === "roadmap") return "\u{1F680} Start Here"
  if (id === "checklist") return "\u2705 Publish Checklist"
  if (id === "overall-resources") return "\u{1F4DA} Learning Resources"
  if (id === "section-links") return "\u{1F517} Section References"
  const ci = ciPages.find(p => p.id === id)
  if (ci) return ci.title
  const bonus = bonusSections.find(b => b.id === id)
  if (bonus) return bonus.title
  const s = sections.find(s => s.id === id)
  return s ? s.title : id
}
