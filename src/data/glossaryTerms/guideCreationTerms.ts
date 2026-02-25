import type { GlossaryCategory } from './index'

export const guideCreationGlossary: GlossaryCategory[] = [
  {
    category: 'Guide Architecture',
    terms: [
      {
        term: 'Scaffold Script',
        definition: 'A project CLI tool (pnpm scaffold-guide) that generates all boilerplate files for a new guide — data file, MDX stubs, CLAUDE.md, link registry, glossary — and wires them into the central registries.',
        linkId: 'gcr-add-guide-skill',
        sectionId: 'guide-creation-guide',
      },
      {
        term: 'Guide Registry',
        definition: 'The central array in guideRegistry.ts that defines every guide\'s ID, title, icon, sections, and category. The sidebar, command menu, home page, and navigation all derive from this single source of truth.',
        linkId: 'gcr-add-guide-skill',
        sectionId: 'guide-creation-guide',
      },
      {
        term: 'Content Artifact',
        definition: 'A long-form written document covering the topic for a new guide. Provided as input to the /add-guide skill, which converts it into the project\'s MDX component architecture.',
        linkId: 'gcr-add-guide-skill',
        sectionId: 'guide-creation-guide',
      },
    ],
  },
]
