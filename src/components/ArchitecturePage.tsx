import { useState } from 'react'
import { PrevNextNav } from './PrevNextNav'

/* ───────────────────────── TYPES ───────────────────────── */

interface StackPiece {
  name: string
  letter: string
}

interface Layer {
  id: string
  label: string
  traditional: StackPiece
  modified: StackPiece
  changed: boolean
  color: string
  accent: string
  icon: string
  purpose: string
  explanation?: string
  traditionalDesc?: string
  modifiedDesc?: string
  impact: string[]
  analogy: string
}

interface DataFlowItem {
  step: string
  text: string
  tag: string
  colorId: string
}

interface Stack {
  id: string
  name: string
  pieces: string[]
  description: string
  pros: string[]
  cons: string[]
  color: string
  accent: string
}

/* ───────────────────────── DATA ───────────────────────── */

const LAYERS: Layer[] = [
  {
    id: "frontend", label: "Frontend",
    traditional: { name: "React", letter: "R" }, modified: { name: "React", letter: "R" },
    changed: false, color: "#7c3aed", accent: "#ede9fe", icon: "\u{1F3A8}",
    purpose: "The frontend library builds everything the user actually sees and interacts with \u2014 buttons, forms, pages, animations. It takes raw data from the server and turns it into a visual, interactive experience in the browser.",
    explanation: "React (by Meta) lets you build UIs out of reusable \u2018components\u2019 \u2014 small building blocks like a search bar, a card, or a navigation menu. You compose these together like LEGO bricks to build complex interfaces. It uses a \u2018virtual DOM\u2019 to efficiently update only the parts of the page that change. React stays the same in both the traditional and modified stack \u2014 it\u2019s backend-agnostic. Your React components don\u2019t care if data comes from MongoDB or PostgreSQL, or whether the server runs Express or Fastify. The API contract (the shape of data exchanged) is what matters.",
    impact: ["No change needed \u2014 React works with any backend", "This demonstrates a key architecture principle: layers should be independent", "Your UI code doesn\u2019t need to know anything about the database"],
    analogy: "React is like the interior design of a restaurant. Customers interact with the menu, decor, and table layout. They don\u2019t know or care whether the kitchen uses a gas stove or an induction cooktop.",
  },
  {
    id: "server", label: "Server Framework",
    traditional: { name: "Express", letter: "E" }, modified: { name: "Fastify", letter: "F" },
    changed: true, color: "#059669", accent: "#d1fae5", icon: "\u26A1",
    purpose: "The server framework is the \u2018traffic controller\u2019 of your app. When someone visits a URL or submits a form, the server decides what to do: fetch data from the database, process it, and send back a response. It\u2019s the bridge between your frontend and your database.",
    traditionalDesc: "Express is the most popular Node.js server framework. It\u2019s minimal and unopinionated \u2014 it gives you the basics and lets you add whatever you need via middleware (plugins). Think of it like a blank kitchen: you bring your own tools. It\u2019s been around since 2010 and has a massive ecosystem.",
    modifiedDesc: "Fastify is a newer, faster alternative to Express. It\u2019s built for performance and comes with more built-in features like request validation (checking that incoming data looks right) and automatic API documentation. Think of it like a modern kitchen that comes pre-equipped with high-end appliances.",
    impact: ["Significantly faster \u2014 Fastify handles more requests per second than Express", "Built-in schema validation \u2014 automatically checks that API requests have the right shape", "Plugin architecture \u2014 cleaner way to organize and share code across your app", "Slightly steeper initial learning curve, but more structure encourages better patterns"],
    analogy: "Express is like a bicycle \u2014 simple, reliable, easy to learn. Fastify is like an electric bike \u2014 faster out of the box, more features, but you need to understand a few more controls.",
  },
  {
    id: "runtime", label: "Runtime",
    traditional: { name: "Node.js", letter: "N" }, modified: { name: "Node.js", letter: "N" },
    changed: false, color: "#ca8a04", accent: "#fef9c3", icon: "\u{1F527}",
    purpose: "The runtime is the engine that makes everything else possible. JavaScript was originally built only for browsers. Node.js lets you run JavaScript on a server \u2014 meaning you can use one language for your entire application, frontend and backend.",
    explanation: "Node.js is a JavaScript runtime built on Chrome\u2019s V8 engine. It\u2019s event-driven and non-blocking, which means it can handle many simultaneous connections efficiently \u2014 great for real-time apps like chat. It\u2019s the foundation that both Express and Fastify run on. Swapping Express for Fastify doesn\u2019t change this layer at all, because both are Node.js frameworks. Node.js is what unifies the entire stack under one language.",
    impact: ["No change needed \u2014 Fastify runs on Node.js just like Express does", "One language (JavaScript/TypeScript) across the entire stack", "Massive npm ecosystem with packages for virtually anything"],
    analogy: "Node.js is like electricity in a building. You can swap out appliances (Express \u2192 Fastify) or rearrange the storage room (MongoDB \u2192 PostgreSQL), but they all still run on the same power.",
  },
  {
    id: "database", label: "Database",
    traditional: { name: "MongoDB", letter: "M" }, modified: { name: "PostgreSQL", letter: "P" },
    changed: true, color: "#2563eb", accent: "#dbeafe", icon: "\u{1F5C4}\uFE0F",
    purpose: "The database is your app\u2019s long-term memory. It stores all your data \u2014 users, posts, orders, anything \u2014 so it persists even when the server restarts. Without it, every piece of information would vanish the moment you close the app.",
    traditionalDesc: "MongoDB is a NoSQL database. It stores data as flexible JSON-like documents \u2014 think of it like tossing papers into labeled folders. You don\u2019t need to define a rigid structure upfront. Great for rapid prototyping, but relationships between data (like \u2018this user owns these orders\u2019) can get messy.",
    modifiedDesc: "PostgreSQL is a relational (SQL) database. It stores data in structured tables with rows and columns \u2014 like a spreadsheet. You define the shape of your data upfront (a \u2018schema\u2019). This makes relationships between data very clean and enforces data integrity, meaning it\u2019s much harder to accidentally save bad data.",
    impact: ["Stronger data integrity \u2014 PostgreSQL enforces rules about what data is valid", "Better for complex queries \u2014 joins, aggregations, and filtering are first-class features", "Requires more upfront planning \u2014 you need to design your table structure before writing data", "Industry standard for production apps \u2014 banks, governments, and most enterprises use relational DBs"],
    analogy: "MongoDB is like a filing cabinet where you can toss in any paper. PostgreSQL is like a well-organized spreadsheet \u2014 every column is labeled, and it won\u2019t let you put a name where a number should go.",
  },
]

