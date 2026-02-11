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
import { overallResources, badgeMap, typeTags, topicTags } from '../data/overallResources'
import { sections } from '../data/sections'
import { ciPages } from '../data/ciPages'
import { bonusSections } from '../data/bonusSections'
import { PrevNextNav } from './PrevNextNav'
import { DataTable } from './DataTable'

interface ReferenceRow {
  name: string
  url: string
  desc: string
  tags: string[]
}

// Map section IDs to topic tags for section references
const sectionTopicMap: Record<string, string[]> = {
  bigpicture: [],
  monorepo: ['monorepo'],
  'npm-vs-pnpm': ['tooling'],
  tsconfig: ['typescript'],
  build: ['bundling', 'tooling'],
  dist: ['publishing'],
  deps: ['publishing'],
  typescript: ['typescript'],
  packagejson: ['publishing', 'modules'],
  versioning: ['versioning'],
  workflow: ['publishing'],
  'ci-overview': ['ci-cd'],
  'ci-linting': ['ci-cd', 'linting'],
  'ci-build': ['ci-cd', 'bundling'],
  'ci-testing': ['ci-cd', 'testing'],
  'ci-repo-maintenance': ['ci-cd', 'tooling'],
  storybook: ['tooling', 'testing'],
}

// Generate short relevance descriptions for section references
const sectionDescMap: Record<string, string> = {
  bigpicture: 'Foundational context for understanding the npm ecosystem',
  monorepo: 'Managing multiple packages in a monorepo setup',
  'npm-vs-pnpm': 'Choosing and configuring a package manager',
  tsconfig: 'TypeScript configuration for package builds',
  build: 'Bundling and output configuration for packages',
  dist: 'Controlling what gets included in a published package',
  deps: 'Managing package dependencies correctly',
  typescript: 'Adding type safety and declarations to packages',
  packagejson: 'Configuring package metadata and entry points',
  versioning: 'Version management and release automation',
  workflow: 'Local development and publishing workflows',
  'ci-overview': 'Automating quality checks with CI',
  'ci-linting': 'Code quality enforcement for packages',
  'ci-build': 'Automated build verification',
  'ci-testing': 'Automated testing for packages',
  'ci-repo-maintenance': 'Keeping dependencies and exports clean',
  storybook: 'Component documentation and visual testing',
}

function buildReferenceData(): ReferenceRow[] {
  const rows: ReferenceRow[] = []

  // Learning Resources
  overallResources.forEach(group => {
    group.items.forEach(item => {
      rows.push({
        name: item.name,
        url: item.url,
        desc: item.desc,
        tags: item.tags,
      })
    })
  })

  // Section References (deduped, excluding overallResources URLs)
  const seen = new Set<string>()
  const overallUrls = new Set<string>()
  overallResources.forEach(g => g.items.forEach(i => overallUrls.add(i.url)))

  const allSectionsWithLinks = [...sections, ...ciPages, ...bonusSections]
  allSectionsWithLinks.forEach(s => {
    if (s.links && s.links.length > 0) {
      const topicTags = sectionTopicMap[s.id] ?? []
      const sectionDesc = sectionDescMap[s.id] ?? ''
      s.links.forEach(l => {
        if (seen.has(l.url) || overallUrls.has(l.url)) return
        seen.add(l.url)
        rows.push({
          name: l.label,
          url: l.url,
          desc: sectionDesc,
          tags: ['docs', 'free', ...topicTags],
        })
      })
    }
  })

  return rows
}

const columnHelper = createColumnHelper<ReferenceRow>()

export function ExternalResourcesPage() {
  const data = useMemo(() => buildReferenceData(), [])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [tagFilter, setTagFilter] = useState<string[]>([])

  // Collect unique tags split by category
  const { typeTagList, topicTagList } = useMemo(() => {
    const set = new Set<string>()
    data.forEach(r => r.tags.forEach(b => set.add(b)))
    return {
      typeTagList: Array.from(set).filter(t => typeTags.has(t)).sort(),
      topicTagList: Array.from(set).filter(t => topicTags.has(t)).sort(),
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
              ? <span key={b} className={`resource-badge ${badge.cls}`}>{badge.label}</span>
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
  ], [])

  // Apply tag filter
  const filteredData = useMemo(() => {
    if (tagFilter.length === 0) return data
    return data.filter(r => tagFilter.some(b => r.tags.includes(b)))
  }, [data, tagFilter])

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
        <h1 className="section-title">External Resources</h1>
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
            />
            {globalFilter && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-transparent border-none text-gray-400 dark:text-slate-500 cursor-pointer text-sm hover:text-slate-600 dark:hover:text-slate-300"
                onClick={() => setGlobalFilter('')}
              >
                &#x2715;
              </button>
            )}
          </div>
        </div>

        {/* Tag filters */}
        <div className="flex flex-col gap-2.5 mb-5">
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
                      `resource-badge ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                      isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => toggleTag(b)}
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
                      `resource-badge ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                      isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => toggleTag(b)}
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
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="text-xs text-gray-400 dark:text-slate-500 mb-2.5 font-medium">
          {table.getRowModel().rows.length} of {data.length} references
        </div>

        {/* Table */}
        <DataTable table={table} columnCount={3} emptyMessage="No references match your filters." />
      </div>
      <PrevNextNav currentId="external-resources" />
    </>
  )
}
