import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { CopyButton } from '../CopyButton'

interface Tab {
  id: string
  label: string
  title: string
  content: string
}

export function AgentsCodeViewer({ tabs }: { tabs: Tab[] }) {
  const isDark = useIsDark()
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? '')
  const active = tabs.find(t => t.id === activeTab) ?? tabs[0]

  return (
    <div className="my-4 rounded-lg border overflow-hidden" style={{ borderColor: tc(theme.borderDefault, isDark) }}>
      {/* tab bar */}
      <div
        className="flex gap-1 p-1"
        style={{ background: ds('#f1f5f9', '#0f172a', isDark) }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 px-3 py-1.5 rounded text-sm transition-colors"
            style={{
              background: activeTab === tab.id
                ? tc(theme.bgCard, isDark)
                : 'transparent',
              color: activeTab === tab.id
                ? tc(theme.textPrimary, isDark)
                : tc(theme.textMuted, isDark),
              fontWeight: activeTab === tab.id ? 500 : 400,
              boxShadow: activeTab === tab.id ? tc(theme.shadowSm, isDark) : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* header with filename + copy */}
      {active && (
        <>
          <div
            className="px-4 py-2 text-xs font-mono flex justify-between items-center border-t"
            style={{
              background: ds('#f8fafc', '#0f172a', isDark),
              color: tc(theme.textMuted, isDark),
              borderColor: tc(theme.borderDefault, isDark),
            }}
          >
            <span>{active.title}</span>
            <CopyButton
              text={active.content}
              className="px-2 py-1 rounded text-[10px] font-mono border transition-colors cursor-pointer"
            />
          </div>
          <div className="relative">
            <pre
              className="p-4 overflow-x-auto text-sm leading-relaxed"
              style={{
                background: ds('#f8fafc', '#0f172a', isDark),
                margin: 0,
              }}
            >
              <code style={{ color: tc(theme.textPrimary, isDark), fontFamily: 'inherit' }}>
                {active.content}
              </code>
            </pre>
          </div>
        </>
      )}
    </div>
  )
}
