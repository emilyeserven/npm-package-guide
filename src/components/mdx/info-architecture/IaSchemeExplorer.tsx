import { AccordionList } from '../AccordionList'
import { ds } from '../../../helpers/darkStyle'
import { IA_ORG_SCHEMES } from '../../../data/iaData'
import type { IaOrgScheme } from '../../../data/iaData'

function TypeBadge({ type, isDark }: { type: 'exact' | 'ambiguous'; isDark: boolean }) {
  const isExact = type === 'exact'
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{
        background: isExact
          ? ds('#dbeafe', '#1e3a5f', isDark)
          : ds('#fef3c7', '#422006', isDark),
        color: isExact
          ? ds('#1d4ed8', '#93c5fd', isDark)
          : ds('#92400e', '#fcd34d', isDark),
      }}
    >
      {isExact ? 'Exact' : 'Ambiguous'}
    </span>
  )
}

export function IaSchemeExplorer() {
  return (
    <AccordionList<IaOrgScheme>
      items={IA_ORG_SCHEMES}
      gap="gap-3"
      renderHeader={(scheme, _i, isDark) => (
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className="font-semibold text-sm"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {scheme.title}
          </span>
          <TypeBadge type={scheme.type} isDark={isDark} />
        </div>
      )}
      renderBody={(scheme, _i, isDark) => (
        <div className="mt-3 space-y-3 text-sm">
          <p
            className="m-0 leading-relaxed"
            style={{ color: ds('#334155', '#cbd5e1', isDark) }}
          >
            {scheme.description}
          </p>
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
              {scheme.example}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg px-4 py-3"
              style={{
                background: ds('#f0fdf4', '#052e16', isDark),
                borderLeft: `3px solid ${ds('#22c55e', '#4ade80', isDark)}`,
              }}
            >
              <span
                className="font-semibold text-xs"
                style={{ color: ds('#15803d', '#4ade80', isDark) }}
              >
                Strength
              </span>
              <p
                className="m-0 mt-1"
                style={{ color: ds('#166534', '#86efac', isDark) }}
              >
                {scheme.strength}
              </p>
            </div>
            <div
              className="rounded-lg px-4 py-3"
              style={{
                background: ds('#fef2f2', '#450a0a', isDark),
                borderLeft: `3px solid ${ds('#ef4444', '#f87171', isDark)}`,
              }}
            >
              <span
                className="font-semibold text-xs"
                style={{ color: ds('#dc2626', '#f87171', isDark) }}
              >
                Weakness
              </span>
              <p
                className="m-0 mt-1"
                style={{ color: ds('#991b1b', '#fca5a5', isDark) }}
              >
                {scheme.weakness}
              </p>
            </div>
          </div>
        </div>
      )}
    />
  )
}
