import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { MEDIA_CAPABILITIES } from '../../../data/coworkData'

export function CoworkCapabilities() {
  const isDark = useIsDark()

  return (
    <div className="flex flex-wrap gap-1.5 mb-6">
      {MEDIA_CAPABILITIES.map((cap) => (
        <span
          key={cap.label}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
          style={{
            background: cap.supported
              ? ds('#f0fdf4', 'rgba(34,197,94,0.08)', isDark)
              : ds('#fef2f2', 'rgba(239,68,68,0.08)', isDark),
            borderColor: cap.supported
              ? ds('#bbf7d0', 'rgba(34,197,94,0.2)', isDark)
              : ds('#fecaca', 'rgba(239,68,68,0.2)', isDark),
            color: cap.supported
              ? ds('#16a34a', '#4ade80', isDark)
              : ds('#dc2626', '#f87171', isDark),
          }}
        >
          {cap.supported ? '\u2713' : '\u2717'} {cap.label}
        </span>
      ))}
    </div>
  )
}
