import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { FASTIFY_SERVER_PATTERNS } from '../../../data/fastifyData'
import type { FastifyServerPattern } from '../../../data/fastifyData'

export function FastifyServerTabs() {
  const isDark = useIsDark()
  const [activeTab, setActiveTab] = useState<string>(FASTIFY_SERVER_PATTERNS[0].id)

  const active = FASTIFY_SERVER_PATTERNS.find(
    (p: FastifyServerPattern) => p.id === activeTab,
  ) ?? FASTIFY_SERVER_PATTERNS[0]

  const codeBg = ds('#f8fafc', '#0d1117', isDark)

  return (
    <div className="mb-6">
      {/* Tab buttons */}
      <div className="flex gap-0.5">
        {FASTIFY_SERVER_PATTERNS.map((pattern: FastifyServerPattern) => {
          const isActive = activeTab === pattern.id
          return (
            <button
              key={pattern.id}
              onClick={() => setActiveTab(pattern.id)}
              className="rounded-t-lg transition-all text-xs font-mono cursor-pointer"
              style={{
                padding: '8px 16px',
                border: `1px solid ${isActive ? tc(theme.borderDefault, isDark) : 'transparent'}`,
                borderBottom: isActive
                  ? `1px solid ${codeBg}`
                  : `1px solid ${tc(theme.borderDefault, isDark)}`,
                background: isActive ? codeBg : 'transparent',
                color: isActive ? ds('#65a30d', '#84cc16', isDark) : tc(theme.textMuted, isDark),
                fontWeight: isActive ? 600 : 400,
                position: 'relative',
                zIndex: isActive ? 1 : 0,
                marginBottom: -1,
              }}
            >
              {pattern.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div
        className="rounded-b-lg rounded-tr-lg overflow-hidden"
        style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
      >
        {/* Description */}
        <div className="px-4 pt-4 pb-3">
          <p
            className="text-sm leading-relaxed"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {active.description}
          </p>
        </div>

        {/* Code header */}
        <div
          className="flex items-center justify-between px-4 py-2 font-mono text-xs"
          style={{
            background: ds('#e2e8f0', '#1e293b', isDark),
            color: tc(theme.textMuted, isDark),
          }}
        >
          <span>{active.filename}</span>
          <span
            className="px-2 py-0.5 rounded text-xs uppercase tracking-wider"
            style={{
              background: ds('rgba(132,204,22,0.1)', 'rgba(132,204,22,0.08)', isDark),
              color: ds('#65a30d', '#84cc16', isDark),
            }}
          >
            {active.lang}
          </span>
        </div>

        {/* Code body */}
        <pre
          className="m-0 overflow-x-auto font-mono"
          style={{
            padding: 16,
            background: codeBg,
            fontSize: 12.5,
            lineHeight: 1.7,
            color: tc(theme.textSecondary, isDark),
          }}
        >
          <code>{active.code}</code>
        </pre>

        {/* Tip */}
        <div
          className="px-4 py-3 text-xs leading-relaxed"
          style={{
            borderTop: `1px solid ${tc(theme.borderDefault, isDark)}`,
            background: ds('rgba(132,204,22,0.04)', 'rgba(132,204,22,0.04)', isDark),
            color: tc(theme.textSecondary, isDark),
          }}
        >
          <span style={{ color: ds('#65a30d', '#84cc16', isDark) }}>💡 </span>
          {active.tip}
        </div>
      </div>
    </div>
  )
}
