import { useMemo } from 'react'
import parse, { domToReact, Element } from 'html-react-parser'
import type { DOMNode, HTMLReactParserOptions } from 'html-react-parser'
import { useNavigateToSection } from '../hooks/useNavigateToSection'

interface HtmlContentProps {
  html: string
  className?: string
  as?: keyof HTMLElementTagNameMap
}

export function HtmlContent({ html, className, as: Tag = 'div' }: HtmlContentProps) {
  const navigateToSection = useNavigateToSection()

  const parsed = useMemo(() => {
    const options: HTMLReactParserOptions = {
      replace(domNode) {
        if (!(domNode instanceof Element)) return
        const classes = domNode.attribs?.class || ''

        // Inline nav links / pills
        if (
          (domNode.name === 'button' || domNode.name === 'a') &&
          (classes.includes('inline-nav-link') || classes.includes('inline-nav-pill'))
        ) {
          const navTarget = domNode.attribs['data-nav']
          return (
            <button
              className={classes}
              onClick={() => { if (navTarget) navigateToSection(navTarget) }}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </button>
          )
        }

        // Step jump buttons
        if (domNode.name === 'button' && classes.includes('step-jump')) {
          const target = domNode.attribs['data-jump'] || domNode.attribs['data-nav']
          return (
            <button
              className={classes}
              data-jump={domNode.attribs['data-jump'] || undefined}
              data-nav={domNode.attribs['data-nav'] || undefined}
              style={domNode.attribs.style ? parseStyleString(domNode.attribs.style) : undefined}
              onClick={() => { if (target) navigateToSection(target) }}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </button>
          )
        }

        // TOC links
        if (classes.includes('toc-link')) {
          const tocId = domNode.attribs['data-toc']
          return (
            <a
              className={classes}
              data-toc={tocId}
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault()
                if (tocId) {
                  const el = document.getElementById(tocId)
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              {domToReact(domNode.children as DOMNode[], options)}
            </a>
          )
        }

        // Footnote refs — cursor style only; tooltip/click handled by FootnoteTooltip
        if (domNode.name === 'sup' && classes.includes('fn-ref')) {
          const dataAttrs: Record<string, string> = {}
          for (const [key, val] of Object.entries(domNode.attribs)) {
            if (key.startsWith('data-')) dataAttrs[key] = val
          }
          return (
            <sup className={classes} style={{ cursor: 'pointer' }} {...dataAttrs}>
              {domToReact(domNode.children as DOMNode[], options)}
            </sup>
          )
        }
      }
    }

    return parse(html, options)
  }, [html, navigateToSection])

  return (
    <Tag className={className}>
      {parsed}
    </Tag>
  )
}

/** Convert inline CSS string to React style object */
function parseStyleString(style: string): Record<string, string> {
  const result: Record<string, string> = {}
  style.split(';').forEach(pair => {
    const colonIdx = pair.indexOf(':')
    if (colonIdx === -1) return
    const key = pair.slice(0, colonIdx).trim()
    const val = pair.slice(colonIdx + 1).trim()
    if (key && val) {
      const camelKey = key.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
      result[camelKey] = val
    }
  })
  return result
}
