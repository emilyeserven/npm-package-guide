import type { GlossaryCategory } from './index'

export const twelvelabsGlossary: GlossaryCategory[] = [
  {
    category: 'Video AI',
    terms: [
      {
        term: 'TwelveLabs',
        definition:
          'A video understanding platform that provides AI-powered APIs for searching, analyzing, and generating embeddings from video content using video-native models.',
        linkId: 'twelvelabs-docs',
        sectionId: 'tl-overview',
      },
      {
        term: 'Marengo',
        definition:
          'TwelveLabs\u2019 multimodal embedding model that generates 1024-dimensional vectors for search, retrieval, classification, and similarity tasks across video, text, image, and audio.',
        linkId: 'twelvelabs-docs',
        sectionId: 'tl-models',
      },
      {
        term: 'Pegasus',
        definition:
          'TwelveLabs\u2019 video-native language model that understands video content and generates coherent text \u2014 powers summaries, chapters, Q&A, and custom analysis prompts.',
        linkId: 'twelvelabs-docs',
        sectionId: 'tl-models',
      },
      {
        term: 'video embedding',
        definition:
          'A 1024-dimensional vector representation of video content that captures semantic meaning across visual, audio, and conversational modalities. Enables similarity search and RAG pipelines.',
        linkId: 'twelvelabs-docs',
        sectionId: 'tl-embed',
      },
      {
        term: 'multimodal search',
        definition:
          'Search that combines multiple data types (visual frames, audio, speech, on-screen text) to find specific moments within video content using natural language or image queries.',
        linkId: 'twelvelabs-docs',
        sectionId: 'tl-search',
      },
      {
        term: 'video index',
        definition:
          'A container for videos in TwelveLabs, similar to a database table. Each index is configured with specific models and modalities for processing uploaded content.',
        linkId: 'twelvelabs-docs',
        sectionId: 'tl-indexes',
      },
    ],
  },
]
