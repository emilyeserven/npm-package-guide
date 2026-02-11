import { glossaryTerms } from '../data/glossaryTerms'
import { HtmlContent } from './HtmlContent'
import { PrevNextNav } from './PrevNextNav'

export function GlossaryPage() {
  let html = `<h1 class="section-title">📖 Glossary</h1>`
  html += `<p style="color: var(--muted); font-size: 14px; margin-bottom: 24px; line-height: 1.6;">Key terms you'll encounter when building and publishing npm packages. Each term includes a link to learn more.</p>`

  // Build TOC from categories
  const tocEntries = glossaryTerms.map(g => ({
    id: 'toc-glossary-' + g.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    label: g.category,
  }))

  if (tocEntries.length >= 3) {
    html += `<div class="section-toc"><div class="section-toc-title">On this page</div>`
    tocEntries.forEach(e => {
      html += `<a class="toc-link" data-toc="${e.id}">${e.label}</a>`
    })
    html += `</div>`
  }

  glossaryTerms.forEach(group => {
    const catId = 'toc-glossary-' + group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    html += `<h2 class="section-subheading" id="${catId}">${group.category}</h2>`
    html += `<dl class="glossary-list">`
    group.terms.forEach(t => {
      html += `<div class="glossary-entry">`
      html += `<dt class="glossary-term">${t.term}</dt>`
      html += `<dd class="glossary-def">${t.definition}`
      html += ` <a class="glossary-link" href="${t.url}" target="_blank" rel="noopener noreferrer">${t.source} docs<svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>`
      html += `</dd></div>`
    })
    html += `</dl>`
  })

  return (
    <>
      <HtmlContent html={html} />
      <PrevNextNav currentId="glossary" />
    </>
  )
}
