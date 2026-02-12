import { useState } from 'react'
import { FRAMEWORK_PAGES } from '../../data/archData'
import type { FrameworkCapability } from '../../data/archData'

function CapabilityBar({ cap, color, accent, isActive, onClick }: { cap: FrameworkCapability; color: string; accent: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "0", background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "stretch", borderRadius: "10px", overflow: "hidden",
        transition: "all 0.2s ease",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        boxShadow: isActive ? `0 3px 16px ${color}30` : "0 1px 4px #0001",
      }}
    >
      <div style={{ width: "6px", minHeight: "100%", background: color, opacity: isActive ? 1 : 0.35, transition: "opacity 0.2s" }} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: isActive ? accent : "#fff", transition: "background 0.2s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>{cap.icon}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: isActive ? color : "#374151" }}>{cap.name}</div>
          </div>
        </div>
        <span style={{ fontSize: "12px", color: "#94a3b8", transition: "transform 0.2s", transform: isActive ? "rotate(90deg)" : "rotate(0)" }}>{"\u25B6"}</span>
      </div>
    </button>
  )
}

export function FrameworkExplorer({ frameworkId }: { frameworkId: string }) {
  const fw = FRAMEWORK_PAGES.find(f => f.id === frameworkId)
  const [activeId, setActiveId] = useState(fw?.capabilities[0]?.id ?? "")
  const active = fw?.capabilities.find(c => c.id === activeId)

  if (!fw) return <div>Framework not found: {frameworkId}</div>

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1e293b" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap" rel="stylesheet" />

      {/* Capability bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", padding: "0 4px" }}>
          <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Built on: {fw.builtOn.join(" + ")}</span>
          <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
        </div>
        {fw.capabilities.map(cap => (
          <CapabilityBar key={cap.id} cap={cap} color={fw.color} accent={fw.accent} isActive={activeId === cap.id} onClick={() => setActiveId(cap.id)} />
        ))}
      </div>

      {/* Detail panel */}
      {active && (
        <div key={active.id} style={{ display: "flex", flexDirection: "column", gap: "14px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 2px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", color: fw.color }}>
              {active.icon} {active.name}
            </span>
            <div style={{ flex: 1, height: "1px", background: `${fw.color}25` }} />
          </div>

          {/* Description */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "18px 20px", boxShadow: "0 1px 5px #0001", borderLeft: `4px solid ${fw.color}` }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: fw.color, marginBottom: "6px" }}>How it works</div>
            <p style={{ margin: 0, lineHeight: 1.75, fontSize: "14.5px", color: "#374151" }}>{active.description}</p>
          </div>

          {/* Key points */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "18px 20px", boxShadow: "0 1px 5px #0001" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: fw.color, marginBottom: "10px" }}>
              {"\u2705"} Key takeaways
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {active.keyPoints.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>
                  <span style={{ background: fw.color, color: "#fff", borderRadius: "50%", width: "20px", height: "20px", minWidth: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, marginTop: "2px" }}>{i + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
