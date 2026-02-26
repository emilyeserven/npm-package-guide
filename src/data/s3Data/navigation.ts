import type { GuideSection, StartPageData, GuideManifest } from '../guideTypes'

export const S3_GUIDE_SECTIONS: GuideSection[] = [
  { label: null, ids: ['s3-start'] },
  { label: 'Fundamentals', ids: ['s3-basics', 's3-classes'] },
  { label: 'Analysis', ids: ['s3-comparison', 's3-lifecycle'] },
  { label: 'Interactive Tools', ids: ['s3-calculator', 's3-picker'] },
  { label: 'Practical', ids: ['s3-frontend', 's3-quiz'] },
]

export const S3_START_PAGE_DATA: StartPageData = {
  subtitle:
    'Amazon S3 storage classes explained for frontend engineers \u2014 from bucket basics to cost optimization and practical deployment patterns.',
  tip: 'Each section builds on the previous. Start with the fundamentals, then explore the interactive tools.',
  steps: [
    {
      type: 'numbered',
      num: 1,
      title: 'Fundamentals',
      description:
        'Learn what S3 is, core concepts (buckets, objects, keys), and the 7 storage classes.',
      sectionLabel: 'Fundamentals',
      subItemDescriptions: {
        's3-basics': 'Core S3 concepts with frontend analogies \u2014 localStorage vs. warehouse.',
        's3-classes': 'The 7 storage classes, from Standard to Deep Archive, with a mental model spectrum.',
      },
    },
    {
      type: 'numbered',
      num: 2,
      title: 'Analysis',
      description:
        'Compare storage classes side by side and understand lifecycle rules for automatic transitions.',
      sectionLabel: 'Analysis',
      subItemDescriptions: {
        's3-comparison': 'Full comparison table with color-coded cost indicators.',
        's3-lifecycle': 'Lifecycle rules that automatically transition objects between classes.',
      },
    },
    {
      type: 'numbered',
      num: 3,
      title: 'Interactive Tools',
      description:
        'Calculate costs and get personalized storage class recommendations.',
      sectionLabel: 'Interactive Tools',
      subItemDescriptions: {
        's3-calculator': 'Estimate monthly costs across all 7 storage classes based on your usage.',
        's3-picker': 'Answer one question about your use case and get a recommended class.',
      },
    },
    {
      type: 'bonus',
      title: 'Practical Usage',
      description:
        'Frontend patterns for working with S3 and a knowledge check.',
      sectionLabel: 'Practical',
      subItemDescriptions: {
        's3-frontend': 'Presigned URLs, static site hosting, S3 headers, and CloudFront CDN.',
        's3-quiz': 'Six questions to test what you\u2019ve learned across the guide.',
      },
    },
  ],
  relatedGuides: ['ci-cd', 'architecture'],
}

export const S3_GUIDE_MANIFEST: GuideManifest = {
  def: {
    id: 's3-storage',
    icon: '🗄️',
    title: 'Amazon S3 Storage Classes',
    startPageId: 's3-start',
    description: 'Understand Amazon S3 storage classes from a frontend engineer\u2019s perspective \u2014 buckets, objects, lifecycle rules, cost optimization, and practical usage patterns.',
    category: 'infrastructure',
    sections: S3_GUIDE_SECTIONS,
  },
  startPageData: S3_START_PAGE_DATA,
}
