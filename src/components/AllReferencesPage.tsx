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
import { overallResources, badgeMap } from '../data/overallResources'
import { sections } from '../data/sections'
import { ciPages } from '../data/ciPages'
import { bonusSections } from '../data/bonusSections'
import { PrevNextNav } from './PrevNextNav'

interface ReferenceRow {
  name: string
  url: string
  desc: string
  badges: string[]
  category: string
  source: 'learning' | 'section'
}

function buildReferenceData(): ReferenceRow[] {
  const rows: ReferenceRow[] = []

  // Learning Resources
  overallResources.forEach(group => {
    // Strip emoji prefix from category for cleaner display
    const category = group.category.replace(/^\S+\s+/, '')
    group.items.forEach(item => {
      rows.push({
        name: item.name,
        url: item.url,
        desc: item.desc,
        badges: item.badges,
        category,
        source: 'learning',
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
      // Strip emoji prefix from section title
      const category = s.title.replace(/^\S+\s+/, '')
      s.links.forEach(l => {
        if (seen.has(l.url) || overallUrls.has(l.url)) return
        seen.add(l.url)
        rows.push({
          name: l.label,
          url: l.url,
          desc: '',
          badges: ['docs'],
          category,
          source: 'section',
        })
      })
    }
  })

  return rows
}

const columnHelper = createColumnHelper<ReferenceRow>()

export function AllReferencesPage() {
  const data = useMemo(() => buildReferenceData(), [])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [badgeFilter, setBadgeFilter] = useState<string[]>([])
  const [sourceFilter, setSourceFilter] = useState<string | null>(null)

  // Collect all unique badges
  const allBadges = useMemo(() => {
    const set = new Set<string>()
    data.forEach(r => r.badges.forEach(b => set.add(b)))
    return Array.from(set).sort()
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
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => <span className="ref-category-cell">{info.getValue()}</span>,
      filterFn: 'includesString',
    }),
    columnHelper.accessor('badges', {
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
        return filterValue.some(f => row.original.badges.includes(f))
      },
    }),
  ], [])

  // Apply badge and source filters as column filters
  const filteredData = useMemo(() => {
    let result = data
    if (badgeFilter.length > 0) {
      result = result.filter(r => badgeFilter.some(b => r.badges.includes(b)))
    }
    if (sourceFilter) {
      result = result.filter(r => r.source === sourceFilter)
    }
    return result
  }, [data, badgeFilter, sourceFilter])

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
        row.original.desc.toLowerCase().includes(search) ||
        row.original.category.toLowerCase().includes(search)
      )
    },
  })

  const toggleBadge = (badge: string) => {
    setBadgeFilter(prev =>
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    )
  }

  const clearFilters = () => {
    setGlobalFilter('')
    setBadgeFilter([])
    setSourceFilter(null)
  }

  const hasActiveFilters = globalFilter || badgeFilter.length > 0 || sourceFilter

  return (
    <>
      <div>
        <h1 className="section-title">All References</h1>
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

          {/* Source filter */}
          <div className="ref-source-filters">
            <button
              className={`ref-source-btn ${sourceFilter === null ? 'active' : ''}`}
              onClick={() => setSourceFilter(null)}
            >
              All
            </button>
            <button
              className={`ref-source-btn ${sourceFilter === 'learning' ? 'active' : ''}`}
              onClick={() => setSourceFilter(sourceFilter === 'learning' ? null : 'learning')}
            >
              Learning Resources
            </button>
            <button
              className={`ref-source-btn ${sourceFilter === 'section' ? 'active' : ''}`}
              onClick={() => setSourceFilter(sourceFilter === 'section' ? null : 'section')}
            >
              Section References
            </button>
          </div>
        </div>

        {/* Badge filters */}
        <div className="ref-badge-filters">
          {allBadges.map(b => {
            const badge = badgeMap[b]
            if (!badge) return null
            const isActive = badgeFilter.includes(b)
            return (
              <button
                key={b}
                className={`ref-badge-btn resource-badge ${badge.cls} ${isActive ? 'ref-badge-active' : ''}`}
                onClick={() => toggleBadge(b)}
              >
                {badge.label}
              </button>
            )
          })}
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
                            {{ asc: ' \u2191', desc: ' \u2193' }[header.column.getIsSorted() as string] ?? ' \u2195'}
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
                  <td colSpan={4} className="ref-empty">No references match your filters.</td>
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
      <PrevNextNav currentId="all-references" />
    </>
  )
}
