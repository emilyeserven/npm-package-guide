import type { GuideSection } from '../guideTypes'
import type { StartPageData } from '../guideTypes'

export const AI_INFRA_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['ai-start', 'ai-overview'] },
  {
    label: 'The Stack',
    ids: [
      'ai-inference',
      'ai-orchestration',
      'ai-data',
      'ai-training',
      'ai-compute',
    ],
  },
  {
    label: 'Workflows',
    ids: [
      'ai-workflows',
      'ai-wf-simple-chat',
      'ai-wf-rag',
      'ai-wf-agent',
      'ai-wf-finetune',
    ],
  },
  { label: 'Putting It Together', ids: ['ai-key-terms'] },
]

// ── Start page data ──────────────────────────────────────────────────

export const AI_INFRA_START_PAGE_DATA: StartPageData = {
  subtitle:
    'A frontend engineer\u2019s map to AI infrastructure \u2014 from model serving to GPU clusters.',
  tip: 'Each layer is explained with analogies to familiar frontend concepts like Express middleware, React state, and data-fetching patterns.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'The Big Picture',
      description:
        'Understand the five layers of AI infrastructure and how they map to concepts you already know from frontend engineering.',
      jumpTo: 'ai-overview',
    },
    {
      type: 'bonus',
      title: 'The Stack',
      description:
        'Explore each infrastructure layer in depth \u2014 what it does, key concepts, real-world tools, and frontend analogies.',
      sectionLabel: 'The Stack',
      subItemDescriptions: {
        'ai-inference':
          'API gateways, model serving, streaming responses, and load balancing \u2014 how models handle production traffic.',
        'ai-orchestration':
          'RAG pipelines, prompt templates, agent workflows, and guardrails \u2014 the logic layer that connects models to applications.',
        'ai-data':
          'Embeddings, vector databases, document processing, and feature stores \u2014 the data infrastructure that feeds AI models.',
        'ai-training':
          'Pre-training, fine-tuning, RLHF, and evaluation \u2014 how models are built and improved.',
        'ai-compute':
          'GPU clusters, container orchestration, model registries, and monitoring \u2014 the infrastructure that powers everything.',
      },
    },
    {
      type: 'bonus',
      title: 'Workflows',
      description:
        'Trace four common AI architectures through the infrastructure stack \u2014 from simple chat to full fine-tuning pipelines.',
      sectionLabel: 'Workflows',
      subItemDescriptions: {
        'ai-workflows':
          'Overview of the four common patterns and how to choose between them.',
        'ai-wf-simple-chat':
          'The simplest pattern \u2014 your frontend asks a question, the model answers. Inference layer only.',
        'ai-wf-rag':
          'Search your data first, then answer \u2014 combines inference, data, and orchestration layers.',
        'ai-wf-agent':
          'The model decides what tools to call in a loop \u2014 like a coding assistant or research agent.',
        'ai-wf-finetune':
          'Specialize a base model on your data \u2014 the full training pipeline from data prep to deployment.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Key Terms',
      description:
        'Quick-reference definitions for essential AI infrastructure terminology.',
      jumpTo: 'ai-key-terms',
    },
  ],
}
