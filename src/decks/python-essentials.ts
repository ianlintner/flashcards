import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Python Data Model",
    front: "What are Python's dunder methods?\n\nHow does the data model work?",
    back: "Dunder (double-underscore) methods:\n  Special methods Python calls implicitly.\n  Define how objects behave with\n  operators and built-in functions.\n\nKey dunders:\n  __init__(self, ...): Constructor.\n  __repr__(self): Developer string.\n  __str__(self): User-friendly string.\n  __len__(self): len(obj).\n  __getitem__(self, key): obj[key].\n  __setitem__(self, key, val): obj[key]=val.\n  __iter__(self): for x in obj.\n  __contains__(self, item): item in obj.\n  __eq__(self, other): obj == other.\n  __hash__(self): hash(obj), dict keys.\n  __call__(self, ...): obj() callable.\n  __enter__/__exit__: context manager.\n\nOperator overloading:\n  __add__: +    __mul__: *\n  __lt__: <     __gt__: >\n  __radd__: reflected (other + self).\n\nProtocol-based duck typing:\n  Iterable: __iter__.\n  Sized: __len__.\n  Container: __contains__.\n  Hashable: __hash__.\n  Callable: __call__.\n\nDescriptors:\n  __get__, __set__, __delete__.\n  How property() and classmethod work.\n  Underpin the entire attribute system.",
  },
  {
    topic: "Python Gotchas",
    front: "What are the most common\nPython gotchas that trip up\ndevelopers?",
    back: "Mutable default arguments:\n  def f(lst=[]):  # SHARED across calls!\n    lst.append(1)\n  Fix: def f(lst=None):\n         lst = lst or []\n\nLate binding closures:\n  fns = [lambda: i for i in range(3)]\n  fns[0]()  # Returns 2, not 0!\n  Fix: lambda i=i: i  (default arg).\n\nis vs ==:\n  is: Identity (same object).\n  ==: Equality (same value).\n  'a' * 256 is 'a' * 256  # Maybe True\n  (CPython string interning, unreliable.)\n\nInteger caching:\n  a = 256; b = 256; a is b  # True\n  a = 257; b = 257; a is b  # False!\n  CPython caches -5 to 256.\n\nMutable class variables:\n  class Foo:\n    items = []  # Shared by ALL instances!\n  Fix: Set in __init__.\n\nfor/else:\n  else runs if loop completes WITHOUT break.\n  for x in lst:\n    if x == target: break\n  else:\n    print('not found')\n\nGIL (Global Interpreter Lock):\n  Only one thread runs Python at a time.\n  Threads: Good for I/O, bad for CPU.\n  Use multiprocessing for CPU.\n  asyncio for concurrent I/O.\n\nCircular imports:\n  a.py imports b.py imports a.py.\n  Fix: Import inside function,\n  restructure, or use TYPE_CHECKING.",
  },
  {
    topic: "Python Concurrency",
    front: "Compare threading, multiprocessing,\nand asyncio in Python.",
    back: "Threading (concurrent, not parallel):\n  import threading\n  GIL: Only one thread at a time.\n  Good for: I/O-bound (network, file).\n  Bad for: CPU-bound.\n  ThreadPoolExecutor for convenience.\n  Race conditions: Use Lock, Semaphore.\n\nMultiprocessing (true parallelism):\n  import multiprocessing\n  Separate processes, separate GIL.\n  Good for: CPU-bound work.\n  Overhead: Process creation, IPC.\n  ProcessPoolExecutor.\n  Shared state: Manager, Queue, Pipe.\n  Memory: Each process copies data.\n    Use shared_memory for large data.\n\nasyncio (cooperative concurrency):\n  Single thread, event loop.\n  async def / await syntax.\n  Good for: Many concurrent I/O ops.\n  Non-blocking: aiohttp, asyncpg.\n  await: Yields control to event loop.\n\nCompare:\n  Task type:    Threading   MP    Asyncio\n  I/O-bound:    Good       OK     Best\n  CPU-bound:    Bad        Best   Bad\n  Memory:       Shared     Copy   Shared\n  Overhead:     Low        High   Lowest\n  Debugging:    Hard       Med    Med\n\nPython 3.12+:\n  Sub-interpreters (no GIL sharing).\n  Free-threading PEP (no-GIL build).\n  concurrent.futures: High-level API.",
  },
  {
    topic: "Python Comprehensions & Generators",
    front:
      "Explain list comprehensions,\ngenerator expressions, and\nPython iterators.",
    back: "List comprehension:\n  [expr for x in iterable if cond]\n  result = [x**2 for x in range(10) if x%2==0]\n  -> [0, 4, 16, 36, 64]\n  Creates full list in memory.\n\nDict comprehension:\n  {k: v for k, v in items if cond}\n  {x: x**2 for x in range(5)}\n\nSet comprehension:\n  {expr for x in iterable}\n\nNested:\n  [(x,y) for x in range(3) for y in range(3)]\n  Outer loop first, inner second.\n\nGenerator expression:\n  (expr for x in iterable if cond)\n  Lazy evaluation. Yields one at a time.\n  Memory efficient for large data.\n  sum(x**2 for x in range(10**9))\n\nGenerator function:\n  def gen():\n    yield 1\n    yield 2\n  for x in gen(): print(x)\n  State suspended between yields.\n  send() and throw() for coroutine-like.\n\nIterator protocol:\n  __iter__() -> returns self.\n  __next__() -> returns next value.\n  Raises StopIteration when done.\n  for loop calls both automatically.\n\nitertools (standard library):\n  chain, islice, groupby, product,\n  combinations, permutations,\n  count, cycle, repeat.\n  All lazy / memory efficient.",
  },
  {
    topic: "Python Type Hints",
    front: "How do type hints work in Python?\n\nKey typing module features.",
    back: "Type hints (PEP 484+):\n  Optional annotations, not enforced.\n  Checked by: mypy, pyright, pytype.\n\nBasic syntax:\n  def greet(name: str) -> str:\n    return f'Hello, {name}'\n\n  x: int = 5\n  names: list[str] = ['Alice', 'Bob']\n\nTyping module:\n  Optional[X] = X | None  (3.10+).\n  Union[X, Y] = X | Y  (3.10+).\n  Any: Escape hatch (avoid).\n  Callable[[args], return].\n  TypeVar: Generic type parameter.\n    T = TypeVar('T')\n    def first(lst: list[T]) -> T: ...\n\nModern (3.9+):\n  list[int] instead of List[int].\n  dict[str, int] instead of Dict.\n  tuple[int, ...] for variable length.\n  X | Y instead of Union.\n\nAdvanced:\n  Protocol: Structural subtyping.\n    class Sized(Protocol):\n      def __len__(self) -> int: ...\n\n  TypedDict: Dict with specific keys.\n  Literal['a', 'b']: Exact values.\n  TypeGuard: Custom type narrowing.\n  ParamSpec (P): Decorator param forwarding.\n  dataclass: Auto __init__, __repr__, etc.\n\nTYPE_CHECKING:\n  from __future__ import annotations\n  Strings, not evaluated at runtime.\n  Avoids circular import issues.",
  },
  {
    topic: "Python Decorators & Descriptors",
    front:
      "How do decorators work?\n\nExplain common decorators\nand descriptor protocol.",
    back: "Decorator: Function that wraps another.\n  @decorator\n  def func(): ...\n  Equivalent to: func = decorator(func)\n\nSimple decorator:\n  def timer(fn):\n    @functools.wraps(fn)  # Preserves metadata\n    def wrapper(*args, **kwargs):\n      start = time.time()\n      result = fn(*args, **kwargs)\n      print(f'{time.time()-start:.2f}s')\n      return result\n    return wrapper\n\nDecorator with arguments:\n  def repeat(n):\n    def decorator(fn):\n      @wraps(fn)\n      def wrapper(*args, **kwargs):\n        for _ in range(n):\n          result = fn(*args, **kwargs)\n        return result\n      return wrapper\n    return decorator\n  @repeat(3)\n  def hello(): print('hi')\n\nBuilt-in decorators:\n  @property: Getter/setter methods.\n  @staticmethod: No self/cls.\n  @classmethod: cls as first arg.\n  @functools.lru_cache: Memoization.\n  @functools.singledispatch: Overloading.\n  @dataclasses.dataclass: Auto methods.\n  @abc.abstractmethod: Interface.\n\nDescriptor protocol:\n  __get__(self, obj, type) -> value.\n  __set__(self, obj, value).\n  __delete__(self, obj).\n  How property, classmethod,\n  staticmethod work internally.",
  },
  {
    topic: "Python Package Management",
    front:
      "Compare pip, venv, poetry,\nconda, and uv for Python\npackage management.",
    back: "pip: Standard package installer.\n  pip install package\n  pip freeze > requirements.txt\n  pip install -r requirements.txt\n  Simple but no dependency resolution\n  locking until pip-tools.\n\nvenv (standard library):\n  python -m venv .venv\n  source .venv/bin/activate\n  Isolates per-project dependencies.\n  Always use virtual environments!\n\npip-tools:\n  pip-compile requirements.in -> .txt\n  Pinned, reproducible installs.\n\nPoetry:\n  pyproject.toml: Metadata + dependencies.\n  poetry.lock: Deterministic builds.\n  poetry add, poetry install.\n  Dependency resolution built in.\n  Build + publish packages.\n\nPDM / Hatch:\n  PEP 621 pyproject.toml.\n  Modern alternatives to Poetry.\n\nConda:\n  Package + environment manager.\n  Handles non-Python deps (C libs).\n  conda-forge: Community packages.\n  Use for: Data science, scientific.\n\nuv (from Astral, Rust-based):\n  10-100x faster than pip.\n  uv pip install, uv venv.\n  Drop-in replacement.\n  uv run: Script execution.\n  Growing rapidly in adoption.\n\npyproject.toml:\n  Modern standard for project config.\n  [project] metadata (PEP 621).\n  [tool.x] for tool-specific config.\n  Replaces setup.py, setup.cfg.",
  },
  {
    topic: "Python Performance",
    front:
      "How can you optimize\nPython performance?\n\nKey techniques and tools.",
    back: "Profiling first!\n  python -m cProfile script.py\n  line_profiler: @profile per line.\n  memory_profiler: Memory per line.\n  py-spy: Sampling profiler (no overhead).\n\nBuilt-in optimizations:\n  Use built-in functions (map, filter,\n    sum, min, max) - implemented in C.\n  List/dict/set comprehensions\n    (faster than loops).\n  Local variable lookup faster than global.\n  String join: ''.join(list) not += .\n  collections: defaultdict, Counter,\n    deque (O(1) appendleft).\n\nData structures:\n  set/dict: O(1) lookup (hash table).\n  bisect: Binary search on sorted list.\n  heapq: Priority queue.\n  array.array: Typed, less memory.\n\nNumeric computing:\n  NumPy: Vectorized C operations.\n    a * b  (element-wise, 100x faster).\n  pandas: DataFrame operations.\n  Avoid Python loops over arrays.\n\nConcurrency:\n  asyncio for I/O-bound.\n  multiprocessing for CPU-bound.\n  concurrent.futures: Easy parallelism.\n\nCompilation:\n  Cython: C extensions from Python.\n  Numba: JIT for numeric (@jit).\n  PyPy: Alternative interpreter with JIT.\n  mypyc: Compile type-annotated Python.\n  Rust extensions: pyo3/maturin.",
  },
];

export const PYTHON_ESSENTIALS: DeckInfo = {
  id: "python-essentials",
  title: "Python Essentials & Gotchas",
  description:
    "Data model, concurrency, generators, type hints, decorators, package management, and performance optimization in Python.",
  category: "Languages",
  level: "foundation",
  cards,
  tags: ["Python", "concurrency", "type hints", "decorators", "generators"],
  estimatedMinutes: 12,
};
