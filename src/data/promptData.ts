// ── Interfaces ────────────────────────────────────────────────────────

export interface MistakeItem {
  id: string
  mistake: string
  example: string
  fix: string
}

export interface MistakeCategory {
  id: string
  name: string
  icon: string
  severity: 'high' | 'medium' | 'low'
  items: MistakeItem[]
}

export interface SeverityTheme {
  bg: string
  border: string
  badge: string
  text: string
}

export interface ContextTechnique {
  id: string
  name: string
  icon: string
  description: string
  details: string[]
  example: string
}

export interface CLICommand {
  cmd: string
  desc: string
  human: boolean
  category: string
}

export interface CLIGroup {
  name: string
  commands: CLICommand[]
}

export interface TestingMistake {
  context: 'e2e' | 'unit'
  mistake: string
  example: string
  fix: string
}

export interface ChecklistItem {
  label: string
  description: string
}

export interface ChecklistSection {
  id: string
  name: string
  icon: string
  items: ChecklistItem[]
}

export interface ToolTechnique {
  id: string
  name: string
  icon: string
  description: string
  details: string[]
  example: string
}

export interface MetaToolItem {
  id: string
  name: string
  icon: string
  description: string
  details: string[]
}

// ── Severity colors ──────────────────────────────────────────────────

export const SEVERITY_COLORS: Record<string, { light: SeverityTheme; dark: SeverityTheme }> = {
  high: {
    light: { bg: 'rgba(239, 68, 68, 0.08)', border: '#ef4444', badge: '#dc2626', text: '#dc2626' },
    dark: { bg: 'rgba(239, 68, 68, 0.08)', border: '#ef4444', badge: '#dc2626', text: '#fca5a5' },
  },
  medium: {
    light: { bg: 'rgba(245, 158, 11, 0.08)', border: '#f59e0b', badge: '#d97706', text: '#d97706' },
    dark: { bg: 'rgba(245, 158, 11, 0.08)', border: '#f59e0b', badge: '#d97706', text: '#fcd34d' },
  },
  low: {
    light: { bg: 'rgba(59, 130, 246, 0.08)', border: '#3b82f6', badge: '#2563eb', text: '#2563eb' },
    dark: { bg: 'rgba(59, 130, 246, 0.08)', border: '#3b82f6', badge: '#2563eb', text: '#93c5fd' },
  },
}

// ── Mistake categories ───────────────────────────────────────────────

