export function TocLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <a
      className="toc-link"
      data-toc={id}
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.preventDefault()
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
    >
      {children}
    </a>
  )
}
