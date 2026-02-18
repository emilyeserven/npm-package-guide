import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSQ_STRENGTHS, TSQ_WEAKNESSES } from '../../../data/tanstackQueryData'

export function TsqProsCons() {
  const isDark = useIsDark()
  const [view, setView] = useState<'strengths' | 'weaknesses'>('strengths')

  const teal = ds('#0d9488', '#14b8a6', isDark)
  const rose = ds('#e11d48', '#f43f5e', isDark)
  const items = view === 'strengths' ? TSQ_STRENGTHS : TSQ_WEAKNESSES
  const color = view === 'strengths' ? teal : rose

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-1 mb-5">
        {(['strengths', 'weaknesses'] as const).map((v) => {
          const isActive = view === v
          const btnColor = v === 'strengths' ? teal : rose
          return (
            <button
              key={v}
              onClick={() => setView(v)}
              className="rounded-lg font-semibold cursor-pointer transition-all"
              style={{
                padding: '8px 20px',
                fontSize: 14,
                background: isActive ? `${btnColor}18` : 'transparent',
                border: `1px solid ${isActive ? `${btnColor}44` : tc(theme.borderDefault, isDark)}`,
                color: isActive ? btnColor : tc(theme.textMuted, isDark),
              }}
            >
              {v === 'strengths' ? '\u2726 Strengths' : '\u26A0 Weaknesses'}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="rounded-xl p-5 transition-all"
            style={{
              background: tc(theme.bgCard, isDark),
              border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className="font-mono text-xs font-bold"
                style={{ color, opacity: 0.5 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="font-semibold"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {item.title}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed m-0"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
