import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'

interface ShellQuizProps {
  question: string
  options: string[]
  correctIndex: number
  correctFeedback: string
  incorrectFeedback: string
}

export function ShellQuiz({ question, options, correctIndex, correctFeedback, incorrectFeedback }: ShellQuizProps) {
  const isDark = useIsDark()
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const isCorrect = selected === correctIndex

  const handleSelect = (i: number) => {
    if (answered) return
    setSelected(i)
  }

  return (
    <div
      className="my-6 rounded-xl border p-5"
      style={{
        borderColor: isDark ? '#334155' : '#e2e8f0',
        background: isDark ? '#1e293b' : '#f8fafc',
      }}
    >
      <div
        className="mb-4 text-[15px] font-medium"
        style={{ color: isDark ? '#e2e8f0' : '#0f172a' }}
      >
        {question}
      </div>

      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isThis = selected === i
          const correct = i === correctIndex
          let borderColor = isDark ? '#334155' : '#e2e8f0'
          let bg = isDark ? '#0f172a' : '#ffffff'
          if (answered && isThis && isCorrect) {
            borderColor = '#34d399'
            bg = isDark ? 'rgba(52,211,153,0.13)' : 'rgba(52,211,153,0.1)'
          } else if (answered && isThis && !isCorrect) {
            borderColor = '#f87171'
            bg = isDark ? 'rgba(248,113,113,0.13)' : 'rgba(248,113,113,0.1)'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className="flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all"
              style={{
                borderColor,
                background: bg,
                opacity: answered && !isThis && !correct ? 0.5 : 1,
                cursor: answered ? 'default' : 'pointer',
                color: isDark ? '#c8cdd5' : '#334155',
              }}
            >
              <span
                className="h-[18px] w-[18px] shrink-0 rounded-full border-2"
                style={{
                  borderColor: answered && isThis
                    ? (isCorrect ? '#34d399' : '#f87171')
                    : (isDark ? '#475569' : '#cbd5e1'),
                  background: answered && isThis
                    ? (isCorrect ? '#34d399' : '#f87171')
                    : 'transparent',
                }}
              />
              {opt}
            </button>
          )
        })}
      </div>

      {answered && (
        <div
          className="mt-3 rounded-md p-3 text-[13px]"
          style={{
            background: isCorrect
              ? (isDark ? 'rgba(52,211,153,0.1)' : 'rgba(52,211,153,0.1)')
              : (isDark ? 'rgba(248,113,113,0.1)' : 'rgba(248,113,113,0.1)'),
            color: isCorrect
              ? (isDark ? '#34d399' : '#059669')
              : (isDark ? '#f87171' : '#dc2626'),
          }}
        >
          {isCorrect ? correctFeedback : incorrectFeedback}
        </div>
      )}
    </div>
  )
}
