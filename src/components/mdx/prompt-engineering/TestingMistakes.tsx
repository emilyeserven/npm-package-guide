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
          <h3 id="toc-e2e" className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3 mt-6 first:mt-0">
            {'\u{1F310}'} End-to-End (E2E) Testing
          </h3>
          <div className="flex flex-col gap-3 mb-6">
            {e2eItems.map((item, i) => (
              <div key={i}>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                  {item.mistake}
                </h4>
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-md">
                  {parseInlineCode(item.example)}
                </div>
                <div className="text-sm text-blue-600 dark:text-cyan-400 flex gap-1.5 items-start">
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
          <h3 id="toc-unit" className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3 mt-6">
            {'\u{1F9EA}'} Unit Testing
          </h3>
          <div className="flex flex-col gap-3">
            {unitItems.map((item, i) => (
              <div key={i}>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                  {item.mistake}
                </h4>
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-md">
                  {parseInlineCode(item.example)}
                </div>
                <div className="text-sm text-blue-600 dark:text-cyan-400 flex gap-1.5 items-start">
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
