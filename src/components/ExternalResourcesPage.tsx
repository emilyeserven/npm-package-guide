import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { linkRegistry } from '../data/linkRegistry'
import { overallResources, badgeBase, badgeMap, typeTags, topicTags, guideTags } from '../data/overallResources'
import { contentPages } from '../content/registry'
import { getNavTitle } from '../data/navigation'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { DataTable } from './DataTable'

interface ReferenceRow {
  name: string
  url: string
  desc: string
  tags: string[]
  pageIds: string[]
}

function buildReferenceData(): ReferenceRow[] {
  // Build reverse map: registry ID → set of page IDs that reference it
  const idToPages = new Map<string, Set<string>>()
  for (const [, page] of contentPages) {
    if (page.linkRefIds) {
      for (const refId of page.linkRefIds) {
        if (!idToPages.has(refId)) idToPages.set(refId, new Set())
        idToPages.get(refId)!.add(page.id)
      }
    }
  }

  // Curated learning resources from overallResources (derived from registry)
  const rows: ReferenceRow[] = []
  const seenUrls = new Set<string>()

  overallResources.forEach(group => {
    group.items.forEach(item => {
      seenUrls.add(item.url)
      const entry = linkRegistry.find(r => r.url === item.url)
      rows.push({
        name: item.name,
        url: item.url,
        desc: item.desc,
        tags: item.tags,
        pageIds: entry ? Array.from(idToPages.get(entry.id) ?? []) : [],
      })
    })
  })

  // All other registry entries with tags (section references, etc.)
  for (const link of linkRegistry) {
    if (seenUrls.has(link.url)) continue
    if (!link.tags || link.tags.length === 0) continue
    seenUrls.add(link.url)
    rows.push({
      name: link.label,
      url: link.url,
      desc: link.desc ?? '',
      tags: link.tags,
      pageIds: Array.from(idToPages.get(link.id) ?? []),
    })
  }

  return rows
}

const columnHelper = createColumnHelper<ReferenceRow>()

interface ExternalResourcesPageProps {
  initialGuide?: string
}

