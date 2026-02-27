import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { WS_COMPARISON_ITEMS } from '../../../data/wsData'

export function WsPollingComparison() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      {WS_COMPARISON_ITEMS.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border p-5 transition-colors"
          style={{
            borderColor: ds(item.accent + '40', item.darkAccent + '40', isDark),
            backgroundColor: ds(item.accent + '06', item.darkAccent + '08', isDark),
          }}
        >
          <div
            className="text-sm font-mono font-bold mb-2 flex items-center gap-2"
            style={{ color: ds(item.accent, item.darkAccent, isDark) }}
          >
            <span>{item.icon}</span>
            {item.title}
          </div>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}
