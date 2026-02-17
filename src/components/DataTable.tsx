import { flexRender, type Table } from '@tanstack/react-table'
import clsx from 'clsx'

interface DataTableProps<T> {
  table: Table<T>
  columnCount: number
  emptyMessage: string
}

export function DataTable<T>({ table, columnCount, emptyMessage }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700" data-testid="data-table">
      <table className="w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-b border-slate-200 dark:border-slate-700">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className={clsx(
                    'text-left px-3 py-2.5 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50',
                    header.column.getCanSort() && 'cursor-pointer select-none hover:text-blue-500 dark:hover:text-blue-400'
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                  aria-sort={
                    header.column.getCanSort()
                      ? header.column.getIsSorted() === 'asc'
                        ? 'ascending'
                        : header.column.getIsSorted() === 'desc'
                          ? 'descending'
                          : 'none'
                      : undefined
                  }
                >
                  <span className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <span className="text-gray-300 dark:text-slate-600 text-xs" aria-hidden="true">
                        {{ asc: ' ▲', desc: ' ▼' }[header.column.getIsSorted() as string] ?? ' ⇅'}
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
              <td colSpan={columnCount} className="text-center text-gray-400 dark:text-slate-500 py-6">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 py-2.5 align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
