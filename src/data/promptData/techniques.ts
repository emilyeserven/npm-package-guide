import type { ToolTechnique, MetaToolItem, ContextTechnique } from './types'

// ── Advanced tool usage ─────────────────────────────────────────────

export const TOOL_TECHNIQUES: ToolTechnique[] = [
  {
    id: 'mcp-servers',
    name: 'MCP Servers',
    icon: '\u{1F50C}',
    description: 'Model Context Protocol servers extend Claude with external tools and data sources',
    details: [
      'MCP (Model Context Protocol) is an open standard that lets AI models connect to external tools, APIs, and data sources through a unified interface',
      'Servers run as separate processes that Claude communicates with \u2014 each server exposes a set of tools the model can call during a conversation',
      'Configure servers in .mcp.json at the project root (shared with your team) or ~/.claude/mcp.json globally (personal tools)',
      'Two transport types: stdio for local servers (launched via npx/node) and SSE (Server-Sent Events) for remote servers over HTTP',
      'Community servers exist for GitHub, Filesystem, Fetch, Brave Search, Memory, PostgreSQL, and many more \u2014 most are installable via npx with zero setup',
      'You can build custom MCP servers to expose your own internal tools, databases, or APIs to Claude',
      'MCP servers are especially powerful for domain-specific reviews \u2014 use Fetch to pull React docs or OWASP cheat sheets, Filesystem to read design tokens, and Brave Search to check for known CVEs',
    ],
    bestFor: [
      'Pulling external documentation into code reviews (React docs, MDN, framework guides)',
      'Repository management via GitHub server \u2014 creating issues, reviewing PRs, searching code across repos',
      'Persistent project knowledge using the Memory server \u2014 remembering architecture decisions across sessions',
      'Secure file access outside the working directory using the Filesystem server with configurable permission boundaries',
      'Web research during development \u2014 checking package status, reading changelogs, finding migration guides',
      'Database access for reviewing schemas, writing queries, or debugging data issues',
    ],
    implementation: [
      {
        title: 'Create a project-level config',
        description: 'Add a .mcp.json file at your project root. This file is committed to version control so your entire team gets the same tools.',
        code: `// .mcp.json \u2014 project-level config (committed to git)
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}`,
      },
      {
        title: 'Add personal servers globally',
        description: 'For tools you want everywhere (not just one project), configure them in your home directory.',
        code: `// ~/.claude/mcp.json \u2014 global config (personal)
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-api-key-here"
      }
    }
  }
}`,
      },
      {
        title: 'Verify servers are connected',
        description: 'Start Claude Code and check the status bar or run /mcp to see which servers are active. Each server will show its available tools.',
      },
      {
        title: 'Use servers in your workflow',
        description: 'Once configured, Claude automatically discovers and uses MCP tools when relevant. You can also explicitly ask Claude to use a specific server.',
      },
    ],
    examples: [
      {
        title: 'Basic two-server setup',
        code: `// .mcp.json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}`,
        description: 'A minimal setup with Fetch (for reading web pages) and Memory (for persistent knowledge across sessions).',
      },
      {
        title: 'Full project config with GitHub and Filesystem',
        code: `// .mcp.json \u2014 full-featured project config
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y", "@modelcontextprotocol/server-filesystem",
        "/path/to/design-tokens",
        "/path/to/shared-configs"
      ]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}`,
        description: 'A project setup giving Claude access to GitHub (PRs, issues, code search), Filesystem (design tokens and shared configs outside the repo), and Fetch (web docs).',
      },
      {
        title: 'Remote SSE server (for hosted/shared servers)',
        code: `// .mcp.json \u2014 remote server via SSE transport
{
  "mcpServers": {
    "internal-api": {
      "url": "https://mcp.internal.company.com/sse",
      "headers": {
        "Authorization": "Bearer $INTERNAL_API_TOKEN"
      }
    }
  }
}`,
        description: 'Connect to a remote MCP server over SSE \u2014 useful for shared team servers or cloud-hosted tools.',
      },
    ],
    tips: [
      'Start with just 1\u20132 servers (Fetch + Memory is a great starting point) and add more as needed \u2014 each server adds startup time',
      'Use project-level .mcp.json for team-shared tools and global ~/.claude/mcp.json for personal ones',
      'Combine Fetch + Brave Search for powerful research workflows: search for docs, then fetch and read them',
      'The GitHub server is especially valuable for mono-repo workflows where you need to reference code across multiple repositories',
      'Environment variables in .mcp.json support $VAR syntax so you can reference secrets without committing them',
    ],
  },
  {
    id: 'skills',
    name: 'Custom Slash Commands',
    icon: '\u{1F3AF}',
    description: 'Create reusable slash commands that expand into full prompt templates',
    details: [
      'Slash commands (also called "skills") are Markdown files that expand into full prompt templates when invoked',
      'Define them in .claude/commands/ (project-level, shared via git) or ~/.claude/commands/ (user-level, personal)',
      'Invoke project commands with /project:<name> and user commands with /user:<name> from the Claude Code prompt',
      'Commands can include $ARGUMENTS as a placeholder \u2014 replaced with whatever the user types after the command',
      'The Markdown file content becomes the full prompt, so you can include detailed instructions, checklists, examples, and constraints',
      'Project-level commands are committed to version control, making them a powerful way to standardize AI workflows across a team',
    ],
    bestFor: [
      'Repetitive code review workflows with consistent checklists (security, performance, accessibility)',
      'Team onboarding \u2014 create a /project:setup command that explains the codebase and walks through first tasks',
      'Domain-specific audits: /project:security-review for OWASP checks, /project:a11y-check for accessibility',
      'Migration helpers: /project:migrate-component to apply consistent migration patterns across files',
      'Commit message and PR description templates that enforce team conventions',
      'Debugging workflows: /project:debug-query for database issues, /project:debug-render for React performance',
    ],
    implementation: [
      {
        title: 'Create the commands directory',
        description: 'Make the directory where your command files will live. Project-level commands go in .claude/commands/ at your project root.',
        code: `mkdir -p .claude/commands`,
      },
      {
        title: 'Write a command file',
        description: 'Create a Markdown file named after your command. The entire file content becomes the prompt template.',
        code: `# .claude/commands/review.md
Review the following code changes for:
1. Security vulnerabilities (injection, XSS, CSRF)
2. Performance issues (N+1 queries, memory leaks)
3. Missing error handling
4. Adherence to project conventions in CLAUDE.md

Focus on: $ARGUMENTS

Provide a structured report with severity ratings.`,
      },
      {
        title: 'Add dynamic arguments',
        description: 'Use $ARGUMENTS anywhere in the template. When the user types /project:review auth module, the text "auth module" replaces $ARGUMENTS.',
      },
      {
        title: 'Test your command',
        description: 'In Claude Code, type /project:review and verify it expands correctly. Add arguments to test the $ARGUMENTS substitution.',
      },
      {
        title: 'Share via version control',
        description: 'Commit the .claude/commands/ directory to git. Every team member gets the same commands when they pull.',
        code: `git add .claude/commands/
git commit -m "Add team slash commands for code review and security audit"`,
      },
    ],
    examples: [
      {
        title: 'Code review command',
        code: `# .claude/commands/review.md
Review the following code changes for:
1. Security vulnerabilities (injection, XSS, CSRF)
2. Performance issues (N+1 queries, memory leaks)
3. Missing error handling
4. Adherence to project conventions in CLAUDE.md

Focus on: $ARGUMENTS

Provide a structured report with severity ratings.`,
        description: 'A general-purpose review command. Usage: /project:review the auth middleware changes',
      },
      {
        title: 'Security audit command',
        code: `# .claude/commands/security-audit.md
Perform a thorough security audit of $ARGUMENTS:

## Check for:
- SQL injection and NoSQL injection vectors
- Cross-site scripting (XSS) vulnerabilities
- Cross-site request forgery (CSRF) missing protections
- Insecure direct object references (IDOR)
- Exposed secrets, API keys, or credentials
- Missing input validation and sanitization
- Insecure authentication or session handling

## Output format:
For each finding, provide:
- **Severity**: Critical / High / Medium / Low
- **Location**: File and line number
- **Issue**: What the vulnerability is
- **Fix**: Specific code change to resolve it`,
        description: 'A detailed security-focused audit. Usage: /project:security-audit src/api/',
      },
      {
        title: 'Accessibility check command',
        code: `# .claude/commands/a11y-check.md
Check $ARGUMENTS for accessibility (WCAG 2.1 AA) compliance:

- All interactive elements are keyboard accessible
- Images have meaningful alt text (or alt="" for decorative)
- Form inputs have associated labels
- Color contrast meets 4.5:1 ratio for text
- Focus indicators are visible
- ARIA roles and attributes are used correctly
- Heading hierarchy is logical (no skipped levels)
- Dynamic content changes are announced to screen readers

Suggest fixes for any violations found.`,
        description: 'An accessibility audit command. Usage: /project:a11y-check src/components/Form.tsx',
      },
      {
        title: 'User-level global command',
        code: `# ~/.claude/commands/explain.md
Explain $ARGUMENTS in simple terms, as if to a backend
engineer learning frontend development for the first time.

Include:
- What it is and why it exists
- A minimal code example
- Common gotchas
- How it relates to backend concepts they already know`,
        description: 'A personal command available in all projects. Usage: /user:explain React Server Components',
      },
    ],
    tips: [
      'Keep each command focused on one task \u2014 a single-purpose /project:security-review is better than a catch-all /project:review-everything',
      'Use descriptive filenames: review.md, security-audit.md, migrate-component.md \u2014 the filename becomes the command name',
      'Reference CLAUDE.md in your commands ("Adherence to project conventions in CLAUDE.md") to leverage your existing context',
      'Create a /project:onboard command for new team members that explains the codebase, key patterns, and how to run the project',
      'Combine commands with MCP servers for powerful workflows \u2014 a review command can ask Claude to fetch relevant docs via the Fetch server',
    ],
  },
  {
    id: 'hooks',
    name: 'Hooks & Automation',
    icon: '\u{1F527}',
    description: 'Run shell commands automatically in response to Claude Code events',
    details: [
      'Hooks are user-defined shell commands that execute automatically at specific points in the Claude Code lifecycle',
      'Configure hooks in .claude/settings.json (project-level) or ~/.claude/settings.json (global) under the "hooks" key',
      'Four hook types: PreToolUse (before a tool runs), PostToolUse (after a tool runs), Notification (when Claude sends a notification), and Stop (when Claude finishes a turn)',
      'Each hook has a "matcher" that controls which tool triggers it \u2014 use tool names like "Write", "Edit", "Bash", or patterns like "Write|Edit"',
      'Hook scripts receive context via environment variables: $TOOL_NAME, $FILEPATH, $TOOL_INPUT, and more',
      'PreToolUse hooks can block operations by exiting with a non-zero status code \u2014 great for safety guards',
      'PostToolUse hooks run after the tool completes, making them ideal for auto-formatting, linting, or test running',
    ],
    bestFor: [
      'Auto-formatting files after Claude writes or edits them (Prettier, ESLint --fix, gofmt)',
      'Blocking dangerous operations \u2014 prevent Claude from deleting production configs or running destructive commands',
      'Running tests automatically after code changes to catch regressions immediately',
      'Sending notifications (Slack, email, desktop) when long-running tasks complete',
      'Enforcing project rules: auto-rejecting changes to locked files, requiring certain patterns in new files',
      'Logging and auditing Claude\u2019s actions for compliance or debugging purposes',
    ],
    implementation: [
      {
        title: 'Create the settings file',
        description: 'Add a .claude/settings.json file at your project root (or edit ~/.claude/settings.json for global hooks).',
        code: `// .claude/settings.json
{
  "hooks": {}
}`,
      },
      {
        title: 'Add a PostToolUse hook for auto-formatting',
        description: 'This hook runs Prettier on any file Claude writes or edits. The matcher "Write|Edit" triggers on both tool types.',
        code: `// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": "npx prettier --write $FILEPATH"
      }
    ]
  }
}`,
      },
      {
        title: 'Add a PreToolUse safety guard',
        description: 'Block Claude from running dangerous shell commands. The hook script exits non-zero to prevent the operation.',
        code: `// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hook": "if echo \\"$TOOL_INPUT\\" | grep -qE 'rm\\s+-rf|drop\\s+table|git\\s+push.*--force'; then echo 'BLOCKED: Dangerous command detected' >&2; exit 1; fi"
      }
    ]
  }
}`,
      },
      {
        title: 'Test hooks manually',
        description: 'After configuring hooks, make a small edit with Claude and verify the hook runs. Check the Claude Code output for hook execution messages.',
      },
    ],
    examples: [
      {
        title: 'Auto-format on file write',
        code: `// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": "npx prettier --write $FILEPATH"
      }
    ]
  }
}`,
        description: 'Runs Prettier on every file Claude creates or modifies. Ensures all AI-generated code matches your formatting rules.',
      },
      {
        title: 'Safety guard against destructive commands',
        code: `// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hook": "if echo \\"$TOOL_INPUT\\" | grep -qE 'rm\\s+-rf|drop\\s+table|git\\s+push.*--force'; then echo 'BLOCKED: Dangerous command detected' >&2; exit 1; fi"
      }
    ]
  }
}`,
        description: 'Intercepts shell commands before execution and blocks anything matching destructive patterns like rm -rf, DROP TABLE, or force push.',
      },
      {
        title: 'Run lint after code changes',
        code: `// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": "npx eslint --fix $FILEPATH 2>/dev/null || true"
      }
    ]
  }
}`,
        description: 'Runs ESLint with auto-fix after every file change. The || true prevents hook failures from interrupting Claude.',
      },
      {
        title: 'Desktop notification on task completion',
        code: `// .claude/settings.json (macOS example)
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hook": "osascript -e 'display notification \\"$TOOL_INPUT\\" with title \\"Claude Code\\"'"
      }
    ]
  }
}`,
        description: 'Sends a macOS notification when Claude completes a task. Useful for long-running operations where you switch to another window.',
      },
    ],
    tips: [
      'Keep hook scripts fast \u2014 slow hooks add latency to every tool call. Formatting a single file is fine; running a full test suite is not',
      'Use specific matchers to avoid running hooks unnecessarily. "Write|Edit" is better than a catch-all that triggers on Read too',
      'Test hooks manually before relying on them \u2014 a broken PreToolUse hook can block all of Claude\u2019s operations',
      'Add || true to PostToolUse hooks if the hook failing shouldn\u2019t prevent Claude from continuing',
      'Combine hooks with slash commands: a /project:review command can trigger a PostToolUse hook that runs your test suite',
      'Use project-level .claude/settings.json for team-shared hooks and global settings for personal preferences',
    ],
  },
  {
    id: 'optimization',
    name: 'Performance Optimization',
    icon: '\u26A1',
    description: 'Strategies for getting faster, cheaper, and more accurate results from Claude',
    details: [
      'Headless mode (claude -p) runs Claude without an interactive session \u2014 ideal for scripting, CI/CD, and batch processing',
      'Pipe specific context directly instead of letting Claude search: cat file.ts | claude -p "review this" is faster and cheaper than "review file.ts"',
      'Use --allowedTools to pre-authorize tools and skip permission prompts for trusted operations in automated workflows',
      'Combine Claude with unix tools: find + xargs + claude for batch processing across many files',
      'Use --output-format json for programmatic consumption \u2014 parse structured results in scripts and pipelines',
      'Run /compact periodically in long interactive sessions to summarize context and keep token usage lean',
      'Scope tasks narrowly: "review src/auth/ for XSS" is faster and more accurate than "review the whole project"',
    ],
    bestFor: [
      'CI/CD pipelines \u2014 automated PR reviews, changelog generation, migration validation',
      'Batch file processing \u2014 reviewing, refactoring, or documenting many files in one pass',
      'Commit message and PR description generation from staged diffs',
      'Automated code review as a GitHub Actions step alongside lint and test',
      'Large codebase navigation \u2014 scoping tasks to specific directories for speed and accuracy',
      'Script-driven workflows where Claude is one step in a larger automation chain',
    ],
    implementation: [
      {
        title: 'Use headless mode for scripted tasks',
        description: 'The -p flag runs Claude in non-interactive "print" mode. It reads from stdin, processes the prompt, and outputs the result.',
        code: `# Basic headless usage
echo "Explain this function" | claude -p

# Pipe a file for review
cat src/auth/middleware.ts | claude -p "Review for security issues"

# Use a prompt directly (no stdin)
claude -p "List all TODO comments in src/"`,
      },
      {
        title: 'Configure output format',
        description: 'Use --output-format to control how results are returned. JSON format is ideal for scripting.',
        code: `# JSON output for parsing in scripts
cat file.ts | claude -p "Find bugs" --output-format json

# Stream output for real-time display
cat file.ts | claude -p "Review this" --output-format stream-json`,
      },
      {
        title: 'Pre-authorize tools for automation',
        description: 'In automated workflows, use --allowedTools to skip interactive permission prompts.',
        code: `# Allow specific tools
claude -p "Fix the lint errors" \\
  --allowedTools "Read,Write,Edit,Bash(npm run lint)"

# Allow all tools (use with caution)
claude -p "Run the test suite and fix failures" \\
  --allowedTools "Read,Write,Edit,Bash"`,
      },
      {
        title: 'Combine with unix tools for batch processing',
        description: 'Use find, xargs, and pipes to process multiple files or run Claude as part of a larger pipeline.',
        code: `# Review all changed files
git diff --name-only main | xargs -I {} sh -c \\
  'cat {} | claude -p "Review this file for bugs" --output-format json'

# Generate docs for all components
find src/components -name "*.tsx" | xargs -I {} sh -c \\
  'cat {} | claude -p "Write a JSDoc comment for the exported component"'`,
      },
    ],
    examples: [
      {
        title: 'Automated commit messages',
        code: `# Generate a conventional commit message from staged changes
git diff --staged | claude -p "Write a conventional commit message for these changes. Output only the commit message, nothing else."`,
        description: 'Generates a commit message from your staged diff. Pipe the result directly to git commit.',
      },
      {
        title: 'Batch security review',
        code: `# Review all changed files for security issues
git diff --name-only main | xargs -I {} sh -c \\
  'echo "=== {} ===" && cat {} | claude -p "Check for security vulnerabilities: XSS, injection, exposed secrets" --output-format json'`,
        description: 'Reviews every changed file against main for security issues, outputting structured JSON per file.',
      },
      {
        title: 'Parallel lint + AI review',
        code: `# Run lint and AI review in parallel
pnpm lint &
git diff | claude -p "Check for security issues and performance problems" &
wait`,
        description: 'Runs traditional linting alongside AI review in parallel. Both finish faster than running sequentially.',
      },
      {
        title: 'GitHub Actions integration',
        code: `# .github/workflows/ai-review.yml (excerpt)
- name: AI Code Review
  env:
    ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
  run: |
    git diff origin/main...HEAD | \\
      claude -p "Review these changes. Flag security issues, performance problems, and missing tests." \\
      --output-format json > review.json`,
        description: 'A GitHub Actions step that runs Claude as an automated code reviewer on every PR.',
      },
    ],
    tips: [
      'Pipe narrow, specific context rather than entire files or directories \u2014 smaller input means faster results and lower cost',
      'Use /compact in long interactive sessions to summarize and free up context window space',
      'Combine find + xargs + claude for batch operations, but consider rate limits on high-frequency usage',
      'Use --output-format json when results will be parsed by another script \u2014 it provides structured, predictable output',
      'For CI/CD, run AI review after lint/test pass to avoid wasting API calls on code that fails basic checks',
      'Scope your prompts: "review src/auth/ for SQL injection" is better than "review everything for all issues"',
    ],
  },
]

