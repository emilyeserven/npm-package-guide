import { enrichFootnoteRefs } from './renderFootnotes'
import type { SectionLink } from './renderFootnotes'
import { enrichGlossaryTerms } from './glossaryEnrich'

export function enrichContent(html: string, links: SectionLink[] | undefined, sectionId: string): string {
  return enrichGlossaryTerms(enrichFootnoteRefs(html, links), sectionId)
}
