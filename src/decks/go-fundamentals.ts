import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Go Basics",
    front: "What makes Go unique?\n\nKey language design decisions.",
    back: "Go design philosophy:\n  Simple, fast, productive.\n  Compiled to native binary.\n  Garbage collected but low latency.\n  Strong static typing.\n  Built-in concurrency (goroutines).\n\nKey features:\n  Fast compilation (seconds).\n  Single binary deployment.\n  No generics (until Go 1.18+).\n  No exceptions (error values).\n  No inheritance (composition).\n  Opinionated formatting (gofmt).\n\nBasic types:\n  bool, string.\n  int, int8, int16, int32, int64.\n  uint, uint8 (byte), uint16, ...\n  float32, float64.\n  complex64, complex128.\n  rune = int32 (Unicode code point).\n\nVariables:\n  var x int = 5\n  x := 5  // Short declaration (inferred).\n  var x, y int = 1, 2\n  Unused variables = compiler error!\n\nZero values (not null/undefined):\n  int: 0, float: 0.0, bool: false.\n  string: '', pointer/slice/map: nil.\n\nPackage system:\n  package main + func main() = entry.\n  Exported: Capitalized names.\n  unexported: lowercase names.\n  import 'fmt', 'os', 'net/http'.\n  go mod init / go mod tidy.",
  },
  {
    topic: "Goroutines & Channels",
    front: "How do goroutines and channels\nwork in Go?",
    back: "Goroutine: Lightweight concurrent function.\n  go func() { ... }()  // Starts goroutine.\n  ~2KB stack (grows as needed).\n  Millions possible (vs OS thread ~1MB).\n  M:N scheduling (M goroutines on N threads).\n\nChannels: Typed conduits for communication.\n  ch := make(chan int)       // Unbuffered.\n  ch := make(chan int, 100)  // Buffered.\n\n  ch <- 42     // Send (blocks if full).\n  val := <-ch  // Receive (blocks if empty).\n  close(ch)    // Signal no more sends.\n\nUnbuffered: Synchronizes sender/receiver.\n  Both must be ready (rendezvous).\n\nBuffered: Sender blocks only when full.\n  Receiver blocks only when empty.\n\nSelect: Multiplexes channel operations.\n  select {\n  case msg := <-ch1:\n    handle(msg)\n  case ch2 <- val:\n    // sent\n  case <-time.After(5 * time.Second):\n    // timeout\n  default:\n    // non-blocking\n  }\n\nPatterns:\n  Fan-out: Multiple goroutines read from\n    one channel (work distribution).\n  Fan-in: Multiple channels into one\n    (result aggregation).\n  Pipeline: Chain of stages via channels.\n  Worker pool: Fixed goroutines + job channel.\n\n'Don't communicate by sharing memory;\nshare memory by communicating.' - Go Proverb.",
  },
  {
    topic: "Go Error Handling",
    front:
      "How does Go handle errors?\n\nExplain error values, wrapping,\nand panic/recover.",
    back: "Go philosophy: Errors are values.\n  No exceptions. Explicit checking.\n\nBasic pattern:\n  result, err := doSomething()\n  if err != nil {\n    return fmt.Errorf('failed: %w', err)\n  }\n\nerror interface:\n  type error interface {\n    Error() string\n  }\n\nCustom errors:\n  type NotFoundError struct {\n    ID string\n  }\n  func (e *NotFoundError) Error() string {\n    return 'not found: ' + e.ID\n  }\n\nError wrapping (Go 1.13+):\n  fmt.Errorf('query failed: %w', err)\n  %w wraps original error.\n\nError checking:\n  errors.Is(err, target):\n    Check if err wraps target value.\n    errors.Is(err, os.ErrNotExist).\n\n  errors.As(err, &target):\n    Check if err wraps target type.\n    var nfe *NotFoundError\n    if errors.As(err, &nfe) { ... }\n\npanic/recover (rare, don't overuse):\n  panic('something terrible').\n  Unwinds stack, runs defers.\n  recover() in defer catches panic.\n  Use: Truly unrecoverable situations.\n  Library code should NOT panic.\n\ndefer:\n  defer file.Close()  // Runs at func exit.\n  LIFO order. Runs even on panic.\n  Common: Close resources, unlock mutexes.",
  },
  {
    topic: "Go Structs & Interfaces",
    front:
      "How do structs and interfaces\nwork in Go?\n\nExplain composition vs inheritance.",
    back: "Struct: Typed collection of fields.\n  type User struct {\n    Name  string\n    Email string\n    Age   int\n  }\n  u := User{Name: 'Alice', Age: 30}\n  u.Name // Access field.\n\nMethods:\n  func (u User) String() string {\n    return u.Name\n  }\n  func (u *User) SetName(n string) {\n    u.Name = n  // Pointer receiver: mutates.\n  }\n  Value receiver: Copy (read-only).\n  Pointer receiver: Mutates original.\n\nInterface: Set of method signatures.\n  type Writer interface {\n    Write([]byte) (int, error)\n  }\n  IMPLICIT satisfaction!\n  No 'implements' keyword.\n  If type has the methods, it satisfies.\n\nEmpty interface: interface{} (any in 1.18+).\n  Holds any value. Use sparingly.\n  Type assertion: val.(Type).\n  Type switch:\n    switch v := val.(type) {\n    case int: ...\n    case string: ...\n    }\n\nComposition (embedding):\n  type Admin struct {\n    User  // Embeds User fields/methods.\n    Level int\n  }\n  a := Admin{User: User{Name:'Bob'}, Level:1}\n  a.Name // Promoted from User.\n  NOT inheritance. No polymorphism.\n  Prefer small interfaces:\n    io.Reader, io.Writer (1 method each).\n\n'The bigger the interface,\nthe weaker the abstraction.' - Rob Pike.",
  },
  {
    topic: "Go Generics",
    front:
      "How do generics work in Go\n(1.18+)?\n\nExplain type parameters\nand constraints.",
    back: "Type parameters (Go 1.18+):\n  func Map[T any, U any](s []T, f func(T) U) []U {\n    result := make([]U, len(s))\n    for i, v := range s {\n      result[i] = f(v)\n    }\n    return result\n  }\n\nConstraints:\n  any: No constraint (like interface{}).\n  comparable: Supports == and !=.\n  Custom:\n    type Number interface {\n      int | float64 | float32\n    }\n    func Sum[T Number](s []T) T { ... }\n\n  ~int: Includes types with int underlying.\n    type MyInt int  // Satisfies ~int.\n\nBuilt-in constraints (golang.org/x/exp):\n  constraints.Ordered: <, >, <=, >=.\n  constraints.Integer, Float, Complex.\n\nGeneric types:\n  type Stack[T any] struct {\n    items []T\n  }\n  func (s *Stack[T]) Push(v T) {\n    s.items = append(s.items, v)\n  }\n\nLimitations:\n  No method type parameters\n    (only function and type).\n  No specialization.\n  No operator overloading.\n  Type inference for functions:\n    Map(nums, double)  // T inferred.\n\nBest practice:\n  Use generics for containers, utilities.\n  Don't over-generalize.\n  Start with concrete types,\n  generalize when pattern repeats.",
  },
  {
    topic: "Go Slices & Maps",
    front: "How do slices and maps work\ninternally in Go?\n\nCommon pitfalls.",
    back: "Slice: Dynamic-length view of an array.\n  Header: {pointer, length, capacity}.\n\n  s := []int{1, 2, 3}\n  s = append(s, 4)  // May reallocate!\n\n  Slicing: s[1:3] shares underlying array.\n  Modifying slice element modifies original!\n\n  Gotcha: append may or may not allocate.\n    s1 := s[:2]\n    s1 = append(s1, 99)\n    // May overwrite s[2]!\n  Fix: s1 := s[:2:2]  (full slice expr).\n    Sets capacity = length.\n\n  copy(dst, src): Safe copy.\n  make([]int, len, cap): Pre-allocate.\n\nMap: Hash table.\n  m := map[string]int{'a': 1}\n  m['b'] = 2\n  val, ok := m['c']  // ok = false.\n  delete(m, 'a')\n\n  Iteration order: RANDOM (by design).\n  Not safe for concurrent access!\n  Use sync.Map or sync.RWMutex.\n\n  nil map: Read OK, write panics.\n  var m map[string]int\n  _ = m['x']    // OK, returns zero.\n  m['x'] = 1    // PANIC!\n\nArray vs slice:\n  [3]int is array (fixed, value type).\n  []int is slice (dynamic, reference-like).\n  Arrays rarely used directly.\n\nstrings.Builder for efficient concatenation.\nbytes.Buffer for byte operations.",
  },
  {
    topic: "Go Concurrency Patterns",
    front:
      "What are the common Go\nconcurrency patterns?\n\nHow do you handle synchronization?",
    back: "sync package:\n  sync.Mutex: Lock/Unlock.\n    mu.Lock()\n    defer mu.Unlock()\n  sync.RWMutex: Multiple readers, one writer.\n  sync.WaitGroup: Wait for goroutines.\n    wg.Add(1); go func(){defer wg.Done()...}()\n    wg.Wait()\n  sync.Once: Run function exactly once.\n    once.Do(func(){ ... })\n  sync.Pool: Reuse temporary objects.\n\nContext (cancellation & timeout):\n  ctx, cancel := context.WithTimeout(\n    context.Background(), 5*time.Second)\n  defer cancel()\n  select {\n  case result := <-doWork(ctx):\n    handle(result)\n  case <-ctx.Done():\n    log.Println('timeout:', ctx.Err())\n  }\n\nPatterns:\n  Worker pool:\n    jobs := make(chan Job, 100)\n    for i := 0; i < numWorkers; i++ {\n      go worker(jobs, results)\n    }\n\n  Semaphore:\n    sem := make(chan struct{}, maxConcurrent)\n    sem <- struct{}{} // acquire\n    <-sem              // release\n\n  errgroup (golang.org/x/sync):\n    g, ctx := errgroup.WithContext(ctx)\n    g.Go(func() error { ... })\n    if err := g.Wait(); err != nil { ... }\n\nRace detector:\n  go run -race main.go\n  Detects data races at runtime.\n  ALWAYS use in tests.",
  },
];

export const GO_FUNDAMENTALS: DeckInfo = {
  id: "go-fundamentals",
  title: "Go Fundamentals",
  description:
    "Go language basics, goroutines, channels, error handling, interfaces, generics, slices, maps, and concurrency patterns.",
  category: "Languages",
  level: "foundation",
  cards,
  tags: [
    "Go",
    "goroutines",
    "channels",
    "concurrency",
    "generics",
    "interfaces",
  ],
  estimatedMinutes: 10,
};
