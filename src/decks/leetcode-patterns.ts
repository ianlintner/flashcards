import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Two Pointers Pattern",
    front:
      "Describe the Two Pointers pattern.\n\nHow do you recognize it in a problem?",
    back: 'Two pointers move through data structure\n(usually sorted array / linked list).\n\nRecognize when:\n- Sorted input + pair/triplet search\n- "Find two elements that..."\n- Remove duplicates in place\n- Palindrome checking\n\nExamples: Two Sum II, 3Sum,\nContainer With Most Water, Trapping Rain.',
  },
  {
    topic: "Sliding Window Pattern",
    front: "Describe the Sliding Window pattern.\n\nWhat are the two types?",
    back: "Fixed-size window:\n  Max sum subarray of size k\n  All anagrams in a string\n\nVariable-size window:\n  Longest substring without repeats\n  Minimum window substring\n  Longest subarray with sum <= k\n\nTemplate: expand right, shrink left\nwhen constraint violated.\nTrack answer at each valid state.",
  },
  {
    topic: "Fast & Slow Pointers",
    front:
      "Describe the Fast & Slow Pointers\npattern (Floyd's cycle detection).\n\nWhen do you use it?",
    back: "Two pointers: slow moves 1 step,\nfast moves 2 steps.\n\nUse cases:\n- Detect cycle in linked list\n- Find cycle start\n- Find middle of linked list\n- Happy number detection\n- Palindrome linked list\n\nIf cycle exists: fast and slow WILL meet.",
  },
  {
    topic: "Merge Intervals Pattern",
    front:
      "Describe the Merge Intervals pattern.\n\nHow do you approach these problems?",
    back: "1. Sort intervals by start time\n2. Iterate, comparing current end\n   with next start\n3. Overlap if next.start <= curr.end\n\nProblems:\n- Merge Overlapping Intervals\n- Insert Interval\n- Meeting Rooms I & II\n- Minimum Platforms\n- Interval List Intersections\n\nTime: O(n log n) for sorting.",
  },
  {
    topic: "Binary Search Variations",
    front: "List the main Binary Search\nvariations used in interviews.",
    back: "1. Standard: find exact target\n2. Lower bound: first element >= target\n3. Upper bound: first element > target\n4. Rotated sorted array search\n5. Search on answer space\n   (min/max optimization)\n6. Peak finding (bitonic array)\n7. Search in 2D sorted matrix\n\nKey: identify MONOTONIC property.",
  },
  {
    topic: "BFS for Shortest Path",
    front:
      "When should you use BFS to find\nshortest path? What's the template?",
    back: "Use BFS when: edges are UNWEIGHTED\n(or all weight 1).\n\nTemplate:\n  queue = [start]\n  visited = {start}\n  level = 0\n  while queue:\n    for each node in current level:\n      if target found: return level\n      add unvisited neighbors\n    level++\n\nProblems: word ladder, min knight moves,\nopen the lock, shortest bridge.",
  },
  {
    topic: "DFS + Backtracking",
    front:
      "Describe the Backtracking pattern.\n\nWhat is the general template?",
    back: "Explore all candidates, abandon (prune)\npaths that can't lead to a solution.\n\nTemplate:\n  function backtrack(state, choices):\n    if goal reached: add to result\n    for each choice:\n      make choice\n      backtrack(new state, remaining)\n      undo choice  // BACKTRACK\n\nProblems: permutations, combinations,\nsubsets, N-queens, Sudoku solver.",
  },
  {
    topic: "Topological Sort Pattern",
    front: "When do you need Topological Sort?\n\nWhat are the two approaches?",
    back: "Use when: ordering with DEPENDENCIES\n(directed acyclic graph).\n\n1. Kahn's (BFS): use in-degree array\n   Queue nodes with in-degree 0\n   -> also detects cycles\n\n2. DFS-based: post-order + reverse\n\nProblems: course schedule, build order,\nalien dictionary, task scheduling.",
  },
  {
    topic: "Heap / Top-K Pattern",
    front: "Describe the Top-K pattern\nusing a Heap. When do you use it?",
    back: "Finding K largest: use MIN-heap of size K\n  -> if new elem > heap top, replace\n  Time: O(n log k)\n\nFinding K smallest: use MAX-heap of size K\n\nProblems:\n- Kth largest element\n- Top K frequent elements\n- K closest points to origin\n- Merge K sorted lists\n- Find median from data stream",
  },
  {
    topic: "Dynamic Programming Patterns",
    front: "List the main categories of\nDynamic Programming problems.",
    back: "1. Linear DP (climbing stairs, house\n   robber, decode ways)\n2. Knapsack (0/1, unbounded, subset sum)\n3. String DP (LCS, edit distance,\n   palindromic subsequence)\n4. Grid DP (unique paths, min path sum)\n5. Interval DP (burst balloons, matrix\n   chain multiplication)\n6. Tree DP (diameter, max path sum)\n7. Bitmask DP (TSP, subset permutation)",
  },
  {
    topic: "0/1 Knapsack Pattern",
    front: "Describe the 0/1 Knapsack pattern.\n\nWhat problems map to it?",
    back: "Given items with weight & value,\nmaximize value within weight limit.\nEach item used at most once.\n\ndp[i][w] = max value using items 0..i\n           with capacity w\n\nProblems that map to knapsack:\n- Subset Sum\n- Equal Partition\n- Target Sum\n- Minimum Subset Difference\n- Count of Subset Sum",
  },
  {
    topic: "Monotonic Stack Pattern",
    front: "Describe the Monotonic Stack pattern.\n\nWhat is the template?",
    back: "Maintain stack in increasing or\ndecreasing order.\n\nTemplate (next greater element):\n  for i = n-1 to 0:\n    while stack not empty and\n          stack.top <= arr[i]:\n      stack.pop()\n    result[i] = stack.top or -1\n    stack.push(arr[i])\n\nProblems: next greater element, daily\ntemperatures, largest rectangle,\ntrapping rain water.",
  },
  {
    topic: "Union-Find Pattern",
    front: "When should you use Union-Find\nin an interview problem?",
    back: 'Signals: grouping, connectivity,\n"are X and Y connected?"\n\nTemplate:\n  find(x): path compression\n  union(x,y): union by rank\n\nProblems:\n- Number of islands (alternative to BFS)\n- Accounts merge\n- Redundant connection\n- Graph valid tree\n- Earliest moment everyone becomes friends\n\nNearly O(1) per operation (amortized).',
  },
  {
    topic: "Prefix Sum Pattern",
    front: "Describe the Prefix Sum pattern.\n\nWhat problems does it solve?",
    back: "Precompute cumulative sums:\n  prefix[i] = sum(arr[0..i])\n  rangeSum(l,r) = prefix[r] - prefix[l-1]\n\nO(n) preprocess, O(1) range query.\n\nProblems:\n- Subarray sum equals K\n  (prefix + hashmap)\n- Range sum query\n- Contiguous array (0s and 1s)\n- Product of array except self\n- 2D prefix sum (matrix region sum)",
  },
  {
    topic: "Tree DFS Patterns",
    front: "What are the main DFS patterns\nfor binary tree problems?",
    back: "1. Top-down (preorder-like)\n   Pass info from parent to children\n   Ex: max depth, path sum\n\n2. Bottom-up (postorder-like)\n   Collect info from children\n   Ex: diameter, balanced check\n\n3. Path tracking\n   Track path from root to current\n   Ex: path sum II, LCA\n\n4. Serialize/Deserialize\n   Preorder + null markers",
  },
  {
    topic: "Graph: Detect Cycle",
    front: "How do you detect a cycle in a\ndirected vs undirected graph?",
    back: "Directed graph:\n  DFS with 3 colors (white/grey/black)\n  Cycle exists if you visit a GREY node\n  Or: Kahn's topological sort\n  (cycle if not all nodes processed)\n\nUndirected graph:\n  DFS: neighbor visited AND not parent\n  Or: Union-Find: union returns false\n  when both already in same set",
  },
  {
    topic: "Bit Manipulation Patterns",
    front: "What are the key bit manipulation\npatterns for interviews?",
    back: "1. XOR for single number:\n   a ^ a = 0, a ^ 0 = a\n2. n & (n-1): clear lowest set bit\n   -> power of 2 check\n3. n & (-n): isolate lowest set bit\n4. Bitmask subsets: 0 to 2^n - 1\n5. Bit shifting: multiply/divide by 2\n\nProblems: single number, counting bits,\nreverse bits, missing number.",
  },
  {
    topic: "Greedy Pattern Recognition",
    front: "How do you recognize when Greedy\nworks for a problem?",
    back: 'Greedy works when:\n1. Local optimal -> global optimal\n2. Greedy choice property\n3. No need to reconsider decisions\n\nCommon signals:\n- "Minimum number of..."\n- "Maximum number of..."\n- Scheduling / interval selection\n- Huffman-like construction\n\nProblems: jump game, gas station,\ntask scheduler, partition labels,\nminimum arrows to burst balloons.',
  },
  {
    topic: "Matrix Traversal Patterns",
    front: "What patterns are used for\n2D matrix / grid problems?",
    back: "1. BFS from multiple sources\n   (rotting oranges, walls and gates)\n2. DFS flood fill\n   (number of islands, surrounded regions)\n3. DP on grid\n   (unique paths, min path sum)\n4. Diagonal traversal\n5. Spiral traversal\n6. Binary search on sorted matrix\n\nDirection array:\n  dx = [-1, 1, 0, 0]\n  dy = [0, 0, -1, 1]",
  },
  {
    topic: "String Pattern Matching",
    front:
      "What techniques are used for\nstring pattern matching in interviews?",
    back: "1. Two pointers (palindrome check)\n2. Sliding window (anagrams, substring)\n3. HashMap frequency count\n4. Trie (prefix matching, word search)\n5. KMP / Rabin-Karp (substring search)\n6. DP (edit distance, LCS)\n\nProblems: longest palindromic substring,\ngroup anagrams, minimum window substring,\nword break, regex matching.",
  },
  {
    topic: "Divide and Conquer Pattern",
    front: "When should you use Divide and\nConquer? What's the structure?",
    back: "Structure:\n1. DIVIDE: split into subproblems\n2. CONQUER: solve recursively\n3. COMBINE: merge sub-results\n\nUse when:\n- Problem naturally splits in half\n- Subproblems are independent\n- Combining is efficient\n\nProblems: merge sort, quick sort,\nclosest pair of points, max subarray\n(Kadane is better), count inversions.",
  },
  {
    topic: "Two Heaps Pattern",
    front: "Describe the Two Heaps pattern.\n\nWhat problems use it?",
    back: "Maintain a max-heap (left half) and\nmin-heap (right half) to track median.\n\nInvariant:\n  maxHeap.top <= minHeap.top\n  sizes differ by at most 1\n\nMedian = maxHeap.top (odd count)\n  or avg of both tops (even count)\n\nProblems:\n- Find median from data stream\n- Sliding window median\n- IPO (maximize capital)",
  },
  {
    topic: "Modified Binary Search",
    front: "Describe Binary Search on Answer\nSpace. Give an example.",
    back: "Instead of searching an array, search\na RANGE of possible answers.\n\nTemplate:\n  lo, hi = min_answer, max_answer\n  while lo < hi:\n    mid = (lo + hi) / 2\n    if feasible(mid): hi = mid\n    else: lo = mid + 1\n  return lo\n\nExamples:\n- Koko eating bananas\n- Split array largest sum\n- Capacity to ship packages",
  },
  {
    topic: "Graph: Shortest Path Decision",
    front: "How do you choose the right\nshortest-path algorithm?",
    back: "Unweighted graph:\n  -> BFS  O(V+E)\n\nNon-negative weights:\n  -> Dijkstra  O((V+E) log V)\n\nNegative weights (no neg cycle):\n  -> Bellman-Ford  O(V*E)\n\nAll pairs:\n  -> Floyd-Warshall  O(V^3)\n\nDAG:\n  -> Topological sort + relax  O(V+E)",
  },
  {
    topic: "Interval Scheduling Pattern",
    front:
      "Describe the Interval Scheduling\npattern. What's the greedy strategy?",
    back: "To select MAX non-overlapping intervals:\n1. Sort by END time\n2. Greedily pick earliest-ending interval\n3. Skip overlapping intervals\n\nTo find MIN rooms / platforms:\n1. Sort start and end times separately\n2. Two-pointer sweep line\n3. Count overlapping at each point\n\nProblems: meeting rooms, non-overlapping\nintervals, minimum platforms.",
  },
];

export const LEETCODE_PATTERNS: DeckInfo = {
  id: "leetcode-patterns",
  title: "LeetCode: Pattern Recognition",
  description:
    "Recognize and apply the ~20 most common coding interview patterns: two pointers, sliding window, BFS/DFS, DP, backtracking, and more.",
  level: "intermediate",
  category: "Interview Patterns",
  cards,
};
