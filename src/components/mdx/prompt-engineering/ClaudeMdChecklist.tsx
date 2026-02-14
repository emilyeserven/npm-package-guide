import { CLAUDEMD_CHECKLIST } from '../../../data/promptData'
import { useChecklist } from '../../../hooks/useChecklist'
import { ChecklistProgress } from '../ChecklistProgress'

export function ClaudeMdChecklist() {
  const { toggle, isChecked, checkedCount } = useChecklist<string>()

  const totalItems = CLAUDEMD_CHECKLIST.reduce((sum, s) => sum + s.items.length, 0)
  const pct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span>{checkedCount} of {totalItems} items</span>
          <span>{pct}%</span>
        </div>
        <ChecklistProgress
          checked={checkedCount}
          total={totalItems}
          label={null}
        />
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
                const checked = isChecked(key)
                return (
                  <label
                    key={key}
                    className="flex items-start gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(key)}
                      className="mt-0.5 shrink-0 accent-blue-500"
                    />
                    <div className="min-w-0">
                      <div className={`text-sm font-medium ${checked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
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
