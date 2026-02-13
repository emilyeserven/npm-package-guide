import { useState } from 'react'
import { K8S_SECTIONS } from '../../../data/k8sData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function K8sConceptList({ sectionId }: { sectionId: string }) {
  const isDark = useIsDark()
  const [expanded, setExpanded] = useState<number | null>(null)

  const section = K8S_SECTIONS.find(s => s.id === sectionId)
  if (!section?.concepts) return null

  return (
    <div className="flex flex-col gap-1.5 my-4">
      <div
        className="text-xs font-bold tracking-widest uppercase mb-1"
        style={{ color: ds('#d97706', '#f59e0b', isDark) }}
      >
        Key Concepts (click to expand)
      </div>

      {section.concepts.map((c, i) => (
        <button
          key={i}
          onClick={() => setExpanded(expanded === i ? null : i)}
          className="w-full text-left rounded-lg border px-3.5 py-2.5 transition-all duration-200 cursor-pointer"
          style={{
            background: expanded === i
              ? ds('rgba(245, 158, 11, 0.08)', 'rgba(245, 158, 11, 0.12)', isDark)
              : ds('rgba(0,0,0,0.02)', 'rgba(255,255,255,0.04)', isDark),
            borderColor: expanded === i
              ? ds('rgba(245, 158, 11, 0.3)', 'rgba(245, 158, 11, 0.3)', isDark)
              : ds('#e2e8f0', 'rgba(255,255,255,0.08)', isDark),
          }}
        >
          <div className="flex justify-between items-center">
            <span
              className="font-bold text-sm font-mono"
              style={{ color: ds('#b45309', '#fbbf24', isDark) }}
            >
              {c.term}
            </span>
            <span
              className="text-xs transition-transform duration-200"
              style={{
                color: ds('#94a3b8', '#666', isDark),
                transform: expanded === i ? 'rotate(90deg)' : 'none',
              }}
            >
              \u25B6
            </span>
          </div>
          {expanded === i && (
            <div
              className="text-[13px] leading-relaxed mt-2 pt-2"
              style={{
                color: ds('#475569', '#d1d5db', isDark),
                borderTop: `1px solid ${ds('#e2e8f0', 'rgba(255,255,255,0.06)', isDark)}`,
              }}
            >
              {c.def}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
