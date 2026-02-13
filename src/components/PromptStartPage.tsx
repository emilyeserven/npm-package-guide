import { contentPages } from '../content/registry'
import { MISTAKE_CATEGORIES, CONTEXT_TECHNIQUES, TOOL_TECHNIQUES, META_TOOLS } from '../data/promptData'
import { PrevNextNav } from './PrevNextNav'
import { JumpButton } from './JumpButton'

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
            {/* Testing Best Practices */}
            <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">Testing Best Practices</h3>
              <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">Common AI mistakes in E2E and unit testing contexts.</div>
              <JumpButton jumpTo="prompt-testing">{'\u2192'} Testing Best Practices</JumpButton>
            </div>
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
            {/* CLAUDE.md Checklist */}
            <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">CLAUDE.md Checklist</h3>
              <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">A comprehensive checklist for building effective CLAUDE.md files.</div>
              <JumpButton jumpTo="prompt-claudemd-checklist">{'\u2192'} CLAUDE.md Checklist</JumpButton>
            </div>
          </div>
        </div>

        {/* Step 3: Tooling & Reference */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">3</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Tooling & Reference</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">CLI commands, advanced integrations, and the workflows that surround AI-assisted development.</div>
            {/* CLI Reference */}
            <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">CLI Quick Reference</h3>
              <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">Searchable, filterable table of CLI commands with category and type filters.</div>
              <JumpButton jumpTo="prompt-cli-reference">{'\u2192'} CLI Quick Reference</JumpButton>
            </div>
            {/* Advanced Tool Usage */}
            <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">Advanced Tool Usage</h3>
              <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">MCP servers, custom slash commands, hooks, and performance optimization.</div>
              <JumpButton jumpTo="prompt-tools-advanced">{'\u2192'} Advanced Tool Usage</JumpButton>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {TOOL_TECHNIQUES.map(tool => (
                  <span key={tool.id} className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {tool.icon} {tool.name}
                  </span>
                ))}
              </div>
            </div>
            {/* Meta-Tooling */}
            <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">Meta-Tooling & Workflows</h3>
              <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">CI/CD integration, prompt versioning, team workflows, and evaluating AI output.</div>
              <JumpButton jumpTo="prompt-meta-tooling">{'\u2192'} Meta-Tooling & Workflows</JumpButton>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {META_TOOLS.map(tool => (
                  <span key={tool.id} className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {tool.icon} {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrevNextNav currentId="prompt-start" />
    </>
  )
}
