import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Single Loop",
    front:
      "What is the time complexity?\n\nfor (let i = 0; i < n; i++) {\n  doWork(); // O(1)\n}",
    back: "Time: O(n)\n\nThe loop runs n times.\nEach iteration does O(1) work.\nTotal: n * O(1) = O(n).",
  },
  {
    topic: "Nested Loops (independent)",
    front:
      "What is the time complexity?\n\nfor (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)\n    doWork(); // O(1)",
    back: "Time: O(n^2)\n\nOuter loop runs n times.\nInner loop runs n times for each i.\nTotal: n * n = O(n^2).",
  },
  {
    topic: "Nested Loops (dependent)",
    front:
      "What is the time complexity?\n\nfor (let i = 0; i < n; i++)\n  for (let j = 0; j < i; j++)\n    doWork(); // O(1)",
    back: "Time: O(n^2)\n\nInner loop runs 0+1+2+...+(n-1) times\n= n(n-1)/2 = O(n^2).\n\nThe triangular sum pattern always\nyields O(n^2).",
  },
  {
    topic: "Triple Nested Loop",
    front:
      "What is the time complexity?\n\nfor (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)\n    for (let k = 0; k < n; k++)\n      doWork();",
    back: "Time: O(n^3)\n\nn * n * n iterations.\nCommon in: naive matrix multiplication,\nFloyd-Warshall, 3-sum brute force.",
  },
  {
    topic: "Loop Halving (log n)",
    front:
      "What is the time complexity?\n\nlet i = n;\nwhile (i > 0) {\n  doWork(); // O(1)\n  i = Math.floor(i / 2);\n}",
    back: "Time: O(log n)\n\nThe variable i is halved each iteration.\nNumber of iterations = log2(n).\n\nSame pattern as binary search.",
  },
  {
    topic: "Loop Doubling (log n)",
    front:
      "What is the time complexity?\n\nlet i = 1;\nwhile (i < n) {\n  doWork(); // O(1)\n  i *= 2;\n}",
    back: "Time: O(log n)\n\ni doubles: 1, 2, 4, 8, ..., n\nNumber of iterations = log2(n).\n\nCommon in: exponential backoff,\nbinary lifting, doubling techniques.",
  },
  {
    topic: "Outer n, Inner log n",
    front:
      "What is the time complexity?\n\nfor (let i = 0; i < n; i++) {\n  let j = n;\n  while (j > 0) {\n    doWork();\n    j = Math.floor(j / 2);\n  }\n}",
    back: "Time: O(n log n)\n\nOuter loop: n iterations.\nInner loop: log(n) iterations (halving).\nTotal: n * log(n) = O(n log n).\n\nSame complexity as efficient sorting.",
  },
  {
    topic: "Two Sequential Loops",
    front:
      "What is the time complexity?\n\nfor (let i = 0; i < n; i++) doA();\nfor (let j = 0; j < n; j++) doB();\n\n(both doA and doB are O(1))",
    back: "Time: O(n)\n\nO(n) + O(n) = O(2n) = O(n).\n\nSequential (non-nested) loops ADD.\nConstants are dropped in Big O.\nThe dominant term wins.",
  },
  {
    topic: "Two Inputs (n and m)",
    front:
      "Scenario: You compare every user\nin list A (n users) against every\nproduct in list B (m products).\n\nfor (user of A)     // n\n  for (prod of B)   // m\n    match(user, prod);\n\nWhat is the time complexity?",
    back: "Time: O(n * m)\n\nDo NOT simplify to O(n^2) unless n = m.\nTwo different inputs produce O(n * m).\n\nWhy it matters: if n = 1000, m = 10,\nit is 10,000 ops - not 1,000,000.\nAlways keep separate variables.",
  },
  {
    topic: "Recursion - Linear",
    front:
      "What is the time complexity?\n\nfunction f(n) {\n  if (n <= 0) return;\n  doWork(); // O(1)\n  f(n - 1);\n}",
    back: "Time:  O(n)\nSpace: O(n) - call stack\n\nOne recursive call, reducing n by 1.\nCall stack depth = n.\nSame as a simple loop.",
  },
  {
    topic: "Recursion - Binary (tree)",
    front:
      "What is the time complexity?\n\nfunction f(n) {\n  if (n <= 0) return;\n  doWork(); // O(1)\n  f(n - 1);\n  f(n - 1);\n}",
    back: "Time:  O(2^n) - exponential\nSpace: O(n) - call stack depth\n\nTwo branches per call, depth n.\nTotal nodes in binary tree = 2^n - 1.\nClassic: naive Fibonacci.",
  },
  {
    topic: "Recursion - Divide & Conquer",
    front:
      "What is the time complexity?\n\nfunction f(n) {\n  if (n <= 1) return;\n  doWork(n); // O(n) work\n  f(n / 2);\n  f(n / 2);\n}",
    back: "Time: O(n log n)\n\nMaster Theorem: T(n) = 2T(n/2) + O(n)\na=2, b=2, c=1 -> log_b(a) = 1 = c\nCase 2: O(n^c * log n) = O(n log n)\n\nSame recurrence as Merge Sort.",
  },
  {
    topic: "Master Theorem - Overview",
    front:
      "State the Master Theorem for:\nT(n) = a * T(n/b) + O(n^c)\n\nWhat are the three cases?",
    back: "Mnemonic: a workers, b pieces, c overhead.\nCompare log_b(a) vs c:\n\nCase 1: log_b(a) > c  (workers win)\n  T(n) = O(n^(log_b(a)))\n\nCase 2: log_b(a) = c  (tie)\n  T(n) = O(n^c * log n)\n\nCase 3: log_b(a) < c  (overhead wins)\n  T(n) = O(n^c)",
  },
  {
    topic: "Master Theorem - Binary Search",
    front:
      "Apply the Master Theorem to\nBinary Search:\n\nT(n) = T(n/2) + O(1)",
    back: "a=1, b=2, c=0\nlog_b(a) = log_2(1) = 0 = c\n\nCase 2: T(n) = O(n^0 * log n)\n       = O(log n)\n\nConfirms binary search is O(log n).",
  },
  {
    topic: "Amortized Analysis Concept",
    front: "What is amortized analysis?\n\nGive two classic examples.",
    back: "Amortized = average cost per operation\nover a worst-case SEQUENCE of operations.\n\n1) Dynamic array push:\n  Most pushes O(1), rare resize O(n).\n  Amortized: O(1) per push.\n\n2) Hash table insert:\n  Most inserts O(1), rare rehash O(n).\n  Amortized: O(1) per insert.\n\nNot the same as average-case analysis.",
  },
  {
    topic: "Recognizing Complexity from Code",
    front:
      "Cheat sheet: What complexity does\neach code pattern typically produce?",
    back: 'Single loop 0..n       -> O(n)\nLoop halving/doubling   -> O(log n)\nTwo nested loops 0..n   -> O(n^2)\nLoop inside halving     -> O(n log n)\nThree nested loops      -> O(n^3)\nTwo sequential loops    -> O(n) (add)\nTwo inputs n, m nested  -> O(n * m)\nRecursive halving + O(1)-> O(log n)\nTwo recursive calls     -> O(2^n)\n\nMnemonic: "Nest to multiply, sequence to add."\nAlways check what shrinks per call.',
  },
];

export const BIG_O_CONTROL_STRUCTURES: DeckInfo = {
  id: "big-o-control-structures",
  title: "Big O: Control Structures",
  description:
    "How to analyze loops, nested loops, recursion, divide & conquer recurrences, and the Master Theorem.",
  level: "foundation",
  category: "Big O Notation",
  cards,
};
