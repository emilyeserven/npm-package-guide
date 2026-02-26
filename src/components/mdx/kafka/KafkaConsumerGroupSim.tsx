import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'
import { ds } from '../../../helpers/darkStyle'
import {
  KAFKA_CONSUMER_GROUP_PARTITIONS,
  KAFKA_CONSUMER_OPTIONS,
} from '../../../data/kafkaData'

const CONSUMER_COLORS_LIGHT = ['#be123c', '#0369a1', '#b45309', '#15803d', '#7e22ce', '#c2410c']
const CONSUMER_COLORS_DARK = ['#e94560', '#00b4d8', '#ffc107', '#00ff88', '#a855f7', '#ff6b35']

export function KafkaConsumerGroupSim() {
  const isDark = useIsDark()
  const [consumers, setConsumers] = useState(2)
  const partitions = KAFKA_CONSUMER_GROUP_PARTITIONS

  const colors = isDark ? CONSUMER_COLORS_DARK : CONSUMER_COLORS_LIGHT

  const assignment: number[] = []
  for (let p = 0; p < partitions; p++) {
    assignment.push(p % consumers)
  }

  return (
    <div className="my-6">
      <div className="flex gap-2 mb-4 items-center flex-wrap">
        <span className="text-xs font-mono" style={{ color: tc(theme.textMuted, isDark) }}>
          Consumers in group:
        </span>
        {KAFKA_CONSUMER_OPTIONS.map(n => (
          <button
            key={n}
            onClick={() => setConsumers(n)}
            className="rounded-md px-3 py-1 font-mono text-xs font-semibold cursor-pointer transition-colors"
            style={{
              backgroundColor: consumers === n
                ? ds('#be123c', '#e94560', isDark)
                : tc(theme.bgCard, isDark),
              color: consumers === n ? '#fff' : tc(theme.textMuted, isDark),
              border: consumers === n
                ? `1px solid ${ds('#be123c', '#e94560', isDark)}`
                : `1px solid ${tc(theme.borderDefault, isDark)}`,
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div
            className="font-mono text-[11px] font-bold tracking-wider uppercase mb-2"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Topic: user-events ({partitions} partitions)
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: partitions }).map((_, p) => (
              <div
                key={p}
                className="rounded-lg p-2 text-center font-mono text-[11px] font-semibold transition-all"
                style={{
                  backgroundColor: `${colors[assignment[p]]}${isDark ? '22' : '0d'}`,
                  border: `2px solid ${colors[assignment[p]]}`,
                  color: colors[assignment[p]],
                }}
              >
                P{p}
                <div className="text-[9px] mt-0.5" style={{ color: tc(theme.textMuted, isDark) }}>
                  &rarr; C{assignment[p]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            className="font-mono text-[11px] font-bold tracking-wider uppercase mb-2"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Consumer Group
          </div>
          <div className="flex flex-col gap-1.5">
            {Array.from({ length: consumers }).map((_, c) => {
              const assignedPartitions = assignment.filter(a => a === c).length
              return (
                <div
                  key={c}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all"
                  style={{
                    backgroundColor: `${colors[c]}${isDark ? '11' : '08'}`,
                    border: `1px solid ${colors[c]}${isDark ? '44' : '33'}`,
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: colors[c],
                      boxShadow: `0 0 8px ${colors[c]}88`,
                    }}
                  />
                  <span className="font-mono text-xs font-semibold" style={{ color: colors[c] }}>
                    Consumer {c}
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: tc(theme.textMuted, isDark) }}>
                    ({assignedPartitions} partitions)
                  </span>
                </div>
              )
            })}
            {consumers > partitions && (
              <div
                className="text-[11px] font-mono px-2 py-1"
                style={{ color: ds('#b45309', '#ffc107', isDark) }}
              >
                Warning: More consumers than partitions = idle consumers
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
