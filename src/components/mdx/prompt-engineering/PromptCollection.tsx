import { useState } from 'react'
import clsx from 'clsx'
import { MISTAKE_CATEGORIES } from '../../../data/promptData'

export function PromptCollection({ categoryId }: { categoryId: string }) {
  const [copied, setCopied] = useState(false)
  const category = MISTAKE_CATEGORIES.find(c => c.id === categoryId)
  if (!category) return null

  const markdownText = category.items
    .map((item, i) => `${i + 1}. ${item.fix}`)
    .join('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <h2
        className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2"
        id={`toc-${categoryId}-prompts`}
      >
        {'\u{1F4CB}'} All Prompts
      </h2>
      <div className="relative border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <button
          className={clsx(
            'absolute top-2 right-2 z-10 font-sans text-xs font-semibold py-1 px-2.5 border rounded-md cursor-pointer transition-all duration-150 shrink-0',
            copied
              ? 'border-green-500 text-green-500 bg-green-50 dark:bg-green-500/10'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400'
          )}
          onClick={handleCopy}
        >
          {copied ? '\u2713 Copied!' : '\u{1F4CB} Copy as Markdown'}
        </button>
        <pre className="bg-slate-50 dark:bg-slate-900 p-4 pr-40 overflow-x-auto m-0">
          <code className="text-sm text-slate-800 dark:text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
            {markdownText}
          </code>
        </pre>
      </div>
    </>
  )
}
