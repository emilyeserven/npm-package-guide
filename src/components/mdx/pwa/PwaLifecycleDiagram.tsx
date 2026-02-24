import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { LIFECYCLE_PHASES } from '../../../data/pwaData'

/**
 * Interactive Service Worker lifecycle diagram.
 * Click a phase to see its description.
 */
export function PwaLifecycleDiagram() {
  const isDark = useIsDark()
  const [activePhase, setActivePhase] = useState<string | null>(null)

  const active = LIFECYCLE_PHASES.find(p => p.id === activePhase)

  return (
    <div
      className="rounded-xl border p-5 mb-6"
      style={{
        background: ds('#f8fafc', '#1e293b', isDark),
        borderColor: ds('#e2e8f0', '#334155', isDark),
      }}
    >
      <div
        className="text-xs font-mono uppercase tracking-widest mb-3"
        style={{ color: ds('#94a3b8', '#64748b', isDark) }}
      >
        Service Worker Lifecycle &mdash; click a phase
      </div>

      <div className="flex items-center gap-1 flex-wrap">
        {LIFECYCLE_PHASES.map((phase, i) => {
          const isActive = activePhase === phase.id
          const color = ds(phase.color, phase.darkColor, isDark)
          return (
            <div key={phase.id} className="flex items-center">
              <button
                onClick={() => setActivePhase(isActive ? null : phase.id)}
                className="rounded-lg px-3 py-2 text-sm font-mono border cursor-pointer transition-colors"
                style={{
                  background: isActive ? color : ds('#ffffff', '#0f172a', isDark),
                  color: isActive ? '#fff' : ds('#475569', '#94a3b8', isDark),
                  borderColor: isActive ? color : ds('#e2e8f0', '#334155', isDark),
                }}
              >
                {phase.label}
              </button>
              {i < LIFECYCLE_PHASES.length - 1 && (
                <span
                  className="mx-1 text-lg"
                  style={{ color: ds('#cbd5e1', '#475569', isDark) }}
                >
                  &rarr;
                </span>
              )}
            </div>
          )
        })}
      </div>

      {active && (
        <div
          className="mt-3 rounded-lg border-l-[3px] px-4 py-3 text-sm"
          style={{
            background: ds('#f1f5f9', '#0f172a', isDark),
            borderLeftColor: ds(active.color, active.darkColor, isDark),
            color: ds('#475569', '#94a3b8', isDark),
          }}
        >
          {active.desc}
        </div>
      )}
    </div>
  )
}
