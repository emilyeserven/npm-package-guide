import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { CardBase } from '../CardBase'
import { StatusBadge } from '../StatusBadge'
import { CopyButton } from '../CopyButton'
import { NavPill } from '../NavLink'
import { getAwsService, AWS_CATEGORIES, LEVEL_COLORS } from '../../../data/awsDecodedData'
import type { AwsService } from '../../../data/awsDecodedData/types'
import { guides } from '../../../data/guideRegistry'

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

function CodeBlock({ code, label, isDark, color }: { code: string; label: string; isDark: boolean; color: string }) {
  return (
    <div>
      <div
        className="text-xs uppercase font-bold mb-2 tracking-wide"
        style={{ color, letterSpacing: '1px' }}
      >
        {label}
      </div>
      <div className="relative">
        <CopyButton text={code} />
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
      </div>
    </div>
  )
}

function SectionHeading({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      className="text-xs uppercase font-bold mb-3 tracking-wide"
      style={{ color, letterSpacing: '1px' }}
    >
      {children}
    </div>
  )
}

function ServiceHeader({ service, isDark, color }: { service: AwsService; isDark: boolean; color: string }) {
  const cat = AWS_CATEGORIES[service.cat]
  return (
    <div className="flex items-start gap-4 mb-2">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
        style={{ background: `${color}18`, color }}
      >
        {service.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap mb-1">
          <span
            className="text-xl font-bold"
            style={{ color: tc(theme.textPrimary, isDark) }}
          >
            {service.name}
          </span>
          <StatusBadge label={service.level} colors={levelBadgeColors(service.level)} uppercase={false} />
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: `${color}15`,
              color,
              border: `1px solid ${color}30`,
            }}
          >
            {cat.icon} {cat.label}
          </span>
        </div>
        <div
          className="font-mono text-sm"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          {service.fullName}
        </div>
      </div>
    </div>
  )
}

