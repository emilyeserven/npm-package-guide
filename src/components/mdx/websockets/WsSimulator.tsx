import { useState, useRef, useEffect, useCallback } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'

interface LogEntry {
  id: number
  time: string
  dir: 'send' | 'recv' | 'sys'
  msg: string
}

function formatTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
}

export function WsSimulator() {
  const isDark = useIsDark()
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [inputVal, setInputVal] = useState('')
  const logRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)
  const pingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const addLog = useCallback((dir: LogEntry['dir'], msg: string) => {
    const entry: LogEntry = { id: ++idRef.current, time: formatTime(), dir, msg }
    setLogs((prev) => [...prev, entry])
  }, [])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  useEffect(() => {
    return () => {
      if (pingRef.current) clearInterval(pingRef.current)
    }
  }, [])

  const handleConnect = () => {
    setConnecting(true)
    addLog('sys', 'Connecting to wss://sim.echo ...')
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
      addLog('sys', 'Connection established (101 Switching Protocols)')
      addLog('recv', '{"type":"system","text":"Welcome! Echo server ready."}')
      pingRef.current = setInterval(() => {
        addLog('send', '{"type":"ping"}')
        setTimeout(() => addLog('recv', '{"type":"pong"}'), 80)
      }, 8000)
    }, 600)
  }

  const handleDisconnect = () => {
    if (pingRef.current) { clearInterval(pingRef.current); pingRef.current = null }
    addLog('send', 'Close frame (1000: Normal closure)')
    setTimeout(() => {
      addLog('recv', 'Close frame (1000)')
      addLog('sys', 'Connection closed cleanly')
      setConnected(false)
    }, 200)
  }

  const sendMessage = (msg: string) => {
    if (!connected) return
    addLog('send', msg)
    setTimeout(() => addLog('recv', msg), 50 + Math.random() * 100)
  }

  const handleSend = () => {
    const val = inputVal.trim()
    if (!val) return
    sendMessage(val)
    setInputVal('')
  }

  const handleJson = () => {
    sendMessage(JSON.stringify({ type: 'chat', user: 'you', text: 'Hello WebSocket!', ts: Date.now() }))
  }

  const handleBinary = () => {
    if (!connected) return
    addLog('send', '[Binary: 8 bytes \u2014 Float64: 3.14159]')
    setTimeout(() => addLog('recv', '[Binary: 8 bytes \u2014 Float64: 3.14159]'), 60)
  }

  const handleFlood = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => sendMessage(`Rapid message #${i + 1}`), i * 50)
    }
  }

  const accentColor = ds('#16a34a', '#00e5a0', isDark)
  const sendColor = ds('#7c3aed', '#7b61ff', isDark)
  const recvColor = ds('#16a34a', '#00e5a0', isDark)
  const sysColor = ds('#2563eb', '#5bc0eb', isDark)
  const dangerColor = ds('#dc2626', '#ff6b6b', isDark)

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
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${sendColor})` }}
      />
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: connected ? accentColor : connecting ? '#f0a060' : tc(theme.textMuted, isDark),
            animation: connecting ? 'pulse 1s infinite' : 'none',
            boxShadow: connected ? `0 0 8px ${accentColor}33` : 'none',
          }}
        />
        <span className="text-[11px] font-mono tracking-wider uppercase" style={{ color: accentColor }}>
          Live Simulation — Echo Server
        </span>
      </div>

      {/* Status bar */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full transition-colors"
            style={{
              backgroundColor: connected ? accentColor : connecting ? '#f0a060' : tc(theme.textMuted, isDark),
              boxShadow: connected ? `0 0 8px ${accentColor}33` : 'none',
            }}
          />
          <span className="text-[11px] font-mono" style={{ color: tc(theme.textMuted, isDark) }}>
            {connected ? 'Connected (wss://sim.echo)' : connecting ? 'Connecting...' : 'Disconnected'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleConnect}
            disabled={connected || connecting}
            className="px-3 py-1.5 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor, color: ds('#fff', '#0a0a0f', isDark) }}
          >
            Connect
          </button>
          <button
            onClick={handleDisconnect}
            disabled={!connected}
            className="px-3 py-1.5 rounded-md text-[11px] font-mono font-medium border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: dangerColor, color: dangerColor, backgroundColor: 'transparent' }}
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Log area */}
      <div
        ref={logRef}
        className="h-60 rounded-lg border overflow-y-auto p-3 mb-3 font-mono text-xs leading-7"
        style={{
          borderColor: tc(theme.borderDefault, isDark),
          backgroundColor: ds('#f8fafc', '#0f172a', isDark),
        }}
      >
        {logs.map((entry) => (
          <div key={entry.id} className="flex gap-3">
            <span style={{ color: tc(theme.textMuted, isDark), whiteSpace: 'nowrap' }}>{entry.time}</span>
            <span
              className="font-bold w-4 text-center"
              style={{
                color: entry.dir === 'send' ? sendColor : entry.dir === 'recv' ? recvColor : sysColor,
              }}
            >
              {entry.dir === 'send' ? '\u2191' : entry.dir === 'recv' ? '\u2193' : '\u25cf'}
            </span>
            <span
              className="flex-1"
              style={{
                color: entry.dir === 'sys' ? sysColor : tc(theme.textSecondary, isDark),
                fontStyle: entry.dir === 'sys' ? 'italic' : 'normal',
              }}
            >
              {entry.msg}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <span style={{ color: tc(theme.textMuted, isDark) }}>
            Click Connect to start the simulation...
          </span>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-3">
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={!connected}
          placeholder="Type a message..."
          className="flex-1 rounded-md border px-3 py-2 text-xs font-mono outline-none transition-colors disabled:opacity-40"
          style={{
            borderColor: tc(theme.borderDefault, isDark),
            backgroundColor: ds('#f8fafc', '#0f172a', isDark),
            color: tc(theme.textPrimary, isDark),
          }}
        />
        <button
          onClick={handleSend}
          disabled={!connected}
          className="px-4 py-2 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: accentColor, color: ds('#fff', '#0a0a0f', isDark) }}
        >
          Send
        </button>
      </div>

      {/* Preset buttons */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label: 'Send JSON', fn: handleJson },
          { label: 'Send Binary', fn: handleBinary },
          { label: 'Send 10 rapid', fn: handleFlood },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.fn}
            disabled={!connected}
            className="px-3 py-1.5 rounded-md text-[11px] font-mono border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              borderColor: tc(theme.borderDefault, isDark),
              color: tc(theme.textSecondary, isDark),
              backgroundColor: 'transparent',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}
