import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Types ────────────────────────────────────────────────────────────

export interface JcsPipelineStep {
  label: string
  value: string
  accent?: boolean
}

export interface JcsConceptCard {
  id: string
  icon: string
  iconBg: string
  iconDarkBg: string
  iconColor: string
  iconDarkColor: string
  title: string
  body: string
}

export interface JcsAstExample {
  source: string
  tree: string
}

export interface JcsCollectionMethod {
  method: string
  description: string
  returns: string
}

export interface JcsTransformPattern {
  id: string
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  difficultyColor: string
  difficultyDarkColor: string
  transform: string
  before: string
  after: string
}

export interface JcsRecipe {
  id: string
  title: string
  code: string
  caveat?: string
}

export interface JcsCliFlag {
  flag: string
  description: string
  defaultVal: string
}

export interface JcsRolloutStep {
  num: number
  title: string
  body: string
}

export interface JcsPitfall {
  id: string
  title: string
  body: string
}

export interface JcsNodeType {
  nodeType: string
  represents: string
  example: string
}

export interface JcsBuilder {
  description: string
  call: string
}

export interface JcsEcosystemLink {
  title: string
  url: string
  description: string
}

export interface JcsAgentScenario {
  scenario: string
  approach: string
  approachColor: 'blue' | 'green' | 'amber'
  why: string
}

// ── Transform Pipeline ──────────────────────────────────────────────

export const JCS_PIPELINE_STEPS: JcsPipelineStep[] = [
  { label: 'Input', value: 'Source Code' },
  { label: 'Parse', value: 'recast' },
  { label: 'Transform', value: 'Your Codemod', accent: true },
  { label: 'Print', value: 'recast' },
  { label: 'Output', value: 'Modified Code' },
]

// ── Core Concept Cards ──────────────────────────────────────────────

export const JCS_CONCEPT_CARDS: JcsConceptCard[] = [
  {
    id: 'ast',
    icon: '\u25C7',
    iconBg: 'rgba(96,165,250,0.12)',
    iconDarkBg: 'rgba(96,165,250,0.12)',
    iconColor: '#3b82f6',
    iconDarkColor: '#60a5fa',
    title: 'AST (Abstract Syntax Tree)',
    body: 'A tree representation of your source code. Each node represents a construct \u2014 an identifier, a function call, an import declaration, etc.',
  },
  {
    id: 'collection',
    icon: '\u229E',
    iconBg: 'rgba(52,211,153,0.12)',
    iconDarkBg: 'rgba(52,211,153,0.12)',
    iconColor: '#059669',
    iconDarkColor: '#34d399',
    title: 'Collection',
    body: 'jscodeshift\u2019s wrapper around sets of AST nodes. Provides chainable methods for finding, filtering, and transforming \u2014 like jQuery for code.',
  },
  {
    id: 'transform',
    icon: '\u03BB',
    iconBg: 'rgba(167,139,250,0.12)',
    iconDarkBg: 'rgba(167,139,250,0.12)',
    iconColor: '#7c3aed',
    iconDarkColor: '#a78bfa',
    title: 'Transform Function',
    body: 'The function you export from your codemod file. Receives <code>fileInfo</code>, <code>api</code>, and <code>options</code>. Returns modified source or <code>undefined</code>.',
  },
  {
    id: 'nodepath',
    icon: '\u27D0',
    iconBg: 'rgba(251,191,36,0.12)',
    iconDarkBg: 'rgba(251,191,36,0.12)',
    iconColor: '#d97706',
    iconDarkColor: '#fbbf24',
    title: 'Node Path',
    body: 'A wrapper around each AST node that provides context: parent nodes, scope information, and mutation methods like <code>replaceWith</code>.',
  },
]

// ── AST Demo Examples ───────────────────────────────────────────────

