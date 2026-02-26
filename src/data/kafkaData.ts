import type { GuideSection, StartPageData, GuideManifest } from './guideTypes'

// ── Types ───────────────────────────────────────────────────────────

export interface KafkaComparisonRow {
  label: string
  kafka: string
  traditional: string
}

export interface KafkaConceptItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface KafkaReplicaMapping {
  partition: number
  leader: number
  replicas: number[]
}

export interface KafkaAckLevel {
  id: string
  icon: string
  title: string
  description: string
}

export interface KafkaUseCaseItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface KafkaPlaygroundEvent {
  topic: string
  key: string
  value: string
}

export interface KafkaPartitionMessage {
  key: string
  value: string
  offset: number
}

// ── Comparison Data ─────────────────────────────────────────────────

export const KAFKA_COMPARISON_ROWS: KafkaComparisonRow[] = [
  { label: 'After consume', kafka: 'Message retained', traditional: 'Message deleted' },
  { label: 'Consumers', kafka: 'Pull-based', traditional: 'Push-based' },
  { label: 'Ordering', kafka: 'Per-partition guarantee', traditional: 'Best effort' },
  { label: 'Replay', kafka: 'Yes, seek to any offset', traditional: 'No' },
  { label: 'Throughput', kafka: 'Millions/sec', traditional: 'Thousands/sec' },
  { label: 'Storage', kafka: 'Distributed log on disk', traditional: 'In-memory' },
]

// ── Core Concepts Data ──────────────────────────────────────────────

export const KAFKA_CONCEPTS: KafkaConceptItem[] = [
  {
    id: 'event',
    icon: '\u{1f4dd}',
    title: 'Event / Record',
    description: 'The atomic unit of data. Every event has a <code>key</code>, a <code>value</code>, a <code>timestamp</code>, and optional <code>headers</code>. Events are immutable once written.',
  },
  {
    id: 'topic',
    icon: '\u{1f4c2}',
    title: 'Topic',
    description: 'A named category or feed to which events are published. Think of it as a "table" in a database. Topics are split into partitions.',
  },
  {
    id: 'partition',
    icon: '\u{1f9e9}',
    title: 'Partition',
    description: 'An ordered, immutable sequence of records. Each record in a partition gets a sequential <code>offset</code>. Partitions enable parallelism \u2014 they\'re how Kafka scales horizontally.',
  },
  {
    id: 'broker',
    icon: '\u{1f5a5}\ufe0f',
    title: 'Broker',
    description: 'A single Kafka server. Brokers store data on disk and serve client requests. A Kafka cluster is a group of brokers working together.',
  },
  {
    id: 'producer',
    icon: '\u{1f4e4}',
    title: 'Producer',
    description: 'An application that publishes events to topics. Producers choose which partition a record goes to \u2014 usually by hashing the record key.',
  },
  {
    id: 'consumer',
    icon: '\u{1f4e5}',
    title: 'Consumer',
    description: 'An application that subscribes to topics and processes events. Consumers track their position via <code>offset</code> and can join <code>consumer groups</code> for parallel processing.',
  },
]

// ── Ack Levels Data ─────────────────────────────────────────────────

export const KAFKA_ACK_LEVELS: KafkaAckLevel[] = [
  {
    id: 'acks-0',
    icon: '\u26a1',
    title: 'Acks=0',
    description: 'Fire and forget. Fastest, but no delivery guarantee. Producer doesn\'t wait for broker acknowledgement.',
  },
  {
    id: 'acks-1',
    icon: '\u2705',
    title: 'Acks=1',
    description: 'Leader acknowledges. Good balance. Record is written to leader\'s log before ack \u2014 but could be lost if leader fails before replication.',
  },
  {
    id: 'acks-all',
    icon: '\u{1f512}',
    title: 'Acks=all',
    description: 'All in-sync replicas acknowledge. Strongest guarantee. Slowest, but no data loss as long as at least one replica survives.',
  },
]

