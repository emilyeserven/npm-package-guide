import { LAYER_COLORS } from '../../data/archData'

const LAYERS = [
  { id: "frontend", label: "Frontend", desc: "What users see & interact with", icon: "\u{1F3A8}", example: "React, Angular, Vue" },
  { id: "server", label: "Server Framework", desc: "Handles requests & business logic", icon: "\u26A1", example: "Express, Fastify, Django, Rails" },
  { id: "runtime", label: "Runtime / Platform", desc: "Executes your server code", icon: "\u{1F527}", example: "Node.js, Python, Ruby, PHP" },
  { id: "database", label: "Database", desc: "Stores data permanently", icon: "\u{1F5C4}\uFE0F", example: "PostgreSQL, MongoDB, MySQL" },
]

export function LayerDiagram() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1e293b" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", padding: "0 4px" }}>
          <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>User&apos;s Browser</span>
          <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
        </div>

        {LAYERS.map((layer) => {
          const lc = LAYER_COLORS[layer.id]
          return (
            <div key={layer.id} style={{
              display: "flex", alignItems: "stretch", borderRadius: "10px", overflow: "hidden",
              boxShadow: "0 1px 4px #0001",
            }}>
              <div style={{ width: "6px", minHeight: "100%", background: lc?.color ?? "#94a3b8" }} />
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "18px" }}>{layer.icon}</span>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: lc?.color ?? "#374151" }}>{layer.label}</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>{layer.desc}</div>
                  </div>
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500, textAlign: "right", maxWidth: "160px" }}>
                  {layer.example}
                </div>
              </div>
            </div>
          )
        })}

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "2px", padding: "0 4px" }}>
          <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Stored on Disk</span>
        </div>
      </div>
    </div>
  )
}
