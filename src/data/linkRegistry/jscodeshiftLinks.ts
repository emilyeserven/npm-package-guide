import type { RegistryLink } from './types'

export const jscodeshiftLinks: RegistryLink[] = [
  // ─── Documentation ─────────────────────────────────────────────────
  {
    id: 'jcs-repo',
    url: 'https://github.com/facebook/jscodeshift',
    label: 'jscodeshift — GitHub',
    source: 'GitHub',
    desc: 'Main repository with CLI runner, collection API, and TypeScript definitions',
    tags: ['docs', 'free', 'guide:jscodeshift'],
    resourceCategory: 'Documentation',
  },
  {
    id: 'jcs-astexplorer',
    url: 'https://astexplorer.net',
    label: 'AST Explorer',
    source: 'AST Explorer',
    desc: 'Interactive AST visualization with built-in jscodeshift transform sandbox',
    tags: ['tool', 'free', 'guide:jscodeshift'],
    resourceCategory: 'Tools',
  },
  {
    id: 'jcs-recast',
    url: 'https://github.com/benjamn/recast',
    label: 'recast — GitHub',
    source: 'GitHub',
    desc: 'Format-preserving JavaScript parser and printer used by jscodeshift under the hood',
    tags: ['docs', 'free', 'guide:jscodeshift'],
    resourceCategory: 'Documentation',
  },
  {
    id: 'jcs-ast-types',
    url: 'https://github.com/benjamn/ast-types',
    label: 'ast-types — GitHub',
    source: 'GitHub',
    desc: 'AST type definitions and builder signatures \u2014 the type system behind jscodeshift\u2019s API',
    tags: ['docs', 'free', 'guide:jscodeshift'],
    resourceCategory: 'Documentation',
  },
  // ─── Community ────────────────────────────────────────────────────
  {
    id: 'jcs-react-codemod',
    url: 'https://github.com/reactjs/react-codemod',
    label: 'react-codemod — GitHub',
    source: 'GitHub',
    desc: 'Official React codemods \u2014 great examples of production-quality jscodeshift transforms',
    tags: ['examples', 'free', 'guide:jscodeshift'],
    resourceCategory: 'Examples & Tutorials',
  },
  {
    id: 'jcs-codemod-com',
    url: 'https://github.com/codemod-com/codemod',
    label: 'codemod.com — Community Registry',
    source: 'codemod.com',
    desc: 'Community registry of codemods with a runner that supports jscodeshift transforms',
    tags: ['tool', 'free', 'guide:jscodeshift'],
    resourceCategory: 'Tools',
  },
]
