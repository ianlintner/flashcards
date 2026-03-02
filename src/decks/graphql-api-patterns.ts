import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "GraphQL Basics",
    front: "What is GraphQL?\n\nHow does it differ from REST?",
    back: "GraphQL: Query language for APIs.\nClient specifies exactly what data\nit needs in a single request.\n\nKey differences from REST:\n\n  REST: Multiple endpoints.\n    GET /users/1\n    GET /users/1/posts\n    GET /users/1/followers\n  = 3 round trips.\n\n  GraphQL: Single endpoint.\n    query {\n      user(id: 1) {\n        name\n        posts { title }\n        followers { name }\n      }\n    }\n  = 1 request, exact data needed.\n\nAdvantages:\n  No over-fetching (get only needed fields).\n  No under-fetching (nested data in 1 call).\n  Strongly typed schema.\n  Self-documenting (introspection).\n\nDisadvantages:\n  HTTP caching harder (POST for queries).\n  Complex server implementation.\n  N+1 query problem.\n  File uploads not built-in.\n  Authorization per field is complex.",
  },
  {
    topic: "GraphQL Schema",
    front: "Describe the GraphQL type system.\n\nWhat are the root types?",
    back: "Root types:\n  Query: Read operations (GET equivalent).\n  Mutation: Write operations (POST/PUT/DELETE).\n  Subscription: Real-time (WebSocket-based).\n\nType system:\n  Scalar: Int, Float, String, Boolean, ID.\n  Object: Custom types with fields.\n  Enum: Fixed set of values.\n  Interface: Shared fields contract.\n  Union: One of several types.\n  Input: Arguments for mutations.\n\nExample schema:\n  type User {\n    id: ID!\n    name: String!\n    email: String\n    posts: [Post!]!\n  }\n\n  type Post {\n    id: ID!\n    title: String!\n    author: User!\n  }\n\n  type Query {\n    user(id: ID!): User\n    posts(limit: Int): [Post!]!\n  }\n\n  type Mutation {\n    createPost(input: CreatePostInput!): Post!\n  }\n\n! = non-nullable.\n[Type!]! = non-null list of non-null items.",
  },
  {
    topic: "GraphQL N+1 Problem",
    front: "What is the N+1 problem in GraphQL?\n\nHow is it solved?",
    back: "N+1 problem:\nQuery resolves 1 list of N users,\nthen N separate DB queries for posts.\n\n  query {\n    users {        // 1 query for users\n      posts { ... } // N queries for posts\n    }\n  }\n  = 1 + N database queries.\n\nSolution 1: DataLoader (batching).\n  Collects all IDs in a single tick.\n  Executes ONE batch query.\n  'SELECT * FROM posts WHERE userId IN (...)'\n\n  const loader = new DataLoader(ids =>\n    db.posts.findByUserIds(ids)\n  );\n  // Resolver:\n  user.posts = () => loader.load(user.id);\n\nSolution 2: Join Monster / query planning.\n  Analyze GraphQL query -> single SQL JOIN.\n\nSolution 3: Eager loading.\n  Detect nested fields in resolver,\n  preload associations.\n\nSolution 4: Prisma / ORM batching.\n  ORM automatically batches related queries.\n\nDataLoader is the standard solution.\nKey: Batch per request, not global.",
  },
  {
    topic: "GraphQL Subscriptions",
    front: "How do GraphQL subscriptions work?\n\nWhen should you use them?",
    back: "Subscriptions = real-time data via\nserver-pushed events.\n\nProtocol: graphql-ws over WebSocket.\n\nClient:\n  subscription {\n    messageAdded(channelId: '123') {\n      id\n      text\n      author { name }\n    }\n  }\n\nServer:\n  Uses pub/sub system.\n  When event occurs, pushes to subscribers.\n\n  Subscription: {\n    messageAdded: {\n      subscribe: () =>\n        pubsub.asyncIterator('MESSAGE_ADDED')\n    }\n  }\n\n  // When message created:\n  pubsub.publish('MESSAGE_ADDED', {\n    messageAdded: newMessage\n  });\n\nUse for:\n  Chat messages.\n  Live notifications.\n  Real-time dashboards.\n  Collaborative editing.\n\nAlternatives:\n  SSE + refetch: Simpler, better caching.\n  Polling: Simplest, higher latency.\n  Live queries: Automatic (not in spec).\n\nAt scale: Use Redis pub/sub as backend\nfor multi-server deployments.",
  },
  {
    topic: "API Authentication Patterns",
    front: "Compare API authentication methods:\nAPI keys, OAuth 2.0, JWT.",
    back: "API Keys:\n  Simple string in header/query.\n  X-API-Key: abc123\n  + Simple to implement.\n  - No user context.\n  - Hard to rotate.\n  Use: Server-to-server, public APIs.\n\nOAuth 2.0:\n  Authorization framework.\n  Flows:\n    Auth Code + PKCE: SPAs, mobile.\n    Client Credentials: Server-to-server.\n    (Implicit and Password: deprecated)\n  Tokens: Access token + refresh token.\n  + Standard, widely supported.\n  + Scoped permissions.\n  - Complex to implement.\n\nJWT (JSON Web Token):\n  Header.Payload.Signature (base64).\n  Payload: {sub, exp, iat, roles}.\n  Signed with secret or RSA key.\n  + Stateless (no DB lookup).\n  + Contains claims (user info).\n  - Cannot revoke without blocklist.\n  - Size grows with claims.\n\nBest practice:\n  OAuth 2.0 + JWT access tokens.\n  Short-lived access (15 min).\n  Long-lived refresh (7 days).\n  Store refresh in httpOnly cookie.\n  Access token in memory (not storage).",
  },
  {
    topic: "API Rate Limiting",
    front:
      "What rate limiting algorithms exist?\n\nHow do you implement rate limiting?",
    back: "Algorithms:\n\n1. Token Bucket:\n   Bucket holds N tokens.\n   Tokens added at fixed rate.\n   Request consumes 1 token.\n   No tokens = rejected.\n   Allows bursts up to bucket size.\n\n2. Sliding Window:\n   Count requests in rolling window.\n   Smoother than fixed window.\n   More memory (store timestamps).\n\n3. Fixed Window Counter:\n   Count requests per time window.\n   Simple but edge burst possible\n   (2x at window boundary).\n\n4. Leaky Bucket:\n   Requests queue and drain at fixed rate.\n   Smoothest output.\n   May add latency (queuing).\n\nImplementation:\n  Redis + Lua scripts (atomic ops).\n  INCR key with EXPIRE.\n\nResponse headers:\n  X-RateLimit-Limit: 100\n  X-RateLimit-Remaining: 42\n  X-RateLimit-Reset: 1640000000\n  Retry-After: 30 (on 429).\n\nStrategies:\n  Per IP, per API key, per user.\n  Different limits per endpoint.\n  Higher limits for authenticated users.",
  },
  {
    topic: "API Versioning",
    front:
      "What are the approaches to\nAPI versioning?\n\nPros and cons of each?",
    back: "1. URL Path versioning:\n   /api/v1/users\n   /api/v2/users\n   + Obvious and explicit.\n   + Easy to route.\n   - Duplicates routes.\n   Most common in practice.\n\n2. Header versioning:\n   Accept: application/vnd.api.v2+json\n   + Clean URLs.\n   - Less discoverable.\n   - Harder to test (need headers).\n\n3. Query parameter:\n   /api/users?version=2\n   + Easy to use.\n   - Pollutes query string.\n   Optional, defaults to latest.\n\n4. No versioning (evolution):\n   Never break, only add fields.\n   Deprecate old fields over time.\n   + Simplest for consumers.\n   - Hard with breaking changes.\n   GraphQL naturally evolves this way.\n\nBest practices:\n- Support at least 2 versions.\n- Deprecation notices in headers.\n- Sunset header with date.\n- Migration guides for consumers.\n- Breaking changes = new version.\n- Non-breaking: new fields, new endpoints.",
  },
  {
    topic: "gRPC",
    front: "What is gRPC and when should\nyou use it over REST?",
    back: "gRPC: High-performance RPC framework\nby Google. Uses HTTP/2 + Protocol Buffers.\n\nProtocol Buffers (protobuf):\n  Binary serialization format.\n  Schema-defined (.proto files).\n  Code generation for any language.\n  5-10x smaller than JSON.\n  10-100x faster to parse.\n\nStreaming modes:\n  Unary: Request -> Response.\n  Server stream: Request -> stream of responses.\n  Client stream: Stream of requests -> response.\n  Bidirectional: Both stream.\n\nAdvantages over REST:\n  + Much faster (binary, HTTP/2).\n  + Strong typing from proto schema.\n  + Streaming built-in.\n  + Code generation.\n  + Deadlines and cancellation.\n\nDisadvantages:\n  - Not browser-friendly (needs proxy).\n  - Not human-readable (binary).\n  - Harder to debug (no curl).\n  - Less tooling than REST.\n\nUse gRPC for:\n  Internal microservice communication.\n  High-throughput, low-latency needs.\n  Streaming data (IoT, real-time).\n\nUse REST for:\n  Public APIs, browser clients.",
  },
];

export const GRAPHQL_API_PATTERNS: DeckInfo = {
  id: "graphql-api-patterns",
  title: "GraphQL & API Patterns",
  description:
    "GraphQL fundamentals, schema design, N+1 problem, subscriptions, API auth, rate limiting, versioning, and gRPC.",
  category: "Web",
  level: "intermediate",
  cards,
  tags: ["GraphQL", "API", "REST", "gRPC", "authentication", "rate limiting"],
  estimatedMinutes: 12,
};
