import { useState } from 'react'
import { TECH_DATA } from '../../../data/stateManagementData'
import { SM_COLORS } from '../../../data/stateManagementData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'

function MetaRow({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  return (
    <div
      className="flex justify-between py-2"
      style={{ borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}`, fontSize: 14 }}
    >
      <span style={{ color: tc(theme.textMuted, isDark) }}>{label}</span>
      <span style={{ color: tc(theme.textPrimary, isDark), fontWeight: 500 }}>{value}</span>
    </div>
  )
}

function ListItem({ children, icon = '\u2192', isDark }: { children: React.ReactNode; icon?: string; isDark: boolean }) {
  return (
    <div className="flex gap-2.5 mb-2" style={{ lineHeight: 1.6 }}>
      <span className="shrink-0 font-mono" style={{ color: tc(theme.textMuted, isDark) }}>{icon}</span>
      <span style={{ color: tc(theme.textSecondary, isDark), fontSize: 14 }}>{children}</span>
    </div>
  )
}

export function StateDeepDive({ techId }: { techId: string }) {
  const isDark = useIsDark()
  const [codeTab, setCodeTab] = useState<'standalone' | 'withRQ'>('standalone')

  const d = TECH_DATA[techId]
  if (!d) return <div>Tech not found: {techId}</div>

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3.5 mb-2">
          <span className="text-4xl">{d.icon}</span>
          <div>
            <h2 className="m-0 text-3xl font-bold" style={{ color: tc(theme.textPrimary, isDark) }}>
              {d.name}
            </h2>
            <p className="mt-1 mb-0 text-sm font-medium" style={{ color: d.color }}>
              {d.tagline}
            </p>
          </div>
        </div>
        <p className="mt-4 mb-0 text-sm" style={{ color: tc(theme.textSecondary, isDark), lineHeight: 1.7 }}>
          {d.description}
        </p>
      </div>

      {/* Quick Stats */}
      <div
        className="rounded-xl p-5 mb-7"
        style={{
          background: tc(theme.bgCard, isDark),
          border: `1px solid ${tc(theme.borderDefault, isDark)}`,
          boxShadow: tc(theme.shadowSm, isDark),
        }}
      >
        <MetaRow label="Bundle Size" value={d.bundle} isDark={isDark} />
        <MetaRow label="Boilerplate" value={d.boilerplate} isDark={isDark} />
        <MetaRow label="Learning Curve" value={d.learning} isDark={isDark} />
        <div className="pt-2 text-sm">
          <span style={{ color: tc(theme.textMuted, isDark) }}>Complexity</span>
          <div className="flex gap-1 mt-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-1.5 rounded-sm"
                style={{
                  width: 32,
                  background: i <= d.complexity ? d.color : tc(theme.borderDefault, isDark),
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Strengths / Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
        <div>
          <h3
            className="text-xs font-bold tracking-widest uppercase mb-3 font-mono"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Strengths
          </h3>
          {d.strengths.map((s, i) => (
            <ListItem key={i} icon={'\u2713'} isDark={isDark}>{s}</ListItem>
          ))}
        </div>
        <div>
          <h3
            className="text-xs font-bold tracking-widest uppercase mb-3 font-mono"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Weaknesses
          </h3>
          {d.weaknesses.map((w, i) => (
            <ListItem key={i} icon={'\u2717'} isDark={isDark}>{w}</ListItem>
          ))}
        </div>
      </div>

      {/* When to use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
        <div
          className="rounded-xl p-5"
          style={{
            background: `${d.color}12`,
            border: `1px solid ${d.color}30`,
          }}
        >
          <h3
            className="text-xs font-bold tracking-widest uppercase mb-3 font-mono"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Best for
          </h3>
          <p className="m-0 text-sm" style={{ color: tc(theme.textSecondary, isDark), lineHeight: 1.7 }}>
            {d.bestFor}
          </p>
        </div>
        <div
          className="rounded-xl p-5"
          style={{
            background: tc(theme.bgCard, isDark),
            border: `1px solid ${tc(theme.borderDefault, isDark)}`,
          }}
        >
          <h3
            className="text-xs font-bold tracking-widest uppercase mb-3 font-mono"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Avoid for
          </h3>
          <p className="m-0 text-sm" style={{ color: tc(theme.textSecondary, isDark), lineHeight: 1.7 }}>
            {d.avoidFor}
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <h3
        className="text-xs font-bold tracking-widest uppercase mb-3 font-mono"
        style={{ color: tc(theme.textMuted, isDark) }}
      >
        Code Examples
      </h3>
      <div className="flex gap-2 mb-4">
        {(['standalone', 'withRQ'] as const).map((tab) => {
          const active = codeTab === tab
          const tabColor = tab === 'standalone' ? d.color : SM_COLORS.rq
          return (
            <button
              key={tab}
              onClick={() => setCodeTab(tab)}
              className="font-mono text-sm whitespace-nowrap"
              style={{
                padding: '10px 20px',
                border: `1px solid ${active ? tabColor : tc(theme.borderDefault, isDark)}`,
                borderRadius: 10,
                background: active ? `${tabColor}15` : 'transparent',
                color: active ? tabColor : ds('#6b7280', '#8B9DB7', isDark),
                cursor: 'pointer',
                fontWeight: active ? 600 : 400,
                transition: 'all 0.2s ease',
              }}
            >
              {tab === 'standalone' ? 'Standalone Usage' : '+ React Query'}
            </button>
          )
        })}
      </div>
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
      >
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${codeTab === 'standalone' ? d.color : SM_COLORS.rq}, transparent)`,
          }}
        />
        <pre
          className="m-0 p-5 text-xs overflow-x-auto font-mono"
          style={{
            background: ds('#f8fafc', '#0A0D10', isDark),
            color: ds('#475569', '#8B9DB7', isDark),
            lineHeight: 1.7,
          }}
        >
          <code>{codeTab === 'standalone' ? d.codeExample : d.withReactQuery}</code>
        </pre>
      </div>
    </div>
  )
}
