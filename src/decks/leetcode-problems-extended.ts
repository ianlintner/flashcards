import type { DeckInfo } from "./types";

export const LEETCODE_PROBLEMS_EXTENDED: DeckInfo = {
  id: "leetcode-problems-extended",
  title: "LeetCode Problems -- Extended Set",
  description:
    "30 additional Blind 75 and NeetCode 150 problems not covered in the base deck. Covers graphs, trees, heaps, tries, bit manipulation, math, and advanced DP.",
  level: "advanced",
  category: "Interview Problems",
  cards: [
    // ── Arrays & Hashing ───────────────────────────────────────────────────────
    {
      topic: "Contains Duplicate (#217)",
      front:
        "Contains Duplicate\n\nGiven int array nums, return true\nif any value appears at least twice.\n\nExample: [1,2,3,1] -> true",
      back: "Approach: Hash Set\n\nAdd each element to a set.\nIf element already in set -> true.\n\ndef containsDuplicate(nums):\n  seen = set()\n  for n in nums:\n    if n in seen: return True\n    seen.add(n)\n  return False\n\nTime: O(n)\nSpace: O(n)\n\nAlternative: sort first O(n log n)\nthen check adjacent elements.",
    },
    {
      topic: "Valid Anagram (#242)",
      front:
        "Valid Anagram\n\nGiven strings s and t, return true\nif t is an anagram of s.\n\nExample: 'anagram', 'nagaram' -> true",
      back: "Approach: Character Frequency Count\n\ndef isAnagram(s, t):\n  if len(s) != len(t): return False\n  count = {}\n  for c in s:\n    count[c] = count.get(c, 0) + 1\n  for c in t:\n    count[c] = count.get(c, 0) - 1\n    if count[c] < 0: return False\n  return True\n\nTime: O(n)\nSpace: O(1) -- at most 26 letters\n\nAlternative: sorted(s) == sorted(t)\nTime: O(n log n), Space: O(n)",
    },
    {
      topic: "Group Anagrams (#49)",
      front:
        "Group Anagrams\n\nGiven array of strings, group anagrams.\n\nInput: ['eat','tea','tan','ate','nat','bat']\nOutput: [['eat','tea','ate'],\n         ['tan','nat'],['bat']]",
      back: "Approach: Sorted String as Key\n\ndef groupAnagrams(strs):\n  groups = defaultdict(list)\n  for s in strs:\n    key = tuple(sorted(s))\n    groups[key].append(s)\n  return list(groups.values())\n\nTime: O(n * k log k)\n  n = number of strings, k = max length\nSpace: O(n * k)\n\nOptimization: use character count\nas key instead of sorting:\n  key = tuple(count[c] for c in 'a'-'z')\n  Time: O(n * k)",
    },
    {
      topic: "Top K Frequent Elements (#347)",
      front:
        "Top K Frequent Elements\n\nGiven int array nums and int k,\nreturn k most frequent elements.\n\nInput: [1,1,1,2,2,3], k=2\nOutput: [1,2]",
      back: "Approach 1: Bucket Sort O(n)\n\ndef topKFrequent(nums, k):\n  count = Counter(nums)\n  buckets = [[] for _ in range(len(nums)+1)]\n  for num, freq in count.items():\n    buckets[freq].append(num)\n  result = []\n  for i in range(len(buckets)-1, -1, -1):\n    for num in buckets[i]:\n      result.append(num)\n      if len(result) == k:\n        return result\n\nTime: O(n), Space: O(n)\n\nApproach 2: Min Heap O(n log k)\nMaintain heap of size k.\nPush (freq, num), pop if size > k.",
    },
    // ── Two Pointers ───────────────────────────────────────────────────────────
    {
      topic: "Container With Most Water (#11)",
      front:
        "Container With Most Water\n\nGiven array height of n lines,\nfind two lines that form a container\nholding the most water.\n\nInput: [1,8,6,2,5,4,8,3,7]\nOutput: 49",
      back: "Approach: Two Pointers\n\ndef maxArea(height):\n  l, r = 0, len(height) - 1\n  max_water = 0\n  while l < r:\n    w = r - l\n    h = min(height[l], height[r])\n    max_water = max(max_water, w * h)\n    if height[l] < height[r]:\n      l += 1\n    else:\n      r -= 1\n  return max_water\n\nIntuition: move the shorter line inward.\nMoving the taller line can only decrease\nor maintain area (width shrinks).\n\nTime: O(n)\nSpace: O(1)",
    },
    {
      topic: "Valid Palindrome (#125)",
      front:
        "Valid Palindrome\n\nGiven string s, return true if it's a\npalindrome considering only alphanumeric\ncharacters and ignoring case.\n\nInput: 'A man, a plan, a canal: Panama'\nOutput: true",
      back: "Approach: Two Pointers\n\ndef isPalindrome(s):\n  l, r = 0, len(s) - 1\n  while l < r:\n    while l < r and not s[l].isalnum():\n      l += 1\n    while l < r and not s[r].isalnum():\n      r -= 1\n    if s[l].lower() != s[r].lower():\n      return False\n    l += 1\n    r -= 1\n  return True\n\nTime: O(n)\nSpace: O(1)\n\nSkip non-alphanumeric characters.\nCompare lowercase of remaining chars.",
    },
    // ── Sliding Window ─────────────────────────────────────────────────────────
    {
      topic: "Min Window Substring (#76)",
      front:
        "Minimum Window Substring\n\nGiven strings s and t, find the minimum\nwindow in s containing all chars of t.\n\nInput: s='ADOBECODEBANC', t='ABC'\nOutput: 'BANC'",
      back: "Approach: Sliding Window + HashMap\n\ndef minWindow(s, t):\n  need = Counter(t)\n  missing = len(t)\n  l = start = end = 0\n  for r, c in enumerate(s, 1):\n    if need[c] > 0:\n      missing -= 1\n    need[c] -= 1\n    if missing == 0:\n      while need[s[l]] < 0:\n        need[s[l]] += 1\n        l += 1\n      if not end or r - l <= end - start:\n        start, end = l, r\n      need[s[l]] += 1\n      missing += 1\n      l += 1\n  return s[start:end]\n\nTime: O(|s| + |t|)\nSpace: O(|t|)",
    },
    {
      topic: "Max Profit With Cooldown (#309)",
      front:
        "Best Time to Buy/Sell Stock\nWith Cooldown\n\nAfter selling, must wait 1 day before\nbuying. Find max profit.\n\nInput: [1,2,3,0,2]\nOutput: 3 (buy@1, sell@3, cooldown, buy@0, sell@2)",
      back: "Approach: State Machine DP\n\n3 states each day:\n- hold: have stock\n- sold: just sold today (cooldown tmrw)\n- rest: no stock, free to buy\n\ndef maxProfit(prices):\n  hold = -prices[0]\n  sold = 0\n  rest = 0\n  for p in prices[1:]:\n    prev_hold = hold\n    hold = max(hold, rest - p)\n    rest = max(rest, sold)\n    sold = prev_hold + p\n  return max(sold, rest)\n\nTransitions:\n- hold = max(keep holding, buy from rest)\n- sold = hold + price (sell today)\n- rest = max(stay resting, was sold)\n\nTime: O(n), Space: O(1)",
    },
    // ── Stack ──────────────────────────────────────────────────────────────────
    {
      topic: "Daily Temperatures (#739)",
      front:
        "Daily Temperatures\n\nGiven array of daily temps, return array\nwhere answer[i] = number of days until\na warmer temperature. 0 if never.\n\nInput: [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]",
      back: "Approach: Monotonic Decreasing Stack\n\ndef dailyTemperatures(temperatures):\n  n = len(temperatures)\n  ans = [0] * n\n  stack = []  # indices\n  for i, t in enumerate(temperatures):\n    while stack and temperatures[stack[-1]] < t:\n      j = stack.pop()\n      ans[j] = i - j\n    stack.append(i)\n  return ans\n\nStack stores indices of days with\nno warmer day found yet.\nWhen we find a warmer day, pop and\nrecord the difference.\n\nTime: O(n) -- each index pushed/popped once\nSpace: O(n)",
    },
    {
      topic: "Largest Rectangle in Histogram (#84)",
      front:
        "Largest Rectangle in Histogram\n\nGiven array heights of histogram bars,\nfind area of largest rectangle.\n\nInput: [2,1,5,6,2,3]\nOutput: 10 (height 5, width 2)",
      back: "Approach: Monotonic Stack\n\ndef largestRectangleArea(heights):\n  stack = [-1]  # sentinel\n  max_area = 0\n  for i, h in enumerate(heights):\n    while stack[-1] != -1 and\n          heights[stack[-1]] >= h:\n      height = heights[stack.pop()]\n      width = i - stack[-1] - 1\n      max_area = max(max_area, height*width)\n    stack.append(i)\n  while stack[-1] != -1:\n    height = heights[stack.pop()]\n    width = len(heights) - stack[-1] - 1\n    max_area = max(max_area, height*width)\n  return max_area\n\nTime: O(n), Space: O(n)\n\nKey insight: for each bar, find how far\nleft and right it can extend.",
    },
    // ── Binary Search ──────────────────────────────────────────────────────────
    {
      topic: "Search in Rotated Array (#33)",
      front:
        "Search in Rotated Sorted Array\n\nArray sorted in ascending order is\nrotated at unknown pivot. Search for\ntarget in O(log n).\n\nInput: [4,5,6,7,0,1,2], target=0\nOutput: 4",
      back: "Approach: Modified Binary Search\n\ndef search(nums, target):\n  l, r = 0, len(nums) - 1\n  while l <= r:\n    m = (l + r) // 2\n    if nums[m] == target:\n      return m\n    if nums[l] <= nums[m]:  # left sorted\n      if nums[l] <= target < nums[m]:\n        r = m - 1\n      else:\n        l = m + 1\n    else:                    # right sorted\n      if nums[m] < target <= nums[r]:\n        l = m + 1\n      else:\n        r = m - 1\n  return -1\n\nKey: one half is always sorted.\nDetermine which half, check if target\nis in that range.\n\nTime: O(log n), Space: O(1)",
    },
    {
      topic: "Find Min in Rotated Array (#153)",
      front:
        "Find Minimum in Rotated Sorted Array\n\nFind the minimum element in a rotated\nsorted array (no duplicates).\n\nInput: [3,4,5,1,2]\nOutput: 1",
      back: "Approach: Binary Search\n\ndef findMin(nums):\n  l, r = 0, len(nums) - 1\n  while l < r:\n    m = (l + r) // 2\n    if nums[m] > nums[r]:\n      l = m + 1  # min is in right half\n    else:\n      r = m      # min is in left half\n  return nums[l]\n\nIntuition:\n- If mid > right: rotation point is\n  in right half (min is there).\n- If mid <= right: left half contains\n  the min (or mid IS the min).\n\nTime: O(log n)\nSpace: O(1)\n\nWith duplicates (#154): worst case O(n)\nbecause mid == right is ambiguous.",
    },
    // ── Trees ──────────────────────────────────────────────────────────────────
    {
      topic: "Invert Binary Tree (#226)",
      front:
        "Invert Binary Tree\n\nMirror a binary tree (swap left and\nright children at every node).\n\nInput:   4        Output:  4\n        / \\              / \\\n       2   7            7   2\n      /\\ /\\           /\\ /\\\n     1 3 6 9         9 6 3 1",
      back: "Approach: Recursive DFS\n\ndef invertTree(root):\n  if not root:\n    return None\n  root.left, root.right = (\n    root.right, root.left\n  )\n  invertTree(root.left)\n  invertTree(root.right)\n  return root\n\nIterative BFS:\ndef invertTree(root):\n  if not root: return None\n  q = deque([root])\n  while q:\n    node = q.popleft()\n    node.left, node.right = (\n      node.right, node.left\n    )\n    if node.left: q.append(node.left)\n    if node.right: q.append(node.right)\n  return root\n\nTime: O(n), Space: O(n)",
    },
    {
      topic: "Max Depth of Binary Tree (#104)",
      front:
        "Maximum Depth of Binary Tree\n\nReturn the maximum depth (number of\nnodes along longest root-to-leaf path).\n\nInput:  3       Output: 3\n       / \\\n      9  20\n         / \\\n        15  7",
      back: "Approach: Recursive DFS\n\ndef maxDepth(root):\n  if not root:\n    return 0\n  return 1 + max(\n    maxDepth(root.left),\n    maxDepth(root.right)\n  )\n\nIterative BFS (count levels):\ndef maxDepth(root):\n  if not root: return 0\n  q = deque([root])\n  depth = 0\n  while q:\n    depth += 1\n    for _ in range(len(q)):\n      node = q.popleft()\n      if node.left: q.append(node.left)\n      if node.right: q.append(node.right)\n  return depth\n\nTime: O(n), Space: O(n)",
    },
    {
      topic: "Validate BST (#98)",
      front:
        "Validate Binary Search Tree\n\nDetermine if a binary tree is a valid\nBST. Every node in left subtree < root,\nevery node in right subtree > root.\n\nInput:  5       Output: true\n       / \\\n      1   7\n         / \\\n        6   8",
      back: "Approach: DFS with bounds\n\ndef isValidBST(root, lo=-inf, hi=inf):\n  if not root:\n    return True\n  if root.val <= lo or root.val >= hi:\n    return False\n  return (\n    isValidBST(root.left, lo, root.val)\n    and\n    isValidBST(root.right, root.val, hi)\n  )\n\nKey insight: pass valid range down.\nLeft child: upper bound = parent value.\nRight child: lower bound = parent value.\n\nAlternative: in-order traversal should\nproduce strictly increasing sequence.\n\nTime: O(n), Space: O(h) where h = height",
    },
    {
      topic: "Lowest Common Ancestor (#236)",
      front:
        "Lowest Common Ancestor of Binary Tree\n\nGiven a binary tree, find the LCA of\ntwo given nodes p and q.\n\nLCA: deepest node that is ancestor\nof both p and q (node can be its\nown ancestor).",
      back: "Approach: Recursive DFS\n\ndef lowestCommonAncestor(root, p, q):\n  if not root or root == p or root == q:\n    return root\n  left = lowestCommonAncestor(\n    root.left, p, q)\n  right = lowestCommonAncestor(\n    root.right, p, q)\n  if left and right:\n    return root  # p and q on diff sides\n  return left if left else right\n\nLogic:\n- If current node is p or q, return it.\n- Recurse left and right.\n- If both sides return non-null,\n  current node is the LCA.\n- If only one side returns non-null,\n  propagate that result up.\n\nTime: O(n), Space: O(h)\n\nFor BST (#235): use value comparison\nto go left or right.",
    },
    // ── Graphs ─────────────────────────────────────────────────────────────────
    {
      topic: "Clone Graph (#133)",
      front:
        "Clone Graph\n\nGiven a reference to a node in a\nconnected undirected graph, return\na deep copy of the graph.\n\nEach node has val and list of neighbors.",
      back: "Approach: DFS + HashMap\n\ndef cloneGraph(node):\n  if not node: return None\n  clones = {}\n\n  def dfs(n):\n    if n in clones:\n      return clones[n]\n    copy = Node(n.val)\n    clones[n] = copy\n    for neighbor in n.neighbors:\n      copy.neighbors.append(dfs(neighbor))\n    return copy\n\n  return dfs(node)\n\nKey: HashMap maps original -> clone.\nCheck before creating to handle cycles.\n\nBFS approach also works:\nQueue + same HashMap pattern.\n\nTime: O(V + E)\nSpace: O(V)",
    },
    {
      topic: "Pacific Atlantic Water Flow (#417)",
      front:
        "Pacific Atlantic Water Flow\n\nGiven m x n island height map, find\ncells where water can flow to BOTH\nPacific (top/left) and Atlantic\n(bottom/right) oceans.\n\nWater flows to equal or lower cells.",
      back: "Approach: Reverse DFS from oceans\n\nInstead of flowing from each cell,\nflow UPHILL from ocean edges.\n\ndef pacificAtlantic(heights):\n  m, n = len(heights), len(heights[0])\n  pac, atl = set(), set()\n\n  def dfs(r, c, visit, prev):\n    if (r,c) in visit or r<0 or c<0 \\\n       or r>=m or c>=n \\\n       or heights[r][c] < prev:\n      return\n    visit.add((r,c))\n    for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]:\n      dfs(r+dr, c+dc, visit, heights[r][c])\n\n  for c in range(n):\n    dfs(0, c, pac, 0)\n    dfs(m-1, c, atl, 0)\n  for r in range(m):\n    dfs(r, 0, pac, 0)\n    dfs(r, n-1, atl, 0)\n\n  return list(pac & atl)\n\nTime: O(m*n), Space: O(m*n)",
    },
    {
      topic: "Graph Valid Tree (#261)",
      front:
        "Graph Valid Tree\n\nGiven n nodes (0 to n-1) and edge list,\ndetermine if edges form a valid tree.\n\nA valid tree: connected + no cycles.\n\nInput: n=5, edges=[[0,1],[0,2],[0,3],[1,4]]\nOutput: true",
      back: "Approach: Union-Find or DFS\n\nCondition: valid tree iff\n  edges == n - 1 AND graph is connected.\n\nUnion-Find:\ndef validTree(n, edges):\n  if len(edges) != n - 1:\n    return False\n  parent = list(range(n))\n  def find(x):\n    while parent[x] != x:\n      parent[x] = parent[parent[x]]\n      x = parent[x]\n    return x\n  def union(a, b):\n    pa, pb = find(a), find(b)\n    if pa == pb: return False  # cycle\n    parent[pa] = pb\n    return True\n  return all(union(a,b) for a,b in edges)\n\nDFS: build adjacency list, DFS from 0.\nIf we visit all n nodes and no back\nedge -> valid tree.\n\nTime: O(n), Space: O(n)",
    },
    // ── Heap / Priority Queue ──────────────────────────────────────────────────
    {
      topic: "Merge K Sorted Lists (#23)",
      front:
        "Merge K Sorted Lists\n\nMerge k sorted linked lists into one\nsorted linked list.\n\nInput: [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
      back: "Approach: Min Heap\n\ndef mergeKLists(lists):\n  heap = []\n  for i, l in enumerate(lists):\n    if l:\n      heappush(heap, (l.val, i, l))\n  dummy = curr = ListNode(0)\n  while heap:\n    val, i, node = heappop(heap)\n    curr.next = node\n    curr = curr.next\n    if node.next:\n      heappush(heap, (node.next.val,\n        i, node.next))\n  return dummy.next\n\nTime: O(N log k)\n  N = total nodes, k = number of lists\nSpace: O(k) for heap\n\nAlternative: Divide and conquer\nPairwise merge: O(N log k) same\ncomplexity, no heap needed.",
    },
    {
      topic: "Find Median from Data Stream (#295)",
      front:
        "Find Median from Data Stream\n\nDesign a data structure that supports:\n- addNum(num): add integer\n- findMedian(): return median\n\nMust handle streaming data efficiently.",
      back: "Approach: Two Heaps\n\nclass MedianFinder:\n  def __init__(self):\n    self.lo = []  # max-heap (negate)\n    self.hi = []  # min-heap\n\n  def addNum(self, num):\n    heappush(self.lo, -num)\n    heappush(self.hi, -heappop(self.lo))\n    if len(self.hi) > len(self.lo):\n      heappush(self.lo, -heappop(self.hi))\n\n  def findMedian(self):\n    if len(self.lo) > len(self.hi):\n      return -self.lo[0]\n    return (-self.lo[0] + self.hi[0]) / 2\n\nInvariant:\n- lo (max-heap): smaller half\n- hi (min-heap): larger half\n- |lo| >= |hi|, differ by at most 1\n\naddNum: O(log n)\nfindMedian: O(1)",
    },
    // ── Trie ───────────────────────────────────────────────────────────────────
    {
      topic: "Implement Trie (#208)",
      front:
        "Implement Trie (Prefix Tree)\n\nImplement insert, search, and\nstartsWith methods.\n\ninsert('apple')\nsearch('apple') -> true\nsearch('app') -> false\nstartsWith('app') -> true",
      back: "class TrieNode:\n  def __init__(self):\n    self.children = {}\n    self.is_end = False\n\nclass Trie:\n  def __init__(self):\n    self.root = TrieNode()\n\n  def insert(self, word):\n    node = self.root\n    for c in word:\n      if c not in node.children:\n        node.children[c] = TrieNode()\n      node = node.children[c]\n    node.is_end = True\n\n  def search(self, word):\n    node = self._find(word)\n    return node is not None and node.is_end\n\n  def startsWith(self, prefix):\n    return self._find(prefix) is not None\n\n  def _find(self, word):\n    node = self.root\n    for c in word:\n      if c not in node.children:\n        return None\n      node = node.children[c]\n    return node\n\nTime: O(m) per operation, m = word length\nSpace: O(total chars across all words)",
    },
    {
      topic: "Word Search II (#212)",
      front:
        "Word Search II\n\nGiven m x n board of characters and a\nlist of words, find all words that can\nbe formed by sequentially adjacent cells\n(no cell reused per word).\n\nThis is the HARD version of Word Search.",
      back: "Approach: Trie + Backtracking DFS\n\n1. Build a Trie from the word list.\n2. DFS from each cell on the board.\n3. At each step, follow Trie children.\n4. If Trie node marks end of word,\n   add to results.\n5. Prune: remove found words from Trie.\n\ndef findWords(board, words):\n  trie = build_trie(words)\n  result = []\n  for r in range(m):\n    for c in range(n):\n      dfs(r, c, trie.root, result)\n  return result\n\nWhy Trie? Without it, searching each\nword separately is O(words * m*n * 4^L).\nWith Trie, we search all words\nsimultaneously during DFS.\n\nTime: O(m * n * 4^L), L = max word len\nSpace: O(sum of word lengths)",
    },
    // ── Bit Manipulation ───────────────────────────────────────────────────────
    {
      topic: "Single Number (#136)",
      front:
        "Single Number\n\nEvery element appears twice except one.\nFind the single element.\nMust use O(1) extra space.\n\nInput: [4,1,2,1,2]\nOutput: 4",
      back: "Approach: XOR\n\ndef singleNumber(nums):\n  result = 0\n  for n in nums:\n    result ^= n\n  return result\n\nWhy XOR works:\n- a ^ a = 0 (same numbers cancel)\n- a ^ 0 = a (zero is identity)\n- XOR is associative and commutative\n\nSo: 4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4\n\nTime: O(n)\nSpace: O(1)\n\nRelated:\n- #137 Single Number II (every elem 3x)\n  Use bit counting or state machine.\n- #260 Single Number III (two singles)\n  XOR all, split by a differing bit.",
    },
    {
      topic: "Number of 1 Bits (#191)",
      front:
        "Number of 1 Bits (Hamming Weight)\n\nReturn the number of set bits (1s)\nin an unsigned integer.\n\nInput: 11 (binary: 1011)\nOutput: 3",
      back: "Approach 1: Brian Kernighan's trick\n\ndef hammingWeight(n):\n  count = 0\n  while n:\n    n &= (n - 1)  # clear lowest set bit\n    count += 1\n  return count\n\nWhy n & (n-1) works:\nn   = ...1000  (some lowest set bit)\nn-1 = ...0111  (that bit flipped, below set)\nn & (n-1) = ...0000 (lowest bit cleared)\n\nTime: O(k) where k = number of 1 bits\n\nApproach 2: Check each bit\ndef hammingWeight(n):\n  count = 0\n  while n:\n    count += n & 1\n    n >>= 1\n  return count\n\nTime: O(32) = O(1)",
    },
    {
      topic: "Counting Bits (#338)",
      front:
        "Counting Bits\n\nGiven integer n, return array ans where\nans[i] = number of 1s in binary of i,\nfor 0 <= i <= n.\n\nInput: n=5\nOutput: [0,1,1,2,1,2]",
      back: "Approach: DP with bit trick\n\ndef countBits(n):\n  ans = [0] * (n + 1)\n  for i in range(1, n + 1):\n    ans[i] = ans[i >> 1] + (i & 1)\n  return ans\n\nIntuition:\ni >> 1 removes last bit.\ni & 1 checks if last bit is 1.\nSo popcount(i) = popcount(i/2) + last bit.\n\nExample:\n  5 = 101 -> popcount(10) + 1 = 1 + 1 = 2\n  4 = 100 -> popcount(10) + 0 = 1 + 0 = 1\n\nAlternative DP:\n  ans[i] = ans[i & (i-1)] + 1\n  (clear lowest set bit, add 1)\n\nTime: O(n)\nSpace: O(n) (output array)",
    },
    // ── Dynamic Programming ────────────────────────────────────────────────────
    {
      topic: "House Robber (#198)",
      front:
        "House Robber\n\nCan't rob two adjacent houses. Given\narray of money in each house, find\nmax amount you can rob.\n\nInput: [2,7,9,3,1]\nOutput: 12 (houses 0, 2, 4 -> 2+9+1)",
      back: "Approach: DP\n\ndef rob(nums):\n  if not nums: return 0\n  if len(nums) == 1: return nums[0]\n  prev2 = 0  # dp[i-2]\n  prev1 = 0  # dp[i-1]\n  for n in nums:\n    curr = max(prev1, prev2 + n)\n    prev2 = prev1\n    prev1 = curr\n  return prev1\n\nRecurrence:\ndp[i] = max(dp[i-1], dp[i-2] + nums[i])\n\nEither skip current house (take dp[i-1])\nor rob it (take dp[i-2] + current).\n\nTime: O(n), Space: O(1)\n\nHouse Robber II (#213):\nCircular houses. Run twice:\n  rob(nums[1:]) and rob(nums[:-1])\n  Take max. Can't rob both first and last.",
    },
    {
      topic: "Decode Ways (#91)",
      front:
        "Decode Ways\n\nA-Z mapped to 1-26. Given digit string,\ncount number of ways to decode.\n\nInput: '226'\nOutput: 3 ('BZ', 'VF', 'BBF')",
      back: "Approach: DP (similar to climbing stairs)\n\ndef numDecodings(s):\n  if not s or s[0] == '0':\n    return 0\n  n = len(s)\n  dp = [0] * (n + 1)\n  dp[0] = 1  # empty string\n  dp[1] = 1  # first char (not '0')\n  for i in range(2, n + 1):\n    one = int(s[i-1:i])\n    two = int(s[i-2:i])\n    if 1 <= one <= 9:\n      dp[i] += dp[i-1]\n    if 10 <= two <= 26:\n      dp[i] += dp[i-2]\n  return dp[n]\n\nKey: at each position, try decoding\n1 digit (1-9) or 2 digits (10-26).\n\nEdge case: '0' can't be decoded alone.\n'06' is invalid. '10', '20' are valid only\nas two-digit codes.\n\nTime: O(n), Space: O(n) or O(1) optimized",
    },
    {
      topic: "Unique Paths (#62)",
      front:
        "Unique Paths\n\nRobot on m x n grid starts at top-left.\nCan only move right or down.\nHow many unique paths to bottom-right?\n\nInput: m=3, n=7\nOutput: 28",
      back: "Approach: DP\n\ndef uniquePaths(m, n):\n  dp = [1] * n  # first row all 1s\n  for i in range(1, m):\n    for j in range(1, n):\n      dp[j] += dp[j-1]\n  return dp[n-1]\n\nRecurrence:\ndp[i][j] = dp[i-1][j] + dp[i][j-1]\nCurrent cell = paths from above + left.\n\nOptimized to 1D: reuse previous row.\ndp[j] (old value) = from above.\ndp[j-1] (new value) = from left.\n\nTime: O(m*n), Space: O(n)\n\nMath approach:\nTotal moves: (m-1) + (n-1) = m+n-2\nChoose which m-1 are down moves:\nC(m+n-2, m-1) = (m+n-2)! / ((m-1)!(n-1)!)\n\nUnique Paths II (#63): add obstacle grid.\nIf obstacle, dp[i][j] = 0.",
    },
    // ── Intervals ──────────────────────────────────────────────────────────────
    {
      topic: "Non-Overlapping Intervals (#435)",
      front:
        "Non-Overlapping Intervals\n\nGiven array of intervals, find minimum\nnumber of intervals to remove so\nremaining are non-overlapping.\n\nInput: [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1 (remove [1,3])",
      back: "Approach: Greedy (sort by end time)\n\ndef eraseOverlapIntervals(intervals):\n  intervals.sort(key=lambda x: x[1])\n  count = 0\n  end = float('-inf')\n  for s, e in intervals:\n    if s >= end:\n      end = e     # keep this interval\n    else:\n      count += 1  # remove (overlaps)\n  return count\n\nIntuition: always keep interval that\nends earliest -> leaves most room for\nfuture intervals.\n\nThis is the classic activity selection\n(interval scheduling) greedy algorithm.\n\nTime: O(n log n) for sort\nSpace: O(1)",
    },
    // ── Union Find ─────────────────────────────────────────────────────────────
    {
      topic: "Longest Consecutive Sequence (#128)",
      front:
        "Longest Consecutive Sequence\n\nGiven unsorted int array, find length\nof longest consecutive sequence.\nMust run in O(n).\n\nInput: [100,4,200,1,3,2]\nOutput: 4 (sequence: [1,2,3,4])",
      back: "Approach: Hash Set\n\ndef longestConsecutive(nums):\n  num_set = set(nums)\n  best = 0\n  for n in num_set:\n    if n - 1 not in num_set:  # start\n      length = 1\n      while n + length in num_set:\n        length += 1\n      best = max(best, length)\n  return best\n\nKey insight: only start counting from\nthe BEGINNING of a sequence (n-1 not\nin set). This ensures each element is\nvisited at most twice total.\n\nTime: O(n) -- each number checked at\nmost twice (once as start, once in while)\nSpace: O(n)\n\nAlternative: Union-Find, group\nconsecutive numbers together.",
    },
  ],
};
