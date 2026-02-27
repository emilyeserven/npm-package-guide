import type { AwsService } from './types'

export const DATABASE_SERVICES: AwsService[] = [
  {
    id: 'rds',
    name: 'RDS',
    fullName: 'Relational Database Service',
    cat: 'database',
    level: 'beginner',
    icon: '🐘',
    short: 'Managed SQL databases. Pick your engine (PostgreSQL, MySQL, etc.) and AWS handles backups, patching, scaling, and replication.',
    analogy: 'Hiring a property manager for your database apartment — they handle maintenance, you just live there.',
    detail: 'RDS lets you spin up a database in minutes without thinking about the server it runs on. You choose an engine (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, or Aurora), pick the size, and AWS handles everything else: automated backups, security patches, failover, and read replicas.',
    useCases: [
      'Any app that needs a traditional SQL database',
      'E-commerce product catalogs',
      'User accounts and authentication data',
    ],
    keyTerms: {
      Engine: 'The database type (PostgreSQL, MySQL, etc.)',
      'Multi-AZ': 'Automatic failover to a backup in another data center',
      'Read Replica': 'A read-only copy to spread out database load',
    },
    pricing: 'Free tier: 750 hrs/month of db.t3.micro for 12 months. After: varies by instance size and engine.',
    code: '// Connect to RDS PostgreSQL from Node.js\nimport pg from \'pg\';\n\nconst pool = new pg.Pool({\n  host: \'mydb.abc123.us-east-1.rds.amazonaws.com\',\n  database: \'myapp\',\n  user: \'admin\',\n  password: process.env.DB_PASSWORD,\n});\n\nconst { rows } = await pool.query(\'SELECT * FROM users\');',
    howItWorks: `When you create an RDS instance, AWS provisions an EC2 instance behind the scenes, attaches EBS storage to it, and installs your chosen database engine. You never see or SSH into this instance — you interact with it purely through the database connection endpoint AWS gives you.

RDS automates the tedious DBA tasks that would normally eat your weekends. Automated backups take daily snapshots of your entire database and capture transaction logs every 5 minutes, giving you point-in-time recovery to any second within your retention window (up to 35 days). When you enable Multi-AZ, AWS creates a synchronous standby replica in a different Availability Zone — if the primary fails, DNS automatically flips to the standby in about 60 seconds, no code changes needed.

Read Replicas work differently from Multi-AZ. They use asynchronous replication to create read-only copies of your database — perfect for offloading heavy read queries from your primary. You can have up to 5 read replicas per source instance, and they can even live in different AWS regions for lower-latency reads globally. As a frontend engineer, think of this like a CDN for your database: the writes go to the origin, but reads can be served from closer copies.`,
    gotchas: [
      'Storage autoscaling has a 6-hour cooldown between scaling events — if your storage spikes rapidly, you could run out of space before autoscaling kicks in again. Always set your max storage limit generously.',
      'Multi-AZ failover takes 60-120 seconds, and your app will see connection errors during that window. Your connection pool library needs retry logic — don\'t assume the database is always reachable.',
      'Read Replicas use asynchronous replication, which means there\'s a replication lag (usually milliseconds, but can spike to seconds). If you write a record and immediately read it from a replica, you might not see it yet. Always read from the primary after writes when consistency matters.',
      'Restoring from a backup creates a NEW RDS instance with a new endpoint — it does not overwrite the existing one. You\'ll need to update your app\'s connection string or swap DNS.',
    ],
    whenNotToUse: [
      'If your app needs sub-millisecond reads for hot data (use ElastiCache) or handles massively variable workloads that spike from 0 to thousands of requests per second (consider DynamoDB or Aurora Serverless).',
      'If your access patterns are simple key-value lookups and you don\'t need relational joins, SQL schemas, or ACID transactions — a NoSQL database like DynamoDB will be simpler and cheaper.',
      'If you need to run complex analytical queries across billions of rows (use Redshift or Athena instead — RDS is optimized for transactional workloads, not data warehousing).',
    ],
    relatedServices: ['aurora', 'dynamodb', 'elasticache', 's3', 'lambda', 'ec2'],
    relatedGuides: [],
    cliExample: `# Create a PostgreSQL RDS instance
aws rds create-db-instance \\
  --db-instance-identifier my-postgres-db \\
  --db-instance-class db.t3.micro \\
  --engine postgres \\
  --engine-version 16.4 \\
  --master-username admin \\
  --master-user-password "$DB_PASSWORD" \\
  --allocated-storage 20 \\
  --storage-type gp3 \\
  --backup-retention-period 7 \\
  --multi-az`,
    cdkExample: `import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

const db = new rds.DatabaseInstance(this, 'MyPostgres', {
  engine: rds.DatabaseInstanceEngine.postgres({
    version: rds.PostgresEngineVersion.VER_16_4,
  }),
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.T3, ec2.InstanceSize.MICRO,
  ),
  vpc,
  multiAz: true,
  allocatedStorage: 20,
  storageType: rds.StorageType.GP3,
  backupRetention: cdk.Duration.days(7),
  deletionProtection: true,
  removalPolicy: cdk.RemovalPolicy.SNAPSHOT,
});`,
  },
  {
    id: 'dynamodb',
    name: 'DynamoDB',
    fullName: 'Amazon DynamoDB',
    cat: 'database',
    level: 'intermediate',
    icon: '⚡',
    short: 'A blazing-fast NoSQL database. No schemas, no SQL. Just key-value pairs and documents with single-digit millisecond reads.',
    analogy: 'A massive dictionary — look up any word (key) instantly, no need to read the whole book.',
    detail: 'DynamoDB is a fully managed NoSQL database that scales to handle millions of requests per second. You define a table with a primary key, and DynamoDB handles all partitioning and replication. It\'s schema-less, so each item can have different attributes. Think of it as a turbocharged JSON store.',
    useCases: [
      'Session storage',
      'Real-time leaderboards',
      'IoT device data',
      'Shopping carts and user preferences',
    ],
    keyTerms: {
      'Partition Key': 'The primary lookup key for your data',
      'Sort Key': 'Optional secondary key for ordering/querying within a partition',
      GSI: 'Global Secondary Index — an alternate way to query your data',
    },
    pricing: 'Free tier: 25 GB storage + 25 read/write capacity units (forever, not 12 months!).',
    code: '// Write to DynamoDB\nimport { DynamoDBClient, PutItemCommand } from \'@aws-sdk/client-dynamodb\';\n\nawait client.send(new PutItemCommand({\n  TableName: \'Users\',\n  Item: {\n    userId: { S: \'u_123\' },\n    name: { S: \'Alice\' },\n    score: { N: \'42\' },\n  },\n}));',
    howItWorks: `DynamoDB stores data across a fleet of SSD-backed servers, automatically partitioning your table based on the partition key. When you write an item, DynamoDB hashes the partition key to determine which physical partition stores that item, then replicates it across three Availability Zones before confirming the write. This triple-replication is why DynamoDB is so durable — your data survives even if an entire data center goes down.

Read and write capacity can be managed in two modes. In "provisioned" mode, you specify how many reads and writes per second you need, and AWS reserves that capacity. In "on-demand" mode, DynamoDB instantly scales to match your traffic with zero capacity planning — you just pay per request. For frontend engineers used to serverless patterns, on-demand mode pairs beautifully with Lambda: no servers, no capacity planning, just code and data.

The key to DynamoDB performance is understanding that it excels at known-key lookups but struggles with ad-hoc queries. You access data by its primary key (partition key + optional sort key). If you need to query by a different attribute, you create a Global Secondary Index (GSI). Think of GSIs as automatically maintained copies of your table, sorted differently — like having the same phone book organized by name AND by address. DynamoDB Streams can push changes in real time to Lambda functions, enabling event-driven architectures where a write to the database triggers downstream processing.`,
    gotchas: [
      'Hot partition problem: If too many requests target the same partition key, DynamoDB throttles those requests even if you have overall capacity to spare. Distribute your partition keys evenly — using a user ID is great, using a status field with 3 possible values is terrible.',
      'Items are limited to 400 KB each. If you need to store large blobs, store them in S3 and keep a reference in DynamoDB. This catches people who try to store images or documents directly.',
      'GSIs are eventually consistent — there is no strongly consistent read option on secondary indexes. If you write an item and immediately query a GSI for it, you might not find it for a few hundred milliseconds.',
      'Scan operations read EVERY item in the table and are expensive — both in time and cost. If you catch yourself using Scan in production, you almost certainly need a GSI or need to rethink your data model.',
    ],
    whenNotToUse: [
      'If your app requires complex joins, multi-table transactions, or ad-hoc SQL queries across many fields — a relational database (RDS, Aurora) will be far more natural and efficient.',
      'If you need full-text search or fuzzy matching across document contents (use OpenSearch). DynamoDB can only do exact key lookups and range queries on sort keys.',
      'If your data has highly relational structures (many-to-many relationships, foreign keys, referential integrity constraints) — modeling these in DynamoDB requires complex denormalization that often causes more pain than it solves.',
    ],
    relatedServices: ['lambda', 's3', 'kinesis', 'elasticache', 'sns', 'sqs'],
    relatedGuides: [],
    cliExample: `# Create a DynamoDB table with on-demand billing
aws dynamodb create-table \\
  --table-name Sessions \\
  --attribute-definitions \\
    AttributeName=sessionId,AttributeType=S \\
  --key-schema \\
    AttributeName=sessionId,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST

# Put an item
aws dynamodb put-item \\
  --table-name Sessions \\
  --item '{"sessionId":{"S":"sess_abc"},"userId":{"S":"u_123"},"ttl":{"N":"1700000000"}}'`,
    cdkExample: `import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

const table = new dynamodb.Table(this, 'Sessions', {
  tableName: 'Sessions',
  partitionKey: { name: 'sessionId', type: dynamodb.AttributeType.STRING },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  timeToLiveAttribute: 'ttl',
  pointInTimeRecoveryEnabled: true,
});

// Add a GSI for querying by userId
table.addGlobalSecondaryIndex({
  indexName: 'userId-index',
  partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
});`,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    fullName: 'Amazon Aurora',
    cat: 'database',
    level: 'intermediate',
    icon: '🌌',
    short: 'AWS\'s own high-performance SQL database. Compatible with MySQL/PostgreSQL but 3–5x faster, with automatic scaling and replication.',
    analogy: 'A souped-up sports car engine that drops right into your regular car. Same gas (SQL), way more horsepower.',
    detail: 'Aurora is AWS\'s custom-built relational database that\'s fully compatible with MySQL and PostgreSQL. It uses a distributed storage layer that automatically replicates data across 3 Availability Zones. Aurora Serverless can even scale capacity up and down automatically.',
    useCases: [
      'High-traffic production applications',
      'Applications that outgrow standard RDS',
      'SaaS platforms needing high availability',
    ],
    keyTerms: {
      'Aurora Serverless': 'Automatically scales compute capacity based on demand',
      Cluster: 'A group of database instances that share the same storage',
    },
    pricing: 'No free tier. Starts at ~$0.10/hr for the smallest instance. Aurora Serverless v2 scales from $0.12/ACU-hour.',
    code: '// Connect to Aurora PostgreSQL — identical to RDS PostgreSQL\nimport pg from \'pg\';\n\nconst pool = new pg.Pool({\n  host: \'my-cluster.cluster-abc123.us-east-1.rds.amazonaws.com\',\n  database: \'myapp\',\n  user: \'admin\',\n  password: process.env.DB_PASSWORD,\n  ssl: { rejectUnauthorized: true },\n});\n\n// Use the reader endpoint for read-heavy queries\nconst readerPool = new pg.Pool({\n  host: \'my-cluster.cluster-ro-abc123.us-east-1.rds.amazonaws.com\',\n  database: \'myapp\',\n  user: \'admin\',\n  password: process.env.DB_PASSWORD,\n});',
    howItWorks: `Aurora separates compute from storage in a way that is fundamentally different from traditional databases. The storage layer is a distributed, fault-tolerant, self-healing system that spans three Availability Zones with six copies of your data. Writes are acknowledged after 4 of 6 copies confirm, and reads only need 3 of 6 — this quorum model means Aurora can tolerate losing an entire AZ (and one additional node) without any data loss or downtime.

The compute layer consists of a primary instance (reads and writes) and up to 15 Aurora Replicas (reads only). Because all instances share the same underlying storage volume, creating a replica does NOT copy the data — it just adds a new compute node that reads from the same storage. This means replicas are cheap and fast to create, and replication lag is typically under 20 milliseconds (compared to seconds for standard RDS read replicas).

Aurora Serverless v2 takes this further by allowing compute capacity to scale in fine-grained increments (0.5 ACU steps) in real time. For frontend engineers, this is the "Lambda for databases" experience — you set a min and max ACU range, and Aurora scales between them based on actual load. Your API might need 2 ACUs at 3 AM and 64 ACUs during a product launch, and Aurora handles this without any connection drops or manual intervention.`,
    gotchas: [
      'Aurora Serverless v2 has a minimum cost even when idle — it scales DOWN to your minimum ACU setting but never to zero. If you need a database that can fully pause to save money in dev environments, look at Aurora Serverless v1 (which has its own limitations) or use standard RDS with stop/start.',
      'The "5x faster than MySQL" claim applies to specific high-throughput write workloads. For simple CRUD apps with moderate traffic, you may not see a meaningful speed difference over standard RDS — but you will see a meaningful price difference.',
      'Aurora failover is fast (~30 seconds) but your application still needs to handle reconnection. The cluster endpoint DNS TTL is 5 seconds, so make sure your connection pool respects DNS TTL and doesn\'t cache stale IP addresses forever.',
      'Global Database (cross-region replication) has ~1 second replication lag. If your app writes in us-east-1 and reads in eu-west-1, recently written data may not be visible. Design your app to read from the local region for non-critical reads and from the writer region for writes and critical reads.',
    ],
    whenNotToUse: [
      'For small projects, dev environments, or hobby apps where cost matters — standard RDS with a t3.micro in the free tier will be 10x cheaper. Aurora\'s performance benefits only matter at scale.',
      'If your workload is primarily key-value lookups without complex queries, DynamoDB will be cheaper and faster. Aurora\'s SQL engine is powerful but overkill for simple get/set patterns.',
      'If you need zero-to-zero scaling for a database that sits idle most of the time (like a weekend project or staging environment), Aurora Serverless v2 won\'t scale to zero and you\'ll pay for minimum ACUs 24/7.',
    ],
    relatedServices: ['rds', 'elasticache', 'lambda', 's3', 'cloudwatch', 'ec2'],
    relatedGuides: [],
    cliExample: `# Create an Aurora PostgreSQL Serverless v2 cluster
aws rds create-db-cluster \\
  --db-cluster-identifier my-aurora-cluster \\
  --engine aurora-postgresql \\
  --engine-version 16.4 \\
  --serverless-v2-scaling-configuration MinCapacity=0.5,MaxCapacity=16 \\
  --master-username admin \\
  --master-user-password "$DB_PASSWORD"

# Add a Serverless v2 instance to the cluster
aws rds create-db-instance \\
  --db-instance-identifier my-aurora-instance \\
  --db-cluster-identifier my-aurora-cluster \\
  --engine aurora-postgresql \\
  --db-instance-class db.serverless`,
    cdkExample: `import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

const cluster = new rds.DatabaseCluster(this, 'AuroraCluster', {
  engine: rds.DatabaseClusterEngine.auroraPostgres({
    version: rds.AuroraPostgresEngineVersion.VER_16_4,
  }),
  vpc,
  serverlessV2MinCapacity: 0.5,
  serverlessV2MaxCapacity: 16,
  writer: rds.ClusterInstance.serverlessV2('writer'),
  readers: [
    rds.ClusterInstance.serverlessV2('reader', {
      scaleWithWriter: true,
    }),
  ],
  defaultDatabaseName: 'myapp',
  removalPolicy: cdk.RemovalPolicy.SNAPSHOT,
});`,
  },
  {
    id: 'elasticache',
    name: 'ElastiCache',
    fullName: 'Amazon ElastiCache',
    cat: 'database',
    level: 'intermediate',
    icon: '🏎️',
    short: 'Managed Redis or Memcached. An in-memory cache that makes your app\'s frequent database queries lightning fast.',
    analogy: 'Sticky notes on your desk — instead of walking to the filing cabinet (database) every time, you keep hot info within arm\'s reach.',
    detail: 'ElastiCache puts a fast, in-memory data store between your app and your database. When your app asks for data, it checks the cache first. If it\'s there (a "cache hit"), it\'s returned in microseconds instead of milliseconds. This dramatically reduces database load and speeds up response times.',
    useCases: [
      'Caching database query results',
      'Session storage',
      'Real-time leaderboards and counters',
      'Rate limiting',
    ],
    keyTerms: {
      Redis: 'Feature-rich in-memory store with data structures, pub/sub, persistence',
      Memcached: 'Simpler, multi-threaded cache (less features, more raw throughput)',
      TTL: 'Time To Live — how long a cached item stays before expiring',
    },
    pricing: 'Free tier: 750 hrs of cache.t3.micro for 12 months. After: varies by node type.',
    code: '// Use ElastiCache Redis as a cache layer\nimport Redis from \'ioredis\';\n\nconst redis = new Redis({\n  host: \'my-cache.abc123.use1.cache.amazonaws.com\',\n  port: 6379,\n  tls: {},\n});\n\n// Cache-aside pattern\nasync function getUser(id: string) {\n  const cached = await redis.get(`user:${id}`);\n  if (cached) return JSON.parse(cached);\n\n  const user = await db.query(\'SELECT * FROM users WHERE id = $1\', [id]);\n  await redis.setex(`user:${id}`, 300, JSON.stringify(user)); // TTL: 5 min\n  return user;\n}',
    howItWorks: `ElastiCache runs Redis or Memcached on dedicated EC2 instances within your VPC. When you create a cluster, AWS provisions nodes, configures replication, and handles patching. For Redis, you get a primary node that accepts writes and one or more replica nodes that handle reads — similar to RDS read replicas, but operating in microseconds instead of milliseconds because everything is in memory.

The most common integration pattern is "cache-aside" (also called lazy loading). Your application code checks the cache first. On a cache miss, it queries the database, writes the result to the cache with a TTL, and returns it. On subsequent requests, the cache serves the data directly. This single pattern can reduce your database load by 80-90% for read-heavy applications. For frontend engineers, think of it like React's useMemo — you compute an expensive value once and reuse it until it's invalidated.

Redis on ElastiCache goes far beyond simple key-value caching. Sorted sets give you real-time leaderboards (ZADD/ZRANGE operations), pub/sub enables real-time messaging between services, Lua scripting lets you run atomic multi-step operations, and Redis Streams provide a lightweight event streaming system. ElastiCache also supports cluster mode, which shards your data across multiple nodes to scale beyond the memory limit of a single machine — your app connects to the cluster endpoint and Redis handles routing each key to the correct shard.`,
    gotchas: [
      'ElastiCache runs INSIDE your VPC and is NOT accessible from the public internet. If you try to connect from your laptop, it won\'t work — you need to be on the same VPC (via a VPN, bastion host, or running your app on EC2/ECS/Lambda within the VPC).',
      'Cache invalidation is the hardest problem: if your database updates a record but you don\'t invalidate or update the cache, your app serves stale data. Set conservative TTLs and actively delete cache keys when the underlying data changes.',
      'Redis is single-threaded for command execution — one slow command (like KEYS * on a large dataset) blocks all other operations. Use SCAN instead of KEYS in production, and avoid O(N) operations on large collections.',
      'Memory is finite and expensive. If your cache fills up, Redis evicts keys based on the eviction policy (allkeys-lru is usually what you want). Monitor cache hit rate and memory usage — a cache with a low hit rate is just an expensive middleman.',
    ],
    whenNotToUse: [
      'If your app has very low read traffic or every read is unique (no repeated queries), a cache adds complexity without benefit. Caching only helps when the same data is requested multiple times.',
      'If you need durable storage for data you can\'t afford to lose — Redis persistence (RDB/AOF) exists but is not a substitute for a real database. Treat cached data as ephemeral.',
      'If your application is not running inside a VPC (e.g., external services, edge functions, or static sites that call APIs), you cannot directly reach ElastiCache. Consider a managed Redis service with public endpoints instead.',
    ],
    relatedServices: ['rds', 'aurora', 'dynamodb', 'lambda', 'ec2', 'ecs'],
    relatedGuides: ['redis'],
    cliExample: `# Create an ElastiCache Redis replication group (cluster mode disabled)
aws elasticache create-replication-group \\
  --replication-group-id my-redis-cache \\
  --replication-group-description "App cache layer" \\
  --engine redis \\
  --engine-version 7.1 \\
  --cache-node-type cache.t3.micro \\
  --num-cache-clusters 2 \\
  --automatic-failover-enabled \\
  --transit-encryption-enabled \\
  --at-rest-encryption-enabled`,
    cdkExample: `import * as elasticache from 'aws-cdk-lib/aws-elasticache';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

const subnetGroup = new elasticache.CfnSubnetGroup(this, 'RedisSubnets', {
  description: 'Subnets for Redis',
  subnetIds: vpc.privateSubnets.map(s => s.subnetId),
});

const sg = new ec2.SecurityGroup(this, 'RedisSG', { vpc });
sg.addIngressRule(ec2.Peer.ipv4(vpc.vpcCidrBlock), ec2.Port.tcp(6379));

const redis = new elasticache.CfnReplicationGroup(this, 'Redis', {
  replicationGroupDescription: 'App cache layer',
  engine: 'redis',
  engineVersion: '7.1',
  cacheNodeType: 'cache.t3.micro',
  numCacheClusters: 2,
  automaticFailoverEnabled: true,
  transitEncryptionEnabled: true,
  atRestEncryptionEnabled: true,
  cacheSubnetGroupName: subnetGroup.ref,
  securityGroupIds: [sg.securityGroupId],
});`,
  },
  {
    id: 'documentdb',
    name: 'DocumentDB',
    fullName: 'Amazon DocumentDB',
    cat: 'database',
    level: 'intermediate',
    icon: '🍃',
    short: 'Managed MongoDB-compatible database. If you love MongoDB\'s document model but want AWS to handle the operations.',
    analogy: 'A MongoDB that someone else maintains for you — same language, managed infrastructure.',
    detail: 'DocumentDB is a managed document database with MongoDB compatibility. You can use your existing MongoDB drivers and tools, but AWS manages backups, scaling, and replication. Under the hood it uses a different storage engine than MongoDB, so there are some compatibility nuances.',
    useCases: [
      'Applications already using MongoDB',
      'Content management with flexible schemas',
      'Catalogs and user profiles',
    ],
    keyTerms: {
      Document: 'A JSON-like data record',
      Collection: 'A group of documents (like a SQL table)',
    },
    pricing: 'No free tier. Instances start at ~$0.076/hr for db.t3.medium.',
    code: '// Connect to DocumentDB from Node.js using the MongoDB driver\nimport { MongoClient } from \'mongodb\';\n\nconst client = new MongoClient(\n  \'mongodb://admin:password@my-docdb-cluster.cluster-abc123.us-east-1.docdb.amazonaws.com:27017\',\n  {\n    tls: true,\n    tlsCAFile: \'global-bundle.pem\', // AWS root CA\n    retryWrites: false, // DocumentDB does not support retryable writes\n  }\n);\n\nconst db = client.db(\'myapp\');\nconst users = db.collection(\'users\');\nawait users.insertOne({ name: \'Alice\', role: \'engineer\', tags: [\'frontend\'] });\nconst results = await users.find({ role: \'engineer\' }).toArray();',
    howItWorks: `DocumentDB uses a storage architecture similar to Aurora — a distributed, fault-tolerant storage volume that replicates data six ways across three Availability Zones. The compute layer (your DocumentDB instances) is separate from the storage layer, which means you can add read replicas without duplicating data. This architecture gives you automatic storage scaling up to 128 TiB without any downtime or performance impact.

When you write a document, DocumentDB persists it to the shared storage volume and replicates it before confirming the write. Read replicas share the same storage and typically lag by less than 100 milliseconds. The cluster provides two endpoints: a cluster endpoint for writes (routes to the primary) and a reader endpoint for reads (load-balances across replicas). Your application should use both — writes to the cluster endpoint, reads to the reader endpoint — to distribute load efficiently.

Under the hood, DocumentDB is NOT MongoDB — it emulates the MongoDB API (wire protocol compatible for MongoDB 3.6, 4.0, and 5.0) but uses its own purpose-built query engine and storage system. This means most MongoDB drivers and tools work out of the box, but some MongoDB-specific features behave differently or are not supported. The practical impact for frontend engineers is that your existing Mongoose or MongoDB driver code will mostly work, but you should test thoroughly and check the DocumentDB compatibility matrix for features you rely on.`,
    gotchas: [
      'DocumentDB does NOT support retryable writes — you must set retryWrites: false in your MongoDB connection string. If you forget, you\'ll get cryptic errors that are hard to debug.',
      'Not all MongoDB features are supported. Notable gaps include: $graphLookup, client-side field-level encryption, change streams resumability differences, and certain aggregation operators. Always check the AWS compatibility matrix before migrating a MongoDB app.',
      'DocumentDB requires TLS connections and uses AWS\'s own CA certificate. You need to download the global-bundle.pem file and configure your driver to use it — this trips up every developer the first time.',
      'Pricing is per-instance plus I/O costs. Unlike MongoDB Atlas which has a free tier, DocumentDB has no free tier and the minimum cost (db.t3.medium) is ~$55/month. For small projects, a self-managed MongoDB on EC2 or MongoDB Atlas may be cheaper.',
    ],
    whenNotToUse: [
      'If you need full MongoDB compatibility (change streams, transactions across shards, retryable writes, latest MongoDB features) — use MongoDB Atlas instead. DocumentDB is a subset of MongoDB\'s API, not a drop-in replacement.',
      'If your data is naturally relational with complex joins and referential integrity — use RDS or Aurora. Document databases shine when your data is hierarchical or semi-structured, not when you\'re fighting to denormalize relational data.',
      'If you\'re starting a new project and don\'t have existing MongoDB code — consider DynamoDB for simpler document storage (cheaper, serverless) or Aurora for relational needs. DocumentDB\'s main value proposition is MongoDB migration.',
    ],
    relatedServices: ['rds', 'aurora', 'dynamodb', 's3', 'lambda'],
    relatedGuides: [],
    cliExample: `# Create a DocumentDB cluster
aws docdb create-db-cluster \\
  --db-cluster-identifier my-docdb-cluster \\
  --engine docdb \\
  --master-username admin \\
  --master-user-password "$DB_PASSWORD" \\
  --storage-encrypted

# Add an instance to the cluster
aws docdb create-db-instance \\
  --db-instance-identifier my-docdb-instance \\
  --db-cluster-identifier my-docdb-cluster \\
  --db-instance-class db.t3.medium \\
  --engine docdb`,
    cdkExample: `import * as docdb from 'aws-cdk-lib/aws-docdb';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

const cluster = new docdb.DatabaseCluster(this, 'DocDBCluster', {
  masterUser: { username: 'admin' },
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM,
  ),
  vpc,
  vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
  instances: 2, // 1 primary + 1 replica
  storageEncrypted: true,
  removalPolicy: cdk.RemovalPolicy.SNAPSHOT,
});`,
  },
  {
    id: 'redshift',
    name: 'Redshift',
    fullName: 'Amazon Redshift',
    cat: 'database',
    level: 'advanced',
    icon: '📊',
    short: 'A data warehouse for analytics. Run complex SQL queries across petabytes of structured data. Powers business intelligence dashboards.',
    analogy: 'A giant research library organized for answering big questions — "What were our sales by region last quarter across all products?"',
    detail: 'Redshift is a columnar data warehouse optimized for analytical queries (OLAP). Unlike RDS which handles transactions (many reads/writes per row), Redshift handles analytics (scanning millions of rows, aggregating data). It uses SQL, so it\'s familiar, but the storage and query engine are built for massive-scale analytics.',
    useCases: [
      'Business intelligence dashboards',
      'Sales and revenue analytics',
      'Log analysis at scale',
      'Data lake queries',
    ],
    keyTerms: {
      Cluster: 'A group of nodes that store data and run queries',
      'Columnar Storage': 'Stores data by column rather than row (faster for analytics)',
      'Redshift Serverless': 'Pay-per-query option without managing clusters',
    },
    pricing: 'Serverless: $0.375/RPU-hour. Provisioned: from ~$0.25/hr for dc2.large.',
    code: '// Query Redshift using the Data API (no VPC needed)\nimport {\n  RedshiftDataClient,\n  ExecuteStatementCommand,\n  GetStatementResultCommand,\n} from \'@aws-sdk/client-redshift-data\';\n\nconst client = new RedshiftDataClient({});\n\n// Execute a query\nconst { Id } = await client.send(new ExecuteStatementCommand({\n  WorkgroupName: \'my-workgroup\',  // Serverless\n  Database: \'analytics\',\n  Sql: \'SELECT region, SUM(revenue) as total FROM sales GROUP BY region\',\n}));\n\n// Poll for results (queries are async)\nconst result = await client.send(new GetStatementResultCommand({ Id }));',
    howItWorks: `Redshift stores data in a columnar format, which is the key to its analytical performance. In a traditional row-based database (like RDS), reading all revenue figures means scanning every column of every row, even though you only care about one column. In Redshift's columnar storage, all the values for a single column are stored contiguously on disk, so reading all revenue figures only touches the revenue column — skipping name, address, and every other column entirely. For analytics queries that aggregate a few columns across millions of rows, this can be 10-100x faster.

Redshift distributes data across multiple nodes in a cluster. When you load data, Redshift partitions it across nodes using a distribution style you choose: KEY (rows with the same key go to the same node — great for joins), EVEN (round-robin across nodes), or ALL (copies the entire table to every node — for small dimension tables). Queries run in parallel across all nodes simultaneously, and the leader node combines the results. This massively parallel processing (MPP) architecture is how Redshift crunches petabytes of data.

Redshift Serverless removes the need to size and manage clusters. You create a workgroup, and Redshift automatically provisions compute resources when queries arrive and scales them down when idle. For frontend engineers building dashboards, this is the easiest path: connect your charting library to Redshift Serverless via the Data API (no VPC or connection pooling needed), and AWS handles the infrastructure. Redshift Spectrum extends this further by letting you query data directly in S3 without loading it into Redshift — useful for cold data you query infrequently.`,
    gotchas: [
      'Redshift is NOT designed for transactional workloads (OLTP). Single-row inserts, updates, and deletes are extremely slow compared to RDS. Load data in bulk using COPY from S3 — never insert rows one at a time.',
      'COPY command gotcha: Redshift loads data much faster from S3 if the data is split into multiple files (ideally equal to or a multiple of the number of slices). A single giant file loads serially on one slice while the rest sit idle.',
      'Queries can consume all your cluster\'s resources, causing other queries to queue. Use Workload Management (WLM) queues to allocate resources and prevent a single runaway analytics query from blocking your dashboard refreshes.',
      'Redshift Serverless charges by RPU-seconds and has a base capacity — even simple queries consume a minimum amount of RPUs. For sporadic, lightweight queries on S3 data, Athena is usually cheaper.',
    ],
    whenNotToUse: [
      'For transactional workloads where your app does frequent single-row reads and writes (use RDS or Aurora). Redshift\'s columnar engine is optimized for scanning many rows, not looking up individual records.',
      'For ad-hoc queries on small to medium datasets in S3 — Athena is serverless with zero infrastructure and charges only $5/TB scanned, which is cheaper than Redshift Serverless for infrequent queries.',
      'If your analytics dataset fits comfortably in a single RDS PostgreSQL instance (under ~500 GB with moderate query complexity), a standard database with proper indexing may handle your analytics needs without the complexity and cost of a data warehouse.',
    ],
    relatedServices: ['s3', 'athena', 'kinesis', 'lambda', 'cloudwatch', 'rds'],
    relatedGuides: [],
    cliExample: `# Create a Redshift Serverless workgroup
aws redshift-serverless create-namespace \\
  --namespace-name my-analytics \\
  --admin-username admin \\
  --admin-user-password "$DB_PASSWORD" \\
  --db-name analytics

aws redshift-serverless create-workgroup \\
  --workgroup-name my-workgroup \\
  --namespace-name my-analytics \\
  --base-capacity 8

# Load data from S3
aws redshift-data execute-statement \\
  --workgroup-name my-workgroup \\
  --database analytics \\
  --sql "COPY sales FROM 's3://my-bucket/sales/' IAM_ROLE 'arn:aws:iam::123456789012:role/RedshiftS3Access' CSV"`,
    cdkExample: `import * as redshift from '@aws-cdk-lib/aws-redshiftserverless';

const namespace = new redshift.CfnNamespace(this, 'Namespace', {
  namespaceName: 'my-analytics',
  adminUsername: 'admin',
  adminUserPassword: secretValue.unsafeUnwrap(),
  dbName: 'analytics',
});

const workgroup = new redshift.CfnWorkgroup(this, 'Workgroup', {
  workgroupName: 'my-workgroup',
  namespaceName: namespace.namespaceName,
  baseCapacity: 8,
  publiclyAccessible: false,
  subnetIds: vpc.privateSubnets.map(s => s.subnetId),
  securityGroupIds: [sg.securityGroupId],
});`,
  },
  {
    id: 'athena',
    name: 'Athena',
    fullName: 'Amazon Athena',
    cat: 'database',
    level: 'intermediate',
    icon: '🔎',
    short: 'Query data directly in S3 using SQL. No database to set up — just point at your files and run queries.',
    analogy: 'A search engine for your files — ask SQL questions about CSV, JSON, or Parquet files sitting in S3, no database needed.',
    detail: 'Athena is a serverless query engine that lets you run SQL queries directly against data stored in S3. No data loading, no infrastructure to manage. Just create a table definition that maps to your S3 files (CSV, JSON, Parquet, ORC), and start querying. Pay only for the data scanned by each query.',
    useCases: [
      'Ad-hoc analysis of log files in S3',
      'Querying data lake contents',
      'Cost analysis of AWS billing data',
    ],
    keyTerms: {
      'External Table': 'A table definition that points to S3 data',
      Partition: 'Organizing data by date/category to speed queries and reduce cost',
    },
    pricing: '$5 per TB of data scanned. Use columnar formats (Parquet) to dramatically reduce costs.',
    code: '// Run an Athena query from Node.js\nimport {\n  AthenaClient,\n  StartQueryExecutionCommand,\n  GetQueryResultsCommand,\n} from \'@aws-sdk/client-athena\';\n\nconst athena = new AthenaClient({});\n\nconst { QueryExecutionId } = await athena.send(\n  new StartQueryExecutionCommand({\n    QueryString: `\n      SELECT date, COUNT(*) as requests, AVG(response_time) as avg_ms\n      FROM api_logs\n      WHERE date >= \'2024-01-01\'\n      GROUP BY date\n      ORDER BY date\n    `,\n    ResultConfiguration: {\n      OutputLocation: \'s3://my-query-results/athena/\',\n    },\n  })\n);\n\n// Poll for completion, then fetch results\nconst results = await athena.send(\n  new GetQueryResultsCommand({ QueryExecutionId })\n);',
    howItWorks: `Athena is built on Presto (now Trino), a distributed SQL query engine. When you submit a query, Athena spins up a fleet of compute resources behind the scenes, reads the data from your S3 bucket, executes the query in parallel across those resources, writes results to an S3 output location, and then releases all compute. You never provision, manage, or even see these resources — you just pay $5 per terabyte of data scanned.

The critical concept for cost and performance is that Athena scans data from S3 for every query — there is no persistent storage or indexing layer. This means the FORMAT of your data matters enormously. A query over 1 TB of raw CSV files costs $5, but the same query over the same data converted to Parquet (a columnar, compressed format) might only scan 50 GB and cost $0.25. Partitioning your data by date or category in S3 (e.g., s3://logs/year=2024/month=01/) lets Athena skip entire folders of irrelevant data, further reducing scans and cost.

For frontend engineers, Athena is perfect for analytics dashboards that don't need sub-second response times. The typical pattern is: your application writes events/logs to S3 (often via Kinesis Firehose), Athena queries those logs for dashboard data, and the results are cached in your application or stored in a fast database like DynamoDB for serving. Queries typically take 2-30 seconds depending on data size, so it's best suited for background processing or dashboards that refresh every few minutes, not real-time user-facing queries.`,
    gotchas: [
      'Athena charges by data scanned, NOT by time. A poorly designed query that scans 5 TB of unpartitioned CSV data costs $25 per execution. Always use Parquet, partition your data, and use column projection (SELECT specific columns, not SELECT *) to control costs.',
      'Query results always go to S3, and those result files accumulate. Set up an S3 lifecycle policy on your Athena results bucket to auto-delete old results, or you\'ll end up with thousands of CSV files eating storage costs.',
      'Athena has a default limit of 20 concurrent queries per account per region. If you have multiple dashboards or users hitting Athena simultaneously, you\'ll get throttling. Request a limit increase or use Athena\'s provisioned capacity for predictable concurrency.',
      'CREATE TABLE in Athena doesn\'t create a database — it creates metadata that points to S3. If someone deletes or moves the S3 files, your Athena table returns empty results without any error. There\'s no referential integrity between the table definition and the underlying data.',
    ],
    whenNotToUse: [
      'If you need sub-second query responses for user-facing features — Athena queries typically take 2-30 seconds due to the overhead of scanning S3. Use DynamoDB, ElastiCache, or Redshift for low-latency reads.',
      'If you\'re running the same complex queries repeatedly (e.g., hourly dashboard refreshes on the same large dataset), Redshift is likely cheaper because it stores data locally and doesn\'t re-scan S3 for every query.',
      'If your data needs frequent updates or deletes — Athena treats S3 data as immutable. While Athena v3 supports limited ACID operations via Apache Iceberg tables, it\'s not designed for transactional update workloads.',
    ],
    relatedServices: ['s3', 'redshift', 'kinesis', 'lambda', 'cloudformation'],
    relatedGuides: ['s3-storage'],
    cliExample: `# Create a database and table pointing to S3 logs
aws athena start-query-execution \\
  --query-string "CREATE DATABASE IF NOT EXISTS analytics" \\
  --result-configuration OutputLocation=s3://my-query-results/athena/

aws athena start-query-execution \\
  --query-string "
    CREATE EXTERNAL TABLE analytics.api_logs (
      request_id STRING,
      method STRING,
      path STRING,
      status INT,
      response_time DOUBLE,
      timestamp STRING
    )
    PARTITIONED BY (date STRING)
    ROW FORMAT SERDE 'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe'
    LOCATION 's3://my-logs-bucket/api-logs/'
  " \\
  --result-configuration OutputLocation=s3://my-query-results/athena/`,
    cdkExample: `import * as glue from 'aws-cdk-lib/aws-glue';
import * as s3 from 'aws-cdk-lib/aws-s3';

// Athena uses the Glue Data Catalog for table metadata
const database = new glue.CfnDatabase(this, 'AnalyticsDB', {
  catalogId: this.account,
  databaseInput: { name: 'analytics' },
});

const table = new glue.CfnTable(this, 'ApiLogsTable', {
  catalogId: this.account,
  databaseName: 'analytics',
  tableInput: {
    name: 'api_logs',
    tableType: 'EXTERNAL_TABLE',
    parameters: { 'classification': 'parquet' },
    storageDescriptor: {
      location: \`s3://\${logsBucket.bucketName}/api-logs/\`,
      inputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat',
      outputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat',
      serdeInfo: {
        serializationLibrary: 'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe',
      },
      columns: [
        { name: 'request_id', type: 'string' },
        { name: 'method', type: 'string' },
        { name: 'path', type: 'string' },
        { name: 'status', type: 'int' },
        { name: 'response_time', type: 'double' },
      ],
    },
    partitionKeys: [{ name: 'date', type: 'string' }],
  },
});`,
  },
  {
    id: 'opensearch',
    name: 'OpenSearch',
    fullName: 'Amazon OpenSearch Service',
    cat: 'database',
    level: 'advanced',
    icon: '🔍',
    short: 'Managed Elasticsearch/OpenSearch. Full-text search, log analytics, and real-time application monitoring at scale.',
    analogy: 'The search engine behind your search bar — indexes your data so users can find anything in milliseconds.',
    detail: 'OpenSearch (formerly Elasticsearch Service) provides managed search and analytics. It excels at full-text search, log analytics, and real-time monitoring. You ingest data from your application or logs, OpenSearch indexes it, and you can search and visualize it with dashboards (OpenSearch Dashboards, formerly Kibana).',
    useCases: [
      'Full-text search for your application',
      'Centralized log analytics (ELK stack)',
      'Real-time application monitoring',
    ],
    keyTerms: {
      Index: 'A collection of documents to search',
      Cluster: 'A group of nodes that store and search data',
      'OpenSearch Dashboards': 'Visualization tool (formerly Kibana)',
    },
    pricing: 'No free tier. Starts at ~$0.036/hr for t3.small.search.',
    code: '// Index and search documents with OpenSearch\nimport { Client } from \'@opensearch-project/opensearch\';\n\nconst client = new Client({\n  node: \'https://my-domain.us-east-1.es.amazonaws.com\',\n});\n\n// Index a document\nawait client.index({\n  index: \'products\',\n  id: \'prod_123\',\n  body: {\n    name: \'Wireless Keyboard\',\n    description: \'Ergonomic Bluetooth keyboard with backlit keys\',\n    price: 49.99,\n    category: \'electronics\',\n  },\n});\n\n// Full-text search with fuzzy matching\nconst { body } = await client.search({\n  index: \'products\',\n  body: {\n    query: {\n      multi_match: {\n        query: \'wireless keybord\', // typo handled by fuzziness\n        fields: [\'name^2\', \'description\'],\n        fuzziness: \'AUTO\',\n      },\n    },\n  },\n});',
    howItWorks: `OpenSearch uses an inverted index — the same fundamental data structure that powers Google. When you index a document, OpenSearch breaks every text field into individual tokens (words), normalizes them (lowercasing, stemming, removing stop words), and builds a mapping from each token to the list of documents containing it. When a user searches for "wireless keyboard," OpenSearch looks up both tokens in the inverted index and returns documents that match, ranked by relevance using the BM25 algorithm.

A cluster consists of multiple nodes with different roles: data nodes store the index shards and execute queries, master nodes manage cluster state, and optional coordinating nodes route requests. Each index is split into shards (pieces), and each shard can have replicas on different nodes. When you search, the query hits all relevant shards in parallel, each shard returns its top matches, and a coordinating node merges and re-ranks them. This distributed architecture is how OpenSearch searches billions of documents in milliseconds.

For frontend engineers, the most common integration pattern is dual-write or async sync. Your application writes to its primary database (RDS, DynamoDB) and also sends the data to OpenSearch for indexing — either directly, through a Lambda function triggered by database changes, or via a streaming pipeline (Kinesis, DynamoDB Streams). Users interact with OpenSearch for search and filtering, and with the primary database for everything else. OpenSearch Serverless removes the cluster management entirely — you create a collection, index data, and AWS manages capacity, scaling, and availability automatically.`,
    gotchas: [
      'OpenSearch is NOT a primary database — it should always be backed by a source-of-truth database (RDS, DynamoDB). If an OpenSearch index gets corrupted or you need to change the mapping, you re-index from the primary database. Never make OpenSearch your only copy of data.',
      'Index mappings (field types) are immutable after creation. If you index a field as "text" and later realize it should be "keyword" (for exact matching and aggregations), you must create a new index with the correct mapping and re-index all data. Plan your mappings carefully upfront.',
      'Cluster sizing is a dark art. Too few data nodes and you run out of disk or memory; too many and you waste money. The rule of thumb: keep storage below 80% capacity, keep JVM heap usage below 75%, and have at least 3 master-eligible nodes for high availability.',
      'Bulk indexing is orders of magnitude faster than individual document indexing. If you\'re syncing data from your database, batch documents into bulk requests of 5-15 MB. Indexing documents one at a time will be painfully slow and create unnecessary load on the cluster.',
    ],
    whenNotToUse: [
      'If you just need simple filters and exact-match lookups (e.g., "find all products where category = electronics"), DynamoDB with a GSI or a SQL database with proper indexes will be simpler, cheaper, and more reliable than running an OpenSearch cluster.',
      'If you\'re only doing log analytics without search requirements, CloudWatch Logs Insights can query logs without running any infrastructure. OpenSearch is overkill for basic log searches if you\'re already using CloudWatch.',
      'If your search corpus is small (under 100K documents) and your query patterns are simple, a PostgreSQL full-text search with tsvector/tsquery in your existing RDS instance will handle it without adding another service to maintain.',
    ],
    relatedServices: ['kinesis', 'lambda', 'cloudwatch', 's3', 'dynamodb', 'ecs'],
    relatedGuides: [],
    cliExample: `# Create an OpenSearch Serverless collection for search
aws opensearchserverless create-security-policy \\
  --name my-encryption-policy \\
  --type encryption \\
  --policy '{"Rules":[{"ResourceType":"collection","Resource":["collection/my-search"]}],"AWSOwnedKey":true}'

aws opensearchserverless create-collection \\
  --name my-search \\
  --type SEARCH \\
  --description "Product search index"

# For a managed (provisioned) domain instead:
aws opensearch create-domain \\
  --domain-name my-search \\
  --engine-version OpenSearch_2.11 \\
  --cluster-config InstanceType=t3.small.search,InstanceCount=2 \\
  --ebs-options EBSEnabled=true,VolumeType=gp3,VolumeSize=20`,
    cdkExample: `import * as opensearch from 'aws-cdk-lib/aws-opensearchservice';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

const domain = new opensearch.Domain(this, 'SearchDomain', {
  version: opensearch.EngineVersion.OPENSEARCH_2_11,
  capacity: {
    dataNodeInstanceType: 't3.small.search',
    dataNodes: 2,
    masterNodeInstanceType: 't3.small.search',
    masterNodes: 3,
  },
  ebs: {
    volumeSize: 20,
    volumeType: ec2.EbsDeviceVolumeType.GP3,
  },
  vpc,
  zoneAwareness: { enabled: true, availabilityZoneCount: 2 },
  nodeToNodeEncryption: true,
  encryptionAtRest: { enabled: true },
  enforceHttps: true,
  removalPolicy: cdk.RemovalPolicy.SNAPSHOT,
});`,
  },
]
