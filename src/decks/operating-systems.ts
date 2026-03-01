import type { DeckInfo } from "./types";

export const OPERATING_SYSTEMS: DeckInfo = {
  id: "operating-systems",
  title: "Operating Systems Concepts",
  description:
    "Processes, threads, memory management, scheduling, I/O models, and file systems -- foundational knowledge for senior SWE and systems design interviews.",
  level: "intermediate",
  category: "Systems Fundamentals",
  cards: [
    {
      topic: "Process vs Thread (Deep Dive)",
      front:
        "What resources does a process own\nvs what a thread owns?\n\nWhat is shared, what is private?",
      back: "Process owns (private):\n- Virtual address space\n- File descriptors\n- Signal handlers\n- Environment variables\n\nThread owns (private):\n- Stack\n- Registers / program counter\n- Thread-local storage\n\nThreads share (within process):\n- Heap memory\n- Code segment\n- File descriptors\n- Signal disposition\n\nProcess creation: expensive (fork).\nThread creation: cheap (~10-100x faster).",
    },
    {
      topic: "Context Switching",
      front:
        "What is a context switch?\n\nWhat is the cost and why does\nit matter?",
      back: "Context switch: OS saves the state\n(registers, PC, stack pointer) of the\ncurrent process/thread and loads the\nstate of the next one.\n\nCost:\n- Direct: ~1-10 microseconds\n- Indirect: cache pollution (cold cache\n  after switch), TLB flush\n\nProcess switch > thread switch cost\n(process switch also flushes address\nspace / TLB entries).\n\nWhy care: excessive context switching\nkills throughput. Reason for:\n- Thread pools (reuse threads)\n- Async I/O (fewer threads needed)\n- CPU affinity (pin threads to cores)",
    },
    {
      topic: "CPU Scheduling Algorithms",
      front:
        "Name 4 CPU scheduling algorithms.\n\nWhich is used by modern OS kernels?",
      back: "1. FCFS (First Come First Served):\n   Simple but convoy effect.\n\n2. Round Robin:\n   Time quantum per process.\n   Fair but high context switch overhead\n   if quantum too small.\n\n3. Priority Scheduling:\n   Higher priority runs first.\n   Risk: starvation of low priority.\n   Fix: aging (increase priority over time).\n\n4. CFS (Completely Fair Scheduler):\n   Linux default. Uses red-black tree\n   of virtual runtimes. Process with\n   smallest vruntime runs next.\n   Fair share of CPU proportional\n   to priority/nice value.",
    },
    {
      topic: "Virtual Memory",
      front: "What is virtual memory?\n\nHow does it work at a high level?",
      back: "Virtual memory: each process gets its\nown virtual address space (e.g., 48-bit\n= 256 TB on x86-64).\n\nHow it works:\n1. Virtual address -> page table lookup\n2. Page table maps virtual page to\n   physical frame (4 KB pages typical)\n3. TLB caches recent translations\n4. If page not in RAM -> page fault\n   -> load from disk (swap)\n\nBenefits:\n- Process isolation (can't access\n  another process's memory)\n- Memory overcommit (more virtual\n  than physical)\n- Shared libraries (map same physical\n  page into multiple processes)",
    },
    {
      topic: "Page Replacement Algorithms",
      front:
        "Name 3 page replacement algorithms.\n\nWhich is optimal? Which is practical?",
      back: "1. Optimal (Belady's):\n   Replace page used farthest in future.\n   Impossible in practice (needs future\n   knowledge). Used as benchmark.\n\n2. LRU (Least Recently Used):\n   Replace page not used longest.\n   Good but exact LRU is expensive\n   (must track every access).\n\n3. Clock (Second Chance):\n   Approximation of LRU. Circular list\n   with reference bit. On replacement,\n   skip pages with ref bit = 1 (clear it),\n   evict page with bit = 0.\n   Practical + good performance.\n\nLinux uses a two-list variant\n(active/inactive lists).",
    },
    {
      topic: "Memory Allocation: Stack vs Heap",
      front: "Compare stack and heap memory.\n\nWhen is each used?",
      back: "Stack:\n- LIFO, per-thread, auto-managed\n- Local variables, function frames\n- Very fast: just move stack pointer\n- Fixed size (1-8 MB typical)\n- Freed automatically on return\n\nHeap:\n- Dynamic, shared across threads\n- malloc/new allocations\n- Slower: allocator must find free block\n- Unlimited (virtual memory)\n- Must be explicitly freed (or GC'd)\n- Fragmentation risk\n\nStack overflow: too deep recursion.\nHeap exhaustion: memory leak or\ntoo much allocation.",
    },
    {
      topic: "I/O Models",
      front: "What are the 5 I/O models?\n\nWhich is used by modern servers?",
      back: "1. Blocking I/O:\n   Thread blocks until I/O completes.\n   Simple but wastes thread.\n\n2. Non-blocking I/O:\n   Returns immediately if not ready.\n   Must poll (busy-wait).\n\n3. I/O Multiplexing:\n   select/poll/epoll - one thread\n   monitors multiple FDs.\n   Used by: Nginx, Node.js, Redis.\n\n4. Signal-driven I/O:\n   OS signals when FD is ready.\n   Rarely used directly.\n\n5. Async I/O (AIO):\n   OS does I/O, notifies on completion.\n   io_uring (Linux), IOCP (Windows).\n\nModern high-perf servers: epoll + \nnon-blocking (or io_uring).",
    },
    {
      topic: "epoll / kqueue / IOCP",
      front: "What is epoll?\n\nHow does it differ from select/poll?",
      back: "select: O(n) scan of all FDs each call.\nLimited to 1024 FDs.\n\npoll: same as select but no FD limit.\nStill O(n) scanning.\n\nepoll (Linux):\n- O(1) for ready events (only returns\n  ready FDs, not all)\n- Scales to 100K+ connections\n- Edge-triggered or level-triggered\n\nkqueue: BSD/macOS equivalent of epoll.\n\nIOCP: Windows completion-port model\n(true async, kernel does I/O).\n\nAll modern event loops (libuv, libevent,\nTokio, Netty) abstract over these.",
    },
    {
      topic: "File Systems Overview",
      front:
        "What is a file system?\n\nName 3 file systems and their use cases.",
      back: "File system: manages how data is stored\nand retrieved on disk. Maps file names\nto disk blocks.\n\nCommon file systems:\n1. ext4 (Linux default):\n   Journaling, good general purpose.\n   Max file: 16 TB, max volume: 1 EB.\n\n2. XFS:\n   High-performance for large files.\n   Used in databases, media servers.\n   Parallel I/O, fast metadata ops.\n\n3. ZFS / Btrfs:\n   Copy-on-write, snapshots, checksums,\n   built-in RAID, self-healing.\n   Used for NAS, data integrity.\n\nKey concepts: inodes, journaling,\ncopy-on-write, block allocation.",
    },
    {
      topic: "Disk I/O: Sequential vs Random",
      front:
        "Why is sequential I/O much faster\nthan random I/O?\n\nHow much faster?",
      back: "HDD:\n- Sequential: ~200 MB/s\n- Random: ~0.5-1 MB/s (seek time ~5ms)\n- Sequential is ~200x faster!\n\nSSD:\n- Sequential: ~500-3000 MB/s (NVMe)\n- Random: ~50-100 MB/s (4K reads)\n- Sequential is ~10-30x faster.\n\nWhy? HDD has physical disk seeking.\nSSD has no seek, but random reads\nincur FTL mapping + amplification.\n\nDesign implications:\n- WAL / append-only logs: sequential!\n- LSM trees beat B-trees for writes\n  (sequential vs random)\n- Batch I/O operations when possible\n- Kafka's performance: sequential writes.",
    },
    {
      topic: "IPC (Inter-Process Communication)",
      front: "Name 5 IPC mechanisms.\n\nWhen would you use each?",
      back: "1. Pipes (unnamed): parent<->child.\n   ls | grep: one-directional byte stream.\n\n2. Named Pipes (FIFO): unrelated procs.\n   File-system named. Still one-direction.\n\n3. Shared Memory: fastest IPC.\n   Both processes map same physical pages.\n   Need synchronization (semaphore).\n\n4. Message Queues: structured messages.\n   POSIX mq or System V.\n\n5. Sockets: most flexible.\n   Unix domain (same host, fast) or\n   TCP/UDP (network). Bidirectional.\n\n6. Signals: async notification (SIGTERM).\n   Limited data (just signal number).\n\nMicroservices: sockets (HTTP/gRPC).\nSame-machine fast path: shared memory.",
    },
    {
      topic: "Kernel vs User Space",
      front:
        "What is the difference between\nkernel space and user space?\n\nWhat is a system call?",
      back: "Kernel space:\n- Privileged mode (ring 0)\n- Direct hardware access\n- Memory management, scheduling, I/O\n\nUser space:\n- Unprivileged mode (ring 3)\n- Application code runs here\n- Cannot access hardware directly\n\nSystem call:\n- Interface between user and kernel\n- Trap instruction switches to ring 0\n- Examples: read(), write(), open(),\n  fork(), exec(), mmap()\n\nCost: ~100ns-1us per syscall\n(context switch to kernel and back).\n\nReduce syscalls: buffered I/O,\nio_uring (batch syscalls), mmap.",
    },
    {
      topic: "fork() and exec()",
      front:
        "What do fork() and exec() do?\n\nHow does a shell start a program?",
      back: "fork():\n- Creates a COPY of the current process\n- Child gets new PID\n- Copy-on-write: shares pages until\n  one process writes (then copies)\n- Returns 0 in child, child PID in parent\n\nexec():\n- REPLACES current process image with\n  a new program\n- Same PID, new code/data/stack\n\nShell workflow:\n1. Shell calls fork() -> child process\n2. Child calls exec('/usr/bin/ls')\n3. Parent calls wait() for child to exit\n\nModern: posix_spawn() for efficiency\n(avoids full fork overhead).",
    },
    {
      topic: "Memory-Mapped I/O (mmap)",
      front: "What is mmap?\n\nWhen is it better than read()/write()?",
      back: "mmap: maps a file (or device) directly\ninto the process's virtual address space.\n\nAccess file like memory:\nchar* data = mmap(file, size);\ndata[0] = 'A';  // writes to file\n\nAdvantages over read/write:\n- No extra copy (kernel -> user buffer)\n- OS manages paging transparently\n- Multiple processes can share mapping\n- Random access without seeking\n\nDisadvantages:\n- Complex error handling (SIGBUS)\n- Page faults for initial access\n- Not good for sequential streaming\n\nUsed by: databases (SQLite, LMDB),\nshared libraries, log processing.",
    },
    {
      topic: "Containers vs VMs",
      front:
        "Compare containers and VMs.\n\nWhat is the key architectural\ndifference?",
      back: "VM:\n- Full OS + kernel per instance\n- Hypervisor (VMware, KVM) manages\n- Heavy: minutes to start, GBs of RAM\n- Strong isolation (separate kernels)\n\nContainer (Docker):\n- Shares host kernel\n- Isolation via namespaces + cgroups\n- Lightweight: seconds to start, MBs\n- Weaker isolation (same kernel)\n\nNamespaces provide:\n- PID: isolated process trees\n- Network: separate network stacks\n- Mount: isolated file systems\n- User: uid/gid mapping\n\ncgroups limit:\n- CPU, memory, I/O per container\n\nVMs for: multi-tenant, different OS.\nContainers for: microservices, CI/CD.",
    },
    {
      topic: "Zombie and Orphan Processes",
      front:
        "What is a zombie process?\nWhat is an orphan process?\n\nHow do you fix them?",
      back: "Zombie:\n- Child has exited but parent hasn't\n  called wait() to read exit status.\n- Shows as Z in ps output.\n- Takes no CPU/memory, but holds a PID.\n- Fix: parent calls wait(), or kill\n  parent (init adopts and reaps).\n\nOrphan:\n- Parent exits before child.\n- Child is adopted by init (PID 1).\n- init will wait() for it when it exits.\n- Not a problem -- handled automatically.\n\nIn production: if you see many zombies,\nthe parent process has a bug (not\nreaping children). Fix the parent code.",
    },
    {
      topic: "Linux Performance Tools",
      front:
        "Name 5 essential Linux performance\ndiagnostic tools and what they show.",
      back: "1. top / htop:\n   CPU, memory, process list.\n   Quick overview.\n\n2. vmstat:\n   CPU, memory, I/O, context switches.\n   vmstat 1 for per-second snapshots.\n\n3. iostat:\n   Disk I/O throughput, latency, IOPS.\n   Identify disk bottlenecks.\n\n4. strace:\n   Trace system calls of a process.\n   Debug I/O, file, network issues.\n\n5. perf:\n   CPU profiling, hardware counters,\n   flame graphs.\n   Find hot functions and cache misses.\n\nBonus:\n- netstat/ss: network connections\n- dmesg: kernel messages (OOM, errors)\n- lsof: open files/sockets by process",
    },
    {
      topic: "OOM Killer",
      front:
        "What is the Linux OOM Killer?\n\nHow does it decide which process\nto kill?",
      back: "OOM Killer: when the system runs out\nof physical + swap memory, the kernel\nkills a process to free memory.\n\nSelection criteria (oom_score):\n- Higher memory usage = higher score\n- Longer runtime = lower score\n- Root processes score lower\n- oom_score_adj: user-tunable (-1000 to\n  1000). Set -1000 for critical processes.\n\nPrevention:\n- Don't overcommit:\n  vm.overcommit_memory = 2\n- Set memory limits (cgroups/containers)\n- Monitor memory usage with alerts\n- Use swap judiciously\n\nLogs: dmesg | grep -i oom",
    },
    {
      topic: "Signals in Unix",
      front:
        "What are Unix signals?\n\nName 5 important signals and\ntheir meaning.",
      back: "Signals: async notifications sent to\na process by the kernel or another\nprocess.\n\nKey signals:\n1. SIGTERM (15): polite termination\n   request. Process can catch and\n   clean up.\n\n2. SIGKILL (9): forced kill.\n   CANNOT be caught or ignored.\n\n3. SIGINT (2): interrupt (Ctrl+C).\n   Usually terminates gracefully.\n\n4. SIGHUP (1): terminal closed.\n   Often used to reload config.\n\n5. SIGSEGV (11): segmentation fault.\n   Invalid memory access.\n\nBest practice: handle SIGTERM for\ngraceful shutdown (close connections,\nflush buffers, save state).",
    },
    {
      topic: "OS Concepts in System Design",
      front: "Which OS concepts come up most\nin system design interviews?",
      back: "Frequently referenced:\n1. Threads vs processes -> scale model\n   (multi-threaded vs multi-process)\n\n2. I/O models -> event-driven vs\n   thread-per-request architecture\n\n3. Memory: caching, mmap, shared memory\n   -> cache layer design\n\n4. Disk I/O: sequential vs random\n   -> WAL, LSM trees, batch writes\n\n5. Containers/VMs -> deployment,\n   isolation, resource limits\n\n6. Context switching costs -> why\n   async/event-loop is preferred\n   for I/O-heavy workloads\n\n7. File descriptors / socket limits\n   -> C10K problem, connection pooling\n\nKnow enough to justify design choices.",
    },
  ],
};
