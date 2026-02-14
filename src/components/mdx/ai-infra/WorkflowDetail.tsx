import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { INFRA_WORKFLOWS, INFRA_LAYERS } from '../../../data/aiInfraData'

const layerMap = Object.fromEntries(INFRA_LAYERS.map((l) => [l.id, l]))

export function WorkflowDetail({ workflowId }: { workflowId: string }) {
  const isDark = useIsDark()
  const workflow = INFRA_WORKFLOWS.find((w) => w.id === workflowId)

  if (!workflow) return null

  // Collect unique layers involved in this workflow
  const uniqueLayers = [...new Set(workflow.steps.map((s) => s.layer))]
    .map((id) => layerMap[id])
    .filter(Boolean)

  return (
    <div className="mb-6">
      {/* Workflow description */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: ds('#64748b', '#94a3b8', isDark) }}
      >
        {workflow.description}
      </p>

      {/* Step-by-step flow */}
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

      {/* Layers involved summary */}
      <div
        className="mt-4 pt-4 border-t"
        style={{ borderColor: ds('#e2e8f0', '#334155', isDark) }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-wide mb-2"
          style={{ color: ds('#94a3b8', '#64748b', isDark) }}
        >
          Layers involved
        </div>
        <div className="flex flex-wrap gap-2">
          {uniqueLayers.map((layer) => (
            <span
              key={layer.id}
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                background: layer.color + '15',
                color: layer.color,
              }}
            >
              {layer.icon} {layer.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
