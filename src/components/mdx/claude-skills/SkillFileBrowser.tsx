import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { SKILL_FILES } from '../../../data/claudeSkillsData'

export function SkillFileBrowser() {
  const isDark = useIsDark()
  const [activeFile, setActiveFile] = useState('skill')
  const current = SKILL_FILES.find(f => f.key === activeFile) ?? SKILL_FILES[0]

  return (
    <div className="flex flex-col gap-4">
      <p style={{ color: ds('#374151', '#cbd5e1', isDark) }} className="leading-relaxed">
        A skill is a folder. The only required file is{' '}
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono"
          style={{
            background: ds('#f3f4f6', '#334155', isDark),
            color: ds('#7c3aed', '#a78bfa', isDark),
          }}
        >
          SKILL.md
        </code>
        . Everything else is optional but powerful.
      </p>

      <div
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: ds('#e5e7eb', '#334155', isDark) }}
      >
        {/* Tab bar */}
        <div
          className="flex border-b"
          style={{
            background: ds('#f9fafb', '#0f172a', isDark),
            borderColor: ds('#e5e7eb', '#334155', isDark),
          }}
        >
          {SKILL_FILES.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFile(f.key)}
              className="px-4 py-2.5 text-sm font-mono transition-colors relative"
              style={{
                background: activeFile === f.key
                  ? ds('#ffffff', '#1e293b', isDark)
                  : 'transparent',
                color: activeFile === f.key
                  ? ds('#7c3aed', '#a78bfa', isDark)
                  : ds('#6b7280', '#64748b', isDark),
                fontWeight: activeFile === f.key ? 600 : 400,
              }}
            >
              {f.name}
              {f.required && <span className="ml-1 text-xs text-rose-500">*</span>}
              {activeFile === f.key && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: ds('#7c3aed', '#a78bfa', isDark) }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <pre className="p-4 text-sm font-mono overflow-x-auto min-h-[280px]"
          style={{
            background: ds('#111827', '#0f172a', isDark),
            color: ds('#f3f4f6', '#e2e8f0', isDark),
          }}
        >
          {current.content}
        </pre>
      </div>

      <div className="flex gap-2 text-xs" style={{ color: ds('#6b7280', '#64748b', isDark) }}>
        <span className="text-rose-500">*</span> = required
      </div>
    </div>
  )
}
