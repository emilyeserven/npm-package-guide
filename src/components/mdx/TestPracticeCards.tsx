import { PRACTICE_CARDS } from '../../data/testingData'

export function TestPracticeCards({ type }: { type: 'do' | 'dont' }) {
  const cards = PRACTICE_CARDS.filter((c) => c.type === type)
  const isDo = type === 'do'

  return (
    <div className="grid gap-3 mt-2 mb-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`rounded-xl border border-slate-200 dark:border-slate-700 p-4 ${
            isDo
              ? 'border-l-[3px] border-l-green-400 dark:border-l-green-400'
              : 'border-l-[3px] border-l-red-400 dark:border-l-red-400'
          }`}
        >
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
            <span className={isDo ? 'text-green-500' : 'text-red-500'}>
              {isDo ? '\u2713 ' : '\u2717 '}
            </span>
            {card.title}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  )
}
