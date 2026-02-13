import type { GlossaryCategory } from './index'

export const aiInfraGlossary: GlossaryCategory[] = [
  {
    category: 'AI Infrastructure',
    terms: [
      {
        term: 'Inference',
        definition:
          'The process of running a trained AI model to generate predictions or outputs from new input data. In production, inference is the runtime execution of the model \u2014 analogous to handling an API request.',
        linkId: 'vllm-docs',
        sectionId: 'ai-inference',
      },
      {
        term: 'Embedding',
        definition:
          'A numerical vector representation of text, images, or other data that captures semantic meaning. Similar items have similar vectors, enabling search by meaning rather than keywords.',
        linkId: 'openai-embeddings-guide',
        sectionId: 'ai-data',
      },
      {
        term: 'Vector Database',
        definition:
          'A database optimized for storing and querying high-dimensional vectors (embeddings). Uses similarity search (nearest neighbor) instead of exact-match queries. Examples: Pinecone, Weaviate, pgvector.',
        linkId: 'pinecone-what-is-vector-db',
        sectionId: 'ai-data',
      },
      {
        term: 'RAG (Retrieval-Augmented Generation)',
        definition:
          "A pattern that combines retrieval (searching a knowledge base) with generation (LLM output). The model\u2019s response is grounded in retrieved documents, reducing hallucination and enabling domain-specific answers.",
        linkId: 'llamaindex-docs',
        sectionId: 'ai-orchestration',
      },
      {
        term: 'Fine-Tuning',
        definition:
          'The process of further training a pre-trained model on a specific dataset to adapt it for a particular task or domain. Much cheaper than pre-training, it turns a general model into a specialist.',
        linkId: 'openai-fine-tuning-guide',
        sectionId: 'ai-training',
      },
      {
        term: 'Context Window',
        definition:
          "The maximum amount of text (measured in tokens) that a language model can process in a single request. Exceeding it causes truncation or errors. GPT-4\u2019s context window is 128K tokens.",
        linkId: 'openai-api-reference',
        sectionId: 'ai-key-terms',
      },
      {
        term: 'Token (LLM)',
        definition:
          'The smallest unit of text processed by a language model. Roughly corresponds to ~4 characters or ~0.75 words in English. Token count determines context window usage and API pricing.',
        linkId: 'openai-api-reference',
        sectionId: 'ai-key-terms',
      },
      {
        term: 'Hallucination',
        definition:
          'When an AI model generates confident-sounding but factually incorrect or fabricated information. RAG and guardrails are common techniques for reducing hallucination in production.',
        linkId: 'openai-api-reference',
        sectionId: 'ai-key-terms',
      },
      {
        term: 'RLHF',
        definition:
          "Reinforcement Learning from Human Feedback. A training technique where human preferences are used to fine-tune a model\u2019s behavior \u2014 humans rank model outputs, and the model learns to produce preferred responses.",
        linkId: 'huggingface-transformers-docs',
        sectionId: 'ai-training',
      },
      {
        term: 'Model Registry',
        definition:
          'A versioned repository for storing, organizing, and deploying trained ML models. Analogous to a container registry (like Docker Hub) but for model artifacts instead of container images.',
        linkId: 'mlflow-docs',
        sectionId: 'ai-compute',
      },
      {
        term: 'Guardrails (AI)',
        definition:
          'Input/output validation rules applied to LLM interactions. Can filter harmful content, enforce response formats, or prevent prompt injection \u2014 like API request validation middleware for AI.',
        linkId: 'guardrails-ai-docs',
        sectionId: 'ai-orchestration',
      },
    ],
  },
]
