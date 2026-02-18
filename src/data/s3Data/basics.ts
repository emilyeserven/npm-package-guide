import type { S3Concept } from './types'

export const S3_CONCEPTS: S3Concept[] = [
  {
    id: 'bucket',
    icon: '\u{1FAA3}',
    title: 'Bucket',
    description:
      'A top-level container. Like a root folder. Every bucket name is globally unique across ALL of AWS \u2014 so <code>my-app</code> is likely taken.',
    color: '#d97706',
    darkColor: '#f0a840',
  },
  {
    id: 'object',
    icon: '\u{1F4E6}',
    title: 'Object',
    description:
      'Any file you put in S3 is called an \u201Cobject.\u201D Each has a key (filepath), the data itself, and metadata like content-type.',
    color: '#0d9488',
    darkColor: '#40d4aa',
  },
  {
    id: 'key',
    icon: '\u{1F511}',
    title: 'Key',
    description:
      'The path to your object inside the bucket. For example: <code>images/hero.png</code>. There are no real folders \u2014 just keys with slashes.',
    color: '#2563eb',
    darkColor: '#5090f0',
  },
  {
    id: 'region',
    icon: '\u{1F30D}',
    title: 'Region',
    description:
      'Where your bucket physically lives (e.g., <code>us-east-1</code>). Pick one close to your users for speed. Your data stays in that region.',
    color: '#7c3aed',
    darkColor: '#a070f0',
  },
]

export const BUCKET_ITEMS = [
  { icon: '\u{1F4C4}', label: 'index.html' },
  { icon: '\u{1F5BC}\uFE0F', label: 'logo.png' },
  { icon: '\u{1F4E6}', label: 'data.json' },
  { icon: '\u{1F4C1}', label: 'uploads/' },
]
