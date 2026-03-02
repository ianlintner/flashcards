import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Lexical Analysis",
    front:
      "What is lexical analysis (scanning)?\n\nWhat are tokens, lexemes,\nand patterns?",
    back: "Lexical analysis: First phase of compilation.\n  Converts source code (character stream)\n  into a stream of tokens.\n\nToken: Category of lexical unit.\n  Examples: IF, ID, NUM, PLUS, LPAREN.\n  Each has a type and optional value.\n\nLexeme: Actual text matched.\n  'count', '42', '+', 'if'.\n\nPattern: Rule describing token form.\n  Usually a regular expression.\n  ID: [a-zA-Z_][a-zA-Z0-9_]*\n  NUM: [0-9]+\n\nLexer (tokenizer, scanner):\n  Input: 'if (x > 5)'\n  Output tokens:\n    IF('if')\n    LPAREN('(')\n    ID('x')\n    GT('>')\n    NUM('5')\n    RPAREN(')')\n\nImplementation:\n  Finite automata (DFA) from regex.\n  Tools: lex, flex, ANTLR.\n  Modern: Hand-written for speed\n    (GCC, Clang, V8).\n\nHandles:\n  - Whitespace/comment removal.\n  - String literals, escape sequences.\n  - Error reporting with line numbers.",
  },
  {
    topic: "Parsing & Grammars",
    front:
      "What is parsing?\n\nExplain context-free grammars\nand parse trees.",
    back: "Parsing: Convert token stream into\na parse tree / AST based on grammar.\n\nContext-Free Grammar (CFG):\n  G = (V, T, P, S)\n  V = non-terminals (Expr, Stmt).\n  T = terminals (tokens: +, NUM, ID).\n  P = production rules.\n  S = start symbol.\n\nExample (arithmetic):\n  Expr -> Expr + Term | Term\n  Term -> Term * Factor | Factor\n  Factor -> ( Expr ) | NUM\n\n  Precedence: * binds tighter than +.\n  Associativity: Left-to-right.\n\nParse tree: Full derivation.\n  Every grammar rule = node.\n\nAST (Abstract Syntax Tree):\n  Simplified tree, no redundant nodes.\n  '2 + 3 * 4' ->\n    Add(Num(2), Mul(Num(3), Num(4)))\n\nParsing strategies:\n  Top-down: Start from S, expand.\n    Recursive descent (LL).\n    LL(1): 1 token lookahead.\n  Bottom-up: Start from tokens, reduce.\n    LR, LALR (yacc, bison).\n    More powerful than LL.\n\n  PEG (Parsing Expression Grammars):\n  Ordered choice, no ambiguity.\n  Tools: PEG.js, tree-sitter.",
  },
  {
    topic: "Semantic Analysis",
    front: "What is semantic analysis?\n\nWhat do type checkers verify?",
    back: "Semantic analysis: Checks meaning\ncorrectness after parsing.\nOperates on AST.\n\nKey tasks:\n\n  Type checking:\n    - Type compatibility (int + float).\n    - Function argument types.\n    - Return type consistency.\n    - Implicit conversions (coercions).\n\n  Symbol table:\n    - Map names -> types, scopes, addresses.\n    - Lookup during name resolution.\n    - Detect undeclared variables.\n    - Detect duplicate declarations.\n\n  Scope checking:\n    - Lexical (static) scoping.\n    - Block scope vs function scope.\n    - Nested scopes: walk up chain.\n\nType systems:\n  Static: Checked at compile time\n    (Java, TypeScript, Rust).\n  Dynamic: Checked at runtime\n    (Python, JavaScript, Ruby).\n  Strong: Few implicit conversions\n    (Python, Rust).\n  Weak: Many implicit conversions\n    (C, JavaScript).\n\n  Gradual typing: Mix static/dynamic\n    (TypeScript, Python with mypy).\n\n  Type inference: Compiler deduces types.\n    Hindley-Milner (ML, Haskell).\n    let x = 5  -> x: int (inferred).\n\nOther checks: Definite assignment,\nreachability, lifetime analysis (Rust).",
  },
  {
    topic: "Intermediate Representations",
    front:
      "What are intermediate\nrepresentations (IR) in compilers?\n\nGive examples.",
    back: "IR: Code form between source AST\nand target machine code.\nEnables optimization and portability.\n\nWhy IR?\n  - Decouple front-end from back-end.\n  - M languages x N targets = M+N instead\n    of M*N compilers.\n  - Optimize at IR level (machine-independent).\n\nCommon IR types:\n\n  Three-Address Code (TAC):\n    x = y op z (at most 3 operands).\n    t1 = a + b\n    t2 = t1 * c\n    x = t2\n\n  Static Single Assignment (SSA):\n    Each variable assigned exactly once.\n    x1 = a + b\n    x2 = x1 * c\n    Use phi-functions at join points:\n    x3 = phi(x1, x2)\n    Simplifies many optimizations.\n    Used by: LLVM, GCC, V8.\n\n  Control Flow Graph (CFG):\n    Nodes = basic blocks (straight-line).\n    Edges = jumps, branches.\n\n  LLVM IR:\n    Typed SSA, human-readable.\n    %r = add i32 %a, %b\n    Platform-independent.\n\n  Bytecode:\n    Java bytecode (JVM).\n    Python .pyc bytecode.\n    WebAssembly (Wasm).\n    Stack-based or register-based.",
  },
  {
    topic: "Optimization Passes",
    front: "What are common compiler\noptimizations?\n\nGive examples of each.",
    back: "Local optimizations (within basic block):\n\n  Constant folding:\n    x = 3 + 5  ->  x = 8.\n\n  Constant propagation:\n    x = 5; y = x + 3  ->  y = 8.\n\n  Dead code elimination:\n    Remove unreachable or unused code.\n\n  Strength reduction:\n    x * 2  ->  x << 1 (shift).\n    x * 8  ->  x << 3.\n\nGlobal optimizations (across blocks):\n\n  Common subexpression elimination:\n    a = b + c; d = b + c\n    ->  t = b + c; a = t; d = t.\n\n  Loop optimizations:\n    Loop-invariant code motion:\n      Move computations outside loop.\n    Loop unrolling:\n      Reduce branch overhead.\n    Loop fusion / fission:\n      Combine or split loops.\n\n  Inlining:\n    Replace function call with\n    function body.\n    Eliminates call overhead.\n    Enables further optimizations.\n\n  Tail call optimization:\n    Reuse stack frame for tail calls.\n    Prevents stack overflow in recursion.\n\nRegister allocation:\n  Graph coloring to assign vars\n  to CPU registers.\n  NP-complete in general.\n  Heuristics work well in practice.",
  },
  {
    topic: "Code Generation",
    front: "How does a compiler generate\nmachine code from IR?",
    back: "Code generation: IR -> target code.\n  Usually assembly or machine code.\n\nKey steps:\n\n  1. Instruction selection:\n     Map IR operations to machine\n     instructions.\n     Tree matching / tiling algorithms.\n     LLVM: TableGen patterns.\n\n  2. Register allocation:\n     Map virtual registers to physical.\n     Graph coloring algorithm.\n     Spill to stack if not enough regs.\n\n  3. Instruction scheduling:\n     Reorder for pipeline efficiency.\n     Avoid hazards and stalls.\n     Consider instruction latency.\n\n  4. Peephole optimization:\n     Small window of instructions.\n     Pattern match and replace.\n     Remove redundant loads/stores.\n\nTarget-specific concerns:\n  x86: Complex instruction set (CISC).\n    Many addressing modes.\n  ARM: Reduced instruction set (RISC).\n    Conditional execution.\n  Wasm: Stack machine, sandboxed.\n\nJIT compilation:\n  Compile at runtime.\n  Profile-guided optimization.\n  Inline caches, speculative optimization.\n  Examples: V8 (JS), HotSpot (Java),\n  PyPy (Python).",
  },
  {
    topic: "Type Systems Deep Dive",
    front:
      "Compare nominal vs structural\ntyping.\n\nWhat are generics and\nvariance?",
    back: "Nominal typing:\n  Types compatible by NAME.\n  class Dog and class Cat are different\n  even if identical structure.\n  Languages: Java, C#, Rust.\n\nStructural typing:\n  Types compatible by SHAPE.\n  If it has the same fields/methods,\n  it matches.\n  Languages: TypeScript, Go (interfaces).\n\nDuck typing (dynamic structural):\n  'If it quacks like a duck...'\n  Languages: Python, Ruby, JavaScript.\n\nGenerics (parametric polymorphism):\n  Type parameters for reusable code.\n  List<T>: List of any element type.\n  fn max<T: Ord>(a: T, b: T) -> T.\n\nVariance (for generics):\n  Covariant: List<Dog> <: List<Animal>.\n    Producer / read-only ('out' in C#).\n  Contravariant: Sink<Animal> <: Sink<Dog>.\n    Consumer / write-only ('in' in C#).\n  Invariant: Neither direction.\n    Mutable containers (Java arrays\n    are covariant -> runtime errors!).\n\nAdvanced type features:\n  Union types: string | number (TS).\n  Intersection: A & B (TS).\n  Dependent types: Types from values\n    (Idris, Coq).\n  Algebraic data types:\n    Sum (enum) + Product (struct).\n    Pattern matching (Rust, Haskell).",
  },
  {
    topic: "Language Theory",
    front: "Describe the Chomsky hierarchy\nof formal languages.",
    back: "Chomsky Hierarchy (4 levels):\n\nType 3: Regular languages.\n  Recognized by: Finite automata (DFA/NFA).\n  Generated by: Regular expressions.\n  Examples: Identifiers, numbers, emails.\n  Limitation: Can't match nested parens.\n\nType 2: Context-free languages.\n  Recognized by: Pushdown automata (PDA).\n  Generated by: CFGs.\n  Examples: Programming language syntax,\n    balanced parentheses, HTML.\n  Limitation: Can't count a^n b^n c^n.\n\nType 1: Context-sensitive languages.\n  Recognized by: Linear-bounded automata.\n  Generated by: CSGs.\n  Examples: a^n b^n c^n,\n    type-checking in some languages.\n\nType 0: Recursively enumerable.\n  Recognized by: Turing machines.\n  Generated by: Unrestricted grammars.\n  Includes undecidable problems.\n\nPractical impact:\n  Lexers use Type 3 (regex -> DFA).\n  Parsers use Type 2 (CFG -> PDA).\n  Semantic analysis may need Type 1+.\n  Some language features (C++ templates)\n  are Turing-complete!\n\nPumping lemma:\n  Proves a language is NOT regular\n  or NOT context-free.",
  },
];

export const COMPILER_DESIGN: DeckInfo = {
  id: "compiler-design",
  title: "Compiler Design & Language Theory",
  description:
    "Lexing, parsing, semantic analysis, IRs, optimization, code generation, type systems, and the Chomsky hierarchy.",
  category: "CS Theory",
  level: "advanced",
  cards,
  tags: ["compilers", "parsing", "type systems", "grammars", "optimization"],
  estimatedMinutes: 12,
};
