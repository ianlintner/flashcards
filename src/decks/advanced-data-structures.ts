import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "B-Tree / B+ Tree",
    front:
      "What is a B-Tree? What are its\ntime complexities?\n\nWhere is it used?",
    back: "Self-balancing tree with multiple\nkeys per node (order m).\n\nSearch:  O(log n)\nInsert:  O(log n)\nDelete:  O(log n)\n\nUsed in: databases (indexes),\nfile systems (ext4, NTFS, HFS+).\nB+ Tree: all data in leaves,\nleaves linked for range scans.",
  },
  {
    topic: "Skip List",
    front:
      "You need a sorted data structure with\nO(log n) search, insert, and delete,\nbut balanced BSTs are complex to code.\n\nWhat simpler alternative uses randomized\n'express lanes'?",
    back: "Probabilistic data structure:\nlayered linked lists with express lanes.\n\nSearch:  O(log n) expected\nInsert:  O(log n) expected\nDelete:  O(log n) expected\nSpace:   O(n) expected\n\nUsed in: Redis sorted sets,\nLevelDB/RocksDB memtable.\nSimpler to implement than balanced BST.",
  },
  {
    topic: "Bloom Filter",
    front:
      "A CDN receives millions of URL requests\nper second. Before hitting the database,\nyou want a fast check: 'Is this URL\ndefinitely NOT cached?'\n\nWhat probabilistic structure fits?",
    back: 'Probabilistic set membership:\n  "Possibly in set" or "Definitely not"\n\nFalse positives: YES\nFalse negatives: NO\n\nInsert:  O(k) k = hash functions\nQuery:   O(k)\nSpace:   O(m) bits (compact!)\n\nUsed in: cache lookups, spam filters,\nCDN routing, database query optimization,\nChrome safe browsing.',
  },
  {
    topic: "Segment Tree",
    front:
      "A game server needs to answer\n'total damage dealt in range [L,R]'\nwhile players keep dealing damage.\n\nWhat data structure handles range\nqueries + point updates in O(log n)?",
    back: "Segment Tree: binary tree for ranges.\n\nBuild:        O(n)\nPoint update:  O(log n)\nRange query:   O(log n)\nRange update:  O(log n) with lazy prop\nSpace:         O(n)\n\nSupports: sum, min, max, gcd.\nMnemonic: SEGment the array -\neach node owns a contiguous range.",
  },
  {
    topic: "Fenwick Tree (BIT)",
    front:
      "What is a Fenwick Tree\n(Binary Indexed Tree)?\n\nHow does it compare to Segment Tree?",
    back: "Fenwick / BIT: array-based\nprefix sums + point updates.\n\nBuild:  O(n) | Update:  O(log n)\nPrefix query:  O(log n)\nRange query:   O(log n) (two prefix)\nSpace:  O(n)\n\nSimpler than Segment Tree, but limited\nto invertible ops (sum, xor - NOT min/max).\nMnemonic: BIT by BIT - the binary form\nof each index decides its range.",
  },
  {
    topic: "Disjoint Set Union (Union-Find)",
    front:
      "Describe Union-Find with path\ncompression and union by rank.\n\nWhat are the complexities?",
    back: "Operations:\n  find(x): follow parent to root\n    + path compression (flatten tree)\n  union(x,y): join by rank/size\n\nTime per operation: O(alpha(n))\n  alpha = inverse Ackermann ~ O(1)\n\nSpace: O(n)\n\nUsed in: Kruskal's MST, network\nconnectivity, accounts merge,\npercolation problems.",
  },
  {
    topic: "Trie (Advanced)",
    front: "What are the advanced Trie variants?\n\nWhen would you use each?",
    back: "1. Compressed Trie (Radix Tree)\n   Merge single-child chains\n   Used in: IP routing, linux kernel\n\n2. Suffix Trie / Suffix Tree\n   All suffixes of a string\n   Used in: substring search O(m)\n\n3. Ternary Search Tree\n   Space-efficient trie alternative\n\n4. XOR Trie\n   Store binary representations\n   Used in: maximum XOR problems",
  },
  {
    topic: "LRU Cache Implementation",
    front:
      "Design a cache for a web browser\nthat evicts the page not visited for\nthe longest time when full.\n\nHow do you achieve O(1) get and put?",
    back: "HashMap<Key, DLL_Node> + Doubly LL\n\nDLL Node: { key, value, prev, next }\nDummy head + dummy tail sentinels.\n\nget(key):\n  map lookup -> node\n  move node to head (most recent)\n  return value\n\nput(key, val):\n  if exists: update + move to head\n  else: new node at head\n  if over capacity: remove tail.prev\n    + delete from map",
  },
  {
    topic: "LFU Cache",
    front:
      "How does an LFU Cache differ from LRU?\n\nWhat data structures are needed?",
    back: "LFU evicts LEAST FREQUENTLY used.\nTie-break: least recently used.\n\nStructure:\n- HashMap: key -> value + freq\n- HashMap: freq -> DLL of keys (ordered)\n- Track minFreq\n\nget: increase freq, move to new freq list\nput: similar + evict from minFreq list\n\nTime: O(1) all operations\nMore complex than LRU but same O(1).",
  },
  {
    topic: "Persistent Data Structures",
    front:
      "What are Persistent Data Structures?\n\nGive an example and use case.",
    back: "Preserve previous versions when modified.\nEvery update creates a new version\nwithout destroying the old.\n\nExample: Persistent Segment Tree\n  Copy-on-write: only clone O(log n)\n  nodes along the update path.\n\nUse cases:\n- Version control / undo\n- Functional programming\n- Offline query problems\n- Git's object model (conceptually)",
  },
  {
    topic: "Treap",
    front: "What is a Treap?\n\nHow does it maintain balance?",
    back: "Tree + heap: BST by key,\nheap-ordered by random priority.\n\nEach node has:\n  key (BST property)\n  priority (random, heap property)\n\nOperations: O(log n) expected\n  Insert: BST insert + rotate up\n  Delete: rotate down then remove leaf\n  Split/Merge: powerful for range ops\n\nSimpler than AVL/RB-tree.\nRandomization provides expected balance.",
  },
  {
    topic: "Sparse Table",
    front: "What is a Sparse Table?\n\nWhen should you use it?",
    back: "Static range query structure:\n\nBuild:     O(n log n)\nQuery:     O(1) for idempotent ops!\nSpace:     O(n log n)\nUpdate:    NOT SUPPORTED\n\nWorks for: min, max, gcd\n(idempotent operations).\n\nUse when: array is STATIC (no updates)\nand you need O(1) range queries.\n\nFaster than Segment Tree for reads.",
  },
  {
    topic: "Suffix Array",
    front: "What is a Suffix Array?\n\nHow does it compare to a Suffix Tree?",
    back: "Sorted array of all suffixes\n(stored as start indices).\n\nBuild:     O(n log n) or O(n)\nSearch:    O(m log n) m = pattern length\nSpace:     O(n) (vs O(n) Suffix Tree\n           but smaller constant)\n\nWith LCP array: O(1) LCP queries.\n\nPreferred over Suffix Tree for\nspace efficiency. Used in: bioinformatics,\nfull-text search, data compression.",
  },
  {
    topic: "Count-Min Sketch",
    front:
      "What is a Count-Min Sketch?\n\nHow is it different from a Bloom Filter?",
    back: 'Probabilistic FREQUENCY estimation:\n  "Element seen approximately X times"\n\nStructure: d x w matrix of counters\n  d = number of hash functions\n  w = width of each row\n\nIncrement: hash to d positions, add 1\nQuery: min of d positions\n\nOverestimates but NEVER underestimates.\n\nUsed in: network traffic monitoring,\ndata stream analytics, top-K estimation.',
  },
  {
    topic: "Rope Data Structure",
    front: "What is a Rope data structure?\n\nWhen is it better than a string?",
    back: "Binary tree of string fragments\nfor efficient text editing.\n\nConcat:    O(1) - join two ropes\nSplit:     O(log n)\nInsert:    O(log n)\nDelete:    O(log n)\nIndex:     O(log n)\n\nvs String: insert/delete O(n)\n\nUsed in: text editors (VS Code, Vim),\nversion control systems.\nBetter for large strings with\nfrequent modifications.",
  },
  {
    topic: "Van Emde Boas Tree",
    front: "What is a Van Emde Boas Tree?\n\nWhat problem does it solve?",
    back: "Maintains a set of integers in\nrange [0, U) with:\n\nInsert:     O(log log U)\nDelete:     O(log log U)\nSearch:     O(log log U)\nSuccessor:  O(log log U)\nPredecessor: O(log log U)\nSpace:      O(U)\n\nFaster than BST for bounded integers.\nU = universe size.\n\nUsed in: network routing, priority\nqueues with bounded keys.",
  },
  {
    topic: "Fibonacci Heap",
    front: "What is a Fibonacci Heap?\n\nWhy is it theoretically important?",
    back: "Collection of heap-ordered trees\nwith lazy operations.\n\nInsert:      O(1)\nFind-min:    O(1)\nDecrease-key: O(1) amortized!\nDelete-min:  O(log n) amortized\nMerge:       O(1)\n\nMakes Dijkstra's O(E + V log V)\nvs O((V+E) log V) with binary heap.\n\nRarely used in practice due to high\nconstant factors and complexity.",
  },
  {
    topic: "Splay Tree",
    front: "What is a Splay Tree?\n\nWhat is its key property?",
    back: 'Self-adjusting BST that moves\naccessed nodes to root via rotations.\n\nAll operations: O(log n) amortized\n(individual ops can be O(n)!)\n\nKey property: frequently accessed\nelements become fast to access.\n"Working set" behavior.\n\nUsed in: caches, garbage collectors,\ndata compression.\nSimpler than AVL/RB (no balance info).',
  },
  {
    topic: "Cuckoo Hashing",
    front: "What is Cuckoo Hashing?\n\nHow does it resolve collisions?",
    back: "Two (or more) hash tables, each with\nits own hash function.\n\nInsert(x):\n  Place in table1[h1(x)]\n  If occupied: evict occupant\n  Place evicted in its OTHER table\n  Repeat (chain of evictions)\n  If cycle: rehash with new functions\n\nLookup: O(1) WORST CASE (check 2 slots)\nInsert: O(1) amortized\n\nUsed in: hardware packet classification,\nnetwork switches (TCAM).",
  },
  {
    topic: "Immutable / Functional DS",
    front:
      "What are Immutable Data Structures?\n\nName 3 examples and their complexities.",
    back: "Updates create NEW versions,\nsharing structure with old version.\n\n1. Persistent List (cons list)\n   Prepend: O(1), Access: O(n)\n\n2. Persistent Balanced BST\n   All ops: O(log n)\n   Path-copying shares unchanged nodes\n\n3. Hash Array Mapped Trie (HAMT)\n   Used in Clojure, Scala, Haskell\n   Lookup/Update: O(log32 n) ~ O(1)\n\nBenefits: thread safety, undo, snapshots.",
  },
  {
    topic: "When to Use Advanced Data Structures",
    front:
      "How do you choose among Segment Tree,\nBIT, Bloom Filter, Skip List,\nand Union-Find?\n\nGive the deciding factor for each.",
    back: "Decision tree by problem pattern:\n\nRange queries + updates -> Segment Tree\nPrefix sums only -> BIT (simpler)\nSet membership, false+ OK -> Bloom Filter\nOrdered ops, simple code -> Skip List\nGroup/component tracking -> Union-Find\n\nMnemonic: 'Segments BIT Bloom,\nSkip to Union' - ordered by\nspecialization level.",
  },
];

export const ADVANCED_DATA_STRUCTURES: DeckInfo = {
  id: "advanced-data-structures",
  title: "Advanced Data Structures",
  description:
    "B-trees, skip lists, bloom filters, segment trees, suffix arrays, and other structures for senior/staff-level interviews.",
  level: "senior-staff",
  category: "Advanced DSA",
  cards,
};
