import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { tc, theme } from '../../../helpers/themeColors'
import { ds } from '../../../helpers/darkStyle'
import {
  KAFKA_INITIAL_PARTITIONS,
  KAFKA_PARTITION_KEYS,
  KAFKA_PARTITION_VALUES,
  KAFKA_PARTITION_COUNT,
} from '../../../data/kafkaData'
import type { KafkaPartitionMessage } from '../../../data/kafkaData'

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}

const PARTITION_COLORS_LIGHT = ['#be123c', '#1e40af', '#0891b2']
const PARTITION_COLORS_DARK = ['#e94560', '#5390d9', '#00b4d8']

export function KafkaPartitionVisualizer() {
  const isDark = useIsDark()
  const [partitions, setPartitions] = useState<KafkaPartitionMessage[][]>(
    KAFKA_INITIAL_PARTITIONS.map(p => [...p])
  )
  const [newKey, setNewKey] = useState(KAFKA_PARTITION_KEYS[0])
  const [newValue, setNewValue] = useState(KAFKA_PARTITION_VALUES[1])

  const partColors = isDark ? PARTITION_COLORS_DARK : PARTITION_COLORS_LIGHT

  const addMessage = () => {
    const partIdx = Math.abs(hashCode(newKey)) % KAFKA_PARTITION_COUNT
    setPartitions(prev => {
      const next = prev.map(p => [...p])
      next[partIdx] = [
        ...next[partIdx],
        { key: newKey, value: newValue, offset: next[partIdx].length },
      ]
      return next
    })
  }

  const targetPartition = Math.abs(hashCode(newKey)) % KAFKA_PARTITION_COUNT

  return (
    <div className="my-6">
      <div className="flex gap-2 mb-4 items-center flex-wrap">
        <select
          value={newKey}
          onChange={e => setNewKey(e.target.value)}
          className="rounded-md border px-2.5 py-1.5 font-mono text-xs"
          style={{
            backgroundColor: tc(theme.bgCard, isDark),
            borderColor: tc(theme.borderDefault, isDark),
            color: tc(theme.textPrimary, isDark),
          }}
        >
          {KAFKA_PARTITION_KEYS.map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <select
          value={newValue}
          onChange={e => setNewValue(e.target.value)}
          className="rounded-md border px-2.5 py-1.5 font-mono text-xs"
          style={{
            backgroundColor: tc(theme.bgCard, isDark),
            borderColor: tc(theme.borderDefault, isDark),
            color: tc(theme.textPrimary, isDark),
          }}
        >
          {KAFKA_PARTITION_VALUES.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <button
          onClick={addMessage}
          className="rounded-md px-4 py-1.5 font-mono text-xs font-semibold border-0 cursor-pointer text-white"
          style={{
            backgroundColor: ds('#be123c', '#e94560', isDark),
          }}
        >
          Produce &rarr;
        </button>
        <span
          className="text-[11px] font-mono"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          &rarr; partition {targetPartition}
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {partitions.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="font-mono text-[11px] font-bold min-w-[30px] text-right"
              style={{ color: partColors[i] }}
            >
              P{i}
            </div>
            <div className="flex gap-1 flex-1 overflow-x-auto py-1">
              {p.map((msg, j) => (
                <div
                  key={j}
                  className="rounded-md px-2 py-1 text-[10px] font-mono whitespace-nowrap shrink-0"
                  style={{
                    backgroundColor: `${partColors[i]}${isDark ? '22' : '0d'}`,
                    border: `1px solid ${partColors[i]}${isDark ? '44' : '33'}`,
                    color: tc(theme.textSecondary, isDark),
                  }}
                >
                  <span style={{ color: partColors[i], fontWeight: 600 }}>{msg.offset}</span>{' '}
                  {msg.key}:{msg.value}
                </div>
              ))}
              <div
                className="rounded-md px-2 py-1 text-[10px] font-mono whitespace-nowrap shrink-0"
                style={{
                  border: `1px dashed ${partColors[i]}33`,
                  color: tc(theme.textMuted, isDark),
                }}
              >
                &larr; next
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
