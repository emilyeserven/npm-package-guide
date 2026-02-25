import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
} from '@tanstack/react-table'
import type { SortingState } from '@tanstack/react-table'
import parse from 'html-react-parser'
import { glossaryTerms } from '../data/glossaryTerms'
import type { GlossaryTerm } from '../data/glossaryTerms'
import { linkById } from '../data/linkRegistry'
import { getNavTitle } from '../data/navigation'
import { getGuideForPage } from '../data/guideRegistry'
import { useNavigateToSection } from '../hooks/useNavigateToSection'
import { badgeBase, badgeMap, guideTags } from '../data/overallResources'
import { DataTable } from './DataTable'
import { FilterableTableShell, type FilterGroup } from './FilterableTableShell'
import { ExternalLinkIcon } from './ExternalLinkIcon'

interface ResolvedLink {
  url: string
  source: string
}

interface ResolvedInternalLink {
  sectionId: string
  title: string
}

interface FlatGlossaryRow extends GlossaryTerm {
  category: string
  guideIds: string[]
  externalLinks: ResolvedLink[]
  internalLinks: ResolvedInternalLink[]
}

function deriveGuides(term: GlossaryTerm): string[] {
  if (term.guides && term.guides.length > 0) return term.guides
  if (!term.sectionId) return ['npm-package']
  return [getGuideForPage(term.sectionId)?.id ?? 'npm-package']
}

const flatData: FlatGlossaryRow[] = glossaryTerms.flatMap(group =>
  group.terms.map(t => {
    const allLinkIds = [t.linkId, ...(t.linkIds ?? [])]
    const seen = new Set<string>()
    const externalLinks: ResolvedLink[] = []
    for (const id of allLinkIds) {
      if (seen.has(id)) continue
      seen.add(id)
      const link = linkById.get(id)
      if (link) externalLinks.push({ url: link.url, source: link.source })
    }

    const allSectionIds = [...(t.sectionId ? [t.sectionId] : []), ...(t.sectionIds ?? [])]
    const seenSections = new Set<string>()
    const internalLinks: ResolvedInternalLink[] = []
    for (const id of allSectionIds) {
      if (seenSections.has(id)) continue
      seenSections.add(id)
      internalLinks.push({ sectionId: id, title: getNavTitle(id) })
    }

    return {
      ...t,
      category: group.category,
      guideIds: deriveGuides(t),
      externalLinks,
      internalLinks,
    }
  })
)

const categories = glossaryTerms.map(g => g.category)

function categoryToKey(cat: string): string {
  return `cat:${cat.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`
}

const guideTagList = Array.from(guideTags)

const columnHelper = createColumnHelper<FlatGlossaryRow>()

interface GlossaryPageProps {
  initialGuide?: string
  initialSearch?: string
}

