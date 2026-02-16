import { useState, useCallback } from 'react'

/**
 * Shared state management for "select item → show detail" explorer components.
 * Extracts the activeId + lookup pattern used by StackExplorer, FrameworkExplorer,
 * and CodingToolExplorer.
 */
export function useExplorer<T extends { id: string }>(
  items: T[],
  defaultId?: string | null,
) {
  const [activeId, setActiveId] = useState<string | null>(
    defaultId !== undefined ? defaultId : items[0]?.id ?? null,
  )

  const active = items.find(item => item.id === activeId) ?? null

  /** Toggle: clicking the active item deselects it; clicking another selects it */
  const toggle = useCallback(
    (id: string) => setActiveId(prev => (prev === id ? null : id)),
    [],
  )

  return { activeId, setActiveId, active, toggle } as const
}
