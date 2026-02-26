import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Types ────────────────────────────────────────────────────────────

export interface AgentEcosystemItem {
  name: string
  desc: string
}

export interface SkillVsAgentRow {
  feature: string
  skill: string
  agent: string
}

export interface SdkCapability {
  title: string
  desc: string
}

export interface BuiltInSubagent {
  name: string
  desc: string
  tools: string
}

export interface InstructionChecklistItem {
  id: string
  label: string
  detail: string
}

export interface InstructionPrinciple {
  title: string
  bad: string
  badLabel: string
  good: string
  goodLabel: string
}

export interface AgentUseCase {
  title: string
  description: string
  tools: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface SkillAnatomyFile {
  id: string
  label: string
  content: string
  title: string
}

// ── Agent Ecosystem (Overview) ──────────────────────────────────────

export const AGENT_ECOSYSTEM: AgentEcosystemItem[] = [
  {
    name: 'Claude Code',
    desc: 'Anthropic\u2019s CLI tool \u2014 an agentic coding assistant that runs in your terminal. It reads your codebase, writes and edits files, runs commands, and iterates. This is the foundation that the Agent SDK is built on.',
  },
  {
    name: 'Agent SDK',
    desc: 'A Python/TypeScript library that exposes the same agent harness powering Claude Code. Build your own agents with the same tools, context management, and loop that Anthropic uses internally.',
  },
  {
    name: 'Agent Skills',
    desc: 'Modular packages of instructions, scripts, and resources that specialize Claude for specific tasks. Think of them as "onboarding guides" that Claude loads when relevant.',
  },
  {
    name: 'Subagents',
    desc: 'Specialized agent instances that run in their own context window with custom prompts, tool access, and permissions. Claude can delegate tasks to them automatically.',
  },
]

// ── Skills vs Agents Comparison ─────────────────────────────────────

export const SKILL_VS_AGENT_ROWS: SkillVsAgentRow[] = [
  {
    feature: 'What it is',
    skill: 'A folder with instructions, scripts, and resources',
    agent: 'An autonomous loop that reasons, acts, and iterates',
  },
  {
    feature: 'Persistence',
    skill: 'Loaded on-demand, unloaded after task',
    agent: 'Runs continuously until task is complete',
  },
  {
    feature: 'Invocation',
    skill: 'Auto-detected by Claude based on task relevance',
    agent: 'Explicitly started via SDK, CLI, or delegation',
  },
  {
    feature: 'Context usage',
    skill: 'Progressive disclosure \u2014 loads only what\u2019s needed',
    agent: 'Maintains its own context window throughout execution',
  },
  {
    feature: 'Tool access',
    skill: 'Enhances Claude\u2019s existing tool usage with domain knowledge',
    agent: 'Has direct access to tools: Bash, Read, Write, Grep, etc.',
  },
  {
    feature: 'Composability',
    skill: 'Multiple skills can be active simultaneously',
    agent: 'Can spawn subagents for parallel or specialized work',
  },
  {
    feature: 'Where it runs',
    skill: 'claude.ai, Claude Code, API',
    agent: 'Claude Code, Agent SDK (Python/TypeScript)',
  },
  {
    feature: 'Best for',
    skill: 'Teaching Claude HOW to do something well',
    agent: 'Having Claude DO something autonomously',
  },
]

export const SKILL_SCENARIOS: string[] = [
  'You want Claude to follow specific processes or conventions every time (e.g., "always use our company\u2019s Terraform naming convention")',
  'You need Claude to be better at a document type \u2014 Excel, PowerPoint, PDF, Word',
  'You want to package tribal knowledge so it\u2019s available across conversations',
  'You\u2019re working in claude.ai and want specialized behavior without building infrastructure',
  'The same instructions apply to many different tasks and should be reusable',
]

export const AGENT_SCENARIOS: string[] = [
  'The task requires multiple steps with branching logic and iteration',
  'Claude needs to autonomously decide what tools to use and when',
  'You need to integrate with external APIs, databases, or services',
  'The workflow needs to run programmatically \u2014 in CI/CD, as a cron job, or triggered by events',
  'You need structured output, session management, or checkpointing',
]

// ── SDK Capabilities ────────────────────────────────────────────────

export const SDK_CAPABILITIES: SdkCapability[] = [
  { title: 'Built-in Tools', desc: 'Read, Write, Bash, Grep, Glob, WebSearch, WebFetch \u2014 no setup required' },
  { title: 'Context Management', desc: 'Automatic compaction and prompt caching so agents don\u2019t run out of context' },
  { title: 'Permissions', desc: 'Fine-grained control: bypassPermissions, acceptEdits, default, or custom canUseTool' },
  { title: 'Subagents', desc: 'Spawn specialized agents for parallel or isolated tasks' },
  { title: 'MCP Support', desc: 'Extend agents with custom tools via Model Context Protocol servers' },
  { title: 'Structured Output', desc: 'JSON Schema output format for predictable, parseable results' },
]

export const SDK_PYTHON_EXAMPLE = `# pip install claude-agent-sdk
# requires: ANTHROPIC_API_KEY env var + Claude CLI

# --- claude_agent_sdk usage ---
# from claude_agent_sdk, use: query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Find all TODO comments and suggest fixes",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Grep", "Glob", "Bash"],
            permission_mode="bypassPermissions",
            max_turns=50,
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())`

export const SDK_TS_EXAMPLE = `// npm install @anthropic-ai/claude-agent-sdk
// requires: ANTHROPIC_API_KEY env var + Claude CLI

// --- claude-agent-sdk usage ---
// use { query } from the claude-agent-sdk package

async function main() {
  for await (const message of query({
    prompt: "Find all TODO comments and suggest fixes",
    options: {
      allowedTools: ["Read", "Grep", "Glob", "Bash"],
      permissionMode: "bypassPermissions",
      maxTurns: 50,
    },
  })) {
    if (message.result) {
      console.log(message.result);
    }
  }
}

main();`

export const SDK_SKILLS_EXAMPLE = `# pip install anthropic

client = anthropic.Anthropic()

response = client.beta.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=4096,
    betas=["code-execution-2025-08-25", "skills-2025-10-02"],
    container={
        "skills": [
            {"type": "anthropic", "skill_id": "xlsx"},
            {"type": "custom", "skill_id": "my-finance-skill"}
        ]
    },
    messages=[
        {"role": "user", "content": "Analyze Q3 revenue data"}
    ],
    tools=[
        {"type": "code_execution_20250825", "name": "code_execution"}
    ],
)`

// ── Built-in Subagents ──────────────────────────────────────────────

export const BUILT_IN_SUBAGENTS: BuiltInSubagent[] = [
  {
    name: 'Explore',
    desc: 'A fast, read-only agent optimized for searching and analyzing codebases. Claude delegates to it when it needs to search without making changes.',
    tools: 'Read, Grep, Glob',
  },
  {
    name: 'Plan',
    desc: 'A research agent used during plan mode to gather context before presenting a plan. Keeps exploration out of your main context window.',
    tools: 'Read, Grep, Glob',
  },
  {
    name: 'General-purpose',
    desc: 'A capable agent for complex, multi-step tasks requiring both exploration and action. Used when the task needs both reading and writing.',
    tools: 'Read, Write, Bash, Grep, Glob',
  },
]

export const SUBAGENT_EXAMPLE = `---
name: security-reviewer
description: Reviews code for security vulnerabilities,
  OWASP Top 10, and authentication/authorization issues
tools: Read, Grep, Glob
model: sonnet
---

You are a senior application security engineer with deep
expertise in the OWASP Top 10, secure coding practices,
and common vulnerability patterns.

## Your Process

1. Search for authentication and authorization logic
2. Look for input validation and sanitization
3. Check for SQL injection, XSS, and CSRF patterns
4. Review secrets management and configuration
5. Identify insecure dependencies

## Output Format

For each finding, provide:
- Severity: Critical / High / Medium / Low
- Location: file path and line range
- Description: what the vulnerability is
- Recommendation: how to fix it
- Reference: relevant CWE or OWASP reference

## Rules

- Never modify any files
- If you're unsure about a finding, flag it as
  "Needs Review" rather than ignoring it
- Always check both the happy path and error paths`

// ── Instruction Checklist ───────────────────────────────────────────

export const INSTRUCTION_CHECKLIST: InstructionChecklistItem[] = [
  { id: 'role', label: 'Define a clear role and persona', detail: 'e.g. "You are a senior security auditor specializing in OWASP Top 10"' },
  { id: 'scope', label: 'Scope what the agent should and should NOT do', detail: 'Explicit boundaries prevent scope creep and unexpected behaviors' },
  { id: 'tools', label: 'Specify which tools the agent can use', detail: 'Restrict to minimum needed: Read, Grep, Glob for read-only work' },
  { id: 'output', label: 'Define expected output format', detail: 'JSON schema, markdown report, structured feedback, etc.' },
  { id: 'guardrails', label: 'Add safety guardrails and stop conditions', detail: 'e.g. "Never modify files outside the /src directory", "Stop after 50 turns"' },
  { id: 'examples', label: 'Include concrete examples of desired behavior', detail: 'Show the agent what good output looks like' },
  { id: 'escalation', label: 'Define escalation paths for edge cases', detail: 'When should the agent ask for human input vs. making a decision?' },
  { id: 'verify', label: 'Include verification steps', detail: 'Have the agent check its own work before returning results' },
]

// ── Instruction Principles ──────────────────────────────────────────

export const INSTRUCTION_PRINCIPLES: InstructionPrinciple[] = [
  {
    title: 'Be specific, not vague',
    badLabel: 'Vague',
    bad: 'Review the code and make it better',
    goodLabel: 'Specific',
    good: 'Review TypeScript files in /src for unused variables, missing error handling, and functions longer than 50 lines. Output findings as JSON.',
  },
  {
    title: 'Define boundaries explicitly',
    badLabel: 'Unbounded',
    bad: 'Fix any issues you find in the codebase',
    goodLabel: 'Bounded',
    good: 'Fix ESLint errors in files under /src/components. Do not modify test files, configuration files, or any file outside /src/components.',
  },
  {
    title: 'Include verification steps',
    badLabel: 'No verification',
    bad: 'Write tests for the auth module',
    goodLabel: 'With verification',
    good: 'Write tests for the auth module. Run them with `npm test`. If any fail, debug and fix them. Only report success when all tests pass.',
  },
]

// ── Use Cases ───────────────────────────────────────────────────────

export const AGENT_USE_CASES: AgentUseCase[] = [
  {
    title: 'Automated Code Review Bot',
    description: 'Build an agent that reviews every PR for security issues, style violations, and performance concerns. It reads the diff, checks against your team\u2019s guidelines, and posts structured feedback. Can be integrated into CI/CD with the Agent SDK.',
    tools: ['Read', 'Grep', 'Glob', 'Bash', 'Agent SDK'],
    difficulty: 'Intermediate',
  },
  {
    title: 'Documentation Generator',
    description: 'An agent that crawls your codebase, identifies undocumented functions and components, and generates TSDoc/JSDoc comments and README files. Uses the Explore subagent for discovery and Write tool for output.',
    tools: ['Read', 'Write', 'Grep', 'Glob'],
    difficulty: 'Beginner',
  },
  {
    title: 'Incident Response / SRE Agent',
    description: 'An on-call assistant that triages production incidents. It reads logs via Bash, correlates errors across services, identifies root causes, suggests fixes, and can even apply hotfixes with proper approval gates.',
    tools: ['Bash', 'Read', 'Grep', 'WebFetch', 'MCP'],
    difficulty: 'Advanced',
  },
  {
    title: 'Data Pipeline Builder',
    description: 'An agent that reads CSV/JSON data files, cleans and transforms data, creates visualizations, and produces Excel or PDF reports. Combines the xlsx/pdf skills with custom data processing logic.',
    tools: ['Read', 'Write', 'Bash', 'xlsx Skill', 'pdf Skill'],
    difficulty: 'Intermediate',
  },
  {
    title: 'Codebase Migration Agent',
    description: 'Automate large-scale refactors: migrating from one library to another, updating API patterns, converting class components to hooks, or upgrading framework versions. The agent works file-by-file, running tests after each change.',
    tools: ['Read', 'Write', 'Bash', 'Grep', 'Glob'],
    difficulty: 'Advanced',
  },
  {
    title: 'Meeting Notes & Action Items',
    description: 'An agent that takes raw meeting transcripts, extracts key decisions and action items, formats them into a structured document, and creates calendar events or Jira tickets via MCP integrations.',
    tools: ['Read', 'Write', 'MCP', 'docx Skill'],
    difficulty: 'Beginner',
  },
  {
    title: 'Brand-Compliant Content Generator',
    description: 'Create a skill that encodes your brand\u2019s voice, terminology, and formatting rules. Any agent using this skill automatically produces content matching your brand guidelines \u2014 from blog posts to internal docs.',
    tools: ['Custom Skill', 'Write'],
    difficulty: 'Beginner',
  },
  {
    title: 'Multi-Agent Development Team',
    description: 'Orchestrate multiple subagents \u2014 a backend architect, frontend developer, test writer, and security auditor \u2014 that collaborate on a feature. Uses Claude Code\u2019s agent teams feature for parallel execution across git worktrees.',
    tools: ['Agent Teams', 'Subagents', 'All Tools'],
    difficulty: 'Advanced',
  },
]

// ── Skill Anatomy ───────────────────────────────────────────────────

export const SKILL_ANATOMY_TREE = `my-api-skill/
\u251C\u2500\u2500 SKILL.md              # Required \u2014 instructions + metadata
\u251C\u2500\u2500 templates/
\u2502   \u251C\u2500\u2500 endpoint.ts       # Template for new endpoints
\u2502   \u2514\u2500\u2500 test.ts           # Template for endpoint tests
\u251C\u2500\u2500 scripts/
\u2502   \u2514\u2500\u2500 validate.sh       # Validation script Claude can run
\u2514\u2500\u2500 references/
    \u2514\u2500\u2500 api-conventions.md  # Reference doc for API patterns`

export const SKILL_ANATOMY_FILES: SkillAnatomyFile[] = [
  {
    id: 'skill',
    label: 'SKILL.md',
    title: 'SKILL.md',
    content: `---
name: api-endpoint-builder
description: >
  Creates REST API endpoints following our team's
  conventions. Use when building new routes, controllers,
  or API handlers. Enforces consistent error handling,
  validation, and response formatting.
---

# API Endpoint Builder

## When to Use This Skill

Use this skill whenever you need to create or modify
REST API endpoints in our Express/TypeScript backend.

## Conventions

1. All endpoints use the controller pattern in /src/controllers
2. Request validation uses Zod schemas in /src/schemas
3. Responses follow our standard envelope format:
   \`{ data, error, meta }\`
4. Error handling uses our AppError class
5. All endpoints require authentication unless marked public

## Process

1. Read the template at templates/endpoint.ts
2. Generate a Zod schema for request validation
3. Create the controller with proper error handling
4. Create the route registration in /src/routes
5. Generate tests using templates/test.ts
6. Run scripts/validate.sh to check conventions

## Response Format

Always use the standard response envelope:

\`\`\`typescript
// Success
res.json({
  data: result,
  error: null,
  meta: { count, page }
});

// Error
res.status(code).json({
  data: null,
  error: { message, code, details },
  meta: null
});
\`\`\``,
  },
  {
    id: 'template',
    label: 'Template',
    title: 'templates/endpoint.ts',
    content: `// Express + Zod endpoint template
// Requires: express, zod, and your project's error utils

const RequestSchema = z.object({
  // Define your request shape here
});

export const handler = asyncHandler(
  async (req, res, next) => {
    const validated = RequestSchema.parse(req.body);

    // Implementation here

    res.json({
      data: result,
      error: null,
      meta: null,
    });
  }
);`,
  },
  {
    id: 'install',
    label: 'Claude Code Usage',
    title: 'Installing and using skills',
    content: `# Install from the Anthropic skills marketplace
/plugin install document-skills@anthropic-agent-skills

# Skills in your project are auto-detected
# Just place them in .claude/skills/
mkdir -p .claude/skills/my-api-skill
# Add your SKILL.md and supporting files

# Claude will see the skill and use it when relevant
# You can also invoke directly:
/my-api-skill create user registration endpoint`,
  },
  {
    id: 'api',
    label: 'API Usage',
    title: 'Using skills via the API',
    content: `# pip install anthropic

response = client.beta.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=4096,
    betas=[
      "code-execution-2025-08-25",
      "skills-2025-10-02"
    ],
    container={
        "skills": [{
            "type": "custom",
            "skill_id": "skill_01AbCd...",
            "version": "latest"
        }]
    },
    messages=[{
        "role": "user",
        "content": "Create a user registration endpoint"
    }],
    tools=[{
        "type": "code_execution_20250825",
        "name": "code_execution"
    }],
)`,
  },
]

// ── Guide sections ──────────────────────────────────────────────────

export const AGENTS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['agents-start'] },
  { label: 'Foundations', ids: ['agents-overview', 'agents-skills-vs-agents'] },
  { label: 'Building', ids: ['agents-sdk', 'agents-subagents'] },
  { label: 'Best Practices', ids: ['agents-instructions', 'agents-use-cases', 'agents-skill-anatomy'] },
]

