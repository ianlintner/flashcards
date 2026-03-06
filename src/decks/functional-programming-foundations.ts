import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "FP Core Model",
    front:
      "What defines functional programming?\n\nSummarize the core mental model and why teams adopt it.",
    back: "Functional programming treats computation\nas evaluation of expressions, not sequences\nof hidden state changes.\n\nCore ideas:\n  1. Pure functions: same input -> same output.\n  2. Immutability: data is not updated in place.\n  3. Composition: build bigger behavior from\n     small reusable functions.\n  4. Algebraic modeling: represent states and\n     transitions explicitly in the type system.\n\nWhy teams like it:\n  Predictable behavior, easier testing,\n  local reasoning, safer refactors, and\n  better parallelism because fewer shared\n  mutable dependencies exist.\n\nTrade-off:\n  You often move complexity from runtime\n  behavior into data modeling and types.",
  },
  {
    topic: "Referential Transparency",
    front:
      "What is referential transparency?\n\nWhy is it the key property behind pure code?",
    back: "Referential transparency means an\nexpression can be replaced by its value\nwithout changing program behavior.\n\nExample:\n  let x = add(2, 3)\n  let y = x * x\n\nIf add is pure, replace x with 5:\n  let y = 5 * 5\n\nWhy it matters:\n  - Equational reasoning works.\n  - Memoization is safe.\n  - Reordering evaluation is safer.\n  - Tests become simpler because outputs\n    do not depend on ambient state.\n\nNot referentially transparent:\n  now(), random(), readFile(), mutateGlobal().\nThose depend on time, I/O, or shared state.\nIn FP, such effects are isolated rather than\nspread through the whole program.",
  },
  {
    topic: "Immutability",
    front:
      "Why is immutability central in FP?\n\nExplain practical benefits and costs.",
    back: "Immutability means values do not change\nafter creation. 'Updating' returns a new\nvalue instead of mutating the old one.\n\nBenefits:\n  - No accidental aliasing bugs.\n  - Easier undo/time-travel/debugging.\n  - Concurrent reads are naturally safe.\n  - Functions can trust their inputs.\n\nTechniques:\n  Structural sharing in persistent data\n  structures keeps copies efficient.\n\nCost model:\n  Naive copying can be expensive, so mature\n  FP systems lean on persistent vectors, maps,\n  tries, ropes, and compiler/runtime help.\n\nRule of thumb:\n  Prefer immutable domain data. Confine\n  mutation to small local performance-critical\n  regions or runtime internals.",
  },
  {
    topic: "Higher-Order Functions",
    front:
      "What are higher-order functions?\n\nHow do map, filter, and fold change design style?",
    back: "A higher-order function takes functions\nas arguments, returns functions, or both.\n\nCanonical examples:\n  map:    transform each element\n  filter: keep elements matching a predicate\n  fold:   reduce a structure to one value\n\nInstead of writing loops + mutation:\n  sum = fold(add, 0, xs)\n\nDesign shift:\n  You describe the transformation pipeline,\n  not the step-by-step control flow.\n\nWhy that helps:\n  - Intent is clearer.\n  - Behavior is reusable.\n  - Combinators compose well.\n  - Laws around map/fold guide refactors.\n\nAdvanced note:\n  Once APIs are built from combinators,\n  domain logic often reads like algebra over\n  data rather than imperative bookkeeping.",
  },
  {
    topic: "Recursion and Folds",
    front:
      "Why does FP emphasize recursion?\n\nCompare direct recursion with folds.",
    back: "Recursion replaces explicit mutation-based\nloops with self-reference over smaller input.\n\nDirect recursion:\n  fact(n) = if n <= 1 then 1 else n * fact(n-1)\n\nStructural recursion mirrors the shape of data:\n  list, tree, option, expression AST, etc.\n\nProblem:\n  Hand-written recursion repeats traversal logic\n  and is easy to get subtly wrong.\n\nFold abstracts the pattern:\n  fold(list, z, combine)\n  - z handles the empty case\n  - combine handles one element + accumulator\n\nWhy folds win:\n  - Centralize traversal behavior\n  - Improve reuse\n  - Make laws and optimizations clearer\n  - Generalize from lists to trees and more\n\nTail recursion matters when the runtime can\nreuse stack frames for accumulator style code.",
  },
  {
    topic: "Algebraic Data Types",
    front:
      "What are algebraic data types (ADTs)?\n\nExplain products, sums, and pattern matching.",
    back: "ADTs model domains by composing types.\n\nProduct type: all fields exist together.\n  User = { id, name, email }\n\nSum type: one of several variants.\n  Payment = Card | Wire | Cash\n\nWhy ADTs are powerful:\n  - Invalid states become unrepresentable.\n  - Exhaustive pattern matching forces\n    handling every case.\n  - Domain concepts are explicit in code.\n\nExample:\n  Result<A, E> = Ok(A) | Err(E)\n  Option<A>    = Some(A) | None\n\nFP style prefers modeling with ADTs first,\nthen writing functions over those shapes.\nThat often removes boolean flags, null checks,\nand impossible combinations of fields.",
  },
  {
    topic: "Type Inference and Polymorphism",
    front: "How do type inference and parametric polymorphism support FP?",
    back: "Type inference lets the compiler recover\nmost types from usage, so code stays concise\nwithout losing static guarantees.\n\nParametric polymorphism means functions work\nfor any type uniformly.\n\nExample:\n  identity : A -> A\n  map      : (A -> B) -> List<A> -> List<B>\n\nWhat parametricity gives you:\n  The implementation of identity cannot inspect\n  A. It can only return the input unchanged.\n  The type itself constrains behavior.\n\nThis leads to 'theorems for free':\n  Generic functions have fewer legal behaviors\n  than ad-hoc overloaded code.\n\nIn practice:\n  Strong inference + generic abstractions make\n  FP APIs expressive while preserving safety.",
  },
  {
    topic: "Laziness vs Strictness",
    front:
      "Compare lazy and strict evaluation in FP.\n\nWhat do you gain and what can go wrong?",
    back: "Strict evaluation computes arguments now.\nLazy evaluation defers work until demanded.\n\nLazy benefits:\n  - Infinite streams become possible.\n  - Expensive branches can be skipped.\n  - Pipelines may fuse elegantly.\n\nStrict benefits:\n  - Simpler performance model.\n  - Fewer hidden space leaks.\n  - Easier debugging of evaluation order.\n\nCommon lazy pitfalls:\n  - Thunk buildup causes memory growth.\n  - Exceptions/effects surface later than expected.\n  - Space usage becomes harder to predict.\n\nProduction FP systems often mix both:\n  lazy where compositional power matters,\n  strict where predictability and throughput\n  matter most. The main lesson: understand\n  your evaluation strategy, or it will educate\n  you in production.",
  },
];

export const FUNCTIONAL_PROGRAMMING_FOUNDATIONS: DeckInfo = {
  id: "functional-programming-foundations",
  title: "Functional Programming Foundations",
  description:
    "Purity, immutability, higher-order functions, recursion, ADTs, polymorphism, and evaluation strategy.",
  category: "Languages",
  level: "intermediate",
  cards,
  tags: [
    "functional programming",
    "purity",
    "immutability",
    "ADTs",
    "recursion",
    "type systems",
  ],
  estimatedMinutes: 14,
};
