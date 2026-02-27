import type { GoAccordionItem, GoUseCase, GoProject } from './types'

export const GO_MINDSET_ITEMS: GoAccordionItem[] = [
  {
    title: 'No node_modules \u2014 and that\u2019s beautiful',
    body: 'Go modules download into a global cache (<code>~/go/pkg/mod</code>). No <code>node_modules</code> folder in every project. <code>go mod tidy</code> cleans up unused deps. The standard library covers HTTP, JSON, crypto, testing, and more \u2014 you\u2019ll reach for third-party packages far less often.',
  },
  {
    title: 'Forget functional programming patterns',
    body: 'No <code>.map()</code>, <code>.filter()</code>, or <code>.reduce()</code>. Go is deliberately imperative. You\u2019ll write explicit <code>for</code> loops everywhere, and that\u2019s the idiomatic way. It feels verbose at first, but you get used to the clarity of seeing exactly what\u2019s happening.',
  },
  {
    title: 'Pointers aren\u2019t as scary as they sound',
    body: 'You\u2019ll see <code>*</code> and <code>&amp;</code> everywhere. The quick version: <code>&amp;x</code> gets a pointer to x (its memory address), and <code>*p</code> dereferences a pointer (gets the value it points to). Think of it like pass-by-reference vs pass-by-value. In JS, objects are always passed by reference \u2014 in Go, you choose.',
  },
  {
    title: 'Testing is built in \u2014 no Jest config',
    body: 'Create a file ending in <code>_test.go</code>, write functions starting with <code>Test</code>, and run <code>go test ./...</code>. That\u2019s it. No config files, no test runner installation, no complicated setup. Benchmarking is built in too with <code>Benchmark</code> prefix functions.',
  },
  {
    title: 'Capitalization = public/private (seriously)',
    body: 'In Go, <code>UserService</code> is exported (public), but <code>userService</code> is unexported (private to the package). No <code>export</code> keyword, no <code>public</code>/<code>private</code> modifiers. Just capitalization. It\u2019s weird for about two days, then it becomes second nature.',
  },
  {
    title: 'The build output is wildly simple',
    body: '<code>go build</code> \u2192 one binary. That\u2019s your deployment artifact. No Webpack, no Vite, no Rollup, no tree-shaking, no code splitting. Cross-compilation is also trivial: <code>GOOS=linux GOARCH=amd64 go build</code> compiles for Linux from your Mac.',
  },
]

export const GO_FRONTEND_USES: GoUseCase[] = [
  {
    icon: '\u2699',
    title: 'Backend for your frontend',
    description: 'Build the API your React app talks to. Go\u2019s standard library HTTP server + a router like Chi or Echo gives you a fast, typed API with minimal dependencies.',
    accent: '#0891b2',
    darkAccent: '#22d3ee',
  },
  {
    icon: '\u{1F527}',
    title: 'Developer tooling',
    description: 'Build custom CLI tools for your team \u2014 code generators, deployment scripts, migration tools. Distribute as a single binary. No "make sure you have Node 18 installed."',
    accent: '#ca8a04',
    darkAccent: '#facc15',
  },
  {
    icon: '\u2194',
    title: 'WebSocket / real-time servers',
    description: 'Go handles thousands of concurrent WebSocket connections with goroutines. If your frontend needs real-time features (chat, live data, collab editing), Go is an excellent server choice.',
    accent: '#be185d',
    darkAccent: '#f472b6',
  },
  {
    icon: '\u{1F9E9}',
    title: 'BFF / API gateway',
    description: 'A lightweight Go service that aggregates multiple backend APIs into a clean interface for your frontend. Fast, low-overhead, and easy to deploy alongside your UI.',
    accent: '#0891b2',
    darkAccent: '#22d3ee',
  },
]

