import type { GlossaryCategory } from './types'

export const kafkaGlossary: GlossaryCategory[] = [
  {
    category: "Core Concepts",
    terms: [
      {
        term: "Topic",
        definition: "A named stream of records in Kafka. Producers write to topics, consumers read from them. Topics are split into partitions for parallelism and replicated for fault tolerance.",
        linkId: "kafka-intro",
        sectionId: "kafka-concepts",
      },
      {
        term: "Partition",
        definition: "An ordered, immutable sequence of records within a topic. Each record gets a sequential <code>offset</code>. Partitions are Kafka\u2019s unit of parallelism and ordering.",
        linkId: "kafka-partitioning",
        sectionId: "kafka-partitions",
      },
      {
        term: "Broker",
        definition: "A single Kafka server that stores data on disk and serves client requests. A Kafka cluster is a group of brokers coordinated by ZooKeeper or KRaft.",
        linkId: "kafka-docs",
        sectionId: "kafka-architecture",
      },
      {
        term: "Offset",
        definition: "A sequential, immutable ID assigned to each record within a partition. Consumers track their position using offsets to know which records they\u2019ve already processed.",
        linkId: "kafka-intro",
        sectionId: "kafka-concepts",
      },
    ],
  },
  {
    category: "Producers & Consumers",
    terms: [
      {
        term: "Producer (Kafka)",
        definition: "An application that publishes events to Kafka topics. Producers choose which partition a record goes to \u2014 typically by hashing the record key.",
        linkId: "kafka-producer-configs",
        sectionId: "kafka-producers",
      },
      {
        term: "Consumer Group",
        definition: "A set of consumers that cooperate to consume a topic. Kafka assigns each partition to exactly one consumer in the group, enabling parallel processing.",
        linkId: "kafka-consumer-configs",
        sectionId: "kafka-consumers",
      },
      {
        term: "Consumer Rebalance",
        definition: "The process by which Kafka redistributes partition assignments when consumers join or leave a group. During rebalance, affected partitions are temporarily unavailable.",
        linkId: "kafka-consumer-configs",
        sectionId: "kafka-consumers",
      },
    ],
  },
  {
    category: "Replication & Durability",
    terms: [
      {
        term: "Replication Factor",
        definition: "The number of copies of each partition across the cluster. A replication factor of 3 means each partition exists on 3 brokers, surviving up to 2 failures.",
        linkId: "kafka-replication-docs",
        sectionId: "kafka-replication",
      },
      {
        term: "ISR (In-Sync Replicas)",
        definition: "The subset of partition replicas that are fully caught up with the leader. Kafka only considers a record committed once all ISR members have it.",
        linkId: "kafka-replication-docs",
        sectionId: "kafka-replication",
      },
      {
        term: "Leader Election (Kafka)",
        definition: "When a partition leader broker fails, Kafka automatically promotes an in-sync follower replica to become the new leader, ensuring continuous availability.",
        linkId: "kafka-replication-docs",
        sectionId: "kafka-replication",
      },
    ],
  },
  {
    category: "Ecosystem & Patterns",
    terms: [
      {
        term: "KRaft",
        definition: "Kafka Raft \u2014 a built-in consensus protocol that replaces ZooKeeper for cluster metadata management. Simplifies Kafka deployment by removing an external dependency.",
        linkId: "kafka-kraft",
        sectionId: "kafka-architecture",
      },
      {
        term: "Kafka Streams",
        definition: "A client library for building real-time stream processing applications directly on top of Kafka. Provides stateful transformations, windowing, and exactly-once semantics.",
        linkId: "kafka-streams",
        sectionId: "kafka-usecases",
      },
      {
        term: "Kafka Connect",
        definition: "A framework for connecting Kafka with external systems using pre-built connectors. Supports source connectors (into Kafka) and sink connectors (out of Kafka).",
        linkId: "kafka-connect",
        sectionId: "kafka-usecases",
      },
      {
        term: "Change Data Capture (CDC)",
        definition: "A pattern that streams database changes (INSERT, UPDATE, DELETE) into Kafka as events. Tools like Debezium implement CDC by reading database transaction logs.",
        linkId: "debezium-docs",
        sectionId: "kafka-usecases",
      },
    ],
  },
]
