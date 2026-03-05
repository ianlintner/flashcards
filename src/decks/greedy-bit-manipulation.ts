import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Greedy Algorithm Concept",
    front: "What is a greedy algorithm?\n\nWhen can you use a greedy approach?",
    back: "Makes locally optimal choice at each step,\nhoping to find global optimum.\n\nUse when problem has:\n1. Greedy Choice Property:\n   Local optimum leads to global optimum\n2. Optimal Substructure:\n   Optimal solution contains optimal\n   solutions to subproblems\n\nExamples: Huffman, Dijkstra, Prim's, Kruskal's",
  },
  {
    topic: "Activity Selection",
    front:
      "A conference room has 10 booking requests\nwith different start/end times.\n\nHow do you schedule the maximum number\nof non-overlapping meetings?",
    back: "Greedy: Always pick the meeting that\nFINISHES earliest.\n\n1. Sort all requests by end time\n2. Select the first meeting\n3. For each remaining request:\n   if start >= last selected end, take it\n\nWhy earliest-finish? It leaves maximum\nremaining time for other meetings.\n\nTime: O(n log n) for the sort step",
  },
  {
    topic: "Huffman Coding",
    front:
      "A file has characters with very different\nfrequencies (e.g., 'e' appears 1000x,\n'z' appears 2x).\n\nHow do you build a minimal-length encoding?",
    back: 'Huffman coding: frequent chars -> short codes,\nrare chars -> longer codes.\n\nAlgorithm:\n1. Create leaf node per char with its freq\n2. Build a min-heap by frequency\n3. While heap size > 1:\n   - Extract two smallest nodes\n   - Merge into parent (combined freq)\n   - Push parent back\n4. Root = Huffman tree; left=0, right=1\n\nMnemonic: "Least frequent friends merge first"\nTime: O(n log n)',
  },
  {
    topic: "Interval Scheduling",
    front:
      "Given overlapping intervals,\nhow do you find minimum number\nof rooms (meeting rooms)?",
    back: "Minimum meeting rooms = max overlap\nat any point in time.\n\nApproach 1: Sort events (start/end)\n  +1 for start, -1 for end\n  Track running count, return max\n\nApproach 2: Min-heap of end times\n  For each meeting: if start >= heap top,\n  pop top. Push new end time.\n  Answer = heap size\n\nTime: O(n log n)",
  },
  {
    topic: "Divide and Conquer",
    front: "What is the Divide and Conquer paradigm?\n\nName the three steps.",
    back: "1. Divide: Break problem into subproblems\n2. Conquer: Solve subproblems recursively\n3. Combine: Merge subproblem solutions\n\nExamples:\n- Merge Sort: O(n log n)\n- Quick Sort: O(n log n) avg\n- Binary Search: O(log n)\n- Closest Pair of Points: O(n log n)\n- Strassen's Matrix Multiply: O(n^2.807)",
  },
  {
    topic: "Bit Manipulation Basics",
    front:
      "You need to toggle feature flags stored\nas bits in an integer config value.\n\nWhat are the 5 essential bit operations?",
    back: "1. Check if bit i is set:\n   (n >> i) & 1\n\n2. Set bit i:\n   n | (1 << i)\n\n3. Clear bit i:\n   n & ~(1 << i)\n\n4. Toggle bit i:\n   n ^ (1 << i)\n\n5. Check power of 2:\n   n > 0 && (n & (n-1)) === 0\n\nPopcount (count set bits):\n  while(n) { count++; n &= n-1; }",
  },
  {
    topic: "XOR Tricks",
    front:
      "An array has n numbers. Every number\nappears exactly twice except one.\n\nFind it in O(n) time, O(1) space.\n\nBonus: What if TWO numbers are unique?",
    back: "Key XOR properties:\n  a ^ a = 0,  a ^ 0 = a\n\nSingle unique: XOR all elements.\nPairs cancel -> answer remains.\n\nTwo unique (a, b):\n1. XOR all -> x = a ^ b (nonzero)\n2. Find any set bit in x (differing bit)\n3. Split array into two groups by that bit\n4. XOR each group separately -> a and b\n\nTime: O(n), Space: O(1) both cases",
  },
  {
    topic: "Greedy Choice Property",
    front:
      "Your vending machine gives change using\nUS coins (25, 10, 5, 1 cents).\nGreedy (largest coin first) works perfectly.\n\nBut with coins {1, 3, 4}, making change\nfor 6 cents - does greedy still work?",
    back: "Greedy Choice Property: a locally optimal\nchoice leads to a globally optimal solution.\n\nUS coins: greedy works because each coin\nis >= 2x the next smaller denomination.\n\nCoins {1,3,4}, amount 6:\n  Greedy: 4+1+1 = 3 coins\n  Optimal: 3+3  = 2 coins\n  Greedy FAILS.\n\nTest greedy validity:\n1. Can you prove local choice is safe?\n2. Does remaining subproblem stay optimal?\nIf unsure, use DP instead.",
  },
  {
    topic: "Bit Masking for Subsets",
    front:
      "You need to enumerate all subsets of\nn elements for a brute-force search.\n\nHow do you use bitmasks to represent\nand iterate through every subset?",
    back: "Each integer from 0 to 2^n - 1 represents\none subset. Bit i = 1 means include item i.\n\nfor (mask = 0; mask < (1 << n); mask++)\n  for (i = 0; i < n; i++)\n    if (mask & (1 << i)) // item i included\n\nPractical uses:\n- Feature flags in config (each bit = flag)\n- Traveling salesman DP: dp[visited_mask]\n- Permission systems (read|write|exec = 7)\n\nSubsets of n items: exactly 2^n total\nTime: O(2^n * n) to enumerate all",
  },
  {
    topic: "Greedy vs Dynamic Programming",
    front:
      "You're solving an optimization problem.\nHow do you decide between greedy and DP?\n\nGive a concrete example where greedy\nfails but DP succeeds.",
    back: "Greedy: makes one choice, never reconsiders.\nDP: explores all subproblems, picks best.\n\nGreedy works when:\n- Greedy choice property holds\n- Locally optimal = globally optimal\n\nDP needed when:\n- Choices interact / overlap\n- Must compare multiple options\n\nCoin change example:\n  Coins {1,3,4}, amount 6:\n  Greedy: 4+1+1 = 3 coins (wrong)\n  DP:     3+3   = 2 coins (correct)\n\nRule: if greedy proof is hard, use DP.",
  },
];

export const GREEDY_BIT_MANIPULATION: DeckInfo = {
  id: "greedy-bit-manipulation",
  title: "Greedy, D&C & Bit Manipulation",
  description:
    "Greedy algorithms, greedy vs DP, divide and conquer, bit manipulation tricks, XOR patterns, and bitmask subsets.",
  category: "DSA",
  level: "intermediate",
  cards,
  tags: ["greedy", "divide-conquer", "bit-manipulation", "bitmask", "xor"],
  estimatedMinutes: 15,
};
