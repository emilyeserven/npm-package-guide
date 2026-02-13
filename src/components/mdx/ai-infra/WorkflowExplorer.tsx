import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { INFRA_WORKFLOWS, INFRA_LAYERS } from '../../../data/aiInfraData'

const layerMap = Object.fromEntries(INFRA_LAYERS.map((l) => [l.id, l]))

export function WorkflowExplorer() {
  const isDark = useIsDark()
  const [activeId, setActiveId] = useState(INFRA_WORKFLOWS[0].id)
  const workflow = INFRA_WORKFLOWS.find((w) => w.id === activeId)!

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-5">
        {INFRA_WORKFLOWS.map((w) => {
          const isActive = activeId === w.id
          return (
            <button
              key={w.id}
              onClick={() => setActiveId(w.id)}
              className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all cursor-pointer"
              style={{
                background: isActive
                  ? ds('#1e293b', '#f1f5f9', isDark)
                  : ds('#ffffff', '#1e293b', isDark),
                color: isActive
                  ? ds('#ffffff', '#1e293b', isDark)
                  : ds('#64748b', '#94a3b8', isDark),
                borderColor: isActive ? 'transparent' : ds('#e2e8f0', '#334155', isDark),
              }}
            >
              {w.title}
            </button>
          )
        })}
      </div>

      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: ds('#64748b', '#94a3b8', isDark) }}
      >
        {workflow.description}
      </p>

      <div className="flex flex-col">
        {workflow.steps.map((step, i) => {
          const layer = layerMap[step.layer]
          const color = layer?.color ?? '#94a3b8'

          return (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                  style={{ background: color + '20' }}
                >
                  {step.icon}
                </div>
                {i < workflow.steps.length - 1 && (
                  <div
                    className="w-0.5 grow min-h-4"
                    style={{ background: ds('#e2e8f0', '#334155', isDark) }}
                  />
                )}
              </div>
              <div className="pb-4">
                <div
                  className="text-sm font-medium"
                  style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
                >
                  {step.label}
                </div>
                <span
                  className="text-xs font-mono font-medium px-2 py-0.5 rounded mt-1 inline-block"
                  style={{ background: color + '15', color }}
                >
                  {layer?.title ?? step.layer}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
