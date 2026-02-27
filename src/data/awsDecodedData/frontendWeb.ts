import type { AwsService } from './types'

export const FRONTEND_WEB_SERVICES: AwsService[] = [
  {
    id: 'amplify',
    name: 'Amplify',
    fullName: 'AWS Amplify',
    cat: 'frontend_web',
    level: 'beginner',
    icon: '\u{1F4F1}',
    short: 'The fastest way for frontend devs to build full-stack apps on AWS. Git-push deployments, auth, APIs, storage \u2014 all preconfigured.',
    analogy: 'A fully stocked kitchen \u2014 walk in, grab ingredients (auth, storage, APIs), and start cooking without going to the store.',
    detail: 'Amplify is AWS\'s opinionated framework for frontend and mobile developers. Push to GitHub, and Amplify builds, deploys, and hosts your app automatically. Add authentication (Cognito), a GraphQL API (AppSync), file storage (S3), and more using CLI commands or a visual studio. It\'s the closest thing AWS has to Vercel or Netlify.',
    howItWorks: 'Amplify operates as two distinct products under one umbrella. Amplify Hosting is a CI/CD and static hosting service \u2014 you connect a Git repository (GitHub, GitLab, Bitbucket), and every push triggers a build pipeline. For static sites and SPAs, it deploys to a global CDN backed by CloudFront. For server-rendered frameworks like Next.js, it provisions Lambda@Edge or CloudFront Functions to handle SSR at the edge. Branch-based deployments give you preview URLs for every feature branch automatically.\n\nAmplify Libraries are the frontend SDKs (available for React, Vue, Angular, React Native, Flutter, and Swift). These provide high-level abstractions for interacting with backend AWS services. For example, `Auth.signIn()` wraps Cognito\'s complex SRP auth flow, `Storage.put()` handles multipart uploads to S3, and `API.graphql()` manages AppSync queries with automatic request signing. The libraries handle token refresh, retry logic, and offline caching so you don\'t have to implement these patterns from scratch.\n\nAmplify Gen 2 (the latest version) takes a code-first approach where you define your backend using TypeScript in an `amplify/` directory alongside your frontend code. This generates CloudFormation under the hood but abstracts away the template authoring. Each developer gets a personal cloud sandbox for development, and the CI/CD pipeline deploys the same backend definition to staging and production environments.',
    useCases: [
      'Deploying React/Next.js/Vue apps',
      'Adding auth to a frontend app in minutes',
      'Building full-stack serverless apps',
      'Prototyping quickly on AWS',
    ],
    keyTerms: {
      'Amplify Hosting': 'CI/CD and hosting for static and server-rendered apps',
      'Amplify Libraries': 'Frontend SDKs for auth, storage, API calls',
      'Amplify Studio': 'Visual builder for backends and UI components',
    },
    pricing: 'Free tier: 1000 build minutes, 15 GB served, 5 GB storage/month.',
    gotchas: [
      'Amplify Gen 1 and Gen 2 are significantly different \u2014 Gen 1 uses a CLI-driven workflow while Gen 2 uses code-first TypeScript. Most tutorials online still reference Gen 1, so double-check which version the docs are targeting.',
      'Build times can be slow (3\u20138 minutes) for large Next.js apps because each build runs in a fresh container. Use the build cache settings in amplify.yml to persist node_modules and .next/cache between builds.',
      'The Amplify-generated IAM roles and Cognito pools use long auto-generated names. If you later need to reference these resources from other AWS services (e.g., a separate Lambda function), the naming makes it painful. Export the resource ARNs in your backend definition.',
      'Environment variables set in the Amplify Console are only available at build time by default, not at runtime for SSR. For runtime secrets, use the environment variables section specifically marked for server-side rendering, or pull from Secrets Manager.',
    ],
    whenNotToUse: [
      'If you need full control over your infrastructure (custom VPC networking, specific instance types, container-based deployments), Amplify\'s abstractions will fight you. Use CDK or Terraform with CloudFront + S3 instead.',
      'For large engineering teams with dedicated DevOps, Amplify\'s opinionated pipeline can be limiting. You cannot customize the build agent, run integration tests against a staging environment mid-pipeline, or integrate with external CI tools like GitHub Actions in a first-class way.',
      'If your app is purely static (no auth, no API, no backend), Amplify adds unnecessary complexity. A simple S3 bucket + CloudFront distribution is cheaper and simpler.',
    ],
    relatedServices: ['appsync', 'cognito', 's3', 'cloudfront', 'lambda'],
    relatedGuides: [],
    code: '// Add authentication to a React app with Amplify\nimport { Authenticator } from \'@aws-amplify/ui-react\';\n\nfunction App() {\n  return (\n    <Authenticator>\n      {({ user }) => <h1>Hello, {user.username}</h1>}\n    </Authenticator>\n  );\n}',
    cliExample: '# Create a new Amplify app from a GitHub repo\naws amplify create-app --name my-frontend-app \\\n  --repository https://github.com/user/my-react-app \\\n  --access-token <github-token> \\\n  --environment-variables NODE_ENV=production\n\n# Trigger a manual deployment\naws amplify start-deployment --app-id d1234abcde --branch-name main',
    cdkExample: `import * as amplify from 'aws-cdk-lib/aws-amplify';

// Deploy a React app from a GitHub repository
const amplifyApp = new amplify.App(this, 'MyFrontendApp', {
  sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
    owner: 'my-org',
    repository: 'my-react-app',
    oauthToken: SecretValue.secretsManager('github-token'),
  }),
  buildSpec: codebuild.BuildSpec.fromObjectToYaml({
    version: 1,
    frontend: {
      phases: {
        preBuild: { commands: ['npm ci'] },
        build: { commands: ['npm run build'] },
      },
      artifacts: {
        baseDirectory: 'dist',
        files: ['**/*'],
      },
    },
  }),
});

// Add branch-based deployments
amplifyApp.addBranch('main', { stage: 'PRODUCTION' });
amplifyApp.addBranch('develop', { stage: 'DEVELOPMENT' });`,
  },
  {
    id: 'appsync',
    name: 'AppSync',
    fullName: 'AWS AppSync',
    cat: 'frontend_web',
    level: 'intermediate',
    icon: '\u{1F517}',
    short: 'Managed GraphQL API service. Build real-time, offline-capable APIs that connect to DynamoDB, Lambda, and other data sources.',
    analogy: 'A universal translator between your frontend and multiple backends \u2014 ask for exactly what you need in one request.',
    detail: 'AppSync provides a managed GraphQL endpoint. You define your schema, connect resolvers to data sources (DynamoDB, Lambda, RDS, HTTP endpoints), and get real-time subscriptions out of the box. It pairs beautifully with Amplify for frontend integration. If you prefer GraphQL over REST, AppSync is your service.',
    howItWorks: 'AppSync sits between your frontend and your data sources as a managed GraphQL gateway. You start by defining a GraphQL schema (your types, queries, mutations, and subscriptions). For each field that needs to fetch or write data, you attach a resolver. Resolvers are written in either Apache Velocity Template Language (VTL) or JavaScript, and they translate GraphQL operations into calls to your data sources \u2014 DynamoDB GetItem calls, Lambda invocations, RDS SQL queries, or HTTP requests to external APIs.\n\nThe real-time subscription system is built on WebSockets managed by AppSync. When a client subscribes to a mutation (e.g., `onCreateMessage`), AppSync maintains the WebSocket connection and automatically pushes updates whenever that mutation is executed \u2014 by any client. On the frontend, the Amplify libraries handle the WebSocket lifecycle, reconnection, and message parsing. You just write `client.graphql({ query: onCreateMessage }).subscribe(next => ...)` and get real-time updates without managing any WebSocket infrastructure.\n\nFor offline support, AppSync pairs with the Amplify DataStore library. DataStore keeps a local copy of your data on the device (IndexedDB in browsers, SQLite on mobile), processes mutations against the local store immediately, and syncs with AppSync when the network is available. Conflict resolution is configurable \u2014 you can use auto-merge, optimistic concurrency, or a custom Lambda function to handle conflicts when offline changes collide.',
    useCases: [
      'Real-time apps (chat, collaborative editing)',
      'Mobile apps that need offline support',
      'Aggregating data from multiple backends into one API',
    ],
    keyTerms: {
      Schema: 'The GraphQL type definitions',
      Resolver: 'Maps a GraphQL field to a data source',
      Subscription: 'Real-time updates pushed to the client via WebSocket',
    },
    pricing: 'Free tier: 250K query/mutation operations/month. After: $4/million operations.',
    gotchas: [
      'VTL (Velocity Template Language) resolvers are the original resolver format and they are notoriously painful to debug. Use the newer JavaScript resolvers (pipeline resolvers with JS runtime) whenever possible \u2014 they support console.log and are testable locally.',
      'Subscriptions are triggered by mutations, not by direct database changes. If something writes to DynamoDB outside of AppSync (a Lambda function, a migration script), subscribed clients will not receive updates. You need to route all writes through AppSync mutations or trigger a "notify" mutation separately.',
      'AppSync has a 28KB response size limit per resolver and a 1MB limit per total GraphQL response. If you are returning large lists or binary-heavy data, you will hit these limits. Paginate aggressively and use S3 pre-signed URLs for file content.',
      'The GraphQL schema in AppSync is a single file \u2014 you cannot split it across multiple files natively. For large schemas, use a build step (like graphql-tools merge) to concatenate schema fragments before deployment.',
    ],
    whenNotToUse: [
      'If your team is already invested in REST and does not want to learn GraphQL, AppSync adds complexity without clear benefit. Use API Gateway + Lambda instead \u2014 it is simpler and your team already knows the patterns.',
      'For simple CRUD APIs with a single data source, AppSync is over-engineered. A direct Lambda integration with API Gateway or even DynamoDB\'s PartiQL direct queries are simpler.',
      'If you need request/response payload sizes larger than 1MB (file uploads, bulk data exports), AppSync is not the right layer. Use S3 pre-signed URLs for large payloads and API Gateway for bulk operations.',
    ],
    relatedServices: ['amplify', 'dynamodb', 'lambda', 'cognito', 'api-gateway'],
    relatedGuides: [],
    code: '// Query AppSync from a React component using Amplify\nimport { generateClient } from \'aws-amplify/api\';\nimport { listTodos } from \'./graphql/queries\';\nimport { onCreateTodo } from \'./graphql/subscriptions\';\n\nconst client = generateClient();\n\n// Fetch data\nconst { data } = await client.graphql({ query: listTodos });\n\n// Subscribe to real-time updates\nclient.graphql({ query: onCreateTodo }).subscribe({\n  next: ({ data }) => console.log(\'New todo:\', data.onCreateTodo),\n});',
    cliExample: '# List your AppSync APIs\naws appsync list-graphql-apis\n\n# Introspect a schema\naws appsync get-introspection-schema \\\n  --api-id abc123xyz \\\n  --format SDL \\\n  output-schema.graphql\n\n# Create a new API key for frontend access\naws appsync create-api-key --api-id abc123xyz --expires 1735689600',
    cdkExample: `import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

// Create a GraphQL API with DynamoDB data source
const api = new appsync.GraphqlApi(this, 'TodoApi', {
  name: 'TodoApi',
  schema: appsync.SchemaFile.fromAsset('schema.graphql'),
  authorizationConfig: {
    defaultAuthorization: {
      authorizationType: appsync.AuthorizationType.API_KEY,
      apiKeyConfig: { expires: cdk.Expiration.after(cdk.Duration.days(365)) },
    },
  },
});

// Connect DynamoDB as a data source
const todoTable = new dynamodb.Table(this, 'TodoTable', {
  partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
});

const dataSource = api.addDynamoDbDataSource('TodoDS', todoTable);

// Wire up a resolver for the Query.listTodos field
dataSource.createResolver('ListTodosResolver', {
  typeName: 'Query',
  fieldName: 'listTodos',
  requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
  responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
});`,
  },
  {
    id: 'ses',
    name: 'SES',
    fullName: 'Simple Email Service',
    cat: 'frontend_web',
    level: 'beginner',
    icon: '\u{1F4E7}',
    short: 'Send and receive emails at scale. Transactional emails, marketing campaigns, and email receiving \u2014 all via API.',
    analogy: 'Your own post office \u2014 send thousands of letters (emails) reliably without maintaining mail trucks.',
    detail: 'SES is a cost-effective email sending service. Send transactional emails (password resets, order confirmations), marketing emails, or set up email receiving. It handles deliverability, bounce/complaint management, and provides sending statistics. Much cheaper than services like SendGrid or Mailgun at scale.',
    howItWorks: 'SES operates as a managed email infrastructure layer. When you call the SendEmail API (or the newer SendBulkEmail for batches), SES takes your message, signs it with DKIM (DomainKeys Identified Mail), checks it against your sending quota and suppression list, and hands it off to AWS\'s fleet of mail transfer agents (MTAs). These MTAs manage the actual SMTP connections to recipient mail servers, handle retries for temporary failures (greylisting, rate limits), and track delivery outcomes.\n\nBefore you can send to real addresses, you start in the SES "sandbox." In sandbox mode, you can only send to verified email addresses \u2014 this prevents abuse. To move to production, you submit a request to AWS explaining your use case, expected volume, and how you handle bounces and complaints. Once approved, you can send to any address. Your sending quota (emails per day and emails per second) starts low and increases automatically as SES monitors your sending reputation.\n\nSES also works as an email receiver. You configure MX records for your domain to point to SES, then set up receipt rules that define what happens when email arrives: store it in S3, trigger a Lambda function, forward it to another address, or send it to SNS. This is powerful for building automated workflows \u2014 for example, processing support tickets by parsing inbound emails with Lambda.',
    useCases: [
      'Transactional emails (signup confirmation, password reset)',
      'Marketing email campaigns',
      'Email receiving and processing',
    ],
    keyTerms: {
      'Sending Quota': 'Max emails/day (starts low, increases with reputation)',
      Bounce: 'A failed delivery',
      DKIM: 'Domain authentication to prevent spoofing',
    },
    pricing: 'Free tier: 3,000 messages/month (from EC2). After: $0.10/1000 emails.',
    gotchas: [
      'The sandbox is the biggest surprise for new users. In sandbox mode, BOTH the sender AND every recipient must be manually verified. Your app will silently fail to send emails to unverified addresses. Request production access early \u2014 approval can take 24\u201348 hours.',
      'SES does not provide email templates or a drag-and-drop editor out of the box. You either send raw HTML or use SES templates (simple variable substitution). For rich templated emails, most teams use a library like MJML or React Email to generate the HTML and pass it to SES.',
      'Bounce and complaint handling is not optional. If your bounce rate exceeds 5% or complaint rate exceeds 0.1%, AWS will throttle or suspend your account. Set up an SNS topic for bounce/complaint notifications and process them immediately (remove bad addresses from your list).',
      'SES is regional \u2014 you send from a specific AWS region, and your sending reputation is per-region. If you verify a domain in us-east-1, you cannot send from eu-west-1 without verifying again. Choose a region close to your users for lower latency.',
    ],
    whenNotToUse: [
      'If you need a complete marketing platform with drag-and-drop editors, subscriber management, A/B testing, and analytics dashboards, SES is too low-level. Use Pinpoint, or a third-party service like Mailchimp or SendGrid.',
      'For apps that send very low volume (under 100 emails/month), the operational overhead of managing DKIM, bounce handling, and reputation monitoring is not worth it. Use a higher-level service like Resend or Postmark that handles all of that for you.',
      'If you need guaranteed delivery to Microsoft 365 or Google Workspace inboxes with complex authentication requirements (BIMI, ARC), a dedicated deliverability platform like Postmark or SparkPost may handle edge cases better than SES out of the box.',
    ],
    relatedServices: ['pinpoint', 'sns', 'lambda', 's3', 'cognito'],
    relatedGuides: [],
    code: '// Send an email using the AWS SDK v3 (Node.js)\nimport { SESv2Client, SendEmailCommand } from \'@aws-sdk/client-sesv2\';\n\nconst ses = new SESv2Client({ region: \'us-east-1\' });\n\nawait ses.send(new SendEmailCommand({\n  FromEmailAddress: \'hello@myapp.com\',\n  Destination: { ToAddresses: [\'user@example.com\'] },\n  Content: {\n    Simple: {\n      Subject: { Data: \'Welcome to MyApp!\' },\n      Body: {\n        Html: { Data: \'<h1>Welcome!</h1><p>Thanks for signing up.</p>\' },\n        Text: { Data: \'Welcome! Thanks for signing up.\' },\n      },\n    },\n  },\n}));',
    cliExample: '# Send a test email from the CLI\naws sesv2 send-email \\\n  --from-email-address hello@myapp.com \\\n  --destination \'{"ToAddresses":["user@example.com"]}\' \\\n  --content \'{"Simple":{"Subject":{"Data":"Test from CLI"},"Body":{"Text":{"Data":"Hello from SES!"}}}}\'\n\n# Check your sending quota and reputation\naws sesv2 get-account\n\n# Verify a domain identity\naws sesv2 create-email-identity --email-identity myapp.com',
    cdkExample: `import * as ses from 'aws-cdk-lib/aws-ses';
import * as sesActions from 'aws-cdk-lib/aws-ses-actions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';

// Verify a domain for sending
const identity = new ses.EmailIdentity(this, 'MyAppIdentity', {
  identity: ses.Identity.domain('myapp.com'),
  // DKIM signing is enabled by default with EasyDKIM
});

// Set up email receiving: store in S3 + trigger Lambda
const emailBucket = new s3.Bucket(this, 'InboundEmailBucket');
const processor = new lambda.Function(this, 'EmailProcessor', {
  runtime: lambda.Runtime.NODEJS_20_X,
  handler: 'index.handler',
  code: lambda.Code.fromAsset('lambda/email-processor'),
});

const ruleSet = new ses.ReceiptRuleSet(this, 'RuleSet');
ruleSet.addRule('ProcessInbound', {
  recipients: ['support@myapp.com'],
  actions: [
    new sesActions.S3({ bucket: emailBucket }),
    new sesActions.Lambda({ function: processor }),
  ],
});`,
  },
  {
    id: 'pinpoint',
    name: 'Pinpoint',
    fullName: 'Amazon Pinpoint',
    cat: 'frontend_web',
    level: 'intermediate',
    icon: '\u{1F4F2}',
    short: 'Multi-channel customer engagement. Send push notifications, emails, SMS, and in-app messages to targeted user segments.',
    analogy: 'A marketing campaign manager that reaches users wherever they are \u2014 email, text, push notification, or in-app.',
    detail: 'Pinpoint lets you create user segments based on behavior and attributes, then reach them across channels. It includes A/B testing, campaign scheduling, and analytics. Think of it as a lightweight Braze or Customer.io built into AWS.',
    howItWorks: 'Pinpoint maintains an endpoint database that represents every device or channel through which you can reach a user. When your app starts up, you register an endpoint (a push token, email address, or phone number) along with user attributes (plan tier, signup date, location) and custom metrics (sessions, purchases). Pinpoint stores all of this and lets you build dynamic segments based on any combination of attributes \u2014 for example, "users on the free plan who have not opened the app in 7 days and are located in the US."\n\nCampaigns and Journeys are the two ways to send messages. A Campaign is a one-time or recurring message to a segment \u2014 you pick the segment, write the message (with personalization variables like `{{User.UserAttributes.FirstName}}`), schedule the time, and optionally configure A/B testing (test different subject lines or message bodies). A Journey is a multi-step workflow: a user enters the journey when they match a trigger (segment membership, an event), and then moves through steps like "send email \u2192 wait 3 days \u2192 check if opened \u2192 send push notification or exit." Journeys let you build complex onboarding or re-engagement flows without writing orchestration code.\n\nOn the analytics side, Pinpoint automatically tracks campaign delivery, opens, clicks, and opt-outs per channel. For custom app analytics, you send events from your frontend using the Amplify Analytics library (`Analytics.record({ name: "ProductViewed", attributes: { productId: "123" } })`). These events flow into Pinpoint where they can be used for segmentation, or streamed to Kinesis Data Firehose for warehousing in S3/Redshift.',
    useCases: [
      'Push notifications for mobile apps',
      'Targeted email campaigns',
      'SMS alerts and notifications',
      'In-app messaging',
    ],
    keyTerms: {
      Segment: 'A group of users based on attributes or behavior',
      Campaign: 'A scheduled message to a segment',
      Journey: 'A multi-step, automated messaging workflow',
    },
    pricing: 'Free: 5K targeted users/month. Email: $0/first 1M (if from Pinpoint). SMS: varies by country.',
    gotchas: [
      'Pinpoint\'s email sending is built on SES under the hood, but the configuration is separate. You still need to verify your domain in SES and request production access. A common mistake is setting up Pinpoint and then wondering why emails aren\'t sending \u2014 the SES sandbox is the culprit.',
      'Push notification setup requires platform-specific credentials (APNs certificate/key for iOS, FCM server key for Android) configured in Pinpoint. These credentials expire \u2014 Apple APNs keys last a year. Set a calendar reminder to rotate them, or your push notifications will silently stop working.',
      'The Pinpoint console UI is functional but not intuitive. Building complex segments with nested AND/OR conditions can be confusing. Many teams define segments programmatically via the API/CDK instead of using the console.',
      'Pinpoint event ingestion has a soft limit of 7,000 events per second per account. If your app has a traffic spike (product launch, flash sale), events can be throttled and dropped. Request a limit increase well before any planned high-traffic event.',
    ],
    whenNotToUse: [
      'If you only need to send transactional emails (password resets, order confirmations) without segmentation or campaigns, Pinpoint is overkill. Use SES directly \u2014 it is simpler and cheaper for transactional-only use cases.',
      'For enterprise-grade marketing automation with advanced features like predictive send-time optimization, AI-driven content recommendations, and deep CRM integrations, Pinpoint is lightweight compared to dedicated platforms like Braze, Iterable, or HubSpot.',
      'If your app does not have a concept of user accounts or persistent user identity (e.g., a public-facing content site with anonymous visitors), Pinpoint\'s endpoint model does not map well. Use simple analytics (Google Analytics, Plausible) instead.',
    ],
    relatedServices: ['ses', 'sns', 'amplify', 'cognito', 'kinesis'],
    relatedGuides: [],
    code: '// Record analytics events and register for push notifications\nimport { record } from \'aws-amplify/analytics\';\n\n// Track a custom event for segmentation\nrecord({\n  name: \'ProductViewed\',\n  attributes: { productId: \'abc-123\', category: \'electronics\' },\n  metrics: { priceUsd: 49.99 },\n});\n\n// Track when a user completes onboarding\nrecord({\n  name: \'OnboardingComplete\',\n  attributes: { plan: \'free\', referralSource: \'google\' },\n});',
    cliExample: '# List all Pinpoint apps (projects)\naws pinpoint get-apps\n\n# Create a user segment of inactive users\naws pinpoint create-segment --application-id APP_ID \\\n  --write-segment-request \'{\n    "Name": "Inactive7Days",\n    "SegmentGroups": {\n      "Groups": [{\n        "Dimensions": [{\n          "UserAttributes": {},\n          "Behavior": {\n            "Recency": { "Duration": "DAY_7", "RecencyType": "INACTIVE" }\n          }\n        }]\n      }]\n    }\n  }\'\n\n# Send a test push notification\naws pinpoint send-messages --application-id APP_ID \\\n  --message-request \'{\n    "Addresses": { "device-token-here": { "ChannelType": "GCM" } },\n    "MessageConfiguration": {\n      "GCMMessage": { "Body": "Hello from Pinpoint!", "Title": "Test" }\n    }\n  }\'',
    cdkExample: `import * as pinpoint from 'aws-cdk-lib/aws-pinpoint';

// Create a Pinpoint project (app)
const pinpointApp = new pinpoint.CfnApp(this, 'MyApp', {
  name: 'my-frontend-app',
});

// Enable the email channel (requires verified SES identity)
new pinpoint.CfnEmailChannel(this, 'EmailChannel', {
  applicationId: pinpointApp.ref,
  fromAddress: 'hello@myapp.com',
  identity: 'arn:aws:ses:us-east-1:123456789:identity/myapp.com',
  enabled: true,
});

// Enable the SMS channel
new pinpoint.CfnSMSChannel(this, 'SMSChannel', {
  applicationId: pinpointApp.ref,
  enabled: true,
});

// Stream Pinpoint events to Kinesis for analytics
new pinpoint.CfnEventStream(this, 'EventStream', {
  applicationId: pinpointApp.ref,
  destinationStreamArn: kinesisStream.streamArn,
  roleArn: pinpointStreamRole.roleArn,
});`,
  },
]
