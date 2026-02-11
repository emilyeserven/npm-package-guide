export interface TocEntry {
  id: string
  label: string
  level: number
}

export function buildTocHtml(entries: TocEntry[], minEntries = 3): string {
  if (entries.length < minEntries) return ''
  let html = `<div class="section-toc"><div class="section-toc-title">On this page</div>`
  entries.forEach(e => {
    html += `<a class="toc-link" data-toc="${e.id}">${e.label}</a>`
  })
  html += `</div>`
  return html
}
