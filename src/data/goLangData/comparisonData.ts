import type { GoCompareRow, GoCodeExample, GoConceptRow } from './types'
import type { QuizQuestion } from '../../components/mdx/QuizBase'

export const GO_VS_PYTHON_TABLE: GoCompareRow[] = [
  { aspect: 'Typing', go: 'Statically typed, compiled. Types checked at compile time.', python: 'Dynamically typed (optional type hints via mypy). Types checked at runtime.' },
  { aspect: 'Performance', go: 'Very fast. Compiles to native machine code. Comparable to Java/C#.', python: 'Slower by 10\u2013100x for CPU-bound tasks. CPython has the GIL limitation.' },
  { aspect: 'Concurrency', go: 'Built-in goroutines & channels. Thousands of concurrent tasks are trivial.', python: 'asyncio, threads, or multiprocessing. Async is powerful but more complex to wire up.' },
  { aspect: 'Learning Curve', go: 'Small language, ~25 keywords. Easy to learn, hard to be "clever."', python: 'Very beginner-friendly. Easy to read and prototype quickly.' },
  { aspect: 'Ecosystem', go: 'Strong for cloud, DevOps, and networking. Smaller for data science and ML.', python: 'Massive ecosystem for ML, data science, scripting, web, and automation.' },
  { aspect: 'Deployment', go: 'Single static binary. No runtime required. Tiny Docker images (~5\u201315 MB).', python: 'Requires Python runtime. Dependency management can be tricky (venvs, pip).' },
  { aspect: 'Error Handling', go: 'Errors as return values. Explicit, verbose, no exceptions.', python: 'try/except exceptions. Familiar but can lead to swallowed errors.' },
  { aspect: 'Best For', go: 'APIs, microservices, CLI tools, infrastructure, high-concurrency systems.', python: 'ML/AI, data science, scripting, rapid prototyping, automation.' },
]

export const GO_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'You\u2019re building a CLI tool that needs to be distributed as a single executable with no dependencies. Which language?',
    options: [
      'Go \u2014 compiles to a static binary',
      'Python \u2014 easier to write scripts',
    ],
    answer: 0,
    explanation: 'Go\u2019s single-binary compilation is one of its biggest advantages for CLI distribution. Python requires a runtime to be installed.',
  },
  {
    q: 'You need to train a machine learning model on a large dataset. Which language has the better ecosystem?',
    options: [
      'Go \u2014 it\u2019s faster at computation',
      'Python \u2014 PyTorch, TensorFlow, scikit-learn',
    ],
    answer: 1,
    explanation: 'Python dominates the ML ecosystem. While Go is faster at raw computation, Python\u2019s ML libraries (PyTorch, TensorFlow, etc.) are far more mature and practical.',
  },
  {
    q: 'Your team needs to build a high-concurrency WebSocket server handling 10,000+ simultaneous connections. Which language makes this easier?',
    options: [
      'Python \u2014 asyncio handles it well',
      'Go \u2014 goroutines are designed for this',
    ],
    answer: 1,
    explanation: 'Go\u2019s goroutines are extremely lightweight (a few KB each) and designed for massive concurrency. Python\u2019s asyncio works but requires more careful wiring.',
  },
  {
    q: 'You want the smallest possible Docker image for a production microservice. Which language helps more?',
    options: [
      'Go \u2014 single binary, ~5\u201315 MB images',
      'Python \u2014 slim images are small enough',
    ],
    answer: 0,
    explanation: 'Go compiles to a static binary that can run in a scratch/distroless image (5\u201315 MB). Python slim images are typically 50\u2013150 MB+.',
  },
]

export const GO_HTTP_SERVER_EXAMPLE: GoCodeExample = {
  id: 'http-server',
  title: 'HTTP Server',
  leftLabel: 'Go',
  leftLang: 'go',
  leftCode: `package main

import (
    "encoding/json"
    "net/http"
)

type Response struct {
    Message string \`json:"message"\`
}

func main() {
    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(Response{
            Message: "Hello from Go!",
        })
    })
    http.ListenAndServe(":8080", nil)
}`,
  rightLabel: 'Python (FastAPI)',
  rightLang: 'python',
  rightCode: `from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
def read_hello():
    return {"message": "Hello from Python!"}

# Run with:
# uvicorn main:app --port 8080



# Python is more concise here,
# but Go uses only the standard
# library \u2014 zero dependencies.`,
  note: 'If you\u2019re building something that needs to be fast, concurrent, and deployed as a single binary \u2192 Go. If you\u2019re doing data science, ML, or rapid scripting \u2192 Python. For web APIs, both are great.',
  noteType: 'tip',
}

