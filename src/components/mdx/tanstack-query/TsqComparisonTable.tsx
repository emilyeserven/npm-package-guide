import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'
import {
  TSQ_FEATURES,
  TSQ_FEATURE_CATEGORIES,
  type FeatureCategory,
} from '../../../data/tanstackQueryData'

export function TsqComparisonTable() {
  const isDark = useIsDark()
  const [highlight, setHighlight] = useState<FeatureCategory | null>(null)

  const filtered = highlight
    ? TSQ_FEATURES.filter((f) => f.category === highlight)
    : TSQ_FEATURES

  const accent = ds('#d97706', '#f59e0b', isDark)
  const teal = ds('#0d9488', '#14b8a6', isDark)

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: tc(theme.bgCard, isDark),
        border: `1px solid ${tc(theme.borderDefault, isDark)}`,
      }}
    >
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setHighlight(null)}
          className="rounded-full font-mono text-xs cursor-pointer transition-all"
          style={{
            padding: '4px 12px',
            border: `1px solid ${!highlight ? accent : tc(theme.borderDefault, isDark)}`,
            background: !highlight ? `${accent}18` : 'transparent',
            color: !highlight ? accent : tc(theme.textMuted, isDark),
          }}
        >
          All
        </button>
        {TSQ_FEATURE_CATEGORIES.map((cat) => {
          const c = ds(cat.color[0], cat.color[1], isDark)
          return (
            <button
              key={cat.key}
              onClick={() => setHighlight(cat.key)}
              className="rounded-full font-mono text-xs cursor-pointer transition-all"
              style={{
                padding: '4px 12px',
                border: `1px solid ${highlight === cat.key ? c : tc(theme.borderDefault, isDark)}`,
                background: highlight === cat.key ? `${c}18` : 'transparent',
                color: highlight === cat.key ? c : tc(theme.textMuted, isDark),
              }}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th
                className="text-left font-mono text-xs font-medium"
                style={{
                  padding: '8px 12px',
                  color: tc(theme.textMuted, isDark),
                  borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}`,
                }}
              >
                Feature
              </th>
              {['fetch()', 'XHR', 'Axios', 'TanStack Query'].map((h, i) => (
                <th
                  key={h}
                  className="text-center font-mono text-xs"
                  style={{
                    padding: '8px 12px',
                    borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}`,
                    color: i === 3 ? accent : tc(theme.textMuted, isDark),
                    fontWeight: i === 3 ? 700 : 500,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => {
              const cat = TSQ_FEATURE_CATEGORIES.find((c) => c.key === f.category)
              const catColor = cat ? ds(cat.color[0], cat.color[1], isDark) : teal
              return (
                <tr
                  key={f.name}
                  style={{
                    background:
                      i % 2 === 0
                        ? 'transparent'
                        : ds('rgba(0,0,0,0.02)', 'rgba(255,255,255,0.015)', isDark),
                  }}
                >
                  <td
                    style={{
                      padding: '7px 12px',
                      color: tc(theme.textSecondary, isDark),
                      borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}22`,
                    }}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                      style={{ background: catColor, opacity: 0.7 }}
                    />
                    {f.name}
                  </td>
                  {[f.fetch, f.xhr, f.axios, f.rq].map((val, j) => (
                    <td
                      key={j}
                      className="text-center text-sm"
                      style={{
                        padding: '7px 12px',
                        borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}22`,
                        color: val ? teal : tc(theme.textMuted, isDark),
                      }}
                    >
                      {val ? '\u2713' : '\u2014'}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