export const JCS_AST_EXAMPLES: JcsAstExample[] = [
  {
    source: 'const greet = (name) => `Hello, ${name}!`;',
    tree: `Program
 \u2514\u2500 VariableDeclaration (const)
     \u2514\u2500 VariableDeclarator
         \u251C\u2500 Identifier: "greet"
         \u2514\u2500 ArrowFunctionExpression
             \u251C\u2500 params:
             \u2502   \u2514\u2500 Identifier: "name"
             \u2514\u2500 body: TemplateLiteral
                 \u251C\u2500 quasis: ["Hello, ", "!"]
                 \u2514\u2500 expressions:
                     \u2514\u2500 Identifier: "name"`,
  },
  {
    source: "import { useState } from 'react';",
    tree: `Program
 \u2514\u2500 ImportDeclaration
     \u251C\u2500 specifiers:
     \u2502   \u2514\u2500 ImportSpecifier
     \u2502       \u251C\u2500 imported: Identifier "useState"
     \u2502       \u2514\u2500 local: Identifier "useState"
     \u2514\u2500 source: StringLiteral "react"`,
  },
  {
    source: `<Button variant="primary" onClick={handleClick}>
  Save
</Button>`,
    tree: `Program
 \u2514\u2500 ExpressionStatement
     \u2514\u2500 JSXElement
         \u251C\u2500 openingElement: JSXOpeningElement
         \u2502   \u251C\u2500 name: JSXIdentifier "Button"
         \u2502   \u2514\u2500 attributes:
         \u2502       \u251C\u2500 JSXAttribute
         \u2502       \u2502   \u251C\u2500 name: "variant"
         \u2502       \u2502   \u2514\u2500 value: StringLiteral "primary"
         \u2502       \u2514\u2500 JSXAttribute
         \u2502           \u251C\u2500 name: "onClick"
         \u2502           \u2514\u2500 value: JSXExpressionContainer
         \u2502               \u2514\u2500 Identifier "handleClick"
         \u251C\u2500 children: [JSXText "Save"]
         \u2514\u2500 closingElement: "Button"`,
  },
  {
    source: 'const data = await fetchUsers({ limit: 10 });',
    tree: `Program
 \u2514\u2500 VariableDeclaration (const)
     \u2514\u2500 VariableDeclarator
         \u251C\u2500 Identifier: "data"
         \u2514\u2500 AwaitExpression
             \u2514\u2500 CallExpression
                 \u251C\u2500 callee: Identifier "fetchUsers"
                 \u2514\u2500 arguments:
                     \u2514\u2500 ObjectExpression
                         \u2514\u2500 ObjectProperty
                             \u251C\u2500 key: Identifier "limit"
                             \u2514\u2500 value: NumericLiteral 10`,
  },
]

// ── Collection Methods ──────────────────────────────────────────────

export const JCS_COLLECTION_METHODS: JcsCollectionMethod[] = [
  { method: '.find(type, filter?)', description: 'Search descendants for matching nodes', returns: 'Collection' },
  { method: '.filter(callback)', description: 'Narrow collection by predicate', returns: 'Collection' },
  { method: '.forEach(callback)', description: 'Iterate each path in collection', returns: 'Collection' },
  { method: '.map(callback)', description: 'Map paths to new values', returns: 'Array' },
  { method: '.replaceWith(node)', description: 'Replace each match with new node(s)', returns: 'Collection' },
  { method: '.insertBefore(node)', description: 'Insert before each match', returns: 'Collection' },
  { method: '.insertAfter(node)', description: 'Insert after each match', returns: 'Collection' },
  { method: '.remove()', description: 'Delete matched nodes', returns: 'Collection' },
  { method: '.closest(type)', description: 'Walk up to nearest ancestor of type', returns: 'Collection' },
  { method: '.get()', description: 'Get first path in collection', returns: 'NodePath' },
  { method: '.length', description: 'Number of matches', returns: 'Number' },
  { method: '.toSource(opts?)', description: 'Print AST back to string', returns: 'String' },
]

