export interface SectionLink {
  label: string
  url: string
  source: string
  note?: string
}

export function renderFootnotesHtml(links: SectionLink[], contentHtml: string): string {
  if (!links || links.length === 0) return ""
  const footnoted: (SectionLink & { num: number })[] = []
  const furtherReading: SectionLink[] = []
  links.forEach((link, i) => {
    const refPattern = `data-fn="${i + 1}"`
    if (contentHtml && contentHtml.includes(refPattern)) {
      footnoted.push({ ...link, num: i + 1 })
    } else {
      furtherReading.push(link)
    }
  })

  let html = ""

  if (footnoted.length > 0) {
    html += `<div class="links-section">`
    html += `<h2 class="links-heading">📝 Footnotes</h2>`
    html += `<div class="links-list">`
    footnoted.forEach(link => {
      html += `<div class="footnote-item" id="fn-${link.num}">`
      html += `<span class="footnote-num">${link.num}</span>`
      html += `<span><a class="footnote-link" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
      html += `<span class="footnote-source">${link.source}</span>`
      if (link.note) html += `<span class="footnote-note">\u2014 ${link.note}</span>`
      html += `</span></div>`
    })
    html += `</div></div>`
  }

  if (furtherReading.length > 0) {
    html += `<div class="links-section">`
    html += `<h2 class="links-heading">📚 Further Reading</h2>`
    html += `<div class="links-list">`
    furtherReading.forEach(link => {
      html += `<div class="further-reading-item"><a class="further-reading-link" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}<svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a> <span class="link-source">${link.source}</span></div>`
    })
    html += `</div></div>`
  }

  return html
}

export function enrichFootnoteRefs(html: string, links?: SectionLink[]): string {
  if (!links || links.length === 0) return html
  return html.replace(/data-fn="(\d+)"\s+title="[^"]*"/g, (_match, num) => {
    const idx = parseInt(num) - 1
    if (idx >= 0 && idx < links.length) {
      const link = links[idx]
      const esc = (s: string) => s.replace(/"/g, '&quot;')
      let attrs = `data-fn="${num}" data-fn-url="${esc(link.url)}" data-fn-label="${esc(link.label)}" data-fn-source="${esc(link.source)}"`
      if (link.note) attrs += ` data-fn-note="${esc(link.note)}"`
      return attrs
    }
    return _match
  })
}
