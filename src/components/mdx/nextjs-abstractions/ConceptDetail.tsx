import { useState } from 'react'
import parse from 'html-react-parser'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { NJA_CONCEPTS } from '../../../data/njaData'
import type { StackNote } from '../../../data/njaData'

const difficultyMeta: Record<string, { label: string; color: string; darkColor: string }> = {
  beginner: { label: 'Beginner-Friendly', color: '#22c55e', darkColor: '#4ade80' },
  intermediate: { label: 'Some Learning Needed', color: '#f59e0b', darkColor: '#fbbf24' },
  advanced: { label: 'Significant Effort', color: '#ef4444', darkColor: '#f87171' },
}

function StackNoteItem({ note, isDark }: { note: StackNote; isDark: boolean }) {
  return (
    <div
      className="flex items-start gap-3 rounded-lg px-3 py-2.5"
      style={{ background: ds('#f8fafc', 'rgba(255,255,255,0.03)', isDark) }}
    >
      <span className="text-base shrink-0 mt-0.5">{note.icon}</span>
      <div className="min-w-0">
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: ds('#475569', '#94a3b8', isDark) }}
        >
          {note.framework}
        </span>
        <p
          className="text-sm leading-relaxed mt-1 mb-0"
          style={{ color: ds('#475569', '#cbd5e1', isDark) }}
        >
          {parse(note.note)}
        </p>
        {note.packages && note.packages.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {note.packages.map(pkg => (
              <span
                key={pkg}
                className="text-xs font-mono px-2 py-0.5 rounded-md"
                style={{
                  background: ds('#e2e8f0', 'rgba(255,255,255,0.06)', isDark),
                  color: ds('#64748b', '#94a3b8', isDark),
                }}
              >
                {pkg}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function ConceptDetail({ conceptId }: { conceptId: string }) {
  const isDark = useIsDark()
  const [stackOpen, setStackOpen] = useState(true)
  const concept = NJA_CONCEPTS.find(c => c.id === conceptId)
  if (!concept) return null

  const diff = difficultyMeta[concept.difficulty]
  const accent = isDark ? concept.darkColor : concept.color

  return (
    <div className="mb-6">
      {/* Difficulty badge */}
      <div className="mb-4">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full font-mono"
          style={{
            background: accent + '18',
            color: accent,
          }}
        >
          {diff.label}
        </span>
      </div>

      {/* Comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div
          className="rounded-xl p-4 border-l-[3px]"
          style={{
            background: ds('#f8fafc', '#1e293b', isDark),
            borderLeftColor: concept.color,
          }}
        >
          <div
            className="text-xs font-bold uppercase tracking-wider mb-2 font-mono"
            style={{ color: concept.color }}
          >
            What Next.js Does For You
          </div>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: ds('#475569', '#cbd5e1', isDark) }}
          >
            {parse(concept.whatNextDoes)}
          </p>
        </div>
        <div
          className="rounded-xl p-4 border-l-[3px]"
          style={{
            background: ds('#f8fafc', '#1e293b', isDark),
            borderLeftColor: '#f59e0b',
          }}
        >
          <div
            className="text-xs font-bold uppercase tracking-wider mb-2 font-mono"
            style={{ color: '#f59e0b' }}
          >
            What You Need To Do Instead
          </div>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: ds('#475569', '#cbd5e1', isDark) }}
          >
            {parse(concept.whatYouNeed)}
          </p>
        </div>
      </div>

      {/* For Your Stack */}
      {concept.stackNotes.length > 0 && (
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            borderColor: ds('#e2e8f0', '#334155', isDark),
            background: ds('#ffffff', '#0f172a', isDark),
          }}
        >
          <button
            onClick={() => setStackOpen(!stackOpen)}
            className="w-full flex items-center justify-between px-4 py-3 cursor-pointer border-none bg-transparent"
            style={{ background: ds('#f1f5f9', 'rgba(255,255,255,0.03)', isDark) }}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: ds('#1e293b', '#e2e8f0', isDark) }}
              id="toc-stack"
            >
              For Your Stack
            </span>
            <span
              className="text-xs transition-transform duration-200"
              style={{
                color: ds('#64748b', '#94a3b8', isDark),
                transform: stackOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              ▼
            </span>
          </button>
          {stackOpen && (
            <div className="flex flex-col gap-2 p-3">
              {concept.stackNotes.map(note => (
                <StackNoteItem key={note.framework} note={note} isDark={isDark} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
