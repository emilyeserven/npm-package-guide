import type { AwsService } from './types'

export const COMPUTE_SERVICES: AwsService[] = [
  {
    id: 'ec2',
    name: 'EC2',
    fullName: 'Elastic Compute Cloud',
    cat: 'compute',
    level: 'beginner',
    icon: '\u{1F5A5}\uFE0F',
    short: 'Virtual computers in the cloud. You rent a machine (called an "instance"), pick its power level, and run whatever you want on it.',
    analogy: 'Renting a desk at a co-working space \u2014 you choose the size, bring your stuff, and leave when you\'re done.',
    detail: 'EC2 is the bread and butter of AWS. It gives you a virtual machine (VM) \u2014 essentially a computer running in Amazon\'s data center that you can SSH into and control. You choose the operating system (Linux, Windows), the CPU/RAM combo (called "instance types" like t3.micro, m5.large), and you pay by the hour or second.',
    useCases: [
      'Hosting a backend API server (Express, Django, Rails)',
      'Running a build server for CI/CD',
      'Hosting any application that needs a full OS environment',
    ],
    keyTerms: {
      Instance: 'A single virtual machine',
      AMI: 'Amazon Machine Image \u2014 a pre-configured OS snapshot',
      'Security Group': 'A firewall that controls what traffic reaches your instance',
    },
    pricing: 'Free tier: 750 hrs/month of t2.micro for 12 months. After: pay per hour based on instance size.',
    code: '// You don\'t write code TO EC2 directly.\n// You SSH in and run your app:\n\n$ ssh -i mykey.pem ec2-user@3.14.159.26\n$ node server.js  // your app runs here',
    howItWorks:
      'Under the hood, EC2 runs on top of Amazon\'s custom hypervisor called Nitro. When you launch an instance, AWS carves out a slice of a physical server in one of their data centers and assigns it dedicated CPU cores, memory, and network bandwidth based on the instance type you chose. The Nitro hypervisor ensures your slice is completely isolated from other customers on the same physical machine \u2014 your processes, memory, and storage are invisible to everyone else.\n\n' +
      'When you start an instance, AWS reads the AMI (Amazon Machine Image) you selected and writes its contents to an EBS volume that becomes your root disk. The instance boots from that volume like a regular computer booting from a hard drive. Your instance gets a private IP on your VPC (Virtual Private Cloud) network, and optionally a public IP so the internet can reach it. Security Groups act as a stateful firewall \u2014 you define which ports accept inbound traffic (e.g., port 443 for HTTPS), and AWS enforces those rules at the network level before packets ever reach your instance.\n\n' +
      'Scaling works by launching more instances behind a load balancer. Auto Scaling Groups let you define rules like "add an instance when CPU exceeds 70%" and "remove one when it drops below 30%." Each instance is disposable \u2014 if one fails, the Auto Scaling Group replaces it automatically. This is why you treat EC2 instances as "cattle, not pets": design your app so any instance can be terminated and replaced without losing data.',
    gotchas: [
      'Leaving instances running when you\'re not using them \u2014 a forgotten t3.medium costs ~$30/month. Always stop or terminate dev instances when done.',
      'Using the default security group that allows all outbound traffic. Create custom security groups with the minimum ports your app needs (usually just 22 for SSH and 443 for HTTPS).',
      'Storing application data on the instance\'s root volume instead of a separate EBS volume or S3. If the instance terminates, the root volume can be deleted automatically \u2014 your data goes with it.',
      'Picking an instance type that\'s too large "just in case." Start with t3.micro or t3.small, monitor actual usage with CloudWatch, and resize only when you have real data showing you need more.',
    ],
    whenNotToUse: [
      'When you just want to deploy a web app and don\'t care about server management \u2014 use Elastic Beanstalk, Fargate, or a serverless approach (Lambda + API Gateway) instead.',
      'For short-lived, event-driven tasks like processing uploaded images or handling webhooks \u2014 Lambda is cheaper and scales to zero when idle.',
      'When running containers \u2014 ECS/Fargate or EKS are purpose-built for container orchestration and handle scheduling, networking, and health checks for you.',
    ],
    relatedServices: ['ebs', 'elb', 'vpc', 'auto-scaling', 'cloudwatch', 'lightsail', 'elastic-beanstalk'],
    relatedGuides: ['coolify-deploy'],
    cliExample:
      '# Launch a new EC2 instance\n' +
      'aws ec2 run-instances \\\n' +
      '  --image-id ami-0abcdef1234567890 \\\n' +
      '  --instance-type t3.micro \\\n' +
      '  --key-name my-key-pair \\\n' +
      '  --security-group-ids sg-0123456789abcdef0 \\\n' +
      '  --subnet-id subnet-0123456789abcdef0 \\\n' +
      '  --count 1 \\\n' +
      '  --tag-specifications \'ResourceType=instance,Tags=[{Key=Name,Value=my-app-server}]\'',
    cdkExample:
      'import * as ec2 from \'aws-cdk-lib/aws-ec2\';\n\n' +
      '// Look up the default VPC\n' +
      'const vpc = ec2.Vpc.fromLookup(this, \'Vpc\', { isDefault: true });\n\n' +
      '// Create an EC2 instance\n' +
      'const instance = new ec2.Instance(this, \'AppServer\', {\n' +
      '  vpc,\n' +
      '  instanceType: ec2.InstanceType.of(\n' +
      '    ec2.InstanceClass.T3, ec2.InstanceSize.MICRO\n' +
      '  ),\n' +
      '  machineImage: ec2.MachineImage.latestAmazonLinux2023(),\n' +
      '  keyPair: ec2.KeyPair.fromKeyPairName(this, \'KeyPair\', \'my-key-pair\'),\n' +
      '});\n\n' +
      '// Allow inbound HTTPS traffic\n' +
      'instance.connections.allowFromAnyIpv4(ec2.Port.tcp(443));',
  },
  {
    id: 'lightsail',
    name: 'Lightsail',
    fullName: 'Amazon Lightsail',
    cat: 'compute',
    level: 'beginner',
    icon: '\u{1F4A1}',
    short: 'The "easy mode" for hosting. Pre-configured virtual servers with simple, flat-rate pricing. Think of it as EC2 without the complexity.',
    analogy: 'A furnished apartment \u2014 everything\'s already set up, you just move in.',
    detail: 'Lightsail bundles compute, storage, and networking into one simple package. It\'s designed for people who don\'t want to learn the full AWS ecosystem just to host a WordPress site or a small Node app. You pick a plan ($3.50 to $160/mo), and you get a server with a static IP, storage, and data transfer included.',
    useCases: [
      'Hosting WordPress, Ghost, or other CMS platforms',
      'Small web apps and APIs',
      'Dev/test environments',
      'Personal projects and portfolios',
    ],
    keyTerms: {
      Blueprint: 'A pre-configured server template (e.g., Node.js, WordPress, LAMP)',
      'Static IP': 'A permanent IP address that doesn\'t change when you restart',
    },
    pricing: 'Starts at $3.50/month. Includes compute, storage, and data transfer.',
    code:
      '// Lightsail instances work like any Linux server.\n' +
      '// After creating one in the console, SSH in and deploy:\n\n' +
      '$ ssh -i LightsailKey.pem ubuntu@54.123.45.67\n' +
      '$ git clone https://github.com/you/my-app.git\n' +
      '$ cd my-app && npm install && npm start',
    howItWorks:
      'Lightsail is actually EC2 under the hood, but with a dramatically simplified interface. When you create a Lightsail instance, AWS provisions an EC2 instance from a curated set of instance types (you never see the instance type names \u2014 you just pick a plan by price). It also creates an EBS volume, sets up a VPC with sensible defaults, and configures a simplified firewall. All of this happens behind a separate console and API that hides the underlying EC2/VPC complexity.\n\n' +
      'Blueprints are pre-built AMIs that include an operating system plus pre-installed software. When you pick the "Node.js" blueprint, you get an Ubuntu instance with Node.js, npm, and PM2 already installed and configured. Lightsail also manages DNS, load balancers, and managed databases through its own simplified interface \u2014 these map to Route 53, ALB, and RDS under the covers, but with far fewer configuration options.\n\n' +
      'The flat-rate pricing works because each plan includes a generous data transfer allowance (starting at 1 TB/month). If you exceed it, overage charges apply at standard AWS rates. Lightsail instances can be "upgraded" to full EC2 via a snapshot-and-export workflow if you eventually need more control, so you\'re not locked in.',
    gotchas: [
      'Assuming you can use all AWS services seamlessly with Lightsail \u2014 Lightsail\'s networking is partially isolated from the rest of your AWS account. Connecting to RDS or other VPC resources requires VPC peering setup.',
      'Not setting up automated snapshots. Lightsail makes it easy with built-in scheduling, but it\'s off by default. Enable it immediately or you have no backups.',
      'Choosing the cheapest plan ($3.50) for a production workload. The 512 MB RAM plan is fine for a static site but will struggle with Node.js or WordPress under any real traffic.',
      'Forgetting about the data transfer overage. The included transfer is generous, but if you serve large files (videos, downloads), you can exceed it and get surprised by charges at ~$0.09/GB.',
    ],
    whenNotToUse: [
      'When you need auto-scaling, custom networking, or fine-grained IAM policies \u2014 use EC2 with Auto Scaling Groups or ECS/Fargate instead.',
      'For container-based workloads \u2014 Lightsail has basic container support, but ECS/Fargate or EKS give you proper orchestration, service discovery, and integration with the full AWS ecosystem.',
      'When your architecture requires multiple interconnected AWS services (SQS, SNS, DynamoDB, etc.) \u2014 the simplified Lightsail networking makes service integration harder than it needs to be.',
    ],
    relatedServices: ['ec2', 'route53', 'rds', 'cloudfront'],
    relatedGuides: [],
    cliExample:
      '# Create a Lightsail instance with the Node.js blueprint\n' +
      'aws lightsail create-instances \\\n' +
      '  --instance-names my-node-app \\\n' +
      '  --availability-zone us-east-1a \\\n' +
      '  --blueprint-id node \\\n' +
      '  --bundle-id medium_3_0 \\\n' +
      '  --tags key=Project,value=my-portfolio',
    cdkExample:
      '// CDK doesn\'t have a high-level Lightsail construct,\n' +
      '// but you can use the L1 (CloudFormation) resource:\n' +
      'import * as lightsail from \'aws-cdk-lib/aws-lightsail\';\n\n' +
      'const instance = new lightsail.CfnInstance(this, \'MyApp\', {\n' +
      '  instanceName: \'my-node-app\',\n' +
      '  blueprintId: \'node\',\n' +
      '  bundleId: \'medium_3_0\',\n' +
      '  availabilityZone: \'us-east-1a\',\n' +
      '  tags: [{ key: \'Project\', value: \'my-portfolio\' }],\n' +
      '});\n\n' +
      '// Attach a static IP so the address survives restarts\n' +
      'const staticIp = new lightsail.CfnStaticIp(this, \'StaticIp\', {\n' +
      '  staticIpName: \'my-node-app-ip\',\n' +
      '  attachedTo: instance.instanceName,\n' +
      '});',
  },
  {
    id: 'elastic-beanstalk',
    name: 'Elastic Beanstalk',
    fullName: 'AWS Elastic Beanstalk',
    cat: 'compute',
    level: 'beginner',
    icon: '\u{1F331}',
    short: 'Upload your code and AWS automatically handles deployment, scaling, load balancing, and monitoring. Like Heroku, but in the AWS ecosystem.',
    analogy: 'A self-driving car \u2014 you tell it where to go (upload your app), and it figures out the route, parking, and fuel.',
    detail: 'Beanstalk is a Platform-as-a-Service (PaaS). You give it your app code (Node.js, Python, Java, Docker, etc.), and it provisions EC2 instances, sets up load balancers, configures auto-scaling, and deploys your code. You can still access the underlying resources if you need to tweak things.',
    useCases: [
      'Deploying web apps without learning infrastructure',
      'Teams that want AWS but not the complexity',
      'Migrating from Heroku',
    ],
    keyTerms: {
      Environment: 'A running version of your app with all its infrastructure',
      Platform: 'The runtime (Node.js, Python, Docker, etc.)',
    },
    pricing: 'No additional charge \u2014 you only pay for the underlying resources (EC2, load balancers, etc.).',
    code:
      '// package.json start script is all Beanstalk needs:\n' +
      '{\n' +
      '  "scripts": {\n' +
      '    "start": "node server.js"\n' +
      '  }\n' +
      '}\n\n' +
      '// Deploy from the command line:\n' +
      '// $ eb init        (one-time setup)\n' +
      '// $ eb create prod  (create environment)\n' +
      '// $ eb deploy       (push new code)',
    howItWorks:
      'When you deploy to Elastic Beanstalk, it creates a CloudFormation stack behind the scenes. That stack is a blueprint of all the infrastructure your app needs: EC2 instances to run your code, an Application Load Balancer (ALB) to distribute traffic, an Auto Scaling Group to add or remove instances based on demand, Security Groups for firewall rules, and CloudWatch alarms for health monitoring. Beanstalk is essentially an opinionated wrapper around these core AWS building blocks.\n\n' +
      'During deployment, your application code gets zipped and uploaded to an S3 bucket. Beanstalk\'s agent (running on each EC2 instance) downloads the zip, extracts it, installs dependencies (e.g., `npm install`), and starts your app using the platform\'s conventions. For Node.js, it looks for a `start` script in your package.json. For Docker, it reads your Dockerfile. You can customize every step of this process using config files in a `.ebextensions/` folder or the newer `.platform/` hooks directory.\n\n' +
      'Health monitoring is continuous: Beanstalk pings your app\'s health endpoint every few seconds. If an instance fails health checks, the Auto Scaling Group terminates it and launches a replacement. Rolling deployments update instances in batches so your app stays available during deploys. You can also configure blue/green deployments that spin up an entirely new environment, test it, and swap the URL \u2014 giving you zero-downtime deployments with instant rollback.',
    gotchas: [
      'Not creating a `.ebextensions/` or `.platform/` config for environment-specific settings. Without them, things like environment variables, nginx proxy settings, and Node.js version selection require manual console clicks that are lost on environment rebuild.',
      'Deploying directly to production without a staging environment. Beanstalk makes it easy to create multiple environments (dev, staging, prod) \u2014 use "eb create staging" to test changes before swapping URLs with "eb swap".',
      'Ignoring the default 60-second deployment timeout for Node.js apps. If your `npm install` takes longer (common with native modules), the deployment fails. Increase it in `.ebextensions/` or use a Procfile to control startup.',
      'Storing uploaded files or user sessions on the local EC2 filesystem. Auto-scaling and instance replacement will destroy those files. Use S3 for uploads and DynamoDB/ElastiCache for sessions.',
    ],
    whenNotToUse: [
      'When you need fine-grained container orchestration (service meshes, sidecars, complex networking) \u2014 use ECS/Fargate or EKS instead. Beanstalk\'s Docker support is good for simple single-container apps but limited for microservice architectures.',
      'For event-driven or serverless workloads where your app sits idle most of the time \u2014 Lambda is far cheaper since you only pay per request, while Beanstalk runs EC2 instances 24/7 even with zero traffic.',
      'When you want full control over your infrastructure-as-code. Beanstalk\'s CloudFormation stack is managed for you, and fighting its defaults is frustrating. If you already know CloudFormation or CDK, deploying EC2 + ALB yourself gives you more flexibility.',
    ],
    relatedServices: ['ec2', 'elb', 's3', 'cloudwatch', 'rds', 'auto-scaling', 'cloudformation'],
    relatedGuides: [],
    cliExample:
      '# Initialize and deploy a Node.js app with the EB CLI\n' +
      'eb init my-app --platform node.js --region us-east-1\n' +
      'eb create production --instance-type t3.small \\\n' +
      '  --envvars NODE_ENV=production,PORT=8080\n\n' +
      '# Deploy updated code\n' +
      'eb deploy production',
    cdkExample:
      'import * as elasticbeanstalk from \'aws-cdk-lib/aws-elasticbeanstalk\';\nimport * as s3Assets from \'aws-cdk-lib/aws-s3-assets\';\n\n' +
      '// Upload the app bundle to S3\n' +
      'const appBundle = new s3Assets.Asset(this, \'AppBundle\', {\n' +
      '  path: \'./app\',  // your project directory\n' +
      '});\n\n' +
      '// Create the Beanstalk application\n' +
      'const app = new elasticbeanstalk.CfnApplication(this, \'App\', {\n' +
      '  applicationName: \'my-node-app\',\n' +
      '});\n\n' +
      '// Create an app version pointing to the S3 bundle\n' +
      'const appVersion = new elasticbeanstalk.CfnApplicationVersion(\n' +
      '  this, \'AppVersion\', {\n' +
      '    applicationName: app.applicationName!,\n' +
      '    sourceBundle: {\n' +
      '      s3Bucket: appBundle.s3BucketName,\n' +
      '      s3Key: appBundle.s3ObjectKey,\n' +
      '    },\n' +
      '  }\n' +
      ');\n\n' +
      '// Create the environment\n' +
      'new elasticbeanstalk.CfnEnvironment(this, \'Env\', {\n' +
      '  environmentName: \'production\',\n' +
      '  applicationName: app.applicationName!,\n' +
      '  solutionStackName: \'64bit Amazon Linux 2023 v6.1.0 running Node.js 20\',\n' +
      '  versionLabel: appVersion.ref,\n' +
      '  optionSettings: [\n' +
      '    {\n' +
      '      namespace: \'aws:autoscaling:launchconfiguration\',\n' +
      '      optionName: \'InstanceType\',\n' +
      '      value: \'t3.small\',\n' +
      '    },\n' +
      '    {\n' +
      '      namespace: \'aws:elasticbeanstalk:application:environment\',\n' +
      '      optionName: \'NODE_ENV\',\n' +
      '      value: \'production\',\n' +
      '    },\n' +
      '  ],\n' +
      '});',
  },
]
