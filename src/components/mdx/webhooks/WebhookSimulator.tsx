import { useState, useRef, useEffect, useCallback } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { SIMULATOR_EVENTS } from '../../../data/webhooksData'
import type { SimulatorEvent } from '../../../data/webhooksData'

interface LogEntry {
  id: number
  time: string
  panel: 'provider' | 'server'
  color: 'green' | 'amber' | 'red' | 'blue' | 'dim'
  msg: string
}

function formatTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
}

function randomSig(): string {
  return 'sha256=' + Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
}

function randomEventId(): string {
  return 'evt_' + Math.random().toString(36).slice(2, 10)
}

export function WebhookSimulator() {
  const isDark = useIsDark()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const providerRef = useRef<HTMLDivElement>(null)
  const serverRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)
  const [running, setRunning] = useState(false)

  const addLog = useCallback((
    panel: LogEntry['panel'],
    color: LogEntry['color'],
    msg: string,
  ) => {
    const entry: LogEntry = {
      id: ++idRef.current,
      time: formatTime(),
      panel,
      color,
      msg,
    }
    setLogs(prev => [...prev, entry])
  }, [])

  useEffect(() => {
    if (providerRef.current) {
      providerRef.current.scrollTop = providerRef.current.scrollHeight
    }
    if (serverRef.current) {
      serverRef.current.scrollTop = serverRef.current.scrollHeight
    }
  }, [logs])

  const simulateEvent = useCallback(async (event: SimulatorEvent) => {
    if (running) return
    setRunning(true)
    const eventId = randomEventId()
    const sig = randomSig()

    addLog('provider', event.color, `${event.icon} ${event.type}`)
    await delay(100)
    addLog('provider', 'dim', `   ID: ${eventId}`)
    await delay(100)
    addLog('provider', 'dim', `   Sig: ${sig.slice(0, 30)}…`)
    await delay(150)
    addLog('provider', 'dim', `   → POST https://myapp.com/api/webhooks`)

    await delay(500)
    addLog('server', 'blue', `← Incoming POST /api/webhooks`)
    await delay(300)
    addLog('server', 'dim', `🔐 Verifying signature...`)
    await delay(400)
    addLog('server', 'green', `✓ Signature valid`)
    await delay(200)
    addLog('server', 'blue', `⚡ Processing: ${event.type}`)
    await delay(300)
    addLog('server', 'dim', `   ${event.action}`)
    await delay(200)
    addLog('server', 'green', `→ 200 OK {"received": true}`)

    await delay(400)
    const latency = Math.floor(Math.random() * 150 + 80)
    addLog('provider', 'green', `✓ Delivered (${latency}ms)`)

    setRunning(false)
  }, [addLog, running])

  const simulateForged = useCallback(async () => {
    if (running) return
    setRunning(true)

    addLog('provider', 'red', '🕵️ FORGED POST /api/webhooks')
    await delay(200)
    addLog('provider', 'dim', '   Headers: X-Webhook-Signature: fake_sig_123')
    await delay(100)
    addLog('provider', 'dim', '   Body: {"type":"payment_intent.succeeded","amount":99999}')

    await delay(400)
    addLog('server', 'blue', '← Incoming POST /api/webhooks')
    await delay(300)
    addLog('server', 'amber', '🔐 Verifying signature...')
    await delay(500)
    addLog('server', 'red', '✗ SIGNATURE MISMATCH — Request rejected!')
    await delay(200)
    addLog('server', 'red', '→ 401 Unauthorized')

    setRunning(false)
  }, [addLog, running])

  const clearLogs = () => {
    setLogs([])
    idRef.current = 0
  }

  const accent = ds('#f59e0b', '#f59e0b', isDark)
  const colorMap: Record<LogEntry['color'], string> = {
    green: ds('#16a34a', '#34d399', isDark),
    amber: ds('#d97706', '#f59e0b', isDark),
    red: ds('#dc2626', '#f87171', isDark),
    blue: ds('#2563eb', '#60a5fa', isDark),
    dim: tc(theme.textMuted, isDark),
  }

  const providerLogs = logs.filter(l => l.panel === 'provider')
  const serverLogs = logs.filter(l => l.panel === 'server')

  return (
    <div
      className="rounded-xl border overflow-hidden my-6"
      style={{
        borderColor: tc(theme.borderDefault, isDark),
        backgroundColor: tc(theme.bgCard, isDark),
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: tc(theme.borderDefault, isDark),
          backgroundColor: ds('#f8fafc', '#0a0c10', isDark),
        }}
      >
        <span
          className="text-sm font-semibold"
          style={{ color: tc(theme.textPrimary, isDark) }}
        >
          Webhook Simulator
        </span>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
          style={{
            color: ds('#16a34a', '#34d399', isDark),
            borderColor: ds('#16a34a33', '#34d39933', isDark),
            backgroundColor: ds('#16a34a0a', '#34d39910', isDark),
          }}
        >
          Interactive
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Buttons */}
        <div className="flex gap-2 flex-wrap mb-4">
          {SIMULATOR_EVENTS.map((evt) => (
            <button
              key={evt.type}
              onClick={() => simulateEvent(evt)}
              disabled={running}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: accent,
                color: ds('#000', '#000', isDark),
              }}
            >
              {evt.icon} {evt.label}
            </button>
          ))}
          <button
            onClick={simulateForged}
            disabled={running}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              borderColor: ds('#cbd5e1', '#475569', isDark),
              color: tc(theme.textPrimary, isDark),
              backgroundColor: 'transparent',
            }}
          >
            🕵️ Forged Request
          </button>
          <button
            onClick={clearLogs}
            className="ml-auto px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer"
            style={{
              borderColor: tc(theme.borderDefault, isDark),
              color: tc(theme.textMuted, isDark),
              backgroundColor: 'transparent',
            }}
          >
            Clear
          </button>
        </div>

        {/* Log panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <LogPanel
            title="Provider → Your Server"
            logs={providerLogs}
            colorMap={colorMap}
            isDark={isDark}
            panelRef={providerRef}
          />
          <LogPanel
            title="Your Server Processing"
            logs={serverLogs}
            colorMap={colorMap}
            isDark={isDark}
            panelRef={serverRef}
          />
        </div>
      </div>
    </div>
  )
}

function LogPanel({
  title,
  logs,
  colorMap,
  isDark,
  panelRef,
}: {
  title: string
  logs: LogEntry[]
  colorMap: Record<LogEntry['color'], string>
  isDark: boolean
  panelRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div>
      <div
        className="text-[10px] font-semibold uppercase tracking-wider mb-2"
        style={{ color: tc(theme.textMuted, isDark) }}
      >
        {title}
      </div>
      <div
        ref={panelRef}
        className="rounded-lg border h-48 overflow-y-auto p-3 font-mono text-[11px] leading-6"
        style={{
          borderColor: tc(theme.borderDefault, isDark),
          backgroundColor: ds('#f8fafc', '#0f172a', isDark),
        }}
      >
        {logs.length === 0 && (
          <span style={{ color: tc(theme.textMuted, isDark), opacity: 0.5 }}>
            {title.includes('Provider')
              ? 'Click a button to simulate...'
              : 'Waiting for incoming webhooks...'}
          </span>
        )}
        {logs.map((entry) => (
          <div key={entry.id}>
            <span style={{ color: tc(theme.textMuted, isDark) }}>{entry.time}</span>
            {' '}
            <span style={{ color: colorMap[entry.color] }}>{entry.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
