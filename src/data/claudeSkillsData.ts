import type { GuideSection, StartPageData } from './guideTypes'

// ── Types ────────────────────────────────────────────────────────────

export interface SkillScenario {
  title: string
  example: string
  verdict: boolean
}

export interface SkillFileEntry {
  key: string
  name: string
  required: boolean
  content: string
}

export interface SkillWritingTip {
  title: string
  explanation: string
  good?: string
  bad?: string
  goodLabel?: string
  badLabel?: string
  codeExample?: string
  codeFilename?: string
  defaultOpen?: boolean
}

export interface SkillGuideline {
  title: string
  desc: string
}

export interface SkillChecklistItem {
  id: string
  text: string
}

// ── Tier data (What Is a Skill?) ────────────────────────────────────

export interface SkillTier {
  level: string
  desc: string
  badge: string
  color: 'success' | 'info' | 'purple'
}

export const SKILL_TIERS: SkillTier[] = [
  {
    level: 'Level 1: Metadata',
    desc: 'Name + description \u2014 always loaded in context (~100 words). This is what Claude uses to decide whether to open the skill.',
    badge: 'Always Loaded',
    color: 'success',
  },
  {
    level: 'Level 2: SKILL.md Body',
    desc: 'The full instructions \u2014 loaded into context when the skill triggers. Should stay under ~500 lines.',
    badge: 'On Trigger',
    color: 'info',
  },
  {
    level: 'Level 3: Bundled Resources',
    desc: 'Scripts, reference docs, templates, assets \u2014 loaded as needed. Can be unlimited in size.',
    badge: 'On Demand',
    color: 'purple',
  },
]

// ── Scenario data (When to Make a Skill) ────────────────────────────

export const SKILL_SCENARIOS: SkillScenario[] = [
  {
    title: 'Repetitive multi-step workflows',
    example: 'Every time you ask Claude to create a .docx file, it needs to know which libraries to use, how to structure the XML, and where to save outputs. A skill encodes this once.',
    verdict: true,
  },
  {
    title: 'Tasks needing specific tool/library knowledge',
    example: 'Creating presentations with python-pptx, manipulating PDFs with specific libraries, or generating spreadsheets \u2014 all benefit from curated instructions.',
    verdict: true,
  },
  {
    title: 'One-off simple questions',
    example: '"What is the Pythagorean theorem?" \u2014 Claude handles this fine without any skill.',
    verdict: false,
  },
  {
    title: 'Domain-specific output formats',
    example: 'If every report needs an executive summary \u2192 key findings \u2192 recommendations structure, a skill ensures consistency.',
    verdict: true,
  },
  {
    title: 'Tasks that are trivially handled by base Claude',
    example: 'Basic coding, simple summaries, or short answers. Skills add overhead without adding value here.',
    verdict: false,
  },
  {
    title: 'Quality-critical creative work',
    example: 'Frontend design that needs to avoid generic AI aesthetics, presentations that need specific styling \u2014 skills encode the taste and judgment.',
    verdict: true,
  },
]

// ── File browser data (Anatomy of a Skill) ──────────────────────────

export const SKILL_FILES: SkillFileEntry[] = [
  {
    key: 'skill',
    name: 'SKILL.md',
    required: true,
    content: `---
name: my-cool-skill
description: "Use this skill when the user
  wants to... Trigger on phrases like...
  Do NOT use for..."
---

# My Cool Skill

## Overview
What this skill does and why.

## Quick Reference
| Task | Approach |
|------|----------|
| Task A | Use tool X |

## Detailed Instructions
Step-by-step guidance...

## Examples
Input \u2192 Output patterns...`,
  },
  {
    key: 'scripts',
    name: 'scripts/',
    required: false,
    content: `scripts/
\u251C\u2500\u2500 generate_chart.py
\u251C\u2500\u2500 validate_output.py
\u2514\u2500\u2500 helpers.sh

Scripts handle deterministic or
repetitive work that would be
wasteful for Claude to reinvent
each invocation.

Key principle: if every test run
independently writes a similar
helper script, bundle it.`,
  },
  {
    key: 'refs',
    name: 'references/',
    required: false,
    content: `references/
\u251C\u2500\u2500 aws.md
\u251C\u2500\u2500 gcp.md
\u2514\u2500\u2500 azure.md

Reference docs are loaded into
context only when needed.

Use for domain-specific variants
so Claude reads only what's relevant
to the current task.

Tip: For files > 300 lines,
include a table of contents.`,
  },
  {
    key: 'assets',
    name: 'assets/',
    required: false,
    content: `assets/
\u251C\u2500\u2500 template.docx
\u251C\u2500\u2500 logo.png
\u2514\u2500\u2500 fonts/

Static files used directly in
output generation.

Templates, icons, fonts, images \u2014
anything the skill needs to produce
its final deliverable.`,
  },
]

