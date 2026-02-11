import { bonusSections } from '../data/bonusSections'
import { enrichContent } from '../helpers/enrichContent'
import { buildTocHtml } from '../helpers/buildTocHtml'
import type { TocEntry } from '../helpers/buildTocHtml'
import { HtmlContent } from './HtmlContent'
import { Footnotes } from './Footnotes'
import { PrevNextNav } from './PrevNextNav'

export function BonusSectionPage({ sectionId }: { sectionId: string }) {
  const section = bonusSections.find(s => s.id === sectionId)
  if (!section) return <div>Section not found</div>

  let html = `<h1 class="section-title">${section.title}</h1>`

  // Build TOC
  const tocEntries: TocEntry[] = []
  if (section.content) {
    section.content.forEach((block, i) => {
      tocEntries.push({ id: 'toc-bonus-' + i, label: block.heading, level: 1 })
    })
  }
  if (section.explainerTitle) tocEntries.push({ id: 'toc-explainer', label: section.explainerTitle, level: 2 })

  html += buildTocHtml(tocEntries)

  html += `<div class="section-intro">${section.intro}</div>`

  if (section.content) {
    section.content.forEach((block, i) => {
      html += `<h2 class="section-subheading" id="toc-bonus-${i}">${block.heading}</h2>`
      html += `<div class="ci-step-text">${block.text}</div>`
    })
  }

  if (section.explainerTitle) {
    html += `
      <div class="explainer">
        <h2 class="explainer-heading" id="toc-explainer">💡 ${section.explainerTitle}</h2>
        <div class="explainer-body">${section.explainerBody}</div>
      </div>`
  }

  const enrichedHtml = enrichContent(html, section.links, sectionId)

  return (
    <>
      <HtmlContent html={enrichedHtml} />
      {section.links && section.links.length > 0 && <Footnotes links={section.links} contentHtml={html} />}
      <PrevNextNav currentId={sectionId} />
    </>
  )
}
