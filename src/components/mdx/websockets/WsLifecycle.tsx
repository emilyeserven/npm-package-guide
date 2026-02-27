import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { WS_LIFECYCLE_PHASES } from '../../../data/wsData'

export function WsLifecycle() {
  const isDark = useIsDark()
  const accentColor = ds('#2563eb', '#60a5fa', isDark)

  return (
    <div className="flex flex-col my-6">
      {WS_LIFECYCLE_PHASES.map((phase, i) => (
        <div
          key={phase.name}
          className="grid gap-4 py-4 pl-5 relative transition-colors group cursor-default"
          style={{
            gridTemplateColumns: '120px 1fr',
            borderLeft: `2px solid ${tc(theme.borderDefault, isDark)}`,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.borderLeftColor = accentColor
            const dot = el.querySelector<HTMLElement>('[data-dot]')
            if (dot) {
              dot.style.borderColor = accentColor
              dot.style.backgroundColor = accentColor
              dot.style.boxShadow = `0 0 10px ${accentColor}33`
            }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.borderLeftColor = tc(theme.borderDefault, isDark)
            const dot = el.querySelector<HTMLElement>('[data-dot]')
            if (dot) {
              dot.style.borderColor = tc(theme.borderDefault, isDark)
              dot.style.backgroundColor = tc(theme.bgCard, isDark)
              dot.style.boxShadow = 'none'
            }
          }}
        >
          <div
            data-dot
            className="absolute w-2.5 h-2.5 rounded-full transition-all"
            style={{
              left: '-7px',
              top: '1.25rem',
              backgroundColor: tc(theme.bgCard, isDark),
              border: `2px solid ${tc(theme.borderDefault, isDark)}`,
            }}
          />
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wide" style={{ color: accentColor }}>
              {phase.name}
            </div>
            <div className="text-[11px] font-mono mt-0.5" style={{ color: tc(theme.textMuted, isDark) }}>
              readyState: {phase.readyState}
            </div>
          </div>
          <div className="text-sm leading-relaxed" style={{ color: tc(theme.textSecondary, isDark) }}>
            {phase.description}
          </div>
          {i < WS_LIFECYCLE_PHASES.length - 1 && (
            <div
              className="col-span-2"
              style={{ borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}`, marginTop: '0.5rem' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