export const MISTAKE_CATEGORIES: MistakeCategory[] = [
  {
    id: 'logic',
    name: 'Logic & Condition Errors',
    icon: '\u26A1',
    severity: 'high',
    items: [
      {
        id: 'toc-off-by-one',
        mistake: 'Off-by-one errors in loops & boundaries',
        example: 'for (let i = 0; i <= arr.length) \u2014 goes one past the end',
        fix: 'Explicitly state boundary conditions: "Use zero-indexed, exclusive upper bound"',
      },
      {
        id: 'toc-wrong-boolean',
        mistake: 'Wrong boolean logic / inverted conditions',
        example: 'if (!isValid || hasPermission) instead of if (isValid && hasPermission)',
        fix: 'Describe the desired behavior in plain English AND provide a truth table in your prompt',
      },
      {
        id: 'toc-edge-case-blindness',
        mistake: 'Edge case blindness (empty arrays, null, 0, NaN)',
        example: "Doesn't handle empty input \u2192 crashes on .length or .map()",
        fix: 'Prompt: "Handle edge cases including empty input, null, undefined, 0, and NaN"',
      },
      {
        id: 'toc-math-formula',
        mistake: 'Math formula errors',
        example: 'Averages calculated as (a+b+1)//2 instead of (a+b)/2',
        fix: 'For any math logic, include the exact formula or reference a known algorithm',
      },
    ],
  },
  {
    id: 'apis',
    name: 'Hallucinated APIs & Packages',
    icon: '\u{1F47B}',
    severity: 'high',
    items: [
      {
        id: 'toc-invents-packages',
        mistake: 'Invents non-existent npm packages or methods',
        example: "Invents a useTheme hook from a package that doesn't exist on npm",
        fix: 'Specify exact libraries: "Use @shadcn/ui v2.x and TanStack Query v5"',
      },
      {
        id: 'toc-deprecated-apis',
        mistake: 'Uses deprecated or renamed APIs',
        example: 'componentWillMount(), findDOMNode(), or old Next.js page router patterns',
        fix: 'Include version constraints: "Use React 19 APIs only, no class components"',
      },
      {
        id: 'toc-cross-language',
        mistake: 'Cross-language API confusion',
        example: "Uses Python's round() behavior when writing JavaScript, or Java's .equals() in TS",
        fix: 'Specify the language AND runtime: "Node.js 22, TypeScript 5.x strict mode"',
      },
    ],
  },
  {
    id: 'structural',
    name: 'Structural & Architectural Issues',
    icon: '\u{1F3D7}\uFE0F',
    severity: 'medium',
    items: [
      {
        id: 'toc-over-engineering',
        mistake: 'Over-engineering simple tasks',
        example: 'Creates a full state machine with 5 abstractions for a toggle button',
        fix: 'State complexity upfront: "Keep this simple \u2014 no unnecessary abstractions"',
      },
      {
        id: 'toc-incomplete-code',
        mistake: 'Incomplete code \u2014 missing imports, exports, error handling',
        example: 'Generates a component but forgets to export it or import dependencies',
        fix: 'Prompt: "Provide complete, runnable code with all imports and exports"',
      },
      {
        id: 'toc-ignores-patterns',
        mistake: 'Ignores existing project patterns',
        example: 'Uses Redux when your project uses Zustand, or REST when you use GraphQL',
        fix: 'In CLAUDE.md or prompt: specify your stack, patterns, and conventions explicitly',
      },
      {
        id: 'toc-security-gaps',
        mistake: 'Security gaps \u2014 no input sanitization, XSS vectors',
        example: 'Uses dangerouslySetInnerHTML without sanitizing, or builds SQL with string concat',
        fix: 'Always prompt: "Follow OWASP security best practices. Sanitize all user input."',
      },
    ],
  },
  {
    id: 'style',
    name: 'Style & Formatting Drift',
    icon: '\u{1F3A8}',
    severity: 'low',
    items: [
      {
        id: 'toc-inconsistent-naming',
        mistake: 'Inconsistent naming conventions',
        example: 'Mixes camelCase and snake_case in the same file',
        fix: 'Specify: "Use camelCase for JS/TS, kebab-case for CSS, PascalCase for components"',
      },
      {
        id: 'toc-unnecessary-comments',
        mistake: 'Adds unnecessary comments or over-documents',
        example: '// This function adds two numbers\\nfunction add(a, b) { return a + b; }',
        fix: '"Only add comments for complex logic. No obvious comments."',
      },
      {
        id: 'toc-formatting-rules',
        mistake: 'Forgets semicolons, trailing commas, or formatting rules',
        example: "Generates code that doesn't match your Prettier/ESLint config",
        fix: 'Include your .prettierrc or ESLint rules summary in CLAUDE.md',
      },
    ],
  },
]

// ── Testing best practices ───────────────────────────────────────────

export const TESTING_MISTAKES: TestingMistake[] = [
  {
    context: 'e2e',
    mistake: 'Hardcoded waits instead of proper assertions',
    example: 'await page.waitForTimeout(3000) instead of await page.waitForSelector("[data-ready]")',
    fix: 'Always wait for a specific DOM state: "Use waitForSelector or expect(locator).toBeVisible(), never arbitrary timeouts"',
  },
  {
    context: 'e2e',
    mistake: 'Tests depend on execution order or shared state',
    example: 'Test B assumes Test A already created a user account \u2014 fails when run in isolation',
    fix: 'Prompt: "Each test must set up its own data and tear it down. No test should depend on another."',
  },
  {
    context: 'e2e',
    mistake: 'Selectors coupled to implementation details',
    example: 'page.click(".MuiButton-root > span:nth-child(2)") breaks on any UI refactor',
    fix: 'Require data-testid attributes: "Use data-testid selectors for all interactive elements"',
  },
  {
    context: 'e2e',
    mistake: 'Missing network request handling',
    example: 'Test flakes because it clicks submit before the API call completes',
    fix: 'Intercept network calls: "Use page.waitForResponse() or route.fulfill() to control API timing"',
  },
  {
    context: 'unit',
    mistake: 'Testing implementation instead of behavior',
    example: 'expect(spy).toHaveBeenCalledWith(x) instead of checking the actual output',
    fix: 'Focus on inputs and outputs: "Test what the function returns or renders, not how it works internally"',
  },
  {
    context: 'unit',
    mistake: 'Snapshot tests for everything',
    example: 'toMatchSnapshot() on a complex component \u2014 any change triggers a meaningless diff',
    fix: 'Use snapshots sparingly: "Only snapshot stable, small structures. Prefer explicit assertions."',
  },
  {
    context: 'unit',
    mistake: 'Mocking too much or too little',
    example: 'Mocks every dependency so the test passes even if the real integration is broken',
    fix: 'Mock at boundaries: "Mock external services and APIs. Don\'t mock the module under test."',
  },
  {
    context: 'unit',
    mistake: 'Missing async error handling tests',
    example: 'Only tests the happy path of a fetch call, never the rejection case',
    fix: 'Always test failure paths: "Include tests for rejected promises, thrown errors, and timeout scenarios"',
  },
  {
    context: 'unit',
    mistake: 'Tests pass with wrong assertions due to .not or negation errors',
    example: 'expect(result).not.toBeNull() passes even when result is undefined',
    fix: 'Use precise matchers: "Prefer toBe, toEqual, or toStrictEqual over negated assertions"',
  },
  {
    context: 'e2e',
    mistake: 'Not cleaning up test artifacts',
    example: 'Test creates database records or files that pollute other test runs',
    fix: 'Use beforeEach/afterEach hooks: "Set up a clean test environment and tear it down after each test"',
  },
]

