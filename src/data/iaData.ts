import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Guide sections ──────────────────────────────────────────────────

export const IA_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['ia-start'] },
  {
    label: 'Core Concepts',
    ids: ['ia-foundations', 'ia-organization'],
  },
  {
    label: 'Design Systems',
    ids: ['ia-navigation', 'ia-labeling'],
  },
  {
    label: 'Application',
    ids: ['ia-patterns', 'ia-ai-readability', 'ia-practice'],
  },
]

// ── Start page data ─────────────────────────────────────────────────

export const IA_START_PAGE_DATA: StartPageData = {
  subtitle:
    'The art of organizing information so people and AI agents can find what they need and understand where they are.',
  tip: 'If you\'ve ever designed a database schema or structured an API, you already think in IA terms. This guide maps those backend instincts to frontend and documentation contexts.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Core Concepts',
      description:
        'Learn the four pillars of IA and how different organization schemes shape user experience.',
      sectionLabel: 'Core Concepts',
      subItemDescriptions: {
        'ia-foundations': 'The four pillars of IA: organization, labeling, navigation, and search.',
        'ia-organization': 'Exact vs. ambiguous schemes, hierarchies, faceted classification.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Design Systems',
      description:
        'Apply IA to navigation structures and labeling conventions that help people orient themselves.',
      sectionLabel: 'Design Systems',
      subItemDescriptions: {
        'ia-navigation': 'Global, local, contextual, and supplementary navigation patterns.',
        'ia-labeling': 'Naming conventions, controlled vocabularies, and label consistency.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Application',
      description:
        'Put theory into practice with common patterns, AI-readability techniques, and audit workflows.',
      sectionLabel: 'Application',
      subItemDescriptions: {
        'ia-patterns': 'Hub-and-spoke, hierarchy, dashboard, and other structural patterns.',
        'ia-ai-readability': 'Structuring information so AI agents can navigate and understand it.',
        'ia-practice': 'Card sorting, tree testing, and IA audit checklists.',
      },
    },
  ],
}

// ── Pillar data ─────────────────────────────────────────────────────

export interface IaPillar {
  id: string
  icon: string
  title: string
  summary: string
  details: string
  backendAnalogy: string
}

export const IA_PILLARS: IaPillar[] = [
  {
    id: 'organization',
    icon: '\uD83D\uDCC2',
    title: 'Organization',
    summary: 'How information is grouped and structured.',
    details:
      'Organization schemes determine how content is categorized — alphabetically, chronologically, by topic, by audience, or by task. Good organization matches the mental models users already have.',
    backendAnalogy: 'Like designing database tables and relationships — choosing the right schema shapes everything downstream.',
  },
  {
    id: 'labeling',
    icon: '\uD83C\uDFF7\uFE0F',
    title: 'Labeling',
    summary: 'How information is named and represented.',
    details:
      'Labels are the words and icons used to represent content. They appear in navigation menus, headings, links, and index terms. Clear labels reduce cognitive load; ambiguous ones cause users to guess.',
    backendAnalogy: 'Like naming API endpoints, database columns, and error codes — clear naming is half the battle.',
  },
  {
    id: 'navigation',
    icon: '\uD83E\uDDED',
    title: 'Navigation',
    summary: 'How users move through information spaces.',
    details:
      'Navigation systems help users find content and understand where they are. This includes global menus, local sidebars, breadcrumbs, and contextual links. Navigation answers three questions: Where am I? Where can I go? How do I get back?',
    backendAnalogy: 'Like routing and middleware — defining the paths users take through a system.',
  },
  {
    id: 'search',
    icon: '\uD83D\uDD0D',
    title: 'Search',
    summary: 'How users query and discover information.',
    details:
      'Search systems let users find content by entering queries. Effective search requires good indexing, relevant results, and useful filters. It complements browsing when users know what they want but not where it lives.',
    backendAnalogy: 'Like building query interfaces on top of your data — indexes, full-text search, and faceted filters.',
  },
]

// ── Organization scheme data ────────────────────────────────────────

export interface IaOrgScheme {
  id: string
  title: string
  type: 'exact' | 'ambiguous'
  description: string
  example: string
  strength: string
  weakness: string
}

