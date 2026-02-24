import { AccordionList } from '../AccordionList'
import { ds } from '../../../helpers/darkStyle'
import { IA_NAV_PATTERNS } from '../../../data/iaData'
import type { IaNavPattern } from '../../../data/iaData'

export function IaNavPatternCards() {
  return (
    <AccordionList<IaNavPattern>
      items={IA_NAV_PATTERNS}
      gap="gap-3"
      renderHeader={(pattern, _i, isDark) => (
        <div className="flex items-center gap-3">
          <span className="text-xl">{pattern.icon}</span>
          <span
            className="font-semibold text-sm"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {pattern.title}
          </span>
        </div>
      )}
      renderBody={(pattern, _i, isDark) => (
        <div className="mt-3 space-y-3 text-sm">
          <p
            className="m-0 leading-relaxed"
            style={{ color: ds('#334155', '#cbd5e1', isDark) }}
          >
            {pattern.description}
          </p>
          <div>
            <span
              className="font-semibold text-xs"
              style={{ color: ds('#475569', '#94a3b8', isDark) }}
            >
              Examples:
            </span>
            <ul className="mt-1 mb-0 pl-5 space-y-1">
              {pattern.examples.map((ex, j) => (
                <li
                  key={j}
                  className="text-sm"
                  style={{ color: ds('#64748b', '#94a3b8', isDark) }}
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-lg px-4 py-3"
            style={{
              background: ds('#f8fafc', '#0f172a', isDark),
              borderLeft: `3px solid ${ds('#3b82f6', '#60a5fa', isDark)}`,
            }}
          >
            <span
              className="font-semibold"
              style={{ color: ds('#2563eb', '#60a5fa', isDark) }}
            >
              When to use:
            </span>{' '}
            <span style={{ color: ds('#475569', '#94a3b8', isDark) }}>
              {pattern.whenToUse}
            </span>
          </div>
        </div>
      )}
    />
  )
}
