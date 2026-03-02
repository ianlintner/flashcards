import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Hash Table - Collision Strategies",
    front:
      "What are the two main collision\nresolution strategies in hash tables?\n\nCompare their trade-offs.",
    back: "1. Chaining (open hashing):\n   Each bucket is a linked list.\n   Simple, works well with high load.\n   Extra memory for pointers.\n\n2. Open Addressing (closed hashing):\n   Find another slot in the array.\n   Methods: linear probing, quadratic,\n   double hashing.\n   Better cache locality, no pointers.",
  },
  {
    topic: "Hash Table - Load Factor",
    front:
      "What is the load factor of a hash table?\n\nWhat happens when it gets too high?",
    back: "Load factor = n / capacity\n(n = number of entries)\n\nHigher load factor -> more collisions\n-> degraded O(1) performance.\n\nTypical threshold: 0.75\nWhen exceeded: resize (usually 2x)\nand rehash all entries: O(n).\n\nAmortized insert still O(1).",
  },
  {
    topic: "Stack - Implementation & Uses",
    front: "What is a stack?\n\nList 5 common applications of stacks.",
    back: "LIFO (Last In, First Out) structure.\n\nApplications:\n1. Function call stack / recursion\n2. Undo operations (Ctrl+Z)\n3. Balanced parentheses checking\n4. Expression evaluation (postfix)\n5. DFS traversal\n\nAll operations O(1):\npush, pop, peek\n\nImplement with: array or linked list",
  },
  {
    topic: "Queue - Variants",
    front:
      "Name and describe 4 types of queues.\n\nWhat are their key differences?",
    back: "1. Simple Queue (FIFO):\n   Enqueue at back, dequeue from front\n\n2. Circular Queue:\n   Wraps around, efficient array use\n\n3. Double-Ended Queue (Deque):\n   Insert/remove from both ends O(1)\n\n4. Priority Queue:\n   Dequeue by priority, not order\n   Usually implemented with a heap\n   Insert: O(log n), Extract: O(log n)",
  },
  {
    topic: "Heap - Build Heap",
    front:
      "What is the time complexity of\nbuilding a heap from an array?\n\nWhy is it O(n) and not O(n log n)?",
    back: "Building a heap is O(n), NOT O(n log n).\n\nBottom-up approach (sift down):\n- Most nodes are near the bottom\n- Bottom nodes do 0 work\n- Only root does O(log n) work\n\nSum: n/4*1 + n/8*2 + n/16*3 + ...\n= O(n)\n\nContrast: inserting n elements one by one\nIS O(n log n) (top-down).",
  },
  {
    topic: "Array vs Linked List",
    front:
      "When should you choose an Array\nover a Linked List, and vice versa?",
    back: "Choose Array when:\n- Need random access O(1)\n- Data is fixed size or rarely inserted\n- Cache locality matters\n- Memory is tight (no pointer overhead)\n\nChoose Linked List when:\n- Frequent insert/delete at arbitrary positions\n- Don't know size in advance\n- No random access needed\n- Need constant time insert at head/tail",
  },
  {
    topic: "Graph - Adjacency List vs Matrix",
    front:
      "When should you use adjacency list\nvs adjacency matrix for graphs?",
    back: "Adjacency List: O(V + E) space\n- Use for sparse graphs (E << V^2)\n- Faster iteration over neighbors\n- Most real-world graphs are sparse\n\nAdjacency Matrix: O(V^2) space\n- Use for dense graphs (E ~ V^2)\n- O(1) edge existence check\n- Simpler to implement\n- Good for Floyd-Warshall",
  },
  {
    topic: "HashMap vs TreeMap",
    front: "Compare HashMap and TreeMap.\n\nWhen would you choose each?",
    back: "HashMap (hash table):\n- O(1) average for get/put/delete\n- Unordered keys\n- Can degrade to O(n) with collisions\n\nTreeMap (balanced BST):\n- O(log n) for get/put/delete\n- Keys are sorted\n- Range queries, floor/ceiling ops\n\nChoose TreeMap when you need:\nSorted iteration, range queries,\nor ordered statistics.",
  },
  {
    topic: "When to Use a Trie vs Hash Set",
    front:
      "When should you use a Trie instead\nof a HashSet for string storage?",
    back: "Use Trie when:\n- Need prefix search / autocomplete\n- Checking all words with a prefix\n- Lexicographic ordering needed\n- Memory shared among common prefixes\n\nUse HashSet when:\n- Only need exact match lookup\n- No prefix operations needed\n- Simpler implementation desired\n\nTrie: O(m) per op, m = word len\nHashSet: O(m) avg for hashing strings",
  },
  {
    topic: "Space-Time Trade-offs",
    front: "Give 5 examples of space-time\ntrade-offs in data structures.",
    back: "1. Hash table: O(n) space for O(1) lookup\n   vs array scan O(n) with O(1) space\n\n2. Memoization: O(n) space to avoid\n   O(2^n) recomputation\n\n3. Precomputed prefix sums: O(n) space\n   for O(1) range queries\n\n4. Inverted index: O(n) space\n   for O(1) document lookup\n\n5. Graph adjacency matrix: O(V^2) space\n   for O(1) edge check",
  },
];

export const DATA_STRUCTURES_DEEP: DeckInfo = {
  id: "data-structures-deep",
  title: "Data Structures Deep Dive",
  description:
    "Hash collisions, heap building, stack/queue variants, data structure selection and space-time trade-offs.",
  category: "DSA",
  level: "foundation",
  cards,
  tags: ["hash-table", "heap", "stack", "queue", "trade-offs"],
  estimatedMinutes: 15,
};