// ── Description examples ────────────────────────────────────────────

export const GOOD_DESCRIPTION = 'Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers include: any mention of \'Word doc\', \'word document\', \'.docx\', or requests to produce professional documents with formatting like tables of contents, headings, page numbers, or letterheads. Also use when extracting or reorganizing content from .docx files. If the user asks for a \'report\', \'memo\', \'letter\', \'template\', or similar deliverable as a Word or .docx file, use this skill. Do NOT use for PDFs, spreadsheets, Google Docs, or general coding tasks.'

export const BAD_DESCRIPTION = 'A skill for working with documents.'

export const DESCRIPTION_CHECKLIST = [
  'What the skill does (core purpose)',
  'When to trigger it (specific phrases, file types, contexts)',
  'When NOT to use it (disambiguates from similar skills)',
  'Slightly "pushy" language to combat under-triggering',
]

// ── Writing tips ────────────────────────────────────────────────────

export const SKILL_WRITING_TIPS: SkillWritingTip[] = [
  {
    title: 'Explain the WHY, not just the WHAT',
    explanation: 'Claude has strong theory of mind. When you explain why something matters, it can generalize to edge cases you haven\'t thought of. Rigid MUST/NEVER rules without reasoning lead to brittle, overfitted behavior.',
    good: 'Keep SKILL.md under 500 lines. Longer skills consume more context budget, leaving less room for the user\'s actual task and Claude\'s reasoning \u2014 which directly hurts output quality.',
    bad: 'SKILL.md MUST NEVER exceed 500 lines. ALWAYS keep it short.',
    goodLabel: 'With reasoning',
    badLabel: 'Without reasoning',
    defaultOpen: true,
  },
  {
    title: 'Use imperative, direct instructions',
    explanation: 'Write like you\'re pair-programming with someone. Be direct and imperative. Skip the preamble.',
    good: 'Extract text with pandoc. For tracked changes, pass --track-changes=all.',
    bad: 'It would be ideal if the assistant could consider extracting text using pandoc, and if there happen to be tracked changes...',
    goodLabel: 'Direct',
    badLabel: 'Wishy-washy',
  },
  {
    title: 'Include concrete examples',
    explanation: 'Examples are one of the most powerful teaching tools. Show input \u2192 output pairs so Claude knows exactly what success looks like.',
    codeExample: `## Commit message format

**Example 1:**
Input: Added user authentication with JWT tokens
Output: feat(auth): implement JWT-based authentication

**Example 2:**
Input: Fixed crash when clicking logout
Output: fix(auth): resolve logout click crash`,
    codeFilename: 'example pattern',
  },
  {
    title: 'Include a Quick Reference table',
    explanation: 'A task \u2192 approach lookup table at the top gives Claude fast orientation before diving into details.',
    codeExample: `## Quick Reference
| Task           | Approach                       |
|----------------|-------------------------------|
| Read content   | pandoc or unpack for raw XML   |
| Create new doc | Use docx-js library            |
| Edit existing  | Unpack \u2192 edit XML \u2192 repack     |`,
  },
  {
    title: 'Generalize \u2014 don\'t overfit to examples',
    explanation: 'Your skill will be used across thousands of different prompts. Write instructions that teach patterns rather than solutions to specific examples. When you find yourself adding very specific edge case handling, step back and ask: "Can I describe the general principle instead?"',
  },
]

// ── Bundled resources data ──────────────────────────────────────────

export interface ResourceType {
  title: string
  icon: string
  desc: string
  example: string
  lightBg: string
  darkBg: string
  lightBorder: string
  darkBorder: string
}

