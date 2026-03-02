import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "URL Shortener",
    front:
      "Design a URL shortener\n(like bit.ly).\n\nHandle 100M new URLs/day.",
    back: "Requirements:\n  Shorten URL: long -> short (7 chars).\n  Redirect: short -> long (301/302).\n  100M writes/day ~ 1200 writes/sec.\n  Read-heavy: 10:1 ratio ~ 12K reads/sec.\n\nShort URL generation:\n  Base62: [a-zA-Z0-9] = 62 chars.\n  7 chars = 62^7 ~ 3.5 trillion URLs.\n\n  Approach 1: Counter + Base62 encode.\n    Auto-increment ID -> base62.\n    Sequential, predictable.\n    Use distributed ID generator (Snowflake).\n\n  Approach 2: Hash + truncate.\n    MD5(long_url)[:7] base62.\n    Collision handling: append + rehash.\n\n  Approach 3: Pre-generated key service.\n    Generate keys offline in batch.\n    Mark as used when consumed.\n    No collision at write time.\n\nStorage:\n  Key-value store: short -> long URL.\n  ~500 bytes per entry.\n  5 years: 100M * 365 * 5 = 182B entries.\n  ~ 91 TB storage.\n  Cache: Redis for hot URLs (80/20 rule).\n\nRedirect:\n  301: Permanent (browser caches).\n    Less server load, less analytics.\n  302: Temporary.\n    Every request hits server (analytics).\n\nScaling:\n  Read replicas for DB.\n  CDN for popular redirects.\n  Consistent hashing for cache nodes.\n  Analytics: Async pipeline (Kafka).",
  },
  {
    topic: "Rate Limiter",
    front: "Design a distributed rate limiter.\n\nHandle 1M+ requests/sec.",
    back: "Algorithms:\n\n  Token Bucket:\n    Bucket holds N tokens.\n    Refills at rate R tokens/sec.\n    Request takes 1 token. Rejected if empty.\n    Allows bursts up to N.\n    Simple, widely used (AWS, Stripe).\n\n  Sliding Window Log:\n    Store timestamp of each request.\n    Count requests in window [now - W, now].\n    Accurate but memory-intensive.\n\n  Sliding Window Counter:\n    Combine fixed window + weight.\n    current_count = prev_window * overlap%\n      + current_window_count.\n    Low memory, approximate.\n\n  Leaky Bucket:\n    Fixed-rate output queue.\n    Smooths traffic. No bursts.\n\nDistributed rate limiting:\n  Challenge: Multiple servers, shared state.\n\n  Redis approach:\n    INCR key (counter per user/IP).\n    EXPIRE key TTL.\n    Lua script for atomic check-and-increment.\n    ~100K ops/sec per Redis node.\n\n  Local + global:\n    Local rate limiter per server.\n    Sync to central store periodically.\n    Slightly over-limit but fast.\n\nHTTP headers:\n  X-RateLimit-Limit: 100\n  X-RateLimit-Remaining: 42\n  X-RateLimit-Reset: 1672531200\n  429 Too Many Requests.\n  Retry-After header.\n\nRate limit by: IP, user, API key, endpoint.\nGraceful degradation: Queue vs reject.",
  },
  {
    topic: "Chat System",
    front:
      "Design a real-time chat system\n(like WhatsApp/Slack).\n\nSupport 10M concurrent users.",
    back: "Core features:\n  1:1 messaging.\n  Group chat (up to 500 members).\n  Online/offline status.\n  Read receipts.\n  Message history.\n\nReal-time delivery:\n  WebSocket: Persistent connection.\n  Each user connects to a chat server.\n  Connection manager: user -> server mapping.\n\n  Online: Push via WebSocket.\n  Offline: Push notification (APNs/FCM)\n    + store for later retrieval.\n\nMessage flow:\n  1. User A sends message via WebSocket.\n  2. Chat server looks up User B's server.\n  3. If online: Forward via internal RPC.\n  4. If offline: Store + push notification.\n  5. User B connects: Pull unread messages.\n\nStorage:\n  Messages: message_id, chat_id, sender,\n    content, timestamp, status.\n  Partitioned by chat_id.\n  Cassandra / HBase: Write-optimized.\n  Recent messages: Redis (last 50 per chat).\n\nGroup chat:\n  Fan-out on write (small groups):\n    Write to each member's inbox.\n  Fan-out on read (large groups):\n    Single write, read on demand.\n  Threshold: ~100 members.\n\nPresence system:\n  Heartbeat every 30s.\n  Status stored in Redis.\n  Last seen timestamp.\n  Subscribe to friend's status changes.\n\nScaling:\n  Stateful WebSocket servers (sticky).\n  Service discovery: Which server has user?\n  Consistent hashing for chat partitions.\n  CDN for media (images, files).\n  End-to-end encryption: Signal Protocol.",
  },
  {
    topic: "News Feed",
    front:
      "Design a social media news feed\n(like Twitter/Facebook).\n\nHandle 500M users.",
    back: "Two approaches:\n\nFan-out on write (push):\n  User posts -> Write to all followers'\n  feeds immediately.\n  User feed = pre-computed list.\n  Read: Simple lookup of user's feed.\n  Good for: Users with few followers.\n  Bad for: Celebrities (1M+ followers).\n  Storage: Redis sorted set per user.\n    ZADD feed:{userId} timestamp postId.\n\nFan-out on read (pull):\n  User opens feed -> Fetch posts from\n  all followed users, merge, sort.\n  Write: Simple (one write).\n  Read: Expensive (N queries + merge).\n  Good for: High-follower users.\n\nHybrid approach (Twitter):\n  Regular users: Fan-out on write.\n  Celebrities (>10K followers):\n    Fan-out on read (fetched at read time).\n  Merge both at read time.\n\nFeed ranking:\n  Chronological: Simple, real-time.\n  Algorithmic: ML model scores posts.\n    Features: Engagement, recency,\n    relationship, content type.\n  Re-rank in real-time with new signals.\n\nStorage:\n  Posts: SQL or document store.\n  Feed cache: Redis sorted sets.\n  Social graph: Graph DB or adjacency list.\n  Media: Object storage (S3) + CDN.\n\nScaling:\n  Read replicas for feed queries.\n  Async fan-out via message queue.\n  Cache warming for active users.\n  Pagination: Cursor-based (not offset).\n  Sharding: By user_id.",
  },
  {
    topic: "Distributed Cache",
    front:
      "Design a distributed cache\n(like Redis/Memcached).\n\nSupport 1M ops/sec, <1ms latency.",
    back: "Architecture:\n  Multiple cache nodes (cluster).\n  Client -> Hash(key) -> Node.\n\nPartitioning:\n  Consistent hashing:\n    Nodes on a hash ring.\n    Key -> closest clockwise node.\n    Add/remove node: Only ~1/N keys move.\n    Virtual nodes: Even distribution.\n\nEviction policies:\n  LRU: Least Recently Used (most common).\n    Doubly-linked list + hash map.\n    O(1) get, put, evict.\n  LFU: Least Frequently Used.\n    Frequency counter. Access-biased.\n  TTL: Time-based expiration.\n    Lazy: Check on access.\n    Active: Background scanner.\n\nCache patterns:\n  Cache-aside (lazy loading):\n    Read: Check cache. Miss? Read DB, write cache.\n    Write: Update DB, invalidate cache.\n\n  Write-through:\n    Write: Update cache AND DB together.\n    Consistent but slower writes.\n\n  Write-behind (write-back):\n    Write: Update cache, async DB write.\n    Fast but risk of data loss.\n\nConsistency:\n  Cache invalidation: 'Two hard problems\n    in CS: Cache invalidation and naming.'\n  Stale reads: TTL limits staleness.\n  Thundering herd: Locking on cache miss.\n  Dogpile: Recompute in background\n    before TTL expires.\n\nReplication:\n  Primary-replica for read scaling.\n  Async replication (eventual consistency).\n\nMonitoring:\n  Hit rate (target: >95%).\n  Latency percentiles (p99).\n  Memory usage, eviction rate.",
  },
  {
    topic: "Search Autocomplete",
    front:
      "Design a search autocomplete\nsystem (like Google Suggest).\n\nReturn top 10 suggestions in <100ms.",
    back: "Data structure: Trie (prefix tree).\n  Each node: character + children.\n  Store frequency/score at leaf nodes.\n  Prefix 'app' -> 'apple', 'application'.\n\nOptimized trie:\n  Each node caches top-K results.\n  Lookup: Traverse to prefix node,\n    return cached top-K. O(prefix length).\n  Update: Propagate frequency changes up.\n\nData collection:\n  Log all search queries + timestamp.\n  Aggregate: query -> count per time window.\n  Decay old queries (exponential decay).\n  Filter: Remove offensive, private queries.\n\nServing:\n  Trie too large for single server.\n  Partition by prefix:\n    Server 1: a-f, Server 2: g-m, etc.\n  Or consistent hashing on prefix.\n\n  Client-side:\n    Debounce: Wait 100-300ms after typing.\n    Cache previous results locally.\n    'app' results valid for 'appl' prefix.\n    Send request only if cache miss.\n\nFreshness:\n  Real-time: Analytics pipeline (Kafka).\n    Trending queries update within minutes.\n  Batch: Rebuild trie from aggregated\n    logs periodically (hourly/daily).\n  Hybrid: Base trie + real-time overlay.\n\nStorage:\n  Trie in memory (fast).\n  Snapshot to disk periodically.\n  Query logs: Append-only (Kafka -> HDFS).\n  Personalization: Per-user recent queries\n    stored in separate cache.",
  },
  {
    topic: "Notification System",
    front:
      "Design a notification system\nthat handles push, email,\nand SMS at scale.",
    back: "Notification types:\n  Push: Mobile (APNs, FCM), Web (Web Push).\n  Email: SMTP, SES, SendGrid.\n  SMS: Twilio, SNS.\n  In-app: WebSocket / polling.\n\nArchitecture:\n  Event producers -> Message queue -> \n  Notification service -> Delivery providers.\n\n  Producers: User actions, system events,\n    scheduled jobs, third-party webhooks.\n\n  Message queue (Kafka/SQS):\n    Decouple producers from delivery.\n    Buffer traffic spikes.\n    Retry failed deliveries.\n    Priority queues (urgent vs bulk).\n\n  Notification service:\n    Template rendering.\n    User preference check (opt-in/out).\n    Rate limiting per user.\n    Deduplication (idempotency key).\n    Channel routing (which channel?).\n\nDelivery:\n  Each channel has a worker pool.\n  Push: Batch API calls to APNs/FCM.\n  Email: Rate-limited SMTP connection pool.\n  SMS: Per-provider rate limits.\n\nReliability:\n  At-least-once delivery.\n  Idempotent processing.\n  DLQ for failed notifications.\n  Retry with exponential backoff.\n  Circuit breaker for provider outages.\n\nUser preferences:\n  Per-channel opt-in/out.\n  Quiet hours (no push 10pm-8am).\n  Frequency caps (max 5 emails/day).\n  Unsubscribe per notification type.\n\nTracking:\n  Delivery status per notification.\n  Open/click tracking (email).\n  Analytics dashboard.\n  A/B testing for templates.",
  },
  {
    topic: "Capacity Estimation",
    front:
      "How do you perform back-of-the-\nenvelope capacity estimation\nfor system design?",
    back: "Key numbers to memorize:\n\n  Storage:\n    1 char = 1 byte (ASCII).\n    Average tweet/post: ~300 bytes.\n    Image (compressed): ~300 KB.\n    Video (1 min, compressed): ~50 MB.\n    1 Million = 10^6, 1 Billion = 10^9.\n\n  Time:\n    1 day ~ 100K seconds (86,400).\n    1 month ~ 2.5M seconds.\n    1 year ~ 30M seconds.\n\n  Throughput:\n    HDD: ~100 MB/s sequential.\n    SSD: ~500 MB/s (NVMe: 3+ GB/s).\n    Network: 1 Gbps ~ 125 MB/s.\n    Memory: ~10 GB/s.\n\n  Latency:\n    Memory access: 100 ns.\n    SSD read: 100 us.\n    HDD seek: 10 ms.\n    Same datacenter round trip: 500 us.\n    US cross-country: 30-50 ms.\n    Intercontinental: 100-200 ms.\n\nEstimation framework:\n  1. Identify read/write ratio.\n  2. Calculate QPS:\n     DAU * actions/user / 86400.\n  3. Storage per unit * units/year.\n  4. Bandwidth = QPS * object size.\n  5. Cache: 80/20 rule. Cache top 20%.\n\nExample: 100M DAU social media.\n  Posts: 100M * 2 posts/day / 86400\n    ~ 2300 writes/sec.\n  Reads: 10x ~ 23000 reads/sec.\n  Storage/year: 100M * 2 * 365 * 300B\n    ~ 22 TB / year.\n  Cache: 20% of daily reads in memory.",
  },
];

export const SYSTEM_DESIGN_CASES: DeckInfo = {
  id: "system-design-cases",
  title: "System Design Case Studies",
  description:
    "URL shortener, rate limiter, chat system, news feed, distributed cache, autocomplete, notifications, and capacity estimation.",
  category: "System Design",
  level: "advanced",
  cards,
  tags: [
    "system design",
    "case studies",
    "scalability",
    "architecture",
    "estimation",
  ],
  estimatedMinutes: 12,
};
