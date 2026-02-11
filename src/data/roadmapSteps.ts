import { cmd } from '../helpers/cmd'

export interface RoadmapStep {
  num: number
  title: string
  desc: string
  detail: string
  jumpTo: string | null
  substep?: {
    title: string
    text: string
    jumpTo: string
  }
}

export const roadmapSteps: RoadmapStep[] = [
  {
    num: 1,
    title: "Decide: app or package?",
    desc: "Before writing any code, be clear about what you're building. An app is a complete product users interact with. A package is a tool other developers install.",
    detail: "This affects every decision that follows — your build tool, how you handle dependencies, what you publish, and how you version releases.",
    jumpTo: "bigpicture"
  },
  {
    num: 2,
    title: "Choose your repo structure",
    desc: "Consider starting with a monorepo — even for a single package. A monorepo structure encourages modularity and makes it easy to add more packages later without reorganizing everything.",
    detail: "A monorepo uses workspaces to host multiple packages in one Git repo, each with its own package.json. pnpm is the preferred package manager for monorepos — its workspace support is faster and stricter than npm's. Tools like Turborepo or Nx layer on top to handle smart builds and caching. Even if you start with one package, the monorepo structure scales cleanly as the project grows.",
    jumpTo: "monorepo"
  },
  {
    num: 3,
    title: "Initialize your project",
    desc: "Run " + cmd("npm init", "pnpm init") + " to create your package.json. For a package, pay special attention to the <code>name</code>, <code>type</code>, and <code>description</code> fields right away.",
    detail: "Set <code>\"type\": \"module\"</code> for ESM. Choose a scoped name (<code>@yourorg/package-name</code>) to avoid naming collisions on npm. For an app, the defaults are usually fine.",
    jumpTo: null
  },
  {
    num: 4,
    title: "Set up your build tooling",
    desc: "For apps: use Vite or Webpack. For packages: use tsup, Rollup, or Vite in library mode. Configure your tool to output the formats you need.",
    detail: "Packages should output ESM at minimum (and optionally CJS). Apps just need browser-optimized bundles. Your build tool compiles src/ into dist/.",
    jumpTo: "build",
    substep: {
      title: "Configure your tsconfig.json",
      text: "The TypeScript compiler settings that control how your code gets compiled.",
      jumpTo: "tsconfig"
    }
  },
  {
    num: 5,
    title: "Write your source code in src/",
    desc: "Write TypeScript/JavaScript in your src/ directory. For packages, think carefully about your public API — what functions and types will you export?",
    detail: "Your src/index.ts is the main entry point. For packages, only export what consumers need. Everything else stays internal. For apps, structure however your framework suggests.",
    jumpTo: null
  },
  {
    num: 6,
    title: "Configure your dependencies correctly",
    desc: "For packages: use <code>peerDependencies</code> for frameworks (React, Vue), minimize regular <code>dependencies</code>, and keep build tools in <code>devDependencies</code>.",
    detail: "Getting this wrong is one of the most common package mistakes. If your package uses React, it MUST be a peerDependency — never a regular dependency.",
    jumpTo: "deps"
  },
  {
    num: 7,
    title: "Build → verify dist/ output",
    desc: "Run your build command. Check that dist/ contains compiled .js files, .d.ts type declarations, and nothing else unnecessary.",
    detail: "The dist/ folder is what consumers actually use. Run " + cmd("npm pack --dry-run", "pnpm pack --dry-run") + " to preview exactly what will be published. If you see src/, tests, or config files — fix your <code>files</code> field.",
    jumpTo: "dist"
  },
  {
    num: 8,
    title: "Configure package.json exports & files",
    desc: "For packages: set up the <code>exports</code> map to point to your dist/ files, and use the <code>files</code> field to whitelist only dist/.",
    detail: "The <code>exports</code> field is your package's public API surface. It maps import paths to compiled files and tells bundlers where to find ESM, CJS, and type declarations.",
    jumpTo: "packagejson"
  },
  {
    num: 9,
    title: "Set up TypeScript declarations",
    desc: "For packages: ensure your build generates .d.ts files and that package.json points to them via the <code>types</code> field.",
    detail: "Without .d.ts files, TypeScript users get no autocomplete or type safety. Tools like tsup do this automatically. Verify by checking that dist/ contains .d.ts files after building.",
    jumpTo: "typescript"
  },
  {
    num: 10,
    title: "Write tests against your public API",
    desc: "For apps: test user flows and UI behavior. For packages: test every exported function with normal inputs, edge cases, and error scenarios.",
    detail: "Package tests should import from your built output (or at least your public exports), not internal files. This catches issues consumers would actually hit.",
    jumpTo: "ci-overview"
  },
  {
    num: 11,
    title: "Set up versioning",
    desc: "For packages: choose a versioning strategy. Manual semver bumps work for small packages. For teams, set up changesets or semantic-release to automate version bumps based on commit messages.",
    detail: "Semver (MAJOR.MINOR.PATCH) is the contract between you and your consumers. Get it wrong and you'll break people's builds. Tools like changesets and semantic-release integrate with CI to automate the process.",
    jumpTo: "versioning"
  },
  {
    num: 12,
    title: "Test locally with " + cmd("npm link", "pnpm link"),
    desc: "Before publishing, test your package in a real project using " + cmd("npm link", "pnpm link") + ". This symlinks your local package into a test app so you can verify it works end-to-end.",
    detail: "Create a simple test app, run " + cmd("npm link ../your-package", "pnpm link ../your-package") + ", then try importing and using your package. Does it resolve? Do types work? Does tree-shaking work?",
    jumpTo: "workflow"
  },
  {
    num: 13,
    title: "Run the publish checklist & ship it",
    desc: "Go through the publish checklist, run " + cmd("npm pack --dry-run", "pnpm pack --dry-run") + " one final time, then " + cmd("npm publish", "pnpm publish") + ". Congratulations — you're a package author!",
    detail: "After publishing, install your own package in a fresh project to verify everything works. Check that types resolve, imports work, and the bundle size is reasonable.",
    jumpTo: "checklist"
  }
]
