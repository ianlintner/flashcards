import type { DeckInfo } from "./types";

export const CONCURRENCY_PARALLELISM: DeckInfo = {
  id: "concurrency-parallelism",
  title: "Concurrency & Parallelism",
  description:
    "Threads, locks, deadlocks, race conditions, async patterns, and concurrent data structures -- essential for FAANG system design and coding rounds.",
  level: "intermediate",
  category: "Systems Fundamentals",
  cards: [
    // ── Core Concepts ──────────────────────────────────────────────────────────
    {
      topic: "Concurrency vs Parallelism",
      front:
        "What is the difference between\nconcurrency and parallelism?\n\nWhen would you use each?",
      back: "Concurrency: multiple tasks make progress\nby interleaving (time-slicing on 1 CPU).\n\nParallelism: multiple tasks execute\nsimultaneously on multiple CPU cores.\n\nConcurrency = structure.\nParallelism = execution.",
    },
    {
      topic: "Processes vs Threads",
      front:
        "What is the difference between\na process and a thread?\n\nHow do they share memory?",
      back: "Process: own address space, file\ndescriptors, heap. Isolated.\n\nThread: shares address space + heap with\nother threads in the same process.\nHas own stack + registers.\n\nThreads are cheaper to create/switch\nbut require synchronization.",
    },
    {
      topic: "Race Condition",
      front: "What is a race condition?\n\nGive a simple example.",
      back: "A race condition occurs when the result\ndepends on the non-deterministic ordering\nof operations by multiple threads.\n\nExample: two threads do count++.\nBoth read count=5, both write 6.\nExpected: 7. Actual: 6.\n\nFix: use a mutex, atomic, or lock.",
    },
    {
      topic: "Mutex (Mutual Exclusion)",
      front: "What is a mutex?\n\nHow does it prevent race conditions?",
      back: "A mutex allows only ONE thread to enter\na critical section at a time.\n\nlock(mutex)\n  // critical section\nunlock(mutex)\n\nOther threads block (wait) until the\nmutex is released. Ensures atomicity\nof the guarded code.",
    },
    {
      topic: "Semaphore",
      front: "What is a semaphore?\n\nHow does it differ from a mutex?",
      back: "Semaphore: counter-based synchronization.\nP()/wait() decrements; V()/signal() increments.\n\nMutex: binary (0 or 1), owned by a thread.\nSemaphore: can allow N concurrent accesses\n(e.g., connection pool of size 10).\n\nSemaphore(1) ~= Mutex (but no ownership).",
    },
    {
      topic: "Deadlock",
      front:
        "What is a deadlock?\n\nWhat are the four necessary conditions\n(Coffman conditions)?",
      back: "Deadlock: two+ threads blocked forever,\neach waiting for the other's resource.\n\n4 Coffman conditions (ALL required):\n1. Mutual exclusion\n2. Hold and wait\n3. No preemption\n4. Circular wait\n\nBreak ANY one to prevent deadlock.",
    },
    {
      topic: "Deadlock Prevention Strategies",
      front: "Name three practical strategies\nto prevent or avoid deadlock.",
      back: "1. Lock ordering: always acquire locks\n   in the same global order (breaks\n   circular wait).\n\n2. Timeout/try-lock: attempt lock with\n   timeout, back off and retry.\n\n3. Lock-free algorithms: use CAS\n   (compare-and-swap) atomics instead\n   of locks entirely.",
    },
    {
      topic: "Livelock vs Starvation",
      front:
        "What is livelock? What is starvation?\n\nHow do they differ from deadlock?",
      back: "Livelock: threads keep responding to\neach other but none make progress.\n(e.g., two people stepping aside in\nthe same direction repeatedly.)\n\nStarvation: a thread never gets\nresources because others keep taking\nthem (low priority, unfair scheduling).\n\nDeadlock: no progress, threads blocked.\nLivelock: no progress, threads active.",
    },
    // ── Patterns & Primitives ──────────────────────────────────────────────────
    {
      topic: "Read-Write Lock",
      front:
        "What is a read-write lock (RWLock)?\n\nWhen is it better than a mutex?",
      back: "RWLock allows:\n- Multiple concurrent readers, OR\n- One exclusive writer.\n\nBetter than mutex when reads >> writes.\n\nReaders don't block each other.\nA writer waits for all readers to finish\nthen blocks new readers until done.",
    },
    {
      topic: "Condition Variable",
      front: "What is a condition variable?\n\nHow is it used with a mutex?",
      back: "A condition variable lets a thread\nwait for a specific condition to be true.\n\nPattern:\nlock(mutex)\nwhile (!condition):\n  wait(condVar, mutex)  // releases lock\n// condition is true, lock re-acquired\nunlock(mutex)\n\nAnother thread signals: notify(condVar)\nwhen it changes the condition.",
    },
    {
      topic: "Compare-And-Swap (CAS)",
      front:
        "What is CAS (Compare-And-Swap)?\n\nWhy is it fundamental to lock-free\nprogramming?",
      back: "CAS(addr, expected, new):\n  atomically:\n    if *addr == expected:\n      *addr = new\n      return true\n    return false\n\nHardware-level atomic instruction.\nEnables lock-free counters, queues,\nstacks without mutexes.\n\nRetry loop on failure (spin).",
    },
    {
      topic: "Thread Pool Pattern",
      front:
        "What is a thread pool?\n\nWhy use one instead of creating\nthreads on demand?",
      back: "A thread pool pre-creates N worker\nthreads that pull tasks from a queue.\n\nBenefits:\n- Avoids thread creation overhead\n- Bounds max concurrency\n- Reuses threads across requests\n- Prevents resource exhaustion\n\nUsed in: web servers, DB connection\npools, executor services.",
    },
    {
      topic: "Producer-Consumer Pattern",
      front:
        "Describe the Producer-Consumer pattern.\n\nWhat synchronization primitives\nare needed?",
      back: "Producers add items to a shared buffer.\nConsumers remove items from it.\n\nSynchronization needed:\n- Mutex: protect buffer access\n- Semaphore or condvar: signal when\n  buffer is not-empty / not-full\n\nBounded buffer variant prevents OOM\nby blocking producers when full.",
    },
    {
      topic: "Concurrent Data Structures",
      front: "Name 4 common concurrent data\nstructures and their use cases.",
      back: "1. ConcurrentHashMap: thread-safe map\n   with segment-level locking.\n\n2. BlockingQueue: producer-consumer\n   with built-in wait/notify.\n\n3. CopyOnWriteArrayList: reads are\n   lock-free; writes copy the array.\n\n4. ConcurrentSkipListMap: sorted\n   concurrent map, O(log n) ops.\n\nAll avoid global locks for throughput.",
    },
    // ── Async & Modern Patterns ────────────────────────────────────────────────
    {
      topic: "Async/Await Model",
      front:
        "How does async/await differ from\ntraditional threading?\n\nWhat problem does it solve?",
      back: "Async/await uses cooperative scheduling:\ntasks yield at await points, letting\nother tasks run on the same thread.\n\nDiffers from threads:\n- No OS thread per task (lightweight)\n- No preemption (explicit yield)\n- Ideal for I/O-bound workloads\n\nSolves: C10K problem -- handle 10K+\nconcurrent connections with few threads.",
    },
    {
      topic: "Event Loop",
      front:
        "What is an event loop?\n\nHow does Node.js handle concurrency\nwith a single thread?",
      back: "Event loop: continually checks a queue\nof callbacks/events and executes them.\n\nNode.js: single-threaded event loop.\n1. Accept request\n2. Dispatch I/O to OS (non-blocking)\n3. Register callback\n4. Continue processing other events\n5. I/O completes -> callback runs\n\nCPU-bound work blocks the loop\n-> use worker threads or cluster.",
    },
    {
      topic: "Futures & Promises",
      front:
        "What is a Future / Promise?\n\nHow does it relate to async programming?",
      back: "A Future/Promise is a placeholder for\na value that will be available later.\n\nStates: Pending -> Fulfilled / Rejected\n\nAllows:\n- Composing async operations (.then)\n- Error propagation (.catch)\n- Parallel execution (Promise.all)\n\nFoundation of async/await:\nawait promise = suspend until resolved.",
    },
    {
      topic: "CPU-Bound vs I/O-Bound Work",
      front:
        "How should you choose between\nthreads, async I/O, and processes\nfor CPU-bound vs I/O-bound work?",
      back: "I/O-bound work spends most time\nwaiting on network, disk, or DB.\n\nBest fits:\n- Async/event loop: many sockets, APIs\n- Threads: blocking libraries, mixed I/O\n\nCPU-bound work spends time computing.\n\nBest fits:\n- Processes: bypass language runtimes like\n  Python GIL, isolate failures\n- Worker threads: native parallel compute\n- SIMD/GPU: dense numeric workloads\n\nRule: use async for waiting,\nparallel workers for crunching.",
    },
    {
      topic: "Fork-Join and Work Stealing",
      front:
        "What are the fork-join and\nwork-stealing patterns?\n\nWhy do they scale well?",
      back: "Fork-join splits a task into smaller\nsubtasks, runs them in parallel, then\njoins the partial results.\n\nWork stealing:\n- Each worker keeps a deque of tasks\n- Idle workers steal from busy workers\n- Reduces central scheduling bottlenecks\n\nGreat for recursive divide-and-conquer:\n- Parallel quicksort / mergesort\n- Tree traversal\n- Graph search\n- Batch task pools\n\nUsed by: Java ForkJoinPool, Cilk,\nIntel TBB, Rust Rayon.",
    },
    {
      topic: "Amdahl vs Gustafson",
      front:
        "What do Amdahl's Law and\nGustafson's Law say about\nparallel speedup?",
      back: "Amdahl's Law:\n  Speedup <= 1 / (S + P/N)\n  S = serial fraction, P = parallel part\n  Even tiny serial work limits scaling.\n\nExample:\n  10% serial => max speedup is 10x\n  no matter how many CPUs you add.\n\nGustafson's Law:\n  If workload grows with CPU count,\n  effective speedup can scale nearly linearly.\n\nTakeaway:\n- Amdahl warns about bottlenecks\n- Gustafson justifies larger workloads\n- Both matter for real system design",
    },
    {
      topic: "Actor Model",
      front:
        "What is the actor model?\n\nHow does it differ from shared-memory\nthreading?",
      back: "Actor model:\n- Each actor owns its private state\n- Actors communicate by message passing\n- No direct shared mutable memory\n\nBenefits:\n- Fewer locks and races\n- Natural isolation and supervision\n- Good fit for distributed systems\n\nTrade-offs:\n- Message serialization overhead\n- Harder debugging across mailboxes\n- Ordering is per mailbox, not global\n\nUsed by: Erlang/OTP, Akka, Orleans.",
    },
    {
      topic: "False Sharing",
      front:
        "What is false sharing?\n\nWhy can it kill parallel performance\neven without lock contention?",
      back: "False sharing happens when threads\nupdate different variables that live on\nthe same CPU cache line.\n\nResult:\n- Cache line bounces between cores\n- Throughput collapses\n- Profiling shows coherence traffic\n\nFixes:\n- Pad hot counters onto separate lines\n- Use per-thread buffers, then reduce\n- Lower write frequency on shared data\n- Prefer local accumulation + merge\n\nA classic performance bug: not wrong,\njust impressively slow.",
    },
    {
      topic: "Volatile & Memory Visibility",
      front:
        "What does 'volatile' (Java) or\nmemory ordering (C++) ensure?\n\nWhy is it not enough alone?",
      back: "Volatile/memory ordering ensures:\n- Writes are visible to other threads\n  (not cached in CPU registers).\n- Prevents compiler reordering.\n\nNOT enough alone because:\n- Does not make compound operations\n  (read-modify-write) atomic.\n- count++ on volatile is STILL a race.\n\nUse atomic types or locks for compound\noperations.",
    },
    {
      topic: "Dining Philosophers Problem",
      front:
        "Describe the Dining Philosophers\nproblem. What does it illustrate?",
      back: "5 philosophers sit at a round table.\nEach needs 2 forks to eat.\nOnly 5 forks total (1 between each).\n\nNaive: each picks up left fork, then\nwaits for right -> DEADLOCK.\n\nSolutions:\n- Resource ordering (odd picks left\n  first, even picks right first)\n- Central arbiter/waiter\n- Timeout and retry\n\nIllustrates deadlock in shared resources.",
    },
    {
      topic: "Concurrency in System Design",
      front:
        "In system design interviews, name\n3 concurrency concerns you must\naddress.",
      back: "1. Race conditions on shared state:\n   -> distributed locks, CAS, idempotent\n   operations, optimistic concurrency.\n\n2. Thundering herd / hot keys:\n   -> request coalescing, jitter,\n   cache stampede prevention.\n\n3. Ordering guarantees:\n   -> message queues with partitioning,\n   sequence numbers, exactly-once\n   processing semantics.",
    },
  ],
};
