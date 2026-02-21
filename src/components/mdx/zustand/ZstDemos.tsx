import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { ZUSTAND_STATS } from '../../../data/zustandData'

function DemoWrapper({ title, description, children }: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  const isDark = useIsDark()
  const accent = ds('#d97706', '#f59e0b', isDark)

  return (
    <div
      className="rounded-xl overflow-hidden mb-5"
      style={{ border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
    >
      <div
        className="px-4 py-3"
        style={{
          background: tc(theme.bgCard, isDark),
          borderBottom: `1px solid ${tc(theme.borderDefault, isDark)}`,
        }}
      >
        <div className="text-sm font-bold font-mono" style={{ color: accent }}>
          {'\u25b6'} {title}
        </div>
        {description && (
          <div className="text-xs mt-1" style={{ color: tc(theme.textMuted, isDark) }}>
            {description}
          </div>
        )}
      </div>
      <div className="p-4" style={{ background: tc(theme.bgCard, isDark) }}>
        {children}
      </div>
    </div>
  )
}

/**
 * Live counter demo — demonstrates Zustand-style state updates.
 */
export function ZstCounter() {
  const isDark = useIsDark()
  const [cnt, setCnt] = useState(0)
  const accent = ds('#d97706', '#f59e0b', isDark)

  return (
    <DemoWrapper title="Live Counter Demo" description="Click to see Zustand-style state updates">
      <div className="flex items-center gap-3">
        <button
          className="rounded-md font-bold cursor-pointer text-sm"
          style={{
            background: accent,
            color: '#000',
            border: 'none',
            padding: '8px 16px',
          }}
          onClick={() => setCnt((c) => c - 1)}
        >
          {'\u2212'}
        </button>
        <span
          className="font-mono font-extrabold text-center"
          style={{ color: accent, fontSize: 28, minWidth: 60 }}
        >
          {cnt}
        </span>
        <button
          className="rounded-md font-bold cursor-pointer text-sm"
          style={{
            background: accent,
            color: '#000',
            border: 'none',
            padding: '8px 16px',
          }}
          onClick={() => setCnt((c) => c + 1)}
        >
          +
        </button>
        <button
          className="rounded-md font-bold cursor-pointer text-sm"
          style={{
            background: 'transparent',
            color: tc(theme.textMuted, isDark),
            border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            padding: '8px 16px',
          }}
          onClick={() => setCnt(0)}
        >
          Reset
        </button>
      </div>
    </DemoWrapper>
  )
}

/**
 * Live todo list demo — demonstrates immutable state updates.
 */
export function ZstTodo() {
  const isDark = useIsDark()
  const [items, setItems] = useState(['Learn Zustand', 'Build something'])
  const [nw, setNw] = useState('')
  const accent = ds('#d97706', '#f59e0b', isDark)
  const codeBg = ds('#f1f5f9', '#0d1117', isDark)

  const addItem = () => {
    if (nw.trim()) {
      setItems((i) => [...i, nw.trim()])
      setNw('')
    }
  }

  return (
    <DemoWrapper title="Live Todo Demo" description="A mini Zustand-style todo list">
      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 rounded-md text-sm font-mono outline-none"
          style={{
            background: codeBg,
            border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            padding: '8px 12px',
            color: tc(theme.textPrimary, isDark),
          }}
          placeholder="Add a todo..."
          value={nw}
          onChange={(e) => setNw(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addItem() }}
        />
        <button
          className="rounded-md font-bold cursor-pointer text-sm"
          style={{ background: accent, color: '#000', border: 'none', padding: '8px 16px' }}
          onClick={addItem}
        >
          Add
        </button>
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-center rounded-md mb-1.5 text-sm font-mono"
          style={{
            background: codeBg,
            border: `1px solid ${tc(theme.borderDefault, isDark)}`,
            padding: '8px 12px',
            color: tc(theme.textPrimary, isDark),
          }}
        >
          {item}
          <button
            className="cursor-pointer text-sm"
            style={{
              background: 'none',
              border: 'none',
              color: ds('#dc2626', '#ef4444', isDark),
            }}
            onClick={() => setItems((x) => x.filter((_, idx) => idx !== i))}
          >
            {'\u2717'}
          </button>
        </div>
      ))}
      <div
        className="mt-2 text-xs font-mono"
        style={{ color: tc(theme.textMuted, isDark) }}
      >
        {items.length} items — all state changes are immutable (new array via spread)
      </div>
    </DemoWrapper>
  )
}

