import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Operations and Handlers",
    front: "What is the basic model of algebraic effect handlers?",
    back: "A program requests effect operations such as\nread, log, raise, choose, or getState.\nA handler interprets what each operation means\nand how computation resumes afterward.\n\nCore split:\n  operation declaration != implementation\n\nThat separation is the key power.",
  },
  {
    topic: "Resumable Computations",
    front: "Why are resumable continuations central to effect handlers?",
    back: "When an operation is handled, the rest of the\nprogram is captured as a continuation that the\nhandler may resume, transform, resume multiple\ntimes, or not resume at all.\n\nThis makes handlers more expressive than simple\ncallbacks or basic exception mechanisms.",
  },
  {
    topic: "Handlers vs Monads",
    front: "How should engineers compare effect handlers with monad stacks?",
    back: "Monad stacks encode effects via nesting and\ncomposition of effect types.\nHandlers separate effect requests from their\ninterpretation more directly.\n\nHandlers can feel more modular when:\n  - you want multiple interpretations\n  - effect order should be less entangled\n  - resumable behavior matters\n\nMonad stacks often remain simpler when the effect\nset is small and the ecosystem is mature.",
  },
  {
    topic: "Scoped and Local Effects",
    front: "Why do scoped effects make handler design tricky?",
    back: "Some effects are not global one-shot operations.\nThey introduce scope or local semantics, such as:\n  - local environment modification\n  - resource regions\n  - masking interruption\n  - bracketed behavior\n\nThese require handlers that understand not just\none operation, but the structure around a block\nof computation. That is where implementations\nget serious quickly.",
  },
  {
    topic: "Performance Concerns",
    front: "What performance issues show up in effect-handler implementations?",
    back: "Common concerns:\n  - continuation capture overhead\n  - heap allocation for resumptions\n  - optimization difficulty across handlers\n  - interaction with exceptions or async runtime\n\nElegant semantics do not guarantee cheap runtime.\nGood implementations depend on compiler support,\nruntime design, and careful optimization.",
  },
  {
    topic: "Typed Effects and Capabilities",
    front: "How do typed effect systems interact with handlers?",
    back: "Typed effect systems specify which operations\na computation may perform. Handlers then reduce,\ntranslate, or eliminate those effects.\n\nThis gives two benefits:\n  - effect requirements are explicit in types\n  - interpretations are modular and composable\n\nA handled effect can disappear from the type once\nit has been interpreted at the boundary.",
  },
  {
    topic: "Reasoning About Handlers",
    front:
      "What should advanced engineers reason about when using handlers heavily?",
    back: "Key questions:\n  - which effects are in scope here?\n  - which handler interprets them?\n  - does the handler resume once, many times, or never?\n  - what are the ordering and interaction laws?\n  - how does cancellation or failure compose?\n\nWithout crisp answers, handler-heavy code can\nbecome semantically foggy even if it typechecks.",
  },
  {
    topic: "Best Fit and Caution",
    front: "When do effect handlers shine, and when should teams be cautious?",
    back: "They shine in runtimes and languages that want:\n  - modular effect interpretation\n  - structured capabilities\n  - resumable semantics\n  - cleaner alternatives to tangled effect stacks\n\nBe cautious when:\n  - tooling is immature\n  - performance costs are unclear\n  - the team lacks a mental model for continuations\n\nHandlers are powerful, but they are not a free\ncomplexity amnesty program.",
  },
];

export const EFFECT_HANDLERS_IN_DEPTH: DeckInfo = {
  id: "effect-handlers-in-depth",
  title: "Effect Handlers in Depth",
  description:
    "Algebraic operations, resumable continuations, scoped effects, runtime costs, and handler-based design trade-offs.",
  category: "Languages",
  level: "staff-principal",
  cards,
  tags: [
    "effect handlers",
    "algebraic effects",
    "continuations",
    "typed effects",
    "capabilities",
    "runtime design",
  ],
  estimatedMinutes: 16,
};
