import { useState, useRef, useCallback } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'

export function WsHeartbeatViz() {
  const isDark = useIsDark()
  const [running, setRunning] = useState(false)
  const [status, setStatus] = useState('')
  const [ballPos, setBallPos] = useState(50)
  const animRef = useRef<number | null>(null)
  const stepRef = useRef(0)

  const clientColor = ds('#2563eb', '#5bc0eb', isDark)
  const serverColor = ds('#7c3aed', '#7b61ff', isDark)
  const ballColor = ds('#16a34a', '#00e5a0', isDark)

  const animate = useCallback(() => {
    const totalBounces = 6
    let count = 0

    function bounce() {
      if (count >= totalBounces) {
        setRunning(false)
        setStatus('')
        setBallPos(50)
        return
      }

      const goRight = count % 2 === 0
      setStatus(goRight ? 'PING \u2192' : '\u2190 PONG')

      const start = goRight ? 5 : 95
      const end = goRight ? 95 : 5
      const duration = 500
      const startTime = performance.now()

      function step(now: number) {
        const elapsed = now - startTime
        const t = Math.min(elapsed / duration, 1)
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        setBallPos(start + (end - start) * eased)

        if (t < 1) {
          animRef.current = requestAnimationFrame(step)
        } else {
          count++
          setTimeout(bounce, 400)
        }
      }

      animRef.current = requestAnimationFrame(step)
    }

    setBallPos(5)
    setTimeout(bounce, 200)
  }, [])

  const handleStart = () => {
    if (running) return
    setRunning(true)
    stepRef.current = 0
    animate()
  }

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
        style={{ background: `linear-gradient(90deg, ${clientColor}, ${serverColor})` }}
      />
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ballColor }} />
        <span className="text-[11px] font-mono tracking-wider uppercase" style={{ color: ballColor }}>
          Visualization — Ping / Pong Heartbeat
        </span>
      </div>

      {/* Canvas */}
      <div
        className="w-full h-28 rounded-lg border relative overflow-hidden mb-3"
        style={{
          borderColor: tc(theme.borderDefault, isDark),
          backgroundColor: ds('#f8fafc', '#0f172a', isDark),
        }}
      >
        {/* Client paddle */}
        <div
          className="absolute w-1 h-8 rounded-sm"
          style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: clientColor }}
        />
        {/* Net */}
        <div
          className="absolute top-0 bottom-0"
          style={{ left: '50%', borderLeft: `1px dashed ${tc(theme.borderDefault, isDark)}` }}
        />
        {/* Server paddle */}
        <div
          className="absolute w-1 h-8 rounded-sm"
          style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: serverColor }}
        />
        {/* Ball */}
        <div
          className="absolute w-2 h-2 rounded-full transition-none"
          style={{
            left: `${ballPos}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: ballColor,
            boxShadow: `0 0 12px ${ballColor}33`,
          }}
        />
        {/* Labels */}
        <div
          className="absolute bottom-1.5 left-1.5 font-mono text-[9px] uppercase tracking-wider"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          Client
        </div>
        <div
          className="absolute bottom-1.5 right-1.5 font-mono text-[9px] uppercase tracking-wider"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          Server
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={handleStart}
          disabled={running}
          className="px-4 py-2 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: ballColor, color: ds('#fff', '#0a0a0f', isDark) }}
        >
          {running ? '\u25cf Running' : '\u25b6 Start heartbeat'}
        </button>
        <span className="text-[11px] font-mono" style={{ color: tc(theme.textMuted, isDark) }}>
          {status}
        </span>
      </div>
    </div>
  )
}
