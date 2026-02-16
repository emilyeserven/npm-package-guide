import { CICD_TIPS } from '../../../data/cicdData'
import { AccordionList } from '../AccordionList'

export function GotchaAccordion() {
  return (
    <AccordionList
      items={CICD_TIPS}
      className="my-6"
      renderHeader={(tip) => (
        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
          {tip.title}
        </span>
      )}
      renderBody={(tip) => (
        <p className="mt-3 mb-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {tip.body}
        </p>
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
