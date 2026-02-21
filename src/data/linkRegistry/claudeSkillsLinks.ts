import type { RegistryLink } from './index'

export const claudeSkillsLinks: RegistryLink[] = [
  {
    id: 'cs-claude-skills-docs',
    url: 'https://docs.anthropic.com/en/docs/claude-code/skills',
    label: 'Claude Code Skills Documentation',
    source: 'Anthropic',
    desc: 'Official documentation for creating and managing Claude Code skills',
    tags: ['docs', 'free', 'guide:claude-skills'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'cs-claude-code-docs',
    url: 'https://docs.anthropic.com/en/docs/claude-code/overview',
    label: 'Claude Code Overview',
    source: 'Anthropic',
    desc: 'Overview of Claude Code \u2014 Anthropic\u2019s agentic coding tool',
    tags: ['docs', 'free', 'guide:claude-skills'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'cs-prompt-engineering',
    url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
    label: 'Prompt Engineering Guide',
    source: 'Anthropic',
    desc: 'Anthropic\u2019s official guide to writing effective prompts for Claude',
    tags: ['docs', 'free', 'guide:claude-skills'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'cs-claude-md-docs',
    url: 'https://docs.anthropic.com/en/docs/claude-code/memory',
    label: 'CLAUDE.md Memory Files',
    source: 'Anthropic',
    desc: 'How Claude Code uses CLAUDE.md files for project context and instructions',
    tags: ['docs', 'free', 'guide:claude-skills'],
    resourceCategory: 'Official Documentation',
  },
]
