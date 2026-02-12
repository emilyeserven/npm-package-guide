export function TocLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <a
      className="block text-sm text-blue-500 dark:text-blue-400 no-underline py-0.5 cursor-pointer transition-colors duration-150 hover:text-slate-900 dark:hover:text-slate-100"
      data-toc={id}
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