// ── Transform Patterns ──────────────────────────────────────────────

export const JCS_TRANSFORM_PATTERNS: JcsTransformPattern[] = [
  {
    id: 'rename',
    title: 'Rename an Identifier',
    difficulty: 'Beginner',
    difficultyColor: '#059669',
    difficultyDarkColor: '#34d399',
    transform: `// Rename \`fetchData\` \u2192 \`queryData\`
export default function(file, api) {
  const j = api.jscodeshift;
  return j(file.source)
    .find(j.Identifier, {
      name: 'fetchData'
    })
    .forEach(path => {
      path.node.name = 'queryData';
    })
    .toSource();
}`,
    before: `const data = fetchData('/api/users');
export { fetchData };`,
    after: `const data = queryData('/api/users');
export { queryData };`,
  },
  {
    id: 'imports',
    title: 'Rewrite Imports',
    difficulty: 'Intermediate',
    difficultyColor: '#3b82f6',
    difficultyDarkColor: '#60a5fa',
    transform: `// Move named imports from 'utils'
// to '@acme/utils'
export default function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.ImportDeclaration, {
      source: { value: 'utils' }
    })
    .forEach(path => {
      path.node.source.value =
        '@acme/utils';
    });

  return root.toSource();
}`,
    before: `import { debounce, throttle } from 'utils';
import React from 'react';`,
    after: `import { debounce, throttle } from '@acme/utils';
import React from 'react';`,
  },
  {
    id: 'jsx-props',
    title: 'Transform Component Props',
    difficulty: 'Advanced',
    difficultyColor: '#d97706',
    difficultyDarkColor: '#fbbf24',
    transform: `// Rename prop \`color\` \u2192 \`variant\`
// on <Button> components
export default function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.JSXOpeningElement, {
      name: { name: 'Button' }
    })
    .find(j.JSXAttribute, {
      name: { name: 'color' }
    })
    .forEach(path => {
      path.node.name.name = 'variant';
    });

  return root.toSource();
}`,
    before: `<Button color="primary" size="lg">
  Save
</Button>`,
    after: `<Button variant="primary" size="lg">
  Save
</Button>`,
  },
  {
    id: 'api-migration',
    title: 'Full API Migration',
    difficulty: 'Expert',
    difficultyColor: '#dc2626',
    difficultyDarkColor: '#f87171',
    transform: `// Migrate: fetch(url, opts)
//      \u2192  httpClient.request({ url, ...opts })
export default function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.CallExpression, {
      callee: { name: 'fetch' }
    })
    .replaceWith(path => {
      const [url, opts] = path.node.arguments;
      const props = [
        j.objectProperty(
          j.identifier('url'), url
        ),
        ...(opts?.properties || [])
      ];
      return j.callExpression(
        j.memberExpression(
          j.identifier('httpClient'),
          j.identifier('request')
        ),
        [j.objectExpression(props)]
      );
    });

  return root.toSource();
}`,
    before: `const res = await fetch(
  '/api/users',
  { method: 'POST', body: data }
);`,
    after: `const res = await httpClient.request({
  url: '/api/users',
  method: 'POST',
  body: data
});`,
  },
]

// ── Recipes ─────────────────────────────────────────────────────────