/**
 * Re-render visualizer — shows how selectors affect render counts.
 */
export function ZstRerenderViz() {
  const isDark = useIsDark()
  const [sd, setSd] = useState({ count: 0, renders: 0 })
  const accent = ds('#d97706', '#f59e0b', isDark)
  const ok = ds('#059669', '#10b981', isDark)
  const codeBg = ds('#f1f5f9', '#0d1117', isDark)
  const codeText = ds('#d97706', '#e2b44a', isDark)

  return (
    <DemoWrapper title="Re-render Visualizer" description="Click to see how selectors affect render counts">
      <div className="flex gap-4 items-center flex-wrap">
        <button
          className="rounded-md font-bold cursor-pointer text-sm"
          style={{ background: accent, color: '#000', border: 'none', padding: '8px 16px' }}
          onClick={() => setSd((d) => ({ count: d.count + 1, renders: d.renders + 1 }))}
        >
          Update count (triggers re-render)
        </button>
        <div className="font-mono text-sm" style={{ color: tc(theme.textPrimary, isDark) }}>
          count: <span className="font-bold" style={{ color: accent }}>{sd.count}</span>
          {' | '}renders: <span className="font-bold" style={{ color: ok }}>{sd.renders}</span>
        </div>
      </div>
      <div
        className="mt-3 text-xs leading-relaxed"
        style={{ color: tc(theme.textMuted, isDark) }}
      >
        With a proper selector like{' '}
        <code
          className="text-xs font-mono rounded px-1.5 py-0.5"
          style={{ background: codeBg, color: codeText, border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
        >
          {'(s) => s.count'}
        </code>
        , only components that read{' '}
        <code
          className="text-xs font-mono rounded px-1.5 py-0.5"
          style={{ background: codeBg, color: codeText, border: `1px solid ${tc(theme.borderDefault, isDark)}` }}
        >
          count
        </code>
        {' '}would re-render. Other components stay untouched. Without a selector, <em>every</em> consumer re-renders.
      </div>
    </DemoWrapper>
  )
}

/**
 * Stats grid shown on the Basics page.
 */
export function ZstStats() {
  const isDark = useIsDark()
  const accent = ds('#d97706', '#f59e0b', isDark)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {ZUSTAND_STATS.map((x) => (
        <div
          key={x.stat}
          className="rounded-lg p-4 text-center"
          style={{
            background: tc(theme.bgCard, isDark),
            border: `1px solid ${tc(theme.borderDefault, isDark)}`,
          }}
        >
          <div className="text-xl font-extrabold font-mono" style={{ color: accent }}>
            {x.stat}
          </div>
          <div className="text-xs mt-1" style={{ color: tc(theme.textMuted, isDark) }}>
            {x.description}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Slices comparison cards for single vs multiple stores.
 */
export function ZstSlicesCompare() {
  const isDark = useIsDark()
  const accent = ds('#d97706', '#f59e0b', isDark)
  const ok = ds('#059669', '#10b981', isDark)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
      <div
        className="rounded-lg p-4"
        style={{
          background: tc(theme.bgCard, isDark),
          border: `1px solid ${tc(theme.borderDefault, isDark)}`,
        }}
      >
        <div className="font-bold mb-2 text-sm" style={{ color: ok }}>Multiple Stores</div>
        <ul
          className="text-sm leading-relaxed pl-4 m-0 list-disc"
          style={{ color: tc(theme.textPrimary, isDark) }}
        >
          <li>Simple & isolated</li>
          <li>Each store is independent</li>
          <li>Can&apos;t easily share state</li>
          <li>Good for unrelated state</li>
        </ul>
      </div>
      <div
        className="rounded-lg p-4"
        style={{
          background: tc(theme.bgCard, isDark),
          border: `1px solid ${accent}`,
        }}
      >
        <div className="font-bold mb-2 text-sm" style={{ color: accent }}>Single Store + Slices</div>
        <ul
          className="text-sm leading-relaxed pl-4 m-0 list-disc"
          style={{ color: tc(theme.textPrimary, isDark) }}
        >
          <li>One source of truth</li>
          <li>Cross-slice access via get()</li>
          <li>Great for related state</li>
          <li>Scales well with patterns</li>
        </ul>
      </div>
    </div>
  )
}
