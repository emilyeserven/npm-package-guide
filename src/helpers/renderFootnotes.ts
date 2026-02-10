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
    html += `<div class="links-heading">📝 Footnotes</div>`
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
    html += `<div class="links-heading">📚 Further Reading</div>`
    html += `<div class="links-list">`
    furtherReading.forEach(link => {
      html += `<a class="link-chip" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label} <span class="link-source">${link.source}</span></a>`
    })
    html += `</div></div>`
  }

  return html
}
