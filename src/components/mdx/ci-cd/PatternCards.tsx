import { CICD_PATTERNS, PATTERN_TAG_STYLES } from '../../../data/cicdData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function PatternCards() {
  const isDark = useIsDark()

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
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{
                  background: ds(tc.bg, tc.darkBg, isDark),
                  color: ds(tc.text, tc.darkText, isDark),
                  border: `1px solid ${ds(tc.border, tc.darkBorder, isDark)}`,
                }}
              >
                {p.tag}
              </span>
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
