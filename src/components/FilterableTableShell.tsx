import { useState, type ReactNode } from 'react'
import clsx from 'clsx'
import { badgeBase, badgeMap } from '../data/overallResources'
import { useUIStore } from '../hooks/useUIStore'

export interface FilterGroup {
  label: string
  tags: string[]
  activeFilter: string[]
  onToggle: (tag: string) => void
  testIdPrefix: string
}

interface FilterableTableShellProps {
  title: string
  description: string
  searchPlaceholder: string
  globalFilter: string
  onFilterChange: (value: string) => void
  filterGroups: FilterGroup[]
  clearFilters: () => void
  hasActiveFilters: boolean
  resultCount: number
  totalCount: number
  countLabel: string
  /** Prefix for data-testid attributes (e.g. "resources" → "resources-search") */
  testId?: string
  /** Pass the DataTable as children */
  children: ReactNode
}

export function FilterableTableShell({
  title,
  description,
  searchPlaceholder,
  globalFilter,
  onFilterChange,
  filterGroups,
  clearFilters,
  hasActiveFilters,
  resultCount,
  totalCount,
  countLabel,
  testId,
  children,
}: FilterableTableShellProps) {
  const effectivelyPinned = useUIStore((s) => s.pinned && s.isDesktop)
  const [wideMode, setWideMode] = useState(false)

  return (
    <>
      <h1 className="text-3xl font-bold mb-5 tracking-tight">{title}</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 leading-relaxed">{description}</p>

      <div className="flex flex-col gap-4 mb-5 max-sm:gap-3">
        {/* Search */}
        <div className="relative">
          <input
            className="w-full h-10 pl-3.5 pr-9 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-blue-500 dark:focus:border-blue-400"
            type="text"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            value={globalFilter}
            onChange={e => onFilterChange(e.target.value)}
            {...(testId ? { 'data-testid': `${testId}-search` } : {})}
          />
          {globalFilter && (
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-transparent border-none text-gray-400 dark:text-slate-500 cursor-pointer text-sm hover:text-slate-600 dark:hover:text-slate-300"
              onClick={() => onFilterChange('')}
              aria-label="Clear search"
              {...(testId ? { 'data-testid': `${testId}-search-clear` } : {})}
            >
              &#x2715;
            </button>
          )}
        </div>

        {/* Filter groups */}
        {filterGroups.map(group => (
          <div key={group.label} className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">{group.label}</span>
            <div className="flex flex-wrap gap-1.5">
              {group.tags.map(tag => {
                const badge = badgeMap[tag]
                if (!badge) return null
                const isActive = group.activeFilter.includes(tag)
                return (
                  <button
                    key={tag}
                    className={clsx(
                      `${badgeBase} ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                      isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => group.onToggle(tag)}
                    aria-pressed={isActive}
                    data-testid={`${group.testIdPrefix}-${tag}`}
                  >
                    {badge.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <button
          className={clsx(
            "self-start text-xs font-medium text-gray-500 dark:text-slate-400 bg-transparent border-none cursor-pointer px-0 hover:text-blue-500 dark:hover:text-blue-400",
            !hasActiveFilters && "invisible"
          )}
          onClick={clearFilters}
          {...(testId ? { 'data-testid': `${testId}-clear-filters` } : {})}
        >
          Clear filters
        </button>
      </div>

      {/* Results count + wide toggle */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="text-xs text-gray-400 dark:text-slate-500 font-medium" aria-live="polite" aria-atomic="true" {...(testId ? { 'data-testid': `${testId}-count` } : {})}>
          {resultCount} of {totalCount} {countLabel}
        </div>
        {!effectivelyPinned && (
          <button
            className="text-xs font-medium text-gray-500 dark:text-slate-400 bg-transparent border border-slate-200 dark:border-slate-700 rounded-md px-2.5 py-1 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-150"
            onClick={() => setWideMode(prev => !prev)}
          >
            {wideMode ? '↙ Compact view' : '↗ Wide view'}
          </button>
        )}
      </div>

      <div
        className={clsx(wideMode && !effectivelyPinned && 'transition-[width,margin] duration-250')}
        style={wideMode && !effectivelyPinned ? {
          width: 'calc(100vw - 2.5rem)',
          marginLeft: 'calc((100% - 100vw + 2.5rem) / 2)',
        } : undefined}
      >
        {children}
      </div>
    </>
  )
}
