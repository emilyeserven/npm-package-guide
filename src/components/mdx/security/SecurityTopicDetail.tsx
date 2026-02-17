import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { getSecurityTopic, THREAT_LEVEL_COLORS } from '../../../data/securityData'
import type { ThreatLevel } from '../../../data/securityData'
import { CardBase } from '../CardBase'
import { StatusBadge } from '../StatusBadge'

function threatBadgeColors(level: ThreatLevel) {
  const c = THREAT_LEVEL_COLORS[level]
  return { bg: c.bg, darkBg: c.darkBg, text: c.badge, darkText: c.darkBadge, border: c.border, darkBorder: c.darkBorder }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const isDark = useIsDark()

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="absolute top-2 right-2 px-2.5 py-1 rounded text-xs font-mono border transition-colors cursor-pointer"
      style={{
        background: copied
          ? ds('#dcfce7', '#14532d', isDark)
          : ds('#f8fafc', '#1e293b', isDark),
        borderColor: ds('#e2e8f0', '#334155', isDark),
        color: copied
          ? ds('#15803d', '#86efac', isDark)
          : ds('#94a3b8', '#64748b', isDark),
      }}
    >
      {copied ? '\u2713 copied' : 'copy'}
    </button>
  )
}

/**
 * Renders full topic content (attack methods, real-world scenario, prevention)
 * for a given security topic. Used in per-topic MDX pages.
 */
export function SecurityTopicDetail({ topicId }: { topicId: string }) {
  const isDark = useIsDark()
  const topic = getSecurityTopic(topicId)

  if (!topic) return null

  const colors = THREAT_LEVEL_COLORS[topic.threat]

  return (
    <div className="flex flex-col gap-8">
      {/* Threat badge */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{topic.icon}</span>
        <StatusBadge label={topic.threat} colors={threatBadgeColors(topic.threat)} />
        <span
          className="text-sm font-mono"
          style={{ color: ds('#64748b', '#94a3b8', isDark) }}
        >
          {topic.tagline}
        </span>
      </div>

      {/* What is it? */}
      <section>
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
        >
          What is it?
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: ds('#475569', '#94a3b8', isDark) }}
        >
          {topic.whatIsIt}
        </p>
      </section>

      {/* How it works */}
      <section>
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
        >
          How it works
        </h3>
        <div className="flex flex-col gap-3">
          {topic.howItWorks.map((method, i) => (
            <CardBase key={i} accentColor={ds(colors.border, colors.darkBorder, isDark)}>
              <h4
                className="text-sm font-semibold mb-1.5"
                style={{ color: ds(colors.text, colors.darkText, isDark) }}
              >
                {method.name}
              </h4>
              <p
                className="text-sm leading-relaxed m-0"
                style={{ color: ds('#64748b', '#94a3b8', isDark) }}
              >
                {method.desc}
              </p>
            </CardBase>
          ))}
        </div>
      </section>

      {/* Real-world scenario */}
      <section>
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
        >
          Real-world scenario
        </h3>
        <div
          className="rounded-lg border p-4 text-sm leading-relaxed"
          style={{
            background: ds(colors.bg, colors.darkBg, isDark),
            borderColor: ds(colors.border, colors.darkBorder, isDark),
            color: ds('#475569', '#cbd5e1', isDark),
          }}
          dangerouslySetInnerHTML={{ __html: topic.realWorld }}
        />
      </section>

      {/* Prevention */}
      <section>
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
        >
          Prevention
        </h3>
        <div className="flex flex-col gap-5">
          {topic.prevention.map((step, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0"
                  style={{
                    background: ds(`${colors.badge}20`, `${colors.darkBadge}20`, isDark),
                    color: ds(colors.text, colors.darkText, isDark),
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
                >
                  {step.title}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-2 ml-9"
                style={{ color: ds('#64748b', '#94a3b8', isDark) }}
              >
                {step.detail}
              </p>
              <div className="relative ml-9">
                <CopyButton text={step.code} />
                <pre
                  className="rounded-lg border p-4 overflow-x-auto text-xs leading-relaxed font-mono m-0"
                  style={{
                    background: ds('#f8fafc', '#0f172a', isDark),
                    borderColor: ds('#e2e8f0', '#1e293b', isDark),
                    color: ds('#334155', '#cbd5e1', isDark),
                  }}
                >
                  {step.code}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
