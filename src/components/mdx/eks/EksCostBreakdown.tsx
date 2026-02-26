import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_COST_ROWS } from '../../../data/eksData'

export function EksCostBreakdown() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-3 mb-6">
      {EKS_COST_ROWS.map((row) => {
        const color = ds(row.color, row.darkColor, isDark)
        return (
          <div
            key={row.item}
            className="flex gap-4 items-start px-4 py-3 rounded-xl border"
            style={{
              background: tc(theme.bgCard, isDark),
              borderColor: tc(theme.borderDefault, isDark),
            }}
          >
            <div
              className="w-1 rounded self-stretch shrink-0"
              style={{ background: color }}
            />
            <div className="flex-1">
              <div className="flex justify-between flex-wrap gap-1">
                <span
                  className="text-sm font-semibold"
                  style={{ color: tc(theme.textPrimary, isDark) }}
                >
                  {row.item}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color }}
                >
                  {row.cost}
                </span>
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: tc(theme.textMuted, isDark) }}
              >
                {row.note}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
