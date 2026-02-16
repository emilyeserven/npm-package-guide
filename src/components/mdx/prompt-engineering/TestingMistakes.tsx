import { TESTING_MISTAKES } from '../../../data/promptData'
import { MistakeItemCard } from '../MistakeItem'

export function TestingMistakes({ context }: { context?: 'e2e' | 'unit' }) {
  const items = context
    ? TESTING_MISTAKES.filter(m => m.context === context)
    : TESTING_MISTAKES

  const e2eItems = items.filter(m => m.context === 'e2e')
  const unitItems = items.filter(m => m.context === 'unit')

  return (
    <div>
      {e2eItems.length > 0 && (
        <>
          <h2 id="toc-e2e" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2 first:mt-0">
            {'\u{1F310}'} End-to-End (E2E) Testing
          </h2>
          <div className="flex flex-col gap-3 mb-6">
            {e2eItems.map((item, i) => (
              <MistakeItemCard key={i} item={item} headingLevel="h3" />
            ))}
          </div>
        </>
      )}

      {unitItems.length > 0 && (
        <>
          <h2 id="toc-unit" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2">
            {'\u{1F9EA}'} Unit Testing
          </h2>
          <div className="flex flex-col gap-3">
            {unitItems.map((item, i) => (
              <MistakeItemCard key={i} item={item} headingLevel="h3" />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
