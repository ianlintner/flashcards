import type { DeckInfo } from "./types";

export const SYSTEM_DESIGN_ESTIMATION: DeckInfo = {
  id: "system-design-estimation",
  title: "Back-of-Envelope Estimation",
  description:
    "QPS calculations, storage estimation, bandwidth, latency numbers, and capacity planning -- the first 5 minutes of every system design interview.",
  level: "advanced",
  category: "System Design",
  cards: [
    {
      topic: "Latency Numbers Every Dev Should Know",
      front:
        "What are the key latency numbers\nevery programmer should know?\n\n(Orders of magnitude)",
      back: "L1 cache:           ~1 ns\nL2 cache:           ~4 ns\nRAM access:        ~100 ns\nSSD random read:   ~16 us\nHDD random read:   ~2 ms (2000 us)\nSame datacenter RT: ~0.5 ms\nCA -> Netherlands:  ~150 ms\n\nKey insight:\nMemory is ~100x faster than SSD.\nSSD is ~100x faster than HDD.\nNetwork in DC ~500x slower than RAM.\n\nDesign around these: cache in memory,\nbatch disk I/O, minimize network hops.",
    },
    {
      topic: "Powers of Two - Storage",
      front:
        "What are the key powers of 2\nfor storage estimation?\n\n(Bytes to Petabytes)",
      back: "2^10  = 1 KB   (Thousand)\n2^20  = 1 MB   (Million)\n2^30  = 1 GB   (Billion)\n2^40  = 1 TB   (Trillion)\n2^50  = 1 PB   (Quadrillion)\n\nQuick conversions:\n1 ASCII char    = 1 byte\n1 int           = 4 bytes\n1 long/double   = 8 bytes\nUUID (string)   = 36 bytes\nAvg tweet       = ~300 bytes\nAvg web page    = ~2 MB\n1 min HD video  = ~150 MB",
    },
    {
      topic: "QPS Calculation Framework",
      front:
        "How do you estimate QPS\n(queries per second) in a\nsystem design interview?",
      back: "Formula:\nDAU x avg_requests_per_user / 86,400\n\nExample: Twitter-like service\n- 300M monthly active users\n- 50% are daily: 150M DAU\n- Avg 5 reads + 0.5 writes per day\n\nRead QPS:\n150M x 5 / 86,400 ~= 8,700 QPS\n\nWrite QPS:\n150M x 0.5 / 86,400 ~= 870 QPS\n\nPeak: 2-5x average.\nPeak read QPS: ~25,000-45,000\n\n86,400 seconds per day.\nRound to ~100K for easy math.",
    },
    {
      topic: "Storage Estimation Framework",
      front:
        "How do you estimate storage needs\nfor a system design problem?\n\nWalk through the framework.",
      back: "Framework:\n1. Estimate data per record\n2. Multiply by records per day\n3. Multiply by retention period\n\nExample: URL shortener\n- Record: short_url(7B) + long_url(100B)\n  + metadata(50B) = ~200 bytes\n- 100M new URLs per day\n- Retain 5 years = 1,825 days\n\nTotal: 200B x 100M x 1825\n= 200 x 10^8 x 1.8 x 10^3\n= 3.6 x 10^13 bytes\n= ~36 TB\n\nWith replication (3x): ~108 TB.",
    },
    {
      topic: "Bandwidth Estimation",
      front: "How do you estimate bandwidth\nrequirements?",
      back: "Formula:\nQPS x avg_response_size = bytes/sec\n\nExample: image sharing service\n- Upload: 100 QPS x 2 MB = 200 MB/s\n  = ~1.6 Gbps inbound\n\n- Download (10x reads vs writes):\n  1000 QPS x 2 MB = 2 GB/s\n  = ~16 Gbps outbound\n\nWith CDN: ~80% cache hit rate\nOrigin bandwidth: 16 x 0.2 = 3.2 Gbps\n\nConversions:\n1 Gbps = 125 MB/s\n1 MB/s = 8 Mbps\n\nAlways estimate peak (3-5x average).",
    },
    {
      topic: "Number of Servers Estimation",
      front: "How do you estimate the number\nof servers needed?",
      back: "Depends on bottleneck:\n\nCPU-bound (compute):\nservers = peak_QPS / QPS_per_server\nTypical web server: 500-1000 QPS\n\nMemory-bound (cache):\nservers = total_data / RAM_per_server\nTypical: 64-256 GB RAM per server\n\nI/O-bound (database):\nservers = IOPS_needed / IOPS_per_disk\nSSD: ~50K-100K IOPS\nHDD: ~100-200 IOPS\n\nExample: 50K QPS, 500 QPS/server\n= 100 app servers.\n\nAlways add 20-30% headroom.",
    },
    {
      topic: "Estimation: Chat System",
      front:
        "Estimate capacity for a chat system\nwith 100M DAU.\n\nQPS, storage, bandwidth?",
      back: "Assumptions:\n- 100M DAU, avg 40 messages/day\n- Avg message: 100 bytes\n\nMessage QPS:\n100M x 40 / 86400 ~= 46K QPS\nPeak: ~140K QPS\n\nStorage per day:\n100M x 40 x 100B = 400 GB/day\nPer year: 400 x 365 = ~146 TB/year\nWith metadata + indexes: ~200 TB/year\n\nBandwidth:\n46K x 100B = 4.6 MB/s average\nPeak: ~15 MB/s (modest -- messages\nare small; media is separate)\n\nMedia (images/videos) would 10-100x\nthe bandwidth and storage.",
    },
    {
      topic: "Estimation: Social Media Feed",
      front:
        "Estimate capacity for a social\nmedia news feed (500M DAU).\n\nFocus on read QPS and fanout.",
      back: "Assumptions:\n- 500M DAU, avg 10 feed loads/day\n- 50 posts per feed page\n- Avg user follows 200 people\n\nFeed read QPS:\n500M x 10 / 86400 ~= 58K QPS\nPeak: ~175K QPS\n\nFanout on write (push model):\n- 1M posts/hour x 200 followers each\n= 200M writes/hour to feed cache\n= ~55K writes/sec to feed store\n\nFanout on read (pull model):\n- Each feed load queries 200 followees\n- 58K x 200 = 11.6M DB reads/sec\n  -> Need heavy caching!\n\nHybrid: push for normal users,\npull for celebrities (> 1M followers).",
    },
    {
      topic: "Estimation: URL Shortener",
      front:
        "Estimate QPS and cache size for\na URL shortener with 300M URLs/month.",
      back: "Write QPS:\n300M / (30 x 86400) ~= 116 QPS\nPeak write: ~350 QPS\n\nRead:write ratio ~= 100:1\nRead QPS: 116 x 100 = 11,600 QPS\nPeak read: ~35,000 QPS\n\nStorage (5 years):\n300M x 12 x 5 = 18B records\n18B x 200B = ~3.6 TB\n\nCache (80/20 rule):\n20% of URLs get 80% of traffic.\nDaily requests: 11,600 x 86400 ~ 1B\nCache 20% of daily URLs:\n1B x 0.2 x 200B = ~40 GB\n-> Fits in a single Redis node.\n\nRead path is dominated by cache hits.",
    },
    {
      topic: "Estimation: Video Streaming",
      front:
        "Estimate storage and bandwidth for\na video streaming platform\n(10M videos uploaded/month).",
      back: "Assumptions:\n- 10M videos/month, avg 5 min each\n- Avg video: 500 MB (compressed)\n- 3 quality levels: 250MB + 500MB + 1GB\n\nStorage per month:\n10M x 1.75 GB = 17.5 PB/month\nPer year: ~210 PB (need CDN + tiering)\n\nStreaming bandwidth:\n- 100M DAU, avg 30 min/day\n- 30 min at 5 Mbps = ~1.1 GB per user\n- Peak concurrent: ~10M viewers\n- 10M x 5 Mbps = 50 Tbps peak\n\nCDN absorbs ~95% -> origin: 2.5 Tbps\n\nKey: CDN is essential at this scale.\nStorage tiering: hot SSD, warm HDD,\ncold glacier/archive.",
    },
    {
      topic: "Database Choice by Scale",
      front:
        "At what scale thresholds should\nyou consider different database\nsolutions?",
      back: "Single PostgreSQL:\n  < 1TB data, < 5K QPS\n  Good for most startups.\n\nRead replicas:\n  5K-50K read QPS\n  Single writer + N readers.\n\nSharded SQL:\n  > 1TB data, > 50K QPS\n  Complex, needs shard key design.\n\nNoSQL (Cassandra, DynamoDB):\n  > 100K QPS, write-heavy.\n  Eventual consistency OK.\n\nRedis / Memcached:\n  Cache layer: > 100K QPS reads.\n  < 100GB working set.\n\nThresholds are approximate.\nStart simple, scale when needed.",
    },
    {
      topic: "Replication Factor Estimation",
      front: "How does replication affect storage\nand cost estimates?",
      back: "Common replication factors:\n- Database: 3x (leader + 2 replicas)\n- Object storage: 3x or erasure coding\n  (1.5x with ~same durability)\n- Cache: 2x (primary + backup)\n- Across regions: multiply by # regions\n\nExample: 100 TB raw data\n- 3x replication: 300 TB\n- 2 regions: 600 TB\n- With backups (30 days): +100 TB\nTotal: ~700 TB\n\nCost at $0.023/GB/month (S3):\n700 TB x $23/TB = ~$16,100/month\n\nAlways state assumptions explicitly.",
    },
    {
      topic: "80/20 Rule for Caching",
      front:
        "What is the 80/20 rule for caching?\n\nHow do you estimate cache size?",
      back: "80/20 rule: 20% of data accounts\nfor 80% of requests (Pareto).\n\nCache sizing strategy:\n1. Estimate daily unique requests.\n2. Cache the top 20% of items.\n3. cache_size = 0.2 x daily_unique\n   x avg_item_size.\n\nExample: e-commerce product pages\n- 10M unique products viewed/day\n- Avg product data: 5 KB\n- Cache 20%: 2M x 5 KB = 10 GB\n\nWith TTL and eviction (LRU),\nactual memory needed may be less.\n\n10 GB easily fits one Redis node.",
    },
    {
      topic: "Estimation Quick Reference",
      front: "What are the key numbers to\nmemorize for estimation questions?",
      back: "Time:\n86,400 sec/day (~10^5)\n2.6M sec/month (~2.5 x 10^6)\n31.5M sec/year (~3 x 10^7)\n\nScale:\n1M = 10^6\n1B = 10^9\n\nData sizes:\n1 char = 1B, UUID = 36B\nSmall JSON = 500B, image = 300KB\n1 min video = 150MB\n\nSystem capacity:\nWeb server: 500-1K QPS\nDB server: 5K-10K QPS\nRedis: 100K+ QPS\nSingle Kafka broker: 100K msgs/sec\nNginx: 10K-100K concurrent conns\n\nRound aggressively. Precision < 2x\nis fine.",
    },
    {
      topic: "Common Estimation Mistakes",
      front: "What are the most common mistakes\nin estimation questions?",
      back: "1. Not stating assumptions.\n   ALWAYS say 'I'll assume X DAU'\n   before calculating. Interviewer will\n   correct if needed.\n\n2. Confusing bits and bytes.\n   1 Byte = 8 bits.\n   Network speeds in bits (Gbps).\n   Storage in bytes (GB).\n\n3. Forgetting peak vs average.\n   Peak usually 2-5x average.\n\n4. Ignoring metadata / indexes.\n   DB storage = raw data x 2-3x.\n\n5. Not considering replication.\n   3x is standard.\n\n6. Over-precision: saying '8,743 QPS'\n   Just say '~9K QPS' or '~10K QPS'.",
    },
    {
      topic: "Estimation: Payment System",
      front:
        "Estimate capacity for a payment\nprocessing system handling 1B\ntransactions per month.",
      back: "Write QPS:\n1B / 2.6M sec = ~385 QPS avg\nPeak (holiday): 10x = ~3,850 QPS\n\nTransaction size: ~500 bytes\n(amount, merchant, card, timestamps,\nstatus, metadata)\n\nStorage per month:\n1B x 500B = 500 GB/month\nWith audit logs + indexes: ~2 TB/month\nPer year: ~24 TB\n\nLatency requirement: < 500ms P99\n(payment must feel instant)\n\nAvailability: 99.999% (five 9s)\nDowntime budget: ~5 min/year\n\nKey: ACID compliance is non-negotiable\nfor financial transactions.",
    },
    {
      topic: "Estimation: Search Engine",
      front:
        "Estimate crawling and indexing needs\nfor a web search engine indexing\n5 billion web pages.",
      back: "Crawling:\n- 5B pages, re-crawl monthly\n- 5B / 2.6M sec = ~1,900 pages/sec\n- Avg page: 500 KB\n- Bandwidth: 1900 x 500KB = ~950 MB/s\n  = ~7.6 Gbps\n\nStorage (raw pages):\n5B x 500KB = 2.5 PB raw HTML\nCompressed (~5x): ~500 TB\n\nInverted index:\n- Avg 500 unique words per page\n- Index entry: 50B per posting\n- 5B x 500 x 50B = 125 TB index\n\nQuery QPS:\n- 100K QPS avg, 300K peak\n- Each query: search index + rank\n  -> needs heavy parallelism\n  -> shard index across 1000s of nodes\n\nKey: partition by document, not by term.",
    },
    {
      topic: "Estimation Presentation Tips",
      front:
        "How should you present your\nestimation in the interview?\n\nWhat format impresses interviewers?",
      back: "1. Write on whiteboard/shared doc:\n   List assumptions clearly first.\n\n2. Round numbers aggressively:\n   'Let's say 100M DAU, each makes\n   10 requests per day.'\n\n3. Show your work step by step:\n   '100M x 10 / 100K = 10K QPS'\n   (86,400 ~= 100K for easy math)\n\n4. Derive multiple dimensions:\n   QPS, storage, bandwidth, servers.\n\n5. State what drives the design:\n   'This is read-heavy at 100:1,\n   so we need caching.'\n\n6. Sanity check: does the number\n   feel reasonable? Compare to known\n   systems.",
    },
  ],
};
