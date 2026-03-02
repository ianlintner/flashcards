import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "HTTP Methods",
    front:
      "List the main HTTP methods and\ntheir semantics.\n\nWhich are safe? Idempotent?",
    back: "Method  | Safe | Idempotent | Body\nGET     | Yes  | Yes        | No\nHEAD    | Yes  | Yes        | No\nPOST    | No   | No         | Yes\nPUT     | No   | Yes        | Yes\nPATCH   | No   | No         | Yes\nDELETE  | No   | Yes        | No\nOPTIONS | Yes  | Yes        | No\n\nSafe: No server-side effects.\nIdempotent: Same result if repeated.\n\nGET: Retrieve resource.\nPOST: Create resource or trigger action.\nPUT: Replace entire resource.\nPATCH: Partial update.\nDELETE: Remove resource.\n\nREST convention:\n  GET    /users      -> list users\n  GET    /users/42   -> get user 42\n  POST   /users      -> create user\n  PUT    /users/42   -> replace user 42\n  PATCH  /users/42   -> update fields\n  DELETE /users/42   -> delete user 42",
  },
  {
    topic: "HTTP Status Codes",
    front: "Categorize HTTP status codes.\n\nGive key examples in each range.",
    back: "1xx Informational:\n  100 Continue\n  101 Switching Protocols (WebSocket)\n\n2xx Success:\n  200 OK\n  201 Created (POST success)\n  204 No Content (DELETE success)\n\n3xx Redirection:\n  301 Moved Permanently (SEO redirect)\n  302 Found (temporary redirect)\n  304 Not Modified (cache valid)\n\n4xx Client Error:\n  400 Bad Request (malformed)\n  401 Unauthorized (no auth)\n  403 Forbidden (no permission)\n  404 Not Found\n  409 Conflict (concurrent edit)\n  422 Unprocessable Entity (validation)\n  429 Too Many Requests (rate limit)\n\n5xx Server Error:\n  500 Internal Server Error\n  502 Bad Gateway (upstream fail)\n  503 Service Unavailable\n  504 Gateway Timeout\n\nKey for APIs:\n  Return specific codes, not just 200/500.\n  Include error body with details.",
  },
  {
    topic: "HTTPS & TLS",
    front: "How does HTTPS / TLS work?\n\nDescribe the TLS handshake.",
    back: "TLS (Transport Layer Security):\nEncrypts communication between\nclient and server.\n\nTLS 1.3 Handshake (simplified):\n1. Client Hello:\n   Supported cipher suites.\n   Client random + key share.\n\n2. Server Hello:\n   Chosen cipher suite.\n   Server random + key share.\n   Server certificate.\n\n3. Both derive session keys from:\n   Key exchange (ECDHE).\n   Client & server randoms.\n\n4. Encrypted communication begins.\n   (1 round trip vs 2 in TLS 1.2)\n\nCertificates:\n  X.509 certificate chain.\n  Server cert -> Intermediate CA -> Root CA.\n  Browser trusts root CAs.\n  Let's Encrypt: Free automated certs.\n\nKey concepts:\n  Forward secrecy: New keys per session.\n  HSTS: Force HTTPS (header).\n  Certificate pinning: Mobile apps.\n  OCSP: Certificate revocation check.",
  },
  {
    topic: "REST API Design",
    front: "What are REST API design\nbest practices?",
    back: "Resource naming:\n  Nouns, not verbs: /users not /getUsers.\n  Plural: /users, /orders.\n  Nested: /users/42/orders.\n  Limit nesting to 2 levels max.\n\nVersioning:\n  URL path: /api/v1/users (most common).\n  Header: Accept: application/vnd.api.v1.\n\nPagination:\n  ?page=2&per_page=25\n  Return: total, next_page, prev_page.\n  Or cursor-based: ?cursor=abc123.\n\nFiltering & sorting:\n  ?status=active&sort=-created_at\n\nError responses:\n  {\n    error: 'validation_error',\n    message: 'Email is required',\n    details: [{ field: 'email', ... }]\n  }\n\nRate limiting headers:\n  X-RateLimit-Limit: 100\n  X-RateLimit-Remaining: 42\n  Retry-After: 30\n\nHATEOAS: Links to related resources.\nAuth: Bearer tokens (Authorization header).",
  },
  {
    topic: "WebSockets",
    front:
      "How do WebSockets work?\n\nWhen should you use them\nvs HTTP polling?",
    back: "WebSocket: Full-duplex communication\nover a single TCP connection.\n\nHandshake:\n  Client sends HTTP Upgrade request.\n  Server responds with 101 Switching.\n  Connection upgraded to WebSocket.\n  Bi-directional messages (frames).\n\nFrame types:\n  Text frames (UTF-8 strings).\n  Binary frames.\n  Ping/Pong (keepalive).\n  Close frame.\n\nUse WebSockets for:\n  Real-time chat/messaging.\n  Live dashboards/feeds.\n  Multiplayer games.\n  Collaborative editing.\n\nUse HTTP/polling for:\n  Low-frequency updates.\n  Simple request-response.\n  When caching matters.\n\nAlternatives:\n  SSE (Server-Sent Events):\n    Server -> client only (one-way).\n    Auto-reconnect, EventSource API.\n    Good for: notifications, live feeds.\n\n  Long Polling:\n    Client holds open request.\n    Server responds when data available.\n    Simpler but more overhead.\n\n  HTTP/2 Streams: Multiplexed requests.",
  },
  {
    topic: "CORS",
    front:
      "What is CORS and why does it exist?\n\nHow do preflight requests work?",
    back: "CORS: Cross-Origin Resource Sharing.\nBrowser security preventing JS on\nsite A from calling API on site B.\n\nSame-origin = same scheme + host + port.\n  https://a.com != https://b.com\n  https://a.com != http://a.com\n  https://a.com:443 != https://a.com:8080\n\nSimple requests (no preflight):\n  GET, HEAD, POST with standard headers.\n  Content-Type: text/plain, form-data,\n  or application/x-www-form-urlencoded.\n\nPreflight (OPTIONS request):\n  Sent for 'non-simple' requests.\n  Custom headers, PUT/DELETE, JSON body.\n\n  Browser sends OPTIONS with:\n    Origin: https://a.com\n    Access-Control-Request-Method: PUT\n    Access-Control-Request-Headers: X-Custom\n\n  Server responds with:\n    Access-Control-Allow-Origin: https://a.com\n    Access-Control-Allow-Methods: PUT\n    Access-Control-Allow-Headers: X-Custom\n    Access-Control-Max-Age: 86400\n\n  If allowed, browser sends real request.\n  Credentials: withCredentials + Allow-Credentials.",
  },
  {
    topic: "Cookies & Sessions",
    front:
      "How do cookies work for\nauthentication?\n\nWhat are the security attributes?",
    back: "Server sets cookie:\n  Set-Cookie: session=abc123; Path=/;\n    HttpOnly; Secure; SameSite=Lax\n\nBrowser sends on every request:\n  Cookie: session=abc123\n\nSecurity attributes:\n  HttpOnly: Not accessible via JS.\n    Prevents XSS from stealing cookies.\n\n  Secure: Only sent over HTTPS.\n\n  SameSite:\n    Strict: Only same-site requests.\n    Lax: + top-level navigation (links).\n    None: Cross-site (requires Secure).\n\n  Domain: Which domains receive cookie.\n  Path: URL path scope.\n  Max-Age / Expires: Lifetime.\n\nSession-based auth:\n  Cookie holds session ID.\n  Server stores session data (Redis).\n  + Simple, well understood.\n  - Server state, hard to scale.\n\nToken-based (JWT):\n  Stateless, stored in localStorage.\n  + Scales easily.\n  - XSS vulnerable if in localStorage.\n  - Cannot revoke without blocklist.",
  },
  {
    topic: "Caching Headers",
    front: "Explain HTTP caching headers:\nCache-Control, ETag, Last-Modified.",
    back: "Cache-Control (primary directive):\n  max-age=3600: Cache for 1 hour.\n  no-cache: Must revalidate each time.\n  no-store: Never cache (sensitive data).\n  public: CDN can cache.\n  private: Browser only (user-specific).\n  immutable: Never revalidate.\n  s-maxage=600: CDN-specific max age.\n\nConditional requests (revalidation):\n\n  ETag (entity tag):\n    Server: ETag: 'abc123'\n    Client: If-None-Match: 'abc123'\n    Server: 304 Not Modified (or 200).\n\n  Last-Modified:\n    Server: Last-Modified: Tue, 01 Jan 2024\n    Client: If-Modified-Since: Tue, 01 Jan\n    Server: 304 or 200.\n\nCaching strategy:\n  Static assets (JS/CSS/images):\n    Cache-Control: public, max-age=31536000,\n    immutable\n    Use content hash in filename.\n\n  API responses:\n    Cache-Control: private, no-cache\n    ETag for conditional requests.\n\n  Sensitive data:\n    Cache-Control: no-store",
  },
  {
    topic: "Browser Rendering Pipeline",
    front: "Describe the browser's critical\nrendering path.",
    back: "1. Parse HTML -> DOM tree.\n   Blocked by: nothing (streams).\n\n2. Parse CSS -> CSSOM tree.\n   Render-blocking: <link rel=stylesheet>.\n\n3. Execute JavaScript.\n   Parser-blocking: <script> (unless\n   async or defer).\n   async: Download parallel, exec when ready.\n   defer: Download parallel, exec after parse.\n\n4. Render Tree = DOM + CSSOM.\n   Only visible elements.\n   display:none excluded.\n\n5. Layout (Reflow):\n   Calculate position and size.\n   Triggered by: width, height, margin,\n   font-size changes.\n\n6. Paint:\n   Fill pixels: colors, borders, shadows.\n   Layers created for composited elements.\n\n7. Composite:\n   GPU combines layers.\n   transform, opacity = cheap (GPU only).\n   width, left = expensive (triggers layout).\n\nOptimization:\n  Minimize render-blocking CSS.\n  Defer non-critical JS.\n  Use will-change for animations.\n  Avoid layout thrashing\n  (read then write, not interleaved).",
  },
  {
    topic: "Web Performance Metrics",
    front:
      "What are Core Web Vitals?\n\nWhat other performance metrics matter?",
    back: "Core Web Vitals (Google):\n\nLCP (Largest Contentful Paint):\n  When largest element renders.\n  Good: < 2.5s.\n  Fix: Optimize images, preload fonts.\n\nINP (Interaction to Next Paint):\n  Responsiveness to user input.\n  Good: < 200ms.\n  Fix: Break long tasks, yield to main thread.\n\nCLS (Cumulative Layout Shift):\n  Visual stability (elements jumping).\n  Good: < 0.1.\n  Fix: Set dimensions on images/ads.\n\nOther key metrics:\n  TTFB: Time to first byte.\n  FCP: First contentful paint.\n  TBT: Total blocking time.\n  TTI: Time to interactive.\n\nTools:\n  Lighthouse: Lab testing.\n  PageSpeed Insights: Lab + field data.\n  Chrome DevTools Performance tab.\n  Web Vitals JS library.\n  CrUX: Chrome User Experience Report.\n\nOptimization checklist:\n  CDN, image compression (WebP/AVIF),\n  code splitting, tree shaking,\n  lazy loading, preload/prefetch,\n  service workers for offline.",
  },
];

export const HTTP_WEB_PROTOCOLS: DeckInfo = {
  id: "http-web-protocols",
  title: "HTTP, REST & Web Protocols",
  description:
    "HTTP methods, status codes, HTTPS/TLS, REST design, WebSockets, CORS, cookies, caching, and browser rendering.",
  category: "Web",
  level: "foundation",
  cards,
  tags: ["HTTP", "REST", "TLS", "CORS", "WebSocket", "caching", "browser"],
  estimatedMinutes: 15,
};
