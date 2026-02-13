import type { ToolTechnique, MetaToolItem, ContextTechnique } from './types'

// ── Advanced tool usage ─────────────────────────────────────────────

export const TOOL_TECHNIQUES: ToolTechnique[] = [
  {
    id: 'mcp-servers',
    name: 'MCP Servers',
    icon: '\u{1F50C}',
    description: 'Model Context Protocol servers extend Claude with external tools and data sources',
    details: [
      'MCP servers give Claude access to databases, APIs, file systems, and custom tools',
      'Configure in .mcp.json at the project root or ~/.claude/mcp.json globally',
      'Use stdio transport for local servers, SSE for remote ones',
      'Community servers exist for GitHub, Postgres, filesystem, Puppeteer, and more',
      'Build custom MCP servers to expose your internal tools to Claude',
    ],
    example: `// .mcp.json \u2014 project-level MCP server config
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres",
               "postgresql://localhost:5432/mydb"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    }
  }
}`,
  },
  {
    id: 'skills',
    name: 'Custom Slash Commands',
    icon: '\u{1F3AF}',
    description: 'Create reusable slash commands that expand into full prompt templates',
    details: [
      'Define skills as Markdown files in .claude/commands/ (project) or ~/.claude/commands/ (global)',
      'Invoke with /project:<name> or /user:<name> from the Claude Code prompt',
      'Skills can include $ARGUMENTS placeholder for dynamic input',
      'Great for repetitive workflows: code review checklists, commit message formats, migration scripts',
      'Share project-level commands via version control for team-wide consistency',
    ],
    example: `# .claude/commands/review.md
Review the following code changes for:
1. Security vulnerabilities (injection, XSS, CSRF)
2. Performance issues (N+1 queries, memory leaks)
3. Missing error handling
4. Adherence to project conventions in CLAUDE.md

Focus on: $ARGUMENTS

Provide a structured report with severity ratings.`,
  },
  {
    id: 'hooks',
    name: 'Hooks & Automation',
    icon: '\u{1F527}',
    description: 'Run shell commands automatically in response to Claude Code events',
    details: [
      'Hooks execute scripts before/after tool calls, notifications, or session events',
      'Configure in .claude/settings.json under the "hooks" key',
      'Use PreToolUse hooks to validate or block dangerous operations',
      'Use PostToolUse hooks to auto-format, lint, or run tests after file changes',
      'Notification hooks can send Slack/email alerts for long-running tasks',
    ],
    example: `// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": "npx prettier --write $FILEPATH"
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hook": "echo 'Running shell command...'"
      }
    ]
  }
}`,
  },
  {
    id: 'optimization',
    name: 'Performance Optimization',
    icon: '\u26A1',
    description: 'Strategies for getting faster, cheaper, and more accurate results from Claude',
    details: [
      'Use headless mode (claude -p) for scripted tasks \u2014 no interactive overhead',
      'Pipe specific context instead of letting Claude search: cat file.ts | claude -p "review"',
      'Use --allowedTools to skip permission prompts for trusted operations',
      'Combine with unix tools: find + xargs + claude for batch processing',
      'Use --output-format json for programmatic consumption of results',
      'Run /compact periodically in long sessions to keep context lean',
    ],
    example: `# Batch review all changed files
git diff --name-only main | xargs -I {} sh -c \\
  'cat {} | claude -p "Review this file for bugs" --output-format json'

# Auto-generate commit messages
git diff --staged | claude -p "Write a conventional commit message"

# Parallel lint + AI review
pnpm lint &
git diff | claude -p "Check for security issues" &
wait`,
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
