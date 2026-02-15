import type { SectionLink } from '../helpers/renderFootnotes'

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
        <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2.5">{'\u{1F4DD}'} Footnotes</h2>
          <div className="flex flex-col gap-0">
            {footnoted.map(link => (
              <div key={link.num} className="flex items-baseline gap-2 py-1.5 border-b border-slate-100 dark:border-slate-800 text-sm leading-normal last:border-b-0" id={`fn-${link.num}`}>
                <span className="text-xs font-bold text-blue-500 dark:text-blue-400 min-w-4.5 shrink-0">{link.num}</span>
                <span>
                  <a className="text-blue-500 dark:text-blue-400 no-underline font-medium hover:underline" href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-px rounded uppercase tracking-wide ml-1">{link.source}</span>
                  {link.note && <span className="text-gray-500 dark:text-slate-400 text-xs ml-1">{'\u2014'} {link.note}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {furtherReading.length > 0 && (
        <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2.5">{'\u{1F4DA}'} Further Reading</h2>
          <div className="flex flex-col gap-0">
            {furtherReading.map((link, i) => (
              <div key={i} className="flex items-baseline gap-1.5 py-1 text-sm leading-normal">
                <a className="text-blue-500 dark:text-blue-400 no-underline font-medium inline-flex items-center gap-1 transition-colors duration-150 hover:underline" href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <svg className="w-3 h-3 shrink-0 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                {' '}<span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-px rounded uppercase tracking-wide">{link.source}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
