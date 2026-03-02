import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Propositional Logic",
    front: "What are the basic logical\nconnectives and truth tables?",
    back: "Connectives:\n  NOT (negation):  !p\n    T -> F,  F -> T\n\n  AND (conjunction): p && q\n    T,T->T  T,F->F  F,T->F  F,F->F\n\n  OR (disjunction):  p || q\n    T,T->T  T,F->T  F,T->T  F,F->F\n\n  XOR (exclusive or): p ^ q\n    T,T->F  T,F->T  F,T->T  F,F->F\n\n  IMPLIES (conditional): p -> q\n    T,T->T  T,F->F  F,T->T  F,F->T\n    'False implies anything is true.'\n\n  IFF (biconditional): p <-> q\n    T,T->T  T,F->F  F,T->F  F,F->T\n\nKey equivalences:\n  De Morgan's Laws:\n    !(p && q) = !p || !q\n    !(p || q) = !p && !q\n\n  Contrapositive:\n    (p -> q) = (!q -> !p)\n\n  Implication:\n    (p -> q) = (!p || q)\n\nUsed in: Boolean logic, circuit design,\nprogram verification, SQL WHERE clauses.",
  },
  {
    topic: "Set Theory Basics",
    front: "Define the fundamental set\noperations and their properties.",
    back: "Operations:\n  Union: A U B = {x : x in A or x in B}\n  Intersection: A ^ B = {x : x in A and x in B}\n  Difference: A - B = {x : x in A, x not in B}\n  Complement: A' = {x : x not in A}\n  Symmetric Difference: A (+) B =\n    (A - B) U (B - A)\n\nCardinality:\n  |A| = number of elements.\n  |A U B| = |A| + |B| - |A ^ B|\n  (Inclusion-Exclusion Principle)\n\nPower Set: P(A) = all subsets of A.\n  |P(A)| = 2^|A|\n  P({1,2}) = {{}, {1}, {2}, {1,2}}\n\nCartesian Product: A x B =\n  {(a,b) : a in A, b in B}\n  |A x B| = |A| * |B|\n\nProperties:\n  Commutative: A U B = B U A\n  Associative: (A U B) U C = A U (B U C)\n  Distributive:\n    A ^ (B U C) = (A ^ B) U (A ^ C)\n  De Morgan's:\n    (A U B)' = A' ^ B'\n    (A ^ B)' = A' U B'\n\nUsed in: Databases (SQL JOINs),\nprobability, type systems.",
  },
  {
    topic: "Graph Theory Basics",
    front:
      "Define key graph theory terms:\ndegree, path, cycle, tree,\nbipartite, planar.",
    back: "Degree: Number of edges at a vertex.\n  Handshaking lemma:\n  Sum of all degrees = 2 * |edges|.\n\nPath: Sequence of vertices connected\n  by edges, no repeated vertices.\nCycle: Path where first = last vertex.\nSimple Graph: No self-loops, no multi-edges.\n\nConnectedness:\n  Connected: Path between any two vertices.\n  Strongly connected (directed): Path\n  between any two in both directions.\n\nTree: Connected acyclic graph.\n  |edges| = |vertices| - 1.\n  Unique path between any two nodes.\n  Spanning tree: Subgraph that is a tree\n  including all vertices.\n\nBipartite: Vertices split into 2 sets.\n  Edges only between sets, not within.\n  2-colorable. No odd-length cycles.\n\nPlanar: Can be drawn without edge crossings.\n  Euler's formula: V - E + F = 2\n  (V=vertices, E=edges, F=faces).\n  K5 and K3,3 are not planar.\n\nEulerian path: Visit every edge once.\n  Exists iff 0 or 2 odd-degree vertices.\nHamiltonian path: Visit every vertex once.\n  NP-complete to determine.",
  },
  {
    topic: "Combinatorics",
    front: "What are permutations and\ncombinations?\n\nGive the key formulas.",
    back: "Permutations (order matters):\n  P(n, k) = n! / (n-k)!\n  'Choose k from n, order matters.'\n  P(5, 3) = 60\n\nCombinations (order doesn't matter):\n  C(n, k) = n! / (k! * (n-k)!)\n  'Choose k from n, order irrelevant.'\n  C(5, 3) = 10\n\nWith repetition:\n  Permutations: n^k\n  (k items, n choices each)\n\n  Combinations: C(n+k-1, k)\n  (Stars and bars)\n\nUseful identities:\n  C(n, k) = C(n, n-k)\n  C(n, 0) = C(n, n) = 1\n  C(n, k) = C(n-1, k-1) + C(n-1, k)\n  (Pascal's triangle)\n\nPigeonhole Principle:\n  If n items in m boxes and n > m,\n  at least one box has > 1 item.\n\nBinomial Theorem:\n  (a + b)^n = Sum C(n,k) * a^(n-k) * b^k\n\nCS applications:\n  Hash collisions (pigeonhole).\n  Algorithm counting.\n  Probability calculations.\n  Coding interview math problems.",
  },
  {
    topic: "Number Theory for CS",
    front: "What number theory concepts are\nessential for computer science?",
    back: "Modular Arithmetic:\n  a mod n = remainder of a / n.\n  (a + b) mod n = ((a mod n) + (b mod n)) mod n\n  (a * b) mod n = ((a mod n) * (b mod n)) mod n\n  Used in: Hashing, cryptography.\n\nGCD (Greatest Common Divisor):\n  Euclidean algorithm:\n    gcd(a, b) = gcd(b, a mod b)\n    gcd(a, 0) = a\n  Time: O(log(min(a,b))).\n\nPrime Numbers:\n  Fundamental theorem of arithmetic:\n  Every integer > 1 = unique product of primes.\n  Sieve of Eratosthenes: O(n log log n).\n  Primality test: Trial division O(sqrt(n)).\n  Miller-Rabin: Probabilistic, fast.\n\nFermat's Little Theorem:\n  a^(p-1) = 1 (mod p) if p is prime.\n  Used in: RSA, modular exponentiation.\n\nEuler's Totient:\n  phi(n) = count of integers 1..n\n  coprime to n.\n  phi(p) = p - 1 for prime p.\n\nChinese Remainder Theorem:\n  Solve system of modular equations.\n\nUsed in: RSA encryption, hashing,\nrandom number generators, checksums.",
  },
  {
    topic: "Recurrence Relations",
    front:
      "How do you solve recurrences\nin algorithm analysis?\n\nExplain the Master Theorem.",
    back: "Recurrence: Expressing T(n) in terms\nof T(smaller inputs).\n\nCommon recurrences:\n  T(n) = T(n-1) + O(1)  ->  O(n)\n  T(n) = T(n-1) + O(n)  ->  O(n^2)\n  T(n) = 2T(n/2) + O(n) ->  O(n log n)\n  T(n) = 2T(n/2) + O(1) ->  O(n)\n  T(n) = T(n/2) + O(1)  ->  O(log n)\n\nMaster Theorem:\n  For T(n) = aT(n/b) + O(n^d):\n\n  Case 1: d < log_b(a)  -> O(n^(log_b(a)))\n    Work dominated by leaves.\n\n  Case 2: d = log_b(a)  -> O(n^d * log n)\n    Work evenly distributed.\n\n  Case 3: d > log_b(a)  -> O(n^d)\n    Work dominated by root.\n\nExamples:\n  Merge sort: a=2, b=2, d=1.\n    log_2(2) = 1 = d. Case 2: O(n log n).\n\n  Binary search: a=1, b=2, d=0.\n    log_2(1) = 0 = d. Case 2: O(log n).\n\n  Strassen: a=7, b=2, d=2.\n    log_2(7) ~= 2.81 > 2. Case 1: O(n^2.81).\n\nRecursion tree: Draw tree of calls,\nsum work at each level.",
  },
  {
    topic: "Finite Automata",
    front:
      "What are DFAs and NFAs?\n\nHow do they relate to\nregular expressions?",
    back: "DFA (Deterministic Finite Automaton):\n  5-tuple: (Q, Sigma, delta, q0, F)\n  Q: Finite set of states.\n  Sigma: Input alphabet.\n  delta: Q x Sigma -> Q (one transition).\n  q0: Start state.\n  F: Accept states.\n  Exactly ONE path for any input.\n\nNFA (Nondeterministic FA):\n  delta: Q x Sigma -> P(Q) (set of states).\n  Multiple transitions or none.\n  Epsilon transitions (free moves).\n  Accepts if ANY path leads to accept.\n\nKey theorem: DFA = NFA in power.\n  Every NFA can be converted to DFA.\n  Subset construction algorithm.\n  But DFA may have 2^n states.\n\nRegular Expressions:\n  Regex = exactly the languages DFA/NFA accept.\n  Kleene's Theorem: RegEx <-> DFA <-> NFA.\n\nOperations preserving regularity:\n  Union, concatenation, Kleene star,\n  intersection, complement.\n\nPumping Lemma (regularity disproof):\n  If L is regular, long enough strings\n  have a pumpable middle section.\n  Used to prove: {a^n b^n} is NOT regular.\n\nUsed in: Compilers (lexing), text search,\nnetwork protocols, input validation.",
  },
  {
    topic: "Computational Complexity",
    front:
      "What are the key complexity classes?\n\nDescribe P, NP, NP-hard, NP-complete.",
    back: "P: Problems solvable in polynomial time.\n  O(n^k) for some constant k.\n  Examples: Sorting, shortest path,\n  matrix multiplication.\n\nNP: Problems verifiable in polynomial time.\n  Given a solution, can CHECK it quickly.\n  Examples: SAT, graph coloring,\n  subset sum, traveling salesman.\n\nP subset of NP? Yes.\n  If you can solve it fast, you can\n  verify it fast.\n\nP = NP? Open problem (Millennium Prize).\n  Most believe P != NP.\n\nNP-hard: At least as hard as any NP problem.\n  Every NP problem reduces to it.\n  May not be in NP (may not be verifiable).\n\nNP-complete: NP-hard AND in NP.\n  Hardest problems in NP.\n  Examples: SAT, 3-coloring, TSP (decision),\n  vertex cover, Hamiltonian path.\n\nReductions:\n  Problem A reduces to problem B:\n  Transform A's input to B's input in poly time.\n  If B is easy, A is easy.\n  If A is hard, B is hard.\n\nCook-Levin: SAT is NP-complete.\n  First NP-complete problem proven.\n  All others reduce from SAT.\n\nPractical: Use approximation algorithms,\nheuristics, or special-case solutions.",
  },
  {
    topic: "Information Theory Basics",
    front:
      "What is Shannon entropy?\n\nHow does it relate to data compression?",
    back: "Shannon Entropy:\n  H(X) = -Sum p(x) * log2(p(x))\n  Measures average information content.\n  Units: bits.\n\n  Fair coin: H = -2 * (0.5 * log2(0.5))\n           = 1 bit (max uncertainty).\n  Biased coin (90/10):\n    H = -(0.9*log2(0.9) + 0.1*log2(0.1))\n    ~= 0.47 bits (less surprise).\n\nData compression:\n  Entropy = theoretical minimum bits\n  needed per symbol on average.\n  No lossless compression can beat it.\n\n  Huffman coding:\n    Frequent symbols -> short codes.\n    Rare symbols -> long codes.\n    Approaches entropy.\n\n  Arithmetic coding:\n    Encodes entire message as one number.\n    Can exceed Huffman efficiency.\n\nChannel capacity (Shannon):\n  C = B * log2(1 + S/N)\n  B = bandwidth, S/N = signal-to-noise.\n  Max error-free data rate.\n\nKullback-Leibler divergence:\n  KL(P || Q) = Sum p(x) * log(p(x)/q(x))\n  Measures difference between distributions.\n  Used in: ML loss functions, VAEs.\n\nUsed in: Compression, ML, cryptography,\ncommunication systems.",
  },
  {
    topic: "Computability Theory",
    front:
      "What is the Halting Problem?\n\nWhat does it mean for a problem\nto be undecidable?",
    back: "Halting Problem:\n  Given a program P and input I,\n  does P halt (finish) on I?\n\nProof of undecidability (by contradiction):\n  Assume HALT(P, I) exists.\n  Build PARADOX(P):\n    if HALT(P, P): loop forever.\n    else: halt.\n  Run PARADOX(PARADOX):\n    If it halts -> HALT says it loops.\n    If it loops -> HALT says it halts.\n  Contradiction! HALT cannot exist.\n\nDecidable: A Turing machine always\n  halts and gives correct yes/no.\n\nSemi-decidable (recognizable):\n  Halts and says 'yes' for yes-instances.\n  May loop forever for no-instances.\n  Halting problem is semi-decidable.\n\nUndecidable: No algorithm can solve it\n  for ALL inputs.\n\nOther undecidable problems:\n  - Rice's Theorem: Any non-trivial\n    property of programs is undecidable.\n  - Post Correspondence Problem.\n  - Kolmogorov complexity.\n  - Equivalence of two programs.\n\nChurch-Turing Thesis:\n  Turing machines capture all\n  'effectively computable' functions.\n  Lambda calculus = Turing machines.",
  },
];

export const DISCRETE_MATH_CS: DeckInfo = {
  id: "discrete-math-cs",
  title: "Discrete Math & CS Theory",
  description:
    "Logic, set theory, graph theory, combinatorics, number theory, recurrences, automata, complexity classes, and computability.",
  category: "CS Theory",
  level: "foundation",
  cards,
  tags: [
    "discrete math",
    "logic",
    "complexity",
    "automata",
    "information theory",
  ],
  estimatedMinutes: 15,
};
