import type { S3QuizQuestion } from './types'

export const S3_QUIZ_QUESTIONS: S3QuizQuestion[] = [
  {
    q: 'You\u2019re hosting a React app\u2019s static assets (JS, CSS, images). Which storage class?',
    options: [
      'S3 Standard',
      'S3 Glacier Instant Retrieval',
      'S3 One Zone-IA',
      'S3 Deep Archive',
    ],
    answer: 0,
    explanation:
      'Static assets need fast, frequent access \u2014 that\u2019s Standard all the way. Pair it with CloudFront for CDN caching.',
  },
  {
    q: 'What does "11 nines of durability" mean?',
    options: [
      '99.9% uptime',
      'Data is backed up 11 times',
      '99.999999999% chance your data survives',
      'You can access data in 11 milliseconds',
    ],
    answer: 2,
    explanation:
      '99.999999999% \u2014 it means there\u2019s a vanishingly small chance of data loss. That\u2019s losing 1 object out of 10 million over 10 million years.',
  },
  {
    q: 'You have unpredictable access patterns and don\u2019t want to think about optimization. Best class?',
    options: [
      'S3 Standard',
      'S3 Intelligent-Tiering',
      'S3 Standard-IA',
      'S3 Glacier Flexible Retrieval',
    ],
    answer: 1,
    explanation:
      'Intelligent-Tiering auto-moves objects between access tiers based on real usage. Zero retrieval fees and no manual management.',
  },
  {
    q: 'What\u2019s the risk of One Zone-IA compared to Standard-IA?',
    options: [
      'Slower retrieval speed',
      'Higher storage cost',
      'Data loss if the single AZ has an outage',
      'No lifecycle rule support',
    ],
    answer: 2,
    explanation:
      'Standard-IA replicates across 3 availability zones. One Zone-IA uses just 1, so a zone failure could mean data loss. Only use it for re-creatable data.',
  },
  {
    q: 'You delete a file from Glacier Deep Archive after 10 days. What happens?',
    options: [
      'Free \u2014 no charge since it was brief',
      'You\u2019re charged for the full 180-day minimum',
      'You\u2019re charged a deletion fee only',
      'It can\u2019t be deleted \u2014 minimum lock period',
    ],
    answer: 1,
    explanation:
      'Deep Archive has a 180-day minimum storage duration charge. Even if you delete on day 1, you pay for the full 180 days.',
  },
  {
    q: 'Your frontend needs to upload a file to S3. How should it get access?',
    options: [
      'Embed AWS credentials in the frontend code',
      'Use a public S3 bucket with no auth',
      'Request a presigned URL from the backend',
      'POST directly to the S3 REST API',
    ],
    answer: 2,
    explanation:
      'Presigned URLs are the secure pattern \u2014 your backend generates a temporary, scoped URL that lets the frontend upload without exposing any AWS credentials.',
  },
]
