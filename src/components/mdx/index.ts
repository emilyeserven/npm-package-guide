import type { MDXComponents } from 'mdx/types'
import type { ComponentType } from 'react'

// Auto-discover all .tsx component files in this directory tree
const modules = import.meta.glob<Record<string, unknown>>(
  ['./**/*.tsx', '!./**/*.stories.tsx', '!./index.ts'],
  { eager: true },
)

const collected: Record<string, ComponentType> = {}

for (const mod of Object.values(modules)) {
  for (const [name, value] of Object.entries(mod as Record<string, unknown>)) {
    // Collect PascalCase function exports (React components)
    if (typeof value === 'function' && /^[A-Z]/.test(name)) {
      collected[name] = value as ComponentType
    }
  }
}

// Override built-in HTML elements with custom components
if (collected['MdxPre']) {
  collected['pre'] = collected['MdxPre']
}

export const mdxComponents: MDXComponents = collected
