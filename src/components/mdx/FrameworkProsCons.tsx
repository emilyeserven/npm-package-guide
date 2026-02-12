import { FRAMEWORK_PAGES } from '../../data/archData'
import { useTheme } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'

export function FrameworkProsCons({ frameworkId }: { frameworkId: string }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const fw = FRAMEWORK_PAGES.find(f => f.id === frameworkId)
  if (!fw) return null

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: ds("#1e293b", "#f1f5f9", isDark) }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        <div style={{ background: ds("#f0fdf4", "#052e16", isDark), borderRadius: "10px", padding: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ds("#16a34a", "#4ade80", isDark), marginBottom: "8px" }}>{"\u2705"} Strengths</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {fw.pros.map((pro, i) => (
              <div key={i} style={{ fontSize: "12.5px", lineHeight: 1.55, color: ds("#374151", "#e2e8f0", isDark), paddingLeft: "10px", borderLeft: ds("2px solid #bbf7d0", "2px solid #166534", isDark) }}>{pro}</div>
            ))}
          </div>
        </div>
        <div style={{ background: ds("#fef2f2", "#450a0a", isDark), borderRadius: "10px", padding: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ds("#dc2626", "#f87171", isDark), marginBottom: "8px" }}>{"\u26A0\uFE0F"} Tradeoffs</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {fw.cons.map((con, i) => (
              <div key={i} style={{ fontSize: "12.5px", lineHeight: 1.55, color: ds("#374151", "#e2e8f0", isDark), paddingLeft: "10px", borderLeft: ds("2px solid #fecaca", "2px solid #991b1b", isDark) }}>{con}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Best For */}
      <div style={{ background: `linear-gradient(135deg, ${isDark ? fw.darkAccent : fw.accent}, ${ds("#fff", "#1e293b", isDark)})`, borderRadius: "12px", padding: "16px 18px", border: `1px solid ${fw.color}18` }}>
        <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: fw.color, marginBottom: "6px" }}>{"\u{1F3AF}"} Best for</div>
        <p style={{ margin: 0, lineHeight: 1.7, fontSize: "14px", color: ds("#374151", "#e2e8f0", isDark) }}>{fw.bestFor}</p>
      </div>

      <style>{`
        @media (max-width: 520px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
