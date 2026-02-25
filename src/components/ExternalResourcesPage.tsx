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
import { linkRegistry } from '../data/linkRegistry'
import { overallResources, badgeBase, badgeMap, typeTags, topicTags, guideTags } from '../data/overallResources'
import { contentPages } from '../content/registry'
import { getNavTitle } from '../data/navigation'
import { parseTitle } from '../helpers/parseTitle'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { DataTable } from './DataTable'
import { FilterableTableShell, type FilterGroup } from './FilterableTableShell'

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
        const linkClass = "inline-nav-link text-xs bg-transparent border-0 border-b border-dashed cursor-pointer p-0 border-blue-400 dark:border-blue-500 hover:border-solid transition-[border-bottom-style] duration-150"
        if (ids.length === 1) {
          const { text } = parseTitle(getNavTitle(ids[0]))
          return (
            <button
              className={linkClass}
              onClick={() => navigateToSection(ids[0])}
            >
              {text}
            </button>
          )
        }
        return (
          <div className="space-y-0.5 text-left">
            {ids.map(id => {
              const { text } = parseTitle(getNavTitle(id))
              return (
                <div key={id} className="flex items-baseline gap-1.5 text-xs">
                  <span className="text-slate-400 dark:text-slate-500 shrink-0">•</span>
                  <button
                    className={linkClass}
                    onClick={() => navigateToSection(id)}
                  >
                    {text}
                  </button>
                </div>
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

  const hasActiveFilters = !!(globalFilter || tagFilter.length > 0)

  const filterGroups: FilterGroup[] = [
    { label: 'Guide', tags: guideTagList, activeFilter: tagFilter, onToggle: toggleTag, testIdPrefix: 'resources-tag' },
    { label: 'Type', tags: typeTagList, activeFilter: tagFilter, onToggle: toggleTag, testIdPrefix: 'resources-tag' },
    { label: 'Topic', tags: topicTagList, activeFilter: tagFilter, onToggle: toggleTag, testIdPrefix: 'resources-tag' },
  ]

  return (
    <FilterableTableShell
      title="External Resources"
      description="Documentation, articles, courses, tools, and section references in one place. Use the search and filters to find what you need."
      searchPlaceholder="Search references..."
      globalFilter={globalFilter}
      onFilterChange={setGlobalFilter}
      filterGroups={filterGroups}
      clearFilters={clearFilters}
      hasActiveFilters={hasActiveFilters}
      resultCount={table.getRowModel().rows.length}
      totalCount={data.length}
      countLabel="references"
    >
      <DataTable table={table} columnCount={4} emptyMessage="No references match your filters." />
    </FilterableTableShell>
  )
}
