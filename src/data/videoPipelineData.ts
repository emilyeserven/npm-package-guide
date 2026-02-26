import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Types ────────────────────────────────────────────────────────────

export interface PipelineStage {
  id: string
  icon: string
  label: string
  title: string
  description: string
}

export interface CodecInfo {
  id: string
  name: string
  detail: string
}

export interface ContainerInfo {
  id: string
  ext: string
  name: string
  detail: string
}

export interface FfprobeField {
  key: string
  value: string
}

export interface FfprobeSection {
  id: string
  label: string
  badge: string
  fields: FfprobeField[]
}

export interface ManifestLine {
  text: string
  type: 'tag' | 'url' | 'attr'
  annotation: string | null
}

export interface QualityLevel {
  id: string
  label: string
  resolution: string
  bitrate: number
  bitrateLabel: string
}

export interface FfmpegRecipe {
  id: string
  title: string
  command: string
  explanation: string
}

export interface QuizItem {
  q: string
  options: string[]
  answer: number
  explanation: string
}

// ── Pipeline stages ──────────────────────────────────────────────────

export const VP_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'capture',
    icon: '\uD83D\uDCF9',
    label: 'Capture',
    title: 'Capture',
    description: 'A camera records raw video. This raw footage is massive \u2014 an uncompressed 1080p frame is ~6\u00A0MB, at 30\u00A0fps that\u2019s 180\u00A0MB per second. The camera\u2019s internal encoder compresses it into a file using a codec (like H.264) and wraps it in a container (like MP4).',
  },
  {
    id: 'probe',
    icon: '\uD83D\uDD0D',
    label: 'Inspect',
    title: 'Inspect (ffprobe)',
    description: 'Before processing, you inspect the file with ffprobe to learn its codec, resolution, bitrate, frame rate, and audio properties. This determines your transcoding strategy \u2014 you can\u2019t make good encoding decisions without understanding the source.',
  },
  {
    id: 'transcode',
    icon: '\u2699\uFE0F',
    label: 'Transcode',
    title: 'Transcode (ffmpeg)',
    description: 'The source is decoded and re-encoded into multiple quality levels (renditions). A 4K source might produce 1080p, 720p, 480p, and 360p outputs. Each rendition targets a specific bitrate optimized for its resolution. This is the most CPU-intensive step.',
  },
  {
    id: 'package',
    icon: '\uD83D\uDCE6',
    label: 'Package',
    title: 'Package (HLS/DASH)',
    description: 'Each rendition is segmented into small chunks (6\u201310 seconds) and wrapped in MPEG-TS containers. Manifest playlists (M3U8 files) are generated \u2014 a master playlist listing all qualities, and a media playlist per quality listing all segments.',
  },
  {
    id: 'deliver',
    icon: '\uD83C\uDF10',
    label: 'Deliver',
    title: 'Deliver (CDN)',
    description: 'The HLS package (manifests + segments) is uploaded to a CDN. Edge servers cache the content globally so users fetch segments from the nearest point of presence, minimizing latency. Standard HTTP/HTTPS \u2014 no special streaming protocol needed.',
  },
  {
    id: 'play',
    icon: '\u25B6\uFE0F',
    label: 'Play',
    title: 'Play (ABR)',
    description: 'The player loads the master playlist, measures available bandwidth, selects an initial quality, and begins downloading segments. It continuously monitors throughput and buffer health, switching quality levels adaptively. The viewer sees smooth, uninterrupted playback.',
  },
]

// ── Codecs ────────────────────────────────────────────────────────────

export const VP_VIDEO_CODECS: CodecInfo[] = [
  {
    id: 'h264',
    name: 'H.264 (AVC)',
    detail: 'The workhorse. Universally supported, great balance of quality and file size. Used everywhere from YouTube to Zoom calls. Nearly every device on Earth can decode it.',
  },
  {
    id: 'h265',
    name: 'H.265 (HEVC)',
    detail: 'The successor. ~50% smaller files at the same quality, but requires more processing power to encode/decode. Common in 4K content. Patent licensing makes adoption complicated.',
  },
  {
    id: 'vp9',
    name: 'VP9',
    detail: 'Google\u2019s royalty-free answer to HEVC. Used heavily on YouTube. Good browser support.',
  },
  {
    id: 'av1',
    name: 'AV1',
    detail: 'The next generation. Royalty-free, ~30% better compression than HEVC. Backed by the Alliance for Open Media (Google, Netflix, Meta, etc). Encode time is slow but improving fast.',
  },
]

