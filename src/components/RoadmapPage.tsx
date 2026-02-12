import { roadmapSteps } from '../data/roadmapSteps'
import { contentPages } from '../content/registry'
import { findNavItem } from '../helpers/findNavItem'
import { HtmlContent } from './HtmlContent'
import { PrevNextNav } from './PrevNextNav'

const ciPageOrder = [
  'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
]

const ciDescriptions: Record<string, string> = {
  'ci-overview': 'A CI pipeline runs automated checks every time you push code or open a pull request. GitHub Actions is the most common CI tool in the JS ecosystem.',
  'ci-linting': 'A linter (ESLint) and a formatter (Prettier) serve different purposes — understanding the difference matters for code quality.',
  'ci-build': 'This step compiles your TypeScript and bundles your package to verify the build succeeds.',
  'ci-testing': 'Testing in the JS ecosystem falls into several categories, and understanding when to use each is key to a good test suite.',
  'ci-repo-maintenance': 'As projects grow, dependencies drift, unused code accumulates, and package.json files get out of sync.',
}

const bonusPageOrder = ['storybook']

const bonusDescriptions: Record<string, string> = {
  storybook: 'Storybook is a tool for building and testing UI components in isolation — outside of your app. Think of it like a visual unit test lab for your UI.',
}

export function RoadmapPage() {
  let html = `<div class="page-header">
    <h1>Web App vs. NPM Package Guide</h1>
    <p class="subtitle">A guide for backend engineers stepping into the frontend world.</p>
    <p class="hint">💡 Look for the green "Explain it to me" dropdowns for backend-friendly analogies.</p>
  </div>`

  html += `<h2 class="section-title">🚀 Building a Package: Step by Step</h2>`
  html += `<p class="roadmap-intro">New to npm packages? Follow these steps in order. Each step links to a deeper explanation in the other tabs. This is the order you'd actually set things up in a real project.</p>`

  roadmapSteps.forEach(step => {
    html += `<div class="step-card ${step.jumpTo ? 'has-jump' : ''}">`
    html += `<div class="step-number">${step.num}</div>`
    html += `<div class="step-content">`
    html += `<div class="step-title">${step.title}</div>`
    html += `<div class="step-desc">${step.desc}</div>`
    html += `<div class="step-detail">${step.detail}</div>`
    if (step.jumpTo) {
      const label = step.jumpTo === 'checklist'
        ? '✅ Publish Checklist'
        : (findNavItem(step.jumpTo)?.title ?? step.jumpTo)
      html += `<button class="step-jump" data-jump="${step.jumpTo}">→ Deep dive: ${label}</button>`
    }
    if (step.substep) {
      const subLabel = findNavItem(step.substep.jumpTo)?.title ?? step.substep.jumpTo
      html += `<div class="step-substep">`
      html += `<h3 class="step-substep-title">${step.substep.title}</h3>`
      html += `<div class="step-substep-text">${step.substep.text}</div>`
      html += `<button class="step-jump" data-jump="${step.substep.jumpTo}" style="margin-top: 4px;">→ Deep dive: ${subLabel}</button>`
      html += `</div>`
    }
    html += `</div></div>`
  })

  // Bonus: CI Pipeline
  html += `<div class="step-card bonus-step">`
  html += `<div class="step-number bonus-number">★</div>`
  html += `<div class="step-content">`
  html += `<div class="step-title">Bonus: CI Pipeline & Checks</div>`
  html += `<div class="step-desc">Automate linting, build verification, and testing so they run on every push and pull request. A single YAML file can catch bugs before they're ever merged.</div>`
  ciPageOrder.forEach(id => {
    const page = contentPages.get(id)
    if (!page) return
    const shortDesc = ciDescriptions[id] ?? ''
    html += `<div class="bonus-subpage">`
    html += `<h3 class="bonus-subpage-title">${page.title}</h3>`
    html += `<div class="bonus-subpage-desc">${shortDesc}</div>`
    html += `<button class="step-jump" data-jump="${page.id}">→ Deep dive: ${page.title}</button>`
    html += `</div>`
  })
  html += `</div></div>`

  // Bonus: Storybook etc.
  bonusPageOrder.forEach(id => {
    const page = contentPages.get(id)
    if (!page) return
    const shortDesc = bonusDescriptions[id] ?? ''
    html += `<div class="step-card bonus-step">`
    html += `<div class="step-number bonus-number">★</div>`
    html += `<div class="step-content">`
    html += `<div class="step-title">Bonus: Developer Experience</div>`
    html += `<div class="bonus-subpage">`
    html += `<h3 class="bonus-subpage-title">${page.title}</h3>`
    html += `<div class="bonus-subpage-desc">${shortDesc}</div>`
    html += `<button class="step-jump" data-jump="${page.id}">→ Deep dive: ${page.title}</button>`
    html += `</div>`
    html += `</div></div>`
  })

  // Bonus: Learning Resources
  html += `<div class="step-card bonus-step">`
  html += `<div class="step-number bonus-number">★</div>`
  html += `<div class="step-content">`
  html += `<div class="step-title">Bonus: Learning Resources</div>`
  html += `<div class="step-desc">Documentation, articles, courses, and tools to go deeper on frontend development, npm packages, and the JavaScript ecosystem.</div>`
  html += `<div class="bonus-subpage">`
  html += `<h3 class="bonus-subpage-title">✅ Publish Checklist</h3>`
  html += `<div class="bonus-subpage-desc">Go through this before every npm publish — trust us, it saves headaches.</div>`
  html += `<button class="step-jump" data-jump="checklist">→ Deep dive: ✅ Publish Checklist</button>`
  html += `</div>`
  html += `<div class="bonus-subpage">`
  html += `<h3 class="bonus-subpage-title">📚 External Resources</h3>`
  html += `<div class="bonus-subpage-desc">Curated documentation, articles, courses, tools, and section references — all in one searchable, sortable table.</div>`
  html += `<button class="step-jump" data-jump="external-resources">→ Deep dive: 📚 External Resources</button>`
  html += `</div>`
  html += `<div class="bonus-subpage">`
  html += `<h3 class="bonus-subpage-title">📖 Glossary</h3>`
  html += `<div class="bonus-subpage-desc">Key terms you'll encounter when building and publishing npm packages, with links to the relevant sections in this guide.</div>`
  html += `<button class="step-jump" data-jump="glossary">→ Deep dive: 📖 Glossary</button>`
  html += `</div>`
  html += `</div></div>`

  return (
    <>
      <HtmlContent html={html} />
      <PrevNextNav currentId="roadmap" />
    </>
  )
}
