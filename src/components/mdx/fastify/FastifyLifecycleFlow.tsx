import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { FASTIFY_LIFECYCLE_STEPS } from '../../../data/fastifyData'
import type { FastifyLifecycleStep } from '../../../data/fastifyData'

export function FastifyLifecycleFlow() {
  const isDark = useIsDark()
  const [activeId, setActiveId] = useState<string | null>(null)

  const active = FASTIFY_LIFECYCLE_STEPS.find(
    (s: FastifyLifecycleStep) => s.id === activeId,
  )

  return (
    <div className="mb-6">
      {/* Flow diagram */}
      <div
        className="rounded-xl border p-5 overflow-x-auto"
        style={{
          background: ds('#f8fafc', '#1e293b', isDark),
          borderColor: tc(theme.borderDefault, isDark),
        }}
      >
        <div className="flex items-center flex-wrap gap-2 justify-center min-w-0">
          {FASTIFY_LIFECYCLE_STEPS.map((step: FastifyLifecycleStep, i: number) => (
            <div key={step.id} className="flex items-center gap-2">
              <button
                onClick={() => setActiveId(activeId === step.id ? null : step.id)}
                className="font-mono text-xs px-3 py-2 rounded-md border transition-all cursor-pointer whitespace-nowrap"
                style={{
                  background:
                    activeId === step.id
                      ? ds(
                          step.isHook ? 'rgba(110,177,255,0.12)' : 'rgba(194,247,81,0.12)',
                          step.isHook ? 'rgba(110,177,255,0.15)' : 'rgba(194,247,81,0.15)',
                          isDark,
                        )
                      : ds('#ffffff', '#0f172a', isDark),
                  borderColor:
                    activeId === step.id
                      ? step.isHook
                        ? '#6eb1ff'
                        : '#84cc16'
                      : step.isHook
                        ? ds('rgba(110,177,255,0.3)', 'rgba(110,177,255,0.25)', isDark)
                        : tc(theme.borderDefault, isDark),
                  color: step.isHook
                    ? ds('#2563eb', '#6eb1ff', isDark)
                    : step.id === 'handler'
                      ? ds('#65a30d', '#84cc16', isDark)
                      : tc(theme.textSecondary, isDark),
                  fontWeight: step.id === 'handler' ? 600 : 400,
                }}
              >
                {step.label}
              </button>
              {i < FASTIFY_LIFECYCLE_STEPS.length - 1 && (
                <span
                  className="text-sm flex-shrink-0"
                  style={{ color: tc(theme.textMuted, isDark) }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {active && (
        <div
          className="mt-3 rounded-lg border px-4 py-3 text-sm"
          style={{
            background: ds(
              active.isHook ? 'rgba(110,177,255,0.06)' : 'rgba(194,247,81,0.06)',
              active.isHook ? 'rgba(110,177,255,0.08)' : 'rgba(194,247,81,0.08)',
              isDark,
            ),
            borderColor: ds(
              active.isHook ? 'rgba(110,177,255,0.2)' : 'rgba(194,247,81,0.2)',
              active.isHook ? 'rgba(110,177,255,0.15)' : 'rgba(194,247,81,0.15)',
              isDark,
            ),
            color: tc(theme.textSecondary, isDark),
          }}
        >
          <span
            className="font-mono font-semibold mr-2"
            style={{
              color: active.isHook
                ? ds('#2563eb', '#6eb1ff', isDark)
                : ds('#65a30d', '#84cc16', isDark),
            }}
          >
            {active.label}
          </span>
          {active.isHook && (
            <span
              className="text-xs font-mono mr-2 px-1.5 py-0.5 rounded"
              style={{
                background: ds('rgba(110,177,255,0.1)', 'rgba(110,177,255,0.12)', isDark),
                color: ds('#2563eb', '#93c5fd', isDark),
              }}
            >
              hook
            </span>
          )}
          {active.description}
        </div>
      )}

      <p
        className="mt-2 text-xs"
        style={{ color: tc(theme.textMuted, isDark) }}
      >
        Click any step to see its description.{' '}
        <span style={{ color: ds('#2563eb', '#6eb1ff', isDark) }}>Blue steps</span> are hooks
        you can register functions at.
      </p>
    </div>
  )
}
