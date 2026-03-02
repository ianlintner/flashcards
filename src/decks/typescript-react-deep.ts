import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "TypeScript Generics",
    front:
      "Explain TypeScript generics.\n\nWhat are constraints and\nconditional types?",
    back: "Generics: Type parameters for reusable code.\n\nBasic:\n  function identity<T>(arg: T): T {\n    return arg;\n  }\n  identity<string>('hello');\n  identity(42); // T inferred as number.\n\nConstraints (extends):\n  function len<T extends { length: number }>(\n    arg: T\n  ): number {\n    return arg.length;\n  }\n  len('hello'); // OK\n  len(42);      // Error: no .length\n\nConditional types:\n  type IsString<T> =\n    T extends string ? 'yes' : 'no';\n  IsString<string> // 'yes'\n  IsString<number> // 'no'\n\nBuilt-in utility types:\n  Partial<T>: All props optional.\n  Required<T>: All props required.\n  Pick<T, K>: Subset of props.\n  Omit<T, K>: Exclude props.\n  Record<K, V>: Object with K keys, V values.\n  ReturnType<F>: Return type of function.\n  Awaited<P>: Unwrap Promise type.\n\ninfer keyword:\n  type ElementOf<T> =\n    T extends (infer U)[] ? U : never;\n  ElementOf<string[]> // string",
  },
  {
    topic: "TypeScript Type Narrowing",
    front:
      "How does type narrowing work\nin TypeScript?\n\nWhat are type guards?",
    back: "Narrowing: Refining types within\ncontrol flow blocks.\n\ntypeof guard:\n  if (typeof x === 'string') {\n    x.toUpperCase(); // OK, x is string\n  }\n\nTruthiness guard:\n  if (x) { ... } // excludes null/undefined\n\nin operator:\n  if ('name' in obj) {\n    obj.name; // OK\n  }\n\ninstanceof:\n  if (err instanceof TypeError) {\n    err.message; // OK\n  }\n\nDiscriminated unions:\n  type Shape =\n    | { kind: 'circle'; radius: number }\n    | { kind: 'rect'; w: number; h: number };\n\n  function area(s: Shape) {\n    switch (s.kind) {\n      case 'circle': return Math.PI * s.radius ** 2;\n      case 'rect': return s.w * s.h;\n    }\n  }\n\nCustom type guard:\n  function isString(x: unknown): x is string {\n    return typeof x === 'string';\n  }\n\nasserts keyword:\n  function assert(val: unknown):\n    asserts val is string { ... }\n\nExhaustiveness check:\n  const _: never = shape; // Error if\n  // not all cases handled.",
  },
  {
    topic: "TypeScript Advanced Types",
    front:
      "Explain mapped types, template\nliteral types, and the satisfies\noperator.",
    back: "Mapped types:\n  type Readonly<T> = {\n    readonly [K in keyof T]: T[K];\n  };\n\n  type Optional<T> = {\n    [K in keyof T]?: T[K];\n  };\n\n  Key remapping:\n  type Getters<T> = {\n    [K in keyof T as `get${Capitalize<K>}`]:\n      () => T[K];\n  };\n  Getters<{name: string}>\n  // { getName: () => string }\n\nTemplate literal types:\n  type HttpMethod =\n    'GET' | 'POST' | 'PUT' | 'DELETE';\n  type Route = `/${string}`;\n  type Endpoint = `${HttpMethod} ${Route}`;\n  // 'GET /users' is valid.\n\nsatisfies operator (TS 4.9+):\n  const config = {\n    color: 'red',\n    size: 42\n  } satisfies Record<string, string | number>;\n\n  // config.color is still 'red' (literal),\n  // not string | number.\n  // Validates type WITHOUT widening.\n\nas const:\n  const arr = [1, 2, 3] as const;\n  // readonly [1, 2, 3], not number[].",
  },
  {
    topic: "TypeScript & React Patterns",
    front: "What TypeScript patterns are\nessential for React development?",
    back: "Component props:\n  type ButtonProps = {\n    label: string;\n    onClick: () => void;\n    variant?: 'primary' | 'secondary';\n    children?: React.ReactNode;\n  };\n\nExtending HTML elements:\n  type InputProps = React.ComponentProps<'input'>\n    & { label: string };\n  // Gets all native input attributes.\n\nGeneric components:\n  type ListProps<T> = {\n    items: T[];\n    renderItem: (item: T) => React.ReactNode;\n  };\n  function List<T>({ items, renderItem }: ListProps<T>) { ... }\n\nDiscriminated union props:\n  type Props =\n    | { mode: 'edit'; onSave: () => void }\n    | { mode: 'view'; onEdit: () => void };\n\nHook return types:\n  function useUser(id: string) {\n    // Return type inferred automatically.\n    // Or explicit: }: { user: User | null; ... }\n  }\n\nContext typing:\n  const ThemeCtx = createContext<Theme | null>(null);\n  function useTheme() {\n    const ctx = useContext(ThemeCtx);\n    if (!ctx) throw new Error('...');\n    return ctx; // Theme, not Theme | null.\n  }",
  },
  {
    topic: "React Hooks Deep Dive",
    front:
      "Explain useEffect, useMemo,\nuseCallback, and useRef.\n\nWhen to use each?",
    back: "useEffect(fn, deps):\n  Side effects after render.\n  []: Run once (mount).\n  [dep]: Run when dep changes.\n  Return cleanup function.\n  Use: API calls, subscriptions, timers.\n\nuseMemo(fn, deps):\n  Cache computed value.\n  Only recomputes when deps change.\n  const sorted = useMemo(\n    () => items.sort(compareFn),\n    [items]\n  );\n  Use: Expensive calculations.\n  DON'T: Premature optimization.\n\nuseCallback(fn, deps):\n  Cache function reference.\n  Prevents child re-renders when\n  passing callbacks as props.\n  const handleClick = useCallback(\n    () => setCount(c => c + 1),\n    []\n  );\n  Use: Callbacks passed to memoized children.\n\nuseRef(initialValue):\n  Mutable container that persists\n  across renders. .current property.\n  Does NOT cause re-render on change.\n  Use: DOM refs, previous values,\n  timers, instance variables.\n\nRules of Hooks:\n  Only call at top level.\n  Only call in components/custom hooks.\n  Custom hooks: useSomething().",
  },
  {
    topic: "State Management Patterns",
    front:
      "Compare React state management:\nuseState, useReducer, Context,\nZustand, Redux.",
    back: "Local state (useState):\n  Simple component state.\n  const [count, setCount] = useState(0);\n  Use: Form inputs, toggles, local UI.\n\nuseReducer:\n  Complex state logic.\n  const [state, dispatch] = useReducer(\n    reducer, initialState\n  );\n  Use: Multiple related state values,\n  complex transitions.\n\nContext (React.createContext):\n  Pass data through component tree.\n  Avoids prop drilling.\n  + Built-in, no library.\n  - Re-renders ALL consumers on change.\n  - Not for high-frequency updates.\n  Use: Theme, auth, locale.\n\nZustand:\n  Lightweight external store.\n  const useStore = create((set) => ({\n    count: 0,\n    inc: () => set(s => ({count: s.count+1}))\n  }));\n  + Minimal boilerplate.\n  + Selective subscriptions.\n  + Works outside React.\n\nRedux Toolkit:\n  Predictable state container.\n  + DevTools, middleware, time travel.\n  + Large ecosystem.\n  - More boilerplate.\n  Use: Large apps, complex state.\n\nTrend: Zustand/Jotai for most apps.\nRedux for large enterprise apps.",
  },
  {
    topic: "Build Tools & Bundlers",
    front: "Compare modern JS build tools:\nVite, esbuild, webpack, Turbopack.",
    back: "Vite:\n  Dev: Native ESM + HMR (instant).\n  Build: Rollup (optimized bundles).\n  + Fastest dev experience.\n  + Simple config.\n  + Framework agnostic.\n  Default for Vue, growing in React.\n\nesbuild:\n  Written in Go, extremely fast.\n  Bundler + minifier + transpiler.\n  + 10-100x faster than webpack.\n  - Less plugin ecosystem.\n  Used by Vite internally for transforms.\n\nwebpack:\n  Most mature, largest ecosystem.\n  + Every plugin imaginable.\n  + Code splitting, lazy loading.\n  - Complex configuration.\n  - Slower dev server.\n  Still dominant in enterprise.\n\nTurbopack (Vercel):\n  Written in Rust.\n  Incremental computation.\n  Next.js 14+ default dev bundler.\n  + Very fast HMR.\n  - Still maturing.\n\nRollup:\n  ESM-focused, clean output.\n  Best for libraries.\n  Used by Vite for production builds.\n\nKey concepts:\n  Tree shaking: Remove unused exports.\n  Code splitting: Separate bundles per route.\n  HMR: Update modules without full reload.\n  Source maps: Debug production code.",
  },
  {
    topic: "TypeScript Configuration",
    front: "What are the most important\ntsconfig.json options?",
    back: "Strictness:\n  strict: true (enables ALL strict checks).\n    Includes:\n    strictNullChecks: null/undefined errors.\n    noImplicitAny: Must type everything.\n    strictFunctionTypes: Param variance.\n\nModule resolution:\n  module: 'ESNext' (modern ESM).\n  moduleResolution: 'bundler' (Vite/etc).\n  Or 'node16' for Node.js projects.\n\nOutput:\n  target: 'ES2022' (modern browsers).\n  outDir: './dist'.\n  declaration: true (emit .d.ts).\n  sourceMap: true.\n\nPaths (aliases):\n  paths: { '@/*': ['./src/*'] }\n  Requires bundler support too.\n\nType checking:\n  noUnusedLocals: true.\n  noUnusedParameters: true.\n  noUncheckedIndexedAccess: true.\n    arr[0] is T | undefined (safer).\n  exactOptionalPropertyTypes: true.\n    undefined != missing property.\n\nProject references (monorepo):\n  references: [{ path: '../shared' }]\n  Incremental compilation.\n  composite: true.\n\nRecommended baseline:\n  strict: true\n  noUncheckedIndexedAccess: true\n  module: 'ESNext'\n  moduleResolution: 'bundler'",
  },
];

export const TYPESCRIPT_REACT_DEEP: DeckInfo = {
  id: "typescript-react-deep",
  title: "TypeScript & React Deep Dive",
  description:
    "Advanced TypeScript (generics, narrowing, mapped types), React patterns, hooks, state management, and build tools.",
  category: "Languages",
  level: "intermediate",
  cards,
  tags: [
    "TypeScript",
    "React",
    "generics",
    "hooks",
    "state management",
    "Vite",
  ],
  estimatedMinutes: 12,
};
