import { contentPages } from '../content/registry'
import { STACK_PAGES, FRAMEWORK_PAGES } from '../data/archData'
import { HtmlContent } from './HtmlContent'
import { PrevNextNav } from './PrevNextNav'

const stackDescriptions: Record<string, string> = {
  mern: 'The most popular all-JavaScript stack — MongoDB, Express, React, Node.js. Great for learning and rapid prototyping.',
  pfrn: 'A modified MERN stack with PostgreSQL + Fastify for better performance and data integrity. This is the stack explored throughout this guide.',
  mean: 'Like MERN but with Angular instead of React — a full framework for enterprise teams that want consistent structure.',
  lamp: 'The classic stack that powered the early internet — Linux, Apache, MySQL, PHP. Battle-tested for decades.',
  django: 'Python-powered with batteries included — PostgreSQL, Django, React/Vue, Python. Excellent for teams that know Python.',
  rails: 'Ruby-powered and famous for developer happiness — PostgreSQL, Ruby on Rails, Hotwire/React, Ruby.',
}

const frameworkDescriptions: Record<string, string> = {
  nextjs: 'The most popular React framework by Vercel — server rendering, file-system routing, and built-in optimizations. The safe default for production React apps.',
  'react-router': 'React Router v7\'s full-stack mode — built on web standards, progressive enhancement, and 10+ years of battle-tested routing.',
  'tanstack-start': 'The newest entry with best-in-class TypeScript support — end-to-end type safety from the TanStack ecosystem.',
  remix: 'The pioneering web-standards framework that merged into React Router v7. Its ideas shaped modern React frameworks.',
}

export function ArchStartPage() {
  let html = `<div class="page-header">
    <h1>Architecture Guide</h1>
    <p class="subtitle">A beginner's guide to web application tech stacks — from first principles to comparing real-world alternatives.</p>
    <p class="hint">💡 Each section includes analogies and explanations designed for backend engineers.</p>
  </div>`

  // Step 1: What is a Stack?
  html += `<h2 class="section-title">📚 Learning Path</h2>`

  html += `<div class="step-card has-jump">`
  html += `<div class="step-number">1</div>`
  html += `<div class="step-content">`
  html += `<div class="step-title">What is a Stack?</div>`
  html += `<div class="step-desc">Learn what a tech stack is, how the four essential layers work together, and why swapping components is a key architectural skill.</div>`

  const whatIsPage = contentPages.get('arch-what-is-a-stack')
  const whatIsLabel = whatIsPage?.title ?? '📚 What is a Stack?'
  html += `<button class="step-jump" data-jump="arch-what-is-a-stack">→ Deep dive: ${whatIsLabel}</button>`
  html += `</div></div>`

  // Bonus: Stack Alternatives
  html += `<div class="step-card bonus-step">`
  html += `<div class="step-number bonus-number">★</div>`
  html += `<div class="step-content">`
  html += `<div class="step-title">Stack Alternatives</div>`
  html += `<div class="step-desc">Explore six popular stacks in depth. Each covers the technologies involved, how they work together, and their strengths and tradeoffs.</div>`

  STACK_PAGES.forEach(stack => {
    const pageId = `arch-stack-${stack.id}`
    const page = contentPages.get(pageId)
    const title = page?.title ?? stack.name
    const desc = stackDescriptions[stack.id] ?? stack.overview
    html += `<div class="bonus-subpage">`
    html += `<h3 class="bonus-subpage-title">${title}</h3>`
    html += `<div class="bonus-subpage-desc">${desc}</div>`
    html += `<button class="step-jump" data-jump="${pageId}">→ Deep dive: ${title}</button>`
    html += `</div>`
  })

  html += `</div></div>`

  // Bonus: Full-Stack Frameworks
  html += `<div class="step-card bonus-step">`
  html += `<div class="step-number bonus-number">\u2605</div>`
  html += `<div class="step-content">`
  html += `<div class="step-title">Full-Stack Frameworks</div>`
  html += `<div class="step-desc">Explore four React-based full-stack frameworks that handle server rendering, routing, and data fetching as a unified package.</div>`

  const fwIntroPage = contentPages.get('arch-frameworks-intro')
  const fwIntroLabel = fwIntroPage?.title ?? '\u{1F3E0} Full-Stack Frameworks'
  html += `<button class="step-jump" data-jump="arch-frameworks-intro">\u2192 Overview: ${fwIntroLabel}</button>`

  FRAMEWORK_PAGES.forEach(fw => {
    const pageId = `arch-fw-${fw.id}`
    const page = contentPages.get(pageId)
    const title = page?.title ?? fw.name
    const desc = frameworkDescriptions[fw.id] ?? fw.overview
    html += `<div class="bonus-subpage">`
    html += `<h3 class="bonus-subpage-title">${title}</h3>`
    html += `<div class="bonus-subpage-desc">${desc}</div>`
    html += `<button class="step-jump" data-jump="${pageId}">\u2192 Deep dive: ${title}</button>`
    html += `</div>`
  })

  html += `</div></div>`

  // Step 2: How it all Connects
  html += `<div class="step-card has-jump">`
  html += `<div class="step-number">2</div>`
  html += `<div class="step-content">`
  html += `<div class="step-title">How it all Connects</div>`
  html += `<div class="step-desc">Trace a user action through every layer of the stack — from button click to database query and back to the screen.</div>`

  const connectsPage = contentPages.get('arch-how-it-connects')
  const connectsLabel = connectsPage?.title ?? '🔄 How it all Connects'
  html += `<button class="step-jump" data-jump="arch-how-it-connects">→ Deep dive: ${connectsLabel}</button>`
  html += `</div></div>`

  return (
    <>
      <HtmlContent html={html} />
      <PrevNextNav currentId="arch-start" />
    </>
  )
}
