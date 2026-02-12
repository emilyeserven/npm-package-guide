import { renderFootnotesHtml, type SectionLink } from '../helpers/renderFootnotes'
import { HtmlContent } from './HtmlContent'

interface FootnotesProps {
  links: SectionLink[]
  contentHtml: string
}

export function Footnotes({ links, contentHtml }: FootnotesProps) {
  const html = renderFootnotesHtml(links, contentHtml)
  if (!html) return null
  return <HtmlContent html={html} />
}

interface FootnotesMDXProps {
  links: SectionLink[]
  usedFootnotes?: number[]
}

export function FootnotesMDX({ links, usedFootnotes }: FootnotesMDXProps) {
  if (!links || links.length === 0) return null

  const usedSet = new Set(usedFootnotes ?? [])
  const footnoted: (SectionLink & { num: number })[] = []
  const furtherReading: SectionLink[] = []

  links.forEach((link, i) => {
    if (usedSet.has(i + 1)) {
      footnoted.push({ ...link, num: i + 1 })
    } else {
      furtherReading.push(link)
    }
  })

  if (footnoted.length === 0 && furtherReading.length === 0) return null

  return (
    <div>
      {footnoted.length > 0 && (
        <div className="links-section">
          <h2 className="links-heading">{'\u{1F4DD}'} Footnotes</h2>
          <div className="links-list">
            {footnoted.map(link => (
              <div key={link.num} className="footnote-item" id={`fn-${link.num}`}>
                <span className="footnote-num">{link.num}</span>
                <span>
                  <a className="footnote-link" href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  <span className="footnote-source">{link.source}</span>
                  {link.note && <span className="footnote-note">{'\u2014'} {link.note}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {furtherReading.length > 0 && (
        <div className="links-section">
          <h2 className="links-heading">{'\u{1F4DA}'} Further Reading</h2>
          <div className="links-list">
            {furtherReading.map((link, i) => (
              <div key={i} className="further-reading-item">
                <a className="further-reading-link" href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <svg className="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                {' '}<span className="link-source">{link.source}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
