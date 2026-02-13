import { useState } from 'react'
import clsx from 'clsx'
import { AUTH_CHECKLIST_ITEMS } from '../../../data/authData'

export function AuthChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggle = (idx: number) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const categories = [...new Set(AUTH_CHECKLIST_ITEMS.map(it => it.category))]

  return (
    <div className="mb-7">
      {categories.map(cat => (
        <div key={cat} className="mb-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2.5 mt-0 text-indigo-500">
            {cat}
          </h4>
          {AUTH_CHECKLIST_ITEMS.map((item, idx) => ({ ...item, idx }))
            .filter(it => it.category === cat)
            .map(it => {
              const isChecked = checked.has(it.idx)
              return (
                <button
                  key={it.idx}
                  onClick={() => toggle(it.idx)}
                  className={clsx(
                    'flex items-start gap-3 w-full p-2.5 mb-1 rounded-lg border text-left cursor-pointer transition-colors',
                    isChecked
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700',
                  )}
                >
                  <span
                    className={clsx(
                      'w-5 h-5 rounded shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold',
                      isChecked
                        ? 'bg-green-500 text-white border-0'
                        : 'bg-transparent border-2 border-slate-400 dark:border-slate-600',
                    )}
                  >
                    {isChecked && '\u2713'}
                  </span>
                  <span
                    className={clsx(
                      'text-sm leading-relaxed',
                      isChecked
                        ? 'text-green-500 line-through'
                        : 'text-slate-500 dark:text-slate-400',
                    )}
                  >
                    {it.text}
                  </span>
                </button>
              )
            })}
        </div>
      ))}

      {/* Progress bar */}
      <div className="text-sm mt-3 text-slate-400 dark:text-slate-500">
        {checked.size}/{AUTH_CHECKLIST_ITEMS.length} complete
        <div className="h-2 rounded-full mt-2 overflow-hidden bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full transition-all duration-300 bg-green-500"
            style={{ width: `${(checked.size / AUTH_CHECKLIST_ITEMS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
