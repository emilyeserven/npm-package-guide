import { useIsDark } from '../../../hooks/useTheme'
import { PRESIGNED_URL_CODE, STATIC_DEPLOY_CODE, S3_HEADERS } from '../../../data/s3Data'
import { CardBase } from '../CardBase'

export function S3FrontendPatterns() {
  const isDark = useIsDark()

  return (
    <div>
      {/* Presigned URLs */}
      <h3
        className="text-xl font-bold mb-2 mt-0"
        style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
        id="toc-presigned"
      >
        Presigned URLs &mdash; The Most Common Pattern
      </h3>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: isDark ? '#94a3b8' : '#64748b' }}
      >
        Your frontend <strong>never</strong> talks to S3 directly with credentials. Instead, your backend
        generates a temporary signed URL that gives permission to upload or download a specific file for
        a limited time.
      </p>
      <CodeBlock title={"Upload flow \u2014 frontend"} code={PRESIGNED_URL_CODE} isDark={isDark} lang="js" />

      {/* Static Site Hosting */}
      <h3
        className="text-xl font-bold mb-2 mt-8"
        style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
        id="toc-static-hosting"
      >
        Static Site Hosting
      </h3>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: isDark ? '#94a3b8' : '#64748b' }}
      >
        S3 can serve your entire React/Vite build output as a website. Combined with CloudFront
        (AWS&apos;s CDN), this is one of the most common ways to host SPAs.
      </p>
      <CodeBlock title="Deploy a static site to S3 (CLI)" code={STATIC_DEPLOY_CODE} isDark={isDark} lang="bash" />

      {/* Common Headers */}
      <h3
        className="text-xl font-bold mb-4 mt-8"
        style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
        id="toc-headers"
      >
        Common Headers You&apos;ll See
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {S3_HEADERS.map(h => (
          <CardBase key={h.name} accentColor={isDark ? h.darkColor : h.color}>
            <h4
              className="font-mono text-sm font-medium m-0 mb-2"
              style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
            >
              {h.name}
            </h4>
            <p
              className="text-sm leading-relaxed m-0"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              {h.description}
            </p>
          </CardBase>
        ))}
      </div>

      {/* CloudFront */}
      <h3
        className="text-xl font-bold mb-2 mt-8"
        style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
        id="toc-cloudfront"
      >
        S3 + CloudFront
      </h3>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: isDark ? '#94a3b8' : '#64748b' }}
      >
        In production, you almost never serve S3 directly. Instead, <strong>CloudFront</strong> (a CDN)
        sits in front, caching your files at 400+ edge locations worldwide. Your users get fast loads,
        and you pay less because CloudFront reduces the number of S3 reads.
      </p>
      <div
        className="rounded-xl border-l-4 py-4 px-5"
        style={{
          background: isDark ? '#1e293b' : '#ffffff',
          borderLeftColor: isDark ? '#f0a840' : '#d97706',
        }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-1"
          style={{ color: isDark ? '#f0a840' : '#d97706' }}
        >
          {'\u{1F4A1}'} The pizza analogy
        </div>
        <p
          className="text-sm leading-relaxed m-0"
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
        >
          S3 is the kitchen. CloudFront is the delivery fleet that has pre-made copies of your most
          popular pizzas at local hubs. Customers (browsers) go to the nearest hub instead of driving
          to the kitchen every time.
        </p>
      </div>
    </div>
  )
}

function CodeBlock({ title, code, isDark, lang }: { title: string; code: string; isDark: boolean; lang: string }) {
  return (
    <div
      className="rounded-xl border overflow-hidden my-4"
      style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
    >
      <div
        className="px-4 py-2.5 flex items-center justify-between border-b"
        style={{
          background: isDark ? '#0f172a' : '#f8fafc',
          borderColor: isDark ? '#334155' : '#e2e8f0',
        }}
      >
        <span className="flex items-center gap-2">
          <span
            className="text-xs font-mono"
            style={{ color: isDark ? '#64748b' : '#94a3b8' }}
          >
            {title}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              background: isDark ? '#1e293b' : '#e2e8f0',
              color: isDark ? '#64748b' : '#94a3b8',
            }}
          >
            {lang}
          </span>
        </span>
        <button
          className="text-[11px] px-2.5 py-1 rounded-md border cursor-pointer"
          style={{
            background: 'transparent',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            color: isDark ? '#94a3b8' : '#64748b',
          }}
          onClick={() => navigator.clipboard.writeText(code)}
        >
          Copy
        </button>
      </div>
      <pre
        className="p-4 overflow-x-auto text-xs leading-relaxed font-mono m-0"
        style={{
          background: isDark ? '#0d1117' : '#1e293b',
          color: isDark ? '#e6edf3' : '#e2e8f0',
        }}
      >
        {code}
      </pre>
    </div>
  )
}
