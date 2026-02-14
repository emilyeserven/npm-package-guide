import { CICD_TIPS } from '../../../data/cicdData'
import { useAccordion } from '../../../hooks/useAccordion'

export function GotchaAccordion() {
  const { toggle, isExpanded } = useAccordion()

  return (
    <div className="grid gap-2 my-6">
      {CICD_TIPS.map((tip, i) => (
        <div
          key={tip.title}
          onClick={() => toggle(i)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-5 py-4 cursor-pointer transition-all duration-150"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
              {tip.title}
            </span>
            <span
              className="text-lg text-slate-400 dark:text-slate-500 transition-transform duration-200"
              style={{ transform: isExpanded(i) ? 'rotate(45deg)' : 'none' }}
            >
              +
            </span>
          </div>
          {isExpanded(i) && (
            <p className="mt-3 mb-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {tip.body}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
