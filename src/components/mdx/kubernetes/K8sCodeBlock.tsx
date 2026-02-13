import { K8S_SECTIONS } from '../../../data/k8sData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function K8sCodeBlock({ sectionId }: { sectionId: string }) {
  const isDark = useIsDark()
  const section = K8S_SECTIONS.find(s => s.id === sectionId)
  if (!section?.codeExample) return null

  const { title, code } = section.codeExample

  return (
    <div className="my-4">
      <div
        className="text-xs font-bold tracking-widest uppercase mb-2"
        style={{ color: ds('#059669', '#34d399', isDark) }}
      >
        {title}
      </div>
      <pre
        className="rounded-xl border p-4 overflow-auto text-xs leading-relaxed font-mono m-0"
        style={{
          background: ds('#1e293b', '#0d1117', isDark),
          borderColor: ds('rgba(52, 211, 153, 0.2)', 'rgba(52, 211, 153, 0.2)', isDark),
          color: ds('#e2e8f0', '#e6edf3', isDark),
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
