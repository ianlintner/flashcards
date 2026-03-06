import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Why Effect Systems Exist",
    front:
      "What problem does an effect system solve?\n\nWhy are types for values alone not enough?",
    back: "A normal type tells you what value comes\nback. An effect system also tells you what\nkind of computation happened while producing it.\n\nExamples of effects:\n  I/O, state mutation, exceptions, logging,\n  randomness, async, cancellation, resources.\n\nWhy value types alone are insufficient:\n  readConfig() : Config\n  and\n  pureDefault() : Config\n  return the same value type, but one touches\n  the outside world and can fail differently.\n\nEffect systems make those behavioral contracts\nvisible in types, improving reasoning, safety,\nrefactoring, and composition.",
  },
  {
    topic: "Pure Core, Effectful Edge",
    front:
      "Explain the 'pure core, effectful edge' architecture in FP systems.",
    back: "The idea:\n  Keep business logic pure whenever possible.\n  Push I/O and runtime interaction to the edges.\n\nTypical flow:\n  inputs -> parse -> pure domain logic -> plan\n  -> interpret plan with DB/HTTP/files/logging\n\nBenefits:\n  - Core logic is testable without mocks\n  - Effects are centralized and explicit\n  - Refactors become safer\n  - Alternate interpreters are easy to swap\n\nThis pattern is not 'never do side effects'.\nIt is 'make them obvious, controlled, and\nseparate from the rules of the business'.",
  },
  {
    topic: "Typed Errors vs Exceptions",
    front:
      "Why do FP effect systems prefer typed errors over unchecked exceptions?",
    back: "Unchecked exceptions hide failure paths in\ncontrol flow. Typed errors make them part of\nthe function contract.\n\nExamples:\n  Result<A, E>\n  Either<E, A>\n  Effect<R, E, A>\n\nBenefits of typed errors:\n  - Callers know what can fail\n  - Recovery logic is composable\n  - Exhaustive handling becomes possible\n  - Hidden throw paths are reduced\n\nTrade-off:\n  Error types can grow large or awkward if the\n  design is not disciplined. Mature codebases\n  group domain errors carefully and convert\n  infrastructure errors at boundaries.",
  },
  {
    topic: "Algebraic Effects and Handlers",
    front:
      "What are algebraic effects and effect handlers?\n\nWhy are they interesting?",
    back: "Algebraic effects describe requested operations\nwithout fixing how they are implemented.\nHandlers decide what those operations mean.\n\nExample operations:\n  askEnv\n  log\n  getState / putState\n  raiseError\n  fork\n\nWhy interesting:\n  - Separate effect declaration from execution\n  - Handlers can interpret the same program in\n    different ways: production, test, replay\n  - Effects compose more flexibly than deeply\n    nested monad-transformer stacks in some\n    ecosystems\n\nConceptually, programs request capabilities and\nhandlers provide semantics for them.",
  },
  {
    topic: "Capabilities and Environments",
    front: "How do capability-based effect systems model dependencies?",
    back: "Instead of reaching into globals, functions\nstate the capabilities they require.\n\nExample environment requirements:\n  Clock\n  Random\n  Logger\n  UserRepo\n  PaymentGateway\n\nType sketch:\n  program : Effect<Clock | Logger | UserRepo, E, A>\n\nWhy it helps:\n  - Dependencies are explicit\n  - Tests can provide lightweight interpreters\n  - Unused requirements are visible\n  - Large systems compose through declared needs\n\nThis is dependency injection with better type\nprecision and much less ceremonial XML trauma.",
  },
  {
    topic: "Resource Safety and Bracketing",
    front:
      "How do effect systems provide resource safety?\n\nExplain acquire/use/release patterns.",
    back: "Resource safety means files, sockets, locks,\nand DB connections are released correctly even\nwhen errors, interruption, or cancellation occur.\n\nStandard pattern:\n  bracket(acquire, use, release)\n\nGuarantee:\n  If acquire succeeds, release runs exactly once\n  after use, regardless of success or failure.\n\nThis generalizes try/finally into a reusable\ncombinator with stronger semantics.\n\nWhy crucial:\n  In effectful concurrent systems, forgetting\n  cleanup causes leaks, deadlocks, or corrupted\n  state. Resource-safe abstractions make correct\n  cleanup the default rather than a heroic act.",
  },
  {
    topic: "Concurrency, Cancellation, Interruption",
    front: "What should a modern effect runtime expose for concurrency?",
    back: "A serious effect runtime usually models:\n  - fibers/lightweight tasks\n  - structured concurrency\n  - cancellation/interruption\n  - racing and parallel composition\n  - timeout and retry policies\n\nWhy typed effects help here:\n  Concurrency is not just 'run async somehow'.\n  Programs need predictable cleanup, interrupt\n  safety, and well-scoped child lifecycles.\n\nStructured concurrency idea:\n  Child tasks belong to a parent scope. If the\n  parent fails or is cancelled, children are\n  managed predictably instead of escaping into\n  the void like tiny operational goblins.",
  },
  {
    topic: "Effect Systems in Practice",
    front:
      "How should teams evaluate whether an effect system is worth the complexity?",
    back: "Effect systems shine when a codebase has:\n  - many side-effecting integrations\n  - strict correctness/reliability needs\n  - concurrent workflows\n  - desire for explicit contracts and testing\n\nThey may be overkill when:\n  - the app is small and mostly CRUD\n  - the team lacks buy-in on FP concepts\n  - simpler conventions already work well\n\nAdoption strategy:\n  1. Start with pure domain modeling\n  2. Introduce typed errors and small effects\n  3. Add structured runtime features only where\n     complexity actually exists\n\nUse them to buy clarity and safety, not as an\nexcuse to turn every form submit into a PhD.",
  },
];

export const EFFECT_SYSTEMS: DeckInfo = {
  id: "effect-systems",
  title: "Effect Systems and Typed Effects",
  description:
    "Typed effects, algebraic effects, capabilities, typed errors, resource safety, and concurrent effect runtimes.",
  category: "Languages",
  level: "senior-staff",
  cards,
  tags: [
    "effects",
    "typed errors",
    "algebraic effects",
    "capabilities",
    "resource safety",
    "concurrency",
  ],
  estimatedMinutes: 15,
};
