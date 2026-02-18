import type { TechData, ComparisonRow, DecisionStep, ArchLayer, AntiPattern } from './types'

// Accent colors for each technology (work on both light & dark backgrounds)
export const SM_COLORS = {
  accent: '#3B82F6',
  context: '#D97706',
  contextDark: '#F59E0B',
  zst: '#7C3AED',
  redux: '#EF4444',
  rq: '#10B981',
  success: '#10B981',
  danger: '#EF4444',
} as const

export const TECH_DATA: Record<string, TechData> = {
  context: {
    id: 'context',
    name: 'React Context',
    color: SM_COLORS.context,
    icon: '\u269B',
    tagline: 'Built-in. Simple. Limited.',
    description:
      "React's native solution for passing data through the component tree without prop drilling. It's not technically a state manager \u2014 it's a dependency injection mechanism.",
    strengths: [
      'Zero dependencies \u2014 ships with React',
      'Perfect for rarely-changing global values (theme, locale, auth)',
      'Simple mental model: Provider wraps, useContext consumes',
      'Great for dependency injection patterns',
      'TypeScript support is first-class and trivial',
    ],
    weaknesses: [
      'Every consumer re-renders when ANY value in the context changes',
      "No built-in selectors \u2014 you can't subscribe to a slice of state",
      "Nesting many providers creates 'Provider Hell'",
      'No devtools, middleware, or time-travel debugging',
      'Not designed for high-frequency updates (forms, animations)',
    ],
    codeExample: `// 1. Create the context
const AuthContext = createContext(null);

// 2. Build a provider with state
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = async (credentials) => {
    const user = await api.login(credentials);
    setUser(user);
  };
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Consume it anywhere below
function UserMenu() {
  const { user, login } = useContext(AuthContext);
  // \u26A0\uFE0F This re-renders whenever ANY value
  // in the context changes, not just 'user'
  return user ? <Avatar /> : <LoginButton />;
}`,
    withReactQuery: `// Context holds auth state
// React Query handles server data
function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

function Dashboard() {
  const { token } = useContext(AuthContext);

  // React Query fetches & caches server data
  // Context just provides the auth token
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(token),
    enabled: !!token,
  });

  return <ProjectList projects={projects} />;
}

// \u2705 Context: auth state (changes rarely)
// \u2705 React Query: server data (projects, users)
// \u274C Don't put server data in Context`,
    bestFor:
      'Auth state, theme, locale, feature flags \u2014 things that change infrequently and affect many components.',
    avoidFor:
      'Frequently-updating state, large stores with many consumers, or anything that needs selectors.',
    complexity: 1,
    bundle: '0 KB',
    boilerplate: 'Low',
    learning: 'Easy',
  },
  zst: {
    id: 'zst',
    name: 'Zustand',
    color: SM_COLORS.zst,
    icon: '\u{1F43B}',
    tagline: 'Tiny. Flexible. Surgical re-renders.',
    description:
      "A small, fast, and scalable state management library. It uses a simplified flux pattern with hooks as the primary API. Think of it as 'what if useState was global and smart.'",
    strengths: [
      'Tiny bundle (~1KB gzipped) with zero boilerplate',
      'Built-in selectors \u2014 components only re-render for the state they use',
      'Works outside React (vanilla JS, middleware, tests)',
      'No providers needed \u2014 just import and use',
      'Middleware support: persist, devtools, immer, etc.',
      'Incredible TypeScript inference out of the box',
    ],
    weaknesses: [
      'Less structured than Redux \u2014 teams need to self-organize',
      'No built-in action logging (though devtools middleware exists)',
      "Can become a 'junk drawer' without conventions",
      'Smaller ecosystem than Redux (fewer middleware, less content)',
      'Selector equality checks need care for derived objects',
    ],
    codeExample: `// Using Zustand \u2014 create a store in one call
const useCartStore = create((set, get) => ({
  items: [],
  totalPrice: 0,

  addItem: (product) => set((state) => {
    const items = [...state.items, product];
    return {
      items,
      totalPrice: items.reduce((sum, i) => sum + i.price, 0),
    };
  }),

  removeItem: (id) => set((state) => {
    const items = state.items.filter(i => i.id !== id);
    return {
      items,
      totalPrice: items.reduce((sum, i) => sum + i.price, 0),
    };
  }),

  clearCart: () => set({ items: [], totalPrice: 0 }),
}));

// Use in components \u2014 with SELECTORS
function CartCount() {
  // \u2705 Only re-renders when items.length changes
  const count = useCartStore((s) => s.items.length);
  return <Badge>{count}</Badge>;
}

function CartTotal() {
  // \u2705 Only re-renders when totalPrice changes
  const total = useCartStore((s) => s.totalPrice);
  return <span>\${total.toFixed(2)}</span>;
}`,
    withReactQuery: `// Zustand + React Query
// Zustand: UI state (cart, modals, filters)
const useAppStore = create((set) => ({
  cartOpen: false,
  filters: { category: 'all', sort: 'price' },
  toggleCart: () =>
    set((s) => ({ cartOpen: !s.cartOpen })),
  setFilters: (filters) =>
    set((s) => ({ filters: { ...s.filters, ...filters } })),
}));

function ProductPage() {
  // Zustand: client state
  const filters = useAppStore((s) => s.filters);

  // React Query: server state, driven by Zustand
  const { data: products } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 30_000,
  });

  // Mutation with optimistic UI
  const addToCart = useMutation({
    mutationFn: (item) => api.addToCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  return <ProductGrid products={products} />;
}

// \u2705 Zustand: UI state (filters, modals, cart open)
// \u2705 React Query: server state (products, cart items)
// \u{1F517} Zustand state drives React Query keys`,
    bestFor:
      'Most apps. Shopping carts, UI state, form wizards, any client-side state that needs surgical re-renders.',
    avoidFor:
      'If you need strict, auditable action patterns (finance, compliance) or if your team already knows Redux well.',
    complexity: 2,
    bundle: '~1 KB',
    boilerplate: 'Minimal',
    learning: 'Easy',
  },
  redux: {
    id: 'redux',
    name: 'Redux Toolkit',
    color: SM_COLORS.redux,
    icon: '\u{1F52E}',
    tagline: 'Structured. Predictable. Battle-tested.',
    description:
      'The industry standard for large-scale state management. Redux Toolkit (RTK) modernizes Redux with opinionated defaults, removing most boilerplate while keeping the strict unidirectional data flow.',
    strengths: [
      'Extremely predictable \u2014 single source of truth, pure reducers',
      'Best-in-class devtools with time-travel debugging',
      'RTK Query handles server state (alternative to React Query)',
      'Massive ecosystem: middleware, selectors (reselect), saga, thunk',
      'Battle-tested at enormous scale (Meta, Airbnb, Shopify)',
      'createSlice eliminates old-school Redux boilerplate',
    ],
    weaknesses: [
      'More boilerplate than Zustand even with RTK',
      'Steeper learning curve: actions, reducers, slices, selectors, thunks',
      'Bundle size is larger (~11KB for RTK + React-Redux)',
      'Easy to over-engineer \u2014 not every app needs Redux',
      'Indirection: following data flow across files can be complex',
    ],
    codeExample: `// Redux Toolkit \u2014 slices combine reducers + actions
// Install: npm i @reduxjs/toolkit react-redux

// Create a slice (reducer + actions in one)
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalPrice: 0 },
  reducers: {
    addItem: (state, action) => {
      // RTK uses Immer \u2014 you CAN mutate here
      state.items.push(action.payload);
      state.totalPrice = state.items
        .reduce((sum, i) => sum + i.price, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items
        .filter(i => i.id !== action.payload);
      state.totalPrice = state.items
        .reduce((sum, i) => sum + i.price, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Export actions and selectors
export const { addItem, removeItem } = cartSlice.actions;
export const selectCartCount =
  (state) => state.cart.items.length;

// Configure store
const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

// Use in components
function CartCount() {
  const count = useSelector(selectCartCount);
  return <Badge>{count}</Badge>;
}

function AddButton({ product }) {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(addItem(product))}>
      Add to Cart
    </button>
  );
}`,
    withReactQuery: `// Redux: complex client-side state
// React Query: all server data
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    selectedRows: [],
    undoStack: [],
    activeFilters: {},
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    selectRows: (state, action) => {
      state.undoStack.push([...state.selectedRows]);
      state.selectedRows = action.payload;
    },
    undo: (state) => {
      const prev = state.undoStack.pop();
      if (prev) state.selectedRows = prev;
    },
    setFilters: (state, action) => {
      state.activeFilters = action.payload;
    },
  },
});

function DataDashboard() {
  const dispatch = useDispatch();
  const filters = useSelector(s => s.ui.activeFilters);
  const selected = useSelector(s => s.ui.selectedRows);

  // React Query: server state
  const { data } = useQuery({
    queryKey: ['analytics', filters],
    queryFn: () => fetchAnalytics(filters),
  });

  // Mutation syncs selections to server
  const bulkUpdate = useMutation({
    mutationFn: (rows) => api.updateRows(rows),
    onSuccess: () =>
      queryClient.invalidateQueries(['analytics']),
  });

  return (
    <Table
      data={data}
      selected={selected}
      onSelect={(rows) => dispatch(selectRows(rows))}
      onSave={() => bulkUpdate.mutate(selected)}
    />
  );
}

// \u2705 Redux: complex UI (undo, multi-select, filters)
// \u2705 React Query: data fetching & cache
// \u274C Don't use RTK Query AND React Query together`,
    bestFor:
      'Large teams, complex apps with undo/redo, strict audit trails, or apps where predictability is paramount.',
    avoidFor:
      "Small-to-medium apps, prototypes, or teams that don't need the structure overhead.",
    complexity: 4,
    bundle: '~11 KB',
    boilerplate: 'Moderate',
    learning: 'Medium',
  },
}

