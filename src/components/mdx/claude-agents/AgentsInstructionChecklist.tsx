import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { INSTRUCTION_CHECKLIST } from '../../../data/agentsData'

export function AgentsInstructionChecklist() {
  const isDark = useIsDark()
  const [checks, setChecks] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setChecks(p => ({ ...p, [id]: !p[id] }))
  const completed = Object.values(checks).filter(Boolean).length
  const total = INSTRUCTION_CHECKLIST.length

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-sm font-medium"
          style={{ color: tc(theme.textSecondary, isDark) }}
        >
          Instruction Quality Checklist
        </span>
        <span
          className="text-xs"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          {completed}/{total} complete
        </span>
      </div>
      <div
        className="w-full rounded-full h-1.5 mb-4"
        style={{ background: ds('#e2e8f0', '#334155', isDark) }}
      >
        <div
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: `${(completed / total) * 100}%`,
            background: ds('#f59e0b', '#fbbf24', isDark),
          }}
        />
      </div>
      <div className="space-y-2">
        {INSTRUCTION_CHECKLIST.map(item => {
          const checked = !!checks[item.id]
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="w-full text-left p-3 rounded-lg border transition-colors"
              style={{
                background: checked
                  ? ds('#ecfdf5', 'rgba(16,185,129,0.1)', isDark)
                  : tc(theme.bgCard, isDark),
                borderColor: checked
                  ? ds('#a7f3d0', '#065f46', isDark)
                  : tc(theme.borderDefault, isDark),
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center text-xs flex-shrink-0"
                  style={{
                    background: checked ? ds('#10b981', '#059669', isDark) : 'transparent',
                    borderColor: checked
                      ? ds('#10b981', '#059669', isDark)
                      : ds('#d1d5db', '#4b5563', isDark),
                    color: checked ? '#fff' : 'transparent',
                  }}
                >
                  {checked && '\u2713'}
                </span>
                <div>
                  <div
                    className="text-sm font-medium"
                    style={{
                      color: checked
                        ? ds('#065f46', '#6ee7b7', isDark)
                        : tc(theme.textSecondary, isDark),
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: tc(theme.textMuted, isDark) }}
                  >
                    {item.detail}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