export const JCS_RECIPES: JcsRecipe[] = [
  {
    id: 'deprecated-api',
    title: 'Remove deprecated API calls & add replacement',
    code: `export default function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;

  // Replace deprecated \`getUser()\` with \`useUser()\` hook
  root
    .find(j.CallExpression, { callee: { name: 'getUser' } })
    .forEach(path => {
      path.node.callee.name = 'useUser';
      hasChanges = true;
    });

  // Add import for useUser if we made changes
  if (hasChanges) {
    const importExists = root
      .find(j.ImportDeclaration, {
        source: { value: '@acme/hooks' }
      })
      .length > 0;

    if (!importExists) {
      const newImport = j.importDeclaration(
        [j.importSpecifier(j.identifier('useUser'))],
        j.literal('@acme/hooks')
      );
      root.find(j.ImportDeclaration)
        .at(-1)
        .insertAfter(newImport);
    }
  }

  return hasChanges ? root.toSource() : undefined;
}`,
  },
  {
    id: 'class-to-function',
    title: 'Convert class components to function components',
    code: `// Converts simple class \u2192 function component
// Handles: render() method extraction
export default function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.ClassDeclaration)
    .filter(path => {
      const sc = path.node.superClass;
      return sc && (
        sc.name === 'Component' ||
        (sc.object?.name === 'React' &&
         sc.property?.name === 'Component')
      );
    })
    .forEach(path => {
      const className = path.node.id.name;
      const renderMethod = path.node.body.body
        .find(m => m.key?.name === 'render');

      if (!renderMethod) return;

      const funcComponent = j.functionDeclaration(
        j.identifier(className),
        [j.identifier('props')],
        renderMethod.value.body
      );

      j(path).replaceWith(funcComponent);
    });

  return root.toSource();
}`,
    caveat: 'This is a simplified version. Full class-to-function conversions need to handle lifecycle methods, <code>this.state</code> \u2192 <code>useState</code>, <code>this.props</code> \u2192 destructured params, refs, and static properties. Consider using react-codemod for production-grade conversions.',
  },
  {
    id: 'error-boundaries',
    title: 'Add error boundaries around async components',
    code: `// Wraps <SuspenseComponent /> usages with <ErrorBoundary>
export default function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const targets = ['AsyncList', 'AsyncDetail', 'LazyPage'];

  root
    .find(j.JSXElement)
    .filter(path => {
      const name = path.node.openingElement.name.name;
      return targets.includes(name);
    })
    .filter(path => {
      // Skip if already wrapped in ErrorBoundary
      const parent = path.parentPath.node;
      return !(parent.type === 'JSXElement' &&
        parent.openingElement.name.name === 'ErrorBoundary');
    })
    .replaceWith(path =>
      j.jsxElement(
        j.jsxOpeningElement(
          j.jsxIdentifier('ErrorBoundary'), []
        ),
        j.jsxClosingElement(
          j.jsxIdentifier('ErrorBoundary')
        ),
        [j.jsxText('\\n  '), path.node, j.jsxText('\\n')]
      )
    );

  return root.toSource();
}`,
  },
  {
    id: 'tanstack-query-v5',
    title: 'Migrate TanStack Query v4 \u2192 v5 (setQueryData signature)',
    code: `// TanStack Query v5 changed setQueryData to always
// require a function updater (no direct values)
export default function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        property: { name: 'setQueryData' }
      }
    })
    .forEach(path => {
      const args = path.node.arguments;
      if (args.length === 2 &&
          args[1].type !== 'ArrowFunctionExpression' &&
          args[1].type !== 'FunctionExpression') {
        // Wrap direct value in () => value
        args[1] = j.arrowFunctionExpression(
          [],
          args[1]
        );
      }
    });

  return root.toSource();
}`,
  },
]

// ── CLI Flags ───────────────────────────────────────────────────────

export const JCS_CLI_FLAGS: JcsCliFlag[] = [
  { flag: '-t', description: 'Path to the transform file', defaultVal: 'required' },
  { flag: '-d', description: 'Dry run \u2014 don\u2019t write files', defaultVal: 'false' },
  { flag: '-p', description: 'Print transformed output to stdout', defaultVal: 'false' },
  { flag: '--parser', description: 'Parser to use', defaultVal: 'babel' },
  { flag: '--extensions', description: 'File extensions to process', defaultVal: 'js' },
  { flag: '--ignore-pattern', description: 'Glob patterns to skip', defaultVal: '\u2014' },
  { flag: '--cpus', description: 'Number of worker processes', defaultVal: 'max/2' },
  { flag: '--run-in-band', description: 'Single process (easier debugging)', defaultVal: 'false' },
  { flag: '--verbose', description: 'Verbosity level (0, 1, 2)', defaultVal: '0' },
  { flag: '--stdin', description: 'Read file list from stdin', defaultVal: 'false' },
]

