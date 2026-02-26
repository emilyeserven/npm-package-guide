import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'
import type { QuizQuestion } from '../components/mdx/QuizBase'

/* ───────────────────────── TYPES ───────────────────────── */

export interface PayloadConcept {
  id: string
  title: string
  body: string
}

export interface PayloadFlowNode {
  id: string
  icon: string
  label: string
  description: string
}

export interface PayloadFeature {
  id: string
  title: string
  body: string
}

export interface PayloadAiWorkflow {
  id: string
  title: string
  body: string
}

/* ───────────────────────── CORE CONCEPTS ───────────────────────── */

export const PAYLOAD_CONCEPTS: PayloadConcept[] = [
  {
    id: 'collections',
    title: 'Collections',
    body: 'Collections are the primary data model in Payload. Think of them like database tables \u2014 each collection defines a type of content (Posts, Users, Products, Media) with its own fields, access control, hooks, and API endpoints. Each document in a collection has a unique <code>id</code> and follows the field schema you define.',
  },
  {
    id: 'globals',
    title: 'Globals',
    body: 'Globals are single-document data structures \u2014 like a collection that only ever has one entry. They\u2019re ideal for site-wide settings (navigation, footer content, SEO defaults, site metadata). You access them via <code>payload.findGlobal()</code> or the <code>/api/globals/&lt;slug&gt;</code> REST endpoint.',
  },
  {
    id: 'fields',
    title: 'Fields',
    body: 'Fields define the schema of your data. Payload has a rich set of field types: <code>text</code>, <code>richText</code>, <code>number</code>, <code>select</code>, <code>relationship</code>, <code>upload</code>, <code>array</code>, <code>blocks</code>, <code>group</code>, <code>tabs</code>, <code>json</code>, and more. Fields support validation, conditional logic, access control, and default values \u2014 all in code. The <code>blocks</code> field type lets content editors compose pages from reusable components, making it a powerful page-builder primitive.',
  },
  {
    id: 'hooks',
    title: 'Hooks',
    body: 'Hooks let you execute custom logic at various points in the data lifecycle: <code>beforeChange</code>, <code>afterChange</code>, <code>beforeRead</code>, <code>afterRead</code>, <code>beforeDelete</code>, <code>afterDelete</code>, and <code>beforeValidate</code>. They work at the collection level and the field level, giving you fine-grained control for things like sending emails on document publish, syncing to third-party services, or transforming data on read.',
  },
  {
    id: 'access-control',
    title: 'Access Control',
    body: 'Payload has a powerful access control system that operates at both the collection level and the field level. Access functions receive the authenticated user and return a boolean or a query constraint. This lets you build complex RBAC systems, multi-tenant architectures, or field-level permissions \u2014 all as plain TypeScript functions.',
  },
]

/* ───────────────────────── ARCHITECTURE FLOW ───────────────────────── */

export const PAYLOAD_FLOW_NODES: PayloadFlowNode[] = [
  {
    id: 'config',
    icon: '\u2699\uFE0F',
    label: 'Config',
    description: 'Your <code>payload.config.ts</code> is the single source of truth. It defines collections, globals, fields, hooks, access control, plugins, and database adapter. Payload reads this at startup and generates everything else from it.',
  },
  {
    id: 'database',
    icon: '\u{1F5C4}\uFE0F',
    label: 'Database',
    description: 'Payload writes to your chosen database via its adapter layer. PostgreSQL uses Drizzle ORM under the hood; MongoDB uses its native driver. SQLite is also supported. Payload auto-manages migrations for Postgres.',
  },
  {
    id: 'apis',
    icon: '\u{1F50C}',
    label: 'APIs',
    description: 'From your config, Payload auto-generates three API surfaces: a REST API, a GraphQL API (with Playground), and a Local API for server-side use. All three share the same query operators and return the same typed responses.',
  },
  {
    id: 'frontend',
    icon: '\u{1F5A5}\uFE0F',
    label: 'Frontend',
    description: 'Your frontend (React + TanStack Router, Astro, mobile app, etc.) consumes data from the REST or GraphQL APIs. Since Payload is headless, the rendering layer is entirely your choice. Generated types keep everything in sync.',
  },
]

