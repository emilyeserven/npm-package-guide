import { MISTAKE_CATEGORIES, SEVERITY_COLORS } from '../../../data/promptData'
import { useIsDark } from '../../../hooks/useTheme'

export function SeverityBadge({ categoryId }: { categoryId: string }) {
  const isDark = useIsDark()

  const category = MISTAKE_CATEGORIES.find(c => c.id === categoryId)
  if (!category) return null

  const colors = SEVERITY_COLORS[category.severity]
  const t = isDark ? colors.dark : colors.light

  return (
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
  )
}
