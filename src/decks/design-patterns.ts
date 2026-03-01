import type { DeckInfo } from "./types";

export const DESIGN_PATTERNS: DeckInfo = {
  id: "design-patterns",
  title: "Software Design Patterns",
  description:
    "GoF creational, structural, and behavioral patterns plus modern architectural patterns -- commonly tested at Amazon, Microsoft, and in OOP design rounds.",
  level: "intermediate",
  category: "Software Design",
  cards: [
    // ── Creational ─────────────────────────────────────────────────────────────
    {
      topic: "Singleton Pattern",
      front:
        "What is the Singleton pattern?\n\nWhen should (and shouldn't) you use it?",
      back: "Singleton: ensures a class has only\nONE instance with a global access point.\n\nImplementation:\n- Private constructor\n- Static getInstance() method\n- Lazy or eager initialization\n- Thread-safe: double-checked locking\n  or enum (Java) / module scope (JS)\n\nUse for: config, logger, connection pool.\n\nAvoid when:\n- Makes testing hard (global state)\n- Hides dependencies\n- Violates SRP if overloaded\n\nModern alternative: dependency injection\nwith a singleton-scoped binding.",
    },
    {
      topic: "Factory Method Pattern",
      front:
        "What is the Factory Method pattern?\n\nHow does it differ from Abstract\nFactory?",
      back: "Factory Method: define interface for\ncreating objects, let subclasses decide\nwhich class to instantiate.\n\ncreateTransport() -> Truck or Ship\n\nAbstract Factory: factory of factories.\nCreates families of related objects.\n\ncreateUI() -> { Button, Checkbox, Menu }\nWinFactory -> WinButton, WinCheckbox\nMacFactory -> MacButton, MacCheckbox\n\nUse Factory Method:\n- One product type, multiple variants.\n\nUse Abstract Factory:\n- Multiple related product families.",
    },
    {
      topic: "Builder Pattern",
      front:
        "What is the Builder pattern?\n\nWhen is it better than a constructor?",
      back: "Builder: construct complex objects\nstep by step. Same construction process\ncan create different representations.\n\nUser.builder()\n  .name('Alice')\n  .email('a@b.com')\n  .role('admin')\n  .build();\n\nBetter than constructor when:\n- Many optional parameters\n- Object needs validation before create\n- Immutable objects with many fields\n- Complex construction with multiple steps\n\nExamples in practice:\n- StringBuilder (Java)\n- QueryBuilder (ORMs)\n- HttpRequest.Builder",
    },
    {
      topic: "Prototype Pattern",
      front: "What is the Prototype pattern?\n\nWhen would you use it?",
      back: "Prototype: create new objects by\ncloning an existing instance (prototype)\nrather than constructing from scratch.\n\nnewObj = existingObj.clone()\n\nUse when:\n- Object creation is expensive (DB load,\n  complex computation, network call)\n- Need variations of a base config\n- Runtime object creation (type unknown\n  at compile time)\n\nDeep vs Shallow clone:\n- Shallow: copies references (shared)\n- Deep: recursively copies all nested\n  objects (independent)\n\nExamples: Object.assign() / spread in JS,\nCloneable in Java, copy.deepcopy in Python.",
    },
    // ── Structural ─────────────────────────────────────────────────────────────
    {
      topic: "Adapter Pattern",
      front: "What is the Adapter pattern?\n\nGive a real-world example.",
      back: "Adapter: converts the interface of one\nclass into another that the client\nexpects. Enables incompatible classes\nto work together.\n\nAnalogy: power outlet adapter\n(US plug -> EU socket).\n\nExample:\nOur code expects: PaymentGateway {\n  charge(amount, card)\n}\nStripe SDK has: stripe.charges.create()\n\nStripeAdapter implements PaymentGateway:\n  charge(amount, card) {\n    return stripe.charges.create({\n      amount, source: card\n    });\n  }\n\nUse when: integrating 3rd-party libs\nor legacy code with a new interface.",
    },
    {
      topic: "Decorator Pattern",
      front:
        "What is the Decorator pattern?\n\nHow does it differ from inheritance?",
      back: "Decorator: wraps an object to add\nbehavior dynamically without modifying\nthe original class.\n\nbase = new DataSource()\nencrypted = new EncryptionDecorator(base)\ncompressed = new CompressionDecorator(\n  encrypted\n)\n\nDiffers from inheritance:\n- Composition over inheritance\n- Can combine decorators at runtime\n- Avoids class explosion\n  (Encrypted + Compressed + Logged\n  vs all permutations as subclasses)\n\nExamples:\n- Java I/O: BufferedReader(FileReader)\n- Express.js middleware\n- Python @decorator syntax",
    },
    {
      topic: "Proxy Pattern",
      front: "What is the Proxy pattern?\n\nName 3 types of proxies.",
      back: "Proxy: provide a surrogate/placeholder\nthat controls access to another object.\n\nTypes:\n1. Virtual Proxy: lazy initialization.\n   Don't load heavy resource until needed.\n   (Lazy-loaded image placeholder)\n\n2. Protection Proxy: access control.\n   Check permissions before forwarding.\n   (Auth proxy for API calls)\n\n3. Remote Proxy: represent object in\n   different address space.\n   (RPC stub that calls remote server)\n\n4. Caching Proxy: cache results of\n   expensive operations.\n\nInterface: Proxy has same interface as\nreal object. Client doesn't know\nthe difference.",
    },
    {
      topic: "Facade Pattern",
      front: "What is the Facade pattern?\n\nWhen should you use it?",
      back: "Facade: provides a simplified interface\nto a complex subsystem.\n\nExample: VideoConverter facade\n  convert(file, format) {\n    codec = CodecFactory.get(format);\n    audio = AudioMixer.extract(file);\n    video = BitrateReader.read(file);\n    return Encoder.encode(video, audio,\n      codec);\n  }\n\nClient calls: converter.convert(file, 'mp4')\nInstead of: managing 4 subsystem classes.\n\nUse when:\n- Complex subsystem needs simple API\n- Want to decouple client from subsystem\n- Layer your system (each layer's API\n  is a facade for the layer below)",
    },
    {
      topic: "Composite Pattern",
      front: "What is the Composite pattern?\n\nGive a classic example.",
      back: "Composite: compose objects into tree\nstructures then treat individual objects\nand compositions uniformly.\n\nComponent (interface): operation()\n  Leaf: implements operation()\n  Composite: children[], operation()\n    calls operation() on all children.\n\nClassic example: File System\n- FSNode: getSize()\n  - File: getSize() { return this.size }\n  - Directory: getSize() {\n      return children.sum(c => c.getSize())\n    }\n\nAlso used in:\n- UI component trees\n- Menu systems\n- Organization hierarchies\n- HTML DOM",
    },
    // ── Behavioral ─────────────────────────────────────────────────────────────
    {
      topic: "Strategy Pattern",
      front: "What is the Strategy pattern?\n\nGive a practical example.",
      back: "Strategy: define a family of algorithms,\nencapsulate each, make them interchangeable.\nClient chooses the algorithm at runtime.\n\ninterface SortStrategy {\n  sort(data): data\n}\n\nclass Sorter {\n  strategy: SortStrategy\n  sort(data) { return strategy.sort(data) }\n}\n\nsorter.strategy = new QuickSort()\nsorter.sort(bigData)\n\nsorter.strategy = new InsertionSort()\nsorter.sort(smallData)\n\nReal uses:\n- Payment method selection\n- Compression algorithm choice\n- Route calculation (fastest/shortest)\n- Validation rule sets",
    },
    {
      topic: "Observer Pattern",
      front:
        "What is the Observer pattern?\n\nHow is it used in modern systems?",
      back: "Observer: one-to-many dependency.\nWhen subject state changes, all\nobservers are notified automatically.\n\nSubject:\n  observers[]\n  subscribe(observer)\n  unsubscribe(observer)\n  notify() { observers.forEach(o.update) }\n\nObserver:\n  update(data)\n\nModern equivalents:\n- Event emitters (Node.js EventEmitter)\n- Pub/Sub messaging (Kafka, Redis)\n- React useState / observables (RxJS)\n- DOM addEventListener\n- Webhooks (cross-service observer)\n\nKey concern: memory leaks from\nforgotten subscriptions. Always clean up.",
    },
    {
      topic: "Command Pattern",
      front: "What is the Command pattern?\n\nWhat does it enable?",
      back: "Command: encapsulate a request as an\nobject, allowing parameterization,\nqueuing, logging, and undo.\n\ninterface Command {\n  execute()\n  undo()\n}\n\nclass MoveCommand implements Command {\n  execute() { piece.moveTo(newPos) }\n  undo() { piece.moveTo(oldPos) }\n}\n\nEnables:\n- Undo/Redo (stack of commands)\n- Command queuing / scheduling\n- Macro commands (composite of commands)\n- Transaction logging / replay\n- Remote execution\n\nExamples: text editor undo, DB\ntransaction log, game action replay,\nCQRS (Command Query Responsibility\nSeparation).",
    },
    {
      topic: "Template Method Pattern",
      front:
        "What is the Template Method pattern?\n\nHow does it differ from Strategy?",
      back: "Template Method: define the skeleton\nof an algorithm in a base class,\nlet subclasses override specific steps.\n\nclass DataParser {\n  parse(file) {\n    data = this.readFile(file)  // fixed\n    parsed = this.doParse(data) // override\n    this.validate(parsed)      // fixed\n    return parsed\n  }\n  abstract doParse(data)  // subclass impl\n}\n\nCSVParser extends DataParser {\n  doParse(data) { /* CSV logic */ }\n}\n\nvs Strategy:\n- Template Method: inheritance-based,\n  algorithm skeleton is fixed.\n- Strategy: composition-based,\n  entire algorithm is swappable.",
    },
    {
      topic: "State Pattern",
      front:
        "What is the State pattern?\n\nWhen is it better than if/else chains?",
      back: "State: allow object behavior to change\nwhen its internal state changes.\nObject appears to change its class.\n\ninterface State {\n  handle(context)\n}\n\nclass OrderState {\n  state: State\n  next() { state.handle(this) }\n  setState(s) { this.state = s }\n}\n\nPendingState.handle(ctx) {\n  // validate -> ctx.setState(new Shipped())\n}\n\nBetter than if/else when:\n- Many states with different behaviors\n- State transitions are complex\n- New states added frequently\n  (open/closed principle)\n\nExamples: order lifecycle, UI components,\nvending machine, TCP connection states.",
    },
    {
      topic: "Chain of Responsibility",
      front:
        "What is the Chain of Responsibility\npattern?\n\nGive practical examples.",
      back: "Chain of Responsibility: pass request\nalong a chain of handlers. Each handler\ncan process or pass to the next.\n\nclass Handler {\n  next: Handler\n  handle(request) {\n    if (this.canHandle(request))\n      return this.process(request)\n    return this.next?.handle(request)\n  }\n}\n\nExamples:\n- Express/Koa middleware chain:\n  auth -> logging -> validation -> handler\n- Event bubbling in DOM\n- Exception handling (catch blocks)\n- Logging levels (DEBUG->INFO->ERROR)\n- Approval workflows (manager->director\n  ->VP based on amount)\n\nBenefit: decouple sender from receiver.\nEasy to add/remove/reorder handlers.",
    },
    {
      topic: "Iterator Pattern",
      front: "What is the Iterator pattern?\n\nWhy is it useful?",
      back: "Iterator: provide a way to access\nelements of a collection sequentially\nwithout exposing its underlying\nrepresentation.\n\ninterface Iterator<T> {\n  hasNext(): boolean\n  next(): T\n}\n\nBenefits:\n- Uniform traversal interface\n  (array, tree, graph, file all use\n  the same for..of / next())\n- Lazy evaluation (don't load all\n  items into memory)\n- Multiple iterators on same collection\n\nModern: iterators are built into\nlanguages:\n- Python: __iter__, __next__\n- Java: Iterable, Iterator\n- JS: Symbol.iterator, for..of\n- Generators (yield) create iterators.",
    },
    // ── Architectural Patterns ─────────────────────────────────────────────────
    {
      topic: "MVC / MVP / MVVM",
      front: "Compare MVC, MVP, and MVVM.\n\nWhich is used where?",
      back: "MVC (Model-View-Controller):\n- View -> Controller -> Model -> View\n- Controller handles input logic\n- Used in: Rails, Django, Spring MVC\n\nMVP (Model-View-Presenter):\n- View <-> Presenter <-> Model\n- Presenter updates view directly\n- View is passive (no logic)\n- Used in: Android (older), GWT\n\nMVVM (Model-View-ViewModel):\n- View <-> ViewModel <-> Model\n- Two-way data binding\n- ViewModel exposes observable state\n- Used in: React, Angular, SwiftUI, WPF\n\nAll separate concerns between\npresentation and business logic.",
    },
    {
      topic: "Repository Pattern",
      front: "What is the Repository pattern?\n\nWhy use it with a database?",
      back: "Repository: abstracts data access behind\na collection-like interface.\n\ninterface UserRepository {\n  findById(id): User\n  findByEmail(email): User\n  save(user): void\n  delete(id): void\n}\n\nclass PostgresUserRepo implements UserRepo\nclass InMemoryUserRepo implements UserRepo\n\nBenefits:\n- Business logic doesn't know about DB\n- Easy to swap storage (Postgres->Mongo)\n- Easy to test (use in-memory impl)\n- Centralizes query logic\n- Single Responsibility: repos handle\n  data, services handle business logic\n\nUsed by: Spring Data, .NET Core,\nClean Architecture.",
    },
    {
      topic: "Dependency Injection",
      front: "What is Dependency Injection?\n\nName the 3 types.",
      back: "DI: instead of a class creating its\ndependencies, they are provided\n(injected) from outside.\n\n3 types:\n1. Constructor injection (most common):\n   class OrderService(db: Database)\n\n2. Setter injection:\n   service.setDatabase(db)\n\n3. Interface injection:\n   class implements Injectable {\n     inject(db: Database)\n   }\n\nBenefits:\n- Testability (inject mocks)\n- Loose coupling\n- Configuration flexibility\n\nDI Containers: Spring (Java),\nNestJS (TS), .NET DI, Dagger (Android).\n\nDI is a technique to achieve the\nDependency Inversion Principle (DIP).",
    },
    {
      topic: "CQRS Pattern",
      front: "What is CQRS?\n\nWhen should you use it?",
      back: "CQRS: Command Query Responsibility\nSeparation. Use different models for\nreads (queries) and writes (commands).\n\nWrite model: normalized, optimized for\nconsistency and business rules.\n\nRead model: denormalized, optimized for\nquery performance (views, projections).\n\nSync: write events propagate to\nread model (eventually consistent).\n\nUse when:\n- Read and write patterns differ greatly\n- Need independent scaling of reads/writes\n- Complex domain with event sourcing\n\nAvoid when:\n- Simple CRUD app\n- Eventual consistency is unacceptable\n- Added complexity not justified",
    },
    {
      topic: "Event Sourcing",
      front:
        "What is Event Sourcing?\n\nHow does it differ from traditional\nCRUD?",
      back: "CRUD: store current state.\nUPDATE account SET balance = 90\n\nEvent Sourcing: store sequence of events.\nAccountCreated(100)\nDeposited(50)\nWithdrawn(60)\nCurrent state: replay events -> 90\n\nBenefits:\n- Complete audit trail\n- Time travel (state at any point)\n- Event-driven architecture natural fit\n- Debug by replaying events\n\nChallenges:\n- Event schema evolution\n- Snapshot needed for long event streams\n- Eventual consistency\n- Harder to query (need projections/CQRS)\n\nUsed by: banking, trading systems,\nGit (commits are events!).",
    },
    {
      topic: "Circuit Breaker Pattern",
      front: "What is the Circuit Breaker pattern?\n\nWhat are its 3 states?",
      back: "Circuit Breaker: prevent cascading\nfailures by stopping calls to a\nfailing service.\n\n3 states:\n1. CLOSED (normal): requests pass through.\n   Track failure count.\n\n2. OPEN (tripped): failures exceed\n   threshold. All requests fail fast\n   (no call to service). Wait timeout.\n\n3. HALF-OPEN: after timeout, allow\n   one test request. If success -> CLOSED.\n   If fail -> OPEN again.\n\nConfig: failure threshold (5 in 10s),\ntimeout (30s), half-open max attempts.\n\nLibraries: Hystrix (Java), Polly (.NET),\nopossum (Node.js).\n\nEssential for microservice resilience.",
    },
    {
      topic: "Design Patterns Summary",
      front:
        "Which design patterns come up\nmost often in interviews?\n\nTop 10 to know.",
      back: "Creational:\n1. Singleton - global instance\n2. Factory / Abstract Factory - creation\n3. Builder - complex construction\n\nStructural:\n4. Adapter - interface conversion\n5. Decorator - add behavior dynamically\n6. Proxy - controlled access\n\nBehavioral:\n7. Strategy - swappable algorithms\n8. Observer - event notification\n9. Command - encapsulate operations\n10. State - state-dependent behavior\n\nArchitectural:\n11. Circuit Breaker - fault tolerance\n12. Repository - data access abstraction\n13. CQRS - read/write separation\n\nKnow: what it is, when to use,\nwhen NOT to use, and a code example.",
    },
  ],
};
