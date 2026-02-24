import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { OVERVIEW_CARDS } from '../../../data/coworkData'

export function CoworkOverviewCards() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {OVERVIEW_CARDS.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border p-5"
          style={{
            background: ds('#f8fafc', '#1e293b', isDark),
            borderColor: ds('#e2e8f0', '#334155', isDark),
          }}
        >
          <div
            className="text-xl mb-2.5"
            style={{ color: ds('#ea580c', '#E8572A', isDark) }}
          >
            {card.icon}
          </div>
          <div
            className="font-semibold text-sm mb-1.5"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {card.title}
          </div>
          <div
            className="text-xs leading-relaxed"
            style={{ color: ds('#64748b', '#94a3b8', isDark) }}
          >
            {card.description}
          </div>
        </div>
      ))}
    </div>
  )
}
