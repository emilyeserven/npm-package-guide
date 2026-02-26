import type { GlossaryCategory } from './types'

export const promptGlossary: GlossaryCategory[] = [
  {
    category: "Prompt Engineering",
    terms: [
      {
        term: "Prompt Engineering",
        definition: "The practice of crafting inputs to AI models to get better, more reliable outputs. Includes techniques like few-shot examples, chain-of-thought reasoning, and system prompt design.",
        linkId: "anthropic-prompt-engineering",
        linkIds: ['openai-prompt-engineering', 'learnprompting-org'],
        sectionId: "prompt-mistakes-logic"
      },
      {
        term: "System Prompt",
        definition: "Instructions provided to an AI model that define its role, constraints, and behavior before any user interaction. System prompts set the context that persists across the entire conversation.",
        linkId: "anthropic-system-prompts",
        linkIds: ['openai-prompt-engineering'],
        sectionId: "prompt-ctx-system-prompt"
      },
      {
        term: "Context Window",
        definition: "The maximum amount of text (measured in tokens) that an AI model can process in a single interaction. Managing what goes into the context window is critical for getting accurate results.",
        linkId: "anthropic-prompt-engineering",
        sectionId: "prompt-ctx-window",
        guides: ['prompt-engineering', 'ai-infra'],
      },
      {
        term: "Few-Shot Examples",
        definition: "Including 2\u20133 examples of desired input/output pairs in your prompt to steer the model's behavior. One of the most effective techniques for getting consistent, correctly-formatted responses.",
        linkId: "anthropic-prompt-engineering",
        sectionId: "prompt-ctx-few-shot"
      },
      {
        term: "Hallucination",
        definition: "When an AI model generates information that sounds plausible but is factually incorrect \u2014 inventing APIs, packages, or methods that don't exist. Explicit version constraints and context reduce hallucination.",
        linkId: "anthropic-prompt-engineering",
        sectionId: "prompt-mistakes-apis",
        guides: ['prompt-engineering', 'ai-infra'],
      },
      {
        term: "Chain-of-Thought",
        definition: "A prompting technique that asks the model to reason step-by-step before giving a final answer. Improves accuracy on complex, multi-step problems by making the reasoning process explicit.",
        linkId: "anthropic-extended-thinking",
        sectionId: "prompt-ctx-thinking"
      },
      {
        term: "Token",
        definition: "The basic unit of text that AI models process — roughly 3\u20134 characters or about \u00be of a word. Context windows, pricing, and rate limits are all measured in tokens. Understanding token counts helps manage context window budgets.",
        linkId: "anthropic-tokens",
        sectionId: "prompt-ctx-window",
        guides: ['prompt-engineering', 'ai-infra'],
      },
      {
        term: "Prompt Chaining",
        definition: "Breaking a complex task into a sequence of smaller, focused prompts where each step's output feeds into the next. Reduces hallucination and improves quality compared to a single massive prompt.",
        linkId: "anthropic-prompt-engineering",
        sectionId: "prompt-ctx-chaining"
      },
      {
        term: "Tool Use",
        definition: "The ability for AI models to call external functions or APIs during a conversation — reading files, querying databases, running code, or fetching web data. Extends the model beyond pure text generation.",
        linkId: "anthropic-tool-use",
        linkIds: ['anthropic-mcp'],
        sectionId: "prompt-tools-mcp"
      },
    ]
  },
  {
    category: "AI Coding Tools",
    terms: [
      {
        term: "CLAUDE.md",
        definition: "A project-level configuration file that gives Claude Code persistent context about your codebase \u2014 tech stack, conventions, common pitfalls, and key commands. Survives across sessions and reduces repeated mistakes.",
        linkId: "anthropic-claude-md",
        sectionId: "prompt-ctx-claude-md"
      },
      {
        term: "MCP (Model Context Protocol)",
        definition: "An open protocol that extends AI coding assistants with external tools and data sources. MCP servers can provide access to databases, APIs, file systems, and custom tools.",
        linkId: "anthropic-mcp",
        sectionId: "prompt-tools-mcp"
      },
      {
        term: "Claude Code Hooks",
        definition: "User-defined shell commands that run automatically at specific lifecycle points in Claude Code — before/after tool calls, on session start, or on notification. Used to enforce project rules, run linters, or trigger custom workflows.",
        linkId: "anthropic-claude-code-hooks",
        sectionId: "prompt-tools-hooks"
      },
      {
        term: "Slash Commands",
        definition: "Custom reusable commands (e.g., <code>/review</code>, <code>/test</code>) defined in <code>.claude/commands/</code> that give Claude Code pre-built prompts for common tasks. Teams can share commands to standardize AI-assisted workflows.",
        linkId: "anthropic-claude-code-skills",
        sectionId: "prompt-tools-skills"
      },
      {
        term: "Claude Skills",
        definition: "Structured prompt workflows that combine multi-step instructions, tool configurations, and verification steps into reusable packages. Skills go beyond simple slash commands by encoding complex processes like code reviews, migrations, and onboarding.",
        linkId: "anthropic-claude-code-skills",
        sectionId: "prompt-tools-claude-skills"
      },
      {
        term: "Prompt Caching",
        definition: "An API optimization that reuses repeated context across multiple calls instead of re-processing it each time. Reduces latency and cost when the same system prompt or large context block is sent repeatedly.",
        linkId: "anthropic-prompt-caching",
        sectionId: "prompt-ctx-window"
      },
      {
        term: "Cursor",
        definition: "An AI-enhanced IDE built as a fork of VS Code. Provides inline Tab completions, an AI chat panel, and a Composer mode for multi-file editing from natural language prompts. Supports multiple AI model backends.",
        linkId: "cursor-docs",
        sectionId: "prompt-coding-tools"
      },
      {
        term: "GitHub Copilot",
        definition: "GitHub\u2019s AI pair programmer that integrates into existing editors (VS Code, JetBrains, Neovim) as a plugin. Offers inline code completions, a chat panel, and an agent mode for multi-step tasks.",
        linkId: "github-copilot-docs",
        sectionId: "prompt-coding-tools"
      },
      {
        term: "Windsurf",
        definition: "An AI IDE (formerly Codeium) featuring \u201CCascade\u201D \u2014 an agentic flow system that chains multi-step reasoning across files, terminal commands, and browser previews in a single continuous workflow.",
        linkId: "windsurf-docs",
        sectionId: "prompt-coding-tools"
      },
      {
        term: "Lovable",
        definition: "A browser-based AI app builder that generates full-stack web applications (React + Tailwind + Supabase) from natural language descriptions. Designed for rapid prototyping with real-time preview and one-click deployment.",
        linkId: "lovable-docs",
        sectionId: "prompt-coding-tools"
      },
      {
        term: "XSS (Cross-Site Scripting)",
        definition: "A security vulnerability where an attacker injects malicious scripts into web pages viewed by other users. AI-generated code frequently creates XSS vectors via <code>dangerouslySetInnerHTML</code> or unsanitized user input.",
        linkId: "owasp-xss-prevention",
        sectionId: "prompt-mistakes-security",
        guides: ['prompt-engineering', 'auth', 'nextjs-abstractions'],
      },
      {
        term: "Tailwind CSS",
        definition: "A utility-first CSS framework that provides low-level utility classes (e.g., <code>flex</code>, <code>pt-4</code>, <code>text-center</code>) instead of pre-built components. AI models frequently confuse v3 and v4 syntax.",
        linkId: "tailwind-docs",
        sectionId: "prompt-mistakes-tailwind"
      },
    ]
  },
]
