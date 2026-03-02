import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Recursion - Base Case",
    front:
      "What is the most important rule\nwhen writing recursive functions?\n\nWhat happens without it?",
    back: "Always define a BASE CASE.\n\nThe base case is the condition\nthat stops recursion.\n\nWithout it:\n- Infinite recursion\n- Stack overflow error\n\nExample:\nfunction factorial(n):\n  if (n <= 1) return 1; // base case\n  return n * factorial(n - 1);",
  },
  {
    topic: "Recursion vs Iteration",
    front:
      "Can every recursive solution be\nconverted to iteration?\n\nWhen should you prefer each?",
    back: "Yes - every recursion can be iterative\n(use an explicit stack if needed).\n\nPrefer recursion:\n- Tree/graph traversals\n- Divide and conquer (cleaner code)\n- When problem is naturally recursive\n\nPrefer iteration:\n- Simple loops (avoid overhead)\n- Deep recursion risk (stack overflow)\n- Performance critical code\n  (function call overhead)",
  },
  {
    topic: "Tail Recursion",
    front: "What is tail recursion?\n\nWhy is it important for optimization?",
    back: "Tail recursion: the recursive call is\nthe LAST operation in the function.\n\n// Tail recursive:\nfunction fact(n, acc = 1):\n  if (n <= 1) return acc;\n  return fact(n - 1, n * acc);\n\nCompilers can optimize tail calls into\nloops (TCO), using O(1) stack space.\n\nNote: JS engines vary in TCO support.",
  },
  {
    topic: "Hashing - Good Hash Function",
    front: "What properties make a good\nhash function?",
    back: "1. Deterministic:\n   Same input -> same output\n\n2. Uniform Distribution:\n   Minimizes collisions\n\n3. Fast to compute: O(1) or O(m)\n   for strings of length m\n\n4. Avalanche effect:\n   Small change in input ->\n   large change in hash\n\n5. For crypto: pre-image resistance\n   (can't reverse the hash)",
  },
  {
    topic: "Complexity Classes",
    front:
      "Rank these complexities from\nfastest to slowest:\n\nO(n!), O(1), O(n log n), O(2^n),\nO(n), O(log n), O(n^2), O(n^3)",
    back: "Fastest to slowest:\n\nO(1)       - Constant\nO(log n)   - Logarithmic\nO(n)       - Linear\nO(n log n) - Linearithmic\nO(n^2)     - Quadratic\nO(n^3)     - Cubic\nO(2^n)     - Exponential\nO(n!)      - Factorial\n\nn = 20:\nO(n^2) = 400\nO(2^n) = 1,048,576\nO(n!)  = 2.4 * 10^18",
  },
  {
    topic: "Big-O vs Big-Theta vs Big-Omega",
    front: "What is the difference between\nO, Theta, and Omega notation?",
    back: "Big-O: Upper bound (worst case)\n  f(n) <= c * g(n) for large n\n\nBig-Omega: Lower bound (best case)\n  f(n) >= c * g(n) for large n\n\nBig-Theta: Tight bound (exact)\n  c1*g(n) <= f(n) <= c2*g(n)\n\nExample: Binary search\n  Best: Omega(1) (found at mid)\n  Worst: O(log n)\n  Tight: Theta(log n) avg case",
  },
  {
    topic: "In-place vs Out-of-place",
    front:
      "What does in-place mean\nfor an algorithm?\n\nGive examples of each.",
    back: "In-place: Uses O(1) extra space\n(or O(log n) for recursion stack).\n\nExamples:\n- Quick sort: in-place\n- Bubble sort: in-place\n- Heap sort: in-place\n\nOut-of-place: Needs extra O(n) space.\n\nExamples:\n- Merge sort: O(n) buffer\n- Counting sort: O(k) array\n- Any algorithm that copies input",
  },
  {
    topic: "Stable vs Unstable Sort",
    front: "What is a stable sorting algorithm?\n\nWhy does stability matter?",
    back: "Stable: equal elements maintain their\noriginal relative order after sorting.\n\nStable sorts: Merge, Bubble, Insertion,\nCounting, Radix, TimSort\n\nUnstable: Quick, Heap, Selection\n\nMatters when:\n- Sorting by multiple keys\n- Sort by last name, then stable sort\n  by first name preserves last name\n  order within same first names.",
  },
  {
    topic: "Recursion Tree Method",
    front: "How do you use a recursion tree\nto analyze time complexity?",
    back: "Draw the tree of recursive calls:\n\n1. Each node = work at that level\n2. Children = recursive subcalls\n3. Sum work at each level\n4. Total = sum across all levels\n\nExample: T(n) = 2T(n/2) + n\n\nLevel 0: n\nLevel 1: n/2 + n/2 = n\nLevel 2: n/4 * 4 = n\n...\nlog(n) levels, each costs n\nTotal: O(n log n)",
  },
  {
    topic: "NP-Completeness",
    front:
      "What does NP-Complete mean?\n\nGive three examples of\nNP-Complete problems.",
    back: "NP: Solution verifiable in polynomial time.\nNP-Complete: Hardest problems in NP.\n  - In NP (verifiable quickly)\n  - Every NP problem reduces to it\n\nExamples:\n1. Traveling Salesman (decision)\n2. Boolean Satisfiability (SAT)\n3. Graph Coloring\n4. Subset Sum\n5. Knapsack (decision version)\n\nIf any NPC problem solved in P,\nthen P = NP.",
  },
];

export const RECURSION_FUNDAMENTALS: DeckInfo = {
  id: "recursion-fundamentals",
  title: "Recursion & Algorithm Fundamentals",
  description:
    "Recursion patterns, complexity analysis, asymptotic notation, NP-completeness, and algorithmic foundations.",
  category: "DSA",
  level: "foundation",
  cards,
  tags: ["recursion", "complexity", "Big-O", "NP"],
  estimatedMinutes: 15,
};
