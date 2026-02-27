import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { TL_MODELS } from '../../../data/twelvelabsData'

export function TlModelCards() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-wrap gap-5 mb-6">
      {TL_MODELS.map(model => {
        const accent = ds(model.color, model.darkColor, isDark)
        return (
          <div
            key={model.name}
            className="rounded-xl border p-6 flex-1 min-w-[280px]"
            style={{
              background: tc(theme.bgCard, isDark),
              borderColor: accent + '33',
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: accent }}
              />
              <span
                className="font-bold text-base"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {model.name}
              </span>
            </div>
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-3"
              style={{ background: accent + '18', color: accent }}
            >
              {model.type}
            </span>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: tc(theme.textMuted, isDark) }}
            >
              {model.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {model.capabilities.map(c => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-md text-[11px]"
                  style={{
                    background: ds('#f1f5f9', '#1e293b', isDark),
                    color: tc(theme.textMuted, isDark),
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
