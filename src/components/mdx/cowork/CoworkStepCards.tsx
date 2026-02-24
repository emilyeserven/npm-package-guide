import { AccordionList } from '../AccordionList'
import { ds } from '../../../helpers/darkStyle'
import { getStepsForPage } from '../../../data/coworkData'
import type { StepData } from '../../../data/coworkData'

export function CoworkStepCards({ pageId }: { pageId: string }) {
  const steps = getStepsForPage(pageId)
  if (!steps.length) return null

  return (
    <AccordionList<StepData>
      items={steps}
      gap="gap-3"
      itemClassName="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-5 py-4 cursor-pointer transition-all duration-150"
      renderHeader={(step, _i, isDark) => (
        <div className="flex items-start gap-4">
          <StepBadge number={step.number} isDark={isDark} />
          <span
            className="font-semibold text-sm pt-1"
            style={{ color: ds('#1e293b', '#f0ede8', isDark) }}
          >
            {step.title}
          </span>
        </div>
      )}
      renderBody={(step, _i, isDark) => (
        <div className="mt-3 pl-12 space-y-3">
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: ds('#64748b', '#9a968e', isDark) }}
          >
            {step.description}
          </p>
          {step.command && <CommandBlock command={step.command} isDark={isDark} />}
          {step.tip && <TipBlock tip={step.tip} isDark={isDark} />}
        </div>
      )}
      renderIndicator={(expanded, isDark) => (
        <span
          className="text-lg transition-transform duration-200 shrink-0"
          style={{
            color: ds('#94a3b8', '#5e5b55', isDark),
            transform: expanded ? 'rotate(180deg)' : 'none',
          }}
        >
          {'\u25BE'}
        </span>
      )}
    />
  )
}

function StepBadge({ number, isDark }: { number: number; isDark: boolean }) {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold shrink-0"
      style={{
        background: ds('#e2e8f0', '#334155', isDark),
        color: ds('#475569', '#94a3b8', isDark),
      }}
    >
      {number}
    </div>
  )
}

function CommandBlock({ command, isDark }: { command: string; isDark: boolean }) {
  return (
    <div
      className="rounded-lg border p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words"
      style={{
        background: ds('#f8fafc', '#0f172a', isDark),
        borderColor: ds('#e2e8f0', '#334155', isDark),
        color: ds('#ea580c', '#E8572A', isDark),
      }}
    >
      {command}
    </div>
  )
}

function TipBlock({ tip, isDark }: { tip: string; isDark: boolean }) {
  return (
    <div
      className="flex gap-2 items-start rounded-lg border p-2.5"
      style={{
        background: ds('#fff7ed', 'rgba(232,87,42,0.05)', isDark),
        borderColor: ds('#fed7aa', 'rgba(232,87,42,0.15)', isDark),
      }}
    >
      <span className="shrink-0 text-sm" style={{ color: '#E8572A' }}>{'\u2726'}</span>
      <span
        className="text-xs leading-relaxed"
        style={{ color: ds('#78716c', '#9a968e', isDark) }}
      >
        {tip}
      </span>
    </div>
  )
}
