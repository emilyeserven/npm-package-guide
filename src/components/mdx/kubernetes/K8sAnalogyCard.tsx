import { K8S_SECTIONS } from '../../../data/k8sData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'

export function K8sAnalogyCard({ sectionId }: { sectionId: string }) {
  const isDark = useIsDark()
  const section = K8S_SECTIONS.find(s => s.id === sectionId)
  if (!section?.analogy) return null

  const { frontend, infra, explain } = section.analogy

  return (
    <div
      className="rounded-xl border p-4 mb-6 mt-4"
      style={{
        background: ds(
          'linear-gradient(135deg, #eef2ff 0%, #f0f9ff 100%)',
          'linear-gradient(135deg, #1e1b4b 0%, #172554 100%)',
          isDark,
        ),
        borderColor: ds('#c7d2fe', 'rgba(129, 140, 248, 0.2)', isDark),
      }}
    >
      <div
        className="text-xs font-bold tracking-widest uppercase mb-3"
        style={{ color: ds('#6366f1', '#818cf8', isDark) }}
      >
        Frontend ↔ Infra Analogy
      </div>

      <div className="flex gap-3 mb-3 flex-wrap">
        {/* Frontend */}
        <div
          className="flex-1 min-w-36 rounded-lg px-3.5 py-2.5"
          style={{
            background: ds('rgba(99, 102, 241, 0.08)', 'rgba(99, 102, 241, 0.15)', isDark),
          }}
        >
          <div
            className="text-[10px] font-semibold mb-1"
            style={{ color: ds('#818cf8', '#a5b4fc', isDark) }}
          >
            FRONTEND
          </div>
          <div
            className="text-sm font-semibold"
            style={{ color: ds('#312e81', '#e0e7ff', isDark) }}
          >
            {frontend}
          </div>
        </div>

        {/* Separator */}
        <div
          className="flex items-center text-xl font-bold"
          style={{ color: ds('#6366f1', '#6366f1', isDark) }}
        >
          ≈
        </div>

        {/* Infra */}
        <div
          className="flex-1 min-w-36 rounded-lg px-3.5 py-2.5"
          style={{
            background: ds('rgba(168, 85, 247, 0.08)', 'rgba(168, 85, 247, 0.15)', isDark),
          }}
        >
          <div
            className="text-[10px] font-semibold mb-1"
            style={{ color: ds('#a855f7', '#c4b5fd', isDark) }}
          >
            INFRA
          </div>
          <div
            className="text-sm font-semibold"
            style={{ color: ds('#581c87', '#ede9fe', isDark) }}
          >
            {infra}
          </div>
        </div>
      </div>

      <div
        className="text-[13px] leading-relaxed italic"
        style={{ color: ds('#4338ca', '#c7d2fe', isDark) }}
      >
        {explain}
      </div>
    </div>
  )
}
