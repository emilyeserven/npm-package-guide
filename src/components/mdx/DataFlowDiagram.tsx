import { DATA_FLOW, LAYER_COLORS } from '../../data/archData'

export function DataFlowDiagram() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1e293b" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ background: "#fff", borderRadius: "14px", padding: "22px", boxShadow: "0 1px 6px #0001" }}>
        <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#475569", marginBottom: "4px" }}>{"\u{1F501}"} Data flow through the stack</div>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 14px 0" }}>
          Every request follows this path regardless of which technology fills each layer.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {DATA_FLOW.map((item) => {
            const lc = LAYER_COLORS[item.colorId]
            return (
              <div key={item.step} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "9px", background: "#f8fafc", fontSize: "13.5px" }}>
                <span style={{ background: lc?.color ?? "#94a3b8", color: "#fff", borderRadius: "50%", width: "24px", height: "24px", minWidth: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>{item.step}</span>
                <span style={{ flex: 1, color: "#374151" }}>{item.text}</span>
                <span style={{ fontSize: "10px", fontWeight: 600, color: lc?.color ?? "#94a3b8", background: `${lc?.color ?? "#94a3b8"}10`, padding: "3px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>{item.tag}</span>
              </div>
            )
          })}
        </div>
        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "12px", marginBottom: 0, textAlign: "center" }}>
          All server-side layers run on <strong style={{ color: "#ca8a04" }}>Node.js</strong> &mdash; the JavaScript engine that powers everything outside the browser.
        </p>
      </div>
    </div>
  )
}
