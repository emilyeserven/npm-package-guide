import { useRef, useEffect } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { FootnoteContext } from './mdx/FootnoteContext'
import { mdxComponents } from './mdx'
import { FootnotesMDX } from './Footnotes'
import { PrevNextNav } from './PrevNextNav'
import { enrichGlossaryTermsDOM } from '../helpers/glossaryEnrichDOM'
import type { ContentPage } from '../content/registry'

export function MDXPageWrapper({ page }: { page: ContentPage }) {
  const Content = page.component
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      enrichGlossaryTermsDOM(contentRef.current, page.id)
    }
  }, [page.id])

  return (
    <FootnoteContext.Provider value={page.links ?? []}>
      <MDXProvider components={mdxComponents}>
        <div ref={contentRef}>
          <Content />
        </div>
      </MDXProvider>
      {page.links && page.links.length > 0 && (
        <FootnotesMDX links={page.links} usedFootnotes={page.usedFootnotes} />
      )}
      <PrevNextNav currentId={page.id} />
    </FootnoteContext.Provider>
  )
}
