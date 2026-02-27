import type { AwsService } from './types'

export const NETWORKING_SERVICES: AwsService[] = [
  {
    id: 'cloudfront',
    name: 'CloudFront',
    fullName: 'Amazon CloudFront',
    cat: 'networking',
    level: 'beginner',
    icon: '\u{1F30D}',
    short: 'A CDN (Content Delivery Network). Caches your website\'s files at 400+ locations worldwide so they load fast everywhere.',
    analogy: 'Printing copies of your menu and handing them out at every street corner, instead of making everyone walk to your restaurant to read it.',
    detail: 'CloudFront sits between your users and your origin server (S3, EC2, etc.). When someone requests a file, CloudFront serves it from the nearest "edge location" instead of your origin. This reduces latency dramatically. It also handles HTTPS, custom domains, and can even run code at the edge with Lambda@Edge.',
    useCases: [
      'Serving your React/Vue/Angular app globally',
      'Speeding up API responses',
      'Streaming video content',
      'Protecting origins from direct traffic',
    ],
    keyTerms: {
      Distribution: 'A CloudFront deployment that routes traffic to your origin',
      'Edge Location': 'A data center near end users that caches your content',
      Origin: 'Where your actual files live (S3, EC2, a custom server, etc.)',
    },
    pricing: 'Free tier: 1 TB data transfer + 10M requests/month (forever). After: ~$0.085/GB.',
    code: '// No SDK needed! Just point your domain at CloudFront.\n// Your S3-hosted React app becomes globally fast:\n\n// Before:  https://my-bucket.s3.amazonaws.com/index.html\n// After:   https://myapp.com  (via CloudFront + Route 53)\n\n// Cache invalidation when you deploy:\n$ aws cloudfront create-invalidation \\\n    --distribution-id E1234 --paths "/*"',
    howItWorks: 'When a user requests content from your CloudFront distribution, their DNS query resolves to the nearest edge location (one of 400+ worldwide). CloudFront checks its local cache for the requested content. If it\'s a cache hit, the content is returned immediately without touching your origin server \u2014 this is what makes CDNs so fast. If it\'s a cache miss, CloudFront makes a request to your origin (S3, ALB, EC2, or any HTTP server), fetches the content, serves it to the user, and stores a copy in the edge cache for future requests.\n\nCache behavior is controlled by TTL (Time to Live) settings, Cache-Control headers from your origin, and cache policies you configure on the distribution. You can set up multiple "cache behaviors" per distribution \u2014 for example, cache images for 30 days but cache API responses for only 60 seconds. Each behavior matches a URL path pattern like `/api/*` or `/static/*`.\n\nCloudFront also supports Origin Shield, an additional caching layer between edge locations and your origin that reduces the load on your server even further. For dynamic content, CloudFront can still help by maintaining persistent connections to your origin and routing through the optimized AWS backbone network instead of the public internet.',
    gotchas: [
      'Cache invalidation takes time (up to 10\u201315 minutes to propagate globally) and costs money after the first 1,000 paths/month \u2014 design your cache keys and versioning strategy carefully instead of relying on invalidation.',
      'Default TTL is 24 hours. If you deploy a new version of your React app and don\'t invalidate or use cache-busting filenames (like Vite\'s hashed chunks), users will see the old version for up to a day.',
      'CORS headers must be forwarded from your origin AND cached properly. If you forget to include the Origin header in your cache key, the first user\'s response (with or without CORS headers) gets cached and served to everyone.',
      'CloudFront Functions and Lambda@Edge are different: Functions run at edge locations, are cheaper, but limited to viewer request/response events and 10ms execution. Lambda@Edge runs at regional caches, costs more, but supports origin events and up to 30s execution.',
    ],
    whenNotToUse: [
      'Single-region apps with all users geographically close to your origin \u2014 the added complexity of cache management won\'t justify the minimal latency improvement.',
      'Rapidly changing content that can\'t tolerate any staleness (like real-time stock tickers or live dashboards) \u2014 use WebSockets or direct server connections instead.',
      'Internal-only applications behind a VPN where traffic never leaves your corporate network.',
    ],
    relatedServices: ['s3', 'route53', 'acm', 'lambda', 'waf', 'global-accelerator'],
    relatedGuides: ['nginx'],
    cliExample: '# Create a CloudFront distribution for an S3 origin\naws cloudfront create-distribution \\\n  --origin-domain-name my-bucket.s3.amazonaws.com \\\n  --default-root-object index.html\n\n# Invalidate cache after a deployment\naws cloudfront create-invalidation \\\n  --distribution-id E1A2B3C4D5E6F7 \\\n  --paths "/*"\n\n# List all distributions\naws cloudfront list-distributions \\\n  --query "DistributionList.Items[].{Id:Id,Domain:DomainName,Status:Status}"',
    cdkExample: `import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';

// Create an S3 bucket for your React app
const siteBucket = new s3.Bucket(this, 'SiteBucket', {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});

// Create a CloudFront distribution
const distribution = new cloudfront.Distribution(this, 'Distribution', {
  defaultBehavior: {
    origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
  },
  defaultRootObject: 'index.html',
  // Handle SPA routing: return index.html for 404s
  errorResponses: [{
    httpStatus: 404,
    responseHttpStatus: 200,
    responsePagePath: '/index.html',
    ttl: cdk.Duration.minutes(5),
  }],
});`,
  },
  {
    id: 'route53',
    name: 'Route 53',
    fullName: 'Amazon Route 53',
    cat: 'networking',
    level: 'beginner',
    icon: '\u{1F5FA}\uFE0F',
    short: 'AWS\'s DNS service. Translates domain names (myapp.com) into IP addresses, and lets you buy/manage domains.',
    analogy: 'The phone book of the internet \u2014 you look up a name, it gives you the address.',
    detail: 'Route 53 is both a domain registrar (buy domains) and a DNS hosting service (control where domains point). It supports simple routing, weighted routing (split traffic), latency-based routing (send users to the nearest server), and failover routing (redirect if a server goes down).',
    useCases: [
      'Registering and managing domains',
      'Pointing domains at CloudFront, S3, EC2, or load balancers',
      'Health checks and failover routing',
    ],
    keyTerms: {
      'Hosted Zone': 'A container for DNS records for a domain',
      'A Record': 'Points a domain to an IP address',
      CNAME: 'Points a subdomain to another domain name',
      'Alias Record': 'AWS-specific record that points directly to AWS resources',
    },
    pricing: '$0.50/hosted zone/month. $12/year and up for domain registration.',
    code: '// Route 53 is mostly configured in the AWS Console or CLI.\n// But here\'s how you\'d update a DNS record with the SDK:\n\nimport { Route53Client, ChangeResourceRecordSetsCommand } from "@aws-sdk/client-route-53";\n\nconst client = new Route53Client({});\nawait client.send(new ChangeResourceRecordSetsCommand({\n  HostedZoneId: "Z1234567890",\n  ChangeBatch: {\n    Changes: [{\n      Action: "UPSERT",\n      ResourceRecordSet: {\n        Name: "api.myapp.com",\n        Type: "A",\n        AliasTarget: {\n          DNSName: "d1234.cloudfront.net",\n          HostedZoneId: "Z2FDTNDATAQYW2", // CloudFront\'s zone ID\n          EvaluateTargetHealth: false,\n        },\n      },\n    }],\n  },\n}));',
    howItWorks: 'Route 53 operates as a globally distributed, authoritative DNS service. When someone types your domain into their browser, the DNS resolution process starts: the browser asks a recursive resolver (usually your ISP\'s), which then queries the root name servers, the TLD name servers (.com, .org, etc.), and finally Route 53\'s authoritative name servers for your hosted zone. Route 53 responds with the appropriate record \u2014 an IP address, a CNAME, or an alias to an AWS resource. This entire chain typically completes in under 100ms.\n\nRoute 53 supports several routing policies that go far beyond simple DNS. Weighted routing lets you split traffic (e.g., 90% to production, 10% to canary). Latency-based routing automatically directs users to the AWS region with the lowest round-trip time. Geolocation routing sends users to endpoints based on their country or continent. Failover routing uses health checks to detect outages and reroute traffic automatically.\n\nHealth checks are a powerful feature that runs independently of DNS queries. Route 53 health checkers (running from multiple AWS regions) periodically hit your endpoints and track their status. If a health check fails, Route 53 can automatically stop routing traffic to that endpoint. You can also create composite health checks that combine multiple checks with AND/OR logic, and trigger CloudWatch alarms when things go down.',
    gotchas: [
      'DNS propagation is not instant \u2014 even with low TTLs, ISPs and browsers cache DNS records. After changing a record, expect 5\u201360 minutes before all users see the new value. Plan DNS changes ahead of time during migrations.',
      'Alias records are free and resolve within AWS, but CNAMEs cost $0.40/million queries and add an extra DNS hop. Always use Alias records when pointing to AWS resources (CloudFront, ALB, S3 website endpoints).',
      'You cannot create a CNAME record at the zone apex (e.g., myapp.com without www). This is a DNS standard limitation, not AWS-specific. Use an Alias A record instead.',
      'Health check pricing adds up: each health check costs $0.50\u2013$0.75/month, and you often need checks in multiple regions. Monitor your health check count if you\'re managing many endpoints.',
    ],
    whenNotToUse: [
      'If you only need simple DNS hosting for a few domains and don\'t use other AWS services \u2014 providers like Cloudflare offer free DNS with a CDN included.',
      'For internal service discovery within a Kubernetes cluster \u2014 use CoreDNS or AWS Cloud Map instead. Route 53 is designed for public-facing DNS resolution.',
    ],
    relatedServices: ['cloudfront', 'elb', 's3', 'acm', 'ec2', 'global-accelerator'],
    relatedGuides: ['nginx'],
    cliExample: '# Create a hosted zone for your domain\naws route53 create-hosted-zone \\\n  --name myapp.com \\\n  --caller-reference "$(date +%s)"\n\n# Create an A record alias pointing to CloudFront\naws route53 change-resource-record-sets \\\n  --hosted-zone-id Z1234567890 \\\n  --change-batch \'{\n    "Changes": [{\n      "Action": "UPSERT",\n      "ResourceRecordSet": {\n        "Name": "myapp.com",\n        "Type": "A",\n        "AliasTarget": {\n          "DNSName": "d1234.cloudfront.net",\n          "HostedZoneId": "Z2FDTNDATAQYW2",\n          "EvaluateTargetHealth": false\n        }\n      }\n    }]\n  }\'\n\n# List all hosted zones\naws route53 list-hosted-zones --output table',
    cdkExample: `import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

// Look up an existing hosted zone
const zone = route53.HostedZone.fromLookup(this, 'Zone', {
  domainName: 'myapp.com',
});

// Create an A record alias pointing to your CloudFront distribution
new route53.ARecord(this, 'SiteAlias', {
  zone,
  recordName: 'myapp.com',
  target: route53.RecordTarget.fromAlias(
    new targets.CloudFrontTarget(distribution)
  ),
});

// Create a health check
new route53.CfnHealthCheck(this, 'ApiHealthCheck', {
  healthCheckConfig: {
    type: 'HTTPS',
    fullyQualifiedDomainName: 'api.myapp.com',
    port: 443,
    resourcePath: '/health',
    requestInterval: 30,
    failureThreshold: 3,
  },
});`,
  },
  {
    id: 'vpc',
    name: 'VPC',
    fullName: 'Virtual Private Cloud',
    cat: 'networking',
    level: 'intermediate',
    icon: '\u{1F3F0}',
    short: 'Your own private network inside AWS. Controls which resources can talk to each other and to the internet.',
    analogy: 'Building walls and gates around your office campus. You decide who gets in, who talks to whom, and what\'s locked down.',
    detail: 'A VPC is a logically isolated network within AWS. Every resource you create (EC2, RDS, etc.) lives inside a VPC. You define subnets (public ones that can reach the internet, private ones that can\'t), route tables, and network ACLs. Think of it as the networking foundation everything else sits on.',
    useCases: [
      'Isolating production from development environments',
      'Putting databases in private subnets (no internet access)',
      'Connecting to on-premises networks via VPN',
    ],
    keyTerms: {
      Subnet: 'A range of IP addresses within your VPC',
      'Public Subnet': 'Has a route to the internet',
      'Private Subnet': 'No direct internet access',
      'NAT Gateway': 'Lets private subnet resources make outbound internet requests',
    },
    pricing: 'VPCs are free. NAT Gateways cost ~$0.045/hr + data charges.',
    code: '// VPCs are infrastructure \u2014 you don\'t interact with them in app code.\n// But understanding them helps you debug connectivity issues:\n\n// "My Lambda can\'t reach my RDS database"\n//  \u2192 Is the Lambda in the same VPC? Same subnet? Check security groups.\n\n// "My EC2 instance can\'t reach the internet"\n//  \u2192 Is it in a public subnet with an Internet Gateway?\n//  \u2192 Or a private subnet without a NAT Gateway?\n\n// Common VPC CIDR block:\n// 10.0.0.0/16  \u2192  65,536 IPs\n//   10.0.1.0/24  \u2192  public subnet (256 IPs)\n//   10.0.2.0/24  \u2192  private subnet (256 IPs)',
    howItWorks: 'When you create a VPC, you define a CIDR block \u2014 a range of private IP addresses (e.g., 10.0.0.0/16 gives you 65,536 addresses). Within that VPC, you create subnets, each tied to a specific Availability Zone and assigned a smaller CIDR range. A "public" subnet has a route table entry pointing 0.0.0.0/0 to an Internet Gateway (IGW), which means resources there can get public IPs and reach the internet. A "private" subnet has no such route \u2014 resources can only communicate within the VPC unless you add a NAT Gateway.\n\nTraffic control happens at two levels. Security Groups act as instance-level firewalls \u2014 they\'re stateful, meaning if you allow inbound traffic on port 443, the response is automatically allowed out. Network ACLs (NACLs) are subnet-level firewalls \u2014 they\'re stateless, meaning you must explicitly allow both inbound and outbound rules. In practice, most teams rely on Security Groups and leave NACLs at their permissive defaults.\n\nVPCs can be connected to each other via VPC Peering (direct connection between two VPCs, even cross-account) or Transit Gateway (a hub that connects multiple VPCs and on-premises networks). For hybrid architectures, you can establish a Site-to-Site VPN or use Direct Connect to create a private link between your data center and your VPC. VPC Flow Logs capture metadata about all traffic (source, destination, port, action) and can be sent to CloudWatch or S3 for analysis.',
    gotchas: [
      'NAT Gateway costs add up fast: $0.045/hr ($32/month) per gateway PLUS $0.045/GB of data processed. If you have Lambda functions in private subnets pulling large datasets, your NAT bill can easily exceed your compute bill.',
      'CIDR blocks cannot be changed after creation (though you can add secondary CIDR blocks). Plan your IP address space carefully \u2014 use /16 for your VPC and /24 for subnets to leave room for growth. Overlapping CIDRs prevent VPC peering.',
      'Security Group rules reference other Security Groups by ID, not IP. This is powerful (e.g., "allow traffic from any instance in the ALB security group") but confusing at first. If something can\'t connect, check Security Groups before anything else.',
      'Every region has a default VPC that\'s created automatically. It has public subnets and an internet gateway already configured. It\'s fine for experiments but not for production \u2014 create a custom VPC with proper public/private subnet separation.',
    ],
    whenNotToUse: [
      'Purely serverless architectures using API Gateway + Lambda + DynamoDB \u2014 these services operate outside your VPC by default and don\'t need one unless your Lambda must access VPC-internal resources like RDS.',
      'Quick prototypes or learning projects \u2014 the default VPC is fine. Don\'t spend time on VPC design for throwaway experiments.',
      'If your app runs entirely on managed services (Amplify, AppRunner, Lightsail) that handle networking for you \u2014 you\'d be adding complexity for no benefit.',
    ],
    relatedServices: ['ec2', 'rds', 'lambda', 'elb', 'direct-connect', 'nat-gateway'],
    relatedGuides: [],
    cliExample: '# Create a VPC with a /16 CIDR block\naws ec2 create-vpc \\\n  --cidr-block 10.0.0.0/16 \\\n  --tag-specifications \'ResourceType=vpc,Tags=[{Key=Name,Value=my-app-vpc}]\'\n\n# Create a public subnet\naws ec2 create-subnet \\\n  --vpc-id vpc-0123456789abcdef0 \\\n  --cidr-block 10.0.1.0/24 \\\n  --availability-zone us-east-1a\n\n# Create and attach an internet gateway\naws ec2 create-internet-gateway\naws ec2 attach-internet-gateway \\\n  --internet-gateway-id igw-0123456789abcdef0 \\\n  --vpc-id vpc-0123456789abcdef0\n\n# Describe VPC subnets\naws ec2 describe-subnets \\\n  --filters "Name=vpc-id,Values=vpc-0123456789abcdef0" \\\n  --query "Subnets[].{Id:SubnetId,AZ:AvailabilityZone,CIDR:CidrBlock}"',
    cdkExample: `import * as ec2 from 'aws-cdk-lib/aws-ec2';

// Create a VPC with public and private subnets across 2 AZs
const vpc = new ec2.Vpc(this, 'AppVpc', {
  maxAzs: 2,
  cidr: '10.0.0.0/16',
  subnetConfiguration: [
    {
      name: 'Public',
      subnetType: ec2.SubnetType.PUBLIC,
      cidrMask: 24,
    },
    {
      name: 'Private',
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      cidrMask: 24,
    },
    {
      name: 'Isolated',
      subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      cidrMask: 24,
    },
  ],
  // NAT Gateway for private subnet internet access
  natGateways: 1,
});

// Create a security group for your web servers
const webSg = new ec2.SecurityGroup(this, 'WebSG', {
  vpc,
  description: 'Allow HTTP/HTTPS inbound',
  allowAllOutbound: true,
});
webSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'HTTPS');`,
  },
  {
    id: 'elb',
    name: 'ELB',
    fullName: 'Elastic Load Balancing',
    cat: 'networking',
    level: 'intermediate',
    icon: '\u2696\uFE0F',
    short: 'Distributes incoming traffic across multiple servers. If one server is overwhelmed or crashes, traffic goes to the healthy ones.',
    analogy: 'A restaurant host that seats guests evenly across all open tables instead of piling everyone at table 1.',
    detail: 'ELB automatically distributes incoming application traffic across multiple targets (EC2 instances, containers, IPs). It detects unhealthy targets and stops sending them traffic. There are three types: Application (HTTP/HTTPS, Layer 7), Network (TCP/UDP, Layer 4), and Gateway (third-party appliances).',
    useCases: [
      'Distributing web traffic across multiple servers',
      'SSL/TLS termination (handle HTTPS at the load balancer)',
      'Blue/green deployments',
    ],
    keyTerms: {
      ALB: 'Application Load Balancer \u2014 routes HTTP/HTTPS based on URL paths, headers',
      NLB: 'Network Load Balancer \u2014 ultra-fast Layer 4 routing for TCP/UDP',
      'Target Group': 'A set of servers that receive traffic from the load balancer',
      'Health Check': 'Periodic ping to verify a server is still healthy',
    },
    pricing: 'ALB: ~$0.0225/hr + per LCU (Load Balancer Capacity Unit).',
    code: '// You interact with ELB indirectly \u2014 your app code doesn\'t change.\n// But knowing the request headers it sets is useful:\n\n// ALB adds these headers to forwarded requests:\n// X-Forwarded-For:   the client\'s real IP address\n// X-Forwarded-Proto: "http" or "https"\n// X-Forwarded-Port:  the port the client connected on\n\n// In Express.js, trust the proxy to get the real client IP:\napp.set("trust proxy", true);\napp.get("/", (req, res) => {\n  console.log(req.ip); // now shows the real client IP\n});',
    howItWorks: 'When traffic arrives at an ELB, the load balancer evaluates its rules and forwards the request to a healthy target in one of your registered target groups. The ALB (Application Load Balancer) operates at Layer 7 (HTTP/HTTPS), which means it can inspect the request URL path, HTTP headers, query strings, and even the source IP to make routing decisions. For example, you can route /api/* to your backend target group and /static/* to a different one. The NLB (Network Load Balancer) operates at Layer 4 (TCP/UDP), passing raw connections through with ultra-low latency and millions of requests per second.\n\nHealth checks run continuously in the background. The load balancer sends periodic requests (configurable interval, path, and success codes) to each target. If a target fails a configurable number of consecutive checks, it\'s marked unhealthy and removed from the rotation. Once it passes enough consecutive checks, it\'s automatically added back. This gives you self-healing infrastructure without any manual intervention.\n\nThe ALB supports several advanced features that frontend engineers should know about. Sticky sessions (session affinity) route a user to the same target for a configurable duration \u2014 useful for applications with server-side session state. Weighted target groups let you shift traffic gradually (e.g., 95% to v1, 5% to v2 for canary deployments). The ALB can also authenticate users directly via OIDC providers (Cognito, Okta, Auth0) before forwarding the request, offloading auth from your application entirely.',
    gotchas: [
      'ALB health checks hit your app every 15\u201330 seconds per target. If your health check endpoint is expensive (e.g., it queries a database), this adds constant load. Create a lightweight /health endpoint that returns 200 without doing real work.',
      'ALB idle timeout defaults to 60 seconds. If your backend takes longer than 60 seconds to respond, the ALB will drop the connection and return a 504. Increase the ALB timeout AND set your server\'s keep-alive timeout higher than the ALB\'s to avoid intermittent 502 errors.',
      'NLB preserves the client\'s source IP, but ALB does not \u2014 it puts the real IP in the X-Forwarded-For header. If your app uses `req.ip` without configuring `trust proxy`, you\'ll see the ALB\'s internal IP instead of the real client.',
      'Deployment gotcha: when you register new targets (e.g., during a blue/green deploy), they must pass health checks before receiving traffic. Factor in the health check interval and threshold when calculating deployment time.',
    ],
    whenNotToUse: [
      'Single-instance applications where you don\'t need high availability \u2014 an ALB adds $16+/month in baseline costs even with minimal traffic. Use CloudFront or API Gateway directly if your backend is a single server or Lambda.',
      'Serverless architectures: API Gateway is the natural front door for Lambda-based APIs and includes routing, throttling, and auth built in. Adding an ALB in front of Lambda is possible but almost always unnecessary.',
      'Ultra-low-latency gRPC or gaming connections where even ALB\'s overhead matters \u2014 consider NLB or direct connections via Global Accelerator instead.',
    ],
    relatedServices: ['ec2', 'ecs', 'acm', 'waf', 'cloudfront', 'vpc'],
    relatedGuides: ['nginx'],
    cliExample: '# Create an Application Load Balancer\naws elbv2 create-load-balancer \\\n  --name my-app-alb \\\n  --type application \\\n  --subnets subnet-0123456789abcdef0 subnet-abcdef0123456789a \\\n  --security-groups sg-0123456789abcdef0\n\n# Create a target group\naws elbv2 create-target-group \\\n  --name my-app-targets \\\n  --protocol HTTP \\\n  --port 3000 \\\n  --vpc-id vpc-0123456789abcdef0 \\\n  --health-check-path /health\n\n# Register an EC2 instance as a target\naws elbv2 register-targets \\\n  --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/my-app-targets/1234567890abcdef \\\n  --targets Id=i-0123456789abcdef0\n\n# Check target health\naws elbv2 describe-target-health \\\n  --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/my-app-targets/1234567890abcdef',
    cdkExample: `import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';

// Create an Application Load Balancer in your VPC
const alb = new elbv2.ApplicationLoadBalancer(this, 'ALB', {
  vpc,
  internetFacing: true,
});

// Create a target group for your backend
const targetGroup = new elbv2.ApplicationTargetGroup(this, 'TargetGroup', {
  vpc,
  port: 3000,
  protocol: elbv2.ApplicationProtocol.HTTP,
  healthCheck: {
    path: '/health',
    healthyThresholdCount: 2,
    interval: cdk.Duration.seconds(15),
  },
});

// Add an HTTPS listener (needs a certificate from ACM)
const listener = alb.addListener('HttpsListener', {
  port: 443,
  certificates: [certificate],
  defaultTargetGroups: [targetGroup],
});

// Path-based routing: /api/* goes to backend, everything else to frontend
listener.addTargetGroups('ApiRouting', {
  targetGroups: [apiTargetGroup],
  priority: 10,
  conditions: [elbv2.ListenerCondition.pathPatterns(['/api/*'])],
});`,
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    fullName: 'Amazon API Gateway',
    cat: 'networking',
    level: 'beginner',
    icon: '\u{1F6AA}',
    short: 'A front door for your APIs. Handles routing, authentication, rate limiting, and connects beautifully with Lambda.',
    analogy: 'A receptionist at an office building \u2014 checks your ID, directs you to the right floor, and makes sure too many people don\'t crowd in at once.',
    detail: 'API Gateway lets you define REST or WebSocket APIs without running any servers. You create routes (GET /users, POST /orders), and point each one at a Lambda function, an HTTP backend, or another AWS service. It handles auth, CORS, throttling, and can even generate SDK code for your frontend.',
    useCases: [
      'Building serverless REST APIs with Lambda',
      'WebSocket APIs for real-time features',
      'API versioning and canary deployments',
    ],
    keyTerms: {
      Stage: 'A named deployment (dev, staging, prod)',
      Resource: 'A URL path segment (/users, /orders)',
      Method: 'An HTTP verb on a resource (GET, POST, etc.)',
    },
    pricing: 'REST: $3.50/million requests. HTTP APIs: $1.00/million requests. Free tier: 1M calls/month for 12 months.',
    code: '// Your frontend fetches from API Gateway like any REST API:\n\nconst response = await fetch(\n  "https://abc123.execute-api.us-east-1.amazonaws.com/prod/users",\n  {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      Authorization: `Bearer ${token}`,\n    },\n    body: JSON.stringify({ name: "Alice" }),\n  }\n);\n\nconst data = await response.json();\n\n// Behind the scenes, API Gateway:\n// 1. Validates the JWT token\n// 2. Checks rate limits\n// 3. Routes to a Lambda function\n// 4. Returns the Lambda response to your frontend',
    howItWorks: 'API Gateway acts as a fully managed reverse proxy. When a request arrives, it passes through a pipeline of configurable stages. First, the request is authenticated \u2014 via IAM roles, Lambda authorizers (custom auth logic), Cognito user pools, or JWT authorizers (HTTP APIs only). Next, the request is validated against models you define (request body schema, required query parameters, required headers). Then it\'s transformed using mapping templates (Velocity Template Language for REST APIs) and forwarded to your integration \u2014 typically a Lambda function, but also an HTTP endpoint, another AWS service, or a mock response.\n\nThere are two main flavors: REST APIs and HTTP APIs. REST APIs are the original, feature-rich option with full request/response transformation, API keys, usage plans, WAF integration, and caching. HTTP APIs are newer, ~70% cheaper, support JWT auth natively, and have automatic CORS \u2014 but lack some REST API features like request validation and caching. For most new projects, HTTP APIs are the better choice unless you specifically need REST API features.\n\nAPI Gateway also supports WebSocket APIs for real-time communication. Unlike REST, WebSocket connections are persistent \u2014 clients connect once and exchange messages in both directions. API Gateway manages the connection lifecycle ($connect, $disconnect routes) and message routing ($default route or custom route keys). Your backend (usually Lambda) can push messages to specific connected clients via a callback URL. This is great for chat applications, live notifications, or collaborative editing features.',
    gotchas: [
      'REST API Gateway has a 29-second timeout that CANNOT be increased. If your Lambda function takes longer (e.g., large file processing), the client gets a 504. Offload long-running work to an async pattern: accept the request, return 202, process in the background, notify via WebSocket or polling.',
      'CORS with API Gateway is notoriously confusing. For REST APIs, you must enable CORS on each resource AND configure your Lambda to return CORS headers. For HTTP APIs, you configure CORS once at the API level and it applies to all routes. If you\'re getting CORS errors, check both places.',
      'The default throttle limit is 10,000 requests/second per region (across ALL your APIs). If you\'re building a high-traffic app, request a limit increase early. Individual stages and methods can be throttled further with usage plans.',
      'Cold starts compound: API Gateway + Lambda cold start can add 1\u20133 seconds to the first request. Use provisioned concurrency on Lambda and enable API Gateway caching (REST APIs only) to mitigate this for latency-sensitive endpoints.',
    ],
    whenNotToUse: [
      'High-throughput, low-latency APIs where the per-request pricing becomes expensive at scale and the added latency matters \u2014 a containerized API behind an ALB is more cost-effective past ~100M requests/month.',
      'gRPC or non-HTTP protocols \u2014 API Gateway only supports HTTP and WebSocket. Use an NLB or App Mesh for gRPC-based microservices.',
      'Long-running connections beyond WebSocket (like Server-Sent Events or HTTP streaming) \u2014 API Gateway has connection duration limits. Use ALB or CloudFront for streaming patterns.',
    ],
    relatedServices: ['lambda', 'cognito', 'dynamodb', 'waf', 'acm', 'cloudfront'],
    relatedGuides: [],
    cliExample: '# Create an HTTP API (the simpler, cheaper option)\naws apigatewayv2 create-api \\\n  --name my-app-api \\\n  --protocol-type HTTP\n\n# Add a route that triggers a Lambda function\naws apigatewayv2 create-route \\\n  --api-id abc123 \\\n  --route-key "GET /users"\n\n# Create a deployment stage\naws apigatewayv2 create-stage \\\n  --api-id abc123 \\\n  --stage-name prod \\\n  --auto-deploy\n\n# Test your API\ncurl https://abc123.execute-api.us-east-1.amazonaws.com/prod/users',
    cdkExample: `import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as lambda from 'aws-cdk-lib/aws-lambda';

// Create the Lambda function that handles requests
const handler = new lambda.Function(this, 'ApiHandler', {
  runtime: lambda.Runtime.NODEJS_20_X,
  handler: 'index.handler',
  code: lambda.Code.fromAsset('lambda'),
});

// Create an HTTP API (simpler, cheaper than REST API)
const httpApi = new apigatewayv2.HttpApi(this, 'HttpApi', {
  apiName: 'my-app-api',
  corsPreflight: {
    allowOrigins: ['https://myapp.com'],
    allowMethods: [apigatewayv2.CorsHttpMethod.GET, apigatewayv2.CorsHttpMethod.POST],
    allowHeaders: ['Content-Type', 'Authorization'],
  },
});

// Add routes pointing to Lambda
httpApi.addRoutes({
  path: '/users',
  methods: [apigatewayv2.HttpMethod.GET],
  integration: new integrations.HttpLambdaIntegration('GetUsers', handler),
});

httpApi.addRoutes({
  path: '/users',
  methods: [apigatewayv2.HttpMethod.POST],
  integration: new integrations.HttpLambdaIntegration('CreateUser', handler),
});`,
  },
  {
    id: 'global-accelerator',
    name: 'Global Accelerator',
    fullName: 'AWS Global Accelerator',
    cat: 'networking',
    level: 'advanced',
    icon: '\u{1F680}',
    short: 'Routes user traffic through AWS\'s global network for faster, more reliable connections to your applications.',
    analogy: 'An express highway that bypasses internet traffic jams \u2014 users enter the AWS network at the nearest on-ramp and travel on private roads.',
    detail: 'Global Accelerator gives you static IP addresses that act as entry points to your application. User traffic enters the AWS global network at the nearest edge location and travels over AWS\'s backbone infrastructure, avoiding the unpredictable public internet. This reduces latency and improves availability.',
    useCases: [
      'Low-latency global applications',
      'Gaming and real-time applications',
      'Reliable multi-region failover',
    ],
    keyTerms: {
      Accelerator: 'The resource that provides static IPs and routing',
      'Endpoint Group': 'A regional set of targets (ALB, EC2, etc.)',
    },
    pricing: '$0.025/hr per accelerator + $0.015\u2013$0.070/GB data transfer.',
    code: '// Global Accelerator is transparent to your application code.\n// Your app doesn\'t know or care that traffic is being accelerated.\n\n// What changes is the entry point for your users:\n// Before: https://my-alb-123456.us-east-1.elb.amazonaws.com\n// After:  Use static IPs 75.2.60.5 and 99.83.190.102\n//         or a DNS name: a1234.awsglobalaccelerator.com\n\n// Your frontend just fetches from the Global Accelerator endpoint:\nconst response = await fetch("https://a1234.awsglobalaccelerator.com/api/data");\n\n// Behind the scenes:\n// 1. User\'s request enters AWS at the nearest edge location\n// 2. Travels over AWS private backbone (not the public internet)\n// 3. Arrives at your ALB/EC2 in the optimal region',
    howItWorks: 'Global Accelerator provides two static anycast IP addresses for your application. Anycast means the same IP addresses are announced from all AWS edge locations simultaneously. When a user\'s device connects to one of these IPs, the request is automatically routed to the nearest AWS edge location by the internet\'s BGP routing protocol. From there, the traffic travels over AWS\'s private global backbone network \u2014 a dedicated fiber network connecting all AWS regions \u2014 rather than hopping across the unpredictable public internet.\n\nOnce traffic enters the AWS network, Global Accelerator uses health checks and traffic dials to determine the best endpoint to forward the request to. Endpoint groups are configured per region, and each group contains endpoints (ALBs, NLBs, EC2 instances, or Elastic IPs). If all endpoints in the nearest region are unhealthy, traffic automatically fails over to the next closest healthy region. Traffic dials let you control what percentage of traffic goes to each region \u2014 useful for gradual migrations or testing a new region.\n\nThe real benefit over CloudFront for dynamic content is consistency. CloudFront is a CDN optimized for caching static content at the edge, while Global Accelerator optimizes the network path for dynamic, non-cacheable requests (API calls, database queries, real-time interactions). Together they\'re complementary: use CloudFront for static assets and Global Accelerator for your API tier. The static IPs are also valuable for clients that need to whitelist IP addresses in their firewalls.',
    gotchas: [
      'Global Accelerator costs $0.025/hr ($18/month) per accelerator just for being on, plus data transfer charges. This baseline cost is hard to justify for small apps \u2014 make sure you actually have global users before adding it.',
      'It does NOT cache content \u2014 every request is forwarded to your origin. If you need caching for static assets, use CloudFront. Global Accelerator and CloudFront complement each other but serve different purposes.',
      'DNS-based solutions (like Route 53 latency routing) have a similar effect with no baseline cost. Global Accelerator\'s advantage is its anycast static IPs and faster failover (under 30 seconds vs. DNS TTL-based failover), but DNS routing is "good enough" for many applications.',
      'Client IP preservation works differently depending on endpoint type. ALB endpoints receive the original client IP by default, but NLB and EC2 endpoints require enabling client IP preservation explicitly in the endpoint configuration.',
    ],
    whenNotToUse: [
      'Applications with users concentrated in one geographic region \u2014 Global Accelerator shines for global traffic distribution but adds unnecessary cost for single-region workloads.',
      'Static content delivery \u2014 CloudFront is purpose-built for caching and serving static assets at the edge. Global Accelerator forwards every request to your origin, which is wasteful for cacheable content.',
      'Budget-constrained projects where DNS-based routing (Route 53 latency or geolocation routing) provides adequate global routing at a fraction of the cost.',
    ],
    relatedServices: ['cloudfront', 'elb', 'ec2', 'route53', 'vpc'],
    relatedGuides: [],
    cliExample: '# Create an accelerator with static IPs\naws globalaccelerator create-accelerator \\\n  --name my-app-accelerator \\\n  --ip-address-type IPV4 \\\n  --enabled\n\n# Create a listener on port 443\naws globalaccelerator create-listener \\\n  --accelerator-arn arn:aws:globalaccelerator::123456789012:accelerator/abcd-1234 \\\n  --port-ranges FromPort=443,ToPort=443 \\\n  --protocol TCP\n\n# Add an endpoint group in us-east-1\naws globalaccelerator create-endpoint-group \\\n  --listener-arn arn:aws:globalaccelerator::123456789012:accelerator/abcd-1234/listener/efgh-5678 \\\n  --endpoint-group-region us-east-1 \\\n  --endpoint-configurations "EndpointId=arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-alb/1234567890abcdef,Weight=100"\n\n# List all accelerators\naws globalaccelerator list-accelerators',
    cdkExample: `import * as globalaccelerator from 'aws-cdk-lib/aws-globalaccelerator';
import * as ga_endpoints from 'aws-cdk-lib/aws-globalaccelerator-endpoints';

// Create a Global Accelerator
const accelerator = new globalaccelerator.Accelerator(this, 'Accelerator', {
  acceleratorName: 'my-app-accelerator',
});

// Create a listener for HTTPS traffic
const listener = accelerator.addListener('Listener', {
  portRanges: [{ fromPort: 443, toPort: 443 }],
  protocol: globalaccelerator.ConnectionProtocol.TCP,
});

// Add your ALB as an endpoint in us-east-1
listener.addEndpointGroup('UsEast1', {
  region: 'us-east-1',
  endpoints: [
    new ga_endpoints.ApplicationLoadBalancerEndpoint(alb, {
      weight: 100,
      preserveClientIp: true,
    }),
  ],
  healthCheckPath: '/health',
  healthCheckIntervalSec: 10,
});

// Add a second region for failover
listener.addEndpointGroup('EuWest1', {
  region: 'eu-west-1',
  endpoints: [
    new ga_endpoints.ApplicationLoadBalancerEndpoint(euAlb, {
      weight: 100,
    }),
  ],
});`,
  },
  {
    id: 'direct-connect',
    name: 'Direct Connect',
    fullName: 'AWS Direct Connect',
    cat: 'networking',
    level: 'advanced',
    icon: '\u{1F50C}',
    short: 'A dedicated physical network connection from your office/data center to AWS. Bypasses the public internet entirely.',
    analogy: 'A private tunnel from your building directly into AWS \u2014 no traffic, no roadblocks, maximum speed and privacy.',
    detail: 'Direct Connect establishes a dedicated, private link between your on-premises network and AWS. It provides consistent network performance, lower latency, and potentially lower data transfer costs than going over the internet. Used by enterprises with high-bandwidth or low-latency requirements.',
    useCases: [
      'Hybrid cloud architectures',
      'Large data transfers to/from AWS',
      'Regulatory requirements for private connectivity',
    ],
    keyTerms: {
      Connection: 'The physical circuit (1 Gbps or 10 Gbps)',
      'Virtual Interface': 'A logical connection over your physical circuit',
    },
    pricing: 'Port hours: $0.03/hr. Data transfer out: $0.02\u2013$0.09/GB (cheaper than internet).',
    code: '// Direct Connect is pure infrastructure \u2014 no code changes needed.\n// Your app works exactly the same, just over a faster, private link.\n\n// The difference is in how your app connects to AWS services:\n\n// Over the internet (before Direct Connect):\n//   App Server \u2192 ISP \u2192 Public Internet \u2192 AWS Region\n//   Latency: 20\u201380ms, variable, shared bandwidth\n\n// Over Direct Connect:\n//   App Server \u2192 Your Router \u2192 Direct Connect \u2192 AWS Region\n//   Latency: 2\u201310ms, consistent, dedicated bandwidth\n\n// Your connection string stays the same:\nconst db = new Client({\n  host: "mydb.cluster-abc123.us-east-1.rds.amazonaws.com",\n  // Traffic now goes over Direct Connect instead of the internet\n});',
    howItWorks: 'Direct Connect works by establishing a physical cross-connect between your network equipment and AWS\'s router at a Direct Connect location (a colocation facility). There are 100+ Direct Connect locations worldwide operated by AWS partners. You order a connection (1 Gbps, 10 Gbps, or 100 Gbps for dedicated; 50 Mbps to 10 Gbps for hosted), and a physical Ethernet cable is run between your port and AWS\'s port in the same facility. If your data center isn\'t in a Direct Connect location, your telecom provider can extend the connection from the DC to the nearest Direct Connect location.\n\nOn top of the physical connection, you create Virtual Interfaces (VIFs). A Public VIF lets you access AWS public services (S3, DynamoDB, etc.) over the private link instead of the internet. A Private VIF connects to your VPC \u2014 traffic between your on-premises network and your VPC\'s private subnets flows over the dedicated link. A Transit VIF connects to a Transit Gateway, giving you access to multiple VPCs across regions through a single VIF. BGP (Border Gateway Protocol) is used to exchange route information between your router and AWS.\n\nFor redundancy, AWS strongly recommends setting up two connections at different Direct Connect locations. If one connection fails, traffic automatically routes over the other. You can also set up a Site-to-Site VPN as a backup that activates if Direct Connect goes down. Direct Connect Gateway is a global resource that lets a single Direct Connect circuit access VPCs in any AWS region, so you don\'t need a separate physical connection per region.',
    gotchas: [
      'Provisioning takes weeks to months, not minutes. You need to work with a colocation provider and potentially a telecom carrier to run physical cables. Plan Direct Connect setup 2\u20133 months before you need it in production.',
      'A single Direct Connect connection is NOT redundant \u2014 if the cable or the Direct Connect location has an issue, you lose connectivity. Always set up either dual connections at different locations or a VPN failover. AWS will flag single connections during Well-Architected reviews.',
      'Direct Connect does NOT encrypt traffic by default \u2014 it\'s a private link, but data travels unencrypted on the wire. If you need encryption (and you probably do for compliance), run a Site-to-Site VPN on top of the Direct Connect connection for IPsec encryption.',
      'Costs are predictable but not cheap: you pay for the port ($0.03/hr for 1 Gbps = ~$22/month) plus data transfer, PLUS the cross-connect fee from the colocation facility ($50\u2013$500/month) PLUS any telecom backhaul costs. Total cost often starts at $500+/month.',
    ],
    whenNotToUse: [
      'Cloud-native applications with no on-premises infrastructure \u2014 if everything runs in AWS, there\'s nothing to connect. Direct Connect is for hybrid architectures that bridge on-premises and cloud.',
      'Small data transfer volumes or infrequent access patterns \u2014 a Site-to-Site VPN ($0.05/hr, encrypted, provisioned in minutes) provides private connectivity at a fraction of the cost and setup time.',
      'Startups or teams that need agility \u2014 the weeks-long provisioning timeline and long-term cost commitments conflict with rapid iteration. Start with VPN and upgrade to Direct Connect when bandwidth demands justify it.',
    ],
    relatedServices: ['vpc', 'transit-gateway', 'vpn', 'ec2', 's3', 'global-accelerator'],
    relatedGuides: [],
    cliExample: '# Create a Direct Connect connection request\naws directconnect create-connection \\\n  --location EqDC2 \\\n  --bandwidth 1Gbps \\\n  --connection-name "prod-dc-primary"\n\n# Create a private virtual interface to connect to your VPC\naws directconnect create-private-virtual-interface \\\n  --connection-id dxcon-abc12345 \\\n  --new-private-virtual-interface \\\n    virtualInterfaceName=prod-vif,vlan=101,asn=65000,virtualGatewayId=vgw-abc12345\n\n# Describe your connections\naws directconnect describe-connections\n\n# Describe virtual interfaces\naws directconnect describe-virtual-interfaces \\\n  --connection-id dxcon-abc12345',
    cdkExample: `import * as ec2 from 'aws-cdk-lib/aws-ec2';

// Direct Connect resources are typically created via the console
// or CLI because they involve physical provisioning.
// CDK can create the VPN Gateway side that receives the connection:

const vpc = new ec2.Vpc(this, 'HybridVpc', {
  maxAzs: 2,
  cidr: '10.0.0.0/16',
});

// Create a Virtual Private Gateway (attaches to your VPC)
const vgw = new ec2.VpnGateway(this, 'VpnGateway', {
  type: ec2.VpnConnectionType.IPSEC_1,
});
vpc.addGateway('AttachVGW', vgw);

// Enable route propagation from Direct Connect
// so your VPC route tables learn on-premises routes via BGP
const routeTable = vpc.privateSubnets[0].routeTable;
new ec2.CfnVPNGatewayRoutePropagation(this, 'RoutePropagation', {
  routeTableIds: [routeTable.routeTableId],
  vpnGatewayId: vgw.gatewayId,
});

// You can also create a Direct Connect Gateway in CloudFormation:
new cdk.CfnResource(this, 'DxGateway', {
  type: 'AWS::DirectConnect::DirectConnectGateway',
  properties: {
    DirectConnectGatewayName: 'prod-dx-gateway',
    AmazonSideAsn: 64512,
  },
});`,
  },
]
