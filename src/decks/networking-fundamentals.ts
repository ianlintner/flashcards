import type { DeckInfo } from "./types";

export const NETWORKING_FUNDAMENTALS: DeckInfo = {
  id: "networking-fundamentals",
  title: "Networking Fundamentals",
  description:
    "TCP/UDP, HTTP, DNS, TLS, REST vs gRPC vs GraphQL, WebSockets, and the OSI model -- frequently tested in system design and senior SWE interviews.",
  level: "intermediate",
  category: "Systems Fundamentals",
  cards: [
    {
      topic: "OSI Model Overview",
      front:
        "Name the 7 layers of the OSI model.\n\nWhich layers matter most for\nSWE interviews?",
      back: "7. Application  (HTTP, DNS, SMTP)\n6. Presentation (TLS, compression)\n5. Session      (session management)\n4. Transport    (TCP, UDP)\n3. Network      (IP, routing)\n2. Data Link    (Ethernet, MAC)\n1. Physical     (cables, signals)\n\nInterview focus:\nLayer 7: HTTP, DNS, WebSocket\nLayer 4: TCP vs UDP\nLayer 3: IP, routing, subnets\n\nMnemonic: All People Seem To\nNeed Data Processing",
    },
    {
      topic: "TCP vs UDP",
      front: "Compare TCP and UDP.\n\nWhen would you use each?",
      back: "TCP:\n- Connection-oriented (3-way handshake)\n- Reliable: ordered, retransmits lost\n- Flow + congestion control\n- Higher latency\nUse: HTTP, file transfer, email, DB\n\nUDP:\n- Connectionless, fire-and-forget\n- Unreliable: no order, no retransmit\n- Low latency, low overhead\nUse: video streaming, gaming, DNS,\nVoIP, live broadcast\n\nKey: TCP = reliability > speed.\nUDP = speed > reliability.",
    },
    {
      topic: "TCP Three-Way Handshake",
      front:
        "Describe the TCP three-way handshake.\n\nWhy are three steps needed?",
      back: "1. Client -> SYN -> Server\n   'I want to connect. My seq = X.'\n\n2. Server -> SYN-ACK -> Client\n   'OK. My seq = Y. I ack your X+1.'\n\n3. Client -> ACK -> Server\n   'I ack your Y+1. Connection open.'\n\nWhy 3 steps?\n- Both sides confirm they can send\n  AND receive.\n- Establishes initial sequence numbers\n  for reliability.\n- 2 steps: server can't confirm client\n  received SYN-ACK (half-open risk).",
    },
    {
      topic: "HTTP/1.1 vs HTTP/2 vs HTTP/3",
      front:
        "Compare HTTP/1.1, HTTP/2, and HTTP/3.\n\nWhat problem does each version solve?",
      back: "HTTP/1.1:\n- Text-based, one request per connection\n  (or pipelining, rarely used)\n- Head-of-line blocking\n\nHTTP/2:\n- Binary framing, multiplexing\n  (many requests on ONE TCP connection)\n- Header compression (HPACK)\n- Server push\n- Still TCP: TCP-level HOL blocking\n\nHTTP/3:\n- Built on QUIC (over UDP)\n- No TCP HOL blocking\n- Faster connection setup (0-RTT)\n- Built-in encryption\n\nHTTP/2 = solve app-level HOL.\nHTTP/3 = solve transport-level HOL.",
    },
    {
      topic: "DNS Resolution",
      front:
        "Describe the DNS resolution process.\n\nWhat happens when you type\na URL in a browser?",
      back: "1. Browser cache (local)\n2. OS cache (/etc/hosts)\n3. Recursive resolver (ISP)\n4. Root nameserver -> TLD info\n5. TLD nameserver (.com) -> authoritative\n6. Authoritative nameserver -> IP address\n\nRecord types:\nA: domain -> IPv4 (93.184.216.34)\nAAAA: domain -> IPv6\nCNAME: alias -> canonical name\nMX: mail server\nTXT: verification, SPF, DKIM\nNS: nameserver delegation\n\nTTL: how long to cache the response.\nLow TTL = faster failover, more queries.",
    },
    {
      topic: "TLS Handshake",
      front:
        "Describe the TLS 1.3 handshake.\n\nHow does it establish encryption?",
      back: "TLS 1.3 (1-RTT):\n1. ClientHello: supported ciphers +\n   key share (Diffie-Hellman params)\n\n2. ServerHello: chosen cipher +\n   key share + certificate + verify\n\n3. Client: verify cert, derive keys.\n   Send Finished message.\n\nResult: symmetric encryption key\nderived from DH key exchange.\n\nTLS 1.3 improvements over 1.2:\n- 1-RTT (was 2-RTT)\n- 0-RTT resumption (cached sessions)\n- Removed weak ciphers (RC4, 3DES)\n- Forward secrecy mandatory",
    },
    {
      topic: "REST API",
      front: "What is REST?\n\nWhat are the key constraints\nof a RESTful API?",
      back: "REST: Representational State Transfer.\n\n6 constraints:\n1. Client-Server: separation of concerns\n2. Stateless: no session on server,\n   each request is self-contained\n3. Cacheable: responses say if cacheable\n4. Uniform Interface:\n   - Resource-based URLs (/users/123)\n   - Standard HTTP methods\n   - HATEOAS (hypermedia links)\n5. Layered System: load balancers, CDN\n6. Code-on-Demand (optional)\n\nHTTP methods:\nGET (read), POST (create),\nPUT (replace), PATCH (partial update),\nDELETE (remove).",
    },
    {
      topic: "REST vs gRPC",
      front: "Compare REST and gRPC.\n\nWhen would you choose gRPC?",
      back: "REST:\n- Text/JSON, human-readable\n- HTTP/1.1+ (usually)\n- Broadly supported (browsers, mobile)\n- Larger payloads\n- Ideal for public APIs\n\ngRPC:\n- Protocol Buffers (binary, compact)\n- HTTP/2 mandatory (multiplexing)\n- Strong typing via .proto files\n- Bidirectional streaming\n- 2-10x faster serialization\n- Ideal for internal microservices\n\nChoose gRPC for:\n- Service-to-service communication\n- Low latency, high throughput\n- Streaming requirements\n\nChoose REST for:\n- Public/external APIs\n- Browser clients (limited gRPC support)",
    },
    {
      topic: "GraphQL",
      front:
        "What is GraphQL?\n\nHow does it differ from REST?\nWhat are its drawbacks?",
      back: "GraphQL: query language for APIs.\nClient specifies exactly what fields\nit needs. Single endpoint.\n\nvs REST:\n- No over-fetching (get only what asked)\n- No under-fetching (one request vs N)\n- Strongly typed schema\n- Single endpoint vs many routes\n\nDrawbacks:\n- Complex queries can be expensive\n  (N+1 queries, deep nesting)\n- Caching harder (POST, dynamic queries)\n- Learning curve\n- Monitoring/rate limiting by query cost\n\nBest for: mobile apps,\nclient-driven data fetching,\nrapidly evolving frontends.",
    },
    {
      topic: "WebSockets",
      front: "What is WebSocket?\n\nWhen would you use it over HTTP?",
      back: "WebSocket: full-duplex, persistent\nconnection between client and server.\n\nHandshake: HTTP Upgrade request\n-> 101 Switching Protocols\n-> ws:// or wss:// connection\n\nUse when:\n- Real-time bidirectional data\n  (chat, gaming, live collaboration)\n- Server needs to push to client\n  (live scores, stock tickers)\n- Low latency required (< 50ms)\n\nAlternatives:\n- SSE (Server-Sent Events):\n  one-way server -> client\n- Long polling: client re-connects\n  repeatedly (higher overhead)\n\nWebSocket overhead: 2-6 bytes per frame\nvs HTTP headers per request.",
    },
    {
      topic: "Load Balancing Algorithms",
      front: "Name 5 load balancing algorithms.\n\nWhen would you use each?",
      back: "1. Round Robin: rotate through servers.\n   Simple. Assumes equal capacity.\n\n2. Weighted Round Robin: assign weights\n   by server capacity.\n\n3. Least Connections: route to server\n   with fewest active connections.\n   Good for long-lived connections.\n\n4. IP Hash: hash(client_IP) % servers.\n   Session affinity without cookies.\n\n5. Random: pick randomly.\n   Simple, surprisingly effective.\n\nLayer 4 (TCP): fast, no content inspect.\nLayer 7 (HTTP): content-based routing,\nURL path, headers, cookies.",
    },
    {
      topic: "CDN (Content Delivery Network)",
      front: "How does a CDN work?\n\nWhat content should go through a CDN?",
      back: "CDN: globally distributed cache servers\n(edge nodes) close to end users.\n\nFlow:\n1. User requests asset\n2. DNS routes to nearest edge node\n3. Cache hit? -> serve from edge\n4. Cache miss? -> fetch from origin,\n   cache at edge, serve to user\n\nBest for:\n- Static assets: JS, CSS, images, video\n- API responses (with cache headers)\n- Full pages (static site)\n\nBenefits:\n- Lower latency (geographic proximity)\n- Reduced origin load\n- DDoS absorption\n- TLS termination at edge\n\nProviders: CloudFront, Cloudflare,\nAkamai, Fastly.",
    },
    {
      topic: "TCP Congestion Control",
      front: "What is TCP congestion control?\n\nName the key algorithms.",
      back: "TCP adjusts sending rate to avoid\nnetwork congestion.\n\nPhases:\n1. Slow Start: exponential growth\n   (cwnd doubles each RTT)\n2. Congestion Avoidance: linear growth\n   after threshold (additive increase)\n3. Fast Retransmit/Recovery: on 3 dup\n   ACKs, retransmit + halve window\n\nAlgorithms:\n- Reno: classic AIMD\n  (Additive Increase, Multiplicative\n   Decrease)\n- CUBIC: default in Linux, better for\n  high-bandwidth paths\n- BBR (Google): model-based, optimizes\n  for bandwidth x delay product\n\nWhy care? Affects throughput between\nservices in distributed systems.",
    },
    {
      topic: "Connection Pooling & Keep-Alive",
      front: "What is HTTP Keep-Alive?\n\nWhat is connection pooling?",
      back: "HTTP Keep-Alive:\nReuse the same TCP connection for\nmultiple HTTP requests/responses.\nAvoids TCP handshake + TLS per request.\nDefault in HTTP/1.1.\n\nConnection Pooling:\nClient maintains a pool of pre-opened\nconnections to a server/database.\nNew requests take a connection from\nthe pool, return it when done.\n\nBenefits:\n- Eliminates connection setup overhead\n  (handshake: 1-3 RTTs)\n- Bounds max connections\n- Reduces TIME_WAIT socket buildup\n\nThrottle: pool size must match the\nserver's capacity to avoid exhaustion.",
    },
    {
      topic: "IP Addressing & Subnets",
      front: "Explain CIDR notation.\n\nWhat does 10.0.0.0/24 mean?",
      back: "CIDR: Classless Inter-Domain Routing.\n\n10.0.0.0/24:\n- /24 = first 24 bits are the network.\n- Remaining 8 bits = host addresses.\n- 2^8 = 256 addresses (254 usable).\n- Range: 10.0.0.0 - 10.0.0.255\n\nCommon subnets:\n/32 = single host\n/24 = 256 IPs (small subnet)\n/16 = 65,536 IPs (medium)\n/8  = 16.7M IPs (large)\n\nPrivate ranges:\n10.0.0.0/8\n172.16.0.0/12\n192.168.0.0/16\n\nWhy care? VPC design, security groups,\nmicroservice networking.",
    },
    {
      topic: "Proxy vs Reverse Proxy",
      front:
        "What is the difference between\na forward proxy and a reverse proxy?",
      back: "Forward Proxy:\nSits in front of CLIENTS.\nClient -> Proxy -> Server.\nServer sees proxy's IP, not client's.\nUse: anonymity, content filtering,\ncache at corporate edge.\n\nReverse Proxy:\nSits in front of SERVERS.\nClient -> Reverse Proxy -> Server(s).\nClient sees proxy's IP, not server's.\nUse: load balancing, SSL termination,\ncaching, security (WAF), compression.\n\nExamples:\nForward: Squid, corporate proxy\nReverse: Nginx, HAProxy, Envoy, Traefik\n\nIn system design, 'load balancer' and\n'reverse proxy' are often the same box.",
    },
    {
      topic: "NAT & Port Forwarding",
      front:
        "What is NAT (Network Address\nTranslation)?\n\nWhy is it important?",
      back: "NAT: maps private IP addresses to\na public IP address (and vice versa).\n\nYour home router: many devices share\none public IP. Router tracks which\ninternal device made each request\nusing port mapping.\n\n192.168.1.5:3000 -> 203.0.113.1:54321\n\nTypes:\n- SNAT: change source IP (outbound)\n- DNAT: change destination IP (inbound)\n  = port forwarding\n\nIn cloud:\n- NAT Gateway: private subnets can\n  reach internet without public IPs.\n- Important for security: servers\n  in private subnet, only LB is public.",
    },
    {
      topic: "Service Mesh",
      front: "What is a service mesh?\n\nWhen would you use one?",
      back: "Service mesh: infrastructure layer\nfor service-to-service communication.\n\nSidecar proxy (e.g., Envoy) is deployed\nalongside each service instance.\n\nFeatures:\n- mTLS (mutual TLS) between services\n- Traffic management (retries, timeouts,\n  circuit breaking)\n- Observability (metrics, tracing)\n- Load balancing\n- Canary/blue-green deployments\n\nExamples: Istio, Linkerd, Consul Connect\n\nUse when:\n- Microservices > 10-20 services\n- Need mTLS / zero-trust networking\n- Complex traffic routing\n\nDon't use for: monolith, < 5 services.",
    },
    {
      topic: "HEAD-of-Line Blocking",
      front: "What is head-of-line (HOL) blocking?\n\nWhere does it occur?",
      back: "HOL blocking: a slow request blocks\nall requests behind it in a queue.\n\nOccurs at:\n1. HTTP/1.1: requests are sequential\n   per connection. Slow response blocks\n   the next request.\n   Fix: HTTP/2 multiplexing.\n\n2. TCP: a lost packet blocks all stream\n   data behind it (even different HTTP/2\n   streams on the same connection).\n   Fix: QUIC/HTTP/3 (per-stream control).\n\n3. Queue processing: one slow message\n   blocks the whole queue.\n   Fix: concurrent consumers, DLQ.\n\nHOL blocking is a key reason for\nHTTP/2 and HTTP/3 development.",
    },
    {
      topic: "Networking in System Design",
      front:
        "What networking concepts come up\nmost in system design interviews?",
      back: "Must know:\n1. DNS: how traffic reaches your system.\n2. CDN: for static content and caching.\n3. Load balancer: L4 vs L7, algorithms.\n4. Reverse proxy: SSL termination, WAF.\n5. HTTP/2-3: why, when to care.\n6. WebSocket/SSE: real-time features.\n7. TCP vs UDP: choice for streaming.\n\nAdvanced:\n- Service mesh for microservices\n- NAT / VPC for cloud networking\n- BGP/Anycast for global load balancing\n- Long-polling vs WebSocket trade-offs\n\nProtocol choice (REST vs gRPC vs\nGraphQL) often comes up in API design\ndiscussions.",
    },
  ],
};
