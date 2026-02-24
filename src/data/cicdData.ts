/* ───────────────────────── TYPES ───────────────────────── */

export interface PipelineStage {
  name: string
  desc: string
  color: string
  darkColor: string
  example: string
}

export interface YamlLine {
  line: string
  note: string | null
}

export interface CicdPattern {
  name: string
  desc: string
  tag: string
}

export interface CicdTip {
  title: string
  body: string
}

export interface GhaConceptItem {
  term: string
  def: string
}

export interface PatternTagStyle {
  bg: string
  text: string
  border: string
  darkBg: string
  darkText: string
  darkBorder: string
}

/* ───────────────────────── PIPELINE STAGES ───────────────────────── */

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    name: 'Trigger',
    desc: 'Something kicks off the pipeline — a push, a PR, a schedule, or a manual click.',
    color: '#6366f1',
    darkColor: '#818cf8',
    example: 'on: push to main',
  },
  {
    name: 'Build',
    desc: 'Install dependencies, compile code, bundle assets. Think npm install && npm run build.',
    color: '#8b5cf6',
    darkColor: '#a78bfa',
    example: 'npm ci → vite build',
  },
  {
    name: 'Test',
    desc: 'Run your test suite — unit tests, integration tests, maybe E2E. If anything fails, the pipeline stops.',
    color: '#a855f7',
    darkColor: '#c084fc',
    example: 'vitest run, playwright test',
  },
  {
    name: 'Lint & Quality',
    desc: 'Check code style, type checking, security scanning. Catches things tests don\u2019t.',
    color: '#c084fc',
    darkColor: '#d8b4fe',
    example: 'eslint, tsc --noEmit',
  },
  {
    name: 'Deploy',
    desc: 'Push to hosting — could be Vercel, AWS, a government server, whatever. This is the CD part.',
    color: '#d946ef',
    darkColor: '#e879f9',
    example: 'Deploy to staging → prod',
  },
]

/* ───────────────────────── GITHUB ACTIONS CONCEPTS ───────────────────────── */

export const GHA_CONCEPTS: GhaConceptItem[] = [
  {
    term: 'Workflow',
    def: 'A YAML file that defines an automated process. Lives in .github/workflows/. You can have multiple workflows per repo.',
  },
  {
    term: 'Event (Trigger)',
    def: 'What starts the workflow: push, pull_request, schedule (cron), workflow_dispatch (manual button), or even "when an issue is opened."',
  },
  {
    term: 'Job',
    def: 'A group of steps that run on the same runner (virtual machine). Jobs run in parallel by default, but you can make them sequential.',
  },
  {
    term: 'Step',
    def: 'A single task inside a job — run a shell command or use a pre-built Action.',
  },
  {
    term: 'Action',
    def: 'A reusable, community-built plugin. Like npm packages but for CI. Example: actions/checkout@v4 clones your repo.',
  },
  {
    term: 'Runner',
    def: 'The virtual machine that executes your job. GitHub provides Ubuntu, Windows, and macOS runners. You can also self-host (important for airgapped environments!).',
  },
]

/* ───────────────────────── YAML EXPLORER ───────────────────────── */

