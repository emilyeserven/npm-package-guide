import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { INFRA_WORKFLOWS, INFRA_LAYERS } from '../../../data/aiInfraData'
import type { WorkflowStep } from '../../../data/aiInfraData/types'
import { TimelineFlow } from '../TimelineFlow'

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
    <TimelineFlow<WorkflowStep>
      items={workflow.steps}
      className="mb-6"
      itemGap="gap-4"
      heading={
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: ds('#64748b', '#94a3b8', isDark) }}
        >
          {workflow.description}
        </p>
      }
      footer={
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
      }
      renderIndicator={(step) => {
        const color = layerMap[step.layer]?.color ?? '#94a3b8'
        return (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
            style={{ background: color + '20' }}
          >
            {step.icon}
          </div>
        )
      }}
      renderContent={(step, _i, dark) => {
        const layer = layerMap[step.layer]
        const color = layer?.color ?? '#94a3b8'
        return (
          <div className="pb-4">
            <div
              className="text-sm font-medium"
              style={{ color: ds('#1e293b', '#f1f5f9', dark) }}
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
        )
      }}
    />
  )
}
