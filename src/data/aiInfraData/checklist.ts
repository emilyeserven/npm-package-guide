import type { ChecklistBaseSection } from '../../components/mdx/ChecklistBase'

export const AI_INFRA_CHECKLIST: ChecklistBaseSection[] = [
  {
    id: 'inference',
    name: 'Inference & Model Serving',
    icon: '\u{1F50C}',  // 🔌
    items: [
      { label: 'Choose an inference provider \u2014 managed API (OpenAI, Anthropic) vs. self-hosted (vLLM, TGI, Ollama)' },
      { label: 'Set up API authentication and store API keys securely (environment variables, secrets manager)' },
      { label: 'Implement streaming responses for chat-style UIs to reduce perceived latency' },
      { label: 'Add request timeouts and retry logic with exponential backoff for API calls' },
      { label: 'Configure rate limiting to stay within provider quotas and control costs' },
      { label: 'Set up load balancing across multiple model endpoints if using self-hosted inference' },
    ],
  },
  {
    id: 'orchestration',
    name: 'Orchestration Layer',
    icon: '\u{1F3AF}',  // 🎯
    items: [
      { label: 'Choose an orchestration approach \u2014 framework (LangChain, LlamaIndex) vs. custom code with direct API calls' },
      { label: 'Design your prompt templates with clear system messages, user context, and output format instructions' },
      { label: 'Implement guardrails for input validation (length limits, content filtering) and output validation' },
      { label: 'Set up conversation memory management \u2014 sliding window, summarization, or token-based truncation' },
      { label: 'Add structured output parsing (JSON mode, function calling) for reliable downstream processing' },
      { label: 'Implement fallback logic \u2014 retry with a different model or return a graceful error if all models fail' },
    ],
  },
  {
    id: 'data-pipeline',
    name: 'Data & RAG Pipeline',
    icon: '\u{1F4BE}',  // 💾
    items: [
      { label: 'Identify your data sources \u2014 documents, databases, APIs, or user-generated content' },
      { label: 'Choose an embedding model and verify its dimension size matches your vector database\u2019s configuration' },
      { label: 'Set up a vector database (Pinecone, Weaviate, pgvector, Chroma) for similarity search' },
      { label: 'Implement a document processing pipeline: chunking strategy, metadata extraction, and embedding generation' },
      { label: 'Design your retrieval strategy: top-k similarity search, hybrid search (keyword + semantic), or reranking' },
      { label: 'Build an ingestion pipeline that can incrementally update embeddings as source data changes' },
    ],
  },
  {
    id: 'training',
    name: 'Training & Fine-Tuning',
    icon: '\u{1F9EA}',  // 🧪
    items: [
      { label: 'Determine if fine-tuning is necessary \u2014 start with prompt engineering and RAG before training a custom model' },
      { label: 'Prepare a training dataset: clean, deduplicate, and format into the provider\u2019s expected schema (JSONL)' },
      { label: 'Split data into training and validation sets to monitor for overfitting' },
      { label: 'Choose fine-tuning method: full fine-tune, LoRA, QLoRA, or provider-managed fine-tuning API' },
      { label: 'Set up evaluation metrics \u2014 automated benchmarks (BLEU, ROUGE) and human evaluation workflows' },
      { label: 'Version your training data and model artifacts for reproducibility' },
    ],
  },
  {
    id: 'compute-deployment',
    name: 'Compute & Deployment',
    icon: '\u{1F5A5}\uFE0F',  // 🖥️
    items: [
      { label: 'Estimate GPU requirements based on model size, batch size, and expected concurrency' },
      { label: 'Choose a compute platform \u2014 cloud GPU instances (AWS, GCP, Azure), serverless inference, or on-premise' },
      { label: 'Set up a model registry to track model versions, metadata, and deployment status' },
      { label: 'Implement health checks and auto-scaling for model serving endpoints' },
      { label: 'Add observability: log prompts/completions (redacted), track latency, monitor token usage and costs' },
      { label: 'Set up alerting for error rate spikes, latency degradation, and cost anomalies' },
    ],
  },
]
