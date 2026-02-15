import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { INFRA_LAYERS } from '../../../data/aiInfraData'
import type { InfraConcept, InfraLayer } from '../../../data/aiInfraData'

function ConceptCard({
  concept,
  layer,
  isDark,
}: {
  concept: InfraConcept
  layer: InfraLayer
  isDark: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setExpanded(!expanded)
        }
      }}
      className="py-3 mb-1 transition-all cursor-pointer"
      style={{
        borderBottom: `1px solid ${ds('#e2e8f0', '#334155', isDark)}`,
      }}
    >
      <div className="flex justify-between items-center">
        <span
          className="font-semibold text-sm"
          style={{ color: expanded ? layer.color : ds('#1e293b', '#e2e8f0', isDark) }}
        >
          {concept.name}
        </span>
        <span
          className="text-xs transition-transform duration-200"
          style={{
            color: ds('#94a3b8', '#64748b', isDark),
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </span>
      </div>

      <p
        className="text-sm mt-1.5 mb-0 leading-relaxed"
        style={{ color: ds('#475569', '#94a3b8', isDark) }}
      >
        {concept.what}
      </p>

      {expanded && (
        <div className="mt-2 flex flex-col gap-2">
          <div className="pl-3 mt-1" style={{ borderLeft: `2px solid ${layer.color}40` }}>
            <div
              className="text-xs font-bold uppercase tracking-wider mb-1"
              style={{ color: layer.color }}
            >
              Frontend Analogy
            </div>
            <p
              className="text-sm m-0 leading-relaxed"
              style={{ color: ds('#475569', '#cbd5e1', isDark) }}
            >
              {concept.analogy}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {concept.tools.map((tool) => (
              <span
                key={tool}
                className="text-xs font-medium px-2 py-0.5 rounded-md font-mono"
                style={{
                  background: ds('#f1f5f9', 'rgba(255,255,255,0.06)', isDark),
                  color: ds('#64748b', '#94a3b8', isDark),
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function InfraLayerExplorer({ layerId }: { layerId: string }) {
  const isDark = useIsDark()
  const layer = INFRA_LAYERS.find((l) => l.id === layerId)
  if (!layer) return null

  return (
    <div className="mb-6">
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{layer.icon}</span>
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: layer.color }}
          >
            {layer.subtitle}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: ds('#374151', '#e2e8f0', isDark) }}
        >
          {layer.summary}
        </p>
      </div>

      {layer.concepts.map((concept) => (
        <ConceptCard key={concept.name} concept={concept} layer={layer} isDark={isDark} />
      ))}
    </div>
  )
}
