import parse from 'html-react-parser'
import { useIsDark } from '../../../hooks/useTheme'
import { S3_CONCEPTS, BUCKET_ITEMS } from '../../../data/s3Data'
import { CardBase } from '../CardBase'

export function S3ConceptGrid() {
  const isDark = useIsDark()

  return (
    <div>
      {/* Bucket diagram */}
      <div className="flex flex-col items-center my-8">
        <span
          className="text-sm font-mono font-medium mb-2"
          style={{ color: isDark ? '#f0a840' : '#d97706' }}
        >
          my-app-bucket
        </span>
        <div
          className="w-48 rounded-b-3xl border-3 border-t-0 relative flex flex-col items-center justify-end p-3 gap-1 overflow-hidden"
          style={{
            borderColor: isDark ? '#f0a840' : '#d97706',
            minHeight: 170,
          }}
        >
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '60%',
              background: `linear-gradient(to top, ${isDark ? 'rgba(240,168,64,0.15)' : 'rgba(217,119,6,0.1)'}, transparent)`,
            }}
          />
          {BUCKET_ITEMS.map(item => (
            <span
              key={item.label}
              className="relative z-10 text-xs font-mono px-2.5 py-1 rounded-md border"
              style={{
                background: isDark ? '#222838' : '#f1f5f9',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                color: isDark ? '#94a3b8' : '#64748b',
              }}
            >
              {item.icon} {item.label}
            </span>
          ))}
        </div>
        <p
          className="text-xs text-center mt-2 max-w-[260px]"
          style={{ color: isDark ? '#64748b' : '#94a3b8' }}
        >
          An S3 Bucket is just a named container for your files (called &ldquo;objects&rdquo;).
        </p>
      </div>

      {/* Concept cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {S3_CONCEPTS.map(concept => (
          <CardBase key={concept.id} accentColor={isDark ? concept.darkColor : concept.color}>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{
                  background: `${isDark ? concept.darkColor : concept.color}20`,
                  color: isDark ? concept.darkColor : concept.color,
                }}
              >
                {concept.icon}
              </span>
              <h4
                className="font-mono text-sm font-medium m-0"
                style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
              >
                {concept.title}
              </h4>
            </div>
            <p
              className="text-sm leading-relaxed m-0"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              {parse(concept.description)}
            </p>
          </CardBase>
        ))}
      </div>
    </div>
  )
}
