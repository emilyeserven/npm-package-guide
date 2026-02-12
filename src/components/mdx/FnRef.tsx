import { useContext } from 'react'
import { FootnoteContext } from './FootnoteContext'

export function FnRef({ n }: { n: number }) {
  const links = useContext(FootnoteContext)
  const link = links[n - 1]

  const dataAttrs: Record<string, string> = {
    'data-fn': String(n),
  }
  if (link) {
    dataAttrs['data-fn-url'] = link.url
    dataAttrs['data-fn-label'] = link.label
    dataAttrs['data-fn-source'] = link.source
    if (link.note) dataAttrs['data-fn-note'] = link.note
  }

  return (
    <sup className="fn-ref" style={{ cursor: 'pointer' }} {...dataAttrs}>
      {n}
    </sup>
  )
}
