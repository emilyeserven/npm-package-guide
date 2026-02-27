import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { CardBase } from '../CardBase'
import { StatusBadge } from '../StatusBadge'
import { useNavigateToSection } from '../../../hooks/useNavigateToSection'
import type { AwsCategoryId, AwsService } from '../../../data/awsDecodedData/types'
import { AWS_CATEGORIES, LEVEL_COLORS } from '../../../data/awsDecodedData/categories'
import { SERVICE_BY_CATEGORY } from '../../../data/awsDecodedData'

// ── Level badge colors ──────────────────────────────────────────────

function levelBadgeColors(level: string) {
  const c = LEVEL_COLORS[level] ?? '#94a3b8'
  return {
    bg: `${c}15`,
    darkBg: `${c}22`,
    text: c,
    darkText: c,
    border: `${c}40`,
    darkBorder: `${c}40`,
  }
}

// ── Code block ──────────────────────────────────────────────────────

function CodeBlock({ code, isDark }: { code: string; isDark: boolean }) {
  return (
    <pre
      className="rounded-lg border p-4 overflow-x-auto text-xs leading-relaxed font-mono m-0"
      style={{
        background: ds('#f8fafc', '#0f172a', isDark),
        borderColor: ds('#e2e8f0', '#1e293b', isDark),
        color: ds('#334155', '#cbd5e1', isDark),
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {code}
    </pre>
  )
}

// ── Service card (expandable) ───────────────────────────────────────

function ServiceCard({ service, isDark }: { service: AwsService; isDark: boolean }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigateToSection()
  const cat = AWS_CATEGORIES[service.cat]
  const color = cat.color

  return (
    <div
      className="rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer"
      style={{
        background: tc(theme.bgCard, isDark),
        borderColor: open ? color : ds('#e2e8f0', '#334155', isDark),
        borderTopWidth: open ? '3px' : '1px',
        borderTopColor: open ? color : undefined,
      }}
      onClick={() => setOpen(!open)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open) } }}
    >
      {/* Header (always visible) */}
      <div className="p-5">
        <div className="flex items-start gap-3.5 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
            style={{ background: `${color}18`, color }}
          >
            {service.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-base font-bold"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {service.name}
              </span>
              <StatusBadge label={service.level} colors={levelBadgeColors(service.level)} uppercase={false} />
            </div>
            <div
              className="font-mono text-xs mt-0.5"
              style={{ color: tc(theme.textMuted, isDark) }}
            >
              {service.fullName}
            </div>
          </div>
          <span
            className="text-sm shrink-0 transition-transform duration-200"
            style={{
              color: tc(theme.textMuted, isDark),
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            {'\u25BC'}
          </span>
        </div>

        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: tc(theme.textSecondary, isDark) }}
        >
          {service.short}
        </p>

        {/* Analogy teaser */}
        <div
          className="mt-3 rounded-lg px-3.5 py-2.5 text-xs leading-relaxed"
          style={{
            background: ds('#f8fafc', '#0f172a', isDark),
            borderLeft: `3px solid ${color}`,
            color: tc(theme.textSecondary, isDark),
          }}
        >
          <strong style={{ color: tc(theme.textPrimary, isDark) }}>{'\u{1F4A1}'} Think of it as: </strong>
          {service.analogy}
        </div>

        {/* Free tier tag */}
        {service.pricing.toLowerCase().includes('free') && (
          <div className="mt-2.5 flex">
            <span
              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                color: '#4ecb8d',
                background: 'rgba(78,203,141,0.1)',
                border: '1px solid rgba(78,203,141,0.25)',
              }}
            >
              has free tier
            </span>
          </div>
        )}
      </div>

      {/* Expanded detail */}
      {open && (
        <div
          className="px-5 pb-5 flex flex-col gap-5 border-t"
          style={{ borderColor: ds('#f1f5f9', '#1e293b', isDark) }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Full detail */}
          <div className="pt-4">
            <div
              className="text-xs uppercase font-bold mb-2 tracking-wide"
              style={{ color, letterSpacing: '1px' }}
            >
              What is it?
            </div>
            <p
              className="text-sm leading-relaxed m-0"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {service.detail}
            </p>
          </div>

          {/* Use cases */}
          <div>
            <div
              className="text-xs uppercase font-bold mb-2 tracking-wide"
              style={{ color, letterSpacing: '1px' }}
            >
              When would I use this?
            </div>
            <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
              {service.useCases.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: tc(theme.textSecondary, isDark) }}>
                  <span style={{ color }} className="shrink-0">{'\u2192'}</span>
                  {u}
                </li>
              ))}
            </ul>
          </div>

          {/* Key terms */}
          <div>
            <div
              className="text-xs uppercase font-bold mb-2 tracking-wide"
              style={{ color, letterSpacing: '1px' }}
            >
              Key Terms Decoded
            </div>
            <div className="flex flex-col gap-1.5">
              {Object.entries(service.keyTerms).map(([k, v]) => (
                <div key={k} className="flex items-start gap-2 text-sm" style={{ color: tc(theme.textSecondary, isDark) }}>
                  <span style={{ color }} className="shrink-0">{'\u2192'}</span>
                  <span><strong style={{ color: tc(theme.textPrimary, isDark) }}>{k}:</strong> {v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code example */}
          {service.code && (
            <div>
              <div
                className="text-xs uppercase font-bold mb-2 tracking-wide"
                style={{ color, letterSpacing: '1px' }}
              >
                Code Example
              </div>
              <CodeBlock code={service.code} isDark={isDark} />
            </div>
          )}

          {/* Pricing */}
          <div
            className="flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm"
            style={{
              background: 'rgba(78,203,141,0.06)',
              borderColor: 'rgba(78,203,141,0.15)',
              color: '#4ecb8d',
            }}
          >
            <span className="shrink-0">{'\u{1F4B0}'}</span>
            {service.pricing}
          </div>

          {/* View full details link */}
          <button
            className="self-start text-sm font-semibold border-none bg-transparent cursor-pointer px-0 py-0"
            style={{ color }}
            onClick={() => navigate(`aws-${service.id}`)}
          >
            View full details {'\u2192'}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────

/**
 * Renders all AWS services for a given category as expandable cards.
 * Used in per-category MDX pages: `<AwsServiceExplorer categoryId="compute" />`
 */
export function AwsServiceExplorer({ categoryId }: { categoryId: string }) {
  const isDark = useIsDark()
  const catId = categoryId as AwsCategoryId
  const services = SERVICE_BY_CATEGORY[catId]
  const cat = AWS_CATEGORIES[catId]

  if (!services || !cat) return null

  const beginnerCount = services.filter(s => s.level === 'beginner').length
  const intermediateCount = services.filter(s => s.level === 'intermediate').length
  const advancedCount = services.filter(s => s.level === 'advanced').length

  return (
    <div className="flex flex-col gap-5">
      {/* Category summary */}
      <CardBase>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{cat.icon}</span>
          <span
            className="text-lg font-bold"
            style={{ color: tc(theme.textPrimary, isDark) }}
          >
            {services.length} services
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {beginnerCount > 0 && (
            <StatusBadge
              label={`${beginnerCount} beginner`}
              colors={levelBadgeColors('beginner')}
              uppercase={false}
            />
          )}
          {intermediateCount > 0 && (
            <StatusBadge
              label={`${intermediateCount} intermediate`}
              colors={levelBadgeColors('intermediate')}
              uppercase={false}
            />
          )}
          {advancedCount > 0 && (
            <StatusBadge
              label={`${advancedCount} advanced`}
              colors={levelBadgeColors('advanced')}
              uppercase={false}
            />
          )}
        </div>
      </CardBase>

      {/* Service cards */}
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} isDark={isDark} />
      ))}
    </div>
  )
}
