import { useState, useMemo } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { STORAGE_CLASSES } from '../../../data/s3Data'

export function S3CostCalculator() {
  const isDark = useIsDark()
  const [storageGB, setStorageGB] = useState(100)
  const [retrievalPct, setRetrievalPct] = useState(10)

  const results = useMemo(() => {
    const retGB = storageGB * (retrievalPct / 100)
    return STORAGE_CLASSES.map(sc => {
      const storageCost = sc.storageCostPerGB * storageGB
      const retrievalCost = sc.retrievalCostPerGB * retGB
      return {
        ...sc,
        storageCost,
        retrievalCost,
        total: storageCost + retrievalCost,
      }
    }).sort((a, b) => a.total - b.total)
  }, [storageGB, retrievalPct])

  const formatStorage = (gb: number) =>
    gb >= 1000 ? `${(gb / 1000).toFixed(1)} TB` : `${gb} GB`

  const accentColor = isDark ? '#f0a840' : '#d97706'

  return (
    <div>
      <div
        className="rounded-xl border p-6"
        style={{
          background: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0',
        }}
      >
        {/* Storage slider */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-5">
          <span
            className="text-sm font-medium min-w-[140px]"
            style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
          >
            Storage Amount
          </span>
          <input
            type="range"
            min={1}
            max={5000}
            value={storageGB}
            onChange={e => setStorageGB(Number(e.target.value))}
            className="flex-1"
            style={{ accentColor }}
          />
          <span
            className="font-mono text-sm min-w-[80px] sm:text-right"
            style={{ color: accentColor }}
          >
            {formatStorage(storageGB)}
          </span>
        </div>

        {/* Retrieval slider */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
          <span
            className="text-sm font-medium min-w-[140px]"
            style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
          >
            Monthly Retrievals
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={retrievalPct}
            onChange={e => setRetrievalPct(Number(e.target.value))}
            className="flex-1"
            style={{ accentColor }}
          />
          <span
            className="font-mono text-sm min-w-[80px] sm:text-right"
            style={{ color: accentColor }}
          >
            {retrievalPct}%
          </span>
        </div>

        {/* Results grid */}
        <div
          className="pt-5 border-t"
          style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {results.map(r => (
              <div
                key={r.id}
                className="rounded-lg p-4 text-center"
                style={{
                  background: isDark ? '#0f172a' : '#f8fafc',
                }}
              >
                <div
                  className="text-[11px] uppercase tracking-wider font-medium mb-1"
                  style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                >
                  {r.name.replace('S3 ', '')}
                </div>
                <div
                  className="font-mono text-xl font-medium"
                  style={{ color: isDark ? r.darkColor : r.color }}
                >
                  ${r.total.toFixed(2)}
                </div>
                <div
                  className="text-[11px] mt-1"
                  style={{ color: isDark ? '#475569' : '#94a3b8' }}
                >
                  {retrievalPct > 0 && r.retrievalCost > 0
                    ? `incl. $${r.retrievalCost.toFixed(2)} retrieval`
                    : 'no retrieval fee'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div
        className="mt-6 rounded-xl border-l-4 py-4 px-5"
        style={{
          background: isDark ? '#1e293b' : '#ffffff',
          borderLeftColor: accentColor,
        }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-1"
          style={{ color: accentColor }}
        >
          {'\u{1F4A1}'} Key Insight
        </div>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
        >
          The cheapest storage class isn&apos;t always the cheapest <em>total cost</em>.
          If you access data frequently, the retrieval fees on archive classes can exceed
          what you&apos;d pay for Standard. Always consider your access pattern.
        </p>
      </div>
    </div>
  )
}
