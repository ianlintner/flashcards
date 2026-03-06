import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Haskell Mental Model",
    front:
      "What makes Haskell distinct among FP languages?\n\nSummarize the practical mindset shift.",
    back: "Haskell is a pure, statically typed,\nlazy language where effects are modeled\nexplicitly instead of performed implicitly.\n\nKey traits:\n  - purity by default\n  - non-strict evaluation\n  - typeclasses for ad-hoc polymorphism\n  - algebraic data types + pattern matching\n  - emphasis on laws and composition\n\nMindset shift:\n  First model data and transformations.\n  Then describe effects at the boundaries.\n  The compiler becomes a design partner, not\n  just a syntax bouncer.",
  },
  {
    topic: "Haskell Typeclasses",
    front:
      "How do Haskell typeclasses shape real code?\n\nName the most important ones to understand early.",
    back: "Typeclasses encode capabilities that generic\nfunctions can require without inheritance.\n\nImportant ones:\n  Eq      equality\n  Ord     ordering\n  Show    rendering\n  Semigroup / Monoid  combine\n  Functor / Applicative / Monad\n  Foldable / Traversable\n\nWhy they matter:\n  - generic libraries stay expressive\n  - laws guide refactoring\n  - syntax often desugars through them\n\nIf you do not know which typeclass a function\nleans on, Haskell can feel like elegant sorcery\nwith surprisingly opinionated error messages.",
  },
  {
    topic: "Haskell Laziness in Practice",
    front: "What are the benefits and hazards of Haskell's laziness?",
    back: "Benefits:\n  - infinite structures and streams\n  - modular producer/consumer pipelines\n  - work only happens when demanded\n\nHazards:\n  - thunk buildup and space leaks\n  - evaluation order becomes less obvious\n  - strictness may be needed for performance\n\nImportant tools:\n  seq, deepseq, bang patterns, strict fields\n\nRule of thumb:\n  Use laziness for compositional elegance.\n  Add strictness when profiling shows retained\n  memory or delayed work in hot paths.",
  },
  {
    topic: "Scala FP and OO Blend",
    front:
      "How does Scala balance functional and OO styles?\n\nWhat should advanced users watch for?",
    back: "Scala mixes algebraic data types, higher-kinded\ntypes, implicits/givens, and strong collections\nwith classic OO features like classes and\nsubtyping.\n\nStrength:\n  You can write high-level FP while staying in\n  the JVM ecosystem.\n\nRisk:\n  Teams can mix too many styles at once:\n  inheritance, implicits, mutation, macros,\n  effect systems, and custom operators.\n\nGood Scala code usually chooses a coherent\nsubset rather than using every language feature\nlike a wizard filling a shopping cart.",
  },
  {
    topic: "Scala Typelevel Toolkit",
    front:
      "Which Scala features matter most for functional programming libraries?",
    back: "Important Scala FP features:\n  - sealed traits + case classes for ADTs\n  - pattern matching\n  - higher-kinded types\n  - typeclasses via implicits or givens\n  - extension methods\n  - for-comprehensions\n  - effect libraries like Cats Effect or ZIO\n\nWhy they matter:\n  They enable expressive abstractions while\n  keeping APIs ergonomic for users of generic\n  code.\n\nIf Haskell is purity-first, Scala is often\npragmatism-first with enough type power to\nbuild very serious FP systems.",
  },
  {
    topic: "OCaml Practical FP",
    front: "What is OCaml's distinctive niche in the FP world?",
    back: "OCaml is a strict, statically typed language\nwith excellent algebraic data types, pattern\nmatching, module/functor systems, and strong\nperformance.\n\nDistinctive strengths:\n  - pragmatic functional style\n  - easy interop with imperative techniques\n  - powerful module system\n  - good compiler and tooling for serious apps\n\nIt often feels more operationally predictable\nthan Haskell while remaining far more algebraic\nthan mainstream OO languages.",
  },
  {
    topic: "Modules and Functors in OCaml",
    front: "How do OCaml modules and functors differ from typeclasses?",
    back: "OCaml modules package types and values.\nFunctors are modules parameterized by modules.\n\nUse them to:\n  - abstract over implementations\n  - hide representation details\n  - build reusable components\n  - encode large-scale architecture boundaries\n\nCompared with typeclasses:\n  - modules operate at module level, not value\n    level instance resolution\n  - more explicit wiring\n  - excellent for large library design\n\nThey solve some similar abstraction problems,\nbut with a very different ergonomic trade-off.",
  },
  {
    topic: "Choosing Haskell vs Scala vs OCaml",
    front:
      "How should a team reason about Haskell, Scala, and OCaml for production work?",
    back: "Haskell:\n  best when purity, abstraction, and strong\n  semantic modeling are core priorities.\n\nScala:\n  best when you want advanced FP on the JVM\n  with access to existing enterprise systems.\n\nOCaml:\n  best when you want strong types, fast native\n  code, great pattern matching, and pragmatic\n  control over strict evaluation.\n\nChoose based on ecosystem, runtime needs,\nteam experience, and how much abstraction your\norganization can digest before lunch.",
  },
];

export const HASKELL_SCALA_OCAML: DeckInfo = {
  id: "haskell-scala-ocaml",
  title: "Haskell, Scala, and OCaml",
  description:
    "Language-specific functional programming concepts across Haskell, Scala, and OCaml.",
  category: "Languages",
  level: "advanced",
  cards,
  tags: [
    "Haskell",
    "Scala",
    "OCaml",
    "typeclasses",
    "modules",
    "functional programming",
  ],
  estimatedMinutes: 16,
};