// ── Rollout Steps ───────────────────────────────────────────────────

export const JCS_ROLLOUT_STEPS: JcsRolloutStep[] = [
  {
    num: 1,
    title: 'Write + test the transform',
    body: 'Use fixture-based tests with edge cases. Validate idempotency \u2014 running the codemod twice should produce the same output.',
  },
  {
    num: 2,
    title: 'Dry run on the full codebase',
    body: 'Run with <code>-d -p</code> flags to preview changes. Pipe output through <code>diff</code> or review in your editor. Identify unexpected matches.',
  },
  {
    num: 3,
    title: 'Run on a small directory first',
    body: 'Apply the transform to a single package or module. Verify the build passes, tests pass, and behavior is unchanged. Fix any issues found.',
  },
  {
    num: 4,
    title: 'Full codebase run + commit',
    body: 'Run across all files. Create a single, well-documented commit or PR. Include the transform file in the PR description for reviewability.',
  },
  {
    num: 5,
    title: 'Add lint rules to prevent regressions',
    body: 'After migrating, add ESLint rules (custom or <code>no-restricted-imports</code> / <code>no-restricted-syntax</code>) to prevent old patterns from reappearing.',
  },
]

// ── Common Pitfalls ─────────────────────────────────────────────────

export const JCS_PITFALLS: JcsPitfall[] = [
  {
    id: 'formatting',
    title: 'Transform modifies comments or whitespace unexpectedly',
    body: 'This happens when you replace a parent node rather than mutating the specific child. Prefer direct mutation (<code>path.node.name = \'x\'</code>) over <code>replaceWith()</code> where possible, since replacement rebuilds the entire node subtree and loses original formatting.',
  },
  {
    id: 'typescript',
    title: 'Transform doesn\u2019t match TypeScript files',
    body: 'The default parser is <code>babel</code>, which can\u2019t parse TypeScript type annotations. Use <code>--parser=tsx</code> on the CLI, or export <code>const parser = \'tsx\'</code> from your transform file. The <code>tsx</code> parser handles both <code>.ts</code> and <code>.tsx</code> files.',
  },
  {
    id: 'no-changes',
    title: 'Transform runs but changes nothing',
    body: 'Common causes: the node type or filter shape doesn\u2019t match the actual AST structure. Always verify in AST Explorer first. Also check: are you returning <code>root.toSource()</code> (not just calling <code>forEach</code> without a return)?',
  },
  {
    id: 'performance',
    title: 'Performance issues on large codebases',
    body: 'jscodeshift parallelizes via worker processes, but each worker still parses + prints entire files. Tips: use <code>--ignore-pattern</code> to skip irrelevant directories, use <code>--extensions</code> to limit file types, and return <code>undefined</code> early if a quick check shows no matches (e.g., <code>if (!file.source.includes(\'fetchData\')) return;</code>).',
  },
]

// ── Common AST Node Types ───────────────────────────────────────────

