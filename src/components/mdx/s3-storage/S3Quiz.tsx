import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { S3_QUIZ_QUESTIONS } from '../../../data/s3Data'

interface QuizState {
  current: number
  selected: number | null
  score: number
  done: boolean
}

const initialState: QuizState = { current: 0, selected: null, score: 0, done: false }

export function S3Quiz() {
  const isDark = useIsDark()
  const [state, setState] = useState<QuizState>(initialState)

  const handleAnswer = (idx: number) => {
    if (state.selected !== null) return
    const correct = idx === S3_QUIZ_QUESTIONS[state.current].answer
    setState(s => ({ ...s, selected: idx, score: s.score + (correct ? 1 : 0) }))
  }

  const next = () => {
    if (state.current + 1 >= S3_QUIZ_QUESTIONS.length) {
      setState(s => ({ ...s, done: true }))
    } else {
      setState(s => ({ ...s, current: s.current + 1, selected: null }))
    }
  }

  const reset = () => setState(initialState)

  const total = S3_QUIZ_QUESTIONS.length
  const accent = isDark ? '#f0a840' : '#d97706'

  if (state.done) {
    const solidThreshold = Math.ceil(total * 0.75)
    const emoji = state.score === total ? '\u{1F389}' : state.score >= solidThreshold ? '\u{1F4AA}' : '\u{1F4DA}'
    const message =
      state.score === total
        ? "Perfect! You know S3 better than most backend engineers."
        : state.score >= solidThreshold
        ? 'Solid understanding! Review the sections you missed.'
        : "Worth reviewing the guide again \u2014 you'll nail it next time!"

    return (
      <div
        className="rounded-xl border p-8 text-center mb-7"
        style={{
          background: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0',
        }}
      >
        <div className="text-5xl mb-3">{emoji}</div>
        <h3
          className="text-xl font-bold mb-2 mt-0"
          style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
        >
          {state.score}/{total} Correct
        </h3>
        <p
          className="text-sm mb-5 mt-0"
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
        >
          {message}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer border-none text-white"
          style={{ background: accent }}
        >
          Try Again
        </button>
      </div>
    )
  }

  const q = S3_QUIZ_QUESTIONS[state.current]

  return (
    <div
      className="rounded-xl border p-7 mb-7"
      style={{
        background: isDark ? '#1e293b' : '#ffffff',
        borderColor: isDark ? '#334155' : '#e2e8f0',
      }}
    >
      <div
        className="text-xs font-semibold mb-3"
        style={{ color: accent }}
      >
        QUESTION {state.current + 1} OF {total}
      </div>
      <h3
        className="text-base font-semibold leading-relaxed mb-5 mt-0"
        style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
      >
        {q.q}
      </h3>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          const isSelected = state.selected === i
          const isCorrect = i === q.answer
          const revealed = state.selected !== null

          let bg = isDark ? '#0f172a' : '#f8fafc'
          let border = isDark ? '#334155' : '#e2e8f0'

          if (revealed && isCorrect) {
            bg = isDark ? '#052e16' : '#f0fdf4'
            border = '#22c55e'
          } else if (revealed && isSelected && !isCorrect) {
            bg = isDark ? '#450a0a' : '#fef2f2'
            border = '#ef4444'
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="rounded-lg p-3 text-sm text-left border transition-all"
              style={{
                background: bg,
                borderColor: border,
                color: isDark ? '#e2e8f0' : '#334155',
                cursor: revealed ? 'default' : 'pointer',
                opacity: revealed && !isSelected && !isCorrect ? 0.5 : 1,
                fontFamily: 'inherit',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {state.selected !== null && (
        <div
          className="mt-4 p-3.5 rounded-lg border"
          style={{
            background: isDark ? '#0f172a' : '#f8fafc',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            {q.explanation}
          </p>
          <button
            onClick={next}
            className="mt-3 px-5 py-2 rounded-md text-sm font-semibold cursor-pointer border-none text-white"
            style={{ background: accent }}
          >
            {state.current + 1 >= total ? 'See Results' : 'Next \u2192'}
          </button>
        </div>
      )}
    </div>
  )
}
