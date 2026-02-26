import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_DEPLOY_STRATEGIES } from '../../../data/eksData'

export function EksDeployStrategies() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {EKS_DEPLOY_STRATEGIES.map((s) => {
        const color = ds(s.color, s.darkColor, isDark)
        return (
          <div
            key={s.name}
            className="rounded-xl border p-4"
            style={{
              background: `${color}06`,
              borderColor: `${color}20`,
            }}
          >
            <div className="text-2xl mb-2">{s.emoji}</div>
            <div
              className="text-sm font-mono font-semibold mb-1.5"
              style={{ color }}
            >
              {s.name}
            </div>
            <div
              className="text-sm leading-relaxed"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {s.desc}
            </div>
          </div>
        )
      })}
    </div>
  )
}