export const GO_TS_CODE_EXAMPLES: GoCodeExample[] = [
  {
    id: 'variables',
    title: 'Variables & Constants',
    leftLabel: 'TypeScript',
    leftLang: 'typescript',
    leftCode: `const name: string = "Emily";
let age: number = 30;
let active = true; // inferred`,
    rightLabel: 'Go',
    rightLang: 'go',
    rightCode: `const name string = "Emily"
var age int = 30
active := true // short declaration (inferred)`,
    note: 'Go\u2019s <code>:=</code> operator declares and assigns in one step \u2014 it\u2019s the most common way to create variables. Types go <em>after</em> the name, not before. No semicolons needed.',
  },
  {
    id: 'functions',
    title: 'Functions',
    leftLabel: 'TypeScript',
    leftLang: 'typescript',
    leftCode: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a: number, b: number): number =>
  a + b;`,
    rightLabel: 'Go',
    rightLang: 'go',
    rightCode: `func greet(name string) string {
  return fmt.Sprintf("Hello, %s!", name)
}

// Multiple return values!
func divide(a, b float64) (float64, error) {
  if b == 0 { return 0, fmt.Errorf("division by zero") }
  return a / b, nil
}`,
    note: 'Go functions commonly return <code>(result, error)</code>. There are no arrow functions \u2014 just <code>func</code>. Anonymous functions exist but are less common than in TS.',
    noteType: 'warning',
  },
  {
    id: 'structs',
    title: 'Structs & Methods',
    leftLabel: 'TypeScript',
    leftLang: 'typescript',
    leftCode: `interface User {
  name: string;
  email: string;
}

class UserService {
  getDisplayName(user: User): string {
    return user.name.toUpperCase();
  }
}`,
    rightLabel: 'Go',
    rightLang: 'go',
    rightCode: `type User struct {
  Name  string \`json:"name"\`
  Email string \`json:"email"\`
}

// Method with a "receiver"
func (u User) DisplayName() string {
  return strings.ToUpper(u.Name)
}`,
    note: 'Instead of methods inside a class, Go attaches methods to a struct via a <em>receiver</em>. The <code>(u User)</code> part before the function name means "this method belongs to User." Think of it like <code>this</code> in JS, but explicit.',
  },
  {
    id: 'interfaces',
    title: 'Implicit Interfaces',
    leftLabel: 'TypeScript',
    leftLang: 'typescript',
    leftCode: `interface Logger {
  log(msg: string): void;
}

class ConsoleLogger implements Logger {
  log(msg: string) {
    console.log(msg);
  }
}`,
    rightLabel: 'Go',
    rightLang: 'go',
    rightCode: `type Logger interface {
  Log(msg string)
}

type ConsoleLogger struct{}

func (c ConsoleLogger) Log(msg string) {
  fmt.Println(msg)
}
// ConsoleLogger satisfies Logger
// automatically \u2014 no "implements"!`,
    note: 'In Go, if your struct has the right methods, it satisfies the interface \u2014 <em>automatically</em>. No <code>implements</code> keyword. This is called "structural typing" and it\u2019s similar to how TypeScript checks types structurally.',
    noteType: 'tip',
  },
  {
    id: 'errors',
    title: 'Error Handling',
    leftLabel: 'TypeScript',
    leftLang: 'typescript',
    leftCode: `try {
  const data = await fetchUser(42);
  console.log(data.name);
} catch (err) {
  console.error("Failed:", err);
}`,
    rightLabel: 'Go',
    rightLang: 'go',
    rightCode: `data, err := fetchUser(42)
if err != nil {
  fmt.Println("Failed:", err)
  return
}
fmt.Println(data.Name)`,
  },
  {
    id: 'async',
    title: 'Async / Concurrency',
    leftLabel: 'TypeScript',
    leftLang: 'typescript',
    leftCode: `const results = await Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3),
]);`,
    rightLabel: 'Go',
    rightLang: 'go',
    rightCode: `ch := make(chan User, 3)

for _, id := range []int{1, 2, 3} {
  go func(id int) {
    user, _ := fetchUser(id)
    ch <- user
  }(id)
}

for i := 0; i < 3; i++ {
  user := <-ch
  fmt.Println(user.Name)
}`,
    note: 'The <code>go</code> keyword spawns a goroutine (a lightweight thread). Channels (<code>chan</code>) are typed pipes for sending data between goroutines. It\u2019s a different mental model from Promise.all but achieves similar goals \u2014 with much finer control.',
  },
]

export const GO_CONCEPT_MAP: GoConceptRow[] = [
  { ts: '<code>interface</code>', go: '<code>interface</code> (implicit satisfaction)' },
  { ts: '<code>type</code> / <code>class</code>', go: '<code>struct</code> with methods via receivers' },
  { ts: '<code>async/await</code>', go: '<code>go</code> keyword + channels' },
  { ts: '<code>try/catch</code>', go: '<code>if err != nil</code> pattern' },
  { ts: '<code>Array.map/filter</code>', go: '<code>for</code> loops (no built-in FP methods)' },
  { ts: '<code>null</code> / <code>undefined</code>', go: '<code>nil</code> (only for pointers, slices, maps, etc.)' },
  { ts: '<code>npm</code>', go: '<code>go mod</code> (built-in module system)' },
  { ts: '<code>package.json</code>', go: '<code>go.mod</code>' },
  { ts: '<code>Prettier</code> / <code>ESLint</code>', go: '<code>gofmt</code> / <code>go vet</code> (built-in)' },
  { ts: 'Generics <code>&lt;T&gt;</code>', go: 'Generics <code>[T any]</code> (since Go 1.18)' },
  { ts: '<code>enum</code>', go: '<code>const</code> + <code>iota</code>' },
  { ts: '<code>export</code> keyword', go: 'Capitalized names are exported (public)' },
]