/* ───────────────────────── KEY FEATURES ───────────────────────── */

export const PAYLOAD_FEATURES: PayloadFeature[] = [
  {
    id: 'lexical',
    title: 'Lexical Rich Text Editor',
    body: 'Payload uses Meta\u2019s Lexical editor for rich text, replacing the older Slate-based editor. Lexical supports inline and block-level custom components \u2014 you can embed dynamic content (API-driven prices, banners, CTAs) directly inside rich text without editors needing to touch code. The editor feels like Notion: clean, modern, and extensible.',
  },
  {
    id: 'jobs-queue',
    title: 'Built-in Jobs Queue',
    body: 'Payload 3.0 introduced a jobs queue \u2014 a feature previously only found in backend frameworks like Laravel or Rails. You can define tasks and workflows in your config, defer expensive work (image processing, email sending, third-party syncing), schedule recurring jobs, and chain tasks into multi-step workflows.',
  },
  {
    id: 'auth',
    title: 'First-Class Authentication',
    body: 'Any collection can be auth-enabled by adding <code>auth: true</code> to its config. This gives you user registration, login, token-based auth (JWT), password reset flows, email verification, and session management \u2014 all out of the box. API keys and OAuth are also supported.',
  },
  {
    id: 'live-preview',
    title: 'Visual Editing & Live Preview',
    body: 'Payload supports live preview, where content editors see their changes reflected in your frontend in real-time as they type. Visual editing lets editors click directly on frontend elements to navigate to the corresponding fields in the admin panel.',
  },
]

/* ───────────────────────── AI WORKFLOWS ───────────────────────── */

export const PAYLOAD_AI_WORKFLOWS: PayloadAiWorkflow[] = [
  {
    id: 'schema-design',
    title: 'AI-Assisted Schema Design',
    body: 'Describe your data model in natural language \u2014 "I need a blog with posts, categories, and author bios" \u2014 and Claude Code or Cursor (with the Payload skill installed) can generate complete collection configs with appropriate field types, relationships, access control, and admin UI settings.',
  },
  {
    id: 'content-ops',
    title: 'AI-Powered Content Operations',
    body: 'With the MCP plugin connected, you can manage content through conversational AI: "Publish all draft posts from this week," "Create a new product with these specs," or "Find all pages missing meta descriptions." The AI has full CRUD access scoped by your API key permissions.',
  },
  {
    id: 'testing',
    title: 'AI-Assisted Testing',
    body: 'Payload\u2019s CLAUDE.md file includes detailed testing conventions. Claude Code can generate test suites for your hooks, access control functions, and custom endpoints that follow Payload\u2019s patterns \u2014 including proper cleanup, transaction handling, and the self-contained test style the project uses.',
  },
]

/* ───────────────────────── QUIZ ───────────────────────── */

export const PAYLOAD_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'What does "headless" mean in the context of Payload CMS?',
    options: [
      'It runs without a database',
      'It doesn\u2019t have an admin panel',
      'It manages content but doesn\u2019t control frontend rendering',
      'It only works via command line',
    ],
    answer: 2,
    explanation: '"Headless" means Payload handles content management (backend, APIs, admin panel) but leaves the presentation layer (frontend) entirely up to you. You consume content via APIs.',
  },
  {
    q: 'Which API surface bypasses HTTP entirely and is ideal for server-side contexts?',
    options: [
      'REST API',
      'GraphQL',
      'Local API',
      'WebSocket API',
    ],
    answer: 2,
    explanation: 'The Local API executes Payload operations directly in Node.js without any HTTP overhead. It\u2019s perfect for server-rendered pages, seed scripts, and background jobs.',
  },
  {
    q: 'What does the Payload MCP plugin enable AI assistants to do?',
    options: [
      'Replace the admin panel entirely',
      'Perform CRUD operations on collections through natural language',
      'Automatically deploy your Payload instance',
      'Train custom AI models on your content',
    ],
    answer: 1,
    explanation: 'The MCP plugin exposes your collections as MCP tools, letting AI assistants list, create, read, update, and delete documents through conversational interfaces.',
  },
  {
    q: 'What is the primary advantage of Payload\u2019s config-first approach?',
    options: [
      'It requires less code than GUI-based CMS platforms',
      'Your schema is version-controlled, type-safe, and portable',
      'It makes Payload faster than other CMS platforms',
      'It eliminates the need for a database',
    ],
    answer: 1,
    explanation: 'Because your entire schema lives in TypeScript files, it\u2019s version-controlled via Git, fully type-safe, and portable across environments \u2014 something GUI-based config can\u2019t match.',
  },
]