export const JCS_NODE_TYPES: JcsNodeType[] = [
  { nodeType: 'Identifier', represents: 'Variable/function name', example: 'myVar' },
  { nodeType: 'Literal / StringLiteral', represents: 'String, number, boolean', example: "'hello', 42" },
  { nodeType: 'CallExpression', represents: 'Function invocation', example: 'fn(arg)' },
  { nodeType: 'MemberExpression', represents: 'Property access', example: 'obj.prop' },
  { nodeType: 'ImportDeclaration', represents: 'Import statement', example: "import x from 'y'" },
  { nodeType: 'ExportNamedDeclaration', represents: 'Named export', example: 'export { x }' },
  { nodeType: 'VariableDeclaration', represents: 'Variable declaration', example: 'const x = 1' },
  { nodeType: 'ArrowFunctionExpression', represents: 'Arrow function', example: '() => {}' },
  { nodeType: 'JSXElement', represents: 'JSX tag', example: '<Btn />' },
  { nodeType: 'JSXAttribute', represents: 'JSX prop', example: 'color="red"' },
  { nodeType: 'TSTypeAnnotation', represents: 'TS type annotation', example: ': string' },
  { nodeType: 'ObjectExpression', represents: 'Object literal', example: '{ a: 1 }' },
  { nodeType: 'ArrayExpression', represents: 'Array literal', example: '[1, 2]' },
  { nodeType: 'TemplateLiteral', represents: 'Template string', example: '`hi ${name}`' },
]

// ── Builder Cheat Sheet ─────────────────────────────────────────────

export const JCS_BUILDERS: JcsBuilder[] = [
  { description: 'A variable name', call: "j.identifier('name')" },
  { description: 'A string', call: "j.stringLiteral('hello')" },
  { description: 'A number', call: 'j.numericLiteral(42)' },
  { description: 'A function call', call: 'j.callExpression(callee, [args])' },
  { description: 'An arrow function', call: 'j.arrowFunctionExpression([params], body)' },
  { description: 'An object', call: 'j.objectExpression([properties])' },
  { description: 'An object property', call: 'j.objectProperty(key, value)' },
  { description: 'An import', call: 'j.importDeclaration([specifiers], source)' },
  { description: 'A named import specifier', call: "j.importSpecifier(j.identifier('x'))" },
  { description: 'A default import', call: "j.importDefaultSpecifier(j.identifier('x'))" },
  { description: 'A const declaration', call: "j.variableDeclaration('const', [declarators])" },
  { description: 'A JSX element', call: 'j.jsxElement(opening, closing, children)' },
  { description: 'A spread element', call: "j.spreadElement(j.identifier('rest'))" },
]

// ── Ecosystem Links (display data) ──────────────────────────────────

export const JCS_ECOSYSTEM: JcsEcosystemLink[] = [
  { title: 'jscodeshift', url: 'https://github.com/facebook/jscodeshift', description: 'Main repo \u2014 CLI runner, collection API, TypeScript definitions.' },
  { title: 'AST Explorer', url: 'https://astexplorer.net', description: 'Interactive AST visualization with built-in jscodeshift transform sandbox.' },
  { title: 'recast', url: 'https://github.com/benjamn/recast', description: 'The parser/printer underneath. Preserves original formatting for untouched nodes.' },
  { title: 'ast-types', url: 'https://github.com/benjamn/ast-types', description: 'The AST type definitions. Defines the node types and builder signatures.' },
  { title: 'react-codemod', url: 'https://github.com/reactjs/react-codemod', description: 'Official React codemods \u2014 great examples of production transforms.' },
  { title: 'codemod.com', url: 'https://github.com/codemod-com/codemod', description: 'Community registry of codemods with a runner that supports jscodeshift transforms.' },
]

// ── AI Agent Scenarios ──────────────────────────────────────────────

export const JCS_AGENT_SCENARIOS: JcsAgentScenario[] = [
  { scenario: 'Rename across 5+ files', approach: 'jscodeshift', approachColor: 'blue', why: 'Deterministic, testable, catches all occurrences' },
  { scenario: 'Add a new component', approach: 'Direct edit', approachColor: 'green', why: 'Single-file creation, no pattern to match' },
  { scenario: 'API signature change in a library', approach: 'jscodeshift', approachColor: 'blue', why: 'Many call sites, structured pattern, edge cases' },
  { scenario: 'Fix a specific bug in one file', approach: 'Direct edit', approachColor: 'green', why: 'Unique context, not a repeating pattern' },
  { scenario: 'Migrate design system props', approach: 'jscodeshift', approachColor: 'blue', why: 'Hundreds of JSX usages, prop mapping is rule-based' },
  { scenario: 'Complex logic rewrite', approach: 'Hybrid', approachColor: 'amber', why: 'Codemod for structural changes, AI for logic decisions' },
]

