import { PYRAMID_LEVELS } from '../../data/testingData'
import type { TestType } from '../../data/testingData'
import { useIsDark } from '../../hooks/useTheme'
import { ds } from '../../helpers/darkStyle'

export function TestTypeDetail({ type }: { type: TestType }) {
  const isDark = useIsDark()
  const level = PYRAMID_LEVELS.find((l) => l.id === type)
  if (!level) return null

  return (
    <div>
      {/* Description */}
      <p
        style={{
          fontSize: '0.92rem',
          lineHeight: 1.7,
          color: ds('#475569', '#94a3b8', isDark),
          marginBottom: '1rem',
        }}
        dangerouslySetInnerHTML={{ __html: level.description.replace(/\*\*(.*?)\*\*/g, '<strong style="color: ' + ds('#1e293b', '#e2e8f0', isDark) + '">$1</strong>') }}
      />

      {/* What to Test / What NOT to Test grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        margin: '1rem 0',
      }}>
        <div style={{
          background: ds('#f8fafc', '#1e293b', isDark),
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          border: `1px solid ${ds('#e2e8f0', '#334155', isDark)}`,
        }}>
          <div style={{
            fontSize: '0.78rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 700,
            color: ds('#64748b', '#94a3b8', isDark),
            marginBottom: '0.6rem',
          }}>What to test</div>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', listStyle: 'disc' }}>
            {level.whatToTest.map((item, i) => (
              <li key={i} style={{
                fontSize: '0.88rem',
                color: ds('#475569', '#cbd5e1', isDark),
                lineHeight: 1.7,
                marginBottom: '2px',
              }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{
          background: ds('#f8fafc', '#1e293b', isDark),
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          border: `1px solid ${ds('#e2e8f0', '#334155', isDark)}`,
        }}>
          <div style={{
            fontSize: '0.78rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 700,
            color: ds('#64748b', '#94a3b8', isDark),
            marginBottom: '0.6rem',
          }}>What NOT to test</div>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', listStyle: 'disc' }}>
            {level.whatNotToTest.map((item, i) => (
              <li key={i} style={{
                fontSize: '0.88rem',
                color: ds('#475569', '#cbd5e1', isDark),
                lineHeight: 1.7,
                marginBottom: '2px',
              }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Code example */}
      <div style={{
        fontSize: '0.88rem',
        fontWeight: 600,
        color: ds('#334155', '#e2e8f0', isDark),
        marginTop: '1.25rem',
        marginBottom: '0.5rem',
      }}>
        Example:
      </div>
      <div style={{
        background: ds('#1e293b', '#0f172a', isDark),
        border: `1px solid ${ds('#334155', '#1e293b', isDark)}`,
        borderRadius: '10px',
        padding: '1rem 1.25rem',
        overflowX: 'auto',
      }}>
        <div style={{
          fontSize: '0.78rem',
          color: level.color,
          marginBottom: '0.5rem',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        }}>
          {'// '}{level.codeComment}
        </div>
        <pre style={{
          margin: 0,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: '0.8rem',
          lineHeight: 1.7,
          color: '#94a3b8',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {level.codeExample}
        </pre>
      </div>
    </div>
  )
}
