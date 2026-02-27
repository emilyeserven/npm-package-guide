import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { AccordionList } from '../AccordionList'
import { TL_PROMPT_IDEAS, type TlPromptIdea } from '../../../data/twelvelabsData'

export function TlPromptIdeas() {
  const isDark = useIsDark()
  const accent = ds('#059669', '#34d399', isDark)

  return (
    <AccordionList<TlPromptIdea>
      items={TL_PROMPT_IDEAS}
      className="mb-6"
      renderHeader={(item, _i, isDark) => (
        <span
          className="text-sm font-semibold"
          style={{ color: ds('#059669', '#34d399', isDark) }}
        >
          {item.label}
        </span>
      )}
      renderBody={(item, _i, isDark) => (
        <p
          className="mt-2 mb-0 text-sm italic leading-relaxed"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          &ldquo;{item.prompt}&rdquo;
        </p>
      )}
      itemStyle={(_item, isDark, expanded) => ({
        borderLeft: `2px solid ${expanded ? accent : 'transparent'}`,
        background: tc(theme.bgCard, isDark),
        borderColor: tc(theme.borderDefault, isDark),
      })}
    />
  )
}
