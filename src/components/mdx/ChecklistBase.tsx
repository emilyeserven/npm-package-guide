import { useState, useCallback } from 'react'
import parse from 'html-react-parser'

export interface ChecklistBaseItem {
  label: string
  description?: string
}

export interface ChecklistBaseSection {
  id: string
  name: string
  icon: string
  items: ChecklistBaseItem[]
}

interface ChecklistBaseProps {
  markdownTitle: string
  sections: ChecklistBaseSection[]
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&nbsp;/g, ' ')
}

export function ChecklistBase({ markdownTitle, sections }: ChecklistBaseProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0)
  const checkedCount = checked.size
  const pct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

  const toggle = (globalIndex: number) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(globalIndex)) next.delete(globalIndex)
      else next.add(globalIndex)
      return next
    })
  }

  const handleCopy = useCallback(() => {
    const lines: string[] = [`# ${markdownTitle}`, '']
    let globalIdx = 0
    sections.forEach(section => {
      if (sections.length > 1) {
        lines.push(`## ${section.icon} ${section.name}`, '')
      }
      section.items.forEach(item => {
        const check = checked.has(globalIdx) ? 'x' : ' '
        const label = stripHtml(item.label)
        const desc = item.description ? ` \u2014 ${item.description}` : ''
        lines.push(`- [${check}] ${label}${desc}`)
        globalIdx++
      })
      lines.push('')
    })
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      const btn = document.getElementById('copy-checklist')
      if (btn) {
        btn.textContent = '\u2713 Copied!'
        setTimeout(() => {
          btn.textContent = '\uD83D\uDCCB Copy as Markdown'
        }, 2000)
      }
    })
  }, [checked, sections, markdownTitle])

  let globalIndex = 0

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span data-testid="checklist-progress">{checkedCount} of {totalItems} items</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mb-5">
        <button
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400"
          id="copy-checklist"
          onClick={handleCopy}
          data-testid="copy-checklist"
        >
          {'\uD83D\uDCCB'} Copy as Markdown
        </button>
        {checkedCount > 0 && (
          <button
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer transition-all duration-150 hover:border-red-400 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400"
            onClick={() => setChecked(new Set())}
            data-testid="deselect-all"
          >
            Deselect All
          </button>
        )}
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-6">
        {sections.map(section => {
          const sectionItems = section.items.map((item, i) => {
            const idx = globalIndex + i
            return { ...item, globalIndex: idx }
          })
          globalIndex += section.items.length

          return (
            <div key={section.id}>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3">
                {section.icon} {section.name}
              </h3>
              <div className="flex flex-col gap-2">
                {sectionItems.map(item => {
                  const isChecked = checked.has(item.globalIndex)
                  return (
                    <label
                      key={item.globalIndex}
                      className="flex items-start gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(item.globalIndex)}
                        className="mt-0.5 shrink-0 accent-blue-500"
                        data-testid={`checklist-item-${item.globalIndex}`}
                      />
                      <div className="min-w-0">
                        <div className={`text-sm font-medium ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
                          {parse(item.label)}
                        </div>
                        {item.description && (
                          <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
