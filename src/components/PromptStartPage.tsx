import { contentPages } from '../content/registry'
import { MISTAKE_CATEGORIES, CONTEXT_TECHNIQUES } from '../data/promptData'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { PrevNextNav } from './PrevNextNav'

const jumpBtnCls = 'inline-flex items-center gap-1.5 text-sm font-bold text-white cursor-pointer bg-blue-500 dark:bg-blue-400 dark:text-slate-900 border-none font-sans py-2 px-3.5 rounded-lg transition-all duration-150 mt-1 shadow-md shadow-blue-500/25 hover:bg-blue-600 dark:hover:bg-blue-500 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-500/30'

function JumpButton({ jumpTo, children }: { jumpTo: string; children: React.ReactNode }) {
  const navigate = useNavigateToSection()
  return (
    <button className={jumpBtnCls} onClick={() => navigate(jumpTo)}>
      {children}
    </button>
  )
}

const mistakeDescriptions: Record<string, string> = {
  logic: 'Off-by-one errors, inverted conditions, edge case blindness, and math formula mistakes.',
  apis: 'Non-existent packages, deprecated APIs, and cross-language confusion.',
  structural: 'Over-engineering, incomplete code, ignored project patterns, and security gaps.',
  style: 'Inconsistent naming, unnecessary comments, and formatting drift.',
}

const techniqueDescriptions: Record<string, string> = {
  'system-prompt': 'Structure your system prompt like a well-organized document for maximum impact.',
  'claude-md': 'Persistent project context that survives across sessions.',
  chaining: 'Break complex tasks into sequential, focused steps to reduce hallucination.',
  'few-shot': 'Show 2\u20133 examples of desired output to establish a clear pattern.',
  window: 'Keep your context lean and high-signal for better model performance.',
  thinking: 'Ask the model to reason step-by-step before acting.',
}

export function PromptStartPage() {
  return (
    <>
      <div>
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Prompt Engineering Field Guide</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-1">Practical patterns for working with AI coding assistants.</p>
          <p className="text-gray-400 dark:text-slate-500 text-sm mb-0">{'\u{1F4A1}'} Learn what to watch for, how to steer AI effectively, and the CLI commands AI uses most.</p>
        </div>

        <h2 className="text-2xl font-bold mb-5 tracking-tight">{'\u{1F4DA}'} Learning Path</h2>

        {/* Step 1: Common AI Mistakes */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">1</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Common AI Mistakes</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Learn the most frequent mistakes AI coding assistants make and how to prevent them with better prompts.</div>
            {MISTAKE_CATEGORIES.map(cat => {
              const pageId = `prompt-mistakes-${cat.id}`
              const page = contentPages.get(pageId)
              const title = page?.title ?? cat.name
              const desc = mistakeDescriptions[cat.id] ?? ''
              return (
                <div key={cat.id} className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{title}</h3>
                  <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">{desc}</div>
                  <JumpButton jumpTo={pageId}>{'\u2192'} {title}</JumpButton>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 2: Context Management */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">2</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Context Management</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Techniques for steering AI effectively &mdash; from system prompts and memory files to prompt chaining and few-shot examples.</div>
            {CONTEXT_TECHNIQUES.map(tech => {
              const pageId = `prompt-ctx-${tech.id}`
              const page = contentPages.get(pageId)
              const title = page?.title ?? tech.name
              const desc = techniqueDescriptions[tech.id] ?? tech.description
              return (
                <div key={tech.id} className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{title}</h3>
                  <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">{desc}</div>
                  <JumpButton jumpTo={pageId}>{'\u2192'} {title}</JumpButton>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 3: CLI Quick Reference */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative last:border-b-0">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">3</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">CLI Quick Reference</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Commands that AI coding assistants use frequently &mdash; Claude Code essentials, file search patterns, git workflows, and more.</div>
            {(() => {
              const cliPage = contentPages.get('prompt-cli-reference')
              const cliLabel = cliPage?.title ?? 'CLI Quick Reference'
              return <JumpButton jumpTo="prompt-cli-reference">{'\u2192'} {cliLabel}</JumpButton>
            })()}
          </div>
        </div>
      </div>
      <PrevNextNav currentId="prompt-start" />
    </>
  )
}
