import { useState } from 'react'
import { STACK_PAGES } from '../../data/archData'
import type { StackComponent } from '../../data/archData'
import { useIsDark } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'

function ComponentBar({ comp, isActive, onClick, isDark }: { comp: StackComponent; isActive: boolean; onClick: () => void; isDark: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "0", background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "stretch", borderRadius: "10px", overflow: "hidden",
        transition: "all 0.2s ease",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        boxShadow: isActive ? `0 3px 16px ${comp.color}30` : ds("0 1px 4px #0001", "0 1px 4px #0003", isDark),
      }}
    >
      <div style={{ width: "6px", minHeight: "100%", background: comp.color, opacity: isActive ? 1 : 0.35, transition: "opacity 0.2s" }} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: isActive ? (isDark ? comp.darkAccent : comp.accent) : ds("#fff", "#1e293b", isDark), transition: "background 0.2s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>{comp.icon}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: isActive ? comp.color : ds("#374151", "#e2e8f0", isDark) }}>{comp.name}</div>
            <div style={{ fontSize: "11px", color: ds("#94a3b8", "#64748b", isDark), fontWeight: 500 }}>{comp.role}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {comp.changed && (
            <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", background: `${comp.color}18`, color: comp.color, padding: "3px 8px", borderRadius: "5px" }}>Modified</span>
          )}
          <span style={{ fontSize: "12px", color: ds("#94a3b8", "#64748b", isDark), transition: "transform 0.2s", transform: isActive ? "rotate(90deg)" : "rotate(0)" }}>{"\u25B6"}</span>
        </div>
      </div>
    </button>
  )
}

function ComparisonToggle({ comp, isDark }: { comp: StackComponent; isDark: boolean }) {
  const [showModified, setShowModified] = useState(true)
  return (
    <div style={{ background: ds("#fff", "#1e293b", isDark), borderRadius: "12px", border: `1.5px solid ${comp.color}18`, overflow: "hidden" }}>
      <div style={{ display: "flex", borderBottom: `1px solid ${comp.color}12` }}>
        {[false, true].map((mod) => (
          <button key={String(mod)} onClick={() => setShowModified(mod)} style={{
            flex: 1, padding: "11px", border: "none", cursor: "pointer",
            fontFamily: "inherit", fontSize: "13px", fontWeight: 600,
            background: showModified === mod ? (isDark ? comp.darkAccent : comp.accent) : "transparent",
            color: showModified === mod ? comp.color : ds("#94a3b8", "#64748b", isDark),
            borderBottom: showModified === mod ? `3px solid ${comp.color}` : "3px solid transparent",
            transition: "all 0.2s",
          }}>
            {mod ? `Modified: ${comp.name}` : `Traditional: ${comp.traditionalName}`}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px 18px", fontSize: "14px", lineHeight: 1.75, color: ds("#374151", "#e2e8f0", isDark) }}>
        {showModified ? comp.modifiedDesc : comp.traditionalDesc}
      </div>
    </div>
  )
}

function UnchangedExplanation({ comp, isDark }: { comp: StackComponent; isDark: boolean }) {
  return (
    <div style={{ background: ds("#fff", "#1e293b", isDark), borderRadius: "12px", border: `1.5px solid ${comp.color}18`, padding: "16px 18px" }}>
      <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ds("#94a3b8", "#64748b", isDark), marginBottom: "8px" }}>Same in both stacks &mdash; no changes here</div>
      <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.75, color: ds("#374151", "#e2e8f0", isDark) }}>{comp.description}</p>
    </div>
  )
}

function PlainDescription({ comp, isDark }: { comp: StackComponent; isDark: boolean }) {
  return (
    <div style={{ background: ds("#fff", "#1e293b", isDark), borderRadius: "12px", border: `1.5px solid ${comp.color}18`, padding: "16px 18px" }}>
      <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: ds("#94a3b8", "#64748b", isDark), marginBottom: "8px" }}>About {comp.name}</div>
      <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.75, color: ds("#374151", "#e2e8f0", isDark) }}>{comp.description}</p>
    </div>
  )
}

