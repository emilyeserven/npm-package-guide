import { renderFootnotesHtml, type SectionLink } from '../helpers/renderFootnotes'
import { HtmlContent } from './HtmlContent'

interface FootnotesProps {
  links: SectionLink[]
  contentHtml: string
}

export function Footnotes({ links, contentHtml }: FootnotesProps) {
  const html = renderFootnotesHtml(links, contentHtml)
  if (!html) return null
  return <HtmlContent html={html} />
}
