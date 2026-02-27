import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { useExplorer } from '../../../hooks/useExplorer'
import { CopyButton } from '../CopyButton'
import { TL_INDEX_STEPS } from '../../../data/twelvelabsData'

export function TlIndexFlow() {
  const isDark = useIsDark()
  const { activeId, setActiveId, active } = useExplorer(TL_INDEX_STEPS, TL_INDEX_STEPS[0].id)

  return (
    <div
      className="grid gap-5 items-start mb-6"
      style={{ gridTemplateColumns: 'minmax(200px, 300px) 1fr' }}
    >
      <div className="flex flex-col gap-1">
        {TL_INDEX_STEPS.map((step, i) => {
          const isActive = step.id === activeId
          return (
            <button
              key={step.id}
              onClick={() => setActiveId(step.id)}
              className="flex gap-4 items-start text-left rounded-lg px-4 py-3 border transition-all cursor-pointer w-full"
              style={{
                background: isActive ? ds('#f1f5f9', '#1e293b', isDark) : 'transparent',
                borderColor: isActive ? ds('#e2e8f0', '#334155', isDark) : 'transparent',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-all"
                style={{
                  background: isActive ? ds('#6366f1', '#818cf8', isDark) : ds('#f1f5f9', '#1e293b', isDark),
                  color: isActive ? '#fff' : tc(theme.textMuted, isDark),
                }}
              >
                {i + 1}
              </div>
              <div>
                <div
                  className="font-semibold text-sm mb-0.5 transition-colors"
                  style={{ color: isActive ? tc(theme.textPrimary, isDark) : tc(theme.textMuted, isDark) }}
                >
                  {step.title}
                </div>
                <div
                  className="text-xs"
                  style={{ color: tc(theme.textMuted, isDark) }}
                >
                  {step.description}
                </div>
              </div>
            </button>
          )
        })}
      </div>
      {active && (
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
            <span>{active.fileName}</span>
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
              <code>{active.code}</code>
            </pre>
            <CopyButton text={active.code} />
          </div>
        </div>
      )}
    </div>
  )
}
