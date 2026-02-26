import type { GlossaryCategory } from './types'

export const jscodeshiftGlossary: GlossaryCategory[] = [
  {
    category: 'Codemods & AST',
    terms: [
      {
        term: 'Codemod',
        definition: 'A programmatic code transformation that modifies source files using AST manipulation rather than text-based find-and-replace. Codemods are deterministic, testable, and can process thousands of files at once.',
        linkId: 'jcs-repo',
        sectionId: 'jcs-concepts',
        guides: ['jscodeshift'],
      },
      {
        term: 'AST (Abstract Syntax Tree)',
        definition: 'A tree representation of source code where each node represents a syntactic construct \u2014 identifiers, function calls, import declarations, etc. jscodeshift transforms operate on this tree rather than raw text.',
        linkId: 'jcs-astexplorer',
        sectionId: 'jcs-concepts',
        guides: ['jscodeshift'],
      },
      {
        term: 'jscodeshift',
        definition: 'A toolkit by Facebook for running codemods over JavaScript and TypeScript. Wraps recast for format-preserving parsing/printing and provides a jQuery-like Collection API for AST queries.',
        linkId: 'jcs-repo',
        sectionId: 'jcs-concepts',
        guides: ['jscodeshift'],
      },
      {
        term: 'recast',
        definition: 'A JavaScript parser and printer that preserves original formatting, comments, and whitespace for untouched AST nodes. The engine behind jscodeshift\u2019s format-preserving transforms.',
        linkId: 'jcs-recast',
        sectionId: 'jcs-concepts',
        guides: ['jscodeshift'],
      },
      {
        term: 'Collection (jscodeshift)',
        definition: 'jscodeshift\u2019s wrapper around sets of AST node paths. Provides chainable methods like <code>.find()</code>, <code>.filter()</code>, <code>.replaceWith()</code>, and <code>.remove()</code> for querying and mutating the tree.',
        linkId: 'jcs-repo',
        sectionId: 'jcs-api',
        guides: ['jscodeshift'],
      },
      {
        term: 'Node Path',
        definition: 'A wrapper around an AST node that adds context: parent node, scope information, and mutation methods like <code>replaceWith()</code> and <code>insertBefore()</code>. Paths are what you interact with in jscodeshift callbacks.',
        linkId: 'jcs-ast-types',
        sectionId: 'jcs-api',
        guides: ['jscodeshift'],
      },
      {
        term: 'ast-types',
        definition: 'The type definition library underlying jscodeshift. Defines all AST node types (e.g., <code>Identifier</code>, <code>CallExpression</code>) and their corresponding builder functions.',
        linkId: 'jcs-ast-types',
        sectionId: 'jcs-reference',
        guides: ['jscodeshift'],
      },
    ],
  },
]
