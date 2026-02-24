import { COOLIFY_GOTCHAS } from '../../../data/coolifyData'
import { AccordionList } from '../AccordionList'

export function CoolifyGotchaAccordion() {
  return (
    <AccordionList
      items={COOLIFY_GOTCHAS}
      className="my-6"
      renderHeader={(gotcha) => (
        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
          {gotcha.severity === 'red' ? '\u{1F534}' : '\u{1F7E1}'} {gotcha.title}
        </span>
      )}
      renderBody={(gotcha) => (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-0">
            <strong className="text-slate-800 dark:text-slate-200">Cause:</strong> {gotcha.cause}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-0">
            <strong className="text-slate-800 dark:text-slate-200">Fix:</strong> {gotcha.fix}
          </p>
        </div>
      )}
      renderIndicator={(expanded) => (
        <span
          className="text-lg text-slate-400 dark:text-slate-500 transition-transform duration-200 shrink-0"
          style={{ transform: expanded ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      )}
    />
  )
}
