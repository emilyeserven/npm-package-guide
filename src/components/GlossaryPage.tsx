import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
} from '@tanstack/react-table'
import type { SortingState } from '@tanstack/react-table'
import clsx from 'clsx'
import parse from 'html-react-parser'
import { glossaryTerms } from '../data/glossaryTerms'
import type { GlossaryTerm } from '../data/glossaryTerms'
import { linkById } from '../data/linkRegistry'
import { getNavTitle } from '../data/navigation'
import { getGuideForPage } from '../data/guideRegistry'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { useSidebarPin } from '../hooks/useSidebarPin'
import { badgeBase, badgeMap } from '../data/overallResources'
import { DataTable } from './DataTable'
import { ExternalLinkIcon } from './ExternalLinkIcon'

interface ResolvedLink {
  url: string
  source: string
}

interface ResolvedInternalLink {
  sectionId: string
  title: string
}

interface FlatGlossaryRow extends GlossaryTerm {
  category: string
  guideIds: string[]
  externalLinks: ResolvedLink[]
  internalLinks: ResolvedInternalLink[]
}

function deriveGuides(term: GlossaryTerm): string[] {
  if (term.guides && term.guides.length > 0) return term.guides
  if (!term.sectionId) return ['npm-package']
  return [getGuideForPage(term.sectionId)?.id ?? 'npm-package']
}

const flatData: FlatGlossaryRow[] = glossaryTerms.flatMap(group =>
  group.terms.map(t => {
    const allLinkIds = [t.linkId, ...(t.linkIds ?? [])]
    const seen = new Set<string>()
    const externalLinks: ResolvedLink[] = []
    for (const id of allLinkIds) {
      if (seen.has(id)) continue
      seen.add(id)
      const link = linkById.get(id)
      if (link) externalLinks.push({ url: link.url, source: link.source })
    }

    const allSectionIds = [...(t.sectionId ? [t.sectionId] : []), ...(t.sectionIds ?? [])]
    const seenSections = new Set<string>()
    const internalLinks: ResolvedInternalLink[] = []
    for (const id of allSectionIds) {
      if (seenSections.has(id)) continue
      seenSections.add(id)
      internalLinks.push({ sectionId: id, title: getNavTitle(id) })
    }

    return {
      ...t,
      category: group.category,
      guideIds: deriveGuides(t),
      externalLinks,
      internalLinks,
    }
  })
)

const categories = glossaryTerms.map(g => g.category)

function categoryToKey(cat: string): string {
  return `cat:${cat.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`
}

const guideTagList = ['guide:npm-package', 'guide:architecture', 'guide:testing', 'guide:prompt-engineering', 'guide:ci-cd', 'guide:auth', 'guide:kubernetes', 'guide:ai-infra', 'guide:nextjs-abstractions', 'guide:wp-agents']

const columnHelper = createColumnHelper<FlatGlossaryRow>()

interface GlossaryPageProps {
  initialGuide?: string
  initialSearch?: string
}

