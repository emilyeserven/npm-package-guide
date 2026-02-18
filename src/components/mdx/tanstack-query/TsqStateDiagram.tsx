import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSQ_STATE_TYPES } from '../../../data/tanstackQueryData'

export function TsqStateDiagram() {
  const isDark = useIsDark()
  const [activeType, setActiveType] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {TSQ_STATE_TYPES.map((st) => {
        const isActive = activeType === st.key
        const color = ds(st.color[0], st.color[1], isDark)

        return (
          <div
            key={st.key}
            onClick={() => setActiveType(isActive ? null : st.key)}
            className="rounded-xl p-5 cursor-pointer transition-all"
            style={{
              background: isActive ? `${color}10` : tc(theme.bgCard, isDark),
              border: `1px solid ${isActive ? `${color}44` : tc(theme.borderDefault, isDark)}`,
            }}
          >
            <div className="text-3xl mb-2">{st.icon}</div>
            <div
              className="text-lg font-semibold mb-1"
              style={{ color: tc(theme.textPrimary, isDark) }}
            >
              {st.label}
            </div>

            {/* Badge */}
            <span
              className="inline-block rounded-full font-mono text-xs font-semibold"
              style={{
                padding: '2px 10px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color,
                background: `${color}18`,
                border: `1px solid ${color}33`,
              }}
            >
              {st.tool}
            </span>

            <p
              className="text-sm leading-relaxed mt-2.5"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {st.desc}
            </p>

            {isActive && (
              <div
                className="mt-3 pt-3"
                style={{ borderTop: `1px solid ${color}22` }}
              >
                <div
                  className="font-mono text-xs mb-1.5"
                  style={{ color, letterSpacing: '0.08em' }}
                >
                  EXAMPLES
                </div>
                {st.examples.map((ex) => (
                  <div
                    key={ex}
                    className="font-mono text-xs py-0.5 flex items-center gap-1.5"
                    style={{ color: tc(theme.textSecondary, isDark) }}
                  >
                    <span style={{ color, fontSize: 8 }}>{'\u25CF'}</span> {ex}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
