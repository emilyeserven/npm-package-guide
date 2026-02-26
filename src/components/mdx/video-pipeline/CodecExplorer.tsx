import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { VP_VIDEO_CODECS, VP_AUDIO_CODECS, VP_CONTAINERS } from '../../../data/videoPipelineData'
import type { CodecInfo, ContainerInfo } from '../../../data/videoPipelineData'

function TabGroup<T extends { id: string; name: string }>({
  tabs,
  activeId,
  onSelect,
  renderContent,
}: {
  tabs: T[]
  activeId: string
  onSelect: (id: string) => void
  renderContent: (item: T) => React.ReactNode
}) {
  const isDark = useIsDark()
  const active = tabs.find(t => t.id === activeId)

  return (
    <div>
      <div
        className="flex gap-0 border-b overflow-x-auto"
        style={{ borderColor: tc(theme.borderDefault, isDark) }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className="px-4 py-2.5 text-sm font-mono whitespace-nowrap cursor-pointer border-b-2 transition-colors"
            style={{
              color: activeId === tab.id
                ? ds('#059669', '#2dd4bf', isDark)
                : ds('#94a3b8', '#64748b', isDark),
              borderBottomColor: activeId === tab.id
                ? ds('#059669', '#2dd4bf', isDark)
                : 'transparent',
              background: 'transparent',
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {active && (
        <div className="py-4">
          {renderContent(active)}
        </div>
      )}
    </div>
  )
}

export function VideoCodecTabs() {
  const isDark = useIsDark()
  const [activeTab, setActiveTab] = useState('video')
  const [activeCodec, setActiveCodec] = useState(VP_VIDEO_CODECS[0].id)
  const [activeAudioCodec, setActiveAudioCodec] = useState(VP_AUDIO_CODECS[0].id)

  const topTabs = [
    { id: 'video', name: 'Video Codecs' },
    { id: 'audio', name: 'Audio Codecs' },
  ]

  const codecs = activeTab === 'video' ? VP_VIDEO_CODECS : VP_AUDIO_CODECS
  const currentId = activeTab === 'video' ? activeCodec : activeAudioCodec
  const setCurrentId = activeTab === 'video' ? setActiveCodec : setActiveAudioCodec

  return (
    <div className="my-6">
      <div
        className="flex gap-0 border-b overflow-x-auto"
        style={{ borderColor: tc(theme.borderDefault, isDark) }}
      >
        {topTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2.5 text-sm font-mono whitespace-nowrap cursor-pointer border-b-2 transition-colors"
            style={{
              color: activeTab === tab.id
                ? ds('#059669', '#2dd4bf', isDark)
                : ds('#94a3b8', '#64748b', isDark),
              borderBottomColor: activeTab === tab.id
                ? ds('#059669', '#2dd4bf', isDark)
                : 'transparent',
              background: 'transparent',
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <TabGroup<CodecInfo>
        tabs={codecs}
        activeId={currentId}
        onSelect={setCurrentId}
        renderContent={(codec) => (
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            <strong style={{ color: tc(theme.textPrimary, isDark) }}>{codec.name}</strong>
            {' \u2014 '}
            {codec.detail}
          </p>
        )}
      />
    </div>
  )
}

export function ContainerTabs() {
  const isDark = useIsDark()
  const [activeId, setActiveId] = useState(VP_CONTAINERS[0].id)

  return (
    <div className="my-6">
      <TabGroup<ContainerInfo>
        tabs={VP_CONTAINERS.map(c => ({ ...c, name: c.ext }))}
        activeId={activeId}
        onSelect={setActiveId}
        renderContent={(container) => {
          const full = VP_CONTAINERS.find(c => c.id === container.id)!
          return (
            <p
              className="text-sm leading-relaxed m-0"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              <strong style={{ color: tc(theme.textPrimary, isDark) }}>{full.name}</strong>
              {' \u2014 '}
              {full.detail}
            </p>
          )
        }}
      />
    </div>
  )
}
