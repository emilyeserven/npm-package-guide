import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { WS_HANDSHAKE_STEPS } from '../../../data/wsData'

export function WsHandshakeDemo() {
  const isDark = useIsDark()
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [running, setRunning] = useState(false)

  const runHandshake = () => {
    setVisibleSteps(0)
    setRunning(true)
    let step = 0
    const interval = setInterval(() => {
      step++
      setVisibleSteps(step)
      if (step >= WS_HANDSHAKE_STEPS.length) {
        clearInterval(interval)
        setRunning(false)
      }
    }, 800)
  }

  const accentColor = ds('#2563eb', '#60a5fa', isDark)
  const successColor = ds('#16a34a', '#00e5a0', isDark)
  const headerNameColor = ds('#2563eb', '#5bc0eb', isDark)
  const headerValColor = ds('#16a34a', '#00e5a0', isDark)

  return (
    <div
      className="rounded-xl border p-5 my-6 relative overflow-hidden"
      style={{
        borderColor: tc(theme.borderDefault, isDark),
        backgroundColor: tc(theme.bgCard, isDark),
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${ds('#7c3aed', '#7b61ff', isDark)})` }}
      />
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <span
          className="text-[11px] font-mono tracking-wider uppercase"
          style={{ color: accentColor }}
        >
          Interactive — The Opening Handshake
        </span>
      </div>

      <button
        onClick={runHandshake}
        disabled={running}
        className="mb-4 px-4 py-2 rounded-md text-xs font-mono font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: accentColor,
          color: ds('#fff', '#0a0a0f', isDark),
        }}
      >
        {running ? 'Running...' : '\u25b6 Run Handshake'}
      </button>

      <div className="flex flex-col">
        {WS_HANDSHAKE_STEPS.map((step, i) => (
          <div
            key={step.step}
            className="grid gap-3 py-3 transition-opacity duration-500"
            style={{
              gridTemplateColumns: '90px 1fr',
              opacity: i < visibleSteps ? 1 : 0.25,
              borderBottom: i < WS_HANDSHAKE_STEPS.length - 1
                ? `1px solid ${tc(theme.borderDefault, isDark)}`
                : 'none',
            }}
          >
            <div
              className="text-[11px] font-mono uppercase tracking-wider pt-0.5"
              style={{ color: ds('#7c3aed', '#7b61ff', isDark) }}
            >
              {step.label}
            </div>
            <div className="font-mono text-xs leading-7" style={{ color: tc(theme.textSecondary, isDark) }}>
              {step.lines.map((line, j) => (
                <div key={j}>
                  {line.name ? (
                    <>
                      <span style={{ color: headerNameColor }}>{line.name}:</span>{' '}
                      <span style={{ color: step.isSuccess ? successColor : headerValColor }}>
                        {line.value}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: step.isSuccess ? successColor : tc(theme.textSecondary, isDark) }}>
                      {line.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
