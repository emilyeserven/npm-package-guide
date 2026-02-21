import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

/** Sanitize an HTML string, stripping dangerous tags/attributes. */
export function sanitize(html: string): string {
  return DOMPurify.sanitize(html)
}

/** Sanitize an HTML string then convert it to React elements. */
export function safeParse(html: string) {
  return parse(DOMPurify.sanitize(html))
}
