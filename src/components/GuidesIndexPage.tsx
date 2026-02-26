import { useState, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { guides, checklistPages } from '../data/guideRegistry'
import { getNavTitle } from '../data/navigation'
import { parseTitle } from '../helpers/parseTitle'
import { STORYBOOK_URL } from '../data/navigation'
import { ExternalLinkIcon } from './ExternalLinkIcon'
import type { GuideCategory, GuideDefinition } from '../data/guideTypes'
import { GUIDE_CATEGORY_LABELS } from '../data/guideTypes'

interface ResourceTile {
  sectionId: string
  icon: string
  title: string
  description: string
}

const resources: ResourceTile[] = [
  {
    sectionId: 'external-resources',
    icon: '\u{1F4DA}',
    title: 'External Resources',
    description:
      'Curated documentation, articles, courses, tools, and section references — all in one searchable, filterable table.',
  },
  {
    sectionId: 'glossary',
    icon: '\u{1F4D6}',
    title: 'Glossary',
    description:
      'Key terms you\'ll encounter across all guides, with links to relevant sections and external documentation.',
  },
]

type SortOption = 'default' | 'title-asc' | 'title-desc' | 'pages-desc' | 'pages-asc'
  | 'newest' | 'oldest' | 'updated-desc' | 'updated-asc'

const SORT_LABELS: Record<SortOption, string> = {
  default: 'Default',
  'title-asc': 'Title A\u2013Z',
  'title-desc': 'Title Z\u2013A',
  'pages-desc': 'Most Pages',
  'pages-asc': 'Fewest Pages',
  'newest': 'Newest First',
  'oldest': 'Oldest First',
  'updated-desc': 'Recently Updated',
  'updated-asc': 'Least Recently Updated',
}

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${SHORT_MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`
}

function getPageCount(guide: GuideDefinition): number {
  return guide.sections.reduce((sum, s) => sum + s.ids.length, 0)
}

const ALL_CATEGORIES = Object.keys(GUIDE_CATEGORY_LABELS) as GuideCategory[]

export function GuidesIndexPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<GuideCategory | null>(null)
  const [sort, setSort] = useState<SortOption>('default')

  const filterAndSort = useMemo(() => {
    return (list: GuideDefinition[]) => {
      let filtered = list

      // Text search
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        filtered = filtered.filter(
          g => g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q),
        )
      }

      // Category filter
      if (activeCategory) {
        filtered = filtered.filter(g => g.category === activeCategory)
      }

      // Sort
      if (sort !== 'default') {
        filtered = [...filtered].sort((a, b) => {
          switch (sort) {
            case 'title-asc':
              return a.title.localeCompare(b.title)
            case 'title-desc':
              return b.title.localeCompare(a.title)
            case 'pages-desc':
              return getPageCount(b) - getPageCount(a)
            case 'pages-asc':
              return getPageCount(a) - getPageCount(b)
            case 'newest':
              return b.dateCreated.localeCompare(a.dateCreated)
            case 'oldest':
              return a.dateCreated.localeCompare(b.dateCreated)
            case 'updated-desc':
              return b.dateModified.localeCompare(a.dateModified)
            case 'updated-asc':
              return a.dateModified.localeCompare(b.dateModified)
            default:
              return 0
          }
        })
      }

      return filtered
    }
  }, [search, activeCategory, sort])

  const multiPageGuides = useMemo(() => filterAndSort(guides.filter(g => !g.singlePage)), [filterAndSort])
  const singlePageGuides = useMemo(() => filterAndSort(guides.filter(g => g.singlePage)), [filterAndSort])

  const hasActiveFilters = search.trim() !== '' || activeCategory !== null
  const noResults = multiPageGuides.length === 0 && singlePageGuides.length === 0

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Dev Guides</h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm">
          Practical guides for backend engineers stepping into the frontend world.
        </p>
        <p className="text-xs text-gray-400 dark:text-slate-500 italic mt-2">
          This app is largely vibe-coded (AI-assisted) but regularly reviewed for accuracy. Content is opinionated and based on personal experience.
        </p>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-col gap-3 mt-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search guides..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortOption)}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 cursor-pointer"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
              activeCategory === null
                ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
              }`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              {GUIDE_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* No results message */}
      {hasActiveFilters && noResults && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          <p className="text-sm">No guides match your filters.</p>
          <button
            className="mt-2 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={() => { setSearch(''); setActiveCategory(null) }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Multi-page guides */}
      {multiPageGuides.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
          {multiPageGuides.map((guide) => (
            <button
              key={guide.id}
              className="flex flex-col items-start text-left p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
              onClick={() =>
                navigate({
                  to: '/$sectionId',
                  params: { sectionId: guide.startPageId },
                })
              }
            >
              <div className="flex items-start justify-between w-full mb-3">
                <span className="text-3xl w-9 h-9 flex items-center justify-center">{guide.icon}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {getPageCount(guide)} pages
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                    {GUIDE_CATEGORY_LABELS[guide.category]}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2 text-[11px] text-slate-400 dark:text-slate-500">
                <span>Created {formatShortDate(guide.dateCreated)}</span>
                {guide.dateModified !== guide.dateCreated && (
                  <span>Updated {formatShortDate(guide.dateModified)}</span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {guide.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {guide.description}
              </p>
            </button>
          ))}

          {!hasActiveFilters && (
            <div className="flex flex-col items-start text-left p-6 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl">
              <span className="text-3xl mb-3 w-9 h-9 flex items-center justify-center">{'\u{1F6A7}'}</span>
              <h2 className="text-2xl font-bold text-slate-400 dark:text-slate-500 mb-2">
                More to come...
              </h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
                Additional guides are in the works. Stay tuned!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Single Page Guides section */}
      {singlePageGuides.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-1 text-slate-900 dark:text-slate-100">Single Page Guides</h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-5">
            Focused, standalone tutorials on specific topics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {singlePageGuides.map((guide) => (
              <button
                key={guide.id}
                className="flex flex-col items-start text-left p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
                onClick={() =>
                  navigate({
                    to: '/$sectionId',
                    params: { sectionId: guide.startPageId },
                  })
                }
              >
                <span className="text-2xl mb-2 w-7 h-7 flex items-center justify-center">{guide.icon}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {guide.title}
                </h3>
                <div className="flex items-center gap-3 mb-1 text-[11px] text-slate-400 dark:text-slate-500">
                  <span>Created {formatShortDate(guide.dateCreated)}</span>
                  {guide.dateModified !== guide.dateCreated && (
                    <span>Updated {formatShortDate(guide.dateModified)}</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {guide.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Checklists section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-1 text-slate-900 dark:text-slate-100">Checklists</h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-5">
          Implementation checklists extracted from individual guides.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {checklistPages.map((cp) => {
            const title = getNavTitle(cp.id)
            const { text, icon } = parseTitle(title)
            return (
              <button
                key={cp.id}
                className="flex flex-col items-start text-left p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
                onClick={() =>
                  navigate({
                    to: '/$sectionId',
                    params: { sectionId: cp.id },
                  })
                }
              >
                <span className="text-2xl mb-2 w-7 h-7 flex items-center justify-center">{icon}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {text}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  From the {guides.find(g => g.id === cp.sourceGuideId)?.title ?? cp.sourceGuideId} guide.
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Resources section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-1 text-slate-900 dark:text-slate-100">Resources</h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-5">
          Cross-guide references and learning materials.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <button
              key={resource.sectionId}
              className="flex flex-col items-start text-left p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
              onClick={() =>
                navigate({
                  to: '/$sectionId',
                  params: { sectionId: resource.sectionId },
                })
              }
            >
              <span className="text-2xl mb-2 w-7 h-7 flex items-center justify-center">{resource.icon}</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                {resource.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {resource.description}
              </p>
            </button>
          ))}
          <a
            href={STORYBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start text-left p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-all duration-150 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 no-underline"
          >
            <span className="text-2xl mb-2 w-7 h-7 flex items-center justify-center">{'\u{1F3A8}'}</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
              Storybook
              <ExternalLinkIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Browse interactive component stories for this app — built with Storybook.
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}
