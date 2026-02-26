import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

export const NPM_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['roadmap'] },
  { label: 'Building a Package', ids: [
    'bigpicture', 'monorepo', 'npm-vs-pnpm',
    'build', 'tsconfig', 'deps', 'dist',
    'packagejson', 'typescript', 'versioning', 'workflow',
  ]},
  { label: 'CI Pipeline & Checks', ids: [
    'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
  ]},
  { label: 'Developer Experience', ids: ['storybook'] },
]

// ── Start page data ──────────────────────────────────────────────────

export const NPM_START_PAGE_DATA: StartPageData = {
  subtitle: 'A guide for backend engineers stepping into the frontend world.',
  tip: 'Look for the green "Explain it to me" dropdowns for backend-friendly analogies.',
  headingText: '\u{1F680} Building a Package: Step by Step',
  headingDescription: 'New to npm packages? Follow these steps in order. Each step links to a deeper explanation in the other tabs. This is the order you\u2019d actually set things up in a real project.',
  relatedGuides: ['architecture'],
  steps: [
    {
      type: 'bonus',
      title: 'Bonus: CI Pipeline & Checks',
      description: 'Automate linting, build verification, and testing so they run on every push and pull request. A single YAML file can catch bugs before they\u2019re ever merged.',
      sectionLabel: 'CI Pipeline & Checks',
      subItemDescriptions: {
        'ci-overview': 'A CI pipeline runs automated checks every time you push code or open a pull request. GitHub Actions is the most common CI tool in the JS ecosystem.',
        'ci-linting': 'A linter (ESLint) and a formatter (Prettier) serve different purposes \u2014 understanding the difference matters for code quality.',
        'ci-build': 'This step compiles your TypeScript and bundles your package to verify the build succeeds.',
        'ci-testing': 'Testing in the JS ecosystem falls into several categories, and understanding when to use each is key to a good test suite.',
        'ci-repo-maintenance': 'As projects grow, dependencies drift, unused code accumulates, and package.json files get out of sync.',
      },
    },
    {
      type: 'bonus',
      title: 'Bonus: Developer Experience',
      description: '',
      sectionLabel: 'Developer Experience',
      subItemDescriptions: {
        'storybook': 'Storybook is a tool for building and testing UI components in isolation \u2014 outside of your app. Think of it like a visual unit test lab for your UI.',
      },
    },
  ],
}

export const NPM_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'npm-package',
    icon: '📦',
    title: 'Web App vs. NPM Package',
    startPageId: 'roadmap',
    description: 'Learn the differences between building a web app and an npm package, from project setup through CI/CD and publishing.',
    category: 'fundamentals',
    sections: NPM_GUIDE_SECTIONS,
  },
  startPageData: NPM_START_PAGE_DATA,
}
