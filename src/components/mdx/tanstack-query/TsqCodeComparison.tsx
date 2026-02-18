import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSQ_CODE_EXAMPLES } from '../../../data/tanstackQueryData'

const TAB_ORDER = ['tanstack', 'fetch', 'xhr', 'axios'] as const

export function TsqCodeComparison() {
  const isDark = useIsDark()
  const [activeTab, setActiveTab] = useState<string>('tanstack')

  const accent = ds('#d97706', '#f59e0b', isDark)
  const codeBg = ds('#f8fafc', '#0d1117', isDark)
  const headerBg = ds('#e2e8f0', '#1e293b', isDark)

  const active = TSQ_CODE_EXAMPLES[activeTab]

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0.5">
        {TAB_ORDER.map((key) => {
          const isActive = activeTab === key
          const example = TSQ_CODE_EXAMPLES[key]
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="rounded-t-lg transition-all text-xs font-mono"
              style={{
                padding: '8px 16px',
                border: `1px solid ${isActive ? tc(theme.borderDefault, isDark) : 'transparent'}`,
                borderBottom: isActive
                  ? `1px solid ${codeBg}`
                  : `1px solid ${tc(theme.borderDefault, isDark)}`,
                background: isActive ? codeBg : 'transparent',
                color: isActive
                  ? key === 'tanstack'
                    ? accent
                    : tc(theme.textPrimary, isDark)
                  : tc(theme.textMuted, isDark),
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                position: 'relative',
                zIndex: isActive ? 1 : 0,
                marginBottom: -1,
              }}
            >
              {example.label}
            </button>
          )
        })}
      </div>

      {/* Code block */}
      <div
        className="rounded-b-lg rounded-tr-lg overflow-hidden"
        style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-2 font-mono text-xs"
          style={{ background: headerBg, color: tc(theme.textMuted, isDark) }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: ds('#e11d48', '#f43f5e', isDark), opacity: 0.7 }}
          />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: accent, opacity: 0.7 }}
          />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: ds('#0d9488', '#14b8a6', isDark), opacity: 0.7 }}
          />
          <span className="ml-2">{active.label} approach</span>
        </div>

        {/* Code */}
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
      </div>
    </div>
  )
}
