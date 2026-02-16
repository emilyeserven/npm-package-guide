import type { RegistryLink } from './index'

export const gitWorktreesLinks: RegistryLink[] = [
  {
    id: 'git-worktree-docs',
    url: 'https://git-scm.com/docs/git-worktree',
    label: 'git-worktree Documentation',
    source: 'Git',
    desc: 'Official Git documentation for the git worktree command \u2014 managing multiple working trees.',
    tags: ['docs', 'free', 'git', 'guide:git-worktrees'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'git-bare-repo',
    url: 'https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---bare',
    label: 'git clone --bare',
    source: 'Git',
    desc: 'Documentation for bare repository clones, which serve as the foundation for worktree-based workflows.',
    tags: ['docs', 'free', 'git', 'guide:git-worktrees'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'claude-code-cli',
    url: 'https://docs.anthropic.com/en/docs/claude-code',
    label: 'Claude Code CLI',
    source: 'Anthropic',
    desc: 'Official Claude Code documentation covering CLI usage, headless mode, and multi-session workflows.',
    tags: ['docs', 'free', 'ai', 'tool', 'guide:git-worktrees'],
    resourceCategory: 'Tools & Services',
  },
]