export const COMPARISON_DATA: ComparisonRow[] = [
  { label: 'Bundle Size', context: '0 KB', zustand: '~1 KB', redux: '~11 KB' },
  { label: 'Boilerplate', context: 'Low', zustand: 'Minimal', redux: 'Moderate' },
  { label: 'Learning Curve', context: 'Easy', zustand: 'Easy', redux: 'Medium' },
  { label: 'Devtools', context: 'React DevTools', zustand: 'Redux DevTools (via middleware)', redux: 'Redux DevTools (built-in)' },
  { label: 'Selectors', context: 'None', zustand: 'Built-in', redux: 'Reselect' },
  { label: 'Middleware', context: 'None', zustand: 'Flexible', redux: 'Extensive' },
  { label: 'Re-render Control', context: 'All consumers', zustand: 'Surgical', redux: 'Surgical' },
  { label: 'Provider Required', context: 'Yes', zustand: 'No', redux: 'Yes' },
  { label: 'Works Outside React', context: 'No', zustand: 'Yes', redux: 'Yes' },
]

export const DECISION_TREE: DecisionStep[] = [
  {
    question: 'Is it server/async data?',
    yes: "Use React Query (TanStack Query). Full stop. Don't put API responses in any of these.",
    yesColor: SM_COLORS.rq,
    no: 'Continue \u2193',
  },
  {
    question: 'Is it a rarely-changing global value? (theme, locale, auth user)',
    yes: 'React Context is perfect. Simple, built-in, no extra deps.',
    yesColor: SM_COLORS.context,
    no: 'Continue \u2193',
  },
  {
    question: 'Is your app small-to-medium with straightforward client state?',
    yes: 'Zustand. Tiny, fast, minimal boilerplate, great selectors.',
    yesColor: SM_COLORS.zst,
    no: 'Continue \u2193',
  },
  {
    question: 'Do you need strict patterns, time-travel debug, or undo/redo?',
    yes: 'Redux Toolkit. The structure pays off at scale.',
    yesColor: SM_COLORS.redux,
    no: 'You probably want Zustand. Reach for Redux only when you feel the pain.',
  },
]

