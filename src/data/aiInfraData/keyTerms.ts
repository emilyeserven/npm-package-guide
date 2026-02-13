import type { KeyTerm } from './types'

export const KEY_TERMS: KeyTerm[] = [
  {
    term: 'Token',
    definition:
      "The basic unit models work with. ~\u00BE of a word. \u2018Hello world\u2019 \u2248 2 tokens.",
  },
  {
    term: 'Latency',
    definition:
      'Time to first token (TTFT) + time per token. Your users feel both.',
  },
  {
    term: 'Context Window',
    definition:
      'Max tokens a model can process at once. GPT-4: 128K, Claude: 200K.',
  },
  {
    term: 'Hallucination',
    definition:
      'When the model confidently makes something up. RAG helps reduce this.',
  },
  {
    term: 'Inference',
    definition:
      "Running a trained model to get predictions. The \u2018production\u2019 phase.",
  },
  {
    term: 'Embedding',
    definition:
      'A vector (list of numbers) representing the meaning of text.',
  },
]
