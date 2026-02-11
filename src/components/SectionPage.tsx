import { sections } from '../data/sections'
import { codeExample } from '../data/codeExample'
import { enrichFootnoteRefs } from '../helpers/renderFootnotes'
import { HtmlContent } from './HtmlContent'
import { Footnotes } from './Footnotes'
import { PrevNextNav } from './PrevNextNav'

export function SectionPage({ sectionId }: { sectionId: string }) {
  const s = sections.find(s => s.id === sectionId)
  if (!s) return <div>Section not found</div>

  // Build TOC entries
  const tocEntries: { id: string; label: string; level: number }[] = []
  if (s.customColumns) {
    tocEntries.push({ id: 'toc-col1', label: s.col1Label!.replace(/^\S+\s+/, ''), level: 1 })
    tocEntries.push({ id: 'toc-col2', label: s.col2Label!.replace(/^\S+\s+/, ''), level: 1 })
  } else if (s.webapp) {
    tocEntries.push({ id: 'toc-webapp', label: 'Web App', level: 1 })
    tocEntries.push({ id: 'toc-pkg', label: 'NPM Package', level: 1 })
  }
  if (s.explainerTitle) tocEntries.push({ id: 'toc-explainer', label: s.explainerTitle, level: 2 })
  if (s.gotcha) tocEntries.push({ id: 'toc-gotcha', label: 'Watch out', level: 2 })
  if (s.intro) {
    const introHeadings = [...s.intro.matchAll(/id='(toc-[^']+)'[^>]*>([^<]+)/g)]
    if (introHeadings.length > 0) {
      introHeadings.forEach(m => tocEntries.unshift({ id: m[1], label: m[2], level: 1 }))
    }
  }

  let html = `<h1 class="section-title">${s.title}</h1>`

  // TOC if 3+ entries
  if (tocEntries.length >= 3) {
    html += `<div class="section-toc"><div class="section-toc-title">On this page</div>`
    tocEntries.forEach(e => {
      html += `<a class="toc-link${e.level === 2 ? ' toc-indent' : ''}" data-toc="${e.id}">${e.label}</a>`
    })
    html += `</div>`
  }

  if (s.intro) {
    html += `<div class="section-intro">${s.intro}</div>`
  }

  if (s.customColumns) {
    html += `<h2 class="section-subheading" id="toc-col1">${s.col1Label}</h2>`
    html += `<div class="section-list">${s.col1!.map(p => `<div class="col-item">${p}</div>`).join('')}</div>`
    html += `<h2 class="section-subheading" id="toc-col2">${s.col2Label}</h2>`
    html += `<div class="section-list">${s.col2!.map(p => `<div class="col-item">${p}</div>`).join('')}</div>`
  } else if (s.webapp) {
    html += `<h2 class="section-subheading" id="toc-webapp">🌐 Web App</h2>`
    html += `<div class="section-list">${s.webapp.map(p => `<div class="col-item">${p}</div>`).join('')}</div>`
    html += `<h2 class="section-subheading" id="toc-pkg">📦 NPM Package</h2>`
    html += `<div class="section-list">${s.pkg!.map(p => `<div class="col-item">${p}</div>`).join('')}</div>`
  }

  if (s.explainerTitle) {
    html += `
      <div class="explainer">
        <h2 class="explainer-heading" id="toc-explainer">💡 ${s.explainerTitle}</h2>
        <div class="explainer-body">${s.explainerBody}</div>
      </div>`
  }

  if (s.gotcha) {
    html += `<h2 class="section-subheading" id="toc-gotcha" style="margin-top: 24px;">⚠️ Watch out</h2>`
    html += `<div class="gotcha">${s.gotcha}</div>`
  }

  if (s.code) {
    html += `<div class="code-block">${codeExample}</div>`
  }

  const enrichedHtml = enrichFootnoteRefs(html, s.links)

  return (
    <>
      <HtmlContent html={enrichedHtml} />
      {s.links && s.links.length > 0 && <Footnotes links={s.links} contentHtml={html} />}
      <PrevNextNav currentId={sectionId} />
    </>
  )
}
