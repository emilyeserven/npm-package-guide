import parse from 'html-react-parser'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { CardBase } from '../CardBase'
import { StatusBadge } from '../StatusBadge'
import type {
  TsrTopicId,
  ComparisonFeature,
  CodeExample,
} from '../../../data/tanstackRouterData'
import {
  OVERVIEW_STATS,
  OVERVIEW_INTRO,
  OVERVIEW_DETAIL,
  FOUR_CONTENDERS,
  TYPE_SAFETY_INTRO,
  TYPE_SAFETY_TAKEAWAY,
  CODE_EXAMPLES,
  SEARCH_PARAMS_INTRO,
  SEARCH_PARAMS_RR_DESC,
  SEARCH_PARAMS_NEXT_DESC,
  STRUCTURAL_SHARING_DESC,
  DATA_LOADING_INTRO,
  LOADER_COMPARISONS,
  ROUTING_INTRO,
  ROUTING_COMPARISONS,
  CODE_SPLIT_INTRO,
  CODE_SPLIT_COMPARISONS,
  COMPARISON_INTRO,
  COMPARISON_FEATURES,
  UNIQUE_INTRO,
  UNIQUE_FEATURES,
  WEAKNESSES_INTRO,
  WEAKNESSES,
  SEVERITY_COLORS,
  VERDICT_INTRO,
  VERDICT_BOTTOM_LINE,
  USE_CASE_SCENARIOS,
} from '../../../data/tanstackRouterData'

// ── Shared helpers ──────────────────────────────────────────────────

function Badge({ label, color, isDark }: { label: string; color: string; isDark: boolean }) {
  const isLight = color === '#ffffff' || color === '#fff'
  return (
    <span
      className="inline-block rounded-full text-xs font-bold uppercase tracking-wide mr-1.5 mb-1"
      style={{
        padding: '2px 10px',
        letterSpacing: '0.5px',
        background: isDark ? color : color,
        color: isLight ? '#000' : '#fff',
      }}
    >
      {label}
    </span>
  )
}

function TsrCodeBlock({ code, label, isDark }: { code: string; label?: string; isDark: boolean }) {
  return (
    <div className="mb-4">
      {label && (
        <div
          className="font-mono text-xs uppercase mb-1.5 font-semibold"
          style={{ letterSpacing: '1.5px', color: tc(theme.textMuted, isDark) }}
        >
          {label}
        </div>
      )}
      <pre
        className="rounded-xl border p-4 overflow-x-auto text-xs leading-relaxed font-mono m-0"
        style={{
          background: ds('#f8fafc', '#0f172a', isDark),
          borderColor: ds('#e2e8f0', '#1e293b', isDark),
          color: ds('#334155', '#cbd5e1', isDark),
        }}
      >
        {code}
      </pre>
    </div>
  )
}

function renderCodeExamples(sectionId: string, isDark: boolean) {
  const examples: CodeExample[] | undefined = CODE_EXAMPLES[sectionId]
  if (!examples) return null
  return (
    <>
      {examples.map((ex, i) => (
        <TsrCodeBlock key={i} code={ex.code} label={ex.label} isDark={isDark} />
      ))}
    </>
  )
}

// ── Section renderers ───────────────────────────────────────────────

function OverviewSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {parse(OVERVIEW_INTRO)}
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {parse(OVERVIEW_DETAIL)}
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {OVERVIEW_STATS.map((s) => (
          <CardBase key={s.label}>
            <div className="text-center py-2">
              <div className="text-2xl font-extrabold" style={{ color: '#e94560' }}>
                {s.num}
              </div>
              <div
                className="text-xs uppercase mt-1 font-semibold"
                style={{ letterSpacing: '1px', color: tc(theme.textMuted, isDark) }}
              >
                {s.label}
              </div>
            </div>
          </CardBase>
        ))}
      </div>

      {/* Four contenders */}
      <CardBase>
        <div
          className="text-xs uppercase font-bold mb-3"
          style={{ letterSpacing: '1px', color: '#e94560' }}
        >
          The Four Contenders
        </div>
        <div className="flex flex-col gap-2.5">
          {FOUR_CONTENDERS.map((r) => (
            <div key={r.badge} className="flex items-start gap-2.5">
              <Badge label={r.badge} color={r.color} isDark={isDark} />
              <span
                className="text-sm leading-relaxed"
                style={{ color: tc(theme.textSecondary, isDark) }}
              >
                {r.desc}
              </span>
            </div>
          ))}
        </div>
      </CardBase>
    </div>
  )
}

