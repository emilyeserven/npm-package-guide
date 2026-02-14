import { K8S_SECTIONS, type K8sFlowStep } from '../../../data/k8sData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { TimelineFlow } from '../TimelineFlow'

export function K8sFlowDiagram() {
  const isDark = useIsDark()
  const section = K8S_SECTIONS.find(s => s.id === 'flow')
  if (!section?.flow) return null

  return (
    <TimelineFlow<K8sFlowStep>
      items={section.flow}
      className="my-6"
      heading={
        <div
          className="text-xs font-bold tracking-widest uppercase mb-1"
          style={{ color: ds('#2563eb', '#60a5fa', isDark) }}
        >
          Deployment Pipeline
        </div>
      }
      renderIndicator={(f, _i, dark) => (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm text-white shrink-0"
          style={{
            background: ds(f.color, f.darkColor, dark),
            boxShadow: `0 0 12px ${ds(f.color, f.darkColor, dark)}44`,
          }}
        >
          {f.step}
        </div>
      )}
      renderConnector={(current, next, dark) => (
        <div
          className="w-0.5 flex-1 mt-1"
          style={{
            background: `linear-gradient(${ds(current.color, current.darkColor, dark)}, ${ds(next.color, next.darkColor, dark)})`,
          }}
        />
      )}
      renderContent={(f, _i, dark) => (
        <div
          className="rounded-xl p-3.5 flex-1 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60"
          style={{
            borderLeftWidth: 3,
            borderLeftColor: ds(f.color, f.darkColor, dark),
          }}
        >
          <div className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-0.5">
            {f.label}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {f.detail}
          </div>
        </div>
      )}
    />
  )
}
