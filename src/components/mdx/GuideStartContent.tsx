import { useNavigate } from '@tanstack/react-router'
import { guides, getStartPageData, checklistPages } from '../../data/guideRegistry'
import { contentPages } from '../../content/registry'
import { getNavTitle } from '../../data/navigation'
import { RoadmapSteps } from './npm-package/RoadmapSteps'
import type { GuideDefinition, StartPageStep, StartPageSubItem } from '../../data/guideTypes'
import { parseTitle } from '../../helpers/parseTitle'
import { useNavigateToSection } from '../../hooks/useNavigateToSection'

function SubItem({ item, guideId }: { item: StartPageSubItem; guideId: string }) {
  const navigateToSection = useNavigateToSection()
  const navigate = useNavigate()

  const handleClick = () => {
    if (item.jumpType === 'guide-filter') {
      navigate({ to: '/$sectionId', params: { sectionId: item.jumpTo }, search: { guide: guideId } })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigateToSection(item.jumpTo)
    }
  }

  return (
    <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
      <h3
        className="text-xl font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
        onClick={handleClick}
      >
        {item.title} <span className="text-blue-500 dark:text-blue-400">{'\u2192'}</span>
      </h3>
      <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">{item.description}</div>
      {item.tags && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
            <span key={tag.name} className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {tag.icon} {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function SectionSubItems({ step, guide }: { step: StartPageStep; guide: { id: string; sections: { label: string | null; ids: string[] }[] } }) {
  if (step.sectionLabel) {
    const section = guide.sections.find(s => s.label === step.sectionLabel)
    if (section) {
      return (
        <>
          {section.ids.map(pageId => {
            const page = contentPages.get(pageId)
            const title = page?.title ?? getNavTitle(pageId)
            const desc = step.subItemDescriptions?.[pageId] ?? ''
            return (
              <SubItem
                key={pageId}
                item={{ title, description: desc, jumpTo: pageId }}
                guideId={guide.id}
              />
            )
          })}
        </>
      )
    }
  }

  if (step.customSubItems) {
    return (
      <>
        {step.customSubItems.map(item => (
          <SubItem key={item.jumpTo} item={item} guideId={guide.id} />
        ))}
      </>
    )
  }

  return null
}

function StepCard({ step, guide }: { step: StartPageStep; guide: { id: string; sections: { label: string | null; ids: string[] }[] } }) {
  const navigateToSection = useNavigateToSection()

  if (step.type === 'bonus') {
    return (
      <div className="step-card bonus-step flex gap-4 py-4.5 relative mt-7 pt-6 border-t-2 border-dashed border-slate-300 dark:border-slate-600">
        <div className="step-number bonus-number w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0 relative">{'\u2605'}</div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{step.title}</div>
          {step.description && (
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">{step.description}</div>
          )}
          <SectionSubItems step={step} guide={guide} />
        </div>
      </div>
    )
  }

  // Numbered step
  return (
    <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative">
      <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">
        {step.num}
      </div>
      <div className="flex-1 min-w-0">
        {step.jumpTo ? (
          <div
            className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
            onClick={() => navigateToSection(step.jumpTo!)}
          >
            {step.title} <span className="text-blue-500 dark:text-blue-400">{'\u2192'}</span>
          </div>
        ) : (
          <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{step.title}</div>
        )}
        <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">{step.description}</div>
        <SectionSubItems step={step} guide={guide} />
      </div>
    </div>
  )
}

const tileCls = 'flex flex-col items-start text-left p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5'
const comingSoonCls = 'flex flex-col items-start text-left p-5 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl'

function GuideStartResources({ guideId }: { guideId: string }) {
  const navigate = useNavigate()
  const checklist = checklistPages.find(cp => cp.sourceGuideId === guideId)
  const checklistTitle = checklist
    ? parseTitle(contentPages.get(checklist.id)?.title ?? getNavTitle(checklist.id))
    : null

  return (
    <div className="mt-7 pt-6 border-t-2 border-dashed border-slate-300 dark:border-slate-600">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{'\u{1F4CC}'} Resources</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          className={tileCls}
          onClick={() => {
            navigate({ to: '/$sectionId', params: { sectionId: 'external-resources' }, search: { guide: guideId } })
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="text-2xl mb-2 w-7 h-7 flex items-center justify-center">{'\u{1F4DA}'}</span>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">External Resources</span>
          <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Curated documentation, articles, and tools.</span>
        </button>
        <button
          className={tileCls}
          onClick={() => {
            navigate({ to: '/$sectionId', params: { sectionId: 'glossary' }, search: { guide: guideId } })
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="text-2xl mb-2 w-7 h-7 flex items-center justify-center">{'\u{1F4D6}'}</span>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">Glossary</span>
          <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Key terms with links to guide pages and docs.</span>
        </button>
        {checklist && checklistTitle ? (
          <button
            className={tileCls}
            onClick={() => {
              navigate({ to: '/$sectionId', params: { sectionId: checklist.id } })
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="text-2xl mb-2 w-7 h-7 flex items-center justify-center">{'\u2705'}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">{checklistTitle.text}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Interactive checklist for this guide.</span>
          </button>
        ) : (
          <div className={comingSoonCls}>
            <span className="text-2xl mb-2 w-7 h-7 flex items-center justify-center">{'\u2705'}</span>
            <span className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-1">Checklist</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">Coming soon.</span>
          </div>
        )}
      </div>
    </div>
  )
}

function GuideStartRelatedGuides({ guideIds }: { guideIds: string[] }) {
  const navigateToSection = useNavigateToSection()
  const relatedGuides = guideIds
    .map(id => guides.find(g => g.id === id))
    .filter((g): g is GuideDefinition => g !== undefined)

  if (relatedGuides.length === 0) return null

  return (
    <div className="mt-7 pt-6 border-t-2 border-dashed border-slate-300 dark:border-slate-600">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{'\u{1F9ED}'} Related Guides</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {relatedGuides.map(g => (
          <button
            key={g.id}
            className={tileCls}
            onClick={() => navigateToSection(g.startPageId)}
          >
            <span className="text-2xl mb-2 w-7 h-7 flex items-center justify-center">{g.icon}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">{g.title}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{g.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function GuideStartContent({ guideId }: { guideId: string }) {
  const guide = guides.find(g => g.id === guideId)
  const startData = getStartPageData(guideId)
  if (!guide || !startData) return null

  const headingText = startData.headingText ?? '\u{1F4DA} Learning Path'

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{guide.title}</h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-1">{startData.subtitle}</p>
        <p className="text-gray-400 dark:text-slate-500 text-sm mb-0">{'\u{1F4A1}'} {startData.tip}</p>
      </div>

      <h2 className="text-2xl font-bold mb-5 tracking-tight">{headingText}</h2>
      {startData.headingDescription && (
        <p className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-6">{startData.headingDescription}</p>
      )}

      {/* NPM Package guide: render roadmap steps before bonus sections */}
      {guideId === 'npm-package' && <RoadmapSteps />}

      {startData.steps.map((step, i) => (
        <StepCard key={i} step={step} guide={guide} />
      ))}

      {startData.relatedGuides && startData.relatedGuides.length > 0 && (
        <GuideStartRelatedGuides guideIds={startData.relatedGuides} />
      )}

      <GuideStartResources guideId={guideId} />
    </div>
  )
}