function TypeSafetySection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {parse(TYPE_SAFETY_INTRO)}
      </p>
      {renderCodeExamples('typesafety', isDark)}
      <div
        className="rounded-xl border p-4"
        style={{
          background: ds('#fef2f2', '#991b1b22', isDark),
          borderColor: ds('#fca5a5', '#e94560', isDark),
        }}
      >
        <strong className="text-sm" style={{ color: '#e94560' }}>Key Takeaway: </strong>
        <span className="text-sm" style={{ color: tc(theme.textSecondary, isDark) }}>
          {TYPE_SAFETY_TAKEAWAY}
        </span>
      </div>
    </div>
  )
}

function SearchParamsSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {parse(SEARCH_PARAMS_INTRO)}
      </p>
      {renderCodeExamples('searchparams', isDark)}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CardBase>
          <div
            className="text-xs uppercase font-bold mb-2"
            style={{ letterSpacing: '1px', color: '#f44250' }}
          >
            React Router
          </div>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {parse(SEARCH_PARAMS_RR_DESC)}
          </p>
        </CardBase>
        <CardBase>
          <div
            className="text-xs uppercase font-bold mb-2"
            style={{ letterSpacing: '1px', color: tc(theme.textPrimary, isDark) }}
          >
            Next.js
          </div>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {parse(SEARCH_PARAMS_NEXT_DESC)}
          </p>
        </CardBase>
      </div>
      <CardBase>
        <div
          className="text-xs uppercase font-bold mb-2"
          style={{ letterSpacing: '1px', color: '#4ade80' }}
        >
          Structural Sharing
        </div>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: tc(theme.textSecondary, isDark) }}
        >
          {parse(STRUCTURAL_SHARING_DESC)}
        </p>
      </CardBase>
    </div>
  )
}

function DataLoadingSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {parse(DATA_LOADING_INTRO)}
      </p>
      {renderCodeExamples('dataloading', isDark)}
      <div className="flex flex-col gap-3">
        {LOADER_COMPARISONS.map((c) => (
          <CardBase key={c.badge}>
            <Badge label={c.badge} color={c.color} isDark={isDark} />
            <p
              className="text-sm leading-relaxed m-0 mt-2"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {parse(c.desc)}
            </p>
          </CardBase>
        ))}
      </div>
    </div>
  )
}

function RoutingSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {parse(ROUTING_INTRO)}
      </p>
      {renderCodeExamples('routing', isDark)}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ROUTING_COMPARISONS.map((c) => (
          <CardBase key={c.badge}>
            <Badge label={c.badge} color={c.color} isDark={isDark} />
            <p
              className="text-sm leading-relaxed m-0 mt-2"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {parse(c.desc)}
            </p>
          </CardBase>
        ))}
      </div>
    </div>
  )
}

function CodeSplitSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {parse(CODE_SPLIT_INTRO)}
      </p>
      {renderCodeExamples('codesplit', isDark)}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CODE_SPLIT_COMPARISONS.map((c) => (
          <CardBase key={c.label}>
            <Badge label={c.label} color={c.color} isDark={isDark} />
            <p
              className="text-xs leading-relaxed m-0 mt-2"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {c.text}
            </p>
          </CardBase>
        ))}
      </div>
    </div>
  )
}

function statusColor(val: string): string {
  if (val === '\u2705') return '#4ade80'
  if (val === '\u274C') return '#f87171'
  if (val === '\u{1F7E1}') return '#facc15'
  return '#94a3b8'
}

