import { glossaryTerms } from '../data/glossaryTerms'
import type { GlossaryTerm } from '../data/glossaryTerms'

interface FlatTerm extends GlossaryTerm {
  category: string
  patterns: RegExp[]
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

function buildTermList(): FlatTerm[] {
  const flat: FlatTerm[] = glossaryTerms.flatMap(group =>
    group.terms.map(t => {
      const patterns: RegExp[] = []
      const parenMatch = t.term.match(/^([^(]+)\s*\(/)
      if (parenMatch) {
        const abbrev = parenMatch[1].trim()
        patterns.push(new RegExp(`\\b${escapeRegex(t.term)}\\b`, 'i'))
        patterns.push(new RegExp(`\\b${escapeRegex(abbrev)}\\b`))
      } else {
        patterns.push(new RegExp(`\\b${escapeRegex(t.term)}\\b`, 'i'))
      }
      return { ...t, category: group.category, patterns }
    })
  )
  flat.sort((a, b) => b.term.length - a.term.length)
  return flat
}

let cachedTerms: FlatTerm[] | null = null
function getTerms(): FlatTerm[] {
  if (!cachedTerms) cachedTerms = buildTermList()
  return cachedTerms
}

const SKIP_TAGS = new Set(['CODE', 'PRE', 'A', 'BUTTON', 'H1', 'H2', 'H3'])

function isInsideSkipTag(node: Node): boolean {
  let current = node.parentElement
  while (current) {
    if (SKIP_TAGS.has(current.tagName)) return true
    if (current.classList?.contains('glossary-term')) return true
    current = current.parentElement
  }
  return false
}

/**
 * Walk the DOM tree of the given element and wrap the first occurrence
 * of each glossary term in a <span class="glossary-term" data-glossary-*> element.
 */
export function enrichGlossaryTermsDOM(container: HTMLElement, currentSectionId?: string): void {
  if (currentSectionId === 'glossary') return

  const terms = getTerms()
  const matched = new Set<string>()

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null)
  const textNodes: Text[] = []
  let node: Text | null
  while ((node = walker.nextNode() as Text | null)) {
    textNodes.push(node)
  }

  for (const textNode of textNodes) {
    if (isInsideSkipTag(textNode)) continue

    const text = textNode.nodeValue
    if (!text || !text.trim()) continue

    for (const term of terms) {
      if (matched.has(term.term)) continue

      for (const pattern of term.patterns) {
        pattern.lastIndex = 0
        const match = pattern.exec(text)
        if (match) {
          matched.add(term.term)

          const before = text.slice(0, match.index)
          const matchedText = match[0]
          const after = text.slice(match.index + matchedText.length)

          const span = document.createElement('span')
          span.className = 'glossary-term'
          span.setAttribute('data-glossary-term', escapeAttr(term.term))
          span.setAttribute('data-glossary-def', escapeAttr(stripHtml(term.definition)))
          span.setAttribute('data-glossary-url', escapeAttr(term.url))
          span.setAttribute('data-glossary-source', escapeAttr(term.source))
          if (term.sectionId && term.sectionId !== currentSectionId) {
            span.setAttribute('data-glossary-section', escapeAttr(term.sectionId))
          }
          span.textContent = matchedText

          const parent = textNode.parentNode!
          if (before) parent.insertBefore(document.createTextNode(before), textNode)
          parent.insertBefore(span, textNode)
          if (after) parent.insertBefore(document.createTextNode(after), textNode)
          parent.removeChild(textNode)

          break
        }
      }
    }
  }
}