export const IA_ORG_SCHEMES: IaOrgScheme[] = [
  {
    id: 'alphabetical',
    title: 'Alphabetical',
    type: 'exact',
    description: 'Items sorted by name, A to Z.',
    example: 'A contacts list, a glossary, or an API reference sorted by method name.',
    strength: 'Users can predict where items appear. No ambiguity about placement.',
    weakness: 'Useless when users don\'t know the name of what they\'re looking for.',
  },
  {
    id: 'chronological',
    title: 'Chronological',
    type: 'exact',
    description: 'Items sorted by date or time sequence.',
    example: 'A changelog, blog archive, or deployment history ordered newest-first.',
    strength: 'Natural for time-based content. Users understand the order intuitively.',
    weakness: 'Breaks down when items span long time periods or need non-time grouping.',
  },
  {
    id: 'geographical',
    title: 'Geographical',
    type: 'exact',
    description: 'Items organized by physical or logical location.',
    example: 'Server regions in a cloud dashboard, store locators, or CDN edge nodes.',
    strength: 'Intuitive when location is the primary differentiator.',
    weakness: 'Irrelevant when content has no spatial relationship.',
  },
  {
    id: 'topical',
    title: 'Topical',
    type: 'ambiguous',
    description: 'Items grouped by subject or category.',
    example: 'Docs organized by feature area: Authentication, Database, Deployment.',
    strength: 'Matches domain knowledge. Helps users explore related concepts.',
    weakness: 'Categories can overlap. Where does "database authentication" go?',
  },
  {
    id: 'task-based',
    title: 'Task-Based',
    type: 'ambiguous',
    description: 'Items organized around user goals and workflows.',
    example: '"Getting Started", "Deploy Your App", "Troubleshoot Errors" — organized by what users want to accomplish.',
    strength: 'Aligns with user intent. Reduces time to complete goals.',
    weakness: 'Same content may support multiple tasks, leading to duplication or confusion.',
  },
  {
    id: 'audience',
    title: 'Audience-Based',
    type: 'ambiguous',
    description: 'Items organized by who will use them.',
    example: '"For Developers", "For Designers", "For Managers" — same product, different perspectives.',
    strength: 'Users self-select into relevant content. Reduces noise.',
    weakness: 'Users may not identify with a single audience. Content duplication across audiences.',
  },
]

// ── Navigation pattern data ─────────────────────────────────────────

export interface IaNavPattern {
  id: string
  title: string
  icon: string
  description: string
  examples: string[]
  whenToUse: string
}

export const IA_NAV_PATTERNS: IaNavPattern[] = [
  {
    id: 'global',
    title: 'Global Navigation',
    icon: '\uD83C\uDF10',
    description: 'Persistent navigation visible across all pages. Provides access to top-level sections from anywhere.',
    examples: ['Top navbar with main sections', 'Sidebar with all guide links', 'Footer with site-wide links'],
    whenToUse: 'Every app or site needs some form of global navigation. Keep it to 5\u20137 top-level items.',
  },
  {
    id: 'local',
    title: 'Local Navigation',
    icon: '\uD83D\uDCC1',
    description: 'Navigation within a specific section or subsection. Shows sibling and child pages of the current area.',
    examples: ['Sidebar showing pages within a guide', 'Sub-navigation tabs within a settings area', 'Section table of contents'],
    whenToUse: 'When a section has multiple pages or sub-areas that users browse sequentially or selectively.',
  },
  {
    id: 'contextual',
    title: 'Contextual Navigation',
    icon: '\uD83D\uDD17',
    description: 'Inline links within content that connect to related pages. Appears naturally within the flow of information.',
    examples: ['Inline hyperlinks in documentation', '"See also" links at end of sections', 'Cross-references between API docs'],
    whenToUse: 'When content naturally references other content. Don\'t overdo it \u2014 too many inline links fragment attention.',
  },
  {
    id: 'supplementary',
    title: 'Supplementary Navigation',
    icon: '\uD83D\uDDFA\uFE0F',
    description: 'Alternative navigation that provides a different view of the same content space \u2014 sitemaps, indexes, and search.',
    examples: ['Site search', 'A\u2013Z index', 'Sitemap', 'Tag cloud', 'Command palette (Cmd+K)'],
    whenToUse: 'As a complement to structural navigation. Especially important for large content sets where browsing alone is insufficient.',
  },
  {
    id: 'courtesy',
    title: 'Courtesy Navigation',
    icon: '\u2934\uFE0F',
    description: 'Small but essential links for common actions: home, back to top, previous/next, breadcrumbs.',
    examples: ['Breadcrumb trail', '"Back to top" button', 'Previous / Next page links', 'Skip navigation link for accessibility'],
    whenToUse: 'Always. These are the safety nets that prevent users from feeling lost.',
  },
]

// ── Structural pattern data ─────────────────────────────────────────

export interface IaStructuralPattern {
  id: string
  title: string
  icon: string
  description: string
  bestFor: string
  example: string
  tradeoff: string
}

