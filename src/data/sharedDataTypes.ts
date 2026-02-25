/**
 * Shared data types for common patterns across guide data files.
 *
 * These types eliminate duplication for structures that appear in multiple guides:
 * - YamlLine: YAML annotation lines (used by ci-cd, kubernetes)
 * - ConceptItem: term/definition pairs (used by kubernetes, ci-cd)
 * - ColorPair: light/dark color values for themed components
 *
 * Guide-specific types should still live in their own data files.
 * Only promote a type here when it's used by 2+ guides with identical shape.
 */

// ── YAML annotation ─────────────────────────────────────────────────

/** A single annotated YAML line for YamlExplorerBase */
export interface YamlLine {
  line: string
  note: string | null
}

// ── Concept / term-definition pairs ─────────────────────────────────

/** A simple term + definition pair (used by concept lists, accordion items, etc.) */
export interface ConceptItem {
  term: string
  def: string
}

// ── Color theming ───────────────────────────────────────────────────

/** A light/dark color pair for use with ds() helper */
export interface ColorPair {
  color: string
  darkColor: string
}
