// ── Interfaces ────────────────────────────────────────────────────────

export interface MistakeItem {
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
}

export interface CLIGroup {
  name: string
  commands: CLICommand[]
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
        mistake: 'Off-by-one errors in loops & boundaries',
        example: 'for (let i = 0; i <= arr.length) \u2014 goes one past the end',
        fix: 'Explicitly state boundary conditions: "Use zero-indexed, exclusive upper bound"',
      },
      {
        mistake: 'Wrong boolean logic / inverted conditions',
        example: 'if (!isValid || hasPermission) instead of if (isValid && hasPermission)',
        fix: 'Describe the desired behavior in plain English AND provide a truth table in your prompt',
      },
      {
        mistake: 'Edge case blindness (empty arrays, null, 0, NaN)',
        example: "Doesn't handle empty input \u2192 crashes on .length or .map()",
        fix: 'Prompt: "Handle edge cases including empty input, null, undefined, 0, and NaN"',
      },
      {
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
        mistake: 'Invents non-existent npm packages or methods',
        example: "Invents a useTheme hook from a package that doesn't exist on npm",
        fix: 'Specify exact libraries: "Use @shadcn/ui v2.x and TanStack Query v5"',
      },
      {
        mistake: 'Uses deprecated or renamed APIs',
        example: 'componentWillMount(), findDOMNode(), or old Next.js page router patterns',
        fix: 'Include version constraints: "Use React 19 APIs only, no class components"',
      },
      {
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
        mistake: 'Over-engineering simple tasks',
        example: 'Creates a full state machine with 5 abstractions for a toggle button',
        fix: 'State complexity upfront: "Keep this simple \u2014 no unnecessary abstractions"',
      },
      {
        mistake: 'Incomplete code \u2014 missing imports, exports, error handling',
        example: 'Generates a component but forgets to export it or import dependencies',
        fix: 'Prompt: "Provide complete, runnable code with all imports and exports"',
      },
      {
        mistake: 'Ignores existing project patterns',
        example: 'Uses Redux when your project uses Zustand, or REST when you use GraphQL',
        fix: 'In CLAUDE.md or prompt: specify your stack, patterns, and conventions explicitly',
      },
      {
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
        mistake: 'Inconsistent naming conventions',
        example: 'Mixes camelCase and snake_case in the same file',
        fix: 'Specify: "Use camelCase for JS/TS, kebab-case for CSS, PascalCase for components"',
      },
      {
        mistake: 'Adds unnecessary comments or over-documents',
        example: '// This function adds two numbers\\nfunction add(a, b) { return a + b; }',
        fix: '"Only add comments for complex logic. No obvious comments."',
      },
      {
        mistake: 'Forgets semicolons, trailing commas, or formatting rules',
        example: "Generates code that doesn't match your Prettier/ESLint config",
        fix: 'Include your .prettierrc or ESLint rules summary in CLAUDE.md',
      },
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
      { cmd: 'claude', desc: 'Start interactive REPL session', human: false },
      { cmd: 'claude -p "query"', desc: 'One-shot mode \u2014 run & exit (great for scripts)', human: false },
      { cmd: 'claude -c', desc: 'Continue most recent conversation', human: false },
      { cmd: 'claude --resume <id>', desc: 'Resume a specific past session', human: false },
      { cmd: '/compact', desc: 'Summarize convo to save context window', human: false },
      { cmd: '/clear', desc: 'Reset conversation history', human: false },
      { cmd: '/doctor', desc: 'Check Claude Code installation health', human: false },
      { cmd: '/cost', desc: 'Show cost & duration of current session', human: false },
      { cmd: '!command', desc: 'Run a shell command directly (bypasses conversational mode)', human: false },
      { cmd: '@filename', desc: 'Reference a file to include its content', human: false },
    ],
  },
  {
    name: 'Claude Code Power Features',
    commands: [
      { cmd: 'claude --allowedTools "Bash(git:*)" "Write"', desc: 'Whitelist specific tools (skip permission prompts)', human: false },
      { cmd: 'claude --disallowedTools "Bash(rm:*)"', desc: 'Block dangerous tools from being used', human: false },
      { cmd: 'claude -p --output-format json "query"', desc: 'Get structured JSON output (for CI/CD pipelines)', human: false },
      { cmd: 'git log | claude -p "summarize commits"', desc: 'Pipe any command output into Claude', human: false },
      { cmd: 'cat error.log | claude -p "find root cause"', desc: 'Pipe error logs for instant debugging', human: false },
      { cmd: 'claude --append-system-prompt "You are an SRE"', desc: 'Add role context for a single run', human: false },
      { cmd: 'gh pr diff 123 | claude -p "review this PR"', desc: 'AI-powered PR reviews in one line', human: false },
    ],
  },
  {
    name: 'File & Search (AI Favorites)',
    commands: [
      { cmd: "find . -name '*.tsx' -newer ref_file", desc: 'Find files modified after a reference file', human: false },
      { cmd: "grep -rn 'pattern' --include='*.ts'", desc: 'Recursive search with line numbers, scoped to file type', human: true },
      { cmd: "find . -name '*.test.*' -exec rm {} +", desc: 'Find and batch-delete matching files', human: false },
      { cmd: "wc -l $(find . -name '*.tsx')", desc: 'Count lines across all matching files', human: false },
      { cmd: "rg 'TODO|FIXME|HACK' --type ts", desc: 'ripgrep for markers across TypeScript files', human: false },
      { cmd: 'fd -e tsx -x wc -l', desc: 'fd (fast find) + execute word count on results', human: false },
      { cmd: "ast-grep --pattern 'useState($$$)' .", desc: 'Search by code pattern / AST structure', human: false },
    ],
  },
  {
    name: 'Git (AI-Specific Patterns)',
    commands: [
      { cmd: 'git diff --stat HEAD~5', desc: 'Summary of changes over last 5 commits', human: true },
      { cmd: "git log --oneline --since='1 week ago'", desc: 'Compact recent history', human: true },
      { cmd: 'git diff --name-only main...HEAD', desc: 'Files changed on your branch vs main', human: false },
      { cmd: "git stash push -m 'wip: auth' -- src/auth/", desc: 'Stash specific directory with a label', human: false },
      { cmd: 'git worktree add ../feature-branch feature/x', desc: 'Work on multiple branches simultaneously', human: false },
      { cmd: "git log -p -S 'functionName' -- '*.ts'", desc: 'Search git history for when a string was added/removed', human: false },
      { cmd: 'git blame -L 10,20 src/index.ts', desc: 'Blame specific line range', human: false },
    ],
  },
  {
    name: 'Node / npm (AI Patterns)',
    commands: [
      { cmd: 'npx tsc --noEmit', desc: 'Type-check without building (fast validation)', human: true },
      { cmd: 'npx depcheck', desc: 'Find unused dependencies', human: false },
      { cmd: 'npm ls --depth=0', desc: 'List top-level installed packages', human: true },
      { cmd: 'npm why <package>', desc: 'See why a package is installed (dependency tree)', human: false },
      { cmd: 'npx tsx script.ts', desc: 'Run TypeScript directly without compiling', human: false },
      { cmd: 'node --inspect-brk dist/server.js', desc: 'Start with debugger attached (paused)', human: false },
      { cmd: 'npm pack --dry-run', desc: 'Preview what would be published to npm', human: false },
    ],
  },
  {
    name: 'System & Process',
    commands: [
      { cmd: 'lsof -i :3000', desc: 'Find what process is using a port', human: true },
      { cmd: 'kill -9 $(lsof -t -i :3000)', desc: 'Kill the process on that port', human: false },
      { cmd: "du -sh node_modules/*/ | sort -rh | head -20", desc: 'Largest node_modules subdirectories', human: false },
      { cmd: "watch -n 2 'curl -s localhost:3000/health'", desc: 'Poll a health endpoint every 2 seconds', human: false },
      { cmd: 'xargs -P 4 -I {} command {}', desc: 'Parallel execution of commands', human: false },
      { cmd: "jq '.scripts' package.json", desc: 'Extract just scripts from package.json', human: false },
      { cmd: "sed -i '' 's/oldText/newText/g' src/**/*.ts", desc: 'Bulk find-and-replace across files', human: false },
    ],
  },
]

// ── Navigation ───────────────────────────────────────────────────────

export const PROMPT_NAV_ORDER: string[] = [
  'prompt-start',
  'prompt-mistakes-logic',
  'prompt-mistakes-apis',
  'prompt-mistakes-structural',
  'prompt-mistakes-style',
  'prompt-ctx-system-prompt',
  'prompt-ctx-claude-md',
  'prompt-ctx-chaining',
  'prompt-ctx-few-shot',
  'prompt-ctx-window',
  'prompt-ctx-thinking',
  'prompt-cli-reference',
]

export const PROMPT_PAGE_IDS = new Set(PROMPT_NAV_ORDER)
