import { PIPELINE_STAGES, type PipelineStage } from '../../../data/cicdData'
import { ds } from '../../../helpers/darkStyle'
import { TimelineFlow } from '../TimelineFlow'

export function PipelineStages() {
  return (
    <TimelineFlow<PipelineStage>
      items={PIPELINE_STAGES}
      className="my-6"
      itemGap="gap-4"
      renderIndicator={(stage, _i, isDark) => (
        <div className="w-8 flex items-center justify-center shrink-0">
          <div
            className="w-3.5 h-3.5 rounded-full shrink-0"
            style={{
              background: ds(stage.color, stage.darkColor, isDark),
              border: `2px solid ${ds(stage.color, stage.darkColor, isDark)}40`,
            }}
          />
        </div>
      )}
      renderConnector={(current, next, isDark) => (
        <div
          className="w-0.5 flex-1 mt-1"
          style={{
            background: `linear-gradient(${ds(current.color, current.darkColor, isDark)}, ${ds(next.color, next.darkColor, isDark)})`,
          }}
        />
      )}
      renderContent={(stage, _i, isDark) => (
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
      )}
    />
  )
}
