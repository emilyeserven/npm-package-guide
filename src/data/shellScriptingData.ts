import type { GuideSection, StartPageData } from './guideTypes'

export const SHELL_SCRIPTING_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['shell-start'] },
  { label: 'Foundations', ids: ['the-basics', 'variables-arguments', 'conditionals-tests', 'loops-iteration'] },
  { label: 'Agent Patterns', ids: ['preflight-validation', 'file-path-checks', 'error-handling', 'text-processing'] },
  { label: 'Recipes', ids: ['agent-scripts', 'cheat-sheet'] },
]

export const SHELL_SCRIPTING_START_PAGE_DATA: StartPageData = {
  subtitle: 'Shell scripting \u00b7 AI agent patterns \u00b7 validation recipes \u2014 from basics to battle-tested scripts.',
  tip: 'Designed for developers and AI agent builders who want to write reliable shell scripts for automation, validation, and tooling.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Shell Fundamentals',
      description: 'Learn the building blocks \u2014 shebangs, variables, conditionals, loops, and exit codes that every shell script needs.',
      jumpTo: 'the-basics',
    },
    {
      type: 'bonus',
      title: 'Foundations Deep Dive',
      description: 'Work through the complete foundations section to build fluency with shell syntax.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'the-basics': 'Shebangs, executability, and exit codes \u2014 the language of success and failure.',
        'variables-arguments': 'Variable assignment, quoting rules, script arguments, and command substitution.',
        'conditionals-tests': 'if/elif/else, test operators, [[ ]] vs [ ], and short-circuit patterns.',
        'loops-iteration': 'For loops, while loops, and safely reading files line by line.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Agent Patterns',
      description: 'Learn the shell patterns that make AI agents dramatically more efficient \u2014 pre-flight checks, file validation, error handling, and text processing.',
      jumpTo: 'preflight-validation',
    },
    {
      type: 'bonus',
      title: 'Agent Patterns Deep Dive',
      description: 'Master each pattern used in production agent scripts.',
      sectionLabel: 'Agent Patterns',
      subItemDescriptions: {
        'preflight-validation': 'Check commands, versions, and env vars before running expensive operations.',
        'file-path-checks': 'Validate project structure, JSON configs, and git state.',
        'error-handling': 'Strict mode, trap cleanup, retry with backoff, and structured JSON output.',
        'text-processing': 'grep, sed, awk, pipes, and heredocs for extracting and transforming data.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Recipes & Reference',
      description: 'Copy-paste-ready agent scripts and a comprehensive cheat sheet for daily use.',
      jumpTo: 'agent-scripts',
    },
  ],
}
