import type { Flashcard } from "../types";
import type { DeckInfo } from "./types";

const cards: Flashcard[] = [
  {
    topic: "Docker Fundamentals",
    front: "What is Docker?\n\nHow does it differ from a virtual machine?",
    back: "Docker: Container platform that\npackages apps with dependencies.\n\nContainers vs VMs:\n  Container: Shares host OS kernel.\n  Lightweight (~MB). Starts in seconds.\n  Isolation via namespaces + cgroups.\n\n  VM: Full guest OS on hypervisor.\n  Heavy (~GB). Starts in minutes.\n  Hardware-level isolation.\n\nKey concepts:\n- Image: Read-only template (layers)\n- Container: Running instance of image\n- Dockerfile: Build instructions\n- Registry: Image storage (Docker Hub)\n\nBenefits:\n- Reproducible environments\n- Fast startup\n- Dense packing on hosts",
  },
  {
    topic: "Dockerfile Best Practices",
    front: "Name 5 Dockerfile best practices.",
    back: "1. Multi-stage builds:\n   Build in one stage, copy artifacts\n   to minimal runtime stage.\n   Reduces image size significantly.\n\n2. Order layers by change frequency:\n   COPY package.json first, RUN install,\n   then COPY source. Leverages cache.\n\n3. Use specific base image tags:\n   node:20-alpine NOT node:latest.\n   Reproducible builds.\n\n4. Minimize layers:\n   Chain RUN commands with &&.\n   Clean up in same layer.\n\n5. Non-root user:\n   RUN adduser appuser\n   USER appuser\n   Security best practice.\n\nBonus:\n- .dockerignore to exclude files\n- HEALTHCHECK instruction\n- Pin package versions",
  },
  {
    topic: "Kubernetes Architecture",
    front: "What are the main components\nof a Kubernetes cluster?",
    back: "Control Plane:\n- API Server: Front-end for K8s.\n  All communication goes through it.\n- etcd: Key-value store for cluster state.\n- Scheduler: Assigns pods to nodes.\n- Controller Manager: Runs controllers\n  (ReplicaSet, Deployment, etc.)\n\nWorker Nodes:\n- Kubelet: Agent, manages pods on node.\n- Kube-proxy: Network rules, services.\n- Container runtime: Docker/containerd.\n\nKey objects:\n- Pod: Smallest unit (1+ containers).\n- Deployment: Manages ReplicaSets.\n- Service: Stable network endpoint.\n- ConfigMap/Secret: Configuration.\n- Namespace: Logical isolation.",
  },
  {
    topic: "Kubernetes Deployments",
    front: "What is a K8s Deployment?\n\nHow does rolling update work?",
    back: "Deployment manages ReplicaSets\nand Pod lifecycle declaratively.\n\nSpec:\n  replicas: 3\n  selector: matchLabels: app: web\n  template: pod spec\n\nRolling Update (default):\n1. Create new ReplicaSet with new version.\n2. Scale up new pods gradually.\n3. Scale down old pods gradually.\n4. Controlled by:\n   maxSurge: Extra pods during update (25%)\n   maxUnavailable: Pods that can be down (25%)\n\nRollback:\n  kubectl rollout undo deployment/web\n  Reverts to previous ReplicaSet.\n\nOther strategies:\n- Recreate: Kill all, then create new.\n- Blue/Green: Via service switching.\n- Canary: Route small % to new version.",
  },
  {
    topic: "Kubernetes Services",
    front: "What are the K8s Service types?\n\nWhen do you use each?",
    back: "ClusterIP (default):\n  Internal-only IP within cluster.\n  Use: Service-to-service communication.\n\nNodePort:\n  Exposes on each node's IP at static port.\n  Range: 30000-32767.\n  Use: Development, simple external access.\n\nLoadBalancer:\n  Provisions cloud load balancer.\n  Use: Production external traffic.\n\nExternalName:\n  CNAME to external DNS.\n  Use: Alias external services.\n\nIngress (not a Service type):\n  HTTP/HTTPS routing rules.\n  Routes by host/path to services.\n  Requires Ingress Controller\n  (nginx, traefik, etc.)\n  Use: Multiple services, one IP/domain.",
  },
  {
    topic: "Container Orchestration Concepts",
    front: "What problems does container\norchestration solve?",
    back: "1. Scheduling:\n   Place containers across nodes.\n   Resource-aware (CPU, memory).\n\n2. Scaling:\n   HPA: Scale pods on CPU/memory.\n   VPA: Right-size resource requests.\n   Cluster autoscaler: Add/remove nodes.\n\n3. Self-healing:\n   Restart failed containers.\n   Reschedule from failed nodes.\n   Liveness/readiness probes.\n\n4. Service discovery:\n   DNS-based discovery within cluster.\n   Service abstraction over pod IPs.\n\n5. Rolling updates:\n   Zero-downtime deployments.\n   Automatic rollback on failure.\n\n6. Config management:\n   ConfigMaps, Secrets.\n   Environment-specific configuration.\n\n7. Network policy:\n   Control pod-to-pod traffic.",
  },
  {
    topic: "Helm and K8s Packaging",
    front: "What is Helm?\n\nWhat problem does it solve?",
    back: "Package manager for Kubernetes.\nHelm Charts = templated K8s manifests.\n\nProblem solved:\n  Managing many YAML files across\n  environments is painful.\n  Copy-paste leads to drift/errors.\n\nChart structure:\n  Chart.yaml    - metadata\n  values.yaml   - default config\n  templates/    - templated manifests\n\nUsage:\n  helm install myapp ./chart\n  helm upgrade myapp ./chart -f prod.yaml\n  helm rollback myapp 1\n\nFeatures:\n- Parameterized deployments\n- Release management + rollback\n- Dependency management\n- Chart repositories (Artifact Hub)\n\nAlternatives:\n- Kustomize (overlay-based, built into kubectl)\n- Jsonnet / CUE (programmable configs)",
  },
  {
    topic: "Docker Networking",
    front:
      "What are Docker's network drivers?\n\nHow do containers communicate?",
    back: "Network drivers:\n1. bridge (default): Isolated network.\n   Containers on same bridge can talk\n   by container name.\n\n2. host: Container uses host network.\n   No isolation, best performance.\n\n3. none: No networking.\n\n4. overlay: Multi-host networking.\n   Used with Docker Swarm/K8s.\n\nContainer communication:\n- Same network: Use container name as DNS.\n  docker network create mynet\n  docker run --network mynet ...\n\n- Port mapping: -p 8080:80\n  Host port 8080 -> container port 80.\n\n- Docker Compose: All services on\n  same network by default. Reference\n  by service name.\n\nBest practice: Don't use --link (deprecated).\nUse user-defined bridge networks.",
  },
  {
    topic: "Docker Compose",
    front: "What is Docker Compose?\n\nWhen should you use it?",
    back: "Define multi-container apps in YAML.\n\ncompose.yaml:\n  services:\n    web:\n      build: .\n      ports: ['8080:80']\n      depends_on: [db]\n    db:\n      image: postgres:16\n      volumes: [pgdata:/var/lib/postgresql/data]\n      environment:\n        POSTGRES_PASSWORD: secret\n  volumes:\n    pgdata:\n\nCommands:\n  docker compose up -d   # start all\n  docker compose down    # stop + remove\n  docker compose logs    # view logs\n  docker compose exec web sh  # shell in\n\nUse for:\n- Local development environments\n- Integration testing\n- Simple multi-container apps\n\nNot for production: Use K8s, ECS,\nor managed container services instead.",
  },
  {
    topic: "Container Security",
    front: "Name 5 container security\nbest practices.",
    back: "1. Minimal base images:\n   Use alpine/distroless/scratch.\n   Fewer packages = fewer vulnerabilities.\n\n2. Non-root containers:\n   USER nonroot in Dockerfile.\n   Drop all capabilities.\n\n3. Image scanning:\n   Scan for CVEs: Trivy, Snyk,\n   Docker Scout, Grype.\n   Scan in CI/CD pipeline.\n\n4. Read-only filesystem:\n   --read-only flag.\n   Mount tmpfs for temp files only.\n\n5. Resource limits:\n   Set CPU and memory limits.\n   Prevent container escape via\n   resource exhaustion.\n\nBonus:\n- Sign images (Cosign, Notary)\n- Use seccomp/AppArmor profiles\n- Network policies (zero-trust)\n- Secrets: Use vault, not env vars",
  },
  {
    topic: "K8s Resource Management",
    front: "What are resource requests\nand limits in Kubernetes?",
    back: "Requests: Minimum resources guaranteed.\n  Used by scheduler for placement.\n  resources:\n    requests:\n      cpu: 100m     # 0.1 CPU core\n      memory: 128Mi # 128 MiB\n\nLimits: Maximum resources allowed.\n  Container killed if exceeds memory.\n  Container throttled if exceeds CPU.\n  resources:\n    limits:\n      cpu: 500m\n      memory: 512Mi\n\nQoS classes:\n- Guaranteed: requests == limits.\n  Last to be evicted.\n- Burstable: requests < limits.\n  Evicted after BestEffort.\n- BestEffort: No requests/limits.\n  First to be evicted.\n\nBest practice:\n  Always set requests.\n  Set memory limits.\n  CPU limits are debated.",
  },
  {
    topic: "Kubernetes Storage",
    front: "How does persistent storage work\nin Kubernetes?",
    back: "PersistentVolume (PV):\n  Cluster-level storage resource.\n  Provisioned by admin or dynamically.\n\nPersistentVolumeClaim (PVC):\n  User's request for storage.\n  Binds to a matching PV.\n  pvc:\n    accessModes: [ReadWriteOnce]\n    resources:\n      requests:\n        storage: 10Gi\n    storageClassName: gp3\n\nStorageClass:\n  Defines how to provision PVs.\n  Cloud providers have default classes\n  (gp3, standard-rwo, etc.)\n\nAccess modes:\n- ReadWriteOnce (RWO): One node.\n- ReadOnlyMany (ROX): Many nodes read.\n- ReadWriteMany (RWX): Many nodes R/W.\n\nStatefulSets: For stateful apps.\n  Stable network IDs + persistent storage.",
  },
];

export const DOCKER_KUBERNETES: DeckInfo = {
  id: "docker-kubernetes",
  title: "Docker & Kubernetes",
  description:
    "Container fundamentals: Docker images, Dockerfiles, networking, Compose, Kubernetes architecture, deployments, services, Helm, and storage.",
  category: "Cloud",
  level: "intermediate",
  cards,
  tags: ["Docker", "Kubernetes", "containers", "orchestration", "DevOps"],
  estimatedMinutes: 18,
};
