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
import clsx from 'clsx'
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
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                className="text-[12px] text-blue-600 dark:text-blue-400 no-underline hover:underline"
                href={row.url}
                target="_blank"
                rel="noopener noreferrer"
                dangerouslySetInnerHTML={{ __html: `${row.source} docs${externalLinkIcon}` }}
              />
              {row.sectionId && (
                <button
                  className="inline-nav-link text-[12px] bg-transparent border-none cursor-pointer p-0"
                  onClick={() => {
                    navigate({ to: '/$sectionId', params: { sectionId: row.sectionId! } })
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
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
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 leading-relaxed">
        Key terms you'll encounter when building and publishing npm packages. Each term includes links to learn more.
      </p>

      <div className="flex flex-col gap-3 mb-5 max-[600px]:gap-2">
        <input
          className="w-full h-10 px-3.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-blue-500 dark:focus:border-blue-400"
          type="text"
          placeholder="Search terms..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <div className="flex flex-wrap gap-1.5">
          <button
            className={clsx(
              'px-3 py-1.5 text-[12px] font-medium rounded-lg border cursor-pointer transition-all duration-150',
              activeCategoryFilter === ''
                ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500/40'
            )}
            onClick={() => setColumnFilters([])}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={clsx(
                'px-3 py-1.5 text-[12px] font-medium rounded-lg border cursor-pointer transition-all duration-150',
                activeCategoryFilter === cat
                  ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500/40'
              )}
              onClick={() => setColumnFilters([{ id: 'category', value: cat }])}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-slate-200 dark:border-slate-700">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={clsx(
                      'text-left px-3 py-2.5 text-[11.5px] font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50',
                      header.column.getCanSort() && 'cursor-pointer select-none hover:text-blue-500 dark:hover:text-blue-400'
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <span className="text-gray-300 dark:text-slate-600 text-[10px] ml-1">
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
              <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 py-2.5 align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 dark:text-slate-500 py-6">
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
