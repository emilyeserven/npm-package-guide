import { useState } from 'react'
import { CODING_TOOLS } from '../../data/promptData'
import { useIsDark } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'

export function CodingToolExplorer() {
  const isDark = useIsDark()
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = CODING_TOOLS.find(t => t.id === activeId)

  return (
    <div>
      {/* Tool selector grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
        {CODING_TOOLS.map(tool => {
          const isActive = activeId === tool.id
          return (
            <button
              key={tool.id}
              onClick={() => setActiveId(isActive ? null : tool.id)}
              className="text-left rounded-xl border p-3.5 transition-all cursor-pointer"
              style={{
                borderColor: isActive ? ds(tool.accent, tool.darkAccent, isDark) : ds('#e2e8f0', '#334155', isDark),
                background: isActive ? ds(tool.accent + '18', tool.darkAccent + '30', isDark) : ds('#fff', '#1e293b', isDark),
                boxShadow: isActive ? `0 2px 12px ${ds(tool.accent, tool.darkAccent, isDark)}25` : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{tool.icon}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: isActive ? ds(tool.accent, tool.darkAccent, isDark) : ds('#374151', '#e2e8f0', isDark) }}
                >
                  {tool.name}
                </span>
              </div>
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
                style={{
                  background: ds(tool.accent + '20', tool.darkAccent + '35', isDark),
                  color: ds(tool.accent, tool.darkAccent, isDark),
                }}
              >
                {tool.category}
              </span>
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      {active && (
        <div
          key={active.id}
          className="rounded-xl border p-5 mb-4"
          style={{
            borderColor: ds(active.accent, active.darkAccent, isDark),
            background: ds('#fff', '#1e293b', isDark),
            boxShadow: `0 2px 16px ${ds(active.accent, active.darkAccent, isDark)}15`,
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{active.icon}</span>
            <div>
              <div className="text-base font-bold" style={{ color: ds(active.accent, active.darkAccent, isDark) }}>
                {active.name}
              </div>
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
                style={{
                  background: ds(active.accent + '20', active.darkAccent + '35', isDark),
                  color: ds(active.accent, active.darkAccent, isDark),
                }}
              >
                {active.category}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            {active.description}
          </p>

          {/* Strengths */}
          <div className="mb-4">
            <div
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: ds(active.accent, active.darkAccent, isDark) }}
            >
              {'\u2705'} Strengths
            </div>
            <ul className="list-none m-0 p-0">
              {active.strengths.map((s, i) => (
                <li key={i} className="text-sm text-slate-800 dark:text-slate-300 py-1 flex gap-2 leading-relaxed">
                  <span style={{ color: ds(active.accent, active.darkAccent, isDark) }} className="shrink-0">{'\u2192'}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Considerations */}
          <div className="mb-4">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
              {'\u{1F914}'} Considerations
            </div>
            <ul className="list-none m-0 p-0">
              {active.considerations.map((c, i) => (
                <li key={i} className="text-sm text-slate-800 dark:text-slate-300 py-1 flex gap-2 leading-relaxed">
                  <span className="text-slate-400 dark:text-slate-500 shrink-0">{'\u2022'}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Best for */}
          <div
            className="rounded-lg p-3.5 text-sm leading-relaxed"
            style={{
              background: ds(active.accent + '12', active.darkAccent + '20', isDark),
              borderLeft: `3px solid ${ds(active.accent, active.darkAccent, isDark)}`,
            }}
          >
            <span className="font-bold" style={{ color: ds(active.accent, active.darkAccent, isDark) }}>Best for: </span>
            <span className="text-slate-700 dark:text-slate-300">{active.bestFor}</span>
          </div>
        </div>
      )}
    </div>
  )
}
