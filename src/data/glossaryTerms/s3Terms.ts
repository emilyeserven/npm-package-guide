import type { GlossaryCategory } from './types'

export const s3Glossary: GlossaryCategory[] = [
  {
    category: 'Amazon S3',
    terms: [
      {
        term: 'S3 Bucket',
        definition:
          'A container in Amazon S3 that holds objects (files). Each bucket has a globally unique name and is created in a specific AWS region.',
        linkId: 'aws-s3-concepts',
        sectionId: 's3-basics',
        guides: ['s3-storage'],
      },
      {
        term: 'S3 Object',
        definition:
          'A file stored in an S3 bucket, identified by a key (path). Objects can be up to 5 TB and include metadata like content type and storage class.',
        linkId: 'aws-s3-concepts',
        sectionId: 's3-basics',
        guides: ['s3-storage'],
      },
      {
        term: 'Storage Class',
        definition:
          'An S3 configuration that determines cost, availability, and retrieval speed for stored objects. S3 offers 7 classes from Standard (frequent access) to Deep Archive (rare access).',
        linkId: 'aws-s3-storage-classes',
        sectionId: 's3-classes',
        guides: ['s3-storage'],
      },
      {
        term: 'S3 Standard',
        definition:
          'The default storage class for frequently accessed data. Highest cost per GB but no retrieval fees and millisecond access.',
        linkId: 'aws-s3-storage-classes',
        sectionId: 's3-comparison',
        guides: ['s3-storage'],
      },
      {
        term: 'S3 Glacier',
        definition:
          'A family of S3 storage classes (Instant Retrieval, Flexible Retrieval, Deep Archive) designed for archival data. Lower storage costs but with retrieval fees and slower access times.',
        linkId: 'aws-s3-storage-classes',
        sectionId: 's3-comparison',
        guides: ['s3-storage'],
      },
      {
        term: 'S3 Intelligent-Tiering',
        definition:
          'A storage class that automatically moves objects between access tiers based on usage patterns. No retrieval fees but charges a small monitoring fee per object.',
        linkId: 'aws-s3-storage-classes',
        sectionId: 's3-classes',
        guides: ['s3-storage'],
      },
      {
        term: 'Lifecycle Rule',
        definition:
          'An automated S3 policy that transitions objects between storage classes or deletes them based on age. For example, moving logs to Glacier after 30 days.',
        linkId: 'aws-s3-lifecycle',
        sectionId: 's3-lifecycle',
        guides: ['s3-storage'],
      },
      {
        term: 'Presigned URL',
        definition:
          'A time-limited URL that grants temporary access to a private S3 object without requiring AWS credentials. The standard pattern for frontend file uploads and downloads.',
        linkId: 'aws-presigned-urls',
        sectionId: 's3-frontend',
        guides: ['s3-storage'],
      },
      {
        term: 'S3 Static Site Hosting',
        definition:
          'An S3 feature that serves bucket contents as a static website. Often paired with CloudFront for HTTPS and global CDN distribution.',
        linkId: 'aws-s3-static-hosting',
        sectionId: 's3-frontend',
        guides: ['s3-storage'],
      },
      {
        term: 'CloudFront',
        definition:
          'AWS CDN service that caches and serves content from 400+ edge locations worldwide. Commonly placed in front of S3 for faster delivery and HTTPS support.',
        linkId: 'aws-cloudfront',
        sectionId: 's3-frontend',
        guides: ['s3-storage'],
      },
    ],
  },
]
