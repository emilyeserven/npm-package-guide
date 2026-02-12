import { useState, type ReactNode } from 'react'

export function CIStep({ heading, id, children }: { heading: string; id?: string; children: ReactNode }) {
  return (
    <div className="ci-step">
      <h2 className="ci-step-heading" id={id}>{heading}</h2>
      {children}
    </div>
  )
}

export function CIStepText({ children }: { children: ReactNode }) {
  return <div className="ci-step-text">{children}</div>
}

export function CIYaml({ children }: { children: ReactNode }) {
  return <div className="ci-yaml">{children}</div>
}

export function YamlHeading({ children }: { children?: ReactNode }) {
  return <div className="yaml-heading">{children ?? 'GitHub Actions Example'}</div>
}

export function CITip({ children }: { children: ReactNode }) {
  return <div className="ci-tip">{children}</div>
}

export function CIOverviewCards({ children }: { children: ReactNode }) {
  return <div className="ci-overview-cards">{children}</div>
}

export function CIOverviewCard({ num, title, yaml }: { num: number; title: string; yaml?: string }) {
  return (
    <div className="ci-overview-card">
      <div className="ci-overview-num">{num}</div>
      <div className="ci-overview-card-body">
        <div className="ci-overview-card-title">{title}</div>
        {yaml && <div className="ci-yaml">{yaml}</div>}
      </div>
    </div>
  )
}

export function CIFullExample({ children }: { children: ReactNode }) {
  return (
    <div className="ci-full-example">
      <div className="ci-full-example-label">{'\u{1F4C4}'} Complete GitHub Actions workflow</div>
      <div className="code-block">{children}</div>
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
    <div className="accordion">
      <button className="accordion-toggle" onClick={() => setOpen(prev => !prev)}>
        <span>{'\u{1F916}'} Sample AI prompts for writing tests</span>
        <span className={`accordion-arrow ${open ? 'open' : ''}`}>{'\u25BC'}</span>
      </button>
      <div className={`accordion-body ${open ? 'open' : ''}`}>
        {prompts.map((p, i) => (
          <AiPromptCard key={i} label={p.label} prompt={p.prompt} idx={i} />
        ))}
      </div>
    </div>
  )
}

function AiPromptCard({ label, prompt, idx }: { label: string; prompt: string; idx: number }) {
  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    navigator.clipboard.writeText(prompt).then(() => {
      btn.textContent = '\u2713 Copied!'
      btn.classList.add('copied')
      setTimeout(() => {
        btn.textContent = '\u{1F4CB} Copy'
        btn.classList.remove('copied')
      }, 2000)
    })
  }

  return (
    <div className="ai-prompt-card">
      <div className="ai-prompt-header">
        <span className="ai-prompt-label">{label}</span>
        <button className="ai-prompt-copy" data-prompt-idx={idx} onClick={handleCopy}>{'\u{1F4CB}'} Copy</button>
      </div>
      <div className="ai-prompt-body">{prompt}</div>
    </div>
  )
}

export function MaintenanceTool({ name, emoji, desc, why, yaml, children }: {
  name: string; emoji: string; desc: ReactNode; why: ReactNode; yaml?: ReactNode; children?: ReactNode
}) {
  return (
    <div className="ci-step">
      <h2 className="ci-step-heading" id={`toc-${name}`}>{emoji} {name}</h2>
      <div className="ci-step-text">{desc}</div>
      <div className="ci-step-text"><strong>Why it matters:</strong> {why}</div>
      {yaml && (
        <>
          <div className="yaml-heading">GitHub Actions Example</div>
          <div className="ci-yaml">{yaml}</div>
        </>
      )}
      {children}
    </div>
  )
}

export function GoodTestsList({ children }: { children: ReactNode }) {
  return <ul className="good-tests-list">{children}</ul>
}
