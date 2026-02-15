import { useState, type ReactNode } from 'react'
import clsx from 'clsx'

export function CIStep({ heading, id, children }: { heading: string; id?: string; children: ReactNode }) {
  return (
    <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:mb-0 last:pb-0">
      <h2 className="text-2xl font-bold mt-0 mb-2 text-slate-900 dark:text-slate-100" id={id}>{heading}</h2>
      {children}
    </div>
  )
}

export function CIStepText({ children }: { children: ReactNode }) {
  return <div className="text-sm leading-7 text-slate-800 dark:text-slate-300 mb-3">{children}</div>
}

export function CIYaml({ children }: { children: ReactNode }) {
  return <div className="font-mono text-xs leading-relaxed bg-slate-800 dark:bg-gray-950 text-slate-200 py-3 px-4 rounded-lg mb-2.5 whitespace-pre-wrap overflow-x-auto">{children}</div>
}

export function YamlHeading({ children }: { children?: ReactNode }) {
  return <div className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1.5 mt-4">{children ?? 'GitHub Actions Example'}</div>
}

export function CITip({ children }: { children: ReactNode }) {
  return <div className="ci-tip text-sm text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/20 py-2.5 px-3.5 rounded-lg leading-relaxed">{children}</div>
}

export function CIOverviewCards({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 mb-6">{children}</div>
}

export function CIOverviewCard({ num, title, yaml }: { num: number; title: string; yaml?: string }) {
  return (
    <div className="flex gap-3.5 p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800">
      <div className="w-7 h-7 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0">{num}</div>
      <div className="flex-1 min-w-0">
        <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">{title}</div>
        {yaml && <div className="font-mono text-xs leading-relaxed bg-slate-800 dark:bg-gray-950 text-slate-200 py-3 px-4 rounded-lg mb-2.5 whitespace-pre-wrap overflow-x-auto">{yaml}</div>}
      </div>
    </div>
  )
}

export function CIFullExample({ children }: { children: ReactNode }) {
  return (
    <div className="mt-7">
      <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2.5">{'\u{1F4C4}'} Complete GitHub Actions workflow</div>
      <div className="code-block mt-4 bg-slate-800 dark:bg-gray-950 text-slate-200 rounded-xl p-5 font-mono text-xs leading-7 overflow-x-auto whitespace-pre-wrap break-words">{children}</div>
    </div>
  )
}

interface AiPrompt {
  label: string
  prompt: string
}

export function AiPromptsAccordion({ prompts }: { prompts: AiPrompt[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-4 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <button className="w-full py-3.5 px-4.5 bg-slate-50 dark:bg-slate-800 border-none cursor-pointer flex items-center justify-between font-sans text-sm font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-150 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setOpen(prev => !prev)}>
        <span>{'\u{1F916}'} Sample AI prompts for writing tests</span>
        <span className={clsx('text-xs inline-block transition-transform duration-200', open && 'rotate-180')}>{'\u25BC'}</span>
      </button>
      <div className={clsx('accordion-body', open && 'open')}>
        {prompts.map((p, i) => (
          <AiPromptCard key={i} label={p.label} prompt={p.prompt} />
        ))}
      </div>
    </div>
  )
}

function AiPromptCard({ label, prompt }: { label: string; prompt: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mb-3.5 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center py-2 px-3.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{label}</span>
        <button
          className={clsx(
            'font-sans text-xs font-semibold py-1 px-2.5 border rounded-md cursor-pointer transition-all duration-150 shrink-0',
            copied
              ? 'border-green-500 text-green-500 bg-green-50 dark:bg-green-500/10'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400'
          )}
          onClick={handleCopy}
        >
          {copied ? '\u2713 Copied!' : '\u{1F4CB} Copy'}
        </button>
      </div>
      <div className="font-mono text-xs py-2.5 px-3.5 leading-relaxed text-gray-500 dark:text-slate-400 whitespace-pre-wrap">{prompt}</div>
    </div>
  )
}

export function MaintenanceTool({ name, emoji, desc, why, yaml, children }: {
  name: string; emoji: string; desc: ReactNode; why: ReactNode; yaml?: ReactNode; children?: ReactNode
}) {
  return (
    <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:mb-0 last:pb-0">
      <h2 className="text-2xl font-bold mt-0 mb-2 text-slate-900 dark:text-slate-100" id={`toc-${name}`}>{emoji} {name}</h2>
      <div className="text-sm leading-7 text-slate-800 dark:text-slate-300 mb-3">{desc}</div>
      <div className="text-sm leading-7 text-slate-800 dark:text-slate-300 mb-3"><strong>Why it matters:</strong> {why}</div>
      {yaml && (
        <>
          <div className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1.5 mt-4">GitHub Actions Example</div>
          <div className="font-mono text-xs leading-relaxed bg-slate-800 dark:bg-gray-950 text-slate-200 py-3 px-4 rounded-lg mb-2.5 whitespace-pre-wrap overflow-x-auto">{yaml}</div>
        </>
      )}
      {children}
    </div>
  )
}

export function GoodTestsList({ children }: { children: ReactNode }) {
  return <ul className="good-tests-list list-disc pl-5 m-0">{children}</ul>
}
