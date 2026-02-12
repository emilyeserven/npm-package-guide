import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { CLI_GROUPS, CLI_CATEGORIES, type CLICommand } from '../../data/promptData'

type FilterMode = 'all' | 'ai-only' | 'human-only'

export function CLIReference() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [filterMode, setFilterMode] = useState<FilterMode>('all')

  const allCommands = useMemo(() => {
    const cmds: CLICommand[] = []
    for (const group of CLI_GROUPS) {
      for (const cmd of group.commands) {
        cmds.push(cmd)
      }
    }
    return cmds
  }, [])

  const categories = useMemo(() => {
    const cats = new Set<string>()
    for (const cmd of allCommands) {
      cats.add(cmd.category)
    }
    return Array.from(cats)
  }, [allCommands])

  const filtered = useMemo(() => {
    let cmds = allCommands
    if (categoryFilter) {
      cmds = cmds.filter(c => c.category === categoryFilter)
    }
    if (filterMode === 'ai-only') {
      cmds = cmds.filter(c => !c.human)
    } else if (filterMode === 'human-only') {
      cmds = cmds.filter(c => c.human)
    }
    if (search) {
      const q = search.toLowerCase()
      cmds = cmds.filter(c =>
        c.cmd.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
      )
    }
    return cmds
  }, [allCommands, categoryFilter, filterMode, search])

  const clearFilters = () => {
    setSearch('')
    setCategoryFilter(null)
    setFilterMode('all')
  }

  const hasActiveFilters = search || categoryFilter || filterMode !== 'all'

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <input
            className="w-full h-10 pl-3.5 pr-9 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-blue-500 dark:focus:border-blue-400"
            type="text"
            placeholder="Search commands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-transparent border-none text-gray-400 dark:text-slate-500 cursor-pointer text-sm hover:text-slate-600 dark:hover:text-slate-300"
              onClick={() => setSearch('')}
            >
              &#x2715;
            </button>
          )}
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-col gap-2.5 mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Category</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => {
              const isActive = categoryFilter === cat
              return (
                <button
                  key={cat}
                  className={clsx(
                    'text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer border-none transition-all duration-150',
                    isActive
                      ? 'bg-blue-500 text-white dark:bg-blue-400 dark:text-slate-900 ring-2 ring-blue-500/40 dark:ring-blue-400/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 opacity-70 hover:opacity-100'
                  )}
                  onClick={() => setCategoryFilter(isActive ? null : cat)}
                >
                  {CLI_CATEGORIES[cat] ?? cat}
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Type</span>
          <div className="flex flex-wrap gap-1.5">
            {([['all', 'All'], ['ai-only', 'AI Favorites'], ['human-only', 'Human Common']] as const).map(([mode, label]) => {
              const isActive = filterMode === mode
              return (
                <button
                  key={mode}
                  className={clsx(
                    'text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer border-none transition-all duration-150',
                    isActive
                      ? 'bg-purple-500 text-white dark:bg-purple-400 dark:text-slate-900 ring-2 ring-purple-500/40 dark:ring-purple-400/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 opacity-70 hover:opacity-100'
                  )}
                  onClick={() => setFilterMode(mode)}
                >
                  {label}
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
        {filtered.length} of {allCommands.length} commands
      </div>

      {/* Table */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60">
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider py-2.5 px-4 border-b border-slate-200 dark:border-slate-700">Command</th>
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider py-2.5 px-4 border-b border-slate-200 dark:border-slate-700">Description</th>
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider py-2.5 px-4 border-b border-slate-200 dark:border-slate-700 w-28">Category</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
                  No commands match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((c, i) => (
                <tr
                  key={i}
                  className={i < filtered.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}
                >
                  <td className="py-2.5 px-4 align-top">
                    <code className="text-xs font-mono text-cyan-700 dark:text-cyan-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded whitespace-nowrap">
                      {c.cmd}
                    </code>
                  </td>
                  <td className="py-2.5 px-4 align-top">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                        {c.desc}
                      </span>
                      {!c.human && (
                        <span className="text-[10px] px-1.5 py-px rounded bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 font-semibold whitespace-nowrap shrink-0">
                          AI fav
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-4 align-top">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {CLI_CATEGORIES[c.category] ?? c.category}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
