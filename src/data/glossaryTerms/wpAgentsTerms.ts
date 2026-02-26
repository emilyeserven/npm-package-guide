import type { GlossaryCategory } from './types'

export const wpAgentsGlossary: GlossaryCategory[] = [
  {
    category: 'WordPress API',
    terms: [
      {
        term: 'ACF (Advanced Custom Fields)',
        definition: 'A WordPress plugin that lets you add custom field groups to posts, pages, and custom post types. When exposed via REST API, ACF fields appear in the schema and can be used to generate TypeScript interfaces.',
        linkId: 'acf-rest-api',
        sectionId: 'wp-agents-guide',
      },
      {
        term: 'Application Password',
        definition: 'A WordPress authentication mechanism that generates a dedicated password for REST API access without exposing the user\u2019s main login credentials. Created per-application and revocable individually.',
        linkId: 'wp-application-passwords',
        sectionId: 'wp-agents-guide',
      },
      {
        term: 'OPTIONS Request',
        definition: 'An HTTP method used to discover the full schema of a WordPress REST API endpoint, including all field definitions, types, and constraints. Used by the schema discovery script to extract ACF field metadata.',
        linkId: 'wp-rest-api-handbook',
        sectionId: 'wp-agents-guide',
      },
    ],
  },
  {
    category: 'Testing & Mocking',
    terms: [
      {
        term: 'Mock Factory',
        definition: 'A function that generates typed test data objects with sensible defaults and optional overrides. Used to create realistic test fixtures from WordPress API response shapes.',
        linkId: 'vitest-docs',
        sectionId: 'wp-agents-guide',
      },
      {
        term: 'MSW (Mock Service Worker)',
        definition: 'An API mocking library that intercepts HTTP requests at the network level using Service Workers (browser) or request interception (Node.js). Used to mock WordPress REST API responses in unit tests.',
        linkId: 'msw-docs',
        linkIds: ['vitest-mocking'],
        sectionId: 'wp-agents-guide',
      },
    ],
  },
]
