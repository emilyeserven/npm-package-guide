import { useState } from 'react'
import { FRAMEWORK_PAGES } from '../../../data/archData'
import type { FrameworkCapability } from '../../../data/archData'
import { useIsDark } from '../../../hooks/useTheme'
import { theme, tc } from '../../../helpers/themeColors'

function CapabilityBar({ cap, color, accent, darkAccent, isActive, onClick, isDark }: { cap: FrameworkCapability; color: string; accent: string; darkAccent: string; isActive: boolean; onClick: () => void; isDark: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "0", background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "stretch", borderRadius: "10px", overflow: "hidden",
        transition: "all 0.2s ease",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        boxShadow: isActive ? `0 3px 16px ${color}30` : tc(theme.shadowSm, isDark),
      }}
    >
      <div style={{ width: "6px", minHeight: "100%", background: color, opacity: isActive ? 1 : 0.35, transition: "opacity 0.2s" }} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: isActive ? (isDark ? darkAccent : accent) : tc(theme.bgCard, isDark), transition: "background 0.2s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>{cap.icon}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: isActive ? color : tc(theme.textSecondary, isDark) }}>{cap.name}</div>
          </div>
        </div>
        <span style={{ fontSize: "12px", color: tc(theme.textMuted, isDark), transition: "transform 0.2s", transform: isActive ? "rotate(90deg)" : "rotate(0)" }}>{"\u25B6"}</span>
      </div>
    </button>
  )
}

export function FrameworkExplorer({ frameworkId }: { frameworkId: string }) {
  const isDark = useIsDark()
  const fw = FRAMEWORK_PAGES.find(f => f.id === frameworkId)
  const [activeId, setActiveId] = useState(fw?.capabilities[0]?.id ?? "")
  const active = fw?.capabilities.find(c => c.id === activeId)

  if (!fw) return <div>Framework not found: {frameworkId}</div>

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: tc(theme.textPrimary, isDark) }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap" rel="stylesheet" />

      {/* Capability bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", padding: "0 4px" }}>
          <span style={{ fontSize: "11px", color: tc(theme.textMuted, isDark), fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Built on: {fw.builtOn.join(" + ")}</span>
          <div style={{ flex: 1, height: "1px", background: tc(theme.borderDefault, isDark) }} />
        </div>
        {fw.capabilities.map(cap => (
          <CapabilityBar key={cap.id} cap={cap} color={fw.color} accent={fw.accent} darkAccent={fw.darkAccent} isActive={activeId === cap.id} onClick={() => setActiveId(cap.id)} isDark={isDark} />
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
          <div style={{ background: tc(theme.bgCard, isDark), borderRadius: "12px", padding: "18px 20px", boxShadow: tc(theme.shadowMd, isDark), borderLeft: `4px solid ${fw.color}` }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: fw.color, marginBottom: "6px" }}>How it works</div>
            <p style={{ margin: 0, lineHeight: 1.75, fontSize: "14.5px", color: tc(theme.textSecondary, isDark) }}>{active.description}</p>
          </div>

          {/* Key points */}
          <div style={{ background: tc(theme.bgCard, isDark), borderRadius: "12px", padding: "18px 20px", boxShadow: tc(theme.shadowMd, isDark) }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: fw.color, marginBottom: "10px" }}>
              {"\u2705"} Key takeaways
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {active.keyPoints.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: 1.6, color: tc(theme.textSecondary, isDark) }}>
                  <span style={{ background: fw.color, color: "#fff", borderRadius: "50%", width: "20px", height: "20px", minWidth: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, marginTop: "2px" }}>{i + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
