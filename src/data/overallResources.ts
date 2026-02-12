export interface ResourceItem {
  name: string
  url: string
  desc: string
  tags: string[]
}

export interface ResourceGroup {
  category: string
  items: ResourceItem[]
}

export const overallResources: ResourceGroup[] = [
  {
    category: "Official Documentation",
    items: [
      { name: "npm Docs — Getting Started", url: "https://docs.npmjs.com/getting-started", desc: "Official npm setup and publishing guide — the starting point for creating and distributing packages", tags: ["docs", "free", "publishing"] },
      { name: "pnpm Documentation", url: "https://pnpm.io/motivation", desc: "Alternative package manager with strict dependency isolation, commonly used for monorepo package development", tags: ["docs", "free", "tooling"] },
      { name: "Node.js — Packages Documentation", url: "https://nodejs.org/api/packages.html", desc: "How Node.js resolves package exports and entry points — essential for configuring package.json correctly", tags: ["docs", "free", "modules"] },
      { name: "MDN — JavaScript Modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", desc: "ESM import/export syntax that npm packages use for tree-shakeable module distribution", tags: ["docs", "free", "modules"] },
      { name: "TypeScript — Publishing Declaration Files", url: "https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html", desc: "How to ship .d.ts type declarations so consumers get autocomplete and type checking from your package", tags: ["docs", "free", "typescript"] },
      { name: "Semantic Versioning Specification", url: "https://semver.org/", desc: "The versioning contract every npm package follows — defines how version numbers communicate breaking changes", tags: ["docs", "free", "versioning"] },
    ]
  },
  {
    category: "Articles & Tutorials",
    items: [
      { name: "Best Practices for Creating a Modern npm Package (Snyk)", url: "https://snyk.io/blog/best-practices-create-modern-npm-package/", desc: "End-to-end walkthrough covering TypeScript setup, CI/CD pipelines, security, and automated releases", tags: ["article", "free", "publishing", "ci-cd"] },
      { name: "Building and Publishing TypeScript NPM Packages", url: "https://akashrajpurohit.com/blog/building-and-publishing-typescript-npm-packages-a-stepbystep-guide/", desc: "Step-by-step guide using tsup, vitest, and semantic-release to build and publish a TypeScript package", tags: ["article", "free", "publishing", "typescript"] },
      { name: "How to Create an NPM Package in TypeScript (Atomic Object)", url: "https://spin.atomicobject.com/npm-package-typescript/", desc: "Ground-up tutorial building a minimal importable TypeScript module from scratch", tags: ["article", "free", "publishing", "typescript"] },
      { name: "Conventional Commits", url: "https://www.conventionalcommits.org/", desc: "Commit message standard that enables automated version bumps and changelog generation for packages", tags: ["docs", "free", "versioning"] },
    ]
  },
  {
    category: "Free Courses & Interactive Learning",
    items: [
      { name: "Publish JavaScript Packages on npm (egghead.io)", url: "https://egghead.io/courses/publish-javascript-packages-on-npm", desc: "Hands-on video course covering package creation, testing, publishing, and update workflows on npm", tags: ["course", "free", "video", "publishing"] },
      { name: "How to Write an Open Source JavaScript Library (egghead.io)", url: "https://egghead.io/courses/how-to-write-an-open-source-javascript-library", desc: "Covers GitHub setup, npm publishing, semantic-release, and CI automation for open-source packages", tags: ["course", "free", "video", "publishing", "ci-cd"] },
      { name: "NodeSchool Workshops", url: "https://nodeschool.io/", desc: "Terminal-based tutorials for Node.js and npm fundamentals — builds the foundation for package development", tags: ["interactive", "free"] },
      { name: "Learn NPM — codedamn", url: "https://codedamn.com/learn/npm-basics", desc: "Browser-based interactive exercises covering npm basics like installing, updating, and managing packages", tags: ["interactive", "free"] },
    ]
  },
  {
    category: "Paid Courses",
    items: [
      { name: "Creating NPM Packages: The Complete Guide (Udemy)", url: "https://www.udemy.com/course/creating-npm-packages-the-complete-guide/", desc: "Comprehensive course covering tree-shaking, CI automation, pre-release versions, and TypeScript package setup", tags: ["course", "paid", "video", "publishing", "typescript"] },
      { name: "NPM Mastery: Package Management & Publishing (Udemy)", url: "https://www.udemy.com/course/npm-mastery-nodejs-package-management-publishing/", desc: "Bootcamp-style course from package basics to publishing, with a capstone CLI project", tags: ["course", "paid", "video", "publishing"] },
      { name: "Understanding NPM (Udemy)", url: "https://www.udemy.com/course/understanding-npm/", desc: "Deep dive into npm internals — scripts, bins, semver, and lock files relevant to package authoring", tags: ["course", "paid", "video"] },
    ]
  },
  {
    category: "Starter Templates & Tools",
    items: [
      { name: "npm Package Boilerplate 2025", url: "https://github.com/simonorzel26/npm-package-boilerplate-2025", desc: "Opinionated starter template with pnpm, TypeScript, dual ESM+CJS output, and automated releases", tags: ["repo", "free", "publishing", "typescript"] },
      { name: "tsup — Bundle TypeScript Libraries", url: "https://tsup.egoist.dev/", desc: "Zero-config TypeScript bundler producing ESM and CJS outputs — the most popular choice for package builds", tags: ["docs", "free", "tooling", "bundling"] },
      { name: "changesets — Version Management", url: "https://github.com/changesets/changesets", desc: "Manages versioning and changelogs across packages, especially useful in monorepo setups", tags: ["repo", "free", "versioning", "monorepo"] },
      { name: "semantic-release", url: "https://semantic-release.gitbook.io/semantic-release", desc: "Automates version bumps, npm publishing, and changelog generation based on commit messages", tags: ["docs", "free", "versioning", "ci-cd"] },
    ]
  },
  {
    category: "Monorepo Tools & Resources",
    items: [
      { name: "Turborepo — Getting Started", url: "https://turbo.build/repo/docs", desc: "Build system for JS/TS monorepos with smart caching — ideal for developing multiple related packages", tags: ["docs", "free", "monorepo", "tooling"] },
      { name: "Nx — Getting Started", url: "https://nx.dev/getting-started/intro", desc: "Full-featured monorepo tool with dependency graph and code generation for multi-package repos", tags: ["docs", "free", "monorepo", "tooling"] },
      { name: "Lerna — Modern Monorepo Management", url: "https://lerna.js.org/", desc: "Coordinates versioning and publishing across multiple packages in a monorepo", tags: ["docs", "free", "monorepo", "publishing"] },
      { name: "npm Workspaces docs", url: "https://docs.npmjs.com/cli/v10/using-npm/workspaces", desc: "Built-in npm feature for linking and managing multiple local packages in a single repository", tags: ["docs", "free", "monorepo"] },
      { name: "pnpm Workspaces docs", url: "https://pnpm.io/workspaces", desc: "pnpm's workspace protocol for managing monorepo package dependencies with strict isolation", tags: ["docs", "free", "monorepo"] },
    ]
  }
];

