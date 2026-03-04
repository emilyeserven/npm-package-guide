import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { BAUTH_PLUGINS } from '../../../data/betterAuthData'
import type { BauthPlugin } from '../../../data/betterAuthData'

const CAT_LABELS: Record<string, string> = {
  all: 'All',
  auth: 'Authentication',
  enterprise: 'Enterprise',
  infra: 'Infrastructure',
}

const CATS = ['all', 'auth', 'enterprise', 'infra'] as const

const DIFF_COLORS: Record<BauthPlugin['difficulty'], { light: string; dark: string }> = {
  easy: { light: '#15803d', dark: '#22c55e' },
  medium: { light: '#a16207', dark: '#eab308' },
  hard: { light: '#dc2626', dark: '#ef4444' },
}

export function BauthPluginBrowser() {
  const isDark = useIsDark()
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all'
    ? BAUTH_PLUGINS
    : BAUTH_PLUGINS.filter(p => p.cat === filter)

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-4">
        {CATS.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono cursor-pointer border transition-colors"
            style={{
              borderColor: filter === c
                ? (isDark ? '#e879a0' : '#db2777')
                : (isDark ? '#334155' : '#e2e8f0'),
              background: filter === c
                ? (isDark ? 'rgba(232,121,160,0.12)' : 'rgba(219,39,119,0.08)')
                : 'transparent',
              color: filter === c
                ? (isDark ? '#e879a0' : '#db2777')
                : (isDark ? '#94a3b8' : '#64748b'),
            }}
          >
            {CAT_LABELS[c]} ({c === 'all' ? BAUTH_PLUGINS.length : BAUTH_PLUGINS.filter(p => p.cat === c).length})
          </button>
        ))}
      </div>

      <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {filtered.map(p => {
          const diffColor = isDark ? DIFF_COLORS[p.difficulty].dark : DIFF_COLORS[p.difficulty].light
          return (
            <div
              key={p.name}
              className="rounded-lg border p-3 transition-colors"
              style={{
                background: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
              }}
            >
              <div className="flex justify-between items-center mb-1.5">
                <span
                  className="font-mono text-[13px] font-semibold"
                  style={{ color: isDark ? '#e879a0' : '#db2777' }}
                >
                  {p.name}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                  style={{
                    background: `${diffColor}15`,
                    color: diffColor,
                  }}
                >
                  {p.difficulty}
                </span>
              </div>
              <div
                className="text-xs leading-relaxed"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                {p.desc}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