export const IA_STRUCTURAL_PATTERNS: IaStructuralPattern[] = [
  {
    id: 'hierarchy',
    title: 'Hierarchy (Nested Doll)',
    icon: '\uD83C\uDFE0',
    description: 'Content arranged in a tree structure with parent\u2013child relationships. Users drill down through progressively specific levels.',
    bestFor: 'Documentation sites, file systems, organizational charts.',
    example: 'Docs \u2192 Guide \u2192 Section \u2192 Page \u2192 Subsection',
    tradeoff: 'Deep hierarchies (4+ levels) frustrate users. Keep it broad and shallow.',
  },
  {
    id: 'hub-spoke',
    title: 'Hub and Spoke',
    icon: '\u2B50',
    description: 'A central hub links to independent spoke pages. Users always return to the hub before navigating elsewhere.',
    bestFor: 'Dashboards, home screens, app launchers, guide start pages.',
    example: 'This guide\u2019s Start page links to each section \u2014 a classic hub.',
    tradeoff: 'Forces extra clicks. Add cross-links between spokes for power users.',
  },
  {
    id: 'matrix',
    title: 'Matrix (Faceted)',
    icon: '\uD83D\uDD00',
    description: 'Content accessible through multiple dimensions simultaneously. Users filter and sort by different facets.',
    bestFor: 'Product catalogs, resource libraries, API references with multiple filter criteria.',
    example: 'A component library filterable by category, complexity, and framework.',
    tradeoff: 'Complex to implement. Only worthwhile when content genuinely has multiple useful dimensions.',
  },
  {
    id: 'sequential',
    title: 'Sequential (Linear)',
    icon: '\u27A1\uFE0F',
    description: 'Content arranged in a fixed order. Users follow a prescribed path from start to finish.',
    bestFor: 'Tutorials, onboarding flows, multi-step forms, setup wizards.',
    example: 'A "Getting Started" tutorial: Install \u2192 Configure \u2192 First Project \u2192 Deploy.',
    tradeoff: 'Inflexible. Experienced users want to skip ahead. Add escape hatches.',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: '\uD83D\uDCCA',
    description: 'A single view aggregating information from multiple sources. Users scan and drill into areas of interest.',
    bestFor: 'Admin panels, monitoring tools, project overviews, status pages.',
    example: 'A CI/CD dashboard showing build status, test results, and deploy history in one view.',
    tradeoff: 'Dashboards become cluttered fast. Prioritize ruthlessly and offer customization.',
  },
]

// ── AI readability principle data ───────────────────────────────────

export interface IaAiPrinciple {
  id: string
  title: string
  icon: string
  humanBenefit: string
  aiBenefit: string
  example: string
}

export const IA_AI_PRINCIPLES: IaAiPrinciple[] = [
  {
    id: 'predictable-paths',
    title: 'Predictable File Paths',
    icon: '\uD83D\uDCC1',
    humanBenefit: 'Developers can guess where files live without searching.',
    aiBenefit: 'AI agents can locate files via conventions instead of brute-force scanning.',
    example: 'src/components/mdx/<guide-id>/ \u2014 guide ID in path means any agent can find guide components.',
  },
  {
    id: 'entry-points',
    title: 'Explicit Entry Points',
    icon: '\uD83D\uDEAA',
    humanBenefit: 'New team members know exactly where to start reading.',
    aiBenefit: 'AI agents read CLAUDE.md or README.md first to build a mental map.',
    example: 'CLAUDE.md files at the root and per-guide describe structure, commands, and conventions.',
  },
  {
    id: 'naming-conventions',
    title: 'Consistent Naming',
    icon: '\uD83C\uDFF7\uFE0F',
    humanBenefit: 'Predictable names reduce cognitive load when navigating code.',
    aiBenefit: 'Pattern-based names let agents infer relationships: iaData.ts \u2192 iaLinks.ts \u2192 iaTerms.ts.',
    example: 'Every guide follows: <guideId>Data.ts, <guideId>Links.ts, <guideId>Terms.ts.',
  },
  {
    id: 'centralized-registries',
    title: 'Centralized Registries',
    icon: '\uD83D\uDCDA',
    humanBenefit: 'One place to find all guides, links, or glossary terms.',
    aiBenefit: 'Agents query a single file to understand what exists instead of crawling directories.',
    example: 'guideRegistry.ts is the single source of truth for all guide metadata.',
  },
  {
    id: 'progressive-disclosure',
    title: 'Progressive Disclosure',
    icon: '\uD83D\uDD2C',
    humanBenefit: 'Users see what they need now; details are available on demand.',
    aiBenefit: 'AI agents load summary files first, then drill into details as needed \u2014 preserving context window.',
    example: 'CLAUDE.md links to docs/CONTENT_REFERENCE.md for detailed conventions \u2014 read on demand.',
  },
  {
    id: 'self-describing',
    title: 'Self-Describing Structure',
    icon: '\uD83D\uDCDD',
    humanBenefit: 'Code and config explain themselves without external documentation.',
    aiBenefit: 'Type definitions, JSDoc, and frontmatter let agents understand intent from code alone.',
    example: 'MDX frontmatter (id, title, guide) makes each page self-describing without external lookup.',
  },
]

export const IA_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'info-architecture',
    icon: '🗺️',
    title: 'Information Architecture',
    startPageId: 'ia-start',
    description: 'The art of organizing information so people and AI agents can find what they need and understand where they are.',
    category: 'fundamentals',
    sections: IA_GUIDE_SECTIONS,
  },
  startPageData: IA_START_PAGE_DATA,
}
