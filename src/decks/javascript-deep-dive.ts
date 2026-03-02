import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "JavaScript Event Loop",
    front:
      "How does the JavaScript\nevent loop work?\n\nExplain microtasks vs macrotasks.",
    back: "Event loop: Single-threaded execution\nmodel for async JavaScript.\n\nExecution model:\n  1. Call stack: Synchronous code runs.\n  2. When stack empty, check microtasks.\n  3. Drain ALL microtasks.\n  4. Run ONE macrotask.\n  5. Repeat from step 2.\n\nMicrotasks (higher priority):\n  Promise .then/.catch/.finally.\n  queueMicrotask().\n  MutationObserver.\n  Process entirely before next macrotask.\n\nMacrotasks:\n  setTimeout / setInterval.\n  I/O callbacks.\n  setImmediate (Node.js).\n  requestAnimationFrame (browser).\n\nExample:\n  console.log('1');\n  setTimeout(() => console.log('2'), 0);\n  Promise.resolve().then(() => console.log('3'));\n  console.log('4');\n  // Output: 1, 4, 3, 2\n  // Sync first, then microtask, then macro.\n\nNode.js phases:\n  timers -> pending -> idle/prepare\n  -> poll -> check -> close.\n  process.nextTick: Before ALL microtasks.\n\nCommon pitfall:\n  Infinite microtask loop blocks rendering.\n  Promise.resolve().then(function f() {\n    Promise.resolve().then(f); // Never renders!\n  });",
  },
  {
    topic: "JavaScript Closures & Scope",
    front:
      "Explain closures, lexical scope,\nand the module pattern in\nJavaScript.",
    back: "Lexical scope: Functions access variables\nfrom where they are DEFINED, not called.\n\nClosure: Function + its lexical environment.\n  function outer() {\n    let count = 0;\n    return function inner() {\n      return ++count; // Captures count\n    };\n  }\n  const inc = outer();\n  inc(); // 1\n  inc(); // 2 (count persists!)\n\nScope chain:\n  Block scope: let, const (inside {}).\n  Function scope: var (entire function).\n  Global scope: Top level.\n  Lookup: Inner -> outer -> ... -> global.\n\nvar vs let vs const:\n  var: Function-scoped, hoisted.\n    Hoisted with value undefined.\n  let: Block-scoped, TDZ.\n    Temporal Dead Zone before declaration.\n  const: Block-scoped, immutable binding.\n    Object properties CAN change.\n    const obj = {}; obj.x = 1; // OK.\n\nModule pattern (pre-ES modules):\n  const mod = (() => {\n    let private = 0;\n    return {\n      get: () => private,\n      inc: () => ++private,\n    };\n  })();\n  Encapsulation via closure.\n\nES Modules:\n  import/export: Static, tree-shakeable.\n  Live bindings: Exports are references.\n  Strict mode by default.",
  },
  {
    topic: "Prototypes & Classes",
    front:
      "How does prototypal inheritance\nwork in JavaScript?\n\nCompare with class syntax.",
    back: "Prototypal inheritance:\n  Every object has [[Prototype]] link.\n  Property lookup walks the chain.\n  obj -> obj.__proto__ -> ... -> null.\n\nObject.create:\n  const animal = { speak() {...} };\n  const dog = Object.create(animal);\n  dog.speak();  // Found on prototype.\n\nConstructor functions:\n  function Dog(name) {\n    this.name = name;\n  }\n  Dog.prototype.bark = function() {...};\n  const d = new Dog('Rex');\n  // new: Creates {}, sets proto, binds this.\n\nES6 class (syntax sugar):\n  class Dog extends Animal {\n    #name;  // Private field (ES2022).\n    constructor(name) {\n      super();  // Must call in subclass.\n      this.#name = name;\n    }\n    bark() { ... }  // On prototype.\n    static create() { ... }  // On class.\n  }\n\nKey differences from classical OOP:\n  No true classes, just objects linking.\n  instanceof checks prototype chain.\n  Object.getPrototypeOf(obj) (preferred\n    over __proto__).\n\nComposition > inheritance:\n  const withLogger = (obj) => ({\n    ...obj,\n    log() { console.log(this); }\n  });\n  Mixins, factory functions preferred\n  over deep class hierarchies.",
  },
  {
    topic: "Promises & Async/Await",
    front:
      "How do Promises work?\n\nExplain async/await and\nerror handling patterns.",
    back: "Promise states:\n  Pending -> Fulfilled (resolved).\n  Pending -> Rejected.\n  Settled = fulfilled or rejected.\n  Immutable once settled.\n\nCreation:\n  new Promise((resolve, reject) => {\n    // async work...\n    resolve(value); // or reject(error);\n  });\n\nChaining:\n  fetch(url)\n    .then(res => res.json())\n    .then(data => process(data))\n    .catch(err => handle(err))\n    .finally(() => cleanup());\n\nCombinators:\n  Promise.all([p1, p2]):\n    All succeed or first rejection.\n  Promise.allSettled([p1, p2]):\n    Wait for all, never rejects.\n  Promise.race([p1, p2]):\n    First to settle (resolve or reject).\n  Promise.any([p1, p2]):\n    First to fulfill (ignores rejections).\n\nasync/await (syntactic sugar):\n  async function getData() {\n    try {\n      const res = await fetch(url);\n      const data = await res.json();\n      return data;\n    } catch (err) {\n      console.error(err);\n    }\n  }\n  Returns Promise implicitly.\n  await pauses until Promise settles.\n\nPatterns:\n  Parallel: await Promise.all([a(), b()]).\n  Sequential: for await (const x of stream).\n  Error boundary: try/catch at top level.",
  },
  {
    topic: "JavaScript Gotchas",
    front: "What are the most common\nJavaScript gotchas?",
    back: "Type coercion:\n  '5' + 3 = '53' (string concat).\n  '5' - 3 = 2 (numeric).\n  [] + {} = '[object Object]'.\n  {} + [] = 0 (block + unary +).\n  Always use === not ==.\n\nthis binding:\n  Regular function: Caller determines.\n  Arrow function: Lexical (enclosing).\n  Method: obj.method() -> this = obj.\n  Standalone: this = undefined (strict)\n    or globalThis (sloppy).\n  bind/call/apply: Explicit this.\n\nfloating point:\n  0.1 + 0.2 !== 0.3  (IEEE 754).\n  Fix: Math.abs(a-b) < Number.EPSILON.\n  Or use integers (cents, not dollars).\n\nArray quirks:\n  typeof [] === 'object'.\n  Use Array.isArray([]) -> true.\n  [1,2] + [3,4] = '1,23,4' (string!).\n  delete arr[1]: Leaves hole (don't).\n  sort(): Lexicographic by default!\n    [10,9,1].sort() -> [1,10,9].\n    Fix: .sort((a,b) => a - b).\n\nnull vs undefined:\n  undefined: Declared but no value.\n  null: Intentional 'no value'.\n  typeof null === 'object' (historic bug).\n  void 0 === undefined.\n\nWeakRef/FinalizationRegistry:\n  GC-friendly references (advanced).\nStructuredClone: Deep copy (modern).",
  },
  {
    topic: "TypeScript Advanced Types",
    front:
      "Explain conditional types,\nmapped types, and template\nliteral types in TypeScript.",
    back: "Conditional types:\n  T extends U ? X : Y\n\n  type IsString<T> = T extends string\n    ? true : false;\n  IsString<'hello'> = true.\n  IsString<42> = false.\n\n  Distributive: Distributes over unions.\n  type X<T> = T extends string ? T : never;\n  X<string | number> = string.\n\nBuilt-in utility types:\n  Extract<T, U>: Members assignable to U.\n  Exclude<T, U>: Members NOT in U.\n  ReturnType<F>: Return type of function.\n  Parameters<F>: Tuple of param types.\n  Awaited<T>: Unwrap Promise.\n\nMapped types:\n  type Readonly<T> = {\n    readonly [K in keyof T]: T[K];\n  };\n  type Partial<T> = {\n    [K in keyof T]?: T[K];\n  };\n  Key remapping (4.1+):\n  type Getters<T> = {\n    [K in keyof T as `get${Capitalize<K>}`]:\n      () => T[K];\n  };\n\nTemplate literal types:\n  type Event = `on${Capitalize<string>}`;\n  type Color = 'red' | 'blue';\n  type Size = 'sm' | 'lg';\n  type Variant = `${Color}-${Size}`;\n  = 'red-sm' | 'red-lg' | 'blue-sm' | ...\n\ninfer keyword:\n  type UnpackPromise<T> =\n    T extends Promise<infer U> ? U : T;\n  Extracts types from patterns.",
  },
  {
    topic: "JavaScript Modules & Bundling",
    front: "Compare CommonJS, ES Modules,\nand modern bundler features.",
    back: "CommonJS (CJS) - Node.js default:\n  const fs = require('fs');\n  module.exports = { func };\n  Synchronous loading.\n  Dynamic: require() anywhere.\n  No tree-shaking (runtime resolution).\n\nES Modules (ESM) - Standard:\n  import { func } from './module.js';\n  export const func = () => {};\n  Static: Imports at top level.\n  Async loading.\n  Live bindings (not copies).\n  Tree-shakeable.\n  import() for dynamic/lazy loading.\n\nNode.js ESM:\n  'type': 'module' in package.json.\n  Or .mjs extension.\n  Top-level await supported.\n\nBundlers:\n  Webpack: Most features, plugins.\n    Code splitting, HMR, loaders.\n  Vite: Dev = native ESM (fast).\n    Build = Rollup. Lightning fast HMR.\n  esbuild: Go-based, extremely fast.\n    Used by Vite for transforms.\n  Rollup: Tree-shaking pioneer.\n    Best for libraries.\n  Turbopack: Rust-based (Next.js).\n\nKey features:\n  Tree-shaking: Remove unused exports.\n  Code splitting: Dynamic import() chunks.\n  HMR: Hot Module Replacement.\n  Source maps: Debug original code.\n\nPackage exports (modern):\n  'exports' field in package.json.\n  Conditional: CJS + ESM dual package.\n  Subpath exports: Package encapsulation.\n  import maps: Browser-native resolution.",
  },
  {
    topic: "Web APIs & Runtime",
    front: "What are the key Web APIs\nevery JS developer should know?",
    back: "Storage:\n  localStorage: 5-10MB, sync, string KV.\n  sessionStorage: Per-tab, cleared on close.\n  IndexedDB: Async, structured data, large.\n  Cache API: Request/Response pairs.\n\nNetworking:\n  fetch(): Promise-based HTTP.\n  AbortController: Cancel requests.\n  WebSocket: Full-duplex real-time.\n  Server-Sent Events: Server push.\n  Beacon API: Fire-and-forget analytics.\n\nWorkers:\n  Web Worker: Background thread.\n    No DOM access. postMessage().\n  Service Worker: Network proxy.\n    Offline support, push notifications.\n    Lifecycle: install -> activate -> fetch.\n  SharedWorker: Shared between tabs.\n\nDOM APIs:\n  IntersectionObserver: Lazy loading.\n  MutationObserver: DOM change detection.\n  ResizeObserver: Element size changes.\n  requestAnimationFrame: Smooth animation.\n  requestIdleCallback: Low-priority work.\n\nModern APIs:\n  structuredClone(): Deep copy.\n  AbortSignal.timeout(): Request timeout.\n  navigator.clipboard: Read/write.\n  Intl: i18n (DateTimeFormat, NumberFormat).\n  URL/URLSearchParams: Parse URLs.\n  TextEncoder/Decoder: String <-> bytes.\n  crypto.randomUUID(): UUIDs.\n  Performance API: Timing, marks.\n\nNode.js-specific:\n  process, Buffer, Stream, fs, path,\n  child_process, cluster, worker_threads.",
  },
];

export const JAVASCRIPT_DEEP_DIVE: DeckInfo = {
  id: "javascript-deep-dive",
  title: "JavaScript & TypeScript Deep Dive",
  description:
    "Event loop, closures, prototypes, async patterns, gotchas, advanced types, modules, and Web APIs.",
  category: "Languages",
  level: "intermediate",
  cards,
  tags: [
    "JavaScript",
    "TypeScript",
    "async",
    "closures",
    "event loop",
    "modules",
  ],
  estimatedMinutes: 12,
};
