/* ───────────────────────── TYPES ───────────────────────── */

export interface StackComponent {
  id: string
  name: string
  role: string
  icon: string
  color: string
  accent: string
  darkAccent: string
  purpose: string
  description: string
  keyFeatures: string[]
  analogy: string
  /* PFRN-only: comparison fields */
  changed?: boolean
  traditionalName?: string
  traditionalDesc?: string
  modifiedDesc?: string
}

export interface StackPageData {
  id: string
  name: string
  pieces: string[]
  overview: string
  color: string
  accent: string
  darkAccent: string
  components: StackComponent[]
  pros: string[]
  cons: string[]
  bestFor: string
}

export interface DataFlowItem {
  step: string
  text: string
  tag: string
  colorId: string
}

/* ───────────────────────── FRAMEWORK TYPES ───────────────────────── */

export interface FrameworkCapability {
  id: string
  name: string
  icon: string
  description: string
  keyPoints: string[]
}

export interface FrameworkPageData {
  id: string
  name: string
  tagline: string
  overview: string
  color: string
  accent: string
  darkAccent: string
  builtOn: string[]
  capabilities: FrameworkCapability[]
  pros: string[]
  cons: string[]
  bestFor: string
  analogy: string
}

/* ───────────────────────── LAYER COLORS (shared) ───────────────────────── */

export const LAYER_COLORS: Record<string, { color: string; accent: string; darkAccent: string }> = {
  frontend: { color: "#7c3aed", accent: "#ede9fe", darkAccent: "#2e1065" },
  server:   { color: "#059669", accent: "#d1fae5", darkAccent: "#022c22" },
  runtime:  { color: "#ca8a04", accent: "#fef9c3", darkAccent: "#422006" },
  database: { color: "#2563eb", accent: "#dbeafe", darkAccent: "#172554" },
}

/* ───────────────────────── DATA FLOW ───────────────────────── */

export const DATA_FLOW: DataFlowItem[] = [
  { step: "1", text: "User clicks a button in the browser", tag: "React", colorId: "frontend" },
  { step: "2", text: "React sends an HTTP request to the server", tag: "React \u2192 Fastify", colorId: "server" },
  { step: "3", text: "Fastify validates the request and queries the database", tag: "Fastify \u2192 PostgreSQL", colorId: "server" },
  { step: "4", text: "PostgreSQL finds the data and sends it back", tag: "PostgreSQL \u2192 Fastify", colorId: "database" },
  { step: "5", text: "Fastify packages the data as JSON and responds", tag: "Fastify \u2192 React", colorId: "server" },
  { step: "6", text: "React updates the page with the new data", tag: "React", colorId: "frontend" },
]

/* ───────────────────────── STACK DATA ───────────────────────── */

