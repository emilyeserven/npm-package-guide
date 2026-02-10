export interface ResourceItem {
  name: string
  url: string
  desc: string
  badges: string[]
}

export interface ResourceGroup {
  category: string
  items: ResourceItem[]
}

export const overallResources: ResourceGroup[] = [
  {
    category: "\u{1F4D6} Official Documentation",
    items: [
      { name: "npm Docs \u2014 Getting Started", url: "https://docs.npmjs.com/getting-started", desc: "Official npm guide from account setup to publishing", badges: ["docs", "free"] },
      { name: "pnpm Documentation", url: "https://pnpm.io/motivation", desc: "Official pnpm docs \u2014 why pnpm and how to use it", badges: ["docs", "free"] },
      { name: "Node.js \u2014 Packages Documentation", url: "https://nodejs.org/api/packages.html", desc: "How Node.js resolves modules, exports maps, and package entry points", badges: ["docs", "free"] },
      { name: "MDN \u2014 JavaScript Modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", desc: "Comprehensive guide to ESM import/export syntax and how modules work", badges: ["docs", "free"] },
      { name: "TypeScript \u2014 Publishing Declaration Files", url: "https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html", desc: "How to ship .d.ts type declarations with your package", badges: ["docs", "free"] },
      { name: "Semantic Versioning Specification", url: "https://semver.org/", desc: "The official semver spec \u2014 the versioning contract every package follows", badges: ["docs", "free"] },
    ]
  },
  {
    category: "\u{1F4DD} Articles & Tutorials",
    items: [
      { name: "Best Practices for Creating a Modern npm Package (Snyk)", url: "https://snyk.io/blog/best-practices-create-modern-npm-package/", desc: "End-to-end walkthrough: TypeScript, CI/CD, security, semantic-release", badges: ["article", "free"] },
      { name: "Building and Publishing TypeScript NPM Packages", url: "https://akashrajpurohit.com/blog/building-and-publishing-typescript-npm-packages-a-stepbystep-guide/", desc: "Step-by-step with tsup, vitest, and semantic-release", badges: ["article", "free"] },
      { name: "How to Create an NPM Package in TypeScript (Atomic Object)", url: "https://spin.atomicobject.com/npm-package-typescript/", desc: "From absolute minimum to complete importable module \u2014 ground up approach", badges: ["article", "free"] },
      { name: "Conventional Commits", url: "https://www.conventionalcommits.org/", desc: "The commit message standard that powers automated versioning", badges: ["docs", "free"] },
    ]
  },
  {
    category: "\u{1F393} Free Courses & Interactive Learning",
    items: [
      { name: "Publish JavaScript Packages on npm (egghead.io)", url: "https://egghead.io/courses/publish-javascript-packages-on-npm", desc: "Free community course \u2014 create, test, publish, and update a package", badges: ["course", "free", "video"] },
      { name: "How to Write an Open Source JavaScript Library (egghead.io)", url: "https://egghead.io/courses/how-to-write-an-open-source-javascript-library", desc: "Covers GitHub setup, npm publishing, semantic-release, and CI automation", badges: ["course", "free", "video"] },
      { name: "NodeSchool Workshops", url: "https://nodeschool.io/", desc: "Interactive terminal-based tutorials for Node.js, npm, and JS fundamentals", badges: ["interactive", "free"] },
      { name: "Learn NPM \u2014 codedamn", url: "https://codedamn.com/learn/npm-basics", desc: "Interactive browser-based course with built-in coding exercises", badges: ["interactive", "free"] },
    ]
  },
  {
    category: "\u{1F4B0} Paid Courses",
    items: [
      { name: "Creating NPM Packages: The Complete Guide (Udemy)", url: "https://www.udemy.com/course/creating-npm-packages-the-complete-guide/", desc: "Highest rated (4.9\u2605) \u2014 tree-shaking, CI automation, pre-release versions, TypeScript", badges: ["course", "paid", "video"] },
      { name: "NPM Mastery: Package Management & Publishing (Udemy)", url: "https://www.udemy.com/course/npm-mastery-nodejs-package-management-publishing/", desc: "Comprehensive bootcamp from basics to publishing with a capstone CLI project", badges: ["course", "paid", "video"] },
      { name: "Understanding NPM (Udemy)", url: "https://www.udemy.com/course/understanding-npm/", desc: "Deep dive into npm internals \u2014 scripts, bins, semver, lock files", badges: ["course", "paid", "video"] },
    ]
  },
  {
    category: "\u{1F6E0} Starter Templates & Tools",
    items: [
      { name: "npm Package Boilerplate 2025", url: "https://github.com/simonorzel26/npm-package-boilerplate-2025", desc: "Opinionated starter with pnpm, TypeScript, ESM+CJS, and automated releases", badges: ["repo", "free"] },
      { name: "tsup \u2014 Bundle TypeScript Libraries", url: "https://tsup.egoist.dev/", desc: "The easiest way to build TypeScript packages \u2014 zero config ESM/CJS output", badges: ["docs", "free"] },
      { name: "changesets \u2014 Version Management", url: "https://github.com/changesets/changesets", desc: "Manage versioning and changelogs for packages, especially in monorepos", badges: ["repo", "free"] },
      { name: "semantic-release", url: "https://semantic-release.gitbook.io/semantic-release", desc: "Fully automated versioning and publishing based on commit messages", badges: ["docs", "free"] },
    ]
  },
  {
    category: "\u{1F3D7}\uFE0F Monorepo Tools & Resources",
    items: [
      { name: "Turborepo \u2014 Getting Started", url: "https://turbo.build/repo/docs", desc: "High-performance build system for JS/TS monorepos \u2014 smart caching and parallel builds", badges: ["docs", "free"] },
      { name: "Nx \u2014 Getting Started", url: "https://nx.dev/getting-started/intro", desc: "Full-featured monorepo tool with dependency graph, affected commands, and code generation", badges: ["docs", "free"] },
      { name: "Lerna \u2014 Modern Monorepo Management", url: "https://lerna.js.org/", desc: "The original JS monorepo tool \u2014 now maintained by Nx, great for coordinating package publishes", badges: ["docs", "free"] },
      { name: "npm Workspaces docs", url: "https://docs.npmjs.com/cli/v10/using-npm/workspaces", desc: "Built-in npm feature for linking local packages together in a monorepo", badges: ["docs", "free"] },
      { name: "pnpm Workspaces docs", url: "https://pnpm.io/workspaces", desc: "pnpm's workspace feature \u2014 fast, strict, and great for monorepos", badges: ["docs", "free"] },
    ]
  }
];

export const badgeMap: Record<string, { cls: string; label: string }> = {
  free: { cls: "rb-free", label: "Free" },
  paid: { cls: "rb-paid", label: "Paid" },
  docs: { cls: "rb-docs", label: "Docs" },
  article: { cls: "rb-article", label: "Article" },
  course: { cls: "rb-course", label: "Course" },
  video: { cls: "rb-video", label: "Video" },
  repo: { cls: "rb-repo", label: "Repo" },
  interactive: { cls: "rb-interactive", label: "Interactive" }
};
