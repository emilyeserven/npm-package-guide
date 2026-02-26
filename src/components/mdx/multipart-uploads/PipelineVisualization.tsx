import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { PIPELINE_STEPS } from '../../../data/multipartData'
import type { PipelineStep } from '../../../data/multipartData'

export function PipelineVisualization() {
  const isDark = useIsDark()
  const [activeStep, setActiveStep] = useState<string | null>(null)

  const stepColor = (step: PipelineStep) => ds(step.color, step.darkColor, isDark)

  return (
    <div className="my-6">
      <div className="flex gap-1 items-center overflow-x-auto pb-5 pt-2">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center shrink-0">
            <button
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              className="flex flex-col items-center gap-1.5 rounded-lg border px-3.5 py-3 transition-all min-w-[90px]"
              style={{
                borderColor: activeStep === step.id ? stepColor(step) : tc(theme.borderDefault, isDark),
                background: activeStep === step.id
                  ? stepColor(step) + '15'
                  : ds('#f8fafc', '#1e293b', isDark),
              }}
            >
              <span className="text-xl">{step.icon}</span>
              <span
                className="text-[10px] font-mono font-semibold tracking-wide text-center uppercase"
                style={{
                  color: activeStep === step.id
                    ? stepColor(step)
                    : tc(theme.textMuted, isDark),
                }}
              >
                {step.label}
              </span>
            </button>
            {i < PIPELINE_STEPS.length - 1 && (
              <span
                className="text-sm mx-0.5 font-mono"
                style={{ color: tc(theme.textMuted, isDark) }}
              >
                {'\u2192'}
              </span>
            )}
          </div>
        ))}
      </div>

      {activeStep && (() => {
        const step = PIPELINE_STEPS.find(s => s.id === activeStep)
        if (!step) return null
        const c = stepColor(step)
        return (
          <div
            className="rounded-lg p-4 mt-1"
            style={{
              background: c + '08',
              border: `1px solid ${c}33`,
            }}
          >
            <p
              className="text-sm mb-2 leading-relaxed"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {step.description}
            </p>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: tc(theme.textMuted, isDark) }}
            >
              {step.detail}
            </p>
          </div>
        )
      })()}

      {!activeStep && (
        <p
          className="text-[13px] italic text-center mt-1"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          Click any step to see what happens at that stage.
        </p>
      )}
    </div>
  )
}
