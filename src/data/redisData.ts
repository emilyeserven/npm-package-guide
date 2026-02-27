import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'
import type { QuizQuestion } from '../components/mdx/QuizBase'

// ── Types ──

export interface RedisDataType {
  id: string
  name: string
  icon: string
  color: string
  darkColor: string
  description: string
  example: string
  useCase: string
  maxSize: string
}

export interface RedisCommand {
  cmd: string
  desc: string
}

export interface RedisCommandCategory {
  category: string
  color: string
  darkColor: string
  commands: RedisCommand[]
}

export interface RedisPattern {
  name: string
  diagram: string[]
  description: string
  pros: string[]
  cons: string[]
  code: string
}

// ── Data Types ──

export const REDIS_DATA_TYPES: RedisDataType[] = [
  {
    id: 'strings',
    name: 'Strings',
    icon: 'Aa',
    color: '#e11d48',
    darkColor: '#fb7185',
    description:
      'Think of it like localStorage.setItem() but on the server. Stores cached API responses, session tokens, feature flags, or any serialized JSON your frontend needs.',
    example:
      'SET api:cache:products \'[{"id":1,"name":"Widget"}]\'\nGET api:cache:products\n\u2192 \'[{"id":1,"name":"Widget"}]\'',
    useCase:
      'Caching the JSON your fetch("/api/products") returns, JWT session tokens, feature flags for A/B tests, page view counters.',
    maxSize: '512 MB per value',
  },
  {
    id: 'lists',
    name: 'Lists',
    icon: '[ ]',
    color: '#d97706',
    darkColor: '#fbbf24',
    description:
      'Like a JavaScript array, but shared across all your server instances. Fast push/pop from both ends, great for ordered collections your UI paginates through.',
    example:
      'LPUSH notifications "New comment on your post"\nLPUSH notifications "New follower"\nLRANGE notifications 0 -1\n\u2192 ["New follower", "New comment on your post"]',
    useCase:
      'Notification feeds, recently viewed items, activity logs your useInfiniteQuery paginates through.',
    maxSize: '4+ billion elements',
  },
  {
    id: 'sets',
    name: 'Sets',
    icon: '{ }',
    color: '#059669',
    darkColor: '#34d399',
    description:
      'Like new Set() in JavaScript \u2014 unique members, no duplicates. Supports intersections, unions, and diffs. O(1) membership checks.',
    example:
      'SADD online:users "user:1" "user:2"\nSADD online:users "user:1"\nSMEMBERS online:users\n\u2192 {"user:1", "user:2"}',
    useCase:
      'Online presence indicators, unique visitor counts, tag filtering for search UIs, mutual friends.',
    maxSize: '4+ billion members',
  },
  {
    id: 'hashes',
    name: 'Hashes',
    icon: '#{}',
    color: '#0284c7',
    darkColor: '#38bdf8',
    description:
      'A JavaScript object stored under a single key. When your dashboard shows a user card with name, avatar, and role, a Hash lets the API fetch all those fields in one call.',
    example:
      'HSET user:1 name "Emily" role "engineer"\nHGETALL user:1\n\u2192 {name: "Emily", role: "engineer"}',
    useCase:
      'User profile cards, product detail pages, dashboard widget data, shopping cart items.',
    maxSize: '4+ billion field-value pairs',
  },
  {
    id: 'sorted-sets',
    name: 'Sorted Sets',
    icon: '\u27E8z\u27E9',
    color: '#7c3aed',
    darkColor: '#a78bfa',
    description:
      'Like Array.sort() that updates automatically. Each member has a numeric score and Redis keeps them in rank order. When your app shows a leaderboard, Sorted Sets power it.',
    example:
      'ZADD leaderboard 9500 "player:1"\nZADD leaderboard 8700 "player:2"\nZRANK leaderboard "player:1"\n\u2192 1 (rank)',
    useCase:
      'Leaderboards your UI renders, trending content feeds, priority-based notification ordering.',
    maxSize: '4+ billion members',
  },
  {
    id: 'streams',
    name: 'Streams',
    icon: '>>',
    color: '#c026d3',
    darkColor: '#e879f9',
    description:
      'A real-time event log \u2014 append-only, replayable. When your chat app receives messages or your analytics dashboard updates live, Streams capture events in order.',
    example:
      'XADD events * type "click" page "/home"\nXREAD COUNT 10 STREAMS events 0\n\u2192 [{id: "167...-0", fields: {...}}]',
    useCase:
      'Real-time chat history, live dashboard updates via SSE, server-sent event feeds, audit logs.',
    maxSize: 'Limited only by memory',
  },
]