export function GlossaryPage({ initialGuide, initialSearch }: GlossaryPageProps) {
  const navigateToSection = useNavigateToSection()
  const { effectivelyPinned } = useSidebarPin()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState(initialSearch ?? '')
  const [wideMode, setWideMode] = useState(false)
  const [guideFilter, setGuideFilter] = useState<string[]>(
    () => initialGuide ? [`guide:${initialGuide}`] : []
  )
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])

  const filteredData = useMemo(() => {
    let data = flatData
    if (guideFilter.length > 0) {
      data = data.filter(row => guideFilter.some(g => row.guideIds.some(gi => g === `guide:${gi}`)))
    }
    if (categoryFilter.length > 0) {
      data = data.filter(row => categoryFilter.some(c => c === categoryToKey(row.category)))
    }
    return data
  }, [guideFilter, categoryFilter])

  const columns = useMemo(() => [
    columnHelper.accessor('term', {
      header: 'Term',
      cell: info => <strong>{info.getValue()}</strong>,
      sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('definition', {
      header: 'Definition',
      cell: info => {
        const row = info.row.original
        const useBullets = row.externalLinks.length > 1 || row.internalLinks.length > 1

        return (
          <div>
            <span>{parse(row.definition)}</span>
            {useBullets ? (
              <ul className="mt-1.5 list-disc pl-4 m-0 space-y-0.5">
                {row.externalLinks.map((link, i) => (
                  <li key={`ext-${i}`}>
                    <a
                      className="text-xs text-blue-600 dark:text-blue-400 no-underline hover:underline"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.source} docs<ExternalLinkIcon className="w-3 h-3 inline-block align-middle ml-0.5" />
                    </a>
                  </li>
                ))}
                {row.internalLinks.map((link, i) => (
                  <li key={`int-${i}`}>
                    <button
                      className="inline-nav-link text-xs bg-transparent border-none cursor-pointer p-0"
                      onClick={() => navigateToSection(link.sectionId)}
                    >
                      → {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                {row.externalLinks.map((link, i) => (
                  <a
                    key={`ext-${i}`}
                    className="text-xs text-blue-600 dark:text-blue-400 no-underline hover:underline"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.source} docs<ExternalLinkIcon className="w-3 h-3 inline-block align-middle ml-0.5" />
                  </a>
                ))}
                {row.internalLinks.map((link, i) => (
                  <button
                    key={`int-${i}`}
                    className="inline-nav-link text-xs bg-transparent border-none cursor-pointer p-0"
                    onClick={() => navigateToSection(link.sectionId)}
                  >
                    → {link.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      },
      enableSorting: false,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => {
        const row = info.row.original
        const catKey = categoryToKey(row.category)
        const catBadge = badgeMap[catKey]

        return (
          <div className="flex flex-col items-start gap-1.5">
            {catBadge ? (
              <span className={`${badgeBase} ${catBadge.cls}`}>{catBadge.label}</span>
            ) : (
              <span className="text-sm">{row.category}</span>
            )}
            <div className="flex flex-wrap gap-1">
              {row.guideIds.map(gid => {
                const badge = badgeMap[`guide:${gid}`]
                return badge
                  ? <span key={gid} className={`${badgeBase} ${badge.cls}`}>{badge.label}</span>
                  : null
              })}
            </div>
          </div>
        )
      },
      sortingFn: 'alphanumeric',
      filterFn: 'equals',
    }),
  ], [navigateToSection])

  // eslint-disable-next-line react-hooks/incompatible-library -- not using React Compiler
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toLowerCase()
      const term = row.original.term.toLowerCase()
      const def = row.original.definition.replace(/<[^>]*>/g, '').toLowerCase()
      const cat = row.original.category.toLowerCase()
      const guideMatch = row.original.guideIds.some(gid => {
        const badge = badgeMap[`guide:${gid}`]
        return badge?.label.toLowerCase().includes(search)
      })
      return term.includes(search) || def.includes(search) || cat.includes(search) || guideMatch
    },
  })

  const toggleGuide = (tag: string) => {
    setGuideFilter(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const toggleCategory = (tag: string) => {
    setCategoryFilter(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setGlobalFilter('')
    setGuideFilter([])
    setCategoryFilter([])
  }

  const hasActiveFilters = globalFilter || guideFilter.length > 0 || categoryFilter.length > 0

  return (
    <>
      <h1 className="text-3xl font-bold mb-5 tracking-tight">Glossary</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 leading-relaxed">
        Key terms you'll encounter across all guides. Use the filters to narrow by guide or category.
      </p>

      <div className="flex flex-col gap-4 mb-5 max-sm:gap-3">
        <input
          className="w-full h-10 px-3.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-blue-500 dark:focus:border-blue-400"
          type="text"
          placeholder="Search terms..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          data-testid="glossary-search"
        />

        {/* Guide filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Guide</span>
          <div className="flex flex-wrap gap-1.5">
            {guideTagList.map(tag => {
              const badge = badgeMap[tag]
              if (!badge) return null
              const isActive = guideFilter.includes(tag)
              return (
                <button
                  key={tag}
                  className={clsx(
                    `${badgeBase} ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                    isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                  )}
                  onClick={() => toggleGuide(tag)}
                  data-testid={`glossary-guide-${tag}`}
                >
                  {badge.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Category</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => {
              const key = categoryToKey(cat)
              const badge = badgeMap[key]
              if (!badge) return null
              const isActive = categoryFilter.includes(key)
              return (
                <button
                  key={key}
                  className={clsx(
                    `${badgeBase} ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                    isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                  )}
                  onClick={() => toggleCategory(key)}
                  data-testid={`glossary-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {badge.label}
                </button>
              )
            })}
          </div>
        </div>

        <button
          className={clsx(
            "self-start text-xs font-medium text-gray-500 dark:text-slate-400 bg-transparent border-none cursor-pointer px-0 hover:text-blue-500 dark:hover:text-blue-400",
            !hasActiveFilters && "invisible"
          )}
          onClick={clearFilters}
          data-testid="glossary-clear-filters"
        >
          Clear filters
        </button>
      </div>

      {/* Results count + wide toggle */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="text-xs text-gray-400 dark:text-slate-500 font-medium" data-testid="glossary-count">
          {table.getRowModel().rows.length} of {flatData.length} terms
        </div>
        {!effectivelyPinned && (
          <button
            className="text-xs font-medium text-gray-500 dark:text-slate-400 bg-transparent border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-150"
            onClick={() => setWideMode(prev => !prev)}
          >
            {wideMode ? '↙ Compact view' : '↗ Wide view'}
          </button>
        )}
      </div>

      <div
        className={clsx(wideMode && !effectivelyPinned && 'transition-[width,margin] duration-250')}
        style={wideMode && !effectivelyPinned ? {
          width: 'calc(100vw - 2.5rem)',
          marginLeft: 'calc((100% - 100vw + 2.5rem) / 2)',
        } : undefined}
      >
        <DataTable table={table} columnCount={3} emptyMessage="No terms match your search." />
      </div>
    </>
  )
}
