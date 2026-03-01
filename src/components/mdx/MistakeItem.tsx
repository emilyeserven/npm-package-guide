import { parseInlineCode } from '../../helpers/inlineCode'

interface MistakeItemData {
  mistake: string
  example: string
  fix: string
  prompt: string
  deepDivePageId?: string
}

/**
 * Shared rendering for a single mistake entry (title + example + fix + prompt).
 * Used by both MistakeList (prompt-engineering categories) and
 * TestingMistakes (grouped by e2e/unit context).
 */
export function MistakeItemCard({ item, headingLevel = 'h2' }: { item: MistakeItemData; headingLevel?: 'h2' | 'h3' }) {
  const Tag = headingLevel
  const sizeClass = headingLevel === 'h2' ? 'text-2xl' : 'text-xl'
  const weightClass = headingLevel === 'h2' ? 'font-bold' : 'font-semibold'
  return (
    <div>
      <Tag className={`${sizeClass} ${weightClass} text-slate-900 dark:text-slate-100 mb-2`}>
        {item.mistake}
      </Tag>
      <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">
        {parseInlineCode(item.example)}
      </div>
      <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2">
        {item.fix}
      </div>
      <pre className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-3 m-0 overflow-x-auto">
        <code className="text-sm text-slate-800 dark:text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
          {item.prompt}
        </code>
      </pre>
      {item.deepDivePageId && (
        <a
          href={`#/${item.deepDivePageId}`}
          className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Deep dive in Security Awareness guide {'\u2192'}
        </a>
      )}
    </div>
  )
}
