# Apache Kafka — Guide CLAUDE.md

## Audience & Purpose

Backend engineers building event-driven systems. Covers Kafka architecture, core concepts (topics, partitions, brokers), the producer/consumer model, replication for fault tolerance, and real-world use cases. All interactive components use data from `src/data/kafkaData.ts`.

## Sections

| Page ID | Content |
|---------|---------|
| `kafka-overview` | What is Kafka, comparison vs traditional MQs, live broker cluster demo |
| `kafka-concepts` | Six core building blocks: events, topics, partitions, brokers, producers, consumers |
| `kafka-architecture` | Cluster topology, ZooKeeper vs KRaft, partition leaders |
| `kafka-producers` | Writing data, key-based partitioning, ack levels (0, 1, all) |
| `kafka-consumers` | Pull model, consumer groups, rebalancing, interactive simulator |
| `kafka-partitions` | Ordering guarantees, interactive partition visualizer, partition count strategy |
| `kafka-replication` | Replication factor, ISR sets, leader election, broker failure simulator |
| `kafka-usecases` | Event sourcing, CDC, microservices, log aggregation, ML pipelines |
| `kafka-playground` | Full event stream simulator, key takeaways |

## Interactive Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `KafkaBrokerCluster` | *(none)* | Animated broker cluster showing messages arriving at 3 brokers |
| `KafkaComparison` | *(none)* | Kafka vs Traditional MQ comparison table from `KAFKA_COMPARISON_ROWS` |
| `KafkaPartitionVisualizer` | *(none)* | Interactive partition demo — produce messages and see key-based routing |
| `KafkaConsumerGroupSim` | *(none)* | Consumer group rebalancing simulator with adjustable consumer count |
| `KafkaReplicationViz` | *(none)* | Broker failure simulator showing automatic leader election |
| `KafkaMessagePlayground` | *(none)* | Full event stream simulation with terminal-style log output |

## Guide-Specific Conventions

- **Data location:** All interactive data in `src/data/kafkaData.ts`
- **Accent color:** Red/rose (`be123c` light, `e94560` dark) for Kafka branding
- **Concept definitions:** Use shared `DefinitionTable` + `DefRow` in MDX
- **Code examples:** Use `CodeAccordion` for conceptual code blocks
