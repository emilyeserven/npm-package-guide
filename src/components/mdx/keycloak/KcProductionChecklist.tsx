import { KC_PRODUCTION_STEPS } from '../../../data/keycloakData'
import type { KcProductionStep } from '../../../data/keycloakData'
import { TimelineFlow } from '../TimelineFlow'

export function KcProductionChecklist() {
  return (
    <TimelineFlow<KcProductionStep>
      items={KC_PRODUCTION_STEPS}
      className="mb-7"
      itemGap="gap-4"
      renderIndicator={(f) => (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: '#ef4444' }}
        >
          {f.step}
        </div>
      )}
      renderConnector={(_current, _next, isDark) => (
        <div
          className="w-0.5 grow min-h-6"
          style={{ background: isDark ? '#334155' : '#e2e8f0' }}
        />
      )}
      renderContent={(f, _i, isDark) => (
        <div className="pb-5">
          <h4
            className="text-sm font-semibold mb-1 mt-0"
            style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
          >
            {f.title}
          </h4>
          <p
            className="text-sm mb-1 mt-0 leading-relaxed"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            {f.detail}
          </p>
        </div>
      )}
    />
  )
}