export function GlossaryPage({ initialGuide, initialSearch }: GlossaryPageProps) {
  const navigateToSection = useNavigateToSection()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState(initialSearch ?? '')
  const [guideFilter, setGuideFilter] = useState<string[]>(
    () => initialGuide ? [`guide:${initialGuide}`] : []
  )
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])

  const filteredData = useMemo(() => {
    let data = flatData
    if (guideFilter.length > 0) {
      data = data.filter(row => guideFilter.some(g => row.guideIds.some(gi => g === `guide:${gi}`)))
    }
    if (categoryFilter.length > 0) {
      data = data.filter(row => categoryFilter.some(c => c === categoryToKey(row.category)))
    }
    return data
  }, [guideFilter, categoryFilter])

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
        const useBullets = row.externalLinks.length > 1 || row.internalLinks.length > 1

        return (
          <div>
            <span>{parse(row.definition)}</span>
            {useBullets ? (
              <ul className="mt-1.5 list-disc pl-4 m-0 space-y-0.5">
                {row.externalLinks.map((link, i) => (
                  <li key={`ext-${i}`}>
                    <a
                      className="text-xs text-blue-600 dark:text-blue-400 no-underline hover:underline"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.source} docs<ExternalLinkIcon className="w-3 h-3 inline-block align-middle ml-0.5" />
                    </a>
                  </li>
                ))}
                {row.internalLinks.map((link, i) => (
                  <li key={`int-${i}`}>
                    <button
                      className="inline-nav-link text-xs bg-transparent border-none cursor-pointer p-0"
                      onClick={() => navigateToSection(link.sectionId)}
                    >
                      → {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                {row.externalLinks.map((link, i) => (
                  <a
                    key={`ext-${i}`}
                    className="text-xs text-blue-600 dark:text-blue-400 no-underline hover:underline"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.source} docs<ExternalLinkIcon className="w-3 h-3 inline-block align-middle ml-0.5" />
                  </a>
                ))}
                {row.internalLinks.map((link, i) => (
                  <button
                    key={`int-${i}`}
                    className="inline-nav-link text-xs bg-transparent border-none cursor-pointer p-0"
                    onClick={() => navigateToSection(link.sectionId)}
                  >
                    → {link.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      },
      enableSorting: false,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => {
        const row = info.row.original
        const catKey = categoryToKey(row.category)
        const catBadge = badgeMap[catKey]

        return (
          <div className="flex flex-col items-start gap-1.5">
            {catBadge ? (
              <span className={`${badgeBase} ${catBadge.cls}`}>{catBadge.label}</span>
            ) : (
              <span className="text-sm">{row.category}</span>
            )}
            <div className="flex flex-wrap gap-1">
              {row.guideIds.map(gid => {
                const badge = badgeMap[`guide:${gid}`]
                return badge
                  ? <span key={gid} className={`${badgeBase} ${badge.cls}`}>{badge.label}</span>
                  : null
              })}
            </div>
          </div>
        )
      },
      sortingFn: 'alphanumeric',
      filterFn: 'equals',
    }),
  ], [navigateToSection])

  // eslint-disable-next-line react-hooks/incompatible-library -- not using React Compiler
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toLowerCase()
      const term = row.original.term.toLowerCase()
      const def = row.original.definition.replace(/<[^>]*>/g, '').toLowerCase()
      const cat = row.original.category.toLowerCase()
      const guideMatch = row.original.guideIds.some(gid => {
        const badge = badgeMap[`guide:${gid}`]
        return badge?.label.toLowerCase().includes(search)
      })
      return term.includes(search) || def.includes(search) || cat.includes(search) || guideMatch
    },
  })

  const toggleGuide = (tag: string) => {
    setGuideFilter(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const toggleCategory = (tag: string) => {
    setCategoryFilter(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setGlobalFilter('')
    setGuideFilter([])
    setCategoryFilter([])
  }

  const hasActiveFilters = !!(globalFilter || guideFilter.length > 0 || categoryFilter.length > 0)

  const filterGroups: FilterGroup[] = [
    {
      label: 'Guide',
      tags: guideTagList,
      activeFilter: guideFilter,
      onToggle: toggleGuide,
      testIdPrefix: 'glossary-guide',
    },
    {
      label: 'Category',
      tags: categories.map(categoryToKey),
      activeFilter: categoryFilter,
      onToggle: toggleCategory,
      testIdPrefix: 'glossary-filter',
    },
  ]

  return (
    <FilterableTableShell
      title="Glossary"
      description="Key terms you'll encounter across all guides. Use the filters to narrow by guide or category."
      searchPlaceholder="Search terms..."
      globalFilter={globalFilter}
      onFilterChange={setGlobalFilter}
      filterGroups={filterGroups}
      clearFilters={clearFilters}
      hasActiveFilters={hasActiveFilters}
      resultCount={table.getRowModel().rows.length}
      totalCount={flatData.length}
      countLabel="terms"
    >
      <DataTable table={table} columnCount={3} emptyMessage="No terms match your search." />
    </FilterableTableShell>
  )
}
