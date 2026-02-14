import { useState, useCallback } from 'react'

interface UseChecklistReturn<K extends string | number> {
  /** Set of checked keys */
  checked: Set<K>
  /** Toggle a single item on/off */
  toggle: (key: K) => void
  /** Check whether a specific item is checked */
  isChecked: (key: K) => boolean
  /** Number of checked items */
  checkedCount: number
  /** Reset all items to unchecked */
  reset: () => void
  /** Progress as a percentage (0-100), rounded */
  percentage: (total: number) => number
}

export function useChecklist<K extends string | number>(): UseChecklistReturn<K> {
  const [checked, setChecked] = useState<Set<K>>(new Set())

  const toggle = useCallback((key: K) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const isChecked = useCallback((key: K) => checked.has(key), [checked])

  const reset = useCallback(() => setChecked(new Set()), [])

  const percentage = useCallback(
    (total: number) => (total > 0 ? Math.round((checked.size / total) * 100) : 0),
    [checked.size]
  )

  return { checked, toggle, isChecked, checkedCount: checked.size, reset, percentage }
}
