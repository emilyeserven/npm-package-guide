import type { GuideSection, StartPageData } from './guideTypes'

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
    {
      type: 'bonus',
      title: 'Bonus: Developer Experience',
      description: '',
      customSubItems: [
        {
          title: '\u{1F3D7}\uFE0F Architecture Guide',
          description: 'An interactive guide to web tech stacks \u2014 explore each layer of a modified MERN stack and compare popular alternatives like LAMP, Django, and Rails.',
          jumpTo: 'arch-start',
        },
      ],
    },
    {
      type: 'bonus',
      title: 'Resources',
      description: 'Documentation, articles, courses, and tools to go deeper on frontend development, npm packages, and the JavaScript ecosystem.',
      customSubItems: [
        {
          title: '\u2705 Publish Checklist',
          description: 'Go through this before every npm publish \u2014 trust us, it saves headaches.',
          jumpTo: 'checklist',
        },
        {
          title: '\u{1F4DA} External Resources',
          description: 'Curated documentation, articles, courses, tools, and section references \u2014 all in one searchable, sortable table.',
          jumpTo: 'external-resources',
          jumpType: 'guide-filter',
        },
        {
          title: '\u{1F4D6} Glossary',
          description: 'Key terms you\u2019ll encounter when building and publishing npm packages, with links to the relevant sections in this guide.',
          jumpTo: 'glossary',
          jumpType: 'guide-filter',
        },
      ],
    },
  ],
}
