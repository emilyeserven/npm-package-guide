import type { GlossaryCategory } from './types'

export const videoPipelineGlossary: GlossaryCategory[] = [
  {
    category: 'Video Fundamentals',
    terms: [
      {
        term: 'Codec',
        definition: 'A coder-decoder algorithm that compresses and decompresses video or audio data. Determines <em>how</em> pixels and audio samples are encoded. Common video codecs: H.264, H.265, VP9, AV1.',
        linkId: 'mdn-codecs',
        sectionId: 'vp-containers',
      },
      {
        term: 'Container (Mux Format)',
        definition: 'A file format that wraps encoded video, audio, subtitles, and metadata together. Examples: MP4, MKV, WebM, MPEG-TS. The file extension tells you the container, not the codec.',
        linkId: 'mdn-media-types',
        sectionId: 'vp-containers',
      },
      {
        term: 'Bitrate',
        definition: 'The amount of data processed per second, measured in bits per second (bps). Higher bitrate generally means higher quality but larger file size. A 1080p stream typically runs at 3\u20136 Mbps for H.264.',
        linkId: 'ffmpeg-docs',
        sectionId: 'vp-abr',
      },
      {
        term: 'CRF (Constant Rate Factor)',
        definition: 'An encoding mode that targets constant visual quality rather than constant bitrate. Values range from 0 (lossless) to 51 (worst). For H.264: 18 is visually lossless, 23 is the default.',
        linkId: 'ffmpeg-docs',
        sectionId: 'vp-transcoding',
      },
      {
        term: 'Keyframe (I-frame)',
        definition: 'A complete frame that can be decoded independently without referencing other frames. Much larger than P/B-frames but serves as seek points and HLS segment boundaries. Regular keyframe intervals (every 2\u20136 seconds) are essential.',
        linkId: 'ffmpeg-docs',
        sectionId: 'vp-transcoding',
      },
      {
        term: 'Moov Atom',
        definition: 'MP4 metadata containing the index of all samples, timestamps, and codec info. Players need this before decoding. The <code>-movflags +faststart</code> flag moves it to the file\u2019s beginning for immediate web playback.',
        linkId: 'ffmpeg-docs',
        sectionId: 'vp-ffmpeg',
      },
    ],
  },
  {
    category: 'Transcoding & Processing',
    terms: [
      {
        term: 'Transcoding',
        definition: 'Decoding video from one format and re-encoding into another. Computationally expensive because every frame is decompressed, processed, and recompressed. Used to change codec, resolution, or bitrate.',
        linkId: 'ffmpeg-docs',
        sectionId: 'vp-transcoding',
      },
      {
        term: 'Transmuxing (Remuxing)',
        definition: 'Changing the container format without re-encoding the streams inside (e.g., MKV to MP4 when both support the same codecs). Essentially instant and lossless compared to full transcoding.',
        linkId: 'ffmpeg-docs',
        sectionId: 'vp-transcoding',
      },
      {
        term: 'ffmpeg',
        definition: 'The open-source command-line tool for video/audio transcoding, filtering, muxing, and streaming. The engine behind virtually every video platform.',
        linkId: 'ffmpeg-docs',
        sectionId: 'vp-ffmpeg',
      },
      {
        term: 'ffprobe',
        definition: 'The diagnostic tool in the FFmpeg suite. Reads a media file and reports its codec, resolution, bitrate, frame rate, audio channels, and other metadata.',
        linkId: 'ffmpeg-ffprobe',
        sectionId: 'vp-ffprobe',
      },
      {
        term: 'Rendition (Variant)',
        definition: 'One version of a video at a specific quality level (resolution + bitrate). An HLS stream typically includes 4\u20136 renditions. Each has its own media playlist and set of segments.',
        linkId: 'apple-hls-spec',
        sectionId: 'vp-abr',
      },
    ],
  },
  {
    category: 'Streaming & Delivery',
    terms: [
      {
        term: 'HLS (HTTP Live Streaming)',
        definition: 'Apple\u2019s adaptive streaming protocol. Splits video into small HTTP-downloadable chunks with M3U8 manifest playlists. The most widely used streaming protocol on the internet.',
        linkId: 'apple-hls-spec',
        sectionId: 'vp-hls',
      },
      {
        term: 'DASH (Dynamic Adaptive Streaming over HTTP)',
        definition: 'An open-standard adaptive streaming protocol by MPEG. Uses XML-based .mpd manifests and fMP4 segments. Conceptually similar to HLS but with no native Apple support.',
        linkId: 'dash-spec',
        sectionId: 'vp-hls',
      },
      {
        term: 'ABR (Adaptive Bitrate)',
        definition: 'A streaming technique where the player dynamically switches between quality levels based on network conditions. Prevents buffering on slow connections while maximizing quality on fast ones.',
        linkId: 'apple-hls-spec',
        sectionId: 'vp-abr',
      },
      {
        term: 'GOP (Group of Pictures)',
        definition: 'The sequence of I-frames, P-frames, and B-frames between keyframes. A typical GOP is 2\u201310 seconds. For HLS, segment boundaries should align with GOP boundaries for clean quality switching.',
        linkId: 'ffmpeg-docs',
        sectionId: 'vp-transcoding',
      },
    ],
  },
]
