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
import { overallResources, badgeBase, badgeMap, typeTags, topicTags, guideTags } from '../data/overallResources'
import { contentPages } from '../content/registry'
import { getNavTitle } from '../data/navigation'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { DataTable } from './DataTable'

interface ReferenceRow {
  name: string
  url: string
  desc: string
  tags: string[]
  pageIds: string[]
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
  'arch-what-is-a-stack': ['architecture'],
  'arch-stack-mern': ['architecture', 'databases'],
  'arch-stack-pfrn': ['architecture', 'databases'],
  'arch-stack-mean': ['architecture'],
  'arch-stack-lamp': ['architecture', 'databases'],
  'arch-stack-django': ['architecture', 'databases'],
  'arch-stack-rails': ['architecture', 'databases'],
  'arch-frameworks-intro': ['architecture', 'frameworks'],
  'arch-fw-nextjs': ['frameworks'],
  'arch-fw-react-router': ['frameworks'],
  'arch-fw-tanstack-start': ['frameworks', 'typescript'],
  'arch-fw-remix': ['frameworks'],
  'arch-how-it-connects': ['architecture'],
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
  'arch-what-is-a-stack': 'Understanding the concept and structure of web technology stacks',
  'arch-stack-mern': 'MongoDB, Express, React, Node.js — the popular all-JavaScript stack',
  'arch-stack-pfrn': 'PostgreSQL, Fastify, React, Node.js — the production-ready alternative',
  'arch-stack-mean': 'MongoDB, Express, Angular, Node.js — enterprise-friendly with Angular',
  'arch-stack-lamp': 'Linux, Apache, MySQL, PHP — the battle-tested classic',
  'arch-stack-django': 'PostgreSQL, Django, React/Vue, Python — batteries included',
  'arch-stack-rails': 'PostgreSQL, Ruby on Rails, Hotwire/React, Ruby — convention over configuration',
  'arch-frameworks-intro': 'Introduction to full-stack React frameworks',
  'arch-fw-nextjs': 'The most popular React meta-framework by Vercel',
  'arch-fw-react-router': 'React Router v7 full-stack framework mode',
  'arch-fw-tanstack-start': 'Type-safe full-stack framework from the TanStack ecosystem',
  'arch-fw-remix': 'Pioneering web-standards framework merged into React Router',
  'arch-how-it-connects': 'How data flows through a stack from browser to database',
}

function buildReferenceData(): ReferenceRow[] {
  const rows: ReferenceRow[] = []

  // Build reverse map: URL → set of page IDs that reference it
  const urlToPages = new Map<string, Set<string>>()
  const allSectionsWithLinks = Array.from(contentPages.values())
  allSectionsWithLinks.forEach(s => {
    if (s.links && s.links.length > 0) {
      s.links.forEach(l => {
        if (!urlToPages.has(l.url)) urlToPages.set(l.url, new Set())
        urlToPages.get(l.url)!.add(s.id)
      })
    }
  })

  // Learning Resources
  overallResources.forEach(group => {
    group.items.forEach(item => {
      rows.push({
        name: item.name,
        url: item.url,
        desc: item.desc,
        tags: item.tags,
        pageIds: Array.from(urlToPages.get(item.url) ?? []),
      })
    })
  })

  // Section References (deduped, excluding overallResources URLs)
  const seen = new Set<string>()
  const overallUrls = new Set<string>()
  overallResources.forEach(g => g.items.forEach(i => overallUrls.add(i.url)))

  allSectionsWithLinks.forEach(s => {
    if (s.links && s.links.length > 0) {
      const sectionTopics = sectionTopicMap[s.id] ?? []
      const sectionDesc = sectionDescMap[s.id] ?? ''
      const guideTag = s.id.startsWith('arch-') ? 'guide:architecture' : 'guide:npm-package'
      s.links.forEach(l => {
        if (seen.has(l.url) || overallUrls.has(l.url)) return
        seen.add(l.url)
        rows.push({
          name: l.label,
          url: l.url,
          desc: sectionDesc,
          tags: ['docs', 'free', ...sectionTopics, guideTag],
          pageIds: Array.from(urlToPages.get(l.url) ?? []),
        })
      })
    }
  })

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
        return (
          <div className="flex flex-wrap gap-1">
            {ids.map(id => {
              const title = getNavTitle(id)
              const match = title.match(/^(\S+)\s+(.+)$/)
              const text = match ? match[2] : title
              return (
                <button
                  key={id}
                  className="inline-nav-link text-xs bg-transparent border-none cursor-pointer p-0 whitespace-nowrap"
                  onClick={() => navigateToSection(id)}
                >
                  {text}
                </button>
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

  const hasActiveFilters = globalFilter || tagFilter.length > 0

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-5 tracking-tight">External Resources</h1>
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
              data-testid="resources-search"
            />
            {globalFilter && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-transparent border-none text-gray-400 dark:text-slate-500 cursor-pointer text-sm hover:text-slate-600 dark:hover:text-slate-300"
                onClick={() => setGlobalFilter('')}
                data-testid="resources-search-clear"
              >
                &#x2715;
              </button>
            )}
          </div>
        </div>

        {/* Tag filters */}
        <div className="flex flex-col gap-4 mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Guide</span>
            <div className="flex flex-wrap gap-1.5">
              {guideTagList.map(b => {
                const badge = badgeMap[b]
                if (!badge) return null
                const isActive = tagFilter.includes(b)
                return (
                  <button
                    key={b}
                    className={clsx(
                      `${badgeBase} ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                      isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => toggleTag(b)}
                    data-testid={`resources-tag-${b}`}
                  >
                    {badge.label}
                  </button>
                )
              })}
            </div>
          </div>
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
                      `${badgeBase} ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                      isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => toggleTag(b)}
                    data-testid={`resources-tag-${b}`}
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
                      `${badgeBase} ${badge.cls} cursor-pointer border-none transition-all duration-150`,
                      isActive ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40' : 'opacity-70 hover:opacity-100'
                    )}
                    onClick={() => toggleTag(b)}
                    data-testid={`resources-tag-${b}`}
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
              data-testid="resources-clear-filters"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="text-xs text-gray-400 dark:text-slate-500 mb-2.5 font-medium" data-testid="resources-count">
          {table.getRowModel().rows.length} of {data.length} references
        </div>

        {/* Table */}
        <DataTable table={table} columnCount={4} emptyMessage="No references match your filters." />
      </div>
    </>
  )
}
