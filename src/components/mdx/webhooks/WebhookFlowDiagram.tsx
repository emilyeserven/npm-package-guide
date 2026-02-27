import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { WEBHOOK_FLOW_STEPS } from '../../../data/webhooksData'

export function WebhookFlowDiagram() {
  const isDark = useIsDark()
  const accent = ds('#f59e0b', '#f59e0b', isDark)

  return (
    <div className="flex items-center justify-center gap-0 flex-wrap my-6">
      {WEBHOOK_FLOW_STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div
            className="rounded-lg border px-4 py-3 text-center min-w-[120px] transition-colors hover:shadow-md"
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
          {i < WEBHOOK_FLOW_STEPS.length - 1 && (
            <span
              className="text-lg px-2 flex-shrink-0"
              style={{ color: accent }}
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
