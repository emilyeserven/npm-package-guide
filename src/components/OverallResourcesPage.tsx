import { overallResources } from '../data/overallResources'
import { renderResourcesTableHtml } from './ResourcesTable'
import { HtmlContent } from './HtmlContent'
import { PrevNextNav } from './PrevNextNav'

export function OverallResourcesPage() {
  let html = `<h2 class="section-title">📚 Learning Resources</h2>`
  html += `<p style="color: var(--muted); font-size: 14px; margin-bottom: 24px; line-height: 1.6;">Documentation, articles, courses, and tools to go deeper. Free resources are marked — paid courses often go on sale on Udemy for under $15.</p>`
  html += `<div class="resources-section">`
  html += renderResourcesTableHtml(overallResources)
  html += `</div>`

  return (
    <>
      <HtmlContent html={html} />
      <PrevNextNav currentId="overall-resources" />
    </>
  )
}
