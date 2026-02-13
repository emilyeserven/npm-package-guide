import { roadmapSteps } from '../../../data/roadmapSteps'
import { getNavTitle } from '../../../data/navigation'
import { JumpButton } from '../../JumpButton'

export function RoadmapSteps() {
  return (
    <>
      {roadmapSteps.map(step => (
        <div key={step.num} className="step-card flex gap-4 py-4.5 border-b border-slate-200 dark:border-slate-700 relative last:border-b-0">
          <div className="step-number w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shrink-0 relative">
            {step.num}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1" dangerouslySetInnerHTML={{ __html: step.title }} />
            <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: step.desc }} />
            <div className="step-detail text-xs text-gray-400 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800 rounded-lg py-2.5 px-3.5 mb-2 border border-slate-100 dark:border-slate-700" dangerouslySetInnerHTML={{ __html: step.detail }} />
            {step.jumpTo && (
              <JumpButton jumpTo={step.jumpTo}>
                {'\u2192'} Deep dive: {getNavTitle(step.jumpTo)}
              </JumpButton>
            )}
            {step.substep && (
              <div className="mt-4 pl-3.5 border-l-2 border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 mb-0.5">{step.substep.title}</h3>
                <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed">{step.substep.text}</div>
                <JumpButton jumpTo={step.substep.jumpTo} style={{ marginTop: 4 }}>
                  {'\u2192'} Deep dive: {getNavTitle(step.substep.jumpTo)}
                </JumpButton>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
