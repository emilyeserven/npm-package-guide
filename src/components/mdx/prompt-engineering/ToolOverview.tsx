import { TOOL_TECHNIQUES } from '../../../data/promptData'

interface DecisionScenario {
  scenario: string
  toolId: string
  reason: string
}

const DECISION_SCENARIOS: DecisionScenario[] = [
  {
    scenario: 'You need Claude to access external data, APIs, or systems it can\'t reach natively',
    toolId: 'mcp-servers',
    reason: 'MCP servers extend Claude with tools for databases, web search, file systems, and APIs',
  },
  {
    scenario: 'You repeat the same multi-paragraph prompt for a common task',
    toolId: 'skills',
    reason: 'Slash commands turn complex prompts into a single /project:name invocation',
  },
  {
    scenario: 'You need to enforce rules automatically on every file change',
    toolId: 'hooks',
    reason: 'PostToolUse hooks run formatters, linters, or tests after every Write/Edit',
  },
  {
    scenario: 'You\'re integrating Claude into CI/CD or batch workflows',
    toolId: 'optimization',
    reason: 'Headless mode, piped context, and JSON output enable scripted automation',
  },
  {
    scenario: 'You want to encode a complex, multi-step review or migration workflow',
    toolId: 'claude-skills',
    reason: 'Skills combine instructions, tool usage, and verification into structured packages',
  },
  {
    scenario: 'You need to prevent Claude from running dangerous commands',
    toolId: 'hooks',
    reason: 'PreToolUse hooks intercept and block operations before they execute',
  },
  {
    scenario: 'You want to standardize how your team uses AI across projects',
    toolId: 'skills',
    reason: 'Project-level commands in .claude/commands/ are shared via git',
  },
  {
    scenario: 'You need Claude to remember decisions across sessions',
    toolId: 'mcp-servers',
    reason: 'The Memory MCP server provides persistent knowledge graph storage',
  },
]

const TOOL_COLORS: Record<string, { bg: string; border: string; text: string; darkBg: string; darkBorder: string; darkText: string }> = {
  'mcp-servers': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', darkBg: 'dark:bg-blue-950/30', darkBorder: 'dark:border-blue-800', darkText: 'dark:text-blue-300' },
  'skills': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', darkBg: 'dark:bg-purple-950/30', darkBorder: 'dark:border-purple-800', darkText: 'dark:text-purple-300' },
  'hooks': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', darkBg: 'dark:bg-orange-950/30', darkBorder: 'dark:border-orange-800', darkText: 'dark:text-orange-300' },
  'optimization': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', darkBg: 'dark:bg-amber-950/30', darkBorder: 'dark:border-amber-800', darkText: 'dark:text-amber-300' },
  'claude-skills': { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-800', darkBg: 'dark:bg-teal-950/30', darkBorder: 'dark:border-teal-800', darkText: 'dark:text-teal-300' },
}

export function ToolOverview() {
  return (
    <div className="space-y-6">
      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOL_TECHNIQUES.map(tool => {
          const colors = TOOL_COLORS[tool.id] ?? TOOL_COLORS['mcp-servers']
          return (
            <div
              key={tool.id}
              className={`${colors.bg} ${colors.darkBg} border ${colors.border} ${colors.darkBorder} rounded-xl p-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{tool.icon}</span>
                <h4 className={`text-lg font-semibold ${colors.text} ${colors.darkText}`}>
                  {tool.name}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {tool.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ToolDecisionMatrix() {
  return (
    <div className="space-y-3">
      {DECISION_SCENARIOS.map((scenario, i) => {
        const tool = TOOL_TECHNIQUES.find(t => t.id === scenario.toolId)
        const colors = TOOL_COLORS[scenario.toolId] ?? TOOL_COLORS['mcp-servers']
        return (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
                  {scenario.scenario}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {scenario.reason}
                </p>
              </div>
              <div className={`${colors.bg} ${colors.darkBg} border ${colors.border} ${colors.darkBorder} rounded-lg px-3 py-1.5 shrink-0 flex items-center gap-1.5`}>
                <span className="text-sm">{tool?.icon}</span>
                <span className={`text-xs font-semibold ${colors.text} ${colors.darkText}`}>
                  {tool?.name}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ToolComboPatterns() {
  const combos = [
    {
      name: 'Automated Code Review',
      tools: ['mcp-servers', 'claude-skills', 'hooks'],
      description: 'A skill defines the review workflow, MCP Fetch pulls relevant documentation, and a PostToolUse hook runs lint after each fix.',
    },
    {
      name: 'Team Onboarding',
      tools: ['claude-skills', 'mcp-servers'],
      description: 'An onboarding skill walks through the codebase while the GitHub MCP server pulls recent PRs and issues for context.',
    },
    {
      name: 'CI/CD Pipeline',
      tools: ['optimization', 'hooks', 'claude-skills'],
      description: 'Headless mode runs Claude in CI, a review skill defines the analysis, and hooks auto-format any generated code.',
    },
    {
      name: 'Safety-First Development',
      tools: ['hooks', 'skills', 'mcp-servers'],
      description: 'PreToolUse hooks block dangerous operations, slash commands enforce review checklists, and Fetch pulls OWASP guidance.',
    },
  ]

  return (
    <div className="space-y-4">
      {combos.map((combo, i) => (
        <div
          key={i}
          className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4"
        >
          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            {combo.name}
          </h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {combo.tools.map(toolId => {
              const tool = TOOL_TECHNIQUES.find(t => t.id === toolId)
              const colors = TOOL_COLORS[toolId] ?? TOOL_COLORS['mcp-servers']
              return (
                <span
                  key={toolId}
                  className={`${colors.bg} ${colors.darkBg} border ${colors.border} ${colors.darkBorder} rounded-md px-2 py-0.5 text-xs font-medium ${colors.text} ${colors.darkText} flex items-center gap-1`}
                >
                  <span>{tool?.icon}</span> {tool?.name}
                </span>
              )
            })}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {combo.description}
          </p>
        </div>
      ))}
    </div>
  )
}
