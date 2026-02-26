import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSS_CODE_EXAMPLES } from '../../../data/tanstackStartData'
import type { TssCodeTab } from '../../../data/tanstackStartData'

export function TssCodeTabs({ exampleId }: { exampleId: string }) {
  const isDark = useIsDark()
  const group = TSS_CODE_EXAMPLES[exampleId]
  const [activeTab, setActiveTab] = useState<string>(group?.tabs[0]?.id ?? '')

  if (!group) return null

  const active = group.tabs.find((t: TssCodeTab) => t.id === activeTab) ?? group.tabs[0]
  const codeBg = ds('#f8fafc', '#0d1117', isDark)
  const headerBg = ds('#e2e8f0', '#1e293b', isDark)

  return (
    <div className="mb-6">
      {/* Description */}
      {active.description && (
        <p
          className="text-sm leading-relaxed mb-3"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          {active.description}
        </p>
      )}

      {/* Tabs */}
      <div className="flex gap-0.5">
        {group.tabs.map((tab: TssCodeTab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-t-lg transition-all text-xs font-mono cursor-pointer"
              style={{
                padding: '8px 16px',
                border: `1px solid ${isActive ? tc(theme.borderDefault, isDark) : 'transparent'}`,
                borderBottom: isActive
                  ? `1px solid ${codeBg}`
                  : `1px solid ${tc(theme.borderDefault, isDark)}`,
                background: isActive ? codeBg : 'transparent',
                color: isActive ? ds(tab.dotColor, tab.dotColor, isDark) : tc(theme.textMuted, isDark),
                fontWeight: isActive ? 600 : 400,
                position: 'relative',
                zIndex: isActive ? 1 : 0,
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Code block */}
      <div
        className="rounded-b-lg rounded-tr-lg overflow-hidden"
        style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-4 py-2 font-mono text-xs"
          style={{ background: headerBg, color: tc(theme.textMuted, isDark) }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: active.dotColor, opacity: 0.7 }}
          />
          <span className="ml-1">{active.filename}</span>
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