export const ARCH_LAYERS: ArchLayer[] = [
  {
    layer: 'Server State',
    tool: 'React Query / TanStack Query',
    color: SM_COLORS.rq,
    desc: 'All API data: user profiles, product lists, analytics. Handles caching, refetching, pagination, optimistic updates. This is your source of truth for anything from the server.',
    examples: 'useQuery, useMutation, queryClient.invalidateQueries',
  },
  {
    layer: 'Global Client State',
    tool: 'Zustand or Redux Toolkit',
    color: SM_COLORS.zst,
    desc: 'Complex UI state shared across routes: shopping cart contents, multi-step form data, undo/redo stacks, notification queues, selected items for bulk actions.',
    examples: 'useCartStore, useSelector, dispatch',
  },
  {
    layer: 'App-wide Config',
    tool: 'React Context',
    color: SM_COLORS.context,
    desc: 'Rarely-changing globals that many components need: auth tokens, theme preference, locale/i18n, feature flags. Changes trigger full subtree re-renders, which is fine because they change rarely.',
    examples: 'useContext(AuthContext), useContext(ThemeContext)',
  },
  {
    layer: 'Local Component State',
    tool: 'useState / useReducer',
    color: SM_COLORS.accent,
    desc: "State that belongs to a single component or a small subtree: form inputs, open/close toggles, hover states, animation triggers. Don't over-globalize.",
    examples: 'useState, useReducer, useRef',
  },
]

export const ANTI_PATTERNS: AntiPattern[] = [
  { bad: 'Storing API data in Redux/Zustand', good: 'Let React Query own all server state' },
  { bad: 'Using Context for frequently-updating state', good: 'Use Zustand or local state instead' },
  { bad: 'Using RTK Query AND React Query together', good: 'Pick one server-state tool and commit' },
  { bad: 'Globalizing state that only one component needs', good: 'Start local, lift only when shared' },
]
