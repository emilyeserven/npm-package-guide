import type { S3Header } from './types'

export const PRESIGNED_URL_CODE = `// Step 1: Ask your backend for a presigned upload URL
const { uploadUrl, fileKey } = await fetch('/api/upload-url', {
  method: 'POST',
  body: JSON.stringify({ fileName: 'photo.jpg', contentType: 'image/jpeg' })
}).then(r => r.json());

// Step 2: Upload directly to S3 using the presigned URL
await fetch(uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': 'image/jpeg' },
  body: file  // the File object from an <input type="file">
});

// Step 3: Tell your backend the upload is done
await fetch('/api/upload-complete', {
  method: 'POST',
  body: JSON.stringify({ fileKey })
});`

export const STATIC_DEPLOY_CODE = `# Build your app
npm run build

# Sync the build output to your S3 bucket
aws s3 sync ./dist s3://my-app-bucket \\
  --delete \\
  --cache-control "max-age=31536000"

# Set the index document (no cache for HTML)
aws s3 cp ./dist/index.html s3://my-app-bucket/index.html \\
  --cache-control "no-cache"`

export const S3_HEADERS: S3Header[] = [
  {
    name: 'x-amz-storage-class',
    description:
      'The storage class used when putting an object. You\u2019ll see this in upload responses. Default is STANDARD.',
    color: '#0d9488',
    darkColor: '#40d4aa',
  },
  {
    name: 'Content-Type',
    description:
      'Always set this correctly on upload! S3 doesn\u2019t auto-detect. Wrong content types = images downloaded as files instead of displayed.',
    color: '#2563eb',
    darkColor: '#5090f0',
  },
  {
    name: 'Cache-Control',
    description:
      'Controls how long browsers and CDNs cache the object. Critical for static sites \u2014 long cache for assets, no cache for index.html.',
    color: '#d97706',
    darkColor: '#f0a840',
  },
]