// ── CLAUDE.md checklist ─────────────────────────────────────────────

export const CLAUDEMD_CHECKLIST: ChecklistSection[] = [
  {
    id: 'project-identity',
    name: 'Project Identity',
    icon: '\u{1F3F7}\uFE0F',
    items: [
      { label: 'Project name and one-line description', description: 'Helps the AI understand the domain and scope immediately.' },
      { label: 'Tech stack with version numbers', description: 'e.g., "React 19, TypeScript 5.x, Vite 7, pnpm" \u2014 prevents hallucinated APIs from wrong versions.' },
      { label: 'Package manager', description: 'Specify npm, pnpm, yarn, or bun so generated commands use the right tool.' },
      { label: 'Node.js version', description: 'Prevents the AI from using APIs unavailable in your runtime.' },
    ],
  },
  {
    id: 'commands',
    name: 'Key Commands',
    icon: '\u2328\uFE0F',
    items: [
      { label: 'Dev server command', description: 'e.g., "pnpm dev" \u2014 the AI needs this to test changes.' },
      { label: 'Build command', description: 'e.g., "pnpm build" \u2014 for verifying production builds.' },
      { label: 'Lint command', description: 'e.g., "pnpm lint" or "pnpm lint --fix" \u2014 ensures generated code passes linting.' },
      { label: 'Test command', description: 'e.g., "pnpm test" or "vitest run" \u2014 so the AI can validate its changes.' },
      { label: 'Type-check command', description: 'e.g., "npx tsc --noEmit" if separate from build.' },
    ],
  },
  {
    id: 'conventions',
    name: 'Conventions & Patterns',
    icon: '\u{1F4CF}',
    items: [
      { label: 'Naming conventions', description: 'camelCase vs snake_case, PascalCase for components, kebab-case for files, etc.' },
      { label: 'File organization rules', description: 'Where new components go, how tests are co-located, barrel export patterns.' },
      { label: 'Import style', description: 'Path aliases (@/), absolute vs relative, barrel imports vs direct.' },
      { label: 'Styling approach', description: 'Tailwind, CSS modules, styled-components \u2014 and how to apply dark mode.' },
      { label: 'State management pattern', description: 'Which library (Zustand, TanStack Query, Redux) and when to use each.' },
      { label: 'Error handling pattern', description: 'Error boundaries, try/catch rules, how to log errors.' },
    ],
  },
  {
    id: 'pitfalls',
    name: 'Common Pitfalls to Avoid',
    icon: '\u26A0\uFE0F',
    items: [
      { label: 'Deprecated patterns', description: '"Do NOT use X \u2014 we migrated to Y" prevents the AI from reverting to old patterns.' },
      { label: 'Known bad dependencies', description: 'Packages that conflict with your setup or should never be installed.' },
      { label: 'Architecture boundaries', description: '"Never import from src/server in src/client" \u2014 enforces module boundaries.' },
      { label: 'Security requirements', description: 'OWASP rules, input sanitization requirements, auth patterns to follow.' },
    ],
  },
  {
    id: 'sync',
    name: 'Keeping It In Sync',
    icon: '\u{1F504}',
    items: [
      { label: 'Update after migrations', description: 'When you switch libraries or upgrade versions, update CLAUDE.md immediately.' },
      { label: 'Add corrections for repeated mistakes', description: 'If the AI keeps making the same error, add a "Do NOT" rule.' },
      { label: 'Review during PR reviews', description: 'If a PR changes conventions, the CLAUDE.md should change too.' },
      { label: 'Use folder-level CLAUDE.md for submodules', description: 'Place additional CLAUDE.md files in subdirectories for area-specific context.' },
    ],
  },
]

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

