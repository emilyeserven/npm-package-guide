import { useIsDark } from '../../../hooks/useTheme'
import { LIFECYCLE_STAGES, LIFECYCLE_JSON, WATERFALL_ORDER } from '../../../data/s3Data'
import { TimelineFlow } from '../TimelineFlow'
import type { LifecycleStage } from '../../../data/s3Data'

export function S3LifecycleTimeline() {
  const isDark = useIsDark()

  return (
    <div>
      {/* Timeline */}
      <TimelineFlow<LifecycleStage>
        items={LIFECYCLE_STAGES}
        renderIndicator={(stage) => (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0"
            style={{
              background: `${stage.color}20`,
              color: stage.color,
              border: `2px solid ${stage.color}`,
            }}
          >
            {stage.day === 0 ? 'D0' : `D${stage.day}`}
          </div>
        )}
        renderContent={(stage) => (
          <div
            className="rounded-xl border p-4 mb-2 flex-1"
            style={{
              background: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-medium text-sm"
                style={{ color: stage.color }}
              >
                {stage.label}
              </span>
              {stage.className && (
                <code
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    background: isDark ? '#0f172a' : '#f1f5f9',
                    color: isDark ? '#94a3b8' : '#64748b',
                  }}
                >
                  {stage.className}
                </code>
              )}
            </div>
            <p
              className="text-xs mt-1 m-0"
              style={{ color: isDark ? '#64748b' : '#94a3b8' }}
            >
              {stage.day === 0
                ? 'Object uploaded \u2014 starts in this class'
                : `Transition after ${stage.day} days`}
            </p>
          </div>
        )}
        renderConnector={(current, next) => (
          <div className="flex flex-col items-center grow min-h-2">
            <div
              className="w-0.5 grow"
              style={{
                background: `linear-gradient(to bottom, ${current.color}, ${next.color})`,
              }}
            />
          </div>
        )}
        className="mt-6 mb-8"
      />

      {/* Lifecycle JSON */}
      <div
        className="rounded-xl border overflow-hidden my-6"
        style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
      >
        <div
          className="px-4 py-2.5 flex items-center justify-between border-b"
          style={{
            background: isDark ? '#0f172a' : '#f8fafc',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          }}
        >
          <span
            className="text-xs font-mono"
            style={{ color: isDark ? '#64748b' : '#94a3b8' }}
          >
            lifecycle-rule.json
          </span>
          <button
            className="text-[11px] px-2.5 py-1 rounded-md border cursor-pointer"
            style={{
              background: 'transparent',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#94a3b8' : '#64748b',
            }}
            onClick={() => {
              navigator.clipboard.writeText(LIFECYCLE_JSON)
            }}
          >
            Copy
          </button>
        </div>
        <pre
          className="p-4 overflow-x-auto text-xs leading-relaxed font-mono m-0"
          style={{
            background: isDark ? '#0d1117' : '#1e293b',
            color: isDark ? '#e6edf3' : '#e2e8f0',
          }}
        >
          {LIFECYCLE_JSON}
        </pre>
      </div>

      {/* Waterfall rule */}
      <div
        className="rounded-xl border p-5 mt-6"
        style={{
          background: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0',
        }}
      >
        <h4
          className="text-sm font-semibold mb-2 mt-0"
          style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
        >
          Rules You Can&apos;t Break
        </h4>
        <p
          className="text-sm leading-relaxed m-0 mb-3"
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
        >
          S3 has a &ldquo;waterfall&rdquo; &mdash; you can only transition <strong>downward</strong> through
          the classes, never upward via lifecycle rules. The order is fixed:
        </p>
        <p
          className="font-mono text-xs m-0 mb-3"
          style={{ color: isDark ? '#f0a840' : '#d97706' }}
        >
          {WATERFALL_ORDER.join(' \u2192 ')}
        </p>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
        >
          You can&apos;t use a lifecycle rule to move something from Glacier back to Standard.
          To do that, you&apos;d copy the object to a new one in a higher class.
        </p>
      </div>
    </div>
  )
}
