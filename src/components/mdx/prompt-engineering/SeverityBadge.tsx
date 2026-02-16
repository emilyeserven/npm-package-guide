import { MISTAKE_CATEGORIES, SEVERITY_COLORS } from '../../../data/promptData'
import { StatusBadge } from '../StatusBadge'

export function SeverityBadge({ categoryId }: { categoryId: string }) {
  const category = MISTAKE_CATEGORIES.find(c => c.id === categoryId)
  if (!category) return null

  const colors = SEVERITY_COLORS[category.severity]

  return (
    <div className="-mt-3 mb-6 flex items-center gap-2">
      <StatusBadge
        label={`${category.severity} severity`}
        colors={{
          bg: `${colors.light.badge}33`,
          darkBg: `${colors.dark.badge}33`,
          text: colors.light.text,
          darkText: colors.dark.text,
        }}
      />
    </div>
  )
}
