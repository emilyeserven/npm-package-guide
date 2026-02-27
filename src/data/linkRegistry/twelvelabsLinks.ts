import type { RegistryLink } from './index'

export const twelvelabsLinks: RegistryLink[] = [
  {
    id: 'twelvelabs-docs',
    url: 'https://docs.twelvelabs.io',
    label: 'TwelveLabs documentation',
    source: 'TwelveLabs',
    desc: 'Official API documentation covering indexes, search, analyze, embed, and SDK references',
    tags: ['docs', 'free', 'guide:twelvelabs'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'twelvelabs-playground',
    url: 'https://playground.twelvelabs.io',
    label: 'TwelveLabs Playground',
    source: 'TwelveLabs',
    desc: 'Interactive API playground for testing video search, analysis, and embedding workflows',
    tags: ['tool', 'free', 'guide:twelvelabs'],
    resourceCategory: 'Tools & Playgrounds',
  },
  {
    id: 'twelvelabs-sdk',
    url: 'https://www.npmjs.com/package/twelvelabs-js',
    label: 'twelvelabs-js SDK',
    source: 'npm',
    desc: 'Official JavaScript/TypeScript SDK for the TwelveLabs API',
    tags: ['package', 'free', 'guide:twelvelabs'],
    resourceCategory: 'Libraries & SDKs',
  },
  {
    id: 'twelvelabs-api-reference',
    url: 'https://docs.twelvelabs.io/reference/api-reference',
    label: 'TwelveLabs API Reference',
    source: 'TwelveLabs',
    desc: 'Complete REST API reference with endpoint specs, request/response schemas, and error codes',
    tags: ['docs', 'free', 'guide:twelvelabs'],
    resourceCategory: 'Official Documentation',
  },
  {
    id: 'twelvelabs-quickstart',
    url: 'https://docs.twelvelabs.io/docs/quickstart',
    label: 'TwelveLabs Quickstart',
    source: 'TwelveLabs',
    desc: 'Step-by-step quickstart guide for creating indexes, uploading videos, and running your first search',
    tags: ['tutorial', 'free', 'guide:twelvelabs'],
    resourceCategory: 'Tutorials & Guides',
  },
]
