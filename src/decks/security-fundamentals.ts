import type { DeckInfo } from "./types";

export const SECURITY_FUNDAMENTALS: DeckInfo = {
  id: "security-fundamentals",
  title: "Security Fundamentals for Engineers",
  description:
    "OAuth 2.0, JWT, CORS, XSS, CSRF, SQL injection, TLS, secrets management, and secure coding -- common FAANG interview topics for backend and full-stack roles.",
  level: "intermediate",
  category: "Systems Fundamentals",
  cards: [
    {
      topic: "OWASP Top 10 Overview",
      front:
        "What is OWASP Top 10?\n\nName the most critical web\napplication security risks.",
      back: "OWASP Top 10 (2021):\n\n1. Broken Access Control\n   (IDOR, privilege escalation)\n2. Cryptographic Failures\n   (weak encryption, plaintext secrets)\n3. Injection\n   (SQL, NoSQL, OS command, LDAP)\n4. Insecure Design\n   (missing threat modeling)\n5. Security Misconfiguration\n   (default creds, open ports)\n6. Vulnerable Components\n   (outdated libraries)\n7. Auth & Identification Failures\n   (weak passwords, session issues)\n8. Software & Data Integrity Failures\n   (unsigned updates, CI/CD tampering)\n9. Logging & Monitoring Failures\n   (no audit trail)\n10. SSRF (Server-Side Request Forgery)",
    },
    {
      topic: "SQL Injection",
      front: "What is SQL injection?\n\nHow do you prevent it?",
      back: "SQL injection: attacker inserts\nmalicious SQL via user input.\n\nVulnerable:\nquery = \"SELECT * FROM users\n  WHERE name = '\" + input + \"'\"\ninput = \"'; DROP TABLE users; --\"\n\nPrevention:\n1. Parameterized queries (prepared stmts)\n   db.query('SELECT * FROM users\n     WHERE name = $1', [input])\n\n2. ORM/query builders (auto-parameterize)\n\n3. Input validation (whitelist expected\n   patterns, reject unexpected chars)\n\n4. Least privilege DB accounts\n   (app user can't DROP TABLE)\n\n5. WAF (Web Application Firewall)\n   as additional defense layer\n\nNEVER build SQL with string\nconcatenation from user input.",
    },
    {
      topic: "XSS (Cross-Site Scripting)",
      front: "What is XSS?\n\nWhat are the 3 types?",
      back: "XSS: attacker injects malicious scripts\ninto web pages viewed by other users.\n\n1. Stored XSS:\n   Malicious script saved in DB.\n   Renders for all users who view it.\n   Example: forum post with <script> tag.\n\n2. Reflected XSS:\n   Script in URL query parameter,\n   reflected back in response.\n   Example: search?q=<script>alert(1)\n\n3. DOM-based XSS:\n   Client-side JS processes untrusted\n   data into DOM without sanitization.\n   document.innerHTML = location.hash\n\nPrevention:\n- Output encoding (escape HTML entities)\n- Content Security Policy (CSP) headers\n- Sanitize user input (DOMPurify)\n- HttpOnly cookies (no JS access)\n- Use frameworks (React auto-escapes)",
    },
    {
      topic: "CSRF (Cross-Site Request Forgery)",
      front: "What is CSRF?\n\nHow do you prevent it?",
      back: 'CSRF: attacker tricks authenticated user\ninto making unintended requests.\n\nExample: user is logged into bank.com.\nAttacker page has:\n<img src="bank.com/transfer?to=attacker\n  &amount=1000">\nBrowser sends bank.com cookies\nautomatically!\n\nPrevention:\n1. CSRF tokens: server generates random\n   token, embed in forms, verify on submit.\n   Attacker can\'t read the token.\n\n2. SameSite cookies:\n   Set-Cookie: session=abc; SameSite=Strict\n   Cookie not sent on cross-site requests.\n\n3. Check Origin/Referer headers.\n\n4. Require re-authentication for\n   sensitive actions.\n\n5. Use POST for state changes\n   (not GET -- GET should be safe).',
    },
    {
      topic: "OAuth 2.0",
      front: "Explain OAuth 2.0.\n\nWhat are the main grant types?",
      back: "OAuth 2.0: authorization framework.\nLets apps access user resources on\nanother service without passwords.\n\nRoles:\n- Resource Owner (user)\n- Client (your app)\n- Auth Server (issues tokens)\n- Resource Server (API with data)\n\nGrant types:\n1. Authorization Code (+ PKCE)\n   Best for web/mobile apps.\n   Code exchanged for token server-side.\n\n2. Client Credentials\n   Machine-to-machine. No user context.\n\n3. Device Code\n   For devices without browsers (TV, CLI).\n\n4. Implicit (DEPRECATED)\n   Token in URL fragment. Insecure.\n\nTokens:\n- Access token: short-lived (15-60 min)\n- Refresh token: long-lived, gets new\n  access tokens without re-auth.",
    },
    {
      topic: "JWT (JSON Web Tokens)",
      front: "How do JWTs work?\n\nWhat are the security concerns?",
      back: "JWT structure: header.payload.signature\n(Base64url encoded, dot separated)\n\nHeader: { alg: 'HS256', typ: 'JWT' }\nPayload: { sub: '123', exp: 1700000,\n  role: 'admin' }\nSignature: HMAC-SHA256(header + payload,\n  secret)\n\nVerification: recompute signature with\nserver's secret. If match -> valid.\nNo DB lookup needed (stateless).\n\nSecurity concerns:\n1. Can't revoke before expiry\n   -> Keep exp short (15 min)\n   -> Use refresh token rotation\n2. alg:none attack -> always validate alg\n3. Secret key leak = all tokens forged\n4. Large payload = large headers\n5. Don't store sensitive data in payload\n   (it's only encoded, not encrypted)\n6. Store in httpOnly cookie or memory,\n   NOT localStorage (XSS risk).",
    },
    {
      topic: "CORS (Cross-Origin Resource Sharing)",
      front: "What is CORS?\n\nHow does the preflight request work?",
      back: "CORS: browser mechanism that controls\nwhich origins can access your API.\n\nSame-origin policy: browser blocks\nrequests from different origins by default.\nCORS headers relax this selectively.\n\nSimple request (GET/POST with basic\nheaders): browser sends directly,\nchecks response headers.\n\nPreflight (OPTIONS):\nTriggered by: custom headers, PUT/DELETE,\nor non-simple content types.\n\nBrowser sends:\nOPTIONS /api/data\nOrigin: https://app.com\nAccess-Control-Request-Method: PUT\n\nServer responds:\nAccess-Control-Allow-Origin: https://app.com\nAccess-Control-Allow-Methods: GET, PUT\nAccess-Control-Allow-Headers: Content-Type\nAccess-Control-Max-Age: 86400\n\nCommon mistake: Access-Control-Allow-Origin: *\nwith credentials. Browser rejects this.\nMust specify exact origin with credentials.",
    },
    {
      topic: "TLS / HTTPS",
      front:
        "How does TLS secure communication?\n\nWhat happens during the TLS handshake?",
      back: "TLS provides:\n- Encryption (confidentiality)\n- Authentication (server identity)\n- Integrity (detect tampering)\n\nTLS 1.3 handshake (1 round-trip):\n1. Client Hello: supported cipher suites,\n   key share, SNI (server name).\n2. Server Hello: chosen cipher, server\n   cert, key share.\n3. Client verifies cert chain against\n   trusted CAs.\n4. Both derive session keys from key\n   exchange (ECDHE).\n5. Encrypted communication begins.\n\nTLS 1.2: 2 round-trips (slower).\n\nKey concepts:\n- Certificate chain: root CA -> intermediate\n  -> server cert.\n- Perfect Forward Secrecy (ECDHE):\n  compromised key can't decrypt past\n  sessions.\n- HSTS: force HTTPS, prevent downgrade.",
    },
    {
      topic: "Password Storage",
      front:
        "How should passwords be stored?\n\nWhat hashing algorithm should you use?",
      back: "NEVER store plaintext passwords.\nNEVER use MD5, SHA-1, or SHA-256 alone.\n\nCorrect approach:\n1. Hash with bcrypt, scrypt, or Argon2\n   (designed to be SLOW -- brute force\n   resistant)\n2. Salt is auto-included (bcrypt/Argon2)\n   Each password gets unique salt.\n3. Use work factor / cost parameter\n   bcrypt: cost 12+ (adjust for hardware)\n   Argon2: tune memory, iterations, threads\n\nWhy slow hashing?\n- SHA-256: billions/sec on GPU\n- bcrypt(12): ~13 hashes/sec per core\n- Attacker can't brute force feasibly\n\nAdditional measures:\n- Rate limit login attempts\n- Account lockout after N failures\n- Enforce password complexity\n- Offer MFA (TOTP, WebAuthn)\n- Check against breached password lists\n  (haveibeenpwned API)",
    },
    {
      topic: "Secrets Management",
      front:
        "How should application secrets\nbe managed?\n\nWhat are the best practices?",
      back: "NEVER:\n- Hardcode secrets in source code\n- Commit .env files to Git\n- Log secrets or include in error msgs\n- Share secrets via Slack/email\n\nBest practices:\n1. Environment variables\n   (12-factor app, basic approach)\n\n2. Secrets manager service:\n   - AWS Secrets Manager\n   - Azure Key Vault\n   - HashiCorp Vault\n   - GCP Secret Manager\n\n3. Secret rotation:\n   Auto-rotate on schedule.\n   App fetches latest on startup.\n\n4. Least privilege:\n   Each service only accesses its secrets.\n\n5. Encryption at rest and in transit.\n\n6. Audit logging:\n   Track who accessed which secret when.\n\n7. .gitignore .env files.\n   Use .env.example with placeholder values.",
    },
    {
      topic: "SSRF (Server-Side Request Forgery)",
      front: "What is SSRF?\n\nWhy is it dangerous in cloud envs?",
      back: "SSRF: attacker makes server send\nrequests to unintended destinations.\n\nExample:\nGET /fetch?url=http://169.254.169.254/\n  latest/meta-data/iam/credentials\n\nServer fetches AWS metadata endpoint,\nreturns IAM credentials to attacker!\n\nDangerous in cloud because:\n- Metadata endpoints (169.254.169.254)\n  expose credentials, tokens, config\n- Internal services reachable from server\n- Can scan internal network\n\nPrevention:\n1. Allowlist permitted domains/IPs\n2. Block private IP ranges\n   (10.x, 172.16-31.x, 192.168.x,\n   169.254.x, 127.x)\n3. Use IMDSv2 (require token for\n   metadata access)\n4. Don't pass raw URLs from user input\n5. Network segmentation\n6. DNS rebinding protection",
    },
    {
      topic: "Input Validation & Sanitization",
      front:
        "What's the difference between\ninput validation and sanitization?\n\nWhich should you use?",
      back: "Validation: reject bad input.\n  Is this valid? Yes/No.\n  email.matches(emailRegex) or reject.\n  Whitelist approach (preferred).\n\nSanitization: clean/transform input.\n  Remove or encode dangerous characters.\n  stripHTML(input) before storing.\n\nBest practice: BOTH.\n1. Validate on input (reject invalid)\n2. Sanitize on output (encode for context)\n\nContext-dependent encoding:\n- HTML: &lt; &gt; &amp;\n- URL: %20 %3C %3E\n- SQL: parameterized queries\n- JSON: escape special chars\n- Shell: never pass to shell; use APIs\n\nSERVER-SIDE is mandatory.\nClient-side is UX convenience only.\n\nNever trust: query params, headers,\ncookies, file uploads, JSON bodies.",
    },
    {
      topic: "Authentication vs Authorization",
      front:
        "What's the difference between\nauthentication and authorization?\n\nGive examples of each.",
      back: "Authentication (AuthN):\nWHO are you?\n- Verify identity.\n- Login with username/password\n- MFA (something you know + have + are)\n- SSO via SAML/OIDC\n- API key (identifies caller)\n\nAuthorization (AuthZ):\nWHAT can you do?\n- Check permissions after identity known.\n- Role-Based Access Control (RBAC)\n  Admin, Editor, Viewer roles\n- Attribute-Based Access (ABAC)\n  if user.dept == resource.dept\n- Policy engines (OPA, Cedar)\n\nCommon pattern:\n1. Authenticate: verify JWT signature\n2. Extract claims: { sub, role, scope }\n3. Authorize: check role/scope against\n   required permission for endpoint\n\nPrinciple of Least Privilege:\nGrant minimum permissions needed.",
    },
    {
      topic: "Session Management",
      front:
        "Compare session-based auth with\ntoken-based auth.\n\nWhat are the security considerations?",
      back: "Session-based:\n- Server stores session in memory/DB\n- Client gets session ID in cookie\n- Server looks up session on each request\n+ Revocable (delete server-side)\n+ Small cookie size\n- Server state required\n- Scaling needs shared session store\n\nToken-based (JWT):\n- Server issues signed token\n- Client stores and sends token\n- Server verifies signature (stateless)\n+ No server state\n+ Easy horizontal scaling\n- Hard to revoke before expiry\n- Token size larger than session ID\n\nSecurity for both:\n- HttpOnly cookies (no JS access)\n- Secure flag (HTTPS only)\n- SameSite attribute (CSRF protection)\n- Short expiration + refresh tokens\n- Rotate session IDs after login\n- Invalidate on logout/password change",
    },
    {
      topic: "Content Security Policy",
      front: "What is Content Security Policy?\n\nHow does it prevent attacks?",
      back: "CSP: HTTP header that tells browser\nwhich sources are allowed for scripts,\nstyles, images, etc.\n\nContent-Security-Policy:\n  default-src 'self';\n  script-src 'self' cdn.example.com;\n  style-src 'self' 'unsafe-inline';\n  img-src *;\n  connect-src api.example.com;\n\nPrevents:\n- XSS: inline scripts blocked unless\n  explicitly allowed with nonce/hash\n- Data exfiltration: limits where data\n  can be sent\n- Clickjacking: frame-ancestors 'none'\n\nDeployment strategy:\n1. Start with report-only mode\n   Content-Security-Policy-Report-Only\n2. Collect violations, fix resources\n3. Enable enforcement\n4. Use nonces for inline scripts:\n   script-src 'nonce-abc123'\n   <script nonce=\"abc123\">...</script>",
    },
    {
      topic: "Encryption at Rest vs in Transit",
      front:
        "What is the difference between\nencryption at rest and in transit?\n\nWhen do you need each?",
      back: "Encryption in Transit:\nProtect data moving between systems.\n- TLS/HTTPS for web traffic\n- mTLS for service-to-service\n- SSH for remote access\n- VPN for network tunnels\nAttack: man-in-the-middle, eavesdropping.\n\nEncryption at Rest:\nProtect stored data.\n- Database encryption (TDE)\n- Disk encryption (LUKS, BitLocker)\n- Object storage encryption (S3 SSE)\n- Application-level field encryption\nAttack: stolen disk, DB dump, backup theft.\n\nYou need BOTH:\n- Data encrypted when stored\n- Data encrypted when transmitted\n- Keys managed separately (KMS)\n- Rotate keys periodically\n\nAlso consider:\n- Encryption in Use (confidential computing)\n- End-to-end encryption (E2EE)\n  (server can't read data, e.g., Signal)",
    },
    {
      topic: "API Security Checklist",
      front:
        "What security measures should\nevery API have?\n\nMinimum checklist.",
      back: "Authentication:\n[x] Use OAuth 2.0 / JWT\n[x] Short-lived access tokens\n[x] Rotate secrets/keys\n\nAuthorization:\n[x] Check permissions on every endpoint\n[x] Validate resource ownership (no IDOR)\n[x] Least privilege for service accounts\n\nInput:\n[x] Validate all input server-side\n[x] Parameterized queries (no SQL inj)\n[x] Sanitize output (no XSS)\n[x] Rate limiting per user/IP\n\nTransport:\n[x] HTTPS everywhere (HSTS)\n[x] TLS 1.2+ only\n\nHeaders:\n[x] CORS properly configured\n[x] CSP, X-Content-Type-Options\n[x] Remove server version headers\n\nLogging:\n[x] Log auth events and errors\n[x] Never log secrets/tokens/passwords\n[x] Audit trail for sensitive operations",
    },
    {
      topic: "Security in System Design",
      front: "How should you address security\nin a system design interview?",
      back: "Don't wait to be asked. Proactively\nmention security at each layer:\n\n1. Client layer:\n   - HTTPS, CSP, input validation\n   - Token storage (httpOnly cookies)\n\n2. API Gateway:\n   - Authentication (OAuth/JWT)\n   - Rate limiting, WAF\n   - Request validation\n\n3. Service layer:\n   - Authorization (RBAC/ABAC)\n   - mTLS between services\n   - Secrets in vault (not env vars)\n\n4. Data layer:\n   - Encryption at rest (AES-256)\n   - Parameterized queries\n   - Backup encryption\n   - PII handling / data masking\n\n5. Infrastructure:\n   - VPC / network segmentation\n   - Principle of least privilege\n   - Audit logging\n   - Vulnerability scanning in CI/CD\n\nThis shows senior-level thinking.",
    },
  ],
};
