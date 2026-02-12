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

const resourceIds = ['checklist']

const topLevelResourceIds = ['external-resources', 'glossary']

const archStackOrder = [
  'arch-stack-mern', 'arch-stack-pfrn', 'arch-stack-mean',
  'arch-stack-lamp', 'arch-stack-django', 'arch-stack-rails',
]

const promptMistakesOrder = [
  'prompt-mistakes-logic', 'prompt-mistakes-apis', 'prompt-mistakes-structural', 'prompt-mistakes-style',
]

const promptCtxOrder = [
  'prompt-ctx-system-prompt', 'prompt-ctx-claude-md', 'prompt-ctx-chaining',
  'prompt-ctx-few-shot', 'prompt-ctx-window', 'prompt-ctx-thinking',
]

const archFrameworkOrder = [
  'arch-fw-nextjs', 'arch-fw-react-router', 'arch-fw-tanstack-start', 'arch-fw-remix',
]

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
          <PageItem id="arch-start" onSelect={handleSelect} />
          <PageItem id="arch-what-is-a-stack" onSelect={handleSelect} />
        </Command.Group>

        <Command.Group heading="Stack Alternatives">
          {archStackOrder.map(id => (
            <PageItem key={id} id={id} onSelect={handleSelect} />
          ))}
        </Command.Group>

        <Command.Group heading="Full-Stack Frameworks">
          <PageItem id="arch-frameworks-intro" onSelect={handleSelect} />
          {archFrameworkOrder.map(id => (
            <PageItem key={id} id={id} onSelect={handleSelect} />
          ))}
        </Command.Group>

        <Command.Group heading="Putting It Together">
          <PageItem id="arch-how-it-connects" onSelect={handleSelect} />
        </Command.Group>

        <Command.Group heading="Prompt Engineering">
          <PageItem id="prompt-start" onSelect={handleSelect} />
        </Command.Group>

        <Command.Group heading="Common AI Mistakes">
          {promptMistakesOrder.map(id => (
            <PageItem key={id} id={id} onSelect={handleSelect} />
          ))}
        </Command.Group>

        <Command.Group heading="Context Management">
          {promptCtxOrder.map(id => (
            <PageItem key={id} id={id} onSelect={handleSelect} />
          ))}
        </Command.Group>

        <Command.Group heading="CLI Reference">
          <PageItem id="prompt-cli-reference" onSelect={handleSelect} />
        </Command.Group>

        <Command.Group heading="Resources">
          {topLevelResourceIds.map(id => (
            <PageItem key={id} id={id} onSelect={handleSelect} />
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
