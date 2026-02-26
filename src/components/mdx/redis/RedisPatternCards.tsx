import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { REDIS_PATTERNS } from '../../../data/redisData'
import type { RedisPattern } from '../../../data/redisData'

function PatternCard({ pattern, index }: { pattern: RedisPattern; index: number }) {
  const isDark = useIsDark()
  const [showCode, setShowCode] = useState(false)

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: tc(theme.bgCard, isDark),
        borderColor: tc(theme.borderDefault, isDark),
      }}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h4
            className="text-base font-bold m-0"
            style={{ color: tc(theme.textPrimary, isDark) }}
          >
            {pattern.name}
          </h4>
          <span
            className="text-xs font-mono px-2 py-1 rounded shrink-0"
            style={{
              color: tc(theme.textMuted, isDark),
              background: ds('#f1f5f9', '#0f172a', isDark),
            }}
          >
            Pattern #{index + 1}
          </span>
        </div>

        <div
          className="rounded-lg border p-3"
          style={{
            background: ds('#f1f5f9', '#0f172a', isDark),
            borderColor: ds('#e2e8f0', '#1e293b', isDark),
          }}
        >
          {pattern.diagram.map((line, i) => (
            <div
              key={i}
              className="font-mono text-xs leading-relaxed"
              style={{ color: ds('#059669', '#6ee7b7', isDark) }}
            >
              {line}
            </div>
          ))}
        </div>

        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: tc(theme.textSecondary, isDark) }}
        >
          {pattern.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#22c55e' }}>
              Pros
            </span>
            {pattern.pros.map((pro, i) => (
              <div
                key={i}
                className="text-xs flex items-start gap-1.5"
                style={{ color: ds('#64748b', '#94a3b8', isDark) }}
              >
                <span style={{ color: '#22c55e' }} className="mt-0.5">+</span> {pro}
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#f97316' }}>
              Cons
            </span>
            {pattern.cons.map((con, i) => (
              <div
                key={i}
                className="text-xs flex items-start gap-1.5"
                style={{ color: ds('#64748b', '#94a3b8', isDark) }}
              >
                <span style={{ color: '#f97316' }} className="mt-0.5">&minus;</span> {con}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs font-semibold flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer"
          style={{ color: ds('#0284c7', '#38bdf8', isDark) }}
        >
          {showCode ? 'Hide' : 'Show'} implementation
          <svg
            className="w-3.5 h-3.5"
            style={{
              transform: showCode ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showCode && (
          <div
            className="rounded-lg border p-4"
            style={{
              background: ds('#f1f5f9', '#0f172a', isDark),
              borderColor: tc(theme.borderDefault, isDark),
            }}
          >
            <pre
              className="text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto m-0"
              style={{ color: ds('#475569', '#cbd5e1', isDark) }}
            >
              {pattern.code}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export function RedisPatternCards() {
  return (
    <div className="space-y-4 mb-6">
      {REDIS_PATTERNS.map((p, i) => (
        <PatternCard key={p.name} pattern={p} index={i} />
      ))}
    </div>
  )
}
