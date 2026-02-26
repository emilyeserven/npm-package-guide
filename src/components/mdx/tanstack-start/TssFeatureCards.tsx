import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSS_FEATURES } from '../../../data/tanstackStartData'
import type { TssFeature } from '../../../data/tanstackStartData'

export function TssFeatureCards() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {TSS_FEATURES.map((feature: TssFeature) => (
        <div
          key={feature.id}
          className="rounded-xl p-4 transition-all"
          style={{
            background: tc(theme.bgCard, isDark),
            border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            boxShadow: tc(theme.shadowSm, isDark),
          }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base mb-2.5"
            style={{
              background: ds(`${feature.accent}18`, `${feature.darkAccent}18`, isDark),
              color: ds(feature.accent, feature.darkAccent, isDark),
            }}
          >
            {feature.icon}
          </div>
          <h3
            className="text-sm font-bold mb-1"
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
