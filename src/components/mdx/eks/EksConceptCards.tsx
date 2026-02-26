import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_K8S_CONCEPTS } from '../../../data/eksData'

export function EksConceptCards() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
      {EKS_K8S_CONCEPTS.map((item) => (
        <div
          key={item.term}
          className="rounded-xl border p-4 transition-colors"
          style={{
            background: tc(theme.bgCard, isDark),
            borderColor: tc(theme.borderDefault, isDark),
            borderLeftWidth: '4px',
            borderLeftColor: ds(item.color, item.darkColor, isDark),
          }}
        >
          <div
            className="text-sm font-semibold mb-1.5"
            style={{ color: ds(item.color, item.darkColor, isDark) }}
          >
            {item.term}
          </div>
          <div
            className="text-sm leading-relaxed"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {item.def}
          </div>
        </div>
      ))}
    </div>
  )
}
