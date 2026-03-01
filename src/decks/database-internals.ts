import type { DeckInfo } from "./types";

export const DATABASE_INTERNALS: DeckInfo = {
  id: "database-internals",
  title: "Database Internals & Fundamentals",
  description:
    "SQL vs NoSQL, ACID, indexing, transactions, isolation levels, replication, normalization, and query optimization -- critical for system design rounds.",
  level: "intermediate",
  category: "Systems Fundamentals",
  cards: [
    {
      topic: "SQL vs NoSQL",
      front: "Compare SQL and NoSQL databases.\n\nWhen would you choose each?",
      back: "SQL (Relational): structured schema,\nACID, joins, strong consistency.\nUse: banking, ERP, analytics.\n\nNoSQL: flexible schema, horizontal\nscaling, eventual consistency.\nTypes: key-value, document, column,\ngraph.\nUse: real-time apps, big data, caching.\n\nKey tradeoff: consistency vs scale.",
    },
    {
      topic: "ACID Properties",
      front:
        "What are the ACID properties\nof database transactions?\n\nExplain each.",
      back: "A - Atomicity: all or nothing.\n    Transaction fully completes or\n    fully rolls back.\n\nC - Consistency: DB moves from one\n    valid state to another.\n\nI - Isolation: concurrent transactions\n    don't interfere with each other.\n\nD - Durability: committed data survives\n    crashes (written to disk/WAL).",
    },
    {
      topic: "Transaction Isolation Levels",
      front:
        "Name the 4 SQL isolation levels\nfrom weakest to strongest.\n\nWhat anomaly does each prevent?",
      back: "1. Read Uncommitted:\n   Allows dirty reads.\n\n2. Read Committed:\n   Prevents dirty reads.\n\n3. Repeatable Read:\n   Prevents dirty + non-repeatable reads.\n\n4. Serializable:\n   Prevents all anomalies including\n   phantom reads.\n\nStronger = more locking = lower\nthroughput.",
    },
    {
      topic: "Database Indexing - B-Tree",
      front:
        "How does a B-Tree index work?\n\nWhat operations does it speed up?",
      back: "B-Tree: balanced tree with high\nbranching factor (100s of children).\nAll leaves at same depth.\n\nSpeeds up:\n- Point queries: O(log n)\n- Range queries: leaf-linked traversal\n- Sorting: in-order traversal\n\nCost: O(log n) writes (must maintain\nbalance) + storage overhead.\n\nDefault index type in most RDBMSs.",
    },
    {
      topic: "Database Indexing - Hash Index",
      front:
        "How does a hash index work?\n\nWhen would you use hash vs B-Tree?",
      back: "Hash index: hash(key) -> bucket -> row.\nO(1) point lookups.\n\nLimitations:\n- No range queries\n- No ordering / sorting\n- No partial key matching\n\nUse hash when: only equality lookups\n(e.g., session store by session_id).\n\nUse B-Tree when: ranges, ORDER BY,\nLIKE 'prefix%', or general purpose.",
    },
    {
      topic: "Composite & Covering Indexes",
      front:
        "What is a composite index?\nWhat is a covering index?\n\nWhat is the leftmost prefix rule?",
      back: "Composite index: index on multiple\ncolumns: (a, b, c).\n\nLeftmost prefix rule: the index can\nbe used for queries on (a), (a,b),\nor (a,b,c) but NOT (b) or (c) alone.\n\nCovering index: all columns needed\nby the query are in the index.\nNo table lookup needed (index-only scan).\n\nDramatically speeds up read-heavy\nworkloads.",
    },
    {
      topic: "Normalization vs Denormalization",
      front:
        "What is normalization?\nWhat is denormalization?\n\nWhen do you choose each?",
      back: "Normalization: eliminate redundancy\nby splitting into related tables.\n1NF->2NF->3NF->BCNF.\nPros: data integrity, less storage.\nCons: more JOINs, slower reads.\n\nDenormalization: duplicate data to\navoid JOINs.\nPros: faster reads, simpler queries.\nCons: update anomalies, more storage.\n\nOLTP: normalize. OLAP/read-heavy:\ndenormalize.",
    },
    {
      topic: "Write-Ahead Log (WAL)",
      front:
        "What is a Write-Ahead Log (WAL)?\n\nWhy is it essential for durability?",
      back: "WAL: sequential append-only log of\nall changes BEFORE they are applied\nto the actual data pages.\n\nOn crash recovery:\n- Replay committed entries -> redo\n- Discard uncommitted -> undo\n\nWhy sequential? Sequential I/O is\n100-1000x faster than random I/O.\n\nUsed by: PostgreSQL, MySQL InnoDB,\nSQLite, LevelDB, RocksDB.",
    },
    {
      topic: "LSM Tree vs B-Tree",
      front:
        "Compare LSM-Trees and B-Trees.\n\nWhich is better for writes vs reads?",
      back: "B-Tree: in-place updates.\n+ Fast reads: O(log n)\n- Slower writes: random I/O\nUsed by: PostgreSQL, MySQL, Oracle.\n\nLSM-Tree: append to memtable, flush\nto sorted SSTables, compact later.\n+ Fast writes: sequential I/O\n- Slower reads: check multiple levels\n- Write amplification on compaction.\nUsed by: Cassandra, RocksDB, LevelDB.\n\nWrite-heavy -> LSM. Read-heavy -> B-Tree.",
    },
    {
      topic: "Database Replication",
      front:
        "What are the main database\nreplication strategies?\n\nTrade-offs of each?",
      back: "1. Single-leader (master-slave):\n   One writer, N readers.\n   Simple, but leader is bottleneck.\n\n2. Multi-leader:\n   Multiple writers, each replicates.\n   Better availability, conflict risk.\n\n3. Leaderless (Dynamo-style):\n   Read/write to any node. Quorum:\n   W + R > N for consistency.\n\nSync replication: strong consistency,\nhigher latency.\nAsync: low latency, possible stale reads.",
    },
    {
      topic: "Database Sharding / Partitioning",
      front:
        "What is database sharding?\n\nName two partitioning strategies\nand their trade-offs.",
      back: "Sharding: split data across multiple\nDB instances (shards) for horizontal\nscaling.\n\n1. Hash partitioning:\n   shard = hash(key) % N\n   + Even distribution\n   - No range queries across shards\n\n2. Range partitioning:\n   shard by key ranges (A-M, N-Z)\n   + Range queries on partition key\n   - Risk of hotspots\n\nCross-shard queries are expensive\n(scatter-gather).",
    },
    {
      topic: "EXPLAIN / Query Optimization",
      front:
        "What does EXPLAIN show?\n\nName 3 common ways to optimize\na slow SQL query.",
      back: "EXPLAIN shows the query execution plan:\n- Scan type (seq scan vs index scan)\n- Join strategy (nested loop, hash, merge)\n- Estimated rows and cost\n\nOptimization strategies:\n1. Add indexes on WHERE/JOIN columns.\n2. Rewrite query: avoid SELECT *,\n   reduce subqueries, use JOINs.\n3. Denormalize or create materialized\n   views for hot read paths.\n\nAlso: check N+1 query patterns.",
    },
    {
      topic: "N+1 Query Problem",
      front: "What is the N+1 query problem?\n\nHow do you fix it?",
      back: "N+1: fetch N parent rows, then for\neach parent issue 1 query for children.\nTotal: 1 + N queries.\n\nExample:\nSELECT * FROM orders;  -- 1 query\nFor each order:\n  SELECT * FROM items WHERE order_id=?\n  -- N queries\n\nFixes:\n- Eager loading / JOIN\n- Batch loading: WHERE order_id IN (...)\n- ORM: use include/preload directives.\n\nN+1 is the #1 ORM performance pitfall.",
    },
    {
      topic: "MVCC (Multi-Version Concurrency)",
      front: "What is MVCC?\n\nHow does it provide isolation\nwithout locking?",
      back: "MVCC: each transaction sees a snapshot\nof the DB at its start time.\n\nWrites create new versions of rows.\nReads see the version visible at their\nsnapshot timestamp.\n\nBenefits:\n- Readers never block writers\n- Writers never block readers\n- Only write-write conflicts need locks\n\nUsed by: PostgreSQL, MySQL InnoDB,\nOracle, CockroachDB.",
    },
    {
      topic: "Optimistic vs Pessimistic Locking",
      front: "Compare optimistic and pessimistic\nlocking. When use each?",
      back: "Pessimistic: lock the row before update.\nSELECT ... FOR UPDATE.\n+ Guarantees no conflicts.\n- Reduces concurrency, risk of deadlock.\nUse: high contention.\n\nOptimistic: read + version check on write.\nUPDATE ... WHERE version = N.\nIf version changed -> retry.\n+ Higher throughput when conflicts rare.\n- Retries under contention.\nUse: low contention, read-heavy.",
    },
    {
      topic: "Connection Pooling",
      front: "Why use connection pooling?\n\nWhat happens without it?",
      back: "Without pooling: each request opens a\nnew DB connection (TCP + auth + TLS).\nCost: 5-50ms per connection.\nAt scale: exhausts DB connection limit\n(typically 100-500 max).\n\nConnection pool: pre-opens N connections,\nreuses them across requests.\n\nBenefits:\n- Eliminates connection overhead\n- Bounds max concurrent DB connections\n- Handles backpressure via queue\n\nTools: PgBouncer, HikariCP, Drizzle.",
    },
    {
      topic: "CAP Theorem & Databases",
      front:
        "How does the CAP theorem apply\nto database selection?\n\nGive examples of CP and AP systems.",
      back: "CAP: in a network partition, choose\nConsistency or Availability.\n\nCP databases (prefer consistency):\n- PostgreSQL, MySQL, Spanner, CockroachDB\n- Reject writes during partition.\n\nAP databases (prefer availability):\n- Cassandra, DynamoDB, CouchDB\n- Accept writes, resolve conflicts later\n  (last-write-wins, vector clocks, CRDTs).\n\nNo partition -> can have both C and A.",
    },
    {
      topic: "Stored Procedures vs App Logic",
      front: "When should logic be in stored\nprocedures vs application code?",
      back: "Stored procedures:\n+ Less network round-trips\n+ Enforce business rules at DB level\n+ Atomic multi-statement logic\n- Hard to test, version, deploy\n- Vendor lock-in, limited languages\n\nApplication code:\n+ Testable, debuggable, portable\n+ Full language ecosystem\n- More round-trips for multi-step ops\n\nModern practice: mostly app logic.\nUse SP for: bulk operations, triggers,\nauditing, extreme latency requirements.",
    },
    {
      topic: "Time-Series Databases",
      front:
        "What is a time-series database?\n\nWhen would you use one over\na relational DB?",
      back: "Time-series DB: optimized for data\nindexed by timestamp.\n\nFeatures:\n- Efficient append-only writes\n- Automatic downsampling / retention\n- Built-in aggregation (avg, max, rate)\n- Time-range queries are O(1) per chunk\n\nUse when: metrics, IoT sensors, logs,\nfinancial ticks, monitoring.\n\nExamples: InfluxDB, TimescaleDB,\nPrometheus, QuestDB.\n\nRelational DB is fine for low-volume\ntime data with complex joins.",
    },
    {
      topic: "Database Migration Strategies",
      front:
        "Name 3 strategies for safely\nmigrating a database schema in\na production system.",
      back: "1. Expand-Contract:\n   Add new columns/tables first,\n   migrate data, drop old schema later.\n   Zero downtime.\n\n2. Dual-write:\n   Write to old + new schema.\n   Backfill historical data.\n   Switch reads, stop old writes.\n\n3. Blue-green migration:\n   Replicate to new schema DB.\n   Switch traffic atomically.\n\nRules: never drop columns first,\nalways backward-compatible migrations,\ntest rollback plan.",
    },
    {
      topic: "Graph Databases",
      front:
        "When should you use a graph database\ninstead of relational?\n\nGive 3 use cases.",
      back: "Use graph DB when relationships ARE\nthe primary query target and are\nmany-hop / variable-depth.\n\nUse cases:\n1. Social networks (friends-of-friends,\n   mutual connections)\n2. Recommendation engines (users who\n   bought X also bought Y)\n3. Fraud detection (find cycles in\n   transaction graphs)\n\nExamples: Neo4j, Amazon Neptune,\nDgraph.\n\nRelational: poor at recursive/deep\nJOINs. Graph DB: O(1) per hop.",
    },
    {
      topic: "Database Caching Strategies",
      front:
        "Name 3 database caching strategies.\n\nWhat is cache-aside vs write-through?",
      back: "1. Cache-aside (lazy loading):\n   App checks cache first. On miss,\n   reads DB, writes to cache.\n   + Only caches what's needed.\n   - Cache miss penalty.\n\n2. Write-through:\n   App writes to cache AND DB together.\n   + Cache always consistent.\n   - Write latency higher.\n\n3. Write-behind (write-back):\n   Write to cache, async flush to DB.\n   + Fastest writes.\n   - Risk of data loss on crash.\n\nMost common for reads: cache-aside.",
    },
  ],
};
