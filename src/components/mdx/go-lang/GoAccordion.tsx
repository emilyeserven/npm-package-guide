import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { AccordionList } from '../AccordionList'
import { GO_PHILOSOPHY_ITEMS, GO_MINDSET_ITEMS } from '../../../data/goLangData'
import type { GoAccordionItem } from '../../../data/goLangData'

const SECTIONS: Record<string, GoAccordionItem[]> = {
  philosophy: GO_PHILOSOPHY_ITEMS,
  mindset: GO_MINDSET_ITEMS,
}

export function GoAccordion({ section }: { section: 'philosophy' | 'mindset' }) {
  const isDark = useIsDark()
  const items = SECTIONS[section]
  if (!items) return null

  return (
    <AccordionList<GoAccordionItem>
      items={items}
      className="my-6"
      gap="gap-2"
      itemClassName="rounded-xl border overflow-hidden"
      itemStyle={(_item, isDark, expanded) => ({
        background: expanded
          ? ds('rgba(8,145,178,0.04)', 'rgba(34,211,238,0.06)', isDark)
          : ds('#ffffff', '#1e293b', isDark),
        borderColor: expanded
          ? ds('rgba(8,145,178,0.3)', 'rgba(34,211,238,0.25)', isDark)
          : ds('#e2e8f0', '#334155', isDark),
      })}
      renderHeader={(item) => (
        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
          {item.title}
        </span>
      )}
      renderBody={(item) => (
        <p
          className="mt-2 mb-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      )}
      renderIndicator={(expanded) => (
        <span
          className="text-xs transition-transform duration-200 shrink-0 inline-block"
          style={{
            color: ds('#94a3b8', '#64748b', isDark),
            transform: expanded ? 'rotate(180deg)' : 'none',
          }}
        >
          \u25BE
        </span>
      )}
    />
  )
}
