import { PAYLOAD_CONCEPTS } from '../../../data/payloadData'
import type { PayloadConcept } from '../../../data/payloadData'
import { AccordionList } from '../AccordionList'

export function PayloadConceptAccordion() {
  return (
    <AccordionList<PayloadConcept>
      items={PAYLOAD_CONCEPTS}
      className="mb-7"
      gap="gap-3"
      itemClassName="rounded-xl border overflow-hidden px-5 py-4"
      itemStyle={(_item, isDark) => ({
        background: isDark ? '#1e293b' : '#ffffff',
        borderColor: isDark ? '#334155' : '#e2e8f0',
      })}
      renderHeader={(c, _i, isDark) => (
        <span
          className="font-semibold text-sm"
          style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
        >
          {c.title}
        </span>
      )}
      renderBody={(c, _i, isDark) => (
        <div
          className="pt-3 text-sm leading-relaxed -mx-5 px-5"
          style={{
            borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            color: isDark ? '#cbd5e1' : '#475569',
          }}
          dangerouslySetInnerHTML={{ __html: c.body }}
        />
      )}
    />
  )
}
