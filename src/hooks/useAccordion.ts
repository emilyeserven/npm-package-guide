import { useState, useCallback } from 'react'

/** Single-open accordion: at most one item expanded at a time. */
export function useAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggle = useCallback((index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index))
  }, [])

  const isExpanded = useCallback(
    (index: number) => expandedIndex === index,
    [expandedIndex]
  )

  return { expandedIndex, toggle, isExpanded }
}
