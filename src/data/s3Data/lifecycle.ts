import type { LifecycleStage } from './types'

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  { day: 0, label: 'Standard', className: 'STANDARD', color: '#f0a840' },
  { day: 30, label: 'Standard-IA', className: 'STANDARD_IA', color: '#5090f0' },
  { day: 90, label: 'Glacier Instant', className: 'GLACIER_IR', color: '#40c8e0' },
  { day: 365, label: 'Deep Archive', className: 'DEEP_ARCHIVE', color: '#f06080' },
  { day: 730, label: '\u{1F5D1}\uFE0F Delete', className: '', color: '#8891a5' },
]

export const LIFECYCLE_JSON = `{
  "Rules": [
    {
      "ID": "ArchiveUserUploads",
      "Status": "Enabled",
      "Filter": { "Prefix": "uploads/" },
      "Transitions": [
        { "Days": 30,  "StorageClass": "STANDARD_IA" },
        { "Days": 90,  "StorageClass": "GLACIER_IR" },
        { "Days": 365, "StorageClass": "DEEP_ARCHIVE" }
      ],
      "Expiration": { "Days": 730 }
    }
  ]
}`

export const WATERFALL_ORDER = [
  'Standard',
  'Intelligent-Tiering',
  'Standard-IA',
  'One Zone-IA',
  'Glacier Instant',
  'Glacier Flexible',
  'Deep Archive',
]
