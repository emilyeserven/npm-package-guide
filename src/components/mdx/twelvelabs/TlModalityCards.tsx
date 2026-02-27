import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { TL_MODALITIES } from '../../../data/twelvelabsData'

export function TlModalityCards() {
  const isDark = useIsDark()

  return (
    <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
      {TL_MODALITIES.map(m => (
        <div
          key={m.name}
          className="rounded-lg p-4 text-center"
          style={{ background: tc(theme.bgCard, isDark) }}
        >
          <div className="text-2xl mb-2">{m.icon}</div>
          <code
            className="text-sm"
            style={{ color: ds('#6366f1', '#818cf8', isDark) }}
          >
            {m.name}
          </code>
          <p
            className="text-xs leading-snug mt-2 mb-0"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            {m.description}
          </p>
        </div>
      ))}
    </div>
  )
}