// ── Replication Data ────────────────────────────────────────────────

export const KAFKA_REPLICAS: KafkaReplicaMapping[] = [
  { partition: 0, leader: 0, replicas: [0, 1, 2] },
  { partition: 1, leader: 1, replicas: [1, 2, 3] },
  { partition: 2, leader: 2, replicas: [2, 3, 4] },
  { partition: 3, leader: 3, replicas: [3, 4, 0] },
]

export const KAFKA_BROKER_COUNT = 5

// ── Use Cases Data ──────────────────────────────────────────────────

export const KAFKA_USE_CASES: KafkaUseCaseItem[] = [
  {
    id: 'event-sourcing',
    icon: '\u{1f4ca}',
    title: 'Event Sourcing',
    description: 'Store every state change as an immutable event. Rebuild application state by replaying the log. Common in financial systems and e-commerce where audit trails are critical.',
  },
  {
    id: 'microservices',
    icon: '\u{1f517}',
    title: 'Microservice Communication',
    description: 'Decouple services by communicating through events instead of direct API calls. Service A publishes "order.created" \u2014 services B, C, and D each consume it independently.',
  },
  {
    id: 'analytics',
    icon: '\u{1f4c8}',
    title: 'Real-time Analytics',
    description: 'Stream clickstream data, IoT sensor readings, or financial transactions into Kafka. Process with Kafka Streams or Flink for real-time dashboards.',
  },
  {
    id: 'cdc',
    icon: '\u{1f504}',
    title: 'Change Data Capture (CDC)',
    description: 'Mirror database changes into Kafka using tools like Debezium. Every INSERT, UPDATE, DELETE becomes an event, enabling real-time data synchronization across systems.',
  },
  {
    id: 'log-aggregation',
    icon: '\u{1f4dd}',
    title: 'Log Aggregation',
    description: 'Collect logs from hundreds of services into Kafka topics, then route them to Elasticsearch, S3, or monitoring tools. Replaces scattered log files with a centralized, replayable stream.',
  },
  {
    id: 'ml-pipelines',
    icon: '\u{1f916}',
    title: 'ML Feature Pipelines',
    description: 'Stream raw data through transformation pipelines to compute features in real-time. Feed both model training (batch) and inference (real-time) from the same source of truth.',
  },
]

// ── Playground Events ───────────────────────────────────────────────

export const KAFKA_PLAYGROUND_EVENTS: KafkaPlaygroundEvent[] = [
  { topic: 'orders', key: 'order-4821', value: '{"item":"laptop","qty":1}' },
  { topic: 'orders', key: 'order-4822', value: '{"item":"mouse","qty":2}' },
  { topic: 'user-events', key: 'user-99', value: '{"action":"login"}' },
  { topic: 'user-events', key: 'user-42', value: '{"action":"purchase"}' },
  { topic: 'payments', key: 'pay-001', value: '{"amount":499.99}' },
  { topic: 'inventory', key: 'sku-100', value: '{"delta":-1}' },
  { topic: 'notifications', key: 'user-99', value: '{"type":"email"}' },
]

// ── Key Takeaways ───────────────────────────────────────────────────

export const KAFKA_TAKEAWAYS: string[] = [
  'Kafka is a distributed commit log, not a message queue \u2014 messages persist after consumption',
  'Ordering is guaranteed within a partition. Same key \u2192 same partition \u2192 same order',
  'Consumer groups enable parallel processing \u2014 Kafka auto-assigns partitions to consumers',
  'Replication factor 3 means your data survives any 2 broker failures',
  'Producers control durability via acks: trade latency for stronger guarantees',
  'Topics can\'t reduce partitions \u2014 plan for growth, start with 2\u00d7 your expected consumer count',
]

// ── Partition Visualizer Data ───────────────────────────────────────

