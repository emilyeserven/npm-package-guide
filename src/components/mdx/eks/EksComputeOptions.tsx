import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_COMPUTE_OPTIONS } from '../../../data/eksData'

export function EksComputeOptions() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-2.5 mb-6">
      {EKS_COMPUTE_OPTIONS.map((opt) => {
        const color = ds(opt.color, opt.darkColor, isDark)
        return (
          <div
            key={opt.name}
            className="flex gap-3.5 items-start rounded-xl border p-4"
            style={{
              background: tc(theme.bgCard, isDark),
              borderColor: tc(theme.borderDefault, isDark),
            }}
          >
            <span
              className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded shrink-0 mt-0.5 border tracking-wider"
              style={{
                color,
                background: `${color}12`,
                borderColor: `${color}30`,
              }}
            >
              {opt.tag}
            </span>
            <div>
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {opt.name}
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: tc(theme.textSecondary, isDark) }}
              >
                {opt.desc}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