function ComparisonSection({ isDark }: { isDark: boolean }) {
  const headerStyle: React.CSSProperties = {
    padding: '10px 12px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: `2px solid ${ds('#e2e8f0', '#334155', isDark)}`,
    textAlign: 'center',
    background: tc(theme.bgCard, isDark),
  }

  const cellStyle = (val: string): React.CSSProperties => ({
    padding: '8px 12px',
    textAlign: 'center',
    fontSize: '13px',
    color: statusColor(val),
    borderBottom: `1px solid ${ds('#f1f5f9', '#1e293b', isDark)}`,
  })

  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {COMPARISON_INTRO}{' '}
        <span style={{ color: '#4ade80' }}>{'\u2705'}</span> = first-class support,{' '}
        <span style={{ color: '#facc15' }}>{'\u{1F7E1}'}</span> = partial/community,{' '}
        <span style={{ color: '#f87171' }}>{'\u274C'}</span> = not available.
      </p>
      <div
        className="overflow-x-auto rounded-xl border"
        style={{ borderColor: ds('#e2e8f0', '#334155', isDark) }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: tc(theme.bgCard, isDark),
            minWidth: '600px',
          }}
        >
          <thead>
            <tr>
              <th style={{ ...headerStyle, textAlign: 'left', color: tc(theme.textMuted, isDark) }}>Feature</th>
              <th style={{ ...headerStyle, color: '#e94560' }}>TanStack Router</th>
              <th style={{ ...headerStyle, color: '#f44250' }}>React Router (Library)</th>
              <th style={{ ...headerStyle, color: '#3992ff' }}>React Router (Framework)</th>
              <th style={{ ...headerStyle, color: ds('#1e293b', '#fff', isDark) }}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_FEATURES.map((row: ComparisonFeature) => (
              <tr key={row.feature}>
                <td
                  style={{
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: tc(theme.textPrimary, isDark),
                    borderBottom: `1px solid ${ds('#f1f5f9', '#1e293b', isDark)}`,
                  }}
                >
                  {row.feature}
                </td>
                <td style={cellStyle(row.tanstack)}>{row.tanstack}</td>
                <td style={cellStyle(row.reactRouter)}>{row.reactRouter}</td>
                <td style={cellStyle(row.reactFramework)}>{row.reactFramework}</td>
                <td style={cellStyle(row.nextjs)}>{row.nextjs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function UniqueSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {UNIQUE_INTRO}
      </p>
      <div className="flex flex-col gap-2.5">
        {UNIQUE_FEATURES.map((f, i) => (
          <CardBase key={i} accentColor="#e94560">
            <div
              className="text-sm font-bold mb-1"
              style={{ color: tc(theme.textPrimary, isDark) }}
            >
              {f.title}
            </div>
            <div
              className="text-xs leading-relaxed"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {f.desc}
            </div>
          </CardBase>
        ))}
      </div>
    </div>
  )
}

function WeaknessesSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {WEAKNESSES_INTRO}
      </p>
      <div className="flex flex-col gap-2.5">
        {WEAKNESSES.map((w, i) => (
          <CardBase key={i} accentColor={SEVERITY_COLORS[w.severity]}>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-sm font-bold"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {w.title}
              </span>
              <StatusBadge
                label={w.severity}
                colors={{
                  bg: `${SEVERITY_COLORS[w.severity]}15`,
                  darkBg: `${SEVERITY_COLORS[w.severity]}22`,
                  text: SEVERITY_COLORS[w.severity],
                  darkText: SEVERITY_COLORS[w.severity],
                }}
              />
            </div>
            <div
              className="text-xs leading-relaxed"
              style={{ color: tc(theme.textSecondary, isDark) }}
            >
              {w.desc}
            </div>
          </CardBase>
        ))}
      </div>
    </div>
  )
}

function VerdictSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm leading-relaxed"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {VERDICT_INTRO}
      </p>
      <div className="flex flex-col gap-3.5">
        {USE_CASE_SCENARIOS.map((s) => (
          <div
            key={s.router}
            className="rounded-xl border p-5"
            style={{
              background: tc(theme.bgCard, isDark),
              borderColor: ds('#e2e8f0', '#334155', isDark),
              borderTop: `3px solid ${s.color}`,
            }}
          >
            <Badge label={s.router} color={s.color} isDark={isDark} />
            <div className="flex flex-col gap-1.5 mt-2.5">
              {s.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className="text-sm leading-5 shrink-0"
                    style={{ color: s.color === '#fff' ? ds('#1e293b', '#fff', isDark) : s.color }}
                  >
                    {'\u2192'}
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: tc(theme.textSecondary, isDark) }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl border p-5"
        style={{
          background: ds('#fef2f2', '#991b1b22', isDark),
          borderColor: ds('#fca5a5', '#e94560', isDark),
        }}
      >
        <div className="text-sm font-bold mb-2" style={{ color: '#e94560' }}>
          The Bottom Line
        </div>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: tc(theme.textSecondary, isDark) }}
        >
          {VERDICT_BOTTOM_LINE}
        </p>
      </div>
    </div>
  )
}

// ── Section map ─────────────────────────────────────────────────────

const SECTION_RENDERERS: Record<TsrTopicId, React.FC<{ isDark: boolean }>> = {
  overview: OverviewSection,
  typesafety: TypeSafetySection,
  searchparams: SearchParamsSection,
  dataloading: DataLoadingSection,
  routing: RoutingSection,
  codesplit: CodeSplitSection,
  comparison: ComparisonSection,
  unique: UniqueSection,
  weaknesses: WeaknessesSection,
  verdict: VerdictSection,
}

/**
 * Renders the content for a TanStack Router guide topic.
 * Used in per-topic MDX pages: `<TsrTopicDetail topicId="overview" />`
 */
export function TsrTopicDetail({ topicId }: { topicId: string }) {
  const isDark = useIsDark()
  const Renderer = SECTION_RENDERERS[topicId as TsrTopicId]
  if (!Renderer) return null
  return <Renderer isDark={isDark} />
}
