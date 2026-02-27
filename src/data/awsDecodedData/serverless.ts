import type { AwsService } from './types'

export const SERVERLESS_SERVICES: AwsService[] = [
  {
    id: 'lambda',
    name: 'Lambda',
    fullName: 'AWS Lambda',
    cat: 'serverless',
    level: 'beginner',
    icon: '\u03BB',
    short: 'Run code without managing servers. Upload a function, and AWS runs it whenever something triggers it (an API call, a file upload, a timer).',
    analogy: 'A vending machine \u2014 you don\'t run the factory, you just press a button and get your snack. It sits idle until needed.',
    detail: 'Lambda is THE serverless service. You write a function (in JS, Python, Go, etc.), upload it, and define what triggers it. AWS handles all the servers, scaling, and availability. You pay only for the milliseconds your code actually runs. If nobody calls your function, you pay nothing.',
    useCases: [
      'API endpoints (paired with API Gateway)',
      'Processing uploaded images (resize, thumbnail)',
      'Running cron jobs / scheduled tasks',
      'Reacting to database changes',
    ],
    keyTerms: {
      Trigger: 'An event that causes your function to run',
      'Cold Start': 'A slight delay when Lambda spins up a new container for your function',
      Runtime: 'The language environment (Node.js 20.x, Python 3.12, etc.)',
    },
    pricing: 'Free tier: 1M requests + 400,000 GB-seconds/month. This is very generous \u2014 many small apps run free forever.',
    code: '// A Lambda function (Node.js)\nexport const handler = async (event) => {\n  const name = event.queryStringParameters?.name || \'World\';\n  return {\n    statusCode: 200,\n    body: JSON.stringify({ message: `Hello, ${name}!` }),\n  };\n};',
    howItWorks:
      'When you deploy a Lambda function, AWS packages your code into a lightweight container image and stores it. When a trigger fires (HTTP request via API Gateway, S3 upload, SQS message, cron schedule, etc.), the Lambda service finds an available execution environment or creates a new one. Your handler function receives an `event` object containing the trigger payload and a `context` object with metadata like the remaining execution time.\n\n' +
      'Each execution environment is a microVM (powered by Firecracker) with its own file system, memory, and CPU allocation. After your function completes, AWS may keep the environment "warm" for a few minutes to serve subsequent invocations faster \u2014 this is why cold starts only happen on the first invocation or after idle periods. The `/tmp` directory (up to 10 GB) persists between warm invocations, which is useful for caching.\n\n' +
      'Lambda automatically scales horizontally. If 100 requests arrive simultaneously, AWS spins up 100 execution environments. Each AWS account starts with a default concurrency limit of 1,000 concurrent executions per region (adjustable). You can also set "reserved concurrency" to guarantee capacity for critical functions, or "provisioned concurrency" to eliminate cold starts entirely by keeping environments pre-warmed.',
    gotchas: [
      'Cold starts can add 200ms\u20131s+ of latency on the first invocation. Node.js and Python have faster cold starts than Java or .NET. If latency matters, use provisioned concurrency or keep functions warm with scheduled pings.',
      'The maximum execution timeout is 15 minutes. If your task takes longer, break it into steps with Step Functions or offload to ECS/Fargate. This catches many developers off guard when processing large files.',
      'Lambda functions are stateless between invocations (even though warm environments reuse the same container). Never rely on in-memory state persisting \u2014 use DynamoDB, S3, or ElastiCache for shared state.',
      'Deployment package size limits: 50 MB zipped, 250 MB unzipped. If your Node.js `node_modules` is huge, use Lambda Layers to share dependencies across functions or switch to container images (up to 10 GB).',
    ],
    whenNotToUse: [
      'Long-running processes (>15 min) like video transcoding, ML training, or WebSocket servers \u2014 use ECS/Fargate or EC2 instead.',
      'High-throughput, latency-sensitive workloads where cold starts are unacceptable and provisioned concurrency is too expensive \u2014 consider a containerized service behind a load balancer.',
      'Stateful applications that need persistent connections (e.g., a database connection pool shared across requests) \u2014 Lambda\'s ephemeral nature works against you here.',
    ],
    relatedServices: ['api-gateway', 'step-functions', 'eventbridge', 'sqs', 'sns', 's3', 'dynamodb', 'cloudwatch'],
    relatedGuides: [],
    cliExample:
      '# Create a Lambda function from a zip file\n' +
      'aws lambda create-function \\\n' +
      '  --function-name my-api-handler \\\n' +
      '  --runtime nodejs20.x \\\n' +
      '  --handler index.handler \\\n' +
      '  --role arn:aws:iam::123456789012:role/lambda-role \\\n' +
      '  --zip-file fileb://function.zip\n\n' +
      '# Invoke it directly\n' +
      'aws lambda invoke \\\n' +
      '  --function-name my-api-handler \\\n' +
      '  --payload \'{"queryStringParameters":{"name":"Frontend"}}\' \\\n' +
      '  response.json',
    cdkExample:
      'import * as cdk from \'aws-cdk-lib\';\n' +
      'import * as lambda from \'aws-cdk-lib/aws-lambda\';\n' +
      'import * as apigateway from \'aws-cdk-lib/aws-apigateway\';\n\n' +
      'const fn = new lambda.Function(this, \'MyApiHandler\', {\n' +
      '  runtime: lambda.Runtime.NODEJS_20_X,\n' +
      '  handler: \'index.handler\',\n' +
      '  code: lambda.Code.fromAsset(\'lambda\'),\n' +
      '  memorySize: 256,\n' +
      '  timeout: cdk.Duration.seconds(10),\n' +
      '});\n\n' +
      '// Wire up an API Gateway in one line\n' +
      'new apigateway.LambdaRestApi(this, \'MyApi\', {\n' +
      '  handler: fn,\n' +
      '});',
  },
  {
    id: 'step-functions',
    name: 'Step Functions',
    fullName: 'AWS Step Functions',
    cat: 'serverless',
    level: 'intermediate',
    icon: '\u{1F500}',
    short: 'Visual workflow orchestration. Chain Lambda functions and AWS services into complex workflows with branching, retries, and error handling.',
    analogy: 'A flowchart that actually runs \u2014 draw the steps, connect them with arrows, and AWS executes the whole thing.',
    detail: 'Step Functions lets you build workflows as state machines. Each "state" can invoke a Lambda function, call an AWS service, wait, branch based on conditions, run tasks in parallel, or handle errors. You define the workflow in Amazon States Language (JSON), and the visual console shows it as a flowchart.',
    useCases: [
      'Order processing (validate \u2192 charge \u2192 ship \u2192 notify)',
      'Data processing pipelines',
      'Human approval workflows',
      'Error handling and retry logic',
    ],
    keyTerms: {
      'State Machine': 'The complete workflow definition',
      State: 'A single step in the workflow',
      'Task State': 'A state that does work (calls Lambda, etc.)',
    },
    pricing: 'Standard: $0.025/1000 state transitions. Express: $1.00/million requests.',
    code:
      '// Amazon States Language (JSON) \u2014 a simple two-step workflow\n' +
      '{\n' +
      '  "Comment": "Process an order",\n' +
      '  "StartAt": "ValidateOrder",\n' +
      '  "States": {\n' +
      '    "ValidateOrder": {\n' +
      '      "Type": "Task",\n' +
      '      "Resource": "arn:aws:lambda:us-east-1:123:function:validate",\n' +
      '      "Next": "ChargePayment",\n' +
      '      "Retry": [{ "ErrorEquals": ["States.ALL"], "MaxAttempts": 2 }]\n' +
      '    },\n' +
      '    "ChargePayment": {\n' +
      '      "Type": "Task",\n' +
      '      "Resource": "arn:aws:lambda:us-east-1:123:function:charge",\n' +
      '      "End": true\n' +
      '    }\n' +
      '  }\n' +
      '}',
    howItWorks:
      'Step Functions executes workflows defined as state machines in Amazon States Language (ASL), a JSON-based specification. When you start an execution, the service reads the `StartAt` field to determine the first state, runs it, captures its output, and passes that output as input to the next state. This continues until a state with `"End": true` is reached, or the workflow fails.\n\n' +
      'There are two workflow types: Standard and Express. Standard workflows are durable \u2014 they can run for up to a year, support exactly-once execution, and log every state transition to a history you can inspect. Express workflows are optimized for high-volume, short-duration work (up to 5 minutes) and are priced per request rather than per transition. For API-driven patterns like "call three services and aggregate results," Express workflows are dramatically cheaper.\n\n' +
      'The real power is in the state types. Task states call Lambda or 220+ AWS service APIs directly (no Lambda glue code needed). Choice states branch based on conditions. Parallel states run multiple branches concurrently. Map states iterate over arrays, processing each item in parallel. Wait states pause execution (for seconds or until a timestamp). This composability lets you build sophisticated orchestrations without writing control flow code.',
    gotchas: [
      'The ASL JSON syntax has a learning curve. Small mistakes (typos in state names, missing `Next` or `End` fields) produce cryptic errors. Use the Step Functions Workflow Studio visual editor to reduce these errors.',
      'Standard workflow state transition history is limited to 25,000 events per execution. Long-running workflows with many iterations can hit this limit \u2014 use nested (child) executions or Map state to work around it.',
      'Input/output payload size is limited to 256 KB per state. If you need to pass large data between steps, store it in S3 and pass the S3 key instead of the data itself.',
      'Express workflows do NOT support activities, callbacks, or wait-for-token patterns. If you need human approval or external callbacks, you must use Standard workflows.',
    ],
    whenNotToUse: [
      'Simple request-response patterns where a single Lambda function suffices \u2014 Step Functions adds cost and complexity you don\'t need.',
      'Real-time, ultra-low-latency pipelines where the orchestration overhead (tens of milliseconds per state transition) is unacceptable \u2014 consider direct Lambda-to-Lambda invocation or Kinesis.',
      'Workflows where every step is a direct AWS SDK call with no branching or error handling \u2014 EventBridge Pipes or a simple Lambda function may be simpler.',
    ],
    relatedServices: ['lambda', 'eventbridge', 'sqs', 'sns', 'api-gateway', 'dynamodb'],
    relatedGuides: [],
    cliExample:
      '# Create a state machine from a definition file\n' +
      'aws stepfunctions create-state-machine \\\n' +
      '  --name order-processing \\\n' +
      '  --definition file://workflow.json \\\n' +
      '  --role-arn arn:aws:iam::123456789012:role/step-functions-role\n\n' +
      '# Start an execution\n' +
      'aws stepfunctions start-execution \\\n' +
      '  --state-machine-arn arn:aws:states:us-east-1:123456789012:stateMachine:order-processing \\\n' +
      '  --input \'{"orderId": "12345", "amount": 49.99}\'',
    cdkExample:
      'import * as cdk from \'aws-cdk-lib\';\n' +
      'import * as sfn from \'aws-cdk-lib/aws-stepfunctions\';\n' +
      'import * as tasks from \'aws-cdk-lib/aws-stepfunctions-tasks\';\n' +
      'import * as lambda from \'aws-cdk-lib/aws-lambda\';\n\n' +
      'const validateFn = new lambda.Function(this, \'Validate\', { /* ... */ });\n' +
      'const chargeFn = new lambda.Function(this, \'Charge\', { /* ... */ });\n\n' +
      'const validate = new tasks.LambdaInvoke(this, \'ValidateOrder\', {\n' +
      '  lambdaFunction: validateFn,\n' +
      '  resultPath: \'$.validation\',\n' +
      '});\n\n' +
      'const charge = new tasks.LambdaInvoke(this, \'ChargePayment\', {\n' +
      '  lambdaFunction: chargeFn,\n' +
      '});\n\n' +
      'const definition = validate\n' +
      '  .addRetry({ maxAttempts: 2 })\n' +
      '  .next(charge);\n\n' +
      'new sfn.StateMachine(this, \'OrderProcessing\', {\n' +
      '  definitionBody: sfn.DefinitionBody.fromChainable(definition),\n' +
      '  timeout: cdk.Duration.minutes(5),\n' +
      '});',
  },
  {
    id: 'eventbridge',
    name: 'EventBridge',
    fullName: 'Amazon EventBridge',
    cat: 'serverless',
    level: 'intermediate',
    icon: '\u{1F4E1}',
    short: 'A serverless event bus. Routes events between your services and third-party SaaS apps based on rules you define.',
    analogy: 'A post office sorting machine \u2014 events come in, get matched to rules, and delivered to the right mailboxes.',
    detail: 'EventBridge is the central nervous system for event-driven architectures. Services emit events (user signed up, order placed, file uploaded), and EventBridge routes them to targets (Lambda, SQS, Step Functions) based on pattern-matching rules. It also integrates with SaaS apps like Stripe, Auth0, and Zendesk.',
    useCases: [
      'Decoupling microservices with events',
      'Reacting to changes across services',
      'Scheduling tasks (cron-like)',
    ],
    keyTerms: {
      'Event Bus': 'A channel that receives events',
      Rule: 'A pattern that matches events and routes them',
      Target: 'Where matched events are delivered (Lambda, SQS, etc.)',
    },
    pricing: 'Free for AWS service events. Custom events: $1.00/million.',
    code:
      '// Publishing a custom event from a Node.js Lambda\n' +
      'import { EventBridgeClient, PutEventsCommand } from \'@aws-sdk/client-eventbridge\';\n\n' +
      'const client = new EventBridgeClient({});\n\n' +
      'export const handler = async (event) => {\n' +
      '  await client.send(new PutEventsCommand({\n' +
      '    Entries: [{\n' +
      '      Source: \'myapp.orders\',\n' +
      '      DetailType: \'OrderPlaced\',\n' +
      '      Detail: JSON.stringify({\n' +
      '        orderId: \'12345\',\n' +
      '        userId: \'user-789\',\n' +
      '        total: 49.99,\n' +
      '      }),\n' +
      '      EventBusName: \'my-app-bus\',\n' +
      '    }],\n' +
      '  }));\n\n' +
      '  return { statusCode: 200, body: \'Event published\' };\n' +
      '};',
    howItWorks:
      'EventBridge receives events as JSON objects with a standard envelope: `source`, `detail-type`, `detail` (your payload), `time`, and other metadata. When an event arrives on a bus, EventBridge evaluates it against every rule attached to that bus. Rules use event patterns \u2014 JSON objects that match on any combination of fields in the event envelope. Only the fields you specify in the pattern need to match; everything else is ignored.\n\n' +
      'When a rule matches, EventBridge delivers the event to all targets configured on that rule (up to 5 targets per rule). Targets can be Lambda functions, SQS queues, SNS topics, Step Functions state machines, Kinesis streams, API Gateway endpoints, and even other event buses (for cross-account routing). You can also transform the event before delivery using input transformers \u2014 extracting specific fields or reshaping the payload to match what the target expects.\n\n' +
      'EventBridge also offers Scheduler and Pipes. Scheduler is a cron/rate engine that invokes any AWS API on a schedule (replacing CloudWatch Events rules). Pipes connect a source (SQS, Kinesis, DynamoDB Streams) to a target with optional filtering, enrichment (via Lambda or Step Functions), and transformation \u2014 basically point-to-point integration without writing glue code. Together, these make EventBridge the go-to service for any event routing or scheduling need.',
    gotchas: [
      'Event patterns only support AND logic within a single field and across fields. OR logic requires multiple rules or content-based filtering with prefix/suffix/numeric matchers. The pattern syntax is powerful but takes time to learn.',
      'EventBridge guarantees at-least-once delivery, not exactly-once. Your consumers must be idempotent \u2014 processing the same event twice should produce the same result.',
      'Maximum event size is 256 KB. If your payloads are larger (e.g., full API responses), store the data in S3 and send an event with the S3 key as a reference.',
      'There is no built-in dead-letter queue for rule targets. If a target (like Lambda) fails, EventBridge retries for up to 24 hours with exponential backoff \u2014 configure a DLQ on the target itself (e.g., Lambda\'s async invocation DLQ) to catch persistent failures.',
    ],
    whenNotToUse: [
      'Point-to-point messaging where you need strict ordering and exactly-once processing \u2014 use SQS FIFO queues instead.',
      'High-throughput streaming (thousands of events per second with ordering guarantees) \u2014 Kinesis Data Streams is designed for this.',
      'Simple notification fan-out where you just need to broadcast to known subscribers without pattern matching \u2014 SNS is simpler and cheaper.',
    ],
    relatedServices: ['lambda', 'sqs', 'sns', 'step-functions', 'cloudwatch', 'api-gateway'],
    relatedGuides: [],
    cliExample:
      '# Create a custom event bus\n' +
      'aws events create-event-bus --name my-app-bus\n\n' +
      '# Create a rule that matches OrderPlaced events\n' +
      'aws events put-rule \\\n' +
      '  --name order-placed-rule \\\n' +
      '  --event-bus-name my-app-bus \\\n' +
      '  --event-pattern \'{"source":["myapp.orders"],"detail-type":["OrderPlaced"]}\'\n\n' +
      '# Add a Lambda target to the rule\n' +
      'aws events put-targets \\\n' +
      '  --rule order-placed-rule \\\n' +
      '  --event-bus-name my-app-bus \\\n' +
      '  --targets \'Id=1,Arn=arn:aws:lambda:us-east-1:123456789012:function:process-order\'',
    cdkExample:
      'import * as events from \'aws-cdk-lib/aws-events\';\n' +
      'import * as targets from \'aws-cdk-lib/aws-events-targets\';\n' +
      'import * as lambda from \'aws-cdk-lib/aws-lambda\';\n\n' +
      'const bus = new events.EventBus(this, \'AppBus\', {\n' +
      '  eventBusName: \'my-app-bus\',\n' +
      '});\n\n' +
      'const processOrderFn = new lambda.Function(this, \'ProcessOrder\', {\n' +
      '  /* ... */\n' +
      '});\n\n' +
      'new events.Rule(this, \'OrderPlacedRule\', {\n' +
      '  eventBus: bus,\n' +
      '  eventPattern: {\n' +
      '    source: [\'myapp.orders\'],\n' +
      '    detailType: [\'OrderPlaced\'],\n' +
      '  },\n' +
      '  targets: [new targets.LambdaFunction(processOrderFn)],\n' +
      '});',
  },
  {
    id: 'sqs',
    name: 'SQS',
    fullName: 'Simple Queue Service',
    cat: 'serverless',
    level: 'beginner',
    icon: '\u{1F4EC}',
    short: 'A message queue. One service puts messages in, another takes them out. Decouples your services so they don\'t need to talk directly.',
    analogy: 'A to-do inbox \u2014 one person drops tasks in, another picks them up when they\'re ready. If the reader is on break, the tasks just wait.',
    detail: 'SQS is a fully managed message queue. Service A sends a message to the queue, and Service B polls the queue and processes messages at its own pace. If Service B crashes, messages stay in the queue until it comes back. This prevents one slow service from crashing everything else.',
    useCases: [
      'Decoupling a web server from background job processing',
      'Buffering writes to a database',
      'Distributing work across multiple workers',
    ],
    keyTerms: {
      'Standard Queue': 'Best-effort ordering, at-least-once delivery',
      'FIFO Queue': 'Guaranteed order, exactly-once processing',
      'Visibility Timeout': 'How long a message is hidden after being read (while being processed)',
      'Dead Letter Queue': 'Where failed messages go after too many processing attempts',
    },
    pricing: 'Free tier: 1M requests/month (forever). After: $0.40/million requests.',
    code:
      '// Sending and receiving SQS messages (Node.js)\n' +
      'import { SQSClient, SendMessageCommand, ReceiveMessageCommand } from \'@aws-sdk/client-sqs\';\n\n' +
      'const client = new SQSClient({});\n' +
      'const queueUrl = process.env.QUEUE_URL!;\n\n' +
      '// Producer: send a message\n' +
      'await client.send(new SendMessageCommand({\n' +
      '  QueueUrl: queueUrl,\n' +
      '  MessageBody: JSON.stringify({ userId: \'123\', action: \'resize-avatar\' }),\n' +
      '}));\n\n' +
      '// Consumer: receive messages (Lambda does this automatically via event source mapping)\n' +
      'const { Messages } = await client.send(new ReceiveMessageCommand({\n' +
      '  QueueUrl: queueUrl,\n' +
      '  MaxNumberOfMessages: 10,\n' +
      '  WaitTimeSeconds: 20, // long polling \u2014 saves money\n' +
      '}));',
    howItWorks:
      'SQS is a pull-based message queue. Producers call `SendMessage` to push messages onto a queue, and consumers call `ReceiveMessage` to pull messages off. When a consumer receives a message, SQS doesn\'t delete it immediately \u2014 instead, it hides the message from other consumers for the duration of the "visibility timeout" (default 30 seconds). If the consumer successfully processes the message, it calls `DeleteMessage` to permanently remove it. If the consumer crashes or doesn\'t delete in time, the message becomes visible again for another consumer to pick up.\n\n' +
      'Standard queues deliver messages at-least-once with best-effort ordering \u2014 occasionally you may receive a message twice or out of order. They support nearly unlimited throughput. FIFO queues guarantee exactly-once processing and strict ordering within a "message group" (a logical partition). FIFO queues are limited to 3,000 messages/second with batching (300/s without), which is still plenty for most workloads.\n\n' +
      'When paired with Lambda, SQS becomes even simpler. Lambda\'s event source mapping polls the queue for you, batches messages, and invokes your function. If your function throws an error, Lambda retries. After a configurable number of failures (the "maxReceiveCount"), messages are moved to a dead-letter queue (DLQ) for investigation. This pattern \u2014 SQS + Lambda + DLQ \u2014 is one of the most common and reliable architectures on AWS.',
    gotchas: [
      'Standard queues can deliver messages more than once. Your consumer logic MUST be idempotent. Use a deduplication key (e.g., order ID) in a database or DynamoDB to detect and skip duplicate processing.',
      'The default visibility timeout is 30 seconds. If your processing takes longer, messages will reappear and get processed again. Always set the visibility timeout to at least 6x your expected processing time.',
      'SQS messages are retained for a maximum of 14 days (default 4 days). If your consumer is down that long, messages will be lost. Monitor queue depth with CloudWatch and alert on backlog growth.',
      'FIFO queues require a `MessageGroupId` on every message. Messages with the same group ID are processed in order, but different groups are processed in parallel. Misunderstanding this leads to either incorrect ordering or unnecessary serialization.',
    ],
    whenNotToUse: [
      'Fan-out patterns where one event needs to reach multiple consumers \u2014 use SNS (or SNS + SQS for reliable fan-out). SQS delivers each message to only ONE consumer.',
      'Real-time streaming analytics where you need to replay data or process ordered streams at high throughput \u2014 Kinesis Data Streams is purpose-built for this.',
      'Complex event routing based on message content \u2014 EventBridge\'s pattern matching is far more expressive than SQS filtering.',
    ],
    relatedServices: ['sns', 'lambda', 'eventbridge', 'step-functions', 'cloudwatch'],
    relatedGuides: ['kafka'],
    cliExample:
      '# Create a standard queue\n' +
      'aws sqs create-queue --queue-name my-task-queue\n\n' +
      '# Send a message\n' +
      'aws sqs send-message \\\n' +
      '  --queue-url https://sqs.us-east-1.amazonaws.com/123456789012/my-task-queue \\\n' +
      '  --message-body \'{"task": "resize-image", "key": "uploads/photo.jpg"}\'\n\n' +
      '# Receive messages (long polling)\n' +
      'aws sqs receive-message \\\n' +
      '  --queue-url https://sqs.us-east-1.amazonaws.com/123456789012/my-task-queue \\\n' +
      '  --wait-time-seconds 20 \\\n' +
      '  --max-number-of-messages 10',
    cdkExample:
      'import * as cdk from \'aws-cdk-lib\';\n' +
      'import * as sqs from \'aws-cdk-lib/aws-sqs\';\n' +
      'import * as lambda from \'aws-cdk-lib/aws-lambda\';\n' +
      'import * as eventsources from \'aws-cdk-lib/aws-lambda-event-sources\';\n\n' +
      'const dlq = new sqs.Queue(this, \'DLQ\', {\n' +
      '  retentionPeriod: cdk.Duration.days(14),\n' +
      '});\n\n' +
      'const queue = new sqs.Queue(this, \'TaskQueue\', {\n' +
      '  visibilityTimeout: cdk.Duration.seconds(300),\n' +
      '  deadLetterQueue: {\n' +
      '    queue: dlq,\n' +
      '    maxReceiveCount: 3, // move to DLQ after 3 failures\n' +
      '  },\n' +
      '});\n\n' +
      'const processorFn = new lambda.Function(this, \'Processor\', { /* ... */ });\n\n' +
      '// Lambda polls the queue automatically\n' +
      'processorFn.addEventSource(\n' +
      '  new eventsources.SqsEventSource(queue, { batchSize: 10 })\n' +
      ');',
  },
  {
    id: 'sns',
    name: 'SNS',
    fullName: 'Simple Notification Service',
    cat: 'serverless',
    level: 'beginner',
    icon: '\u{1F4E2}',
    short: 'Pub/sub messaging. One message goes out, multiple subscribers get it. Perfect for fan-out patterns.',
    analogy: 'A group chat \u2014 one person posts a message, and everyone in the group sees it.',
    detail: 'SNS uses a publish/subscribe model. You create a "topic," services publish messages to it, and all subscribers (Lambda functions, SQS queues, email addresses, HTTP endpoints) receive a copy. It\'s the opposite of SQS: SQS is one-to-one, SNS is one-to-many.',
    useCases: [
      'Sending notifications (email, SMS, push)',
      'Fan-out: one event triggers multiple processors',
      'Alerting on CloudWatch alarms',
    ],
    keyTerms: {
      Topic: 'A channel that messages are published to',
      Subscription: 'A listener that receives messages from a topic',
      'Fan-out': 'Pattern where one message goes to many subscribers',
    },
    pricing: 'Free tier: 1M publishes, 1K emails, 100 SMS/month. After: $0.50/million publishes.',
    code:
      '// Publishing to an SNS topic (Node.js)\n' +
      'import { SNSClient, PublishCommand } from \'@aws-sdk/client-sns\';\n\n' +
      'const client = new SNSClient({});\n\n' +
      'export const handler = async () => {\n' +
      '  await client.send(new PublishCommand({\n' +
      '    TopicArn: process.env.TOPIC_ARN,\n' +
      '    Subject: \'New Order\',\n' +
      '    Message: JSON.stringify({\n' +
      '      orderId: \'12345\',\n' +
      '      status: \'placed\',\n' +
      '      total: 49.99,\n' +
      '    }),\n' +
      '    MessageAttributes: {\n' +
      '      orderType: {\n' +
      '        DataType: \'String\',\n' +
      '        StringValue: \'digital\',\n' +
      '      },\n' +
      '    },\n' +
      '  }));\n' +
      '};',
    howItWorks:
      'SNS operates on a push model. When you publish a message to a topic, SNS immediately pushes a copy to every active subscription. Subscriptions can be Lambda functions, SQS queues, HTTP/HTTPS endpoints, email addresses, SMS phone numbers, or even other SNS topics in different AWS accounts. This push model is fundamentally different from SQS\'s pull model \u2014 subscribers don\'t poll; they get notified instantly.\n\n' +
      'Each subscription can optionally have a filter policy \u2014 a JSON document that specifies which messages it wants to receive based on message attributes. For example, you could have three SQS queues subscribed to one topic, but only the "digital-orders" queue receives messages where `orderType` is `"digital"`. This prevents subscribers from receiving (and paying for) messages they\'ll just discard.\n\n' +
      'The most powerful SNS pattern is "fan-out with SQS." You publish to an SNS topic, and multiple SQS queues subscribe to it. Each queue gets its own copy of every message and processes it independently. If one consumer is slow or crashes, it doesn\'t affect the others. This is the recommended architecture for reliable event distribution across microservices \u2014 it combines SNS\'s one-to-many delivery with SQS\'s durability and retry capabilities.',
    gotchas: [
      'SNS delivers messages at-least-once. If a subscriber (like an HTTP endpoint) returns a 5xx error, SNS retries with exponential backoff. This means your subscriber can receive the same message multiple times \u2014 always design for idempotency.',
      'Message size limit is 256 KB. For larger payloads, use the SNS Extended Client Library which stores the payload in S3 and sends a reference. This is the same pattern as SQS Extended Client.',
      'FIFO topics (paired with FIFO SQS queues) guarantee ordering and deduplication, but they only support SQS and Lambda subscriptions \u2014 no email, SMS, or HTTP endpoints. If you need ordering AND email notifications, you\'ll need a two-tier architecture.',
      'SMS pricing varies dramatically by country and is surprisingly expensive for some regions. Always check the per-message cost for your target countries before building an SMS notification system.',
    ],
    whenNotToUse: [
      'Point-to-point messaging where exactly one consumer should process each message \u2014 use SQS directly. SNS delivers to ALL subscribers, which wastes resources if only one should handle it.',
      'Complex event routing with content-based pattern matching on nested fields \u2014 EventBridge has far more expressive filtering than SNS\'s attribute-based filter policies.',
      'Streaming data at high throughput where you need replay capability \u2014 Kinesis Data Streams maintains an ordered, replayable log while SNS is fire-and-forget.',
    ],
    relatedServices: ['sqs', 'lambda', 'eventbridge', 'cloudwatch', 'ses'],
    relatedGuides: [],
    cliExample:
      '# Create an SNS topic\n' +
      'aws sns create-topic --name order-events\n\n' +
      '# Subscribe an SQS queue to the topic (fan-out)\n' +
      'aws sns subscribe \\\n' +
      '  --topic-arn arn:aws:sns:us-east-1:123456789012:order-events \\\n' +
      '  --protocol sqs \\\n' +
      '  --notification-endpoint arn:aws:sqs:us-east-1:123456789012:process-orders\n\n' +
      '# Publish a message\n' +
      'aws sns publish \\\n' +
      '  --topic-arn arn:aws:sns:us-east-1:123456789012:order-events \\\n' +
      '  --subject "New Order" \\\n' +
      '  --message \'{"orderId":"12345","total":49.99}\'',
    cdkExample:
      'import * as sns from \'aws-cdk-lib/aws-sns\';\n' +
      'import * as subs from \'aws-cdk-lib/aws-sns-subscriptions\';\n' +
      'import * as sqs from \'aws-cdk-lib/aws-sqs\';\n' +
      'import * as lambda from \'aws-cdk-lib/aws-lambda\';\n\n' +
      'const topic = new sns.Topic(this, \'OrderEvents\', {\n' +
      '  topicName: \'order-events\',\n' +
      '});\n\n' +
      '// Fan-out: multiple subscribers get every message\n' +
      'const analyticsQueue = new sqs.Queue(this, \'AnalyticsQueue\');\n' +
      'const fulfillmentFn = new lambda.Function(this, \'Fulfillment\', { /* ... */ });\n\n' +
      'topic.addSubscription(new subs.SqsSubscription(analyticsQueue));\n' +
      'topic.addSubscription(new subs.LambdaSubscription(fulfillmentFn, {\n' +
      '  filterPolicy: {\n' +
      '    orderType: sns.SubscriptionFilter.stringFilter({\n' +
      '      allowlist: [\'physical\'], // only physical orders need fulfillment\n' +
      '    }),\n' +
      '  },\n' +
      '}));',
  },
  {
    id: 'kinesis',
    name: 'Kinesis',
    fullName: 'Amazon Kinesis',
    cat: 'serverless',
    level: 'advanced',
    icon: '\u{1F30A}',
    short: 'Real-time data streaming. Process and analyze massive streams of data (logs, events, IoT) as they arrive.',
    analogy: 'A fast-flowing river of data \u2014 you can dip a bucket in at any point to sample and process what\'s flowing by.',
    detail: 'Kinesis handles real-time streaming data at scale. Kinesis Data Streams ingests data, Kinesis Data Firehose delivers it to storage (S3, Redshift), and Kinesis Data Analytics lets you query streams with SQL. It\'s designed for scenarios where you need to process thousands to millions of records per second with low latency.',
    useCases: [
      'Real-time log aggregation',
      'Clickstream analytics',
      'IoT data processing',
      'Live dashboards',
    ],
    keyTerms: {
      Shard: 'A unit of capacity in a stream (1 MB/s in, 2 MB/s out)',
      'Data Stream': 'The main ingestion pipeline',
      Firehose: 'Automatically delivers stream data to storage destinations',
    },
    pricing: 'Data Streams: $0.015/shard/hr. Firehose: $0.029/GB ingested.',
    code:
      '// Producing and consuming Kinesis records (Node.js)\n' +
      'import { KinesisClient, PutRecordCommand } from \'@aws-sdk/client-kinesis\';\n\n' +
      'const client = new KinesisClient({});\n\n' +
      '// Producer: put a record into the stream\n' +
      'await client.send(new PutRecordCommand({\n' +
      '  StreamName: \'clickstream\',\n' +
      '  PartitionKey: \'user-123\', // determines which shard receives it\n' +
      '  Data: Buffer.from(JSON.stringify({\n' +
      '    event: \'page_view\',\n' +
      '    userId: \'user-123\',\n' +
      '    page: \'/products/widget\',\n' +
      '    timestamp: Date.now(),\n' +
      '  })),\n' +
      '}));\n\n' +
      '// Consumer: Lambda processes batches of records automatically\n' +
      'export const handler = async (event) => {\n' +
      '  for (const record of event.Records) {\n' +
      '    const payload = JSON.parse(\n' +
      '      Buffer.from(record.kinesis.data, \'base64\').toString()\n' +
      '    );\n' +
      '    console.log(\'Clickstream event:\', payload);\n' +
      '  }\n' +
      '};',
    howItWorks:
      'Kinesis Data Streams is a durable, ordered log. Data is organized into shards, each of which supports 1 MB/s (or 1,000 records/s) of write throughput and 2 MB/s of read throughput. When a producer sends a record, it includes a partition key. Kinesis hashes this key to determine which shard receives the record. Records with the same partition key always go to the same shard, guaranteeing order within that key.\n\n' +
      'Unlike SQS (where a message is consumed and deleted), Kinesis records persist in the stream for a configurable retention period (default 24 hours, up to 365 days). Multiple consumers can read from the same stream independently, each maintaining their own position (called a "sequence number" or "checkpoint"). This is fundamentally similar to Apache Kafka\'s consumer group model. Enhanced fan-out gives each consumer its own dedicated 2 MB/s read throughput per shard, preventing consumers from competing with each other.\n\n' +
      'Kinesis Data Firehose is the "zero-code delivery" complement. You point Firehose at a stream (or let producers write directly to it), and it batches, optionally transforms (via Lambda), compresses, and delivers records to destinations like S3, Redshift, OpenSearch, or third-party services. It handles all the buffering and retry logic. For most analytics pipelines, the pattern is: produce to Data Streams for real-time processing, and also fan out to Firehose for long-term storage in S3.',
    gotchas: [
      'Shard capacity is fixed: 1 MB/s in, 2 MB/s out. If you exceed this, you get `ProvisionedThroughputExceededException`. Use on-demand mode (auto-scales shards) for unpredictable workloads, or pre-provision enough shards for your peak traffic.',
      'Records are ordered within a shard but NOT across shards. If you need global ordering, you need a single shard (which caps your throughput at 1 MB/s). For most use cases, ordering per partition key (user ID, device ID) is sufficient.',
      'Each shard supports a maximum of 5 read transactions per second per shard for standard consumers. With multiple consumers reading the same shard, you\'ll hit this fast. Use enhanced fan-out ($0.015/shard/hr per consumer) for dedicated throughput.',
      'The maximum record size is 1 MB. If your events are larger (e.g., full HTTP request/response bodies), aggregate smaller records using the Kinesis Producer Library (KPL) or store the large data in S3 and send a reference through the stream.',
    ],
    whenNotToUse: [
      'Simple job queues where messages are processed once and deleted \u2014 SQS is much simpler, cheaper, and requires zero capacity planning.',
      'Low-volume event routing between microservices \u2014 EventBridge or SNS+SQS is easier to set up and doesn\'t require shard management.',
      'Batch processing on a schedule (e.g., nightly ETL) \u2014 S3 + Lambda or Step Functions is simpler than running a stream 24/7 for occasional batch work.',
    ],
    relatedServices: ['lambda', 's3', 'redshift', 'opensearch', 'firehose', 'cloudwatch'],
    relatedGuides: ['kafka'],
    cliExample:
      '# Create a stream with on-demand capacity\n' +
      'aws kinesis create-stream \\\n' +
      '  --stream-name clickstream \\\n' +
      '  --stream-mode-details StreamMode=ON_DEMAND\n\n' +
      '# Put a record into the stream\n' +
      'aws kinesis put-record \\\n' +
      '  --stream-name clickstream \\\n' +
      '  --partition-key user-123 \\\n' +
      '  --data \'{"event":"page_view","page":"/products"}\'\n\n' +
      '# Describe the stream to see shard info\n' +
      'aws kinesis describe-stream-summary \\\n' +
      '  --stream-name clickstream',
    cdkExample:
      'import * as cdk from \'aws-cdk-lib\';\n' +
      'import * as kinesis from \'aws-cdk-lib/aws-kinesis\';\n' +
      'import * as lambda from \'aws-cdk-lib/aws-lambda\';\n' +
      'import * as eventsources from \'aws-cdk-lib/aws-lambda-event-sources\';\n\n' +
      'const stream = new kinesis.Stream(this, \'Clickstream\', {\n' +
      '  streamName: \'clickstream\',\n' +
      '  streamMode: kinesis.StreamMode.ON_DEMAND,\n' +
      '  retentionPeriod: cdk.Duration.hours(48),\n' +
      '});\n\n' +
      'const processorFn = new lambda.Function(this, \'StreamProcessor\', {\n' +
      '  /* ... */\n' +
      '});\n\n' +
      '// Lambda reads from the stream automatically\n' +
      'processorFn.addEventSource(\n' +
      '  new eventsources.KinesisEventSource(stream, {\n' +
      '    startingPosition: lambda.StartingPosition.LATEST,\n' +
      '    batchSize: 100,\n' +
      '    retryAttempts: 3,\n' +
      '  })\n' +
      ');',
  },
]
