import type { GlossaryCategory } from './index'

export const goLangGlossary: GlossaryCategory[] = [
  {
    category: 'Go Language Basics',
    terms: [
      {
        term: 'goroutine',
        definition: 'A lightweight concurrent function in Go, spawned with the `go` keyword. Goroutines are multiplexed onto OS threads by the Go runtime \u2014 thousands can run concurrently with minimal overhead.',
        linkId: 'go-tour',
        sectionId: 'go-vs-typescript',
      },
      {
        term: 'channel',
        definition: 'A typed conduit for sending and receiving values between goroutines. Channels provide synchronization and communication, replacing shared memory patterns.',
        linkId: 'go-tour',
        sectionId: 'go-vs-typescript',
      },
      {
        term: 'struct',
        definition: 'Go\u2019s primary data structure \u2014 a collection of fields. Equivalent to TypeScript interfaces/types but can have methods attached via receivers. No inheritance, only composition.',
        linkId: 'go-effective',
        sectionId: 'go-vs-typescript',
      },
      {
        term: 'receiver',
        definition: 'The parameter before a Go function name that binds the method to a type. `func (u User) Name() string` makes `Name` a method on `User` \u2014 similar to `this` in JavaScript, but explicit.',
        linkId: 'go-effective',
        sectionId: 'go-vs-typescript',
      },
      {
        term: 'interface (Go)',
        definition: 'A set of method signatures. In Go, interfaces are satisfied implicitly \u2014 if a type has the right methods, it implements the interface automatically. No `implements` keyword needed.',
        linkId: 'go-tour',
        sectionId: 'go-vs-typescript',
      },
      {
        term: 'gofmt',
        definition: 'Go\u2019s built-in code formatter. Unlike Prettier, there is exactly one formatting style with zero configuration. Every Go codebase in the world looks the same.',
        linkId: 'go-effective',
        sectionId: 'go-overview',
      },
    ],
  },
  {
    category: 'Go Tooling & Ecosystem',
    terms: [
      {
        term: 'go mod',
        definition: 'Go\u2019s built-in module system for dependency management. Equivalent to npm/pnpm. Creates `go.mod` (like `package.json`) and `go.sum` (like lock files).',
        linkId: 'go-official-site',
        sectionId: 'go-frontend-lens',
      },
      {
        term: 'go vet',
        definition: 'A built-in static analysis tool that catches suspicious constructs the compiler won\u2019t flag. Equivalent to ESLint for Go \u2014 but built into the language toolchain.',
        linkId: 'go-official-site',
        sectionId: 'go-overview',
      },
      {
        term: 'static binary',
        definition: 'A compiled executable with all dependencies included. Go compiles to static binaries by default \u2014 no runtime installation required. Deploy as a single file.',
        linkId: 'go-official-site',
        sectionId: 'go-overview',
      },
      {
        term: 'iota',
        definition: 'Go\u2019s constant generator. Used with `const` blocks to create incrementing values \u2014 Go\u2019s equivalent of TypeScript\u2019s `enum`.',
        linkId: 'go-by-example',
        sectionId: 'go-vs-typescript',
      },
    ],
  },
]
