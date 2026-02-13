import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { AUTH_CHECKLIST_ITEMS } from '../../../data/authData'

export function AuthChecklist() {
  const isDark = useIsDark()
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
          <h4
            className="text-xs font-semibold uppercase tracking-wider mb-2.5 mt-0"
            style={{ color: '#6366f1' }}
          >
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
                  className="flex items-start gap-3 w-full p-2.5 mb-1 rounded-lg border text-left cursor-pointer transition-colors"
                  style={{
                    background: isChecked
                      ? (isDark ? '#052e1622' : '#f0fdf4')
                      : (isDark ? '#1e293b' : '#ffffff'),
                    borderColor: isChecked
                      ? (isDark ? '#22c55e33' : '#bbf7d0')
                      : (isDark ? '#334155' : '#e2e8f0'),
                  }}
                >
                  <span
                    className="w-5 h-5 rounded shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold"
                    style={{
                      border: isChecked ? 'none' : `2px solid ${isDark ? '#475569' : '#94a3b8'}`,
                      background: isChecked ? '#22c55e' : 'transparent',
                      color: '#ffffff',
                    }}
                  >
                    {isChecked && '✓'}
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{
                      color: isChecked
                        ? '#22c55e'
                        : (isDark ? '#94a3b8' : '#64748b'),
                      textDecoration: isChecked ? 'line-through' : 'none',
                    }}
                  >
                    {it.text}
                  </span>
                </button>
              )
            })}
        </div>
      ))}

      {/* Progress bar */}
      <div
        className="text-sm mt-3"
        style={{ color: isDark ? '#64748b' : '#94a3b8' }}
      >
        {checked.size}/{AUTH_CHECKLIST_ITEMS.length} complete
        <div
          className="h-1 rounded-sm mt-2 overflow-hidden"
          style={{ background: isDark ? '#334155' : '#e2e8f0' }}
        >
          <div
            className="h-full rounded-sm transition-all duration-300"
            style={{
              width: `${(checked.size / AUTH_CHECKLIST_ITEMS.length) * 100}%`,
              background: '#22c55e',
            }}
          />
        </div>
      </div>
    </div>
  )
}
