import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Recursion - Base Case",
    front:
      "What is the most important rule\nwhen writing recursive functions?\n\nWhat happens without it?",
    back: "Always define a BASE CASE -\nthe condition that stops recursion.\nWithout it: infinite recursion / stack overflow.\n\nExample:\nfunction factorial(n):\n  if (n <= 1) return 1  // base case\n  return n * factorial(n-1)\n\nEvery recursive path must reach a base case.",
  },
  {
    topic: "Recursion vs Iteration",
    front:
      "Can every recursive solution be\nconverted to iteration?\n\nWhen should you prefer each?",
    back: "Yes - every recursion can become iterative\n(use an explicit stack if needed).\n\nPrefer recursion:\n- Tree/graph traversals, divide & conquer\n- Naturally recursive problems\n\nPrefer iteration:\n- Simple loops (less overhead)\n- Deep recursion risk (stack overflow)\n- Performance-critical paths",
  },
  {
    topic: "Tail Recursion",
    front: "What is tail recursion?\n\nWhy is it important for optimization?",
    back: "Tail recursion: the recursive call is\nthe LAST operation in the function.\n\n// Tail recursive:\nfunction fact(n, acc = 1):\n  if (n <= 1) return acc;\n  return fact(n - 1, n * acc);\n\nCompilers optimize tail calls into loops\n(TCO) using O(1) stack space.\nNote: JS TCO support varies by engine.",
  },

  {
    topic: "Complexity Classes",
    front:
      "Rank these complexities from\nfastest to slowest:\n\nO(n!), O(1), O(n log n), O(2^n),\nO(n), O(log n), O(n^2), O(n^3)",
    back: "Fastest to slowest:\nO(1) Constant | O(log n) Logarithmic\nO(n) Linear | O(n log n) Linearithmic\nO(n^2) Quadratic\nO(2^n) Exponential | O(n!) Factorial\n\nScale at n=1000 (if O(n) = 1 sec):\nO(n log n) -> ~10 sec\nO(n^2) -> ~17 min\nO(2^n) -> heat death of universe",
  },
  {
    topic: "Big-O vs Big-Theta vs Big-Omega",
    front: "What is the difference between\nO, Theta, and Omega notation?",
    back: "Big-O: Upper bound (worst case)\n  f(n) <= c*g(n) for large n\nBig-Omega: Lower bound (best case)\n  f(n) >= c*g(n) for large n\nBig-Theta: Tight bound (exact)\n  c1*g(n) <= f(n) <= c2*g(n)\n\nExample - Binary search:\n  Best: Omega(1), Worst: O(log n)\n  Tight: Theta(log n) average case",
  },
  {
    topic: "In-place vs Out-of-place",
    front:
      "What does in-place mean\nfor an algorithm?\n\nGive examples of each.",
    back: "In-place: O(1) extra space\n(or O(log n) for recursion stack).\nExamples: Quick, Bubble, Heap sort\n\nOut-of-place: needs O(n)+ extra space.\nExamples: Merge sort O(n) buffer,\nCounting sort O(k) array\n\nIn-place saves memory but may be\nharder to implement. Out-of-place\noften simpler and can be stable.",
  },
  {
    topic: "Stable vs Unstable Sort",
    front: "What is a stable sorting algorithm?\n\nWhy does stability matter?",
    back: "Stable: equal elements keep their\noriginal relative order after sorting.\n\nStable: Merge, Bubble, Insertion,\nCounting, Radix, TimSort\nUnstable: Quick, Heap, Selection\n\nMatters when sorting by multiple keys:\nSort by last name, then stable sort by\nfirst -> preserves last name order\nwithin same first names.",
  },
  {
    topic: "Recursion Tree Method",
    front: "How do you use a recursion tree\nto analyze time complexity?",
    back: "Draw the tree of recursive calls:\n1. Each node = work at that level\n2. Children = recursive subcalls\n3. Sum work per level, then total\n\nExample: T(n) = 2T(n/2) + n\nLevel 0: n | Level 1: n/2+n/2=n\nLevel 2: n/4*4=n | ...log(n) levels\nEach level costs n total\nTotal: O(n log n)",
  },
  {
    topic: "Call Stack Visualization",
    front:
      "Draw the call stack for\nfactorial(4).\n\nHow does the stack grow and\nthen unwind?",
    back: "Stack grows (push):\n  fact(4) -> fact(3) -> fact(2) -> fact(1)\n  Each call waits for the next result.\n\nStack unwinds (pop):\n  fact(1)=1, fact(2)=2*1=2\n  fact(3)=3*2=6, fact(4)=4*6=24\n\nMax depth = n frames -> O(n) space.\nEach frame stores args + return addr.\nDeep recursion risks stack overflow.",
  },
  {
    topic: "Recursion to Iteration Conversion",
    front:
      "Convert this recursive DFS to\niterative using an explicit stack:\n\nfunction dfs(node):\n  if (!node) return;\n  visit(node);\n  dfs(node.left);\n  dfs(node.right);",
    back: "function dfsIterative(root):\n  stack = [root]\n  while stack.length > 0:\n    node = stack.pop()\n    if !node: continue\n    visit(node)\n    stack.push(node.right)\n    stack.push(node.left)\n\nReplace call stack w/ explicit stack.\nPush right first so left visits first.",
  },
];

export const RECURSION_FUNDAMENTALS: DeckInfo = {
  id: "recursion-fundamentals",
  title: "Recursion & Algorithm Fundamentals",
  description:
    "Recursion patterns, call stacks, tail recursion, complexity analysis, asymptotic notation, and iteration conversion.",
  category: "DSA",
  level: "foundation",
  cards,
  tags: ["recursion", "complexity", "Big-O", "call-stack"],
  estimatedMinutes: 15,
};
