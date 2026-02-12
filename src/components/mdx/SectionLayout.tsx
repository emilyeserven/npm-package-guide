export function SectionIntro({ children }: { children: React.ReactNode }) {
  return <div className="section-intro text-sm text-slate-800 dark:text-slate-300 leading-7 mb-6">{children}</div>
}

export function Toc({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 py-3.5 px-4.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">On this page</div>
      {children}
    </div>
  )
}

export function Explainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0 mb-2" id="toc-explainer">{'\u{1F4A1}'} {title}</h2>
      <div className="text-sm leading-7 text-slate-800 dark:text-slate-300">{children}</div>
    </div>
  )
}

export function Gotcha({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2" id="toc-gotcha" style={{ marginTop: 24 }}>{'\u26A0\uFE0F'} Watch out</h2>
      <div className="mt-0 text-sm leading-relaxed text-slate-800 dark:text-slate-300">{children}</div>
    </>
  )
}

export function ColItem({ children }: { children: React.ReactNode }) {
  return <div className="col-item text-sm leading-relaxed py-2 pl-4 relative text-slate-800 dark:text-slate-300">{children}</div>
}

export function SectionNote({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/20 py-2.5 px-3.5 rounded-lg leading-relaxed my-4">{children}</div>
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return <div className="code-block mt-4 bg-slate-800 dark:bg-gray-950 text-slate-200 rounded-xl p-5 font-mono text-xs leading-7 overflow-x-auto whitespace-pre-wrap break-words">{children}</div>
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold mb-5 tracking-tight">{children}</h1>
}

export function SectionSubheading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2 first:mt-0" id={id}>{children}</h2>
}

export function SectionList({ children }: { children: React.ReactNode }) {
  return <div className="mb-5">{children}</div>
}
