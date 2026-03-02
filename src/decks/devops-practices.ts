import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Git Branching Strategies",
    front: "Compare Git Flow, GitHub Flow,\nand Trunk-Based Development.",
    back: "Git Flow:\n  Branches: main, develop, feature/*,\n  release/*, hotfix/*.\n  + Structured for releases.\n  - Complex for fast-moving teams.\n  Use: Scheduled release cycles.\n\nGitHub Flow:\n  main + feature branches.\n  PR -> review -> merge to main.\n  Deploy from main.\n  + Simple, fast.\n  Use: Continuous deployment.\n\nTrunk-Based Development:\n  Everyone commits to main/trunk.\n  Feature flags for incomplete work.\n  Short-lived branches (< 1 day).\n  + Fastest integration.\n  + Smallest merge conflicts.\n  Use: Mature CI/CD, experienced teams.\n\nTrend: Trunk-based with feature flags\nis becoming the industry standard.",
  },
  {
    topic: "Linux Commands",
    front: "What are 10 essential Linux\ncommands for DevOps?",
    back: "File operations:\n  ls -la    List files with details\n  find /path -name '*.log'  Search\n  grep -r 'pattern' /dir   Text search\n\nProcess management:\n  ps aux    List all processes\n  top/htop  Real-time monitoring\n  kill -9 PID  Force kill\n\nNetworking:\n  curl -v URL   HTTP requests\n  netstat -tlnp  Open ports\n  ss -tlnp       Socket stats (modern)\n  dig domain     DNS lookup\n\nSystem info:\n  df -h     Disk usage\n  free -m   Memory usage\n  uptime    System load\n\nText processing:\n  awk '{print $1}' file  Column extract\n  sed 's/old/new/g' file  Find/replace\n  tail -f /var/log/app.log  Stream logs",
  },
  {
    topic: "Networking for DevOps",
    front: "Explain DNS resolution and\ncommon record types.",
    back: "DNS Resolution:\n  Browser -> Local cache\n  -> OS resolver cache\n  -> Recursive resolver (ISP/8.8.8.8)\n  -> Root nameserver (.)\n  -> TLD nameserver (.com)\n  -> Authoritative nameserver\n  -> IP address returned\n\nRecord types:\n  A:     Name -> IPv4 address.\n  AAAA:  Name -> IPv6 address.\n  CNAME: Name -> another name (alias).\n  MX:    Mail server for domain.\n  TXT:   Arbitrary text (SPF, DKIM).\n  NS:    Authoritative nameservers.\n  SOA:   Zone authority info.\n  SRV:   Service locator (port + host).\n\nTTL: Time to live (caching duration).\n  Short TTL: Quick changes, more queries.\n  Long TTL: Better performance, slow changes.",
  },
  {
    topic: "Load Balancing",
    front:
      "What are the types of load balancers?\n\nWhat algorithms do they use?",
    back: "Types (by OSI layer):\n  L4 (Transport): TCP/UDP level.\n  Fast, no content inspection.\n  AWS: NLB. Example: Database proxying.\n\n  L7 (Application): HTTP level.\n  Content-based routing (path, header).\n  AWS: ALB. Example: Microservices routing.\n\nAlgorithms:\n1. Round Robin: Rotate through servers.\n   Simple, equal distribution.\n\n2. Least Connections: Send to server\n   with fewest active connections.\n\n3. Weighted: Assign weights by capacity.\n   More powerful servers get more traffic.\n\n4. IP Hash: Same client -> same server.\n   Session affinity (sticky sessions).\n\n5. Random: Choose random server.\n   Simple, surprisingly effective.\n\nHealth checks: Remove unhealthy servers.\n  HTTP 200 on /health endpoint.",
  },
  {
    topic: "Caching Strategies",
    front: "Compare cache-aside, write-through,\nand write-behind patterns.",
    back: "Cache-Aside (Lazy Loading):\n  App checks cache first.\n  Miss -> read DB, write to cache.\n  + Only requested data cached.\n  - Cache miss = extra latency.\n  - Stale data possible.\n\nWrite-Through:\n  Write to cache AND DB together.\n  + Cache always consistent.\n  - Write latency (both writes).\n  - Unnecessary caching of all writes.\n\nWrite-Behind (Write-Back):\n  Write to cache, async write to DB.\n  + Fast writes.\n  - Risk of data loss if cache fails.\n  - Complexity of async queue.\n\nRead-Through:\n  Cache handles DB reads (transparent).\n  + Simpler app code.\n\nEviction policies:\n  LRU (most common), LFU, TTL.\n\nTools: Redis, Memcached, Varnish.",
  },
  {
    topic: "Logging Best Practices",
    front: "What are logging best practices\nfor production systems?",
    back: "Format: Structured JSON logs.\n  {\n    timestamp, level, message,\n    service, traceId, userId,\n    error: { message, stack }\n  }\n\nLevels:\n  ERROR: Failures needing attention.\n  WARN: Unexpected but handled.\n  INFO: Business events, state changes.\n  DEBUG: Diagnostic (not in prod).\n\nBest practices:\n1. Correlation IDs across services.\n2. Don't log PII/secrets.\n3. Log at boundaries (in/out of service).\n4. Include context (user, request ID).\n5. Rate-limit high-volume logs.\n6. Central aggregation (ELK, Loki).\n7. Retention policies (30/90/365 days).\n8. Alerts on error rate spikes.\n\nAnti-patterns:\n- console.log in production.\n- Logging every request body.\n- Unstructured string messages.",
  },
];

export const DEVOPS_PRACTICES: DeckInfo = {
  id: "devops-practices",
  title: "DevOps & SRE Practices",
  description:
    "DevOps tooling: Git strategies, Linux essentials, DNS, load balancing, caching, and logging best practices.",
  category: "DevOps",
  level: "foundation",
  cards,
  tags: ["DevOps", "Git", "Linux", "DNS", "load balancing", "caching"],
  estimatedMinutes: 10,
};
