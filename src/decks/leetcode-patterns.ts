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
    front:
      "Given a sorted matrix where each row\nstarts greater than the last row ends,\nfind a target value.\n\nHow do you apply binary search here?",
    back: "Treat m x n matrix as sorted array:\n  mid -> matrix[mid/n][mid%n]\n  Binary search indices 0..m*n-1\n\nBinary search variations:\n1. Standard: find exact target\n2. Lower/Upper bound (first >=, >)\n3. Rotated sorted array\n4. Search on answer space (min/max)\n5. Peak finding (bitonic array)\n\nKey: identify a MONOTONIC property.",
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
      "You're solving N-Queens: place N queens\non an N x N board with no two attacking.\n\nHow does backtracking with pruning\nreduce this from brute force to practical?",
    back: "Backtracking = DFS + pruning.\nBrute force: N^N placements.\nPrune: skip invalid branches EARLY,\ncutting the search tree dramatically.\n\nTemplate:\n  backtrack(state, choices):\n    if goal: record result\n    for choice (if valid):  // PRUNE\n      make -> recurse -> undo\n\nN-Queens prunes ~95% of branches.",
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
    topic: "Linear DP Pattern",
    front:
      "You're solving 'House Robber': maximize\nmoney from non-adjacent houses in a row.\n\nHow do you set up the linear DP?",
    back: "Linear DP: state depends on previous\n1-2 elements in a sequence.\n\ndp[i] = max(dp[i-1], dp[i-2]+nums[i])\n\nSame pattern: Climbing Stairs,\nDecode Ways, Maximum Subarray (Kadane).\n\nSignal: decision at position i\ndepends only on i-1 and/or i-2.",
  },
  {
    topic: "Grid DP Pattern",
    front:
      "You're at top-left of an m x n grid.\nYou can only move right or down.\nHow many unique paths to bottom-right?\n\nWhat is the Grid DP approach?",
    back: "dp[i][j] = ways to reach cell (i,j)\ndp[i][j] = dp[i-1][j] + dp[i][j-1]\nBase: dp[0][j] = dp[i][0] = 1\n\nVariants:\n- Min Path Sum (add grid cost)\n- Dungeon Game (work backwards)\n- Cherry Pickup (two agents)\n\nSignal: 2D grid, move right/down,\noptimize or count paths.",
  },
  {
    topic: "State Machine DP",
    front:
      "In 'Best Time to Buy/Sell Stock with\nCooldown', you can hold, sell, or rest\neach day.\n\nHow does state machine DP model this?",
    back: "Define states per day:\n  hold[i] = max profit while holding\n  sold[i] = max profit just sold\n  rest[i] = max profit in cooldown\n\nTransitions:\n  hold = max(hold, rest - price)\n  sold = hold + price\n  rest = max(rest, sold)\n\nAlso: Stock with K transactions,\nStock with transaction fee.",
  },
  {
    topic: "0/1 Knapsack Pattern",
    front: "Describe the 0/1 Knapsack pattern.\n\nWhat problems map to it?",
    back: "Given items with weight & value,\nmaximize value within weight limit.\nEach item used at most once.\n\ndp[i][w] = max value using items 0..i\n           with capacity w\n\nProblems that map to knapsack:\n- Subset Sum\n- Equal Partition\n- Target Sum\n- Minimum Subset Difference\n- Count of Subset Sum",
  },
  {
    topic: "Monotonic Stack Pattern",
    front:
      "For array [2, 1, 4, 3], find the next\nelement to the right that is larger\nthan each element (Next Greater Element).\n\nWhat data structure solves this in O(n)?",
    back: "Monotonic Stack (decreasing order).\n  [2,1,4,3] -> result: [4,4,-1,-1]\n\nScan right to left:\n  for i = n-1 to 0:\n    while stack and top <= arr[i]: pop\n    result[i] = stack.top or -1\n    push(arr[i])\n\nAlso: daily temps, largest rectangle,\ntrapping rain water. Each elem pushed once.",
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
  {
    topic: "Pattern Recognition Strategy",
    front:
      "Given a brand new coding problem,\nhow do you identify which algorithmic\npattern to apply?\n\nWhat signals map to which patterns?",
    back: "Decision tree for pattern matching:\n\nSorted input -> Binary Search / Two Ptrs\nOptimization -> DP or Greedy\nAll combos/perms -> Backtracking\nGraph structure -> BFS / DFS\nStream/subarray -> Sliding Window\nOrdering/deps -> Topological Sort\nGrouping -> Union-Find\nRepeated min/max -> Heap\n\nAsk: what varies? That is your state.",
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
