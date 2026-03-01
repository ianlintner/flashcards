import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Two Sum (#1)",
    front:
      "Two Sum\n\nGiven an array of integers and a target,\nreturn indices of two numbers that\nadd up to target.\n\nWhat pattern and complexity?",
    back: "Pattern: HashMap (complement lookup)\n\nfor each num:\n  complement = target - num\n  if complement in map: return pair\n  map[num] = index\n\nTime:  O(n)\nSpace: O(n)\n\nBrute force would be O(n^2).",
  },
  {
    topic: "Best Time to Buy/Sell Stock (#121)",
    front:
      "Best Time to Buy and Sell Stock\n\nGiven prices array, find max profit\nfrom one buy and one sell.\n\nWhat pattern and complexity?",
    back: "Pattern: Track running minimum\n\nminPrice = Infinity\nmaxProfit = 0\nfor each price:\n  minPrice = min(minPrice, price)\n  maxProfit = max(maxProfit, price-minPrice)\n\nTime:  O(n)\nSpace: O(1)\n\nKadane's variant on differences.",
  },
  {
    topic: "Valid Parentheses (#20)",
    front:
      "Valid Parentheses\n\nGiven string with (){}[], determine\nif all brackets are properly closed.\n\nWhat pattern and complexity?",
    back: "Pattern: Stack\n\nPush opening brackets.\nOn closing bracket: check stack top\nmatches the corresponding opener.\nAt end: stack must be empty.\n\nTime:  O(n)\nSpace: O(n)",
  },
  {
    topic: "Merge Two Sorted Lists (#21)",
    front:
      "Merge Two Sorted Lists\n\nMerge two sorted linked lists into\none sorted list.\n\nWhat pattern and complexity?",
    back: "Pattern: Two Pointers / Merge\n\nUse dummy head node.\nCompare heads of both lists;\nappend smaller, advance that pointer.\nAppend remaining list at end.\n\nTime:  O(n + m)\nSpace: O(1) (reuse existing nodes)",
  },
  {
    topic: "Maximum Subarray (#53)",
    front:
      "Maximum Subarray (Kadane's Algorithm)\n\nFind contiguous subarray with\nlargest sum.\n\nWhat pattern and complexity?",
    back: "Pattern: Dynamic Programming (Kadane's)\n\ncurrentMax = arr[0]\nglobalMax = arr[0]\nfor i = 1 to n-1:\n  currentMax = max(arr[i],\n                   currentMax + arr[i])\n  globalMax = max(globalMax, currentMax)\n\nTime:  O(n)\nSpace: O(1)",
  },
  {
    topic: "Climbing Stairs (#70)",
    front:
      "Climbing Stairs\n\nYou can climb 1 or 2 steps.\nHow many distinct ways to reach step n?\n\nWhat pattern and complexity?",
    back: "Pattern: DP (Fibonacci variant)\n\ndp[i] = dp[i-1] + dp[i-2]\nBase: dp[1]=1, dp[2]=2\n\nOptimize to O(1) space with\ntwo rolling variables.\n\nTime:  O(n)\nSpace: O(1) optimized",
  },
  {
    topic: "Binary Tree Level Order (#102)",
    front:
      "Binary Tree Level Order Traversal\n\nReturn values level by level\n(left to right).\n\nWhat pattern and complexity?",
    back: "Pattern: BFS with level tracking\n\nqueue = [root]\nwhile queue:\n  levelSize = queue.length\n  level = []\n  for i in 0..levelSize-1:\n    node = dequeue\n    level.push(node.val)\n    enqueue children\n  result.push(level)\n\nTime:  O(n)\nSpace: O(n)",
  },
  {
    topic: "Linked List Cycle (#141)",
    front:
      "Linked List Cycle\n\nDetermine if a linked list has a cycle.\n\nWhat pattern and complexity?",
    back: "Pattern: Fast & Slow Pointers\n\nslow = head, fast = head\nwhile fast and fast.next:\n  slow = slow.next\n  fast = fast.next.next\n  if slow === fast: return true\nreturn false\n\nTime:  O(n)\nSpace: O(1)\n\nTo find cycle START: reset one pointer\nto head, both move 1 step until meet.",
  },
  {
    topic: "LRU Cache (#146)",
    front:
      "LRU Cache\n\nDesign a data structure for Least\nRecently Used cache with O(1)\nget and put.\n\nWhat data structures?",
    back: "HashMap + Doubly Linked List\n\nHashMap: key -> DLL node\nDLL: maintains access order\n  (most recent at head)\n\nget(key):\n  lookup in map, move node to head\nput(key, val):\n  if exists: update, move to head\n  else: create node at head\n  if over capacity: remove tail\n\nTime: O(1) both operations",
  },
  {
    topic: "Number of Islands (#200)",
    front:
      "Number of Islands\n\nGiven 2D grid of '1' (land) and\n'0' (water), count islands.\n\nWhat pattern and complexity?",
    back: "Pattern: DFS/BFS flood fill\n\nfor each cell:\n  if cell == '1':\n    count++\n    DFS/BFS to mark all connected\n    '1's as visited\n\nTime:  O(m * n)\nSpace: O(m * n) worst case stack/queue\n\nAlternative: Union-Find approach.",
  },
  {
    topic: "Coin Change (#322)",
    front:
      "Coin Change\n\nGiven coin denominations and amount,\nfind minimum coins to make amount.\n\nWhat pattern and complexity?",
    back: "Pattern: DP (unbounded knapsack)\n\ndp[0] = 0\nfor i = 1 to amount:\n  for each coin:\n    if coin <= i:\n      dp[i] = min(dp[i], dp[i-coin]+1)\n\nTime:  O(amount * coins)\nSpace: O(amount)\n\nGreedy does NOT work for arbitrary\ndenominations.",
  },
  {
    topic: "Product of Array Except Self (#238)",
    front:
      "Product of Array Except Self\n\nReturn array where output[i] = product\nof all elements except nums[i].\nNo division allowed.\n\nWhat pattern?",
    back: "Pattern: Prefix/Suffix products\n\nPass 1 (left to right):\n  prefix[i] = product of all left of i\nPass 2 (right to left):\n  suffix[i] = product of all right of i\nresult[i] = prefix[i] * suffix[i]\n\nTime:  O(n)\nSpace: O(1) extra (reuse output array)",
  },
  {
    topic: "3Sum (#15)",
    front:
      "3Sum\n\nFind all unique triplets that sum to 0.\n\nWhat pattern and complexity?",
    back: "Pattern: Sort + Two Pointers\n\n1. Sort array O(n log n)\n2. For each i:\n   left = i+1, right = n-1\n   while left < right:\n     sum = nums[i]+nums[left]+nums[right]\n     adjust pointers based on sum\n   Skip duplicates\n\nTime:  O(n^2)\nSpace: O(1) extra (or O(n) for sort)",
  },
  {
    topic: "Merge Intervals (#56)",
    front:
      "Merge Intervals\n\nGiven array of intervals,\nmerge all overlapping intervals.\n\nWhat pattern and complexity?",
    back: "Pattern: Sort + Merge Intervals\n\n1. Sort by start time\n2. For each interval:\n   if overlaps with last merged:\n     extend end = max(ends)\n   else:\n     push new interval\n\nOverlap: current.start <= prev.end\n\nTime:  O(n log n)\nSpace: O(n) for output",
  },
  {
    topic: "Word Break (#139)",
    front:
      "Word Break\n\nGiven string s and dictionary,\ncan s be segmented into dict words?\n\nWhat pattern and complexity?",
    back: "Pattern: DP\n\ndp[i] = can s[0..i-1] be segmented?\ndp[0] = true (empty string)\n\nfor i = 1 to n:\n  for j = 0 to i-1:\n    if dp[j] and s[j..i] in dict:\n      dp[i] = true; break\n\nTime:  O(n^2 * k) k=max word length\nSpace: O(n)\n\nOptimize with Trie for dictionary.",
  },
  {
    topic: "Longest Substring No Repeat (#3)",
    front:
      "Longest Substring Without\nRepeating Characters\n\nFind length of longest substring\nwith all unique characters.",
    back: "Pattern: Sliding Window + HashSet\n\nleft = 0, maxLen = 0\nfor right = 0 to n-1:\n  while s[right] in set:\n    set.remove(s[left])\n    left++\n  set.add(s[right])\n  maxLen = max(maxLen, right-left+1)\n\nTime:  O(n)\nSpace: O(min(n, alphabet))",
  },
  {
    topic: "Subsets (#78)",
    front:
      "Subsets\n\nGiven array of unique integers,\nreturn all possible subsets.\n\nWhat pattern and complexity?",
    back: "Pattern: Backtracking\n\nfunction backtrack(start, current):\n  result.push([...current])\n  for i = start to n-1:\n    current.push(nums[i])\n    backtrack(i+1, current)\n    current.pop()  // backtrack\n\nTime:  O(n * 2^n)\nSpace: O(n) recursion depth\n\nAlternative: bitmask iteration\nfrom 0 to 2^n - 1.",
  },
  {
    topic: "Longest Common Subsequence (#1143)",
    front:
      "Longest Common Subsequence\n\nGiven two strings, find length of\ntheir LCS.\n\nWhat pattern and complexity?",
    back: "Pattern: 2D DP\n\ndp[i][j] = LCS of s1[0..i-1], s2[0..j-1]\n\nif s1[i-1] == s2[j-1]:\n  dp[i][j] = dp[i-1][j-1] + 1\nelse:\n  dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n\nTime:  O(m * n)\nSpace: O(m * n), optimizable to O(min(m,n))",
  },
  {
    topic: "Serialize/Deserialize BT (#297)",
    front:
      "Serialize and Deserialize Binary Tree\n\nDesign algorithm to encode and decode\na binary tree to/from a string.",
    back: 'Pattern: Preorder DFS + null markers\n\nSerialize:\n  preorder traversal\n  append "null" for missing children\n  Join with comma: "1,2,null,null,3,4,5"\n\nDeserialize:\n  split by comma, use queue/index\n  recursively build left then right\n\nTime:  O(n) both\nSpace: O(n) both\n\nBFS (level order) also works.',
  },
  {
    topic: "Trapping Rain Water (#42)",
    front:
      "Trapping Rain Water\n\nGiven elevation map, compute how much\nwater is trapped after rain.\n\nWhat approaches exist?",
    back: "Approach 1: Two Pointers O(n)/O(1)\n  Track leftMax, rightMax\n  Water at i = min(leftMax, rightMax) - h[i]\n\nApproach 2: Monotonic Stack O(n)/O(n)\n  Decreasing stack, compute water\n  when popping (bounded by sides)\n\nApproach 3: Prefix/Suffix max O(n)/O(n)\n  Precompute leftMax[], rightMax[]",
  },
  {
    topic: "Course Schedule (#207)",
    front:
      "Course Schedule\n\nGiven prerequisites, determine if you\ncan finish all courses (detect cycle\nin directed graph).\n\nWhat pattern?",
    back: "Pattern: Topological Sort (Kahn's BFS)\n\n1. Build adjacency list + in-degree array\n2. Queue all nodes with in-degree 0\n3. Process queue:\n   decrement in-degree of neighbors\n   enqueue newly zero-degree nodes\n4. If processed count < numCourses:\n   CYCLE exists -> return false\n\nTime:  O(V + E)\nSpace: O(V + E)",
  },
  {
    topic: "Median of Two Sorted Arrays (#4)",
    front:
      "Median of Two Sorted Arrays\n\nFind median of two sorted arrays\nin O(log(min(m,n))) time.\n\nWhat approach?",
    back: "Pattern: Binary Search on partition\n\nBinary search on shorter array.\nPartition both arrays so left half\nhas (m+n+1)/2 elements.\n\nValid partition:\n  maxLeftA <= minRightB\n  maxLeftB <= minRightA\n\nMedian from the four boundary elements.\n\nTime:  O(log(min(m,n)))\nSpace: O(1)",
  },
  {
    topic: "Word Search (#79)",
    front:
      "Word Search\n\nGiven 2D grid and word, find if word\nexists in grid moving up/down/left/right.\n\nWhat pattern?",
    back: "Pattern: DFS Backtracking\n\nFor each cell matching word[0]:\n  DFS with index into word\n  Mark cell visited (in-place modify)\n  Explore 4 directions\n  Restore cell (backtrack)\n\nTime:  O(m * n * 4^L) L = word length\nSpace: O(L) recursion depth\n\nPrune early if character doesn't match.",
  },
  {
    topic: "Min Stack (#155)",
    front:
      "Min Stack\n\nDesign stack that supports push, pop,\ntop, and getMin all in O(1).\n\nWhat approach?",
    back: "Approach: Two stacks (or pairs)\n\nStack 1: normal values\nStack 2: running minimums\n\npush(x):\n  stack1.push(x)\n  stack2.push(min(x, stack2.top))\n\npop(): pop from both\ngetMin(): return stack2.top\n\nTime:  O(1) all operations\nSpace: O(n)",
  },
  {
    topic: "Kth Largest Element (#215)",
    front:
      "Kth Largest Element in Array\n\nFind the kth largest element.\n\nWhat are the approaches?",
    back: "Approach 1: Min-Heap of size K\n  Time: O(n log k)\n  Space: O(k)\n\nApproach 2: Quickselect\n  Time: O(n) average, O(n^2) worst\n  Space: O(1)\n  Partition like quicksort but only\n  recurse into ONE side.\n\nApproach 3: Sort\n  Time: O(n log n)\n  Space: O(1)-O(n)",
  },
  {
    topic: "Edit Distance (#72)",
    front:
      "Edit Distance (Levenshtein)\n\nGiven two strings, find minimum\noperations (insert, delete, replace)\nto convert one to the other.",
    back: "Pattern: 2D DP\n\ndp[i][j] = min edits for s1[0..i-1]\n           to s2[0..j-1]\n\nif s1[i-1] == s2[j-1]:\n  dp[i][j] = dp[i-1][j-1]\nelse:\n  dp[i][j] = 1 + min(\n    dp[i-1][j],    // delete\n    dp[i][j-1],    // insert\n    dp[i-1][j-1]   // replace\n  )\n\nTime:  O(m * n)\nSpace: O(m * n), O(min(m,n)) optimized",
  },
  {
    topic: "Longest Increasing Subsequence (#300)",
    front:
      "Longest Increasing Subsequence\n\nFind length of longest strictly\nincreasing subsequence.\n\nWhat are the approaches?",
    back: "DP approach:\n  dp[i] = LIS ending at index i\n  dp[i] = max(dp[j]+1) for all j<i\n          where nums[j] < nums[i]\n  Time: O(n^2)\n\nBinary search approach:\n  Maintain sorted tails array\n  For each num: binary search for\n  insertion point\n  Time: O(n log n)\n  Space: O(n)",
  },
  {
    topic: "Rotate Image (#48)",
    front:
      "Rotate Image\n\nRotate n x n matrix 90 degrees\nclockwise IN PLACE.\n\nWhat is the approach?",
    back: "Two-step approach:\n1. Transpose: swap matrix[i][j]\n   with matrix[j][i]\n2. Reverse each row\n\nAlternatively:\n  Rotate layer by layer\n  (outer ring, then inner rings)\n\nTime:  O(n^2)\nSpace: O(1) in-place\n\n90 CCW: transpose + reverse columns\n180: reverse rows + reverse columns",
  },
  {
    topic: "Design Problems Summary",
    front:
      "Name 5 classic design / data structure\nproblems frequently asked in interviews.",
    back: "1. LRU Cache (#146)\n   HashMap + Doubly Linked List\n\n2. Min Stack (#155)\n   Two stacks\n\n3. Trie / Prefix Tree (#208)\n   TrieNode with children map\n\n4. Random Pick with Weight (#528)\n   Prefix sum + binary search\n\n5. Time-Based Key-Value Store (#981)\n   HashMap + binary search on timestamps",
  },
];

export const LEETCODE_PROBLEMS: DeckInfo = {
  id: "leetcode-problems",
  title: "LeetCode: Classic Problems",
  description:
    "30 must-know LeetCode problems with solution approach, pattern, and Big O analysis.",
  level: "advanced",
  category: "Interview Problems",
  cards,
};
