import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import {
  TSS_COMPARISON_FEATURES,
  TSS_PHILOSOPHY_START,
  TSS_PHILOSOPHY_NEXT,
  TSS_WHEN_TO_USE,
} from '../../../data/tanstackStartData'
import type { TssComparisonRow, TssWhenToUse } from '../../../data/tanstackStartData'

type ViewId = 'table' | 'philosophy' | 'when-to-use'

const VIEWS: { id: ViewId; label: string }[] = [
  { id: 'table', label: 'Feature Comparison' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'when-to-use', label: 'When to Use Which' },
]

function ComparisonTable({ isDark }: { isDark: boolean }) {
  const headerBg = ds('#f1f5f9', '#0f172a', isDark)
  const startAccent = ds('#2dd4bf', '#5eead4', isDark)
  const nextAccent = ds('#3b82f6', '#60a5fa', isDark)

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
    >
      {/* Header */}
      <div
        className="grid gap-px"
        style={{
          gridTemplateColumns: '1.4fr 1fr 1fr',
          background: tc(theme.borderDefault, isDark),
        }}
      >
        <div className="text-xs font-semibold uppercase tracking-wider px-4 py-3" style={{ background: headerBg, color: tc(theme.textMuted, isDark) }}>Feature</div>
        <div className="text-xs font-semibold px-4 py-3" style={{ background: headerBg, color: startAccent }}>◆ TanStack Start</div>
        <div className="text-xs font-semibold px-4 py-3" style={{ background: headerBg, color: tc(theme.textMuted, isDark) }}>▲ Next.js</div>
      </div>

      {/* Rows */}
      {TSS_COMPARISON_FEATURES.map((row: TssComparisonRow, i: number) => (
        <div
          key={i}
          className="grid gap-px"
          style={{
            gridTemplateColumns: '1.4fr 1fr 1fr',
            background: tc(theme.borderDefault, isDark),
          }}
        >
          <div className="text-[13px] font-medium px-4 py-3" style={{ background: tc(theme.bgCard, isDark), color: tc(theme.textPrimary, isDark) }}>
            {row.feature}
          </div>
          <div
            className="text-[13px] px-4 py-3"
            style={{
              background: row.winner === 'start'
                ? ds(`${startAccent}10`, `${startAccent}08`, isDark)
                : tc(theme.bgCard, isDark),
              color: row.winner === 'start' ? startAccent : tc(theme.textMuted, isDark),
              borderLeft: row.winner === 'start' ? `2px solid ${startAccent}` : 'none',
            }}
          >
            {row.tanstackStart}
          </div>
          <div
            className="text-[13px] px-4 py-3"
            style={{
              background: row.winner === 'next'
                ? ds(`${nextAccent}10`, `${nextAccent}08`, isDark)
                : tc(theme.bgCard, isDark),
              color: row.winner === 'next' ? nextAccent : tc(theme.textMuted, isDark),
              borderLeft: row.winner === 'next' ? `2px solid ${nextAccent}` : 'none',
            }}
          >
            {row.nextjs}
          </div>
        </div>
      ))}
    </div>
  )
}

function PhilosophyView({ isDark }: { isDark: boolean }) {
  const startAccent = ds('#2dd4bf', '#5eead4', isDark)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        className="rounded-xl p-5"
        style={{
          background: ds(`${startAccent}08`, `${startAccent}06`, isDark),
          border: `1px solid ${startAccent}30`,
        }}
      >
        <div className="font-bold text-base mb-3" style={{ color: startAccent }}>◆ TanStack Start</div>
        <div
          className="text-sm leading-relaxed"
          style={{ color: tc(theme.textSecondary, isDark) }}
          dangerouslySetInnerHTML={{ __html: TSS_PHILOSOPHY_START }}
        />
      </div>
      <div
        className="rounded-xl p-5"
        style={{
          background: tc(theme.bgCard, isDark),
          border: `1px solid ${tc(theme.borderDefault, isDark)}`,
        }}
      >
        <div className="font-bold text-base mb-3" style={{ color: tc(theme.textMuted, isDark) }}>▲ Next.js</div>
        <div
          className="text-sm leading-relaxed"
          style={{ color: tc(theme.textSecondary, isDark) }}
          dangerouslySetInnerHTML={{ __html: TSS_PHILOSOPHY_NEXT }}
        />
      </div>
    </div>
  )
}

function WhenToUseView({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-4">
      {TSS_WHEN_TO_USE.map((group: TssWhenToUse, gi: number) => {
        const accent = ds(group.color, group.darkColor, isDark)
        return (
          <div
            key={gi}
            className="rounded-xl p-5"
            style={{
              background: gi === 0
                ? ds(`${accent}08`, `${accent}06`, isDark)
                : tc(theme.bgCard, isDark),
              border: `1px solid ${gi === 0 ? `${accent}30` : tc(theme.borderDefault, isDark)}`,
            }}
          >
            <div className="font-bold text-[15px] mb-3" style={{ color: accent }}>
              {group.label}
            </div>
            <div className="text-sm leading-loose" style={{ color: tc(theme.textSecondary, isDark) }}>
              {group.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="shrink-0 font-bold" style={{ color: accent }}>
                    {gi === 0 ? '✓' : '→'}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function TssComparisonView() {
  const isDark = useIsDark()
  const [activeView, setActiveView] = useState<ViewId>('table')

  return (
    <div className="mb-6">
      {/* View toggles */}
      <div className="flex gap-2 mb-4">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id)}
            className="text-xs font-medium rounded-md transition-all cursor-pointer"
            style={{
              padding: '6px 14px',
              background: activeView === v.id
                ? ds('#3b82f6', '#3b82f6', isDark)
                : 'transparent',
              border: `1px solid ${activeView === v.id ? ds('#3b82f6', '#3b82f6', isDark) : tc(theme.borderDefault, isDark)}`,
              color: activeView === v.id ? '#fff' : tc(theme.textMuted, isDark),
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {activeView === 'table' && <ComparisonTable isDark={isDark} />}
      {activeView === 'philosophy' && <PhilosophyView isDark={isDark} />}
      {activeView === 'when-to-use' && <WhenToUseView isDark={isDark} />}
    </div>
  )
}