// ── Start page data ────────────────────────────────────────────────

export const AGENTS_START_PAGE_DATA: StartPageData = {
  subtitle: 'Understand the full Claude agent ecosystem \u2014 from skills that teach Claude how, to agents that make Claude do.',
  tip: 'Start with Skills and Claude Code, then graduate to the Agent SDK and custom subagents as your needs grow.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Foundations',
      description: 'Understand what agents are, how they fit together, and how skills and agents complement each other.',
      sectionLabel: 'Foundations',
      subItemDescriptions: {
        'agents-overview': 'The agent loop, the ecosystem layers, and the core design principle: give Claude a computer.',
        'agents-skills-vs-agents': 'Skills teach Claude how; agents make Claude do. Know when to use which \u2014 or both together.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Building',
      description: 'Learn the Agent SDK and how to create, configure, and deploy subagents.',
      sectionLabel: 'Building',
      subItemDescriptions: {
        'agents-sdk': 'Python and TypeScript quick starts, core capabilities, and permission modes.',
        'agents-subagents': 'Built-in subagents, custom subagent files, and when to delegate.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Best Practices',
      description: 'Write effective instructions, explore real-world use cases, and learn skill anatomy.',
      sectionLabel: 'Best Practices',
      subItemDescriptions: {
        'agents-instructions': 'An interactive checklist and principles for writing high-quality agent prompts.',
        'agents-use-cases': 'Eight practical use cases from code review bots to multi-agent dev teams.',
        'agents-skill-anatomy': 'Directory structure, SKILL.md template, and how to install and distribute skills.',
      },
    },
  ],
  relatedGuides: ['claude-skills', 'prompt-engineering', 'claude-md'],
}

export const AGENTS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'claude-agents',
    icon: '\uD83D\uDD75\uFE0F',
    title: 'Claude Agents Guide',
    startPageId: 'agents-start',
    description: 'Skills, Agents, Subagents & the Claude Agent SDK \u2014 understand the full agent ecosystem and when to use each approach.',
    category: 'ai-tooling',
    sections: AGENTS_GUIDE_SECTIONS,
  },
  startPageData: AGENTS_START_PAGE_DATA,
}
