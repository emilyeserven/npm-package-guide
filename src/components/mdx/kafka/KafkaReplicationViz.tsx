import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'
import { ds } from '../../../helpers/darkStyle'
import { KAFKA_REPLICAS, KAFKA_BROKER_COUNT } from '../../../data/kafkaData'

export function KafkaReplicationViz() {
  const isDark = useIsDark()
  const [failedBroker, setFailedBroker] = useState<number | null>(null)

  const brokers = Array.from({ length: KAFKA_BROKER_COUNT }, (_, i) => i)
  const accent = ds('#be123c', '#e94560', isDark)
  const dangerColor = ds('#dc2626', '#ff4444', isDark)
  const successColor = ds('#16a34a', '#00ff88', isDark)
  const leaderColor = ds('#b45309', '#ffc107', isDark)

  return (
    <div className="my-6">
      <div className="flex gap-2 mb-4 items-center flex-wrap">
        <span className="text-xs font-mono" style={{ color: tc(theme.textMuted, isDark) }}>
          Kill broker:
        </span>
        {brokers.map(b => (
          <button
            key={b}
            onClick={() => setFailedBroker(failedBroker === b ? null : b)}
            className="rounded-md px-3 py-1 font-mono text-xs font-semibold cursor-pointer transition-colors"
            style={{
              backgroundColor: failedBroker === b ? dangerColor : tc(theme.bgCard, isDark),
              color: failedBroker === b ? '#fff' : tc(theme.textMuted, isDark),
              border: failedBroker === b
                ? `1px solid ${dangerColor}`
                : `1px solid ${tc(theme.borderDefault, isDark)}`,
            }}
          >
            B{b} {failedBroker === b ? '\u{1f480}' : ''}
          </button>
        ))}
        {failedBroker !== null && (
          <button
            onClick={() => setFailedBroker(null)}
            className="rounded-md px-3 py-1 font-mono text-xs cursor-pointer"
            style={{
              backgroundColor: 'transparent',
              color: successColor,
              border: `1px solid ${successColor}`,
            }}
          >
            Restore all
          </button>
        )}
      </div>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${KAFKA_BROKER_COUNT}, 1fr)` }}
      >
        {brokers.map(b => {
          const isFailed = failedBroker === b
          return (
            <div
              key={b}
              className="rounded-lg p-3 transition-all"
              style={{
                backgroundColor: isFailed
                  ? ds('rgba(220,38,38,0.05)', 'rgba(255,68,68,0.1)', isDark)
                  : ds('#f8fafc', 'rgba(26,26,46,0.8)', isDark),
                border: `1px solid ${isFailed ? dangerColor : tc(theme.borderDefault, isDark)}`,
                opacity: isFailed ? 0.5 : 1,
              }}
            >
              <div
                className="font-mono text-[11px] font-bold mb-2 text-center"
                style={{ color: isFailed ? dangerColor : accent }}
              >
                {isFailed ? '\u2715' : '\u25cf'} Broker {b}
              </div>
              {KAFKA_REPLICAS.map(r => {
                if (!r.replicas.includes(b)) return null
                const isLeader = r.leader === b && !isFailed
                const wasLeader = r.leader === b && isFailed
                const isNewLeader =
                  failedBroker === r.leader &&
                  r.replicas.filter(x => x !== failedBroker)[0] === b

                return (
                  <div
                    key={r.partition}
                    className="rounded-md px-1.5 py-1 my-1 text-[10px] font-mono text-center transition-all"
                    style={{
                      backgroundColor: isLeader || isNewLeader
                        ? ds('rgba(190,18,60,0.1)', 'rgba(233,69,96,0.25)', isDark)
                        : wasLeader
                          ? ds('rgba(220,38,38,0.05)', 'rgba(255,68,68,0.15)', isDark)
                          : ds('#f1f5f9', 'rgba(255,255,255,0.04)', isDark),
                      border: isLeader || isNewLeader
                        ? `1px solid ${accent}`
                        : wasLeader
                          ? `1px dashed ${dangerColor}`
                          : `1px solid ${tc(theme.borderDefault, isDark)}`,
                      color: wasLeader ? dangerColor : tc(theme.textSecondary, isDark),
                    }}
                  >
                    P{r.partition}
                    {(isLeader || isNewLeader) && (
                      <span style={{ color: leaderColor, marginLeft: 4 }}>{'\u2605'}</span>
                    )}
                    {isNewLeader && (
                      <div className="text-[8px]" style={{ color: successColor }}>new leader</div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      {failedBroker !== null && (
        <div
          className="mt-3 px-3 py-2 rounded-lg text-xs font-mono"
          style={{
            backgroundColor: ds('rgba(22,163,74,0.05)', 'rgba(0,255,136,0.08)', isDark),
            border: `1px solid ${ds('rgba(22,163,74,0.2)', 'rgba(0,255,136,0.2)', isDark)}`,
            color: successColor,
          }}
        >
          {'\u2713'} Broker {failedBroker} is down. Leadership transferred automatically — no data loss with replication factor 3.
        </div>
      )}
    </div>
  )
}
