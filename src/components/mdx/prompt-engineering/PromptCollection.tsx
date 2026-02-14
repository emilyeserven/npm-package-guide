import { useState } from 'react'
import clsx from 'clsx'
import { MISTAKE_CATEGORIES } from '../../../data/promptData'

export function PromptCollection({ categoryId }: { categoryId: string }) {
  const [copied, setCopied] = useState(false)
  const category = MISTAKE_CATEGORIES.find(c => c.id === categoryId)
  if (!category) return null

  const handleCopy = () => {
    const text = category.items
      .map((item, i) => `${i + 1}. ${item.fix}`)
      .join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div id={`toc-${categoryId}-prompts`} className="mt-6 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center py-2 px-3.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
          {'\u{1F4CB}'} All Prompts
        </span>
        <button
          className={clsx(
            'font-sans text-xs font-semibold py-1 px-2.5 border rounded-md cursor-pointer transition-all duration-150 shrink-0',
            copied
              ? 'border-green-500 text-green-500 bg-green-50 dark:bg-green-500/10'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400'
          )}
          onClick={handleCopy}
        >
          {copied ? '\u2713 Copied!' : '\u{1F4CB} Copy All'}
        </button>
      </div>
      <div className="p-4">
        <ol className="list-decimal pl-5 flex flex-col gap-2 m-0">
          {category.items.map(item => (
            <li key={item.id} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {item.fix}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
