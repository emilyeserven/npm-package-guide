import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { IA_STRUCTURAL_PATTERNS } from '../../../data/iaData'

export function IaPatternCards() {
  const isDark = useIsDark()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="my-6 space-y-3">
      {/* Pattern selector pills */}
      <div className="flex flex-wrap gap-2">
        {IA_STRUCTURAL_PATTERNS.map((pattern) => {
          const isActive = selected === pattern.id
          return (
            <button
              key={pattern.id}
              onClick={() => setSelected(isActive ? null : pattern.id)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer border"
              style={{
                background: isActive
                  ? ds('#3b82f6', '#2563eb', isDark)
                  : ds('#f8fafc', '#1e293b', isDark),
                color: isActive
                  ? '#ffffff'
                  : ds('#475569', '#94a3b8', isDark),
                borderColor: isActive
                  ? ds('#3b82f6', '#2563eb', isDark)
                  : ds('#e2e8f0', '#334155', isDark),
              }}
            >
              {pattern.icon} {pattern.title}
            </button>
          )
        })}
      </div>

      {/* Selected pattern detail */}
      {selected && (() => {
        const pattern = IA_STRUCTURAL_PATTERNS.find(p => p.id === selected)
        if (!pattern) return null
        return (
          <div
            className="rounded-xl border p-5 transition-all duration-200"
            style={{
              background: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{pattern.icon}</span>
              <h4
                className="font-bold text-base m-0"
                style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
              >
                {pattern.title}
              </h4>
            </div>
            <p
              className="text-sm leading-relaxed m-0 mb-4"
              style={{ color: ds('#334155', '#cbd5e1', isDark) }}
            >
              {pattern.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div
                className="rounded-lg px-4 py-3"
                style={{ background: ds('#f8fafc', '#0f172a', isDark) }}
              >
                <span
                  className="font-semibold text-xs block mb-1"
                  style={{ color: ds('#2563eb', '#60a5fa', isDark) }}
                >
                  Best for
                </span>
                <span style={{ color: ds('#475569', '#94a3b8', isDark) }}>
                  {pattern.bestFor}
                </span>
              </div>
              <div
                className="rounded-lg px-4 py-3"
                style={{ background: ds('#f8fafc', '#0f172a', isDark) }}
              >
                <span
                  className="font-semibold text-xs block mb-1"
                  style={{ color: ds('#059669', '#34d399', isDark) }}
                >
                  Example
                </span>
                <span style={{ color: ds('#475569', '#94a3b8', isDark) }}>
                  {pattern.example}
                </span>
              </div>
              <div
                className="rounded-lg px-4 py-3"
                style={{ background: ds('#f8fafc', '#0f172a', isDark) }}
              >
                <span
                  className="font-semibold text-xs block mb-1"
                  style={{ color: ds('#dc2626', '#f87171', isDark) }}
                >
                  Trade-off
                </span>
                <span style={{ color: ds('#475569', '#94a3b8', isDark) }}>
                  {pattern.tradeoff}
                </span>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Prompt to select */}
      {!selected && (
        <p
          className="text-sm italic m-0"
          style={{ color: ds('#94a3b8', '#64748b', isDark) }}
        >
          Select a pattern above to see details.
        </p>
      )}
    </div>
  )
}
