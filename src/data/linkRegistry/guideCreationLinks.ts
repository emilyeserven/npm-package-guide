import type { RegistryLink } from './index'

export const guideCreationLinks: RegistryLink[] = [
  {
    id: 'gcr-add-guide-skill',
    url: 'https://github.com/anthropics/claude-code',
    label: '/add-guide Skill',
    source: 'Project',
    desc: 'The Claude Code skill that automates guide creation — runs scaffold, fills content, wires registries.',
    tags: ['tooling', 'guide:guide-creation'],
    resourceCategory: 'Project Tooling',
  },
  {
    id: 'gcr-claude-skills-guide',
    url: 'https://docs.anthropic.com/en/docs/claude-code/skills',
    label: 'Claude Code Skills Documentation',
    source: 'Anthropic',
    desc: 'Official documentation for Claude Code skills — how to write and use custom skills.',
    tags: ['docs', 'guide:guide-creation'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'gcr-component-reference',
    url: 'https://github.com/anthropics/claude-code',
    label: 'Component Reference (docs/COMPONENT_REFERENCE.md)',
    source: 'Project',
    desc: 'Full list of shared base components, pattern-matching quick reference, and consolidation guidance.',
    tags: ['docs', 'guide:guide-creation'],
    resourceCategory: 'Project Documentation',
  },
  {
    id: 'gcr-content-reference',
    url: 'https://github.com/anthropics/claude-code',
    label: 'Content Reference (docs/CONTENT_REFERENCE.md)',
    source: 'Project',
    desc: 'MDX frontmatter, link registry, glossary, footnotes, cross-page links, and navigation formatting conventions.',
    tags: ['docs', 'guide:guide-creation'],
    resourceCategory: 'Project Documentation',
  },
]
