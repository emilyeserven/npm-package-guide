import { useState, useEffect, useRef } from 'react'
import { useIsDark } from '../../../hooks/useTheme'

import { ds } from '../../../helpers/darkStyle'

interface BrokerMessage {
  id: number
  broker: number
  timestamp: number
}

export function KafkaBrokerCluster() {
  const isDark = useIsDark()
  const [messages, setMessages] = useState<BrokerMessage[]>([])
  const nextIdRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const id = nextIdRef.current++
      const broker = Math.floor(Math.random() * 3)
      setMessages(msgs => [
        ...msgs.slice(-8),
        { id, broker, timestamp: Date.now() },
      ])
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  const accent = ds('#e94560', '#f87171', isDark)
  const accentBg = ds('rgba(233, 69, 96, 0.08)', 'rgba(233, 69, 96, 0.15)', isDark)
  const accentBorder = ds('rgba(233, 69, 96, 0.2)', 'rgba(233, 69, 96, 0.3)', isDark)
  const msgText = ds('#9f1239', '#f5c6d0', isDark)

  return (
    <div className="flex gap-4 justify-center py-6 flex-wrap">
      {[0, 1, 2].map(b => (
        <div
          key={b}
          className="rounded-xl border relative overflow-hidden min-w-[140px]"
          style={{
            backgroundColor: ds('#f8fafc', '#1a1a2e', isDark),
            borderColor: accent,
            padding: '16px 20px',
          }}
        >
          <div
            className="text-[11px] font-mono font-bold tracking-widest uppercase mb-2"
            style={{ color: accent }}
          >
            Broker {b}
          </div>
          <div className="flex flex-col gap-1 min-h-[80px]">
            {messages
              .filter(m => m.broker === b)
              .slice(-3)
              .map(m => (
                <div
                  key={m.id}
                  className="rounded-md px-2 py-1 text-[11px] font-mono animate-fade-in"
                  style={{
                    backgroundColor: accentBg,
                    border: `1px solid ${accentBorder}`,
                    color: msgText,
                  }}
                >
                  msg-{String(m.id).padStart(4, '0')}
                </div>
              ))}
          </div>
          <div
            className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: ds('#16a34a', '#00ff88', isDark),
              boxShadow: ds('0 0 6px rgba(22, 163, 74, 0.4)', '0 0 8px rgba(0, 255, 136, 0.6)', isDark),
            }}
          />
        </div>
      ))}
    </div>
  )
}
