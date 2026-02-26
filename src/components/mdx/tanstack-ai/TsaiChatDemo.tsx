import { useState, useRef, useCallback, useEffect } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSAI_CHAT_RESPONSES } from '../../../data/tsaiData'

interface ChatMessage {
  id: number
  role: 'user' | 'assistant' | 'tool' | 'thinking'
  content: string
}

function getResponseKey(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('weather') || lower.includes('tokyo') || lower.includes('temperature'))
    return 'weather'
  if (lower.includes('code') || lower.includes('how') || lower.includes('build') || lower.includes('example'))
    return 'code'
  return 'default'
}

export function TsaiChatDemo() {
  const isDark = useIsDark()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)

  const scrollToBottom = useCallback(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [])

  useEffect(scrollToBottom, [messages, scrollToBottom])

  const addMsg = useCallback((role: ChatMessage['role'], content: string) => {
    const id = nextId.current++
    setMessages(prev => [...prev, { id, role, content }])
    return id
  }, [])

  const typeText = useCallback(
    (role: ChatMessage['role'], text: string): Promise<void> => {
      return new Promise(resolve => {
        const msgId = nextId.current++
        setMessages(prev => [...prev, { id: msgId, role, content: '' }])
        let i = 0
        const interval = setInterval(() => {
          i++
          setMessages(prev =>
            prev.map(m => (m.id === msgId ? { ...m, content: text.slice(0, i) } : m)),
          )
          if (i >= text.length) {
            clearInterval(interval)
            resolve()
          }
        }, 16)
      })
    },
    [],
  )

  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text || busy) return
    setBusy(true)
    setInput('')

    addMsg('user', text)
    const resp = TSAI_CHAT_RESPONSES[getResponseKey(text)]

    await new Promise(r => setTimeout(r, 400))
    await typeText('thinking', `\uD83D\uDCAD ${resp.thinking}`)

    if (resp.tool) {
      await new Promise(r => setTimeout(r, 300))
      addMsg('tool', resp.tool)
      await new Promise(r => setTimeout(r, 600))
      addMsg('tool', resp.toolResult!)
    }

    await new Promise(r => setTimeout(r, 300))
    await typeText('assistant', resp.reply)

    setBusy(false)
  }, [input, busy, addMsg, typeText])

  const accent = ds('#f97316', '#fb923c', isDark)
  const cardBg = tc(theme.bgCard, isDark)
  const border = tc(theme.borderDefault, isDark)

  const msgStyle = (role: ChatMessage['role']) => {
    switch (role) {
      case 'user':
        return {
          alignSelf: 'flex-end' as const,
          background: accent,
          color: '#fff',
          borderBottomRightRadius: 4,
        }
      case 'assistant':
        return {
          alignSelf: 'flex-start' as const,
          background: ds('#f1f5f9', '#1e293b', isDark),
          border: `1px solid ${border}`,
          borderBottomLeftRadius: 4,
          color: tc(theme.textPrimary, isDark),
        }
      case 'tool':
        return {
          alignSelf: 'flex-start' as const,
          background: ds('rgba(168,85,247,0.08)', 'rgba(168,85,247,0.12)', isDark),
          border: `1px solid ${ds('rgba(168,85,247,0.2)', 'rgba(168,85,247,0.3)', isDark)}`,
          borderRadius: 8,
          fontFamily: 'monospace',
          fontSize: '0.78rem',
          color: ds('#9333ea', '#c084fc', isDark),
        }
      case 'thinking':
        return {
          alignSelf: 'flex-start' as const,
          background: ds('rgba(6,182,212,0.06)', 'rgba(6,182,212,0.1)', isDark),
          border: `1px dashed ${ds('rgba(6,182,212,0.25)', 'rgba(6,182,212,0.35)', isDark)}`,
          borderRadius: 8,
          fontStyle: 'italic' as const,
          color: ds('#0891b2', '#22d3ee', isDark),
        }
    }
  }

  return (
    <div
      className="rounded-xl overflow-hidden mb-6"
      style={{ background: cardBg, border: `1px solid ${border}` }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 font-mono text-xs"
        style={{
          background: ds('#f1f5f9', '#1e293b', isDark),
          borderBottom: `1px solid ${border}`,
          color: tc(theme.textMuted, isDark),
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: '#22c55e' }}
        />
        Simulated TanStack AI Chat
      </div>

      {/* Messages */}
      <div ref={chatRef} className="flex flex-col gap-3 p-4 overflow-y-auto" style={{ maxHeight: 320, minHeight: 120 }}>
        {messages.length === 0 && (
          <div className="text-center text-xs py-8" style={{ color: tc(theme.textMuted, isDark) }}>
            Try: &quot;What&apos;s the weather in Tokyo?&quot;
          </div>
        )}
        {messages.map(msg => (
          <div
            key={msg.id}
            className="max-w-[80%] rounded-xl px-3.5 py-2 text-sm leading-relaxed"
            style={msgStyle(msg.role)}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 p-3" style={{ borderTop: `1px solid ${border}` }}>
        <input
          className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
          style={{
            background: ds('#f1f5f9', '#0f172a', isDark),
            border: `1px solid ${border}`,
            color: tc(theme.textPrimary, isDark),
          }}
          placeholder="Try: 'What's the weather in Tokyo?'"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
          disabled={busy}
        />
        <button
          className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors cursor-pointer"
          style={{
            background: accent,
            color: '#fff',
            opacity: busy ? 0.5 : 1,
          }}
          onClick={handleSend}
          disabled={busy}
        >
          Send
        </button>
      </div>
    </div>
  )
}
