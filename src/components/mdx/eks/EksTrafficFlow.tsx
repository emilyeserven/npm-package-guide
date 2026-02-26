import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_TRAFFIC_STEPS } from '../../../data/eksData'

export function EksTrafficFlow() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-1 mb-6">
      {EKS_TRAFFIC_STEPS.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="text-sm font-mono min-w-40 text-right"
            style={{ color: ds(step.color, step.darkColor, isDark) }}
          >
            {step.label}
          </span>
          <span
            className="text-lg"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            {'\u2192'}
          </span>
          <span
            className="text-sm font-mono"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            {step.next}
          </span>
        </div>
      ))}
    </div>
  )
}