export const BUNDLED_RESOURCE_TYPES: ResourceType[] = [
  {
    title: 'scripts/',
    icon: '\u2699\uFE0F',
    desc: 'Executable code for deterministic or repetitive tasks. If every invocation independently writes a similar helper \u2014 bundle it as a script instead.',
    example: 'A chart generation script, an XML validator, a file converter.',
    lightBg: '#f0f9ff',
    darkBg: '#0c4a6e22',
    lightBorder: '#bae6fd',
    darkBorder: '#0c4a6e',
  },
  {
    title: 'references/',
    icon: '\ud83d\udcd6',
    desc: 'Documentation loaded into context as needed. Organize by domain/variant so Claude reads only the relevant file.',
    example: 'AWS vs. GCP vs. Azure deployment guides, framework-specific patterns.',
    lightBg: '#f5f3ff',
    darkBg: '#4c1d9522',
    lightBorder: '#ddd6fe',
    darkBorder: '#4c1d95',
  },
  {
    title: 'assets/',
    icon: '\ud83c\udfa8',
    desc: 'Static files used directly in output generation. Templates, icons, fonts \u2014 anything the skill needs to produce deliverables.',
    example: 'A .docx template with corporate branding, icon sets, font files.',
    lightBg: '#fffbeb',
    darkBg: '#78350f22',
    lightBorder: '#fde68a',
    darkBorder: '#78350f',
  },
]

// ── Do's and Don'ts ────────────────────────────────────────────────

export const SKILL_DOS: SkillGuideline[] = [
  {
    title: 'Explain the reasoning behind instructions',
    desc: 'Claude is smart. "Do X because Y" is far more effective than "ALWAYS DO X" \u2014 it lets Claude generalize to cases you didn\'t anticipate.',
  },
  {
    title: 'Make descriptions slightly pushy',
    desc: 'Claude tends to under-trigger skills. Include trigger phrases like "Make sure to use this skill whenever..." and enumerate edge cases.',
  },
  {
    title: 'Include concrete input \u2192 output examples',
    desc: 'Examples are the most reliable way to communicate expected format and quality. Show at least 2\u20133 representative patterns.',
  },
  {
    title: 'Keep SKILL.md under 500 lines',
    desc: 'Longer skills eat into the context budget needed for the user\'s task and Claude\'s reasoning. Offload details to reference files.',
  },
  {
    title: 'Add a Quick Reference table at the top',
    desc: 'A task \u2192 approach lookup gives Claude fast orientation. Think of it as a TL;DR for the skill.',
  },
  {
    title: 'Bundle scripts for repeated work',
    desc: 'If test runs show Claude writing the same helper script each time, extract it into scripts/ so every invocation benefits.',
  },
  {
    title: 'Specify what the skill is NOT for',
    desc: 'Disambiguation prevents false triggers. "Do NOT use for PDFs, spreadsheets, or Google Docs" is as important as saying what the skill does.',
  },
  {
    title: 'Test with realistic, diverse prompts',
    desc: 'Use prompts with varying lengths, phrasings, typos, and detail levels. Focus on near-miss edge cases, not obvious matches.',
  },
  {
    title: 'Organize multi-domain skills by variant',
    desc: 'If a skill supports AWS/GCP/Azure, put each in a separate reference file. Claude reads only what\'s relevant to the current task.',
  },
  {
    title: 'Iterate based on user feedback',
    desc: 'Skills improve through testing. Run test cases, review outputs, refine instructions, repeat until quality is consistent.',
  },
]

