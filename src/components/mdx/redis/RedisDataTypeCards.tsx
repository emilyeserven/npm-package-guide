import { REDIS_DATA_TYPES } from '../../../data/redisData'
import type { RedisDataType } from '../../../data/redisData'
import { AccordionList } from '../AccordionList'
import { ds } from '../../../helpers/darkStyle'

export function RedisDataTypeCards() {
  return (
    <AccordionList<RedisDataType>
      items={REDIS_DATA_TYPES}
      className="mb-7"
      gap="gap-3"
      itemClassName="rounded-xl border overflow-hidden px-5 py-4"
      itemStyle={(item, isDark, expanded) => ({
        background: expanded
          ? ds('#ffffff', '#1e293b', isDark)
          : ds('#f8fafc', '#0f172a', isDark),
        borderColor: expanded
          ? ds(item.color + '40', item.darkColor + '40', isDark)
          : ds('#e2e8f0', '#334155', isDark),
        boxShadow: expanded ? `0 4px 20px ${ds(item.color + '10', item.darkColor + '15', isDark)}` : 'none',
      })}
      renderHeader={(dt, _i, isDark) => (
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0"
            style={{
              background: ds(dt.color + '15', dt.darkColor + '20', isDark),
              color: ds(dt.color, dt.darkColor, isDark),
            }}
          >
            {dt.icon}
          </div>
          <div>
            <span
              className="font-semibold text-sm"
              style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
            >
              {dt.name}
            </span>
            <span
              className="block text-xs mt-0.5"
              style={{ color: ds('#94a3b8', '#64748b', isDark) }}
            >
              {dt.maxSize}
            </span>
          </div>
        </div>
      )}
      renderBody={(dt, _i, isDark) => (
        <div
          className="pt-4 space-y-4 -mx-5 px-5"
          style={{ borderTop: `1px solid ${ds('#e2e8f0', '#334155', isDark)}` }}
        >
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: ds('#475569', '#cbd5e1', isDark) }}
          >
            {dt.description}
          </p>
          <div
            className="rounded-lg border p-4"
            style={{
              background: ds('#f1f5f9', '#0f172a', isDark),
              borderColor: ds('#e2e8f0', '#334155', isDark),
            }}
          >
            <pre
              className="text-xs font-mono whitespace-pre-wrap leading-relaxed m-0"
              style={{ color: ds('#475569', '#cbd5e1', isDark) }}
            >
              {dt.example}
            </pre>
          </div>
          <div className="flex items-start gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider shrink-0 mt-0.5"
              style={{ color: ds('#94a3b8', '#64748b', isDark) }}
            >
              Use for
            </span>
            <span
              className="text-sm"
              style={{ color: ds('#64748b', '#94a3b8', isDark) }}
            >
              {dt.useCase}
            </span>
          </div>
        </div>
      )}
      renderIndicator={(expanded, isDark) => (
        <svg
          className="w-5 h-5 shrink-0"
          style={{
            color: ds('#94a3b8', '#64748b', isDark),
            transform: expanded ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s',
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    />
  )
}