// ── Commands ──

export const REDIS_COMMANDS_DATA: RedisCommandCategory[] = [
  {
    category: 'Strings',
    color: '#e11d48',
    darkColor: '#fb7185',
    commands: [
      { cmd: 'SET key value', desc: 'Cache a value (e.g., your API response JSON)' },
      { cmd: 'GET key', desc: 'Read cached data (what runs when fetch() hits the cache)' },
      { cmd: 'INCR key', desc: 'Increment a counter (e.g., page views, like counts)' },
      { cmd: 'SETEX key seconds value', desc: 'Cache with auto-expiry (e.g., cache a page for 60s)' },
      { cmd: 'MGET key1 key2 ...', desc: 'Batch-read multiple cached items (e.g., hydrate a dashboard)' },
    ],
  },
  {
    category: 'Lists',
    color: '#d97706',
    darkColor: '#fbbf24',
    commands: [
      { cmd: 'LPUSH key value', desc: 'Add to the front (e.g., newest notification first)' },
      { cmd: 'RPUSH key value', desc: 'Add to the end (e.g., append to activity feed)' },
      { cmd: 'LPOP key', desc: 'Remove from the front (e.g., process oldest job)' },
      { cmd: 'LRANGE key start stop', desc: 'Get a page of items (what powers infinite scroll)' },
      { cmd: 'LLEN key', desc: 'Get list length (e.g., unread notification count)' },
    ],
  },
  {
    category: 'Sets',
    color: '#059669',
    darkColor: '#34d399',
    commands: [
      { cmd: 'SADD key member', desc: 'Add a member (e.g., mark a user as online)' },
      { cmd: 'SREM key member', desc: 'Remove a member (e.g., user went offline)' },
      { cmd: 'SISMEMBER key member', desc: 'Check if online (O(1) lookup for presence UI)' },
      { cmd: 'SINTER key1 key2', desc: 'Find common items (e.g., mutual friends)' },
      { cmd: 'SCARD key', desc: 'Count members (e.g., "342 users online")' },
    ],
  },
  {
    category: 'Hashes',
    color: '#0284c7',
    darkColor: '#38bdf8',
    commands: [
      { cmd: 'HSET key field value', desc: 'Set a field (e.g., update user name)' },
      { cmd: 'HGET key field', desc: 'Get one field (e.g., just the user avatar URL)' },
      { cmd: 'HGETALL key', desc: 'Fetch entire object (e.g., user profile for a card)' },
      { cmd: 'HDEL key field', desc: 'Remove a field (e.g., clear a cart item)' },
      { cmd: 'HINCRBY key field n', desc: 'Increment a field (e.g., add to cart quantity)' },
    ],
  },
  {
    category: 'Sorted Sets',
    color: '#7c3aed',
    darkColor: '#a78bfa',
    commands: [
      { cmd: 'ZADD key score member', desc: 'Add/update a ranked item (e.g., update a score)' },
      { cmd: 'ZRANGE key start stop', desc: 'Get top N items (what your leaderboard renders)' },
      { cmd: 'ZRANK key member', desc: 'Get rank position (e.g., "You are #5")' },
      { cmd: 'ZSCORE key member', desc: 'Get score of a member (e.g., display points)' },
      { cmd: 'ZRANGEBYSCORE key min max', desc: 'Filter by score range (e.g., items above threshold)' },
    ],
  },
  {
    category: 'Keys / General',
    color: '#6b7280',
    darkColor: '#9ca3af',
    commands: [
      { cmd: 'DEL key', desc: 'Delete a key (e.g., invalidate a cache entry)' },
      { cmd: 'EXISTS key', desc: 'Check if cached (before deciding to fetch fresh data)' },
      { cmd: 'EXPIRE key seconds', desc: 'Set cache expiry (e.g., invalidate after 5 min)' },
      { cmd: 'TTL key', desc: 'Check when cache expires (useful for stale-while-revalidate)' },
      { cmd: 'KEYS pattern', desc: 'Find keys (avoid in prod \u2014 blocks entire server!)' },
    ],
  },
]

