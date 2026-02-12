export function SectionIntro({ children }: { children: React.ReactNode }) {
  return <div className="section-intro">{children}</div>
}

export function Toc({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-toc">
      <div className="section-toc-title">On this page</div>
      {children}
    </div>
  )
}

export function Explainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="explainer">
      <h2 className="explainer-heading" id="toc-explainer">{'\u{1F4A1}'} {title}</h2>
      <div className="explainer-body">{children}</div>
    </div>
  )
}

export function Gotcha({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="section-subheading" id="toc-gotcha" style={{ marginTop: 24 }}>{'\u26A0\uFE0F'} Watch out</h2>
      <div className="gotcha">{children}</div>
    </>
  )
}

export function ColItem({ children }: { children: React.ReactNode }) {
  return <div className="col-item">{children}</div>
}

export function SectionNote({ children }: { children: React.ReactNode }) {
  return <div className="section-note">{children}</div>
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return <div className="code-block">{children}</div>
}
