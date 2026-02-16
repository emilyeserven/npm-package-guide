import type { GlossaryCategory } from './index'

export const cicdGlossary: GlossaryCategory[] = [
  {
    category: "CI/CD Fundamentals",
    terms: [
      {
        term: "Continuous Integration (CI)",
        definition: "A practice where every code push automatically triggers tests, linting, and builds. CI catches integration bugs immediately rather than at deploy time.",
        linkId: "github-actions-docs",
        sectionId: "cicd-big-picture",
      },
      {
        term: "Continuous Delivery (CD)",
        definition: "The practice of automatically deploying code to staging or production after CI checks pass. Eliminates manual deploy steps and \"it works on my machine\" problems.",
        linkId: "github-actions-docs",
        sectionId: "cicd-big-picture",
      },
      {
        term: "Pipeline",
        definition: "An automated sequence of stages (trigger, build, test, lint, deploy) that code passes through from push to production. If any stage fails, the pipeline stops.",
        linkId: "github-actions-docs",
        sectionId: "cicd-pipeline",
      },
      {
        term: "GitHub Actions",
        definition: "GitHub\u2019s built-in CI/CD platform. Pipelines are defined as YAML files in <code>.github/workflows/</code>. Free for public repos with generous free-tier minutes for private ones.",
        linkId: "github-actions-docs",
        sectionId: "cicd-github-actions",
      },
      {
        term: "Workflow",
        definition: "A YAML file in <code>.github/workflows/</code> that defines an automated CI/CD process. A repo can have multiple workflows triggered by different events.",
        linkId: "github-actions-workflow-syntax",
        sectionId: "cicd-github-actions",
      },
      {
        term: "Runner",
        definition: "The virtual machine that executes a GitHub Actions job. GitHub provides hosted Ubuntu, Windows, and macOS runners. Organizations can also self-host runners for airgapped or on-prem environments.",
        linkId: "github-actions-runners",
        sectionId: "cicd-github-actions",
      },
      {
        term: "Branch Protection",
        definition: "A GitHub repository setting that requires status checks (like CI) to pass before a pull request can be merged. The most important CI/CD configuration to set up first.",
        linkId: "github-branch-protection",
        sectionId: "cicd-patterns",
        guides: ['ci-cd', 'npm-package'],
      },
      {
        term: "Matrix Strategy",
        definition: "A GitHub Actions feature that runs the same job across multiple configurations in parallel — for example, testing against Node 18, 20, and 22 simultaneously.",
        linkId: "github-actions-matrix",
        sectionId: "cicd-patterns",
      },
      {
        term: "npm ci",
        definition: "A CI-optimized version of <code>npm install</code>. It\u2019s faster, uses the lockfile exactly, and fails if the lockfile is out of sync with <code>package.json</code>. Always preferred over <code>npm install</code> in pipelines.",
        linkId: "npm-ci-docs",
        sectionId: "cicd-gotchas",
        guides: ['ci-cd', 'npm-package'],
      },
    ],
  },
]
