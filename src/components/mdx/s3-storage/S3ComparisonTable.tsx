import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { STORAGE_CLASSES } from '../../../data/s3Data'
import type { CostTier } from '../../../data/s3Data'

const TIER_COLORS: Record<CostTier, { light: string; dark: string }> = {
  low:  { light: '#0d9488', dark: '#5eead4' },
  med:  { light: '#d97706', dark: '#fcd34d' },
  high: { light: '#e11d48', dark: '#fda4af' },
}

function CostCell({ tier, children, isDark }: { tier: CostTier; children: React.ReactNode; isDark: boolean }) {
  return (
    <td
      className="px-4 py-3 text-sm border-b"
      style={{
        color: isDark ? TIER_COLORS[tier].dark : TIER_COLORS[tier].light,
        borderColor: isDark ? '#334155' : '#e2e8f0',
      }}
    >
      {children}
    </td>
  )
}

function ExpandSection({ title, children, isDark }: { title: string; children: React.ReactNode; isDark: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-2">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium border cursor-pointer"
        style={{
          background: 'transparent',
          borderColor: isDark ? '#334155' : '#e2e8f0',
          color: isDark ? '#f1f5f9' : '#1e293b',
        }}
      >
        {title}
        <span
          className="text-xs transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        >
          {'\u25BC'}
        </span>
      </button>
      {open && (
        <div
          className="px-4 pt-3 pb-1 text-sm leading-relaxed"
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export function S3ComparisonTable() {
  const isDark = useIsDark()

  const thStyle: React.CSSProperties = {
    background: isDark ? '#1a1f2b' : '#f8fafc',
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: 500,
    color: isDark ? '#f1f5f9' : '#1e293b',
    borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    whiteSpace: 'nowrap',
    fontFamily: 'ui-monospace, monospace',
    fontSize: 11,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  }

  const tdStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    color: isDark ? '#94a3b8' : '#64748b',
    fontSize: 13,
    verticalAlign: 'top',
  }

  const tdNameStyle: React.CSSProperties = {
    ...tdStyle,
    fontFamily: 'ui-monospace, monospace',
    fontWeight: 500,
    color: isDark ? '#f1f5f9' : '#1e293b',
    whiteSpace: 'nowrap',
  }

  return (
    <div>
      <div
        className="overflow-x-auto rounded-xl border"
        style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
      >
        <table className="w-full border-collapse" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th style={thStyle}>Class</th>
              <th style={thStyle}>Storage $/GB/mo</th>
              <th style={thStyle}>Retrieval Fee</th>
              <th style={thStyle}>Retrieval Speed</th>
              <th style={thStyle}>Availability</th>
              <th style={thStyle}>Durability</th>
              <th style={thStyle}>Min Duration</th>
            </tr>
          </thead>
          <tbody>
            {STORAGE_CLASSES.map((sc, i) => (
              <tr
                key={sc.id}
                style={i === STORAGE_CLASSES.length - 1 ? {} : undefined}
              >
                <td style={tdNameStyle}>{sc.name.replace('S3 ', '')}</td>
                <CostCell tier={sc.storageCostTier} isDark={isDark}>
                  ${sc.storageCostPerGB}
                </CostCell>
                <CostCell tier={sc.retrievalCostTier} isDark={isDark}>
                  {sc.retrievalCostLabel}
                </CostCell>
                <td style={tdStyle}>{sc.retrievalSpeed}</td>
                <td style={tdStyle}>{sc.availability}</td>
                <td style={tdStyle}>{sc.durability}</td>
                <td style={tdStyle}>{sc.minDuration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Durability explainer */}
      <div
        className="mt-6 rounded-xl border-l-4 py-4 px-5"
        style={{
          background: isDark ? '#1e293b' : '#ffffff',
          borderLeftColor: isDark ? '#f0a840' : '#d97706',
        }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-1"
          style={{ color: isDark ? '#f0a840' : '#d97706' }}
        >
          {'\u{1F4CC}'} What does &ldquo;11 9&apos;s durability&rdquo; mean?
        </div>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
        >
          <strong style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>99.999999999%</strong> &mdash; if you stored 10,000,000 objects,
          you&apos;d statistically lose one every 10 million years. Your data is extremely safe.
          Availability (can I reach it right now?) is a different question &mdash; that ranges from 99.5% to 99.99%.
        </p>
      </div>

      {/* Expandable details */}
      <div className="mt-6 flex flex-col gap-2">
        <ExpandSection title="What's &quot;Minimum Storage Duration&quot;?" isDark={isDark}>
          <p className="m-0">
            If you upload a file to Glacier Deep Archive and delete it after 10 days, you still get
            charged for the full 180-day minimum. It&apos;s like a minimum lease on a storage unit.
            Standard has no minimum &mdash; delete anytime.
          </p>
        </ExpandSection>
        <ExpandSection title="What are retrieval fees in practice?" isDark={isDark}>
          <p className="m-0">
            If you store 100 GB in Glacier Instant and retrieve 10 GB one month, you
            pay <code>$0.004 &times; 100</code> = $0.40 for storage + <code>$0.03 &times; 10</code> = $0.30
            for retrieval = <strong>$0.70 total</strong>. On Standard, the same would
            cost <code>$0.023 &times; 100</code> = <strong>$2.30</strong> &mdash; but no retrieval fee.
            If you access that data frequently, Standard is cheaper overall.
          </p>
        </ExpandSection>
      </div>
    </div>
  )
}
