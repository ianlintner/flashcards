import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "What Denotational Semantics Is",
    front:
      "What is denotational semantics?\n\nGive the programmer-friendly version.",
    back: "Denotational semantics assigns a mathematical\nmeaning to each program phrase by mapping syntax\ninto semantic objects.\n\nIdea:\n  meaning(expr) = denotation in some model\n\nGoal:\n  explain what programs mean compositionally,\n  not just how they execute step by step.\n\nWhy programmers care:\n  it gives a precise language for reasoning\n  about equivalence, abstraction, effects, and\n  correctness of interpreters and compilers.",
  },
  {
    topic: "Compositionality",
    front: "Why is compositionality the heart of denotational semantics?",
    back: "Compositionality means the meaning of a larger\nprogram is determined from the meanings of its\nparts and how they are combined.\n\nWhy that matters:\n  - local reasoning becomes possible\n  - refactoring laws can be justified\n  - compiler rewrites can preserve meaning\n  - abstractions can be explained precisely\n\nIn FP this is especially natural because pure\nexpressions and typed composition already push\ncode toward compositional structure.",
  },
  {
    topic: "Operational vs Denotational",
    front: "How does denotational semantics differ from operational semantics?",
    back: "Operational semantics explains how a program\nexecutes, usually through evaluation rules or\nabstract machines.\n\nDenotational semantics explains what a program\nmeans by mapping it to mathematical objects.\n\nOperational asks:\n  what steps occur?\nDenotational asks:\n  what meaning does this phrase denote?\n\nBoth matter. Operational models execution.\nDenotational models equivalence and abstraction.\nStrong language design usually benefits from\nunderstanding both views.",
  },
  {
    topic: "Domains and Bottom",
    front: "Why do denotational models often use domains and bottom values?",
    back: "Real languages include nontermination, partial\ninformation, recursion, and effects. Simple set\nmodels are often too weak for that.\n\nDomain theory introduces ordered structures that\ncan model approximation and fixed points.\n\nBottom, often written as bottom, represents\nundefined computation, nontermination, or least\ninformation.\n\nThis lets recursive definitions gain meaning\nthrough limits of approximations rather than\nhand-waving and hopeful comments.",
  },
  {
    topic: "Fixed Points and Recursion",
    front: "How does denotational semantics explain recursion?",
    back: "Recursive definitions are often interpreted as\nfixed points of semantic functions.\n\nIf F describes one unfolding step of a recursive\ndefinition, then the recursive meaning is a\nfixed point where:\n  F(x) = x\n\nUnder suitable conditions, a least fixed point\ngives the intended meaning.\n\nThis provides a principled explanation for why\nrecursive programs can be assigned semantics\nwithout pretending they are somehow finite.",
  },
  {
    topic: "Effects in Denotational Models",
    front: "How are side effects represented denotationally?",
    back: "Effects require richer semantic models than\nsimple pure functions.\n\nCommon strategies include modeling:\n  - state as state transformers\n  - exceptions as sums or lifted domains\n  - nondeterminism as sets or powerdomains\n  - I/O through monadic or interaction models\n\nThis is one reason monads became influential in\nprogramming language semantics before they were\npopularized as everyday FP abstractions.",
  },
  {
    topic: "Full Abstraction",
    front: "What is full abstraction, and why is it a big deal?",
    back: "A semantics is fully abstract when semantic\nequivalence matches observable program\nequivalence exactly.\n\nIn plain language:\n  two programs mean the same denotationally\n  iff no context in the language can tell them\n  apart operationally.\n\nWhy important:\n  it shows the model captures exactly the\n  distinctions programmers can observe, not too\n  many and not too few.\n\nAchieving full abstraction is often hard and\nreveals deep truths about the language.",
  },
  {
    topic: "Why Engineers Should Care",
    front:
      "Why should an advanced engineer care about denotational semantics in practice?",
    back: "You may not write domain equations daily, but\ndenotational thinking improves how you design\nAPIs, reason about refactors, and separate pure\nmeaning from execution strategy.\n\nIt is especially useful for:\n  - compiler and interpreter work\n  - DSL design\n  - effect modeling\n  - proving transformations correct\n  - understanding when abstractions preserve\n    meaning versus merely looking tidy\n\nIt is the difference between 'this seems fine'\nand 'we know what this program denotes'.",
  },
];

export const DENOTATIONAL_SEMANTICS: DeckInfo = {
  id: "denotational-semantics",
  title: "Denotational Semantics",
  description:
    "Compositional meaning, domains, fixed points, effects, full abstraction, and why semantics matters for engineers.",
  category: "CS Theory",
  level: "staff-principal",
  cards,
  tags: [
    "semantics",
    "denotational semantics",
    "domain theory",
    "fixed points",
    "PL theory",
    "compilers",
  ],
  estimatedMinutes: 16,
};
