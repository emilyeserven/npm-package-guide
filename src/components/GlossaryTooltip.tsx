import clsx from 'clsx'
import { getNavTitle } from '../data/navigation'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { useHoverTooltip } from '../hooks/useHoverTooltip'
import { ExternalLinkIcon } from './ExternalLinkIcon'

interface GlossaryData {
  term: string
  def: string
  url: string
  source: string
  sectionId?: string
}

const extractData = (el: HTMLElement): GlossaryData => ({
  term: el.dataset.glossaryTerm || '',
  def: el.dataset.glossaryDef || '',
  url: el.dataset.glossaryUrl || '',
  source: el.dataset.glossarySource || '',
  sectionId: el.dataset.glossarySection || undefined,
})

export function GlossaryTooltip() {
  const navigateToSection = useNavigateToSection()
  const { data, visible, style, cancelHide, scheduleHide, hide } = useHoverTooltip<GlossaryData>({
    selector: '.glossary-term',
    extractData,
    width: 340,
    preferAbove: false,
    tooltipClass: 'gt-tooltip',
  })

  if (!data || !style) return null

  return (
    <div
      role="tooltip"
      className={clsx(
        'gt-tooltip fixed z-[1200] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg text-[13px] leading-relaxed text-slate-800 dark:text-slate-300 transition-[opacity,translate] duration-150',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-1 pointer-events-none'
      )}
      style={{ ...style, width: '340px' }}
      onMouseEnter={cancelHide}
      onMouseLeave={scheduleHide}
    >
      <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{data.term}</div>
      <div className="text-slate-700 dark:text-slate-300 mb-2">{data.def}</div>
      <div className="flex items-center gap-2.5 flex-wrap">
        <a
          className="inline-flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400 no-underline font-medium hover:underline"
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.source} docs{' '}
          <ExternalLinkIcon className="w-3 h-3 align-middle shrink-0" />
        </a>
        {data.sectionId && (
          <button
            className="inline-flex items-center text-xs text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-none rounded-full px-2.5 py-0.5 cursor-pointer font-medium whitespace-nowrap hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors duration-150"
            onClick={() => {
              hide()
              navigateToSection(data.sectionId!)
            }}
          >
            → {getNavTitle(data.sectionId)}
          </button>
        )}
      </div>
    </div>
  )
}
