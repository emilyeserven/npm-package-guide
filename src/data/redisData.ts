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
      'The simplest type. Stores text, numbers, or serialized JSON. Think of it like a single variable.',
    example: 'SET user:1:name "Emily"\nGET user:1:name\n→ "Emily"',
    useCase: 'Caching API responses, session tokens, counters, feature flags.',
    maxSize: '512 MB per value',
  },
  {
    id: 'lists',
    name: 'Lists',
    icon: '[ ]',
    color: '#d97706',
    darkColor: '#fbbf24',
    description:
      'Ordered collections of strings. Imagine a linked list — fast push/pop from both ends, slower random access in the middle.',
    example:
      'LPUSH notifications "New comment"\nLPUSH notifications "New follower"\nLRANGE notifications 0 -1\n→ ["New follower", "New comment"]',
    useCase: 'Activity feeds, message queues, recent items, job queues.',
    maxSize: '4+ billion elements',
  },
  {
    id: 'sets',
    name: 'Sets',
    icon: '{ }',
    color: '#059669',
    darkColor: '#34d399',
    description:
      'Unordered collections of unique strings. No duplicates allowed. Supports intersections, unions, and diffs.',
    example:
      'SADD online:users "user:1" "user:2"\nSADD online:users "user:1"\nSMEMBERS online:users\n→ {"user:1", "user:2"}',
    useCase: 'Tags, unique visitors, online users, social graph relationships.',
    maxSize: '4+ billion members',
  },
  {
    id: 'hashes',
    name: 'Hashes',
    icon: '#{}',
    color: '#0284c7',
    darkColor: '#38bdf8',
    description:
      'Field-value pairs inside a single key. Like a mini-object or a row in a database table.',
    example:
      'HSET user:1 name "Emily" role "engineer"\nHGETALL user:1\n→ {name: "Emily", role: "engineer"}',
    useCase:
      'User profiles, product details, config objects — anything that maps to a flat object.',
    maxSize: '4+ billion field-value pairs',
  },
  {
    id: 'sorted-sets',
    name: 'Sorted Sets',
    icon: '⟨z⟩',
    color: '#7c3aed',
    darkColor: '#a78bfa',
    description:
      'Like Sets, but each member has a numeric score. Members are automatically sorted by score. This is the secret weapon of Redis.',
    example:
      'ZADD leaderboard 9500 "player:1"\nZADD leaderboard 8700 "player:2"\nZRANK leaderboard "player:1"\n→ 1 (rank)',
    useCase:
      'Leaderboards, priority queues, rate limiters, time-series indexing.',
    maxSize: '4+ billion members',
  },
  {
    id: 'streams',
    name: 'Streams',
    icon: '>>',
    color: '#c026d3',
    darkColor: '#e879f9',
    description:
      'An append-only log data structure. Like Kafka-lite built into Redis. Supports consumer groups for parallel processing.',
    example:
      'XADD events * type "click" page "/home"\nXREAD COUNT 10 STREAMS events 0\n→ [{id: "167...-0", fields: {...}}]',
    useCase: 'Event sourcing, real-time analytics, chat systems, audit logs.',
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
      { cmd: 'SET key value', desc: 'Store a value' },
      { cmd: 'GET key', desc: 'Retrieve a value' },
      { cmd: 'INCR key', desc: 'Increment a number by 1' },
      { cmd: 'SETEX key seconds value', desc: 'Set with auto-expiry' },
      { cmd: 'MGET key1 key2 ...', desc: 'Get multiple keys at once' },
    ],
  },
  {
    category: 'Lists',
    color: '#d97706',
    darkColor: '#fbbf24',
    commands: [
      { cmd: 'LPUSH key value', desc: 'Push to the left (head)' },
      { cmd: 'RPUSH key value', desc: 'Push to the right (tail)' },
      { cmd: 'LPOP key', desc: 'Pop from the left' },
      { cmd: 'LRANGE key start stop', desc: 'Get a range of elements' },
      { cmd: 'LLEN key', desc: 'Get list length' },
    ],
  },
  {
    category: 'Sets',
    color: '#059669',
    darkColor: '#34d399',
    commands: [
      { cmd: 'SADD key member', desc: 'Add a member' },
      { cmd: 'SREM key member', desc: 'Remove a member' },
      { cmd: 'SISMEMBER key member', desc: 'Check membership' },
      { cmd: 'SINTER key1 key2', desc: 'Intersection of two sets' },
      { cmd: 'SCARD key', desc: 'Count members' },
    ],
  },
  {
    category: 'Hashes',
    color: '#0284c7',
    darkColor: '#38bdf8',
    commands: [
      { cmd: 'HSET key field value', desc: 'Set a field' },
      { cmd: 'HGET key field', desc: 'Get a field' },
      { cmd: 'HGETALL key', desc: 'Get all fields and values' },
      { cmd: 'HDEL key field', desc: 'Delete a field' },
      { cmd: 'HINCRBY key field n', desc: 'Increment a field' },
    ],
  },
  {
    category: 'Sorted Sets',
    color: '#7c3aed',
    darkColor: '#a78bfa',
    commands: [
      { cmd: 'ZADD key score member', desc: 'Add with a score' },
      { cmd: 'ZRANGE key start stop', desc: 'Get range by rank' },
      { cmd: 'ZRANK key member', desc: 'Get rank of member' },
      { cmd: 'ZSCORE key member', desc: 'Get score of member' },
      { cmd: 'ZRANGEBYSCORE key min max', desc: 'Range by score' },
    ],
  },
  {
    category: 'Keys / General',
    color: '#6b7280',
    darkColor: '#9ca3af',
    commands: [
      { cmd: 'DEL key', desc: 'Delete a key' },
      { cmd: 'EXISTS key', desc: 'Check if key exists' },
      { cmd: 'EXPIRE key seconds', desc: 'Set a TTL' },
      { cmd: 'TTL key', desc: 'Check remaining TTL' },
      { cmd: 'KEYS pattern', desc: 'Find keys (avoid in prod!)' },
    ],
  },
]

