import type { GlossaryCategory } from './index'

export const iaGlossary: GlossaryCategory[] = [
  {
    category: 'Information Architecture',
    terms: [
      {
        term: 'Information Architecture (IA)',
        definition:
          'The practice of organizing, structuring, and labeling content in an information space so that people can find what they need and understand where they are.',
        linkId: 'ia-rosenfeld-book',
        sectionId: 'ia-foundations',
        guides: ['info-architecture'],
      },
      {
        term: 'Taxonomy',
        definition:
          'A hierarchical classification system that organizes content into categories and subcategories with parent\u2013child relationships.',
        linkId: 'ia-rosenfeld-book',
        sectionId: 'ia-organization',
        guides: ['info-architecture'],
      },
      {
        term: 'Card Sorting',
        definition:
          'A UX research technique where users group content items into categories, revealing their natural mental models for organizing information.',
        linkId: 'ia-card-sorting',
        sectionId: 'ia-practice',
        guides: ['info-architecture'],
      },
      {
        term: 'Tree Testing',
        definition:
          'A usability technique for validating a proposed hierarchy by asking users to find items in a text-only tree structure, without visual design cues.',
        linkId: 'ia-tree-testing',
        sectionId: 'ia-practice',
        guides: ['info-architecture'],
      },
      {
        term: 'Wayfinding',
        definition:
          'The set of environmental cues (visual hierarchy, active states, breadcrumbs) that help users orient themselves and navigate through an information space.',
        linkId: 'ia-nngroup-nav',
        sectionId: 'ia-navigation',
        guides: ['info-architecture'],
      },
      {
        term: 'Controlled Vocabulary',
        definition:
          'A predefined, standardized set of terms for labeling content. Prevents synonyms and inconsistencies by establishing canonical names for concepts.',
        linkId: 'ia-nngroup-labels',
        sectionId: 'ia-labeling',
        guides: ['info-architecture'],
      },
      {
        term: 'Faceted Classification',
        definition:
          'An organization approach where content can be filtered along multiple independent dimensions (facets) simultaneously, rather than fitting into a single hierarchy.',
        linkId: 'ia-rosenfeld-book',
        sectionId: 'ia-organization',
        guides: ['info-architecture'],
      },
      {
        term: 'Progressive Disclosure',
        definition:
          'An interaction design pattern that shows only essential information first, with details available on demand. Reduces initial cognitive load for both humans and AI agents.',
        linkId: 'ia-nngroup-ia',
        sectionId: 'ia-ai-readability',
        guides: ['info-architecture'],
      },
    ],
  },
]
