import type { InfraWorkflow } from './types'

export const INFRA_WORKFLOWS: InfraWorkflow[] = [
  {
    id: 'simple-chat',
    title: 'Simple Chat Completion',
    description:
      'The most basic workflow \u2014 your frontend asks a question, gets an answer.',
    steps: [
      { layer: 'inference', label: 'Frontend sends POST to /api/chat', icon: '\u2192' },
      { layer: 'inference', label: 'API Gateway authenticates & rate-limits', icon: '\u{1F512}' },
      { layer: 'inference', label: 'Model server loads prompt into GPU memory', icon: '\u26A1' },
      { layer: 'inference', label: 'Tokens stream back via SSE', icon: '\u{1F4E1}' },
    ],
  },
  {
    id: 'rag',
    title: 'RAG (Search + Answer)',
    description:
      'User asks about company data. The system searches for context first, then answers.',
    steps: [
      { layer: 'inference', label: 'Frontend sends user question', icon: '\u2192' },
      { layer: 'data', label: 'Question is embedded into a vector', icon: '\u{1F522}' },
      { layer: 'data', label: 'Vector DB finds similar documents', icon: '\u{1F50D}' },
      { layer: 'orchestration', label: 'Retrieved docs injected into prompt template', icon: '\u{1F4DD}' },
      { layer: 'inference', label: 'Model generates answer with context', icon: '\u26A1' },
      { layer: 'orchestration', label: 'Guardrails validate the response', icon: '\u{1F6E1}\uFE0F' },
      { layer: 'inference', label: 'Response streamed to frontend', icon: '\u{1F4E1}' },
    ],
  },
  {
    id: 'agent',
    title: 'AI Agent Workflow',
    description:
      'The model decides what tools to call in a loop \u2014 like a coding assistant.',
    steps: [
      { layer: 'inference', label: 'Frontend sends complex task', icon: '\u2192' },
      { layer: 'orchestration', label: 'Agent receives task + available tools', icon: '\u{1F9E0}' },
      { layer: 'orchestration', label: "Model decides: \u2018I need to search first\u2019", icon: '\u{1F914}' },
      { layer: 'data', label: 'Executes search tool, gets results', icon: '\u{1F50D}' },
      { layer: 'orchestration', label: "Model decides: \u2018Now I can answer\u2019", icon: '\u{1F914}' },
      { layer: 'orchestration', label: 'Guardrails check final output', icon: '\u{1F6E1}\uFE0F' },
      { layer: 'inference', label: 'Final response streamed to frontend', icon: '\u{1F4E1}' },
    ],
  },
  {
    id: 'finetune',
    title: 'Model Fine-Tuning Pipeline',
    description:
      'Taking a base model and specializing it for your use case.',
    steps: [
      { layer: 'data', label: 'Collect & clean training data', icon: '\u{1F4CA}' },
      { layer: 'data', label: 'Format into instruction/response pairs', icon: '\u{1F4DD}' },
      { layer: 'training', label: 'Load base model onto GPU cluster', icon: '\u{1F5A5}\uFE0F' },
      { layer: 'training', label: 'Train on your data for N epochs', icon: '\u{1F9E0}' },
      { layer: 'training', label: 'Evaluate on test set + benchmarks', icon: '\u{1F4C8}' },
      { layer: 'infra', label: 'Push to model registry if quality passes', icon: '\u{1F4E6}' },
      { layer: 'inference', label: 'Deploy new model to serving infrastructure', icon: '\u{1F680}' },
    ],
  },
]