// ── Patterns ──

export const REDIS_PATTERNS: RedisPattern[] = [
  {
    name: 'Cache-Aside (Lazy Loading)',
    diagram: ['App → Redis?', '  Hit → return cached', '  Miss → DB → write to Redis → return'],
    description:
      'The most common caching pattern. Your app checks Redis first. On a miss, it queries the database, writes the result to Redis, then returns it. Data is only cached when requested.',
    pros: [
      'Only caches what\'s actually used',
      'Simple to implement',
      'Resilient — cache failure just means slower reads',
    ],
    cons: [
      'First request is always slow (cold cache)',
      'Stale data possible if DB changes without cache invalidation',
    ],
    code: `async function getUser(id) {
  // 1. Check cache first
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);
  // 2. Cache miss — hit the database
  const user = await db.query(
    "SELECT * FROM users WHERE id = $1", [id]
  );
  // 3. Populate cache with a TTL
  await redis.setex(
    \`user:\${id}\`, 3600, JSON.stringify(user)
  );
  return user;
}`,
  },
  {
    name: 'Write-Through',
    diagram: ['App → Redis → DB', '  (writes go to both)'],
    description:
      'Every write goes to Redis AND the database at the same time. The cache is always up-to-date because it\'s written to on every mutation, not just on reads.',
    pros: [
      'Cache is always consistent with DB',
      'No stale data',
      'Reads are always fast',
    ],
    cons: [
      'Write latency increases (two writes)',
      'Caches data that may never be read',
      'More complex write path',
    ],
    code: `async function updateUser(id, data) {
  // 1. Write to database
  await db.query(
    "UPDATE users SET name = $1 WHERE id = $2",
    [data.name, id]
  );
  // 2. Update cache immediately
  await redis.setex(
    \`user:\${id}\`,
    3600,
    JSON.stringify(data)
  );
}`,
  },
  {
    name: 'Pub/Sub (Real-Time)',
    diagram: [
      'Publisher → Redis Channel',
      '  → Subscriber A',
      '  → Subscriber B',
      '  → Subscriber N',
    ],
    description:
      'Redis can act as a message broker. Publishers send messages to channels, and all subscribers to that channel receive them instantly. Great for real-time features.',
    pros: [
      'Real-time communication',
      'Decouples producers from consumers',
      'Very low latency',
    ],
    cons: [
      'Messages are fire-and-forget (no persistence)',
      'If a subscriber is offline, it misses messages',
      'Use Streams for durability',
    ],
    code: `// Publisher (e.g., your API server)
await redis.publish(
  "notifications",
  JSON.stringify({
    userId: "user:1",
    type: "comment",
    message: "New comment on your post"
  })
);
// Subscriber (e.g., WebSocket server)
const sub = redis.duplicate();
await sub.subscribe("notifications", (msg) => {
  const data = JSON.parse(msg);
  broadcastToUser(data.userId, data);
});`,
  },
  {
    name: 'Rate Limiting',
    diagram: [
      'Request → Check counter',
      '  Under limit → allow',
      '  Over limit → reject (429)',
    ],
    description:
      'Use Redis atomic counters with expiry to limit how many requests a user or IP can make in a time window. INCR + EXPIRE is the classic approach.',
    pros: [
      'Atomic and race-condition free',
      'Very fast (sub-millisecond)',
      'Works across multiple server instances',
    ],
    cons: [
      'Requires careful TTL tuning',
      'Window boundaries can allow burst traffic',
    ],
    code: `async function rateLimit(ip, limit = 100, window = 60) {
  const key = \`rate:\${ip}\`;
  const current = await redis.incr(key);
  // Set expiry only on the first request
  if (current === 1) {
    await redis.expire(key, window);
  }
  if (current > limit) {
    throw new Error("Rate limit exceeded");
  }
  return { remaining: limit - current };
}`,
  },
  {
    name: 'Session Store',
    diagram: [
      'Login → Create session in Redis',
      'Request → Validate session from Redis',
      'Logout → Delete session',
    ],
    description:
      'Store user sessions in Redis instead of a traditional database. Sessions are fast to read, easy to expire, and work seamlessly across multiple app servers.',
    pros: [
      'Sub-millisecond session lookups',
      'Built-in TTL for auto-expiry',
      'Shared across all server instances',
    ],
    cons: [
      'Session lost if Redis restarts (without persistence)',
      'Memory-bound — watch for session bloat',
    ],
    code: `// On login
const sessionId = crypto.randomUUID();
await redis.setex(
  \`session:\${sessionId}\`,
  86400, // 24 hours
  JSON.stringify({
    userId: user.id, role: user.role
  })
);
res.cookie("sid", sessionId, { httpOnly: true });
// On each request (middleware)
async function authenticate(req) {
  const data = await redis.get(
    \`session:\${req.cookies.sid}\`
  );
  if (!data) throw new Error("Unauthorized");
  return JSON.parse(data);
}`,
  },
]

