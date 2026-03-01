import TurndownService from 'turndown'

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
})

// Remove interactive chrome that isn't part of the page content
turndown.remove(['button', 'nav', 'style', 'script'])

/**
 * Grab the visible page content from `<main id="main-content">`,
 * convert it to markdown, and copy to the clipboard.
 * Returns `true` on success, `false` otherwise.
 */
export async function copyPageAsMarkdown(): Promise<boolean> {
  const main = document.getElementById('main-content')
  if (!main) return false

  // Work on a clone so we don't mutate the live DOM
  const clone = main.cloneNode(true) as HTMLElement

  // Strip prev/next navigation — identified by child buttons with nav test IDs
  for (const testId of ['nav-previous', 'nav-next']) {
    const btn = clone.querySelector(`[data-testid="${testId}"]`)
    btn?.parentElement?.remove()
  }

  const markdown = turndown.turndown(clone.innerHTML)
  if (!markdown.trim()) return false

  await navigator.clipboard.writeText(markdown)
  return true
}
