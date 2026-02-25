import { PI_GOTCHAS } from '../../../data/coolifyData'
import { AccordionList } from '../AccordionList'

export function PiGotchaAccordion() {
  return (
    <AccordionList
      items={PI_GOTCHAS}
      className="my-6"
      renderHeader={(gotcha) => (
        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
          {gotcha.severity === 'red' ? '\u{1F534}' : '\u{1F7E1}'} {gotcha.title}
        </span>
      )}
      renderBody={(gotcha) => (
        <div className="mt-3 space-y-2">
          <p
            className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-0"
            dangerouslySetInnerHTML={{ __html: gotcha.body }}
          />
          {gotcha.bullets && (
            <ul className="list-disc ml-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
              {gotcha.bullets.map((b, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
              ))}
            </ul>
          )}
        </div>
      )}
    />
  )
}
