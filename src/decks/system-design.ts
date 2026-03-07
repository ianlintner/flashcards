import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "URL Shortener (TinyURL)",
    front:
      "Design a URL Shortener (like bit.ly).\n\nWhat are the key components\nand design decisions?",
    back: "Components:\n- API: createShortURL(longURL) -> short\n        redirect(shortURL) -> longURL\n- ID generation: counter, hash, or\n  base62 encoding of auto-increment ID\n- Storage: key-value store (short->long)\n- Cache: hot URLs in Redis/Memcached\n\nScale:\n- Read-heavy (100:1 read/write)\n- 1B URLs -> ~7 chars base62\n- Partition by hash of short URL\n- 301 (permanent) vs 302 (temporary) redirect",
  },
  {
    topic: "Twitter / Social Feed",
    front:
      "Design a Twitter-like social media feed.\n\nWhat are the key challenges?",
    back: "Core challenge: fan-out on write vs read.\n\nFan-out on WRITE (push):\n  On tweet: write to all follower timelines\n  Fast reads, slow writes for celebrities\n\nFan-out on READ (pull):\n  On open: query all followee tweets, merge\n  Slow reads, fast writes\n\nHybrid: push for normal users,\n  pull for celebrities (>10K followers).\n\nComponents: tweet store, timeline cache,\nsocial graph, search index, media CDN.",
  },
  {
    topic: "Chat / Messaging System",
    front:
      "Design a real-time chat system\n(like WhatsApp/Slack).\n\nWhat are the key components?",
    back: "Components:\n- WebSocket servers for real-time\n- Connection manager (user->server map)\n- Message queue (Kafka/RabbitMQ)\n- Message store (Cassandra/HBase)\n- Group service (membership management)\n- Presence service (online/offline)\n- Push notifications (offline users)\n\nMessage flow:\n  User A -> WS Server -> Queue ->\n  -> Recipient's WS server -> User B\n  -> Store for persistence + offline\n\nOrdering: message ID = timestamp + sequence.",
  },
  {
    topic: "Netflix / Video Streaming",
    front:
      "Design a video streaming platform\n(like Netflix/YouTube).\n\nWhat are the key design challenges?",
    back: "Upload pipeline:\n  Original -> transcoding (multiple\n  resolutions/codecs) -> CDN distribution\n\nStreaming:\n  Adaptive bitrate (HLS/DASH)\n  CDN edge servers close to users\n  Chunked delivery (2-10 sec segments)\n\nComponents:\n- Video storage (S3/blob) + CDN\n- Metadata service (titles, thumbnails)\n- Recommendation engine\n- User profile service\n- Search service\n- Analytics pipeline\n\nKey metric: startup time, rebuffer ratio.",
  },
  {
    topic: "Uber / Ride Sharing",
    front:
      "Design a ride-sharing service\n(like Uber/Lyft).\n\nWhat are the key technical challenges?",
    back: "Location service:\n  Geospatial index (Quadtree/Geohash)\n  Real-time driver location updates\n  Nearby driver search in O(log n)\n\nMatching service:\n  Match rider to nearest available driver\n  ETA estimation\n  Dispatch algorithm\n\nComponents:\n- Location service (Redis + geospatial)\n- Trip service (state machine)\n- Pricing service (surge pricing)\n- Payment service\n- Notification service\n- Map/routing service\n\nScale: millions of location updates/sec.",
  },
  {
    topic: "Google Search",
    front:
      "Design a web search engine at scale.\n\nWhat are the major components?",
    back: "1. Web Crawler\n   URL frontier, politeness, dedup\n\n2. Indexing Pipeline\n   Parse HTML -> extract text\n   Build inverted index:\n   word -> [doc1:pos, doc2:pos, ...]\n\n3. Query Processing\n   Tokenize query -> lookup index\n   Intersect posting lists\n   Rank by relevance (TF-IDF, PageRank)\n\n4. Serving Layer\n   Shard index across machines\n   Scatter-gather query pattern\n   Cache frequent queries\n\nScale: trillions of pages, billions queries/day.",
  },
  {
    topic: "Distributed Cache (Redis)",
    front:
      "Design a distributed cache system.\n\nWhat are the key design decisions?",
    back: "Cache strategies:\n  - Cache-aside (lazy loading)\n  - Write-through\n  - Write-behind (async write)\n  - Read-through\n\nDistribution:\n  - Consistent hashing for partitioning\n  - Replication for availability\n  - Gossip protocol for membership\n\nEviction policies:\n  LRU, LFU, TTL-based\n\nChallenges:\n  - Cache stampede (lock/probabilistic)\n  - Hot keys (local cache + L1/L2)\n  - Consistency (eventual vs strong)\n  - Cache warming on cold start",
  },
  {
    topic: "Caching Strategies",
    front:
      "How do cache-aside, read-through,\nwrite-through, and write-behind\nstrategies compare?",
    back: "Cache-aside:\n  App checks cache, then DB on miss.\n  Simple, most common.\n\nRead-through:\n  Cache layer fetches on miss itself.\n  Cleaner client code.\n\nWrite-through:\n  Write cache and DB together.\n  Better consistency, slower writes.\n\nWrite-behind:\n  Write cache first, flush DB later.\n  Fastest writes, more risk on failure.\n\nGood add-ons:\n- TTL and jitter\n- request coalescing\n- negative caching\n- L1 local + L2 distributed cache",
  },
  {
    topic: "Rate Limiter",
    front: "Design a distributed rate limiter.\n\nWhat algorithms can you use?",
    back: "Algorithms:\n1. Token Bucket\n   Tokens added at rate r, bucket size b\n   Request takes 1 token. Allows bursts.\n\n2. Leaky Bucket\n   Queue + fixed-rate processing.\n   Smooths traffic.\n\n3. Fixed Window Counter\n   Count per time window. Edge case:\n   burst at window boundary.\n\n4. Sliding Window Log\n   Sorted set of timestamps. Accurate\n   but memory-intensive.\n\n5. Sliding Window Counter\n   Weighted average of current + prev\n   window. Good balance.\n\nDistributed: Redis INCR with TTL or\nLua script for atomicity.",
  },
  {
    topic: "Notification System",
    front:
      "Design a notification system\n(push, email, SMS).\n\nWhat are the components?",
    back: "Components:\n- Notification service (API + routing)\n- User preferences store\n- Template engine\n- Message queues (per channel)\n- Channel workers:\n  - Push: APNS (iOS), FCM (Android)\n  - Email: SES, SendGrid\n  - SMS: Twilio\n- Delivery tracking + analytics\n- Rate limiting per user\n\nDesign decisions:\n- At-least-once delivery\n- Deduplication (idempotency keys)\n- Priority levels\n- Retry with exponential backoff\n- DLQ for failed deliveries",
  },
  {
    topic: "Key-Value Store",
    front:
      "Design a distributed key-value store\n(like DynamoDB/Cassandra).\n\nWhat are the core design elements?",
    back: "Partitioning:\n  Consistent hashing with virtual nodes\n\nReplication:\n  N replicas across different nodes\n  Quorum: W + R > N for consistency\n\nConsistency:\n  Eventual with vector clocks/CRDT\n  or strong with Paxos/Raft\n\nWrite path:\n  Write-ahead log -> memtable ->\n  SSTable flush -> compaction\n\nRead path:\n  Memtable -> bloom filter -> SSTables\n\nFailure: gossip protocol + hinted handoff\nAnti-entropy: Merkle trees",
  },
  {
    topic: "Message Queue (Kafka)",
    front:
      "Design a distributed message queue\n(like Kafka).\n\nWhat are the key design decisions?",
    back: "Architecture:\n  Topics -> Partitions -> Segments\n  Producers -> Brokers -> Consumers\n\nPartitioning:\n  By key hash for ordering guarantee\n  Within partition: strict ordering\n\nStorage:\n  Append-only log (sequential I/O)\n  Retention: time or size based\n  Zero-copy for fast reads\n\nConsumer groups:\n  Each partition -> one consumer\n  Offset tracking for progress\n\nReplication:\n  Leader + ISR (in-sync replicas)\n  Acks: 0 (fire-forget), 1, all\n\nScale: millions of messages/sec per topic.",
  },
  {
    topic: "Typeahead / Autocomplete",
    front:
      "Design a typeahead/autocomplete system.\n\nWhat data structure and architecture?",
    back: "Data structure: Trie (prefix tree)\n  Each node stores top-K suggestions\n  (precomputed, not computed at query time)\n\nQuery flow:\n  User types -> frontend debounce ->\n  API gateway -> Trie service ->\n  Return top suggestions\n\nUpdating rankings:\n  - Collect search analytics\n  - Batch job to rebuild trie\n  - Or streaming update with decay\n\nOptimizations:\n  - Cache common prefixes\n  - Shard trie by first 1-2 chars\n  - Local browser cache\n\nLatency target: < 100ms (P99).",
  },
  {
    topic: "Web Crawler",
    front:
      "Design a web crawler that can\ncrawl billions of pages.\n\nWhat are the key components?",
    back: "Components:\n1. URL Frontier (priority queue)\n   Politeness: per-host rate limit\n   Priority: PageRank, freshness\n\n2. Fetcher (HTTP client pool)\n   Respect robots.txt\n   DNS resolver cache\n\n3. Content Parser\n   Extract links, text, metadata\n   Detect duplicates (SimHash)\n\n4. URL Deduplication\n   Bloom filter for seen URLs\n\n5. Document Store\n   Store raw + parsed content\n\nScale strategies:\n  Multiple crawler instances\n  Partition URLs by domain hash\n  ~1000 pages/sec per machine",
  },
  {
    topic: "Consistent Hashing",
    front:
      "Explain Consistent Hashing.\n\nWhy is it important for distributed\nsystems design?",
    back: "Hash ring: nodes + keys mapped\nto same circular hash space.\n\nKey assigned to first node clockwise.\n\nAdding/removing a node:\n  Only K/N keys remapped (vs ALL keys\n  in traditional modular hashing).\n\nVirtual nodes:\n  Each physical node has multiple\n  positions for better distribution.\n\nUsed in:\n- Cassandra, DynamoDB partitioning\n- CDN request routing\n- Distributed caches\n- Load balancers\n\nAlternative: rendezvous (HRW) hashing.",
  },
  {
    topic: "CAP Theorem",
    front: "Explain the CAP Theorem.\n\nHow does it affect system design?",
    back: "In a network PARTITION, choose either:\n  Consistency (C) or Availability (A)\n\nC + A: possible only without partition\n  (single node / no network issues)\n\nC + P: reject requests during partition\n  (banking, inventory)\n  Examples: HBase, MongoDB (default)\n\nA + P: serve possibly stale data\n  (social media, DNS, caching)\n  Examples: Cassandra, DynamoDB\n\nPACELC extension:\n  If Partition: A vs C\n  Else (normal): Latency vs Consistency",
  },
  {
    topic: "Database Sharding",
    front: "Explain database sharding strategies.\n\nWhat are the tradeoffs?",
    back: "Strategies:\n1. Range-based: userId 1-1M, 1M-2M...\n   Pro: range queries. Con: hot shards.\n\n2. Hash-based: hash(key) % N\n   Pro: even distribution.\n   Con: resharding is expensive.\n\n3. Directory-based: lookup table\n   Pro: flexible. Con: single point of\n   failure for directory.\n\nChallenges:\n- Cross-shard queries (scatter-gather)\n- Transactions across shards\n- Rebalancing (consistent hashing)\n- Joins become application-level\n- Auto-increment IDs need coordination",
  },
  {
    topic: "CDN Design",
    front: "Design a Content Delivery Network.\n\nWhat are the key components?",
    back: "Architecture:\n  Origin -> Edge servers worldwide\n\nRequest flow:\n  DNS -> nearest edge (anycast/geo DNS)\n  Cache HIT: serve from edge\n  Cache MISS: fetch from origin,\n    cache at edge, serve\n\nCache strategies:\n  Pull (lazy): cache on first request\n  Push (eager): proactive distribution\n\nInvalidation:\n  TTL expiry, purge API, versioned URLs\n\nOptimizations:\n  - TLS termination at edge\n  - HTTP/2 multiplexing\n  - Image/video optimization\n  - Regional mid-tier caches\n\nProviders: CloudFront, Akamai, Cloudflare.",
  },
  {
    topic: "CDN Caching Strategy",
    front:
      "What decisions matter most when\ndesigning CDN caching and invalidation?",
    back: "Important levers:\n- Cache key: host + path + query + headers\n- TTL: long for static assets, short for HTML\n- Versioned asset URLs for safe rollout\n- Origin shielding / mid-tier caches\n- Compression and image resizing at edge\n\nInvalidation options:\n- Wait for TTL\n- Purge by URL or tag\n- Deploy immutable versioned assets\n\nPitfalls:\n- Personalized responses cached globally\n- Query-string explosion hurting hit rate\n- Cache poisoning from weak key design",
  },
  {
    topic: "Distributed ID Generator",
    front:
      "Design a globally unique ID generator\nfor a distributed system.\n\nWhat are the approaches?",
    back: "1. UUID v4 (128-bit random)\n   Pro: no coordination\n   Con: not sortable, 36 chars\n\n2. Snowflake ID (Twitter)\n   64-bit: timestamp + machine + sequence\n   Pro: sortable, compact\n   Con: clock sync needed\n\n3. ULID (Universally Unique Lexicographic)\n   128-bit: timestamp + random\n   Pro: sortable, URL-safe\n\n4. Database auto-increment with ranges\n   Each server gets ID block (1-1000...)\n   Pro: sequential. Con: coordination\n\n5. Sonyflake: similar to Snowflake\n   with machine ID from IP.",
  },
  {
    topic: "Load Balancer Design",
    front: "Design a load balancer.\n\nWhat are the main strategies?",
    back: "L4 (Transport layer):\n  TCP/UDP level. Fast, no content\n  inspection. IP + port routing.\n\nL7 (Application layer):\n  HTTP-aware. Content-based routing,\n  SSL termination, compression.\n\nAlgorithms:\n- Round Robin\n- Weighted Round Robin\n- Least Connections\n- Least Response Time\n- IP Hash (sticky sessions)\n- Consistent Hashing\n\nHealth checking:\n  Active (probe) + passive (error rate)\n\nHA: active-passive or active-active pair\nwith shared virtual IP (VRRP).",
  },
  {
    topic: "Gateway vs Load Balancer",
    front:
      "What is the difference between\nan API gateway, a reverse proxy,\nand a load balancer?",
    back: "Load balancer:\n  Distributes traffic across instances.\n  Focus: availability and throughput.\n\nReverse proxy:\n  Fronts backend servers, often adds\n  TLS termination, caching, routing.\n\nAPI gateway:\n  Edge entry point for APIs with:\n  auth, rate limiting, quotas, logging,\n  request shaping, versioning.\n\nIn practice:\n- Nginx/Envoy can act as all three\n- Gateway is policy-heavy\n- Load balancer is traffic-heavy\n- Reverse proxy is the flexible middle",
  },
  {
    topic: "MapReduce / Batch Processing",
    front: "Explain the MapReduce paradigm.\n\nGive a concrete example.",
    back: 'Three phases:\n1. MAP: (key, value) -> [(k2, v2)]\n   Transform each record independently\n\n2. SHUFFLE: group by key\n   Sort + distribute to reducers\n\n3. REDUCE: (k2, [v2...]) -> (k3, v3)\n   Aggregate per key\n\nExample - Word Count:\n  Map: "hello world" -> [(hello,1),(world,1)]\n  Shuffle: group by word\n  Reduce: (hello, [1,1,1]) -> (hello, 3)\n\nModern: Spark (in-memory DAG),\nFlink (streaming), Presto (SQL).',
  },
  {
    topic: "Event-Driven Architecture",
    front: "Describe Event-Driven Architecture.\n\nWhen should you use it?",
    back: "Producers emit events -> Event bus ->\nConsumers react independently.\n\nPatterns:\n1. Event Notification: something happened\n2. Event-Carried State Transfer:\n   event contains full state\n3. Event Sourcing: store events as\n   source of truth, derive state\n4. CQRS: separate read/write models\n\nBenefits:\n- Loose coupling\n- Independent scaling\n- Audit trail\n- Temporal decoupling\n\nChallenges:\n- Eventual consistency\n- Event ordering\n- Debugging distributed flows\n- Duplicate handling (idempotency)",
  },
  {
    topic: "Consensus: Raft Protocol",
    front:
      "Describe the Raft consensus protocol.\n\nWhat problem does it solve?",
    back: "Distributed consensus: getting multiple\nnodes to agree on a value.\n\nRoles: Leader, Follower, Candidate\n\nLeader election:\n  Timeout -> candidate -> request votes\n  Majority wins -> becomes leader\n\nLog replication:\n  Leader appends entry -> sends to all\n  -> majority acknowledge -> committed\n\nSafety: committed entries are durable\n  across leader changes.\n\nUsed in: etcd, CockroachDB, TiKV,\nConsul, RethinkDB.\n\nSimpler to understand than Paxos.",
  },
  {
    topic: "Microservices vs Monolith",
    front: "Compare Microservices vs Monolith.\n\nWhen should you choose each?",
    back: "Monolith:\n+ Simple deployment\n+ Easy debugging\n+ No network overhead\n+ Good for small teams\n- Scaling is all-or-nothing\n- Long build times at scale\n\nMicroservices:\n+ Independent deployment\n+ Independent scaling\n+ Technology diversity\n+ Team autonomy\n- Network complexity\n- Distributed transactions\n- Operational overhead\n- Service discovery needed\n\nStart monolith, extract services\nwhen team/scale demands it.",
  },
  {
    topic: "API Gateway Pattern",
    front: "What is an API Gateway?\n\nWhat responsibilities does it handle?",
    back: "Single entry point for all clients.\n\nResponsibilities:\n- Request routing to services\n- Authentication / authorization\n- Rate limiting\n- Load balancing\n- SSL termination\n- Response caching\n- Request/response transformation\n- Circuit breaker\n- API versioning\n- Analytics / logging\n\nExamples: Kong, AWS API Gateway,\nNginx, Envoy, Zuul\n\nBFF pattern: separate gateways\nfor web, mobile, 3rd-party.",
  },
];

export const SYSTEM_DESIGN: DeckInfo = {
  id: "system-design",
  title: "System Design",
  description:
    "System design topics across caching, gateways, CDNs, distributed data systems, messaging, consensus, and large-scale architecture patterns.",
  level: "staff-principal",
  category: "System Design",
  cards,
};
