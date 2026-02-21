import { Command } from 'cmdk'
import { useNavigate } from '@tanstack/react-router'
import { getNavTitle } from '../data/navigation'
import { guides, checklistPages } from '../data/guideRegistry'
import { glossaryTerms } from '../data/glossaryTerms'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { parseTitle } from '../helpers/parseTitle'
import { STORYBOOK_URL } from '../data/navigation'
import { ExternalLinkIcon } from './ExternalLinkIcon'
import { useUIStore } from '../hooks/useUIStore'

// Severity badge lookup for Common AI Mistakes pages (replaces emoji in command menu)
const severityBadges: Record<string, { letter: string; cls: string }> = {
  'prompt-mistakes-logic': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-apis': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-react': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-security': { letter: 'H', cls: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' },
  'prompt-mistakes-structural': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-design': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-tailwind': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-testing': { letter: 'M', cls: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' },
  'prompt-mistakes-style': { letter: 'L', cls: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' },
}

function PageItem({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const title = getNavTitle(id)
  const { text, icon } = parseTitle(title)
  const badge = severityBadges[id]

  return (
    <Command.Item value={title} keywords={[id]} onSelect={() => onSelect(id)}>
      <span className="flex-1 min-w-0 truncate">{text}</span>
      {badge ? (
        <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold shrink-0 ${badge.cls}`}>{badge.letter}</span>
      ) : icon ? (
        <span className="text-base opacity-70 shrink-0">{icon}</span>
      ) : null}
    </Command.Item>
  )
}

export function CommandMenu() {
  const navigate = useNavigate()
  const navigateToSection = useNavigateToSection()
  const cmdMenuOpen = useUIStore((s) => s.cmdMenuOpen)
  const setCmdMenuOpen = useUIStore((s) => s.setCmdMenuOpen)

  const handleSelect = (id: string) => {
    setCmdMenuOpen(false)
    navigateToSection(id)
  }

  const handleHome = () => {
    setCmdMenuOpen(false)
    navigate({ to: '/' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGlossaryTerm = (term: string) => {
    setCmdMenuOpen(false)
    navigate({ to: '/$sectionId', params: { sectionId: 'glossary' }, search: { search: term } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Command.Dialog
      open={cmdMenuOpen}
      onOpenChange={setCmdMenuOpen}
      label="Navigate to page"
      loop
      overlayClassName="fixed inset-0 bg-slate-900/30 dark:bg-black/50 backdrop-blur-sm"
      contentClassName="fixed top-[20vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden"
    >
      <Command.Input placeholder="Search pages, glossary..." />
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
              {section.ids.map(id => (
                <PageItem key={id} id={id} onSelect={handleSelect} />
              ))}
            </Command.Group>
          ))
        )}

        <Command.Group heading="Checklists">
          {checklistPages.map(cp => (
            <PageItem key={cp.id} id={cp.id} onSelect={handleSelect} />
          ))}
        </Command.Group>

        <Command.Group heading="Resources">
          <PageItem id="external-resources" onSelect={handleSelect} />
          <PageItem id="glossary" onSelect={handleSelect} />
          <Command.Item
            value="Storybook"
            keywords={['storybook', 'components', 'stories']}
            onSelect={() => {
              setCmdMenuOpen(false)
              window.open(STORYBOOK_URL, '_blank', 'noopener,noreferrer')
            }}
          >
            <span className="flex-1 min-w-0 truncate">Storybook</span>
            <ExternalLinkIcon className="w-3.5 h-3.5 opacity-50 shrink-0" />
          </Command.Item>
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
                <span className="mr-2 text-base opacity-70 shrink-0">{'\u{1F4D6}'}</span>
                <span className="flex-1 min-w-0 truncate">{term.term}</span>
                <span className="ml-2 text-xs text-slate-400 dark:text-slate-500 shrink-0">{cat.category}</span>
              </Command.Item>
            ))
          )}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
