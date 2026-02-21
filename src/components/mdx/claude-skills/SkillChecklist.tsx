import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { SKILL_CHECKLIST_ITEMS } from '../../../data/claudeSkillsData'
import { CardBase } from '../CardBase'

export function SkillChecklist() {
  const isDark = useIsDark()
  const [checks, setChecks] = useState<Record<string, boolean>>({})

  const toggle = (id: string) =>
    setChecks(prev => ({ ...prev, [id]: !prev[id] }))

  const completed = Object.values(checks).filter(Boolean).length
  const total = SKILL_CHECKLIST_ITEMS.length
  const pct = Math.round((completed / total) * 100)

  return (
    <div className="flex flex-col gap-4">
      <p style={{ color: ds('#374151', '#cbd5e1', isDark) }} className="leading-relaxed">
        Use this checklist before shipping a skill. Check off each item as you go.
      </p>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div
          className="flex-1 h-2.5 rounded-full overflow-hidden"
          style={{ background: ds('#e5e7eb', '#334155', isDark) }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(to right, ${ds('#8b5cf6', '#7c3aed', isDark)}, ${ds('#10b981', '#059669', isDark)})`,
            }}
          />
        </div>
        <span
          className="text-sm font-semibold w-12 text-right"
          style={{ color: ds('#4b5563', '#94a3b8', isDark) }}
        >
          {pct}%
        </span>
      </div>

      {/* Checklist items */}
      <div className="flex flex-col gap-1">
        {SKILL_CHECKLIST_ITEMS.map(item => {
          const checked = checks[item.id] ?? false
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left border"
              style={{
                background: checked
                  ? ds('#ecfdf5', '#064e3b22', isDark)
                  : ds('#ffffff', '#1e293b', isDark),
                borderColor: checked
                  ? ds('#a7f3d0', '#065f46', isDark)
                  : ds('#e5e7eb', '#334155', isDark),
              }}
            >
              <div
                className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  background: checked ? ds('#10b981', '#059669', isDark) : 'transparent',
                  borderColor: checked
                    ? ds('#10b981', '#059669', isDark)
                    : ds('#d1d5db', '#475569', isDark),
                  color: '#ffffff',
                }}
              >
                {checked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-sm"
                style={{
                  color: checked
                    ? ds('#065f46', '#6ee7b7', isDark)
                    : ds('#374151', '#cbd5e1', isDark),
                  textDecoration: checked ? 'line-through' : 'none',
                }}
              >
                {item.text}
              </span>
            </button>
          )
        })}
      </div>

      {pct === 100 && (
        <CardBase
          className="text-center"
          style={{
            background: `linear-gradient(135deg, ${ds('#ecfdf5', '#064e3b22', isDark)}, ${ds('#f5f3ff', '#4c1d9522', isDark)})`,
            borderColor: ds('#a7f3d0', '#065f46', isDark),
          }}
        >
          <span className="text-2xl">&#127881;</span>
          <p className="font-semibold mt-1" style={{ color: ds('#065f46', '#6ee7b7', isDark) }}>
            Your skill is ready to ship!
          </p>
        </CardBase>
      )}
    </div>
  )
}
