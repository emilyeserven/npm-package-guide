import { useState, useRef } from 'react'
import clsx from 'clsx'

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
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-0 mb-2" id="toc-explainer">{'\u{1F4A1}'} {title}</h2>
      <div className="text-sm leading-7 text-slate-800 dark:text-slate-300">{children}</div>
    </div>
  )
}

export function Gotcha({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2" id="toc-gotcha" style={{ marginTop: 24 }}>{'\u26A0\uFE0F'} Watch out</h2>
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

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-bold mb-5 tracking-tight">{children}</h1>
}

export function SectionSubheading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2 first:mt-0" id={id}>{children}</h2>
}

export function SectionList({ children }: { children: React.ReactNode }) {
  return <div className="mb-5">{children}</div>
}

export function CodeAccordion({ title, children, ext }: { title: string; children: React.ReactNode; ext?: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    const codeEl = contentRef.current?.querySelector('code')
    const text = codeEl?.textContent ?? contentRef.current?.innerText ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="my-4 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div
        className="w-full py-3.5 px-4 bg-slate-50 dark:bg-slate-800 cursor-pointer flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150"
        onClick={() => setOpen(o => !o)}
      >
        <span className="flex items-center gap-2">
          {title}
          {ext && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
              {ext}
            </span>
          )}
        </span>
        <span className="flex items-center gap-2">
          <button
            className={clsx(
              'font-sans text-xs font-semibold py-1 px-2.5 border rounded-md cursor-pointer transition-all duration-150 shrink-0',
              copied
                ? 'border-green-500 text-green-500 bg-green-50 dark:bg-green-500/10'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400'
            )}
            onClick={handleCopy}
          >
            {copied ? '\u2713 Copied!' : 'Copy All'}
          </button>
          <span className={`text-xs inline-block transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>{'\u25BC'}</span>
        </span>
      </div>
      <div ref={contentRef} className={clsx('px-4 pb-4', !open && 'hidden')}>
        {children}
      </div>
    </div>
  )
}

export function MdxPre(props: React.ComponentProps<'pre'>) {
  return (
    <pre
      {...props}
      className={clsx(
        'rounded-xl p-4 overflow-auto text-xs leading-relaxed font-mono my-4 bg-[#1e293b] dark:bg-[#0d1117] text-[#e2e8f0] dark:text-[#e6edf3]',
        props.className
      )}
    />
  )
}
