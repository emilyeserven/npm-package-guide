import type { GuideDefinition } from '../guideTypes'
import { PROMPT_GUIDE_SECTIONS } from './navigation'

export type { CLICommand } from './types'

export { SEVERITY_COLORS, MISTAKE_CATEGORIES, TESTING_MISTAKES } from './mistakes'
export { CONTEXT_TECHNIQUES, TOOL_TECHNIQUES, META_TOOLS } from './techniques'
export { CODING_TOOLS } from './codingTools'
export { CLI_GROUPS, CLI_CATEGORIES } from './cli'
export { CLAUDEMD_CHECKLIST, PROMPT_GUIDE_SECTIONS, PROMPT_START_PAGE_DATA } from './navigation'

export const guideDefinition: GuideDefinition = {
  id: 'prompt-engineering',
  icon: '\u{1F9E0}',
  title: 'Prompt Engineering',
  startPageId: 'prompt-start',
  description:
    'Practical patterns for working with AI coding assistants \u2014 common mistakes to watch for, context management techniques, and CLI commands.',
  order: 3,
  sections: PROMPT_GUIDE_SECTIONS,
}

export { PROMPT_START_PAGE_DATA as startPageData } from './navigation'
