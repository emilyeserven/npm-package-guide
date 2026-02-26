import type { RegistryLink } from './types'

export const agentsLinks: RegistryLink[] = [
  {
    id: 'agents-claude-code-docs',
    url: 'https://docs.anthropic.com/en/docs/claude-code/overview',
    label: 'Claude Code Overview',
    source: 'Anthropic',
    desc: 'Official overview of Claude Code \u2014 Anthropic\u2019s agentic coding tool that runs in your terminal',
    tags: ['docs', 'free', 'guide:claude-agents'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'agents-agent-sdk-docs',
    url: 'https://docs.anthropic.com/en/docs/claude-code/sdk',
    label: 'Claude Agent SDK Documentation',
    source: 'Anthropic',
    desc: 'Official documentation for the Claude Agent SDK \u2014 build custom agents with the same tools as Claude Code',
    tags: ['docs', 'free', 'guide:claude-agents'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'agents-agent-sdk-github',
    url: 'https://github.com/anthropics/claude-code',
    label: 'Claude Code GitHub Repository',
    source: 'GitHub',
    desc: 'Source code and examples for Claude Code and the Agent SDK',
    tags: ['github', 'free', 'guide:claude-agents'],
    resourceCategory: 'Source Code',
  },
  {
    id: 'agents-skills-docs',
    url: 'https://docs.anthropic.com/en/docs/claude-code/skills',
    label: 'Claude Code Skills Documentation',
    source: 'Anthropic',
    desc: 'How to create, install, and manage skills for Claude Code',
    tags: ['docs', 'free', 'guide:claude-agents'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'agents-prompt-engineering-docs',
    url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
    label: 'Prompt Engineering Guide',
    source: 'Anthropic',
    desc: 'Anthropic\u2019s official guide to writing effective prompts and instructions for Claude',
    tags: ['docs', 'free', 'guide:claude-agents'],
    resourceCategory: 'Official Documentation',
  },
]
