import { useState, useEffect, useRef } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'
import { ds } from '../../../helpers/darkStyle'
import { KAFKA_PLAYGROUND_EVENTS } from '../../../data/kafkaData'

interface LogEntry {
  step: number
  time: string
  topic: string
  key: string
  value: string
  partition: number
  status: string
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}

export function KafkaMessagePlayground() {
  const isDark = useIsDark()
  const [log, setLog] = useState<LogEntry[]>([])
  const [producing, setProducing] = useState(false)
  const logRef = useRef<HTMLDivElement>(null)

  const accent = ds('#be123c', '#e94560', isDark)
  const topicColor = ds('#be123c', '#e94560', isDark)
  const partColor = ds('#b45309', '#ffc107', isDark)
  const keyColor = ds('#7e22ce', '#a855f7', isDark)
  const ackColor = ds('#16a34a', '#00ff88', isDark)
  const actionColor = ds('#0369a1', '#00b4d8', isDark)

  const simulateFlow = () => {
    if (producing) return
    setProducing(true)
    setLog([])
    let i = 0
    const run = () => {
      if (i >= KAFKA_PLAYGROUND_EVENTS.length) {
        setProducing(false)
        return
      }
      const evt = KAFKA_PLAYGROUND_EVENTS[i]
      const partition = Math.abs(hashCode(evt.key)) % 3
      setLog(prev => [
        ...prev,
        {
          step: i,
          time: new Date().toISOString().split('T')[1].slice(0, 12),
          ...evt,
          partition,
          status: 'ack',
        },
      ])
      i++
      setTimeout(run, 600)
    }
    run()
  }

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [log])

  return (
    <div className="my-6">
      <button
        onClick={simulateFlow}
        disabled={producing}
        className="rounded-lg px-6 py-2.5 font-mono text-sm font-bold mb-4 tracking-wide border-0 text-white"
        style={{
          backgroundColor: producing ? tc(theme.borderDefault, isDark) : accent,
          cursor: producing ? 'not-allowed' : 'pointer',
        }}
      >
        {producing ? '\u23f3 Producing...' : '\u25b6 Simulate Event Stream'}
      </button>
      <div
        ref={logRef}
        className="rounded-lg border p-4 max-h-[300px] overflow-y-auto font-mono text-[11px] leading-[1.8]"
        style={{
          backgroundColor: ds('#f8fafc', '#0a0a15', isDark),
          borderColor: tc(theme.borderDefault, isDark),
        }}
      >
        {log.length === 0 ? (
          <div style={{ color: tc(theme.textMuted, isDark) }}>
            {'// Click "Simulate Event Stream" to watch messages flow through Kafka...'}
          </div>
        ) : (
          log.map((entry, i) => (
            <div key={i} className="animate-fade-in">
              <span style={{ color: tc(theme.textMuted, isDark) }}>{entry.time}</span>{' '}
              <span style={{ color: actionColor }}>PRODUCE</span>{' '}
              <span style={{ color: topicColor }}>{entry.topic}</span>
              <span style={{ color: tc(theme.textMuted, isDark) }}>/</span>
              <span style={{ color: partColor }}>P{entry.partition}</span>{' '}
              <span style={{ color: tc(theme.textMuted, isDark) }}>key=</span>
              <span style={{ color: keyColor }}>{entry.key}</span>{' '}
              <span style={{ color: tc(theme.textMuted, isDark) }}>{entry.value}</span>{' '}
              <span style={{ color: ackColor }}>{'\u2713'} ack</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
