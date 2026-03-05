import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Array - Access by Index",
    front:
      "Your server stores sessions in an Array.\nYou fetch session #42 via arr[42].\n\nWhat is the time complexity?",
    back: "Time:  O(1) - Constant\nSpace: O(1)\n\nArrays use contiguous memory. Index maps\nto a direct address offset - no traversal.\n\nLike a mailbox number: go straight to it.",
  },
  {
    topic: "Array - Linear Search",
    front:
      "What is the time complexity of searching\nfor a value in an unsorted Array?\n\nfor (x of arr) if (x === target) ...",
    back: "Time:  O(n) - Linear\nSpace: O(1)\n\nIn the worst case every element must be\nexamined before finding the target\n(or confirming it is absent).",
  },
  {
    topic: "Array - Insertion at End",
    front:
      "What is the time complexity of inserting\nat the END of a dynamic Array?\n\narr.push(val)",
    back: "Time:  O(1) amortized\nSpace: O(1) amortized\n\nMost pushes are O(1), but occasional\nresizing copies all n elements -> O(n).\nAmortized across all operations = O(1).",
  },
  {
    topic: "Array - Insertion at Beginning",
    front:
      "What is the time complexity of inserting\nat the BEGINNING of an Array?\n\narr.unshift(val)",
    back: "Time:  O(n) - Linear\nSpace: O(1)\n\nAll existing elements must be shifted\none position to the right to make room\nfor the new first element.\n\nThink: everyone scoots over on a bench.",
  },
  {
    topic: "Array - Deletion by Index",
    front:
      "What is the time complexity of deleting\nan element by index from an Array?\n\narr.splice(i, 1)",
    back: "Time:  O(n) - Linear\nSpace: O(1)\n\nElements after the deleted index must\nshift left to fill the gap.\nDeleting the last element is O(1).",
  },
  {
    topic: "Linked List - Access / Search",
    front:
      "Your playlist is a Linked List.\nYou want to jump to track #50.\n\nWhat is the time complexity of\naccessing by index in a Linked List?",
    back: "Time:  O(n) - Linear\nSpace: O(1)\n\nNodes are not contiguous in memory.\nReaching index k requires walking\nk next pointers from the head.",
  },
  {
    topic: "Linked List - Insert at Head",
    front:
      "What is the time complexity of inserting\na node at the HEAD of a Linked List?\n\nnewNode.next = head; head = newNode",
    back: "Time:  O(1) - Constant\nSpace: O(1)\n\nOnly two pointer assignments needed;\nno traversal of the list is required.",
  },
  {
    topic: "Linked List - Insert at Tail",
    front:
      "What is the time complexity of inserting\nat the TAIL of a singly Linked List\n(without a tail pointer)?",
    back: "Time:  O(n) - Linear\nSpace: O(1)\n\nMust traverse the entire list to find\nthe last node. With a tail pointer\nthis becomes O(1).",
  },
  {
    topic: "Linked List - Delete a Node",
    front:
      "What is the time complexity of deleting\na node from a singly Linked List\ngiven a reference to the previous node?",
    back: "Time:  O(1) if prev known\nTime:  O(n) to find prev by search\nSpace: O(1)\n\nWith prev: prev.next = node.next\nWithout: must traverse from head.",
  },
  {
    topic: "Doubly Linked List vs Singly",
    front:
      "When should you choose a Doubly Linked\nList over a Singly Linked List?\n\nWhat is the key complexity advantage?",
    back: "Doubly: O(1) delete given node ref\n  (prev pointer available - no search)\nSingly: O(n) delete without prev ref\n\nChoose doubly for:\n- Backward traversal (browser back)\n- O(1) delete by ref (LRU cache)\n- Deque implementation\n\nCost: extra pointer per node.",
  },
  {
    topic: "Hash Table - Lookup / Insert / Delete",
    front:
      "What is the AVERAGE time complexity\nfor lookup, insert, and delete\nin a Hash Table (HashMap)?",
    back: "Time:  O(1) average  |  O(n) worst\nSpace: O(n)\n\nA good hash function distributes keys\nuniformly. Worst-case occurs when all\nkeys collide into one bucket -> O(n).",
  },
  {
    topic: "Hash Table - Collision Resolution",
    front:
      "What are the two main collision\nresolution strategies for Hash Tables?\n\nHow do they affect performance?",
    back: "1. Chaining: linked list per bucket\n   Avg O(1 + n/m)\n2. Open Addressing: probe next slot\n   (linear, quadratic, double hash)\n\nBoth degrade to O(n) with collisions.\n\nAnalogy: Chaining = overflow parking lot.\nOpen Addressing = circle the block.",
  },
  {
    topic: "Hash Table - Rehashing",
    front:
      "Your hash map's load factor exceeds 0.75.\nWhat happens next?\n\nWhat is the amortized cost of inserts\nthat trigger rehashing?",
    back: "Triggered when load factor (n/m)\nexceeds threshold (typically 0.75).\n\n1. Allocate new array (usually 2x)\n2. Re-hash and re-insert every key\n\nSingle rehash: O(n)\nAmortized insert: still O(1)\nLike moving to a bigger apartment.",
  },
  {
    topic: "Stack - Push / Pop / Peek",
    front: "What is the time complexity of\npush, pop, and peek on a Stack?",
    back: "Time:  O(1) - Constant (all ops)\nSpace: O(n)\n\nA stack only ever touches the top element.\nWith an array or linked-list backing,\nall three operations are O(1).\n\nLIFO: Last In, First Out. Stack of plates.",
  },
  {
    topic: "Queue - Enqueue / Dequeue",
    front: "What is the time complexity of\nenqueue and dequeue on a Queue?",
    back: "Time:  O(1) amortized (linked-list)\nSpace: O(n)\n\nWith a doubly-linked list (or circular\nbuffer) both ends are O(1). A naive\narray-based queue has O(n) dequeue.\n\nFIFO: First In, First Out. Like a line.",
  },
  {
    topic: "Deque - Operations",
    front:
      "What is the time complexity of\ninsert/remove at both ends of a Deque\n(double-ended queue)?",
    back: "Time:  O(1) - all four operations\n  - pushFront / pushBack\n  - popFront  / popBack\nSpace: O(n)\n\nImplemented with doubly-linked list\nor circular buffer.",
  },
  {
    topic: "Binary Search Tree - Search / Insert",
    front:
      "You store user IDs in a Binary Search\nTree for fast membership checks.\n\nWhat is the time complexity of\nsearch and insert in a BST?",
    back: "Time:  O(log n) balanced | O(n) skewed\nSpace: O(h) where h = height\n\nA balanced BST (AVL, Red-Black) keeps\nh = log n. A degenerate (sorted input)\nBST degrades to a linked list -> O(n).",
  },
  {
    topic: "Binary Tree - Traversal",
    front:
      "What is the time complexity of\nin-order, pre-order, or post-order\ntraversal of a Binary Tree?",
    back: "Time:  O(n) - Linear\nSpace: O(h) call stack (h = height)\n\nEvery node is visited exactly once.\nFor a balanced tree h = O(log n),\nfor a skewed tree h = O(n).",
  },
  {
    topic: "AVL Tree - Operations",
    front:
      "What is the time complexity of\nsearch, insert, and delete in an AVL tree?",
    back: "Time:  O(log n) - all operations\nSpace: O(n) for storage, O(log n) stack\n\nAVL trees maintain strict balance:\nheight of left and right subtrees\ndiffer by at most 1. Rotations O(1).",
  },
  {
    topic: "Red-Black Tree - Operations",
    front:
      "What is the time complexity of\nsearch, insert, and delete in a\nRed-Black tree?",
    back: "Time:  O(log n) - all operations\nSpace: O(n)\n\nRelaxed balance: longest path is at most\n2x shortest path. Fewer rotations than\nAVL on insert/delete (at most 2-3).",
  },
  {
    topic: "Binary Heap - Insert",
    front: "What is the time complexity of\ninserting into a Binary Heap?",
    back: 'Time:  O(log n)\nSpace: O(1) (in-place sift-up)\n\n     10\n    /  \\\n  15    20    <- min-heap\n\nAppended at end, then "bubbled up"\n- at most log2(n) swaps.',
  },
  {
    topic: "Binary Heap - Extract Min/Max",
    front:
      "What is the time complexity of\nremoving the root (min or max)\nfrom a Binary Heap?",
    back: 'Time:  O(log n)\nSpace: O(1)\n\nThe root is swapped with the last element,\nthen "sifted down" to restore heap order.\nAt most log2(n) comparisons required.',
  },
  {
    topic: "Binary Heap - Build (Heapify)",
    front:
      "What is the time complexity of\nbuilding a heap from an unsorted array?",
    back: "Time:  O(n) <- surprising!\nSpace: O(1) (in-place)\n\nBottom-up heapify performs O(n) total\nwork even though each sift-down is\nO(log n). Most nodes are near leaves.\n\nMnemonic: leaves are lazy - zero work.",
  },
  {
    topic: "Priority Queue vs Sorted Array",
    front:
      "You need to repeatedly insert elements\nand extract the minimum.\n\nWhen does a Priority Queue (heap) beat\na sorted array?",
    back: "            PQ(heap)  Sorted Arr\nInsert:     O(log n)  O(n)\nExtract-min: O(log n)  O(1)*\nPeek-min:   O(1)      O(1)\n\n*O(1) if removing from end.\n\nPQ wins when inserts are frequent.\nSorted array wins for static data.",
  },
  {
    topic: "Trie - Insert / Search",
    front:
      "What are the time and space complexities\nof insert and search in a Trie?\n\n(prefix tree, alphabet size A)",
    back: "Time:  O(L) where L = key length\nSpace: O(n * L * A) - all nodes\n\nEvery character of the key is processed\nexactly once. Independent of how many\nkeys are stored - no comparisons needed.",
  },
  {
    topic: "Graph - Adjacency Matrix",
    front:
      "What are the complexities of common\noperations on an Adjacency Matrix\nfor a graph with V vertices?",
    back: "Space:     O(V^2)\nAdd edge:  O(1)\nRemove:    O(1)\nHas edge:  O(1)\nAll neighbors of v: O(V)\n\nGood for dense graphs where E ~ V^2.",
  },
  {
    topic: "Graph - Adjacency List",
    front:
      "What are the complexities of common\noperations on an Adjacency List\nfor a graph with V vertices, E edges?",
    back: "Space:     O(V + E)\nAdd edge:  O(1)\nRemove:    O(E/V) avg\nHas edge:  O(E/V) avg\nAll neighbors of v: O(degree(v))\n\nGood for sparse graphs where E << V^2.",
  },
  {
    topic: "Hash Set - Operations",
    front:
      "What is the time complexity of\nadd, remove, contains, and size\non a HashSet?",
    back: "add:      O(1) average\nremove:   O(1) average\ncontains: O(1) average\nsize:     O(1)\n\nAll O(n) worst case with collisions.\nBacked by a hash table internally.",
  },
];

export const BIG_O_DATA_STRUCTURES: DeckInfo = {
  id: "big-o-data-structures",
  title: "Big O: Data Structures",
  description:
    "Time and space complexity for arrays, linked lists, hash tables, trees, heaps, tries, and graphs.",
  level: "foundation",
  category: "Big O Notation",
  cards,
};
