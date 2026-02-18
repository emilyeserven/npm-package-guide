import { useIsDark } from '../../../hooks/useTheme'
import { STORAGE_CLASSES } from '../../../data/s3Data'
import { CardBase } from '../CardBase'

export function StorageClassCards() {
  const isDark = useIsDark()

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STORAGE_CLASSES.map(sc => (
          <CardBase key={sc.id} accentColor={isDark ? sc.darkColor : sc.color}>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{
                  background: `${isDark ? sc.darkColor : sc.color}20`,
                  color: isDark ? sc.darkColor : sc.color,
                }}
              >
                {sc.icon}
              </span>
              <h4
                className="font-mono text-sm font-medium m-0"
                style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
              >
                {sc.name}
              </h4>
            </div>
            <p
              className="text-sm leading-relaxed m-0 mb-3"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              {sc.description}
            </p>
            <span
              className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wide"
              style={{
                background: `${isDark ? sc.darkColor : sc.color}20`,
                color: isDark ? sc.darkColor : sc.color,
              }}
            >
              {sc.tag}
            </span>
          </CardBase>
        ))}
      </div>

      {/* Quick Mental Model */}
      <div
        className="mt-8 rounded-xl border p-6"
        style={{
          background: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0',
        }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: isDark ? '#f0a840' : '#d97706' }}
        >
          {'\u{1F9E0}'} Remember This Spectrum
        </div>
        <p
          className="font-mono text-xs leading-relaxed mb-3"
          style={{ color: isDark ? '#f0a840' : '#d97706' }}
        >
          Standard {'\u2192'} Intelligent-Tiering {'\u2192'} Standard-IA {'\u2192'} One Zone-IA {'\u2192'} Glacier Instant {'\u2192'} Glacier Flexible {'\u2192'} Deep Archive
        </p>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
        >
          Going left to right: storage gets <strong style={{ color: isDark ? '#f0a840' : '#d97706' }}>cheaper</strong>,
          access gets <strong style={{ color: isDark ? '#f0a840' : '#d97706' }}>slower</strong> and
          more <strong style={{ color: isDark ? '#f0a840' : '#d97706' }}>expensive</strong> per retrieval.
          It&apos;s always a trade-off between storage cost and retrieval cost/speed.
        </p>
      </div>
    </div>
  )
}
