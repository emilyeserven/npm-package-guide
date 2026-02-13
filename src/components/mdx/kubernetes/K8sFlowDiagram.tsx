import { K8S_SECTIONS } from '../../../data/k8sData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function K8sFlowDiagram() {
  const isDark = useIsDark()
  const section = K8S_SECTIONS.find(s => s.id === 'flow')
  if (!section?.flow) return null

  const { flow } = section

  return (
    <div className="flex flex-col gap-3 my-6">
      <div
        className="text-xs font-bold tracking-widest uppercase mb-1"
        style={{ color: ds('#2563eb', '#60a5fa', isDark) }}
      >
        Deployment Pipeline
      </div>

      {flow.map((f, i) => (
        <div key={i} className="flex items-stretch gap-3">
          {/* Timeline */}
          <div className="flex flex-col items-center w-9 shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm text-white shrink-0"
              style={{
                background: ds(f.color, f.darkColor, isDark),
                boxShadow: `0 0 12px ${ds(f.color, f.darkColor, isDark)}44`,
              }}
            >
              {f.step}
            </div>
            {i < flow.length - 1 && (
              <div
                className="w-0.5 flex-1 mt-1"
                style={{
                  background: `linear-gradient(${ds(f.color, f.darkColor, isDark)}, ${ds(flow[i + 1].color, flow[i + 1].darkColor, isDark)})`,
                }}
              />
            )}
          </div>

          {/* Card */}
          <div
            className="rounded-xl p-3.5 flex-1 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60"
            style={{
              borderLeftWidth: 3,
              borderLeftColor: ds(f.color, f.darkColor, isDark),
            }}
          >
            <div className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-0.5">
              {f.label}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {f.detail}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
