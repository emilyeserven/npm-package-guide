import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { HMAC_FLOW_STEPS } from '../../../data/webhooksData'

export function WebhookHmacFlow() {
  const isDark = useIsDark()
  const accent = ds('#f59e0b', '#f59e0b', isDark)

  return (
    <div className="flex items-center justify-center gap-0 flex-wrap my-6">
      {HMAC_FLOW_STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div
            className="rounded-lg border px-4 py-3 text-center min-w-[110px] transition-colors"
            style={{
              borderColor: tc(theme.borderDefault, isDark),
              backgroundColor: tc(theme.bgCard, isDark),
            }}
          >
            <div className="text-2xl mb-1">{step.icon}</div>
            <div
              className="text-xs font-semibold"
              style={{ color: tc(theme.textPrimary, isDark) }}
            >
              {step.label}
            </div>
            <div
              className="text-[10px] mt-0.5"
              style={{ color: tc(theme.textMuted, isDark) }}
            >
              {step.sub}
            </div>
          </div>
          {i < HMAC_FLOW_STEPS.length - 1 && (
            <span
              className="text-lg px-2 flex-shrink-0"
              style={{ color: accent }}
            >
              {i === 0 ? '+' : '→'}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
