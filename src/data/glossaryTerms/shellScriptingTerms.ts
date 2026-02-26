import type { GlossaryCategory } from './index'

export const shellScriptingGlossary: GlossaryCategory[] = [
  {
    category: 'Shell Fundamentals',
    terms: [
      {
        term: 'shebang',
        definition: 'The #! line at the top of a script that tells the OS which interpreter to use (e.g., #!/usr/bin/env bash). Makes scripts self-describing and portable.',
        linkId: 'gnu-bash-manual',
        sectionId: 'the-basics',
      },
      {
        term: 'exit code',
        definition: 'A numeric value (0\u2013255) returned by every command. 0 means success, any non-zero value indicates failure. AI agents read exit codes to decide what to do next.',
        linkId: 'gnu-bash-manual',
        sectionId: 'the-basics',
      },
      {
        term: 'bash',
        definition: 'The Bourne Again Shell \u2014 the most widely used Unix shell. Extends the original Bourne shell (sh) with arrays, [[ ]] tests, and other features.',
        linkId: 'gnu-bash-manual',
        sectionId: 'the-basics',
      },
      {
        term: 'POSIX',
        definition: 'A family of standards for Unix-like operating systems. POSIX shell is the portable baseline that all compliant shells support \u2014 use it when maximum portability matters.',
        linkId: 'posix-shell-spec',
        sectionId: 'conditionals-tests',
      },
      {
        term: 'environment variable',
        definition: 'A key-value pair available to all child processes. Used to configure scripts with values like DATABASE_URL or API_KEY without hardcoding.',
        linkId: 'gnu-bash-manual',
        sectionId: 'variables-arguments',
      },
    ],
  },
  {
    category: 'I/O & Pipelines',
    terms: [
      {
        term: 'pipe',
        definition: 'The | operator that connects stdout of one command to stdin of the next. Enables composing simple commands into powerful data-processing chains.',
        linkId: 'gnu-bash-manual',
        sectionId: 'text-processing',
      },
      {
        term: 'stdout / stderr',
        definition: 'The two standard output streams. stdout (fd 1) is for normal output; stderr (fd 2) is for errors and diagnostics. Agents typically read stderr to detect problems.',
        linkId: 'gnu-bash-manual',
        sectionId: 'the-basics',
      },
      {
        term: 'redirection',
        definition: 'Sending command output to a file (> or >>), sending file contents as input (<), or merging streams (2>&1). Essential for logging and error handling.',
        linkId: 'gnu-bash-manual',
        sectionId: 'cheat-sheet',
      },
      {
        term: 'here document',
        definition: 'A heredoc (<<EOF...EOF) lets you embed multi-line text inline in a script. Used for generating config files, JSON payloads, and multi-line output.',
        linkId: 'gnu-bash-manual',
        sectionId: 'text-processing',
      },
    ],
  },
  {
    category: 'Script Patterns',
    terms: [
      {
        term: 'trap',
        definition: 'A bash built-in that registers a cleanup function to run when the script exits, errors, or receives a signal. Ensures temp files are removed even on failure.',
        linkId: 'gnu-bash-manual',
        sectionId: 'error-handling',
      },
      {
        term: 'strict mode',
        definition: 'The combination of set -e (exit on error), set -u (error on undefined vars), and set -o pipefail (catch pipe failures). The safety net for agent scripts.',
        linkId: 'bash-strict-mode',
        sectionId: 'error-handling',
      },
      {
        term: 'glob',
        definition: 'A pattern-matching syntax using wildcards (* ? []) to match filenames. Used in for loops (for f in *.ts) and find commands.',
        linkId: 'gnu-bash-manual',
        sectionId: 'loops-iteration',
      },
      {
        term: 'command substitution',
        definition: 'The $() syntax that captures a command\'s stdout into a variable. E.g., BRANCH=$(git branch --show-current) saves the current branch name.',
        linkId: 'gnu-bash-manual',
        sectionId: 'variables-arguments',
      },
    ],
  },
]
