import { useState } from 'react'
import { CLAUDEMD_CHECKLIST } from '../../data/promptData'

export function ClaudeMdChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (key: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const totalItems = CLAUDEMD_CHECKLIST.reduce((sum, s) => sum + s.items.length, 0)
  const checkedCount = checked.size
  const pct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span>{checkedCount} of {totalItems} items</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-6">
        {CLAUDEMD_CHECKLIST.map(section => (
          <div key={section.id}>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3">
              {section.icon} {section.name}
            </h3>
            <div className="flex flex-col gap-2">
              {section.items.map((item, i) => {
                const key = `${section.id}-${i}`
                const isChecked = checked.has(key)
                return (
                  <label
                    key={key}
                    className="flex items-start gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(key)}
                      className="mt-0.5 shrink-0 accent-blue-500"
                    />
                    <div className="min-w-0">
                      <div className={`text-sm font-medium ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
