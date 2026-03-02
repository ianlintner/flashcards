import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Graph Representations",
    front:
      "What are the two main ways to\nrepresent a graph in code?\n\nCompare their space complexity.",
    back: "1. Adjacency Matrix: O(V^2) space\n   - Fast edge lookup O(1)\n   - Wastes space if sparse\n\n2. Adjacency List: O(V + E) space\n   - Space efficient for sparse graphs\n   - Edge lookup O(degree)",
  },
  {
    topic: "BFS - Breadth-First Search",
    front:
      "What is BFS and what is its\ntime and space complexity?\n\nWhen do you use BFS over DFS?",
    back: "BFS explores level by level using a queue.\n\nTime:  O(V + E)\nSpace: O(V)\n\nUse BFS when:\n- Finding shortest path (unweighted)\n- Level-order traversal\n- Closest node searches",
  },
  {
    topic: "DFS - Depth-First Search",
    front:
      "What is DFS and what is its\ntime and space complexity?\n\nWhat are the three DFS orderings?",
    back: "DFS explores as deep as possible first,\nusing a stack (or recursion).\n\nTime:  O(V + E)\nSpace: O(V)\n\nOrderings:\n- Pre-order: visit before children\n- Post-order: visit after children\n- In-order: (binary trees) left-root-right",
  },
  {
    topic: "Dijkstra's Algorithm",
    front:
      "What does Dijkstra's algorithm do?\n\nWhat is its time complexity?\nWhat is its main limitation?",
    back: "Finds shortest path from a source\nto all vertices in a weighted graph.\n\nTime: O((V + E) log V) with min-heap\nTime: O(V^2) with array\n\nLimitation: Does NOT work with\nnegative edge weights.",
  },
  {
    topic: "Bellman-Ford Algorithm",
    front:
      "What does Bellman-Ford solve?\n\nHow does it differ from Dijkstra's?\nWhat is its time complexity?",
    back: "Finds shortest paths from a single source,\neven with negative edge weights.\n\nTime:  O(V * E)\nSpace: O(V)\n\nCan detect negative-weight cycles.\nSlower than Dijkstra but more general.",
  },
  {
    topic: "Topological Sort",
    front:
      "What is topological sort?\n\nWhen is it applicable?\nWhat is the time complexity?",
    back: "Linear ordering of vertices so that for\nevery edge (u, v), u comes before v.\n\nOnly works on DAGs (Directed Acyclic Graphs).\n\nTime: O(V + E) using:\n- Kahn's algorithm (BFS + in-degree)\n- DFS post-order reversal",
  },
  {
    topic: "Minimum Spanning Tree - Kruskal's",
    front:
      "How does Kruskal's MST algorithm work?\n\nWhat is its time complexity?",
    back: "1. Sort all edges by weight\n2. For each edge (lightest first):\n   - If it connects two different\n     components, add it to MST\n3. Uses Union-Find for component tracking\n\nTime: O(E log E)\nSpace: O(V) for Union-Find",
  },
  {
    topic: "Minimum Spanning Tree - Prim's",
    front:
      "How does Prim's MST algorithm work?\n\nHow does it differ from Kruskal's?",
    back: "1. Start from any vertex\n2. Greedily add cheapest edge that\n   connects a visited to unvisited vertex\n3. Uses priority queue (min-heap)\n\nTime: O((V + E) log V) with min-heap\n\nDifference: Prim's grows one component;\nKruskal's merges many components.",
  },
  {
    topic: "Floyd-Warshall Algorithm",
    front:
      "What does Floyd-Warshall solve?\n\nWhat is its time and space complexity?",
    back: "Finds shortest paths between ALL pairs\nof vertices.\n\nTime:  O(V^3)\nSpace: O(V^2)\n\nWorks with negative weights (but not\nnegative cycles). Uses dynamic programming\nwith intermediate vertex relaxation.",
  },
  {
    topic: "Cycle Detection",
    front:
      "How do you detect a cycle in a\ndirected graph vs undirected graph?\n\nWhat are the approaches?",
    back: "Directed graph:\n- DFS with 3 colors (white/gray/black)\n- Back edge (gray->gray) = cycle\n- Or: Topological sort fails\n\nUndirected graph:\n- DFS: revisiting a non-parent = cycle\n- Union-Find: edge connects same set\n\nBoth: O(V + E)",
  },
  {
    topic: "Strongly Connected Components",
    front:
      "What are Strongly Connected Components?\n\nName two algorithms to find them.",
    back: "An SCC is a maximal set of vertices where\nevery vertex is reachable from every other.\n\n1. Kosaraju's: Two DFS passes\n   (one on transposed graph)\n2. Tarjan's: Single DFS with\n   low-link values\n\nBoth: O(V + E)",
  },
  {
    topic: "A* Search Algorithm",
    front:
      "What is A* search?\n\nHow does it differ from Dijkstra's?\nWhat makes a heuristic admissible?",
    back: "A* is informed shortest-path search.\n\nPriority = g(n) + h(n)\n- g(n): cost from start to n\n- h(n): estimated cost from n to goal\n\nDifference: Dijkstra uses only g(n).\n\nAdmissible: h(n) never overestimates\nthe true cost to the goal.",
  },
];

export const GRAPH_ALGORITHMS: DeckInfo = {
  id: "graph-algorithms",
  title: "Graph Algorithms",
  description:
    "BFS, DFS, Dijkstra, Bellman-Ford, MST, topological sort, cycle detection, and more.",
  category: "DSA",
  level: "intermediate",
  cards,
  tags: ["graphs", "shortest-path", "MST", "BFS", "DFS"],
  estimatedMinutes: 18,
};
