import type { DeckInfo } from "./types";

export const LEETCODE_PROBLEMS_EXTENDED: DeckInfo = {
  id: "leetcode-problems-extended",
  title: "LeetCode Problems -- Extended Set",
  description:
    "30 additional Blind 75 and NeetCode 150 problems not covered in the base deck. Covers graphs, trees, heaps, tries, bit manipulation, math, and advanced DP.",
  level: "advanced",
  category: "Interview Problems",
  cards: [
    // -- Arrays & Hashing ---
    {
      topic: "Contains Duplicate (#217)",
      front:
        "Contains Duplicate\n\nA system flags user IDs if any repeat.\nGiven an int array, return true if\nany value appears at least twice.\n\nWhat is the optimal approach?",
      back: "Approach: Hash Set\n\nAdd each num to set; if already present\nreturn true immediately.\n\nTime: O(n) | Space: O(n)\n\nAlt: Sort first O(n log n), check\nadjacent elements.\n\nMnemonic: Set = instant dupe detector.",
    },
    {
      topic: "Valid Anagram (#242)",
      front:
        "Valid Anagram\n\nGiven strings s and t, return true\nif t is an anagram of s.\n\nExample: 'anagram', 'nagaram' -> true",
      back: "Approach: Character Frequency Count\n\nCount chars in s, decrement for t.\nIf any count goes negative -> false.\n\nTime: O(n) | Space: O(1) (26 letters)\n\nAlt: sorted(s)==sorted(t) O(n log n)\n\nMnemonic: same letters, different order.\nCount to confirm.",
    },
    {
      topic: "Group Anagrams (#49)",
      front:
        "Group Anagrams\n\nGiven array of strings, group anagrams.\n\nInput: ['eat','tea','tan','ate','nat','bat']\nOutput: [['eat','tea','ate'],\n         ['tan','nat'],['bat']]",
      back: "Approach: Sorted String as Key\n\nFor each word, sort chars as key.\nGroup words sharing the same key.\n\nTime: O(n * k log k)\n  n = strings, k = max length\nSpace: O(n * k)\n\nOptimization: char frequency tuple as\nkey avoids sorting -> O(n * k).",
    },
    {
      topic: "Top K Frequent Elements (#347)",
      front:
        "Top K Frequent Elements\n\nGiven int array nums and int k,\nreturn k most frequent elements.\n\nInput: [1,1,1,2,2,3], k=2\nOutput: [1,2]",
      back: "Approach 1: Bucket Sort O(n)\n\nCount frequencies, create buckets\nindexed by frequency, collect from\nhighest bucket down.\n\nApproach 2: Min Heap O(n log k)\nMaintain heap of size k.\n\nTime: O(n) bucket | O(n log k) heap\nSpace: O(n)",
    },
    // -- Two Pointers ---
    {
      topic: "Container With Most Water (#11)",
      front:
        "Container With Most Water\n\nYou have fence posts of varying heights.\nWhich two posts hold the most water\nbetween them?\n\nInput: [1,8,6,2,5,4,8,3,7]\nOutput: 49",
      back: "Approach: Two Pointers\n\nStart at widest (l=0, r=end).\nArea = width * min(height[l], height[r])\nMove the shorter side inward.\n\nWhy? Moving taller side can only\ndecrease area (width shrinks, height\ncapped by shorter side).\n\nTime: O(n) | Space: O(1)",
    },
    {
      topic: "Valid Palindrome (#125)",
      front:
        "Valid Palindrome\n\nGiven string s, return true if it is a\npalindrome considering only alphanumeric\ncharacters and ignoring case.\n\nInput: 'A man, a plan, a canal: Panama'\nOutput: true",
      back: "Approach: Two Pointers\n\nUse l and r from both ends.\nSkip non-alphanumeric chars.\nCompare lowercase of remaining.\n\nTime: O(n) | Space: O(1)\n\nKey: filter in-place rather than\ncreating a cleaned copy string.",
    },
    // -- Sliding Window ---
    {
      topic: "Min Window Substring (#76)",
      front:
        "Minimum Window Substring\n\nGiven strings s and t, find the minimum\nwindow in s containing all chars of t.\n\nInput: s='ADOBECODEBANC', t='ABC'\nOutput: 'BANC'",
      back: "Approach: Sliding Window + HashMap\n\nExpand right to include all chars of t.\nShrink left to minimize window.\nTrack missing count to know when\nall chars are covered.\n\nTime: O(|s| + |t|) | Space: O(|t|)\n\nKey: decrement needs on expand;\nwhen all met, try shrinking.",
    },
    {
      topic: "Max Profit With Cooldown (#309)",
      front:
        "Best Time to Buy/Sell Stock\nWith Cooldown\n\nAfter selling, must wait 1 day before\nbuying. Find max profit.\n\nInput: [1,2,3,0,2]\nOutput: 3 (buy@1, sell@3, cool, buy@0, sell@2)",
      back: "Approach: State Machine DP\n\n3 states: hold, sold, rest\n\nhold = max(hold, rest - price)\nsold = hold_prev + price\nrest = max(rest, sold_prev)\n\nMnemonic: HSR - Hold, Sold, Rest.\nProcess transitions each day.\n\nTime: O(n) | Space: O(1)",
    },
    // -- Stack ---
    {
      topic: "Daily Temperatures (#739)",
      front:
        "Daily Temperatures\n\nA weather station records daily highs.\nFor each day, how many days until a\nwarmer temperature? (0 if never)\n\nInput: [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]",
      back: "Approach: Monotonic Decreasing Stack\n\nStack stores indices of days waiting\nfor a warmer day. When a warmer day\narrives, pop and record difference.\n\nEach index pushed/popped at most once.\n\nTime: O(n) | Space: O(n)\n\nPattern: next greater element.",
    },
    {
      topic: "Largest Rectangle in Histogram (#84)",
      front:
        "Largest Rectangle in Histogram\n\nGiven array heights of histogram bars,\nfind area of largest rectangle.\n\nInput: [2,1,5,6,2,3]\nOutput: 10 (height 5, width 2)",
      back: "Approach: Monotonic Stack\n\nMaintain increasing stack of indices.\nWhen height decreases, pop and calc\narea: height * width.\nWidth = distance between new top\nand current index.\n\nKey: for each bar find how far\nleft and right it can extend.\n\nTime: O(n) | Space: O(n)",
    },
    // -- Binary Search ---
    {
      topic: "Search in Rotated Array (#33)",
      front:
        "Search in Rotated Sorted Array\n\nA sorted array was rotated at an unknown\npivot. Find target in O(log n).\n\nInput: [4,5,6,7,0,1,2], target=0\nOutput: 4",
      back: "Approach: Modified Binary Search\n\nOne half is always sorted.\nCheck if target is in the sorted half;\nif yes, search there; else other half.\n\nKey: compare nums[l] vs nums[m]\nto find which half is sorted.\n\nTime: O(log n) | Space: O(1)",
    },
    {
      topic: "Find Min in Rotated Array (#153)",
      front:
        "Find Minimum in Rotated Sorted Array\n\nFind the minimum element in a rotated\nsorted array (no duplicates).\n\nInput: [3,4,5,1,2]\nOutput: 1",
      back: "Approach: Binary Search\n\nCompare nums[mid] with nums[right]:\n- mid > right: min is in right half\n- mid <= right: min is in left half\n\nUse l < r (not <=) as condition.\nReturn nums[l] when converged.\n\nTime: O(log n) | Space: O(1)\nWith dupes (#154): worst case O(n).",
    },
    // -- Trees ---
    {
      topic: "Invert Binary Tree (#226)",
      front:
        "Invert Binary Tree\n\nMirror a binary tree (swap left and\nright children at every node).\n\nWhat are the recursive and iterative\napproaches?",
      back: "Recursive DFS:\nSwap left/right children,\nthen recurse on both subtrees.\nBase: null -> return null.\n\nIterative BFS: queue, swap children\nof each dequeued node.\n\nTime: O(n) | Space: O(h)\n\nFamously asked of Homebrew's creator.",
    },
    {
      topic: "Max Depth of Binary Tree (#104)",
      front:
        "Maximum Depth of Binary Tree\n\nReturn the max depth (nodes along\nlongest root-to-leaf path).\n\nWhat is the simplest approach?",
      back: "Recursive DFS:\n\nreturn 0 if null\nreturn 1 + max(left depth, right depth)\n\nIterative: BFS, count levels.\n\nTime: O(n) | Space: O(h)\nh = height; O(n) skewed, O(log n) balanced.",
    },
    {
      topic: "Validate BST (#98)",
      front:
        "Validate Binary Search Tree\n\nEvery node in left subtree < root,\nright subtree > root. How do you\nverify this holds globally?",
      back: "Approach: DFS with valid range\n\nPass (lo, hi) bounds down recursively.\nLeft child: upper bound = parent.val\nRight child: lower bound = parent.val\nReturn false if val outside bounds.\n\nAlt: in-order traversal should yield\nstrictly increasing sequence.\n\nTime: O(n) | Space: O(h)",
    },
    {
      topic: "Lowest Common Ancestor (#236)",
      front:
        "Lowest Common Ancestor of Binary Tree\n\nGiven two nodes p and q,\nfind their deepest shared ancestor.\n(A node can be its own ancestor.)",
      back: "Approach: Recursive DFS\n\nIf root is p or q, return root.\nRecurse left and right.\nIf both non-null: root is LCA.\nIf only one non-null: propagate it.\n\nTime: O(n) | Space: O(h)\n\nFor BST (#235): compare values\nto go left or right - O(h).",
    },
    // -- Graphs ---
    {
      topic: "Clone Graph (#133)",
      front:
        "Clone Graph\n\nGiven a node in a connected undirected\ngraph, return a deep copy.\n\nHow do you handle cycles?",
      back: "Approach: DFS + HashMap\n\nMap original nodes -> clones.\nFor each node: create clone, recurse\nneighbors, add to clone's list.\nCheck map first to avoid infinite loops.\n\nBFS works with same map pattern.\n\nTime: O(V + E) | Space: O(V)",
    },
    {
      topic: "Pacific Atlantic Water Flow (#417)",
      front:
        "Pacific Atlantic Water Flow\n\nGiven island height map, find cells\nwhere water reaches BOTH Pacific\n(top/left) and Atlantic (bottom/right).\n\nWater flows to equal or lower cells.",
      back: "Approach: Reverse DFS from ocean edges\n\nFlow UPHILL from ocean borders\ninstead of downhill from each cell.\n\nDFS from Pacific edges (top + left).\nDFS from Atlantic edges (bottom + right).\nAnswer = cells in both visited sets.\n\nTime: O(m*n) | Space: O(m*n)",
    },
    {
      topic: "Graph Valid Tree (#261)",
      front:
        "Graph Valid Tree\n\nGiven n nodes and an edge list, does\nthe graph form a valid tree?\n(Connected + no cycles)\n\nInput: n=5, edges=[[0,1],[0,2],[0,3],[1,4]]",
      back: "Key insight: valid tree iff\n  edges == n - 1 AND connected.\n\nApproach 1: Union-Find\nUnion each edge. If find(a)==find(b)\nbefore union -> cycle detected.\n\nApproach 2: DFS from node 0.\nVisit all n nodes with no back edge\n-> valid tree.\n\nTime: O(n) | Space: O(n)",
    },
    // -- Heap / Priority Queue ---
    {
      topic: "Merge K Sorted Lists (#23)",
      front:
        "Merge K Sorted Lists\n\nMerge k sorted linked lists into one\nsorted list.\n\nInput: [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
      back: "Approach: Min Heap of size k\n\nPush first node of each list.\nPop smallest, append to result,\npush its next node if exists.\n\nTime: O(N log k)\n  N = total nodes, k = lists\nSpace: O(k)\n\nAlt: divide-and-conquer pairwise merge.",
    },
    {
      topic: "Find Median from Data Stream (#295)",
      front:
        "Find Median from Data Stream\n\nDesign a structure supporting:\n- addNum(num): add integer\n- findMedian(): return median\n\nMust handle streaming data efficiently.",
      back: "Approach: Two Heaps\n\nmax-heap (lo): smaller half\nmin-heap (hi): larger half\n\naddNum: push to lo, rebalance so\n|lo| >= |hi|, differ by at most 1.\n\nfindMedian: if lo bigger, return top;\nelse average both tops.\n\naddNum: O(log n) | findMedian: O(1)",
    },
    // -- Trie ---
    {
      topic: "Implement Trie (#208)",
      front:
        "Implement Trie (Prefix Tree)\n\nImplement insert, search, and\nstartsWith methods.\n\ninsert('apple')\nsearch('apple') -> true\nsearch('app') -> false\nstartsWith('app') -> true",
      back: "TrieNode has children map + is_end flag.\n\ninsert: walk/create nodes for each char,\nmark last node as end.\n\nsearch: walk nodes; true only if\nfinal node exists and is_end.\n\nstartsWith: same walk; true if all\nchars found (ignore is_end).\n\nTime: O(m) per op, m = word length",
    },
    {
      topic: "Word Search II (#212)",
      front:
        "Word Search II\n\nGiven m x n board and a list of words,\nfind all words formable by adjacent cells\n(no cell reused per word).\n\nThis is the HARD version of Word Search.",
      back: "Approach: Trie + DFS Backtracking\n\nBuild Trie from word list.\nDFS from each cell following Trie paths.\nIf node marks word end, collect it.\nPrune found words to avoid duplicates.\n\nWhy Trie? Search all words at once\ninstead of one at a time.\n\nTime: O(m*n*4^L) | Space: O(words)",
    },
    // -- Bit Manipulation ---
    {
      topic: "Single Number (#136)",
      front:
        "Single Number\n\nEvery element appears twice except one.\nFind the single element.\nMust use O(1) extra space.\n\nInput: [4,1,2,1,2] -> Output: 4",
      back: "Approach: XOR all elements\n\na ^ a = 0 (pairs cancel out)\na ^ 0 = a (identity)\nXOR is commutative + associative\n\nSo only the unpaired element survives.\n\nMnemonic: XOR XORs away pairs -\nthe loner survives.\n\nTime: O(n) | Space: O(1)",
    },
    {
      topic: "Number of 1 Bits (#191)",
      front:
        "Number of 1 Bits (Hamming Weight)\n\nReturn the number of set bits (1s)\nin an unsigned integer.\n\nInput: 11 (binary: 1011)\nOutput: 3",
      back: "Brian Kernighan's trick:\n\nn &= (n - 1) clears lowest set bit.\nCount iterations until n = 0.\n\nWhy: n-1 flips the lowest set bit\nand all bits below it.\nn & (n-1) zeros that bit.\n\nTime: O(k), k = number of 1 bits\nAlt: check each of 32 bits -> O(1).",
    },
    {
      topic: "Counting Bits (#338)",
      front:
        "Counting Bits\n\nGiven integer n, return array ans where\nans[i] = number of 1s in binary of i,\nfor 0 <= i <= n.\n\nInput: n=5\nOutput: [0,1,1,2,1,2]",
      back: "Approach: DP with bit shift\n\nans[i] = ans[i >> 1] + (i & 1)\n\ni >> 1 removes last bit.\ni & 1 checks if last bit is set.\npopcount(i) = popcount(i/2) + last bit.\n\nAlt: ans[i] = ans[i & (i-1)] + 1\n\nTime: O(n) | Space: O(n)",
    },
    // -- Dynamic Programming ---
    {
      topic: "House Robber (#198)",
      front:
        "House Robber\n\nA thief targets houses on a street but\nalarms trigger if two adjacent houses\nare robbed. Given money in each house,\nfind the maximum loot.\n\nInput: [2,7,9,3,1] -> Output: 12",
      back: "Approach: DP with rolling variables\n\ndp[i] = max(dp[i-1], dp[i-2]+nums[i])\nSkip current or rob it (skip neighbor).\n\nOptimize to O(1) space: prev1, prev2.\n\nTime: O(n) | Space: O(1)\n\nHouse Robber II (#213): circular.\nRun twice: skip first OR skip last.\nTake the max.",
    },
    {
      topic: "Decode Ways (#91)",
      front:
        "Decode Ways\n\nA-Z mapped to 1-26. Given digit string,\ncount number of ways to decode.\n\nInput: '226'\nOutput: 3 ('BZ', 'VF', 'BBF')",
      back: "Approach: DP (like Climbing Stairs)\n\nAt each position try decoding 1 digit\n(1-9) or 2 digits (10-26).\n\ndp[i] += dp[i-1] if valid single\ndp[i] += dp[i-2] if valid double\n\nMnemonic: Decode Ways = Climbing\nStairs with 0-traps.\n\nTime: O(n) | Space: O(1) optimized",
    },
    {
      topic: "Unique Paths (#62)",
      front:
        "Unique Paths\n\nRobot on m x n grid starts at top-left.\nCan only move right or down.\nHow many unique paths to bottom-right?\n\nInput: m=3, n=7\nOutput: 28",
      back: "Approach: DP\n\ndp[i][j] = dp[i-1][j] + dp[i][j-1]\nCurrent cell = paths from above + left.\n\nOptimize to 1D: dp[j] += dp[j-1]\n\nTime: O(m*n) | Space: O(n)\n\nMath: C(m+n-2, m-1) combinations.\nUnique Paths II: obstacle -> dp = 0.",
    },
    // -- Intervals ---
    {
      topic: "Non-Overlapping Intervals (#435)",
      front:
        "Non-Overlapping Intervals\n\nGiven array of intervals, find minimum\nnumber to remove so the rest are\nnon-overlapping.\n\nInput: [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1 (remove [1,3])",
      back: "Approach: Greedy (sort by end time)\n\nKeep interval that ends earliest ->\nleaves most room for future intervals.\n\nSort by end. For each interval:\nif start >= last end: keep it.\nelse: remove (count++).\n\nClassic activity selection problem.\n\nTime: O(n log n) | Space: O(1)",
    },
    // -- Union Find ---
    {
      topic: "Longest Consecutive Sequence (#128)",
      front:
        "Longest Consecutive Sequence\n\nGiven unsorted int array, find length\nof longest consecutive sequence.\nMust run in O(n).\n\nInput: [100,4,200,1,3,2]\nOutput: 4 (sequence: [1,2,3,4])",
      back: "Approach: Hash Set\n\nOnly start counting from sequence\nbeginnings (n-1 not in set).\nExtend forward while n+len in set.\n\nEach element visited at most twice.\n\nTime: O(n) | Space: O(n)\n\nAlt: Union-Find to group consecutive\nnumbers together.",
    },
  ],
};
