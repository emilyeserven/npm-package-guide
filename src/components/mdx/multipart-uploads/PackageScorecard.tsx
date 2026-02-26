import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { SCORECARD_CRITERIA } from '../../../data/multipartData'
import type { ScorecardWeight } from '../../../data/multipartData'

const WEIGHT_COLORS: Record<ScorecardWeight, { light: string; dark: string }> = {
  Critical:      { light: '#dc2626', dark: '#ef4444' },
  Important:     { light: '#d97706', dark: '#f59e0b' },
  'Nice-to-have': { light: '#059669', dark: '#10b981' },
}

export function PackageScorecard() {
  const isDark = useIsDark()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="my-6">
      <p
        className="text-sm leading-relaxed mt-0 mb-4"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        When evaluating an upload package for your frontend, run through this checklist.
        Click each criterion to see what good and bad implementations look like.
      </p>

      <div className="flex flex-col gap-3">
        {SCORECARD_CRITERIA.map(c => {
          const isOpen = openId === c.name
          const wc = WEIGHT_COLORS[c.weight]
          const weightColor = ds(wc.light, wc.dark, isDark)

          return (
            <div
              key={c.name}
              className="rounded-lg border overflow-hidden transition-colors"
              style={{
                borderColor: isOpen
                  ? ds('#3b82f6', '#3b82f6', isDark) + '55'
                  : tc(theme.borderDefault, isDark),
              }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : c.name)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors"
                style={{
                  background: isOpen
                    ? ds('#f8fafc', '#1a2332', isDark)
                    : ds('#fff', '#1e293b', isDark),
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="inline-block text-xs transition-transform"
                    style={{
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      color: ds('#2563eb', '#3b82f6', isDark),
                    }}
                  >
                    {'\u25B6'}
                  </span>
                  <span
                    className="text-[15px] font-medium"
                    style={{ color: tc(theme.textPrimary, isDark) }}
                  >
                    {c.name}
                  </span>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold tracking-wide uppercase"
                    style={{
                      color: weightColor,
                      background: weightColor + '15',
                      border: `1px solid ${weightColor}33`,
                    }}
                  >
                    {c.weight}
                  </span>
                </span>
              </button>

              {isOpen && (
                <div
                  className="px-5 py-4 grid gap-3"
                  style={{ borderTop: `1px solid ${tc(theme.borderDefault, isDark)}` }}
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span style={{ color: ds('#059669', '#10b981', isDark) }} className="text-sm">{'\u2713'}</span>
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: ds('#059669', '#10b981', isDark) }}
                      >
                        GOOD
                      </span>
                    </div>
                    <p
                      className="text-[13px] leading-relaxed m-0"
                      style={{ color: tc(theme.textSecondary, isDark) }}
                    >
                      {c.good}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span style={{ color: ds('#dc2626', '#ef4444', isDark) }} className="text-sm">{'\u2715'}</span>
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: ds('#dc2626', '#ef4444', isDark) }}
                      >
                        BAD
                      </span>
                    </div>
                    <p
                      className="text-[13px] leading-relaxed m-0"
                      style={{ color: tc(theme.textSecondary, isDark) }}
                    >
                      {c.bad}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
