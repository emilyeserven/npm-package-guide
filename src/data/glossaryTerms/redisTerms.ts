import type { GlossaryCategory } from './index'

export const redisGlossary: GlossaryCategory[] = [
  {
    category: 'Core Concepts',
    terms: [
      {
        term: 'In-Memory Store',
        definition:
          'A database that keeps its entire dataset in RAM rather than on disk. Redis is an in-memory store, which is why it achieves sub-millisecond response times.',
        linkId: 'redis-docs',
        sectionId: 'redis-overview',
      },
      {
        term: 'Key-Value Pair',
        definition:
          'The fundamental data model in Redis. Every piece of data is stored as a key (string identifier) mapped to a value (which can be any Redis data type).',
        linkId: 'redis-docs',
        sectionId: 'redis-overview',
      },
      {
        term: 'TTL (Time To Live)',
        definition:
          'The number of seconds a key will exist before Redis automatically deletes it. Set with EXPIRE or SETEX. Check remaining time with TTL command.',
        linkId: 'redis-commands-ref',
        sectionId: 'redis-commands',
      },
    ],
  },
  {
    category: 'Data Types',
    terms: [
      {
        term: 'Sorted Set',
        definition:
          'A Redis data type where each member has a numeric score. Members are automatically sorted by score. Used for leaderboards, priority queues, and rate limiting.',
        linkId: 'redis-data-types-ref',
        sectionId: 'redis-data-types',
      },
      {
        term: 'Hash',
        definition:
          'A Redis data type storing field-value pairs under a single key. Like a mini-object or database row. Manipulated with HSET, HGET, HGETALL.',
        linkId: 'redis-data-types-ref',
        sectionId: 'redis-data-types',
      },
      {
        term: 'Stream',
        definition:
          'An append-only log data structure in Redis. Supports consumer groups for parallel processing. Like a lightweight Kafka built into Redis.',
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
          'A caching pattern where the application checks Redis first, and on a miss, queries the database, writes the result to Redis, then returns it. Also called lazy loading.',
        linkId: 'redis-caching',
        sectionId: 'redis-patterns',
      },
      {
        term: 'Pub/Sub',
        definition:
          'A messaging pattern where publishers send messages to channels and all subscribers receive them instantly. Fire-and-forget — messages are not persisted.',
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
          'A point-in-time snapshot of the Redis dataset saved to disk. Fast to restore but data between snapshots may be lost on crash.',
        linkId: 'redis-persistence-ref',
        sectionId: 'redis-architecture',
      },
      {
        term: 'AOF (Append Only File)',
        definition:
          'A persistence strategy that logs every write operation. More durable than RDB snapshots — can be configured to fsync every second or every write.',
        linkId: 'redis-persistence-ref',
        sectionId: 'redis-architecture',
      },
      {
        term: 'Redis Cluster',
        definition:
          'A scaling strategy that shards data across multiple nodes using 16,384 hash slots. Each node handles a subset of keys, scaling both reads and writes.',
        linkId: 'redis-cluster-ref',
        sectionId: 'redis-architecture',
      },
    ],
  },
]
