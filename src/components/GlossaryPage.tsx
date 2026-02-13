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
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { badgeBase, badgeMap } from '../data/overallResources'
import { DataTable } from './DataTable'
import { ExternalLinkIcon } from './ExternalLinkIcon'

interface FlatGlossaryRow extends GlossaryTerm {
  category: string
  guide: string
  url: string
  source: string
}

function deriveGuide(sectionId?: string): string {
  if (!sectionId) return 'npm-package'
  if (sectionId.startsWith('arch-')) return 'architecture'
  if (sectionId.startsWith('test-')) return 'testing'
  if (sectionId.startsWith('prompt-')) return 'prompt-engineering'
  return 'npm-package'
}

const flatData: FlatGlossaryRow[] = glossaryTerms.flatMap(group =>
  group.terms.map(t => {
    const link = linkById.get(t.linkId)
    return {
      ...t,
      category: group.category,
      guide: deriveGuide(t.sectionId),
      url: link?.url ?? '',
      source: link?.source ?? '',
    }
  })
)

const categories = glossaryTerms.map(g => g.category)

function categoryToKey(cat: string): string {
  return `cat:${cat.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`
}

const guideTagList = ['guide:npm-package', 'guide:architecture', 'guide:testing', 'guide:prompt-engineering']

const columnHelper = createColumnHelper<FlatGlossaryRow>()

interface GlossaryPageProps {
  initialGuide?: string
  initialSearch?: string
}

export function GlossaryPage({ initialGuide, initialSearch }: GlossaryPageProps) {
  const navigateToSection = useNavigateToSection()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState(initialSearch ?? '')
  const [guideFilter, setGuideFilter] = useState<string[]>(
    () => initialGuide ? [`guide:${initialGuide}`] : []
  )
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])

  const filteredData = useMemo(() => {
    let data = flatData
    if (guideFilter.length > 0) {
      data = data.filter(row => guideFilter.some(g => g === `guide:${row.guide}`))
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
        return (
          <div>
            <span>{parse(row.definition)}</span>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                className="text-xs text-blue-600 dark:text-blue-400 no-underline hover:underline"
                href={row.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.source} docs<ExternalLinkIcon className="w-3 h-3 inline-block align-middle ml-0.5" />
              </a>
              {row.sectionId && (
                <button
                  className="inline-nav-link text-xs bg-transparent border-none cursor-pointer p-0"
                  onClick={() => navigateToSection(row.sectionId!)}
                >
                  → {getNavTitle(row.sectionId)}
                </button>
              )}
            </div>
          </div>
        )
      },
      enableSorting: false,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
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
      return term.includes(search) || def.includes(search) || cat.includes(search)
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
      <h1 className="text-2xl font-bold mb-5 tracking-tight">Glossary</h1>
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

        {hasActiveFilters && (
          <button
            className="self-start text-xs font-medium text-gray-500 dark:text-slate-400 bg-transparent border-none cursor-pointer px-0 hover:text-blue-500 dark:hover:text-blue-400"
            onClick={clearFilters}
            data-testid="glossary-clear-filters"
          >
            Clear filters
          </button>
        )}
      </div>

      <DataTable table={table} columnCount={3} emptyMessage="No terms match your search." />
    </>
  )
}
