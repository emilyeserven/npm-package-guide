import { DECISION_TREE, SM_COLORS } from '../../../data/stateManagementData'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'

export function StateDecisionTree() {
  const isDark = useIsDark()

  return (
    <div>
      <div className="flex flex-col gap-0">
        {DECISION_TREE.map((step, i) => (
          <div key={i}>
            {/* Question card */}
            <div
              className="rounded-xl p-5"
              style={{
                background: tc(theme.bgCard, isDark),
                border: `1px solid ${tc(theme.borderDefault, isDark)}`,
                boxShadow: tc(theme.shadowSm, isDark),
              }}
            >
              <div
                className="text-xs font-bold tracking-wider mb-2 font-mono"
                style={{ color: tc(theme.textMuted, isDark) }}
              >
                STEP {i + 1}
              </div>
              <p
                className="text-base font-semibold mb-4"
                style={{ color: tc(theme.textPrimary, isDark) }}
              >
                {step.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className="rounded-lg p-3.5"
                  style={{
                    background: `${step.yesColor}12`,
                    border: `1px solid ${step.yesColor}30`,
                  }}
                >
                  <div
                    className="text-xs font-bold mb-1.5 font-mono"
                    style={{ color: step.yesColor }}
                  >
                    {'\u2192'} YES
                  </div>
                  <p className="text-xs m-0" style={{ color: tc(theme.textSecondary, isDark), lineHeight: 1.6 }}>
                    {step.yes}
                  </p>
                </div>
                <div
                  className="rounded-lg p-3.5"
                  style={{
                    background: ds('#f1f5f910', '#4A5E7810', isDark),
                    border: `1px solid ${tc(theme.borderDefault, isDark)}`,
                  }}
                >
                  <div
                    className="text-xs font-bold mb-1.5 font-mono"
                    style={{ color: tc(theme.textMuted, isDark) }}
                  >
                    {'\u2192'} NO
                  </div>
                  <p className="text-xs m-0" style={{ color: tc(theme.textMuted, isDark), lineHeight: 1.6 }}>
                    {step.no}
                  </p>
                </div>
              </div>
            </div>
            {/* Connector line */}
            {i < DECISION_TREE.length - 1 && (
              <div className="flex justify-center py-1">
                <div
                  style={{
                    width: 2,
                    height: 24,
                    background: tc(theme.borderDefault, isDark),
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Golden rule */}
      <div
        className="mt-8 rounded-xl p-6"
        style={{
          background: `linear-gradient(135deg, ${SM_COLORS.rq}12, ${SM_COLORS.zst}12)`,
          border: `1px solid ${SM_COLORS.rq}40`,
        }}
      >
        <h3
          className="text-sm font-bold mb-2.5 tracking-wide"
          style={{ color: SM_COLORS.rq }}
        >
          {'\u{1F4A1}'} THE GOLDEN RULE
        </h3>
        <p className="m-0 text-sm" style={{ color: tc(theme.textSecondary, isDark), lineHeight: 1.8 }}>
          <strong style={{ color: tc(theme.textPrimary, isDark) }}>Server state {'\u2260'} Client state.</strong>{' '}
          React Query (TanStack Query) handles everything that comes from your API {'\u2014'} fetching,
          caching, background refetching, optimistic updates, pagination, and more. Your state manager
          (Context, Zustand, or Redux) should only hold <em>client-side</em> state: UI toggles, form
          drafts, user preferences, selected items. The moment you stop putting API responses into Redux,
          your store shrinks by 80% and your app gets simpler.
        </p>
      </div>
    </div>
  )
}