export const SKILL_DONTS: SkillGuideline[] = [
  {
    title: 'Write vague one-line descriptions',
    desc: '"A skill for working with documents." \u2014 Claude has no idea when to trigger this. Be specific about file types, triggers, and exclusions.',
  },
  {
    title: 'Overuse MUST/NEVER/ALWAYS in all caps',
    desc: 'This is a yellow flag for brittle instructions. Reframe as reasoning: explain why something matters and Claude will follow it more reliably.',
  },
  {
    title: 'Overfit to specific test examples',
    desc: 'Your skill runs on millions of prompts. Fiddly fixes for one test case create fragile behavior. Teach patterns, not patches.',
  },
  {
    title: 'Make the skill too long without hierarchy',
    desc: 'A 1000-line SKILL.md with no reference files wastes context. Break it up: core instructions in SKILL.md, details in references/.',
  },
  {
    title: 'Skip the testing loop',
    desc: 'Even great-looking skills fail in surprising ways. Always run at least 2\u20133 realistic test cases before calling it done.',
  },
  {
    title: 'Put triggering info in the body instead of description',
    desc: 'The body is only read AFTER the skill triggers. "When to use" info in the body is invisible during the triggering decision.',
  },
  {
    title: 'Create skills for tasks Claude handles natively',
    desc: 'Simple coding, basic summaries, and factual Q&A don\'t need skills. Skills add overhead \u2014 only use them where they add real value.',
  },
  {
    title: 'Include malware, exploits, or deceptive content',
    desc: 'Skills must not surprise users in their intent. No hidden functionality, no data exfiltration, no misleading behavior.',
  },
  {
    title: 'Use wishy-washy language like "perhaps consider..."',
    desc: 'Write imperatively. "Extract text with pandoc" not "It might be helpful if the assistant considered using pandoc."',
  },
  {
    title: 'Forget to test negative/should-not-trigger cases',
    desc: 'A skill that triggers on everything is as bad as one that never triggers. Test near-miss queries that share keywords but need different skills.',
  },
]

// ── Checklist items ────────────────────────────────────────────────

export const SKILL_CHECKLIST_ITEMS: SkillChecklistItem[] = [
  { id: 'name', text: 'Skill has a clear, descriptive name' },
  { id: 'desc', text: 'Description includes trigger phrases and exclusions' },
  { id: 'pushy', text: 'Description is slightly "pushy" to combat under-triggering' },
  { id: 'overview', text: 'Body starts with an overview of what the skill does' },
  { id: 'quickref', text: 'Quick reference table for fast orientation' },
  { id: 'examples', text: 'At least 2\u20133 input \u2192 output examples' },
  { id: 'why', text: 'Instructions explain WHY, not just WHAT' },
  { id: 'imperative', text: 'Written in direct, imperative style' },
  { id: 'length', text: 'SKILL.md is under 500 lines' },
  { id: 'refs', text: 'Large reference material is in separate files' },
  { id: 'scripts', text: 'Repeated helper logic is bundled in scripts/' },
  { id: 'tested', text: 'Tested with 2\u20133+ realistic, diverse prompts' },
  { id: 'negatives', text: 'Tested with near-miss should-NOT-trigger queries' },
  { id: 'nosurprise', text: 'No hidden or deceptive functionality' },
  { id: 'iterated', text: 'Refined based on at least one round of feedback' },
]

// ── Guide sections ──────────────────────────────────────────────────

export const CS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['cs-start'] },
  { label: 'Foundations', ids: ['cs-what', 'cs-when', 'cs-anatomy'] },
  { label: 'Writing Skills', ids: ['cs-description', 'cs-writing', 'cs-resources'] },
  { label: 'Best Practices', ids: ['cs-dos', 'cs-donts', 'cs-checklist'] },
]

// ── Start page data ────────────────────────────────────────────────

export const CS_START_PAGE_DATA: StartPageData = {
  subtitle: 'Learn how to write high-quality skills that teach Claude to do specific tasks consistently and reliably.',
  tip: 'Skills are reusable instruction packages \u2014 like recipe cards that Claude reads at the right moment.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Foundations',
      description: 'Understand what skills are, when to create them, and how they are structured.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'cs-what': 'The mental model: progressive disclosure across three tiers.',
        'cs-when': 'Interactive scenarios to help you decide if a skill adds value.',
        'cs-anatomy': 'Explore the folder structure: SKILL.md, scripts, references, and assets.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Writing Skills',
      description: 'Master the description field, body writing, and resource bundling.',
      sectionLabel: 'Writing Skills',
      subItemDescriptions: {
        'cs-description': 'The primary triggering mechanism \u2014 the most important part of any skill.',
        'cs-writing': 'How to write effective instructions: reasoning, examples, and quick references.',
        'cs-resources': 'When and how to bundle scripts, reference docs, and static assets.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Best Practices',
      description: 'Concrete do\'s and don\'ts, plus a shipping checklist.',
      sectionLabel: 'Best Practices',
      subItemDescriptions: {
        'cs-dos': 'Ten practices that make skills reliable and maintainable.',
        'cs-donts': 'Ten common mistakes that cause skills to fail in production.',
        'cs-checklist': 'Interactive pre-ship checklist to verify your skill is ready.',
      },
    },
  ],
}
