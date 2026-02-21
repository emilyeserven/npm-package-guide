# Anatomy of a Claude Skill Guide

## Audience & Purpose

Developers who want to create high-quality Claude skills. Covers the full lifecycle from understanding what skills are, through writing effective descriptions and body instructions, to bundling resources and shipping with confidence.

## Section Structure

Defined in `src/data/claudeSkillsData.ts` as `CS_GUIDE_SECTIONS`:

| Section | Pages |
|---------|-------|
| (Start) | `cs-start` |
| Foundations | `cs-what`, `cs-when`, `cs-anatomy` |
| Writing Skills | `cs-description`, `cs-writing`, `cs-resources` |
| Best Practices | `cs-dos`, `cs-donts`, `cs-checklist` |

## Interactive Components

### `SkillTierCards`

- **Location:** `src/components/mdx/claude-skills/SkillTierCards.tsx`
- **Props:** none
- **Renders:** Progressive disclosure tier cards (Metadata, Body, Resources)
- **Data source:** `SKILL_TIERS` from `src/data/claudeSkillsData.ts`

### `SkillScenarioCards`

- **Location:** `src/components/mdx/claude-skills/SkillScenarioCards.tsx`
- **Props:** none
- **Renders:** Click-to-reveal scenario cards with good/bad candidate verdicts
- **Data source:** `SKILL_SCENARIOS` from `src/data/claudeSkillsData.ts`

### `SkillFileBrowser`

- **Location:** `src/components/mdx/claude-skills/SkillFileBrowser.tsx`
- **Props:** none
- **Renders:** Tabbed file explorer showing SKILL.md, scripts/, references/, assets/
- **Data source:** `SKILL_FILES` from `src/data/claudeSkillsData.ts`

### `SkillDescriptionDemo`

- **Location:** `src/components/mdx/claude-skills/SkillDescriptionDemo.tsx`
- **Props:** none
- **Renders:** Good vs. bad description comparison with tab switcher
- **Data source:** `GOOD_DESCRIPTION`, `BAD_DESCRIPTION`, `DESCRIPTION_CHECKLIST` from `src/data/claudeSkillsData.ts`

### `SkillWritingTips`

- **Location:** `src/components/mdx/claude-skills/SkillWritingTips.tsx`
- **Props:** none
- **Renders:** Collapsible writing tips with compare boxes and code examples
- **Data source:** `SKILL_WRITING_TIPS` from `src/data/claudeSkillsData.ts`

### `SkillResourceCards`

- **Location:** `src/components/mdx/claude-skills/SkillResourceCards.tsx`
- **Props:** none
- **Renders:** Resource type cards for scripts/, references/, assets/
- **Data source:** `BUNDLED_RESOURCE_TYPES` from `src/data/claudeSkillsData.ts`

### `SkillDos` / `SkillDonts`

- **Location:** `src/components/mdx/claude-skills/SkillDosDonts.tsx`
- **Props:** none
- **Renders:** Numbered do's list (green) or don'ts list (red)
- **Data source:** `SKILL_DOS`, `SKILL_DONTS` from `src/data/claudeSkillsData.ts`

### `SkillChecklist`

- **Location:** `src/components/mdx/claude-skills/SkillChecklist.tsx`
- **Props:** none
- **Renders:** Interactive checklist with progress bar and completion celebration
- **Data source:** `SKILL_CHECKLIST_ITEMS` from `src/data/claudeSkillsData.ts`

## Guide-Specific Conventions

- Each MDX page is minimal: `<SectionTitle>` + one interactive component
- All content lives in the data file, not inline in MDX
- Components take no props (each renders a single page's content)
- All components support dark mode via `useIsDark()` + `ds()` helper