export const KAFKA_INITIAL_PARTITIONS: KafkaPartitionMessage[][] = [
  [
    { key: 'user-1', value: 'login', offset: 0 },
    { key: 'user-1', value: 'click', offset: 1 },
    { key: 'user-1', value: 'purchase', offset: 2 },
  ],
  [
    { key: 'user-2', value: 'login', offset: 0 },
    { key: 'user-2', value: 'search', offset: 1 },
  ],
  [
    { key: 'user-3', value: 'login', offset: 0 },
    { key: 'user-3', value: 'click', offset: 1 },
    { key: 'user-3', value: 'logout', offset: 2 },
    { key: 'user-3', value: 'login', offset: 3 },
  ],
]

export const KAFKA_PARTITION_KEYS = ['user-1', 'user-2', 'user-3', 'user-4']
export const KAFKA_PARTITION_VALUES = ['login', 'click', 'purchase', 'search', 'logout']
export const KAFKA_PARTITION_COUNT = 3

export const KAFKA_CONSUMER_GROUP_PARTITIONS = 6
export const KAFKA_CONSUMER_OPTIONS = [1, 2, 3, 4, 6]

// ── Navigation ──────────────────────────────────────────────────────

export const KAFKA_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['kafka-start'] },
  { label: 'Fundamentals', ids: ['kafka-overview', 'kafka-concepts', 'kafka-architecture'] },
  { label: 'Data Flow', ids: ['kafka-producers', 'kafka-consumers', 'kafka-partitions'] },
  { label: 'Operations & Patterns', ids: ['kafka-replication', 'kafka-usecases', 'kafka-playground'] },
]

export const KAFKA_START_PAGE_DATA: StartPageData = {
  subtitle: 'Distributed streaming \u00b7 broker topology \u00b7 partitions \u00b7 replication \u00b7 consumer groups.',
  tip: 'For backend engineers building event-driven systems with Apache Kafka.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Understand the Fundamentals',
      description: 'Learn what Kafka is, how it differs from traditional message queues, and master the core concepts and architecture.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        'kafka-overview': 'What is Kafka, how it compares to traditional MQs, and the live broker cluster demo.',
        'kafka-concepts': 'Events, topics, partitions, brokers, producers, and consumers \u2014 the building blocks.',
        'kafka-architecture': 'Cluster topology, partition leaders, ZooKeeper vs KRaft, and how it all fits together.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Master Data Flow',
      description: 'Understand how data moves through Kafka \u2014 from producers writing to topics, through consumer groups, and how partitions enable parallelism.',
      sectionLabel: 'Data Flow',
      subItemDescriptions: {
        'kafka-producers': 'Writing data into Kafka, partition selection by key hash, and ack level trade-offs.',
        'kafka-consumers': 'Pull-based consumption, consumer group rebalancing, and the interactive simulator.',
        'kafka-partitions': 'How partitions guarantee ordering, the key-to-partition hash, and partition count strategy.',
      },
    },
    {
      type: 'bonus',
      title: 'Operations & Patterns',
      description: 'Explore replication for fault tolerance, real-world use cases, and a full interactive event stream playground.',
      sectionLabel: 'Operations & Patterns',
      subItemDescriptions: {
        'kafka-replication': 'Replica placement, ISR sets, leader election, and the broker failure simulator.',
        'kafka-usecases': 'Event sourcing, CDC, microservice communication, log aggregation, and ML pipelines.',
        'kafka-playground': 'Full interactive event stream simulation \u2014 produce, route, and consume messages.',
      },
    },
  ],
  relatedGuides: ['kubernetes', 'ci-cd'],
}

export const KAFKA_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 'kafka',
    icon: '\u{1f4e8}',
    title: 'Apache Kafka',
    startPageId: 'kafka-start',
    description: 'An interactive guide to distributed event streaming \u2014 from first principles to production patterns.',
    category: 'infrastructure',
    dateCreated: '2026-02-26',
    dateModified: '2026-02-26',
    sections: KAFKA_GUIDE_SECTIONS,
  },
  startPageData: KAFKA_START_PAGE_DATA,
}
