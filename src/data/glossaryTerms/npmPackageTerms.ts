import type { GlossaryCategory } from './index'

export const npmPackageGlossary: GlossaryCategory[] = [
  {
    category: "Package Management",
    terms: [
      {
        term: "npm",
        definition: "Node Package Manager — the default package manager for Node.js. Provides a CLI for installing, publishing, and managing JavaScript packages, and hosts the npm registry.",
        linkId: "npm-about",
        sectionId: "npm-vs-pnpm"
      },
      {
        term: "pnpm",
        definition: "A fast, disk-space-efficient alternative to npm. Uses a content-addressable store and symlinks to avoid duplicating packages across projects.",
        linkId: "pnpm-motivation",
        sectionId: "npm-vs-pnpm"
      },
      {
        term: "Registry",
        definition: "A public (or private) database of JavaScript packages. The npm registry at npmjs.com is the largest, where packages are published and downloaded from.",
        linkId: "npm-public-registry",
        sectionId: "npm-vs-pnpm"
      },
      {
        term: "Lockfile",
        definition: "A file (<code>package-lock.json</code> for npm, <code>pnpm-lock.yaml</code> for pnpm) that records the exact versions of every installed dependency, ensuring reproducible installs across machines.",
        linkId: "npm-package-lock",
        sectionId: "npm-vs-pnpm"
      },
      {
        term: "node_modules",
        definition: "The directory where installed packages are stored locally. Each project has its own <code>node_modules</code> folder (though pnpm uses symlinks to a shared store for efficiency).",
        linkId: "npm-folders",
        sectionId: "npm-vs-pnpm"
      },
      {
        term: "Scope",
        definition: "A namespace for npm packages, prefixed with <code>@</code> (e.g., <code>@myorg/my-package</code>). Scopes group related packages together and help avoid naming collisions.",
        linkId: "npm-scopes",
        sectionId: "packagejson"
      },
    ]
  },
  {
    category: "Dependencies",
    terms: [
      {
        term: "dependency",
        definition: "A package required at runtime by consumers of your package. Listed in <code>dependencies</code> in <code>package.json</code> and installed automatically when someone installs your package.",
        linkId: "npm-specifying-deps",
        sectionId: "deps"
      },
      {
        term: "devDependency",
        definition: "A package only needed during development (e.g., testing frameworks, build tools, linters). Listed in <code>devDependencies</code> and not installed by consumers of your package.",
        linkId: "npm-specifying-deps",
        sectionId: "deps"
      },
      {
        term: "Peer Dependency",
        definition: "A dependency your package expects the consumer to provide, rather than bundling it yourself. Common for plugins and UI component libraries (e.g., requiring React as a peer dependency).",
        linkId: "npm-package-json-peerdeps",
        sectionId: "deps"
      },
      {
        term: "Semver",
        definition: "Semantic Versioning — a versioning scheme using <code>MAJOR.MINOR.PATCH</code>. Major = breaking changes, minor = new features (backward-compatible), patch = bug fixes.",
        linkId: "semver-spec",
        linkIds: ['npm-about-semver'],
        sectionId: "versioning",
        guides: ['npm-package', 'ci-cd'],
      },
      {
        term: "Range Specifier",
        definition: "A syntax in <code>package.json</code> to allow flexible version matching. <code>^1.2.3</code> allows minor and patch updates; <code>~1.2.3</code> allows only patch updates.",
        linkId: "npm-about-semver",
        sectionId: "versioning"
      },
    ]
  },
  {
    category: "Build & Bundling",
    terms: [
      {
        term: "Bundler",
        definition: "A tool that combines multiple source files into optimized output files for distribution. Examples include Vite, webpack, Rollup, and esbuild.",
        linkId: "vite-why",
        linkIds: ['webpack-getting-started', 'rollup-intro'],
        sectionId: "build",
        guides: ['npm-package', 'architecture'],
      },
      {
        term: "Transpiler",
        definition: "A tool that converts source code from one language or version to another — e.g., TypeScript to JavaScript, or modern JS to older JS for browser compatibility. Babel and tsc are common transpilers.",
        linkId: "ts-tsc-compiler",
        sectionId: "build"
      },
      {
        term: "Tree Shaking",
        definition: "A build optimization that removes unused code (dead code elimination). It relies on ES module <code>import</code>/<code>export</code> syntax to detect what's actually used.",
        linkId: "mdn-tree-shaking",
        sectionId: "build",
        guides: ['npm-package', 'architecture'],
      },
      {
        term: "Minification",
        definition: "The process of removing whitespace, comments, and shortening variable names in production code to reduce file size without changing behavior.",
        linkId: "mdn-minification",
        sectionId: "build"
      },
      {
        term: "Source Map",
        definition: "A file that maps minified/bundled code back to the original source, enabling accurate debugging in browser dev tools. Usually a <code>.map</code> file alongside the output.",
        linkId: "mdn-source-map",
        sectionId: "build"
      },
      {
        term: "Hot Module Replacement (HMR)",
        definition: "A development feature that updates modules in the browser instantly when you save a file, without a full page reload. Preserves application state during development. Vite's HMR is especially fast because it uses native ES modules.",
        linkId: "vite-hmr",
        sectionId: "build"
      },
      {
        term: "Code Splitting",
        definition: "A build optimization that breaks your application bundle into smaller chunks loaded on demand. Reduces the initial download size by only loading code for the current page or feature.",
        linkId: "webpack-code-splitting",
        linkIds: ['vite-why'],
        sectionId: "build",
        sectionIds: ['nja-build-bundling'],
        guides: ['npm-package', 'architecture', 'nextjs-abstractions'],
      },
      {
        term: "ESM (ES Modules)",
        definition: "The official JavaScript module system using <code>import</code> and <code>export</code> syntax. The modern standard that enables tree shaking and static analysis.",
        linkId: "mdn-js-modules",
        sectionId: "build",
        guides: ['npm-package', 'architecture'],
      },
      {
        term: "CJS (CommonJS)",
        definition: "The older module system used by Node.js, using <code>require()</code> and <code>module.exports</code>. Still widely used in Node.js but being gradually replaced by ESM.",
        linkId: "nodejs-commonjs",
        sectionId: "build",
        guides: ['npm-package', 'architecture'],
      },
    ]
  },
  {
    category: "TypeScript",
    terms: [
      {
        term: "tsconfig.json",
        definition: "The TypeScript configuration file that controls compiler options — target output, module format, strictness level, which files to include, and more.",
        linkId: "ts-what-is-tsconfig",
        sectionId: "tsconfig"
      },
      {
        term: "Declaration File (.d.ts)",
        definition: "A file containing only type information (no runtime code). Allows TypeScript users to get autocompletion and type checking when using your JavaScript package.",
        linkId: "ts-declaration-files-intro",
        sectionId: "typescript"
      },
      {
        term: "Strict Mode",
        definition: "A TypeScript compiler setting (<code>\"strict\": true</code>) that enables a set of stricter type-checking rules, catching more potential bugs at compile time.",
        linkId: "ts-strict",
        sectionId: "tsconfig"
      },
    ]
  },
  {
    category: "Package Configuration",
    terms: [
      {
        term: "package.json",
        definition: "The manifest file for any Node.js project or npm package. Declares the package name, version, dependencies, scripts, entry points, and metadata.",
        linkId: "npm-package-json",
        sectionId: "packagejson"
      },
      {
        term: "exports Field",
        definition: "A modern <code>package.json</code> field that defines the public entry points of your package. Allows conditional exports for ESM vs CJS, and controls which internal files consumers can import.",
        linkId: "nodejs-package-exports",
        sectionId: "packagejson"
      },
      {
        term: "main Field",
        definition: "The traditional <code>package.json</code> field specifying the primary entry point for your package (usually a CJS file). Being superseded by the <code>exports</code> field in modern packages.",
        linkId: "npm-package-json-main",
        sectionId: "packagejson"
      },
      {
        term: "dist (Distribution)",
        definition: "The compiled/built output of your package — the actual files that get published to npm and consumed by users. Typically contains JavaScript and declaration files, not source TypeScript.",
        linkId: "npm-package-json-files",
        sectionId: "dist"
      },
      {
        term: "files Field",
        definition: "A <code>package.json</code> field that specifies which files to include when publishing. Acts as an allowlist so only necessary files (like <code>dist/</code>) are included in the published package.",
        linkId: "npm-package-json-files",
        sectionId: "dist"
      },
    ]
  },
  {
    category: "Development Workflow",
    terms: [
      {
        term: "Linting",
        definition: "Static analysis of code to find problems — style violations, potential bugs, unused variables, etc. ESLint is the standard JavaScript/TypeScript linter.",
        linkId: "eslint-getting-started",
        linkIds: ['prettier-install'],
        sectionId: "ci-linting",
        guides: ['npm-package', 'ci-cd'],
      },
      {
        term: "Monorepo",
        definition: "A single repository containing multiple related projects or packages. Tools like pnpm workspaces, Nx, or Turborepo help manage builds and dependencies across packages.",
        linkId: "pnpm-workspaces",
        linkIds: ['turborepo', 'nx'],
        sectionId: "monorepo",
        guides: ['npm-package', 'architecture'],
      },
      {
        term: "CI (Continuous Integration)",
        definition: "An automated process that runs tests, linting, and builds on every push or pull request. GitHub Actions is a common CI service for open-source packages.",
        linkId: "gh-actions-understanding",
        linkIds: ['github-actions-docs'],
        sectionId: "ci-overview",
        sectionIds: ['cicd-big-picture'],
        guides: ['npm-package', 'ci-cd'],
      },
      {
        term: "Git Hook",
        definition: "A script that runs automatically at specific points in the Git workflow (e.g., before commit or before push). Tools like Husky make it easy to add hooks for linting or testing.",
        linkId: "git-hooks",
        sectionId: "workflow",
        guides: ['npm-package', 'ci-cd'],
      },
      {
        term: "Storybook",
        definition: "A tool for developing and testing UI components in isolation, outside of your main application. Renders components with different props in a browsable catalog.",
        linkId: "storybook-getting-started",
        sectionId: "storybook"
      },
    ]
  },
]
