import { useState, useRef, useCallback } from 'react'
import { ciPages } from '../data/ciPages'
import { enrichFootnoteRefs } from '../helpers/renderFootnotes'
import { enrichGlossaryTerms } from '../helpers/glossaryEnrich'
import { HtmlContent } from './HtmlContent'
import { Footnotes } from './Footnotes'
import { PrevNextNav } from './PrevNextNav'

export function CIPage({ pageId }: { pageId: string }) {
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({})
  const contentRef = useRef<HTMLDivElement>(null)

  const page = ciPages.find(p => p.id === pageId)

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement

    // Accordion toggle
    const accordionBtn = target.closest('.accordion-toggle') as HTMLElement | null
    if (accordionBtn) {
      const key = accordionBtn.dataset.explainer
      if (key) {
        setExpandedAccordions(prev => ({ ...prev, [key]: !prev[key] }))
      }
      return
    }

    // AI prompt copy
    const copyBtn = target.closest('.ai-prompt-copy') as HTMLElement | null
    if (copyBtn && page?.aiPrompts) {
      const idx = parseInt(copyBtn.dataset.promptIdx || '0')
      const prompt = page.aiPrompts[idx].prompt
      navigator.clipboard.writeText(prompt).then(() => {
        copyBtn.textContent = '✓ Copied!'
        copyBtn.classList.add('copied')
        setTimeout(() => {
          copyBtn.textContent = '📋 Copy'
          copyBtn.classList.remove('copied')
        }, 2000)
      })
    }
  }, [page])

  if (!page) return <div>CI page not found</div>

  let html = `<h1 class="section-title">${page.title}</h1>`

  if (page.isOverview) {
    html += `<div class="section-intro">${page.intro}</div>`
    const subPages = ciPages.filter(p => !p.isOverview)
    html += `<div class="ci-overview-cards">`
    subPages.forEach((sp, i) => {
      const yamlSnippet = sp.yaml || (sp.unitSection ? sp.unitSection.yaml : '') || (sp.tools ? sp.tools[0].yaml : '')
      html += `<div class="ci-overview-card">`
      html += `<div class="ci-overview-num">${i + 1}</div>`
      html += `<div class="ci-overview-card-body">`
      html += `<div class="ci-overview-card-title">${sp.title}</div>`
      if (yamlSnippet) html += `<div class="ci-yaml">${yamlSnippet}</div>`
      html += `<button class="step-jump" data-nav="${sp.id}">→ Learn more</button>`
      html += `</div></div>`
    })
    html += `</div>`

    html += `<div class="ci-full-example">`
    html += `<div class="ci-full-example-label">📄 Complete GitHub Actions workflow</div>`
    html += `<div class="code-block">${page.exampleWorkflow}</div>`
    html += `</div>`

    html += `
      <div class="explainer">
        <h2 class="explainer-heading">💡 ${page.explainerTitle}</h2>
        <div class="explainer-body">${page.explainerBody}</div>
      </div>`

  } else if (page.isTestingPage) {
    // TOC
    html += `<div class="section-toc"><div class="section-toc-title">On this page</div>`
    html += `<a class="toc-link" data-toc="toc-unit">Unit Tests</a>`
    html += `<a class="toc-link" data-toc="toc-e2e">E2E Tests</a>`
    if (page.storybookNote) html += `<a class="toc-link" data-toc="toc-component">Component Tests (Storybook)</a>`
    html += `<a class="toc-link" data-toc="toc-coverage">Test Coverage</a>`
    html += `<a class="toc-link" data-toc="toc-good-tests">What makes a good test?</a>`
    html += `</div>`

    html += `<div class="section-intro">${page.intro}</div>`

    // Unit tests
    html += `<div class="ci-step">`
    html += `<h2 class="ci-step-heading" id="toc-unit">${page.unitSection!.heading}</h2>`
    html += `<div class="ci-step-text">${page.unitSection!.text}</div>`
    html += `<div class="yaml-heading">GitHub Actions Example</div>`
    html += `<div class="ci-yaml">${page.unitSection!.yaml}</div>`
    html += `<div class="ci-tip">${page.unitSection!.tip}</div>`
    html += `</div>`

    // E2E tests
    html += `<div class="ci-step">`
    html += `<h2 class="ci-step-heading" id="toc-e2e">${page.e2eSection!.heading}</h2>`
    html += `<div class="ci-step-text">${page.e2eSection!.text}</div>`
    html += `<div class="yaml-heading">GitHub Actions Example</div>`
    html += `<div class="ci-yaml">${page.e2eSection!.yaml}</div>`
    html += `<div class="ci-tip">${page.e2eSection!.tip}</div>`
    html += `</div>`

    // Storybook note
    if (page.storybookNote) {
      html += `<div class="ci-step" id="toc-component"><h2 class="ci-step-heading">📖 Component Tests (Storybook)</h2><div class="ci-step-text">${page.storybookNote}</div></div>`
    }

    html += `<div class="ci-step">`
    html += `<h2 class="ci-step-heading" id="toc-coverage">📊 Test Coverage</h2>`
    html += `<div class="ci-step-text">${page.coverageText}</div>`
    html += `</div>`

    html += `<div class="ci-step">`
    html += `<h2 class="ci-step-heading" id="toc-good-tests">✅ What makes a good test?</h2>`
    html += `<div class="ci-step-text"><ul class="good-tests-list">`
    page.goodTests!.forEach(item => {
      html += `<li>${item}</li>`
    })
    html += `</ul></div>`
    html += `</div>`

    // AI prompts accordion
    const aiOpen = expandedAccordions['ci-testing-ai'] || false
    html += `
      <div class="accordion">
        <button class="accordion-toggle" data-explainer="ci-testing-ai">
          <span>🤖 Sample AI prompts for writing tests</span>
          <span class="accordion-arrow ${aiOpen ? 'open' : ''}">▼</span>
        </button>
        <div class="accordion-body ${aiOpen ? 'open' : ''}">`
    page.aiPrompts!.forEach((p, i) => {
      html += `<div class="ai-prompt-card">`
      html += `<div class="ai-prompt-header"><span class="ai-prompt-label">${p.label}</span><button class="ai-prompt-copy" data-prompt-idx="${i}">📋 Copy</button></div>`
      html += `<div class="ai-prompt-body">${p.prompt}</div>`
      html += `</div>`
    })
    html += `</div></div>`

  } else if (page.isMaintenancePage) {
    // TOC
    html += `<div class="section-toc"><div class="section-toc-title">On this page</div>`
    page.tools!.forEach(tool => {
      html += `<a class="toc-link" data-toc="toc-${tool.name}">${tool.emoji} ${tool.name}</a>`
    })
    html += `</div>`

    html += `<div class="section-intro">${page.intro}</div>`

    page.tools!.forEach(tool => {
      html += `<div class="ci-step">`
      html += `<h2 class="ci-step-heading" id="toc-${tool.name}">${tool.emoji} ${tool.name}</h2>`
      html += `<div class="ci-step-text">${tool.desc}</div>`
      html += `<div class="ci-step-text"><strong>Why it matters:</strong> ${tool.why}</div>`
      html += `<div class="yaml-heading">GitHub Actions Example</div>`
      html += `<div class="ci-yaml">${tool.yaml}</div>`
      html += `</div>`
    })
    html += `<div class="ci-tip">${page.tip}</div>`

  } else {
    // Standard sub-page
    const introHtml = page.intro
    const headingMatches = [...introHtml.matchAll(/id='(toc-[^']+)'[^>]*>([^<]+)/g)]
    if (headingMatches.length > 1) {
      html += `<div class="section-toc"><div class="section-toc-title">On this page</div>`
      headingMatches.forEach(m => {
        html += `<a class="toc-link" data-toc="${m[1]}">${m[2]}</a>`
      })
      html += `</div>`
    }

    html += `<div class="section-intro">${page.intro}</div>`
    html += `<div class="yaml-heading">GitHub Actions Example</div>`
    html += `<div class="ci-yaml">${page.yaml}</div>`
    html += `<div class="ci-tip">${page.tip}</div>`
  }

  const enrichedHtml = enrichGlossaryTerms(enrichFootnoteRefs(html, page.links), pageId)

  return (
    <div ref={contentRef} onClick={handleClick}>
      <HtmlContent html={enrichedHtml} />
      {page.links && page.links.length > 0 && <Footnotes links={page.links} contentHtml={html} />}
      <PrevNextNav currentId={pageId} />
    </div>
  )
}
