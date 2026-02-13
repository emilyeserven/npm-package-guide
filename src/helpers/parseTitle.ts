/** Split a page title into its text and trailing emoji icon */
export function parseTitle(title: string): { text: string; icon: string } {
  const match = title.match(/^(.+)\s+([\u0080-\u{10FFFF}]+)$/u)
  return { text: match ? match[1] : title, icon: match ? match[2] : '' }
}
