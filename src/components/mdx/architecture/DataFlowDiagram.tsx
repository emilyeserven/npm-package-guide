import { DATA_FLOW, LAYER_COLORS } from '../../../data/archData'
import type { DataFlowItem } from '../../../data/archData'
import { ds } from '../../../helpers/darkStyle'
import { TimelineFlow } from '../TimelineFlow'

export function DataFlowDiagram() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <TimelineFlow<DataFlowItem>
        items={DATA_FLOW}
        gap="gap-1"
        itemGap="gap-2.5"
        className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm"
        heading={
          <div className="mb-3">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
              {"\u{1F501}"} Data flow through the stack
            </div>
            <p className="text-[13px] text-slate-400 dark:text-slate-500 m-0">
              Every request follows this path regardless of which technology fills each layer.
            </p>
          </div>
        }
        renderIndicator={(item) => {
          const lc = LAYER_COLORS[item.colorId]
          return (
            <span
              className="flex items-center justify-center rounded-full text-white text-[11px] font-bold shrink-0"
              style={{ background: lc?.color ?? '#94a3b8', width: 24, height: 24, minWidth: 24 }}
            >
              {item.step}
            </span>
          )
        }}
        renderContent={(item, _i, isDark) => {
          const lc = LAYER_COLORS[item.colorId]
          return (
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] flex-1"
              style={{ background: ds('#f8fafc', '#0f172a', isDark) }}
            >
              <span className="flex-1" style={{ color: ds('#374151', '#e2e8f0', isDark) }}>
                {item.text}
              </span>
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap shrink-0"
                style={{
                  color: lc?.color ?? '#94a3b8',
                  background: `${lc?.color ?? '#94a3b8'}10`,
                }}
              >
                {item.tag}
              </span>
            </div>
          )
        }}
        renderConnector={() => <div className="w-0.5 grow min-h-1 bg-slate-200 dark:bg-slate-700" />}
        footer={
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 mb-0 text-center">
            All server-side layers run on <strong className="text-yellow-600 dark:text-yellow-300">Node.js</strong> &mdash; the JavaScript engine that powers everything outside the browser.
          </p>
        }
      />
    </div>
  )
}
