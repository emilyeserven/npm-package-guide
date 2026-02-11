import { glossaryTerms } from '../data/glossaryTerms'
import type { GlossaryTerm } from '../data/glossaryTerms'

interface FlatTerm extends GlossaryTerm {
  category: string
  /** Regex patterns to match this term in text */
  patterns: RegExp[]
}

/** Strip HTML tags from a string (for data attributes) */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

/** Escape special characters for use in HTML attribute values */
function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Build the flat list of terms with compiled regex patterns.
 * Sorted by term length descending so longer terms match first
 * (prevents "npm" matching before "npm registry").
 */
function buildTermList(): FlatTerm[] {
  const flat: FlatTerm[] = glossaryTerms.flatMap(group =>
    group.terms.map(t => {
      const patterns: RegExp[] = []

      // For terms like "ESM (ES Modules)" or "CI (Continuous Integration)",
      // match both the full form and the abbreviation alone
      const parenMatch = t.term.match(/^([^(]+)\s*\(/)
      if (parenMatch) {
        const abbrev = parenMatch[1].trim()
        // Full term (escaped for regex)
        patterns.push(new RegExp(`\\b${escapeRegex(t.term)}\\b`, 'i'))
        // Just the abbreviation (case-sensitive for acronyms)
        patterns.push(new RegExp(`\\b${escapeRegex(abbrev)}\\b`))
      } else {
        patterns.push(new RegExp(`\\b${escapeRegex(t.term)}\\b`, 'i'))
      }

      return { ...t, category: group.category, patterns }
    })
  )

  // Sort longest first to prevent partial matches
  flat.sort((a, b) => b.term.length - a.term.length)
  return flat
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

let cachedTerms: FlatTerm[] | null = null

function getTerms(): FlatTerm[] {
  if (!cachedTerms) cachedTerms = buildTermList()
  return cachedTerms
}

/** Tags inside which we should NOT annotate terms */
const SKIP_TAGS = new Set(['code', 'pre', 'a', 'button', 'h1', 'h2', 'h3'])

/**
 * Enrich HTML content by wrapping the first occurrence of each glossary term
 * in a <span class="glossary-term" data-glossary-*> element.
 *
 * Skips terms inside <code>, <pre>, <a>, <button>, and heading elements.
 * Only annotates the first match per term per call.
 */
export function enrichGlossaryTerms(html: string, currentSectionId?: string): string {
  if (currentSectionId === 'glossary') return html

  const terms = getTerms()
  const matched = new Set<string>() // track which terms have been matched

  // Split HTML into tags and text tokens
  // Each token is either an HTML tag (starts with <) or a text node
  const tokens = html.split(/(<[^>]*>)/)

  // Track nesting of skip-tags
  const skipStack: string[] = []

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (!token) continue

    // HTML tag
    if (token.startsWith('<')) {
      const closeMatch = token.match(/^<\/(\w+)/)
      const openMatch = token.match(/^<(\w+)/)
      if (closeMatch) {
        const tag = closeMatch[1].toLowerCase()
        // Pop from skip stack if it matches
        if (skipStack.length > 0 && skipStack[skipStack.length - 1] === tag) {
          skipStack.pop()
        }
      } else if (openMatch) {
        const tag = openMatch[1].toLowerCase()
        if (SKIP_TAGS.has(tag) && !token.endsWith('/>')) {
          skipStack.push(tag)
        }
      }
      continue
    }

    // Text node — skip if inside a skip-tag
    if (skipStack.length > 0) continue

    // Try to match glossary terms in this text
    let text = token
    let modified = false

    for (const term of terms) {
      if (matched.has(term.term)) continue

      for (const pattern of term.patterns) {
        const match = pattern.exec(text)
        if (match) {
          matched.add(term.term)
          modified = true

          const before = text.slice(0, match.index)
          const matchedText = match[0]
          const after = text.slice(match.index + matchedText.length)

          const plainDef = escapeAttr(stripHtml(term.definition))
          const sectionAttr =
            term.sectionId && term.sectionId !== currentSectionId
              ? ` data-glossary-section="${escapeAttr(term.sectionId)}"`
              : ''

          const span =
            `<span class="glossary-term"` +
            ` data-glossary-term="${escapeAttr(term.term)}"` +
            ` data-glossary-def="${plainDef}"` +
            ` data-glossary-url="${escapeAttr(term.url)}"` +
            ` data-glossary-source="${escapeAttr(term.source)}"` +
            sectionAttr +
            `>${matchedText}</span>`

          text = before + span + after
          break // one pattern match is enough
        }
      }
    }

    if (modified) {
      tokens[i] = text
    }
  }

  return tokens.join('')
}
