import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { TL_EMBED_USE_CASES } from '../../../data/twelvelabsData'

export function TlEmbedUseCases() {
  const isDark = useIsDark()

  return (
    <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
      {TL_EMBED_USE_CASES.map(uc => (
        <div
          key={uc.title}
          className="rounded-lg p-4"
          style={{ background: tc(theme.bgCard, isDark) }}
        >
          <div
            className="text-sm font-semibold mb-1.5"
            style={{ color: ds('#ea580c', '#fb923c', isDark) }}
          >
            {uc.title}
          </div>
          <div
            className="text-xs leading-snug"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            {uc.description}
          </div>
        </div>
      ))}
    </div>
  )
}
