import type { AwsService } from './types'

export const STORAGE_SERVICES: AwsService[] = [
  {
    id: 's3',
    name: 'S3',
    fullName: 'Simple Storage Service',
    cat: 'storage',
    level: 'beginner',
    icon: '\u{1FAA3}',
    short: 'Unlimited cloud file storage. Upload anything \u2014 images, videos, backups, static websites. The most widely used AWS service, period.',
    analogy: 'An infinite filing cabinet in the sky with a lock on every drawer.',
    detail: 'S3 stores "objects" (files) in "buckets" (folders). Each object gets a unique URL. It\'s incredibly durable (99.999999999% \u2014 that\'s eleven 9s) and can serve files directly to the web. Many companies use S3 to host their React/Vue build output as a static website.',
    useCases: [
      'Hosting static websites (React, Vue, Angular builds)',
      'Storing user uploads (images, documents)',
      'Data backups and archival',
      'Serving assets via CloudFront CDN',
    ],
    keyTerms: {
      Bucket: 'A container for your files (like a top-level folder)',
      Object: 'A single file stored in S3',
      'Storage Class': 'Pricing tiers based on how often you access files',
    },
    pricing: 'Free tier: 5 GB storage, 20K GET requests, 2K PUT requests. After: ~$0.023/GB/month for standard.',
    code: '// Upload to S3 from Node.js\nimport { S3Client, PutObjectCommand } from \'@aws-sdk/client-s3\';\n\nconst client = new S3Client({ region: \'us-east-1\' });\n\nawait client.send(new PutObjectCommand({\n  Bucket: \'my-app-uploads\',\n  Key: \'photos/cat.jpg\',\n  Body: fileBuffer,\n}));',
    howItWorks: `S3 is an object store, which means it does not use a traditional file system hierarchy. Instead, every file (called an "object") is stored in a flat namespace within a "bucket." The "folder" structure you see in the AWS Console is actually just key prefixes \u2014 a file at \`photos/vacation/beach.jpg\` has the full key string as its name, not a nested directory. This flat design is what lets S3 scale to virtually unlimited objects without performance degradation.

When you upload an object, S3 automatically replicates it across at least three Availability Zones in the region. This is how it achieves eleven 9s of durability. For reads, S3 provides strong read-after-write consistency \u2014 the moment a PUT completes, any subsequent GET will return the new data. This was a major change introduced in late 2020; before that, S3 had eventual consistency for overwrites, which caused all sorts of subtle bugs in applications.

For frontend engineers, S3 is most commonly encountered as the hosting layer for single-page applications. You run \`npm run build\`, upload the output to a bucket configured for static website hosting, and optionally put CloudFront in front for caching and HTTPS. S3 also powers pre-signed URLs, which let your backend generate a temporary upload/download link that your frontend can use directly \u2014 the browser talks straight to S3, bypassing your server entirely.`,
    gotchas: [
      'Bucket names are globally unique across ALL AWS accounts. If someone else took "my-app-uploads", you cannot use it. Use a naming convention like "company-project-env" to avoid conflicts.',
      'S3 charges for both storage AND requests. A bucket serving millions of tiny files can rack up significant GET request costs even if total storage is small. Put CloudFront in front to cache and reduce S3 request costs.',
      'Enabling "Block Public Access" is on by default for new buckets, which is good. But if you are hosting a static site without CloudFront, you need to configure a bucket policy for public reads \u2014 toggling the block-public-access settings alone is not enough.',
      'S3 event notifications (for triggering Lambdas on upload) only fire once per successful PUT. If you overwrite the same key rapidly, you might miss intermediate versions. For critical workflows, enable S3 versioning.',
    ],
    whenNotToUse: [
      'Do not use S3 as a database. It has no query language, no indexes, and no transactions. If you need to search or filter data, use DynamoDB, RDS, or even S3 Select for simple CSV/JSON queries.',
      'Avoid S3 for workloads that need POSIX file system semantics (file locks, append, random writes). Use EFS or EBS instead.',
      'S3 is not ideal for extremely latency-sensitive reads (sub-millisecond). For that, put ElastiCache or CloudFront in front, or consider DynamoDB for key-value lookups.',
    ],
    relatedServices: ['cloudfront', 'lambda', 'iam', 's3-glacier', 'transfer-family'],
    relatedGuides: ['s3-storage', 'multipart-uploads'],
    cliExample: `# Upload a file to S3
aws s3 cp ./dist/index.html s3://my-app-bucket/index.html --content-type "text/html"

# Sync an entire build folder
aws s3 sync ./dist s3://my-app-bucket --delete

# Generate a pre-signed URL (valid 1 hour)
aws s3 presign s3://my-app-bucket/reports/q4.pdf --expires-in 3600`,
    cdkExample: `import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

// Create a bucket for static site hosting
const siteBucket = new s3.Bucket(this, 'SiteBucket', {
  bucketName: 'my-app-frontend',
  publicReadAccess: false,
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});

// Deploy build output to the bucket
new s3deploy.BucketDeployment(this, 'DeploySite', {
  sources: [s3deploy.Source.asset('./dist')],
  destinationBucket: siteBucket,
});`,
  },
  {
    id: 'ebs',
    name: 'EBS',
    fullName: 'Elastic Block Store',
    cat: 'storage',
    level: 'intermediate',
    icon: '\u{1F4BE}',
    short: 'Hard drives for your EC2 virtual machines. Persistent storage that sticks around even when you stop your server.',
    analogy: 'An external hard drive you plug into your rented computer. Unplug the computer, the drive keeps your data.',
    detail: 'When you create an EC2 instance, it needs a disk to store the operating system and your files. That disk is an EBS volume. Unlike the instance\'s temporary storage, EBS volumes persist independently \u2014 you can stop an instance, detach the volume, and reattach it to another instance.',
    useCases: [
      'OS and application storage for EC2',
      'Database storage (MySQL, PostgreSQL data files)',
      'Any workload that needs fast, persistent disk I/O',
    ],
    keyTerms: {
      Volume: 'A virtual disk you attach to an EC2 instance',
      Snapshot: 'A point-in-time backup of a volume',
      IOPS: 'Input/Output Operations Per Second \u2014 a measure of disk speed',
    },
    pricing: 'gp3 (general purpose): ~$0.08/GB/month. Snapshots: ~$0.05/GB/month.',
    code: `// List EBS volumes attached to the current instance (Node.js)
import { EC2Client, DescribeVolumesCommand } from '@aws-sdk/client-ec2';

const ec2 = new EC2Client({ region: 'us-east-1' });

const { Volumes } = await ec2.send(new DescribeVolumesCommand({
  Filters: [{ Name: 'attachment.instance-id', Values: ['i-0abc123def456'] }],
}));

Volumes?.forEach(v => {
  console.log(\`Volume \${v.VolumeId}: \${v.Size}GB, type=\${v.VolumeType}, state=\${v.State}\`);
});`,
    howItWorks: `EBS provides block-level storage volumes that behave exactly like raw, unformatted hard drives. When you attach an EBS volume to an EC2 instance, the operating system sees it as a device (like \`/dev/xvdf\`). You format it with a filesystem (ext4, xfs, NTFS), mount it, and then read/write files normally. Under the hood, the data lives on AWS-managed hardware in the same Availability Zone as your instance \u2014 not on the physical machine running your EC2 instance.

EBS volumes come in several types optimized for different workloads. The most common is gp3 (General Purpose SSD), which gives you a baseline of 3,000 IOPS and 125 MB/s throughput \u2014 enough for most web application databases and boot volumes. If you need extreme I/O (think high-transaction databases), io2 Block Express volumes can deliver up to 256,000 IOPS. On the budget end, st1 (Throughput Optimized HDD) is meant for sequential reads like log processing.

The killer feature for operations is EBS Snapshots. A snapshot is an incremental backup of your volume stored in S3 (behind the scenes). The first snapshot copies all data; subsequent ones only copy changed blocks. You can create a new volume from any snapshot, even in a different Availability Zone. This is how you migrate data between AZs, create dev copies of production databases, or set up automated backups.`,
    gotchas: [
      'EBS volumes are locked to a single Availability Zone. You cannot attach a volume in us-east-1a to an instance in us-east-1b. To move data across AZs, create a snapshot and restore it in the target AZ.',
      'A standard EBS volume can only attach to one EC2 instance at a time (Multi-Attach is available for io1/io2 but requires a cluster-aware filesystem). If you need shared storage across instances, use EFS instead.',
      'Stopping and restarting an EC2 instance may move it to different physical hardware, but EBS volumes stay attached. However, instance store (ephemeral) volumes are lost on stop \u2014 do not confuse the two.',
      'gp3 volumes have a burst credit system for IOPS above the baseline. If you consistently exceed 3,000 IOPS without provisioning more, performance will throttle. Monitor BurstBalance in CloudWatch.',
    ],
    whenNotToUse: [
      'Do not use EBS when multiple servers need simultaneous read/write access to the same files. EBS is single-attach by default. Use EFS for shared file access.',
      'EBS is not a good fit for storing large amounts of infrequently accessed data (like backups or archives). It costs ~$0.08/GB vs S3 at ~$0.023/GB. Use S3 or Glacier for bulk storage.',
      'Avoid EBS for serverless or containerized workloads that do not run on EC2 (e.g., Lambda, Fargate). These services have their own ephemeral storage or should use S3/EFS.',
    ],
    relatedServices: ['ec2', 'efs', 's3'],
    relatedGuides: [],
    cliExample: `# Create a 50GB gp3 volume
aws ec2 create-volume --volume-type gp3 --size 50 --availability-zone us-east-1a

# Attach a volume to an instance
aws ec2 attach-volume --volume-id vol-0abc123 --instance-id i-0def456 --device /dev/xvdf

# Create a snapshot of a volume
aws ec2 create-snapshot --volume-id vol-0abc123 --description "Daily backup"

# List all snapshots you own
aws ec2 describe-snapshots --owner-ids self --query 'Snapshots[*].[SnapshotId,VolumeSize,StartTime]' --output table`,
    cdkExample: `import * as ec2 from 'aws-cdk-lib/aws-ec2';

// Create a gp3 volume
const dataVolume = new ec2.Volume(this, 'DataVolume', {
  availabilityZone: 'us-east-1a',
  size: cdk.Size.gibibytes(100),
  volumeType: ec2.EbsDeviceVolumeType.GP3,
  iops: 3000,
  throughput: 125, // MB/s
  encrypted: true,
  removalPolicy: cdk.RemovalPolicy.SNAPSHOT,
});

// Attach to an existing EC2 instance
new ec2.CfnVolumeAttachment(this, 'AttachVolume', {
  volumeId: dataVolume.volumeId,
  instanceId: myInstance.instanceId,
  device: '/dev/xvdf',
});`,
  },
  {
    id: 'efs',
    name: 'EFS',
    fullName: 'Elastic File System',
    cat: 'storage',
    level: 'intermediate',
    icon: '\u{1F4C2}',
    short: 'A shared file system that multiple servers can read/write to at the same time. Like a shared Google Drive folder, but for servers.',
    analogy: 'A shared Google Drive folder \u2014 multiple people (servers) can access the same files simultaneously.',
    detail: 'EFS provides NFS (Network File System) storage that multiple EC2 instances can mount simultaneously. It automatically grows and shrinks as you add/remove files. Great when multiple servers need access to the same set of files.',
    useCases: [
      'Shared media storage across multiple web servers',
      'Content management systems with multiple app servers',
      'Data science workloads sharing datasets',
    ],
    keyTerms: {
      'Mount target': 'An endpoint in a VPC where instances connect to EFS',
      'Throughput mode': 'Controls how fast data can be read/written',
    },
    pricing: 'Standard: ~$0.30/GB/month. Infrequent Access: ~$0.016/GB/month.',
    code: `// Read a shared config file from EFS-mounted path (Node.js)
import { readFile, writeFile } from 'fs/promises';

// EFS is mounted at /mnt/efs on all instances
const CONFIG_PATH = '/mnt/efs/shared/app-config.json';

// Any instance can read the same file
const config = JSON.parse(await readFile(CONFIG_PATH, 'utf-8'));
console.log('Loaded shared config:', config.version);

// Writes from one instance are visible to all others
config.lastUpdatedBy = process.env.HOSTNAME;
await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));`,
    howItWorks: `EFS is a fully managed NFS (Network File System v4.1) service. When you create an EFS file system, AWS provisions a set of mount targets \u2014 one per Availability Zone in your VPC. Each mount target gets an IP address and a DNS name. Your EC2 instances (or ECS containers, or Lambda functions) mount the file system using standard NFS commands, and from that point on it looks like a regular directory on disk. You read and write files with normal filesystem APIs; no AWS SDK needed.

Under the hood, EFS stores data redundantly across multiple AZs in a region, similar to S3's durability model. The file system grows and shrinks automatically as you add or remove files \u2014 there is no pre-provisioned capacity to manage. This elasticity is the "E" in EFS. Throughput scales with the size of the file system in "bursting" mode: a larger file system gets more baseline throughput. Alternatively, you can set "provisioned" throughput for workloads that need consistent performance regardless of stored data size.

For frontend engineers, EFS matters most in containerized environments. If you have multiple ECS tasks or EKS pods that need to share uploaded files, session data, or ML model weights, EFS is the simplest solution. Lambda can also mount EFS, which is useful for loading large machine learning models or reference datasets that do not fit in Lambda's 512MB /tmp space. The key mental model: EFS is a shared POSIX filesystem that any compute service in your VPC can mount.`,
    gotchas: [
      'EFS latency is higher than EBS (single-digit milliseconds vs sub-millisecond). Do not use it for latency-sensitive database storage like PostgreSQL data files. Use EBS for databases.',
      'NFS mounts can silently hang if the security group rules are wrong. EFS mount targets need inbound TCP port 2049 (NFS) from your instance security groups. Debug with `mount -v` if mounts stall.',
      'EFS costs ~$0.30/GB/month for Standard storage, which is ~4x more than S3 and ~4x more than EBS gp3. Enable Lifecycle Management to automatically move files to the Infrequent Access tier (at $0.016/GB) after a configurable period.',
      'File locking works but is advisory (NFSv4 locks). If your application relies on POSIX mandatory locks, test carefully. Most Node.js and Python applications use advisory locks and work fine.',
    ],
    whenNotToUse: [
      'Do not use EFS as a replacement for a database or a message queue. It is a filesystem, not a data store with query capabilities. Use RDS, DynamoDB, or SQS instead.',
      'Avoid EFS for serving static assets directly to end users. It has no built-in HTTP endpoint. Use S3 + CloudFront for that pattern.',
      'Skip EFS if only a single instance needs disk storage. EBS is cheaper, faster, and simpler for single-instance workloads.',
    ],
    relatedServices: ['ec2', 'ecs', 'lambda', 'ebs'],
    relatedGuides: [],
    cliExample: `# Create a new EFS file system
aws efs create-file-system --performance-mode generalPurpose --throughput-mode bursting --encrypted --tags Key=Name,Value=shared-uploads

# Create a mount target in a subnet
aws efs create-mount-target --file-system-id fs-0abc123 --subnet-id subnet-0def456 --security-groups sg-0ghi789

# Mount from an EC2 instance (run on the instance)
# sudo mount -t efs -o tls fs-0abc123:/ /mnt/efs

# List file systems
aws efs describe-file-systems --query 'FileSystems[*].[FileSystemId,SizeInBytes.Value,LifeCycleState]' --output table`,
    cdkExample: `import * as efs from 'aws-cdk-lib/aws-efs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// Create an encrypted EFS file system
const sharedFs = new efs.FileSystem(this, 'SharedStorage', {
  vpc,
  encrypted: true,
  lifecyclePolicy: efs.LifecyclePolicy.AFTER_30_DAYS, // move to IA tier
  performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,
  throughputMode: efs.ThroughputMode.BURSTING,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});

// Grant an EC2 instance access
sharedFs.connections.allowDefaultPortFrom(myInstance);

// Create an access point for a specific app
const accessPoint = sharedFs.addAccessPoint('AppAccess', {
  path: '/app-data',
  createAcl: { ownerGid: '1001', ownerUid: '1001', permissions: '755' },
  posixUser: { gid: '1001', uid: '1001' },
});`,
  },
  {
    id: 's3-glacier',
    name: 'S3 Glacier',
    fullName: 'S3 Glacier / Glacier Deep Archive',
    cat: 'storage',
    level: 'intermediate',
    icon: '\u{1F9CA}',
    short: 'Super cheap cold storage for data you rarely access. Think archived tax documents or old backups.',
    analogy: 'A storage unit across town \u2014 dirt cheap rent, but it takes a while to go get your stuff.',
    detail: 'Glacier is S3\'s archival tier. It\'s designed for data you need to keep for compliance or backup but rarely access. Retrieval can take minutes to hours (or 12+ hours for Deep Archive). In exchange, storage costs drop to fractions of a cent per GB.',
    useCases: [
      'Long-term backups',
      'Regulatory compliance archives',
      'Old log files and audit trails',
    ],
    keyTerms: {
      Retrieval: 'The process of getting your data back (not instant!)',
      Vault: 'A container for archived data',
    },
    pricing: 'Glacier: ~$0.004/GB/month. Deep Archive: ~$0.00099/GB/month. Retrieval fees apply.',
    code: `// Restore a Glacier object so it becomes temporarily downloadable
import { S3Client, RestoreObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'us-east-1' });

// Initiate a restore (object becomes available for 7 days)
await client.send(new RestoreObjectCommand({
  Bucket: 'my-archive-bucket',
  Key: 'backups/2023/db-snapshot.tar.gz',
  RestoreRequest: {
    Days: 7,                    // how long the restored copy stays accessible
    GlacierJobParameters: {
      Tier: 'Standard',         // 'Expedited' (1-5 min), 'Standard' (3-5 hr), 'Bulk' (5-12 hr)
    },
  },
}));
// Poll HeadObject until restore status shows 'ongoing-request="false"'`,
    howItWorks: `S3 Glacier is not a separate service \u2014 it is a set of S3 storage classes. When you upload an object to S3 with the storage class set to GLACIER or DEEP_ARCHIVE, or when an S3 Lifecycle rule transitions an object to one of these classes, the object's data is moved to Glacier's archival infrastructure. The object still appears in your S3 bucket (you can list it, read its metadata, and see its key), but the actual bytes are offline. You cannot download the object until you initiate a "restore," which copies the data back to S3 Standard temporarily.

There are three Glacier tiers with different cost and retrieval trade-offs. Glacier Instant Retrieval gives you millisecond access (like Standard) but at a lower storage cost \u2014 great for data accessed roughly once per quarter. Glacier Flexible Retrieval (formerly just "Glacier") offers Expedited (1\u20135 minutes), Standard (3\u20135 hours), or Bulk (5\u201312 hours) retrieval options. Glacier Deep Archive is the cheapest option at under $1/TB/month, but retrieval takes 12\u201348 hours. Each tier has different per-GB retrieval fees, so choosing the right one depends on how urgently you will need the data.

The most common pattern for frontend engineers is indirect: your backend sets up S3 Lifecycle policies that automatically move old data to Glacier. For instance, user-uploaded photos might stay in S3 Standard for 90 days, transition to S3 Infrequent Access for a year, then move to Glacier Flexible Retrieval for long-term retention. The user never interacts with Glacier directly \u2014 if they request an old file, your backend initiates a restore and notifies them when it is ready.`,
    gotchas: [
      'You cannot download a Glacier object directly. You must initiate a restore first, wait for it to complete (minutes to hours), and then download within the restore window. Forgetting this in your code causes confusing "InvalidObjectState" errors.',
      'There is a minimum storage duration charge: 90 days for Glacier Flexible Retrieval, 180 days for Deep Archive. Deleting objects before this period still incurs the full charge. Do not use Glacier for data you might delete soon.',
      'Expedited retrievals can fail during high-demand periods unless you purchase Provisioned Capacity ($100/month per unit). For critical restore workflows, budget for provisioned capacity or fall back to Standard tier.',
      'S3 Lifecycle rules are the recommended way to move objects to Glacier. Directly uploading with the GLACIER storage class works but skips the Intelligent-Tiering analysis. Use Lifecycle rules for automated, policy-driven archiving.',
    ],
    whenNotToUse: [
      'Do not use Glacier if you need instant access to your data. Even Glacier Instant Retrieval has higher per-request costs than S3 Standard. For frequently accessed data, stick with S3 Standard or Intelligent-Tiering.',
      'Avoid Glacier for small files (under 128 KB). There is a minimum object size overhead of 40 KB for metadata, so tiny files waste storage and cost more per-byte than S3 Standard.',
      'Do not use Deep Archive for disaster recovery if your RTO (Recovery Time Objective) is under 12 hours. The 12-48 hour retrieval window for Deep Archive will not meet tight recovery SLAs.',
    ],
    relatedServices: ['s3', 'lambda', 'cloudwatch'],
    relatedGuides: ['s3-storage'],
    cliExample: `# Upload directly to Glacier Flexible Retrieval
aws s3 cp ./backup.tar.gz s3://my-archive-bucket/backups/backup.tar.gz --storage-class GLACIER

# Initiate a restore (Standard tier, available for 10 days)
aws s3api restore-object --bucket my-archive-bucket --key backups/backup.tar.gz \\
  --restore-request '{"Days":10,"GlacierJobParameters":{"Tier":"Standard"}}'

# Check restore status
aws s3api head-object --bucket my-archive-bucket --key backups/backup.tar.gz \\
  --query 'Restore' --output text

# Set up a lifecycle rule to archive objects after 90 days
aws s3api put-bucket-lifecycle-configuration --bucket my-app-bucket \\
  --lifecycle-configuration file://lifecycle-rule.json`,
    cdkExample: `import * as s3 from 'aws-cdk-lib/aws-s3';

// Create a bucket with lifecycle rules for automatic archival
const archiveBucket = new s3.Bucket(this, 'ArchiveBucket', {
  bucketName: 'my-app-archive',
  encrypted: true,
  lifecycleRules: [
    {
      id: 'ArchiveOldObjects',
      transitions: [
        {
          storageClass: s3.StorageClass.INFREQUENT_ACCESS,
          transitionAfter: cdk.Duration.days(90),
        },
        {
          storageClass: s3.StorageClass.GLACIER,
          transitionAfter: cdk.Duration.days(365),
        },
        {
          storageClass: s3.StorageClass.DEEP_ARCHIVE,
          transitionAfter: cdk.Duration.days(730),
        },
      ],
    },
  ],
});`,
  },
  {
    id: 'transfer-family',
    name: 'Transfer Family',
    fullName: 'AWS Transfer Family',
    cat: 'storage',
    level: 'advanced',
    icon: '\u{1F4E4}',
    short: 'Managed SFTP/FTPS/FTP servers that store files directly in S3 or EFS. For partners who still use file transfer protocols.',
    analogy: 'A modern mailroom that accepts old-school deliveries (FTP) and files them in your cloud storage.',
    detail: 'Transfer Family provides managed file transfer endpoints. External partners upload files via SFTP/FTPS/FTP, and the files land directly in your S3 bucket or EFS filesystem. You don\'t manage any servers. It supports custom identity providers and integrates with existing workflows.',
    useCases: [
      'Receiving files from business partners via SFTP',
      'Migrating legacy FTP-based workflows to cloud',
      'B2B data exchange',
    ],
    keyTerms: {
      Server: 'A managed endpoint for file transfers',
      User: 'An SFTP/FTP user mapped to S3 or EFS',
    },
    pricing: '$0.30/hr per endpoint + $0.04/GB transferred.',
    code: `// List Transfer Family servers and their users (Node.js)
import { TransferClient, ListServersCommand, ListUsersCommand } from '@aws-sdk/client-transfer';

const client = new TransferClient({ region: 'us-east-1' });

// List all Transfer Family servers
const { Servers } = await client.send(new ListServersCommand({}));

for (const server of Servers ?? []) {
  console.log(\`Server: \${server.ServerId} (\${server.State}) - \${server.Protocols?.join(', ')}\`);

  // List users for each server
  const { Users } = await client.send(new ListUsersCommand({ ServerId: server.ServerId! }));
  Users?.forEach(u => console.log(\`  User: \${u.UserName} -> \${u.HomeDirectory}\`));
}`,
    howItWorks: `Transfer Family provides fully managed file transfer server endpoints that support SFTP (SSH File Transfer Protocol), FTPS (FTP over TLS), FTP, and AS2 (Applicability Statement 2). When you create a Transfer Family server, AWS provisions and manages the underlying infrastructure \u2014 the SSH/TLS termination, the protocol handling, and the scaling. Your external partners connect to a DNS endpoint (or a custom domain you configure) using their existing SFTP clients, and every file they upload lands directly in an S3 bucket or EFS filesystem you designate.

Authentication is flexible. You can use the built-in service-managed identity store (SSH keys per user), integrate with AWS Directory Service for Active Directory credentials, or point to a completely custom identity provider via API Gateway + Lambda. The custom provider pattern is powerful: your Lambda receives the username and password, validates them against your own database, and returns the IAM role, S3 bucket, and home directory for that user. This lets you onboard new partners programmatically without AWS Console access.

For frontend engineers, Transfer Family typically enters the picture as part of a data ingestion pipeline. A business partner uploads a CSV or XML file via SFTP; an S3 event notification triggers a Lambda function that parses the file; the Lambda writes the processed data to DynamoDB or RDS; and your frontend application displays the results. The key benefit is that your partners do not need to change their workflow (they keep using SFTP tools they have used for years), while your backend is fully serverless and cloud-native.`,
    gotchas: [
      'Transfer Family charges $0.30/hour per server endpoint \u2014 that is roughly $216/month even with zero transfers. If you only need occasional file transfers, consider shutting down the server when not in use or using a scheduled approach.',
      'Custom domain setup requires both a Route 53 hosted zone (or external DNS) and an Elastic IP. The server\u2019s default endpoint has an AWS-generated hostname that partners may not accept for allowlisting. Plan for custom domain configuration from the start.',
      'SFTP users mapped to S3 see a "virtual" filesystem, but S3 does not support all POSIX operations. Commands like chmod, chown, and symlinks will fail or be silently ignored. Warn your partners if they use scripts that depend on these features.',
      'Transfer Family does not support SCP (Secure Copy Protocol) \u2014 only SFTP. Some partners confuse the two. Make sure your partners are using an SFTP client (like FileZilla, WinSCP, or the `sftp` command), not `scp`.',
    ],
    whenNotToUse: [
      'Do not use Transfer Family for application-to-application file transfers within your own infrastructure. Use S3 pre-signed URLs, direct S3 SDK calls, or API Gateway. Transfer Family is designed for external partners using FTP/SFTP clients.',
      'Avoid Transfer Family if your file transfer volume is extremely low (a few files per month). The $216/month base cost for a running endpoint may not justify the convenience. Use a lightweight EC2 instance running an SFTP server, or have partners upload via a signed URL.',
      'Skip Transfer Family for real-time streaming data. It is designed for discrete file transfers, not continuous data streams. Use Kinesis Data Streams or MSK for streaming workloads.',
    ],
    relatedServices: ['s3', 'efs', 'lambda', 'iam', 'route53'],
    relatedGuides: [],
    cliExample: `# Create an SFTP server backed by S3
aws transfer create-server --protocols SFTP --identity-provider-type SERVICE_MANAGED --endpoint-type PUBLIC

# Create a user mapped to an S3 bucket
aws transfer create-user --server-id s-0abc123def456 --user-name partner-acme \\
  --role arn:aws:iam::123456789012:role/TransferS3Access \\
  --home-directory /my-ingest-bucket/acme \\
  --ssh-public-key-body "ssh-rsa AAAA..."

# Test the connection
# sftp -i partner-key.pem partner-acme@s-0abc123def456.server.transfer.us-east-1.amazonaws.com

# List users on a server
aws transfer list-users --server-id s-0abc123def456`,
    cdkExample: `import * as transfer from 'aws-cdk-lib/aws-transfer';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';

// Create the ingest bucket
const ingestBucket = new s3.Bucket(this, 'IngestBucket', {
  bucketName: 'partner-file-ingest',
  encrypted: true,
});

// IAM role for SFTP users to access S3
const transferRole = new iam.Role(this, 'TransferRole', {
  assumedBy: new iam.ServicePrincipal('transfer.amazonaws.com'),
});
ingestBucket.grantReadWrite(transferRole);

// Create a managed SFTP server
const sftpServer = new transfer.CfnServer(this, 'SftpServer', {
  protocols: ['SFTP'],
  identityProviderType: 'SERVICE_MANAGED',
  endpointType: 'PUBLIC',
});

// Create a user for a partner
new transfer.CfnUser(this, 'AcmeUser', {
  serverId: sftpServer.attrServerId,
  userName: 'partner-acme',
  role: transferRole.roleArn,
  homeDirectory: \`/\${ingestBucket.bucketName}/acme\`,
});`,
  },
]
