import { CHECKLIST_ITEMS } from '../../../data/testingData'
import { useChecklist } from '../../../hooks/useChecklist'
import { ChecklistProgress } from '../ChecklistProgress'

export function TestChecklist() {
  const { toggle, isChecked, checkedCount } = useChecklist<number>()

  const total = CHECKLIST_ITEMS.length

  return (
    <div>
      {/* Progress */}
      <ChecklistProgress
        checked={checkedCount}
        total={total}
        barColorClass="bg-green-500 dark:bg-green-400"
        trackColorClass="bg-slate-200 dark:bg-slate-700"
        className="mb-4"
      />

      {/* Items */}
      <ul className="list-none p-0 m-0">
        {CHECKLIST_ITEMS.map((item) => {
          const checked = isChecked(item.id)
          return (
            <li
              key={item.id}
              className="flex items-start gap-3 py-2 cursor-pointer select-none"
              onClick={() => toggle(item.id)}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all duration-200 text-[0.7rem] ${
                  checked
                    ? 'bg-green-500 dark:bg-green-400 border-green-500 dark:border-green-400 text-white dark:text-slate-900'
                    : 'border-slate-300 dark:border-slate-600 bg-transparent'
                }`}
              >
                {checked && '\u2713'}
              </div>
              <div>
                <span
                  className={`text-sm transition-all duration-200 ${
                    checked
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
