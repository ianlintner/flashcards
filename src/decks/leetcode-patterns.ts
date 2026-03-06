import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Two Pointers Pattern",
    front:
      "Describe the Two Pointers pattern.\n\nHow do you recognize it in a problem?",
    back: "Two pointers move through sorted array\nor linked list.\n\nSignals:\n- Pair/triplet search in sorted input\n- Remove duplicates in place\n- Palindrome checking\n\nExamples: Two Sum II, 3Sum,\nContainer With Most Water, Trapping Rain.",
  },
  {
    topic: "Sliding Window Pattern",
    front: "Describe the Sliding Window pattern.\n\nWhat are the two types?",
    back: "Fixed: max sum subarray of size k,\nall anagrams in a string.\n\nVariable: longest substring w/o repeats,\nmin window substring, longest sum <= k.\n\nTemplate: expand right, shrink left\nwhen constraint violated.\nTrack answer at each valid state.",
  },
  {
    topic: "Fast & Slow Pointers",
    front:
      "Describe the Fast & Slow Pointers\npattern (Floyd's cycle detection).\n\nWhen do you use it?",
    back: "Slow moves 1 step, fast moves 2 steps.\n\nUse cases:\n- Detect cycle / find cycle start\n- Find middle of linked list\n- Happy number detection\n- Palindrome linked list\n\nIf cycle exists: they WILL meet.",
  },
  {
    topic: "Merge Intervals Pattern",
    front:
      "Describe the Merge Intervals pattern.\n\nHow do you approach these problems?",
    back: "1. Sort by start time\n2. Overlap if next.start <= curr.end\n3. Merge or split accordingly\n\nProblems: Merge Intervals,\nInsert Interval, Meeting Rooms I & II,\nMin Platforms, Interval Intersections.\n\nTime: O(n log n) for sorting.",
  },
  {
    topic: "Binary Search Variations",
    front:
      "Given a sorted matrix where each row\nstarts greater than the last row ends,\nfind a target value.\n\nHow do you apply binary search here?",
    back: "Matrix as sorted array: mid -> [mid/n][mid%n]\n\nVariations:\n1. Standard: find exact target\n2. Lower/upper bound (first >=, >)\n3. Rotated sorted array\n4. Answer space search (min/max)\n5. Peak finding (bitonic array)\n\nKey: identify a MONOTONIC property.",
  },
  {
    topic: "BFS for Shortest Path",
    front:
      "When should you use BFS to find\nshortest path? What's the template?",
    back: "Use BFS when edges are UNWEIGHTED.\n\nTemplate:\n  queue=[start], visited={start}, level=0\n  while queue:\n    process current level\n    if target found: return level\n    add unvisited neighbors, level++\n\nProblems: word ladder, min knight moves,\nopen the lock, shortest bridge.",
  },
  {
    topic: "DFS + Backtracking",
    front:
      "You're solving N-Queens: place N queens\non an N x N board with no two attacking.\n\nHow does backtracking with pruning\nreduce this from brute force to practical?",
    back: "Backtracking = DFS + pruning.\nPrune invalid branches EARLY to cut\nthe search tree (N-Queens: ~95% pruned).\n\nTemplate:\n  backtrack(state, choices):\n    if goal: record result\n    for valid choice:\n      make -> recurse -> undo",
  },
  {
    topic: "Topological Sort Pattern",
    front: "When do you need Topological Sort?\n\nWhat are the two approaches?",
    back: "Use for ordering with DEPENDENCIES (DAG).\n\n1. Kahn's (BFS): queue nodes w/ in-degree 0\n   Also detects cycles\n2. DFS: post-order + reverse\n\nProblems: course schedule, build order,\nalien dictionary, task scheduling.",
  },
  {
    topic: "Heap / Top-K Pattern",
    front: "Describe the Top-K pattern\nusing a Heap. When do you use it?",
    back: "K largest: MIN-heap of size K\nK smallest: MAX-heap of size K\nTime: O(n log k)\n\nProblems: Kth largest element,\nTop K frequent, K closest points,\nMerge K sorted lists,\nFind median from data stream.",
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
    back: "dp[i][j] = dp[i-1][j] + dp[i][j-1]\nBase: dp[0][j] = dp[i][0] = 1\n\nVariants: Min Path Sum, Dungeon Game\n(work backwards), Cherry Pickup.\n\nSignal: 2D grid, move right/down,\noptimize or count paths.",
  },
  {
    topic: "State Machine DP",
    front:
      "In 'Best Time to Buy/Sell Stock with\nCooldown', you can hold, sell, or rest\neach day.\n\nHow does state machine DP model this?",
    back: "States per day:\n  hold = max profit while holding\n  sold = max profit just sold\n  rest = max profit in cooldown\n\nTransitions:\n  hold = max(hold, rest - price)\n  sold = hold + price\n  rest = max(rest, sold)\nAlso: K transactions, transaction fee.",
  },
  {
    topic: "0/1 Knapsack Pattern",
    front: "Describe the 0/1 Knapsack pattern.\n\nWhat problems map to it?",
    back: "Items with weight & value; maximize value\nwithin capacity. Each item used at most once.\n\ndp[i][w] = max value, items 0..i, cap w\n\nMaps to: Subset Sum, Equal Partition,\nTarget Sum, Min Subset Difference,\nCount of Subset Sum.",
  },
  {
    topic: "Monotonic Stack Pattern",
    front:
      "For array [2, 1, 4, 3], find the next\nelement to the right that is larger\nthan each element (Next Greater Element).\n\nWhat data structure solves this in O(n)?",
    back: "Monotonic Stack (decreasing order).\n[2,1,4,3] -> [4,4,-1,-1]\n\nScan right to left: pop while top<=arr[i],\nrecord stack.top or -1, push arr[i].\n\nAlso: daily temps, largest rectangle,\ntrapping rain water. O(n) total.",
  },
  {
    topic: "Union-Find Pattern",
    front: "When should you use Union-Find\nin an interview problem?",
    back: 'Signals: grouping, connectivity,\n"are X and Y connected?"\n\nTemplate: find(x) w/ path compression,\nunion(x,y) w/ rank. Nearly O(1) amortized.\n\nProblems: number of islands, accounts merge,\nredundant connection, graph valid tree,\nearliest moment friends connected.',
  },
  {
    topic: "Prefix Sum Pattern",
    front: "Describe the Prefix Sum pattern.\n\nWhat problems does it solve?",
    back: "prefix[i] = sum(arr[0..i])\nrangeSum(l,r) = prefix[r] - prefix[l-1]\nO(n) build, O(1) range query.\n\nProblems: subarray sum = K (+ hashmap),\nrange sum query, contiguous array,\nproduct except self, 2D prefix sums.",
  },
  {
    topic: "Tree DFS Patterns",
    front: "What are the main DFS patterns\nfor binary tree problems?",
    back: "1. Top-down (preorder): pass info down\n   Ex: max depth, path sum\n2. Bottom-up (postorder): collect from kids\n   Ex: diameter, balanced check\n3. Path tracking: root to current node\n   Ex: path sum II, LCA\n4. Serialize: preorder + null markers",
  },
  {
    topic: "Graph: Detect Cycle",
    front: "How do you detect a cycle in a\ndirected vs undirected graph?",
    back: "Directed: DFS 3 colors (white/grey/black).\nCycle if you revisit a GREY node.\nOr: Kahn's topo sort (cycle if incomplete).\n\nUndirected: DFS - neighbor visited AND\nnot parent. Or: Union-Find returns false\nwhen both already in same set.",
  },
  {
    topic: "Bit Manipulation Patterns",
    front: "What are the key bit manipulation\npatterns for interviews?",
    back: "1. XOR: a^a=0, a^0=a (single number)\n2. n & (n-1): clear lowest bit (pow of 2)\n3. n & (-n): isolate lowest set bit\n4. Bitmask subsets: 0 to 2^n - 1\n5. Bit shift: multiply/divide by 2\n\nProblems: single number, counting bits,\nreverse bits, missing number.",
  },
  {
    topic: "Greedy Pattern Recognition",
    front: "How do you recognize when Greedy\nworks for a problem?",
    back: 'Greedy works when:\n1. Local optimal -> global optimal\n2. Greedy choice property\n3. No need to reconsider past decisions\n\nSignals: "min/max number of...",\nscheduling, interval selection.\n\nProblems: jump game, gas station,\ntask scheduler, partition labels.',
  },
  {
    topic: "Matrix Traversal Patterns",
    front: "What patterns are used for\n2D matrix / grid problems?",
    back: "1. Multi-source BFS (rotting oranges)\n2. DFS flood fill (islands, regions)\n3. Grid DP (unique paths, min path sum)\n4. Diagonal / Spiral traversal\n5. Binary search on sorted matrix\n\nDirection array:\ndx=[-1,1,0,0], dy=[0,0,-1,1]",
  },
  {
    topic: "String Pattern Matching",
    front:
      "What techniques are used for\nstring pattern matching in interviews?",
    back: "1. Two pointers (palindrome check)\n2. Sliding window (anagrams, substring)\n3. HashMap frequency count\n4. Trie (prefix match, word search)\n5. KMP / Rabin-Karp (substring search)\n6. DP (edit distance, LCS)\n\nProblems: palindromic substring, anagrams,\nmin window substring, word break, regex.",
  },
  {
    topic: "Divide and Conquer Pattern",
    front: "When should you use Divide and\nConquer? What's the structure?",
    back: "1. DIVIDE: split into subproblems\n2. CONQUER: solve recursively\n3. COMBINE: merge sub-results\n\nUse when problem splits in half,\nsubproblems are independent,\ncombining is efficient.\n\nProblems: merge/quick sort, closest pair,\ncount inversions, max subarray.",
  },
  {
    topic: "Two Heaps Pattern",
    front: "Describe the Two Heaps pattern.\n\nWhat problems use it?",
    back: "Max-heap (left) + min-heap (right).\nInvariant: maxHeap.top <= minHeap.top,\nsizes differ by at most 1.\n\nMedian: maxHeap.top (odd count)\nor avg of both tops (even count).\n\nProblems: find median from data stream,\nsliding window median, IPO.",
  },
  {
    topic: "Modified Binary Search",
    front: "Describe Binary Search on Answer\nSpace. Give an example.",
    back: "Search a RANGE of possible answers\ninstead of an array.\n\nlo, hi = min_answer, max_answer\nwhile lo < hi:\n  mid = (lo+hi)/2\n  if feasible(mid): hi = mid\n  else: lo = mid + 1\n\nExamples: Koko eating bananas,\nsplit array largest sum, ship packages.",
  },
  {
    topic: "Graph: Shortest Path Decision",
    front: "How do you choose the right\nshortest-path algorithm?",
    back: "Unweighted -> BFS  O(V+E)\nNon-negative -> Dijkstra  O((V+E) log V)\nNegative wts -> Bellman-Ford  O(V*E)\nAll pairs -> Floyd-Warshall  O(V^3)\nDAG -> Topo sort + relax  O(V+E)\n\nPick by: edge weights and scope\n(single-source vs all-pairs).",
  },
  {
    topic: "Interval Scheduling Pattern",
    front:
      "Describe the Interval Scheduling\npattern. What's the greedy strategy?",
    back: "MAX non-overlapping:\n  Sort by end time, greedily pick\n  earliest-ending, skip overlaps.\n\nMIN rooms / platforms:\n  Sort start & end separately,\n  sweep line counting overlaps.\n\nProblems: meeting rooms, non-overlapping\nintervals, minimum platforms.",
  },
  {
    topic: "Pattern Recognition Strategy",
    front:
      "Given a brand new coding problem,\nhow do you identify which algorithmic\npattern to apply?\n\nWhat signals map to which patterns?",
    back: "Sorted -> Binary Search / Two Pointers\nOptimize -> DP or Greedy\nAll combos -> Backtracking\nGraph -> BFS / DFS\nSubarray -> Sliding Window\nDependencies -> Topological Sort\nGrouping -> Union-Find\nMin/max -> Heap\nKey: what varies? That's your DP state.",
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
