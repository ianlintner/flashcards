import type { DeckInfo } from "./types";

export const API_DESIGN: DeckInfo = {
  id: "api-design",
  title: "API Design & Best Practices",
  description:
    "RESTful conventions, pagination, versioning, idempotency, error handling, rate limiting, GraphQL trade-offs, and gRPC -- essential for system design rounds and backend interviews.",
  level: "advanced",
  category: "Software Design",
  cards: [
    {
      topic: "RESTful Resource Naming",
      front:
        "What are the best practices for\nRESTful URL design?\n\nGive examples of good vs bad URLs.",
      back: "Good:\nGET  /users          (list)\nGET  /users/123      (single)\nPOST /users          (create)\nPUT  /users/123      (full update)\nPATCH /users/123     (partial update)\nDELETE /users/123    (remove)\n\nNested: GET /users/123/orders\n\nBad:\nGET /getUser?id=123\nPOST /createNewUser\nGET /users/delete/123\n\nRules:\n- Nouns, not verbs\n- Plural collection names\n- Use HTTP methods for actions\n- Kebab-case for multi-word paths\n- Max 2-3 levels of nesting",
    },
    {
      topic: "HTTP Status Codes for APIs",
      front:
        "Which HTTP status codes should a\nwell-designed API use?\n\nList the essential ones.",
      back: "2xx Success:\n200 OK - general success\n201 Created - resource created\n204 No Content - delete success\n\n3xx Redirect:\n301 Moved Permanently\n304 Not Modified (caching)\n\n4xx Client Error:\n400 Bad Request - validation error\n401 Unauthorized - not authenticated\n403 Forbidden - not authorized\n404 Not Found\n409 Conflict - duplicate/state conflict\n422 Unprocessable Entity - semantic err\n429 Too Many Requests - rate limited\n\n5xx Server Error:\n500 Internal Server Error\n502 Bad Gateway\n503 Service Unavailable\n504 Gateway Timeout",
    },
    {
      topic: "API Pagination",
      front:
        "What are the main pagination\nstrategies for APIs?\n\nCompare their trade-offs.",
      back: "1. Offset-based:\n   GET /items?offset=20&limit=10\n   + Simple, supports jumping to page\n   - Slow at large offsets (DB skip)\n   - Inconsistent if data changes\n\n2. Cursor-based (keyset):\n   GET /items?cursor=abc123&limit=10\n   + Fast at any position\n   + Consistent during changes\n   - No random page access\n   - Cursor is opaque to client\n\n3. Page-based:\n   GET /items?page=3&per_page=10\n   + Simple UX\n   - Same offset problems internally\n\nBest practice: cursor-based for feeds,\nreal-time data. Offset for dashboards\nwith small datasets.\n\nAlways return: next cursor/link,\ntotal count (if feasible), has_more.",
    },
    {
      topic: "API Versioning",
      front:
        "What are the strategies for API\nversioning?\n\nWhich is recommended?",
      back: "1. URL path:\n   /api/v1/users, /api/v2/users\n   + Explicit, easy routing\n   - URL changes per version\n   Most common in practice.\n\n2. Query parameter:\n   /api/users?version=2\n   + Easy to default to latest\n   - Easy to forget parameter\n\n3. Header:\n   Accept: application/vnd.api.v2+json\n   + Clean URLs\n   - Harder to test/discover\n\n4. Content negotiation:\n   Accept: application/vnd.company.v2\n   + RESTful purist approach\n   - Complex implementation\n\nRecommendation:\n- URL path for public APIs (clarity)\n- Header for internal microservices\n- Avoid breaking changes with\n  additive evolution when possible.",
    },
    {
      topic: "Idempotency in APIs",
      front:
        "What is idempotency?\n\nWhich HTTP methods are idempotent?\nHow do you make POST idempotent?",
      back: "Idempotent: making the same request\nmultiple times has the same effect\nas making it once.\n\nIdempotent methods:\n- GET    (safe + idempotent)\n- PUT    (replaces entire resource)\n- DELETE (already deleted = same)\n- HEAD, OPTIONS\n\nNOT idempotent:\n- POST (creates new resource each time)\n- PATCH (can be, depends on impl)\n\nMaking POST idempotent:\n1. Idempotency key (header):\n   Idempotency-Key: abc-123-def\n   Server stores result, returns cached\n   response for duplicate key.\n\n2. Client-generated ID:\n   POST /orders { id: 'uuid-here' }\n   409 Conflict if already exists.\n\nCritical for: payment APIs, any\nretry-sensitive operations.",
    },
    {
      topic: "API Error Response Design",
      front:
        "How should API errors be structured?\n\nDesign a good error response format.",
      back: 'Good error response:\n{\n  "error": {\n    "code": "VALIDATION_ERROR",\n    "message": "Request validation failed",\n    "details": [\n      {\n        "field": "email",\n        "message": "Must be valid email",\n        "code": "INVALID_FORMAT"\n      }\n    ],\n    "request_id": "req-abc-123"\n  }\n}\n\nPrinciples:\n- Machine-readable error code (enum)\n- Human-readable message\n- Field-level details for validation\n- Request ID for debugging/support\n- Consistent structure across all errors\n- NEVER leak stack traces in production\n- Log full details server-side\n- Use appropriate HTTP status code',
    },
    {
      topic: "Rate Limiting",
      front:
        "How do APIs implement rate limiting?\n\nWhat headers should be returned?",
      back: "Common algorithms:\n1. Token Bucket: refill tokens at fixed\n   rate. Each request costs 1 token.\n2. Sliding Window: count requests in\n   rolling time window.\n3. Fixed Window: count resets each period.\n4. Leaky Bucket: requests processed at\n   constant rate, excess queued/dropped.\n\nResponse headers:\nX-RateLimit-Limit: 100\nX-RateLimit-Remaining: 42\nX-RateLimit-Reset: 1640000000\nRetry-After: 30  (on 429 response)\n\nGranularity: per user, per IP,\nper API key, per endpoint.\n\nTiers: free (100/hr), basic (1000/hr),\npro (10000/hr).\n\n429 Too Many Requests when exceeded.",
    },
    {
      topic: "API Authentication",
      front: "Compare API authentication methods:\nAPI key, OAuth 2.0, JWT.",
      back: "API Key:\n- Simple header: X-API-Key: abc123\n- Good for: server-to-server, public APIs\n- No user context, easy to leak\n\nOAuth 2.0:\n- Token-based delegated authorization\n- Flows: Auth Code, Client Credentials,\n  PKCE (SPAs), Device Code\n- Scopes control access granularity\n- Best for: user-facing apps, 3rd party\n\nJWT (JSON Web Token):\n- Self-contained: header.payload.signature\n- Stateless verification (no DB lookup)\n- Include claims: sub, exp, roles\n- Cons: can't revoke easily, size\n- Often used WITH OAuth 2.0\n\nBest practice:\n- Public API: API key + OAuth\n- Microservices: JWT with short expiry\n- Sensitive ops: add refresh tokens",
    },
    {
      topic: "HATEOAS & Richardson Maturity",
      front: "What is the Richardson Maturity Model?\n\nWhat is HATEOAS?",
      back: 'Richardson Maturity Model levels:\n\nLevel 0: Single URI, single verb\n  POST /api { action: \'getUser\' }\n\nLevel 1: Resources\n  Different URIs: /users, /orders\n  But everything is POST\n\nLevel 2: HTTP Verbs\n  GET /users, POST /orders, DELETE...\n  (Most production APIs stop here)\n\nLevel 3: HATEOAS\n  Hypermedia As The Engine Of\n  Application State.\n  Responses include links:\n  {\n    "id": 1, "name": "Alice",\n    "_links": {\n      "self": "/users/1",\n      "orders": "/users/1/orders",\n      "delete": "/users/1"\n    }\n  }\n\n  Rarely fully implemented in practice\n  but good to know for interviews.',
    },
    {
      topic: "GraphQL vs REST",
      front:
        "When would you choose GraphQL\nover REST?\n\nWhat are the trade-offs?",
      back: "Choose GraphQL when:\n- Clients need flexible queries\n- Multiple client types (web, mobile)\n  with different data needs\n- Deep nested relationships\n- Reducing over-fetching / under-fetching\n\nChoose REST when:\n- Simple CRUD operations\n- Caching is critical (HTTP caching)\n- File upload/download\n- Team less familiar with GraphQL\n\nGraphQL advantages:\n- Single endpoint, client-driven queries\n- Strong type system/schema\n- No over/under-fetching\n\nGraphQL challenges:\n- N+1 query problem (use DataLoader)\n- Complex caching (no HTTP caching)\n- Rate limiting harder (query complexity)\n- Large attack surface (query depth)\n- Steeper learning curve",
    },
    {
      topic: "gRPC Design",
      front:
        "When would you use gRPC instead\nof REST?\n\nWhat are its key features?",
      back: "Use gRPC when:\n- Microservice-to-microservice comms\n- Low latency is critical\n- Streaming needed (bidirectional)\n- Strong typing via Protocol Buffers\n\nKey features:\n- HTTP/2 based (multiplexing, streaming)\n- Protobuf: binary serialization\n  (10x smaller, 10x faster than JSON)\n- 4 patterns: unary, server streaming,\n  client streaming, bidirectional\n- Code generation: client + server stubs\n- Built-in: deadlines, cancellation,\n  interceptors (middleware)\n\nNot ideal for:\n- Browser clients (needs gRPC-Web proxy)\n- Public APIs (REST more familiar)\n- Simple text-based debugging\n- When human readability matters",
    },
    {
      topic: "API Request Validation",
      front:
        "Where and how should you validate\nAPI requests?\n\nWhat's the validation order?",
      back: "Validation order (fail fast):\n\n1. Authentication\n   Is the caller identified?\n   -> 401 if not\n\n2. Authorization\n   Does caller have permission?\n   -> 403 if not\n\n3. Rate limiting\n   Is caller within limits?\n   -> 429 if not\n\n4. Input validation\n   Is the request well-formed?\n   - Schema validation (required fields,\n     types, formats)\n   - Business rules (valid state\n     transitions, referential integrity)\n   -> 400 or 422\n\n5. Process request\n\nValidation placement:\n- Gateway: auth, rate limiting\n- Controller: schema/input validation\n- Service: business rule validation\n- Never trust client-side validation",
    },
    {
      topic: "API Caching",
      front:
        "How do you implement caching\nfor REST APIs?\n\nWhat HTTP headers are involved?",
      back: 'Cache-Control header:\nCache-Control: public, max-age=3600\nCache-Control: private, no-cache\nCache-Control: no-store (never cache)\n\nETag (conditional requests):\nResponse: ETag: "abc123"\nRequest:  If-None-Match: "abc123"\n-> 304 Not Modified (use cached)\n\nLast-Modified:\nResponse: Last-Modified: Wed, 01 Jan...\nRequest:  If-Modified-Since: Wed, 01...\n-> 304 if unchanged\n\nCache layers:\n1. CDN (edge, closest to user)\n2. API Gateway cache\n3. Application cache (Redis/Memcached)\n4. Database query cache\n\nInvalidation strategies:\n- TTL-based (simple, eventual)\n- Event-based (pub/sub on change)\n- Cache-aside vs write-through',
    },
    {
      topic: "Webhook Design",
      front:
        "How should webhooks be designed\nfor reliability?\n\nWhat patterns prevent data loss?",
      back: "Webhook = server-to-server callback.\nYour system POSTs to customer's URL\nwhen events occur.\n\nReliability patterns:\n1. Retry with exponential backoff\n   1s -> 2s -> 4s -> 8s (max 5 retries)\n\n2. Idempotency: include event_id.\n   Receiver deduplicates.\n\n3. Signature verification:\n   HMAC-SHA256(payload, secret)\n   Sent in header for receiver to verify.\n\n4. Delivery log: track status of each\n   delivery attempt. Allow manual retry.\n\n5. Dead letter queue: after max retries,\n   store for later processing.\n\n6. Payload: send event type + resource ID.\n   Let receiver fetch full data via API.\n   (Avoids large payloads, ensures\n   freshness.)",
    },
    {
      topic: "API Backward Compatibility",
      front: "How do you evolve an API without\nbreaking existing clients?",
      back: "Safe (non-breaking) changes:\n- Add new optional fields to response\n- Add new optional query parameters\n- Add new endpoints\n- Add new enum values (if client\n  handles unknown gracefully)\n\nBreaking changes:\n- Remove or rename fields\n- Change field types\n- Make optional field required\n- Change URL structure\n- Change error format\n\nStrategies:\n1. Additive evolution: only add, never\n   remove. Most scalable approach.\n2. Versioning: v1 and v2 coexist.\n   Sunset v1 after migration period.\n3. Feature flags: toggle behavior.\n4. Deprecation headers:\n   Sunset: Sat, 01 Jul 2025 00:00:00 GMT\n   Deprecation: true\n5. Consumer-driven contract testing.",
    },
    {
      topic: "Batch & Bulk API Design",
      front: "How should you design APIs that\nneed to handle bulk operations?",
      back: "Approaches:\n\n1. Batch endpoint:\n   POST /users/batch\n   [{ name: 'A' }, { name: 'B' }]\n   Response: per-item status\n   [\n     { status: 201, id: 1 },\n     { status: 400, error: '...' }\n   ]\n\n2. Async with job:\n   POST /imports -> 202 Accepted\n   { job_id: 'abc' }\n   GET /jobs/abc -> { status: 'running',\n     progress: 75 }\n\n3. Partial success:\n   Return 207 Multi-Status\n   Each item has its own status code.\n\nDesign rules:\n- Set max batch size (e.g., 100 items)\n- Always report per-item results\n- Large batches should be async\n- Idempotency keys per item\n- Allow retry of failed items only",
    },
    {
      topic: "OpenAPI / Swagger",
      front: "What is OpenAPI/Swagger?\n\nWhy is it important for API design?",
      back: "OpenAPI Specification (formerly Swagger):\nstandard, language-agnostic description\nof REST APIs in YAML or JSON.\n\nBenefits:\n- Single source of truth for API contract\n- Auto-generate documentation (Swagger UI)\n- Auto-generate client SDKs\n- Auto-generate server stubs\n- Validate requests/responses\n- API-first development workflow\n\nDesign-first approach:\n1. Write OpenAPI spec\n2. Review with stakeholders\n3. Generate server stubs\n4. Implement business logic\n5. Validate against spec in CI\n\nTools: Swagger Editor, Stoplight,\nRedoc, openapi-generator.\n\nAPI-first prevents mismatches between\ndocs and implementation.",
    },
    {
      topic: "API Design Interview Tips",
      front: "How should you approach an API\ndesign question in an interview?",
      back: "Framework:\n\n1. Clarify requirements (2 min)\n   - Who are the consumers?\n   - Read-heavy or write-heavy?\n   - Auth requirements?\n   - Scale expectations?\n\n2. Define resources (3 min)\n   - Identify nouns / entities\n   - Define relationships\n   - Choose IDs (UUID vs sequential)\n\n3. Design endpoints (5 min)\n   - CRUD for each resource\n   - Special actions as sub-resources\n   - List filtering, sorting, pagination\n\n4. Define request/response (3 min)\n   - Key fields for each endpoint\n   - Error response format\n\n5. Discuss cross-cutting concerns (2 min)\n   - Auth, rate limiting, versioning\n   - Caching, idempotency\n   - Pagination strategy\n\n6. Trade-offs and evolution\n   - REST vs GraphQL vs gRPC\n   - Backward compatibility plan",
    },
  ],
};
