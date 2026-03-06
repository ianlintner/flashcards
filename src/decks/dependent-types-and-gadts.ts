import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Why GADTs Exist",
    front: "What problem do GADTs solve beyond normal algebraic data types?",
    back: "GADTs let constructors refine the result\ntype more precisely than ordinary ADTs.\n\nWith ordinary ADTs, every constructor returns\nthe same outer type shape. With GADTs, each\nconstructor can encode richer type information.\n\nWhy useful:\n  - represent typed syntax trees\n  - encode protocol states\n  - eliminate impossible runtime cases\n  - move invariants into the compiler\n\nThey are especially valuable when the data\nshape itself carries proof-like information.",
  },
  {
    topic: "GADT Example Mental Model",
    front: "How do GADTs help build typed expression trees?",
    back: "Classic example:\n  Expr<A>\n  IntLit  : Int -> Expr<Int>\n  BoolLit : Bool -> Expr<Bool>\n  Add     : Expr<Int> -> Expr<Int> -> Expr<Int>\n  If      : Expr<Bool> -> Expr<A> -> Expr<A> -> Expr<A>\n\nNow eval can have type:\n  eval : Expr<A> -> A\n\nBenefit:\n  you cannot build nonsense like Add(BoolLit, IntLit)\n  because the constructors themselves enforce\n  typing rules of the language being modeled.",
  },
  {
    topic: "Existentials and Pattern Matching",
    front: "Why do GADTs often feel different during pattern matching?",
    back: "When pattern matching on a GADT, the compiler\nlearns extra facts from the matched constructor.\n\nExample:\n  matching IntLit refines A to Int\n  matching BoolLit refines A to Bool\n\nThis refinement is the superpower.\nIt means case analysis can recover precise\ntype information that was abstract before.\n\nIt also means type inference can become more\nsubtle, and explicit annotations are often\nneeded so the compiler knows which facts to\ncarry through the match.",
  },
  {
    topic: "Dependent Types Intuition",
    front: "What are dependent types in programmer terms?",
    back: "Dependent types let types depend on values.\n\nExamples of the idea:\n  Vector<A, n>     list with length n\n  Matrix<m, n>     dimensions in the type\n  SortedList<A>    evidence of sortedness\n\nThis allows programs to encode stronger\ncorrectness properties statically.\n\nInstead of saying 'this function probably\nreturns a non-empty list', you can express\nthat property directly in the type itself.",
  },
  {
    topic: "Proofs as Programs",
    front:
      "Why do people say dependent types blur the line between programs and proofs?",
    back: "Under Curry-Howard style correspondence,\ntypes can be viewed as propositions and values\nas proofs of those propositions.\n\nDependent typing extends this by allowing very\nrich propositions about program behavior.\n\nImplication for engineering:\n  some correctness arguments can move from\n  comments, tests, and tribal knowledge into\n  machine-checked code artifacts.\n\nThat does not remove the need for design or\nvalidation, but it can dramatically shrink the\nspace of legal bugs.",
  },
  {
    topic: "Trade-offs of Dependently Typed Design",
    front:
      "What are the costs of using dependent types or heavy GADT encodings?",
    back: "Costs include:\n  - steeper learning curve\n  - more annotations and proof plumbing\n  - slower compile times in some systems\n  - harder error messages\n  - APIs that can intimidate non-experts\n\nBest use cases:\n  - compilers and interpreters\n  - protocol/state machines\n  - security-sensitive core logic\n  - theorem proving or verification\n\nUse rich types when the value of impossible\nstates being impossible clearly outweighs the\ncognitive cost to the team.",
  },
  {
    topic: "Phantom Types and Indexed Types",
    front:
      "How are phantom types and indexed types related to GADTs and dependent types?",
    back: "Phantom types add type parameters that do not\naffect runtime representation but carry compile\ntime meaning.\n\nExamples:\n  Connection<Open> vs Connection<Closed>\n  Quantity<Meters> vs Quantity<Seconds>\n\nIndexed types generalize the idea by tracking\nstate or properties in type parameters.\n\nThese techniques are often the practical bridge\nbetween mainstream generics and full dependent\ntype systems.",
  },
  {
    topic: "When to Reach for GADTs",
    front: "When should an advanced engineer actually reach for GADTs?",
    back: "Reach for GADTs when:\n  - plain ADTs cannot express the invariants\n  - runtime tag checks keep leaking everywhere\n  - typed interpreters or compilers are central\n  - protocol or workflow states matter deeply\n\nAvoid them when:\n  - a simpler ADT plus validation is enough\n  - the team will struggle to maintain them\n  - the type machinery overwhelms the domain\n\nA GADT is a precision instrument, not the\ndefault answer to every enum with ambition.",
  },
];

export const DEPENDENT_TYPES_AND_GADTS: DeckInfo = {
  id: "dependent-types-and-gadts",
  title: "Dependent Types and GADTs",
  description:
    "GADTs, indexed types, dependent typing intuition, proofs as programs, and when rich type encodings pay off.",
  category: "CS Theory",
  level: "senior-staff",
  cards,
  tags: [
    "GADTs",
    "dependent types",
    "phantom types",
    "type safety",
    "verification",
    "interpreters",
  ],
  estimatedMinutes: 16,
};