// ── Patterns ──

export const REDIS_PATTERNS: RedisPattern[] = [
  {
    name: 'Cache-Aside (Lazy Loading)',
    diagram: [
      'Browser \u2192 fetch("/api/product/1")',
      '  API checks Redis \u2192 Hit? Return cached JSON',
      '  Miss \u2192 Query DB \u2192 Write to Redis \u2192 Return',
    ],
    description:
      'The pattern behind every fast-loading page. When your React app calls an API endpoint, the server checks Redis first. On a cache hit, data returns in <1ms instead of 50\u2013500ms from the database. This is why your product page loads instantly on the second visit.',
    pros: [
      'Pages load in 50ms instead of 500ms',
      'Only caches data that is actually requested',
      'Cache failure just means slower loads, not broken pages',
    ],
    cons: [
      'First visit is always slower (cold cache)',
      'Stale data if DB changes \u2014 pair with short TTLs or revalidation',
    ],
    code: `// app/api/product/[id]/route.ts (Next.js)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  // 1. Check Redis cache first
  const cached = await redis.get(\`product:\${id}\`)
  if (cached) {
    return Response.json(JSON.parse(cached)) // ~0.1ms
  }
  // 2. Cache miss \u2014 hit the database
  const product = await db.product.findUnique({
    where: { id },
  })
  // 3. Cache for 5 minutes
  await redis.setex(
    \`product:\${id}\`, 300, JSON.stringify(product)
  )
  return Response.json(product) // ~50ms first time
}`,
  },
  {
    name: 'Write-Through',
    diagram: [
      'User submits form \u2192 Server Action',
      '  \u2192 Write to DB + Update Redis cache',
      '  Next page load \u2192 always fresh from cache',
    ],
    description:
      'When a user submits a form or updates their profile, the API writes to both the database and Redis at the same time. The next page load always shows fresh data \u2014 no stale cache.',
    pros: [
      'Profile changes appear instantly \u2014 no stale data',
      'Reads are always cache hits after the first write',
      'Works naturally with React Server Actions',
    ],
    cons: [
      'Writes are slower (two destinations)',
      'Caches data that may never be viewed',
      'Adds complexity to the mutation path',
    ],
    code: `// app/actions/updateProfile.ts (Next.js)
"use server"

export async function updateProfile(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    bio: formData.get("bio") as string,
  }
  // 1. Write to database
  await db.user.update({
    where: { id: session.userId },
    data,
  })
  // 2. Update Redis cache immediately
  await redis.setex(
    \`user:\${session.userId}\`,
    3600,
    JSON.stringify(data)
  )
  revalidatePath("/profile")
}`,
  },
  {
    name: 'Pub/Sub (Real-Time)',
    diagram: [
      'User A sends message \u2192 API publishes to Redis',
      '  Redis Channel "chat:room:42"',
      '  \u2192 WebSocket server \u2192 push to User B',
      '  \u2192 WebSocket server \u2192 push to User C',
    ],
    description:
      'How your chat app delivers messages instantly. When User A sends a message, the API publishes it to a Redis channel. Your WebSocket server subscribes and pushes the message to everyone in the room \u2014 all in under 10ms.',
    pros: [
      'Messages arrive in <10ms',
      'Scales to thousands of concurrent users',
      'Decouples your API server from your WebSocket server',
    ],
    cons: [
      'Messages are lost if no subscriber is listening',
      'Need Streams for durable message history',
      'Requires a WebSocket server (not just REST)',
    ],
    code: `// Server: publish when a message is sent
io.on("connection", (socket) => {
  socket.on("send-message", async (msg) => {
    await redis.publish("chat:room:42",
      JSON.stringify({ user: msg.user, text: msg.text })
    )
  })
})

// Server: subscribe and broadcast
const sub = redis.duplicate()
await sub.subscribe("chat:room:42", (raw) => {
  const msg = JSON.parse(raw)
  io.to("room:42").emit("new-message", msg)
})

// React client
useEffect(() => {
  socket.on("new-message", (msg) => {
    setMessages((prev) => [...prev, msg])
  })
}, [])`,
  },
  {
    name: 'Rate Limiting',
    diagram: [
      'Request \u2192 Redis INCR counter',
      '  Under limit \u2192 allow (set X-RateLimit-Remaining)',
      '  Over limit \u2192 reject with 429',
    ],
    description:
      'Protects your API from abuse and keeps your frontend responsive. Redis counts requests per IP and returns a 429 before the request reaches your database. Your frontend can read the X-RateLimit-Remaining header to show remaining attempts.',
    pros: [
      'Protects your database from traffic spikes',
      'Sub-millisecond \u2014 no perceptible latency for real users',
      'Your frontend can display remaining attempts from headers',
    ],
    cons: [
      'Needs careful per-endpoint tuning (login vs browse)',
      'Fixed windows can allow bursts at boundaries',
    ],
    code: `// middleware.ts (Next.js)
import { NextResponse } from "next/server"

export async function middleware(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
  const key = \`rate:\${ip}\`
  const current = await redis.incr(key)
  // Set expiry only on the first request in window
  if (current === 1) await redis.expire(key, 60)

  if (current > 100) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: {
        "X-RateLimit-Remaining": "0",
        "Retry-After": String(await redis.ttl(key)),
      }}
    )
  }
  const res = NextResponse.next()
  res.headers.set("X-RateLimit-Remaining",
    String(100 - current))
  return res
}`,
  },
  {
    name: 'Session Store',
    diagram: [
      'Login \u2192 Create session in Redis + set cookie',
      'Each request \u2192 Validate cookie against Redis (<1ms)',
      'Logout \u2192 Delete session from Redis',
    ],
    description:
      'When a user logs in, the server creates a session in Redis and sends a cookie to the browser. Every subsequent request validates that cookie in <1ms. Faster than database sessions, works across multiple servers, and auto-expires with TTL.',
    pros: [
      'Sub-millisecond auth checks on every request',
      'Sessions auto-expire \u2014 no cleanup cron jobs',
      'Works across serverless functions and edge workers',
    ],
    cons: [
      'Session lost if Redis restarts without persistence',
      'Your fetch() calls need credentials: "include"',
    ],
    code: `// lib/session.ts (Next.js)
import { cookies } from "next/headers"

export async function createSession(user: User) {
  const sessionId = crypto.randomUUID()
  await redis.setex(
    \`session:\${sessionId}\`,
    86400, // 24 hours
    JSON.stringify({ id: user.id, role: user.role })
  )
  const cookieStore = await cookies()
  cookieStore.set("sid", sessionId, {
    httpOnly: true, secure: true, sameSite: "lax",
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const sid = cookieStore.get("sid")?.value
  if (!sid) return null
  const data = await redis.get(\`session:\${sid}\`)
  return data ? JSON.parse(data) : null
}`,
  },
]

