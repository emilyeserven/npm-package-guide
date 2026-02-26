import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'

const MAX_PODS = 12
const MAX_NODES = 5

function ScaleButton({ onClick, label, isDark }: { onClick: () => void; label: string; isDark: boolean }) {
  return (
    <button
      onClick={onClick}
      className="w-7 h-7 rounded-md flex items-center justify-center text-base font-mono cursor-pointer border transition-colors"
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : '#f8fafc',
        borderColor: tc(theme.borderDefault, isDark),
        color: tc(theme.textSecondary, isDark),
      }}
    >
      {label}
    </button>
  )
}

export function EksScalingDemo() {
  const isDark = useIsDark()
  const [pods, setPods] = useState(3)
  const [nodes, setNodes] = useState(2)

  return (
    <div className="mb-6">
      <div className="flex gap-8 flex-wrap">
        {/* Pod scaling */}
        <div className="flex-1 min-w-60">
          <div className="flex justify-between items-center mb-2.5">
            <span
              className="text-xs font-mono"
              style={{ color: isDark ? '#06D6A0' : '#047857' }}
            >
              HPA — Pod Replicas: {pods}
            </span>
            <div className="flex gap-1.5">
              <ScaleButton onClick={() => setPods(Math.max(1, pods - 1))} label={'\u2212'} isDark={isDark} />
              <ScaleButton onClick={() => setPods(Math.min(MAX_PODS, pods + 1))} label="+" isDark={isDark} />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5" style={{ minHeight: 80 }}>
            {Array.from({ length: pods }).map((_, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm"
                style={{
                  background: isDark ? 'rgba(6,214,160,0.15)' : 'rgba(4,120,87,0.08)',
                  border: `1px solid ${isDark ? 'rgba(6,214,160,0.3)' : 'rgba(4,120,87,0.2)'}`,
                }}
              >
                {'\u{1FAD1}'}
              </div>
            ))}
          </div>
          <p
            className="text-xs font-mono mt-2 mb-0"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            HPA scales pods based on CPU/memory metrics
          </p>
        </div>

        {/* Node scaling */}
        <div className="flex-1 min-w-60">
          <div className="flex justify-between items-center mb-2.5">
            <span
              className="text-xs font-mono"
              style={{ color: isDark ? '#118AB2' : '#0369a1' }}
            >
              Cluster Autoscaler — Nodes: {nodes}
            </span>
            <div className="flex gap-1.5">
              <ScaleButton onClick={() => setNodes(Math.max(1, nodes - 1))} label={'\u2212'} isDark={isDark} />
              <ScaleButton onClick={() => setNodes(Math.min(MAX_NODES, nodes + 1))} label="+" isDark={isDark} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2" style={{ minHeight: 80 }}>
            {Array.from({ length: nodes }).map((_, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-lg flex items-center justify-center text-xl"
                style={{
                  background: isDark ? 'rgba(17,138,178,0.12)' : 'rgba(3,105,161,0.06)',
                  border: `1px solid ${isDark ? 'rgba(17,138,178,0.25)' : 'rgba(3,105,161,0.15)'}`,
                }}
              >
                {'\u{1F5A5}\uFE0F'}
              </div>
            ))}
          </div>
          <p
            className="text-xs font-mono mt-2 mb-0"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Adds EC2 nodes when pods can't be scheduled
          </p>
        </div>
      </div>

      {pods > nodes * 4 && (
        <div
          className="mt-4 px-4 py-3 rounded-xl text-sm border"
          style={{
            background: isDark ? 'rgba(239,71,111,0.08)' : 'rgba(190,18,60,0.04)',
            borderColor: isDark ? 'rgba(239,71,111,0.25)' : 'rgba(190,18,60,0.2)',
            color: isDark ? '#EF476F' : '#be123c',
          }}
        >
          {'\u26A0\uFE0F'} Pods exceed node capacity! The Cluster Autoscaler would add more nodes automatically, or pods would remain in <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: isDark ? 'rgba(239,71,111,0.15)' : 'rgba(190,18,60,0.08)' }}>Pending</code> state.
        </div>
      )}
    </div>
  )
}
