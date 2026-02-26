import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'
import { AccordionList } from '../AccordionList'
import { CopyButton } from '../CopyButton'
import { VP_FFMPEG_RECIPES } from '../../../data/videoPipelineData'
import type { FfmpegRecipe } from '../../../data/videoPipelineData'

export function FfmpegRecipes() {
  return (
    <AccordionList<FfmpegRecipe>
      items={VP_FFMPEG_RECIPES}
      renderHeader={(item, _i, dark) => (
        <span style={{ color: tc(theme.textPrimary, dark) }}>
          {item.title}
        </span>
      )}
      renderBody={(item, _i, dark) => (
        <div>
          <div
            className="relative rounded-lg p-3 mb-3 font-mono text-sm"
            style={{
              background: ds('#f1f5f9', '#0f172a', dark),
              color: ds('#059669', '#2dd4bf', dark),
            }}
          >
            <CopyButton text={item.command} />
            <code>{item.command}</code>
          </div>
          <p
            className="text-sm leading-relaxed m-0"
            style={{ color: tc(theme.textSecondary, dark) }}
            dangerouslySetInnerHTML={{ __html: item.explanation }}
          />
        </div>
      )}
      renderIndicator={(expanded, dark) => (
        <span
          className="text-xs transition-transform duration-200 inline-block"
          style={{
            color: ds('#94a3b8', '#64748b', dark),
            transform: expanded ? 'rotate(180deg)' : 'none',
          }}
        >
          &#x25BC;
        </span>
      )}
      itemStyle={(_item, dark, expanded) => ({
        borderColor: expanded
          ? ds('#059669', '#2dd4bf', dark)
          : tc(theme.borderDefault, dark),
        background: tc(theme.bgCard, dark),
      })}
    />
  )
}
