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
    topic: "Binary Search - Lower Bound",
    front:
      "How do you find the FIRST occurrence\nof a target in a sorted array?\n\nWhat changes from standard binary search?",
    back: "let lo = 0, hi = n;\nwhile (lo < hi) {\n  const mid = lo + ((hi - lo) >> 1);\n  if (arr[mid] < target) lo = mid + 1;\n  else hi = mid;\n}\nreturn lo;\n\nKey: when arr[mid] == target,\ndon't return - move hi = mid\nto keep searching left.",
  },
  {
    topic: "Two Pointers - Opposite Ends",
    front:
      "Explain the two-pointer technique\nwith pointers at opposite ends.\n\nGive a common use case.",
    back: "Place left at start, right at end.\nMove them inward based on condition.\n\nUse case: Two Sum (sorted array)\nlet l = 0, r = n - 1;\nwhile (l < r) {\n  sum = arr[l] + arr[r];\n  if (sum === target) return [l, r];\n  if (sum < target) l++;\n  else r--;\n}\n\nTime: O(n), Space: O(1)",
  },
  {
    topic: "Sliding Window - Fixed Size",
    front:
      "Explain the fixed-size sliding window.\n\nFind max sum of k consecutive elements.",
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
    topic: "Counting / Radix Sort",
    front:
      "When can you beat O(n log n) sorting?\n\nExplain counting sort and radix sort.",
    back: "When input has bounded range!\n\nCounting Sort:\n- Count occurrences of each value\n- Time: O(n + k), k = range\n- Space: O(k)\n\nRadix Sort:\n- Sort digit by digit (LSD or MSD)\n- Uses counting sort per digit\n- Time: O(d * (n + b))\n  d = digits, b = base\n\nBoth are stable.",
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
