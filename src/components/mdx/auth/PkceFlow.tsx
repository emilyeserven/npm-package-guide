import { PKCE_FLOW_STEPS } from '../../../data/authData'
import type { PkceFlowStep } from '../../../data/authData/types'
import { TimelineFlow } from '../TimelineFlow'
import { useAccordion } from '../../../hooks/useAccordion'
import { useIsDark } from '../../../hooks/useTheme'

export function PkceFlow() {
  const { toggle, isExpanded } = useAccordion()
  const isDark = useIsDark()

  return (
    <TimelineFlow<PkceFlowStep>
      items={PKCE_FLOW_STEPS}
      className="mb-7"
      itemGap="gap-4"
      renderIndicator={(f) => (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: '#6366f1' }}
        >
          {f.step}
        </div>
      )}
      renderConnector={(_current, _next, dark) => (
        <div
          className="w-0.5 grow min-h-6"
          style={{ background: dark ? '#334155' : '#e2e8f0' }}
        />
      )}
      renderContent={(f, i, dark) => (
        <div className="pb-5 flex-1 min-w-0">
          <button
            onClick={() => toggle(i)}
            className="w-full text-left cursor-pointer border-none p-0"
            style={{ background: 'transparent' }}
          >
            <h4
              className="text-sm font-semibold mb-1 mt-0"
              style={{ color: dark ? '#f1f5f9' : '#1e293b' }}
            >
              {f.label}
              <span
                className="ml-2 text-xs transition-transform duration-200 inline-block"
                style={{
                  color: '#6366f1',
                  transform: isExpanded(i) ? 'rotate(180deg)' : 'none',
                }}
              >
                ▾
              </span>
            </h4>
          </button>
          <p
            className="text-sm mb-1 mt-0 leading-relaxed"
            style={{ color: dark ? '#94a3b8' : '#64748b' }}
          >
            {f.detail}
          </p>
          <span
            className="text-xs font-mono font-medium"
            style={{ color: '#6366f1' }}
          >
            {f.actor}
          </span>
          {isExpanded(i) && (
            <pre
              className="mt-3 rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
              style={{
                background: isDark ? '#0f172a' : '#f1f5f9',
                color: isDark ? '#cbd5e1' : '#475569',
              }}
            >
              {f.code}
            </pre>
          )}
        </div>
      )}
    />
  )
}
