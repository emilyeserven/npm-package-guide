export interface GlossaryTerm {
  term: string
  definition: string
  url: string
  source: string
}

export interface GlossaryCategory {
  category: string
  terms: GlossaryTerm[]
}

export const glossaryTerms: GlossaryCategory[] = [
  {
    category: "Package Management",
    terms: [
      {
        term: "npm",
        definition: "Node Package Manager — the default package manager for Node.js. Provides a CLI for installing, publishing, and managing JavaScript packages, and hosts the npm registry.",
        url: "https://docs.npmjs.com/about-npm",
        source: "npm"
      },
      {
        term: "pnpm",
        definition: "A fast, disk-space-efficient alternative to npm. Uses a content-addressable store and symlinks to avoid duplicating packages across projects.",
        url: "https://pnpm.io/motivation",
        source: "pnpm"
      },
      {
        term: "Registry",
        definition: "A public (or private) database of JavaScript packages. The npm registry at npmjs.com is the largest, where packages are published and downloaded from.",
        url: "https://docs.npmjs.com/about-the-public-npm-registry",
        source: "npm"
      },
      {
        term: "Lockfile",
        definition: "A file (<code>package-lock.json</code> for npm, <code>pnpm-lock.yaml</code> for pnpm) that records the exact versions of every installed dependency, ensuring reproducible installs across machines.",
        url: "https://docs.npmjs.com/cli/configuring-npm/package-lock-json",
        source: "npm"
      },
      {
        term: "node_modules",
        definition: "The directory where installed packages are stored locally. Each project has its own <code>node_modules</code> folder (though pnpm uses symlinks to a shared store for efficiency).",
        url: "https://docs.npmjs.com/cli/configuring-npm/folders",
        source: "npm"
      },
      {
        term: "Scope",
        definition: "A namespace for npm packages, prefixed with <code>@</code> (e.g., <code>@myorg/my-package</code>). Scopes group related packages together and help avoid naming collisions.",
        url: "https://docs.npmjs.com/about-scopes",
        source: "npm"
      },
    ]
  },
  {
    category: "Dependencies",
    terms: [
      {
        term: "dependency",
        definition: "A package required at runtime by consumers of your package. Listed in <code>dependencies</code> in <code>package.json</code> and installed automatically when someone installs your package.",
        url: "https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file",
        source: "npm"
      },
      {
        term: "devDependency",
        definition: "A package only needed during development (e.g., testing frameworks, build tools, linters). Listed in <code>devDependencies</code> and not installed by consumers of your package.",
        url: "https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file",
        source: "npm"
      },
      {
        term: "Peer Dependency",
        definition: "A dependency your package expects the consumer to provide, rather than bundling it yourself. Common for plugins and UI component libraries (e.g., requiring React as a peer dependency).",
        url: "https://docs.npmjs.com/cli/configuring-npm/package-json#peerdependencies",
        source: "npm"
      },
      {
        term: "Semver",
        definition: "Semantic Versioning — a versioning scheme using <code>MAJOR.MINOR.PATCH</code>. Major = breaking changes, minor = new features (backward-compatible), patch = bug fixes.",
        url: "https://semver.org/",
        source: "semver.org"
      },
      {
        term: "Range Specifier",
        definition: "A syntax in <code>package.json</code> to allow flexible version matching. <code>^1.2.3</code> allows minor and patch updates; <code>~1.2.3</code> allows only patch updates.",
        url: "https://docs.npmjs.com/about-semantic-versioning",
        source: "npm"
      },
    ]
  },
  {
    category: "Build & Bundling",
    terms: [
      {
        term: "Bundler",
        definition: "A tool that combines multiple source files into optimized output files for distribution. Examples include Vite, webpack, Rollup, and esbuild.",
        url: "https://vite.dev/guide/why.html",
        source: "Vite"
      },
      {
        term: "Transpiler",
        definition: "A tool that converts source code from one language or version to another — e.g., TypeScript to JavaScript, or modern JS to older JS for browser compatibility. Babel and tsc are common transpilers.",
        url: "https://www.typescriptlang.org/docs/handbook/2/basic-types.html#tsc-the-typescript-compiler",
        source: "TypeScript"
      },
      {
        term: "Tree Shaking",
        definition: "A build optimization that removes unused code (dead code elimination). It relies on ES module <code>import</code>/<code>export</code> syntax to detect what's actually used.",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking",
        source: "MDN"
      },
      {
        term: "Minification",
        definition: "The process of removing whitespace, comments, and shortening variable names in production code to reduce file size without changing behavior.",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Minification",
        source: "MDN"
      },
      {
        term: "Source Map",
        definition: "A file that maps minified/bundled code back to the original source, enabling accurate debugging in browser dev tools. Usually a <code>.map</code> file alongside the output.",
        url: "https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map",
        source: "MDN"
      },
      {
        term: "ESM (ES Modules)",
        definition: "The official JavaScript module system using <code>import</code> and <code>export</code> syntax. The modern standard that enables tree shaking and static analysis.",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
        source: "MDN"
      },
      {
        term: "CJS (CommonJS)",
        definition: "The older module system used by Node.js, using <code>require()</code> and <code>module.exports</code>. Still widely used in Node.js but being gradually replaced by ESM.",
        url: "https://nodejs.org/docs/latest/api/modules.html",
        source: "Node.js"
      },
    ]
  },
  {
    category: "TypeScript",
    terms: [
      {
        term: "tsconfig.json",
        definition: "The TypeScript configuration file that controls compiler options — target output, module format, strictness level, which files to include, and more.",
        url: "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html",
        source: "TypeScript"
      },
      {
        term: "Declaration File (.d.ts)",
        definition: "A file containing only type information (no runtime code). Allows TypeScript users to get autocompletion and type checking when using your JavaScript package.",
        url: "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html",
        source: "TypeScript"
      },
      {
        term: "Strict Mode",
        definition: "A TypeScript compiler setting (<code>\"strict\": true</code>) that enables a set of stricter type-checking rules, catching more potential bugs at compile time.",
        url: "https://www.typescriptlang.org/tsconfig/#strict",
        source: "TypeScript"
      },
    ]
  },
  {
    category: "Package Configuration",
    terms: [
      {
        term: "package.json",
        definition: "The manifest file for any Node.js project or npm package. Declares the package name, version, dependencies, scripts, entry points, and metadata.",
        url: "https://docs.npmjs.com/cli/configuring-npm/package-json",
        source: "npm"
      },
      {
        term: "exports Field",
        definition: "A modern <code>package.json</code> field that defines the public entry points of your package. Allows conditional exports for ESM vs CJS, and controls which internal files consumers can import.",
        url: "https://nodejs.org/docs/latest/api/packages.html#exports",
        source: "Node.js"
      },
      {
        term: "main Field",
        definition: "The traditional <code>package.json</code> field specifying the primary entry point for your package (usually a CJS file). Being superseded by the <code>exports</code> field in modern packages.",
        url: "https://docs.npmjs.com/cli/configuring-npm/package-json#main",
        source: "npm"
      },
      {
        term: "dist (Distribution)",
        definition: "The compiled/built output of your package — the actual files that get published to npm and consumed by users. Typically contains JavaScript and declaration files, not source TypeScript.",
        url: "https://docs.npmjs.com/cli/configuring-npm/package-json#files",
        source: "npm"
      },
      {
        term: "files Field",
        definition: "A <code>package.json</code> field that specifies which files to include when publishing. Acts as an allowlist so only necessary files (like <code>dist/</code>) are included in the published package.",
        url: "https://docs.npmjs.com/cli/configuring-npm/package-json#files",
        source: "npm"
      },
    ]
  },
  {
    category: "Development Workflow",
    terms: [
      {
        term: "Linting",
        definition: "Static analysis of code to find problems — style violations, potential bugs, unused variables, etc. ESLint is the standard JavaScript/TypeScript linter.",
        url: "https://eslint.org/docs/latest/use/getting-started",
        source: "ESLint"
      },
      {
        term: "Monorepo",
        definition: "A single repository containing multiple related projects or packages. Tools like pnpm workspaces, Nx, or Turborepo help manage builds and dependencies across packages.",
        url: "https://pnpm.io/workspaces",
        source: "pnpm"
      },
      {
        term: "CI (Continuous Integration)",
        definition: "An automated process that runs tests, linting, and builds on every push or pull request. GitHub Actions is a common CI service for open-source packages.",
        url: "https://docs.github.com/en/actions/about-github-actions/understanding-github-actions",
        source: "GitHub"
      },
      {
        term: "Git Hook",
        definition: "A script that runs automatically at specific points in the Git workflow (e.g., before commit or before push). Tools like Husky make it easy to add hooks for linting or testing.",
        url: "https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks",
        source: "Git"
      },
      {
        term: "Storybook",
        definition: "A tool for developing and testing UI components in isolation, outside of your main application. Renders components with different props in a browsable catalog.",
        url: "https://storybook.js.org/docs/get-started",
        source: "Storybook"
      },
    ]
  },
]
