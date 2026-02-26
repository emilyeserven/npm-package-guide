import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSAI_FEATURES } from '../../../data/tsaiData'
import type { TsaiFeature } from '../../../data/tsaiData'

export function TsaiFeatureCards() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {TSAI_FEATURES.map((feature: TsaiFeature) => (
        <div
          key={feature.id}
          className="rounded-xl p-5 transition-all"
          style={{
            background: tc(theme.bgCard, isDark),
            border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            boxShadow: tc(theme.shadowSm, isDark),
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3"
            style={{
              background: ds(`${feature.accent}18`, `${feature.darkAccent}18`, isDark),
              color: ds(feature.accent, feature.darkAccent, isDark),
            }}
          >
            {feature.icon}
          </div>
          <h3
            className="text-sm font-bold mb-1.5"
            style={{ color: tc(theme.textPrimary, isDark) }}
          >
            {feature.title}
          </h3>
          <p
            className="text-xs leading-relaxed"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  )
}