// ── Meta-tooling ────────────────────────────────────────────────────

export const META_TOOLS: MetaToolItem[] = [
  {
    id: 'ci-integration',
    name: 'CI/CD Integration',
    icon: '\u{1F3ED}',
    description: 'Use Claude Code in automated pipelines for code review, generation, and validation',
    details: [
      'Run claude -p in CI to auto-review PRs, generate changelogs, or validate migrations',
      'Use --output-format json to parse results programmatically',
      'Set up as a GitHub Actions step with ANTHROPIC_API_KEY secret',
      'Rate-limit and cache to control costs in high-frequency pipelines',
      'Combine with existing CI checks \u2014 run AI review after lint/test pass',
    ],
  },
  {
    id: 'prompt-versioning',
    name: 'Prompt Versioning',
    icon: '\u{1F4CB}',
    description: 'Track and manage system prompts and CLAUDE.md files like code',
    details: [
      'Commit CLAUDE.md and .claude/ to version control alongside your code',
      'Use PR reviews to validate prompt changes just like code changes',
      'Tag releases that include prompt changes so you can roll back',
      'Keep a CHANGELOG section in CLAUDE.md for major prompt updates',
      'Test prompt changes by running the same task before and after',
    ],
  },
  {
    id: 'team-workflows',
    name: 'Team Workflows',
    icon: '\u{1F465}',
    description: 'Establish consistent AI usage patterns across a development team',
    details: [
      'Share project-level .claude/commands/ via git for team-wide slash commands',
      'Standardize CLAUDE.md structure with a team template',
      'Define MCP server configs in .mcp.json so everyone has the same tools',
      'Create onboarding commands: /project:setup-guide for new team members',
      'Review AI-generated code with the same rigor as human-written code',
    ],
  },
  {
    id: 'evaluation',
    name: 'Evaluating AI Output',
    icon: '\u{1F50D}',
    description: 'Systematic approaches to verify and validate AI-generated code',
    details: [
      'Always run the test suite after AI makes changes \u2014 never trust blindly',
      'Use git diff to review every change before committing',
      'Check for hallucinated imports, non-existent APIs, and wrong versions',
      'Verify security: look for raw SQL, unsanitized input, exposed secrets',
      'Use a second AI pass to review the first: "Review this code for bugs"',
      'Keep a log of AI mistakes to improve your CLAUDE.md over time',
    ],
  },
]

