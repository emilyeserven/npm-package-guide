import type { CLIGroup } from './types'

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
