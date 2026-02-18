import { ARCH_LAYERS, ANTI_PATTERNS, SM_COLORS } from '../../../data/stateManagementData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'

export function StateArchitecture() {
  const isDark = useIsDark()

  return (
    <div>
      {/* Architecture layers */}
      {ARCH_LAYERS.map((layer, i) => (
        <div
          key={i}
          className="rounded-xl p-6 mb-3"
          style={{
            background: tc(theme.bgCard, isDark),
            border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            borderLeftColor: layer.color,
            borderLeftWidth: 4,
            boxShadow: tc(theme.shadowSm, isDark),
          }}
        >
          <div className="flex justify-between items-center mb-2.5">
            <div>
              <div
                className="text-xs font-bold tracking-wider mb-1 font-mono"
                style={{ color: tc(theme.textMuted, isDark) }}
              >
                LAYER {i + 1}
              </div>
              <h3
                className="m-0 text-lg font-bold"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {layer.layer}
              </h3>
            </div>
            <span
              className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold"
              style={{
                background: `${layer.color}18`,
                color: layer.color,
              }}
            >
              {layer.tool}
            </span>
          </div>
          <p
            className="text-sm mb-3"
            style={{ color: tc(theme.textSecondary, isDark), lineHeight: 1.7 }}
          >
            {layer.desc}
          </p>
          <code
            className="text-xs font-mono"
            style={{ color: layer.color, opacity: 0.8 }}
          >
            {layer.examples}
          </code>
        </div>
      ))}

      {/* Anti-patterns */}
      <h3
        className="text-xs font-bold tracking-widest uppercase mt-8 mb-3 font-mono"
        style={{ color: tc(theme.textMuted, isDark) }}
      >
        Common Anti-Patterns
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ANTI_PATTERNS.map((item, i) => (
          <div
            key={i}
            className="rounded-lg p-4"
            style={{
              background: tc(theme.bgCard, isDark),
              border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            }}
          >
            <div className="flex items-start gap-2 mb-2.5">
              <span className="shrink-0 text-sm" style={{ color: SM_COLORS.danger }}>{'\u2717'}</span>
              <span className="text-xs" style={{ color: ds('#dc2626', '#f87171', isDark), lineHeight: 1.5 }}>
                {item.bad}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="shrink-0 text-sm" style={{ color: SM_COLORS.success }}>{'\u2713'}</span>
              <span className="text-xs" style={{ color: ds('#16a34a', '#4ade80', isDark), lineHeight: 1.5 }}>
                {item.good}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