export function StackExplorer({ stackId }: { stackId: string }) {
  const isDark = useIsDark()
  const stack = STACK_PAGES.find(s => s.id === stackId)
  const [activeId, setActiveId] = useState(stack?.components[0]?.id ?? "")
  const active = stack?.components.find(c => c.id === activeId)
  const isPfrn = stackId === "pfrn"

  // Letter header: show only when all piece first letters are unique (MERN, PFRN, MEAN, LAMP)
  const pieceLetters = stack?.pieces.map(p => p[0].toUpperCase()) ?? []
  const showLetterHeader = new Set(pieceLetters).size === pieceLetters.length && pieceLetters.length > 0
  const letterItems = showLetterHeader && stack
    ? stack.pieces.map(piece => {
        const letter = piece[0].toUpperCase()
        const comp = stack.components.find(c => c.name[0].toUpperCase() === letter)
        return { letter, comp }
      })
    : []

  if (!stack) return <div>Stack not found: {stackId}</div>

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: ds("#1e293b", "#f1f5f9", isDark) }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Clickable letter header */}
      {showLetterHeader && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "38px",
            letterSpacing: "-1px",
            marginBottom: "4px",
            display: "flex",
            justifyContent: "center",
            gap: "3px",
            flexWrap: "wrap",
          }}>
            {letterItems.map(({ letter, comp }) => (
              <span
                key={letter}
                onClick={() => comp && setActiveId(comp.id)}
                style={{
                  color: comp && activeId === comp.id ? comp.color : ds("#cbd5e1", "#475569", isDark),
                  cursor: "pointer",
                  transition: "color 0.25s",
                }}
              >
                {letter}
              </span>
            ))}
            <span style={{
              color: ds("#cbd5e1", "#475569", isDark),
              marginLeft: "6px",
              fontSize: "26px",
              alignSelf: "center",
            }}>Stack</span>
          </div>
        </div>
      )}

      {/* Component bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", padding: "0 4px" }}>
          <span style={{ fontSize: "11px", color: ds("#94a3b8", "#64748b", isDark), fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>User&apos;s Browser</span>
          <div style={{ flex: 1, height: "1px", background: ds("#e2e8f0", "#334155", isDark) }} />
        </div>
        {stack.components.map(comp => (
          <ComponentBar key={comp.id} comp={comp} isActive={activeId === comp.id} onClick={() => setActiveId(comp.id)} isDark={isDark} />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "2px", padding: "0 4px" }}>
          <div style={{ flex: 1, height: "1px", background: ds("#e2e8f0", "#334155", isDark) }} />
          <span style={{ fontSize: "11px", color: ds("#94a3b8", "#64748b", isDark), fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Infrastructure</span>
        </div>
      </div>

      {/* Detail panel */}
      {active && (
        <div key={active.id} style={{ display: "flex", flexDirection: "column", gap: "14px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 2px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", color: active.color }}>
              {active.icon} {active.name} &mdash; {active.role}
            </span>
            <div style={{ flex: 1, height: "1px", background: `${active.color}25` }} />
          </div>

          {/* Purpose */}
          <div style={{ background: ds("#fff", "#1e293b", isDark), borderRadius: "12px", padding: "18px 20px", boxShadow: ds("0 1px 5px #0001", "0 1px 5px #0003", isDark), borderLeft: `4px solid ${active.color}` }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: active.color, marginBottom: "6px" }}>Why does this layer exist?</div>
            <p style={{ margin: 0, lineHeight: 1.75, fontSize: "14.5px", color: ds("#374151", "#e2e8f0", isDark) }}>{active.purpose}</p>
          </div>

          {/* Description / Comparison */}
          {isPfrn && active.changed
            ? <ComparisonToggle comp={active} isDark={isDark} />
            : isPfrn && active.traditionalName !== undefined
              ? <UnchangedExplanation comp={active} isDark={isDark} />
              : <PlainDescription comp={active} isDark={isDark} />
          }

          {/* Analogy */}
          <div style={{ background: `linear-gradient(135deg, ${isDark ? active.darkAccent : active.accent}, ${ds("#fff", "#1e293b", isDark)})`, borderRadius: "12px", padding: "16px 18px", border: `1px solid ${active.color}18` }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: active.color, marginBottom: "6px" }}>{"\u{1F4A1}"} Analogy</div>
            <p style={{ margin: 0, lineHeight: 1.7, fontSize: "14px", color: ds("#374151", "#e2e8f0", isDark), fontStyle: "italic" }}>{active.analogy}</p>
          </div>

          {/* Key features */}
          <div style={{ background: ds("#fff", "#1e293b", isDark), borderRadius: "12px", padding: "18px 20px", boxShadow: ds("0 1px 5px #0001", "0 1px 5px #0003", isDark) }}>
            <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: active.color, marginBottom: "10px" }}>
              {active.changed ? `\u{1F504} What changes with ${active.name}?` : "\u2705 Key takeaways"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {active.keyFeatures.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: 1.6, color: ds("#374151", "#e2e8f0", isDark) }}>
                  <span style={{ background: active.color, color: "#fff", borderRadius: "50%", width: "20px", height: "20px", minWidth: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, marginTop: "2px" }}>{i + 1}</span>
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
