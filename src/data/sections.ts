import { cmd } from '../helpers/cmd'
import { fnRef } from '../helpers/fnRef'
import type { SectionLink } from '../helpers/renderFootnotes'

export interface Section {
  id: string
  title: string
  group?: string
  intro?: string
  customColumns?: boolean
  col1Label?: string
  col1Class?: string
  col1?: string[]
  col2Label?: string
  col2Class?: string
  col2?: string[]
  webapp?: string[]
  pkg?: string[]
  gotcha?: string
  explainerTitle?: string
  explainerBody?: string
  code?: boolean
  links?: SectionLink[]
}

export const sections: Section[] = [
  {
    id: "bigpicture",
    title: "\u{1F5FA}\uFE0F Big Picture",
    webapp: [
      "A web app is a complete, running application \u2014 like a website or dashboard that people open in their browser.",
      "You control everything: the server, the build tools, the framework, and how users interact with it.",
      "Think of it like deploying a backend service, except the output runs in the browser instead of on a server."
    ],
    pkg: [
      "An npm package" + fnRef(1) + " is a reusable library that other developers install into THEIR projects \u2014 like a pip package in Python or a gem in Ruby.",
      "You don't control how it's used. Someone might use it in React, Vue, plain JS, or even Node.js on a server.",
      "Think of it like writing a shared library or SDK \u2014 your job is to make it easy and reliable for other devs to use. See the npm packages guide" + fnRef(2) + " for more on how packages work, and the JavaScript modules overview" + fnRef(3) + " for how modern JS imports and exports function."
    ],
    links: [
      { label: "What is npm?", url: "https://docs.npmjs.com/about-npm", source: "npm" },
      { label: "Getting started with npm packages", url: "https://docs.npmjs.com/packages-and-modules", source: "npm" },
      { label: "JavaScript modules overview", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", source: "MDN" }
    ]
  },
  {
    id: "monorepo",
    title: "\u{1F3D7}\uFE0F Monorepo vs Monolith",
    group: "concepts",
    intro: "Before you write any code, you need to decide how your project will be structured at the repo level. In the JavaScript ecosystem, there are two main approaches: a monolith (one project, one package.json, everything in one place) and a monorepo (one Git repo containing multiple independent packages that can be built, tested, and published separately). This choice affects your tooling, your dependency management, and how you collaborate with other developers.",
    customColumns: true,
    col1Label: "\u{1F9F1} Monolith",
    col1Class: "col--monolith",
    col1: [
      "A monolith is one repo, one package.json, one build. Everything lives together in a single project with no internal boundaries.",
      "For web apps, this is usually the right call. Apps have one deploy target and one user \u2014 splitting into packages adds overhead without much benefit. Frameworks like Next.js and Remix are designed around this model.",
      "The risk: as a monolith grows, code becomes tangled. Shared utilities get imported from deep paths, there's no clear ownership, and refactoring gets scary. But for most apps, this tradeoff is worth the simplicity."
    ],
    col2Label: "\u{1F4E6} Monorepo",
    col2Class: "col--monorepo",
    col2: [
      "A monorepo is one Git repo containing multiple packages, each with its own package.json. They can depend on each other and be published independently \u2014 this is the recommended structure for npm packages.",
      "This is NOT a monolith. Each package has clear boundaries, its own API surface, its own tests. Think of it like microservices in one repo \u2014 the code is colocated for convenience, but the separation is real and enforced.",
      "For packages, monorepos improve modularity from the start. Instead of one giant package, you split into focused scoped packages (e.g., @myorg/utils, @myorg/components, @myorg/cli) that are easier to test, version, and maintain independently. Use pnpm workspaces" + fnRef(1) + " or npm workspaces" + fnRef(2) + " to manage them."
    ],
    gotcha: "\u26A0\uFE0F A monorepo is not a monolith! The whole point is improved modularity. Each package should have a single responsibility, its own tests, and a clean public API. If your packages are tightly coupled and can't be used independently, you've built a monolith with extra folders \u2014 not a real monorepo.",
    explainerTitle: "Monorepo vs monolith \u2014 a backend analogy",
    explainerBody: "Think of a monolith like a single Django or Spring Boot app \u2014 one codebase, everything coupled, hard to split later. A monorepo is more like having your API server, worker service, and shared library all in one Git repo, but each can be built, tested, and deployed independently. The repo is shared, but the boundaries between projects are real and enforced. This is why monorepos improve modularity \u2014 they force you to define clean interfaces between packages instead of letting everything bleed together. Tools like Turborepo" + fnRef(3) + " and Nx" + fnRef(4) + " make this practical by caching builds, running only affected tests, and parallelizing tasks. Lerna" + fnRef(5) + " (now maintained by Nx) coordinates version bumps and publishing across packages. pnpm is the preferred package manager for monorepos \u2014 its workspace support is faster and stricter than npm's, with better dependency isolation that prevents packages from accidentally importing things they haven't declared.",
    links: [
      { label: "pnpm Workspaces docs", url: "https://pnpm.io/workspaces", source: "pnpm" },
      { label: "npm Workspaces docs", url: "https://docs.npmjs.com/cli/v10/using-npm/workspaces", source: "npm" },
      { label: "Turborepo \u2014 Getting Started", url: "https://turbo.build/repo/docs", source: "Turborepo" },
      { label: "Nx \u2014 Getting Started", url: "https://nx.dev/getting-started/intro", source: "Nx" },
      { label: "Lerna \u2014 Modern monorepo management", url: "https://lerna.js.org/", source: "Lerna" }
    ]
  },
  {
    id: "npm-vs-pnpm",
    title: "\u{1F4E6} npm vs pnpm",
    group: "concepts",
    intro: "npm and pnpm are both package managers for JavaScript \u2014 they install dependencies, run scripts, and manage your project's node_modules. npm comes bundled with Node.js and is the default, while pnpm" + fnRef(1) + " is a faster, stricter alternative that's become the preferred choice for monorepos and large projects. You can switch between them on any project, but it's best to pick one early and stick with it.",
    customColumns: true,
    col1Label: "\u{1F4D7} npm",
    col1Class: "col--webapp",
    col1: [
      "npm (Node Package Manager) is the default \u2014 it ships with every Node.js installation, so there's nothing extra to install. If you're new to JavaScript, this is where you start.",
      "It uses a flat node_modules structure, which can lead to 'phantom dependencies' \u2014 your code can accidentally import packages you didn't explicitly install. This is rarely a problem for small projects.",
      "npm workspaces support monorepos, but the implementation is basic. For single-package repos and getting started, npm is the simplest choice with the most community examples. See the npm CLI docs" + fnRef(3) + " for the full command reference."
    ],
    col2Label: "\u{1F7E0} pnpm",
    col2Class: "col--pkg",
    col2: [
      "pnpm is a drop-in replacement for npm that's significantly faster (2-3x in benchmarks) and uses much less disk space by symlinking packages from a shared store instead of copying them.",
      "It uses a strict node_modules structure that prevents phantom dependencies \u2014 you can only import what you've explicitly declared. This catches real bugs that npm silently ignores.",
      "pnpm's workspace support is more mature and performant than npm's, which is why it's the recommended package manager for monorepos. Most major open-source projects (Vue, Vite, Turborepo) use pnpm. See the pnpm CLI docs" + fnRef(4) + " and the install guide" + fnRef(5) + " to get started."
    ],
    gotcha: "\u26A0\uFE0F Some older tutorials and boilerplates assume npm. If you see 'npm install', you can almost always substitute 'pnpm install' \u2014 the commands are nearly identical. The main gotcha: pnpm's strict dependency resolution means packages that rely on phantom dependencies may break. This is actually pnpm catching a real bug, not a pnpm issue. See the feature comparison" + fnRef(2) + " for a detailed breakdown.",
    explainerTitle: "npm vs pnpm \u2014 a backend analogy",
    explainerBody: "Think of npm like pip \u2014 it comes with the language runtime, it works, and everyone knows it. pnpm is more like Poetry for Python or Cargo for Rust \u2014 a more modern, opinionated tool that enforces best practices. The symlink-based store in pnpm is similar to how Docker layers share common base images instead of duplicating them \u2014 you save disk space and gain speed because shared packages only exist once on your machine. The strict dependency resolution is like having your imports validated at compile time rather than discovering missing dependencies at runtime.",
    links: [
      { label: "pnpm \u2014 Motivation", url: "https://pnpm.io/motivation", source: "pnpm" },
      { label: "pnpm vs npm \u2014 Feature Comparison", url: "https://pnpm.io/feature-comparison", source: "pnpm" },
      { label: "npm CLI docs", url: "https://docs.npmjs.com/cli/v10/commands", source: "npm" },
      { label: "pnpm CLI docs", url: "https://pnpm.io/cli/add", source: "pnpm" },
      { label: "Install pnpm", url: "https://pnpm.io/installation", source: "pnpm" }
    ]
  },
  {
    id: "tsconfig",
    title: "\u2699\uFE0F tsconfig.json",
    group: "concepts",
    intro: "Every TypeScript project has a <strong>tsconfig.json</strong>" + fnRef(1) + " file at its root \u2014 this is the configuration file that tells the TypeScript compiler how to process your code. It controls things like which JavaScript version to target, how strict the type checking should be, where to find source files, and where to put compiled output. Think of it like a Makefile or build.gradle for TypeScript \u2014 it defines the rules for how your code gets compiled. You'll rarely write one from scratch; most projects start from a template" + fnRef(3) + " and tweak a few settings.",
    customColumns: true,
    col1Label: "\u{1F527} Key Settings",
    col1Class: "col--webapp",
    col1: [
      "<strong>target</strong> \u2014 Which JavaScript version to compile to (e.g., ES2020, ES2022). Older targets = more compatibility, newer targets = smaller output. For packages, ES2020+ is a safe modern baseline.",
      "<strong>module / moduleResolution</strong>" + fnRef(4) + " \u2014 How imports and exports work. Use \"NodeNext\" for packages (supports both ESM and CJS) or \"ESNext\" for apps with a bundler.",
      "<strong>strict</strong> \u2014 Enables all strict type-checking options. Always set this to true \u2014 it catches real bugs and is expected by consumers of your package."
    ],
    col2Label: "\u{1F4C1} Paths & Output",
    col2Class: "col--pkg",
    col2: [
      "<strong>rootDir</strong> \u2014 Where your source code lives (usually \"./src\"). The compiler mirrors this structure in the output directory.",
      "<strong>outDir</strong> \u2014 Where compiled JavaScript goes (usually \"./dist\"). This is what gets published for packages.",
      "<strong>declaration</strong> \u2014 Set to true to generate .d.ts type declaration files alongside your JavaScript. Essential for packages \u2014 without this, consumers get no type information."
    ],
    gotcha: "\u26A0\uFE0F A common mistake is copying a tsconfig from a web app into a package project. App configs are optimized for bundlers (which handle module resolution themselves), while package configs need to produce standalone JavaScript that Node.js or other bundlers can consume directly. If your package works in your project but breaks when someone installs it, check your module and moduleResolution settings first.",
    explainerTitle: "tsconfig.json \u2014 a backend analogy",
    explainerBody: "tsconfig.json is like your compiler settings in a statically typed backend language. The 'target' option is similar to choosing a Java version in build.gradle \u2014 it determines which language features are available in your output. 'strict' mode is like enabling all compiler warnings and treating them as errors \u2014 more annoying during development, but it catches real bugs before they reach production. The 'paths' option works like import aliases in Python or module resolution rules in Webpack \u2014 it lets you write clean imports like '@myapp/utils' instead of '../../../utils'. For packages, the 'declaration' option is critical: it generates the TypeScript equivalent of header files (.h in C) or interface definitions, telling consumers exactly what types your functions accept and return.<br><br>\u{1F4CE} <strong>Related:</strong> tsconfig controls <em>how</em> TypeScript compiles your code, but your build tool (Vite, tsup, Rollup) controls <em>what</em> happens to the output \u2014 bundling, minification, and output formats. See the <button class='inline-nav-link' data-nav='build'>\u2699\uFE0F Build & Output</button> section for more.",
    links: [
      { label: "TSConfig Reference", url: "https://www.typescriptlang.org/tsconfig", source: "TypeScript" },
      { label: "What is a tsconfig.json?", url: "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html", source: "TypeScript" },
      { label: "Recommended TSConfig bases", url: "https://github.com/tsconfig/bases", source: "GitHub" },
      { label: "Module resolution \u2014 Node16 vs Bundler", url: "https://www.typescriptlang.org/docs/handbook/modules/theory.html", source: "TypeScript" }
    ]
  },
  {
    id: "build",
    title: "\u2699\uFE0F Build & Output",
    webapp: [
      "You use a 'bundler' to combine all your code into optimized files the browser can run. The two most common ones are Vite" + fnRef(1) + " (fast, modern, recommended for new projects) and Webpack" + fnRef(3) + " (older, very configurable, still widely used).",
      "The output is HTML, CSS, and JavaScript files deployed to a web server or CDN \u2014 similar to deploying a backend to a cloud provider.",
      "You only need to target browsers, so one output format is fine. Vite and Webpack handle all the optimization for you."
    ],
    pkg: [
      "You need to output your code in multiple formats because you don't know what system will consume it.",
      "ESM" + fnRef(5) + " (ES Modules) = modern 'import/export' syntax. CJS (CommonJS) = older 'require()' syntax used by Node.js.",
      "Common choices for packages: tsup" + fnRef(4) + " (easiest to start with), Rollup" + fnRef(6) + ", or unbuild. Vite" + fnRef(2) + " and Webpack can also be configured for library output, though tsup and Rollup are purpose-built for it and require less setup."
    ],
    gotcha: "\u26A0\uFE0F ESM vs CJS is like Python 2 vs 3 \u2014 two module systems that don't always play nice together. Always ship ESM at minimum. tsup can output both formats with one config.<br><br>\u{1F433} <strong>Docker note:</strong> Docker is primarily relevant to web apps, not npm packages. Apps are often containerized for deployment (Docker image \u2192 push to registry \u2192 deploy to cloud). Packages don't need Docker \u2014 they're published to npm, not deployed as running services. If you're coming from backend development where everything runs in Docker, know that in the JS ecosystem, Docker is for apps (and sometimes for CI environments), not for libraries.",
    explainerTitle: "What's a bundler?",
    explainerBody: "A bundler takes all your source files (JS, TS, CSS, images) and combines them into optimized output files. It's like a compiler for the frontend world \u2014 it resolves imports, removes dead code, and produces files ready for production. Vite is the current favorite for apps because it's extremely fast during development (using native ES modules) and produces optimized builds for production. Webpack is older but has a massive ecosystem of plugins. Both can be configured for library output too \u2014 Vite even has a dedicated 'library mode' \u2014 but tools like tsup and Rollup tend to require less config for that use case.<br><br>\u{1F4CE} <strong>Related:</strong> Your build tool works hand-in-hand with your <button class='inline-nav-link' data-nav='tsconfig'>\u2699\uFE0F tsconfig.json</button> \u2014 the TypeScript compiler configuration. To verify your build runs successfully in CI, see the <button class='inline-nav-link' data-nav='ci-build'>\u{1F528} Build Verification</button> section.",
    links: [
      { label: "Vite \u2014 Getting Started", url: "https://vite.dev/guide/", source: "Vite" },
      { label: "Vite \u2014 Library Mode", url: "https://vite.dev/guide/build.html#library-mode", source: "Vite" },
      { label: "Webpack \u2014 Getting Started", url: "https://webpack.js.org/guides/getting-started/", source: "Webpack" },
      { label: "tsup \u2014 Bundle TypeScript libraries", url: "https://tsup.egoist.dev/", source: "tsup" },
      { label: "ES Modules: import/export", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import", source: "MDN" },
      { label: "Rollup \u2014 Module bundler for libraries", url: "https://rollupjs.org/introduction/", source: "Rollup" }
    ]
  },
  {
    id: "dist",
    title: "\u{1F4C1} Folder Structure",
    group: "concepts",
    intro: "<h2 class='section-subheading' id='toc-overview'>Overview</h2>JavaScript projects follow a common folder convention you'll see almost everywhere:<ul><li><strong>src/</strong> \u2014 your source code: TypeScript, JSX, styles, and everything you write</li><li><strong>dist/</strong> (or <strong>build/</strong>, <strong>out/</strong>) \u2014 compiled output generated by your build tool</li><li><strong>node_modules/</strong> \u2014 installed dependencies (never commit this to Git)</li><li><strong>test/</strong> or <strong>__tests__/</strong> \u2014 test files</li><li><strong>.github/</strong> \u2014 CI workflows and GitHub configuration</li><li><strong>package.json</strong>, <strong>tsconfig.json</strong>, <strong>.eslintrc</strong> \u2014 config files at the project root</li></ul><pre class='code-block'>my-package/\n\u251C\u2500\u2500 .github/\n\u2502   \u2514\u2500\u2500 workflows/\n\u2502       \u2514\u2500\u2500 ci.yml\n\u251C\u2500\u2500 src/\n\u2502   \u251C\u2500\u2500 index.ts\n\u2502   \u251C\u2500\u2500 utils.ts\n\u2502   \u2514\u2500\u2500 components/\n\u2502       \u2514\u2500\u2500 Button.tsx\n\u251C\u2500\u2500 dist/                  # generated by build tool\n\u2502   \u251C\u2500\u2500 index.js\n\u2502   \u251C\u2500\u2500 index.d.ts\n\u2502   \u2514\u2500\u2500 utils.js\n\u251C\u2500\u2500 test/\n\u2502   \u2514\u2500\u2500 index.test.ts\n\u251C\u2500\u2500 node_modules/          # installed deps (git-ignored)\n\u251C\u2500\u2500 package.json\n\u251C\u2500\u2500 tsconfig.json\n\u2514\u2500\u2500 .eslintrc.js</pre>The distinction between <strong>src/</strong> and <strong>dist/</strong> becomes especially important when building npm packages \u2014 understanding what goes where is key to publishing correctly. See the Web App vs NPM Package sections for more on this.",
    customColumns: true,
    col1Label: "\u{1F4DD} src/ (source)",
    col1Class: "col--webapp",
    col1: [
      "src/ is where you write your code: TypeScript, JSX, SCSS, config files, tests \u2014 everything that makes up the development version of your project.",
      "This is YOUR workspace. It may contain syntax that browsers or Node.js can't run directly (like TypeScript or JSX), so it needs to be compiled before it can be used.",
      "Think of it like .java or .go source files \u2014 they need a compilation step before they're usable. src/ should never be published to npm."
    ],
    col2Label: "\u{1F4E6} dist/ (distributable)",
    col2Class: "col--pkg",
    col2: [
      "dist/ (short for 'distributable') contains the compiled, ready-to-use output of your package. This is what consumers actually run when they install your package.",
      "It's generated by your build tool (tsup, Rollup, Vite, etc.) and typically contains: compiled .js files (ESM and/or CJS), type declarations (.d.ts), and sometimes CSS.",
      "You publish ONLY dist/ to npm. It's the finished product \u2014 like shipping a compiled .jar instead of raw .java files, or a REST API instead of database schemas."
    ],
    gotcha: "\u26A0\uFE0F When publishing a package, only dist/ should go to npm \u2014 everything else (src/, tests, configs, node_modules) is part of your development workflow, not what consumers receive. If you accidentally publish src/, you're shipping uncompiled TypeScript that consumers can't use directly, plus bloating their node_modules with files they don't need. Always use the 'files' field" + fnRef(1) + " in package.json to whitelist only dist/. Use " + cmd("npm pack --dry-run", "pnpm pack --dry-run") + fnRef(2) + " to preview exactly what will be included.",
    explainerTitle: "Why not just ship the source code?",
    explainerBody: "Three reasons. First, consumers might not have your build tools \u2014 if your src/ uses TypeScript but they use plain JavaScript, they can't compile your code. Second, the compiled output is optimized: dead code is removed, modules are resolved, and the code is ready to run. Third, shipping src/ exposes internals you don't want people depending on \u2014 it's like giving someone access to your database schema when they only need a REST API. The dist/ folder is your package's public interface: clean, compiled, and intentional. As a fallback, you can also use .npmignore" + fnRef(3) + " to exclude files, though the 'files' whitelist approach is preferred.",
    links: [
      { label: '"files" field \u2014 control what you publish', url: "https://docs.npmjs.com/cli/v10/configuring-npm/package-json#files", source: "npm" },
      { label: "npm pack \u2014 preview published contents", url: "https://docs.npmjs.com/cli/v10/commands/npm-pack", source: "npm" },
      { label: ".npmignore docs", url: "https://docs.npmjs.com/cli/v10/using-npm/developers#keeping-files-out-of-your-package", source: "npm" }
    ]
  },
  {
    id: "deps",
    title: "\u{1F4E6} Dependencies",
    webapp: [
      "Install whatever packages you need \u2014 they all get bundled into your final app.",
      "The distinction between 'dependencies' and 'devDependencies' in package.json is mostly organizational. Everything gets bundled anyway.",
      "Bundle size matters for performance, but it's your call how to balance that."
    ],
    pkg: [
      "Every dependency you add becomes a dependency for EVERYONE who installs your package. Keep them minimal.",
      "There are 3 types that matter: 'dependencies'" + fnRef(1) + " (shipped with your package), 'devDependencies' (only for building/testing), and 'peerDependencies'" + fnRef(2) + " (the consumer must provide these).",
      "peerDependencies are crucial: if your package uses React, list React as a peerDependency so consumers use THEIR copy, not a second one."
    ],
    gotcha: "\u26A0\uFE0F Classic mistake: putting React in 'dependencies' instead of 'peerDependencies'. This installs a SECOND copy of React in the consumer's project, causing mysterious crashes. It's like having two different versions of a database driver loaded at once.",
    explainerTitle: "What's peerDependencies?",
    explainerBody: "Imagine you write a plugin for Express.js. You don't want to bundle your own copy of Express \u2014 you want to use whatever version the developer already has. That's what peerDependencies does. You're saying: 'I need this to work, but YOU provide it.' For frontend packages, React is the most common peerDependency.",
    links: [
      { label: "package.json dependencies", url: "https://docs.npmjs.com/cli/v10/configuring-npm/package-json#dependencies", source: "npm" },
      { label: "peerDependencies explained", url: "https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies", source: "npm" },
      { label: "npm install docs", url: "https://docs.npmjs.com/cli/v10/commands/npm-install", source: "npm" },
      { label: "pnpm install docs", url: "https://pnpm.io/cli/install", source: "pnpm" }
    ]
  },
  {
    id: "typescript",
    title: "\u{1F537} TypeScript & Types",
    intro: "TypeScript is a superset of JavaScript that adds static type annotations \u2014 like adding type hints to Python, or going from a dynamic language to a compiled one. You write code with types (function greet(name: string): string), and the TypeScript compiler checks for mistakes before your code ever runs. It catches bugs like calling a function with the wrong argument type, accessing a property that doesn't exist, or returning the wrong type. Almost all modern JavaScript projects use TypeScript, and npm packages are expected to ship type information.",
    webapp: [
      "Your types only matter to your own team. Nobody outside your project sees them.",
      "Your tsconfig.json" + fnRef(3) + " (TypeScript config) is tuned for your specific app and bundler.",
      "Type errors are caught during development \u2014 they don't affect your deployed app since TypeScript compiles away to plain JavaScript."
    ],
    pkg: [
      "You MUST ship type declaration files" + fnRef(1) + " (.d.ts) alongside your JavaScript. These tell consumers what types your functions accept and return.",
      "Your types ARE your public API contract. If a function signature changes, that's a breaking change. See the publishing guide" + fnRef(2) + " for how to ship them correctly.",
      "Tools like tsup auto-generate .d.ts files from your TypeScript source. Without them, consumers get no autocomplete or type checking."
    ],
    gotcha: "\u26A0\uFE0F Forgetting to ship .d.ts files is the #1 complaint about npm packages. It's like publishing a REST API with no documentation \u2014 technically usable, but painful.",
    explainerTitle: "What are .d.ts files?",
    explainerBody: "Declaration files (.d.ts) are like header files in C or interface definitions in Java/Go. They describe the shape of your code \u2014 function signatures, types, exported classes \u2014 without the actual implementation. They let TypeScript users get autocomplete, type checking, and inline docs when using your package.",
    links: [
      { label: "TypeScript declaration files", url: "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html", source: "TypeScript" },
      { label: "Publishing types with your package", url: "https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html", source: "TypeScript" },
      { label: "tsconfig.json reference", url: "https://www.typescriptlang.org/tsconfig/", source: "TypeScript" }
    ]
  },
  {
    id: "packagejson",
    title: "\u{1F4CB} package.json",
    webapp: [
      "package.json mainly tracks your dependencies and scripts (like '" + cmd("npm run dev", "pnpm dev") + "' or '" + cmd("npm run build", "pnpm build") + "').",
      "Fields like 'main' and 'exports' don't really matter because your entry point is an HTML file.",
      "It's similar to a requirements.txt + Makefile combined into one file."
    ],
    pkg: [
      "package.json" + fnRef(1) + " is your package's configuration AND public API definition. It tells npm and bundlers where to find your code.",
      "The 'exports'" + fnRef(2) + " field maps import paths to actual files \u2014 it controls what consumers can import.",
      "The 'files'" + fnRef(3) + " field controls what gets uploaded to npm. Only include your 'dist' folder \u2014 don't publish source code, tests, or configs."
    ],
    explainerTitle: "Why 'exports' instead of just 'main'?",
    explainerBody: "The 'main' field is the old way \u2014 it points to a single entry file. The 'exports' field is the modern replacement. It lets you define different entry points for different contexts (ESM vs CJS, types vs runtime) and create subpath imports. Think of it like routing in a web framework \u2014 mapping import paths to actual files. See the Node.js Packages docs" + fnRef(4) + " for the full specification.",
    code: true,
    links: [
      { label: "package.json full reference", url: "https://docs.npmjs.com/cli/v10/configuring-npm/package-json", source: "npm" },
      { label: "Node.js package exports", url: "https://nodejs.org/api/packages.html#package-entry-points", source: "Node.js" },
      { label: '"files" field', url: "https://docs.npmjs.com/cli/v10/configuring-npm/package-json#files", source: "npm" },
      { label: "Modules: Packages", url: "https://nodejs.org/api/packages.html", source: "Node.js" }
    ]
  },
  {
    id: "versioning",
    title: "\u{1F3F7}\uFE0F Versioning",
    webapp: [
      "You deploy continuously \u2014 users always get the latest version automatically.",
      "If you ship a bug, you can hotfix and redeploy in minutes.",
      "Version numbers exist but are mostly internal \u2014 users never see them."
    ],
    pkg: [
      "You follow 'semver'" + fnRef(1) + " (semantic versioning): MAJOR.MINOR.PATCH \u2014 e.g., 2.1.3.",
      "Published versions are essentially permanent. Consumers pin versions, so a bug might live in their project for months.",
      "In a CI pipeline, tools like changesets" + fnRef(3) + " or semantic-release" + fnRef(4) + " can automate version bumps. They analyze your commit messages (e.g., 'feat:' \u2192 minor, 'fix:' \u2192 patch, 'BREAKING CHANGE:' \u2192 major), generate changelogs, and publish to npm \u2014 all triggered by merging a PR."
    ],
    gotcha: "\u26A0\uFE0F Semver trust is everything. MAJOR = breaking changes, MINOR = new features, PATCH = bug fixes. If you accidentally break something in a minor release, developers lose trust fast \u2014 it's like changing a REST API response shape without bumping the API version. CI automation helps prevent human error here. Use the npm semver calculator" + fnRef(2) + " to understand version ranges.",
    explainerTitle: "What's semver and how does CI help?",
    explainerBody: "Semantic Versioning (semver) is a contract with your users. Given version MAJOR.MINOR.PATCH: bump MAJOR when you make incompatible API changes (like renaming a function), bump MINOR when you add functionality in a backward-compatible way, and bump PATCH for backward-compatible bug fixes. When someone installs '^2.1.0', they trust that any 2.x.x update won't break their code. In practice, most teams automate this with CI. A tool like 'changesets' lets developers declare version intent in their PRs, then a CI pipeline (GitHub Actions, etc.) handles the actual version bump, changelog generation, and npm publish when PRs are merged. 'semantic-release' takes a different approach \u2014 it reads Conventional Commit" + fnRef(5) + " messages to determine the version automatically. Either way, CI removes the human error of forgetting to bump or mis-categorizing a change.",
    links: [
      { label: "Semantic Versioning spec", url: "https://semver.org/", source: "semver" },
      { label: "npm semver calculator", url: "https://semver.npmjs.com/", source: "npm" },
      { label: "changesets \u2014 version management for monorepos", url: "https://github.com/changesets/changesets", source: "GitHub" },
      { label: "semantic-release \u2014 automated versioning", url: "https://semantic-release.gitbook.io/semantic-release", source: "Docs" },
      { label: "Conventional Commits spec", url: "https://www.conventionalcommits.org/", source: "Docs" }
    ]
  },
  {
    id: "workflow",
    title: "\u{1F504} Dev Workflow",
    webapp: [
      "Write code \u2192 see changes instantly in the browser (hot reload)",
      "Test locally \u2192 push to Git \u2192 CI/CD deploys to production",
      "Users see changes immediately after deploy"
    ],
    pkg: [
      "Write code \u2192 test locally with " + cmd("npm link", "pnpm link") + fnRef(1) + fnRef(2) + " (symlinks your package into a test project)",
      "Build \u2192 test \u2192 bump version \u2192 run " + cmd("npm publish", "pnpm publish") + fnRef(6) + " to push to the npm registry",
      "Consumers update when they choose to: " + cmd("npm update", "pnpm update") + " or changing their package.json. See the full publishing guide" + fnRef(5) + " for the complete workflow."
    ],
    gotcha: "\u26A0\uFE0F Always run " + cmd("npm pack --dry-run", "pnpm pack --dry-run") + fnRef(3) + fnRef(4) + " before publishing! This shows you exactly what files will be included. It's like doing a dry-run deployment \u2014 catch mistakes before they're live.",
    explainerTitle: "What's " + cmd("npm link", "pnpm link") + "?",
    explainerBody: cmd("npm link", "pnpm link") + " creates a symbolic link from a test project to your local package source. Instead of publishing every time you make a change, you can test your package locally in a real project. It's like mounting a local directory as a volume in Docker \u2014 the test project uses your live source code.",
    links: [
      { label: "npm link docs", url: "https://docs.npmjs.com/cli/v10/commands/npm-link", source: "npm" },
      { label: "pnpm link docs", url: "https://pnpm.io/cli/link", source: "pnpm" },
      { label: "npm pack docs", url: "https://docs.npmjs.com/cli/v10/commands/npm-pack", source: "npm" },
      { label: "pnpm pack docs", url: "https://pnpm.io/cli/pack", source: "pnpm" },
      { label: "Creating and publishing a package", url: "https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages", source: "npm" },
      { label: "pnpm publish docs", url: "https://pnpm.io/cli/publish", source: "pnpm" }
    ]
  }
]
