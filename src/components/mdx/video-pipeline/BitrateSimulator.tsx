import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { VP_QUALITY_LEVELS } from '../../../data/videoPipelineData'

export function BitrateSimulator() {
  const isDark = useIsDark()
  const [bandwidth, setBandwidth] = useState(3.5)

  // Find the highest quality level the bandwidth can sustain (with ~15% headroom)
  let selectedIdx = -1
  VP_QUALITY_LEVELS.forEach((level, i) => {
    if (bandwidth >= level.bitrate * 1.15) {
      selectedIdx = i
    }
  })

  return (
    <div
      className="rounded-xl border p-6 my-6"
      style={{
        background: tc(theme.bgCard, isDark),
        borderColor: tc(theme.borderDefault, isDark),
      }}
    >
      {/* Slider controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label
          className="text-xs font-mono uppercase tracking-wider"
          style={{ color: ds('#64748b', '#94a3b8', isDark) }}
        >
          Network Speed
        </label>
        <input
          type="range"
          min="0.3"
          max="10"
          step="0.1"
          value={bandwidth}
          onChange={(e) => setBandwidth(parseFloat(e.target.value))}
          className="w-48 h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: tc(theme.borderDefault, isDark),
            accentColor: ds('#059669', '#2dd4bf', isDark),
          }}
        />
        <span
          className="text-sm font-mono min-w-[80px]"
          style={{ color: ds('#059669', '#2dd4bf', isDark) }}
        >
          {bandwidth.toFixed(1)} Mbps
        </span>
      </div>

      {/* Quality cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {VP_QUALITY_LEVELS.map((level, i) => {
          const isSelected = i === selectedIdx
          const ratio = Math.min(bandwidth / level.bitrate, 1)
          return (
            <div
              key={level.id}
              className="p-3 rounded-lg border text-center transition-all duration-300"
              style={{
                borderColor: isSelected
                  ? ds('#059669', '#2dd4bf', isDark)
                  : tc(theme.borderDefault, isDark),
                background: isSelected
                  ? ds('#ecfdf5', 'rgba(45, 212, 191, 0.08)', isDark)
                  : ds('#f8fafc', '#0f172a', isDark),
              }}
            >
              <div
                className="text-xs font-mono uppercase tracking-wider mb-1"
                style={{ color: ds('#64748b', '#94a3b8', isDark) }}
              >
                {level.label}
              </div>
              <div
                className="text-lg font-serif"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {level.resolution}
              </div>
              <div
                className="text-xs font-mono mt-1"
                style={{ color: ds('#94a3b8', '#64748b', isDark) }}
              >
                {level.bitrateLabel}
              </div>
              {/* Progress bar */}
              <div
                className="h-0.5 rounded-full mt-2 overflow-hidden"
                style={{ background: tc(theme.borderDefault, isDark) }}
              >
                <div
                  className="h-full rounded-full transition-all duration-400"
                  style={{
                    width: `${ratio * 100}%`,
                    background: ds('#059669', '#2dd4bf', isDark),
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
