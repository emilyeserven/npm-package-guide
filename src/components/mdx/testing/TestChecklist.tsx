import { useState } from 'react'
import { CHECKLIST_ITEMS } from '../../../data/testingData'

export function TestChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggle = (id: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const progress = checked.size
  const total = CHECKLIST_ITEMS.length

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 dark:bg-green-400 rounded-full transition-all duration-300"
            style={{ width: `${(progress / total) * 100}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
          {progress}/{total}
        </span>
      </div>

      {/* Items */}
      <ul className="list-none p-0 m-0">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checked.has(item.id)
          return (
            <li
              key={item.id}
              className="flex items-start gap-3 py-2 cursor-pointer select-none"
              onClick={() => toggle(item.id)}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all duration-200 text-[0.7rem] ${
                  isChecked
                    ? 'bg-green-500 dark:bg-green-400 border-green-500 dark:border-green-400 text-white dark:text-slate-900'
                    : 'border-slate-300 dark:border-slate-600 bg-transparent'
                }`}
              >
                {isChecked && '\u2713'}
              </div>
              <div>
                <span
                  className={`text-sm transition-all duration-200 ${
                    isChecked
                      ? 'line-through opacity-50 text-slate-500 dark:text-slate-500'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <strong>{item.label}</strong> — {item.detail}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
