import { useNavigate } from '@tanstack/react-router'
import { guides, getStartPageData } from '../../data/guideRegistry'
import { contentPages } from '../../content/registry'
import { getNavTitle } from '../../data/navigation'
import { JumpButton, jumpBtnCls } from '../JumpButton'
import { RoadmapSteps } from './npm-package/RoadmapSteps'
import type { StartPageStep, StartPageSubItem } from '../../data/guideTypes'

function GuideFilterButton({ sectionId, guideId, children }: { sectionId: string; guideId: string; children: React.ReactNode }) {
  const navigate = useNavigate()
  return (
    <button
      className={jumpBtnCls}
      onClick={() => {
        navigate({ to: '/$sectionId', params: { sectionId }, search: { guide: guideId } })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      {children}
    </button>
  )
}

function SubItem({ item, guideId }: { item: StartPageSubItem; guideId: string }) {
  return (
    <div className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{item.title}</h3>
      <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">{item.description}</div>
      {item.tags && (
        <div className="mb-1" />
      )}
      {item.jumpType === 'guide-filter' ? (
        <GuideFilterButton sectionId={item.jumpTo} guideId={guideId}>
          {'\u2192'} View with filter
        </GuideFilterButton>
      ) : (
        <JumpButton jumpTo={item.jumpTo}>{'\u2192'} Deep dive: {item.title}</JumpButton>
      )}
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
        <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{step.title}</div>
        <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">{step.description}</div>
        {step.jumpTo && (
          <JumpButton jumpTo={step.jumpTo}>
            {'\u2192'} Deep dive: {getNavTitle(step.jumpTo)}
          </JumpButton>
        )}
        <SectionSubItems step={step} guide={guide} />
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
    </div>
  )
}
