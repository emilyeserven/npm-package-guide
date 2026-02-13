import { useState, useCallback } from 'react'
import clsx from 'clsx'
import parse from 'html-react-parser'
import { checklistItems } from '../../../data/checklistItems'
import { cmd } from '../../../helpers/cmd'
import { HtmlContent } from '../../HtmlContent'

export function PublishChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  const handleCheck = (idx: number, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [idx]: checked }))
  }

  const handleCopy = useCallback(() => {
    const md = "# Publish Checklist\n\n" + checklistItems.map((item, i) => {
      const check = checkedItems[i] ? "x" : " "
      const text = item.text.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      return `- [${check}] ${text} _(${item.cat})_`
    }).join("\n")

    navigator.clipboard.writeText(md).then(() => {
      const btn = document.getElementById('copy-checklist')
      if (btn) {
        btn.textContent = '\u2713 Copied!'
        btn.classList.add('copied')
        setTimeout(() => {
          btn.innerHTML = '\u{1F4CB} Copy as Markdown'
          btn.classList.remove('copied')
        }, 2000)
      }
    })
  }, [checkedItems])

  const checked = Object.values(checkedItems).filter(Boolean).length
  const total = checklistItems.length
  const pct = total > 0 ? (checked / total * 100) : 0

  const subHtml = `Go through this before every ${cmd("npm publish", "pnpm publish")} \u2014 trust us, it saves headaches.`

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-1">{'\u2705'} Publish Checklist</h1>
      <HtmlContent html={subHtml} className="text-sm text-gray-500 dark:text-slate-400 mb-5 leading-relaxed" as="p" />
      <div className="flex items-center gap-2 mb-5">
        <button
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400"
          id="copy-checklist"
          onClick={handleCopy}
          data-testid="copy-checklist"
        >
          {'\u{1F4CB}'} Copy as Markdown
        </button>
        {checked > 0 && (
          <button
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer transition-all duration-150 hover:border-red-400 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400"
            onClick={() => setCheckedItems({})}
            data-testid="deselect-all"
          >
            Deselect All
          </button>
        )}
      </div>

      {checklistItems.map((item, i) => {
        const isChecked = checkedItems[i] || false
        return (
          <label
            key={i}
            className={clsx(
              'flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150 mb-2',
              isChecked
                ? 'bg-green-50/60 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/40'
            )}
          >
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-blue-500 shrink-0"
              checked={isChecked}
              onChange={(e) => handleCheck(i, e.target.checked)}
              data-testid={`checklist-item-${i}`}
            />
            <span
              className={clsx(
                'text-sm leading-relaxed flex-1 min-w-0',
                isChecked ? 'line-through text-gray-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-300'
              )}
            >
              {parse(item.text)}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-xl tracking-wide whitespace-nowrap ${item.badge}`}>{item.cat}</span>
          </label>
        )
      })}

      <div className="flex items-center gap-3 mt-5 mb-2">
        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 whitespace-nowrap" data-testid="checklist-progress">{checked} / {total}</span>
      </div>
    </>
  )
}