export const PAYLOAD_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['payload-start'] },
  { label: 'Fundamentals', ids: ['payload-overview', 'payload-concepts'] },
  { label: 'Architecture', ids: ['payload-architecture', 'payload-collections'] },
  { label: 'Integration', ids: ['payload-apis', 'payload-frontend'] },
  { label: 'Advanced', ids: ['payload-features', 'payload-ai-tooling'] },
  { label: 'Knowledge Check', ids: ['payload-quiz'] },
]

export const PAYLOAD_START_PAGE_DATA: StartPageData = {
  subtitle: 'Config-first schemas \u00b7 REST + GraphQL + Local API \u00b7 TypeScript end-to-end \u00b7 AI-powered tooling.',
  tip: 'Designed for developers evaluating headless CMS options or getting started with Payload \u2014 especially those coming from traditional CMS platforms like WordPress.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'What Is Payload & Core Concepts',
      description: 'Understand what makes Payload different from traditional CMS platforms and learn its four building blocks: Collections, Globals, Fields, and Hooks.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        'payload-overview': 'Headless CMS explained \u2014 config-first vs GUI-based, comparison with WordPress.',
        'payload-concepts': 'Collections, Globals, Fields, Hooks, and Access Control.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Architecture & Collections',
      description: 'Trace how data flows from config to database to API to frontend, and write your first collection.',
      sectionLabel: 'Architecture',
      subItemDescriptions: {
        'payload-architecture': 'Config \u2192 Database \u2192 APIs \u2192 Frontend data flow and database adapters.',
        'payload-collections': 'Write a complete collection config with fields, access control, and hooks.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'API Integration',
      description: 'Consume Payload\u2019s three API surfaces and wire up a type-safe frontend with TanStack.',
      sectionLabel: 'Integration',
      subItemDescriptions: {
        'payload-apis': 'REST API, GraphQL, and Local API \u2014 same query language, three surfaces.',
        'payload-frontend': 'Type-safe React frontend with TanStack Router and TanStack Query.',
      },
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Advanced Features & AI Tooling',
      description: 'Deep dive into Lexical editor, jobs queue, auth, live preview, and the AI ecosystem around Payload.',
      sectionLabel: 'Advanced',
      subItemDescriptions: {
        'payload-features': 'Lexical editor, jobs queue, first-class auth, live preview, and deployment.',
        'payload-ai-tooling': 'MCP plugin, Claude Code skills, AI content generation, and scaffolding.',
      },
    },
    {
      type: 'bonus',
      title: 'Knowledge Check',
      description: 'Test your understanding of Payload concepts with an interactive quiz.',
      sectionLabel: 'Knowledge Check',
      subItemDescriptions: {
        'payload-quiz': 'Four questions covering headless CMS, APIs, MCP, and config-first approach.',
      },
    },
  ],
  relatedGuides: ['nextjs-abstractions', 'architecture'],
}

export const PAYLOAD_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'payload-cms',
    icon: '\uD83C\uDFAF',
    title: 'Payload CMS Field Guide',
    startPageId: 'payload-start',
    description: 'Payload CMS \u2014 the open-source, code-first headless CMS built on TypeScript and React. Config-first schemas, three API surfaces, and AI tooling.',
    category: 'infrastructure',
    dateCreated: '2026-02-26',
    dateModified: '2026-02-26',
    sections: PAYLOAD_GUIDE_SECTIONS,
  },
  startPageData: PAYLOAD_START_PAGE_DATA,
}