// ── Quiz ──

export const REDIS_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'Where does Redis store its data by default?',
    options: [
      'On disk (like PostgreSQL)',
      'In-memory (RAM)',
      'In the browser (localStorage)',
      'In a distributed file system',
    ],
    answer: 1,
    explanation:
      'Redis is an in-memory data store. This is what makes it so fast — RAM access is orders of magnitude faster than disk. Redis can optionally persist to disk for durability.',
  },
  {
    q: 'Which Redis data type would you use for a real-time leaderboard?',
    options: ['List', 'Set', 'Sorted Set', 'Hash'],
    answer: 2,
    explanation:
      'Sorted Sets are perfect for leaderboards. Each member has a score, and Redis keeps them automatically sorted. ZRANGE and ZRANK give you rankings in O(log N) time.',
  },
  {
    q: 'What does the command SETEX user:1 3600 "Emily" do?',
    options: [
      'Sets a value that never expires',
      'Sets a value that auto-deletes after 3600 seconds',
      'Sets 3600 copies of the value',
      'Creates an exclusive lock for 3600 seconds',
    ],
    answer: 1,
    explanation:
      'SETEX sets a key with a TTL (time-to-live). After 3600 seconds (1 hour), Redis will automatically delete this key. It\'s shorthand for SET + EXPIRE.',
  },
  {
    q: 'In the cache-aside pattern, what happens on a cache miss?',
    options: [
      'The request fails with an error',
      'Redis automatically queries the database',
      'The app queries the DB, then writes the result to Redis',
      'The user must refresh the page',
    ],
    answer: 2,
    explanation:
      'In cache-aside, the application is responsible for managing the cache. On a miss, it queries the database, stores the result in Redis for next time, and returns the data.',
  },
  {
    q: 'Why should you avoid the KEYS command in production?',
    options: [
      'It\'s deprecated',
      'It only works on strings',
      'It blocks the server by scanning every key',
      'It requires admin privileges',
    ],
    answer: 2,
    explanation:
      'KEYS scans every single key in the database, which blocks the Redis server (single-threaded!) until it\'s done. In production with millions of keys, this can freeze your entire app. Use SCAN instead.',
  },
  {
    q: 'What makes Redis Pub/Sub different from Streams?',
    options: [
      'Pub/Sub is faster',
      'Pub/Sub messages are fire-and-forget; Streams persist messages',
      'Streams can only have one subscriber',
      'There is no difference',
    ],
    answer: 1,
    explanation:
      'Pub/Sub is fire-and-forget — if no subscriber is listening, the message is lost. Streams persist messages in an append-only log, so consumers can read them later and even replay history.',
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
  subtitle: 'In-memory data store · key-value cache · data structures · real-time systems',
  tip: 'For backend engineers who want to understand Redis — from basic key-value operations to caching patterns and architecture.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Understand the Fundamentals',
      description: 'Learn what Redis is, why it\'s fast, and explore its core data types.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        'redis-overview': 'What Redis is, how fast it is, and a hands-on terminal to try commands.',
        'redis-data-types': 'Strings, Lists, Sets, Hashes, Sorted Sets, and Streams.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Work with Redis',
      description: 'Master the essential commands and learn common production patterns.',
      sectionLabel: 'Working with Redis',
      subItemDescriptions: {
        'redis-commands': 'The ~20 commands you\'ll use 90% of the time, grouped by data type.',
        'redis-patterns': 'Cache-aside, write-through, pub/sub, rate limiting, and session stores.',
      },
    },
    {
      type: 'bonus',
      title: 'Deep Dive',
      description: 'Understand how Redis works under the hood and test your knowledge.',
      sectionLabel: 'Deep Dive',
      subItemDescriptions: {
        'redis-architecture': 'Event loop, persistence (RDB vs AOF), and scaling strategies.',
        'redis-quiz': 'Six questions covering everything in this guide.',
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
      'An interactive guide to Redis — the in-memory data store behind caching, sessions, rate limiting, and real-time systems.',
    category: 'infrastructure',
    dateCreated: '2026-02-26',
    dateModified: '2026-02-26',
    sections: REDIS_GUIDE_SECTIONS,
  },
  startPageData: REDIS_START_PAGE_DATA,
}
