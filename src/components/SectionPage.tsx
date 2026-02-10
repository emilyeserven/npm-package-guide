import { sections } from '../data/sections'
import { codeExample } from '../data/codeExample'
import { HtmlContent } from './HtmlContent'
import { Footnotes } from './Footnotes'
import { PrevNextNav } from './PrevNextNav'

export function SectionPage({ sectionId }: { sectionId: string }) {
  const s = sections.find(s => s.id === sectionId)
  if (!s) return <div>Section not found</div>

  // Build TOC entries
  const tocEntries: { id: string; label: string }[] = []
  if (s.customColumns) {
    tocEntries.push({ id: 'toc-col1', label: s.col1Label!.replace(/^\S+\s+/, '') })
    tocEntries.push({ id: 'toc-col2', label: s.col2Label!.replace(/^\S+\s+/, '') })
  } else if (s.webapp) {
    tocEntries.push({ id: 'toc-webapp', label: 'Web App' })
    tocEntries.push({ id: 'toc-pkg', label: 'NPM Package' })
  }
  if (s.explainerTitle) tocEntries.push({ id: 'toc-explainer', label: s.explainerTitle })
  if (s.gotcha) tocEntries.push({ id: 'toc-gotcha', label: 'Watch out' })
  if (s.intro) {
    const introHeadings = [...s.intro.matchAll(/id='(toc-[^']+)'[^>]*>([^<]+)/g)]
    if (introHeadings.length > 0) {
      introHeadings.forEach(m => tocEntries.unshift({ id: m[1], label: m[2] }))
    }
  }

  let html = `<h2 class="section-title">${s.title}</h2>`

  // TOC if 3+ entries
  if (tocEntries.length >= 3) {
    html += `<div class="section-toc"><div class="section-toc-title">On this page</div>`
    tocEntries.forEach(e => {
      html += `<a href="#${e.id}">${e.label}</a>`
    })
    html += `</div>`
  }

  if (s.intro) {
    html += `<div class="section-intro">${s.intro}</div>`
  }

  if (s.customColumns) {
    html += `<h3 class="section-subheading" id="toc-col1">${s.col1Label}</h3>`
    html += `<div class="section-list">${s.col1!.map(p => `<div class="col-item">${p}</div>`).join('')}</div>`
    html += `<h3 class="section-subheading" id="toc-col2">${s.col2Label}</h3>`
    html += `<div class="section-list">${s.col2!.map(p => `<div class="col-item">${p}</div>`).join('')}</div>`
  } else if (s.webapp) {
    html += `<h3 class="section-subheading" id="toc-webapp">🌐 Web App</h3>`
    html += `<div class="section-list">${s.webapp.map(p => `<div class="col-item">${p}</div>`).join('')}</div>`
    html += `<h3 class="section-subheading" id="toc-pkg">📦 NPM Package</h3>`
    html += `<div class="section-list">${s.pkg!.map(p => `<div class="col-item">${p}</div>`).join('')}</div>`
  }

  if (s.explainerTitle) {
    html += `
      <div class="explainer">
        <h4 class="explainer-heading" id="toc-explainer">💡 ${s.explainerTitle}</h4>
        <div class="explainer-body">${s.explainerBody}</div>
      </div>`
  }

  if (s.gotcha) {
    html += `<h4 class="section-subheading" id="toc-gotcha" style="margin-top: 24px;">⚠️ Watch out</h4>`
    html += `<div class="gotcha">${s.gotcha}</div>`
  }

  if (s.code) {
    html += `<div class="code-block">${codeExample}</div>`
  }

  return (
    <>
      <HtmlContent html={html} />
      {s.links && s.links.length > 0 && <Footnotes links={s.links} contentHtml={html} />}
      <PrevNextNav currentId={sectionId} />
    </>
  )
}
