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
      "Your teammate asks: 'Should I use\nmemoization or tabulation for this\nDP problem?'\n\nHow do you decide, and what is each?",
    back: "Top-Down (Memoization): Recurse + cache.\nOnly solves needed subproblems.\nRisk: stack overflow for large n.\n\nBottom-Up (Tabulation): Iterative + table.\nNo stack risk, better constants.\n\nPrefer top-down for sparse subproblems,\nbottom-up for dense or large n.",
  },
  {
    topic: "Fibonacci - DP Example",
    front:
      "You're solving the staircase problem:\nclimb n steps, taking 1 or 2 at a time.\nHow many distinct ways to reach the top?\n\nWhy is naive recursion too slow\nand how does DP fix it?",
    back: "Naive: ways(n) = ways(n-1) + ways(n-2)\nO(2^n) - recalculates same calls!\n\nMemoized: cache ways[i]\nTime: O(n), Space: O(n)\n\nOptimized: keep prev two values only.\nTime: O(n), Space: O(1)",
  },
  {
    topic: "0/1 Knapsack",
    front:
      "Bag capacity = 7. Items:\nA(w=3,v=4) B(w=4,v=5) C(w=2,v=3).\nMaximize total value.\n\nWhat is the recurrence?\nMnemonic: 'Take it or Leave it'.",
    back: "For each item: Take it or Leave it.\n\ndp[i][w] = max(\n  dp[i-1][w],              // leave\n  dp[i-1][w-w[i]] + v[i]  // take\n)\n\nA+B (w=7,v=9) beats A+C(7), B+C(8).\nTime: O(n*W), Space: O(W) optimized",
  },
  {
    topic: "Longest Common Subsequence",
    front:
      "Given s1='ACE' and s2='ABCDE',\nfind their longest common subsequence.\n\nShow the DP table and recurrence.",
    back: "     ''  A  B  C  D  E\n''    0  0  0  0  0  0\nA     0  1  1  1  1  1\nC     0  1  1  2  2  2\nE     0  1  1  2  2  3\n\nMatch: dp[i][j] = dp[i-1][j-1] + 1\nElse:  max(dp[i-1][j], dp[i][j-1])\nLCS = 'ACE', len 3. O(m*n) / O(min(m,n))",
  },
  {
    topic: "Longest Increasing Subsequence",
    front: "What is LIS?\n\nWhat are the O(n^2) and O(n log n)\napproaches?",
    back: "LIS: longest strictly increasing subsequence.\n\nO(n^2): dp[i] = max(dp[j]+1) for j<i\nwhere a[j] < a[i]\n\nO(n log n): Patience sorting -\nmaintain smallest-tail array,\nbinary search for insertion point.\nSpace: O(n) for both.",
  },
  {
    topic: "Edit Distance",
    front:
      "What is Edit Distance (Levenshtein)?\n\nWhat operations are allowed and\nwhat is the DP recurrence?",
    back: "Min ops to transform s1 into s2.\nOps: Insert, Delete, Replace\n\nIf s1[i]==s2[j]: dp[i][j] = dp[i-1][j-1]\nElse: dp[i][j] = 1 + min(\n  dp[i-1][j],    // delete\n  dp[i][j-1],    // insert\n  dp[i-1][j-1]   // replace\n)\nTime: O(m*n), Space: O(m*n) or O(n)",
  },
  {
    topic: "Coin Change",
    front:
      "You have coins of given denominations.\nFind minimum coins to make amount N.\n\nWhat is the DP approach?",
    back: "dp[i] = min coins to make amount i\nBase: dp[0] = 0\n\nTransition: for each coin <= i,\n  dp[i] = min(dp[i], dp[i-coin] + 1)\n\nTime: O(N * |coins|), Space: O(N)\n\nIf dp[N] unchanged -> impossible (-1)",
  },
  {
    topic: "Matrix Chain Multiplication",
    front:
      "What is the Matrix Chain\nMultiplication problem?\n\nWhat is the approach?",
    back: "Optimal parenthesization to minimize\nscalar multiplications for A1*A2*...*An.\n\ndp[i][j] = min cost to multiply Ai..Aj\n= min over k: dp[i][k] + dp[k+1][j]\n  + d[i]*d[k+1]*d[j+1]\n\nTime: O(n^3), Space: O(n^2)",
  },
  {
    topic: "DP on Trees",
    front: "How does DP on trees work?\n\nGive an example problem.",
    back: "Process tree leaves to root (post-order).\nEach node's state depends on children.\n\nMax Independent Set example:\ndp[v][0] = sum(max(dp[c][0], dp[c][1]))\ndp[v][1] = val[v] + sum(dp[c][0])\n\nTime: O(V + E)",
  },
  {
    topic: "Bitmask DP",
    front:
      "What is Bitmask DP?\n\nWhen is it used and what is\nthe typical complexity?",
    back: "Use bitmask integer to represent a subset.\ndp[mask] = best answer for items in mask.\n\nUseful for (n <= 20):\n- Traveling Salesman: dp[mask][i]\n- Assignment problems\n- Subset enumeration\n\nTime: O(2^n * n), Space: O(2^n)",
  },
  {
    topic: "DP Space Reduction",
    front:
      "Your DP uses O(n) space but current\nrow only depends on the previous row.\nHow do you reduce to O(1) space?\n\nShow with Fibonacci as example.",
    back: "Rolling array: if dp[i] needs only dp[i-1],\nkeep 2 variables (e.g., Fib: O(n)->O(1)).\n\n2-row trick for 2D DP:\n  LCS: O(m*n) -> O(min(m,n))\n  Knapsack: O(n*W) -> O(W)\n  (iterate W backwards to avoid overwrite)",
  },
  {
    topic: "DP State Design",
    front:
      "You need to solve: 'minimum cost to paint\nn houses with 3 colors, no two adjacent\nhouses the same color.'\n\nHow do you define the DP state?",
    back: "dp[i][c] = min cost painting houses 0..i\nwhere house i uses color c.\n\nTransition: dp[i][c] = cost[i][c]\n  + min(dp[i-1][other colors])\nBase: dp[0][c] = cost[0][c]\nAnswer: min(dp[n-1][0..2])\n\nKey: state captures what affects future\ndecisions (here: last color chosen).",
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
