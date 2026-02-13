import { PIPELINE_STAGES } from '../../../data/cicdData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function PipelineStages() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-col gap-3 my-6">
      {PIPELINE_STAGES.map((stage, i) => (
        <div key={stage.name} className="flex items-stretch gap-4">
          {/* Timeline */}
          <div className="flex flex-col items-center w-8 shrink-0">
            <div
              className="w-3.5 h-3.5 rounded-full shrink-0"
              style={{
                background: ds(stage.color, stage.darkColor, isDark),
                border: `2px solid ${ds(stage.color, stage.darkColor, isDark)}40`,
              }}
            />
            {i < PIPELINE_STAGES.length - 1 && (
              <div
                className="w-0.5 flex-1 mt-1"
                style={{
                  background: `linear-gradient(${ds(stage.color, stage.darkColor, isDark)}, ${ds(PIPELINE_STAGES[i + 1].color, PIPELINE_STAGES[i + 1].darkColor, isDark)})`,
                }}
              />
            )}
          </div>
          {/* Card */}
          <div
            className="rounded-xl p-4 flex-1 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60"
            style={{ borderLeftWidth: 3, borderLeftColor: ds(stage.color, stage.darkColor, isDark) }}
          >
            <div className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">
              {stage.name}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0 mb-2">
              {stage.desc}
            </p>
            <code
              className="text-xs rounded px-2 py-0.5"
              style={{
                color: ds(stage.color, stage.darkColor, isDark),
                background: `${ds(stage.color, stage.darkColor, isDark)}15`,
              }}
            >
              {stage.example}
            </code>
          </div>
        </div>
      ))}
    </div>
  )
}
