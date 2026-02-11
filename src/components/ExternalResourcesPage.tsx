import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { overallResources, badgeMap, typeTags, topicTags } from '../data/overallResources'
import { sections } from '../data/sections'
import { ciPages } from '../data/ciPages'
import { bonusSections } from '../data/bonusSections'
import { PrevNextNav } from './PrevNextNav'

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
          className="resource-link"
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
      cell: info => <span className="resource-desc">{info.getValue()}</span>,
      filterFn: 'includesString',
    }),
    columnHelper.accessor('tags', {
      header: 'Tags',
      cell: info => (
        <span className="resource-badges">
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
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>
          Documentation, articles, courses, tools, and section references in one place. Use the search and filters to find what you need.
        </p>

        {/* Search */}
        <div className="ref-controls">
          <div className="ref-search-wrap">
            <input
              className="ref-search"
              type="text"
              placeholder="Search references..."
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
            />
            {globalFilter && (
              <button className="ref-search-clear" onClick={() => setGlobalFilter('')}>
                &#x2715;
              </button>
            )}
          </div>
        </div>

        {/* Tag filters */}
        <div className="ref-filter-groups">
          <div className="ref-filter-group">
            <span className="ref-filter-label">Type</span>
            <div className="ref-badge-filters">
              {typeTagList.map(b => {
                const badge = badgeMap[b]
                if (!badge) return null
                const isActive = tagFilter.includes(b)
                return (
                  <button
                    key={b}
                    className={`ref-badge-btn resource-badge ${badge.cls} ${isActive ? 'ref-badge-active' : ''}`}
                    onClick={() => toggleTag(b)}
                  >
                    {badge.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="ref-filter-group">
            <span className="ref-filter-label">Topic</span>
            <div className="ref-badge-filters">
              {topicTagList.map(b => {
                const badge = badgeMap[b]
                if (!badge) return null
                const isActive = tagFilter.includes(b)
                return (
                  <button
                    key={b}
                    className={`ref-badge-btn resource-badge ${badge.cls} ${isActive ? 'ref-badge-active' : ''}`}
                    onClick={() => toggleTag(b)}
                  >
                    {badge.label}
                  </button>
                )
              })}
            </div>
          </div>
          {hasActiveFilters && (
            <button className="ref-clear-btn" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="ref-count">
          {table.getRowModel().rows.length} of {data.length} references
        </div>

        {/* Table */}
        <div className="ref-table-wrap">
          <table className="ref-table">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={header.column.getCanSort() ? 'ref-sortable' : ''}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span className="ref-th-inner">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="ref-sort-icon">
                            {{ asc: ' ↑', desc: ' ↓' }[header.column.getIsSorted() as string] ?? ' ↕'}
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="ref-empty">No references match your filters.</td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PrevNextNav currentId="external-resources" />
    </>
  )
}
