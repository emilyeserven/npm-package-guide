import { useState, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import type { SortingState, ColumnFiltersState } from '@tanstack/react-table'
import { glossaryTerms } from '../data/glossaryTerms'
import type { GlossaryTerm } from '../data/glossaryTerms'
import { getNavTitle } from '../data/navigation'
import { PrevNextNav } from './PrevNextNav'

interface FlatGlossaryRow extends GlossaryTerm {
  category: string
}

const flatData: FlatGlossaryRow[] = glossaryTerms.flatMap(group =>
  group.terms.map(t => ({ ...t, category: group.category }))
)

const categories = glossaryTerms.map(g => g.category)

const columnHelper = createColumnHelper<FlatGlossaryRow>()

const externalLinkIcon = `<svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`

export function GlossaryPage() {
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

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
            <span dangerouslySetInnerHTML={{ __html: row.definition }} />
            {' '}
            <a
              className="glossary-link"
              href={row.url}
              target="_blank"
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={{ __html: `${row.source} docs${externalLinkIcon}` }}
            />
            {row.sectionId && (
              <>
                {' '}
                <button
                  className="glossary-section-link inline-nav-link"
                  onClick={() => {
                    navigate({ to: '/$sectionId', params: { sectionId: row.sectionId! } })
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  → {getNavTitle(row.sectionId)}
                </button>
              </>
            )}
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
  ], [navigate])

  const table = useReactTable({
    data: flatData,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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

  const activeCategoryFilter = (columnFilters.find(f => f.id === 'category')?.value as string) || ''

  return (
    <>
      <h1 className="section-title">📖 Glossary</h1>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px', lineHeight: 1.6 }}>
        Key terms you'll encounter when building and publishing npm packages. Each term includes links to learn more.
      </p>

      <div className="glossary-controls">
        <input
          className="glossary-search"
          type="text"
          placeholder="Search terms..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <div className="glossary-filters">
          <button
            className={`glossary-filter-btn ${activeCategoryFilter === '' ? 'active' : ''}`}
            onClick={() => setColumnFilters([])}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`glossary-filter-btn ${activeCategoryFilter === cat ? 'active' : ''}`}
              onClick={() => setColumnFilters([{ id: 'category', value: cat }])}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary-table-wrapper">
        <table className="glossary-table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={header.column.getCanSort() ? 'sortable' : ''}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <span className="sort-indicator">
                        {{ asc: ' ▲', desc: ' ▼' }[header.column.getIsSorted() as string] ?? ' ⇅'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>
                  No terms match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PrevNextNav currentId="glossary" />
    </>
  )
}
