import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Graph Representation Choice",
    front:
      "You're building a social network (millions\nof users, avg 200 friends each) vs a\n20-node circuit board with most nodes\nconnected.\n\nWhich graph representation for each?",
    back: "Adjacency List: O(V + E) space\n- Use for SPARSE graphs (E << V^2)\n- Social network: list wins (200 edges\n  per node vs millions^2 matrix cells)\n- Edge lookup: O(degree)\n\nAdjacency Matrix: O(V^2) space\n- Use for DENSE graphs (E near V^2)\n- Circuit board: matrix wins (fast O(1)\n  edge lookup, small V)\n\nRule of thumb: if E < V^2/4, use list.\nMost real-world graphs are sparse -> list.",
  },
  {
    topic: "BFS - Implementation Template",
    front:
      "Your GPS needs to find the route with\nthe fewest turns (unweighted graph).\n\nWrite the BFS template and explain\nwhy BFS guarantees fewest edges.",
    back: "function bfs(graph, start):\n  queue = [start]\n  visited = new Set([start])\n  dist = {start: 0}\n  while queue not empty:\n    node = queue.shift()\n    for neighbor of graph[node]:\n      if neighbor not in visited:\n        visited.add(neighbor)\n        dist[neighbor] = dist[node] + 1\n        queue.push(neighbor)\n\nWhy fewest edges? BFS explores level by\nlevel - first time a node is reached is\nalways via the shortest path.\nTime: O(V + E), Space: O(V)",
  },
  {
    topic: "DFS - Recursive vs Iterative",
    front:
      "You need to explore a graph deeply.\nWhen should you use recursive DFS\nvs iterative DFS with an explicit stack?\n\nWhat's the key trade-off?",
    back: "Recursive DFS:\n+ Clean code, natural for backtracking\n- Risk of stack overflow on deep graphs\n- Call stack limited (~10K-50K frames)\n\nIterative DFS (explicit stack):\n+ Handles any depth safely\n+ Can process very large graphs\n- Slightly more boilerplate\n\nTemplate (iterative):\n  stack = [start]; visited = new Set()\n  while stack not empty:\n    node = stack.pop()\n    if node in visited: continue\n    visited.add(node)\n    push neighbors to stack\n\nTime: O(V + E) both versions",
  },
  {
    topic: "Dijkstra's Algorithm",
    front:
      "You're routing packets in a network\nwith positive-weight links.\n\nImplement Dijkstra's with a min-heap.\nWhy must you check distance before\nprocessing a popped node?",
    back: "heap = [(0, source)]\ndist = {source: 0}\nwhile heap:\n  (d, u) = heap.pop()\n  if d > dist[u]: continue  // STALE\n  for (v, w) of neighbors[u]:\n    if dist[u] + w < dist.get(v, inf):\n      dist[v] = dist[u] + w\n      heap.push((dist[v], v))\n\nWhy the stale check? A node can be pushed\nmultiple times as shorter paths are found.\nWithout it, you process outdated entries.\n\nFails with negative edges: a later negative\nedge could improve an already-finalized node.\nTime: O((V + E) log V)",
  },
  {
    topic: "Bellman-Ford - Negative Cycles",
    front:
      "A currency exchange graph has rates as\nedge weights (log-transformed so addition\n= multiplication).\n\nHow does Bellman-Ford detect a negative\ncycle (arbitrage opportunity)?",
    back: "Bellman-Ford: relax ALL edges V-1 times.\n\nfor i in 1..V-1:\n  for each edge (u, v, w):\n    if dist[u] + w < dist[v]:\n      dist[v] = dist[u] + w\n\nNegative cycle detection (the V-th pass):\n  for each edge (u, v, w):\n    if dist[u] + w < dist[v]:\n      -> NEGATIVE CYCLE EXISTS\n\nWhy? V-1 passes suffice for shortest paths\nin any cycle-free graph. If the V-th pass\nstill improves a distance, a negative\ncycle is reachable from source.\nTime: O(V * E)",
  },
  {
    topic: "Topological Sort",
    front:
      "A build system has package dependencies:\nA -> B means A must build before B.\n\nHow do you determine a valid build order?\nWhat if there's a circular dependency?",
    back: "Topological sort: linear order where every\nedge (u,v) has u before v. DAGs only.\n\nKahn's Algorithm (BFS):\n1. Compute in-degree for each node\n2. Enqueue all nodes with in-degree 0\n3. While queue not empty:\n   - Dequeue node, add to order\n   - Decrement in-degree of neighbors\n   - Enqueue any neighbor hitting 0\n4. If order.length < V -> CYCLE exists\n\nAlternative: DFS post-order, then reverse.\n\nCircular dependency -> not a DAG ->\nno valid topological order exists.\nTime: O(V + E)",
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
      "How do you detect a cycle in a\ndirected graph? In an undirected graph?\n\nWhat data structure fits each case?",
    back: 'Directed graph - DFS 3-color method:\n  White = unvisited\n  Gray  = in current DFS path\n  Black = fully processed\n  Back edge (gray -> gray) = CYCLE\n\nUndirected graph - Union-Find:\n  For each edge (u, v):\n    if find(u) == find(v) -> CYCLE\n    else union(u, v)\n\nWhy different? In undirected graphs,\nevery edge creates a "back edge" to parent,\nso DFS coloring needs parent tracking.\nUnion-Find avoids this cleanly.\n\nBoth: O(V + E)',
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
  {
    topic: "Shortest Path Algorithm Selection",
    front:
      "You need the shortest path in a graph.\nHow do you choose the right algorithm\nbased on edge weights and scope?\n\nGive the decision tree.",
    back: 'Decision tree:\n1. Unweighted? -> BFS  O(V + E)\n2. Non-negative weights? -> Dijkstra\n   O((V+E) log V)\n3. Negative edges? -> Bellman-Ford\n   O(V * E)\n4. All pairs needed? -> Floyd-Warshall\n   O(V^3)\n\nMnemonic:\n"BFS for free, Dijkstra for fee,\n Bellman for debt, Floyd for all bets"\n\nEdge cases:\n- Negative CYCLE? Bellman-Ford detects it\n- Sparse all-pairs? Run Dijkstra V times\n- Need heuristic speedup? Use A*',
  },
];

export const GRAPH_ALGORITHMS: DeckInfo = {
  id: "graph-algorithms",
  title: "Graph Algorithms",
  description:
    "Graph representations, BFS/DFS implementation patterns, shortest path algorithms, MST, topological sort, and cycle detection.",
  category: "DSA",
  level: "intermediate",
  cards,
  tags: ["graphs", "shortest-path", "MST", "BFS", "DFS", "implementation"],
  estimatedMinutes: 20,
};
