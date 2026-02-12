import { MISTAKE_CATEGORIES, SEVERITY_COLORS } from '../../data/promptData'
import { useTheme } from '../../hooks/useTheme'

export function MistakeList({ categoryId }: { categoryId: string }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const category = MISTAKE_CATEGORIES.find(c => c.id === categoryId)
  if (!category) return null

  const colors = SEVERITY_COLORS[category.severity]
  const t = isDark ? colors.dark : colors.light

  return (
    <div>
      {/* Severity badge — directly under header */}
      <div className="-mt-3 mb-6 flex items-center gap-2">
        <span
          className="text-xs font-semibold uppercase tracking-wide rounded-full px-2.5 py-0.5"
          style={{
            background: `${t.badge}33`,
            color: t.text,
          }}
        >
          {category.severity} severity
        </span>
      </div>

      {/* Mistake items — no boxes, proper headings */}
      <div className="flex flex-col gap-5">
        {category.items.map((item, i) => (
          <div key={i}>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2 mt-0">
              {item.mistake}
            </h3>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-md overflow-x-auto">
              {item.example}
            </div>
            <div className="text-sm text-blue-600 dark:text-cyan-400 flex gap-1.5 items-start">
              <span className="shrink-0">{'\u{1F4A1}'}</span>
              <span>{item.fix}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
