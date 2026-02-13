import { Fragment } from 'react'
import { Command } from 'cmdk'
import { useNavigate } from '@tanstack/react-router'
import { getNavTitle } from '../data/navigation'
import { guides, getPageHeadings } from '../data/guideRegistry'
import { glossaryTerms } from '../data/glossaryTerms'
import { overallResources } from '../data/overallResources'
import { useNavigateToSection } from '../hooks/useNavigateToSection'

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function PageItem({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const title = getNavTitle(id)
  const match = title.match(/^(.+)\s+([\u0080-\u{10FFFF}]+)$/u)
  const text = match ? match[1] : title
  const icon = match ? match[2] : ''

  return (
    <Command.Item value={title} keywords={[id]} onSelect={() => onSelect(id)}>
      <span>{text}</span>
      {icon && <span className="ml-2 text-base opacity-70">{icon}</span>}
    </Command.Item>
  )
}

function HeadingItem({ pageId, pageTitle, headingId, headingTitle, onSelect }: {
  pageId: string
  pageTitle: string
  headingId: string
  headingTitle: string
  onSelect: (pageId: string, anchorId: string) => void
}) {
  return (
    <Command.Item
      value={`${pageTitle} \u203A ${headingTitle}`}
      keywords={[pageId, headingId, headingTitle]}
      onSelect={() => onSelect(pageId, headingId)}
    >
      <span className="ml-4 text-slate-400 dark:text-slate-500">#</span>
      <span className="ml-1.5">{headingTitle}</span>
    </Command.Item>
  )
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const navigate = useNavigate()
  const navigateToSection = useNavigateToSection()

  const handleSelect = (id: string) => {
    onOpenChange(false)
    navigateToSection(id)
  }

  const handleHeadingSelect = (pageId: string, anchorId: string) => {
    onOpenChange(false)
    navigateToSection(pageId, anchorId)
  }

  const handleHome = () => {
    onOpenChange(false)
    navigate({ to: '/' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGlossaryTerm = (term: string) => {
    onOpenChange(false)
    navigate({ to: '/$sectionId', params: { sectionId: 'glossary' }, search: { search: term } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExternalResource = (url: string) => {
    onOpenChange(false)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Navigate to page"
      loop
      overlayClassName="fixed inset-0 bg-slate-900/30 dark:bg-black/50 backdrop-blur-sm"
      contentClassName="fixed top-[20vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden"
    >
      <Command.Input placeholder="Search pages, headings, glossary..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Item value="All Guides home" keywords={['home', 'index']} onSelect={handleHome}>
          <span className="mr-2 text-base opacity-70">{'\u{1F4CB}'}</span>
          All Guides
        </Command.Item>

        {guides.map(guide =>
          guide.sections.map((section, sIdx) => (
            <Command.Group
              key={`${guide.id}-${sIdx}`}
              heading={section.label ? `${guide.title} \u203A ${section.label}` : guide.title}
            >
              {section.ids.map(id => {
                const headings = getPageHeadings(id)
                const pageTitle = getNavTitle(id)
                return (
                  <Fragment key={id}>
                    <PageItem id={id} onSelect={handleSelect} />
                    {headings.map(h => (
                      <HeadingItem
                        key={`${id}-${h.id}`}
                        pageId={id}
                        pageTitle={pageTitle}
                        headingId={h.id}
                        headingTitle={h.title}
                        onSelect={handleHeadingSelect}
                      />
                    ))}
                  </Fragment>
                )
              })}
            </Command.Group>
          ))
        )}

        <Command.Group heading="Resources">
          <PageItem id="external-resources" onSelect={handleSelect} />
          <PageItem id="glossary" onSelect={handleSelect} />
        </Command.Group>

        <Command.Group heading="Glossary">
          {glossaryTerms.flatMap(cat =>
            cat.terms.map(term => (
              <Command.Item
                key={`glossary-${term.term}`}
                value={`Glossary: ${term.term}`}
                keywords={[term.term, cat.category, 'glossary', 'definition']}
                onSelect={() => handleGlossaryTerm(term.term)}
              >
                <span className="mr-2 text-base opacity-70">{'\u{1F4D6}'}</span>
                <span>{term.term}</span>
                <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">{cat.category}</span>
              </Command.Item>
            ))
          )}
        </Command.Group>

        <Command.Group heading="External Resources">
          {overallResources.flatMap(group =>
            group.items.map(item => (
              <Command.Item
                key={`resource-${item.name}`}
                value={`Resource: ${item.name}`}
                keywords={[item.name, ...item.tags, group.category, 'resource', 'external']}
                onSelect={() => handleExternalResource(item.url)}
              >
                <span className="mr-2 text-base opacity-70">{'\u{1F517}'}</span>
                <span>{item.name}</span>
                <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">{group.category}</span>
              </Command.Item>
            ))
          )}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
