import type { AICodingTool } from './types'

export const CODING_TOOLS: AICodingTool[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    icon: '\u{1F4BB}',
    category: 'CLI Assistant',
    description:
      'Anthropic\u2019s terminal-native AI coding agent. Operates directly in your shell, reads and edits files, runs commands, and manages git workflows \u2014 all through natural language conversation in the terminal.',
    strengths: [
      'Full agentic control \u2014 reads files, writes code, runs tests, commits, and iterates autonomously',
      'Works with any editor and any language; no IDE lock-in',
      'Deep project context via CLAUDE.md memory files that persist across sessions',
      'Extensible with MCP servers, custom slash commands, and lifecycle hooks',
      'Headless mode (claude -p) enables CI/CD integration and scripted automation',
    ],
    considerations: [
      'Terminal-based interface has a steeper learning curve for developers used to GUI tools',
      'Requires an Anthropic API key or Max subscription',
      'No inline code completions \u2014 operates at the task/conversation level, not keystroke level',
    ],
    bestFor: 'Developers comfortable in the terminal who want an autonomous coding agent that integrates into existing workflows without changing editors.',
    accent: '#d4a574',
    darkAccent: '#8b6914',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '\u{1F5A5}\uFE0F',
    category: 'AI IDE',
    description:
      'An AI-enhanced IDE built as a fork of VS Code. Provides inline code completions (Tab), an AI chat panel, and multi-file editing with Composer \u2014 all integrated into a familiar editor experience.',
    strengths: [
      'Familiar VS Code interface \u2014 minimal learning curve for existing VS Code users',
      'Inline Tab completions predict your next edit as you type',
      'Composer mode enables multi-file edits from a single natural language prompt',
      'Supports multiple AI models (Claude, GPT-4, and others) as the backend',
      'Built-in codebase indexing for context-aware suggestions across the project',
    ],
    considerations: [
      'Requires switching to Cursor as your primary editor (VS Code fork, not an extension)',
      'Subscription pricing with usage limits on premium models',
      'Less suited for terminal-heavy or non-IDE workflows',
    ],
    bestFor: 'Developers who want AI deeply embedded in a visual editor with inline completions and multi-file editing.',
    accent: '#7c9cee',
    darkAccent: '#3d5a9e',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    icon: '\u{1F91D}',
    category: 'AI IDE Extension',
    description:
      'GitHub\u2019s AI pair programmer that integrates into existing editors (VS Code, JetBrains, Neovim, and more) as a plugin. Offers inline completions, chat, and an agent mode for multi-step tasks.',
    strengths: [
      'Works in your existing editor \u2014 VS Code, JetBrains, Neovim, Xcode, and others',
      'Inline completions are fast and context-aware from surrounding code',
      'Agent mode can make multi-file changes, run terminal commands, and iterate on errors',
      'Tight GitHub integration \u2014 PR summaries, issue context, and code review assistance',
      'Widely adopted with strong community and enterprise support',
    ],
    considerations: [
      'Agent mode is newer and less mature than standalone agentic tools',
      'Completions can be repetitive or overly eager in boilerplate suggestions',
      'Requires a GitHub Copilot subscription (free tier available with limits)',
    ],
    bestFor: 'Developers who want AI completions and chat in their current editor without switching tools, especially teams already on GitHub.',
    accent: '#7cc4a0',
    darkAccent: '#3a7a58',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    icon: '\u{1F3C4}',
    category: 'AI IDE',
    description:
      'An AI IDE (formerly Codeium) with "Cascade" \u2014 an agentic flow system that chains multi-step reasoning across files, terminal commands, and browser previews in a single continuous workflow.',
    strengths: [
      'Cascade flows chain multi-step edits, terminal commands, and previews automatically',
      'Strong free tier with generous usage limits for individual developers',
      'Built-in code completions alongside the agentic chat experience',
      'Supports multiple AI models and provides context across the full codebase',
      'Browser preview integration for front-end development feedback loops',
    ],
    considerations: [
      'Smaller ecosystem and community compared to Cursor or Copilot',
      'Requires switching to the Windsurf editor (VS Code-based but separate)',
      'Cascade automation can make unexpected changes if prompts are too broad',
    ],
    bestFor: 'Developers who want an agentic IDE that handles multi-step tasks end-to-end with minimal manual intervention.',
    accent: '#8cb4d8',
    darkAccent: '#4a7a9e',
  },
  {
    id: 'lovable',
    name: 'Lovable',
    icon: '\u{1F49C}',
    category: 'App Builder',
    description:
      'A browser-based AI app builder that generates full-stack web applications from natural language descriptions. Produces React + Tailwind + Supabase apps with real-time preview and one-click deployment.',
    strengths: [
      'Generates complete, deployable apps from a text description \u2014 no local setup required',
      'Built-in Supabase integration for authentication, database, and storage',
      'Real-time preview shows your app updating as the AI generates code',
      'Good for rapid prototyping, internal tools, and MVPs',
      'Connects to GitHub for exporting generated code to a real repository',
    ],
    considerations: [
      'Less control over architecture and code structure compared to IDE-based tools',
      'Generated code may need significant refactoring for production use',
      'Limited to web apps with a specific tech stack (React, Tailwind, Supabase)',
      'Not designed for working within an existing codebase',
    ],
    bestFor: 'Non-frontend developers or teams who need to quickly prototype and deploy web apps without deep frontend expertise.',
    accent: '#c78dcc',
    darkAccent: '#7a4a80',
  },
  {
    id: 'bolt',
    name: 'Bolt',
    icon: '\u26A1',
    category: 'App Builder',
    description:
      'A browser-based AI development environment by StackBlitz that generates and runs full-stack apps entirely in the browser using WebContainers. Supports multiple frameworks and provides an in-browser terminal.',
    strengths: [
      'Runs a full Node.js environment in the browser \u2014 no local install needed',
      'Supports multiple frameworks: React, Vue, Svelte, Next.js, Astro, and more',
      'In-browser terminal lets you see commands and output as the AI works',
      'Open-source version (bolt.diy) available for self-hosting and customization',
      'Exports to GitHub or downloads as a project for continued local development',
    ],
    considerations: [
      'Browser-based runtime has limitations compared to local development',
      'Generated code often needs cleanup and refactoring for production standards',
      'Less effective for complex, multi-service architectures',
      'Not designed for working within an existing large codebase',
    ],
    bestFor: 'Quick prototyping across multiple frameworks when you want everything running in the browser with zero local setup.',
    accent: '#e8a87c',
    darkAccent: '#9e6a3a',
  },
]