export function ExternalResourcesPage({ initialGuide }: ExternalResourcesPageProps) {
  const navigateToSection = useNavigateToSection()
  const data = useMemo(() => buildReferenceData(), [])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [tagFilter, setTagFilter] = useState<string[]>(
    () => initialGuide ? [`guide:${initialGuide}`] : []
  )

  // Collect unique tags split by category
  const { typeTagList, topicTagList, guideTagList } = useMemo(() => {
    const set = new Set<string>()
    data.forEach(r => r.tags.forEach(b => set.add(b)))
    return {
      typeTagList: Array.from(set).filter(t => typeTags.has(t)).sort(),
      topicTagList: Array.from(set).filter(t => topicTags.has(t)).sort(),
      guideTagList: Array.from(set).filter(t => guideTags.has(t)).sort(),
    }
  }, [data])

  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => (
        <a
          className="text-blue-600 dark:text-blue-400 font-medium text-sm no-underline hover:underline"
          href={info.row.original.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {info.getValue()}
        </a>
      ),
      filterFn: 'includesString',
    }),
    columnHelper.accessor('desc', {
      header: 'Description',
      cell: info => <span className="text-sm text-slate-600 dark:text-slate-400">{info.getValue()}</span>,
      filterFn: 'includesString',
    }),
    columnHelper.accessor('tags', {
      header: 'Tags',
      cell: info => (
        <span className="flex flex-wrap gap-1">
          {info.getValue().map(b => {
            const badge = badgeMap[b]
            return badge
              ? <span key={b} className={`${badgeBase} ${badge.cls}`}>{badge.label}</span>
              : null
          })}
        </span>
      ),
      enableSorting: false,
      filterFn: (row, _columnId, filterValue: string[]) => {
        if (!filterValue || filterValue.length === 0) return true
        return filterValue.some(f => row.original.tags.includes(f))
      },
    }),
    columnHelper.accessor('pageIds', {
      header: 'Pages',
      cell: info => {
        const ids = info.getValue()
        if (ids.length === 0) return <span className="text-xs text-slate-400 dark:text-slate-500">—</span>
        return (
          <div className="flex flex-wrap gap-1">
            {ids.map(id => {
              const title = getNavTitle(id)
              const match = title.match(/^(\S+)\s+(.+)$/)
              const text = match ? match[2] : title
              return (
                <button
                  key={id}
                  className="inline-nav-link text-xs bg-transparent border-none cursor-pointer p-0 whitespace-nowrap"
                  onClick={() => navigateToSection(id)}
                >
                  {text}
                </button>
              )
            })}
          </div>
        )
      },
      enableSorting: false,
    }),
  ], [navigateToSection])

  // Apply tag filter
  const filteredData = useMemo(() => {
    if (tagFilter.length === 0) return data
    return data.filter(r => tagFilter.some(b => r.tags.includes(b)))
  }, [data, tagFilter])

  // eslint-disable-next-line react-hooks/incompatible-library -- not using React Compiler
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toLowerCase()
      return (
        row.original.name.toLowerCase().includes(search) ||
        row.original.desc.toLowerCase().includes(search)
      )
    },
  })

  const toggleTag = (tag: string) => {
    setTagFilter(prev =>
      prev.includes(tag) ? prev.filter(b => b !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setGlobalFilter('')
    setTagFilter([])
  }

  const hasActiveFilters = globalFilter || tagFilter.length > 0

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-5 tracking-tight">External Resources</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5 leading-relaxed">
          Documentation, articles, courses, tools, and section references in one place. Use the search and filters to find what you need.
        </p>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <input
              className="w-full h-10 pl-3.5 pr-9 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-blue-500 dark:focus:border-blue-400"
              type="text"
              placeholder="Search references..."
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
              data-testid="resources-search"
            />
            {globalFilter && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-transparent border-none text-gray-400 dark:text-slate-500 cursor-pointer text-sm hover:text-slate-600 dark:hover:text-slate-300"
                onClick={() => setGlobalFilter('')}
                data-testid="resources-search-clear"
              >
                &#x2715;
              </button>
            )}
          </div>
        </div>

        {/* Tag filters */}
        <div className="flex flex-col gap-4 mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Guide</span>
            <div className="flex flex-wrap gap-1.5">
              {guideTagList.map(b => {
                const badge = badgeMap[b]
                if (!badge) return null
                const isActive = tagFilter.includes(b)
                return (
                  <button
                    key={b}
                    className={clsx(
                      `${badgeBase} ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                      isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => toggleTag(b)}
                    data-testid={`resources-tag-${b}`}
                  >
                    {badge.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Type</span>
            <div className="flex flex-wrap gap-1.5">
              {typeTagList.map(b => {
                const badge = badgeMap[b]
                if (!badge) return null
                const isActive = tagFilter.includes(b)
                return (
                  <button
                    key={b}
                    className={clsx(
                      `${badgeBase} ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                      isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => toggleTag(b)}
                    data-testid={`resources-tag-${b}`}
                  >
                    {badge.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Topic</span>
            <div className="flex flex-wrap gap-1.5">
              {topicTagList.map(b => {
                const badge = badgeMap[b]
                if (!badge) return null
                const isActive = tagFilter.includes(b)
                return (
                  <button
                    key={b}
                    className={clsx(
                      `${badgeBase} ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                      isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => toggleTag(b)}
                    data-testid={`resources-tag-${b}`}
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
              data-testid="resources-clear-filters"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="text-xs text-gray-400 dark:text-slate-500 mb-2.5 font-medium" data-testid="resources-count">
          {table.getRowModel().rows.length} of {data.length} references
        </div>

        {/* Table */}
        <DataTable table={table} columnCount={4} emptyMessage="No references match your filters." />
      </div>
    </>
  )
}
