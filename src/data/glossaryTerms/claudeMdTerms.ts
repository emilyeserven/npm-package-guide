import type { GlossaryCategory } from './index'

export const claudeMdGlossary: GlossaryCategory[] = [
  {
    category: 'CLAUDE.md & Memory',
    terms: [
      {
        term: 'CLAUDE.md',
        definition: 'A markdown file read automatically at the start of every Claude Code session, providing persistent project context \u2014 stack, conventions, commands, and architectural decisions.',
        linkId: 'anthropic-claude-md',
        sectionId: 'cmd-intro',
        guides: ['claude-md'],
      },
      {
        term: 'Memory Hierarchy',
        definition: 'The four-level priority system for CLAUDE.md files: Enterprise Policy > Project Memory > User Memory > Local Project. Higher-level files take precedence and load first.',
        linkId: 'anthropic-claude-md',
        sectionId: 'cmd-hierarchy',
        guides: ['claude-md'],
      },
      {
        term: 'Progressive Disclosure',
        definition: 'A writing principle for CLAUDE.md where you keep the main file lean and point to detailed reference docs via @imports or file references, rather than front-loading all information.',
        linkId: 'anthropic-claude-code-best-practices',
        sectionId: 'cmd-principles',
        guides: ['claude-md'],
      },
      {
        term: 'Scoped Rules',
        definition: 'Markdown files in .claude/rules/ with YAML frontmatter paths: directives that only apply when Claude is working on files matching the specified glob patterns.',
        linkId: 'anthropic-claude-md',
        sectionId: 'cmd-structure',
        guides: ['claude-md'],
      },
      {
        term: 'Auto Memory',
        definition: 'A persistent directory where Claude records its own learnings and patterns as it works. Unlike CLAUDE.md (instructions you write), auto memory contains notes Claude writes for itself.',
        linkId: 'anthropic-claude-code',
        sectionId: 'cmd-features',
        guides: ['claude-md'],
      },
    ],
  },
]
