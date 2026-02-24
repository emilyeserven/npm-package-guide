import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { TimelineFlow } from '../TimelineFlow'
import { AccordionList } from '../AccordionList'
import {
  JCS_ROLLOUT_STEPS,
  JCS_PITFALLS,
  JCS_TESTING_CHECKS,
  JCS_ECOSYSTEM,
} from '../../../data/jscodeshiftData'
import type { JcsRolloutStep, JcsPitfall } from '../../../data/jscodeshiftData'

/** Testing checklist cards. */
export function JcsTestingChecklist() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
      {JCS_TESTING_CHECKS.map((check, i) => {
        const [label, ...rest] = check.split(' \u2014 ')
        return (
          <div
            key={i}
            className="rounded-xl border p-4"
            style={{
              background: ds('#f8fafc', '#1e293b', isDark),
              borderColor: ds('#e2e8f0', '#334155', isDark),
            }}
          >
            <h4
              className="font-mono text-xs font-medium mb-1"
              style={{ color: ds('#059669', '#34d399', isDark) }}
            >
              &check; {label}
            </h4>
            <p
              className="text-sm m-0 leading-relaxed"
              style={{ color: ds('#64748b', '#94a3b8', isDark) }}
            >
              {rest.join(' \u2014 ')}
            </p>
          </div>
        )
      })}
    </div>
  )
}

/** Rollout strategy timeline using shared TimelineFlow. */
export function JcsRolloutTimeline() {
  return (
    <TimelineFlow<JcsRolloutStep>
      items={JCS_ROLLOUT_STEPS}
      renderIndicator={(step, _i, isDark) => (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs"
          style={{
            background: ds('#f1f5f9', '#1e293b', isDark),
            border: `2px solid ${ds('#e2e8f0', '#334155', isDark)}`,
            color: ds('#64748b', '#94a3b8', isDark),
          }}
        >
          {step.num}
        </div>
      )}
      renderContent={(step, _i, isDark) => (
        <div className="pt-1">
          <h4
            className="font-mono text-sm font-medium mb-1.5"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {step.title}
          </h4>
          <p
            className="text-sm m-0 leading-relaxed"
            style={{ color: ds('#64748b', '#94a3b8', isDark) }}
            dangerouslySetInnerHTML={{ __html: step.body }}
          />
        </div>
      )}
    />
  )
}

/** Common pitfalls accordion. */
export function JcsPitfallAccordion() {
  const isDark = useIsDark()

  return (
    <AccordionList<JcsPitfall>
      items={JCS_PITFALLS}
      renderHeader={(pitfall) => (
        <span className="font-mono text-xs font-medium">
          <span style={{ color: ds('#dc2626', '#f87171', isDark) }}>&times;</span>{' '}
          {pitfall.title}
        </span>
      )}
      renderBody={(pitfall) => (
        <p
          className="text-sm m-0 leading-relaxed"
          style={{ color: ds('#64748b', '#94a3b8', isDark) }}
          dangerouslySetInnerHTML={{ __html: pitfall.body }}
        />
      )}
      renderIndicator={(expanded, isDark) => (
        <span
          className="text-xs transition-transform"
          style={{
            color: ds('#94a3b8', '#64748b', isDark),
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}
        >
          &#9660;
        </span>
      )}
    />
  )
}

/** Ecosystem link cards for the reference page. */
export function JcsEcosystemCards() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      {JCS_ECOSYSTEM.map(link => (
        <a
          key={link.title}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border p-5 transition-all hover:-translate-y-0.5 no-underline block"
          style={{
            background: ds('#f8fafc', '#1e293b', isDark),
            borderColor: ds('#e2e8f0', '#334155', isDark),
          }}
        >
          <h4
            className="font-mono text-sm font-medium mb-1.5"
            style={{ color: ds('#3b82f6', '#60a5fa', isDark) }}
          >
            {link.title}
          </h4>
          <p
            className="text-sm m-0 leading-relaxed"
            style={{ color: ds('#64748b', '#94a3b8', isDark) }}
          >
            {link.description}
          </p>
        </a>
      ))}
    </div>
  )
}
