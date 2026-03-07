import type { DeckInfo } from "./types";

export const DISTRIBUTED_SYSTEMS_DEEP: DeckInfo = {
  id: "distributed-systems-deep",
  title: "Advanced Distributed Systems",
  description:
    "Consensus protocols (Paxos, Raft), CRDTs, vector clocks, distributed transactions, exactly-once delivery, leader election, and gossip protocols -- staff/principal-level system design depth.",
  level: "staff-principal",
  category: "System Design",
  cards: [
    {
      topic: "Consensus Problem",
      front:
        "What is the consensus problem in\ndistributed systems?\n\nWhy is it hard?",
      back: "Consensus: getting multiple nodes to\nagree on a value, even when some fail.\n\nRequirements:\n- Agreement: all correct nodes decide\n  the same value.\n- Validity: decided value was proposed\n  by some node.\n- Termination: all correct nodes\n  eventually decide.\n\nWhy hard:\n- FLP Impossibility: no deterministic\n  async protocol can guarantee consensus\n  if even 1 node can crash.\n- Network partitions can split votes.\n- Message delays are unbounded.\n\nPractical solutions add timeouts\n(partial synchrony) to circumvent FLP:\n- Paxos, Raft, Zab (ZooKeeper)\n- These guarantee safety always,\n  liveness under partial synchrony.",
    },
    {
      topic: "Paxos Protocol",
      front: "How does Paxos work?\n\nWhat are the 3 roles and 2 phases?",
      back: "Roles:\n- Proposer: proposes values\n- Acceptor: votes on proposals\n- Learner: learns decided value\n\nPhase 1 (Prepare):\n1. Proposer sends Prepare(n) to majority\n   of acceptors. n = unique proposal number.\n2. Acceptor: if n > any seen, promise\n   not to accept lower. Reply with any\n   previously accepted value.\n\nPhase 2 (Accept):\n3. If proposer gets majority promises,\n   send Accept(n, v). v = highest\n   previously accepted value, or own.\n4. Acceptors: if no higher prepare seen,\n   accept the value.\n5. Majority accepts -> value is chosen.\n\nKey insight: proposal numbers create\nordering. Higher number wins.\n\nMulti-Paxos: optimize by electing\nstable leader, skip Phase 1 for\nsubsequent rounds.",
    },
    {
      topic: "Raft Consensus",
      front:
        "How does Raft consensus work?\n\nWhy was it created instead of Paxos?",
      back: "Raft: designed for understandability.\nEquivalent to Paxos but clearer.\n\n3 roles: Leader, Follower, Candidate\n\nLeader Election:\n- Followers have election timeout.\n- If no heartbeat, become Candidate.\n- Request votes. Majority -> Leader.\n- Leader sends periodic heartbeats.\n\nLog Replication:\n- Client sends command to Leader.\n- Leader appends to log, replicates\n  to followers (AppendEntries RPC).\n- When majority acknowledge, commit.\n- Notify followers to commit.\n\nSafety:\n- Election restriction: candidate must\n  have log at least as up-to-date.\n- Only leader with latest committed\n  entries can win.\n\nUsed by: etcd, CockroachDB, TiKV,\nConsul, RabbitMQ (Quorum queues).",
    },
    {
      topic: "Vector Clocks",
      front:
        "What are vector clocks?\n\nHow do they differ from Lamport\ntimestamps?",
      back: "Lamport timestamps:\n- Single counter per event.\n- If a -> b then L(a) < L(b).\n- BUT: L(a) < L(b) does NOT imply a -> b.\n- Can't detect concurrent events.\n\nVector clocks:\n- Array of counters, one per node.\n  VC = [node_A: 2, node_B: 3, node_C: 1]\n\nRules:\n- On local event: increment own counter.\n- On send: attach current VC.\n- On receive: merge (element-wise max),\n  then increment own.\n\nComparing:\n- VC1 < VC2: all entries VC1[i] <= VC2[i]\n  and at least one strictly less.\n  -> VC1 happened before VC2.\n- Neither VC1 < VC2 nor VC2 < VC1:\n  -> CONCURRENT events.\n\nUsed by: Dynamo, Riak.\nDownside: O(n) size where n = nodes.\nAlternative: dotted version vectors.",
    },
    {
      topic: "CRDTs",
      front: "What are CRDTs?\n\nGive examples of common CRDT types.",
      back: "CRDT: Conflict-free Replicated Data Type.\nData structures that can be replicated\nacross nodes, updated independently,\nand always converge to same state.\n\nTypes:\n- G-Counter: grow-only counter.\n  Each node has own counter. Sum = value.\n  Merge: element-wise max.\n\n- PN-Counter: increment + decrement.\n  Two G-Counters (positive, negative).\n\n- G-Set: grow-only set (add only).\n  Merge: union.\n\n- OR-Set: observed-remove set.\n  Add and remove with unique tags.\n\n- LWW-Register: last-writer-wins.\n  Timestamp resolves conflicts.\n\n- LWW-Element-Set: each element has\n  add/remove timestamps.\n\nUsed by: Redis CRDT, Riak, Automerge,\nYjs (collaborative editing), Apple Notes.\n\nTrade-off: limited operations but\nstrong eventual consistency guaranteed.",
    },
    {
      topic: "Two-Phase Commit (2PC)",
      front: "How does Two-Phase Commit work?\n\nWhat are its failure modes?",
      back: "2PC: atomic commit across multiple\nnodes. All commit or all abort.\n\nPhase 1 (Prepare/Vote):\n- Coordinator sends PREPARE to all.\n- Participants: write to WAL, lock\n  resources, reply VOTE_YES or VOTE_NO.\n\nPhase 2 (Commit/Abort):\n- If ALL vote yes: COMMIT.\n- If ANY votes no: ABORT.\n- Coordinator sends decision.\n- Participants apply and release locks.\n\nFailure modes:\n- Participant fails before vote:\n  Coordinator times out -> ABORT.\n- Coordinator fails after PREPARE:\n  Participants BLOCK (holding locks).\n  This is the blocking problem.\n- Network partition: same blocking issue.\n\n3PC adds pre-commit phase to reduce\nblocking but is rarely used in practice.\n\nAlternatives:\n- Saga pattern (compensating txns)\n- Use consensus (Paxos/Raft) commit.",
    },
    {
      topic: "Saga Pattern",
      front:
        "What is the Saga pattern?\n\nHow does it handle distributed\ntransactions without 2PC?",
      back: "Saga: sequence of local transactions.\nEach step has a compensating action\nfor rollback.\n\nExample: Book a trip\n1. Reserve flight -> compensate: cancel\n2. Reserve hotel -> compensate: cancel\n3. Charge payment -> compensate: refund\n\nIf step 3 fails:\n- Run compensations in reverse order.\n- Cancel hotel, cancel flight.\n\nOrchestration:\n- Central orchestrator directs steps.\n+ Easy to understand flow.\n- Single point of failure.\n\nChoreography:\n- Each service publishes events.\n- Next service reacts to events.\n+ Decoupled.\n- Hard to track overall state.\n\nTrade-offs vs 2PC:\n+ No distributed locks (better perf)\n+ No blocking\n- No isolation (intermediate states\n  visible)\n- Compensations can be complex\n- Need idempotent operations",
    },
    {
      topic: "Exactly-Once Delivery",
      front:
        "Is exactly-once message delivery\npossible in distributed systems?\n\nHow do systems achieve it?",
      back: "True exactly-once delivery is\nIMPOSSIBLE in theory (Two Generals\nproblem). Network can always lose\nthe acknowledgment.\n\nWhat systems actually provide:\nAt-most-once + idempotent processing\n= exactly-once SEMANTICS (not delivery).\n\nApproaches:\n1. Idempotent consumer:\n   Process message, record ID in DB\n   (same transaction). Skip duplicates.\n\n2. Transactional outbox:\n   Write event + biz data in one DB txn.\n   Separate process reads outbox, publishes.\n\n3. Kafka exactly-once:\n   Producer: idempotent (sequence numbers)\n   Consumer: read-process-commit in txn.\n   Combine: transactions across partitions.\n\n4. Deduplication middleware:\n   Message broker tracks message IDs,\n   filters duplicates.\n\nKey: shift from delivery guarantee\nto processing guarantee.",
    },
    {
      topic: "Leader Election",
      front:
        "What are the approaches to leader\nelection in distributed systems?",
      back: "Why: many systems need one node to\ncoordinate (write leader, scheduler,\nlock manager).\n\nApproaches:\n1. Consensus-based (Raft/Paxos):\n   Strongest. Leader elected by majority.\n   Used by: etcd, ZooKeeper.\n\n2. Bully algorithm:\n   Highest-ID node becomes leader.\n   On leader failure, next highest\n   starts election.\n   Simple but chatty.\n\n3. Lease-based:\n   Leader holds time-limited lease.\n   Must renew before expiry.\n   If not renewed, new election.\n   Used by: Chubby, DynamoDB.\n\n4. ZooKeeper ephemeral nodes:\n   All create sequential ephemeral node.\n   Lowest sequence number = leader.\n   If leader dies, node deleted, next\n   in line becomes leader.\n\nFencing tokens: monotonically increasing\ntoken given to each leader. Prevents\nold leader from making stale writes.",
    },
    {
      topic: "Gossip Protocols",
      front: "How do gossip protocols work?\n\nWhat are they used for?",
      back: "Gossip: epidemic-style information\npropagation. Each node periodically\nsends state to random peers.\n\nProcess:\n1. Node picks random peer.\n2. Exchange state information.\n3. Merge states (crdt-like).\n4. Repeat periodically.\n\nProperties:\n- Convergence: O(log n) rounds for\n  all nodes to learn an update.\n- Fault tolerant: works despite failures.\n- Scalable: O(1) load per node per round.\n- Eventually consistent.\n\nUsed for:\n- Failure detection (heartbeat gossip):\n  Cassandra, DynamoDB.\n- Membership: which nodes are alive?\n  SWIM protocol.\n- State dissemination: propagate config\n  changes, metadata.\n- Aggregate computation: average load\n  across cluster.\n\nExamples: Cassandra, Consul, Redis\nCluster, HashiCorp Serf.",
    },
    {
      topic: "Consistent Hashing",
      front:
        "How does consistent hashing work?\n\nWhy is it important for distributed\nsystems?",
      back: "Problem: hash(key) % N breaks when\nN (node count) changes -- almost all\nkeys remap.\n\nConsistent hashing:\n- Nodes and keys map to a hash ring\n  (0 to 2^32).\n- Key is assigned to the first node\n  clockwise from its position.\n- When node added/removed, only K/N\n  keys remap (K=keys, N=nodes).\n\nVirtual nodes:\n- Each physical node gets multiple\n  positions on ring.\n- Improves balance (avoids hotspots).\n- More vnodes = better distribution\n  but more metadata.\n\nUsed by:\n- Cassandra (partition assignment)\n- DynamoDB (partition ring)\n- CDNs (request routing)\n- Memcached (client-side)\n- Load balancers (sticky sessions)\n\nAlternative: rendezvous hashing\n(highest random weight).",
    },
    {
      topic: "Replication Strategies",
      front:
        "Compare leader-follower,\nmulti-leader, and leaderless\nreplication strategies.",
      back: "Leader-follower:\n- One primary accepts writes\n- Replicas follow asynchronously or sync\n- Simple, common, easy reads\n- Failover and lag are key risks\n\nMulti-leader:\n- Multiple regions or writers accept writes\n- Good for geo-local latency\n- Conflict resolution gets hard fast\n\nLeaderless:\n- Any replica can accept reads/writes\n- Uses quorums and conflict resolution\n- High availability, more client logic\n\nExamples:\n- PostgreSQL/MySQL: leader-follower\n- CouchDB: multi-leader\n- Dynamo/Cassandra: leaderless",
    },
    {
      topic: "Cluster Topologies",
      front:
        "What clustering strategies are common\nin production distributed systems?",
      back: "Common strategies:\n1. Active-passive:\n   standby takes over on failure.\n2. Active-active:\n   all nodes serve traffic.\n3. Leader-follower:\n   one write leader, many readers.\n4. Shared-nothing:\n   each node owns its own data shard.\n5. Shared-disk:\n   nodes share storage, coordinate access.\n\nTrade-offs:\n- Active-active improves availability\n- Active-passive simplifies failover logic\n- Shared-nothing scales best horizontally\n- Shared-disk simplifies storage but\n  coordination becomes the tax collector",
    },
    {
      topic: "Service Discovery and Membership",
      front:
        "How do service discovery and\ncluster membership work?\n\nWhy are they foundational?",
      back: "A distributed system must know:\n- which nodes are alive\n- where each service lives\n- when topology changes\n\nApproaches:\n1. Client-side discovery:\n   client queries registry, picks instance\n2. Server-side discovery:\n   load balancer queries registry\n3. DNS-based discovery:\n   simple but slower to react\n\nMembership often uses:\n- gossip / SWIM\n- heartbeats\n- leases and TTLs\n\nExamples: Consul, ZooKeeper, etcd,\nKubernetes service registry.",
    },
    {
      topic: "MapReduce at Cluster Scale",
      front:
        "What makes MapReduce effective\nat cluster scale, and what usually\nbreaks performance?",
      back: "MapReduce works because map tasks run\nclose to the data, reduce tasks aggregate\nby key, and failures are retried.\n\nWhat matters:\n- Data locality: move compute to data\n- Shuffle efficiency: network is the tax\n- Combiner use: reduce network volume\n- Partitioning: balance reducer load\n\nCommon failure modes:\n- Hot keys and data skew\n- Too many tiny files/tasks\n- Slow stragglers dominate job time\n- Recomputing large shuffles repeatedly\n\nModern successors: Spark, Flink, Beam.",
    },
    {
      topic: "Split-Brain Problem",
      front: "What is the split-brain problem?\n\nHow do you prevent it?",
      back: "Split-brain: network partition causes\ncluster to split into subgroups, each\nthinking it's the leader/primary.\n\nDanger: both sides accept writes\n-> divergent state -> data loss on merge.\n\nPrevention:\n1. Quorum: require majority (N/2 + 1)\n   to operate. Minority side goes\n   read-only or stops.\n\n2. Fencing:\n   - STONITH (Shoot The Other Node\n     In The Head): power off old leader.\n   - Fencing tokens: new leader gets\n     higher token. Storage rejects old.\n\n3. Witness/tiebreaker:\n   Odd number of nodes, or add a\n   lightweight witness node.\n\n4. Leader lease with strict timeout:\n   Old leader must stop before lease\n   expires. New election only after.\n\nReal-world:\n- ZooKeeper: majority quorum.\n- etcd/Raft: same.\n- Redis Sentinel: quorum + fencing.",
    },
    {
      topic: "Linearizability vs Serializability",
      front:
        "What is the difference between\nlinearizability and serializability?\n\nWhich is stronger?",
      back: "Serializability:\n- TRANSACTION isolation level.\n- Concurrent transactions appear to\n  execute in SOME serial order.\n- Order need not match real time.\n- Applies to multi-operation transactions.\n\nLinearizability:\n- SINGLE OPERATION consistency.\n- Once a write completes, all subsequent\n  reads see that write.\n- Operations appear to take effect at\n  one instant between start and end.\n- Respects real-time ordering.\n\nStrict Serializability:\n- BOTH: serializable + linearizable.\n- Transactions appear serial AND\n  respect real-time order.\n- Strongest guarantee. Most expensive.\n\nStrength: linearizability (single-obj)\nis orthogonal to serializability (txn).\nStrict serializability = both combined.\n\nExamples:\n- Spanner: strict serializability\n- DynamoDB (default): neither\n- PostgreSQL (SSI): serializable",
    },
    {
      topic: "Quorum Systems",
      front: "What are read/write quorums?\n\nWhat does W + R > N guarantee?",
      back: "Quorum: minimum nodes that must\nparticipate for operation to succeed.\n\nN = total replicas\nW = write quorum (nodes that ack write)\nR = read quorum (nodes queried on read)\n\nW + R > N guarantees:\nAt least 1 node in read set has the\nlatest write -> read sees latest value.\n(Strong consistency)\n\nCommon configs:\nN=3, W=2, R=2: balanced\nN=3, W=3, R=1: fast reads, slow writes\nN=3, W=1, R=3: fast writes, slow reads\n\nN=3, W=1, R=1: W+R=2 <= 3\nNo overlap -> eventual consistency\n(might read stale data).\n\nSloppy quorum:\nIf preferred nodes unavailable, write\nto any available N nodes.\nImproves availability but weakens\nconsistency.\nUsed by: Dynamo, Cassandra (tunable).",
    },
    {
      topic: "Bloom Filters",
      front:
        "What is a Bloom filter?\n\nWhere are they used in distributed\nsystems?",
      back: "Bloom filter: probabilistic data\nstructure. Tests set membership.\n\n- Definitely NOT in set -> guaranteed.\n- Possibly in set -> may be false positive.\n- NO false negatives.\n\nHow:\n- Bit array of m bits, k hash functions.\n- Insert: hash item k times, set bits.\n- Query: hash item k times, check bits.\n  All set -> probably present.\n  Any unset -> definitely absent.\n\nDistributed uses:\n- Cassandra: check if SSTable might\n  have a key (avoid disk reads).\n- HBase: same for HFiles.\n- CDN: filter requests for uncached items.\n- Spell checkers.\n- Network: duplicate packet detection.\n- Bitcoin SPV: lightweight tx filtering.\n\nVariants:\n- Counting Bloom filter (supports delete)\n- Cuckoo filter (better space, deletion)\n\nFalse positive rate: (1 - e^(-kn/m))^k",
    },
    {
      topic: "Merkle Trees",
      front: "What is a Merkle tree?\n\nHow is it used for data sync?",
      back: "Merkle tree: binary tree where each\nleaf = hash of data block, each\nparent = hash of children's hashes.\n\nRoot hash = fingerprint of ALL data.\n\nSync protocol (anti-entropy):\n1. Two nodes compare root hashes.\n   Match -> fully in sync. Done.\n2. If different, compare children.\n3. Recursively descend to find exactly\n   which blocks differ.\n4. Transfer only differing blocks.\n\nEfficiency: O(log n) comparisons to\nfind differences vs O(n) full scan.\n\nUsed by:\n- Cassandra: replica synchronization\n- DynamoDB: anti-entropy repair\n- Git: content-addressable storage\n- Ethereum: state trie\n- BitTorrent: piece verification\n- Certificate Transparency: audit logs\n\nBenefit: detect and repair inconsistencies\nwith minimal data transfer.",
    },
    {
      topic: "Backpressure",
      front:
        "What is backpressure in distributed\nsystems?\n\nHow should it be handled?",
      back: "Backpressure: signal from a slow\nconsumer to a fast producer to\nreduce sending rate.\n\nWithout backpressure:\n- Queues grow unbounded -> OOM\n- Increasing latency\n- Cascading failures\n\nStrategies:\n1. Reactive Streams (pull-based):\n   Consumer requests N items.\n   Producer sends at most N.\n   (RxJava, Akka Streams, Project Reactor)\n\n2. Rate limiting:\n   Token bucket at producer side.\n\n3. Bounded queues:\n   Queue full -> block or drop producer.\n   (Go channels, Kafka consumer lag)\n\n4. Load shedding:\n   Drop low-priority requests when\n   overloaded. Return 503.\n\n5. Circuit breaker:\n   Stop calling overwhelmed service.\n\nKafka approach: consumer lag metric.\nIf lag grows, scale consumers or\nreduce production rate.",
    },
    {
      topic: "Lamport Clocks & Happens-Before",
      front:
        "What is the happens-before relation?\n\nHow do Lamport clocks track it?",
      back: "Happens-before (->):\nPartial ordering of events.\na -> b if:\n1. a and b are in same process and\n   a comes before b, OR\n2. a is a send and b is corresponding\n   receive, OR\n3. Transitive: a -> b and b -> c\n   implies a -> c.\n\nIf neither a -> b nor b -> a:\nevents are CONCURRENT (a || b).\n\nLamport clocks:\n- Each process has counter C.\n- On event: C = C + 1\n- On send: attach C to message.\n- On receive: C = max(C, msg.C) + 1\n\nGuarantee:\nIf a -> b then L(a) < L(b).\nBUT: L(a) < L(b) does NOT imply a -> b.\n(Cannot detect concurrency.)\n\nThat's why vector clocks exist:\nthey fully capture happens-before.",
    },
    {
      topic: "CAP Theorem Deep Dive",
      front: "Explain CAP theorem beyond the basics.\n\nWhat does PACELC add?",
      back: "CAP: during a network Partition, choose\nConsistency or Availability.\n\nOften misunderstood:\n- Not always choosing 2 of 3.\n- Partition is not optional (networks fail).\n- Real choice: what to do DURING partition.\n\nCP: reject requests to maintain\nconsistency. (HBase, ZooKeeper, Spanner)\n\nAP: serve requests with possibly stale\ndata. (Cassandra, DynamoDB, CouchDB)\n\nPACELC (extends CAP):\nIf Partition:\n  choose Availability or Consistency\nElse (normal operation):\n  choose Latency or Consistency\n\nExamples:\n- DynamoDB: PA/EL (AP + low latency)\n- Spanner: PC/EC (CP + consistency)\n- Cassandra: PA/EL (tunable per query)\n- MongoDB: PA/EC (replication lag but\n  consistent reads from primary)\n\nModern systems: tunable consistency.\nNot binary CP or AP.",
    },
    {
      topic: "Distributed Systems Interview Tips",
      front:
        "How should you approach distributed\nsystems topics in a staff+ interview?",
      back: "Framework:\n\n1. State the problem clearly\n   (consistency, availability, partition\n   tolerance trade-offs)\n\n2. Discuss the theoretical limits\n   (CAP, FLP, Two Generals)\n\n3. Present practical solutions\n   and their trade-offs:\n   - Consensus: Paxos/Raft (when needed)\n   - Replication: sync vs async\n   - Consistency: strong vs eventual\n   - Transactions: 2PC vs Saga\n\n4. Name real systems that use each:\n   'Cassandra uses gossip for membership\n   and tunable quorums for consistency.'\n\n5. Discuss failure modes:\n   - What if leader crashes?\n   - What about network partitions?\n   - How to detect and recover?\n\n6. Quantify trade-offs:\n   - Latency impact of consensus\n   - Availability during failures\n   - Operational complexity\n\nShow depth over breadth at staff level.",
    },
  ],
};
