import { bonusSections } from '../data/bonusSections'
import { HtmlContent } from './HtmlContent'
import { Footnotes } from './Footnotes'
import { PrevNextNav } from './PrevNextNav'

export function BonusSectionPage({ sectionId }: { sectionId: string }) {
  const section = bonusSections.find(s => s.id === sectionId)
  if (!section) return <div>Section not found</div>

  let html = `<h2 class="section-title">${section.title}</h2>`

  // Build TOC
  const tocEntries: { id: string; label: string }[] = []
  if (section.content) {
    section.content.forEach((block, i) => {
      tocEntries.push({ id: 'toc-bonus-' + i, label: block.heading })
    })
  }
  if (section.explainerTitle) tocEntries.push({ id: 'toc-explainer', label: section.explainerTitle })

  if (tocEntries.length >= 3) {
    html += `<div class="section-toc"><div class="section-toc-title">On this page</div>`
    tocEntries.forEach(e => { html += `<a href="#${e.id}">${e.label}</a>` })
    html += `</div>`
  }

  html += `<div class="section-intro">${section.intro}</div>`

  if (section.content) {
    section.content.forEach((block, i) => {
      html += `<h4 class="section-subheading" id="toc-bonus-${i}">${block.heading}</h4>`
      html += `<div class="ci-step-text">${block.text}</div>`
    })
  }

  if (section.explainerTitle) {
    html += `
      <div class="explainer">
        <h4 class="explainer-heading" id="toc-explainer">💡 ${section.explainerTitle}</h4>
        <div class="explainer-body">${section.explainerBody}</div>
      </div>`
  }

  return (
    <>
      <HtmlContent html={html} />
      {section.links && section.links.length > 0 && <Footnotes links={section.links} contentHtml={html} />}
      <PrevNextNav currentId={sectionId} />
    </>
  )
}
