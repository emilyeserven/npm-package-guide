import { linkRegistry } from './linkRegistry'

interface ResourceItem {
  name: string
  url: string
  desc: string
  tags: string[]
}

interface ResourceGroup {
  category: string
  items: ResourceItem[]
}

/** Category display order for the External Resources page */
const categoryOrder = [
  "Official Documentation",
  "Articles & Tutorials",
  "Free Courses & Interactive Learning",
  "Paid Courses",
  "Starter Templates & Tools",
  "Monorepo Tools & Resources",
]

/** Derive resource groups from the centralized link registry */
export const overallResources: ResourceGroup[] = (() => {
  const groups = new Map<string, ResourceItem[]>()
  for (const link of linkRegistry) {
    if (!link.resourceCategory) continue
    if (!groups.has(link.resourceCategory)) groups.set(link.resourceCategory, [])
    groups.get(link.resourceCategory)!.push({
      name: link.label,
      url: link.url,
      desc: link.desc ?? '',
      tags: link.tags ?? [],
    })
  }
  return categoryOrder
    .filter(cat => groups.has(cat))
    .map(cat => ({ category: cat, items: groups.get(cat)! }))
})();

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
  // Guide
  "guide:npm-package": { cls: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300", label: "NPM Package Guide" },
  "guide:architecture": { cls: "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300", label: "Architecture Guide" },
  "guide:testing": { cls: "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300", label: "Testing Guide" },
  "guide:prompt-engineering": { cls: "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300", label: "Prompt Eng. Guide" },
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
  "prompt-engineering": { cls: "bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-300", label: "Prompt Engineering" },
  // Glossary categories
  "cat:package-management": { cls: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300", label: "Package Management" },
  "cat:dependencies": { cls: "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300", label: "Dependencies" },
  "cat:build-bundling": { cls: "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300", label: "Build & Bundling" },
  "cat:typescript": { cls: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300", label: "TypeScript" },
  "cat:package-configuration": { cls: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300", label: "Package Configuration" },
  "cat:development-workflow": { cls: "bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300", label: "Development Workflow" },
  "cat:web-architecture": { cls: "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-300", label: "Web Architecture" },
  "cat:databases": { cls: "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300", label: "Databases" },
  "cat:full-stack-frameworks": { cls: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300", label: "Full-Stack Frameworks" },
  "cat:testing-fundamentals": { cls: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300", label: "Testing Fundamentals" },
  "cat:prompt-engineering": { cls: "bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-300", label: "Prompt Engineering" },
  "cat:ai-coding-tools": { cls: "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300", label: "AI Coding Tools" },
};

export const typeTags = new Set(["docs", "article", "course", "video", "repo", "interactive", "free", "paid"]);
export const topicTags = new Set(["publishing", "typescript", "versioning", "ci-cd", "monorepo", "modules", "tooling", "bundling", "testing", "linting", "architecture", "frameworks", "databases", "prompt-engineering"]);
export const guideTags = new Set(["guide:npm-package", "guide:architecture", "guide:testing", "guide:prompt-engineering"]);
