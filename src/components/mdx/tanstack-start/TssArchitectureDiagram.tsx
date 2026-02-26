import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSS_ARCH_LAYERS } from '../../../data/tanstackStartData'
import type { TssArchLayer } from '../../../data/tanstackStartData'

export function TssArchitectureDiagram() {
  const isDark = useIsDark()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="mb-6">
      {TSS_ARCH_LAYERS.map((layer: TssArchLayer, i: number) => {
        const isExpanded = expandedId === layer.id
        const accent = ds(layer.accent, layer.darkAccent, isDark)

        return (
          <button
            key={layer.id}
            type="button"
            onClick={() => setExpandedId(isExpanded ? null : layer.id)}
            className="w-full text-left rounded-xl p-3.5 transition-all cursor-pointer"
            style={{
              background: isExpanded
                ? ds(`${layer.accent}10`, `${layer.darkAccent}12`, isDark)
                : tc(theme.bgCard, isDark),
              border: `1px solid ${isExpanded ? `${accent}40` : tc(theme.borderDefault, isDark)}`,
              marginBottom: i < TSS_ARCH_LAYERS.length - 1 ? 4 : 0,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span className="text-lg w-7 text-center shrink-0">{layer.icon}</span>
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold text-sm transition-colors"
                style={{ color: isExpanded ? accent : tc(theme.textPrimary, isDark) }}
              >
                {layer.label}
              </div>
              <div
                className="text-xs leading-relaxed overflow-hidden transition-all"
                style={{
                  color: tc(theme.textMuted, isDark),
                  marginTop: isExpanded ? 4 : 0,
                  maxHeight: isExpanded ? 60 : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                {layer.description}
              </div>
            </div>
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0 transition-all"
              style={{
                background: isExpanded ? accent : tc(theme.textMuted, isDark),
                boxShadow: isExpanded ? `0 0 8px ${accent}60` : 'none',
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
