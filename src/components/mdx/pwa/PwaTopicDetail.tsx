import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { getPwaTopic } from '../../../data/pwaData'
import { CopyButton } from '../CopyButton'
import { PwaLifecycleDiagram } from './PwaLifecycleDiagram'
import { PwaCachingDiagram } from './PwaCachingDiagram'

/**
 * Renders full topic content for a PWA guide page.
 * Reads data from PWA_TOPICS, renders body, key points, optional diagram, and code block.
 */
export function PwaTopicDetail({ topicId }: { topicId: string }) {
  const isDark = useIsDark()
  const topic = getPwaTopic(topicId)

  if (!topic) return null

  return (
    <div className="flex flex-col gap-6">
      {/* Body paragraphs */}
      {topic.body.split('\n\n').map((para, i) => (
        <p
          key={i}
          className="text-sm leading-relaxed m-0"
          style={{ color: ds('#475569', '#94a3b8', isDark) }}
          dangerouslySetInnerHTML={{ __html: para }}
        />
      ))}

      {/* Key points */}
      {topic.keyPoints.length > 0 && (
        <div
          className="rounded-xl border p-4"
          style={{
            background: ds('#f0f0ff', 'rgba(108,99,255,0.06)', isDark),
            borderColor: ds('#e0e0ff', 'rgba(108,99,255,0.15)', isDark),
          }}
        >
          {topic.keyPoints.map((point, i) => (
            <div
              key={i}
              className="py-1.5 text-sm leading-relaxed"
              style={{
                color: ds('#475569', '#94a3b8', isDark),
                borderBottom: i < topic.keyPoints.length - 1
                  ? `1px solid ${ds('#e8e8f8', 'rgba(255,255,255,0.04)', isDark)}`
                  : 'none',
              }}
            >
              <span
                className="mr-2 font-semibold"
                style={{ color: ds('#6c63ff', '#8b83ff', isDark) }}
              >
                &rsaquo;
              </span>
              {point}
            </div>
          ))}
        </div>
      )}

      {/* Interactive diagrams */}
      {topic.diagram === 'lifecycle' && <PwaLifecycleDiagram />}
      {topic.diagram === 'caching' && <PwaCachingDiagram />}

      {/* Code block */}
      {topic.code && (
        <div className="relative">
          <CopyButton text={topic.code} />
          <pre
            className="rounded-lg border p-4 overflow-x-auto text-xs leading-relaxed font-mono m-0"
            style={{
              background: ds('#f8fafc', '#0f172a', isDark),
              borderColor: ds('#e2e8f0', '#1e293b', isDark),
              color: ds('#334155', '#cbd5e1', isDark),
            }}
          >
            {topic.code}
          </pre>
        </div>
      )}
    </div>
  )
}
