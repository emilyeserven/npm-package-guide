import { useCallback } from 'react'
import clsx from 'clsx'
import parse from 'html-react-parser'
import { checklistItems } from '../../../data/checklistItems'
import { cmd } from '../../../helpers/cmd'
import { HtmlContent } from '../../HtmlContent'
import { useChecklist } from '../../../hooks/useChecklist'
import { ChecklistProgress } from '../ChecklistProgress'

export function PublishChecklist() {
  const { toggle, isChecked, checkedCount, reset } = useChecklist<number>()

  const handleCopy = useCallback(() => {
    const md = "# Publish Checklist\n\n" + checklistItems.map((item, i) => {
      const check = isChecked(i) ? "x" : " "
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
  }, [isChecked])

  const total = checklistItems.length

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
        {checkedCount > 0 && (
          <button
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer transition-all duration-150 hover:border-red-400 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400"
            onClick={reset}
            data-testid="deselect-all"
          >
            Deselect All
          </button>
        )}
      </div>

      {checklistItems.map((item, i) => {
        const checked = isChecked(i)
        return (
          <label
            key={i}
            className={clsx(
              'flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150 mb-2',
              checked
                ? 'bg-green-50/60 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/40'
            )}
          >
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-blue-500 shrink-0"
              checked={checked}
              onChange={() => toggle(i)}
              data-testid={`checklist-item-${i}`}
            />
            <span
              className={clsx(
                'text-sm leading-relaxed flex-1 min-w-0',
                checked ? 'line-through text-gray-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-300'
              )}
            >
              {parse(item.text)}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-xl tracking-wide whitespace-nowrap ${item.badge}`}>{item.cat}</span>
          </label>
        )
      })}

      <ChecklistProgress
        checked={checkedCount}
        total={total}
        label={`${checkedCount} / ${total}`}
        className="mt-5 mb-2"
      />
    </>
  )
}
