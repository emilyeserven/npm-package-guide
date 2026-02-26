import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { VP_FFPROBE_SECTIONS } from '../../../data/videoPipelineData'

export function FfprobeViewer() {
  const isDark = useIsDark()
  const [expanded, setExpanded] = useState<string>('video')

  return (
    <div
      className="rounded-xl border overflow-hidden my-6"
      style={{
        background: ds('#f8fafc', '#0f172a', isDark),
        borderColor: tc(theme.borderDefault, isDark),
      }}
    >
      {VP_FFPROBE_SECTIONS.map((section) => (
        <div
          key={section.id}
          className="border-b last:border-b-0"
          style={{ borderColor: tc(theme.borderDefault, isDark) }}
        >
          {/* Header */}
          <button
            onClick={() => setExpanded(expanded === section.id ? '' : section.id)}
            className="flex items-center justify-between w-full px-5 py-3 cursor-pointer transition-colors"
            style={{
              background: ds('#fff', '#1e293b', isDark),
            }}
          >
            <span
              className="text-sm font-mono"
              style={{ color: tc(theme.textPrimary, isDark) }}
            >
              {section.label}
            </span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full border"
              style={{
                background: ds('#ecfdf5', 'rgba(45, 212, 191, 0.08)', isDark),
                color: ds('#059669', '#2dd4bf', isDark),
                borderColor: ds('#a7f3d0', '#115e59', isDark),
              }}
            >
              {section.badge}
            </span>
          </button>

          {/* Body */}
          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: expanded === section.id ? `${section.fields.length * 40 + 16}px` : '0',
            }}
          >
            {section.fields.map((field, fi) => (
              <div
                key={fi}
                className="flex justify-between items-center px-5 py-1.5 text-sm font-mono border-t"
                style={{
                  borderColor: ds('rgba(226, 232, 240, 0.5)', 'rgba(51, 65, 85, 0.5)', isDark),
                }}
              >
                <span style={{ color: ds('#94a3b8', '#64748b', isDark) }}>
                  {field.key}
                </span>
                <span style={{ color: tc(theme.textPrimary, isDark) }}>
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
