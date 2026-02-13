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
  { label: 'Putting It Together', ids: ['ai-workflows', 'ai-key-terms'] },
]

// ── Start page data ──────────────────────────────────────────────────

export const AI_INFRA_START_PAGE_DATA: StartPageData = {
  subtitle:
    'A backend engineer\u2019s map to AI infrastructure \u2014 from model serving to GPU clusters.',
  tip: 'Each layer is explained with analogies to familiar backend concepts like load balancers, databases, and CI pipelines.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'The Big Picture',
      description:
        'Understand the five layers of AI infrastructure and how they map to concepts you already know from backend engineering.',
      jumpTo: 'ai-overview',
    },
    {
      type: 'bonus',
      title: 'The Stack',
      description:
        'Explore each infrastructure layer in depth \u2014 what it does, key concepts, real-world tools, and backend analogies.',
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
      type: 'numbered',
      num: 2,
      title: 'Putting It Together',
      description:
        'See how the layers combine in real-world workflows and review the key terms you need to know.',
      sectionLabel: 'Putting It Together',
      subItemDescriptions: {
        'ai-workflows':
          'Trace four common AI architectures \u2014 simple chat, RAG, agents, and fine-tuning \u2014 through the infrastructure layers.',
        'ai-key-terms':
          'Quick-reference definitions for essential AI infrastructure terminology.',
      },
    },
  ],
}