export const VP_AUDIO_CODECS: CodecInfo[] = [
  {
    id: 'aac',
    name: 'AAC',
    detail: 'The standard. Used in most MP4 files, streaming platforms, and Apple devices. Excellent quality at low bitrates.',
  },
  {
    id: 'opus',
    name: 'Opus',
    detail: 'Open-source and arguably superior to AAC. Excels at low bitrates. Used in WebRTC, Discord, and increasingly in streaming.',
  },
  {
    id: 'mp3',
    name: 'MP3',
    detail: 'The legacy format. Older, less efficient than AAC, but universally supported. Still used for simple audio-only distribution.',
  },
  {
    id: 'flac',
    name: 'FLAC',
    detail: 'Lossless compression. No quality loss, but files are 2\u20133x larger than AAC. Used when preserving original audio quality matters.',
  },
]

// ── Containers ───────────────────────────────────────────────────────

export const VP_CONTAINERS: ContainerInfo[] = [
  {
    id: 'mp4',
    ext: '.mp4',
    name: 'MP4 (MPEG-4 Part 14)',
    detail: 'The universal container. Supports H.264, H.265, AV1 video and AAC audio. Works essentially everywhere. Great for progressive download and streaming. The default choice for web video.',
  },
  {
    id: 'mkv',
    ext: '.mkv',
    name: 'MKV (Matroska)',
    detail: 'The flexible powerhouse. Can hold virtually any codec combination, multiple audio tracks, subtitle streams, and chapter markers. Popular for high-quality video archiving, but less supported in browsers and mobile devices compared to MP4.',
  },
  {
    id: 'webm',
    ext: '.webm',
    name: 'WebM',
    detail: 'Google\u2019s open container designed for the web. Holds VP8/VP9/AV1 video and Vorbis/Opus audio. Native browser support, royalty-free. The go-to for web-native video that wants to avoid patent-encumbered codecs.',
  },
  {
    id: 'ts',
    ext: '.ts',
    name: 'MPEG Transport Stream',
    detail: 'Designed for broadcasting and streaming. Resilient to data loss \u2014 each segment is independently decodable. This is the container used inside HLS streams. You\u2019ll rarely interact with .ts files directly, but they\u2019re the backbone of adaptive streaming.',
  },
]

// ── ffprobe sections ─────────────────────────────────────────────────

export const VP_FFPROBE_SECTIONS: FfprobeSection[] = [
  {
    id: 'video',
    label: 'Stream #0 \u2014 Video',
    badge: 'H.264',
    fields: [
      { key: 'codec_name', value: 'h264' },
      { key: 'profile', value: 'High' },
      { key: 'resolution', value: '1920\u00D71080' },
      { key: 'r_frame_rate', value: '30/1 (30 fps)' },
      { key: 'bit_rate', value: '4,500,000 (4.5 Mbps)' },
      { key: 'pix_fmt', value: 'yuv420p' },
      { key: 'duration', value: '127.45s' },
    ],
  },
  {
    id: 'audio',
    label: 'Stream #1 \u2014 Audio',
    badge: 'AAC',
    fields: [
      { key: 'codec_name', value: 'aac' },
      { key: 'sample_rate', value: '48000 Hz' },
      { key: 'channels', value: '2 (stereo)' },
      { key: 'bit_rate', value: '128,000 (128 kbps)' },
      { key: 'channel_layout', value: 'stereo' },
    ],
  },
  {
    id: 'format',
    label: 'Format',
    badge: 'MP4',
    fields: [
      { key: 'format_name', value: 'mov,mp4,m4a' },
      { key: 'duration', value: '127.453333' },
      { key: 'size', value: '73,482,190 (~73 MB)' },
      { key: 'bit_rate', value: '4,612,584' },
    ],
  },
]

// ── HLS manifest lines ──────────────────────────────────────────────

export const VP_MASTER_PLAYLIST: ManifestLine[] = [
  { text: '#EXTM3U', type: 'tag', annotation: 'The header tag \u2014 identifies this as an Extended M3U playlist file.' },
  { text: '#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360', type: 'attr', annotation: 'Defines a quality variant. The player reads the BANDWIDTH value and compares it to the user\u2019s available throughput to decide which variant to load.' },
  { text: '360p/playlist.m3u8', type: 'url', annotation: 'Path to the media playlist for this quality level. The player follows this link to get the list of actual video segments.' },
  { text: '#EXT-X-STREAM-INF:BANDWIDTH=2400000,RESOLUTION=1280x720', type: 'attr', annotation: 'A higher quality variant \u2014 720p at 2.4 Mbps. The player switches up to this when bandwidth allows.' },
  { text: '720p/playlist.m3u8', type: 'url', annotation: null },
  { text: '#EXT-X-STREAM-INF:BANDWIDTH=4800000,RESOLUTION=1920x1080', type: 'attr', annotation: 'The highest quality \u2014 1080p at 4.8 Mbps. Only used when the connection can sustain this throughput.' },
  { text: '1080p/playlist.m3u8', type: 'url', annotation: null },
]

