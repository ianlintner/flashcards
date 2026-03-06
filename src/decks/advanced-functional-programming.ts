import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Typeclasses and Ad-Hoc Polymorphism",
    front:
      "What problem do typeclasses solve in FP?\n\nHow do they differ from OO interfaces?",
    back: "Typeclasses express capabilities a type\nsupports, independent of the type's data\ndefinition or inheritance hierarchy.\n\nExamples:\n  Eq<A>      compare equality\n  Ord<A>     ordering\n  Show<A>    rendering\n  Monad<F>   sequencing context\n\nWhy they help:\n  - Decouple behavior from concrete classes\n  - Enable generic algorithms constrained by\n    required capabilities\n  - Compose abstractions through laws\n\nDifference from OO interfaces:\n  OO often dispatches through methods on the\n  object. Typeclasses dispatch through external\n  instances/dictionaries selected by type.\n\nThis supports retroactive modeling:\n  You can define new behavior for existing\n  types without editing the original type.",
  },
  {
    topic: "Functor, Applicative, Monad",
    front:
      "How do Functor, Applicative, and Monad relate?\n\nWhat power does each abstraction add?",
    back: "Functor:\n  map : (A -> B) -> F<A> -> F<B>\n  Lets you transform values inside context.\n\nApplicative:\n  pure : A -> F<A>\n  ap   : F<(A -> B)> -> F<A> -> F<B>\n  Combines independent contextual values.\n\nMonad:\n  flatMap : F<A> -> (A -> F<B>) -> F<B>\n  Allows later steps to depend on earlier\n  results.\n\nRelationship:\n  Monad => Applicative => Functor\n  Each layer adds more sequencing power.\n\nRule of thumb:\n  Use the weakest abstraction that fits.\n  Functor for simple mapping.\n  Applicative for independent composition.\n  Monad when control flow depends on values.\n\nThat keeps APIs more parallelizable and laws\nmore informative.",
  },
  {
    topic: "Monad Laws",
    front:
      "Why do monad laws matter?\n\nState the laws and their practical meaning.",
    back: "Monad laws are what make monadic code\nrefactorable instead of magical ceremony.\n\nLaws:\n  Left identity:\n    pure(a).flatMap(f) = f(a)\n\n  Right identity:\n    m.flatMap(pure) = m\n\n  Associativity:\n    m.flatMap(f).flatMap(g) =\n    m.flatMap(x => f(x).flatMap(g))\n\nPractical meaning:\n  - Insert/remove pure safely\n  - Reassociate pipelines without changing\n    semantics\n  - Trust do/for-comprehension desugaring\n\nIf an abstraction breaks the laws, generic\ncode built for Monads can behave strangely,\noptimizations may fail, and developer intuition\nstarts leaking faster than a poorly handled\nState monad.",
  },
  {
    topic: "Traversable and Sequencing",
    front: "What is Traversable?\n\nWhy is it important for real FP codebases?",
    back: "Traversable captures the pattern of walking\na structure, applying an effectful function,\nand rebuilding the structure in one pass.\n\nSignature idea:\n  traverse : (A -> F<B>) -> T<A> -> F<T<B>>\n  sequence : T<F<A>> -> F<T<A>>\n\nWhy it matters:\n  - Turn a list of validations into one\n    validation producing a list of results\n  - Batch async requests while preserving shape\n  - Compose parsing/decoding with containers\n\nCommon examples:\n  List<Result<A, E>> -> Result<List<A>, E>\n  Option<Task<A>>    -> Task<Option<A>>\n\nTraversable is where abstractions stop looking\nacademic and start deleting large amounts of\nboilerplate from production programs.",
  },
  {
    topic: "Recursion Schemes",
    front:
      "What are recursion schemes?\n\nWhy use them instead of hand-written recursion?",
    back: "Recursion schemes factor recursion into:\n  1. A non-recursive base functor that describes\n     one layer of structure\n  2. Generic operators that fold or unfold it\n\nKey schemes:\n  catamorphism  = generalized fold\n  anamorphism   = generalized unfold\n  hylomorphism  = unfold then fold\n  paramorphism  = fold with access to subdata\n\nWhy use them:\n  - Separate traversal mechanics from business\n    logic\n  - Reuse recursion patterns across ASTs and\n    tree-like data\n  - Make optimization and reasoning easier\n\nBest fit:\n  Compilers, interpreters, query planners,\n  analyzers, and any code manipulating nested\n  syntax or recursive domain models.",
  },
  {
    topic: "Tagless Final vs Free",
    front:
      "Compare tagless-final and free-monad styles\nfor modeling FP programs.",
    back: "Both approaches separate program description\nfrom interpretation, but they do it differently.\n\nFree style:\n  Build an explicit instruction tree.\n  Pros: inspectable, transformable, easy to\n  analyze or optimize.\n  Cons: more boilerplate, slower interpreters.\n\nTagless-final style:\n  Programs are polymorphic over an abstract\n  capability interface.\n  Pros: direct style, good performance, strong\n  type inference in many ecosystems.\n  Cons: less explicit structure to inspect.\n\nUse Free when you need program analysis or\nrewrites. Use tagless-final when ergonomics\nand modular interpreters matter more.\nMany mature systems mix both depending on\nwhere introspection is needed.",
  },
  {
    topic: "Optics",
    front:
      "What are optics in FP?\n\nSummarize lenses, prisms, and traversals.",
    back: "Optics are composable abstractions for\nreading and updating nested immutable data.\n\nLens:\n  Focus on one guaranteed field.\n  Example: user.address.city\n\nPrism:\n  Focus on one variant of a sum type.\n  Example: Payment.Card inside Payment\n\nTraversal:\n  Focus on zero or more targets.\n  Example: every item in cart.lines\n\nWhy optics matter:\n  - Avoid manual copy/update boilerplate\n  - Preserve immutability\n  - Compose deeply nested access paths\n\nThey are especially useful in UIs, config\ntransforms, compilers, and domain models with\nlarge immutable records and unions.",
  },
  {
    topic: "Functional Architecture",
    front:
      "How do advanced FP teams structure applications?\n\nGive a practical architecture template.",
    back: "A common pattern is:\n  1. Pure domain core\n  2. Effectful edges\n  3. Explicit ports/interpreters\n\nTypical layers:\n  Domain: ADTs, business rules, invariants\n  Application: workflows over abstract effects\n  Infrastructure: DB, HTTP, queues, clocks\n\nDesign habits:\n  - Pass dependencies as capabilities, not\n    globals\n  - Keep errors typed and explicit\n  - Encode state machines with ADTs\n  - Test pure logic without mocks\n  - Test interpreters separately at boundaries\n\nResult:\n  Systems become easier to reason about and\nchange because side effects are centralized\nin well-lit places instead of hiding behind\nrandom utility calls in the shadows.",
  },
];

export const ADVANCED_FUNCTIONAL_PROGRAMMING: DeckInfo = {
  id: "advanced-functional-programming",
  title: "Advanced Functional Programming",
  description:
    "Typeclasses, monadic composition, traversal, recursion schemes, optics, and production FP architecture.",
  category: "Languages",
  level: "advanced",
  cards,
  tags: [
    "functional programming",
    "typeclasses",
    "monads",
    "recursion schemes",
    "optics",
    "architecture",
  ],
  estimatedMinutes: 16,
};
