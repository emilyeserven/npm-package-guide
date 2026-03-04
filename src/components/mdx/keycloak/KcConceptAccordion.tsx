import { KC_CONCEPTS } from '../../../data/keycloakData'
import type { KcConceptItem } from '../../../data/keycloakData'
import { AccordionList } from '../AccordionList'

export function KcConceptAccordion() {
  return (
    <AccordionList<KcConceptItem>
      items={KC_CONCEPTS}
      className="mb-7"
      gap="gap-3"
      renderHeader={(item, _i, isDark) => (
        <span
          className="text-sm font-semibold"
          style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
        >
          {item.title}
        </span>
      )}
      renderBody={(item, _i, isDark) => (
        <div className="text-sm leading-relaxed space-y-3">
          <p
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
          {item.bullets && (
            <ul className="list-disc pl-5 space-y-1.5">
              {item.bullets.map((b, idx) => (
                <li
                  key={idx}
                  style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  dangerouslySetInnerHTML={{ __html: b }}
                />
              ))}
            </ul>
          )}
          {item.note && (
            <div
              className="rounded-lg px-4 py-3 text-sm leading-relaxed border-l-3"
              style={{
                background: isDark
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'rgba(59, 130, 246, 0.06)',
                borderColor: '#3b82f6',
                color: isDark ? '#94a3b8' : '#64748b',
              }}
            >
              <span
                className="font-semibold"
                style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
              >
                Frontend Analogy:{' '}
              </span>
              <span dangerouslySetInnerHTML={{ __html: item.note }} />
            </div>
          )}
        </div>
      )}
      renderIndicator={(expanded, isDark) => (
        <span
          className="text-xs transition-transform duration-200 shrink-0"
          style={{
            color: isDark ? '#64748b' : '#94a3b8',
            transform: expanded ? 'rotate(180deg)' : 'none',
          }}
        >
          &#9660;
        </span>
      )}
    />
  )
}
