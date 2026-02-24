import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import {
  JCS_COLLECTION_METHODS,
  JCS_CLI_FLAGS,
  JCS_NODE_TYPES,
  JCS_BUILDERS,
  JCS_AGENT_SCENARIOS,
} from '../../../data/jscodeshiftData'

function TableWrapper({ children }: { children: React.ReactNode }) {
  const isDark = useIsDark()
  return (
    <div
      className="rounded-xl border overflow-hidden my-6"
      style={{
        borderColor: ds('#e2e8f0', '#334155', isDark),
      }}
    >
      <div className="overflow-x-auto">
        {children}
      </div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  const isDark = useIsDark()
  return (
    <th
      className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider"
      style={{
        background: ds('#f1f5f9', '#1e293b', isDark),
        color: ds('#64748b', '#64748b', isDark),
        borderBottom: `1px solid ${ds('#e2e8f0', '#334155', isDark)}`,
      }}
    >
      {children}
    </th>
  )
}

function Td({ children, mono = false }: { children: React.ReactNode; mono?: boolean }) {
  const isDark = useIsDark()
  return (
    <td
      className={`px-4 py-3 text-sm ${mono ? 'font-mono' : ''}`}
      style={{
        color: ds('#334155', '#cbd5e1', isDark),
        borderBottom: `1px solid ${ds('#f1f5f9', '#1e293b', isDark)}`,
      }}
    >
      {children}
    </td>
  )
}

function CodeTd({ children }: { children: string }) {
  const isDark = useIsDark()
  return (
    <td
      className="px-4 py-3 text-xs font-mono"
      style={{
        color: ds('#3b82f6', '#60a5fa', isDark),
        borderBottom: `1px solid ${ds('#f1f5f9', '#1e293b', isDark)}`,
      }}
    >
      <code
        className="px-1.5 py-0.5 rounded text-xs"
        style={{
          background: ds('#f0f4ff', 'rgba(96,165,250,0.08)', isDark),
          border: `1px solid ${ds('#dbeafe', 'rgba(96,165,250,0.15)', isDark)}`,
        }}
      >
        {children}
      </code>
    </td>
  )
}

/** Collection methods table for the API page. */
export function JcsMethodTable() {
  return (
    <TableWrapper>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <Th>Method</Th>
            <Th>Description</Th>
            <Th>Returns</Th>
          </tr>
        </thead>
        <tbody>
          {JCS_COLLECTION_METHODS.map(m => (
            <tr key={m.method}>
              <CodeTd>{m.method}</CodeTd>
              <Td>{m.description}</Td>
              <Td mono>{m.returns}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}

/** CLI flags reference table. */
export function JcsCliFlagsTable() {
  return (
    <TableWrapper>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <Th>Flag</Th>
            <Th>Description</Th>
            <Th>Default</Th>
          </tr>
        </thead>
        <tbody>
          {JCS_CLI_FLAGS.map(f => (
            <tr key={f.flag}>
              <CodeTd>{f.flag}</CodeTd>
              <Td>{f.description}</Td>
              <Td mono>{f.defaultVal}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}

/** Common AST node types reference table. */
export function JcsNodeTypeTable() {
  return (
    <TableWrapper>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <Th>Node Type</Th>
            <Th>Represents</Th>
            <Th>Example</Th>
          </tr>
        </thead>
        <tbody>
          {JCS_NODE_TYPES.map(n => (
            <tr key={n.nodeType}>
              <CodeTd>{n.nodeType}</CodeTd>
              <Td>{n.represents}</Td>
              <CodeTd>{n.example}</CodeTd>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}

/** Builder cheat sheet table. */
export function JcsBuilderTable() {
  return (
    <TableWrapper>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <Th>You want to create&hellip;</Th>
            <Th>Builder call</Th>
          </tr>
        </thead>
        <tbody>
          {JCS_BUILDERS.map(b => (
            <tr key={b.description}>
              <Td>{b.description}</Td>
              <CodeTd>{b.call}</CodeTd>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}

/** Decision table: when to use jscodeshift vs direct edits. */
export function JcsAgentDecisionTable() {
  const isDark = useIsDark()
  const tagColors: Record<string, { bg: string; darkBg: string; text: string; darkText: string }> = {
    blue: { bg: 'rgba(96,165,250,0.12)', darkBg: 'rgba(96,165,250,0.12)', text: '#3b82f6', darkText: '#60a5fa' },
    green: { bg: 'rgba(52,211,153,0.12)', darkBg: 'rgba(52,211,153,0.12)', text: '#059669', darkText: '#34d399' },
    amber: { bg: 'rgba(251,191,36,0.12)', darkBg: 'rgba(251,191,36,0.12)', text: '#d97706', darkText: '#fbbf24' },
  }

  return (
    <TableWrapper>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <Th>Scenario</Th>
            <Th>Approach</Th>
            <Th>Why</Th>
          </tr>
        </thead>
        <tbody>
          {JCS_AGENT_SCENARIOS.map(s => {
            const c = tagColors[s.approachColor]
            return (
              <tr key={s.scenario}>
                <Td>{s.scenario}</Td>
                <td
                  className="px-4 py-3 text-sm"
                  style={{ borderBottom: `1px solid ${ds('#f1f5f9', '#1e293b', isDark)}` }}
                >
                  <span
                    className="inline-block font-mono text-[11px] px-2 py-0.5 rounded"
                    style={{
                      background: ds(c.bg, c.darkBg, isDark),
                      color: ds(c.text, c.darkText, isDark),
                    }}
                  >
                    {s.approach}
                  </span>
                </td>
                <Td>{s.why}</Td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </TableWrapper>
  )
}
