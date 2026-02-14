import { TESTING_MISTAKES } from '../../../data/promptData'
import { parseInlineCode } from '../../../helpers/inlineCode'

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
          <h2 id="toc-e2e" className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2 first:mt-0">
            {'\u{1F310}'} End-to-End (E2E) Testing
          </h2>
          <div className="flex flex-col gap-3 mb-6">
            {e2eItems.map((item, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {item.mistake}
                </h3>
                <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">
                  {parseInlineCode(item.example)}
                </div>
                <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed flex gap-1.5 items-start">
                  <span className="shrink-0">{'\u{1F4A1}'}</span>
                  <span>{item.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {unitItems.length > 0 && (
        <>
          <h2 id="toc-unit" className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2">
            {'\u{1F9EA}'} Unit Testing
          </h2>
          <div className="flex flex-col gap-3">
            {unitItems.map((item, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {item.mistake}
                </h3>
                <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">
                  {parseInlineCode(item.example)}
                </div>
                <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed flex gap-1.5 items-start">
                  <span className="shrink-0">{'\u{1F4A1}'}</span>
                  <span>{item.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