const DATA_FLOW: DataFlowItem[] = [
  { step: "1", text: "User clicks a button in the browser", tag: "React", colorId: "frontend" },
  { step: "2", text: "React sends an HTTP request to the server", tag: "React \u2192 Fastify", colorId: "server" },
  { step: "3", text: "Fastify validates the request and queries the database", tag: "Fastify \u2192 PostgreSQL", colorId: "server" },
  { step: "4", text: "PostgreSQL finds the data and sends it back", tag: "PostgreSQL \u2192 Fastify", colorId: "database" },
  { step: "5", text: "Fastify packages the data as JSON and responds", tag: "Fastify \u2192 React", colorId: "server" },
  { step: "6", text: "React updates the page with the new data", tag: "React", colorId: "frontend" },
]

const STACKS: Stack[] = [
  {
    id: "mern",
    name: "MERN",
    pieces: ["MongoDB", "Express", "React", "Node.js"],
    description: "The original and most popular JavaScript full-stack combo. Great for learning and prototyping.",
    pros: [
      "Massive community \u2014 the most tutorials, courses, and Stack Overflow answers",
      "All JavaScript, all the time \u2014 one language for the whole app",
      "MongoDB\u2019s flexible schema is great for rapid prototyping",
      "Express is minimal and easy to learn for beginners",
    ],
    cons: [
      "MongoDB can struggle with complex relational data",
      "Express is showing its age \u2014 no built-in validation or modern patterns",
      "Flexible schema can lead to inconsistent data if you\u2019re not careful",
      "Performance can lag behind more optimized alternatives",
    ],
    color: "#e11d48",
    accent: "#fff1f2",
  },
  {
    id: "pfrn",
    name: "PFRN (This Guide)",
    pieces: ["PostgreSQL", "Fastify", "React", "Node.js"],
    description: "The modified stack you\u2019re learning about here. Swaps in stronger, faster alternatives while keeping the JS ecosystem.",
    pros: [
      "PostgreSQL enforces data integrity \u2014 much harder to save bad data",
      "Fastify is significantly faster than Express with built-in validation",
      "Still all JavaScript/TypeScript \u2014 same one-language benefit as MERN",
      "Better suited for production apps that need reliability and scale",
    ],
    cons: [
      "Smaller community than MERN \u2014 fewer tutorials specifically for this combo",
      "PostgreSQL requires upfront schema design, which slows initial development",
      "Fastify\u2019s plugin system has a steeper learning curve than Express middleware",
      "Less beginner-friendly overall \u2014 more concepts to learn upfront",
    ],
    color: "#7c3aed",
    accent: "#f5f3ff",
  },
  {
    id: "mean",
    name: "MEAN",
    pieces: ["MongoDB", "Express", "Angular", "Node.js"],
    description: "Like MERN, but swaps React for Angular. Angular is a full framework with more built-in features (routing, forms, HTTP).",
    pros: [
      "Angular is a complete framework \u2014 routing, forms, HTTP client all built in",
      "Strong TypeScript support out of the box",
      "Great for large enterprise teams that want consistent structure",
      "Two-way data binding simplifies form-heavy apps",
    ],
    cons: [
      "Angular has a notoriously steep learning curve",
      "Heavier and more opinionated than React \u2014 less flexibility",
      "Smaller job market for Angular compared to React",
      "Same MongoDB limitations as MERN for relational data",
    ],
    color: "#dc2626",
    accent: "#fef2f2",
  },
  {
    id: "lamp",
    name: "LAMP",
    pieces: ["Linux", "Apache", "MySQL", "PHP"],
    description: "The classic web stack that powered most of the early internet. WordPress, Facebook (originally), and Wikipedia run on it.",
    pros: [
      "Battle-tested for decades \u2014 extremely well understood",
      "Cheap, widely available hosting everywhere",
      "WordPress (43% of the web) runs on LAMP",
      "MySQL is a proven, reliable relational database",
    ],
    cons: [
      "PHP is less popular with new developers",
      "Two languages (PHP backend + JavaScript frontend) instead of one",
      "Apache is slower than modern alternatives like Nginx",
      "Less suited for real-time apps (chat, live updates)",
    ],
    color: "#ea580c",
    accent: "#fff7ed",
  },
  {
    id: "django",
    name: "Django Stack",
    pieces: ["PostgreSQL", "Django", "React/Vue", "Python"],
    description: "Python-based stack. Django is a \u2018batteries included\u2019 framework with an admin panel, ORM, and auth system built in.",
    pros: [
      "Django includes admin panel, auth, ORM \u2014 huge time saver",
      "Python is widely known and excellent for data/ML integration",
      "PostgreSQL gives you the same strong data integrity as PFRN",
      "Great security defaults out of the box",
    ],
    cons: [
      "Two languages (Python backend + JavaScript frontend)",
      "Django\u2019s opinionated structure can feel restrictive",
      "Slower runtime performance than Node.js for I/O-heavy workloads",
      "Smaller real-time / WebSocket ecosystem compared to Node.js",
    ],
    color: "#16a34a",
    accent: "#f0fdf4",
  },
  {
    id: "rails",
    name: "Rails Stack",
    pieces: ["PostgreSQL", "Ruby on Rails", "Hotwire/React", "Ruby"],
    description: "Ruby-based stack famous for developer happiness and rapid development. GitHub, Shopify, and Basecamp are built on it.",
    pros: [
      "Convention over configuration \u2014 Rails makes decisions for you, so you ship faster",
      "Incredibly mature ecosystem with gems (packages) for everything",
      "Hotwire reduces the need for heavy JavaScript on the frontend",
      "Excellent for CRUD apps, admin dashboards, and MVPs",
    ],
    cons: [
      "Ruby is a niche language compared to JavaScript or Python",
      "Slower runtime performance for high-throughput workloads",
      "Can feel \u2018magical\u2019 \u2014 hard to debug when conventions break",
      "Fewer new developers learning Ruby compared to JS/Python",
    ],
    color: "#b91c1c",
    accent: "#fef2f2",
  },
]

