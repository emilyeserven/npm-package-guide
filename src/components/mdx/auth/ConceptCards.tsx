import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { AUTH_CONCEPT_SECTIONS } from '../../../data/authData'
import { CardBase } from '../CardBase'

export function ConceptCards({ sectionId }: { sectionId: 'core' | 'tokens' }) {
  const isDark = useIsDark()
  const section = AUTH_CONCEPT_SECTIONS.find(s => s.id === sectionId)
  if (!section) return null

  return (
    <div className="flex flex-col gap-4 mb-7">
      {section.concepts.map((c, i) => (
        <CardBase key={i} accentColor={ds(c.color, c.darkColor, isDark)} className="p-6">
          <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
            <h3
              className="text-base font-semibold m-0"
              style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
            >
              {c.term}
            </h3>
            <span
              className="px-3 py-0.5 rounded-full text-sm font-semibold whitespace-nowrap"
              style={{
                background: ds(c.color + '18', c.darkColor + '22', isDark),
                color: ds(c.color, c.darkColor, isDark),
              }}
            >
              {c.definition}
            </span>
          </div>
          <p
            className="text-sm italic mb-3.5 mt-0"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            💡 Analogy: {c.analogy}
          </p>
          <div className="flex flex-col gap-1.5">
            {c.examples.map((ex, j) => (
              <div
                key={j}
                className="flex items-center gap-2 text-sm"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                <span style={{ color: ds(c.color, c.darkColor, isDark) }}>▸</span>
                {ex}
              </div>
            ))}
          </div>
        </CardBase>
      ))}
    </div>
  )
}
