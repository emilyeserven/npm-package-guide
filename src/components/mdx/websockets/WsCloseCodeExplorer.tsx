import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { WS_CLOSE_CODES } from '../../../data/wsData'

export function WsCloseCodeExplorer() {
  const isDark = useIsDark()
  const accentColor = ds('#16a34a', '#00e5a0', isDark)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
      {WS_CLOSE_CODES.map((code) => (
        <div
          key={code.code}
          className="rounded-lg border p-4 transition-colors"
          style={{
            borderColor: tc(theme.borderDefault, isDark),
            backgroundColor: ds('#f8fafc', '#0f172a', isDark),
          }}
        >
          <div className="font-mono font-bold text-lg mb-0.5" style={{ color: accentColor }}>
            {code.code}
          </div>
          <div
            className="font-mono text-[10px] uppercase tracking-widest mb-2"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            {code.name}
          </div>
          <div className="text-sm leading-relaxed" style={{ color: tc(theme.textSecondary, isDark) }}>
            {code.description}
          </div>
        </div>
      ))}
    </div>
  )
}
