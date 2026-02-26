import { useState, useEffect } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { EKS_POD_STAGES } from '../../../data/eksData'

export function EksPodLifecycle() {
  const isDark = useIsDark()
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setStage((s) => (s + 1) % EKS_POD_STAGES.length), 3000)
    return () => clearInterval(timer)
  }, [])

  const current = EKS_POD_STAGES[stage]
  const accentColor = ds(current.color, current.darkColor, isDark)

  return (
    <div className="mb-6">
      <div className="flex gap-1 mb-4 flex-wrap">
        {EKS_POD_STAGES.map((s, i) => {
          const isActive = i === stage
          const color = ds(s.color, s.darkColor, isDark)
          return (
            <button
              key={i}
              onClick={() => setStage(i)}
              className="flex-1 min-w-0 px-2 py-2.5 rounded-lg text-xs font-mono cursor-pointer transition-all border"
              style={{
                background: isActive ? `${color}18` : (isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc'),
                borderColor: isActive ? color : tc(theme.borderDefault, isDark),
                color: isActive ? color : tc(theme.textMuted, isDark),
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {s.name}
            </button>
          )
        })}
      </div>
      <div
        className="rounded-xl border p-4 transition-all"
        style={{
          background: `${accentColor}08`,
          borderColor: `${accentColor}30`,
        }}
      >
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              background: accentColor,
              boxShadow: `0 0 12px ${accentColor}60`,
              animation: stage === 2 ? 'pulse 2s infinite' : 'none',
            }}
          />
          <span
            className="text-sm font-mono font-semibold"
            style={{ color: accentColor }}
          >
            {current.name}
          </span>
          <span
            className="text-xs ml-auto"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Stage {stage + 1} of {EKS_POD_STAGES.length}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: tc(theme.textSecondary, isDark) }}
        >
          {current.desc}
        </p>
      </div>
    </div>
  )
}
