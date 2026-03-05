import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Binary Search - Template",
    front:
      "Write the standard binary search\ntemplate.\n\nWhat is the time complexity?",
    back: "let lo = 0, hi = n - 1;\nwhile (lo <= hi) {\n  const mid = lo + Math.floor((hi - lo) / 2);\n  if (arr[mid] === target) return mid;\n  else if (arr[mid] < target) lo = mid + 1;\n  else hi = mid - 1;\n}\nreturn -1;\n\nTime: O(log n)\nSpace: O(1)",
  },
  {
    topic: "Binary Search on Rotated Array",
    front:
      "A sorted array was rotated at an\nunknown pivot. How do you search\nfor a target in O(log n)?\n\nExample: [4,5,6,7,0,1,2], target=0",
    back: "Modified binary search - one half\nis always sorted:\n\nwhile (lo <= hi) {\n  mid = lo + ((hi - lo) >> 1);\n  if (arr[mid] === target) return mid;\n  if (arr[lo] <= arr[mid]) {\n    // left half is sorted\n    if (target >= arr[lo] && target < arr[mid])\n      hi = mid - 1;\n    else lo = mid + 1;\n  } else {\n    // right half is sorted\n    if (target > arr[mid] && target <= arr[hi])\n      lo = mid + 1;\n    else hi = mid - 1;\n  }\n}\n\nKey: check which half is sorted first.",
  },
  {
    topic: "Two Pointers - Opposite Ends",
    front:
      "You have a sorted array and need to\nfind all pairs that sum to a target.\n\nWhat technique do you use and why?",
    back: "Place left at start, right at end.\nMove them inward based on condition.\n\nUse case: Two Sum (sorted array)\nlet l = 0, r = n - 1;\nwhile (l < r) {\n  sum = arr[l] + arr[r];\n  if (sum === target) return [l, r];\n  if (sum < target) l++;\n  else r--;\n}\n\nTime: O(n), Space: O(1)",
  },
  {
    topic: "Sliding Window - Fixed Size",
    front:
      "Given a stream of stock prices, find\nthe maximum gain in any consecutive\nk-day window.\n\nWhat technique do you use?",
    back: "1. Compute sum of first k elements\n2. Slide: add next element, remove first\n3. Track maximum\n\nlet sum = arr.slice(0,k).reduce((a,b)=>a+b);\nlet max = sum;\nfor (let i = k; i < n; i++) {\n  sum += arr[i] - arr[i - k];\n  max = Math.max(max, sum);\n}\n\nTime: O(n), Space: O(1)",
  },
  {
    topic: "Sliding Window - Variable Size",
    front:
      "Explain variable-size sliding window.\n\nFind smallest subarray with sum >= target.",
    back: "Expand right pointer until condition met,\nthen shrink left pointer to minimize.\n\nlet l = 0, sum = 0, minLen = Infinity;\nfor (let r = 0; r < n; r++) {\n  sum += arr[r];\n  while (sum >= target) {\n    minLen = Math.min(minLen, r - l + 1);\n    sum -= arr[l++];\n  }\n}\n\nTime: O(n), Space: O(1)",
  },
  {
    topic: "Prefix Sum",
    front:
      "What is a prefix sum array?\n\nHow does it enable O(1) range queries?",
    back: "prefix[i] = sum of arr[0..i-1]\nprefix[0] = 0\nprefix[i] = prefix[i-1] + arr[i-1]\n\nRange sum [l, r] = prefix[r+1] - prefix[l]\n\nBuild: O(n)\nQuery: O(1)\nSpace: O(n)\n\nAlso works for 2D (row + column prefix sums).",
  },
  {
    topic: "Merge Sort",
    front:
      "How does merge sort work?\n\nWhat is its time/space complexity?\nIs it stable?",
    back: "Divide array in half, recursively sort\neach half, merge sorted halves.\n\nTime:  O(n log n) always\nSpace: O(n) for merge buffer\n\nStable: YES (equal elements keep order)\n\nGood for: linked lists, external sort,\ncounting inversions.",
  },
  {
    topic: "Quick Sort",
    front:
      "How does quick sort work?\n\nWhat is its time/space complexity?\nWhen does worst case occur?",
    back: "Pick pivot, partition array into\nelements < pivot and > pivot.\nRecursively sort partitions.\n\nBest/Avg: O(n log n)\nWorst:    O(n^2) - already sorted + bad pivot\nSpace:    O(log n) stack\n\nNot stable. Use random pivot\nor median-of-three to avoid worst case.",
  },
  {
    topic: "Heap Sort",
    front:
      "How does heap sort work?\n\nWhat is the complexity?\nWhat is its advantage over merge sort?",
    back: "1. Build max-heap from array: O(n)\n2. Repeatedly extract max,\n   place at end: O(n log n)\n\nTime:  O(n log n) always\nSpace: O(1) - in-place!\n\nAdvantage over merge sort:\n  No extra memory needed.\nDisadvantage:\n  Not stable, poor cache locality.",
  },
  {
    topic: "Counting Sort vs Comparison Sort",
    front:
      "When can you beat O(n log n) sorting?\n\nWhat are the non-comparison sorts\nand when do they apply?",
    back: 'When keys are integers with bounded range!\n\nCounting Sort: O(n + k), k = range\n  Count occurrences, compute positions.\nRadix Sort: O(d*(n+b)), d=digits, b=base\n  Sort digit-by-digit via counting sort.\nBucket Sort: O(n) avg for uniform data\n  Distribute into buckets, sort each.\n\nAll stable. Not comparison-based.\n\nMnemonic: CRB = Count Radix Bucket\n= "Can\'t Really Beat" comparison\nsorts without integer/bounded keys.',
  },
  {
    topic: "Monotonic Stack",
    front: "What is a monotonic stack?\n\nWhat problems does it solve?",
    back: "A stack where elements are kept in\nmonotonic (increasing or decreasing) order.\n\nPop elements that violate the order\nbefore pushing new element.\n\nSolves:\n- Next Greater Element\n- Next Smaller Element\n- Largest Rectangle in Histogram\n- Stock Span\n\nTime: O(n) - each element pushed/popped once",
  },
  {
    topic: "Backtracking Template",
    front: "What is backtracking?\n\nDescribe the general template.",
    back: "Explore all candidates; abandon a path\nas soon as it cannot lead to a solution.\n\nfunction backtrack(state, choices):\n  if (isGoal(state)) addResult(state);\n  for (choice of choices):\n    if (isValid(choice)):\n      make(choice)\n      backtrack(newState, remaining)\n      undo(choice)    // backtrack\n\nExamples: N-Queens, Sudoku, Permutations",
  },
  {
    topic: "Quick Select (kth Element)",
    front:
      "You need the kth smallest element\nfrom an unsorted array but sorting\nthe whole array is too expensive.\n\nWhat algorithm and what complexity?",
    back: "Quick Select - partition like quicksort\nbut recurse into only one half.\n\nAvg: O(n), Worst: O(n^2), Space: O(1)\n\nPartition schemes:\n- Lomuto: single scan pointer, simple.\n  Picks last element as pivot.\n  More swaps on average.\n- Hoare: two converging pointers,\n  fewer swaps, faster in practice.\n\nUse random pivot to avoid O(n^2).\nMedian-of-medians gives O(n) worst case.",
  },
  {
    topic: "Stable vs Unstable Sort",
    front:
      "You sort employees by name, then\nre-sort by department. After the\nsecond sort, are names still ordered\nwithin each department?\n\nWhen does this matter?",
    back: "Only if the second sort is STABLE.\n\nStable sort preserves relative order\nof equal elements (same sort key).\n\nStable:   Merge, Insertion,\n          Counting, Radix\nUnstable: Quick, Heap, Selection\n\nWhy it matters: multi-key sorting.\nSort by secondary key first, then\nprimary key with a stable sort.\nUnstable would scramble the\nsecondary key ordering.",
  },
];

export const SORTING_SEARCHING: DeckInfo = {
  id: "sorting-searching",
  title: "Sorting & Searching Algorithms",
  description:
    "Binary search variants, two pointers, sliding window, prefix sums, sorting algorithms, and backtracking.",
  category: "DSA",
  level: "foundation",
  cards,
  tags: ["sorting", "binary-search", "two-pointers", "sliding-window"],
  estimatedMinutes: 18,
};
