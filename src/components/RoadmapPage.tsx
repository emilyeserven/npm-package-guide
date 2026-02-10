import { roadmapSteps } from '../data/roadmapSteps'
import { sections } from '../data/sections'
import { ciPages } from '../data/ciPages'
import { bonusSections } from '../data/bonusSections'
import { HtmlContent } from './HtmlContent'
import { PrevNextNav } from './PrevNextNav'

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
      let label: string
      if (step.jumpTo === 'checklist') {
        label = '✅ Publish Checklist'
      } else {
        const target = sections.find(s => s.id === step.jumpTo)
          || ciPages.find(p => p.id === step.jumpTo)
          || bonusSections.find(b => b.id === step.jumpTo)
        label = target ? target.title : step.jumpTo
      }
      html += `<button class="step-jump" data-jump="${step.jumpTo}">→ Deep dive: ${label}</button>`
    }
    if (step.substep) {
      const subTarget = sections.find(s => s.id === step.substep!.jumpTo)
        || ciPages.find(p => p.id === step.substep!.jumpTo)
      const subLabel = subTarget ? subTarget.title : step.substep.jumpTo
      html += `<div class="step-substep">`
      html += `<div class="step-substep-text">↳ ${step.substep.text}</div>`
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
  ciPages.forEach(cp => {
    html += `<button class="step-jump" data-jump="${cp.id}">→ ${cp.title}</button>`
  })
  html += `</div></div>`

  // Bonus: Storybook etc.
  bonusSections.forEach(bs => {
    html += `<div class="step-card bonus-step">`
    html += `<div class="step-number bonus-number">★</div>`
    html += `<div class="step-content">`
    html += `<div class="step-title">Bonus: ${bs.title.replace(/^\S+\s+/, '')}</div>`
    html += `<div class="step-desc">${bs.intro.substring(0, 200).replace(/<[^>]*>/g, '')}…</div>`
    html += `<button class="step-jump" data-jump="${bs.id}">→ Deep dive: ${bs.title}</button>`
    html += `</div></div>`
  })

  return (
    <>
      <HtmlContent html={html} />
      <PrevNextNav currentId="roadmap" />
    </>
  )
}