export const badgeBase = 'text-xs font-semibold px-2 py-0.5 rounded-xl tracking-wide whitespace-nowrap'

export const badgeMap: Record<string, { cls: string; label: string }> = {
  // Type
  docs: { cls: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300", label: "Docs" },
  article: { cls: "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300", label: "Article" },
  course: { cls: "bg-pink-100 text-pink-800 dark:bg-pink-500/15 dark:text-pink-300", label: "Course" },
  video: { cls: "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300", label: "Video" },
  repo: { cls: "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400", label: "Repo" },
  interactive: { cls: "bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300", label: "Interactive" },
  free: { cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300", label: "Free" },
  paid: { cls: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300", label: "Paid" },
  // Topic
  publishing: { cls: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300", label: "Publishing" },
  typescript: { cls: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300", label: "TypeScript" },
  versioning: { cls: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300", label: "Versioning" },
  "ci-cd": { cls: "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300", label: "CI/CD" },
  monorepo: { cls: "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300", label: "Monorepo" },
  modules: { cls: "bg-lime-100 text-lime-800 dark:bg-lime-500/15 dark:text-lime-300", label: "Modules" },
  tooling: { cls: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300", label: "Tooling" },
  bundling: { cls: "bg-orange-50 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300", label: "Bundling" },
  testing: { cls: "bg-green-50 text-green-800 dark:bg-green-500/15 dark:text-green-300", label: "Testing" },
  linting: { cls: "bg-fuchsia-50 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300", label: "Linting" },
  architecture: { cls: "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-300", label: "Architecture" },
  frameworks: { cls: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300", label: "Frameworks" },
  databases: { cls: "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300", label: "Databases" },
};

export const typeTags = new Set(["docs", "article", "course", "video", "repo", "interactive", "free", "paid"]);
export const topicTags = new Set(["publishing", "typescript", "versioning", "ci-cd", "monorepo", "modules", "tooling", "bundling", "testing", "linting", "architecture", "frameworks", "databases"]);
