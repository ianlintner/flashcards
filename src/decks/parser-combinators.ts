import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Parser Combinator Model",
    front:
      "What is a parser combinator?\n\nWhy is it a natural FP abstraction?",
    back: "A parser combinator is a small parser value\nthat can be combined with other parsers using\nordinary functions and operators.\n\nTypical view:\n  Parser<A> = input -> Result<(A, rest)>\n\nWhy it fits FP:\n  - parsers are composable values\n  - sequencing is modeled with Applicative or Monad\n  - failure is explicit\n  - grammars can be built declaratively\n\nInstead of hand-writing one giant parser, you\nassemble reusable pieces that mirror the shape\nof the grammar.",
  },
  {
    topic: "Primitive and Composite Parsers",
    front: "What are the core building blocks in a parser combinator library?",
    back: "Primitive parsers usually include:\n  - char / string literal\n  - digit / letter / whitespace\n  - end of input\n  - satisfy(predicate)\n\nComposite combinators often include:\n  - map\n  - choice / orElse\n  - many / some\n  - optional\n  - sepBy / sepBy1\n  - between / surroundedBy\n  - chainl / chainr for precedence\n\nGood libraries let you construct grammars from\nthese few pieces without writing manual cursor\nbookkeeping everywhere.",
  },
  {
    topic: "Applicative vs Monad Parsing",
    front: "When is Applicative parsing enough, and when do you need Monad?",
    back: "Applicative parsing works when later structure\ndoes not depend on earlier parsed values.\n\nGreat for:\n  fixed formats, records, tuples, syntax with\n  known shape.\n\nMonad parsing is needed when future parsing\nchoices depend on earlier results.\n\nExamples:\n  length-prefixed payloads\n  indentation-sensitive grammars\n  context-dependent syntax\n\nPrefer Applicative when possible:\n  it communicates independence and may enable\n  better static analysis or error reporting.",
  },
  {
    topic: "Backtracking and Performance",
    front:
      "Why can parser combinators become slow?\n\nWhat are the usual fixes?",
    back: "Performance problems often come from:\n  - excessive backtracking\n  - ambiguous grammars\n  - allocating many tiny parser closures\n  - poor error context accumulation\n\nTypical fixes:\n  - factor grammar to reduce ambiguity\n  - use lookahead or cut/commit operators\n  - switch hot paths to specialized primitives\n  - profile memory, not just CPU\n\nLesson:\n  parser combinators are elegant, but they are\n  not immune to grammar design mistakes. Beauty\n  and asymptotics still need couples therapy.",
  },
  {
    topic: "Error Reporting",
    front: "What separates toy parser combinators from production-ready ones?",
    back: "Error reporting is a huge separator.\n\nA production parser should track:\n  - current position\n  - expected tokens or productions\n  - context stack\n  - committed vs recoverable failures\n\nWithout this, users get nonsense like:\n  'parse failed somewhere near reality'\n\nGood parser libraries make grammar errors\nlocatable and explain what the parser expected\nso malformed input can be debugged quickly.",
  },
  {
    topic: "Expression Parsing",
    front:
      "How do parser combinator libraries usually handle operator precedence?",
    back: "Common strategies:\n  - precedence climbing\n  - Pratt parsing\n  - chainl / chainr helper combinators\n  - layered grammar levels for precedence tiers\n\nGoal:\n  parse expressions like:\n    a + b * c - d\nwithout ambiguity and with correct associativity.\n\nAssociativity examples:\n  left:  a - b - c = (a - b) - c\n  right: a ^ b ^ c = a ^ (b ^ c)\n\nExpression parsing is where elegant combinators\nmeet the messy real world of actual languages.",
  },
  {
    topic: "Incremental and Streaming Parsing",
    front: "Why do some systems need incremental parser combinators?",
    back: "Some inputs arrive gradually: network frames,\nlogs, REPL sessions, editors, large files.\n\nIncremental parsing matters when you need:\n  - partial results before full input arrives\n  - resumable parser state\n  - bounded memory on large streams\n  - interactive tooling with low latency\n\nA parser that assumes the whole input is in\nmemory may be elegant but unusable for these\nscenarios. Real systems often need both a clean\nAPI and a streaming-friendly runtime model.",
  },
  {
    topic: "When to Use Parser Combinators",
    front:
      "When are parser combinators a great fit, and when should teams consider alternatives?",
    back: "Great fit:\n  - DSLs and config formats\n  - query languages\n  - small to medium custom syntaxes\n  - situations where composability matters\n\nConsider alternatives when:\n  - the grammar is huge and standardized\n  - performance is extremely tight\n  - tooling around parser generators is strong\n  - left recursion handling is central\n\nUse combinators when clarity, testability, and\ncomposability matter more than squeezing every\nlast ounce of parser throughput.",
  },
];

export const PARSER_COMBINATORS: DeckInfo = {
  id: "parser-combinators",
  title: "Parser Combinators",
  description:
    "Composable parsing with applicative and monadic parsers, error handling, precedence, and streaming concerns.",
  category: "Languages",
  level: "advanced",
  cards,
  tags: [
    "parsing",
    "parser combinators",
    "applicative",
    "monad",
    "DSLs",
    "compilers",
  ],
  estimatedMinutes: 15,
};
