import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_SCALING_TOOLS } from '../../../data/eksData'

export function EksScalingTools() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-3 mb-6">
      {EKS_SCALING_TOOLS.map((tool) => {
        const color = ds(tool.color, tool.darkColor, isDark)
        return (
          <div key={tool.name} className="flex gap-3 items-start">
            <div
              className="w-1 rounded shrink-0 self-stretch"
              style={{ background: color }}
            />
            <div>
              <div
                className="text-sm font-mono font-semibold mb-1"
                style={{ color }}
              >
                {tool.name}
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: tc(theme.textSecondary, isDark) }}
              >
                {tool.desc}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
