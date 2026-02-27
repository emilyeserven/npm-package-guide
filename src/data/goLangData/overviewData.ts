import type { GoUseCase, GoAccordionItem } from './types'

export const GO_USE_CASES: GoUseCase[] = [
  {
    icon: '\u26A1',
    title: 'APIs & Microservices',
    description: 'Go\u2019s standard library has a production-grade HTTP server built in. No framework needed for simple services. Companies like Uber and Twitch run their backend services on Go.',
    accent: '#0891b2',
    darkAccent: '#22d3ee',
  },
  {
    icon: '\u27F3',
    title: 'Concurrent Systems',
    description: 'Goroutines and channels make concurrency a first-class citizen. Spinning up thousands of lightweight threads is trivial \u2014 something that\u2019s painful in most other languages.',
    accent: '#be185d',
    darkAccent: '#f472b6',
  },
  {
    icon: '\u2601',
    title: 'Cloud & DevOps Tooling',
    description: 'Docker, Kubernetes, Terraform, and Prometheus are all written in Go. It\u2019s the lingua franca of cloud infrastructure.',
    accent: '#0891b2',
    darkAccent: '#22d3ee',
  },
  {
    icon: '\u2B21',
    title: 'CLI Tools',
    description: 'Go compiles to a single static binary with zero dependencies. Distribute your CLI tool as one file \u2014 no runtimes, no installs, no headaches.',
    accent: '#ca8a04',
    darkAccent: '#facc15',
  },
  {
    icon: '\u26F0',
    title: 'High-Performance Networking',
    description: 'If you\u2019re building proxies, load balancers, or anything that handles tons of network I/O, Go was practically designed for you.',
    accent: '#be185d',
    darkAccent: '#f472b6',
  },
  {
    icon: '\u23F1',
    title: 'Fast Compilation & Deployment',
    description: 'Go compiles in seconds, not minutes. The feedback loop from code to running binary is dramatically faster than languages like Rust or C++.',
    accent: '#ca8a04',
    darkAccent: '#facc15',
  },
]

export const GO_PHILOSOPHY_ITEMS: GoAccordionItem[] = [
  {
    title: 'No classes, no inheritance',
    body: 'Go uses <code>structs</code> and <code>interfaces</code> instead of classes. There\u2019s no inheritance \u2014 only composition. If you\u2019ve ever been burned by deep class hierarchies in OOP, Go\u2019s approach will feel refreshing. You build behavior by embedding structs and implementing interfaces implicitly (no <code>implements</code> keyword).',
  },
  {
    title: 'Explicit error handling, no try/catch',
    body: 'Go functions return errors as values. You\u2019ll see <code>if err != nil</code> on virtually every other line. It\u2019s verbose, but it forces you to think about failure at every step. No more unhandled promise rejections. No more mystery stack traces from a <code>catch</code> block three layers up.',
  },
  {
    title: 'One way to format code',
    body: '<code>gofmt</code> is Go\u2019s built-in formatter and there\u2019s exactly one style. No Prettier config debates, no ESLint rule arguments. Every Go codebase in the world looks the same. It\u2019s liberating.',
  },
  {
    title: 'No unused variables or imports allowed',
    body: 'Go won\u2019t compile if you have an unused import or variable. This is annoying during development (especially rapid prototyping) but keeps codebases clean. Use <code>_</code> as a blank identifier if you need to suppress this temporarily.',
  },
  {
    title: 'Generics exist (but arrived late)',
    body: 'Go 1.18 (2022) added generics. Before that, you had to use <code>interface{}</code> (empty interface) for generic-like behavior, which was basically <code>any</code> with extra steps. Generics are still simpler than TypeScript\u2019s type system \u2014 no conditional types, no mapped types, no template literal types.',
  },
]
