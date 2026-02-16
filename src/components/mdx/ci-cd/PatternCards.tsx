import { CICD_PATTERNS, PATTERN_TAG_STYLES } from '../../../data/cicdData'
import { StatusBadge } from '../StatusBadge'

export function PatternCards() {
  return (
    <div className="grid gap-2.5 my-6">
      {CICD_PATTERNS.map((p) => {
        const tc = PATTERN_TAG_STYLES[p.tag] ?? PATTERN_TAG_STYLES.Essential
        return (
          <div
            key={p.name}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-5 py-4"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                {p.name}
              </span>
              <StatusBadge
                label={p.tag}
                colors={tc}
                uppercase={false}
                className="rounded px-2"
              />
            </div>
            <p className="m-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {p.desc}
            </p>
          </div>
        )
      })}
    </div>
  )
}
