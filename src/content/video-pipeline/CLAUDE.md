# The Video Pipeline — Guide CLAUDE.md

## Audience & Purpose

Backend engineers who need to understand how video works — from camera capture through transcoding, packaging, and adaptive playback in the browser. Covers ffmpeg, ffprobe, HLS, codecs, containers, and adaptive bitrate streaming.

## Sections

| Section | Pages | Focus |
|---------|-------|-------|
| Foundations | vp-overview, vp-containers, vp-ffprobe | Pipeline overview, codecs vs containers, inspecting files |
| Processing | vp-transcoding, vp-ffmpeg | Encoding strategies, ffmpeg commands and recipes |
| Delivery | vp-hls, vp-abr | HLS manifests and segments, adaptive bitrate algorithms |
| Practice | vp-full-pipeline | End-to-end workflow, knowledge quiz |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `VideoPipelineDiagram` | *(none)* | Clickable pipeline stages with detail panel. Uses `useExplorer` with `VP_PIPELINE_STAGES`. |
| `VideoCodecTabs` | *(none)* | Tabbed view of video/audio codecs from `VP_VIDEO_CODECS` and `VP_AUDIO_CODECS`. |
| `ContainerTabs` | *(none)* | Tabbed view of container formats from `VP_CONTAINERS`. |
| `FfprobeViewer` | *(none)* | Expandable ffprobe output sections from `VP_FFPROBE_SECTIONS`. |
| `HlsManifestViewer` | *(none)* | Interactive HLS manifest with click-to-expand annotations from `VP_MASTER_PLAYLIST` and `VP_MEDIA_PLAYLIST`. |
| `BitrateSimulator` | *(none)* | Slider-driven bandwidth simulator showing quality selection from `VP_QUALITY_LEVELS`. |
| `FfmpegRecipes` | *(none)* | Accordion of ffmpeg recipes using `AccordionList` with `VP_FFMPEG_RECIPES`. |
| `VideoQuiz` | *(none)* | Quiz using `QuizBase` with `VP_QUIZ_QUESTIONS`. |

## Guide-Specific Conventions

- All data lives in `src/data/videoPipelineData.ts` (single file, under 500 lines).
- Components use the green accent palette (`#059669` light / `#2dd4bf` dark) for interactive highlights.
- `CodecExplorer.tsx` contains both `VideoCodecTabs` and `ContainerTabs` (shared internal `TabGroup` component).
- `VideoQuiz` wraps `QuizBase` — questions are in `VP_QUIZ_QUESTIONS`.
- `FfmpegRecipes` wraps `AccordionList` — recipes are in `VP_FFMPEG_RECIPES`.