export const STACK_PAGES: StackPageData[] = [
  /* ── MERN ─────────────────────────────────────── */
  {
    id: "mern",
    name: "MERN",
    pieces: ["MongoDB", "Express", "React", "Node.js"],
    overview: "The MERN stack \u2014 MongoDB, Express, React, and Node.js \u2014 is the most popular all-JavaScript full-stack combination. Every layer uses JavaScript, meaning you only need one language for the entire application. It\u2019s the go-to choice for tutorials, bootcamps, and rapid prototyping.",
    color: "#e11d48",
    accent: "#fff1f2",
    darkAccent: "#4c0519",
    components: [
      {
        id: "frontend", name: "React", role: "Frontend",
        icon: "\u{1F3A8}", color: "#7c3aed", accent: "#ede9fe", darkAccent: "#2e1065",
        purpose: "The frontend library builds everything the user sees and interacts with \u2014 buttons, forms, pages, animations. It takes raw data from the server and turns it into a visual, interactive experience in the browser.",
        description: "React (by Meta) lets you build UIs out of reusable \u2018components\u2019 \u2014 small building blocks like a search bar, a card, or a navigation menu. You compose these together like LEGO bricks to build complex interfaces. React uses a \u2018virtual DOM\u2019 to efficiently update only the parts of the page that change, making it fast even for complex UIs.",
        keyFeatures: [
          "Component-based \u2014 break UIs into small, reusable pieces",
          "Virtual DOM \u2014 efficiently updates only what changed on the page",
          "Massive ecosystem \u2014 thousands of community libraries for everything from forms to animations",
          "One-way data flow \u2014 predictable data movement makes debugging easier",
        ],
        analogy: "React is like LEGO bricks \u2014 small standardized pieces that snap together to build anything from a simple wall to an elaborate castle.",
      },
      {
        id: "server", name: "Express", role: "Server Framework",
        icon: "\u26A1", color: "#059669", accent: "#d1fae5", darkAccent: "#022c22",
        purpose: "The server framework handles incoming requests from the browser, processes them, and sends back responses. It\u2019s the traffic controller between your frontend and your database.",
        description: "Express is the most popular Node.js server framework. Created in 2010, it\u2019s minimal and unopinionated \u2014 it gives you the basics (routing, middleware) and lets you add whatever else you need via plugins. Think of it as a blank canvas: flexible, but you need to set up everything yourself.",
        keyFeatures: [
          "Minimal and unopinionated \u2014 gives you freedom to structure your app however you want",
          "Massive middleware ecosystem \u2014 thousands of plugins for auth, logging, CORS, and more",
          "Proven and battle-tested \u2014 the most used Node.js framework for over a decade",
          "Easy learning curve \u2014 simple API that\u2019s quick to pick up for beginners",
        ],
        analogy: "Express is like a bicycle \u2014 simple, reliable, and easy to learn. It won\u2019t go as fast as fancier options, but it gets you where you need to go with minimal fuss.",
      },
      {
        id: "runtime", name: "Node.js", role: "Runtime",
        icon: "\u{1F527}", color: "#ca8a04", accent: "#fef9c3", darkAccent: "#422006",
        purpose: "The runtime is the engine that executes your server-side code. Without it, JavaScript could only run in a browser \u2014 Node.js lets you run JavaScript on a server.",
        description: "Node.js is a JavaScript runtime built on Chrome\u2019s V8 engine. It\u2019s event-driven and non-blocking, meaning it can handle many simultaneous connections efficiently \u2014 perfect for real-time apps like chat. Node.js is what makes the \u2018all JavaScript, all the time\u2019 dream possible: one language for frontend, backend, and tooling.",
        keyFeatures: [
          "One language everywhere \u2014 JavaScript on both frontend and backend",
          "Non-blocking I/O \u2014 handles many concurrent connections efficiently",
          "npm ecosystem \u2014 the world\u2019s largest package registry with millions of packages",
          "Great for real-time apps \u2014 chat, live updates, streaming",
        ],
        analogy: "Node.js is like electricity in a building. You can swap out appliances (Express, Fastify) or rearrange furniture (MongoDB, PostgreSQL), but they all run on the same power.",
      },
      {
        id: "database", name: "MongoDB", role: "Database",
        icon: "\u{1F5C4}\uFE0F", color: "#2563eb", accent: "#dbeafe", darkAccent: "#172554",
        purpose: "The database stores all your application\u2019s data \u2014 users, posts, orders \u2014 so it persists even when the server restarts. Without a database, everything vanishes when you close the app.",
        description: "MongoDB is a NoSQL database that stores data as flexible JSON-like documents \u2014 think of it like tossing papers into labeled folders. You don\u2019t need to define a rigid structure (schema) upfront, making it perfect for rapid prototyping and projects where the data shape evolves frequently.",
        keyFeatures: [
          "Flexible schema \u2014 no need to define data structure upfront",
          "JSON-like documents \u2014 data format matches JavaScript objects naturally",
          "Great for prototyping \u2014 quick to get started without planning table structures",
          "Horizontal scaling \u2014 designed to distribute data across multiple servers",
        ],
        analogy: "MongoDB is like a filing cabinet where you can toss in any paper in any format. It\u2019s fast and flexible, but if you\u2019re not organized, finding things later can get messy.",
      },
    ],
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
    bestFor: "Learning full-stack JavaScript, rapid prototyping, building MVPs, and projects where data relationships are simple. If you\u2019re new to web development and want one language for everything, MERN is the most well-documented starting point.",
  },

  /* ── PFRN ─────────────────────────────────────── */
  {
    id: "pfrn",
    name: "PFRN (This Guide)",
    pieces: ["PostgreSQL", "Fastify", "React", "Node.js"],
    overview: "The PFRN stack is a modified version of MERN that swaps MongoDB for PostgreSQL (a more structured database) and Express for Fastify (a faster server framework), while keeping React and Node.js the same. This shows a key architecture principle: you can swap individual layers without rewriting everything else.",
    color: "#7c3aed",
    accent: "#f5f3ff",
    darkAccent: "#1e1b4b",
    components: [
      {
        id: "frontend", name: "React", role: "Frontend",
        icon: "\u{1F3A8}", color: "#7c3aed", accent: "#ede9fe", darkAccent: "#2e1065",
        purpose: "The frontend library builds everything the user actually sees and interacts with \u2014 buttons, forms, pages, animations. It takes raw data from the server and turns it into a visual, interactive experience in the browser.",
        description: "React (by Meta) lets you build UIs out of reusable \u2018components\u2019 \u2014 small building blocks like a search bar, a card, or a navigation menu. You compose these together like LEGO bricks to build complex interfaces. It uses a \u2018virtual DOM\u2019 to efficiently update only the parts of the page that change. React stays the same in both the traditional and modified stack \u2014 it\u2019s backend-agnostic. Your React components don\u2019t care if data comes from MongoDB or PostgreSQL, or whether the server runs Express or Fastify. The API contract (the shape of data exchanged) is what matters.",
        keyFeatures: [
          "No change needed \u2014 React works with any backend",
          "This demonstrates a key architecture principle: layers should be independent",
          "Your UI code doesn\u2019t need to know anything about the database",
        ],
        analogy: "React is like the interior design of a restaurant. Customers interact with the menu, decor, and table layout. They don\u2019t know or care whether the kitchen uses a gas stove or an induction cooktop.",
        changed: false,
        traditionalName: "React",
      },
      {
        id: "server", name: "Fastify", role: "Server Framework",
        icon: "\u26A1", color: "#059669", accent: "#d1fae5", darkAccent: "#022c22",
        purpose: "The server framework is the \u2018traffic controller\u2019 of your app. When someone visits a URL or submits a form, the server decides what to do: fetch data from the database, process it, and send back a response. It\u2019s the bridge between your frontend and your database.",
        description: "Fastify is a newer, faster alternative to Express. It\u2019s built for performance and comes with more built-in features like request validation (checking that incoming data looks right) and automatic API documentation. Think of it like a modern kitchen that comes pre-equipped with high-end appliances.",
        keyFeatures: [
          "Significantly faster \u2014 Fastify handles more requests per second than Express",
          "Built-in schema validation \u2014 automatically checks that API requests have the right shape",
          "Plugin architecture \u2014 cleaner way to organize and share code across your app",
          "Slightly steeper initial learning curve, but more structure encourages better patterns",
        ],
        analogy: "Express is like a bicycle \u2014 simple, reliable, easy to learn. Fastify is like an electric bike \u2014 faster out of the box, more features, but you need to understand a few more controls.",
        changed: true,
        traditionalName: "Express",
        traditionalDesc: "Express is the most popular Node.js server framework. It\u2019s minimal and unopinionated \u2014 it gives you the basics and lets you add whatever you need via middleware (plugins). Think of it like a blank kitchen: you bring your own tools. It\u2019s been around since 2010 and has a massive ecosystem.",
        modifiedDesc: "Fastify is a newer, faster alternative to Express. It\u2019s built for performance and comes with more built-in features like request validation (checking that incoming data looks right) and automatic API documentation. Think of it like a modern kitchen that comes pre-equipped with high-end appliances.",
      },
      {
        id: "runtime", name: "Node.js", role: "Runtime",
        icon: "\u{1F527}", color: "#ca8a04", accent: "#fef9c3", darkAccent: "#422006",
        purpose: "The runtime is the engine that makes everything else possible. JavaScript was originally built only for browsers. Node.js lets you run JavaScript on a server \u2014 meaning you can use one language for your entire application, frontend and backend.",
        description: "Node.js is a JavaScript runtime built on Chrome\u2019s V8 engine. It\u2019s event-driven and non-blocking, which means it can handle many simultaneous connections efficiently \u2014 great for real-time apps like chat. It\u2019s the foundation that both Express and Fastify run on. Swapping Express for Fastify doesn\u2019t change this layer at all, because both are Node.js frameworks. Node.js is what unifies the entire stack under one language.",
        keyFeatures: [
          "No change needed \u2014 Fastify runs on Node.js just like Express does",
          "One language (JavaScript/TypeScript) across the entire stack",
          "Massive npm ecosystem with packages for virtually anything",
        ],
        analogy: "Node.js is like electricity in a building. You can swap out appliances (Express \u2192 Fastify) or rearrange the storage room (MongoDB \u2192 PostgreSQL), but they all still run on the same power.",
        changed: false,
        traditionalName: "Node.js",
      },
      {
        id: "database", name: "PostgreSQL", role: "Database",
        icon: "\u{1F5C4}\uFE0F", color: "#2563eb", accent: "#dbeafe", darkAccent: "#172554",
        purpose: "The database is your app\u2019s long-term memory. It stores all your data \u2014 users, posts, orders, anything \u2014 so it persists even when the server restarts. Without it, every piece of information would vanish the moment you close the app.",
        description: "PostgreSQL is a relational (SQL) database. It stores data in structured tables with rows and columns \u2014 like a spreadsheet. You define the shape of your data upfront (a \u2018schema\u2019). This makes relationships between data very clean and enforces data integrity, meaning it\u2019s much harder to accidentally save bad data.",
        keyFeatures: [
          "Stronger data integrity \u2014 PostgreSQL enforces rules about what data is valid",
          "Better for complex queries \u2014 joins, aggregations, and filtering are first-class features",
          "Requires more upfront planning \u2014 you need to design your table structure before writing data",
          "Industry standard for production apps \u2014 banks, governments, and most enterprises use relational DBs",
        ],
        analogy: "MongoDB is like a filing cabinet where you can toss in any paper. PostgreSQL is like a well-organized spreadsheet \u2014 every column is labeled, and it won\u2019t let you put a name where a number should go.",
        changed: true,
        traditionalName: "MongoDB",
        traditionalDesc: "MongoDB is a NoSQL database. It stores data as flexible JSON-like documents \u2014 think of it like tossing papers into labeled folders. You don\u2019t need to define a rigid structure upfront. Great for rapid prototyping, but relationships between data (like \u2018this user owns these orders\u2019) can get messy.",
        modifiedDesc: "PostgreSQL is a relational (SQL) database. It stores data in structured tables with rows and columns \u2014 like a spreadsheet. You define the shape of your data upfront (a \u2018schema\u2019). This makes relationships between data very clean and enforces data integrity, meaning it\u2019s much harder to accidentally save bad data.",
      },
    ],
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
    bestFor: "Production applications that need reliable data integrity and higher performance. If you already know MERN and want to level up, PFRN teaches you the patterns used by most professional teams.",
  },

  /* ── MEAN ─────────────────────────────────────── */
  {
    id: "mean",
    name: "MEAN",
    pieces: ["MongoDB", "Express", "Angular", "Node.js"],
    overview: "The MEAN stack swaps React for Angular \u2014 Google\u2019s full-featured frontend framework. While React is a library that lets you choose your own tools, Angular is an all-in-one framework with routing, forms, HTTP, and more built in. Everything else stays the same as MERN.",
    color: "#dc2626",
    accent: "#fef2f2",
    darkAccent: "#450a0a",
    components: [
      {
        id: "frontend", name: "Angular", role: "Frontend",
        icon: "\u{1F3A8}", color: "#dc2626", accent: "#fef2f2", darkAccent: "#450a0a",
        purpose: "The frontend framework builds the user interface. Unlike React (a library), Angular is a complete framework with routing, forms, HTTP client, and more built in \u2014 no need to choose and install separate packages.",
        description: "Angular (by Google) is a full-featured frontend framework written in TypeScript. While React gives you building blocks and lets you choose your own tools, Angular is an all-in-one solution \u2014 it includes routing, form handling, an HTTP client, dependency injection, and more out of the box. This makes it opinionated but consistent across teams.",
        keyFeatures: [
          "Full framework \u2014 routing, forms, HTTP, and testing built in",
          "TypeScript-first \u2014 strong typing is built into the framework from the ground up",
          "Two-way data binding \u2014 UI automatically syncs with data changes in both directions",
          "Dependency injection \u2014 built-in system for managing dependencies and testability",
        ],
        analogy: "Angular is like a fully furnished apartment \u2014 everything is included and arranged for you. It\u2019s convenient, but you can\u2019t easily rearrange the walls.",
      },
      {
        id: "server", name: "Express", role: "Server Framework",
        icon: "\u26A1", color: "#059669", accent: "#d1fae5", darkAccent: "#022c22",
        purpose: "The server framework handles incoming requests from the browser, processes them, and sends back responses. It\u2019s the traffic controller between your frontend and your database.",
        description: "Express is the most popular Node.js server framework. Created in 2010, it\u2019s minimal and unopinionated \u2014 it gives you the basics (routing, middleware) and lets you add whatever else you need via plugins. Think of it as a blank canvas: flexible, but you need to set up everything yourself.",
        keyFeatures: [
          "Minimal and unopinionated \u2014 gives you freedom to structure your app however you want",
          "Massive middleware ecosystem \u2014 thousands of plugins for auth, logging, CORS, and more",
          "Proven and battle-tested \u2014 the most used Node.js framework for over a decade",
          "Easy learning curve \u2014 simple API that\u2019s quick to pick up for beginners",
        ],
        analogy: "Express is like a bicycle \u2014 simple, reliable, and easy to learn. It won\u2019t go as fast as fancier options, but it gets you where you need to go with minimal fuss.",
      },
      {
        id: "runtime", name: "Node.js", role: "Runtime",
        icon: "\u{1F527}", color: "#ca8a04", accent: "#fef9c3", darkAccent: "#422006",
        purpose: "The runtime is the engine that executes your server-side code. Without it, JavaScript could only run in a browser \u2014 Node.js lets you run JavaScript on a server.",
        description: "Node.js is a JavaScript runtime built on Chrome\u2019s V8 engine. It\u2019s event-driven and non-blocking, meaning it can handle many simultaneous connections efficiently \u2014 perfect for real-time apps like chat. Node.js is what makes the \u2018all JavaScript, all the time\u2019 dream possible.",
        keyFeatures: [
          "One language everywhere \u2014 JavaScript on both frontend and backend",
          "Non-blocking I/O \u2014 handles many concurrent connections efficiently",
          "npm ecosystem \u2014 the world\u2019s largest package registry with millions of packages",
          "Great for real-time apps \u2014 chat, live updates, streaming",
        ],
        analogy: "Node.js is like electricity in a building. You can swap out appliances (Express, Fastify) or rearrange furniture (MongoDB, PostgreSQL), but they all run on the same power.",
      },
      {
        id: "database", name: "MongoDB", role: "Database",
        icon: "\u{1F5C4}\uFE0F", color: "#2563eb", accent: "#dbeafe", darkAccent: "#172554",
        purpose: "The database stores all your application\u2019s data so it persists even when the server restarts. MongoDB\u2019s flexible document model pairs well with JavaScript\u2019s object-based data format.",
        description: "MongoDB is a NoSQL database that stores data as flexible JSON-like documents. You don\u2019t need to define a rigid structure (schema) upfront, making it quick to get started. The data format naturally matches JavaScript objects, so there\u2019s minimal translation between your code and your database.",
        keyFeatures: [
          "Flexible schema \u2014 no need to define data structure upfront",
          "JSON-like documents \u2014 data format matches JavaScript objects naturally",
          "Great for prototyping \u2014 quick to get started without planning table structures",
          "Horizontal scaling \u2014 designed to distribute data across multiple servers",
        ],
        analogy: "MongoDB is like a filing cabinet where you can toss in any paper in any format. It\u2019s fast and flexible, but if you\u2019re not organized, finding things later can get messy.",
      },
    ],
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
    bestFor: "Large enterprise teams that want a highly structured, opinionated frontend framework. Angular\u2019s built-in tooling and conventions keep big codebases consistent across many developers.",
  },

  /* ── LAMP ─────────────────────────────────────── */
  {
    id: "lamp",
    name: "LAMP",
    pieces: ["Linux", "Apache", "MySQL", "PHP"],
    overview: "The LAMP stack powered most of the early internet and remains one of the most deployed stacks worldwide. WordPress (43% of all websites), Facebook (originally), and Wikipedia all run on it. Unlike JavaScript stacks, LAMP uses PHP on the server and renders HTML directly \u2014 no separate frontend framework needed.",
    color: "#ea580c",
    accent: "#fff7ed",
    darkAccent: "#431407",
    components: [
      {
        id: "frontend", name: "PHP Templates", role: "Frontend (Server-Rendered)",
        icon: "\u{1F3A8}", color: "#7c3aed", accent: "#ede9fe", darkAccent: "#2e1065",
        purpose: "PHP generates HTML on the server and sends complete pages to the browser. There\u2019s no separate frontend framework \u2014 the server builds the entire page before the user sees it.",
        description: "In a LAMP stack, the \u2018frontend\u2019 is server-rendered HTML generated by PHP. When a user requests a page, PHP executes on the server, queries the database, builds the HTML, and sends the finished page to the browser. This is fundamentally different from React/Angular where the browser builds the page. PHP can be embedded directly in HTML files, mixing presentation and logic in one place.",
        keyFeatures: [
          "Server-side rendering \u2014 complete HTML pages sent to the browser, no JavaScript required",
          "PHP embedded in HTML \u2014 mix logic and presentation in a single file",
          "No build step \u2014 edit a file, refresh the browser, see the change immediately",
          "Works everywhere \u2014 virtually every web host supports PHP out of the box",
        ],
        analogy: "Server-rendered PHP is like a restaurant where the chef prepares your complete meal in the kitchen and brings it out ready to eat. React/Angular are like a build-your-own-bowl bar where ingredients are brought to your table and assembled in front of you.",
      },
      {
        id: "server", name: "Apache", role: "Web Server",
        icon: "\u{1F310}", color: "#059669", accent: "#d1fae5", darkAccent: "#022c22",
        purpose: "The web server listens for HTTP requests, decides how to handle them, and sends responses back. Apache serves static files directly and passes dynamic requests to PHP for processing.",
        description: "Apache HTTP Server is one of the oldest and most popular web servers, powering a huge portion of the internet since 1995. It uses a module-based architecture and supports .htaccess files for per-directory configuration, making it flexible for shared hosting environments where you can\u2019t edit the main server config.",
        keyFeatures: [
          "Module-based architecture \u2014 extend functionality with loadable modules",
          ".htaccess support \u2014 configure behavior per directory without restarting the server",
          "Virtual hosts \u2014 serve multiple websites from a single server",
          "Battle-tested since 1995 \u2014 extremely well documented and understood",
        ],
        analogy: "Apache is like a hotel receptionist \u2014 it greets every visitor, figures out what they need, and directs them to the right room (or handles the request itself).",
      },
      {
        id: "database", name: "MySQL", role: "Database",
        icon: "\u{1F5C4}\uFE0F", color: "#2563eb", accent: "#dbeafe", darkAccent: "#172554",
        purpose: "The relational database stores all your application\u2019s data in structured tables with rows and columns, enforcing consistency through a defined schema.",
        description: "MySQL is the world\u2019s most popular open-source relational database. It stores data in structured tables with defined columns and data types. Unlike MongoDB\u2019s flexible documents, MySQL requires you to define your data structure upfront \u2014 but this means your data is always consistent and valid.",
        keyFeatures: [
          "Relational model \u2014 data stored in structured tables with defined relationships",
          "SQL queries \u2014 powerful, standardized query language for data retrieval",
          "ACID compliant \u2014 transactions are reliable and data stays consistent",
          "Widely supported \u2014 available on virtually every hosting platform",
        ],
        analogy: "MySQL is like a well-organized spreadsheet \u2014 every column is labeled, every row follows the rules, and it won\u2019t let you put a name where a number should go.",
      },
      {
        id: "runtime", name: "Linux", role: "Operating System",
        icon: "\u{1F427}", color: "#ca8a04", accent: "#fef9c3", darkAccent: "#422006",
        purpose: "The operating system is the foundation that runs everything else. Linux provides the file system, networking, process management, and security that Apache, MySQL, and PHP all depend on.",
        description: "Linux is the open-source operating system that runs the majority of web servers worldwide. It\u2019s free, stable, highly configurable, and available everywhere from tiny embedded devices to massive cloud servers. In the LAMP stack, Linux is the foundation layer that all other components run on.",
        keyFeatures: [
          "Open source and free \u2014 no licensing costs for servers",
          "Incredibly stable \u2014 servers often run for years without needing a restart",
          "Highly configurable \u2014 customize everything from the kernel up",
          "Industry standard \u2014 runs the vast majority of web servers worldwide",
        ],
        analogy: "Linux is like the foundation of a house \u2014 you don\u2019t think about it much, but everything sits on top of it. If it\u2019s solid, everything above it runs smoothly.",
      },
    ],
    pros: [
      "Battle-tested for decades \u2014 extremely well understood and documented",
      "Cheap, widely available hosting everywhere",
      "WordPress (43% of the web) runs on LAMP",
      "MySQL is a proven, reliable relational database",
    ],
    cons: [
      "PHP is less popular with new developers compared to JavaScript or Python",
      "Two languages (PHP backend + JavaScript frontend) if you add interactivity",
      "Apache is slower than modern alternatives like Nginx for static content",
      "Less suited for real-time apps (chat, live updates) compared to Node.js",
    ],
    bestFor: "Content-driven websites, WordPress sites, and projects where cheap shared hosting is important. LAMP is also a great choice when you need a proven, well-understood stack with decades of community knowledge.",
  },

  /* ── Django Stack ─────────────────────────────── */
  {
    id: "django",
    name: "Django Stack",
    pieces: ["PostgreSQL", "Django", "React/Vue", "Python"],
    overview: "The Django stack pairs Python\u2019s most popular web framework with a modern JavaScript frontend. Django follows the \u2018batteries included\u2019 philosophy \u2014 it comes with an admin panel, ORM, authentication, and security protections built in. If you know Python, Django gets you from zero to production faster than almost anything else.",
    color: "#16a34a",
    accent: "#f0fdf4",
    darkAccent: "#052e16",
    components: [
      {
        id: "frontend", name: "React / Vue", role: "Frontend",
        icon: "\u{1F3A8}", color: "#7c3aed", accent: "#ede9fe", darkAccent: "#2e1065",
        purpose: "The frontend framework builds the user interface as a single-page application (SPA) that communicates with the Django backend through a REST or GraphQL API.",
        description: "In a Django stack, the frontend is typically a separate React or Vue.js application. Django serves as a pure API backend, and the frontend makes HTTP requests to fetch and send data. This separation gives you the full power of a modern JavaScript UI framework while keeping Python on the backend.",
        keyFeatures: [
          "Separate SPA \u2014 frontend and backend are independent, deployable applications",
          "API-driven \u2014 communicates with Django through REST or GraphQL endpoints",
          "Full interactivity \u2014 rich, responsive UIs without full page reloads",
          "Choice of framework \u2014 React, Vue, or even Angular can fill this role",
        ],
        analogy: "The frontend is like a restaurant\u2019s dining room \u2014 a completely separate space from the kitchen (Django), connected only by the waiters (API calls) who carry orders and food back and forth.",
      },
      {
        id: "server", name: "Django", role: "Server Framework",
        icon: "\u26A1", color: "#059669", accent: "#d1fae5", darkAccent: "#022c22",
        purpose: "The \u2018batteries included\u2019 web framework handles routing, database queries, authentication, and admin interfaces \u2014 with most features built in rather than bolted on.",
        description: "Django is a high-level Python web framework that follows the \u2018batteries included\u2019 philosophy. It comes with a built-in admin panel, ORM (database abstraction), authentication system, form handling, and security protections. Django encourages rapid development by providing sensible defaults for everything.",
        keyFeatures: [
          "Built-in admin panel \u2014 auto-generated interface for managing your data",
          "ORM included \u2014 query databases using Python instead of raw SQL",
          "Authentication built in \u2014 user registration, login, permissions out of the box",
          "Strong security defaults \u2014 protection against CSRF, XSS, SQL injection by default",
        ],
        analogy: "Django is like a pre-built kitchen with all appliances included \u2014 oven, fridge, dishwasher, everything. You can start cooking immediately instead of shopping for each appliance.",
      },
      {
        id: "runtime", name: "Python", role: "Language & Runtime",
        icon: "\u{1F40D}", color: "#ca8a04", accent: "#fef9c3", darkAccent: "#422006",
        purpose: "The programming language that powers the server. Python\u2019s clean syntax, vast standard library, and dominance in data science make it an excellent choice for backend development.",
        description: "Python is a general-purpose programming language known for its readable, clean syntax. It\u2019s the most popular language for data science, machine learning, and automation \u2014 and Django makes it equally powerful for web development. Unlike JavaScript stacks, Python backends require a separate language for the frontend.",
        keyFeatures: [
          "Clean, readable syntax \u2014 code reads almost like English",
          "Data science powerhouse \u2014 seamlessly integrate ML models and data pipelines",
          "Vast standard library \u2014 \u2018batteries included\u2019 at the language level too",
          "Huge community \u2014 one of the most popular languages worldwide",
        ],
        analogy: "Python is like English among programming languages \u2014 widely understood, relatively easy to read, and useful in almost any context.",
      },
      {
        id: "database", name: "PostgreSQL", role: "Database",
        icon: "\u{1F5C4}\uFE0F", color: "#2563eb", accent: "#dbeafe", darkAccent: "#172554",
        purpose: "The relational database stores all your application data in structured tables, enforcing data integrity through schemas, constraints, and relationships.",
        description: "PostgreSQL is an advanced open-source relational database known for its reliability, feature richness, and standards compliance. It supports complex queries, full-text search, JSON data, and advanced features like window functions and CTEs. Django\u2019s ORM works especially well with PostgreSQL.",
        keyFeatures: [
          "Advanced features \u2014 full-text search, JSON columns, window functions",
          "Strong data integrity \u2014 constraints, foreign keys, and transactions keep data consistent",
          "Extensible \u2014 add custom types, functions, and even languages",
          "Django\u2019s recommended database \u2014 best supported and most feature-complete integration",
        ],
        analogy: "PostgreSQL is like a well-organized library catalog \u2014 every book is categorized, cross-referenced, and easy to find, with strict rules about how things are filed.",
      },
    ],
    pros: [
      "Django includes admin panel, auth, ORM \u2014 huge time saver",
      "Python is widely known and excellent for data/ML integration",
      "PostgreSQL gives you strong data integrity",
      "Great security defaults out of the box",
    ],
    cons: [
      "Two languages (Python backend + JavaScript frontend)",
      "Django\u2019s opinionated structure can feel restrictive",
      "Slower runtime performance than Node.js for I/O-heavy workloads",
      "Smaller real-time / WebSocket ecosystem compared to Node.js",
    ],
    bestFor: "Teams that already know Python, projects that need data science / ML integration, and applications that benefit from Django\u2019s built-in admin panel and auth system. Excellent for internal tools and admin dashboards.",
  },

  /* ── Rails Stack ──────────────────────────────── */
  {
    id: "rails",
    name: "Rails Stack",
    pieces: ["PostgreSQL", "Ruby on Rails", "Hotwire/React", "Ruby"],
    overview: "The Rails stack is built around Ruby on Rails \u2014 a framework famous for \u2018convention over configuration\u2019 and developer happiness. GitHub, Shopify, and Basecamp were built with it. Rails makes hundreds of decisions for you so you can focus on building features instead of setting up boilerplate.",
    color: "#b91c1c",
    accent: "#fef2f2",
    darkAccent: "#450a0a",
    components: [
      {
        id: "frontend", name: "Hotwire / React", role: "Frontend",
        icon: "\u{1F3A8}", color: "#7c3aed", accent: "#ede9fe", darkAccent: "#2e1065",
        purpose: "The frontend approach handles what the user sees and interacts with. Rails offers Hotwire for server-driven interactivity or React for rich client-side applications.",
        description: "Rails offers two frontend approaches: Hotwire (Turbo + Stimulus) sends HTML from the server and uses minimal JavaScript for interactivity \u2014 great for CRUD apps and content sites. For complex UIs, React can be integrated as a separate SPA that talks to Rails as an API backend.",
        keyFeatures: [
          "Hotwire \u2014 server-rendered HTML with smart page updates, minimal JavaScript needed",
          "Turbo Frames \u2014 update parts of a page without full reloads",
          "Stimulus \u2014 lightweight JavaScript for adding behavior to server-rendered HTML",
          "React option \u2014 integrate a full SPA for complex frontend needs",
        ],
        analogy: "Hotwire is like a speed boat \u2014 simpler and often fast enough for the journey. React is like a helicopter \u2014 more powerful and complex, but necessary for some destinations.",
      },
      {
        id: "server", name: "Ruby on Rails", role: "Server Framework",
        icon: "\u26A1", color: "#b91c1c", accent: "#fef2f2", darkAccent: "#450a0a",
        purpose: "The \u2018convention over configuration\u2019 framework makes hundreds of decisions for you, so you can focus on building features instead of setting up boilerplate.",
        description: "Ruby on Rails (or just \u2018Rails\u2019) is a web framework famous for developer productivity and happiness. It follows \u2018convention over configuration\u2019 \u2014 if you follow Rails\u2019 conventions, most things just work without explicit setup. Rails includes an ORM (ActiveRecord), routing, testing framework, email handling, and more.",
        keyFeatures: [
          "Convention over configuration \u2014 follow the conventions and things just work",
          "Incredibly mature ecosystem \u2014 gems (packages) for virtually everything",
          "Rapid development \u2014 scaffold entire features with a single command",
          "Full-stack by default \u2014 includes everything from database to frontend",
        ],
        analogy: "Rails is like a high-speed train \u2014 it makes the route decisions for you, and as long as you stay on the tracks, you move incredibly fast.",
      },
      {
        id: "runtime", name: "Ruby", role: "Language & Runtime",
        icon: "\u{1F48E}", color: "#ca8a04", accent: "#fef9c3", darkAccent: "#422006",
        purpose: "The programming language designed for developer happiness. Ruby\u2019s elegant, readable syntax and powerful metaprogramming make it uniquely expressive.",
        description: "Ruby is a dynamic programming language designed by Yukihiro \u2018Matz\u2019 Matsumoto with a focus on simplicity and productivity. It has an elegant syntax that reads naturally and is often described as \u2018a joy to write.\u2019 Ruby\u2019s metaprogramming capabilities power much of Rails\u2019 \u2018magic\u2019 \u2014 the convention-based behavior that makes things work automatically.",
        keyFeatures: [
          "Designed for developer happiness \u2014 elegant, readable syntax",
          "Powerful metaprogramming \u2014 code that writes code (powers Rails\u2019 magic)",
          "Gem ecosystem \u2014 thousands of community packages for any need",
          "Expressive \u2014 often fewer lines of code needed than other languages",
        ],
        analogy: "Ruby is like a luxury car \u2014 beautifully designed and a joy to drive. It might not win every drag race, but the driving experience is unmatched.",
      },
      {
        id: "database", name: "PostgreSQL", role: "Database",
        icon: "\u{1F5C4}\uFE0F", color: "#2563eb", accent: "#dbeafe", darkAccent: "#172554",
        purpose: "The relational database stores all your application data. Rails\u2019 ActiveRecord ORM makes PostgreSQL feel natural to use from Ruby code.",
        description: "PostgreSQL is the default and recommended database for Rails applications. Rails\u2019 ActiveRecord ORM maps Ruby objects to database tables, so you rarely write raw SQL. PostgreSQL\u2019s advanced features like JSONB columns, full-text search, and array types are all accessible through ActiveRecord.",
        keyFeatures: [
          "Rails\u2019 recommended database \u2014 best supported with ActiveRecord ORM",
          "Migrations built in \u2014 Rails manages database schema changes automatically",
          "Advanced features \u2014 JSONB, arrays, full-text search, all accessible from Ruby",
          "Strong data integrity \u2014 constraints and transactions keep data consistent",
        ],
        analogy: "PostgreSQL with Rails is like a well-organized warehouse with a smart inventory system \u2014 Rails (the system) knows exactly where everything is stored and can find it instantly.",
      },
    ],
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
    bestFor: "Rapid MVP development, CRUD-heavy applications, startups that need to ship fast, and teams that value developer happiness and clean code. If your app is primarily forms, dashboards, and data management, Rails is hard to beat.",
  },
]

