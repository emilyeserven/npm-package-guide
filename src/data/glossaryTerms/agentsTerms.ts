import type { GlossaryCategory } from './types'

export const agentsGlossary: GlossaryCategory[] = [
  {
    category: 'Claude Agents',
    terms: [
      {
        term: 'Claude Agent',
        definition: 'An autonomous system that uses Claude as its reasoning engine combined with tools (Bash, Read, Write, etc.) to interact with the real world. Agents follow a loop: gather context, reason, act, verify, and repeat.',
        linkId: 'agents-claude-code-docs',
        sectionId: 'agents-overview',
        guides: ['claude-agents'],
      },
      {
        term: 'Agent SDK',
        definition: 'A Python/TypeScript library that exposes the same agent infrastructure powering Claude Code as a programmable interface. Provides access to the agent loop, built-in tools, context management, and session handling.',
        linkId: 'agents-agent-sdk-docs',
        sectionId: 'agents-sdk',
        guides: ['claude-agents'],
      },
      {
        term: 'Subagent',
        definition: 'A specialized agent instance that runs in its own context window with custom system prompts, specific tool access, and independent permissions. Claude can delegate tasks to subagents automatically based on their description.',
        linkId: 'agents-claude-code-docs',
        sectionId: 'agents-subagents',
        guides: ['claude-agents'],
      },
      {
        term: 'Agent Loop',
        definition: 'The core execution cycle of a Claude agent: gather context, reason about what to do, take action using tools, verify the results, and repeat until the task is complete.',
        linkId: 'agents-agent-sdk-docs',
        sectionId: 'agents-overview',
        guides: ['claude-agents'],
      },
      {
        term: 'Permission Mode',
        definition: 'Agent SDK configuration that controls what tools an agent can use. Options include bypassPermissions (unrestricted), acceptEdits (auto-approve file edits), default (prompt user), or custom canUseTool functions.',
        linkId: 'agents-agent-sdk-docs',
        sectionId: 'agents-sdk',
        guides: ['claude-agents'],
      },
      {
        term: 'Model Context Protocol (MCP)',
        definition: 'A protocol for extending Claude agents with custom tools provided by MCP servers. Allows agents to interact with external services, databases, and APIs beyond the built-in tool set.',
        linkId: 'agents-agent-sdk-docs',
        sectionId: 'agents-sdk',
        guides: ['claude-agents'],
      },
    ],
  },
]