export const YAML_LINES: YamlLine[] = [
  { line: 'name: CI Pipeline', note: 'Human-readable name — shows up in the Actions tab on GitHub.' },
  { line: '', note: null },
  { line: 'on:', note: 'Defines what triggers this workflow.' },
  { line: '  push:', note: 'Run on every push...' },
  { line: '    branches: [main, develop]', note: '...but only to these branches. Keeps noise down.' },
  { line: '  pull_request:', note: 'Also run when a PR is opened or updated.' },
  { line: '    branches: [main]', note: 'Only PRs targeting main. You don\u2019t need CI on every branch.' },
  { line: '', note: null },
  { line: 'jobs:', note: 'All jobs in this workflow. They run in parallel unless you add \u2018needs:\u2019.' },
  { line: '  build-and-test:', note: 'Job ID — you pick the name. Used for referencing between jobs.' },
  { line: '    runs-on: ubuntu-latest', note: 'Which runner to use. ubuntu-latest is the most common (and cheapest).' },
  { line: '', note: null },
  { line: '    steps:', note: 'Ordered list of things this job does.' },
  { line: '      - uses: actions/checkout@v4', note: 'Pre-built Action that clones your repo onto the runner. Almost every workflow starts with this.' },
  { line: '', note: null },
  { line: '      - uses: actions/setup-node@v4', note: 'Installs Node.js on the runner.' },
  { line: '        with:', note: '\u2018with:\u2019 passes configuration to the Action.' },
  { line: '          node-version: 20', note: 'Specify which Node version. Match your project\u2019s requirements.' },
  { line: "          cache: 'npm'", note: 'Caches node_modules between runs — huge speed boost.' },
  { line: '', note: null },
  { line: '      - run: npm ci', note: '\u2018run:\u2019 executes a shell command. npm ci is like npm install but stricter and faster for CI.' },
  { line: '      - run: npm run lint', note: 'Run your linter. If this fails, the whole job fails.' },
  { line: '      - run: npm run test', note: 'Run your tests.' },
  { line: '      - run: npm run build', note: 'Build the project. Catches TypeScript errors, bad imports, etc.' },
]

/* ───────────────────────── COMMON PATTERNS ───────────────────────── */

export const CICD_PATTERNS: CicdPattern[] = [
  {
    name: 'Branch Protection',
    desc: 'Require CI to pass before merging PRs. Go to repo Settings \u2192 Branches \u2192 Add rule \u2192 check "Require status checks." This is the #1 thing to set up.',
    tag: 'Essential',
  },
  {
    name: 'Matrix Strategy',
    desc: 'Test across multiple Node versions or OS in parallel. Use strategy.matrix to define combos like node: [18, 20, 22].',
    tag: 'Testing',
  },
  {
    name: 'Caching',
    desc: "Cache node_modules or build outputs between runs. The setup-node action does this for you with cache: 'npm'. Saves 1\u20133 minutes per run.",
    tag: 'Performance',
  },
  {
    name: 'Environment Secrets',
    desc: 'Store API keys, deploy tokens in Settings \u2192 Secrets. Access them as ${{ secrets.MY_SECRET }} in YAML. Never hardcode secrets!',
    tag: 'Security',
  },
  {
    name: 'Conditional Steps',
    desc: "Use 'if:' to skip steps. Example: only deploy on push to main, not on PRs. if: github.ref == 'refs/heads/main'",
    tag: 'Control Flow',
  },
  {
    name: 'Self-Hosted Runners',
    desc: 'For airgapped or on-prem deployments, run your own runner on internal servers. Same YAML, just change runs-on to your runner label.',
    tag: 'Enterprise',
  },
]

export const PATTERN_TAG_STYLES: Record<string, PatternTagStyle> = {
  Essential: {
    bg: '#fef2f2', text: '#dc2626', border: '#fecaca',
    darkBg: '#dc262618', darkText: '#fca5a5', darkBorder: '#dc262640',
  },
  Testing: {
    bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe',
    darkBg: '#2563eb18', darkText: '#93c5fd', darkBorder: '#2563eb40',
  },
  Performance: {
    bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0',
    darkBg: '#16a34a18', darkText: '#86efac', darkBorder: '#16a34a40',
  },
  Security: {
    bg: '#fefce8', text: '#ca8a04', border: '#fde68a',
    darkBg: '#ca8a0418', darkText: '#fde047', darkBorder: '#ca8a0440',
  },
  'Control Flow': {
    bg: '#faf5ff', text: '#9333ea', border: '#e9d5ff',
    darkBg: '#9333ea18', darkText: '#d8b4fe', darkBorder: '#9333ea40',
  },
  Enterprise: {
    bg: '#f0f9ff', text: '#0284c7', border: '#bae6fd',
    darkBg: '#0284c718', darkText: '#7dd3fc', darkBorder: '#0284c740',
  },
}

/* ───────────────────────── GOTCHAS & TIPS ───────────────────────── */