export function AwsServicePage({ serviceId }: { serviceId: string }) {
  const isDark = useIsDark()
  const service = getAwsService(serviceId)

  if (!service) {
    return <p>Service &quot;{serviceId}&quot; not found.</p>
  }

  const cat = AWS_CATEGORIES[service.cat]
  const color = cat.color

  const relatedGuideDefs = (service.relatedGuides ?? [])
    .map(gid => guides.find(g => g.id === gid))
    .filter(Boolean)

  const relatedServiceData = (service.relatedServices ?? [])
    .map(sid => getAwsService(sid))
    .filter(Boolean)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <ServiceHeader service={service} isDark={isDark} color={color} />

      {/* One-liner */}
      <p
        className="text-base leading-relaxed m-0"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        {service.short}
      </p>

      {/* Analogy */}
      <div
        className="rounded-lg px-4 py-3 text-sm leading-relaxed"
        style={{
          background: ds('#f8fafc', '#0f172a', isDark),
          borderLeft: `4px solid ${color}`,
          color: tc(theme.textSecondary, isDark),
        }}
      >
        <strong style={{ color: tc(theme.textPrimary, isDark) }}>{'\u{1F4A1}'} Think of it as: </strong>
        {service.analogy}
      </div>

      {/* Dedicated guide callout */}
      {relatedGuideDefs.length > 0 && (
        <CardBase accentColor="#6366f1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{'\u{1F4DA}'}</span>
            <span
              className="text-sm font-bold"
              style={{ color: tc(theme.textPrimary, isDark) }}
            >
              Want to go deeper?
            </span>
          </div>
          <p
            className="text-sm m-0 mb-3"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            We have dedicated guides that cover this topic in detail:
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedGuideDefs.map(g => (
              <NavPill key={g!.id} to={g!.startPageId}>
                {g!.icon} {g!.title}
              </NavPill>
            ))}
          </div>
        </CardBase>
      )}

      {/* What is it? */}
      <div>
        <SectionHeading color={color}>What is it?</SectionHeading>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: tc(theme.textSecondary, isDark) }}
        >
          {service.detail}
        </p>
      </div>

      {/* How it works (extended) */}
      {service.howItWorks && (
        <div>
          <SectionHeading color={color}>How it works</SectionHeading>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: tc(theme.textSecondary, isDark) }}
          >
            {service.howItWorks}
          </p>
        </div>
      )}

      {/* Use cases */}
      <div>
        <SectionHeading color={color}>When would I use this?</SectionHeading>
        <ul className="flex flex-col gap-2 m-0 p-0 list-none">
          {service.useCases.map((u, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: tc(theme.textSecondary, isDark) }}>
              <span style={{ color }} className="shrink-0">{'\u2192'}</span>
              {u}
            </li>
          ))}
        </ul>
      </div>

      {/* Key terms */}
      <CardBase>
        <SectionHeading color={color}>Key Terms Decoded</SectionHeading>
        <div className="flex flex-col gap-2">
          {Object.entries(service.keyTerms).map(([k, v]) => (
            <div key={k} className="flex items-start gap-2 text-sm" style={{ color: tc(theme.textSecondary, isDark) }}>
              <span style={{ color }} className="shrink-0">{'\u2192'}</span>
              <span><strong style={{ color: tc(theme.textPrimary, isDark) }}>{k}:</strong> {v}</span>
            </div>
          ))}
        </div>
      </CardBase>

      {/* Code examples */}
      {(service.code || service.cliExample || service.cdkExample) && (
        <div className="flex flex-col gap-4">
          {service.code && (
            <CodeBlock code={service.code} label="Code Example" isDark={isDark} color={color} />
          )}
          {service.cliExample && (
            <CodeBlock code={service.cliExample} label="AWS CLI" isDark={isDark} color={color} />
          )}
          {service.cdkExample && (
            <CodeBlock code={service.cdkExample} label="CDK / Infrastructure as Code" isDark={isDark} color={color} />
          )}
        </div>
      )}

      {/* Gotchas */}
      {service.gotchas && service.gotchas.length > 0 && (
        <CardBase accentColor="#f59e0b">
          <SectionHeading color="#f59e0b">{'\u26A0\uFE0F'} Common Gotchas</SectionHeading>
          <ul className="flex flex-col gap-2 m-0 p-0 list-none">
            {service.gotchas.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: tc(theme.textSecondary, isDark) }}>
                <span className="shrink-0" style={{ color: '#f59e0b' }}>{'\u2022'}</span>
                {g}
              </li>
            ))}
          </ul>
        </CardBase>
      )}

      {/* When NOT to use */}
      {service.whenNotToUse && service.whenNotToUse.length > 0 && (
        <CardBase accentColor="#ef4444">
          <SectionHeading color="#ef4444">{'\u{1F6AB}'} When NOT to use this</SectionHeading>
          <ul className="flex flex-col gap-2 m-0 p-0 list-none">
            {service.whenNotToUse.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: tc(theme.textSecondary, isDark) }}>
                <span className="shrink-0" style={{ color: '#ef4444' }}>{'\u2717'}</span>
                {w}
              </li>
            ))}
          </ul>
        </CardBase>
      )}

      {/* Related services */}
      {relatedServiceData.length > 0 && (
        <div>
          <SectionHeading color={color}>Related AWS Services</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {relatedServiceData.map(s => (
              <NavPill key={s!.id} to={`aws-${s!.id}`}>
                {s!.icon} {s!.name}
              </NavPill>
            ))}
          </div>
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

      {/* Free tier tag */}
      {service.pricing.toLowerCase().includes('free') && (
        <div className="flex">
          <span
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              color: '#4ecb8d',
              background: 'rgba(78,203,141,0.1)',
              border: '1px solid rgba(78,203,141,0.25)',
            }}
          >
            {'\u2713'} has free tier
          </span>
        </div>
      )}
    </div>
  )
}
