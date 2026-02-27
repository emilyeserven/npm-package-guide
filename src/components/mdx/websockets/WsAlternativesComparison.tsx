import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { WS_ALTERNATIVES } from '../../../data/wsData'

export function WsAlternativesComparison() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
      {WS_ALTERNATIVES.map((alt) => {
        const color = ds(alt.accent, alt.darkAccent, isDark)
        return (
          <div
            key={alt.id}
            className="rounded-lg border p-4 transition-colors"
            style={{
              borderColor: color + '40',
              backgroundColor: tc(theme.bgCard, isDark),
            }}
          >
            <div className="font-mono text-sm font-bold mb-3" style={{ color }}>
              {alt.title}
            </div>
            <div className="text-sm leading-relaxed mb-2" style={{ color: tc(theme.textMuted, isDark) }}>
              <strong style={{ color: tc(theme.textPrimary, isDark) }}>Use for:</strong>{' '}
              {alt.useFor}
            </div>
            <div className="text-sm leading-relaxed" style={{ color: tc(theme.textMuted, isDark) }}>
              <strong style={{ color: tc(theme.textPrimary, isDark) }}>Key trait:</strong>{' '}
              {alt.keyTrait}
            </div>
          </div>
        )
      })}
    </div>
  )
}
