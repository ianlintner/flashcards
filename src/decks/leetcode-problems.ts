import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Two Sum (#1)",
    front:
      "Two Sum\n\nGiven an array of integers and a target,\nreturn indices of two numbers that\nadd up to target.\n\nWhat pattern and complexity?",
    back: "Pattern: HashMap (complement lookup)\n\nfor each num:\n  complement = target - num\n  if complement in map: return pair\n  map[num] = index\n\nTime: O(n) | Space: O(n)\nBrute force: O(n^2). Sorted: 2-ptr O(n).",
  },
  {
    topic: "Best Time to Buy/Sell Stock (#121)",
    front:
      "Best Time to Buy and Sell Stock\n\nGiven prices array, find max profit\nfrom one buy and one sell.\n\nWhat pattern and complexity?",
    back: "Pattern: Track running minimum\n\nminPrice = Infinity, maxProfit = 0\nfor each price:\n  minPrice = min(minPrice, price)\n  maxProfit = max(maxProfit, price-min)\n\nTime: O(n) | Space: O(1)\nKadane's variant on price differences.",
  },
  {
    topic: "Valid Parentheses (#20)",
    front:
      "Given a string of brackets (){}[],\ndetermine if they are properly balanced.\n\nWhat data structure makes this trivial?\nWhat is the complexity?",
    back: "Pattern: Stack\n\nPush opening brackets.\nOn closing bracket: check stack top\nmatches the corresponding opener.\nAt end: stack must be empty.\n\nTime: O(n) | Space: O(n)\nMnemonic: LIFO matches FILO nesting.",
  },
  {
    topic: "Merge Two Sorted Lists (#21)",
    front:
      "Merge Two Sorted Lists\n\nMerge two sorted linked lists into\none sorted list.\n\nWhat pattern and complexity?",
    back: "Pattern: Two Pointers / Merge\n\nUse dummy head node.\nCompare heads of both lists;\nappend smaller, advance that pointer.\nAppend remaining list at end.\n\nTime: O(n + m) | Space: O(1)",
  },
  {
    topic: "Maximum Subarray (#53)",
    front:
      "Maximum Subarray (Kadane's Algorithm)\n\nFind contiguous subarray with\nlargest sum.\n\nWhat pattern and complexity?",
    back: "Pattern: DP (Kadane's)\n\ncurrentMax = max(arr[i], currentMax+arr[i])\nglobalMax = max(globalMax, currentMax)\n\nDecision at each step: start fresh\nor extend previous subarray.\n\nTime: O(n) | Space: O(1)",
  },
  {
    topic: "Climbing Stairs (#70)",
    front:
      "Climbing Stairs\n\nYou can climb 1 or 2 steps.\nHow many distinct ways to reach step n?\n\nWhat pattern and complexity?",
    back: "Pattern: DP (Fibonacci variant)\n\ndp[i] = dp[i-1] + dp[i-2]\nBase: dp[1]=1, dp[2]=2\n\nOptimize to O(1) space with\ntwo rolling variables.\n\nTime: O(n) | Space: O(1) optimized",
  },
  {
    topic: "Binary Tree Level Order (#102)",
    front:
      "Binary Tree Level Order Traversal\n\nReturn values level by level\n(left to right).\n\nWhat pattern and complexity?",
    back: "Pattern: BFS with level grouping\n\nqueue = [root]\nwhile queue not empty:\n  process queue.length nodes, enqueue kids\n  append level array to result\n\nTime: O(n) | Space: O(n)\nKey: snapshot queue size before loop.",
  },
  {
    topic: "Linked List Cycle (#141)",
    front:
      "Linked List Cycle\n\nDetermine if a linked list has a cycle.\n\nWhat pattern and complexity?",
    back: "Pattern: Fast & Slow Pointers (Floyd's)\n\nslow moves 1, fast moves 2.\nMeet -> cycle. To find start: reset\none to head, both move 1 until meet.\n\nTime: O(n) | Space: O(1)\nMnemonic: Tortoise and Hare race.",
  },
  {
    topic: "LRU Cache (#146)",
    front:
      "LRU Cache (Browser Tab Memory)\n\nA browser keeps recently visited pages\nin memory. Design a cache with O(1)\nget and put that evicts the least\nrecently used entry.\n\nWhat data structures?",
    back: "HashMap + Doubly Linked List\n\nMap: key -> DLL node (O(1) lookup)\nDLL: access order (recent at head)\n\nget: find in map, move to head\nput: add/update at head;\n  over capacity -> remove tail\n\nTime: O(1) both ops\nMnemonic: Map finds it, List ranks it.",
  },
  {
    topic: "Number of Islands (#200)",
    front:
      "Number of Islands (Satellite Mapping)\n\nA satellite image shows land ('1') and\nwater ('0') in a 2D grid. Count the\nnumber of distinct landmasses.\n\nWhat algorithm and complexity?",
    back: "Pattern: DFS/BFS flood fill\n\nfor each unvisited '1':\n  count++, flood fill connected land\n  cells to mark as visited\n\nTime: O(m * n) | Space: O(m * n)\nAlt: Union-Find approach.",
  },
  {
    topic: "Coin Change (#322)",
    front:
      "Coin Change\n\nGiven coin denominations and amount,\nfind minimum coins to make amount.\n\nWhat pattern and complexity?",
    back: "Pattern: DP (unbounded knapsack)\n\ndp[0] = 0\nfor i = 1 to amount:\n  for coin <= i: dp[i]=min(dp[i],dp[i-coin]+1)\n\nTime: O(amount * coins)\nSpace: O(amount)\nGreedy does NOT work for all denominations.",
  },
  {
    topic: "Product of Array Except Self (#238)",
    front:
      "Product of Array Except Self\n\nReturn array where output[i] = product\nof all elements except nums[i].\nNo division allowed.\n\nWhat pattern?",
    back: "Pattern: Prefix/Suffix products\n\nPass 1 (L to R): prefix[i] = all left\nPass 2 (R to L): suffix[i] = all right\nresult[i] = prefix[i] * suffix[i]\n\nTime: O(n)\nSpace: O(1) extra (reuse output array)",
  },
  {
    topic: "3Sum (#15)",
    front:
      "3Sum\n\nFind all unique triplets that sum to 0.\n\nWhat pattern and complexity?",
    back: "Pattern: Sort + Two Pointers\n\n1. Sort array O(n log n)\n2. For each i: two pointers from i+1, n-1\n   Adjust based on sum vs 0\n3. Skip duplicate values\n\nTime: O(n^2) | Space: O(1) extra\nKey: sorting enables duplicate skipping.",
  },
  {
    topic: "Merge Intervals (#56)",
    front:
      "Merge Intervals (Calendar Planner)\n\nA calendar app needs to combine\noverlapping meetings into blocks.\nGiven array of [start, end] intervals,\nmerge all overlapping ones.\n\nWhat pattern and complexity?",
    back: "Pattern: Sort + Linear Merge\n\n1. Sort by start time\n2. For each interval:\n   if current.start <= prev.end:\n     extend: end = max(ends)\n   else: push new interval\n\nTime: O(n log n) | Space: O(n)",
  },
  {
    topic: "Word Break (#139)",
    front:
      "Word Break\n\nGiven string s and dictionary,\ncan s be segmented into dict words?\n\nWhat pattern and complexity?",
    back: "Pattern: DP\n\ndp[i] = can s[0..i-1] be segmented?\nfor each i, check all j < i:\n  if dp[j] and s[j..i] in dict: dp[i]=true\nBase: dp[0] = true (empty string)\n\nTime: O(n^2 * k) | Space: O(n)\nOptimize: use Trie for dict lookup.",
  },
  {
    topic: "Longest Substring No Repeat (#3)",
    front:
      "Longest Substring Without\nRepeating Characters\n\nFind length of longest substring\nwith all unique characters.",
    back: "Pattern: Sliding Window + HashSet\n\nExpand right: add char to set.\nIf dupe: shrink left until no dupe.\nTrack max window length.\n\nTime: O(n) | Space: O(min(n, alphabet))\nMnemonic: Slide right, shrink left.",
  },
  {
    topic: "Subsets (#78)",
    front:
      "Subsets\n\nGiven array of unique integers,\nreturn all possible subsets.\n\nWhat pattern and complexity?",
    back: "Pattern: Backtracking\n\nInclude or exclude each element.\nbacktrack(start, current):\n  add current to result\n  for i=start..n-1: add, recurse(i+1), pop\n\nTime: O(n * 2^n) | Space: O(n)\nAlt: bitmask from 0 to 2^n - 1.",
  },
  {
    topic: "Longest Common Subsequence (#1143)",
    front:
      "Longest Common Subsequence\n\nGiven two strings, find length of\ntheir LCS.\n\nWhat pattern and complexity?",
    back: "Pattern: 2D DP\n\nif s1[i-1] == s2[j-1]:\n  dp[i][j] = dp[i-1][j-1] + 1\nelse:\n  dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n\nTime: O(m * n)\nSpace: O(min(m,n)) optimized",
  },
  {
    topic: "Serialize/Deserialize BT (#297)",
    front:
      "Serialize and Deserialize Binary Tree\n\nDesign algorithm to encode and decode\na binary tree to/from a string.",
    back: "Preorder DFS + null markers\n\nSerialize: preorder, write null for\nmissing children. e.g. 1,2,N,N,3,4,5\nDeserialize: split, recursively build\nleft then right using index pointer.\n\nTime: O(n) | Space: O(n)\nBFS level-order also works.",
  },
  {
    topic: "Trapping Rain Water (#42)",
    front:
      "Trapping Rain Water\n\nGiven elevation map, compute how much\nwater is trapped after rain.\n\nWhat approaches exist?",
    back: "Approach 1: Two Pointers O(n)/O(1)\n  Water at i = min(leftMax,rightMax)-h[i]\n  Track leftMax, rightMax from edges.\n\nApproach 2: Monotonic Stack O(n)/O(n)\n  Decreasing stack, compute on pop.\n\nApproach 3: Prefix/Suffix max O(n)/O(n)\n  Precompute leftMax[], rightMax[]",
  },
  {
    topic: "Course Schedule (#207)",
    front:
      "Course Schedule (University Planner)\n\nA student has courses with prerequisites.\nGiven the dependency list, can they\ncomplete all courses? (Detect cycle\nin directed graph.)\n\nWhat pattern?",
    back: "Pattern: Topological Sort (Kahn's BFS)\n\n1. Build adjacency list + in-degree array\n2. Enqueue all in-degree 0 nodes\n3. Process: decrement neighbor degrees\n   Enqueue newly zero-degree nodes\n4. If count < total: CYCLE -> false\n\nTime: O(V + E) | Space: O(V + E)",
  },
  {
    topic: "Word Search (#79)",
    front:
      "Word Search\n\nGiven 2D grid and word, find if word\nexists in grid moving up/down/left/right.\n\nWhat pattern?",
    back: "Pattern: DFS Backtracking\n\nFor each cell matching word[0]:\n  DFS tracking index, mark visited,\n  explore 4 dirs, restore on backtrack\n\nTime: O(m*n*4^L), L = word length\nSpace: O(L) recursion depth",
  },
  {
    topic: "Min Stack (#155)",
    front:
      "Min Stack\n\nDesign stack that supports push, pop,\ntop, and getMin all in O(1).\n\nWhat approach?",
    back: "Approach: Two parallel stacks\n\nStack 1: normal values\nStack 2: running minimums\n\npush(x): push to both;\nstack2 gets min(x, stack2.top)\npop(): pop both | getMin(): stack2.top\n\nTime: O(1) all ops | Space: O(n)",
  },
  {
    topic: "Kth Largest Element (#215)",
    front:
      "Kth Largest Element in Array\n\nFind the kth largest element.\n\nWhat are the approaches?",
    back: "1. Min-Heap size k: O(n log k)\n   Keep k largest in heap.\n2. Quickselect: O(n) avg, O(n^2) worst\n   Partition, recurse ONE side only.\n3. Sort: O(n log n)\n\nBest avg: Quickselect O(n)\nSafest: Heap O(n log k)",
  },
  {
    topic: "Edit Distance (#72)",
    front:
      "Edit Distance (Levenshtein)\n\nGiven two strings, find minimum\noperations (insert, delete, replace)\nto convert one to the other.",
    back: "Pattern: 2D DP\n\nif match: dp[i][j] = dp[i-1][j-1]\nelse: 1 + min(dp[i-1][j],  // delete\n  dp[i][j-1],    // insert\n  dp[i-1][j-1])  // replace\n\nTime: O(m * n)\nSpace: O(min(m,n)) optimized",
  },
  {
    topic: "Longest Increasing Subsequence (#300)",
    front:
      "Longest Increasing Subsequence\n\nFind length of longest strictly\nincreasing subsequence.\n\nWhat are the approaches?",
    back: "DP: dp[i] = LIS ending at i\ndp[i] = max(dp[j]+1) for j<i, a[j]<a[i]\nTime: O(n^2)\n\nBinary Search: maintain sorted tails.\nFor each num: find insertion point.\nTime: O(n log n) | Space: O(n)\n\nMnemonic: patience sorting (card piles).",
  },
  {
    topic: "Rotate Image (#48)",
    front:
      "Rotate Image\n\nRotate n x n matrix 90 degrees\nclockwise IN PLACE.\n\nWhat is the approach?",
    back: "Two-step approach:\n1. Transpose: swap [i][j] with [j][i]\n2. Reverse each row\n\nTime: O(n^2) | Space: O(1)\n\n90 CCW: transpose + reverse columns\n180: reverse rows then columns\nMnemonic: Transpose then flip.",
  },
  {
    topic: "Design Problems Summary",
    front:
      "Name 5 classic design / data structure\nproblems frequently asked in interviews.",
    back: "1. LRU Cache (#146)\n   HashMap + Doubly Linked List\n2. Min Stack (#155) - Two stacks\n3. Trie (#208) - TrieNode + children map\n4. Random Pick with Weight (#528)\n   Prefix sum + binary search\n5. Time-Based KV Store (#981)\n   HashMap + binary search on timestamps",
  },
];

export const LEETCODE_PROBLEMS: DeckInfo = {
  id: "leetcode-problems",
  title: "LeetCode: Classic Problems",
  description:
    "28 must-know LeetCode problems with solution patterns, key insights, and Big O analysis.",
  level: "advanced",
  category: "Interview Problems",
  cards,
};
