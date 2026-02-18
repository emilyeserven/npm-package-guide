import { useState, useEffect, useRef } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSQ_LIFECYCLE_STEPS } from '../../../data/tanstackQueryData'

export function TsqQueryLifecycle() {
  const isDark = useIsDark()
  const [step, setStep] = useState(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const teal = ds('#0d9488', '#14b8a6', isDark)
  const accent = ds('#d97706', '#f59e0b', isDark)
  const current = TSQ_LIFECYCLE_STEPS[step]
  const currentColor = ds(current.color[0], current.color[1], isDark)

  const stopAuto = () => {
    if (autoRef.current) {
      clearInterval(autoRef.current)
      autoRef.current = null
    }
  }

  const autoPlay = () => {
    stopAuto()
    autoRef.current = setInterval(() => {
      setStep((s) => {
        if (s >= TSQ_LIFECYCLE_STEPS.length - 1) {
          stopAuto()
          return s
        }
        return s + 1
      })
    }, 1500)
  }

  useEffect(() => () => stopAuto(), [])

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: tc(theme.bgCard, isDark),
        border: `1px solid ${tc(theme.borderDefault, isDark)}`,
      }}
    >
      <div
        className="font-mono text-xs mb-4"
        style={{ color: accent, letterSpacing: '0.08em' }}
      >
        QUERY LIFECYCLE &mdash; STEP {step + 1} OF {TSQ_LIFECYCLE_STEPS.length}
      </div>

      {/* Step buttons */}
      <div className="flex gap-1 mb-5 flex-wrap">
        {TSQ_LIFECYCLE_STEPS.map((_s, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                stopAuto()
                setStep(i)
              }}
              className="w-8 h-8 rounded-lg font-mono text-xs font-semibold cursor-pointer transition-all flex items-center justify-center"
              style={{
                border: `1px solid ${i === step ? currentColor : tc(theme.borderDefault, isDark)}`,
                background:
                  i === step
                    ? `${currentColor}22`
                    : i < step
                      ? `${teal}08`
                      : 'transparent',
                color:
                  i === step ? currentColor : i < step ? teal : tc(theme.textMuted, isDark),
              }}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* Current step display */}
      <div
        className="rounded-lg p-5 flex gap-4 items-start"
        style={{
          background: `${currentColor}08`,
          border: `1px solid ${currentColor}22`,
          minHeight: 80,
        }}
      >
        <span className="text-3xl shrink-0">{current.icon}</span>
        <div>
          <div
            className="text-xl font-semibold mb-1.5"
            style={{ color: currentColor }}
          >
            {current.label}
          </div>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {current.desc}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => {
            stopAuto()
            setStep((s) => Math.max(0, s - 1))
          }}
          disabled={step === 0}
          className="rounded-md font-mono text-xs cursor-pointer"
          style={{
            padding: '6px 16px',
            border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            background: 'transparent',
            color: step === 0 ? tc(theme.textMuted, isDark) : tc(theme.textPrimary, isDark),
            opacity: step === 0 ? 0.4 : 1,
          }}
        >
          &larr; Prev
        </button>
        <button
          onClick={() => {
            stopAuto()
            setStep((s) => Math.min(TSQ_LIFECYCLE_STEPS.length - 1, s + 1))
          }}
          disabled={step === TSQ_LIFECYCLE_STEPS.length - 1}
          className="rounded-md font-mono text-xs cursor-pointer"
          style={{
            padding: '6px 16px',
            border: `1px solid ${accent}44`,
            background: `${accent}18`,
            color:
              step === TSQ_LIFECYCLE_STEPS.length - 1
                ? tc(theme.textMuted, isDark)
                : accent,
            opacity: step === TSQ_LIFECYCLE_STEPS.length - 1 ? 0.4 : 1,
          }}
        >
          Next &rarr;
        </button>
        {step < TSQ_LIFECYCLE_STEPS.length - 1 && (
          <button
            onClick={autoPlay}
            className="rounded-md font-mono text-xs cursor-pointer"
            style={{
              padding: '6px 16px',
              border: `1px solid ${tc(theme.borderDefault, isDark)}`,
              background: 'transparent',
              color: tc(theme.textMuted, isDark),
            }}
          >
            &#9654; Auto-play
          </button>
        )}
      </div>
    </div>
  )
}
