import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
} from '@tanstack/react-table'
import type { SortingState, ColumnFiltersState } from '@tanstack/react-table'
import clsx from 'clsx'
import parse from 'html-react-parser'
import { glossaryTerms } from '../data/glossaryTerms'
import type { GlossaryTerm } from '../data/glossaryTerms'
import { getNavTitle } from '../data/navigation'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { PrevNextNav } from './PrevNextNav'
import { DataTable } from './DataTable'
import { ExternalLinkIcon } from './ExternalLinkIcon'

interface FlatGlossaryRow extends GlossaryTerm {
  category: string
}

const flatData: FlatGlossaryRow[] = glossaryTerms.flatMap(group =>
  group.terms.map(t => ({ ...t, category: group.category }))
)

const categories = glossaryTerms.map(g => g.category)

const columnHelper = createColumnHelper<FlatGlossaryRow>()

export function GlossaryPage() {
  const navigateToSection = useNavigateToSection()
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
            <span>{parse(row.definition)}</span>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                className="text-xs text-blue-600 dark:text-blue-400 no-underline hover:underline"
                href={row.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.source} docs<ExternalLinkIcon />
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
      <h1 className="text-2xl font-bold mb-5 tracking-tight">📖 Glossary</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 leading-relaxed">
        Key terms you'll encounter when building and publishing npm packages. Each term includes links to learn more.
      </p>

      <div className="flex flex-col gap-3 mb-5 max-sm:gap-2">
        <input
          className="w-full h-10 px-3.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-blue-500 dark:focus:border-blue-400"
          type="text"
          placeholder="Search terms..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          data-testid="glossary-search"
        />
        <div className="flex flex-wrap gap-1.5">
          <button
            className={clsx(
              'px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-all duration-150',
              activeCategoryFilter === ''
                ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500/40'
            )}
            onClick={() => setColumnFilters([])}
            data-testid="glossary-filter-all"
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={clsx(
                'px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-all duration-150',
                activeCategoryFilter === cat
                  ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500/40'
              )}
              onClick={() => setColumnFilters([{ id: 'category', value: cat }])}
              data-testid={`glossary-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <DataTable table={table} columnCount={3} emptyMessage="No terms match your search." />

      <PrevNextNav currentId="glossary" />
    </>
  )
}
