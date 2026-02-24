import type { GuideSection, GuideDefinition } from './guideTypes'
import type { ChecklistBaseSection } from '../components/mdx/ChecklistBase'

export const GIT_WORKTREES_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['git-worktrees-guide'] },
]

export const guideDefinition: GuideDefinition = {
  id: 'git-worktrees',
  icon: '\u{1F333}',
  title: 'Git Worktrees & Claude Code',
  startPageId: 'git-worktrees-guide',
  description:
    'Use git worktrees for parallel development with Claude Code \u2014 isolated branches, simultaneous sessions, and real workflows.',
  order: 10,
  sections: GIT_WORKTREES_GUIDE_SECTIONS,
  singlePage: true,
}

export const GIT_WORKTREES_CHECKLIST: ChecklistBaseSection[] = [
  {
    id: 'worktree-essentials',
    name: 'Worktree Essentials',
    icon: '\u{1F333}',
    items: [
      { label: 'Understand worktrees vs regular branches' },
      { label: 'Create a worktree with <code>git worktree add</code>' },
      { label: 'Run Claude Code in a worktree' },
      { label: 'Work on your own code in a separate worktree simultaneously' },
      { label: 'Review Claude\u2019s work with <code>git diff main</code>' },
      { label: 'Merge and clean up worktrees when done' },
    ],
  },
]
