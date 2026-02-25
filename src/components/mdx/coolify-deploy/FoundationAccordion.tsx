import { FOUNDATION_TOPICS } from '../../../data/coolifyData'
import { AccordionList } from '../AccordionList'

export function FoundationAccordion() {
  return (
    <AccordionList
      items={FOUNDATION_TOPICS}
      className="my-6"
      renderHeader={(topic) => (
        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
          {topic.icon} {topic.title}
        </span>
      )}
      renderBody={(topic, _, isDark) => (
        <div className="mt-3 space-y-3">
          {topic.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-0"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
          {topic.bullets && (
            <ul className="list-disc ml-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
              {topic.bullets.map((b, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
              ))}
            </ul>
          )}
          {topic.tip && (
            <div
              className={`rounded-lg border-l-3 p-3 text-sm ${
                topic.tip.type === 'tip'
                  ? 'bg-green-50 dark:bg-green-500/10 border-green-400'
                  : topic.tip.type === 'info'
                    ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-400'
                    : 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-400'
              }`}
              style={{ borderLeftWidth: 3 }}
            >
              <div className={`font-semibold text-xs uppercase tracking-wide mb-1 ${
                topic.tip.type === 'tip'
                  ? 'text-green-600 dark:text-green-400'
                  : topic.tip.type === 'info'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-yellow-600 dark:text-yellow-400'
              }`}>
                {topic.tip.title}
              </div>
              <p
                className={`mb-0 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                dangerouslySetInnerHTML={{ __html: topic.tip.body }}
              />
            </div>
          )}
        </div>
      )}
    />
  )
}