// ── Context management techniques ────────────────────────────────────

export const CONTEXT_TECHNIQUES: ContextTechnique[] = [
  {
    id: 'system-prompt',
    name: 'System Prompt Architecture',
    icon: '\u{1F4D0}',
    description: 'Structure your system prompt like a well-organized document',
    details: [
      'Put the most important instructions FIRST \u2014 models pay more attention to the beginning',
      'Use XML tags to create clear sections: <role>, <rules>, <examples>, <constraints>',
      "Keep it at the 'right altitude' \u2014 not too vague, not too rigid",
      'Include the WHY behind rules, not just the rules themselves',
    ],
    example: `<role>You are a senior React developer working on a gov't airgapped deployment.</role>
<stack>React 19, TypeScript 5.x, shadcn/ui, TanStack Query v5</stack>
<rules>
- All components must be accessible (WCAG 2.1 AA)
- No external network calls \u2014 everything must work offline
- Use error boundaries around all async operations
</rules>
<style>Follow the project's existing patterns in ./src/components</style>`,
  },
  {
    id: 'claude-md',
    name: 'CLAUDE.md / Memory Files',
    icon: '\u{1F4DD}',
    description: 'Persistent project context that survives across sessions',
    details: [
      'Place CLAUDE.md at project root for project-wide context',
      'Include: stack, conventions, key commands, architecture decisions',
      'Grows with your project \u2014 add corrections when AI makes repeated mistakes',
      'Hierarchy: ~/.claude/CLAUDE.md (global) \u2192 ./CLAUDE.md (project) \u2192 ./src/CLAUDE.md (folder)',
    ],
    example: `# Project: GovAI Dashboard
## Stack
- Frontend: React 19 + TypeScript 5.x + Vite
- UI: shadcn/ui (migrated from Flowbite)
- State: TanStack Query v5
- Testing: Vitest + Storybook
## Conventions
- All new components get a .stories.tsx file
- Use 'cn()' utility for conditional classes
- Error handling: use ErrorBoundary wrapper, never silent catches
## Common Mistakes to Avoid
- Do NOT use Flowbite imports \u2014 we migrated to shadcn
- Do NOT use relative paths for @/ aliases`,
  },
  {
    id: 'chaining',
    name: 'Prompt Chaining & Decomposition',
    icon: '\u{1F517}',
    description: 'Break complex tasks into sequential, focused steps',
    details: [
      'Step 1: Plan \u2192 Step 2: Implement \u2192 Step 3: Test \u2192 Step 4: Refine',
      'Each step gets focused context rather than one massive prompt',
      'Use the output of one step as input to the next',
      'Reduces hallucination because each step has a narrower scope',
    ],
    example: `# Instead of: "Build me a full auth system"
# Step 1 - Plan
"Outline the components needed for JWT auth in our React/Express app.
Don't write code yet \u2014 just list the files and their responsibilities."
# Step 2 - Implement core
"Now implement the auth middleware from our plan. Use jsonwebtoken v9."
# Step 3 - Implement UI
"Create the login form component matching our shadcn/ui patterns."
# Step 4 - Test
"Write Vitest tests for the auth middleware. Cover: valid token,
expired token, missing token, malformed token."`,
  },
  {
    id: 'few-shot',
    name: 'Few-Shot Examples',
    icon: '\u{1F3AF}',
    description: "Show, don't just tell \u2014 give examples of desired output",
    details: [
      '2\u20133 examples is the sweet spot \u2014 enough to establish a pattern',
      'Include both good AND bad examples when possible',
      'Match the format you want: if you want JSON, show JSON',
      'Use diverse examples that cover different cases',
    ],
    example: `"Format component files like this:
GOOD:
export function UserCard({ name, role }: UserCardProps) {
  return (
    <Card className="p-4">
      <CardTitle>{name}</CardTitle>
      <Badge variant="secondary">{role}</Badge>
    </Card>
  );
}
BAD (don't do this):
const UserCard = (props: any) => {
  return <div class='card'><h2>{props.name}</h2></div>
}"`,
  },
  {
    id: 'window',
    name: 'Context Window Management',
    icon: '\u{1F4CA}',
    description: 'Keep your context lean and high-signal',
    details: [
      'Use /compact in Claude Code to summarize long conversations',
      "Only include relevant files \u2014 don't dump your entire codebase",
      'Use @filename to reference specific files instead of pasting contents',
      'For long-running tasks, periodically summarize progress and reset',
      'Anthropic\'s principle: "Find the smallest set of high-signal tokens"',
    ],
    example: `# In Claude Code, reference specific files:
> @src/components/Button.tsx refactor this to use shadcn
# Compact when context gets long:
> /compact Focus on the auth refactor \u2014 drop earlier discussion
# For massive codebases, scope the task:
> Look only at files in src/features/auth/
> Ignore test files for now`,
  },
  {
    id: 'thinking',
    name: 'Thinking & Reflection',
    icon: '\u{1F4AD}',
    description: 'Ask the model to reason before acting',
    details: [
      '"Think step by step" genuinely improves accuracy on complex tasks',
      'Use <thinking> tags to separate reasoning from output',
      'Ask the model to critique its own output before finalizing',
      'Extended thinking (Claude) is especially good after tool use results',
    ],
    example: `"Before writing the migration script:
1. List all Flowbite components currently used
2. Map each to its shadcn equivalent
3. Note any that don't have a 1:1 mapping
4. THEN write the migration code
After writing, review your code for:
- Missing imports
- Broken prop interfaces
- Lost accessibility attributes"`,
  },
]
