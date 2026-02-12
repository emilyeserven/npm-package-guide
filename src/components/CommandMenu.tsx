import { Command } from 'cmdk'
import { useNavigate } from '@tanstack/react-router'
import { getNavTitle } from '../data/navigation'
import { guides } from '../data/guideRegistry'
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
      <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
      {icon && <span className="ml-2 text-base opacity-70 shrink-0">{icon}</span>}
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

  const handleHome = () => {
    onOpenChange(false)
    navigate({ to: '/' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
      <Command.Input placeholder="Search pages..." />
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

        <Command.Group heading="Resources">
          <PageItem id="external-resources" onSelect={handleSelect} />
          <PageItem id="glossary" onSelect={handleSelect} />
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
