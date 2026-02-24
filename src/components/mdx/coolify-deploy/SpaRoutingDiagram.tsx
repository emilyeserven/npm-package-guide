import { useIsDark } from '../../../hooks/useTheme'

export function SpaRoutingDiagram() {
  const isDark = useIsDark()
  const dim = isDark ? 'text-slate-500' : 'text-slate-400'

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-6 my-6 overflow-x-auto space-y-4">
      {/* Success: client-side nav */}
      <div className="flex items-center gap-2.5 min-w-fit justify-center">
        <div className="px-4 py-2.5 rounded-lg border font-mono text-xs font-medium bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-500/10 dark:border-purple-500/30 dark:text-purple-300 shrink-0">
          Click link → /dash
        </div>
        <span className={`font-mono text-base shrink-0 ${dim}`}>→</span>
        <div className="px-4 py-2.5 rounded-lg border font-mono text-xs font-medium bg-green-50 border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-300 shrink-0">
          JS handles it ✓
        </div>
      </div>
      {/* Failure: page refresh */}
      <div className="flex items-center gap-2.5 min-w-fit justify-center">
        <div className="px-4 py-2.5 rounded-lg border font-mono text-xs font-medium bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-500/10 dark:border-purple-500/30 dark:text-purple-300 shrink-0">
          Refresh at /dash
        </div>
        <span className={`font-mono text-base shrink-0 ${dim}`}>→</span>
        <div className="px-4 py-2.5 rounded-lg border font-mono text-xs font-medium bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-300 shrink-0">
          Nginx: /dash?
        </div>
        <span className={`font-mono text-base shrink-0 ${dim}`}>→</span>
        <div className="px-4 py-2.5 rounded-lg border font-mono text-xs font-medium bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-300 shrink-0">
          404 Not Found ✗
        </div>
      </div>
    </div>
  )
}
