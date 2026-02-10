import { useState, useCallback } from 'react'
import { checklistItems } from '../data/checklistItems'
import { cmd } from '../helpers/cmd'
import { HtmlContent } from './HtmlContent'
import { PrevNextNav } from './PrevNextNav'

export function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  const handleCheck = (idx: number, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [idx]: checked }))
  }

  const handleCopy = useCallback(() => {
    const md = "# Publish Checklist\n\n" + checklistItems.map((item, i) => {
      const check = checkedItems[i] ? "x" : " "
      const text = item.text.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      return `- [${check}] ${text} _(${item.cat})_`
    }).join("\n")

    navigator.clipboard.writeText(md).then(() => {
      const btn = document.getElementById('copy-checklist')
      if (btn) {
        btn.textContent = '✓ Copied!'
        btn.classList.add('copied')
        setTimeout(() => {
          btn.innerHTML = '📋 Copy as Markdown'
          btn.classList.remove('copied')
        }, 2000)
      }
    })
  }, [checkedItems])

  const checked = Object.values(checkedItems).filter(Boolean).length
  const total = checklistItems.length
  const pct = total > 0 ? (checked / total * 100) : 0

  const subHtml = `Go through this before every ${cmd("npm publish", "pnpm publish")} — trust us, it saves headaches.`

  return (
    <>
      <h2 className="checklist-title">✅ Publish Checklist</h2>
      <HtmlContent html={subHtml} className="checklist-sub" as="p" />
      <button className="checklist-copy-btn" id="copy-checklist" onClick={handleCopy}>📋 Copy as Markdown</button>

      {checklistItems.map((item, i) => {
        const isChecked = checkedItems[i] || false
        return (
          <label key={i} className={`check-item ${isChecked ? 'checked' : ''}`}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheck(i, e.target.checked)}
            />
            <span className="label" dangerouslySetInnerHTML={{ __html: item.text }} />
            <span className={`check-badge ${item.badge}`}>{item.cat}</span>
          </label>
        )
      })}

      <div className="progress-row">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-label">{checked} / {total}</span>
      </div>

      <PrevNextNav currentId="checklist" />
    </>
  )
}
