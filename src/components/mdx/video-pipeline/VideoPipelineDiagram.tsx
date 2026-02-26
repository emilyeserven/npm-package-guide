import { useIsDark } from '../../../hooks/useTheme'
import { useExplorer } from '../../../hooks/useExplorer'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { VP_PIPELINE_STAGES } from '../../../data/videoPipelineData'

export function VideoPipelineDiagram() {
  const isDark = useIsDark()
  const { activeId, active, setActiveId } = useExplorer(VP_PIPELINE_STAGES, 'capture')

  return (
    <div
      className="rounded-xl border p-5 my-6"
      style={{
        background: tc(theme.bgCard, isDark),
        borderColor: tc(theme.borderDefault, isDark),
      }}
    >
      {/* Pipeline nodes */}
      <div className="flex items-center gap-0 overflow-x-auto pb-3 pt-1">
        {VP_PIPELINE_STAGES.map((stage, i) => (
          <div key={stage.id} className="flex items-center flex-shrink-0">
            {i > 0 && (
              <span
                className="px-2 text-sm font-mono flex-shrink-0"
                style={{ color: ds('#94a3b8', '#475569', isDark) }}
              >
                &rarr;
              </span>
            )}
            <button
              onClick={() => setActiveId(stage.id)}
              className="flex flex-col items-center px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 min-w-[100px]"
              style={{
                borderColor: activeId === stage.id
                  ? ds('#059669', '#2dd4bf', isDark)
                  : tc(theme.borderDefault, isDark),
                background: activeId === stage.id
                  ? ds('#ecfdf5', 'rgba(45, 212, 191, 0.08)', isDark)
                  : ds('#f8fafc', '#1a2332', isDark),
                transform: activeId === stage.id ? 'translateY(-2px)' : 'none',
                boxShadow: activeId === stage.id
                  ? ds('0 4px 12px rgba(5, 150, 105, 0.1)', '0 4px 12px rgba(45, 212, 191, 0.08)', isDark)
                  : 'none',
              }}
            >
              <span className="text-2xl mb-1">{stage.icon}</span>
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: ds('#64748b', '#94a3b8', isDark) }}
              >
                {stage.label}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {active && (
        <div
          className="mt-4 p-4 rounded-lg border"
          style={{
            background: ds('#f8fafc', '#0f172a', isDark),
            borderColor: tc(theme.borderDefault, isDark),
          }}
        >
          <div
            className="text-xs font-mono uppercase tracking-wider mb-2"
            style={{ color: ds('#059669', '#2dd4bf', isDark) }}
          >
            {active.title}
          </div>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {active.description}
          </p>
        </div>
      )}
    </div>
  )
}
