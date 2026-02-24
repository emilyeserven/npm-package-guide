import { AccordionList } from '../AccordionList'
import { ds } from '../../../helpers/darkStyle'
import { IA_AI_PRINCIPLES } from '../../../data/iaData'
import type { IaAiPrinciple } from '../../../data/iaData'

export function IaAiPrincipleCards() {
  return (
    <AccordionList<IaAiPrinciple>
      items={IA_AI_PRINCIPLES}
      gap="gap-3"
      renderHeader={(principle, _i, isDark) => (
        <div className="flex items-center gap-3">
          <span className="text-xl">{principle.icon}</span>
          <span
            className="font-semibold text-sm"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {principle.title}
          </span>
        </div>
      )}
      renderBody={(principle, _i, isDark) => (
        <div className="mt-3 space-y-3 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg px-4 py-3"
              style={{
                background: ds('#f0fdf4', '#052e16', isDark),
                borderLeft: `3px solid ${ds('#22c55e', '#4ade80', isDark)}`,
              }}
            >
              <span
                className="font-semibold text-xs block mb-1"
                style={{ color: ds('#15803d', '#4ade80', isDark) }}
              >
                For humans
              </span>
              <span style={{ color: ds('#166534', '#86efac', isDark) }}>
                {principle.humanBenefit}
              </span>
            </div>
            <div
              className="rounded-lg px-4 py-3"
              style={{
                background: ds('#eff6ff', '#172554', isDark),
                borderLeft: `3px solid ${ds('#3b82f6', '#60a5fa', isDark)}`,
              }}
            >
              <span
                className="font-semibold text-xs block mb-1"
                style={{ color: ds('#1d4ed8', '#60a5fa', isDark) }}
              >
                For AI agents
              </span>
              <span style={{ color: ds('#1e40af', '#93c5fd', isDark) }}>
                {principle.aiBenefit}
              </span>
            </div>
          </div>
          <div
            className="rounded-lg px-4 py-3"
            style={{ background: ds('#f8fafc', '#0f172a', isDark) }}
          >
            <span
              className="font-semibold"
              style={{ color: ds('#475569', '#94a3b8', isDark) }}
            >
              Example:
            </span>{' '}
            <span style={{ color: ds('#64748b', '#94a3b8', isDark) }}>
              {principle.example}
            </span>
          </div>
        </div>
      )}
    />
  )
}