export const GO_STARTER_PROJECTS: GoProject[] = [
  {
    title: '1. Hello, JSON API',
    difficulty: 'beginner',
    time: '~30 minutes',
    concepts: 'HTTP, JSON, structs',
    description: 'Build a simple REST API that returns JSON. No frameworks, just Go\u2019s standard library. This is your "Hello, Express" moment but without npm install.',
    tags: ['net/http', 'encoding/json', 'structs', 'handlers'],
    steps: [
      { label: 'Create a User struct with JSON tags', desc: 'Learn how Go maps struct fields to JSON keys' },
      { label: 'Write a handler that returns a list of users', desc: 'Use json.NewEncoder to write directly to the response' },
      { label: 'Add a POST endpoint to create users', desc: 'Parse JSON request bodies with json.NewDecoder' },
      { label: 'Connect it to your React frontend', desc: 'Fetch data with TanStack Query from your Go API' },
    ],
    code: `package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

var users = []User{
    {ID: 1, Name: "Alice"},
    {ID: 2, Name: "Bob"},
}

func main() {
    http.HandleFunc("/api/users", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(users)
    })

    log.Println("Server running on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}`,
  },
  {
    title: '2. CLI Task Manager',
    difficulty: 'beginner',
    time: '~45 minutes',
    concepts: 'CLI args, file I/O, slices',
    description: 'A command-line to-do app that saves tasks to a JSON file. Experience Go\u2019s strengths at building tools that "just work" as a single binary.',
    tags: ['os', 'encoding/json', 'slices', 'file I/O', 'error handling'],
    steps: [
      { label: 'Define a Task struct', desc: 'Fields: ID, Title, Done, CreatedAt' },
      { label: 'Read/write tasks from a JSON file', desc: 'Use os.ReadFile and os.WriteFile for persistence' },
      { label: 'Parse CLI arguments for add, list, done, remove', desc: 'Use os.Args or the flag package' },
      { label: 'Build and distribute as a binary', desc: 'go build \u2192 share the file, it runs anywhere' },
    ],
  },
  {
    title: '3. URL Shortener API',
    difficulty: 'intermediate',
    time: '~1.5 hours',
    concepts: 'routing, maps, middleware, redirect',
    description: 'Build a fully functional URL shortener with an API to create short links and redirect to the original URL. Introduces routing patterns and in-memory storage with maps.',
    tags: ['net/http', 'crypto/rand', 'maps', 'middleware', 'routing'],
    steps: [
      { label: 'Create an in-memory store using a map', desc: 'map[string]string to store shortCode \u2192 originalURL' },
      { label: 'POST /shorten to create a short link', desc: 'Generate random short codes, return the short URL' },
      { label: 'GET /:code to redirect', desc: 'Look up the code and issue an HTTP 301 redirect' },
      { label: 'Add logging middleware', desc: 'Wrap handlers to log request method, path, and duration' },
      { label: 'Add a mutex for thread safety', desc: 'Learn sync.Mutex to safely handle concurrent requests' },
    ],
  },
  {
    title: '4. Real-time Chat with WebSockets',
    difficulty: 'intermediate',
    time: '~2 hours',
    concepts: 'goroutines, channels, WebSockets',
    description: 'Build a WebSocket server that broadcasts messages to all connected clients. Pair it with a simple React frontend. This project showcases Go\u2019s concurrency strengths.',
    tags: ['gorilla/websocket', 'goroutines', 'channels', 'concurrency'],
    steps: [
      { label: 'Set up a WebSocket upgrade handler', desc: 'Use gorilla/websocket to upgrade HTTP connections' },
      { label: 'Create a Hub to manage connections', desc: 'Goroutine that tracks clients and broadcasts messages' },
      { label: 'Each client gets its own goroutine', desc: 'One for reading, one for writing \u2014 via channels' },
      { label: 'Build a React frontend', desc: 'Connect via native WebSocket API, display messages in real-time' },
    ],
  },
  {
    title: '5. REST API with Database & Auth',
    difficulty: 'intermediate',
    time: '~3 hours',
    concepts: 'database, auth, project structure',
    description: 'A full CRUD API with SQLite, JWT auth, and a clean project structure. This is your "full-stack Go backend" project \u2014 the equivalent of building an Express + Prisma API.',
    tags: ['chi router', 'database/sql', 'golang-jwt', 'middleware', 'project structure'],
    steps: [
      { label: 'Set up project with go-chi/chi router', desc: 'RESTful routing with middleware support' },
      { label: 'Connect SQLite with database/sql', desc: 'Create tables, write queries, scan results into structs' },
      { label: 'Implement JWT authentication middleware', desc: 'Sign tokens on login, validate on protected routes' },
      { label: 'Structure into packages', desc: 'handlers/, models/, middleware/ \u2014 Go\u2019s package conventions' },
      { label: 'Write tests with Go\u2019s testing package', desc: 'Table-driven tests for handlers and auth logic' },
    ],
  },
]
