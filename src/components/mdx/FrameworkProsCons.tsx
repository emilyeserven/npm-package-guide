import { FRAMEWORK_PAGES } from '../../data/archData'

export function FrameworkProsCons({ frameworkId }: { frameworkId: string }) {
  const fw = FRAMEWORK_PAGES.find(f => f.id === frameworkId)
  if (!fw) return null

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1e293b" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        <div style={{ background: "#f0fdf4", borderRadius: "10px", padding: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#16a34a", marginBottom: "8px" }}>{"\u2705"} Strengths</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {fw.pros.map((pro, i) => (
              <div key={i} style={{ fontSize: "12.5px", lineHeight: 1.55, color: "#374151", paddingLeft: "10px", borderLeft: "2px solid #bbf7d0" }}>{pro}</div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fef2f2", borderRadius: "10px", padding: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#dc2626", marginBottom: "8px" }}>{"\u26A0\uFE0F"} Tradeoffs</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {fw.cons.map((con, i) => (
              <div key={i} style={{ fontSize: "12.5px", lineHeight: 1.55, color: "#374151", paddingLeft: "10px", borderLeft: "2px solid #fecaca" }}>{con}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Best For */}
      <div style={{ background: `linear-gradient(135deg, ${fw.accent}, #fff)`, borderRadius: "12px", padding: "16px 18px", border: `1px solid ${fw.color}18` }}>
        <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: fw.color, marginBottom: "6px" }}>{"\u{1F3AF}"} Best for</div>
        <p style={{ margin: 0, lineHeight: 1.7, fontSize: "14px", color: "#374151" }}>{fw.bestFor}</p>
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
