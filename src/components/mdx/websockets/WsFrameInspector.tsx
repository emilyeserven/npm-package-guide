import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { WS_FRAME_BYTES, WS_FRAME_LEGEND } from '../../../data/wsData'
import type { WsFrameByte } from '../../../data/wsData'

const TYPE_COLORS: Record<WsFrameByte['type'], { light: string; dark: string }> = {
  opcode:  { light: '#7c3aed', dark: '#7b61ff' },
  mask:    { light: '#d97706', dark: '#f0a060' },
  length:  { light: '#2563eb', dark: '#5bc0eb' },
  payload: { light: '#16a34a', dark: '#00e5a0' },
}

export function WsFrameInspector() {
  const isDark = useIsDark()
  const [tooltip, setTooltip] = useState<{ desc: string; color: string } | null>(null)
  const accentColor = ds('#2563eb', '#60a5fa', isDark)

  return (
    <div
      className="rounded-xl border p-5 my-6 relative overflow-hidden"
      style={{
        borderColor: tc(theme.borderDefault, isDark),
        backgroundColor: tc(theme.bgCard, isDark),
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${ds('#7c3aed', '#7b61ff', isDark)})` }}
      />
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
        <span className="text-[11px] font-mono tracking-wider uppercase" style={{ color: accentColor }}>
          Interactive — WebSocket Frame Anatomy
        </span>
      </div>

      {/* Frame bytes */}
      <div className="flex gap-0.5 flex-wrap mb-3">
        {WS_FRAME_BYTES.map((byte, i) => {
          const colors = TYPE_COLORS[byte.type]
          const color = ds(colors.light, colors.dark, isDark)
          return (
            <div
              key={i}
              className="font-mono text-[11px] px-2 py-1.5 rounded border cursor-pointer transition-all"
              style={{
                borderColor: color + '60',
                color: color,
                backgroundColor: ds('#f8fafc', '#0f172a', isDark),
              }}
              onMouseEnter={() => setTooltip({ desc: byte.desc, color })}
              onMouseLeave={() => setTooltip(null)}
            >
              {byte.hex}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-3">
        {WS_FRAME_LEGEND.map((item) => {
          const colors = TYPE_COLORS[item.type]
          const color = ds(colors.light, colors.dark, isDark)
          return (
            <span key={item.type} className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: tc(theme.textMuted, isDark) }}>
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
              {item.label}
            </span>
          )
        })}
      </div>

      {/* Tooltip area */}
      <div
        className="font-mono text-xs leading-relaxed min-h-[2rem]"
        style={{ color: tooltip ? tooltip.color : tc(theme.textMuted, isDark) }}
      >
        {tooltip ? tooltip.desc : 'Hover over a byte to inspect it \u2014 this encodes "Hello"'}
      </div>
    </div>
  )
}