/* ───────────────────────── FRAMEWORK DATA ───────────────────────── */

export const FRAMEWORK_PAGES: FrameworkPageData[] = [
  /* ── Next.js ─────────────────────────────────────── */
  {
    id: "nextjs",
    name: "Next.js",
    tagline: "The React meta-framework by Vercel",
    overview: "Next.js is the most popular React framework. It adds server-side rendering, file-system routing, API routes, and optimized builds on top of React. Developed by Vercel, it\u2019s become the default way to build production React apps \u2014 used by Netflix, TikTok, and Notion.",
    color: "#000000",
    accent: "#f5f5f5",
    darkAccent: "#171717",
    builtOn: ["React", "Node.js"],
    capabilities: [
      {
        id: "rendering",
        name: "Rendering Strategies",
        icon: "\u{1F5A5}\uFE0F",
        description: "Next.js supports multiple rendering strategies in a single app: Server-Side Rendering (SSR) generates HTML on each request, Static Site Generation (SSG) pre-builds pages at build time, and the App Router introduces React Server Components (RSC) that render on the server without sending JavaScript to the client.",
        keyPoints: [
          "SSR \u2014 HTML generated per-request, great for dynamic content",
          "SSG \u2014 HTML pre-built at build time, fastest possible load times",
          "React Server Components \u2014 server-only rendering that reduces client JavaScript",
          "Mix and match \u2014 different pages can use different strategies",
        ],
      },
      {
        id: "routing",
        name: "File-System Routing",
        icon: "\u{1F4C1}",
        description: "Instead of manually defining routes, Next.js maps your file structure to URL paths. Create a file at app/dashboard/page.tsx and it automatically becomes /dashboard. Nested folders create nested routes, and special files (layout.tsx, loading.tsx, error.tsx) handle common patterns.",
        keyPoints: [
          "Zero-config routing \u2014 file structure = URL structure",
          "Nested layouts \u2014 shared UI across route segments",
          "Loading and error states \u2014 built-in per-route",
          "Dynamic routes \u2014 [id] folder conventions for parameterized URLs",
        ],
      },
      {
        id: "data",
        name: "Data Fetching",
        icon: "\u{1F504}",
        description: "Next.js provides server-side data fetching using async Server Components. You can fetch data directly inside components that run on the server, eliminating the need for separate API endpoints for your own frontend. Data is fetched before HTML is sent to the client.",
        keyPoints: [
          "Server Components fetch data directly \u2014 no useEffect or client-side loading spinners",
          "Server Actions \u2014 call server-side functions from client components like RPC",
          "Automatic request deduplication and caching",
          "Streaming \u2014 send parts of the page as they become ready",
        ],
      },
      {
        id: "deployment",
        name: "Deployment & Optimization",
        icon: "\u{1F680}",
        description: "Next.js includes built-in image optimization, font optimization, script loading strategies, and bundle analysis. It deploys seamlessly to Vercel\u2019s platform but also supports self-hosting on any Node.js server or via Docker.",
        keyPoints: [
          "Image component \u2014 automatic resizing, lazy loading, and format conversion",
          "Vercel integration \u2014 zero-config deployment with edge functions",
          "Self-hostable \u2014 works on any Node.js server or Docker container",
          "Bundle optimization \u2014 automatic code splitting per route",
        ],
      },
    ],
    pros: [
      "Most mature React framework \u2014 massive ecosystem, excellent documentation, huge community",
      "Multiple rendering strategies (SSR, SSG, RSC) in one framework",
      "Vercel provides seamless deployment with edge functions and analytics",
      "Built-in optimizations for images, fonts, and scripts out of the box",
    ],
    cons: [
      "Tight coupling with Vercel \u2014 some features work best (or only) on Vercel\u2019s platform",
      "App Router complexity \u2014 React Server Components add a new mental model to learn",
      "Caching behavior can be surprising and hard to debug",
      "Frequent breaking changes between major versions",
    ],
    bestFor: "Production React applications that need SEO, fast initial loads, and a mature ecosystem. Next.js is the safe, well-documented choice for most React projects, especially if you\u2019re deploying to Vercel.",
    analogy: "Next.js is like Spring Boot for React \u2014 it takes the core library and adds all the production infrastructure you\u2019d otherwise assemble yourself: routing, server rendering, build optimization, and deployment tooling.",
  },

  /* ── React Router Framework Mode ─────────────────── */
  {
    id: "react-router",
    name: "React Router Framework Mode",
    tagline: "Full-stack mode of React Router v7",
    overview: "React Router v7 introduced \u2018Framework Mode\u2019 \u2014 transforming the most popular React routing library into a full-stack framework. It\u2019s the spiritual successor to Remix (which merged into React Router), built on web standards like the Fetch API, FormData, and HTTP caching. It\u2019s the web-standards-first alternative to Next.js.",
    color: "#f44250",
    accent: "#fff5f5",
    darkAccent: "#450a0a",
    builtOn: ["React", "Node.js"],
    capabilities: [
      {
        id: "routing",
        name: "Nested Routing",
        icon: "\u{1F9E9}",
        description: "React Router pioneered nested routing in the React ecosystem. In Framework Mode, each route segment can define its own data loader, action handler, and error boundary. The layout hierarchy is explicit, and multiple route segments can load data in parallel.",
        keyPoints: [
          "Nested routes with parallel data loading \u2014 no waterfalls",
          "Each route segment has its own loader, action, and error boundary",
          "URL-based state \u2014 the URL is the primary source of truth",
          "Type-safe route definitions and parameters",
        ],
      },
      {
        id: "data",
        name: "Loaders & Actions",
        icon: "\u{1F504}",
        description: "Data flows through loaders (GET requests) and actions (mutations). Loaders run on the server before rendering, and actions handle form submissions and mutations. This model mirrors how traditional web apps work \u2014 built on web standard Request/Response objects.",
        keyPoints: [
          "Loaders \u2014 server-side functions that provide data for each route",
          "Actions \u2014 handle form submissions and mutations using web standard FormData",
          "Automatic revalidation \u2014 after a mutation, affected loaders re-run automatically",
          "Progressive enhancement \u2014 forms work without JavaScript by default",
        ],
      },
      {
        id: "standards",
        name: "Web Standards",
        icon: "\u{1F310}",
        description: "React Router Framework Mode is built on web platform APIs: Fetch Request/Response, FormData, URL, Headers. Skills you learn transfer directly to other frameworks and to the platform itself. It avoids custom abstractions wherever a web standard exists.",
        keyPoints: [
          "Built on Fetch API Request/Response \u2014 not custom abstractions",
          "FormData for mutations \u2014 standard HTML forms enhanced progressively",
          "HTTP caching headers \u2014 leverage browser and CDN caching natively",
          "Runs on any JavaScript runtime \u2014 Node.js, Deno, Cloudflare Workers",
        ],
      },
      {
        id: "rendering",
        name: "Rendering Modes",
        icon: "\u{1F5A5}\uFE0F",
        description: "React Router supports SSR, static pre-rendering, and SPA mode. You can choose per-route whether to server-render or statically generate, and the SPA mode option lets you use it as a traditional client-side app without a server.",
        keyPoints: [
          "Server rendering \u2014 HTML on each request with hydration",
          "Static pre-rendering \u2014 generate HTML at build time for specific routes",
          "SPA mode \u2014 opt-out of server rendering entirely for traditional SPA deployment",
          "Flexible deployment \u2014 adapters for Node, Cloudflare, Deno, Vercel, and more",
        ],
      },
    ],
    pros: [
      "Web standards first \u2014 skills transfer to the platform and other frameworks",
      "Progressive enhancement \u2014 forms and navigation work without JavaScript",
      "Mature routing library \u2014 React Router has 10+ years of battle-testing",
      "Flexible deployment \u2014 not tied to any specific hosting provider",
    ],
    cons: [
      "Newer framework mode \u2014 smaller community and fewer tutorials than Next.js",
      "Remix-to-React-Router migration caused community confusion",
      "No built-in image optimization or static asset handling like Next.js",
      "Less opinionated \u2014 requires more decisions about project structure",
    ],
    bestFor: "Teams that value web standards, progressive enhancement, and vendor independence. Great if you already use React Router for client-side routing and want to add server rendering without switching to an entirely different framework.",
    analogy: "React Router Framework Mode is like upgrading from Express to Fastify \u2014 you keep the same mental model (routes, middleware, request/response) but gain built-in validation, better performance, and modern patterns. It respects the platform rather than abstracting it away.",
  },

  /* ── TanStack Start ──────────────────────────────── */
  {
    id: "tanstack-start",
    name: "TanStack Start",
    tagline: "Full-stack framework from the TanStack ecosystem",
    overview: "TanStack Start is the newest entry, built by Tanner Linsley (creator of TanStack Query, TanStack Router, and TanStack Table). It combines TanStack Router\u2019s type-safe routing with Vinxi (a Vite-based server framework) to create a full-stack React framework with best-in-class TypeScript support.",
    color: "#e8590c",
    accent: "#fff4ed",
    darkAccent: "#431407",
    builtOn: ["React", "Vite/Vinxi", "Node.js"],
    capabilities: [
      {
        id: "typesafety",
        name: "End-to-End Type Safety",
        icon: "\u{1F512}",
        description: "TanStack Start provides type-safe routing where route parameters, search params, loaders, and actions are all fully typed. TypeScript errors surface at build time if you reference a route that doesn\u2019t exist or pass wrong parameters. No codegen required \u2014 types are inferred from your route definitions.",
        keyPoints: [
          "Route params and search params are fully typed without codegen",
          "Loader return types flow into components automatically",
          "Type-safe navigation \u2014 invalid links are caught at compile time",
          "Leverages TanStack Router\u2019s industry-leading type inference",
        ],
      },
      {
        id: "data",
        name: "Server Functions",
        icon: "\u{1F504}",
        description: "TanStack Start uses \u2018server functions\u2019 \u2014 functions that you write in your component files but execute on the server. They\u2019re similar to Next.js Server Actions but integrated with TanStack Query for caching, invalidation, and optimistic updates.",
        keyPoints: [
          "Server functions \u2014 define server-side logic alongside your components",
          "Built-in TanStack Query integration for caching and state management",
          "Automatic optimistic updates and cache invalidation",
          "RPC-style calls \u2014 call server functions like regular async functions",
        ],
      },
      {
        id: "routing",
        name: "File-Based Routing",
        icon: "\u{1F4C1}",
        description: "Routes are defined in a file-based system with TanStack Router under the hood. The route tree is generated automatically, with full support for nested layouts, parallel data loading, and search parameter validation.",
        keyPoints: [
          "File-based route definitions with automatic tree generation",
          "Nested layouts with parallel data loading",
          "Search parameter validation and serialization built-in",
          "Powered by TanStack Router \u2014 the most type-safe React router",
        ],
      },
      {
        id: "ecosystem",
        name: "TanStack Ecosystem",
        icon: "\u{1F9F1}",
        description: "TanStack Start is designed to work seamlessly with the rest of the TanStack ecosystem: Query for server state, Table for data grids, Form for form handling, and Virtual for large lists. Each library is independent but optimized to work together.",
        keyPoints: [
          "TanStack Query \u2014 built-in integration for server state management",
          "TanStack Table, Form, Virtual \u2014 composable companion libraries",
          "Framework-agnostic design \u2014 potential to support non-React frameworks in the future",
          "Active development with rapid iteration",
        ],
      },
    ],
    pros: [
      "Best-in-class TypeScript support \u2014 end-to-end type safety without codegen",
      "Built on TanStack ecosystem \u2014 best-in-class data fetching, routing, and tables",
      "Vite-powered \u2014 fast development experience with HMR",
      "Smaller, focused API surface \u2014 less to learn compared to Next.js",
    ],
    cons: [
      "Very new \u2014 still in early development, API may change",
      "Smallest community and fewest learning resources of the four",
      "Requires familiarity with TanStack Router and TanStack Query concepts",
      "Production track record is limited compared to Next.js or React Router",
    ],
    bestFor: "TypeScript-heavy teams that want maximum type safety, projects already using TanStack Router or TanStack Query, and developers who want a modern Vite-native framework built from the ground up on current best practices.",
    analogy: "TanStack Start is like building a service with gRPC instead of REST \u2014 you get stronger contracts, better tooling, and end-to-end type safety, but it\u2019s newer and has a smaller ecosystem. It trades community size for technical precision.",
  },

  /* ── Remix ───────────────────────────────────────── */
  {
    id: "remix",
    name: "Remix",
    tagline: "Web standards-focused framework (now part of React Router)",
    overview: "Remix was a pioneering full-stack React framework created by the React Router team (Ryan Florence and Michael Jackson). It championed web standards, progressive enhancement, and nested routing. In 2024, Remix merged into React Router v7 as \u2018Framework Mode\u2019 \u2014 so Remix\u2019s ideas live on, but new projects should use React Router v7 directly.",
    color: "#3992ff",
    accent: "#f0f7ff",
    darkAccent: "#172554",
    builtOn: ["React", "Node.js"],
    capabilities: [
      {
        id: "philosophy",
        name: "Web Standards Philosophy",
        icon: "\u{1F310}",
        description: "Remix was built on a core belief: the web platform already has great APIs, and frameworks should use them rather than invent new ones. This means Fetch API Request/Response objects, standard HTML forms, HTTP caching, and browser-native navigation. Everything you learn transfers to the platform itself.",
        keyPoints: [
          "Built on web standard APIs \u2014 Request, Response, FormData, Headers",
          "Progressive enhancement \u2014 apps work without JavaScript, then enhance",
          "HTTP caching as a first-class optimization strategy",
          "Skills transfer to any web platform or framework",
        ],
      },
      {
        id: "data",
        name: "Loader/Action Pattern",
        icon: "\u{1F504}",
        description: "Remix pioneered the loader/action pattern for React apps: loaders run on the server to provide data for GET requests, and actions handle form submissions (POST/PUT/DELETE). After a mutation, all affected loaders automatically re-run to keep the UI in sync \u2014 no manual cache invalidation.",
        keyPoints: [
          "Loaders \u2014 co-located server-side data fetching for each route",
          "Actions \u2014 handle mutations using standard form submissions",
          "Automatic revalidation \u2014 loaders re-run after mutations",
          "Parallel data loading \u2014 nested routes fetch simultaneously, preventing waterfalls",
        ],
      },
      {
        id: "errors",
        name: "Error Handling",
        icon: "\u{1F6E1}\uFE0F",
        description: "Remix introduced per-route error boundaries: if a nested route crashes, only that section of the page shows an error \u2014 the rest stays functional. This is fundamentally better than full-page error screens and was later adopted by other frameworks.",
        keyPoints: [
          "Per-route error boundaries \u2014 errors are contained, not catastrophic",
          "Graceful degradation \u2014 parent layouts stay functional when child routes fail",
          "Expected errors vs. unexpected errors \u2014 different handling for each",
          "Pattern later adopted by Next.js App Router and other frameworks",
        ],
      },
      {
        id: "legacy",
        name: "Legacy & Migration",
        icon: "\u{1F4E6}",
        description: "Remix v2 was the final standalone release. The team merged Remix into React Router v7, making Framework Mode the official successor. Existing Remix v2 apps can migrate with minimal changes. New projects should start with React Router v7 Framework Mode directly.",
        keyPoints: [
          "Remix ideas live on in React Router v7 Framework Mode",
          "Remix v2 \u2192 React Router v7 migration is mostly mechanical",
          "Existing Remix apps continue to work but won\u2019t receive new features",
          "Understanding Remix helps you understand React Router Framework Mode",
        ],
      },
    ],
    pros: [
      "Pioneered patterns now adopted industry-wide (nested routing, loader/action, per-route errors)",
      "Web standards focus means skills transfer to any framework or the platform",
      "Progressive enhancement \u2014 apps work without JavaScript by default",
      "Clean mental model \u2014 data in (loaders) and data out (actions)",
    ],
    cons: [
      "Merged into React Router v7 \u2014 no longer a standalone framework for new projects",
      "Community fragmented by the Remix \u2192 React Router transition",
      "Fewer tutorials and resources compared to Next.js",
      "Historical context needed \u2014 many Remix resources reference outdated APIs",
    ],
    bestFor: "Understanding the ideas behind modern React frameworks. Even though new projects should use React Router v7, studying Remix teaches you the loader/action pattern, progressive enhancement, and web-standards-first thinking that influenced the entire ecosystem.",
    analogy: "Remix is like the Unix philosophy applied to web frameworks \u2014 small, composable primitives built on the platform. It\u2019s like choosing POSIX-standard tools over vendor-specific CLI tools: you learn transferable skills that work everywhere, not just in one ecosystem.",
  },
]

/* ───────────────────────── NAVIGATION ───────────────────────── */

import type { GuideSection } from './guideTypes'

export const ARCH_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['arch-start', 'arch-what-is-a-stack'] },
  { label: 'Stack Alternatives', ids: [
    'arch-stack-mern', 'arch-stack-pfrn', 'arch-stack-mean',
    'arch-stack-lamp', 'arch-stack-django', 'arch-stack-rails',
  ]},
  { label: 'Full-Stack Frameworks', ids: [
    'arch-frameworks-intro', 'arch-fw-nextjs', 'arch-fw-react-router',
    'arch-fw-tanstack-start', 'arch-fw-remix',
  ]},
  { label: 'Putting It Together', ids: ['arch-how-it-connects'] },
]

export const ARCH_NAV_ORDER = ARCH_GUIDE_SECTIONS.flatMap(s => s.ids)
export const ARCH_PAGE_IDS = new Set(ARCH_NAV_ORDER)
