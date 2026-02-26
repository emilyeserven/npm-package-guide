import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { VP_MASTER_PLAYLIST, VP_MEDIA_PLAYLIST } from '../../../data/videoPipelineData'
import type { ManifestLine } from '../../../data/videoPipelineData'

function ManifestCard({ title, lines }: { title: string; lines: ManifestLine[] }) {
  const isDark = useIsDark()
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const lineColor = (type: ManifestLine['type']) => {
    switch (type) {
      case 'tag': return ds('#be185d', '#f472b6', isDark)
      case 'url': return ds('#1d4ed8', '#60a5fa', isDark)
      case 'attr': return ds('#b45309', '#fbbf24', isDark)
    }
  }

  return (
    <div
      className="rounded-xl border p-5"
      style={{
        background: tc(theme.bgCard, isDark),
        borderColor: tc(theme.borderDefault, isDark),
      }}
    >
      <h4
        className="text-xs font-mono uppercase tracking-wider mb-4"
        style={{ color: ds('#059669', '#2dd4bf', isDark) }}
      >
        {title}
      </h4>
      <div className="space-y-0">
        {lines.map((line, i) => {
          const hasAnno = !!line.annotation
          const isExpanded = expandedIdx === i
          return (
            <div
              key={i}
              className={`font-mono text-sm py-1 pl-3 border-l-2 transition-all duration-200 ${hasAnno ? 'cursor-pointer' : ''}`}
              style={{
                borderLeftColor: isExpanded
                  ? ds('#059669', '#2dd4bf', isDark)
                  : 'transparent',
                background: isExpanded
                  ? ds('#ecfdf5', 'rgba(45, 212, 191, 0.05)', isDark)
                  : 'transparent',
                color: lineColor(line.type),
              }}
              onClick={() => {
                if (hasAnno) setExpandedIdx(isExpanded ? null : i)
              }}
            >
              <div className="leading-relaxed break-all">{line.text}</div>
              {isExpanded && line.annotation && (
                <div
                  className="text-sm mt-1 leading-relaxed font-sans"
                  style={{ color: tc(theme.textSecondary, isDark) }}
                >
                  {line.annotation}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function HlsManifestViewer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <ManifestCard title="Master Playlist (index.m3u8)" lines={VP_MASTER_PLAYLIST} />
      <ManifestCard title="Media Playlist (720p/playlist.m3u8)" lines={VP_MEDIA_PLAYLIST} />
    </div>
  )
}