/* ───────────────────────── COMPONENTS ───────────────────────── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "8px 0 20px" }}>
      <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
      <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#94a3b8" }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
    </div>
  )
}

function LayerBar({ layer, isActive, onClick }: { layer: Layer; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "0", background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "stretch", borderRadius: "10px", overflow: "hidden",
        transition: "all 0.2s ease",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        boxShadow: isActive ? `0 3px 16px ${layer.color}30` : "0 1px 4px #0001",
      }}
    >
      <div style={{ width: "6px", minHeight: "100%", background: layer.color, opacity: isActive ? 1 : 0.35, transition: "opacity 0.2s" }} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: isActive ? layer.accent : "#fff", transition: "background 0.2s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>{layer.icon}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: isActive ? layer.color : "#374151" }}>{layer.modified.name}</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>{layer.label}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {layer.changed && (
            <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", background: `${layer.color}18`, color: layer.color, padding: "3px 8px", borderRadius: "5px" }}>Modified</span>
          )}
          <span style={{ fontSize: "12px", color: "#94a3b8", transition: "transform 0.2s", transform: isActive ? "rotate(90deg)" : "rotate(0)" }}>{"\u25B6"}</span>
        </div>
      </div>
    </button>
  )
}

function ComparisonToggle({ layer }: { layer: Layer }) {
  const [showModified, setShowModified] = useState(true)
  return (
    <div style={{ background: "#fff", borderRadius: "12px", border: `1.5px solid ${layer.color}18`, overflow: "hidden" }}>
      <div style={{ display: "flex", borderBottom: `1px solid ${layer.color}12` }}>
        {[false, true].map((mod) => (
          <button key={String(mod)} onClick={() => setShowModified(mod)} style={{
            flex: 1, padding: "11px", border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600,
            background: showModified === mod ? layer.accent : "transparent",
            color: showModified === mod ? layer.color : "#94a3b8",
            borderBottom: showModified === mod ? `3px solid ${layer.color}` : "3px solid transparent",
            transition: "all 0.2s",
          }}>
            {mod ? `Modified: ${layer.modified.name}` : `Traditional: ${layer.traditional.name}`}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px 18px", fontSize: "14px", lineHeight: 1.75, color: "#374151" }}>
        {showModified ? layer.modifiedDesc : layer.traditionalDesc}
      </div>
    </div>
  )
}

function UnchangedExplanation({ layer }: { layer: Layer }) {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", border: `1.5px solid ${layer.color}18`, padding: "16px 18px" }}>
      <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8", marginBottom: "8px" }}>Same in both stacks &mdash; no changes here</div>
      <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.75, color: "#374151" }}>{layer.explanation}</p>
    </div>
  )
}

function StackCard({ stack, isExpanded, onToggle }: { stack: Stack; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "12px", overflow: "hidden",
      border: isExpanded ? `2px solid ${stack.color}` : "1.5px solid #e2e8f0",
      boxShadow: isExpanded ? `0 4px 20px ${stack.color}18` : "0 1px 4px #0001",
      transition: "all 0.25s ease",
    }}>
      <button onClick={onToggle} style={{
        width: "100%", padding: "16px 18px", border: "none", cursor: "pointer",
        background: isExpanded ? stack.accent : "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s",
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "16px", fontWeight: 700, color: stack.color }}>{stack.name}</span>
            {stack.id === "pfrn" && (
              <span style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", background: stack.color, color: "#fff", padding: "2px 7px", borderRadius: "4px" }}>This guide</span>
            )}
          </div>
          <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>
            {stack.pieces.join(" \u00B7 ")}
          </div>
        </div>
        <span style={{ fontSize: "14px", color: "#94a3b8", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>{"\u25BC"}</span>
      </button>
      {isExpanded && (
        <div style={{ padding: "0 18px 18px", animation: "fadeIn 0.25s ease" }}>
          <p style={{ fontSize: "13.5px", lineHeight: 1.65, color: "#475569", margin: "0 0 14px" }}>{stack.description}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ background: "#f0fdf4", borderRadius: "10px", padding: "14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#16a34a", marginBottom: "8px" }}>{"\u2705"} Pros</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {stack.pros.map((pro, i) => (
                  <div key={i} style={{ fontSize: "12.5px", lineHeight: 1.55, color: "#374151", paddingLeft: "10px", borderLeft: "2px solid #bbf7d0" }}>{pro}</div>
                ))}
              </div>
            </div>
            <div style={{ background: "#fef2f2", borderRadius: "10px", padding: "14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#dc2626", marginBottom: "8px" }}>{"\u26A0\uFE0F"} Cons</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {stack.cons.map((con, i) => (
                  <div key={i} style={{ fontSize: "12.5px", lineHeight: 1.55, color: "#374151", paddingLeft: "10px", borderLeft: "2px solid #fecaca" }}>{con}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export function ArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState("server")
  const [expandedStack, setExpandedStack] = useState<string | null>("pfrn")
  const active = LAYERS.find((l) => l.id === activeLayer)

  return (
    <>
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1e293b" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "38px", letterSpacing: "-1px", marginBottom: "4px", display: "flex", justifyContent: "center", gap: "3px", flexWrap: "wrap" }}>
              {LAYERS.map((l) => (
                <span key={l.id} onClick={() => setActiveLayer(l.id)} style={{ color: activeLayer === l.id ? l.color : "#cbd5e1", cursor: "pointer", transition: "color 0.25s" }}>
                  {l.modified.letter}
                </span>
              ))}
              <span style={{ color: "#cbd5e1", marginLeft: "6px", fontSize: "26px", alignSelf: "center" }}>Stack</span>
            </div>
            <p style={{ color: "#64748b", fontSize: "14px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
              A beginner&apos;s guide to the modified <strong>MERN</strong> stack. Scroll to explore each section, or click a layer to dive in.
            </p>
          </div>

          {/* Section 1: What is a stack? */}
          <div style={{ background: "#fff", borderRadius: "14px", padding: "22px", boxShadow: "0 1px 6px #0001", marginBottom: "28px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#475569", marginBottom: "10px" }}>{"\u{1F4DA}"} What is a &ldquo;stack&rdquo;?</div>
            <p style={{ margin: "0 0 12px", fontSize: "14.5px", lineHeight: 1.75, color: "#374151" }}>
              A <strong>tech stack</strong> is the combination of technologies used to build a web application. Think of it like a recipe &mdash; each ingredient plays a specific role, and together they make the whole dish work. Every web app needs at least four things: a <strong>database</strong> to store data, a <strong>server framework</strong> to handle requests, a <strong>frontend library</strong> to build what users see, and a <strong>runtime</strong> to execute backend code.
            </p>
            <p style={{ margin: "0 0 12px", fontSize: "14.5px", lineHeight: 1.75, color: "#374151" }}>
              <strong>MERN</strong> stands for <strong>MongoDB</strong>, <strong>Express</strong>, <strong>React</strong>, and <strong>Node.js</strong>. It&apos;s one of the most popular stacks because every layer uses JavaScript, meaning you only need to learn one programming language to build a full application &mdash; from the database queries to the buttons on the screen.
            </p>
            <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.75, color: "#374151" }}>
              In this guide, we&apos;re exploring a <strong>modified version</strong> that swaps MongoDB for <strong>PostgreSQL</strong> (a more structured database) and Express for <strong>Fastify</strong> (a faster server framework), while keeping React and Node.js the same. This shows a key principle: you can swap individual layers without rewriting everything else.
            </p>
          </div>

          <SectionDivider label="Explore each layer" />

          {/* Section 2: Stack Layers */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2px", padding: "0 4px" }}>
              <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>User&apos;s Browser</span>
              <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
            </div>
            {LAYERS.map((layer) => (
              <LayerBar key={layer.id} layer={layer} isActive={activeLayer === layer.id} onClick={() => setActiveLayer(layer.id)} />
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "2px", padding: "0 4px" }}>
              <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
              <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Stored on Disk</span>
            </div>
          </div>

          {/* Detail Panel */}
          {active && (
            <div key={active.id} style={{ display: "flex", flexDirection: "column", gap: "14px", animation: "fadeIn 0.3s ease", marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 2px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", color: active.color }}>
                  {active.icon} {active.modified.name} &mdash; {active.label}
                </span>
                <div style={{ flex: 1, height: "1px", background: `${active.color}25` }} />
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", padding: "18px 20px", boxShadow: "0 1px 5px #0001", borderLeft: `4px solid ${active.color}` }}>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: active.color, marginBottom: "6px" }}>Why does this layer exist?</div>
                <p style={{ margin: 0, lineHeight: 1.75, fontSize: "14.5px", color: "#374151" }}>{active.purpose}</p>
              </div>
              {active.changed ? <ComparisonToggle layer={active} /> : <UnchangedExplanation layer={active} />}
              <div style={{ background: `linear-gradient(135deg, ${active.accent}, #fff)`, borderRadius: "12px", padding: "16px 18px", border: `1px solid ${active.color}18` }}>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: active.color, marginBottom: "6px" }}>{"\u{1F4A1}"} Analogy</div>
                <p style={{ margin: 0, lineHeight: 1.7, fontSize: "14px", color: "#374151", fontStyle: "italic" }}>{active.analogy}</p>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", padding: "18px 20px", boxShadow: "0 1px 5px #0001" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: active.color, marginBottom: "10px" }}>
                  {active.changed ? `\u{1F504} What changes with ${active.modified.name}?` : "\u2705 Key takeaways"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {active.impact.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: 1.6, color: "#374151" }}>
                      <span style={{ background: active.color, color: "#fff", borderRadius: "50%", width: "20px", height: "20px", minWidth: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, marginTop: "2px" }}>{i + 1}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Data Flow */}
          <SectionDivider label="How it all connects" />
          <div style={{ background: "#fff", borderRadius: "14px", padding: "22px", boxShadow: "0 1px 6px #0001", marginBottom: "32px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#475569", marginBottom: "4px" }}>{"\u{1F501}"} Data flow through the stack</div>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 14px 0" }}>
              This is always the same &mdash; every request follows this path regardless of which layer you&apos;re exploring above.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {DATA_FLOW.map((item) => {
                const layer = LAYERS.find((l) => l.id === item.colorId)!
                return (
                  <div key={item.step} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "9px", background: "#f8fafc", fontSize: "13.5px" }}>
                    <span style={{ background: layer.color, color: "#fff", borderRadius: "50%", width: "24px", height: "24px", minWidth: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>{item.step}</span>
                    <span style={{ flex: 1, color: "#374151" }}>{item.text}</span>
                    <span style={{ fontSize: "10px", fontWeight: 600, color: layer.color, background: `${layer.color}10`, padding: "3px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>{item.tag}</span>
                  </div>
                )
              })}
            </div>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "12px", marginBottom: 0, textAlign: "center" }}>
              All server-side layers run on <strong style={{ color: "#ca8a04" }}>Node.js</strong> &mdash; the JavaScript engine that powers everything outside the browser.
            </p>
          </div>

          {/* Section 4: Alternatives */}
          <SectionDivider label="Alternatives compared" />
          <div style={{ background: "#fff", borderRadius: "14px", padding: "22px", boxShadow: "0 1px 6px #0001", marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#475569", marginBottom: "4px" }}>{"\u{1F500}"} Popular stack alternatives</div>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 0 0" }}>
              There&apos;s no single &ldquo;best&rdquo; stack &mdash; each makes tradeoffs. Click any to see the pros and cons.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {STACKS.map((stack) => (
              <StackCard
                key={stack.id}
                stack={stack}
                isExpanded={expandedStack === stack.id}
                onToggle={() => setExpandedStack(expandedStack === stack.id ? null : stack.id)}
              />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          * { box-sizing: border-box; }
          @media (max-width: 520px) {
            div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
      <PrevNextNav currentId="architecture" />
    </>
  )
}
