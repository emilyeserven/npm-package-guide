import type { GlossaryCategory } from './index'

export const redisGlossary: GlossaryCategory[] = [
  {
    category: 'Core Concepts',
    terms: [
      {
        term: 'In-Memory Store',
        definition:
          'A database that keeps data in RAM instead of on disk. This is why Redis-cached API responses return in <1ms \u2014 RAM access is measured in nanoseconds, while disk access takes milliseconds.',
        linkId: 'redis-docs',
        sectionId: 'redis-overview',
      },
      {
        term: 'Key-Value Pair',
        definition:
          'The core data model in Redis. Like localStorage but on the server \u2014 every piece of data has a string key (e.g., "user:123") mapped to a value (which can be a string, list, set, hash, or sorted set).',
        linkId: 'redis-docs',
        sectionId: 'redis-overview',
      },
      {
        term: 'TTL (Time To Live)',
        definition:
          'The number of seconds before Redis auto-deletes a key. When your API caches data with a 5-minute TTL, the cache refreshes at most every 5 minutes \u2014 a trade-off between freshness and speed.',
        linkId: 'redis-commands-ref',
        sectionId: 'redis-commands',
      },
      {
        term: 'Cache Hit / Cache Miss',
        definition:
          'A cache hit means Redis had the data and returned it in <1ms. A cache miss means Redis did not have it, so the API queried the database (~50ms). Your frontend experiences this as the difference between instant and slightly delayed loads.',
        linkId: 'redis-caching',
        sectionId: 'redis-overview',
      },
    ],
  },
  {
    category: 'Data Types',
    terms: [
      {
        term: 'Sorted Set',
        definition:
          'A Redis data type where each member has a score and members are auto-sorted by rank. Powers leaderboards, trending feeds, and any UI that shows ranked items.',
        linkId: 'redis-data-types-ref',
        sectionId: 'redis-data-types',
      },
      {
        term: 'Hash',
        definition:
          'A Redis data type storing field-value pairs \u2014 like a JavaScript object under a single key. Used to cache structured data like user profiles or product details that your components render.',
        linkId: 'redis-data-types-ref',
        sectionId: 'redis-data-types',
      },
      {
        term: 'Stream',
        definition:
          'An append-only event log in Redis. Powers real-time features like chat, live notifications, and streaming updates to your frontend via WebSockets or SSE.',
        linkId: 'redis-data-types-ref',
        sectionId: 'redis-data-types',
      },
    ],
  },
  {
    category: 'Patterns',
    terms: [
      {
        term: 'Cache-Aside',
        definition:
          'A caching pattern where the API checks Redis first, and on a miss, queries the database, caches the result, then returns it. The reason your product page loads in 50ms instead of 500ms on the second visit.',
        linkId: 'redis-caching',
        sectionId: 'redis-patterns',
      },
      {
        term: 'Pub/Sub',
        definition:
          'A messaging pattern where publishers send to channels and all subscribers receive instantly. Powers real-time features like chat messages and live notifications in your frontend.',
        linkId: 'redis-pubsub',
        sectionId: 'redis-patterns',
      },
    ],
  },
  {
    category: 'Architecture',
    terms: [
      {
        term: 'RDB Snapshot',
        definition:
          'A point-in-time backup of Redis data saved to disk. Fast to restore but cached data between snapshots may be lost on a server restart.',
        linkId: 'redis-persistence-ref',
        sectionId: 'redis-architecture',
      },
      {
        term: 'AOF (Append Only File)',
        definition:
          'A persistence mode that logs every write. More durable than RDB \u2014 almost no data loss on crash. Like a browser undo history where every action is recorded.',
        linkId: 'redis-persistence-ref',
        sectionId: 'redis-architecture',
      },
      {
        term: 'Redis Cluster',
        definition:
          'A way to split cached data across multiple servers when one machine isn\'t enough. Transparent to your API code \u2014 the caching your frontend relies on stays the same.',
        linkId: 'redis-cluster-ref',
        sectionId: 'redis-architecture',
      },
    ],
  },
]
