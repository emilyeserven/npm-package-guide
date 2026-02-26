import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { DECISION_QUESTIONS } from '../../../data/multipartData'
import type { DecisionQuestion } from '../../../data/multipartData'

export function WhenMultipart() {
  const isDark = useIsDark()
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const reset = () => setAnswers({})

  const getActiveQuestion = () => {
    let current: DecisionQuestion | undefined = DECISION_QUESTIONS[0]
    const path: DecisionQuestion[] = []

    while (current) {
      path.push(current)
      const answer: boolean | undefined = answers[current.id]
      if (answer === undefined) return { path, result: null as string | null }

      const next: string = answer ? current.yes : current.no
      if (next === 'multipart' || next === 'json') return { path, result: next as string | null }
      current = DECISION_QUESTIONS.find(q => q.id === next)
    }

    return { path, result: null as string | null }
  }

  const { path, result } = getActiveQuestion()

  const accentColor = ds('#2563eb', '#3b82f6', isDark)
  const greenColor = ds('#059669', '#10b981', isDark)

  return (
    <div className="my-6">
      <p
        className="text-sm leading-relaxed mt-0 mb-4"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        Not sure if your endpoint needs multipart? Walk through these questions.
      </p>

      <div className="grid gap-3">
        {path.map(q => {
          const answered = answers[q.id] !== undefined

          return (
            <div
              key={q.id}
              className="rounded-lg p-4"
              style={{
                border: `1px solid ${!answered ? accentColor + '55' : tc(theme.borderDefault, isDark)}`,
                background: !answered
                  ? accentColor + '08'
                  : ds('#fff', '#1e293b', isDark),
              }}
            >
              <p
                className="text-sm font-medium mb-3 mt-0"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {q.question}
              </p>
              <div className="flex gap-2">
                {(['Yes', 'No'] as const).map(label => {
                  const isYes = label === 'Yes'
                  const isSelected = answers[q.id] === isYes

                  return (
                    <button
                      key={label}
                      onClick={() => {
                        const next = { ...answers }
                        const idx = DECISION_QUESTIONS.findIndex(qq => qq.id === q.id)
                        DECISION_QUESTIONS.slice(idx + 1).forEach(qq => delete next[qq.id])
                        next[q.id] = isYes
                        setAnswers(next)
                      }}
                      className="px-5 py-1.5 rounded-md font-mono text-[13px] font-semibold transition-all"
                      style={{
                        border: `1px solid ${isSelected ? accentColor : tc(theme.borderDefault, isDark)}`,
                        background: isSelected ? accentColor + '22' : 'transparent',
                        color: isSelected ? accentColor : tc(theme.textSecondary, isDark),
                        cursor: 'pointer',
                      }}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        {result && (
          <div
            className="rounded-lg p-4"
            style={{
              border: `1px solid ${(result === 'multipart' ? accentColor : greenColor) + '55'}`,
              background: (result === 'multipart' ? accentColor : greenColor) + '08',
            }}
          >
            {result === 'multipart' ? (
              <>
                <p
                  className="text-[15px] font-semibold font-mono mb-1.5 mt-0"
                  style={{ color: accentColor }}
                >
                  {'\u2192'} Use multipart/form-data
                </p>
                <p
                  className="text-[13px] leading-relaxed m-0"
                  style={{ color: tc(theme.textSecondary, isDark) }}
                >
                  Your request includes binary data that should be sent as-is (not base64-encoded).
                  Use FormData to let the browser handle encoding and boundary generation.
                </p>
              </>
            ) : (
              <>
                <p
                  className="text-[15px] font-semibold font-mono mb-1.5 mt-0"
                  style={{ color: greenColor }}
                >
                  {'\u2192'} Use application/json
                </p>
                <p
                  className="text-[13px] leading-relaxed m-0"
                  style={{ color: tc(theme.textSecondary, isDark) }}
                >
                  Plain JSON is simpler and more widely supported. No need for multipart if
                  you're only sending text and structured data.
                </p>
              </>
            )}
            <button
              onClick={reset}
              className="mt-3 px-4 py-1.5 rounded-md font-mono text-xs transition-colors hover:opacity-80"
              style={{
                border: `1px solid ${tc(theme.borderDefault, isDark)}`,
                background: ds('#f8fafc', '#1e293b', isDark),
                color: tc(theme.textSecondary, isDark),
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
