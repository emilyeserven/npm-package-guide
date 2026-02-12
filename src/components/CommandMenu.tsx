import { Command } from 'cmdk'
import { useNavigate } from '@tanstack/react-router'
import { getNavTitle } from '../data/navigation'
import { useNavigateToSection } from '../hooks/useNavigateToSection'

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const buildingPackageOrder = [
  'bigpicture', 'monorepo', 'npm-vs-pnpm',
  'build', 'tsconfig', 'deps', 'dist',
  'packagejson', 'typescript', 'versioning', 'workflow',
]

const ciOrder = [
  'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
]

const bonusOrder = ['storybook']

const resourceIds = ['checklist', 'external-resources', 'glossary']

function PageItem({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const title = getNavTitle(id)
  const match = title.match(/^(\S+)\s+(.+)$/)
  const icon = match ? match[1] : ''
  const text = match ? match[2] : title

  return (
    <Command.Item value={title} keywords={[id]} onSelect={() => onSelect(id)}>
      {icon && <span className="mr-2 text-base opacity-70">{icon}</span>}
      {text}
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
      overlayClassName="cmdk-overlay"
      contentClassName="cmdk-dialog"
    >
      <Command.Input placeholder="Search pages..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Item value="All Guides home" keywords={['home', 'index']} onSelect={handleHome}>
          <span className="mr-2 text-base opacity-70">{'\u{1F4CB}'}</span>
          All Guides
        </Command.Item>

        <Command.Group heading="Start Here">
          <PageItem id="roadmap" onSelect={handleSelect} />
        </Command.Group>

        <Command.Group heading="Building a Package">
          {buildingPackageOrder.map(id => (
            <PageItem key={id} id={id} onSelect={handleSelect} />
          ))}
        </Command.Group>

        <Command.Group heading="CI Pipeline & Checks">
          {ciOrder.map(id => (
            <PageItem key={id} id={id} onSelect={handleSelect} />
          ))}
        </Command.Group>

        <Command.Group heading="Developer Experience">
          {bonusOrder.map(id => (
            <PageItem key={id} id={id} onSelect={handleSelect} />
          ))}
        </Command.Group>

        <Command.Group heading="Learning Resources">
          {resourceIds.map(id => (
            <PageItem key={id} id={id} onSelect={handleSelect} />
          ))}
        </Command.Group>

        <Command.Group heading="Architecture Guide">
          <PageItem id="architecture" onSelect={handleSelect} />
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
