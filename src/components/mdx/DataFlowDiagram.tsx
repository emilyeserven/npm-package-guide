import { DATA_FLOW, LAYER_COLORS } from '../../data/archData'
import { useTheme } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'

export function DataFlowDiagram() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: ds("#1e293b", "#f1f5f9", isDark) }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ background: ds("#fff", "#1e293b", isDark), borderRadius: "14px", padding: "22px", boxShadow: ds("0 1px 6px #0001", "0 1px 6px #0003", isDark) }}>
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ds("#475569", "#94a3b8", isDark), marginBottom: "4px" }}>{"\u{1F501}"} Data flow through the stack</div>
        <p style={{ fontSize: "13px", color: ds("#94a3b8", "#64748b", isDark), margin: "0 0 14px 0" }}>
          Every request follows this path regardless of which technology fills each layer.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {DATA_FLOW.map((item) => {
            const lc = LAYER_COLORS[item.colorId]
            return (
              <div key={item.step} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "9px", background: ds("#f8fafc", "#0f172a", isDark), fontSize: "13.5px" }}>
                <span style={{ background: lc?.color ?? "#94a3b8", color: "#fff", borderRadius: "50%", width: "24px", height: "24px", minWidth: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>{item.step}</span>
                <span style={{ flex: 1, color: ds("#374151", "#e2e8f0", isDark) }}>{item.text}</span>
                <span style={{ fontSize: "10px", fontWeight: 600, color: lc?.color ?? "#94a3b8", background: `${lc?.color ?? "#94a3b8"}10`, padding: "3px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>{item.tag}</span>
              </div>
            )
          })}
        </div>
        <p style={{ fontSize: "12px", color: ds("#94a3b8", "#64748b", isDark), marginTop: "12px", marginBottom: 0, textAlign: "center" }}>
          All server-side layers run on <strong style={{ color: ds("#ca8a04", "#facc15", isDark) }}>Node.js</strong> &mdash; the JavaScript engine that powers everything outside the browser.
        </p>
      </div>
    </div>
  )
}
