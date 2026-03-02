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
      "Describe the Activity Selection problem.\n\nWhat is the greedy strategy?",
    back: "Given activities with start/end times,\nfind maximum non-overlapping activities.\n\nGreedy: Always pick activity that\nFINISHES earliest.\n\n1. Sort by end time\n2. Select first activity\n3. For each next: if start >= last end,\n   select it\n\nTime: O(n log n) for sort",
  },
  {
    topic: "Huffman Coding",
    front: "What is Huffman coding?\n\nHow does the algorithm work?",
    back: "Optimal prefix-free binary encoding.\nFrequent chars get shorter codes.\n\nAlgorithm:\n1. Create leaf node for each char\n2. Build min-heap by frequency\n3. While heap size > 1:\n   - Extract two minimum nodes\n   - Create parent with combined freq\n   - Insert parent back\n4. Root is the Huffman tree\n\nTime: O(n log n)",
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
    topic: "Master Theorem",
    front:
      "State the Master Theorem for\nrecurrences of the form:\nT(n) = aT(n/b) + O(n^d)",
    back: "Compare log_b(a) with d:\n\nCase 1: d < log_b(a)\n  T(n) = O(n^(log_b(a)))\n\nCase 2: d = log_b(a)\n  T(n) = O(n^d * log n)\n\nCase 3: d > log_b(a)\n  T(n) = O(n^d)\n\nExample: Merge sort T(n) = 2T(n/2) + O(n)\na=2, b=2, d=1, log_2(2)=1 -> Case 2 -> O(n log n)",
  },
  {
    topic: "Bit Manipulation Basics",
    front:
      "What are the essential\nbit manipulation operations?\n\nList 5 common tricks.",
    back: "1. Check if bit set:\n   (n >> i) & 1\n\n2. Set bit:\n   n | (1 << i)\n\n3. Clear bit:\n   n & ~(1 << i)\n\n4. Toggle bit:\n   n ^ (1 << i)\n\n5. Check power of 2:\n   n > 0 && (n & (n-1)) === 0\n\nBonus: Count set bits (popcount):\n   while(n) { count++; n &= n-1; }",
  },
  {
    topic: "Bit Manipulation - XOR Tricks",
    front:
      "How does XOR help find the\nsingle number in an array where\nall others appear twice?",
    back: "XOR properties:\n  a ^ a = 0\n  a ^ 0 = a\n  Commutative & associative\n\nSolution:\nlet result = 0;\nfor (const num of arr)\n  result ^= num;\nreturn result;\n\nPairs cancel out, leaving the single number.\n\nTime: O(n), Space: O(1)",
  },
  {
    topic: "String Matching - KMP",
    front:
      "What is the KMP string matching algorithm?\n\nWhat is its time complexity?",
    back: "Knuth-Morris-Pratt: finds pattern in text\nwithout re-examining characters.\n\n1. Build failure/prefix function:\n   lps[i] = length of longest proper\n   prefix that is also a suffix\n\n2. Use lps to skip comparisons on mismatch\n\nPreprocess: O(m)\nSearch:     O(n)\nTotal:      O(n + m)\nSpace:      O(m)\n\nm = pattern length, n = text length",
  },
  {
    topic: "String Matching - Rabin-Karp",
    front:
      "How does Rabin-Karp string matching work?\n\nWhat is its expected time complexity?",
    back: "Rolling hash-based approach.\n\n1. Compute hash of pattern\n2. Compute hash of first window in text\n3. Slide window: update hash in O(1)\n4. On hash match: verify characters\n\nExpected: O(n + m)\nWorst:    O(n * m) (many hash collisions)\n\nGood for: multiple pattern search,\nplagiarism detection.",
  },
  {
    topic: "Amortized Analysis",
    front:
      "What is amortized analysis?\n\nName three methods and give\nan example.",
    back: "Average cost per operation over a sequence,\nnot per individual operation.\n\nMethods:\n1. Aggregate: total cost / n operations\n2. Accounting: charge extra for cheap ops\n   to pay for expensive ones\n3. Potential: define potential function\n\nExample: Dynamic array push\n  Most pushes: O(1)\n  Occasional resize: O(n)\n  Amortized: O(1) per push",
  },
  {
    topic: "Network Flow - Max Flow",
    front:
      "What is the Max Flow problem?\n\nWhat is the Ford-Fulkerson method?",
    back: "Find maximum flow from source s to sink t\nin a flow network with edge capacities.\n\nFord-Fulkerson:\n1. While augmenting path exists (s->t):\n   - Find path in residual graph\n   - Add bottleneck flow\n   - Update residual capacities\n\nEdmonds-Karp (BFS for path):\nTime: O(V * E^2)\n\nMax-Flow = Min-Cut (theorem)",
  },
];

export const GREEDY_BIT_MANIPULATION: DeckInfo = {
  id: "greedy-bit-manipulation",
  title: "Greedy, D&C & Bit Manipulation",
  description:
    "Greedy algorithms, divide and conquer, Master Theorem, bit manipulation tricks, string matching, and flow.",
  category: "DSA",
  level: "intermediate",
  cards,
  tags: ["greedy", "divide-conquer", "bit-manipulation", "string-matching"],
  estimatedMinutes: 18,
};
