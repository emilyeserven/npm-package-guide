import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'
import { ds } from '../../../helpers/darkStyle'
import { KAFKA_COMPARISON_ROWS } from '../../../data/kafkaData'

export function KafkaComparison() {
  const isDark = useIsDark()

  const kafkaColor = ds('#16a34a', '#00ff88', isDark)
  const traditionalColor = ds('#dc2626', '#ff9999', isDark)

  return (
    <div
      className="rounded-lg border overflow-hidden my-6"
      style={{ borderColor: tc(theme.borderDefault, isDark) }}
    >
      <div
        className="grid grid-cols-3"
        style={{
          backgroundColor: ds('#f1f5f9', '#111122', isDark),
          borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}`,
        }}
      >
        <div className="px-3 py-2 text-[11px] font-mono" style={{ color: tc(theme.textMuted, isDark) }} />
        <div className="px-3 py-2 text-[11px] font-mono font-bold" style={{ color: kafkaColor }}>
          Kafka
        </div>
        <div className="px-3 py-2 text-[11px] font-mono font-bold" style={{ color: traditionalColor }}>
          Traditional MQ
        </div>
      </div>
      {KAFKA_COMPARISON_ROWS.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-3"
          style={{
            borderBottom: i < KAFKA_COMPARISON_ROWS.length - 1
              ? `1px solid ${tc(theme.borderDefault, isDark)}`
              : 'none',
          }}
        >
          <div className="px-3 py-2.5 text-xs font-mono" style={{ color: tc(theme.textMuted, isDark) }}>
            {row.label}
          </div>
          <div
            className="px-3 py-2.5 text-xs font-mono"
            style={{
              color: kafkaColor,
              backgroundColor: ds('rgba(22,163,74,0.03)', 'rgba(0,255,136,0.03)', isDark),
            }}
          >
            {row.kafka}
          </div>
          <div className="px-3 py-2.5 text-xs font-mono" style={{ color: traditionalColor }}>
            {row.traditional}
          </div>
        </div>
      ))}
    </div>
  )
}
