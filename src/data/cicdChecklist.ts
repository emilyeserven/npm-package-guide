import type { ChecklistBaseSection } from '../components/mdx/ChecklistBase'

export const CICD_CHECKLIST: ChecklistBaseSection[] = [
  {
    id: 'pipeline-fundamentals',
    name: 'Pipeline Fundamentals',
    icon: '\u{1F6E4}\uFE0F',  // 🛤️
    items: [
      { label: 'Understand the five pipeline stages: trigger, build, test, lint/quality, and deploy' },
      { label: 'Decide on your branching strategy \u2014 trunk-based, GitFlow, or feature branches with PR merges' },
      { label: 'Define which events should trigger your pipeline: <code>push</code>, <code>pull_request</code>, <code>schedule</code>, or <code>workflow_dispatch</code>' },
      { label: 'Identify which environments you need: development, staging, production' },
      { label: 'Document the expected flow from code commit to production deployment' },
    ],
  },
  {
    id: 'github-actions-setup',
    name: 'GitHub Actions Setup',
    icon: '\u2699\uFE0F',  // ⚙️
    items: [
      { label: 'Create a <code>.github/workflows/</code> directory in your repository' },
      { label: 'Write your first workflow YAML file with a descriptive name and correct trigger events' },
      { label: 'Configure <code>jobs</code> with appropriate <code>runs-on</code> runner (e.g., <code>ubuntu-latest</code>)' },
      { label: 'Use <code>actions/checkout@v4</code> to check out your repository code' },
      { label: 'Set up Node.js with <code>actions/setup-node@v4</code> and specify your Node version' },
      { label: 'Use <code>npm ci</code> (not <code>npm install</code>) for deterministic dependency installation' },
    ],
  },
  {
    id: 'testing-quality',
    name: 'Testing & Quality Gates',
    icon: '\u{1F9EA}',  // 🧪
    items: [
      { label: 'Add a test step that runs your full test suite and fails the pipeline on any failure' },
      { label: 'Add a lint step with ESLint (and optionally Prettier) to enforce code style' },
      { label: 'Add a type-check step with <code>tsc --noEmit</code> to catch TypeScript errors' },
      { label: 'Configure branch protection rules to require passing checks before merging' },
      { label: 'Consider adding a build step to verify the project compiles successfully' },
      { label: 'Set up test coverage reporting if your team tracks coverage metrics' },
    ],
  },
  {
    id: 'patterns-optimization',
    name: 'Patterns & Optimization',
    icon: '\u26A1',  // ⚡
    items: [
      { label: 'Cache <code>node_modules</code> or the npm/pnpm cache to speed up dependency installation' },
      { label: 'Use matrix builds if you need to test across multiple Node.js versions or operating systems' },
      { label: 'Add conditional steps with <code>if:</code> to skip unnecessary work (e.g., deploy only on <code>main</code>)' },
      { label: 'Use <code>concurrency</code> groups to cancel in-progress runs when a new commit is pushed' },
      { label: 'Consider splitting long workflows into separate jobs that run in parallel' },
    ],
  },
  {
    id: 'secrets-security',
    name: 'Secrets & Security',
    icon: '\u{1F510}',  // 🔐
    items: [
      { label: 'Store sensitive values (API keys, tokens, passwords) in GitHub repository or environment secrets' },
      { label: 'Reference secrets with <code>${{ secrets.SECRET_NAME }}</code> \u2014 never hardcode them in YAML' },
      { label: 'Understand that fork PRs cannot access your repository secrets (by design)' },
      { label: 'Pin third-party actions to a specific commit SHA instead of a mutable tag for supply chain security' },
      { label: 'Review the <code>permissions</code> key to grant workflows only the access they need' },
      { label: 'Set up environment protection rules for production deployments (manual approval, required reviewers)' },
    ],
  },
  {
    id: 'deployment',
    name: 'Deployment & Monitoring',
    icon: '\u{1F680}',  // 🚀
    items: [
      { label: 'Configure a deployment step that runs only after all tests and quality checks pass' },
      { label: 'Set up separate deployment targets for staging and production environments' },
      { label: 'Add a smoke test or health check after deployment to verify the deploy succeeded' },
      { label: 'Configure notifications (Slack, email) for pipeline failures' },
      { label: 'Document your CI/CD pipeline for the team \u2014 what runs, when, and how to debug failures' },
    ],
  },
]
