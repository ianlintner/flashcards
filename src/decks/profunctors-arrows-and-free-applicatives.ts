import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Why These Abstractions Exist",
    front: "Why do profunctors, arrows, and free applicatives exist at all?",
    back: "They capture composition patterns that are\nricher than plain functions but weaker or more\nstructured than full monads.\n\nThey matter when you need:\n  - bidirectional mapping or transformation\n  - static analysis of effectful structure\n  - compositional workflows with extra wiring\n  - interpretable program descriptions\n\nThey are advanced because the problems they\nsolve are advanced, not because category theory\nsecretly enjoys jump scares.",
  },
  {
    topic: "Profunctor Intuition",
    front: "What is a profunctor in programmer terms?",
    back: "A profunctor is contravariant in its input\nand covariant in its output.\n\nSignature intuition:\n  dimap : (A2 -> A1) -> (B1 -> B2) -> P<A1, B1> -> P<A2, B2>\n\nWhere functors map outputs, profunctors can\nremap both the consumed side and produced side.\n\nCommon uses:\n  optics, parsers/printers, transformations,\n  bidirectional data flows.",
  },
  {
    topic: "Arrows vs Monads",
    front: "How should engineers compare arrows and monads?",
    back: "Monads model value-dependent sequencing.\nArrows model structured computation pipelines\nwith explicit combinators for wiring inputs and\noutputs.\n\nArrows are useful when you want:\n  - composition with extra static structure\n  - first/second style parallel wiring\n  - analysis or optimization of the pipeline\n  - less freedom than monads, but more insight\n\nUse monads when later steps depend on earlier\nvalues. Use arrows when the dataflow structure\nitself is important.",
  },
  {
    topic: "Arrow Combinators",
    front: "What are the key arrow combinators to understand?",
    back: "Important concepts:\n  arr      lift a pure function\n  compose  chain arrows\n  first    run on first component of a pair\n  second   run on second component\n  split    run arrows in parallel over parts\n\nThese combinators make dataflow explicit.\nThat explicitness is why arrows often show up\nin parsing, FRP, and structured effect systems.",
  },
  {
    topic: "Free Applicative Intuition",
    front: "What is a free applicative, and why is it useful?",
    back: "A free applicative builds an applicative\nstructure from a base functor while preserving\nstatic knowledge of the computation graph.\n\nWhy useful:\n  - command-line parsers\n  - form descriptions\n  - config/schema declarations\n  - validation plans\n  - analyzable interpretable DSLs\n\nBecause the structure is applicative rather than\nmonadic, independent parts stay visible. That\nmakes interpretation, analysis, and optimization\noften easier.",
  },
  {
    topic: "Static Analysis Benefits",
    front: "Why are free applicatives attractive for analyzable DSLs?",
    back: "Monadic descriptions can hide future structure\nbehind previous results. Free applicatives keep\nindependent structure explicit from the start.\n\nThat allows libraries to:\n  - list required inputs ahead of time\n  - generate docs or UIs\n  - validate schemas before execution\n  - optimize independent branches\n\nThis is why the weakest abstraction that works\nis often the most useful one.",
  },
  {
    topic: "How They Connect",
    front:
      "How do profunctors, arrows, and free applicatives connect conceptually?",
    back: "They all trade some expressive freedom for\nmore structure that libraries can exploit.\n\nProfunctors: map both sides of a transformation.\nArrows: encode structured dataflow composition.\nFree applicatives: preserve independent static\nshape for interpretation and analysis.\n\nCommon theme:\n  lawful composition with more visible program\n  structure than raw monadic sequencing.",
  },
  {
    topic: "When to Reach for Them",
    front:
      "When should a production engineer actually reach for these abstractions?",
    back: "Reach for them when your problem cares about:\n  - bidirectional structure\n  - analyzable workflows\n  - compositional dataflow\n  - schema or UI generation\n  - preserving independence of steps\n\nAvoid them when ordinary functions, applicatives,\nor monads already solve the problem clearly.\nAdvanced abstractions should remove complexity,\nnot decorate it.",
  },
];

export const PROFUNCTORS_ARROWS_AND_FREE_APPLICATIVES: DeckInfo = {
  id: "profunctors-arrows-and-free-applicatives",
  title: "Profunctors, Arrows, and Free Applicatives",
  description:
    "Advanced compositional abstractions for analyzable workflows, dataflow structure, and bidirectional mappings.",
  category: "CS Theory",
  level: "staff-principal",
  cards,
  tags: [
    "profunctors",
    "arrows",
    "free applicatives",
    "category theory",
    "DSLs",
    "optics",
  ],
  estimatedMinutes: 17,
};
