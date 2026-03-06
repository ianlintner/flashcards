import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Graph Representation Choice",
    front:
      "You're building a social network (millions\nof users, avg 200 friends each) vs a\n20-node circuit board with most nodes\nconnected.\n\nWhich graph representation for each?",
    back: "Adjacency List: O(V + E) space\n- SPARSE graphs (E << V^2)\n- Social net: 200 edges/node vs V^2 matrix\n- Edge lookup: O(degree)\n\nAdjacency Matrix: O(V^2) space\n- DENSE graphs (E near V^2)\n- Fast O(1) edge lookup, good for small V\n\nRule: if E < V^2/4, use list.\nMost real graphs are sparse -> list.",
  },
  {
    topic: "BFS - Implementation Template",
    front:
      "Your GPS needs to find the route with\nthe fewest turns (unweighted graph).\n\nWrite the BFS template and explain\nwhy BFS guarantees fewest edges.",
    back: "bfs(graph, start):\n  queue=[start]; visited={start}; dist={start:0}\n  while queue:\n    node = queue.shift()\n    for nbr of graph[node]:\n      if nbr not visited:\n        visited.add(nbr)\n        dist[nbr] = dist[node]+1\n        queue.push(nbr)\n\nFewest edges guaranteed: BFS explores\nlevel-by-level. Time: O(V+E), Space: O(V)",
  },
  {
    topic: "DFS - Recursive vs Iterative",
    front:
      "You need to explore a graph deeply.\nWhen should you use recursive DFS\nvs iterative DFS with an explicit stack?\n\nWhat's the key trade-off?",
    back: "Recursive: clean, good for backtracking.\n  Risk: stack overflow (~10K-50K frame limit)\nIterative: handles any depth, more boilerplate.\n\nTemplate (iterative):\n  stack=[start]; visited=Set()\n  while stack:\n    node=stack.pop()\n    if visited: continue\n    visited.add(node); push neighbors\n\nTime: O(V + E) both versions",
  },
  {
    topic: "Dijkstra's Algorithm",
    front:
      "You're routing packets in a network\nwith positive-weight links.\n\nImplement Dijkstra's with a min-heap.\nWhy must you check distance before\nprocessing a popped node?",
    back: "heap=[(0,src)]; dist={src:0}\nwhile heap:\n  (d,u) = heap.pop()\n  if d > dist[u]: continue  // STALE\n  for (v,w) of neighbors[u]:\n    if dist[u]+w < dist.get(v,inf):\n      dist[v]=dist[u]+w; heap.push((dist[v],v))\n\nStale check: node can be pushed multiple\ntimes; skip if already processed shorter.\nFails with negative edges (could improve\na finalized node). Time: O((V+E) log V)",
  },
  {
    topic: "Bellman-Ford - Negative Cycles",
    front:
      "A currency exchange graph has rates as\nedge weights (log-transformed so addition\n= multiplication).\n\nHow does Bellman-Ford detect a negative\ncycle (arbitrage opportunity)?",
    back: "Relax ALL edges V-1 times:\n  for i in 1..V-1:\n    for (u,v,w): if dist[u]+w < dist[v]:\n      dist[v] = dist[u]+w\n\nV-th pass detects negative cycles:\n  for (u,v,w): if dist[u]+w < dist[v]:\n    -> NEGATIVE CYCLE EXISTS\n\nWhy? V-1 passes suffice for cycle-free\ngraphs. V-th pass improving = neg cycle.\nTime: O(V * E)",
  },
  {
    topic: "Topological Sort",
    front:
      "A build system has package dependencies:\nA -> B means A must build before B.\n\nHow do you determine a valid build order?\nWhat if there's a circular dependency?",
    back: "Linear order where every edge (u,v) has\nu before v. Only works on DAGs.\n\nKahn's (BFS):\n1. Compute in-degree per node\n2. Enqueue all with in-degree 0\n3. Dequeue node, add to order,\n   decrement neighbor in-degrees,\n   enqueue any that hit 0\n4. If order.length < V -> CYCLE\n\nAlt: DFS post-order, then reverse.\nTime: O(V + E)",
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
