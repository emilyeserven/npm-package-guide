import type { GuideSection } from './guideTypes'

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
  { label: 'Learning Resources', ids: ['checklist'] },
]
