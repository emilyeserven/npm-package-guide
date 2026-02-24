import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { IA_PILLARS } from '../../../data/iaData'

const PILLAR_COLORS: Record<string, { light: string; dark: string }> = {
  organization: { light: '#3b82f6', dark: '#60a5fa' },
  labeling: { light: '#8b5cf6', dark: '#a78bfa' },
  navigation: { light: '#10b981', dark: '#34d399' },
  search: { light: '#f59e0b', dark: '#fbbf24' },
}

export function IaPillarCards() {
  const isDark = useIsDark()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      {IA_PILLARS.map((pillar) => {
        const isOpen = expanded === pillar.id
        const color = PILLAR_COLORS[pillar.id] ?? { light: '#64748b', dark: '#94a3b8' }
        const accent = isDark ? color.dark : color.light

        return (
          <button
            key={pillar.id}
            onClick={() => setExpanded(isOpen ? null : pillar.id)}
            className="text-left rounded-xl border p-5 transition-all duration-200 cursor-pointer"
            style={{
              background: isDark ? '#1e293b' : '#ffffff',
              borderColor: isOpen ? accent : (isDark ? '#334155' : '#e2e8f0'),
              borderLeftWidth: '4px',
              borderLeftColor: accent,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{pillar.icon}</span>
                <span
                  className="font-bold text-base"
                  style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
                >
                  {pillar.title}
                </span>
              </div>
              <span
                className="text-lg transition-transform duration-200 shrink-0"
                style={{
                  color: ds('#94a3b8', '#64748b', isDark),
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                }}
              >
                +
              </span>
            </div>
            <p
              className="text-sm mt-2 mb-0"
              style={{ color: ds('#64748b', '#94a3b8', isDark) }}
            >
              {pillar.summary}
            </p>
            {isOpen && (
              <div className="mt-4 space-y-3">
                <p
                  className="text-sm leading-relaxed m-0"
                  style={{ color: ds('#334155', '#cbd5e1', isDark) }}
                >
                  {pillar.details}
                </p>
                <div
                  className="rounded-lg px-4 py-3 text-sm"
                  style={{
                    background: ds('#f8fafc', '#0f172a', isDark),
                    borderLeft: `3px solid ${accent}`,
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: accent }}
                  >
                    Backend analogy:
                  </span>{' '}
                  <span style={{ color: ds('#475569', '#94a3b8', isDark) }}>
                    {pillar.backendAnalogy}
                  </span>
                </div>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
