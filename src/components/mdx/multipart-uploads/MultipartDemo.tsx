import { useState, useMemo, useRef } from 'react'
import { useIsDark } from '../../../hooks/useTheme'
import { ds } from '../../../helpers/darkStyle'
import { tc, theme } from '../../../helpers/themeColors'

interface FormField {
  key: string
  value: string
}

export function MultipartDemo() {
  const isDark = useIsDark()
  const [file, setFile] = useState<File | null>(null)
  const [fields, setFields] = useState<FormField[]>([
    { key: 'description', value: 'Profile photo' },
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addField = () => setFields([...fields, { key: '', value: '' }])
  const removeField = (i: number) => setFields(fields.filter((_, idx) => idx !== i))
  const updateField = (i: number, prop: keyof FormField, val: string) => {
    const next = [...fields]
    next[i] = { ...next[i], [prop]: val }
    setFields(next)
  }

  const rawOutput = useMemo(() => {
    const boundary = '----WebKitFormBoundaryaB3xK9'
    const parts: string[] = []

    for (const f of fields) {
      if (f.key) {
        parts.push(
          `--${boundary}\r\nContent-Disposition: form-data; name="${f.key}"\r\n\r\n${f.value}`
        )
      }
    }

    if (file) {
      parts.push(
        `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${file.name}"\r\nContent-Type: ${file.type || 'application/octet-stream'}\r\n\r\n<binary data \u2014 ${file.size.toLocaleString()} bytes>`
      )
    }

    if (parts.length) {
      parts.push(`--${boundary}--`)
    }

    const header = `POST /api/upload HTTP/1.1\r\nHost: example.com\r\nContent-Type: multipart/form-data; boundary=${boundary}`
    return parts.length
      ? `${header}\r\n\r\n${parts.join('\r\n')}`
      : 'Add fields or a file to see the raw HTTP request.'
  }, [file, fields])

  const inputBg = ds('#fff', '#0f172a', isDark)
  const inputBorder = tc(theme.borderDefault, isDark)

  return (
    <div className="my-6">
      <p
        className="text-sm leading-relaxed mt-0 mb-4"
        style={{ color: tc(theme.textSecondary, isDark) }}
      >
        Add form fields and a file below to see exactly what the browser sends over the wire.
      </p>

      {/* Text fields */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-mono uppercase tracking-wide"
            style={{ color: tc(theme.textMuted, isDark) }}
          >
            Text Fields
          </span>
          <button
            onClick={addField}
            className="px-3 py-1 rounded-md border text-xs font-mono transition-colors hover:opacity-80"
            style={{
              borderColor: inputBorder,
              background: ds('#f8fafc', '#1e293b', isDark),
              color: ds('#2563eb', '#3b82f6', isDark),
            }}
          >
            + Add Field
          </button>
        </div>
        {fields.map((f, i) => (
          <div key={i} className="flex gap-2 mb-1.5 items-center">
            <input
              className="flex-1 px-3 py-2 rounded-md border font-mono text-[13px] outline-none focus:ring-1 focus:ring-blue-500"
              style={{ background: inputBg, borderColor: inputBorder, color: tc(theme.textPrimary, isDark) }}
              placeholder="key"
              value={f.key}
              onChange={e => updateField(i, 'key', e.target.value)}
            />
            <input
              className="flex-[2] px-3 py-2 rounded-md border font-mono text-[13px] outline-none focus:ring-1 focus:ring-blue-500"
              style={{ background: inputBg, borderColor: inputBorder, color: tc(theme.textPrimary, isDark) }}
              placeholder="value"
              value={f.value}
              onChange={e => updateField(i, 'value', e.target.value)}
            />
            <button
              onClick={() => removeField(i)}
              className="px-2.5 py-1.5 rounded-md border font-mono text-xs shrink-0 transition-colors hover:opacity-80"
              style={{
                borderColor: inputBorder,
                background: ds('#f8fafc', '#1e293b', isDark),
                color: ds('#dc2626', '#ef4444', isDark),
              }}
            >
              {'\u2715'}
            </button>
          </div>
        ))}
      </div>

      {/* File attachment */}
      <div className="mb-4">
        <span
          className="block text-xs font-mono uppercase tracking-wide mb-2"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          File Attachment
        </span>
        <input
          ref={fileInputRef}
          type="file"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-2.5 px-5 rounded-md border-dashed border font-mono text-[13px] text-center transition-colors hover:opacity-80"
          style={{
            borderColor: file ? ds('#059669', '#10b981', isDark) : inputBorder,
            background: file ? ds('#ecfdf5', 'rgba(16, 185, 129, 0.1)', isDark) : ds('#f8fafc', '#1e293b', isDark),
            color: file ? ds('#059669', '#10b981', isDark) : tc(theme.textMuted, isDark),
          }}
        >
          {file ? `\u2713 ${file.name} (${(file.size / 1024).toFixed(1)} KB)` : 'Choose a file\u2026'}
        </button>
      </div>

      {/* Raw output */}
      <div>
        <span
          className="block text-xs font-mono uppercase tracking-wide mb-2"
          style={{ color: tc(theme.textMuted, isDark) }}
        >
          Raw HTTP Request
        </span>
        <pre
          className="rounded-lg border p-4 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre max-h-[300px] overflow-y-auto m-0"
          style={{
            background: ds('#f8fafc', '#0d1117', isDark),
            borderColor: inputBorder,
            color: tc(theme.textSecondary, isDark),
          }}
        >
          {rawOutput}
        </pre>
      </div>
    </div>
  )
}