// ── CLI command groups ────────────────────────────────────────────────

export const CLI_GROUPS: CLIGroup[] = [
  {
    name: 'Claude Code Essentials',
    commands: [
      { cmd: 'claude', desc: 'Start interactive REPL session', human: false, category: 'claude-code' },
      { cmd: 'claude -p "query"', desc: 'One-shot mode \u2014 run & exit (great for scripts)', human: false, category: 'claude-code' },
      { cmd: 'claude -c', desc: 'Continue most recent conversation', human: false, category: 'claude-code' },
      { cmd: 'claude --resume <id>', desc: 'Resume a specific past session', human: false, category: 'claude-code' },
      { cmd: '/compact', desc: 'Summarize convo to save context window', human: false, category: 'claude-code' },
      { cmd: '/clear', desc: 'Reset conversation history', human: false, category: 'claude-code' },
      { cmd: '/doctor', desc: 'Check Claude Code installation health', human: false, category: 'claude-code' },
      { cmd: '/cost', desc: 'Show cost & duration of current session', human: false, category: 'claude-code' },
      { cmd: '!command', desc: 'Run a shell command directly (bypasses conversational mode)', human: false, category: 'claude-code' },
      { cmd: '@filename', desc: 'Reference a file to include its content', human: false, category: 'claude-code' },
    ],
  },
  {
    name: 'Claude Code Power Features',
    commands: [
      { cmd: 'claude --allowedTools "Bash(git:*)" "Write"', desc: 'Whitelist specific tools (skip permission prompts)', human: false, category: 'claude-code' },
      { cmd: 'claude --disallowedTools "Bash(rm:*)"', desc: 'Block dangerous tools from being used', human: false, category: 'claude-code' },
      { cmd: 'claude -p --output-format json "query"', desc: 'Get structured JSON output (for CI/CD pipelines)', human: false, category: 'claude-code' },
      { cmd: 'git log | claude -p "summarize commits"', desc: 'Pipe any command output into Claude', human: false, category: 'claude-code' },
      { cmd: 'cat error.log | claude -p "find root cause"', desc: 'Pipe error logs for instant debugging', human: false, category: 'claude-code' },
      { cmd: 'claude --append-system-prompt "You are an SRE"', desc: 'Add role context for a single run', human: false, category: 'claude-code' },
      { cmd: 'gh pr diff 123 | claude -p "review this PR"', desc: 'AI-powered PR reviews in one line', human: false, category: 'claude-code' },
    ],
  },
  {
    name: 'File & Search (AI Favorites)',
    commands: [
      { cmd: "find . -name '*.tsx' -newer ref_file", desc: 'Find files modified after a reference file', human: false, category: 'file-search' },
      { cmd: "grep -rn 'pattern' --include='*.ts'", desc: 'Recursive search with line numbers, scoped to file type', human: true, category: 'file-search' },
      { cmd: "find . -name '*.test.*' -exec rm {} +", desc: 'Find and batch-delete matching files', human: false, category: 'file-search' },
      { cmd: "wc -l $(find . -name '*.tsx')", desc: 'Count lines across all matching files', human: false, category: 'file-search' },
      { cmd: "rg 'TODO|FIXME|HACK' --type ts", desc: 'ripgrep for markers across TypeScript files', human: false, category: 'file-search' },
      { cmd: 'fd -e tsx -x wc -l', desc: 'fd (fast find) + execute word count on results', human: false, category: 'file-search' },
      { cmd: "ast-grep --pattern 'useState($$$)' .", desc: 'Search by code pattern / AST structure', human: false, category: 'file-search' },
    ],
  },
  {
    name: 'Git (AI-Specific Patterns)',
    commands: [
      { cmd: 'git diff --stat HEAD~5', desc: 'Summary of changes over last 5 commits', human: true, category: 'git' },
      { cmd: "git log --oneline --since='1 week ago'", desc: 'Compact recent history', human: true, category: 'git' },
      { cmd: 'git diff --name-only main...HEAD', desc: 'Files changed on your branch vs main', human: false, category: 'git' },
      { cmd: "git stash push -m 'wip: auth' -- src/auth/", desc: 'Stash specific directory with a label', human: false, category: 'git' },
      { cmd: 'git worktree add ../feature-branch feature/x', desc: 'Work on multiple branches simultaneously', human: false, category: 'git' },
      { cmd: "git log -p -S 'functionName' -- '*.ts'", desc: 'Search git history for when a string was added/removed', human: false, category: 'git' },
      { cmd: 'git blame -L 10,20 src/index.ts', desc: 'Blame specific line range', human: false, category: 'git' },
    ],
  },
  {
    name: 'Node / npm (AI Patterns)',
    commands: [
      { cmd: 'npx tsc --noEmit', desc: 'Type-check without building (fast validation)', human: true, category: 'node-npm' },
      { cmd: 'npx depcheck', desc: 'Find unused dependencies', human: false, category: 'node-npm' },
      { cmd: 'npm ls --depth=0', desc: 'List top-level installed packages', human: true, category: 'node-npm' },
      { cmd: 'npm why <package>', desc: 'See why a package is installed (dependency tree)', human: false, category: 'node-npm' },
      { cmd: 'npx tsx script.ts', desc: 'Run TypeScript directly without compiling', human: false, category: 'node-npm' },
      { cmd: 'node --inspect-brk dist/server.js', desc: 'Start with debugger attached (paused)', human: false, category: 'node-npm' },
      { cmd: 'npm pack --dry-run', desc: 'Preview what would be published to npm', human: false, category: 'node-npm' },
    ],
  },
  {
    name: 'System & Process',
    commands: [
      { cmd: 'lsof -i :3000', desc: 'Find what process is using a port', human: true, category: 'system' },
      { cmd: 'kill -9 $(lsof -t -i :3000)', desc: 'Kill the process on that port', human: false, category: 'system' },
      { cmd: "du -sh node_modules/*/ | sort -rh | head -20", desc: 'Largest node_modules subdirectories', human: false, category: 'system' },
      { cmd: "watch -n 2 'curl -s localhost:3000/health'", desc: 'Poll a health endpoint every 2 seconds', human: false, category: 'system' },
      { cmd: 'xargs -P 4 -I {} command {}', desc: 'Parallel execution of commands', human: false, category: 'system' },
      { cmd: "jq '.scripts' package.json", desc: 'Extract just scripts from package.json', human: false, category: 'system' },
      { cmd: "sed -i '' 's/oldText/newText/g' src/**/*.ts", desc: 'Bulk find-and-replace across files', human: false, category: 'system' },
    ],
  },
]

