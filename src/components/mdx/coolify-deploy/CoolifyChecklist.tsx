import { useState } from 'react'
import { DEPLOY_CHECKLIST } from '../../../data/coolifyData'
import { useIsDark } from '../../../hooks/useTheme'

export function CoolifyChecklist() {
  const isDark = useIsDark()
  const allItems = DEPLOY_CHECKLIST.flatMap(g => g.items)
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (item: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(item)) next.delete(item)
      else next.add(item)
      return next
    })
  }

  return (
    <div className="my-6 space-y-6">
      {DEPLOY_CHECKLIST.map(group => (
        <div key={group.heading}>
          <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">
            {group.heading}
          </h4>
          <ul className="space-y-1.5">
            {group.items.map(item => {
              const isChecked = checked.has(item)
              return (
                <li
                  key={item}
                  onClick={() => toggle(item)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(item) } }}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  className={`flex items-start gap-3 cursor-pointer select-none py-1.5 text-sm rounded transition-colors ${
                    isChecked
                      ? 'text-slate-400 dark:text-slate-500 line-through'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span
                    className={`mt-0.5 w-4.5 h-4.5 rounded shrink-0 border-2 flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-green-500 border-green-500'
                        : isDark
                          ? 'border-slate-600'
                          : 'border-slate-300'
                    }`}
                    style={{ width: 18, height: 18 }}
                  >
                    {isChecked && (
                      <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                        <path d="M4 8l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span>{item}</span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4 text-center text-sm text-slate-500 dark:text-slate-400">
        Progress: <strong className={checked.size === allItems.length ? 'text-green-500' : isDark ? 'text-slate-200' : 'text-slate-700'}>
          {checked.size}
        </strong> / {allItems.length} items checked
      </div>
    </div>
  )
}
