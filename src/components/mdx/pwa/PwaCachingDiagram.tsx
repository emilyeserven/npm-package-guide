import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { CACHING_STRATEGIES } from '../../../data/pwaData'

/**
 * Interactive caching strategy comparison diagram.
 * Select a strategy to see its request flow and best-fit use case.
 */
export function PwaCachingDiagram() {
  const isDark = useIsDark()
  const [activeKey, setActiveKey] = useState('cache-first')

  const s = CACHING_STRATEGIES[activeKey]
  if (!s) return null

  const color = ds(s.color, s.darkColor, isDark)

  return (
    <div
      className="rounded-xl border p-5 mb-6"
      style={{
        background: ds('#f8fafc', '#1e293b', isDark),
        borderColor: ds('#e2e8f0', '#334155', isDark),
      }}
    >
      <div
        className="text-xs font-mono uppercase tracking-widest mb-3"
        style={{ color: ds('#94a3b8', '#64748b', isDark) }}
      >
        Caching Strategies &mdash; select to explore
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(CACHING_STRATEGIES).map(([key, val]) => {
          const isActive = activeKey === key
          const btnColor = ds(val.color, val.darkColor, isDark)
          return (
            <button
              key={key}
              onClick={() => setActiveKey(key)}
              className="rounded-lg px-3 py-1.5 text-xs font-mono border cursor-pointer transition-colors"
              style={{
                background: isActive ? btnColor : ds('#ffffff', '#0f172a', isDark),
                color: isActive ? '#fff' : ds('#64748b', '#94a3b8', isDark),
                borderColor: isActive ? btnColor : ds('#e2e8f0', '#334155', isDark),
              }}
            >
              {val.label}
            </button>
          )
        })}
      </div>

      <div className="flex gap-1 flex-wrap items-center mb-3">
        {s.flow.map((step, i) => (
          <span
            key={i}
            className="rounded-md px-2 py-1 text-xs font-mono border"
            style={{
              background: i === 0 ? `${color}18` : ds('#ffffff', '#0f172a', isDark),
              color: i === 0 ? color : ds('#64748b', '#94a3b8', isDark),
              borderColor: i === 0 ? `${color}44` : ds('#e2e8f0', '#334155', isDark),
            }}
          >
            {step}
          </span>
        ))}
      </div>

      <div className="text-xs" style={{ color: ds('#64748b', '#94a3b8', isDark) }}>
        <strong style={{ color }}>Best for:</strong> {s.best}
      </div>
    </div>
  )
}
