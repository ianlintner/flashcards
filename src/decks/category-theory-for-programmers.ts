import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Categories and Morphisms",
    front:
      "What is a category in programmer-friendly terms?\n\nDefine objects, morphisms, identity, and composition.",
    back: "A category has:\n  - Objects\n  - Morphisms (arrows) between objects\n  - Identity arrow for each object\n  - Associative composition of arrows\n\nProgrammer analogy:\n  Objects are types.\n  Morphisms are pure functions.\n\nIf f : A -> B and g : B -> C, then\n  g . f : A -> C\n\nLaws:\n  id . f = f\n  f . id = f\n  h . (g . f) = (h . g) . f\n\nWhy programmers care:\n  Many API abstractions are really statements\n  about lawful composition. Category theory\n  gives a vocabulary for that structure.",
  },
  {
    topic: "Products, Coproducts, Exponentials",
    front:
      "How do products, coproducts, and exponentials map to programming types?",
    back: "Product type:\n  Pair values together.\n  Example: (A, B) or record { a, b }\n\nCoproduct type:\n  One of several alternatives.\n  Example: Either<A, B> or enum A | B\n\nExponential object:\n  Functions from A to B, written B^A in math.\n  In programming: A -> B\n\nCartesian closed categories are important\nbecause they support products and functions,\nwhich mirrors simply typed lambda calculus.\n\nProgrammer payoff:\n  Many type identities are not random trivia.\n  They express deep equivalences in how values\n  can be constructed and consumed.",
  },
  {
    topic: "Functors",
    front:
      "What is a functor categorically and programmatically?\n\nState the laws.",
    back: "Category theory:\n  A functor maps objects to objects and\n  morphisms to morphisms while preserving\n  identity and composition.\n\nProgramming:\n  map : (A -> B) -> F<A> -> F<B>\n\nFunctor laws:\n  1. map(id) = id\n  2. map(g . f) = map(g) . map(f)\n\nExamples:\n  List, Option, Result<E, _>, Tree, Promise\n  (with caveats about effects in some languages)\n\nIntuition:\n  A functor lets you apply normal functions\n  inside a structured context without breaking\n  the structure itself.",
  },
  {
    topic: "Natural Transformations",
    front:
      "What is a natural transformation?\n\nWhy does it matter to programmers?",
    back: "A natural transformation converts one\nfunctor into another uniformly for all types.\n\nShape:\n  nt : F<A> -> G<A>\nfor every A, without inspecting A-specific\nbehavior.\n\nExamples:\n  Option<A> -> List<A>\n  Result<E, A> -> Option<A>\n  Identity<A> -> Reader<R, A>\n\nWhy it matters:\n  Natural transformations preserve structure\n  across abstractions and show up in effect\n  interpretation, optimization, and changing\n  one representation into another lawfully.\n\nKey idea:\n  The conversion must commute with map.\n  Transform first then map = map then transform.",
  },
  {
    topic: "Monoids and Monoidal Structure",
    front: "Why do monoids appear everywhere in FP and category theory?",
    back: "A monoid is:\n  - an associative combine operation\n  - an identity element\n\nExamples:\n  numbers with + and 0\n  strings with concat and ''\n  lists with append and []\n  endofunctions with composition and id\n\nWhy programmers care:\n  Monoids explain safe parallel reduction,\n  log accumulation, configuration merging,\n  metrics aggregation, and many fold patterns.\n\nBigger picture:\n  Applicatives and effects often rely on some\n  monoidal structure under the hood. Once you\n  notice monoids, they start showing up in code\n  reviews like extremely polite raccoons.",
  },
  {
    topic: "Monads from Category Theory",
    front:
      "How does category theory describe monads?\n\nConnect that view to programming practice.",
    back: "Categorically, a monad on a category is:\n  - an endofunctor T\n  - unit  eta : A -> T<A>\n  - multiplication mu : T<T<A>> -> T<A>\nsubject to coherence laws.\n\nProgramming translation:\n  pure    = eta\n  flatMap = map + mu\n  join    = mu\n\nWhy this matters:\n  A monad is not just 'a container'. It is a\n  principled way to compose computations that\n  carry context such as failure, state, async,\n  logging, or environment.\n\nThe category-theory view explains why monads\nare lawful composition tools rather than mere\nsyntax for chaining callbacks.",
  },
  {
    topic: "Yoneda Insight",
    front: "What is the Yoneda idea and why should programmers care?",
    back: "Yoneda, programmer edition:\n  To understand a value, study how every\n  consumer can interact with it.\n\nFor endofunctors, a common consequence is that\n  F<A> is tightly related to the set of all\n  natural ways to consume A into F.\n\nPractical uses:\n  - rewrite abstractions into more efficient\n    representations\n  - derive surprising equivalences\n  - optimize repeated mapping/composition\n\nEven if you never prove Yoneda formally, the\nlesson is huge: interfaces defined by behavior\noften reveal more structure than raw data shape.",
  },
  {
    topic: "Adjunctions and Design",
    front:
      "What is an adjunction at a high level?\n\nWhy does it matter in advanced FP design?",
    back: "An adjunction captures a deep correspondence\nbetween building and consuming structure.\n\nShape:\n  Hom(F<A>, B)  ~=  Hom(A, G<B>)\nwhere F is left adjoint to G.\n\nProgrammer intuition:\n  One side freely adds structure. The other\n  side forgets or interprets it.\n\nWhy this matters:\n  Many useful abstractions, including some\n  monads, arise from adjunctions. Free objects,\n  parser/pretty-printer relationships, and API\n  design patterns often make more sense when\n  viewed through this lens.\n\nYou do not need to wave category diagrams in\nstandup, but the concept helps explain where\nwhole families of abstractions come from.",
  },
];

export const CATEGORY_THEORY_FOR_PROGRAMMERS: DeckInfo = {
  id: "category-theory-for-programmers",
  title: "Category Theory for Programmers",
  description:
    "Objects, morphisms, functors, natural transformations, monoids, monads, Yoneda, and adjunctions in programmer terms.",
  category: "CS Theory",
  level: "advanced",
  cards,
  tags: [
    "category theory",
    "functors",
    "monads",
    "natural transformations",
    "yoneda",
    "adjunctions",
  ],
  estimatedMinutes: 15,
};
