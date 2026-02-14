import type { InfraLayer } from './types'

export const INFRA_LAYERS: InfraLayer[] = [
  {
    id: 'inference',
    title: 'Inference & Serving',
    subtitle: 'Where your frontend connects',
    icon: '\u26A1',
    color: '#22d3ee',
    accent: '#ecfeff',
    darkAccent: '#0e3a3e',
    summary:
      'This is the layer you interact with most. Your frontend sends requests here and gets AI responses back.',
    concepts: [
      {
        name: 'API Gateway',
        what: 'The front door. Like an Express/Next.js API route, but purpose-built for routing, auth, and rate limiting.',
        analogy: 'Like Express Router with middleware for auth and rate limiting, but routing requests to AI models instead of your own endpoints.',
        tools: ['AWS API Gateway', 'Kong', 'Nginx', 'Envoy'],
      },
      {
        name: 'Model Serving',
        what: 'A specialized server that loads a model into GPU memory and responds to prediction requests. It handles batching multiple requests together for efficiency.',
        analogy:
          'Like a specialized Express server, but instead of rendering templates or serving JSON it runs math through a neural network.',
        tools: ['vLLM', 'TGI (HuggingFace)', 'NVIDIA Triton', 'TensorRT-LLM'],
      },
      {
        name: 'Streaming Responses',
        what: "Models generate tokens one at a time. Server-Sent Events (SSE) stream them to your frontend as they\u2019re produced \u2014 that\u2019s the \u2018typing\u2019 effect you see in ChatGPT.",
        analogy:
          "Exactly like SSE or WebSockets you\u2019d use in a chat app, but the \u2018sender\u2019 is a model.",
        tools: ['SSE', 'WebSockets', 'gRPC streaming'],
      },
      {
        name: 'Load Balancing',
        what: "Distributes incoming requests across multiple model servers. Critical because inference is slow and expensive \u2014 you can\u2019t have one server handling everything.",
        analogy:
          'Same concept as frontend CDN load balancing, but for GPU servers.',
        tools: ['Kubernetes Ingress', 'HAProxy', 'Cloud Load Balancers'],
      },
    ],
  },
  {
    id: 'orchestration',
    title: 'Orchestration & Pipelines',
    subtitle: 'The business logic layer',
    icon: '\u{1F517}',
    color: '#a78bfa',
    accent: '#ede9fe',
    darkAccent: '#2a2040',
    summary:
      "This is where \u2018just call the model\u2019 becomes a real product. Chains together multiple steps: retrieval, prompting, model calls, post-processing.",
    concepts: [
      {
        name: 'RAG (Retrieval-Augmented Generation)',
        what: "Before asking the model a question, first search a knowledge base for relevant context, then include that context in the prompt. This is how AI apps \u2018know\u2019 about your company\u2019s data.",
        analogy:
          'Like how you\u2019d Google something before answering a question \u2014 except automated and injected into the prompt.',
        tools: ['LangChain', 'LlamaIndex', 'Haystack'],
      },
      {
        name: 'Prompt Templates & Management',
        what: 'System prompts and user prompt templates are versioned and managed like code. Different prompts for different tasks, A/B tested and monitored.',
        analogy:
          'Think of it like i18n/localization files but for AI instructions.',
        tools: ['LangSmith', 'Promptfoo', 'Humanloop'],
      },
      {
        name: 'Agent Workflows',
        what: "The model decides what to do next \u2014 calling tools, searching, writing code \u2014 in a loop until the task is done. This is how coding assistants and research agents work.",
        analogy:
          "Like a recursive React component that keeps rendering until a condition is met, but each \u2018render\u2019 is an AI decision.",
        tools: ['LangGraph', 'CrewAI', 'AutoGen'],
      },
      {
        name: 'Guardrails & Safety',
        what: 'Checks that run before and after model calls to filter harmful content, enforce output formats, and validate responses.',
        analogy:
          'Like form validation and sanitization, but for AI inputs and outputs.',
        tools: ['Guardrails AI', 'NeMo Guardrails', 'custom classifiers'],
      },
    ],
  },
  {
    id: 'data',
    title: 'Data & Vector Storage',
    subtitle: 'How AI apps remember things',
    icon: '\u{1F5C4}\uFE0F',
    color: '#34d399',
    accent: '#d1fae5',
    darkAccent: '#0e3529',
    summary:
      "AI apps need special databases. Vector databases store \u2018embeddings\u2019 \u2014 numerical representations of text/images that let you find semantically similar content.",
    concepts: [
      {
        name: 'Embeddings',
        what: 'A model converts text into a list of numbers (a vector) that captures its meaning. Similar texts have similar vectors. This powers semantic search.',
        analogy:
          'Like converting colors to hex codes \u2014 "ocean blue" and "sea blue" would have similar hex values.',
        tools: ['OpenAI Embeddings', 'Cohere Embed', 'sentence-transformers'],
      },
      {
        name: 'Vector Databases',
        what: "Specialized databases optimized for finding the nearest neighbors to a given vector. Regular databases can\u2019t do this efficiently.",
        analogy:
          'Like a search autocomplete that matches by meaning instead of exact text \u2014 you query \u2018broken login\u2019 and it finds docs about \u2018authentication failures.\u2019',
        tools: ['Pinecone', 'Weaviate', 'Chroma', 'pgvector'],
      },
      {
        name: 'Document Processing',
        what: 'Raw documents (PDFs, web pages, code) get chunked into pieces, embedded, and stored. Chunk size and overlap strategy significantly affect quality.',
        analogy:
          'Like preprocessing markdown files into searchable content for your app \u2014 you parse, chunk, and transform raw documents into indexed pieces ready for retrieval.',
        tools: ['Unstructured', 'LangChain loaders', 'Apache Tika'],
      },
      {
        name: 'Feature Stores',
        what: 'Centralized storage for computed features (user history, usage patterns) that get injected into prompts or used for personalization.',
        analogy:
          'Like a Redux store but for ML features \u2014 precomputed, cached, and shared across services.',
        tools: ['Feast', 'Tecton', 'custom Redis caches'],
      },
    ],
  },
  {
    id: 'training',
    title: 'Training & Fine-Tuning',
    subtitle: 'How models get smart',
    icon: '\u{1F9E0}',
    color: '#fb923c',
    accent: '#fff7ed',
    darkAccent: '#3b2410',
    summary:
      'Foundation models are pre-trained on massive datasets. Fine-tuning adapts them to specific tasks with smaller, domain-specific data. This is GPU-intensive work.',
    concepts: [
      {
        name: 'Pre-Training',
        what: 'Training a model from scratch on billions of tokens of text. Requires thousands of GPUs for weeks/months. Only done by large labs (OpenAI, Anthropic, Meta).',
        analogy:
          'Like a general education \u2014 the model learns language, reasoning, and world knowledge.',
        tools: ['PyTorch', 'JAX', 'Megatron-LM', 'DeepSpeed'],
      },
      {
        name: 'Fine-Tuning',
        what: 'Taking a pre-trained model and training it further on your specific data/task. Much cheaper than pre-training. Can make a general model into a specialist.',
        analogy:
          'Like specializing after college \u2014 a doctor learns general science first, then specializes in cardiology.',
        tools: ['Hugging Face Transformers', 'Axolotl', 'OpenAI fine-tuning API'],
      },
      {
        name: 'RLHF / Alignment',
        what: "Reinforcement Learning from Human Feedback. Humans rate model outputs, and the model learns to produce responses humans prefer. This is why ChatGPT feels \u2018helpful\u2019.",
        analogy:
          'Like A/B testing but for AI personality \u2014 humans vote on which response is better, and the model learns from those votes.',
        tools: ['TRL (Transformer RL)', 'OpenAI', 'Anthropic RLAIF'],
      },
      {
        name: 'Evaluation & Benchmarks',
        what: 'Systematic testing of model quality. Automated benchmarks + human evaluation. Critical for knowing if fine-tuning actually helped.',
        analogy:
          'Like your test suite and Lighthouse scores, but for AI quality.',
        tools: ['lm-eval-harness', 'HELM', 'custom eval suites'],
      },
    ],
  },
  {
    id: 'infra',
    title: 'Infrastructure & Compute',
    subtitle: 'The physical foundation',
    icon: '\u{1F5A5}\uFE0F',
    color: '#f472b6',
    accent: '#fce7f3',
    darkAccent: '#3b1028',
    summary:
      'AI workloads need GPUs \u2014 lots of them. This layer handles provisioning, scaling, and managing the actual hardware and cloud resources.',
    concepts: [
      {
        name: 'GPU Clusters',
        what: 'Groups of servers with high-end GPUs (NVIDIA A100, H100). Connected with fast networking (InfiniBand) for distributed training. The most expensive part of AI.',
        analogy:
          'If regular servers are sedans, GPU servers are Formula 1 cars \u2014 specialized, expensive, and high-maintenance.',
        tools: ['NVIDIA DGX', 'AWS p5 instances', 'GCP A3', 'CoreWeave'],
      },
      {
        name: 'Container Orchestration',
        what: 'AI services run in containers, managed by Kubernetes. GPU scheduling is tricky \u2014 you need to manage GPU memory, multi-tenancy, and failover.',
        analogy:
          'Like Docker/K8s you might know from frontend CI/CD, but with GPU resource management added.',
        tools: ['Kubernetes + GPU operator', 'Ray', 'Docker'],
      },
      {
        name: 'Model Registry & Versioning',
        what: 'Models are large files (billions of parameters = many GB). They need versioning, storage, and deployment pipelines \u2014 like Git but for multi-GB binary files.',
        analogy:
          'Like npm registry + Docker Hub, but for AI models instead of packages or images.',
        tools: ['MLflow', 'Weights & Biases', 'Hugging Face Hub', 'DVC'],
      },
      {
        name: 'Monitoring & Observability',
        what: "Track latency, token usage, cost, error rates, and model quality over time. AI-specific: detect model drift (quality degrading) and hallucination rates.",
        analogy:
          "Like Datadog/Sentry for your frontend, but also tracking \u2018is the AI getting dumber?\u2019",
        tools: ['LangSmith', 'Weights & Biases', 'Arize', 'Helicone'],
      },
    ],
  },
]
