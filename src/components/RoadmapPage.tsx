import { useNavigate } from '@tanstack/react-router'
import { roadmapSteps } from '../data/roadmapSteps'
import { contentPages } from '../content/registry'
import { getNavTitle } from '../data/navigation'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { PrevNextNav } from './PrevNextNav'

const ciPageOrder = [
  'ci-overview', 'ci-linting', 'ci-build', 'ci-testing', 'ci-repo-maintenance',
]

const ciDescriptions: Record<string, string> = {
  'ci-overview': 'A CI pipeline runs automated checks every time you push code or open a pull request. GitHub Actions is the most common CI tool in the JS ecosystem.',
  'ci-linting': 'A linter (ESLint) and a formatter (Prettier) serve different purposes — understanding the difference matters for code quality.',
  'ci-build': 'This step compiles your TypeScript and bundles your package to verify the build succeeds.',
  'ci-testing': 'Testing in the JS ecosystem falls into several categories, and understanding when to use each is key to a good test suite.',
  'ci-repo-maintenance': 'As projects grow, dependencies drift, unused code accumulates, and package.json files get out of sync.',
}

const bonusPageOrder = ['storybook']

const bonusDescriptions: Record<string, string> = {
  storybook: 'Storybook is a tool for building and testing UI components in isolation — outside of your app. Think of it like a visual unit test lab for your UI.',
  architecture: 'An interactive guide to web tech stacks — explore each layer of a modified MERN stack and compare popular alternatives like LAMP, Django, and Rails.',
}

const jumpBtnCls = 'inline-flex items-center gap-1.5 text-sm font-bold text-white cursor-pointer bg-blue-500 dark:bg-blue-400 dark:text-slate-900 border-none font-sans py-2 px-3.5 rounded-lg transition-all duration-150 mt-1 shadow-md shadow-blue-500/25 hover:bg-blue-600 dark:hover:bg-blue-500 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-500/30'

function JumpButton({ jumpTo, children, style }: { jumpTo: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const navigateToSection = useNavigateToSection()
  return (
    <button className={jumpBtnCls} style={style} onClick={() => navigateToSection(jumpTo)}>
      {children}
    </button>
  )
}

function GuideJumpButton({ sectionId, guide, children }: { sectionId: string; guide: string; children: React.ReactNode }) {
  const navigate = useNavigate()
  return (
    <button
      className={jumpBtnCls}
      onClick={() => {
        navigate({ to: '/$sectionId', params: { sectionId }, search: { guide } })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      {children}
    </button>
  )
}

function BonusSubpage({ title, desc, jumpTo, jumpLabel }: { title: string; desc: string; jumpTo: string; jumpLabel: string }) {
  return (
    <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{title}</h3>
      <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">{desc}</div>
      <JumpButton jumpTo={jumpTo}>{'\u2192'} Deep dive: {jumpLabel}</JumpButton>
    </div>
  )
}

function BonusCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="step-card bonus-step flex gap-4 py-4.5 relative mt-7 pt-6 border-t-2 border-dashed border-slate-300 dark:border-slate-600">
      <div className="step-number bonus-number w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0 relative">{'\u2605'}</div>
      <div className="flex-1 min-w-0">
        <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{title}</div>
        {desc && <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">{desc}</div>}
        {children}
      </div>
    </div>
  )
}

export function RoadmapPage() {
  return (
    <>
      <div>
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Web App vs. NPM Package Guide</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-1">A guide for backend engineers stepping into the frontend world.</p>
          <p className="text-gray-400 dark:text-slate-500 text-sm mb-0">{'\u{1F4A1}'} Look for the green &quot;Explain it to me&quot; dropdowns for backend-friendly analogies.</p>
        </div>

        <h2 className="text-2xl font-bold mb-5 tracking-tight">{'\u{1F680}'} Building a Package: Step by Step</h2>
        <p className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-6">
          New to npm packages? Follow these steps in order. Each step links to a deeper explanation in the other tabs. This is the order you&apos;d actually set things up in a real project.
        </p>

        {roadmapSteps.map(step => (
          <div key={step.num} className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative last:border-b-0">
            <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">
              {step.num}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1" dangerouslySetInnerHTML={{ __html: step.title }} />
              <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: step.desc }} />
              <div className="step-detail text-xs text-gray-400 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800 rounded-lg py-2.5 px-3.5 mb-2 border border-slate-100 dark:border-slate-700" dangerouslySetInnerHTML={{ __html: step.detail }} />
              {step.jumpTo && (
                <JumpButton jumpTo={step.jumpTo}>
                  {'\u2192'} Deep dive: {getNavTitle(step.jumpTo)}
                </JumpButton>
              )}
              {step.substep && (
                <div className="mt-4 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{step.substep.title}</h3>
                  <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed">{step.substep.text}</div>
                  <JumpButton jumpTo={step.substep.jumpTo} style={{ marginTop: 4 }}>
                    {'\u2192'} Deep dive: {getNavTitle(step.substep.jumpTo)}
                  </JumpButton>
                </div>
              )}
            </div>
          </div>
        ))}

        <BonusCard title="Bonus: CI Pipeline & Checks" desc="Automate linting, build verification, and testing so they run on every push and pull request. A single YAML file can catch bugs before they're ever merged.">
          {ciPageOrder.map(id => {
            const page = contentPages.get(id)
            if (!page) return null
            return <BonusSubpage key={id} title={page.title} desc={ciDescriptions[id] ?? ''} jumpTo={page.id} jumpLabel={page.title} />
          })}
        </BonusCard>

        {bonusPageOrder.map(id => {
          const page = contentPages.get(id)
          if (!page) return null
          return (
            <BonusCard key={id} title="Bonus: Developer Experience">
              <BonusSubpage title={page.title} desc={bonusDescriptions[id] ?? ''} jumpTo={page.id} jumpLabel={page.title} />
            </BonusCard>
          )
        })}

        <BonusCard title="Bonus: Developer Experience">
          <BonusSubpage
            title={'\u{1F3D7}\uFE0F Architecture Guide'}
            desc={bonusDescriptions['architecture'] ?? ''}
            jumpTo="arch-start"
            jumpLabel={'\u{1F3D7}\uFE0F Architecture Guide'}
          />
        </BonusCard>

        <BonusCard title="Bonus: Learning Resources" desc="Documentation, articles, courses, and tools to go deeper on frontend development, npm packages, and the JavaScript ecosystem.">
          <BonusSubpage title={'\u2705 Publish Checklist'} desc="Go through this before every npm publish — trust us, it saves headaches." jumpTo="checklist" jumpLabel={'\u2705 Publish Checklist'} />
          <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{'\u{1F4DA}'} External Resources</h3>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">Curated documentation, articles, courses, tools, and section references — all in one searchable, sortable table.</div>
            <GuideJumpButton sectionId="external-resources" guide="npm-package">{'\u2192'} View with NPM Package filter</GuideJumpButton>
          </div>
          <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{'\u{1F4D6}'} Glossary</h3>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">Key terms you'll encounter when building and publishing npm packages, with links to the relevant sections in this guide.</div>
            <GuideJumpButton sectionId="glossary" guide="npm-package">{'\u2192'} View with NPM Package filter</GuideJumpButton>
          </div>
        </BonusCard>
      </div>
      <PrevNextNav currentId="roadmap" />
    </>
  )
}
