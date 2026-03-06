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
    back: "Greedy: always pick the meeting that\nFINISHES earliest.\n\n1. Sort requests by end time\n2. Select first meeting\n3. For each remaining: if start >= last\n   selected end, take it\n\nWhy earliest-finish? Leaves maximum\nremaining time for other meetings.\nTime: O(n log n) for the sort",
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
    back: "Min rooms = max simultaneous overlap.\n\nSweep line: sort events, +1 at start,\n-1 at end, track running max.\n\nMin-heap: heap of end times. For each\nmeeting: if start >= heap.top, pop.\nPush new end. Answer = max heap size.\n\nBoth: O(n log n)",
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
    back: "5 essential ops (all O(1)):\n1. Check bit i:  (n >> i) & 1\n2. Set bit i:    n | (1 << i)\n3. Clear bit i:  n & ~(1 << i)\n4. Toggle bit i: n ^ (1 << i)\n5. Power of 2:   n > 0 && (n & (n-1)) === 0\n\nPopcount (count set bits):\n  while(n) { count++; n &= n-1; }\n\nBits indexed from 0 (rightmost = LSB).",
  },
  {
    topic: "XOR Tricks",
    front:
      "An array has n numbers. Every number\nappears exactly twice except one.\n\nFind it in O(n) time, O(1) space.\n\nBonus: What if TWO numbers are unique?",
    back: "a ^ a = 0,  a ^ 0 = a\n\nSingle unique: XOR all elements.\nPairs cancel, answer remains.\n\nTwo unique (a, b):\n1. XOR all -> x = a ^ b\n2. Find any set bit in x (a,b differ here)\n3. Split array by that bit, XOR each group\nResult: a and b separately\n\nTime: O(n), Space: O(1) both cases",
  },
  {
    topic: "Greedy Choice Property",
    front:
      "Your vending machine gives change using\nUS coins (25, 10, 5, 1 cents).\nGreedy (largest coin first) works perfectly.\n\nBut with coins {1, 3, 4}, making change\nfor 6 cents - does greedy still work?",
    back: "A locally optimal choice leads to a\nglobally optimal solution.\n\nUS coins: greedy works (each coin >= 2x\nthe next smaller denomination).\n\nCoins {1,3,4}, amount 6:\n  Greedy: 4+1+1 = 3 coins\n  Optimal: 3+3  = 2 coins - FAILS\n\nTest: can you prove local choice is safe\nand subproblem stays optimal? If not, use DP.",
  },
  {
    topic: "Bit Masking for Subsets",
    front:
      "You need to enumerate all subsets of\nn elements for a brute-force search.\n\nHow do you use bitmasks to represent\nand iterate through every subset?",
    back: "Each int 0 to 2^n-1 = one subset.\nBit i = 1 means include item i.\n\nfor (mask = 0; mask < (1 << n); mask++)\n  for (i = 0; i < n; i++)\n    if (mask & (1 << i)) // item i in subset\n\nUses: TSP dp[visited_mask], feature flags,\npermission systems (read|write|exec = 7)\n\n2^n total subsets.\nTime: O(2^n * n) to enumerate all.",
  },
  {
    topic: "Greedy vs Dynamic Programming",
    front:
      "You're solving an optimization problem.\nHow do you decide between greedy and DP?\n\nGive a concrete example where greedy\nfails but DP succeeds.",
    back: "Greedy: one choice per step, never revisits.\nDP: explores all subproblems, picks best.\n\nGreedy works when:\n- Greedy choice property holds\n- Locally optimal = globally optimal\n\nDP needed when choices interact/overlap.\n\nCoin change {1,3,4}, amount 6:\n  Greedy: 4+1+1 = 3 coins (wrong)\n  DP:     3+3   = 2 coins (correct)\nRule: if greedy proof is hard, use DP.",
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
