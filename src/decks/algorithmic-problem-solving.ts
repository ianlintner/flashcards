import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "String Algorithms Overview",
    front:
      "Name 5 fundamental string problems\nand their optimal complexities.",
    back: "1. Substring search: O(n+m) KMP/Rabin-Karp\n2. Longest Palindromic Substring: O(n)\n   Manacher's algorithm\n3. Longest Common Substring: O(n*m) DP\n4. Anagram detection: O(n) sliding window\n5. String hashing / rolling hash: O(n)\n\nn = text length, m = pattern length",
  },
  {
    topic: "Suffix Array",
    front:
      "What is a Suffix Array?\n\nWhat is its construction complexity\nand what problems does it solve?",
    back: "Sorted array of all suffixes of a string\n(stored as starting indices).\n\nConstruction: O(n log n) or O(n)\n\nSolves:\n- Pattern matching: O(m log n)\n- Longest common prefix (with LCP array)\n- Longest repeated substring\n- Count distinct substrings\n\nSpace: O(n) (vs O(n^2) suffix tree)",
  },
  {
    topic: "Median of Two Sorted Arrays",
    front:
      "How do you find the median of two\nsorted arrays in O(log(min(m,n)))?",
    back: "Binary search on the smaller array.\n\nPartition both arrays so left halves\nhave (m+n+1)/2 elements total.\n\nBinary search on partition position in\nsmaller array (0 to m).\n\nValid partition:\n  maxLeft1 <= minRight2 AND\n  maxLeft2 <= minRight1\n\nMedian: based on max of lefts\nand min of rights.\n\nTime: O(log(min(m,n)))",
  },
  {
    topic: "Intervals - Merge Intervals",
    front:
      "How do you merge overlapping intervals?\n\nWhat is the time complexity?",
    back: "1. Sort intervals by start time: O(n log n)\n2. Initialize result with first interval\n3. For each interval:\n   - If overlaps last in result\n     (start <= lastEnd):\n     Extend: lastEnd = max(lastEnd, end)\n   - Else: add new interval to result\n\nTime:  O(n log n)\nSpace: O(n) for result\n\nRelated: Insert Interval, Meeting Rooms",
  },
  {
    topic: "Matrix Problems",
    front:
      "What techniques are used for\n2D matrix problems?\n\nGive 3 examples with approaches.",
    back: "1. Matrix Traversal:\n   DFS/BFS for connected components\n   (Number of Islands)\n\n2. Search in Sorted Matrix:\n   Start from top-right corner\n   O(m + n) elimination\n\n3. Spiral Order Traversal:\n   Track boundaries (top, bottom,\n   left, right), shrink inward\n\n4. Rotate Matrix: Transpose + Reverse\n\nPrefix sum for sub-matrix queries.",
  },
  {
    topic: "Reservoir Sampling",
    front: "What is Reservoir Sampling?\n\nWhen do you use it?",
    back: "Select k random items from a stream\nof unknown size n.\n\nAlgorithm (k=1):\n- Keep first item\n- For i-th item (i >= 1):\n  Replace with probability 1/i\n\nGeneral (k items):\n- For i-th item:\n  j = random(0, i)\n  if j < k: reservoir[j] = item\n\nTime: O(n), Space: O(k)\nEach item has equal k/n probability.",
  },
  {
    topic: "Dutch National Flag",
    front:
      "Explain the Dutch National Flag\nalgorithm (3-way partition).\n\nWhen is it useful?",
    back: "Partition array into 3 sections:\nvalues < pivot, = pivot, > pivot.\n\nThree pointers: lo, mid, hi\nmid scans left to right:\n- arr[mid] < pivot: swap(lo, mid), lo++, mid++\n- arr[mid] = pivot: mid++\n- arr[mid] > pivot: swap(mid, hi), hi--\n\nTime: O(n), Space: O(1)\n\nUse for: Sort Colors (LC 75),\n3-way quicksort for many duplicates.",
  },
  {
    topic: "Top-K Elements",
    front: "What are 3 approaches to find\nthe top-K elements in an array?",
    back: "1. Sort: O(n log n)\n   Simple but overkill.\n\n2. Min-Heap of size K: O(n log k)\n   Maintain heap of k largest.\n   Better when k << n.\n\n3. Quickselect: O(n) average\n   Partition like quicksort but\n   only recurse into one side.\n   O(n^2) worst case.\n\nBest: Quickselect (avg O(n))\nSafest: Heap (guaranteed O(n log k))",
  },
  {
    topic: "Union-Find Applications",
    front: "List 5 problems where Union-Find\nis the best approach.",
    back: "1. Number of Connected Components\n   in undirected graph\n\n2. Detecting Cycle in undirected graph\n\n3. Kruskal's MST algorithm\n\n4. Accounts Merge (group by email)\n\n5. Redundant Connection\n   (find edge that creates cycle)\n\nAll benefit from amortized O(alpha(n))\nnearly O(1) operations.",
  },
  {
    topic: "Randomized Algorithms",
    front:
      "What is the difference between\nLas Vegas and Monte Carlo algorithms?\n\nGive an example of each.",
    back: "Las Vegas:\n- Always correct result\n- Running time varies (randomized)\n- Example: Randomized Quicksort\n  Expected O(n log n), worst O(n^2)\n\nMonte Carlo:\n- May give incorrect result\n- Running time is deterministic\n- Example: Miller-Rabin primality test\n  May incorrectly say 'prime'\n  Probability decreases with iterations",
  },
];

export const ALGORITHMIC_PROBLEM_SOLVING: DeckInfo = {
  id: "algorithmic-problem-solving",
  title: "Algorithmic Problem Solving",
  description:
    "String algorithms, suffix arrays, matrix problems, reservoir sampling, top-K, and randomized algorithms.",
  category: "DSA",
  level: "advanced",
  cards,
  tags: ["strings", "matrix", "reservoir-sampling", "randomized", "top-K"],
  estimatedMinutes: 15,
};
