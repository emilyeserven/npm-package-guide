import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { AGENT_USE_CASES } from '../../../data/agentsData'
import type { AgentUseCase } from '../../../data/agentsData'

const DIFF_COLORS: Record<AgentUseCase['difficulty'], { light: string; dark: string; textLight: string; textDark: string }> = {
  Beginner:     { light: '#dcfce7', dark: 'rgba(16,185,129,0.15)', textLight: '#15803d', textDark: '#6ee7b7' },
  Intermediate: { light: '#fef3c7', dark: 'rgba(245,158,11,0.15)', textLight: '#92400e', textDark: '#fbbf24' },
  Advanced:     { light: '#ffe4e6', dark: 'rgba(244,63,94,0.15)',  textLight: '#9f1239', textDark: '#fda4af' },
}

export function AgentsUseCases() {
  const isDark = useIsDark()
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  return (
    <div className="space-y-3 my-6">
      {AGENT_USE_CASES.map((uc, i) => {
        const expanded = expandedIdx === i
        const dc = DIFF_COLORS[uc.difficulty]
        return (
          <div
            key={uc.title}
            className="rounded-lg border overflow-hidden"
            style={{ borderColor: tc(theme.borderDefault, isDark) }}
          >
            <button
              onClick={() => setExpandedIdx(expanded ? null : i)}
              className="w-full text-left p-4 flex items-center justify-between transition-colors"
              style={{ background: expanded ? ds('#f8fafc', 'rgba(30,41,59,0.4)', isDark) : 'transparent' }}
            >
              <div>
                <div
                  className="font-medium"
                  style={{ color: tc(theme.textPrimary, isDark) }}
                >
                  {uc.title}
                </div>
                <span
                  className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: ds(dc.light, dc.dark, isDark),
                    color: ds(dc.textLight, dc.textDark, isDark),
                  }}
                >
                  {uc.difficulty}
                </span>
              </div>
              <span
                className="transition-transform"
                style={{
                  color: tc(theme.textMuted, isDark),
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                {'\u25BE'}
              </span>
            </button>
            {expanded && (
              <div
                className="px-4 pb-4 border-t"
                style={{ borderColor: ds('#f1f5f9', 'rgba(51,65,85,0.3)', isDark) }}
              >
                <p
                  className="text-sm mt-3"
                  style={{ color: tc(theme.textSecondary, isDark) }}
                >
                  {uc.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {uc.tools.map(t => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        background: ds('#f1f5f9', 'rgba(51,65,85,0.5)', isDark),
                        color: tc(theme.textSecondary, isDark),
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
