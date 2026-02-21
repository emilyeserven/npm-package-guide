import type { GlossaryCategory } from './index'

export const zustandGlossary: GlossaryCategory[] = [
  {
    category: 'Zustand \u2014 Core Concepts',
    terms: [
      {
        term: 'Zustand Store',
        definition:
          'A lightweight state container created with <code>create()</code>. Returns a React hook for subscribing to state. Unlike Redux or Context, no <code>&lt;Provider&gt;</code> wrapper is needed.',
        linkId: 'zst-docs',
        sectionId: 'zst-basics',
      },
      {
        term: 'Selector (Zustand)',
        definition:
          'A function passed to the store hook that picks specific state values, e.g. <code>useStore((s) =&gt; s.count)</code>. Components only re-render when the selected value changes (checked via <code>Object.is()</code>).',
        linkId: 'zst-docs',
        sectionId: 'zst-incorrect',
      },
      {
        term: 'set() (Zustand)',
        definition:
          'The primary way to update Zustand state. Performs a <strong>shallow merge</strong> by default: <code>set({ count: 1 })</code> updates only <code>count</code> and preserves other fields. Pass <code>true</code> as a second arg to replace the entire state.',
        linkId: 'zst-docs',
        sectionId: 'zst-basics',
      },
      {
        term: 'get() (Zustand)',
        definition:
          'Reads the current state snapshot inside store actions. Use the callback form of <code>set()</code> instead when deriving the next state from the current state to avoid stale closures.',
        linkId: 'zst-docs',
        sectionId: 'zst-basics',
      },
      {
        term: 'useShallow',
        definition:
          'A Zustand utility from <code>zustand/react/shallow</code> that performs shallow equality comparison on selector results. Prevents unnecessary re-renders when selecting multiple fields as an object.',
        linkId: 'zst-docs',
        sectionId: 'zst-incorrect',
      },
    ],
  },
  {
    category: 'Zustand \u2014 Patterns & Middleware',
    terms: [
      {
        term: 'Slices Pattern (Zustand)',
        definition:
          'An organizational pattern where a large store is split into separate "slice" functions, each managing a domain of state. Slices are combined with spread syntax and share access via <code>get()</code>.',
        linkId: 'zst-docs',
        sectionId: 'zst-slices',
      },
      {
        term: 'persist Middleware',
        definition:
          'Zustand middleware that automatically syncs store state to <code>localStorage</code> or <code>sessionStorage</code>. Supports partial persistence via <code>partialize</code> and schema migrations via <code>version</code>/<code>migrate</code>.',
        linkId: 'zst-docs',
        sectionId: 'zst-middleware',
      },
      {
        term: 'immer Middleware (Zustand)',
        definition:
          'Zustand middleware that lets you write mutable-looking state updates (e.g. <code>state.todos.push(item)</code>) that Immer converts to immutable operations under the hood.',
        linkId: 'zst-immer',
        sectionId: 'zst-middleware',
      },
      {
        term: 'devtools Middleware (Zustand)',
        definition:
          'Zustand middleware that integrates with Redux DevTools for time-travel debugging, action logging, and state inspection. Actions can be named for clear traces.',
        linkId: 'zst-redux-devtools',
        sectionId: 'zst-middleware',
      },
      {
        term: 'Transient Update',
        definition:
          'A pattern where state changes are read via <code>useRef</code> + <code>subscribe()</code> instead of the hook, avoiding React re-renders. Used for animations, timers, and high-frequency updates.',
        linkId: 'zst-docs',
        sectionId: 'zst-advanced',
      },
      {
        term: 'subscribeWithSelector',
        definition:
          'Zustand middleware that enables subscribing to specific slices of state outside React via <code>useStore.subscribe(selector, listener)</code>. Useful for side-effects triggered by state changes.',
        linkId: 'zst-docs',
        sectionId: 'zst-middleware',
      },
    ],
  },
]
