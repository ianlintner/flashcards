import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Information Theory Basics",
    front:
      "What is information entropy?\n\nDefine Shannon entropy\nand its significance.",
    back: "Shannon Entropy: Average information\ncontent of a random variable.\n\n  H(X) = -Sum( p(x) * log2(p(x)) )\n  Units: bits (base 2), nats (base e).\n\nIntuition:\n  Fair coin: H = 1 bit (maximum uncertainty).\n  Biased coin (99/1): H ~ 0.08 bits (low).\n  Uniform over n outcomes:\n    H = log2(n) (maximum entropy).\n\nProperties:\n  H >= 0 (always non-negative).\n  H = 0 iff deterministic.\n  H is maximized for uniform distribution.\n\nConditional entropy:\n  H(Y|X): Remaining uncertainty about Y\n    after observing X.\n  H(Y|X) <= H(Y).\n  Equality iff X, Y independent.\n\nJoint entropy:\n  H(X,Y) = H(X) + H(Y|X).\n  H(X,Y) <= H(X) + H(Y).\n  Equality iff independent.\n\nMutual information:\n  I(X;Y) = H(X) - H(X|Y).\n  = H(Y) - H(Y|X).\n  Shared information between X and Y.\n  I(X;Y) = 0 iff independent.\n\nML uses:\n  Decision trees: Split on max information\n    gain = reduction in H.\n  Cross-entropy loss function.\n  KL divergence.",
  },
  {
    topic: "Cross-Entropy & KL Divergence",
    front:
      "What are cross-entropy and\nKL divergence?\n\nHow are they used in ML?",
    back: "Cross-Entropy: Measures how well\ndistribution Q approximates true P.\n\n  H(P, Q) = -Sum( p(x) * log(q(x)) )\n\n  If P = Q: H(P, Q) = H(P).\n  If Q differs: H(P, Q) > H(P).\n\nKL Divergence (relative entropy):\n  DKL(P || Q) = Sum( p(x) * log(p(x)/q(x)) )\n  = H(P, Q) - H(P).\n  Measures 'extra bits' needed when\n  using Q instead of P.\n\nProperties:\n  DKL >= 0 (Gibbs' inequality).\n  DKL = 0 iff P = Q.\n  NOT symmetric: DKL(P||Q) != DKL(Q||P).\n  Not a distance metric.\n\nML applications:\n\n  Classification loss:\n    Binary: L = -[y*log(p) + (1-y)*log(1-p)]\n    Multi-class: L = -Sum(y_i * log(p_i))\n    This IS cross-entropy.\n\n  VAEs: Loss = reconstruction +\n    DKL(q(z|x) || p(z)).\n    Posterior vs prior.\n\n  Knowledge distillation:\n    Student matches teacher's soft outputs.\n    Minimize DKL(teacher || student).\n\n  GAN training:\n    Jensen-Shannon divergence (symmetric\n    version of KL).",
  },
  {
    topic: "Data Compression",
    front:
      "What is data compression?\n\nExplain Huffman coding and\nits optimality.",
    back: "Data compression: Represent data using\nfewer bits than original encoding.\n\nShannon's source coding theorem:\n  Average code length >= H(X).\n  Entropy is the theoretical minimum.\n  Can get arbitrarily close with\n  block coding.\n\nHuffman coding (lossless):\n  Optimal prefix code for known freq.\n  Algorithm:\n    1. Create leaf for each symbol.\n    2. Merge two lowest-frequency nodes.\n    3. Repeat until one tree.\n    4. Left edge = 0, Right edge = 1.\n    5. Code = path from root to leaf.\n\n  Frequent symbols -> shorter codes.\n  Prefix-free: No code is prefix\n  of another (instant decoding).\n\nOther lossless methods:\n  Arithmetic coding: Better for skewed.\n    Encode entire message as one number.\n  LZ77/LZ78: Dictionary compression.\n    Basis for gzip, zlib, deflate.\n  LZW: Used in GIF format.\n  Brotli: HTTP compression (Google).\n\nLossy compression:\n  JPEG: DCT + quantization (images).\n  MP3: Psychoacoustic model (audio).\n  Video: H.264/H.265 inter-frame.\n\nML connection:\n  Minimum Description Length principle.\n  Compression = prediction.\n  LLMs as compressors.",
  },
  {
    topic: "Symmetric Encryption",
    front:
      "What is symmetric encryption?\n\nCompare AES, block cipher modes,\nand stream ciphers.",
    back: "Symmetric encryption:\n  Same key for encrypt and decrypt.\n  Fast. Used for bulk data encryption.\n\nAES (Advanced Encryption Standard):\n  Block cipher: 128-bit blocks.\n  Key sizes: 128, 192, or 256 bits.\n  Rounds: 10, 12, or 14 respectively.\n  Operations: SubBytes, ShiftRows,\n    MixColumns, AddRoundKey.\n  Considered secure. Used everywhere.\n\nBlock cipher modes:\n  ECB: Each block independent.\n    INSECURE: Identical blocks -> same\n    ciphertext. (Penguin problem.)\n  CBC: XOR with previous ciphertext.\n    IV needed. Sequential (slow).\n  CTR: Counter mode. Parallelizable.\n    Turns block cipher into stream cipher.\n  GCM: CTR + authentication tag.\n    Authenticated encryption (AEAD).\n    RECOMMENDED for most uses.\n\nStream ciphers:\n  Encrypt one byte at a time.\n  XOR plaintext with keystream.\n  ChaCha20: Modern, fast on mobile.\n  ChaCha20-Poly1305: Authenticated.\n  Used in TLS 1.3, WireGuard.\n\nKey management:\n  Key derivation: PBKDF2, scrypt, Argon2.\n  Never reuse IV/nonce with same key.\n  Kerckhoffs' principle: Security depends\n  on key secrecy, not algorithm secrecy.",
  },
  {
    topic: "Asymmetric Encryption",
    front:
      "What is public-key cryptography?\n\nExplain RSA and Diffie-Hellman.",
    back: "Asymmetric (public-key) crypto:\n  Two keys: public (encrypt/verify)\n  and private (decrypt/sign).\n  Solves key distribution problem.\n\nRSA:\n  Based on factoring large primes.\n  Key generation:\n    1. Choose large primes p, q.\n    2. n = p * q (modulus).\n    3. phi(n) = (p-1)(q-1).\n    4. Choose e (public exponent, often 65537).\n    5. d = e^(-1) mod phi(n) (private).\n  Encrypt: c = m^e mod n.\n  Decrypt: m = c^d mod n.\n  Slow. Used for key exchange, signatures.\n  Key sizes: 2048+ bits.\n\nDiffie-Hellman key exchange:\n  Agree on shared secret over\n  insecure channel.\n  1. Public: prime p, generator g.\n  2. Alice: a (secret), sends g^a mod p.\n  3. Bob: b (secret), sends g^b mod p.\n  4. Shared: (g^b)^a = (g^a)^b = g^(ab) mod p.\n  Vulnerable to MITM without auth.\n\nElliptic Curve Cryptography (ECC):\n  Same concepts, shorter keys.\n  256-bit ECC ~ 3072-bit RSA.\n  ECDH: Key exchange.\n  ECDSA: Signatures.\n  Ed25519: Modern signature scheme.\n\nPost-quantum: Lattice-based, hash-based.\n  NIST PQC: CRYSTALS-Kyber/Dilithium.",
  },
  {
    topic: "Hash Functions",
    front:
      "What are cryptographic hash\nfunctions?\n\nProperties and common algorithms.",
    back: "Cryptographic hash function:\n  Maps arbitrary input -> fixed-size output.\n  One-way (irreversible).\n\nProperties:\n  Deterministic: Same input -> same hash.\n  Pre-image resistance:\n    Given h, hard to find m: H(m) = h.\n  Second pre-image resistance:\n    Given m1, hard to find m2:\n    H(m1) = H(m2).\n  Collision resistance:\n    Hard to find ANY m1 != m2:\n    H(m1) = H(m2).\n  Avalanche effect:\n    1 bit change -> ~50% output changes.\n\nCommon algorithms:\n  MD5: 128-bit. BROKEN. Don't use.\n  SHA-1: 160-bit. BROKEN (2017 collision).\n  SHA-256: 256-bit. Secure. Bitcoin PoW.\n  SHA-3 (Keccak): Different internal design.\n    Sponge construction.\n  BLAKE2/BLAKE3: Fast, secure. Modern.\n\nPassword hashing (different category!):\n  NOT raw SHA-256! Too fast for brute force.\n  bcrypt: Adaptive, salt built in.\n  scrypt: Memory-hard.\n  Argon2: Winner of PHC. Memory + CPU hard.\n    Argon2id recommended.\n\nApplications:\n  Data integrity (checksums).\n  Digital signatures (sign hash, not data).\n  HMAC: Keyed hash for authentication.\n  Merkle trees: Blockchain, Git.\n  Content addressing: IPFS, Docker layers.",
  },
  {
    topic: "Digital Signatures & PKI",
    front:
      "How do digital signatures work?\n\nWhat is PKI (Public Key\nInfrastructure)?",
    back: "Digital signature:\n  Proves authenticity and integrity.\n  Only private key holder can sign.\n  Anyone with public key can verify.\n\nProcess:\n  Sign:\n    1. Hash the message: h = H(m).\n    2. Sign hash with private key:\n       sig = Sign(h, privkey).\n    3. Send (message, signature).\n  Verify:\n    1. Hash the message: h' = H(m).\n    2. Verify: Verify(h', sig, pubkey).\n    3. If match -> authentic + unmodified.\n\nAlgorithms:\n  RSA-PSS: RSA-based signatures.\n  ECDSA: Elliptic curve. Shorter.\n  Ed25519: Fast, deterministic, modern.\n    Used in SSH, Git signing.\n\nPKI (Public Key Infrastructure):\n  Solves: How to trust a public key?\n\n  Certificate Authority (CA):\n    Trusted third party.\n    Signs certificates binding\n    identity to public key.\n\n  X.509 certificate:\n    Subject, public key, issuer, validity,\n    signature from CA.\n\n  Chain of trust:\n    Root CA -> Intermediate CA -> End cert.\n    Browser trusts ~150 root CAs.\n\n  TLS handshake:\n    Server presents certificate.\n    Client verifies chain to trusted root.\n    Establish symmetric key via ECDHE.\n    Encrypted communication begins.\n\nLet's Encrypt: Free automated CA.\n  ACME protocol for cert issuance.",
  },
  {
    topic: "Cryptographic Protocols",
    front:
      "How does TLS 1.3 work?\n\nWhat protocols secure the\nmodern internet?",
    back: "TLS 1.3 (Transport Layer Security):\n  Encrypts data in transit.\n  Used by HTTPS, email, VPN.\n\n  Handshake (1 round trip):\n    1. Client Hello:\n       Supported cipher suites,\n       key share (ECDHE public).\n    2. Server Hello:\n       Chosen suite, key share,\n       certificate, signature.\n    3. Both derive session keys.\n    4. Encrypted communication.\n\n  Improvements over TLS 1.2:\n    Removed insecure: RSA key exchange,\n    CBC mode, SHA-1, static DH.\n    Only AEAD ciphers: AES-GCM,\n    ChaCha20-Poly1305.\n    0-RTT resumption (with replay risk).\n\nOther protocols:\n  SSH: Secure shell.\n    Key exchange + authentication.\n    Port forwarding, SFTP.\n\n  Signal Protocol: End-to-end encrypted\n    messaging. Double ratchet.\n    Forward secrecy: Past messages safe\n    even if key compromised.\n\n  WireGuard: Modern VPN.\n    ChaCha20, Curve25519, BLAKE2.\n    Simpler than IPsec/OpenVPN.\n\n  Zero-knowledge proofs:\n    Prove knowledge without revealing it.\n    zk-SNARKs in blockchain privacy.\n\nKey principles:\n  Don't roll your own crypto.\n  Use established libraries.\n  Keep protocols updated.",
  },
];

export const INFO_THEORY_CRYPTO: DeckInfo = {
  id: "info-theory-crypto",
  title: "Information Theory & Cryptography",
  description:
    "Entropy, compression, symmetric and asymmetric encryption, hash functions, digital signatures, PKI, and TLS.",
  category: "CS Theory",
  level: "advanced",
  cards,
  tags: ["entropy", "encryption", "hashing", "TLS", "PKI", "compression"],
  estimatedMinutes: 12,
};
