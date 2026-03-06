import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Why Theorem Provers Matter",
    front:
      "What does theorem proving add beyond testing and ordinary static typing?",
    back: "Testing samples behavior. Theorem proving\naims to establish properties for all cases\nwithin a formal model.\n\nIt is useful when:\n  - invariants are subtle\n  - bugs are very expensive\n  - specifications need machine checking\n  - proof artifacts are worth the effort\n\nThink of it as moving some correctness work\nfrom examples and hope into explicit evidence.",
  },
  {
    topic: "Coq at a Glance",
    front: "What is Coq best known for in programming language work?",
    back: "Coq is an interactive theorem prover based on\ndependent type theory.\n\nIt is widely used for:\n  - mechanized proofs\n  - formalized mathematics\n  - verified compilers and systems\n  - extracting certified programs from proofs\n\nStyle:\n  proof scripts, tactics, and explicit theorem\n  statements are central to the workflow.",
  },
  {
    topic: "Agda at a Glance",
    front: "How does Agda differ in feel from Coq?",
    back: "Agda often feels more like a dependently typed\nprogramming language with interactive proof\nsupport than a tactic-heavy proof assistant.\n\nCommon strengths:\n  - programs and proofs live close together\n  - interactive hole-driven development\n  - rich type-level modeling\n  - educational clarity for proof-as-program ideas\n\nIt often attracts engineers who want elegant\ntype-driven construction rather than mostly\nscripted proof automation.",
  },
  {
    topic: "Idris at a Glance",
    front: "What niche does Idris occupy?",
    back: "Idris focuses on practical dependently typed\nprogramming with a syntax and feel closer to\nmainstream programming languages than many proof\nassistants.\n\nWhy it is interesting:\n  - dependent types for application code\n  - totality checking\n  - state machines and protocols in types\n  - proofs integrated with programming workflow\n\nIt is often the bridge from advanced FP into\nserious theorem-aware software design.",
  },
  {
    topic: "Proof Terms and Programs",
    front: "Why do Coq, Agda, and Idris blur the line between code and proof?",
    back: "In these systems, values can witness logical\nclaims and functions can transform proofs just\nlike data.\n\nThat means:\n  writing a proof often looks like writing a\n  program that inhabits a proposition-shaped type.\n\nThis is the practical face of 'proofs as\nprograms' and 'types as propositions'.",
  },
  {
    topic: "Totality and Termination",
    front:
      "Why are totality and termination important in theorem-oriented languages?",
    back: "If arbitrary nonterminating definitions were\naccepted as proofs, the logic could become\nunsound or much harder to reason about.\n\nSo these systems often track:\n  - termination of recursive definitions\n  - total pattern matching\n  - coverage of cases\n\nThe compiler is not being fussy for sport.\nIt is defending the meaning of proof itself.",
  },
  {
    topic: "Engineering Trade-offs",
    front: "What are the practical costs of using Coq, Agda, or Idris?",
    back: "Costs include:\n  - steep learning curve\n  - proof maintenance during change\n  - longer build and iteration cycles\n  - fewer libraries than mainstream stacks\n  - onboarding difficulty for teams\n\nThe payoff can be huge, but only when the value\nof strong guarantees clearly outweighs the proof\nengineering overhead.",
  },
  {
    topic: "Best Fit Use Cases",
    front: "Where do theorem proving tools fit best in real engineering?",
    back: "Best fits:\n  - compilers and language tooling\n  - cryptographic protocols\n  - kernels, hypervisors, and runtimes\n  - safety-critical systems\n  - core libraries with deep invariants\n\nLess ideal when product speed dominates and the\nteam cannot sustain formal methods discipline.\nFormal proof is powerful, but it is not free.",
  },
];

export const THEOREM_PROVING_WITH_COQ_AGDA_IDRIS: DeckInfo = {
  id: "theorem-proving-with-coq-agda-idris",
  title: "Theorem Proving with Coq, Agda, and Idris",
  description:
    "Formal proof, dependent type theory, totality, and practical trade-offs across Coq, Agda, and Idris.",
  category: "CS Theory",
  level: "staff-principal",
  cards,
  tags: [
    "Coq",
    "Agda",
    "Idris",
    "theorem proving",
    "dependent types",
    "formal methods",
  ],
  estimatedMinutes: 17,
};
