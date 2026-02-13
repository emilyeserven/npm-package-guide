import { PYRAMID_LEVELS } from '../../../data/testingData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { useNavigateToSection } from '../../../hooks/useNavigateToSection'

export function TestingPyramid() {
  const isDark = useIsDark()
  const navigate = useNavigateToSection()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', margin: '1.5rem 0' }}>
      {PYRAMID_LEVELS.map((level) => (
        <button
          key={level.id}
          onClick={() => navigate(level.pageId)}
          style={{
            width: level.widthPct,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '0.88rem',
            fontFamily: 'inherit',
            borderRadius: '8px',
            padding: '14px 12px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            background: isDark ? level.darkAccent : level.accent,
            border: `1.5px solid ${level.color}`,
            color: level.color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)'
            e.currentTarget.style.boxShadow = `0 4px 16px ${level.color}30`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {level.label} — {level.subtitle}
        </button>
      ))}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: '8px',
        fontSize: '0.75rem',
        color: ds('#94a3b8', '#64748b', isDark),
      }}>
        <span>{'\u2B06'} Slower · More realistic · Costlier</span>
        <span>Faster · More isolated · Cheaper {'\u2B07'}</span>
      </div>
    </div>
  )
}
