import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "What is Dynamic Programming?",
    front:
      "Define Dynamic Programming.\n\nWhat two properties must a problem\nhave to be solved with DP?",
    back: "DP solves problems by breaking them into\noverlapping subproblems and storing results.\n\nRequired properties:\n1. Optimal Substructure\n   - Optimal solution uses optimal\n     solutions to subproblems\n2. Overlapping Subproblems\n   - Same subproblems recur many times",
  },
  {
    topic: "Top-Down vs Bottom-Up",
    front:
      "What is the difference between\ntop-down and bottom-up DP?\n\nWhich uses memoization vs tabulation?",
    back: "Top-Down (Memoization):\n- Recursive with cache\n- Solves only needed subproblems\n- Can hit stack overflow for deep recursion\n\nBottom-Up (Tabulation):\n- Iterative, fills table from base cases\n- Solves all subproblems in order\n- Usually better constant factors",
  },
  {
    topic: "Fibonacci - DP Example",
    front:
      "Show how Fibonacci demonstrates\nthe power of DP.\n\nCompare naive recursion vs DP.",
    back: "Naive: fib(n) = fib(n-1) + fib(n-2)\nTime: O(2^n) - exponential!\n\nDP (memoized): store fib[i]\nTime: O(n), Space: O(n)\n\nDP (tabulation, optimized):\nTime: O(n), Space: O(1)\nOnly keep prev two values.",
  },
  {
    topic: "0/1 Knapsack",
    front: "Describe the 0/1 Knapsack problem.\n\nWhat is the DP recurrence?",
    back: "Given n items with weight w[i] and value v[i],\nmaximize value within capacity W.\n\ndp[i][w] = max(\n  dp[i-1][w],           // skip item i\n  dp[i-1][w-w[i]] + v[i] // take item i\n)\n\nTime: O(n * W)\nSpace: O(n * W), can optimize to O(W)",
  },
  {
    topic: "Longest Common Subsequence",
    front: "What is LCS?\n\nWhat is the DP recurrence\nand time complexity?",
    back: "LCS: longest subsequence common to two\nstrings (not necessarily contiguous).\n\nIf s1[i] == s2[j]:\n  dp[i][j] = dp[i-1][j-1] + 1\nElse:\n  dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n\nTime:  O(m * n)\nSpace: O(m * n), can optimize to O(min(m,n))",
  },
  {
    topic: "Longest Increasing Subsequence",
    front: "What is LIS?\n\nWhat are the O(n^2) and O(n log n)\napproaches?",
    back: "LIS: longest strictly increasing subsequence.\n\nO(n^2): For each i, check all j < i.\n  dp[i] = max(dp[j] + 1) where a[j] < a[i]\n\nO(n log n): Patience sorting.\n  Maintain array of smallest tail elements.\n  Binary search for insertion point.\n\nSpace: O(n) for both.",
  },
  {
    topic: "Edit Distance",
    front:
      "What is Edit Distance (Levenshtein)?\n\nWhat operations are allowed and\nwhat is the DP recurrence?",
    back: "Minimum ops to transform string s1 into s2.\nOps: Insert, Delete, Replace\n\nIf s1[i] == s2[j]:\n  dp[i][j] = dp[i-1][j-1]\nElse:\n  dp[i][j] = 1 + min(\n    dp[i-1][j],     // delete\n    dp[i][j-1],     // insert\n    dp[i-1][j-1]    // replace\n  )\n\nTime: O(m * n)",
  },
  {
    topic: "Coin Change",
    front:
      "You have coins of given denominations.\nFind minimum coins to make amount N.\n\nWhat is the DP approach?",
    back: "dp[i] = min coins to make amount i\n\nBase: dp[0] = 0\nTransition:\n  dp[i] = min(dp[i - coin] + 1)\n  for each coin in denominations\n  where coin <= i\n\nTime:  O(N * |coins|)\nSpace: O(N)\n\nIf dp[N] unchanged -> impossible (return -1)",
  },
  {
    topic: "Matrix Chain Multiplication",
    front:
      "What is the Matrix Chain\nMultiplication problem?\n\nWhat is the approach?",
    back: "Find optimal parenthesization to minimize\nscalar multiplications for A1 * A2 * ... * An.\n\ndp[i][j] = min cost to multiply Ai..Aj\n\ndp[i][j] = min over k from i to j-1 of:\n  dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]\n\nTime:  O(n^3)\nSpace: O(n^2)",
  },
  {
    topic: "DP on Trees",
    front: "How does DP on trees work?\n\nGive an example problem.",
    back: "Process tree from leaves to root (post-order).\nEach node's result depends on its children.\n\nExample: Maximum Independent Set\n- dp[v][0] = not including v\n  = sum of max(dp[child][0], dp[child][1])\n- dp[v][1] = including v\n  = val[v] + sum of dp[child][0]\n\nTime: O(V + E)",
  },
  {
    topic: "Bitmask DP",
    front:
      "What is Bitmask DP?\n\nWhen is it used and what is\nthe typical complexity?",
    back: "Use bitmask to represent subset of items\nas a single integer.\n\ndp[mask] = best answer using the subset\nof items encoded by mask.\n\nUseful for:\n- Traveling Salesman: dp[mask][i]\n- Assignment problems\n- Small n (n <= 20)\n\nTime: O(2^n * n)\nSpace: O(2^n)",
  },
  {
    topic: "State Reduction",
    front:
      "What is state reduction in DP?\n\nGive an example of reducing\nspace from O(n^2) to O(n).",
    back: "If dp[i] only depends on dp[i-1],\nkeep only two rows instead of full table.\n\nExample: LCS\n- Full table: O(m * n) space\n- Two rows: O(min(m, n)) space\n\nExample: 0/1 Knapsack\n- Full: O(n * W) -> O(W)\n- Iterate W backwards to avoid overwrite",
  },
];

export const DYNAMIC_PROGRAMMING: DeckInfo = {
  id: "dynamic-programming",
  title: "Dynamic Programming Patterns",
  description:
    "Core DP concepts, classic problems (knapsack, LCS, LIS, edit distance), and optimization techniques.",
  category: "DSA",
  level: "intermediate",
  cards,
  tags: ["DP", "memoization", "tabulation", "optimization"],
  estimatedMinutes: 20,
};
