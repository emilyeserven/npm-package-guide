import { useState } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { theme, tc } from '../../../helpers/themeColors'

type DemoState = 'initial' | 'tool-called' | 'approved' | 'denied'

export function TsaiApprovalDemo() {
  const isDark = useIsDark()
  const [state, setState] = useState<DemoState>('initial')

  const accent = ds('#f97316', '#fb923c', isDark)
  const border = tc(theme.borderDefault, isDark)
  const cardBg = tc(theme.bgCard, isDark)
  const green = ds('#16a34a', '#22c55e', isDark)
  const red = ds('#dc2626', '#ef4444', isDark)

  const handleTrigger = () => {
    if (state !== 'initial') return
    setState('tool-called')
  }

  const handleApproval = (approved: boolean) => {
    setState(approved ? 'approved' : 'denied')
  }

  const handleReset = () => setState('initial')

  const msgBg = ds('#f1f5f9', '#1e293b', isDark)

  return (
    <div
      className="rounded-xl overflow-hidden mb-6"
      style={{ background: cardBg, border: `1px solid ${border}` }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 font-mono text-xs"
        style={{
          background: ds('#f1f5f9', '#1e293b', isDark),
          borderBottom: `1px solid ${border}`,
          color: tc(theme.textMuted, isDark),
        }}
      >
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
        Interactive Demo — Tool Approval Flow
      </div>

      {/* Messages area */}
      <div className="flex flex-col gap-3 p-4">
        {/* User message */}
        <div
          className="max-w-[80%] self-end rounded-xl px-3.5 py-2 text-sm"
          style={{ background: accent, color: '#fff', borderBottomRightRadius: 4 }}
        >
          Send a summary email to alice@example.com
        </div>

        {/* Thinking */}
        <div
          className="max-w-[80%] self-start rounded-xl px-3.5 py-2 text-sm italic"
          style={{
            background: ds('rgba(6,182,212,0.06)', 'rgba(6,182,212,0.1)', isDark),
            border: `1px dashed ${ds('rgba(6,182,212,0.25)', 'rgba(6,182,212,0.35)', isDark)}`,
            color: ds('#0891b2', '#22d3ee', isDark),
          }}
        >
          {'\uD83D\uDCAD'} The user wants me to send an email. I&apos;ll use the send_email tool...
        </div>

        {/* Tool call (visible after trigger) */}
        {state !== 'initial' && (
          <div
            className="max-w-[80%] self-start rounded-lg px-3.5 py-2 text-xs font-mono"
            style={{
              background: ds('rgba(168,85,247,0.08)', 'rgba(168,85,247,0.12)', isDark),
              border: `1px solid ${ds('rgba(168,85,247,0.2)', 'rgba(168,85,247,0.3)', isDark)}`,
              color: ds('#9333ea', '#c084fc', isDark),
            }}
          >
            {'\uD83D\uDD27'} Tool Call: send_email({'{'} to: &quot;alice@example.com&quot;, subject: &quot;Weekly Summary&quot;, body: &quot;...&quot; {'}'})
          </div>
        )}

        {/* Approval card */}
        {state === 'tool-called' && (
          <div
            className="rounded-lg p-4"
            style={{
              background: ds('#fff7ed', '#1a1524', isDark),
              border: `1px solid ${ds('rgba(249,115,22,0.3)', 'rgba(249,115,22,0.35)', isDark)}`,
            }}
          >
            <h4
              className="text-sm font-semibold mb-2 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              {'\u26A0\uFE0F'} Tool Requires Approval: send_email
            </h4>
            <pre
              className="rounded-md px-3 py-2 font-mono text-xs mb-3 overflow-x-auto"
              style={{
                background: ds('#f8fafc', '#0d1117', isDark),
                color: tc(theme.textSecondary, isDark),
              }}
            >
{`{
  "to": "alice@example.com",
  "subject": "Weekly Summary",
  "body": "Here's your weekly project summary..."
}`}
            </pre>
            <div className="flex gap-2">
              <button
                className="rounded-md px-4 py-1.5 text-xs font-semibold cursor-pointer transition-opacity"
                style={{ background: green, color: '#fff' }}
                onClick={() => handleApproval(true)}
              >
                {'\u2713'} Approve
              </button>
              <button
                className="rounded-md px-4 py-1.5 text-xs font-semibold cursor-pointer transition-opacity"
                style={{
                  background: 'transparent',
                  border: `1px solid ${border}`,
                  color: tc(theme.textMuted, isDark),
                }}
                onClick={() => handleApproval(false)}
              >
                {'\u2715'} Deny
              </button>
            </div>
          </div>
        )}

        {/* Result: approved */}
        {state === 'approved' && (
          <>
            <div
              className="rounded-lg px-3.5 py-2 text-xs font-semibold"
              style={{
                background: ds('rgba(34,197,94,0.08)', 'rgba(34,197,94,0.12)', isDark),
                border: `1px solid ${ds('rgba(34,197,94,0.25)', 'rgba(34,197,94,0.35)', isDark)}`,
                color: green,
              }}
            >
              {'\u2713'} Approved — Tool executing...
            </div>
            <div
              className="max-w-[80%] self-start rounded-lg px-3.5 py-2 text-xs font-mono"
              style={{
                background: ds('rgba(168,85,247,0.08)', 'rgba(168,85,247,0.12)', isDark),
                border: `1px solid ${ds('rgba(168,85,247,0.2)', 'rgba(168,85,247,0.3)', isDark)}`,
                color: ds('#9333ea', '#c084fc', isDark),
              }}
            >
              {'\u2705'} Tool Result: {'{'} success: true, messageId: &quot;msg_abc123&quot; {'}'}
            </div>
            <div
              className="max-w-[80%] self-start rounded-xl px-3.5 py-2 text-sm"
              style={{ background: msgBg, border: `1px solid ${border}`, borderBottomLeftRadius: 4, color: tc(theme.textPrimary, isDark) }}
            >
              Done! I&apos;ve sent the weekly summary email to alice@example.com. The message was delivered successfully.
            </div>
          </>
        )}

        {/* Result: denied */}
        {state === 'denied' && (
          <>
            <div
              className="rounded-lg px-3.5 py-2 text-xs font-semibold"
              style={{
                background: ds('rgba(239,68,68,0.08)', 'rgba(239,68,68,0.12)', isDark),
                border: `1px solid ${ds('rgba(239,68,68,0.25)', 'rgba(239,68,68,0.35)', isDark)}`,
                color: red,
              }}
            >
              {'\u2715'} Denied — Tool execution cancelled
            </div>
            <div
              className="max-w-[80%] self-start rounded-xl px-3.5 py-2 text-sm"
              style={{ background: msgBg, border: `1px solid ${border}`, borderBottomLeftRadius: 4, color: tc(theme.textPrimary, isDark) }}
            >
              Understood, I won&apos;t send that email. Let me know if you&apos;d like to make any changes first.
            </div>
          </>
        )}
      </div>

      {/* Action button */}
      <div className="px-4 pb-4">
        {state === 'initial' ? (
          <button
            className="w-full rounded-lg py-2.5 text-sm font-semibold cursor-pointer transition-opacity"
            style={{ background: accent, color: '#fff' }}
            onClick={handleTrigger}
          >
            {'\u25B6'} Simulate Tool Call
          </button>
        ) : (
          <button
            className="w-full rounded-lg py-2 text-xs font-semibold cursor-pointer transition-opacity"
            style={{ background: 'transparent', border: `1px solid ${border}`, color: tc(theme.textMuted, isDark) }}
            onClick={handleReset}
          >
            {'\u21BB'} Reset Demo
          </button>
        )}
      </div>
    </div>
  )
}
