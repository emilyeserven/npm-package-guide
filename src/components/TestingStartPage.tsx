import { contentPages } from '../content/registry'
import { PYRAMID_LEVELS } from '../data/testingData'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { PrevNextNav } from './PrevNextNav'

const jumpBtnCls = 'inline-flex items-center gap-1.5 text-sm font-bold text-white cursor-pointer bg-blue-500 dark:bg-blue-400 dark:text-slate-900 border-none font-sans py-2 px-3.5 rounded-lg transition-all duration-150 mt-1 shadow-md shadow-blue-500/25 hover:bg-blue-600 dark:hover:bg-blue-500 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-500/30'

function JumpButton({ jumpTo, children }: { jumpTo: string; children: React.ReactNode }) {
  const navigate = useNavigateToSection()
  return (
    <button className={jumpBtnCls} onClick={() => navigate(jumpTo)}>
      {children}
    </button>
  )
}

export function TestingStartPage() {
  const overviewPage = contentPages.get('test-overview')
  const overviewLabel = overviewPage?.title ?? '\uD83D\uDD3A Testing Pyramid'
  const comparisonPage = contentPages.get('test-comparison')
  const comparisonLabel = comparisonPage?.title ?? '\uD83D\uDCCA At a Glance'
  const practicesPage = contentPages.get('test-best-practices')
  const practicesLabel = practicesPage?.title ?? '\u2705 Best Practices'
  const checklistPage = contentPages.get('test-review-checklist')
  const checklistLabel = checklistPage?.title ?? '\uD83D\uDCCB Quick Test Review'
  const toolsPage = contentPages.get('test-tools')
  const toolsLabel = toolsPage?.title ?? '\uD83E\uDDF0 Popular Tools'

  return (
    <>
      <div>
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Testing Guide</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-1">Unit · Component · End-to-End &mdash; from fundamentals to fast reviews.</p>
          <p className="text-gray-400 dark:text-slate-500 text-sm mb-0">{'\uD83D\uDCA1'} Designed for backend engineers who know testing concepts but are new to frontend testing tools.</p>
        </div>

        <h2 className="text-2xl font-bold mb-5 tracking-tight">{'\uD83D\uDCDA'} Learning Path</h2>

        {/* Step 1: Testing Pyramid */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">1</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">The Testing Pyramid</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Understand the three levels of testing, how they relate to each other, and the ideal ratio for your test suite.</div>
            <JumpButton jumpTo="test-overview">{'\u2192'} Deep dive: {overviewLabel}</JumpButton>
          </div>
        </div>

        {/* Bonus: Deep Dives by Test Type */}
        <div className="step-card bonus-step flex gap-4 py-4.5 relative mt-7 pt-6 border-t-2 border-dashed border-slate-300 dark:border-slate-600">
          <div className="step-number bonus-number w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0 relative">{'\u2605'}</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Deep Dives by Test Type</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Explore each test type in detail &mdash; what to test, what to avoid, and real code examples.</div>
            {PYRAMID_LEVELS.slice().reverse().map((level) => {
              const page = contentPages.get(level.pageId)
              const title = page?.title ?? level.label
              return (
                <div key={level.id} className="mt-4.5 py-2 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{title}</h3>
                  <div className="text-sm text-slate-800 dark:text-slate-300 leading-normal mb-1">{level.subtitle} &mdash; learn what to test, what not to test, and see a full code example.</div>
                  <JumpButton jumpTo={level.pageId}>{'\u2192'} Deep dive: {title}</JumpButton>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 2: At a Glance */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative mt-7">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">2</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">At a Glance</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">A side-by-side comparison table of speed, scope, flakiness, and recommended tools for each test type.</div>
            <JumpButton jumpTo="test-comparison">{'\u2192'} Deep dive: {comparisonLabel}</JumpButton>
          </div>
        </div>

        {/* Step 3: Best Practices */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">3</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Best Practices</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">Concrete do&apos;s and don&apos;ts for writing tests that are maintainable, reliable, and useful during code review.</div>
            <JumpButton jumpTo="test-best-practices">{'\u2192'} Deep dive: {practicesLabel}</JumpButton>
          </div>
        </div>

        {/* Step 4: Quick Test Review */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">4</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Quick Test Review</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">An interactive checklist for reviewing test code in pull requests &mdash; the 10 things to scan for first.</div>
            <JumpButton jumpTo="test-review-checklist">{'\u2192'} Deep dive: {checklistLabel}</JumpButton>
          </div>
        </div>

        {/* Step 5: Popular Tools */}
        <div className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative last:border-b-0">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">5</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Popular Tools</div>
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">A filterable directory of the most popular testing tools in the React ecosystem, with guidance on when to use each one.</div>
            <JumpButton jumpTo="test-tools">{'\u2192'} Deep dive: {toolsLabel}</JumpButton>
          </div>
        </div>
      </div>
      <PrevNextNav currentId="test-start" />
    </>
  )
}
