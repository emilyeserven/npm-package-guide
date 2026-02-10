import { sections } from '../data/sections'
import { ciPages } from '../data/ciPages'
import { bonusSections } from '../data/bonusSections'
import { overallResources, type ResourceGroup } from '../data/overallResources'
import { renderResourcesTableHtml } from './ResourcesTable'
import { HtmlContent } from './HtmlContent'
import { PrevNextNav } from './PrevNextNav'

export function SectionLinksPage() {
  let html = `<h2 class="section-title">🔗 Section References</h2>`
  html += `<p style="color: var(--muted); font-size: 14px; margin-bottom: 24px; line-height: 1.6;">All the "Read More" links from the deep-dive sections, collected in one place for quick reference.</p>`
  html += `<div class="resources-section">`

  // Collect all links from sections, deduped by URL
  const seen = new Set<string>()
  const overallUrls = new Set<string>()
  overallResources.forEach(g => g.items.forEach(i => overallUrls.add(i.url)))

  const groups: ResourceGroup[] = []
  const allSectionsWithLinks = [...sections, ...ciPages, ...bonusSections]
  allSectionsWithLinks.forEach(s => {
    if (s.links && s.links.length > 0) {
      const uniqueLinks = s.links.filter(l => {
        if (seen.has(l.url) || overallUrls.has(l.url)) return false
        seen.add(l.url)
        return true
      })
      if (uniqueLinks.length > 0) {
        groups.push({
          category: s.title,
          items: uniqueLinks.map(l => ({
            name: l.label,
            url: l.url,
            desc: '',
            badges: ['docs'],
          })),
        })
      }
    }
  })

  html += renderResourcesTableHtml(groups)
  html += `</div>`

  return (
    <>
      <HtmlContent html={html} />
      <PrevNextNav currentId="section-links" />
    </>
  )
}
