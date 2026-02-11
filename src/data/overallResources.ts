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

export const badgeMap: Record<string, { cls: string; label: string }> = {
  // Type
  docs: { cls: "rb-docs", label: "Docs" },
  article: { cls: "rb-article", label: "Article" },
  course: { cls: "rb-course", label: "Course" },
  video: { cls: "rb-video", label: "Video" },
  repo: { cls: "rb-repo", label: "Repo" },
  interactive: { cls: "rb-interactive", label: "Interactive" },
  free: { cls: "rb-free", label: "Free" },
  paid: { cls: "rb-paid", label: "Paid" },
  // Topic
  publishing: { cls: "rb-publishing", label: "Publishing" },
  typescript: { cls: "rb-typescript", label: "TypeScript" },
  versioning: { cls: "rb-versioning", label: "Versioning" },
  "ci-cd": { cls: "rb-ci-cd", label: "CI/CD" },
  monorepo: { cls: "rb-monorepo", label: "Monorepo" },
  modules: { cls: "rb-modules", label: "Modules" },
  tooling: { cls: "rb-tooling", label: "Tooling" },
  bundling: { cls: "rb-bundling", label: "Bundling" },
  testing: { cls: "rb-testing", label: "Testing" },
  linting: { cls: "rb-linting", label: "Linting" },
};

export const typeTags = new Set(["docs", "article", "course", "video", "repo", "interactive", "free", "paid"]);
export const topicTags = new Set(["publishing", "typescript", "versioning", "ci-cd", "monorepo", "modules", "tooling", "bundling", "testing", "linting"]);