export const CLI_CATEGORIES: Record<string, string> = {
  'claude-code': 'Claude Code',
  'file-search': 'File & Search',
  'git': 'Git',
  'node-npm': 'Node / npm',
  'system': 'System & Process',
}

// ── Navigation ───────────────────────────────────────────────────────

import type { GuideSection } from './guideTypes'

export const PROMPT_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['prompt-start'] },
  { label: 'Common AI Mistakes', ids: [
    'prompt-mistakes-logic', 'prompt-mistakes-apis', 'prompt-mistakes-structural',
    'prompt-mistakes-style', 'prompt-testing',
  ]},
  { label: 'Context Management', ids: [
    'prompt-ctx-system-prompt', 'prompt-ctx-claude-md', 'prompt-ctx-chaining',
    'prompt-ctx-few-shot', 'prompt-ctx-window', 'prompt-ctx-thinking',
    'prompt-claudemd-checklist',
  ]},
  { label: 'Tooling & Reference', ids: [
    'prompt-cli-reference', 'prompt-tools-advanced', 'prompt-meta-tooling',
  ]},
]

export const PROMPT_NAV_ORDER: string[] = PROMPT_GUIDE_SECTIONS.flatMap(s => s.ids)
export const PROMPT_PAGE_IDS = new Set(PROMPT_NAV_ORDER)
