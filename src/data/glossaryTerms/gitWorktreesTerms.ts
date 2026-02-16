import type { GlossaryCategory } from './index'

export const gitWorktreesGlossary: GlossaryCategory[] = [
  {
    category: 'Git Worktrees',
    terms: [
      {
        term: 'Worktree',
        definition:
          'A linked working directory attached to a Git repository. Each worktree has its own checked-out branch and working files, but all worktrees share the same Git objects, refs, and history.',
        linkId: 'git-worktree-docs',
        sectionId: 'git-worktrees-guide',
      },
      {
        term: 'Bare Repository',
        definition:
          'A Git repository with no working directory \u2014 it contains only the <code>.git</code> internals (objects, refs, config). Used as a clean base for creating multiple worktrees without a default checkout.',
        linkId: 'git-bare-repo',
        sectionId: 'git-worktrees-guide',
      },
      {
        term: 'Headless Mode (Claude Code)',
        definition:
          'Running Claude Code with <code>--dangerously-skip-permissions</code> so it can operate autonomously in a worktree without manual approval prompts. Useful for parallel AI-assisted development.',
        linkId: 'claude-code-cli',
        sectionId: 'git-worktrees-guide',
      },
    ],
  },
]