// ── Quiz ──

export const REDIS_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'Your Next.js product page takes 500ms to load from the database. After adding Redis, subsequent loads take 2ms. Why?',
    options: [
      'Redis compresses the data smaller',
      'Redis stores data in RAM, which is orders of magnitude faster than disk',
      'Redis is a faster database engine',
      'Redis pre-renders the page HTML',
    ],
    answer: 1,
    explanation:
      'Redis is an in-memory store \u2014 data lives in RAM. Reading from RAM takes nanoseconds vs milliseconds for disk. The first visit still hits the database, but subsequent visits get the cached response from Redis.',
  },
  {
    q: 'Your app shows a live leaderboard that updates as users earn points. Which Redis data type powers this?',
    options: [
      'List \u2014 because items are ordered',
      'Hash \u2014 because each player has fields',
      'Sorted Set \u2014 members with scores, auto-sorted by rank',
      'Stream \u2014 because events arrive in order',
    ],
    answer: 2,
    explanation:
      'Sorted Sets automatically maintain sort order by score. When a player earns points, ZADD updates their score and Redis re-sorts instantly. ZRANGE returns the top N players for your component to render.',
  },
  {
    q: 'Your React app calls fetch("/api/user/1"). The API uses cache-aside. What happens on a cache miss?',
    options: [
      'The API returns a 404 error',
      'Redis automatically queries the database',
      'The API queries the DB, writes the result to Redis, then returns it',
      'The browser falls back to localStorage',
    ],
    answer: 2,
    explanation:
      'In cache-aside, the application manages the cache. On a miss, it queries the database, stores the result in Redis with a TTL for next time, then returns the data. Redis never talks to the database directly.',
  },
  {
    q: 'Your chat app uses Redis Pub/Sub. User A sends a message but User B is offline. What happens?',
    options: [
      'Redis stores it until User B reconnects',
      'The message is lost \u2014 Pub/Sub is fire-and-forget',
      'User B receives it when they next open the app',
      'Redis retries delivery 3 times',
    ],
    answer: 1,
    explanation:
      'Pub/Sub is fire-and-forget. If no subscriber is listening, the message is discarded. For durable messaging (chat history), use Redis Streams instead, which persist messages in an append-only log.',
  },
  {
    q: 'A user rapidly clicks "Submit Order" 20 times. How does Redis rate limiting protect your API?',
    options: [
      'Redis blocks the user\'s IP permanently',
      'Redis counts requests with INCR and rejects excess with a 429',
      'Redis queues the extra requests for later',
      'Redis disables the button via WebSocket',
    ],
    answer: 1,
    explanation:
      'Redis INCR atomically increments a counter per user/IP. When the counter exceeds the limit, the API returns 429. Your frontend can read the X-RateLimit-Remaining header to disable the button proactively.',
  },
  {
    q: 'You set a session with SETEX session:abc 3600 \'{...}\'. What does 3600 mean for the user?',
    options: [
      'The session ID is 3600 characters long',
      'The session auto-expires after 3600 seconds (1 hour)',
      'Redis checks the session 3600 times per second',
      'The session is shared across 3600 server instances',
    ],
    answer: 1,
    explanation:
      'SETEX sets a key with a TTL in seconds. After 3600 seconds (1 hour), Redis deletes the session automatically. The user would need to log in again. This prevents stale sessions without cleanup jobs.',
  },
]

