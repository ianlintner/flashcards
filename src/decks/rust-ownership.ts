import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Ownership Basics",
    front:
      "What is Rust's ownership system?\n\nState the three ownership rules.",
    back: "Ownership: Rust's approach to memory\nsafety without garbage collection.\nChecked at compile time (zero cost).\n\nThree rules:\n  1. Each value has exactly ONE owner.\n  2. When the owner goes out of scope,\n     the value is dropped (freed).\n  3. There can be only one owner at a time.\n\nMove semantics (default for heap data):\n  let s1 = String::from('hello');\n  let s2 = s1;  // s1 is MOVED to s2.\n  // s1 is now invalid! Can't use it.\n  // No double-free possible.\n\nCopy trait (for stack data):\n  let x: i32 = 5;\n  let y = x;  // x is COPIED, not moved.\n  // Both x and y are valid.\n  // Types: integers, floats, bool, char,\n  //   tuples of Copy types.\n\nClone (explicit deep copy):\n  let s2 = s1.clone();  // Both valid.\n  // Explicit and visible cost.\n\nDrop trait:\n  impl Drop for MyType {\n    fn drop(&mut self) { ... }\n  }\n  Called automatically at scope end.\n  Like destructor in C++.\n  RAII: Resource Acquisition Is Initialization.\n\nWhy it matters:\n  No null pointers.\n  No dangling pointers.\n  No double-free.\n  No data races.\n  All guaranteed at compile time.",
  },
  {
    topic: "Borrowing & References",
    front:
      "How do references and borrowing\nwork in Rust?\n\nWhat are the borrowing rules?",
    back: "Reference: Borrow a value without\ntaking ownership.\n  &T: Immutable (shared) reference.\n  &mut T: Mutable (exclusive) reference.\n\nBorrowing rules:\n  At any given time, you can have EITHER:\n    - Any number of &T (shared reads), OR\n    - Exactly one &mut T (exclusive write).\n  NOT both simultaneously.\n  References must always be valid.\n\nImmutable borrow:\n  fn len(s: &String) -> usize {\n    s.len()  // Can read, can't modify.\n  }\n  let s = String::from('hello');\n  let l = len(&s);  // s still valid.\n\nMutable borrow:\n  fn push(s: &mut String) {\n    s.push_str(' world');\n  }\n  let mut s = String::from('hello');\n  push(&mut s);  // Exclusive access.\n\nCompile error:\n  let mut s = String::from('hi');\n  let r1 = &s;\n  let r2 = &s;      // OK: multiple &T.\n  let r3 = &mut s;  // ERROR: can't borrow\n  // as &mut while &T exists.\n\nDangling reference prevention:\n  fn dangle() -> &String {\n    let s = String::from('hi');\n    &s  // ERROR: s dropped at end!\n  }\n  Fix: Return String (transfer ownership).\n\nNon-Lexical Lifetimes (NLL):\n  Borrows end at last use, not scope end.\n  Makes many patterns compile that\n  wouldn't in older Rust.",
  },
  {
    topic: "Lifetimes",
    front: "What are lifetimes in Rust?\n\nWhen and how do you annotate them?",
    back: "Lifetime: How long a reference is valid.\nCompiler tracks to prevent dangling refs.\nAnnotated with 'a, 'b, etc.\n\nLifetime elision rules (implicit):\n  1. Each input ref gets its own lifetime.\n  2. If one input lifetime, output gets it.\n  3. If &self or &mut self, output gets\n     self's lifetime.\n  Most functions don't need annotations!\n\nWhen you must annotate:\n  fn longest<'a>(s1: &'a str, s2: &'a str)\n    -> &'a str\n  {\n    if s1.len() > s2.len() { s1 } else { s2 }\n  }\n  Tells compiler: returned ref lives as\n  long as the shorter of s1, s2.\n\nIn structs:\n  struct Excerpt<'a> {\n    text: &'a str,\n  }\n  Struct can't outlive the reference\n  it holds.\n\nStatic lifetime:\n  'static: Lives for entire program.\n  String literals: &'static str.\n  let s: &'static str = 'hello';\n\nLifetime bounds:\n  T: 'a  -> T must live at least as long as 'a.\n  T: 'static -> T has no non-'static refs.\n\nCommon patterns:\n  Input/output: Link output to input.\n  Same lifetime: Multiple refs related.\n  Higher-Rank Trait Bounds:\n    for<'a> Fn(&'a str) -> &'a str.",
  },
  {
    topic: "Enums & Pattern Matching",
    front:
      "How do Rust enums differ from\nother languages?\n\nExplain pattern matching.",
    back: "Rust enums: Algebraic Data Types.\n  Variants can hold data!\n\n  enum Shape {\n    Circle(f64),           // radius\n    Rectangle(f64, f64),   // width, height\n    Triangle { a: f64, b: f64, c: f64 },\n  }\n\nOption<T> (no null!):\n  enum Option<T> {\n    Some(T),\n    None,\n  }\n  let x: Option<i32> = Some(5);\n  Must handle None explicitly.\n\nResult<T, E> (no exceptions!):\n  enum Result<T, E> {\n    Ok(T),\n    Err(E),\n  }\n  let r: Result<i32, String> = Ok(42);\n\nPattern matching (match):\n  match shape {\n    Shape::Circle(r) => PI * r * r,\n    Shape::Rectangle(w, h) => w * h,\n    Shape::Triangle { a, .. } => a,\n  }\n  MUST be exhaustive (all cases covered).\n\nif let (single pattern):\n  if let Some(val) = optional {\n    println!('{val}');\n  }\n\n? operator (error propagation):\n  fn read() -> Result<String, io::Error> {\n    let s = fs::read_to_string('f.txt')?;\n    Ok(s)\n  }\n  If Err, returns immediately.\n  Replaces verbose match on Result.\n\nwhile let:\n  while let Some(val) = iter.next() {\n    process(val);\n  }",
  },
  {
    topic: "Traits",
    front:
      "What are Rust traits?\n\nHow do they compare to\ninterfaces in other languages?",
    back: "Trait: Shared behavior (like interface).\n  trait Summary {\n    fn summarize(&self) -> String;\n    fn preview(&self) -> String {\n      // Default implementation.\n      format!('Read more: {}', self.summarize())\n    }\n  }\n\nImplementation:\n  impl Summary for Article {\n    fn summarize(&self) -> String {\n      format!('{} by {}', self.title, self.author)\n    }\n  }\n\nTrait bounds:\n  fn notify(item: &impl Summary) { ... }\n  fn notify<T: Summary>(item: &T) { ... }\n  fn notify<T: Summary + Display>(item: &T)\n  where T: Summary + Display { ... }\n\nDynamic dispatch:\n  fn notify(item: &dyn Summary) { ... }\n  Box<dyn Summary>: Trait object.\n  Runtime polymorphism (vtable).\n  Size not known at compile time.\n\nKey built-in traits:\n  Display: User-facing format ({}).\n  Debug: Developer format ({:?}).\n  Clone: Explicit deep copy.\n  Copy: Implicit bitwise copy.\n  Iterator: for loops.\n  From/Into: Type conversion.\n  Deref: Smart pointer behavior.\n  Drop: Destructor.\n  Send: Safe to transfer between threads.\n  Sync: Safe to share between threads.\n\nOrphan rule:\n  Can implement trait for type only if\n  you own the trait OR the type.\n  Prevents conflicting implementations.\n\nDerive macro:\n  #[derive(Debug, Clone, PartialEq)]\n  Auto-generate implementations.",
  },
  {
    topic: "Smart Pointers",
    front:
      "What are Rust's smart pointers?\n\nCompare Box, Rc, Arc,\nRefCell, and Mutex.",
    back: "Box<T>: Heap allocation.\n  let b = Box::new(5);\n  Use: Recursive types, large data,\n  trait objects (Box<dyn Trait>).\n  Single owner. Deref to T.\n\nRc<T>: Reference Counted (single-thread).\n  let a = Rc::new(5);\n  let b = Rc::clone(&a);  // count++\n  Shared ownership. IMMUTABLE.\n  Not thread-safe!\n  Dropped when count reaches 0.\n\nArc<T>: Atomic Rc (thread-safe).\n  let a = Arc::new(5);\n  let b = Arc::clone(&a);\n  Use: Shared data across threads.\n  Still immutable! Combine with Mutex.\n\nRefCell<T>: Interior mutability.\n  Borrow checking at RUNTIME.\n  let cell = RefCell::new(5);\n  *cell.borrow_mut() += 1;\n  Panics on rule violation (not compile error).\n  Rc<RefCell<T>>: Shared + mutable.\n\nMutex<T>: Thread-safe interior mutability.\n  let m = Mutex::new(5);\n  let mut guard = m.lock().unwrap();\n  *guard += 1;\n  // Lock released when guard dropped.\n  Arc<Mutex<T>>: Shared + mutable + threads.\n\nRwLock<T>: Multiple readers OR one writer.\n  Like Mutex but allows concurrent reads.\n\nWeak<T>: Non-owning reference.\n  Prevents reference cycles with Rc/Arc.\n  weak.upgrade() -> Option<Rc<T>>.\n\nPin<T>: Prevents moving in memory.\n  Required for self-referential types\n  and async/futures.",
  },
  {
    topic: "Rust Concurrency",
    front:
      "How does Rust prevent data\nraces at compile time?\n\nExplain Send and Sync.",
    back: "Rust's fearless concurrency:\n  Data races are COMPILE-TIME errors.\n  Ownership + type system prevents them.\n\nSend trait:\n  Type can be transferred to another thread.\n  Almost everything is Send.\n  NOT Send: Rc<T> (not atomic).\n  Send types: String, Vec, Box, Arc.\n\nSync trait:\n  Type can be shared between threads\n  (via &T reference).\n  T is Sync if &T is Send.\n  NOT Sync: RefCell (no atomic checks).\n  Sync types: Mutex, RwLock, atomics.\n\nThread spawn:\n  std::thread::spawn(move || {\n    // move: Takes ownership of captures.\n    println!('{data}');\n  });\n  Closure must be Send + 'static.\n\nChannels (like Go):\n  let (tx, rx) = mpsc::channel();\n  tx.send(42).unwrap();\n  let val = rx.recv().unwrap();\n  mpsc: Multiple producer, single consumer.\n\nShared state:\n  let data = Arc::new(Mutex::new(vec![]));\n  let data_clone = Arc::clone(&data);\n  thread::spawn(move || {\n    data_clone.lock().unwrap().push(1);\n  });\n\nasync/await:\n  async fn fetch() -> Result<String> { ... }\n  Runtimes: tokio, async-std.\n  Futures are lazy (don't run until polled).\n  .await suspends until ready.\n\nRayon (data parallelism):\n  vec.par_iter().map(|x| x*2).collect();\n  Automatic work-stealing thread pool.",
  },
];

export const RUST_OWNERSHIP: DeckInfo = {
  id: "rust-ownership",
  title: "Rust Ownership & Memory",
  description:
    "Ownership, borrowing, lifetimes, enums, pattern matching, traits, smart pointers, and fearless concurrency in Rust.",
  category: "Languages",
  level: "intermediate",
  cards,
  tags: [
    "Rust",
    "ownership",
    "borrowing",
    "lifetimes",
    "traits",
    "concurrency",
  ],
  estimatedMinutes: 10,
};
