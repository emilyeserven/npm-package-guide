import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { TL_API_CARDS } from '../../../data/twelvelabsData'

export function TlApiCards() {
  const isDark = useIsDark()

  return (
    <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
      {TL_API_CARDS.map(card => (
        <div
          key={card.api}
          className="rounded-xl p-5"
          style={{
            background: tc(theme.bgCard, isDark),
            borderTop: `3px solid ${ds(card.color, card.darkColor, isDark)}`,
          }}
        >
          <h4
            className="font-semibold text-sm mb-2 mt-0"
            style={{ color: ds(card.color, card.darkColor, isDark) }}
          >
            {card.api}
          </h4>
          <p
            className="text-xs leading-relaxed m-0"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            {card.description}
          </p>
        </div>
      ))}
    </div>
  )
}
