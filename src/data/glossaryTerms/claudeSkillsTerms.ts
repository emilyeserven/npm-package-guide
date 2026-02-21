import type { GlossaryCategory } from './index'

export const claudeSkillsGlossary: GlossaryCategory[] = [
  {
    category: 'Claude Skills',
    terms: [
      {
        term: 'Claude Skill',
        definition: 'A reusable instruction package that teaches Claude how to perform a specific type of task consistently. Consists of a SKILL.md file with optional bundled scripts, references, and assets.',
        linkId: 'cs-claude-skills-docs',
        sectionId: 'cs-what',
        guides: ['claude-skills'],
      },
      {
        term: 'SKILL.md',
        definition: 'The required markdown file in a skill folder. Contains YAML frontmatter (name and description) plus the full body of instructions that Claude reads when the skill triggers.',
        linkId: 'cs-claude-skills-docs',
        sectionId: 'cs-anatomy',
        guides: ['claude-skills'],
      },
      {
        term: 'Skill Description (Triggering)',
        definition: 'The description field in SKILL.md frontmatter \u2014 the primary mechanism Claude uses to decide whether to activate a skill. Should include trigger phrases, file types, and explicit exclusions.',
        linkId: 'cs-claude-skills-docs',
        sectionId: 'cs-description',
        guides: ['claude-skills'],
      },
      {
        term: 'Progressive Disclosure (Skills)',
        definition: 'The three-tier loading system for skills: Level 1 (metadata, always loaded), Level 2 (SKILL.md body, loaded on trigger), Level 3 (bundled resources, loaded on demand).',
        linkId: 'cs-claude-skills-docs',
        sectionId: 'cs-what',
        guides: ['claude-skills'],
      },
      {
        term: 'Bundled Resources',
        definition: 'Optional files in a skill folder (scripts/, references/, assets/) that extend the skill beyond SKILL.md. Loaded into context on demand to keep the initial footprint small.',
        linkId: 'cs-claude-skills-docs',
        sectionId: 'cs-resources',
        guides: ['claude-skills'],
      },
      {
        term: 'CLAUDE.md',
        definition: 'A project-level memory file that Claude Code reads for persistent instructions, conventions, and context. Skills complement CLAUDE.md by providing task-specific guidance that triggers conditionally.',
        linkId: 'cs-claude-md-docs',
        sectionId: 'cs-what',
        guides: ['claude-skills'],
      },
    ],
  },
]
