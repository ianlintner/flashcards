import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "KMP String Matching",
    front:
      "Describe the KMP (Knuth-Morris-Pratt)\nalgorithm.\n\nWhat is its time complexity?",
    back: "Pattern matching without backtracking.\n\n1. Build failure/prefix function:\n   For each position, longest proper\n   prefix that is also a suffix.\n   Time: O(m) where m = pattern length.\n\n2. Search: use failure function to\n   skip already-matched characters.\n   Time: O(n) where n = text length.\n\nTotal: O(n + m)\nSpace: O(m) for failure function",
  },
  {
    topic: "Rabin-Karp String Matching",
    front: "Describe the Rabin-Karp algorithm.\n\nWhen is it better than KMP?",
    back: "Rolling hash comparison:\n\n1. Hash the pattern: O(m)\n2. Roll hash over text windows of size m\n3. On hash match: verify character by char\n\nTime:  O(n + m) average\n       O(nm) worst (many hash collisions)\nSpace: O(1)\n\nBetter than KMP for:\n- Multiple pattern search\n- Plagiarism detection\n- 2D pattern matching",
  },
  {
    topic: "A* Search Algorithm",
    front: "Describe A* search.\n\nHow does it differ from Dijkstra?",
    back: "A* = Dijkstra + heuristic estimate\n\nf(n) = g(n) + h(n)\n  g(n) = actual cost from start\n  h(n) = estimated cost to goal\n\nHeuristic must be ADMISSIBLE:\n  h(n) <= actual cost (never overestimate)\n\nWith good heuristic: explores far fewer\nnodes than Dijkstra.\n\nTime: O(b^d) worst, much better in practice\nUsed in: pathfinding, games, robotics.",
  },
  {
    topic: "Tarjan's SCC Algorithm",
    front:
      "What is Tarjan's algorithm for\nStrongly Connected Components?\n\nWhat is its complexity?",
    back: "Single DFS pass to find all SCCs\nin a directed graph.\n\nUses:\n  - DFS discovery time\n  - Low-link values (min reachable)\n  - Stack of visited nodes\n\nSCC found when: node's low-link\nequals its discovery time (root of SCC).\n\nTime:  O(V + E)\nSpace: O(V)\n\nUsed in: 2-SAT, compiler optimizations,\nmodule dependency analysis.",
  },
  {
    topic: "Kosaraju's SCC Algorithm",
    front:
      "Describe Kosaraju's algorithm for\nfinding Strongly Connected Components.",
    back: "Two-pass DFS approach:\n\n1. DFS on original graph:\n   Record finish times (stack order)\n\n2. Transpose the graph (reverse edges)\n\n3. DFS on transposed graph\n   in reverse finish order:\n   Each DFS tree = one SCC\n\nTime:  O(V + E)\nSpace: O(V + E) for transposed graph\n\nSimpler to understand than Tarjan's.",
  },
  {
    topic: "Network Flow: Ford-Fulkerson",
    front:
      "Describe the Ford-Fulkerson method\nfor Maximum Flow.\n\nWhat is the complexity?",
    back: "Find max flow from source to sink:\n\n1. While augmenting path exists\n   (s -> t in residual graph):\n   a. Find path (BFS or DFS)\n   b. Find bottleneck capacity\n   c. Update flow along path\n   d. Update residual graph\n\nWith BFS (Edmonds-Karp):\n  Time: O(V * E^2)\nWith DFS:\n  Time: O(E * max_flow)\n\nUsed in: bipartite matching,\nmin-cut, circulation problems.",
  },
  {
    topic: "Hungarian Algorithm",
    front: "What is the Hungarian Algorithm?\n\nWhat problem does it solve?",
    back: "Optimal assignment problem:\nAssign n workers to n jobs\nminimizing total cost.\n\nTime: O(n^3)\nSpace: O(n^2)\n\nSteps:\n1. Subtract row minimums\n2. Subtract column minimums\n3. Cover all zeros with min lines\n4. If lines < n: adjust matrix\n5. Repeat until n lines needed\n\nUsed in: task assignment, matching,\nobject tracking in computer vision.",
  },
  {
    topic: "Manacher's Algorithm",
    front:
      "What is Manacher's Algorithm?\n\nWhat problem does it solve in O(n)?",
    back: 'Finds ALL palindromic substrings\n(longest palindrome at each center)\nin O(n) time.\n\nKey insight: reuse previously computed\npalindrome lengths using symmetry.\n\nTransform: insert # between chars\n  "aba" -> "#a#b#a#"\n  (handles even-length palindromes)\n\nTime:  O(n)\nSpace: O(n)\n\nNaive approach: O(n^2) or O(n^3)\nDP approach: O(n^2)',
  },
  {
    topic: "Mo's Algorithm",
    front: "What is Mo's Algorithm?\n\nWhen should you use it?",
    back: "Offline technique for answering\nmultiple RANGE QUERIES efficiently.\n\n1. Sort queries by block of sqrt(n)\n   on left endpoint, then right endpoint\n2. Maintain current answer\n3. Extend/shrink range by +/-1\n\nTime: O((n + q) * sqrt(n))\nSpace: O(n)\n\nRequirements:\n- Offline (all queries known upfront)\n- Add/remove elements incrementally\n- No updates between queries",
  },
  {
    topic: "Heavy-Light Decomposition",
    front: "What is Heavy-Light Decomposition?\n\nWhat problems does it solve?",
    back: "Decompose a tree into chains so\nany path crosses O(log n) chains.\n\nCombine with Segment Tree for:\n- Path queries (sum, max, min)\n- Path updates\n- LCA queries\n\nTime per query: O(log^2 n)\n  (log n chains * log n per segment tree)\nBuild: O(n)\n\nUsed in: competitive programming,\ntree path query problems.",
  },
  {
    topic: "Centroid Decomposition",
    front: "What is Centroid Decomposition?\n\nWhen is it useful?",
    back: "Recursively find centroid of tree,\nmake it root, and decompose subtrees.\n\nProperties:\n- Centroid tree has depth O(log n)\n- Any path passes through O(log n)\n  centroid ancestors\n\nBuild: O(n log n)\n\nUsed for:\n- Count paths with property X\n- Distance queries on trees\n- Tree divide and conquer\n\nSimilar to divide & conquer on trees.",
  },
  {
    topic: "Convex Hull Algorithms",
    front: "Name and compare the main\nConvex Hull algorithms.",
    back: "1. Graham Scan\n   Sort by angle, process CCW\n   Time: O(n log n)\n\n2. Andrew's Monotone Chain\n   Sort by x, build upper+lower hull\n   Time: O(n log n)\n\n3. Jarvis March (Gift Wrapping)\n   Find next hull point by angle\n   Time: O(nh) h = hull points\n\nAll: Space O(n)\n\nUsed in: computational geometry,\ncollision detection, graphics.",
  },
  {
    topic: "Aho-Corasick Algorithm",
    front:
      "What is the Aho-Corasick algorithm?\n\nHow does it differ from KMP?",
    back: "Multi-pattern string matching:\nSearch for ALL patterns simultaneously.\n\nStructure: Trie + failure links\n  (generalization of KMP to multiple\n   patterns)\n\nBuild:   O(sum of pattern lengths)\nSearch:  O(n + number of matches)\n         n = text length\n\nUsed in: intrusion detection systems,\nanti-virus scanning, bioinformatics,\nfgrep (fast grep).",
  },
  {
    topic: "Z-Algorithm",
    front: "What is the Z-Algorithm?\n\nWhat problem does it solve?",
    back: "Compute Z-array: Z[i] = length of\nlongest substring starting at i\nthat matches a prefix of the string.\n\nTime:  O(n)\nSpace: O(n)\n\nPattern matching:\n  Concatenate: pattern + $ + text\n  Z-values == len(pattern) = match!\n\nSimpler to implement than KMP.\nAlso used for: period finding,\nstring compression analysis.",
  },
  {
    topic: "Randomized Algorithms",
    front:
      "Name 5 important randomized algorithms\nand their expected complexities.",
    back: "1. QuickSort (random pivot)\n   Expected: O(n log n)\n\n2. QuickSelect (random pivot)\n   Expected: O(n)\n\n3. Randomized Min-Cut (Karger's)\n   Expected: O(V^2 log V)\n\n4. Skip List operations\n   Expected: O(log n)\n\n5. Miller-Rabin Primality Test\n   Time: O(k * log^2 n)\n   k = accuracy parameter\n\nRandomization simplifies algorithms\nand avoids adversarial worst cases.",
  },
  {
    topic: "Approximation Algorithms",
    front:
      "What are Approximation Algorithms?\n\nGive examples for NP-hard problems.",
    back: "Polynomial-time algorithms that find\nnear-optimal solutions with provable\nbounds.\n\n1. Vertex Cover: 2-approximation\n   (greedy edge selection)\n\n2. TSP (metric): 1.5-approx\n   (Christofides algorithm)\n\n3. Set Cover: O(log n)-approx\n   (greedy)\n\n4. MAX-SAT: (1-1/e)-approx\n   (randomized rounding)\n\nUsed when exact solution is NP-hard.",
  },
  {
    topic: "External Sorting",
    front: "How do you sort data that doesn't\nfit in memory (external sort)?",
    back: "Multi-way Merge Sort:\n\n1. Read chunks that fit in RAM\n2. Sort each chunk in memory\n3. Write sorted chunks to disk\n4. K-way merge using min-heap:\n   Read one block from each chunk\n   Output smallest, refill from\n   that chunk's file\n\nI/O complexity: O((N/B) * log_{M/B}(N/B))\n  N = total data, B = block size,\n  M = memory size\n\nUsed in: databases, MapReduce.",
  },
  {
    topic: "Parallel Algorithms Overview",
    front: "Name the key parallel algorithm\nparadigms and examples.",
    back: "1. MapReduce\n   Map: transform independently\n   Reduce: aggregate results\n\n2. Parallel Prefix (scan)\n   O(n/p + log p) for p processors\n\n3. Parallel Merge Sort\n   O(n/p * log(n/p) + n/p * log p)\n\n4. Work-Stealing (fork-join)\n   Dynamic load balancing\n\nAmdahl's Law: speedup limited by\nsequential fraction of code.\nGustafson's Law: scale problem size\nwith processors.",
  },
  {
    topic: "Euler Tour / Path",
    front: "What is an Euler Tour of a tree?\n\nHow is it used in algorithms?",
    back: "Visit each edge exactly twice\n(enter + leave): array of size 2n.\n\nProperties:\n- Subtree of v = contiguous range\n  in Euler tour array\n- Convert tree queries to range queries!\n\nCombine with:\n- Segment tree for subtree queries\n- Sparse table for LCA queries\n  (LCA = minimum depth in range)\n\nTime to build: O(n)\nLCA query: O(1) with sparse table",
  },
  {
    topic: "Amortized Analysis Techniques",
    front: "Name and describe the three main\namortized analysis techniques.",
    back: "1. Aggregate Method\n   Total cost / number of operations\n   Ex: dynamic array n pushes = O(n)\n\n2. Accounting Method\n   Overcharge cheap ops, save credit\n   for expensive ops\n   Ex: push saves $2 for future resize\n\n3. Potential Method\n   Define potential function phi\n   Amortized = actual + delta(phi)\n   Most powerful, most abstract\n\nAll three give same result;\nchoice depends on what's easiest.",
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
