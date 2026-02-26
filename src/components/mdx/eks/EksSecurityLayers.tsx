import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_SECURITY_LAYERS } from '../../../data/eksData'

export function EksSecurityLayers() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-0.5 mb-6">
      {EKS_SECURITY_LAYERS.map((l, i) => (
        <div
          key={l.layer}
          className="flex gap-4 px-4 py-3 rounded-lg"
          style={{
            background: i % 2 === 0
              ? (isDark ? 'rgba(255,255,255,0.015)' : '#f8fafc')
              : 'transparent',
          }}
        >
          <span
            className="text-xs font-mono font-semibold min-w-20"
            style={{ color: ds(l.color, l.darkColor, isDark) }}
          >
            {l.layer}
          </span>
          <span
            className="text-sm"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {l.items}
          </span>
        </div>
      ))}
    </div>
  )
}
