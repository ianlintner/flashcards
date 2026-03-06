import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Why Linear Types Exist",
    front:
      "What problem do linear types solve?\n\nWhy are ordinary type systems not enough?",
    back: "Linear types track how many times a value\nmay be used. A linear value must be consumed\nexactly once unless the type says otherwise.\n\nWhy this matters:\n  - resource protocols become enforceable\n  - aliasing is controlled\n  - accidental duplication is prevented\n  - ownership transfer becomes explicit\n\nOrdinary types say what a value is.\nLinear types also constrain how it may be used.",
  },
  {
    topic: "Linear vs Affine vs Unrestricted",
    front: "Compare linear, affine, and unrestricted usage disciplines.",
    back: "Linear:\n  use exactly once.\n\nAffine:\n  use at most once. Discarding is allowed.\n\nUnrestricted:\n  use any number of times. Copying and sharing\n  are permitted freely.\n\nMany real systems combine these categories so\nresource-like values are constrained while plain\nimmutable data stays ergonomic.",
  },
  {
    topic: "Ownership as a Practical Discipline",
    front: "How do ownership types relate to linear typing in practice?",
    back: "Ownership types assign responsibility for a\nvalue's lifetime and mutation rights.\n\nTypical guarantees:\n  - one owner at a time\n  - borrowing rules for temporary access\n  - destruction when ownership ends\n  - no use-after-free or double free\n\nOwnership is often a practical engineering form\nof linear or affine reasoning adapted to real\nruntimes and developer workflows.",
  },
  {
    topic: "Borrowing and Aliasing Control",
    front: "Why are borrowing and alias control central to ownership systems?",
    back: "The hard part is not moving values. It is\nallowing safe temporary access without losing\ncontrol of mutation and lifetime.\n\nBorrowing systems constrain:\n  - who can read\n  - who can write\n  - how long a reference stays valid\n  - whether aliases may coexist\n\nThis prevents the classic trinity of chaos:\nmutable aliasing, dangling references, and\nconcurrency bugs with sharp little teeth.",
  },
  {
    topic: "Resources Beyond Memory",
    front: "Why are linear and ownership types useful beyond memory safety?",
    back: "They model any resource with protocol-like use:\n  - file handles\n  - sockets\n  - DB transactions\n  - locks\n  - capabilities or tokens\n  - GPU buffers\n\nIf a value should not be duplicated casually or\nused after release, linear reasoning is a good\nfit even when garbage collection exists.",
  },
  {
    topic: "Concurrency Benefits",
    front: "How do linear or ownership types help concurrent systems?",
    back: "Concurrency becomes safer when mutation rights\nand sharing are explicit.\n\nBenefits:\n  - fewer data races\n  - easier ownership transfer across tasks\n  - clearer boundaries for mutable state\n  - safer message passing and actor-style APIs\n\nA lot of concurrency pain comes from unclear\nsharing. Ownership systems force that question\nout into the open.",
  },
  {
    topic: "API Design with Linearity",
    front: "How do linear constraints change API design?",
    back: "APIs must make consumption visible.\n\nPatterns include:\n  - builders that are consumed on finalize\n  - transaction objects that cannot be reused\n  - state machines encoded in types\n  - one-shot tokens or capabilities\n\nThis often produces safer APIs, but also makes\ninterfaces more explicit and occasionally less\ncasual than developers from unrestricted worlds\nexpect at first.",
  },
  {
    topic: "When Linear Types Pay Off",
    front: "When should teams seriously consider linear or ownership typing?",
    back: "They pay off when a system is dominated by:\n  - resource correctness\n  - concurrency safety\n  - protocol/state transitions\n  - low-level performance-sensitive components\n  - security-sensitive capability handling\n\nThey may be overkill for simple business logic.\nUse them where incorrect duplication, leaking,\nor reuse is genuinely expensive.",
  },
];

export const LINEAR_TYPES_AND_OWNERSHIP: DeckInfo = {
  id: "linear-types-and-ownership",
  title: "Linear Types and Ownership Types",
  description:
    "Linearity, affine use, ownership, borrowing, alias control, and resource-safe API design.",
  category: "Languages",
  level: "senior-staff",
  cards,
  tags: [
    "linear types",
    "ownership",
    "borrowing",
    "resource safety",
    "concurrency",
    "type systems",
  ],
  estimatedMinutes: 16,
};