export const VP_MEDIA_PLAYLIST: ManifestLine[] = [
  { text: '#EXTM3U', type: 'tag', annotation: null },
  { text: '#EXT-X-VERSION:3', type: 'tag', annotation: 'HLS protocol version. Version 3 is widely supported.' },
  { text: '#EXT-X-TARGETDURATION:10', type: 'tag', annotation: 'The maximum segment duration in seconds. The player uses this to know how far ahead to buffer.' },
  { text: '#EXTINF:9.977,', type: 'tag', annotation: 'The exact duration of the next segment in seconds. Each segment can vary slightly, but never exceeds TARGETDURATION.' },
  { text: 'segment_000.ts', type: 'url', annotation: 'The actual video segment file \u2014 an MPEG-TS (.ts) container holding ~10 seconds of encoded video+audio. The player downloads and decodes these sequentially.' },
  { text: '#EXTINF:10.010,', type: 'tag', annotation: null },
  { text: 'segment_001.ts', type: 'url', annotation: null },
  { text: '#EXT-X-ENDLIST', type: 'tag', annotation: 'Marks this as a VOD (video on demand) playlist. For live streams, this tag is absent and the player re-fetches the playlist periodically to discover new segments.' },
]

// ── Quality levels (for bitrate simulator) ──────────────────────────

export const VP_QUALITY_LEVELS: QualityLevel[] = [
  { id: '360p', label: '360p', resolution: '640\u00D7360', bitrate: 0.5, bitrateLabel: '0.5 Mbps' },
  { id: '480p', label: '480p', resolution: '854\u00D7480', bitrate: 1.5, bitrateLabel: '1.5 Mbps' },
  { id: '720p', label: '720p', resolution: '1280\u00D7720', bitrate: 2.5, bitrateLabel: '2.5 Mbps' },
  { id: '1080p', label: '1080p', resolution: '1920\u00D71080', bitrate: 4.5, bitrateLabel: '4.5 Mbps' },
  { id: '4k', label: '4K', resolution: '3840\u00D72160', bitrate: 8.0, bitrateLabel: '8.0 Mbps' },
]

// ── ffmpeg recipes ──────────────────────────────────────────────────

export const VP_FFMPEG_RECIPES: FfmpegRecipe[] = [
  {
    id: 'extract-audio',
    title: 'Extract audio from video',
    command: 'ffmpeg -i video.mp4 -vn -c:a copy audio.aac',
    explanation: 'The <code>-vn</code> flag disables video. <code>-c:a copy</code> copies the audio stream without re-encoding \u2014 fast and lossless.',
  },
  {
    id: 'thumbnail',
    title: 'Create a thumbnail at a specific timestamp',
    command: 'ffmpeg -i video.mp4 -ss 00:01:30 -frames:v 1 thumb.jpg',
    explanation: 'Seeks to 1 minute 30 seconds and grabs a single frame. Place <code>-ss</code> before <code>-i</code> for faster seeking (input seeking) in long files.',
  },
  {
    id: 'trim',
    title: 'Trim a clip without re-encoding',
    command: 'ffmpeg -ss 00:05:00 -to 00:10:00 -i video.mp4 -c copy clip.mp4',
    explanation: 'Cuts from 5:00 to 10:00 without re-encoding. Note: the cut may not be frame-precise because it can only cut on keyframes without re-encoding. For precise cuts, remove <code>-c copy</code> and specify an encoder.',
  },
  {
    id: 'gif',
    title: 'Convert to GIF (with optimization)',
    command: 'ffmpeg -i video.mp4 -vf "fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" out.gif',
    explanation: 'This two-pass approach generates an optimized palette first, then applies it. The result is a much higher quality GIF than the default single-pass method. <code>fps=15</code> keeps the file size reasonable.',
  },
  {
    id: 'subtitles',
    title: 'Add subtitles (burn-in)',
    command: 'ffmpeg -i video.mp4 -vf "subtitles=subs.srt" -c:v libx264 -crf 20 -c:a copy output.mp4',
    explanation: 'Burns the SRT subtitle file directly into the video pixels. This requires re-encoding the video stream but copies audio as-is. Use this when the player doesn\u2019t support subtitle tracks.',
  },
]

