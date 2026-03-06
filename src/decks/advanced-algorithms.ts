import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "KMP String Matching",
    front:
      "A text editor's Find feature searches\nfor a pattern in a million-line file.\nNaive search is O(nm).\n\nHow do you achieve O(n+m)?",
    back: "KMP (Knuth-Morris-Pratt):\nNever backtracks in the text.\n\n1. Build prefix/failure table: O(m)\n   Longest proper prefix = suffix\n2. Scan text; on mismatch, table\n   says where to resume: O(n)\n\nTotal: O(n + m) | Space: O(m)\nKey insight: work already matched\nis never re-examined.",
  },
  {
    topic: "Rabin-Karp String Matching",
    front: "Describe the Rabin-Karp algorithm.\n\nWhen is it better than KMP?",
    back: "Rolling hash comparison:\n\n1. Hash the pattern: O(m)\n2. Roll hash over text windows of size m\n3. On hash match: verify char by char\n\nTime: O(n+m) avg, O(nm) worst\nSpace: O(1)\n\nBetter than KMP for: multi-pattern\nsearch, plagiarism, 2D matching.",
  },
  {
    topic: "A* Search Algorithm",
    front:
      "Your robot navigates a grid with\nobstacles. Dijkstra is too slow because\nit explores equally in all directions.\n\nHow do you focus the search toward\nthe goal?",
    back: "A* = Dijkstra + heuristic estimate\n\nf(n) = g(n) + h(n)\n  g(n) = actual cost from start\n  h(n) = estimated cost to goal\n\nHeuristic must be ADMISSIBLE:\n  h(n) <= actual cost (never overestimate)\nExplores fewer nodes than Dijkstra.\nTime: O(b^d) worst. Used in:\npathfinding, games, robotics.",
  },
  {
    topic: "Tarjan's SCC Algorithm",
    front:
      "What is Tarjan's algorithm for\nStrongly Connected Components?\n\nWhat is its complexity?",
    back: "Single DFS pass to find all SCCs\nin a directed graph.\n\nUses: DFS discovery time, low-link\nvalues (min reachable), visited stack.\n\nSCC found when: node's low-link\nequals its discovery time (root of SCC).\nTime: O(V + E) | Space: O(V)\nUsed in: 2-SAT, compiler optimizations,\nmodule dependency analysis.",
  },
  {
    topic: "Kosaraju's SCC Algorithm",
    front:
      "Describe Kosaraju's algorithm for\nfinding Strongly Connected Components.",
    back: "Two-pass DFS approach:\n\n1. DFS on original graph:\n   Record finish times (stack order)\n2. Transpose graph (reverse edges)\n3. DFS on transposed graph in\n   reverse finish order:\n   Each DFS tree = one SCC\n\nTime: O(V + E) | Space: O(V + E)\nSimpler to understand than Tarjan's.",
  },
  {
    topic: "Network Flow: Ford-Fulkerson",
    front:
      "A network of pipes connects a water\nplant (source) to a city (sink).\nEach pipe has a max capacity.\n\nWhat is the maximum flow, and how\ndo you compute it?",
    back: "Ford-Fulkerson: find augmenting paths\nfrom source to sink repeatedly.\n\n1. Find path in residual graph\n2. Push flow = bottleneck (min edge)\n3. Update residual capacities\n4. Repeat until no path exists\n\nEdmonds-Karp (BFS): O(V * E^2)\nMnemonic: bottleneck = narrowest pipe\non each path.",
  },
  {
    topic: "Hungarian Algorithm",
    front: "What is the Hungarian Algorithm?\n\nWhat problem does it solve?",
    back: "Optimal assignment: n workers to n jobs,\nminimizing total cost.\n\nTime: O(n^3) | Space: O(n^2)\n\nSteps: subtract row/col minimums,\ncover zeros with min lines,\nadjust matrix if lines < n, repeat.\n\nUsed in: task assignment, matching,\nobject tracking in computer vision.",
  },
  {
    topic: "Manacher's Algorithm",
    front:
      "What is Manacher's Algorithm?\n\nWhat problem does it solve in O(n)?",
    back: 'Finds ALL palindromic substrings\n(longest palindrome at each center)\nin O(n) time.\n\nKey insight: reuse previously computed\npalindrome lengths using symmetry.\n\nTransform: "aba" -> "#a#b#a#"\n(handles even-length palindromes)\nTime: O(n) | Space: O(n)\nNaive: O(n^2) or O(n^3). DP: O(n^2).',
  },
  {
    topic: "Mo's Algorithm",
    front: "What is Mo's Algorithm?\n\nWhen should you use it?",
    back: "Offline technique for answering\nmultiple RANGE QUERIES efficiently.\n\n1. Sort queries by block of sqrt(n)\n   (left endpoint, then right)\n2. Maintain answer, extend/shrink +/-1\n\nTime: O((n + q) * sqrt(n))\nSpace: O(n)\nRequires: offline (queries known upfront),\nadd/remove incrementally, no updates.",
  },
  {
    topic: "Heavy-Light Decomposition",
    front: "What is Heavy-Light Decomposition?\n\nWhat problems does it solve?",
    back: "Decompose tree into chains so any\npath crosses O(log n) chains.\n\nCombine with Segment Tree for:\n- Path queries (sum, max, min)\n- Path updates / LCA queries\nTime per query: O(log^2 n)\n  (log n chains * log n per seg tree)\nBuild: O(n)\nUsed in: competitive programming,\ntree path query problems.",
  },
  {
    topic: "Centroid Decomposition",
    front: "What is Centroid Decomposition?\n\nWhen is it useful?",
    back: "Recursively find centroid of tree,\nmake it root, decompose subtrees.\n\nCentroid tree: depth O(log n).\nAny path passes through O(log n)\ncentroid ancestors.\n\nBuild: O(n log n)\n\nUsed for: counting paths with property,\ndistance queries, tree divide & conquer.",
  },
  {
    topic: "Convex Hull Algorithms",
    front: "Name and compare the main\nConvex Hull algorithms.",
    back: "1. Graham Scan: sort by angle, CCW\n   Time: O(n log n)\n2. Andrew's Monotone Chain:\n   sort by x, upper+lower hull, O(n log n)\n3. Jarvis March (Gift Wrapping):\n   next hull point by angle, O(nh)\n   h = hull points\n\nAll: Space O(n)\nUsed in: computational geometry,\ncollision detection, graphics.",
  },
  {
    topic: "Aho-Corasick Algorithm",
    front:
      "An antivirus scanner must check every\nfile against 10,000 malware signatures.\nRunning KMP 10,000 times is too slow.\n\nHow do you search for ALL patterns\nin a single pass?",
    back: "Aho-Corasick: multi-pattern matching\nin one pass over the text.\n\nStructure: trie + failure links\n(KMP generalized to many patterns)\n\nBuild:  O(sum of pattern lengths)\nSearch: O(n + matches)\n\nMnemonic: build the dictionary trie,\nthen stream the text through it.",
  },
  {
    topic: "Z-Algorithm",
    front: "What is the Z-Algorithm?\n\nWhat problem does it solve?",
    back: "Compute Z-array: Z[i] = length of\nlongest substring starting at i\nthat matches a prefix of the string.\n\nTime: O(n) | Space: O(n)\n\nPattern matching: concatenate\npattern + $ + text.\nZ-values == len(pattern) = match!\nSimpler than KMP. Also: period\nfinding, string compression analysis.",
  },
  {
    topic: "Randomized Algorithms",
    front:
      "Name 5 important randomized algorithms\nand their expected complexities.",
    back: "1. QuickSort (random pivot): O(n log n)\n2. QuickSelect (random pivot): O(n)\n3. Karger's Min-Cut: O(V^2 log V)\n4. Skip List ops: O(log n)\n5. Miller-Rabin Primality: O(k * log^2 n)\n   k = accuracy parameter\n\nRandomization simplifies algorithms\nand avoids adversarial worst cases.\nAll complexities are EXPECTED, not\nguaranteed worst case.",
  },
  {
    topic: "Approximation Algorithms",
    front:
      "What are Approximation Algorithms?\n\nGive examples for NP-hard problems.",
    back: "Poly-time algorithms with provable\nnear-optimal bounds.\n\n1. Vertex Cover: 2-approx (greedy edges)\n2. TSP (metric): 1.5x (Christofides)\n3. Set Cover: O(log n)-approx (greedy)\n4. MAX-SAT: (1-1/e)-approx (rand round)\n\nUsed when exact solution is NP-hard.\nKey: trade optimality for tractability.",
  },
  {
    topic: "External Sorting",
    front: "How do you sort data that doesn't\nfit in memory (external sort)?",
    back: "Multi-way Merge Sort:\n\n1. Read chunks that fit in RAM\n2. Sort each chunk in memory\n3. Write sorted chunks to disk\n4. K-way merge with min-heap:\n   read block per chunk, output min, refill\n\nI/O: O((N/B) * log_{M/B}(N/B))\nN=data, B=block, M=memory\nUsed in: databases, MapReduce.",
  },
  {
    topic: "Parallel Algorithms Overview",
    front: "Name the key parallel algorithm\nparadigms and examples.",
    back: "1. MapReduce: map (transform) + reduce\n2. Parallel Prefix (scan):\n   O(n/p + log p) for p processors\n3. Parallel Merge Sort:\n   O(n/p * log(n/p) + n/p * log p)\n4. Work-Stealing (fork-join):\n   dynamic load balancing\n\nAmdahl's Law: speedup limited by\nsequential fraction of code.\nGustafson's: scale problem with CPUs.",
  },
  {
    topic: "Euler Tour / Path",
    front: "What is an Euler Tour of a tree?\n\nHow is it used in algorithms?",
    back: "Visit each edge exactly twice\n(enter + leave): array of size 2n.\n\nSubtree of v = contiguous range\nin Euler tour -> tree queries become\nrange queries!\n\nCombine with: Segment tree (subtree),\nSparse table (LCA = min depth in range).\nTime to build: O(n)\nLCA query: O(1) with sparse table.",
  },
  {
    topic: "Amortized Analysis Techniques",
    front: "Name and describe the three main\namortized analysis techniques.",
    back: "1. Aggregate Method\n   Total cost / num of ops\n   Ex: dynamic array n pushes = O(n)\n\n2. Accounting Method\n   Overcharge cheap ops, save credit\n   for expensive ops\n\n3. Potential Method\n   Define phi; amortized = actual +\n   delta(phi). Most powerful technique.",
  },
  {
    topic: "Algorithm Design Paradigms Summary",
    front:
      "Name the five core algorithm design\nparadigms and when to use each.",
    back: "1. Divide & Conquer: split, solve, merge\n2. Greedy: local optimal -> global\n3. DP: overlapping subproblems +\n   optimal substructure\n4. Backtracking: try all, prune invalid\n5. Randomized: use randomness for\n   expected good performance\n\nMnemonic: 'Don't Guess, Do Better,\nRandomly' (D&C, Greedy, DP, BT, Rand).",
  },
];

export const ADVANCED_ALGORITHMS: DeckInfo = {
  id: "advanced-algorithms",
  title: "Advanced Algorithms",
  description:
    "String matching, graph algorithms, network flow, computational geometry, and advanced analysis for senior/staff-level preparation.",
  level: "senior-staff",
  category: "Advanced DSA",
  cards,
};
