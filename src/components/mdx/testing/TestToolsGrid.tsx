import { useState } from 'react'
import { TEST_TOOLS, TAG_COLORS } from '../../../data/testingData'
import type { TestType } from '../../../data/testingData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

const FILTER_OPTIONS: { id: TestType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unit', label: 'Unit' },
  { id: 'component', label: 'Component' },
  { id: 'e2e', label: 'E2E' },
]

export function TestToolsGrid() {
  const [filter, setFilter] = useState<TestType | 'all'>('all')
  const isDark = useIsDark()

  const filtered = filter === 'all'
    ? TEST_TOOLS
    : TEST_TOOLS.filter((t) => t.tags.includes(filter))

  return (
    <div>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {FILTER_OPTIONS.map((opt) => {
          const isActive = filter === opt.id
          const tagColor = opt.id !== 'all' ? TAG_COLORS[opt.id] : null
          return (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: isActive
                  ? `1.5px solid ${tagColor?.color ?? ds('#3b82f6', '#60a5fa', isDark)}`
                  : `1.5px solid ${ds('#e2e8f0', '#334155', isDark)}`,
                background: isActive
                  ? (tagColor ? (isDark ? tagColor.darkBg : tagColor.bg) : ds('#eff6ff', '#1e3a5f', isDark))
                  : 'transparent',
                color: isActive
                  ? (tagColor?.color ?? ds('#3b82f6', '#60a5fa', isDark))
                  : ds('#64748b', '#94a3b8', isDark),
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.82rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Tool cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '10px',
      }}>
        {filtered.map((tool) => (
          <div
            key={tool.id}
            style={{
              background: ds('#ffffff', '#1e293b', isDark),
              border: `1px solid ${ds('#e2e8f0', '#334155', isDark)}`,
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ds('#94a3b8', '#475569', isDark)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ds('#e2e8f0', '#334155', isDark)
            }}
          >
            <div style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: ds('#1e293b', '#e2e8f0', isDark),
              marginBottom: '4px',
            }}>
              {tool.name}
            </div>
            <div style={{
              fontSize: '0.78rem',
              color: ds('#64748b', '#94a3b8', isDark),
              marginBottom: '8px',
            }}>
              {tool.description}
            </div>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {tool.tags.map((tag) => {
                const tc = TAG_COLORS[tag]
                return (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      background: isDark ? tc.darkBg : tc.bg,
                      color: tc.color,
                    }}
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
