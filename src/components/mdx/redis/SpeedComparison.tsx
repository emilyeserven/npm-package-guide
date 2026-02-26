import { useState, useRef, useCallback } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'

interface BarConfig {
  label: string
  time: string
  targetMs: number
  color: string
}

const BARS: BarConfig[] = [
  { label: 'Redis (RAM)', time: '~0.1ms', targetMs: 300, color: '#34d399' },
  { label: 'PostgreSQL', time: '~5ms', targetMs: 2200, color: '#38bdf8' },
  { label: 'Disk Read', time: '~10ms', targetMs: 4000, color: '#fb923c' },
]

export function SpeedComparison() {
  const isDark = useIsDark()
  const [progress, setProgress] = useState<number[]>([0, 0, 0])
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const frameRef = useRef<number>(0)

  const run = useCallback(() => {
    setRunning(true)
    setDone(false)
    setProgress([0, 0, 0])
    const start = Date.now()
    const maxTime = Math.max(...BARS.map((b) => b.targetMs))

    function tick() {
      const elapsed = Date.now() - start
      setProgress(BARS.map((b) => Math.min(100, (elapsed / b.targetMs) * 100)))
      if (elapsed < maxTime) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setProgress([100, 100, 100])
        setRunning(false)
        setDone(true)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [])

  return (
    <div className="space-y-5 mb-6">
      <div className="space-y-4">
        {BARS.map((bar, i) => (
          <div key={bar.label} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span style={{ color: tc(theme.textSecondary, isDark) }} className="font-medium">
                {bar.label}
              </span>
              <span
                className="font-mono"
                style={{ color: progress[i] >= 100 ? tc(theme.textPrimary, isDark) : tc(theme.textMuted, isDark) }}
              >
                {bar.time}
              </span>
            </div>
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ background: ds('#e2e8f0', '#1e293b', isDark) }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress[i]}%`,
                  background: bar.color,
                  boxShadow: progress[i] >= 100 ? `0 0 12px ${bar.color}40` : 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={run}
        disabled={running}
        className="px-5 py-2.5 rounded-lg font-semibold text-sm border cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: ds('#f0fdf4', 'rgba(52,211,153,0.15)', isDark),
          color: ds('#059669', '#6ee7b7', isDark),
          borderColor: ds('#bbf7d0', 'rgba(52,211,153,0.3)', isDark),
        }}
      >
        {running ? 'Running...' : done ? 'Run Again' : '\u25B6 Simulate Lookup Speed'}
      </button>
      {done && (
        <p className="text-sm" style={{ color: tc(theme.textMuted, isDark) }}>
          Redis is ~100x faster than a typical database query because RAM access time is measured in
          nanoseconds, while disk access is measured in milliseconds.
        </p>
      )}
    </div>
  )
}