// ── Sections & Manifest ──

export const REDIS_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['redis-start'] },
  { label: 'Fundamentals', ids: ['redis-overview', 'redis-data-types'] },
  { label: 'Working with Redis', ids: ['redis-commands', 'redis-patterns'] },
  { label: 'Deep Dive', ids: ['redis-architecture', 'redis-quiz'] },
]

export const REDIS_START_PAGE_DATA: StartPageData = {
  subtitle:
    'In-memory data store \u00b7 the invisible layer that makes your frontend feel instant',
  tip: 'For frontend developers who want to understand what Redis does behind the API endpoints they call \u2014 and why it makes their apps fast.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Understand the Fundamentals',
      description:
        'Learn what Redis is, why it makes your API responses fast, and explore its core data types.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        'redis-overview':
          'What Redis is, how it compares to localStorage and databases, and a hands-on terminal.',
        'redis-data-types':
          'Strings, Lists, Sets, Hashes, Sorted Sets, and Streams \u2014 with frontend use cases.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'See How Your API Uses Redis',
      description:
        'The essential commands and production patterns behind the API routes your frontend calls.',
      sectionLabel: 'Working with Redis',
      subItemDescriptions: {
        'redis-commands':
          'The ~20 commands that power caching, sessions, and real-time features.',
        'redis-patterns':
          'Cache-aside, write-through, pub/sub, rate limiting, and sessions \u2014 with Next.js examples.',
      },
    },
    {
      type: 'bonus',
      title: 'Deep Dive',
      description:
        'Understand how Redis achieves its speed and test your knowledge.',
      sectionLabel: 'Deep Dive',
      subItemDescriptions: {
        'redis-architecture':
          'Event loop, persistence basics, and how Redis scales with your app.',
        'redis-quiz': 'Six frontend-focused questions covering everything in this guide.',
      },
    },
  ],
}

export const REDIS_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'redis',
    icon: '🔴',
    title: 'Redis',
    startPageId: 'redis-start',
    description:
      'An interactive guide to Redis \u2014 the invisible caching layer that makes your API responses fast, your sessions seamless, and your real-time features possible.',
    category: 'infrastructure',
    dateCreated: '2026-02-26',
    dateModified: '2026-02-27',
    sections: REDIS_GUIDE_SECTIONS,
  },
  startPageData: REDIS_START_PAGE_DATA,
}
