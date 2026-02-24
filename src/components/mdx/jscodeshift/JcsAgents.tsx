import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { TimelineFlow } from '../TimelineFlow'

interface AgentCard {
  icon: string
  title: string
  body: string
  iconBg: string
  iconDarkBg: string
  iconColor: string
  iconDarkColor: string
}

const AGENT_CARDS: AgentCard[] = [
  {
    icon: '\uD83E\uDD16',
    title: 'AI Writes, jscodeshift Runs',
    body: 'Ask your AI agent to generate a jscodeshift transform, then run it yourself. The transform is inspectable, testable, and deterministic \u2014 unlike having the AI edit each file manually.',
    iconBg: 'rgba(96,165,250,0.12)',
    iconDarkBg: 'rgba(96,165,250,0.12)',
    iconColor: '#3b82f6',
    iconDarkColor: '#60a5fa',
  },
  {
    icon: '\uD83D\uDD01',
    title: 'Iterate on Transforms',
    body: 'Use the AI agent in a feedback loop: generate transform \u2192 test \u2192 review failures \u2192 refine. Each iteration produces a better codemod. The tests serve as the ground truth.',
    iconBg: 'rgba(52,211,153,0.12)',
    iconDarkBg: 'rgba(52,211,153,0.12)',
    iconColor: '#059669',
    iconDarkColor: '#34d399',
  },
  {
    icon: '\uD83D\uDCCB',
    title: 'Migration Planning',
    body: 'AI agents can analyze a codebase, identify all patterns that need migration, and generate a suite of codemods \u2014 one per pattern \u2014 with tests for each.',
    iconBg: 'rgba(167,139,250,0.12)',
    iconDarkBg: 'rgba(167,139,250,0.12)',
    iconColor: '#7c3aed',
    iconDarkColor: '#a78bfa',
  },
]

/** AI integration approach cards. */
export function JcsAgentCards() {
  const isDark = useIsDark()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      {AGENT_CARDS.map(card => (
        <div
          key={card.title}
          className="rounded-xl border p-5 transition-all hover:-translate-y-0.5"
          style={{
            background: ds('#f8fafc', '#1e293b', isDark),
            borderColor: ds('#e2e8f0', '#334155', isDark),
          }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base mb-3"
            style={{
              background: ds(card.iconBg, card.iconDarkBg, isDark),
              color: ds(card.iconColor, card.iconDarkColor, isDark),
            }}
          >
            {card.icon}
          </div>
          <h4
            className="font-mono text-sm font-medium mb-2"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {card.title}
          </h4>
          <p
            className="text-sm m-0 leading-relaxed"
            style={{ color: ds('#64748b', '#94a3b8', isDark) }}
          >
            {card.body}
          </p>
        </div>
      ))}
    </div>
  )
}

interface ClaudeStep {
  num: number
  title: string
  body: string
}

const CLAUDE_STEPS: ClaudeStep[] = [
  {
    num: 1,
    title: 'Describe the migration',
    body: 'Tell Claude Code what needs to change, with a before/after example. Mention jscodeshift explicitly so it reaches for codemods over file-by-file edits.',
  },
  {
    num: 2,
    title: 'Review the generated transform',
    body: 'Claude Code will create a <code>.ts</code> transform file. Read through the logic \u2014 does the <code>.find()</code> filter match the right nodes? Are edge cases handled?',
  },
  {
    num: 3,
    title: 'Dry run with -d -p',
    body: 'Ask Claude Code to run the codemod in dry-run mode. Review the diff. Iterate if the output is wrong \u2014 the agent can fix the transform and re-run.',
  },
  {
    num: 4,
    title: 'Execute + verify',
    body: 'Run for real, then have Claude Code run your test suite and type-check to confirm nothing broke.',
  },
]

/** Claude Code integration workflow timeline. */
export function JcsClaudeWorkflow() {
  return (
    <TimelineFlow<ClaudeStep>
      items={CLAUDE_STEPS}
      renderIndicator={(step, _i, isDark) => (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs"
          style={{
            background: ds('#f1f5f9', '#1e293b', isDark),
            border: `2px solid ${ds('#e2e8f0', '#334155', isDark)}`,
            color: ds('#64748b', '#94a3b8', isDark),
          }}
        >
          {step.num}
        </div>
      )}
      renderContent={(step, _i, isDark) => (
        <div className="pt-1">
          <h4
            className="font-mono text-sm font-medium mb-1.5"
            style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
          >
            {step.title}
          </h4>
          <p
            className="text-sm m-0 leading-relaxed"
            style={{ color: ds('#64748b', '#94a3b8', isDark) }}
            dangerouslySetInnerHTML={{ __html: step.body }}
          />
        </div>
      )}
    />
  )
}
