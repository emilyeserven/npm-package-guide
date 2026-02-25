import { PI_PERFORMANCE_TIPS } from '../../../data/coolifyData'
import { AccordionList } from '../AccordionList'

export function PiPerformanceAccordion() {
  return (
    <AccordionList
      items={PI_PERFORMANCE_TIPS}
      className="my-6"
      renderHeader={(tip) => (
        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
          {tip.icon} {tip.title}
        </span>
      )}
      renderBody={(tip, _, isDark) => (
        <div className="mt-3 space-y-3">
          {tip.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-0"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
          {tip.code && (
            <pre className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/60 p-4 overflow-x-auto text-xs">
              <code className="font-mono text-slate-700 dark:text-slate-300">{tip.code}</code>
            </pre>
          )}
          {tip.tip && (
            <div
              className={`rounded-lg border-l-3 p-3 text-sm ${
                tip.tip.type === 'info'
                  ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-400'
                  : tip.tip.type === 'tip'
                    ? 'bg-green-50 dark:bg-green-500/10 border-green-400'
                    : 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-400'
              }`}
              style={{ borderLeftWidth: 3 }}
            >
              <div className={`font-semibold text-xs uppercase tracking-wide mb-1 ${
                tip.tip.type === 'info'
                  ? 'text-blue-600 dark:text-blue-400'
                  : tip.tip.type === 'tip'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-yellow-600 dark:text-yellow-400'
              }`}>
                {tip.tip.title}
              </div>
              <p
                className={`mb-0 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                dangerouslySetInnerHTML={{ __html: tip.tip.body }}
              />
            </div>
          )}
        </div>
      )}
    />
  )
}
