import type { GlossaryCategory } from './index'

export const payloadGlossary: GlossaryCategory[] = [
  {
    category: 'CMS & Content',
    terms: [
      {
        term: 'Headless CMS',
        definition: 'A content management system that provides a backend and APIs but makes no assumptions about the frontend. Content is consumed via REST or GraphQL APIs rather than tightly coupled themes.',
        linkId: 'payload-docs',
        sectionId: 'payload-overview',
      },
      {
        term: 'Payload CMS',
        definition: 'An open-source, code-first headless CMS built with TypeScript, Node.js, and React. Provides auto-generated admin UI, REST/GraphQL APIs, authentication, and access control — all defined through config files.',
        linkId: 'payload-docs',
        sectionId: 'payload-overview',
      },
      {
        term: 'Collection (Payload)',
        definition: 'The primary data model in Payload, analogous to a database table. Each collection defines a content type (Posts, Users, Media) with typed fields, access control, hooks, and auto-generated API endpoints.',
        linkId: 'payload-docs',
        sectionId: 'payload-concepts',
      },
      {
        term: 'Global (Payload)',
        definition: 'A single-document data structure in Payload — like a collection with only one entry. Used for site-wide settings such as navigation, footer content, or SEO defaults.',
        linkId: 'payload-docs',
        sectionId: 'payload-concepts',
      },
      {
        term: 'Lexical Editor',
        definition: 'Meta\u2019s open-source rich text editor used by Payload for <code>richText</code> fields. Supports inline and block-level custom components, extensible plugins, and a Notion-like editing experience.',
        linkId: 'payload-docs',
        sectionId: 'payload-features',
      },
    ],
  },
  {
    category: 'APIs & Integration',
    terms: [
      {
        term: 'Local API (Payload)',
        definition: 'A server-side API that executes Payload operations directly in Node.js without HTTP overhead. Ideal for seed scripts, background jobs, and server-rendered pages. Access control is bypassed by default.',
        linkId: 'payload-local-api',
        sectionId: 'payload-apis',
      },
      {
        term: 'MCP (Model Context Protocol)',
        definition: 'A protocol that enables AI assistants to interact with external tools and data sources. Payload\u2019s MCP plugin exposes collection CRUD operations to AI assistants like Claude Desktop and Cursor.',
        linkId: 'payload-mcp-plugin',
        sectionId: 'payload-ai-tooling',
        guides: ['payload-cms', 'prompt-engineering'],
      },
    ],
  },
]
