import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

interface HistoryEntry {
  type: 'info' | 'cmd' | 'result'
  text: string
}

export function RedisTerminal() {
  const isDark = useIsDark()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'info', text: 'Redis Playground \u2014 this simulates what runs on your server.' },
    { type: 'info', text: 'Try: SET api:cache:user:1 "Emily" \u00b7 GET api:cache:user:1 \u00b7 INCR pageviews' },
  ])
  const store = useRef<Record<string, string>>({})
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  function processCommand(raw: string): string | null {
    const parts = raw.match(/(".*?"|[^\s]+)/g) || []
    const cmd = (parts[0] || '').toUpperCase()
    const args = parts.slice(1).map((a) => a.replace(/^"|"$/g, ''))

    switch (cmd) {
      case 'SET':
        if (args.length < 2) return "ERR wrong number of arguments for 'SET'"
        store.current[args[0]] = args[1]
        return 'OK'
      case 'GET':
        if (args.length < 1) return "ERR wrong number of arguments for 'GET'"
        return store.current[args[0]] !== undefined ? `"${store.current[args[0]]}"` : '(nil)'
      case 'DEL': {
        if (args.length < 1) return "ERR wrong number of arguments for 'DEL'"
        let count = 0
        args.forEach((k) => {
          if (store.current[k] !== undefined) {
            delete store.current[k]
            count++
          }
        })
        return `(integer) ${count}`
      }
      case 'INCR': {
        if (args.length < 1) return "ERR wrong number of arguments for 'INCR'"
        const val = store.current[args[0]]
        if (val === undefined) {
          store.current[args[0]] = '1'
          return '(integer) 1'
        }
        const num = parseInt(val, 10)
        if (isNaN(num)) return 'ERR value is not an integer'
        store.current[args[0]] = String(num + 1)
        return `(integer) ${num + 1}`
      }
      case 'EXISTS':
        if (args.length < 1) return "ERR wrong number of arguments for 'EXISTS'"
        return store.current[args[0]] !== undefined ? '(integer) 1' : '(integer) 0'
      case 'KEYS': {
        const pattern = args[0] || '*'
        const keys = Object.keys(store.current).filter((k) => {
          if (pattern === '*') return true
          const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$')
          return regex.test(k)
        })
        if (keys.length === 0) return '(empty array)'
        return keys.map((k, i) => `${i + 1}) "${k}"`).join('\n')
      }
      case 'FLUSHALL':
        store.current = {}
        return 'OK'
      case 'HELP':
        return 'Available: SET, GET, DEL, INCR, EXISTS, KEYS, FLUSHALL, CLEAR'
      case 'CLEAR':
        setHistory([])
        return null
      default:
        return `ERR unknown command '${cmd}'`
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    const result = processCommand(input.trim())
    const newHistory: HistoryEntry[] = [...history, { type: 'cmd', text: input.trim() }]
    if (result !== null) {
      newHistory.push({ type: 'result', text: result })
    }
    setHistory(newHistory)
    setInput('')
  }

  return (
    <div
      className="rounded-xl border overflow-hidden mb-6"
      style={{
        background: isDark ? '#0f172a' : '#1e293b',
        borderColor: isDark ? '#334155' : '#374151',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{
          background: isDark ? '#1e293b' : '#111827',
          borderColor: isDark ? '#334155' : '#374151',
        }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#eab308' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
        <span className="ml-3 text-xs font-mono" style={{ color: '#6b7280' }}>
          redis-playground — try commands here
        </span>
      </div>
      <div
        ref={scrollRef}
        className="p-4 overflow-y-auto space-y-1"
        style={{ height: 256 }}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i} className="font-mono text-sm">
            {entry.type === 'info' && (
              <span style={{ color: '#6b7280', fontStyle: 'italic' }}>{entry.text}</span>
            )}
            {entry.type === 'cmd' && (
              <div>
                <span className="select-none" style={{ color: '#f87171' }}>
                  redis&gt;{' '}
                </span>
                <span style={{ color: '#e2e8f0' }}>{entry.text}</span>
              </div>
            )}
            {entry.type === 'result' && (
              <div
                className="whitespace-pre-wrap pl-2"
                style={{ color: ds('#34d399', '#6ee7b7', isDark) }}
              >
                {entry.text}
              </div>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="font-mono text-sm select-none" style={{ color: '#f87171' }}>
            redis&gt;{' '}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent font-mono text-sm outline-none ml-1 border-none p-0"
            style={{ color: '#e2e8f0', caretColor: '#34d399' }}
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  )
}
