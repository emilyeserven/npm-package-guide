import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { GO_USE_CASES, GO_FRONTEND_USES } from '../../../data/goLangData'
import type { GoUseCase } from '../../../data/goLangData'

const SECTIONS: Record<string, GoUseCase[]> = {
  useCases: GO_USE_CASES,
  frontendUses: GO_FRONTEND_USES,
}

export function GoUseCaseGrid({ section }: { section: 'useCases' | 'frontendUses' }) {
  const isDark = useIsDark()
  const items = SECTIONS[section]
  if (!items) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border p-5 transition-colors"
          style={{
            background: ds('#ffffff', '#1e293b', isDark),
            borderColor: ds('#e2e8f0', '#334155', isDark),
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3"
            style={{
              background: ds(`${item.accent}12`, `${item.darkAccent}18`, isDark),
              color: ds(item.accent, item.darkAccent, isDark),
            }}
          >
            {item.icon}
          </div>
          <h4
            className="text-[15px] font-semibold mb-1.5"
            style={{ color: ds('#1e293b', '#f1f5f9', isDark) }}
          >
            {item.title}
          </h4>
          <p
            className="text-sm leading-relaxed mb-0"
            style={{ color: ds('#64748b', '#94a3b8', isDark) }}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}