// ── Quiz questions ──────────────────────────────────────────────────

export const VP_QUIZ_QUESTIONS: QuizItem[] = [
  {
    q: 'You have an MKV file with H.264 video and AAC audio. You need an MP4 file with the same codecs. What should you do?',
    options: [
      'Transmux with -c copy \u2014 fast, no quality loss',
      'Transcode with -c:v libx264 \u2014 re-encode to be safe',
      'It doesn\u2019t matter, both produce identical results',
    ],
    answer: 0,
    explanation: 'Transmuxing is the right call here. Since both MKV and MP4 support H.264 + AAC, you can just repackage the streams. Re-encoding would be wasteful \u2014 it takes much longer, and each generation of lossy encoding slightly degrades quality.',
  },
  {
    q: 'What does the master playlist (master.m3u8) contain?',
    options: [
      'Direct links to .ts video segment files',
      'Links to media playlists, one per quality level',
      'The actual encoded video data in base64',
    ],
    answer: 1,
    explanation: 'The master playlist is a directory of available quality variants. It lists each variant\u2019s bandwidth, resolution, and a link to that variant\u2019s media playlist. The media playlists then list the actual .ts segment files. This two-level structure is what enables adaptive bitrate switching.',
  },
]

// ── Guide sections & manifest ───────────────────────────────────────

export const VP_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['vp-start'] },
  { label: 'Foundations', ids: ['vp-overview', 'vp-containers', 'vp-ffprobe'] },
  { label: 'Processing', ids: ['vp-transcoding', 'vp-ffmpeg'] },
  { label: 'Delivery', ids: ['vp-hls', 'vp-abr'] },
  { label: 'Practice', ids: ['vp-full-pipeline'] },
]

export const VP_START_PAGE_DATA: StartPageData = {
  subtitle: 'From raw footage to adaptive streaming \u2014 demystifying ffmpeg, transcoding, HLS, and the video delivery journey.',
  tip: 'Designed for backend engineers who need to understand how video works \u2014 from camera capture to adaptive playback in the browser.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Video Foundations',
      description: 'Understand the big picture of the video pipeline, then learn the building blocks: containers, codecs, and how to inspect files with ffprobe.',
      jumpTo: 'vp-overview',
    },
    {
      type: 'bonus',
      title: 'Foundations Deep Dive',
      description: 'Work through each foundations page to understand the concepts that everything else builds on.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'vp-overview': 'The end-to-end pipeline from camera to screen \u2014 what happens at each stage.',
        'vp-containers': 'Containers vs codecs \u2014 the bedrock distinction in video technology.',
        'vp-ffprobe': 'Reading video file metadata to make informed encoding decisions.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Processing & Encoding',
      description: 'Learn how transcoding works and master ffmpeg \u2014 the Swiss Army knife of video processing.',
      jumpTo: 'vp-transcoding',
    },
    {
      type: 'bonus',
      title: 'Processing Deep Dive',
      description: 'Dive into encoding strategies and practical ffmpeg recipes.',
      sectionLabel: 'Processing',
      subItemDescriptions: {
        'vp-transcoding': 'Transcoding vs transmuxing, CRF vs target bitrate, and when to use each.',
        'vp-ffmpeg': 'Annotated commands, HLS generation, and copy-paste recipes.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Streaming & Delivery',
      description: 'Understand how HLS works and how adaptive bitrate streaming delivers smooth playback on any network.',
      jumpTo: 'vp-hls',
    },
    {
      type: 'bonus',
      title: 'Delivery Deep Dive',
      description: 'Explore HLS manifests interactively and simulate adaptive bitrate switching.',
      sectionLabel: 'Delivery',
      subItemDescriptions: {
        'vp-hls': 'HLS playlists, segments, and the two-level manifest architecture.',
        'vp-abr': 'How players choose quality levels and the algorithms behind smooth switching.',
      },
    },
    {
      type: 'numbered',
      num: 4,
      title: 'Complete Workflow',
      description: 'See all the pieces come together in a real-world pipeline from upload to playback.',
      jumpTo: 'vp-full-pipeline',
    },
  ],
}

export const VP_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'video-pipeline',
    icon: '\uD83C\uDFAC',
    title: 'The Video Pipeline',
    startPageId: 'vp-start',
    description: 'From raw footage to adaptive streaming \u2014 demystifying ffmpeg, transcoding, HLS, and the video delivery journey.',
    category: 'infrastructure',
    sections: VP_GUIDE_SECTIONS,
  },
  startPageData: VP_START_PAGE_DATA,
}
