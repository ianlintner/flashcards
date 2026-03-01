import type { DeckInfo } from "./types";

export const OOP_DESIGN: DeckInfo = {
  id: "oop-design",
  title: "OOP & Low-Level Design",
  description:
    "Object-oriented design problems frequently asked at Amazon, Google, and Meta. SOLID principles, UML basics, and classic LLD interview questions.",
  level: "advanced",
  category: "Low-Level Design",
  cards: [
    // ── Principles ─────────────────────────────────────────────────────────────
    {
      topic: "SOLID - Single Responsibility",
      front:
        "What is the Single Responsibility\nPrinciple (SRP)?\n\nGive an example violation.",
      back: "SRP: A class should have only ONE\nreason to change.\n\nViolation: UserService that handles\nauthentication AND sends emails AND\nformats reports.\n\nFix: split into AuthService,\nEmailService, ReportFormatter.\n\nBenefit: easier to test, maintains\nseparation of concerns.",
    },
    {
      topic: "SOLID - Open/Closed",
      front:
        "What is the Open/Closed Principle?\n\nHow do you achieve it in practice?",
      back: "Open for extension, closed for\nmodification.\n\nNew behavior added by extending\n(subclass, interface impl, decorator)\nnot by changing existing code.\n\nExample: payment processing.\nPaymentProcessor interface with\nCreditCardPayment, PayPalPayment, etc.\nAdding Bitcoin: new class, zero changes\nto existing code.\n\nAchieve via: Strategy pattern,\ninterfaces, plugins.",
    },
    {
      topic: "SOLID - Liskov Substitution",
      front:
        "What is the Liskov Substitution\nPrinciple?\n\nClassic violation example?",
      back: "Subtypes must be substitutable for\ntheir base types without breaking\ncorrectness.\n\nClassic violation: Square extends\nRectangle. setWidth() on Rectangle\nshould not change height, but Square\nmust change both -> breaks expectations.\n\nFix: use an interface Shape with\narea() rather than inheritance.\n\nTest: does the subclass honor ALL\ncontracts of the parent?",
    },
    {
      topic: "SOLID - Interface Segregation",
      front:
        "What is the Interface Segregation\nPrinciple?\n\nWhat problem does it solve?",
      back: "Clients should not be forced to\ndepend on interfaces they don't use.\n\nBad: one fat interface Worker with\nwork(), eat(), sleep().\nRobot implements Worker but can't eat().\n\nGood: split into Workable, Feedable,\nSleepable. Robot implements only\nWorkable.\n\nBenefit: reduces coupling, prevents\nempty/stub method implementations.",
    },
    {
      topic: "SOLID - Dependency Inversion",
      front:
        "What is the Dependency Inversion\nPrinciple?\n\nHow does it differ from dependency\ninjection?",
      back: "DIP: High-level modules should not\ndepend on low-level modules. Both\nshould depend on abstractions.\n\nBad: OrderService directly creates\n  MySQLDatabase instance.\nGood: OrderService depends on\n  IDatabase interface. Inject impl.\n\nDependency Injection is a TECHNIQUE\nto achieve DIP (constructor injection,\nsetter injection, DI container).\n\nDIP is the PRINCIPLE; DI is the\nIMPLEMENTATION.",
    },
    // ── Classic Design Problems ─────────────────────────────────────────────────
    {
      topic: "LLD: Parking Lot",
      front:
        "Design a parking lot system.\n\nWhat are the key classes,\nrelationships, and operations?",
      back: "Classes:\n- ParkingLot: floors[], capacity\n- ParkingFloor: spots[]\n- ParkingSpot: type(S/M/L), vehicle?\n- Vehicle: licensePlate, type\n- Ticket: entryTime, spot, vehicle\n- PaymentProcessor\n\nKey operations:\n- park(vehicle): find spot by type\n- unpark(ticket): free spot, calc fee\n- getAvailableSpots(type): count\n\nPatterns: Strategy (pricing),\nFactory (spot assignment),\nObserver (display board updates).",
    },
    {
      topic: "LLD: Elevator System",
      front:
        "Design an elevator system for\na building with 40 floors\nand 8 elevators.\n\nKey classes and scheduling approach?",
      back: "Classes:\n- ElevatorSystem: elevators[], dispatch()\n- Elevator: currentFloor, direction,\n  state(IDLE/MOVING/DOOR_OPEN), queue\n- Request: floor, direction\n- Button: InternalButton, ExternalButton\n\nScheduling:\n- SCAN (elevator): service requests in\n  current direction, then reverse.\n- Dispatch: assign to nearest elevator\n  moving toward the request.\n\nPatterns: State (elevator states),\nStrategy (scheduling algorithm),\nCommand (button requests).",
    },
    {
      topic: "LLD: Library Management",
      front:
        "Design a library management system.\n\nKey entities and operations?",
      back: "Classes:\n- Library: books[], members[]\n- Book: isbn, title, authors[], copies[]\n- BookCopy: id, status(AVAILABLE/LOANED)\n- Member: name, card, activeLoans[]\n- Loan: bookCopy, member, dueDate\n- Reservation: book, member, date\n\nOperations:\n- checkout(member, book): create Loan\n- return(loan): update status\n- reserve(member, book)\n- search(query): by title/author/isbn\n\nConstraints: max 5 active loans,\nlate fee calculation, hold queue.",
    },
    {
      topic: "LLD: Chess Game",
      front:
        "Design a chess game.\n\nWhat are the key classes\nand how do you model piece movement?",
      back: "Classes:\n- Game: board, players[2], turn, status\n- Board: squares[8][8], movePiece()\n- Piece (abstract): color, position\n  Subclasses: King, Queen, Rook,\n  Bishop, Knight, Pawn\n- Move: from, to, piece, captured?\n- Player: color, pieces[]\n\nEach Piece subclass implements:\n  getValidMoves(board): Position[]\n\nBoard validates:\n- Move is in piece's valid moves\n- Does not put own king in check\n- Special: castling, en passant, promo",
    },
    {
      topic: "LLD: Deck of Cards",
      front:
        "Design a generic deck of cards\nthat supports multiple card games.\n\nKey abstractions?",
      back: "Classes:\n- Card: suit, rank, faceUp\n- Deck: cards[], shuffle(), draw()\n- Hand: cards[], addCard(), score()\n- Game (abstract): deck, players[],\n  start(), playTurn(), isOver()\n\nBlackjackGame extends Game:\n  score(): sum with ace=1/11 logic\n  hit(), stand(), bust check\n\nPokerGame extends Game:\n  handRank(), compareHands()\n\nPatterns:\n- Template Method: Game defines\n  play flow, subclasses fill steps.\n- Factory: create deck for game type.",
    },
    {
      topic: "LLD: Vending Machine",
      front:
        "Design a vending machine.\n\nWhat states does it have?\nKey operations?",
      back: "States (State Pattern):\n- IdleState: waiting for coin\n- HasMoneyState: accepting selection\n- DispensingState: delivering item\n- SoldOutState: no items left\n\nClasses:\n- VendingMachine: state, inventory,\n  balance, insertCoin(), select(),\n  dispense(), returnChange()\n- Product: name, price, quantity\n- Inventory: products map\n\nOperations:\n- insertCoin(amount) -> update balance\n- selectProduct(id) -> check price, stock\n- dispense() -> decrement, return change",
    },
    {
      topic: "LLD: Online Bookstore (Amazon)",
      front:
        "Design the core of an online bookstore\n(simplified Amazon).\n\nKey classes and relationships?",
      back: "Classes:\n- User: name, email, addresses[], cart\n- Book: isbn, title, author, price, qty\n- Cart: items[], addItem(), getTotal()\n- CartItem: book, quantity\n- Order: items[], status, total, address\n- Payment: method, amount, status\n- Review: user, book, rating, text\n\nServices:\n- SearchService: search by title/author\n- OrderService: checkout(cart) -> order\n- PaymentService: process(order)\n- InventoryService: reserve/release\n\nPatterns: Observer (order status),\nStrategy (payment method).",
    },
    {
      topic: "LLD: Movie Ticket Booking",
      front:
        "Design a movie ticket booking system\n(BookMyShow / Fandango).\n\nKey classes and concurrency concerns?",
      back: "Classes:\n- Movie: title, duration, genre\n- Theater: screens[], location\n- Screen: seats[][], show\n- Show: movie, screen, time\n- Seat: row, number, type(VIP/Regular)\n- Booking: show, seats[], user, status\n- Payment: booking, amount, method\n\nConcurrency:\n- Two users select same seat -> race!\n- Solution: optimistic lock on seat\n  status. Or: temporary hold (5 min)\n  with TTL, then release if unpaid.\n\nPatterns: State (booking lifecycle),\nStrategy (pricing by seat type).",
    },
    {
      topic: "LLD: URL Shortener Classes",
      front:
        "Design the class structure for\na URL shortener service.\n\nKey components and algorithms?",
      back: "Classes:\n- URLShortener: encode(), decode()\n- URLMapping: shortCode, longUrl,\n  createdAt, expiresAt, userId\n- URLStore (interface): save(), get()\n  Impls: InMemoryStore, DBStore\n- CodeGenerator: generate(longUrl)\n  Options: base62(counter), MD5 + take\n  first 7 chars, random + collision check\n\nServices:\n- AnalyticsService: track clicks\n- ExpirationService: cleanup expired\n\nBase62: [a-zA-Z0-9], 62^7 = 3.5T codes.",
    },
    {
      topic: "LLD: Rate Limiter",
      front: "Design a rate limiter class.\n\nWhat algorithms can you use?",
      back: "Algorithms:\n1. Token Bucket: tokens refill at rate R,\n   max burst B. Each request takes 1 token.\n2. Sliding Window Log: store timestamp\n   per request. Count in last N seconds.\n3. Sliding Window Counter: hybrid of\n   fixed window + weighted previous.\n4. Leaky Bucket: queue + fixed drain rate.\n\nClass:\n- RateLimiter: isAllowed(clientId)\n- TokenBucket: tokens, lastRefill, rate\n- SlidingWindowLog: timestamps deque\n\nDistributed: Redis + Lua script for\natomic check-and-decrement.",
    },
    {
      topic: "LLD: File System",
      front:
        "Design an in-memory file system.\n\nWhat data structure and key operations?",
      back: "Classes:\n- FSNode (abstract): name, parent\n- File extends FSNode: content, size\n- Directory extends FSNode:\n  children: Map<string, FSNode>\n\nKey methods:\n- mkdir(path): create directory chain\n- touch(path): create file\n- ls(path): list children\n- cat(path): read file content\n- write(path, content): write to file\n- rm(path): remove file/dir\n- find(path, name): search recursively\n\nComposite Pattern: Directory contains\nFSNodes (files or other directories).",
    },
    // ── Design Principles ───────────────────────────────────────────────────────
    {
      topic: "Composition vs Inheritance",
      front:
        "When should you prefer composition\nover inheritance?\n\nGive an example.",
      back: "Prefer composition when:\n- 'Has-a' relationship, not 'is-a'\n- Need to combine behaviors at runtime\n- Avoid fragile base class problem\n- Need multiple behavior sources\n\nExample: Duck.\nInheritance: FlyingDuck, SwimmingDuck,\n  FlyingSwimmingDuck (explosion!)\n\nComposition:\nclass Duck {\n  flyBehavior: FlyBehavior\n  swimBehavior: SwimBehavior\n}\nAssign behaviors at runtime.\n\nRule of thumb: prefer composition.\nUse inheritance for true type hierarchies.",
    },
    {
      topic: "Coupling vs Cohesion",
      front: "What is coupling? What is cohesion?\n\nWhat should you aim for?",
      back: "Coupling: degree of dependency between\nmodules. Tight coupling = changes\nripple across modules.\n\nCohesion: degree to which elements\nwithin a module belong together.\nHigh cohesion = module does one thing\nwell.\n\nGoal: LOW coupling + HIGH cohesion.\n\nAchieve via:\n- Interfaces/abstractions at boundaries\n- Single Responsibility Principle\n- Dependency injection\n- Event-driven communication",
    },
    {
      topic: "UML Class Diagram Basics",
      front:
        "What are the key UML class diagram\nrelationships to know for interviews?",
      back: "1. Association: A uses B (solid line)\n   User -> Order\n\n2. Aggregation: A has B, B can exist\n   alone (open diamond)\n   Team <>-- Player\n\n3. Composition: A owns B, B cannot\n   exist without A (filled diamond)\n   House *-- Room\n\n4. Inheritance: A is-a B (triangle)\n   Dog -|> Animal\n\n5. Interface impl: (dashed + triangle)\n   ArrayList --|> List\n\n6. Dependency: A temporarily uses B\n   (dashed arrow)",
    },
    {
      topic: "LLD: Chat System Classes",
      front:
        "Design the class structure for\na real-time chat system.\n\nKey entities and message flow?",
      back: "Classes:\n- User: id, name, status(online/offline)\n- Chat (abstract): id, participants[]\n  -> PrivateChat, GroupChat\n- Message: sender, content, timestamp,\n  status(SENT/DELIVERED/READ)\n- MessageStore: save(), getHistory()\n\nServices:\n- ChatService: sendMessage(), getChats()\n- NotificationService: push to offline\n- PresenceService: track online status\n\nMessage flow:\n1. Client sends to ChatService\n2. Persist to MessageStore\n3. Push to recipient via WebSocket\n4. If offline -> NotificationService",
    },
    {
      topic: "LLD: Logger / Logging Framework",
      front: "Design a logging framework.\n\nKey classes and patterns used?",
      back: "Classes:\n- Logger: name, level, log(level, msg)\n- LogLevel: DEBUG, INFO, WARN, ERROR\n- LogHandler (abstract): handle(record)\n  -> ConsoleHandler, FileHandler,\n     RemoteHandler\n- LogFormatter: format(record) -> string\n  -> JSONFormatter, TextFormatter\n- LogRecord: timestamp, level, message,\n  context\n\nPatterns:\n- Singleton: Logger.getLogger(name)\n- Chain of Responsibility: handlers\n- Strategy: formatter is pluggable\n- Builder: Logger.builder().handler().\n  formatter().level().build()",
    },
    {
      topic: "LLD Interview Approach",
      front:
        "What is the step-by-step approach\nfor answering LLD interview questions?",
      back: "1. CLARIFY requirements (5 min):\n   - Scope: which features in/out?\n   - Scale: single machine or distributed?\n   - Users: who and how many?\n\n2. IDENTIFY core objects (5 min):\n   - Nouns -> classes\n   - Verbs -> methods\n   - Relationships: has-a, is-a\n\n3. DESIGN class diagram (10 min):\n   - Interfaces, abstract classes\n   - Apply SOLID and design patterns\n\n4. IMPLEMENT key methods (10 min):\n   - Core algorithm / business logic\n   - Error handling, edge cases\n\n5. DISCUSS trade-offs and extensions.",
    },
  ],
};