// ── Testing Checklist Items ─────────────────────────────────────────

export const JCS_TESTING_CHECKS: string[] = [
  'Happy path \u2014 The transform correctly modifies matching code.',
  'No-op / no match \u2014 Files without matches are left untouched (returns undefined).',
  'Edge cases \u2014 Aliased imports, dynamic imports, re-exports, deeply nested nodes.',
  'TypeScript-specific \u2014 Type annotations, generics, type assertions, as const.',
  'Formatting preservation \u2014 Comments, blank lines, and indentation survive the transform.',
  'Idempotency \u2014 Running the transform twice produces the same result as running once.',
]

// ── Sections ────────────────────────────────────────────────────────

export const JCS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['jcs-start'] },
  { label: 'Fundamentals', ids: ['jcs-concepts', 'jcs-api'] },
  { label: 'Patterns', ids: ['jcs-transforms', 'jcs-recipes'] },
  { label: 'Workflow', ids: ['jcs-testing', 'jcs-maintenance'] },
  { label: 'Advanced', ids: ['jcs-ai-agents', 'jcs-reference'] },
]

// ── Start page data ─────────────────────────────────────────────────

export const JCS_START_PAGE_DATA: StartPageData = {
  subtitle: 'AST-based codemods for fearless refactoring at scale.',
  tip: 'Designed for engineers who need to automate large-scale code transformations \u2014 from simple renames to complex API migrations.',
  steps: [
    {
      type: 'bonus',
      title: 'Fundamentals',
      description: 'Understand what jscodeshift is, how ASTs work, and the core API for querying and mutating code.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        'jcs-concepts': 'What jscodeshift is, the transform pipeline, and core concepts like ASTs and Collections.',
        'jcs-api': 'The jQuery-like API for finding nodes, building new ones, and formatting output.',
      },
    },
    {
      type: 'bonus',
      title: 'Patterns',
      description: 'Learn to write transforms from simple renames to complex API migrations, with real-world recipes.',
      sectionLabel: 'Patterns',
      subItemDescriptions: {
        'jcs-transforms': 'Four transform patterns from beginner to expert with before/after examples.',
        'jcs-recipes': 'Production-tested recipes for deprecated API removal, class-to-function conversion, and more.',
      },
    },
    {
      type: 'bonus',
      title: 'Workflow',
      description: 'Test your codemods with fixtures, run them at scale, and roll out changes safely.',
      sectionLabel: 'Workflow',
      subItemDescriptions: {
        'jcs-testing': 'Fixture-based testing patterns and a testing checklist for shipping transforms with confidence.',
        'jcs-maintenance': 'CLI usage, rollout strategy, versioning, and common pitfalls.',
      },
    },
    {
      type: 'bonus',
      title: 'Advanced',
      description: 'Integrate codemods with AI agents and use the quick-reference tables.',
      sectionLabel: 'Advanced',
      subItemDescriptions: {
        'jcs-ai-agents': 'How AI coding agents can write and execute codemods, plus prompting strategies.',
        'jcs-reference': 'AST node types, builder cheat sheet, and ecosystem links.',
      },
    },
  ],
}

export const JCS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'jscodeshift',
    icon: '🔧',
    title: 'jscodeshift Codemods',
    startPageId: 'jcs-start',
    description: 'A toolkit for running codemods over JavaScript and TypeScript source code \u2014 automating large-scale refactors with AST-level precision.',
    category: 'ai-tooling',
    dateCreated: '2026-02-24',
    dateModified: '2026-02-26',
    sections: JCS_GUIDE_SECTIONS,
  },
  startPageData: JCS_START_PAGE_DATA,
}