export const CICD_TIPS: CicdTip[] = [
  {
    title: 'npm ci vs npm install',
    body: 'Always use npm ci in CI. It\u2019s faster, uses the lockfile exactly, and fails if lockfile is out of sync. npm install can silently modify your lockfile.',
  },
  {
    title: 'YAML Indentation Matters',
    body: 'YAML is whitespace-sensitive. A misplaced space will silently break your workflow. Use a YAML linter extension in VS Code.',
  },
  {
    title: "Secrets Don't Work on Fork PRs",
    body: "For security, secrets aren\u2019t exposed to PRs from forks. This is intentional — it prevents someone from forking your repo and stealing your secrets via a modified workflow.",
  },
  {
    title: "Don't Over-Pipeline",
    body: 'Start simple. A single workflow with lint \u2192 test \u2192 build is enough for most projects. Add complexity only when you actually need it.',
  },
  {
    title: 'Debugging Failed Runs',
    body: 'Click the failed job in the Actions tab to see logs. For more detail, re-run with debug logging enabled (set ACTIONS_RUNNER_DEBUG secret to true).',
  },
  {
    title: 'Watch Your Minutes',
    body: 'Private repos get limited free minutes (2000/mo on free tier). macOS runners use 10x minutes. Stick to ubuntu-latest when possible.',
  },
]

/* ───────────────────────── NAVIGATION ───────────────────────── */

import type { GuideSection, GuideDefinition } from './guideTypes'
import type { StartPageData } from './guideTypes'

export const CICD_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['cicd-start'] },
  { label: 'Core Concepts', ids: ['cicd-big-picture', 'cicd-pipeline', 'cicd-github-actions'] },
  { label: 'Hands-On', ids: ['cicd-yaml', 'cicd-patterns'] },
  { label: 'Reference', ids: ['cicd-gotchas'] },
]

// ── Start page data ──────────────────────────────────────────────────

export const CICD_START_PAGE_DATA: StartPageData = {
  subtitle: 'Pipelines \u00b7 GitHub Actions \u00b7 Deployment \u2014 from zero to automated.',
  tip: 'Designed for developers who understand building apps but haven\u2019t set up CI/CD before.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'The Big Picture',
      description: 'Understand what CI/CD solves, how continuous integration and continuous delivery work together, and why every team needs automated pipelines.',
      jumpTo: 'cicd-big-picture',
    },
    {
      type: 'bonus',
      title: 'Pipeline Deep Dive',
      description: 'Walk through each stage of a CI/CD pipeline and learn the key GitHub Actions concepts.',
      sectionLabel: 'Core Concepts',
      subItemDescriptions: {
        'cicd-big-picture': 'What CI/CD solves and why every team needs it.',
        'cicd-pipeline': 'The five stages every pipeline goes through: trigger, build, test, lint, and deploy.',
        'cicd-github-actions': 'Workflows, jobs, steps, actions, and runners — the building blocks of GitHub Actions.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Reading a Workflow File',
      description: 'Interactively explore a real GitHub Actions YAML file line by line — click any line to see what it does.',
      jumpTo: 'cicd-yaml',
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Common Patterns',
      description: 'Branch protection, matrix builds, caching, secrets, conditional steps, and self-hosted runners — patterns you\u2019ll actually use.',
      jumpTo: 'cicd-patterns',
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Gotchas & Tips',
      description: 'The things that trip people up: npm ci vs install, YAML indentation, fork PR secrets, and more.',
      jumpTo: 'cicd-gotchas',
    },
  ],
}

export const guideDefinition: GuideDefinition = {
  id: 'ci-cd',
  icon: '\u2699\uFE0F',
  title: 'CI/CD & GitHub Actions',
  startPageId: 'cicd-start',
  description:
    'Learn CI/CD from scratch \u2014 pipelines, GitHub Actions, YAML workflows, and the patterns that keep teams shipping safely.',
  order: 4,
  sections: CICD_GUIDE_SECTIONS,
}

export { CICD_START_PAGE_DATA as startPageData }
