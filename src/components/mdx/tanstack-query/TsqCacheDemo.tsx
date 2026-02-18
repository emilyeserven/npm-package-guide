import { useState, useCallback } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import { TSQ_CACHE_ENDPOINTS } from '../../../data/tanstackQueryData'

interface CacheEntry {
  data: { id: string; items: number }
  fetchedAt: number
  stale: boolean
}

interface LogEntry {
  time: number
  msg: string
}

export function TsqCacheDemo() {
  const isDark = useIsDark()
  const [cache, setCache] = useState<Record<string, CacheEntry>>({})
  const [fetching, setFetching] = useState<string | null>(null)
  const [log, setLog] = useState<LogEntry[]>([])

  const accent = ds('#d97706', '#f59e0b', isDark)
  const accentDim = ds('#b45309', '#d97706', isDark)
  const teal = ds('#0d9488', '#14b8a6', isDark)
  const rose = ds('#e11d48', '#f43f5e', isDark)
  const bgPanel = ds('#f1f5f9', '#0a0e17', isDark)
  const codeBg = ds('#f8fafc', '#0d1117', isDark)

  const logEntry = useCallback(
    (msg: string) => setLog((p) => [...p.slice(-6), { time: Date.now(), msg }]),
    [],
  )

  const fakeFetch = useCallback(
    (key: string) => {
      if (cache[key] && Date.now() - cache[key].fetchedAt < 8000) {
        logEntry(`\u2705 Cache HIT for ${key} \u2014 no network request`)
        return
      }
      setFetching(key)
      logEntry(`\u{1F504} Fetching ${key}...`)
      setTimeout(() => {
        const data = {
          id: Math.random().toString(36).slice(2, 6),
          items: Math.floor(Math.random() * 50 + 5),
        }
        setCache((prev) => ({
          ...prev,
          [key]: { data, fetchedAt: Date.now(), stale: false },
        }))
        setFetching(null)
        logEntry(`\u{1F4E6} Cached ${key} (${data.items} items)`)
        setTimeout(() => {
          setCache((prev) =>
            prev[key] ? { ...prev, [key]: { ...prev[key], stale: true } } : prev,
          )
          logEntry(`\u23F0 ${key} is now STALE`)
        }, 5000)
      }, 800)
    },
    [cache, logEntry],
  )

  const invalidate = useCallback(
    (key: string) => {
      setCache((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
      logEntry(`\u{1F5D1}\uFE0F Invalidated ${key}`)
    },
    [logEntry],
  )

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: codeBg,
        border: `1px solid ${tc(theme.borderDefault, isDark)}`,
      }}
    >
      <div
        className="font-mono text-xs mb-3"
        style={{ color: accent, letterSpacing: '0.08em' }}
      >
        INTERACTIVE DEMO &mdash; QUERY CACHING
      </div>

      {/* Fetch buttons */}
      <div className="flex flex-wrap gap-2.5 mb-4">
        {TSQ_CACHE_ENDPOINTS.map((ep) => (
          <button
            key={ep.key}
            onClick={() => fakeFetch(ep.key)}
            disabled={fetching === ep.key}
            className="rounded-lg font-mono text-xs transition-all"
            style={{
              padding: '8px 16px',
              border: `1px solid ${cache[ep.key] ? (cache[ep.key].stale ? accentDim : teal) : tc(theme.borderDefault, isDark)}`,
              background: cache[ep.key]
                ? cache[ep.key].stale
                  ? `${accent}18`
                  : `${teal}18`
                : 'transparent',
              color: tc(theme.textPrimary, isDark),
              cursor: fetching === ep.key ? 'wait' : 'pointer',
              opacity: fetching === ep.key ? 0.6 : 1,
            }}
          >
            {ep.emoji} {fetching === ep.key ? 'Fetching...' : `Fetch ${ep.label}`}
          </button>
        ))}
      </div>

      {/* Cache status badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {TSQ_CACHE_ENDPOINTS.map(
          (ep) =>
            cache[ep.key] && (
              <div
                key={ep.key}
                className="flex items-center gap-2 rounded-md font-mono text-xs"
                style={{
                  padding: '6px 12px',
                  background: cache[ep.key].stale
                    ? `${accent}0d`
                    : `${teal}0d`,
                  border: `1px solid ${cache[ep.key].stale ? `${accent}33` : `${teal}33`}`,
                }}
              >
                <span style={{ color: cache[ep.key].stale ? accent : teal }}>
                  {cache[ep.key].stale ? 'STALE' : 'FRESH'}
                </span>
                <span style={{ color: tc(theme.textMuted, isDark) }}>{ep.key}</span>
                <button
                  onClick={() => invalidate(ep.key)}
                  className="font-mono text-xs cursor-pointer"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: rose,
                    padding: 0,
                  }}
                >
                  &times;
                </button>
              </div>
            ),
        )}
      </div>

      {/* Log */}
      <div
        className="rounded-lg overflow-y-auto"
        style={{
          background: bgPanel,
          padding: 12,
          maxHeight: 160,
          border: `1px solid ${tc(theme.borderDefault, isDark)}`,
        }}
      >
        {log.length === 0 && (
          <span
            className="font-mono text-xs"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Click &quot;Fetch&quot; to see caching in action...
          </span>
        )}
        {log.map((entry, i) => (
          <div
            key={`${entry.time}-${i}`}
            className="font-mono text-xs py-0.5"
            style={{
              color: tc(theme.textSecondary, isDark),
              opacity: i === log.length - 1 ? 1 : 0.6,
            }}
          >
            {entry.msg}
          </div>
        ))}
      </div>

      <p
        className="text-xs mt-2.5 mb-0"
        style={{ color: tc(theme.textMuted, isDark) }}
      >
        Try: fetch the same endpoint twice quickly (cache hit), wait for
        &quot;stale&quot;, then re-fetch (background refetch). Click &times; to
        invalidate.
      </p>
    </div>
  )
}
