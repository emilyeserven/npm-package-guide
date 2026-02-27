import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { CopyButton } from '../CopyButton'
import { TL_SEARCH_TABS } from '../../../data/twelvelabsData'

export function TlSearchTabs() {
  const isDark = useIsDark()
  const [activeKey, setActiveKey] = useState(TL_SEARCH_TABS[0].key)
  const activeTab = TL_SEARCH_TABS.find(t => t.key === activeKey) ?? TL_SEARCH_TABS[0]

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-4">
        {TL_SEARCH_TABS.map(tab => {
          const isActive = tab.key === activeKey
          return (
            <button
              key={tab.key}
              onClick={() => setActiveKey(tab.key)}
              className="px-4 py-2 rounded-lg border text-sm font-mono transition-all cursor-pointer"
              style={{
                borderColor: isActive ? ds('#6366f1', '#818cf8', isDark) : tc(theme.borderDefault, isDark),
                background: isActive ? ds('#6366f1', '#818cf8', isDark) + '18' : 'transparent',
                color: isActive ? ds('#6366f1', '#818cf8', isDark) : tc(theme.textMuted, isDark),
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div
        className="rounded-lg border overflow-hidden"
        style={{ borderColor: tc(theme.borderDefault, isDark) }}
      >
        <div
          className="px-4 py-2 text-xs font-mono flex justify-between items-center"
          style={{
            background: ds('#f8fafc', '#0f172a', isDark),
            color: tc(theme.textMuted, isDark),
          }}
        >
          <span>{activeTab.fileName}</span>
          <span className="text-[11px]">js</span>
        </div>
        <div className="relative">
          <pre
            className="p-4 overflow-x-auto text-[13px] leading-relaxed m-0"
            style={{
              background: ds('#ffffff', '#1e293b', isDark),
              color: tc(theme.textSecondary, isDark),
            }}
          >
            <code>{activeTab.code}</code>
          </pre>
          <CopyButton text={activeTab.code} />
        </div>
      </div>
    </div>
  )
}
