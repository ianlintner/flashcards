import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "String Algorithms Overview",
    front:
      "You're reviewing a teammate's PR that\nsolves 5 string problems with brute force.\nWhat optimal algorithms would you suggest\nfor each classic string problem?",
    back: '1. Substring search: O(n+m) KMP/Rabin-Karp\n2. Longest Palindromic Substr: O(n) Manacher\'s\n3. Longest Common Substr: O(n*m) DP\n4. Anagram detection: O(n) sliding window\n5. String hashing: O(n) rolling hash\n\nMnemonic: "SuPer CASH" -\nSubstring, Palindrome, Common, Anagram, Hash',
  },
  {
    topic: "Suffix Array - Longest Repeated Substring",
    front:
      'In an interview you\'re asked:\n"Find the longest repeated substring\nin a string efficiently."\n\nHow do you solve it with a suffix array?',
    back: "1. Build suffix array: O(n log n)\n2. Build LCP (longest common prefix) array\n3. Max LCP value = longest repeated substr\n4. Extract substring at that position\n\nRepeated substrs are prefixes of suffixes\nthat sort adjacent in suffix array.\n\nTime: O(n log n) build + O(n) scan\nSpace: O(n)",
  },
  {
    topic: "Median of Two Sorted Arrays",
    front:
      "Interview: Given two sorted arrays of\nsize m and n, find the overall median\nin O(log min(m,n)) time.\n\nWhat is the key insight?",
    back: "Binary search on the SMALLER array.\n\nPartition both arrays into left/right\nhalves with equal total elements.\nOnly search smaller array's partition.\n\nValid when: maxLeft1 <= minRight2\nAND maxLeft2 <= minRight1\n\nMedian: even -> avg(max(lefts), min(rights))\nodd -> max(lefts). Time: O(log(min(m,n)))",
  },
  {
    topic: "Intervals - Merge Intervals",
    front:
      "Your calendar app has overlapping events.\nHow do you merge overlapping intervals\ninto non-overlapping ones?",
    back: '1. Sort by start time: O(n log n)\n2. Init result with first interval\n3. For each next interval:\n   - If start <= lastEnd: merge\n     lastEnd = max(lastEnd, end)\n   - Else: add as new interval\n\nTime: O(n log n), Space: O(n)\n\nMnemonic: "Sort, Scan, Stretch or Start"\n(Sort, scan each, stretch overlap or start new)',
  },
  {
    topic: "Matrix Problems",
    front:
      "You're given a 2D grid problem in an\ninterview. What are 4 key techniques\nfor matrix problems?",
    back: "1. DFS/BFS traversal: connected components\n   (e.g., Number of Islands)\n2. Sorted matrix search: start top-right,\n   eliminate row/col -> O(m+n)\n3. Spiral order: track 4 boundaries,\n   shrink inward each pass\n4. Rotate: transpose then reverse rows\n\nBonus: 2D prefix sums for submatrix queries.",
  },
  {
    topic: "Reservoir Sampling",
    front:
      "Your data pipeline streams millions of\nrecords. You need k random samples but\ndon't know the total count. How?",
    back: "Reservoir Sampling:\n- Fill reservoir with first k items\n- For i-th item (i > k):\n  j = random(0..i)\n  if j < k: reservoir[j] = item\n\nEach item gets equal k/n probability.\nTime: O(n), Space: O(k)\n\nEach swap maintains uniform probability.",
  },
  {
    topic: "Dutch National Flag",
    front:
      "Given an array of 0s, 1s, and 2s,\nsort it in one pass with O(1) space.\nWhat algorithm do you use?",
    back: "Dutch National Flag (3-way partition).\nThree pointers: lo=0, mid=0, hi=n-1\n\nWhile mid <= hi:\n- 0: swap(lo,mid), lo++, mid++\n- 1: mid++\n- 2: swap(mid,hi), hi--\n\nTime: O(n), Space: O(1)\nAlso used in 3-way quicksort (dupes).",
  },
  {
    topic: "Top-K Elements",
    front:
      "Interview: Find the K largest elements\nefficiently. Your interviewer asks for\nthree approaches and their trade-offs.",
    back: '1. Sort: O(n log n) - simple, overkill\n2. Min-Heap size K: O(n log k)\n   Best when k << n, guaranteed bound\n3. Quickselect: O(n) avg, O(n^2) worst\n   Partition then recurse one side only\n\nBest avg: Quickselect O(n)\nSafest: Heap O(n log k)\n\nMnemonic: "SHQ" - Sort, Heap, Quick\n(decreasing simplicity, increasing speed)',
  },
  {
    topic: "Union-Find Applications",
    front:
      'Your interviewer says: "I have an\nundirected graph problem." When should\nyou reach for Union-Find over BFS/DFS?',
    back: "Use Union-Find when you need:\n1. Connected components (dynamic edges)\n2. Cycle detection in undirected graphs\n3. Kruskal's MST (sorted edges)\n4. Accounts Merge (shared email grouping)\n5. Redundant Connection (cycle edge)\n\nAdvantage over BFS/DFS: incremental\nedge additions, near-O(1) amortized.",
  },
  {
    topic: "Randomized Algorithms",
    front:
      "What is the difference between\nLas Vegas and Monte Carlo algorithms?\n\nGive an example of each.",
    back: 'Las Vegas: always correct, random runtime\n  Ex: Randomized Quicksort\n  Expected O(n log n), worst O(n^2)\n\nMonte Carlo: may be wrong, fixed runtime\n  Ex: Miller-Rabin primality test\n  Error probability shrinks with iterations\n\nMnemonic: "Las Vegas never lies"\n(Las Vegas = always correct result).',
  },
  {
    topic: "NP-Completeness Intuition",
    front:
      "Your manager asks if you can solve a\nscheduling problem optimally in polynomial\ntime. You suspect it's NP-complete.\nHow do you explain this to a non-technical\nstakeholder?",
    back: 'Analogy: checking a Sudoku solution is\neasy, but finding one from scratch is hard.\n\nNP-complete = verifying is fast O(poly),\nbut no known fast solving algorithm.\nP vs NP: does easy-to-check mean\neasy-to-solve? Unknown!\n\nPractical advice:\n- Use approximation algorithms\n- Use heuristics (greedy, genetic)\n- Accept "good enough" solutions',
  },
  {
    topic: "Problem-Solving Framework",
    front:
      "Given a brand new algorithm problem\nin an interview, what is your systematic\napproach before writing any code?",
    back: 'UPIO framework:\n1. Understand: restate problem, clarify\n   inputs/outputs, walk through examples,\n   identify edge cases\n2. Plan: identify pattern (sliding window,\n   DP, graph?), brute force first\n3. Implement: clean code, meaningful names,\n   test as you go\n4. Optimize: analyze time/space,\n   can you do better?\n\nMnemonic: "UPIO" - Understand, Plan,\nImplement, Optimize',
  },
];

export const ALGORITHMIC_PROBLEM_SOLVING: DeckInfo = {
  id: "algorithmic-problem-solving",
  title: "Algorithmic Problem Solving",
  description:
    "String algorithms, suffix arrays, matrix problems, reservoir sampling, top-K, randomized algorithms, NP-completeness, and problem-solving frameworks.",
  category: "DSA",
  level: "advanced",
  cards,
  tags: [
    "strings",
    "matrix",
    "reservoir-sampling",
    "randomized",
    "top-K",
    "NP-completeness",
    "interview",
  ],
  estimatedMinutes: 15,
};
