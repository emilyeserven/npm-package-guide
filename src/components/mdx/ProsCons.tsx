import { useIsDark } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'
import { theme, tc } from '../../helpers/themeColors'

interface ProsConsProps {
  pros: string[]
  cons: string[]
  bestFor: string
  color: string
  accent: string
  darkAccent: string
}

export function ProsCons({ pros, cons, bestFor, color, accent, darkAccent }: ProsConsProps) {
  const isDark = useIsDark()

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: tc(theme.textPrimary, isDark) }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        <div style={{ background: ds("#f0fdf4", "#052e16", isDark), borderRadius: "10px", padding: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ds("#16a34a", "#4ade80", isDark), marginBottom: "8px" }}>{"\u2705"} Strengths</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {pros.map((pro, i) => (
              <div key={i} style={{ fontSize: "12.5px", lineHeight: 1.55, color: tc(theme.textSecondary, isDark), paddingLeft: "10px", borderLeft: ds("2px solid #bbf7d0", "2px solid #166534", isDark) }}>{pro}</div>
            ))}
          </div>
        </div>
        <div style={{ background: ds("#fef2f2", "#450a0a", isDark), borderRadius: "10px", padding: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ds("#dc2626", "#f87171", isDark), marginBottom: "8px" }}>{"\u26A0\uFE0F"} Tradeoffs</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {cons.map((con, i) => (
              <div key={i} style={{ fontSize: "12.5px", lineHeight: 1.55, color: tc(theme.textSecondary, isDark), paddingLeft: "10px", borderLeft: ds("2px solid #fecaca", "2px solid #991b1b", isDark) }}>{con}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Best For */}
      <div style={{ background: `linear-gradient(135deg, ${isDark ? darkAccent : accent}, ${tc(theme.bgCard, isDark)})`, borderRadius: "12px", padding: "16px 18px", border: `1px solid ${color}18` }}>
        <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color, marginBottom: "6px" }}>{"\u{1F3AF}"} Best for</div>
        <p style={{ margin: 0, lineHeight: 1.7, fontSize: "14px", color: tc(theme.textSecondary, isDark) }}>{bestFor}</p>
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
