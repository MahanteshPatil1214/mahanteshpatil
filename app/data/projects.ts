export type Metric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  discipline: string;
  year: string;
  role: string;
  summary: string;
  challenge: string;
  response: string;
  stack: string[];
  metrics: Metric[];
  link: string;
  linkLabel: string;
  image?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "keylo",
    index: "01",
    title: "Keylo",
    discipline: "AI · Real Estate",
    year: "2025",
    role: "Full-stack Engineer",
    summary:
      "AI-powered real estate sales platform with a multilingual buyer assistant, role-based access control, and containerized full-stack deployment.",
    challenge:
      "Real estate sales teams needed a unified platform to manage leads, property visits, and bookings across buyers, sales executives, and admins—with multilingual AI support for buyers and strict role-based access for staff.",
    response:
      "Built a full-stack real estate sales platform with FastAPI, SQLAlchemy 2.0, and React 19, organized into 19 backend modules and 120+ API routes. Integrated a Groq-powered AI assistant for multilingual buyer chat (English, Hindi, Gujarati) with escalation handoffs to sales executives. Implemented role-based access control for 3 roles (Buyer, Sales Executive, Admin) using JWT claims, FastAPI dependencies, and bcrypt password hashing. Wrote 224 backend tests (all passing) with Pytest, plus 7 end-to-end scripts covering login, admin, sales, and buyer flows. Containerized the full stack with Docker Compose (backend, PostgreSQL, frontend) and an idempotent seed script that loads 125 leads, 470 visit slots, and 42 bookings in one command.",
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "PostgreSQL",
      "SQLite",
      "Groq API",
      "JWT",
      "Docker",
      "Pytest",
    ],
    metrics: [
      { value: "120+", label: "API routes" },
      { value: "224", label: "backend tests" },
      { value: "Docker", label: "containerized" },
    ],
    link: "https://github.com/MahanteshPatil1214/Keylo",
    linkLabel: "View Keylo on GitHub",
    image: "/data/Keylo.png",
  },
  {
    id: "crime-analytics",
    index: "02",
    title: "Crime Analytics Platform",
    discipline: "Distributed systems · Data",
    year: "2025",
    role: "Backend + Platform Engineer",
    summary:
      "A 12-service investigation platform spanning cases, persons of interest, criminal networks, financial trails, and statutory reports.",
    challenge:
      "Investigative data lived across cases, people, accounts, and relationships. Analysts needed one coherent view without collapsing every domain into a single service or a single database.",
    response:
      "Twelve Spring Boot microservices with explicit ownership, Kafka event streams for cross-domain workflows, PostGIS for spatial incident queries, and Neo4j for relationship-first exploration. Each service can evolve without renegotiating the whole platform.",
    stack: ["Java 21", "Spring Boot", "Spring Cloud", "Kafka", "PostGIS", "Neo4j", "Kubernetes"],
    metrics: [
      { value: "12", label: "Spring Boot services" },
      { value: "Kafka", label: "event backbone" },
      { value: "Graph", label: "relationship queries" },
    ],
    link: "https://github.com/MahanteshPatil1214/crime-analytics-platform",
    linkLabel: "View Crime Analytics Platform on GitHub",
    image: "/data/Crime%20Analytics%20Platform%20Dashboard.png",
  },
  {
    id: "veridoc-ai",
    index: "03",
    title: "VeriDoc-AI",
    discipline: "AI · Document intelligence",
    year: "2026",
    role: "Backend + AI Engineer",
    summary:
      "A grounded document intelligence engine with page-level citations and local-first inference over private documents.",
    challenge:
      "Teams need answers over long documents without sending sensitive text to a hosted model — and without losing the passage that supports each answer.",
    response:
      "Java 21 and Spring AI handle ingestion and retrieval over PostgreSQL pgvector, while Ollama keeps inference local. Every answer resolves back to a page and paragraph, so the output can be checked rather than trusted.",
    stack: ["Java 21", "Spring AI", "PostgreSQL", "pgvector", "Ollama", "React"],
    metrics: [
      { value: "Local", label: "inference path" },
      { value: "Page-level", label: "citations" },
      { value: "Spring", label: "native RAG" },
    ],
    link: "https://github.com/MahanteshPatil1214/VeriDoc-AI",
    linkLabel: "View VeriDoc-AI on GitHub",
    image: "/data/Veridoc.png",
  },
  {
    id: "callora",
    index: "04",
    title: "Callora",
    discipline: "AI · Voice",
    year: "2025",
    role: "AI Platform Engineer",
    summary:
      "A low-latency autonomous voice agent platform built around a full-duplex agent loop, tool use, and recoverable sessions.",
    challenge:
      "Autonomous voice needs a response loop fast enough to feel human while keeping tool calls, interruption handling, and session state coherent across reconnects.",
    response:
      "A FastAPI and WebSocket gateway streams audio and agent output, LangGraph manages turn-level tool use, and Redis holds session state so a dropped connection does not reset the conversation.",
    stack: ["FastAPI", "LangGraph", "Redis", "WebSockets", "Python", "React"],
    metrics: [
      { value: "Full-duplex", label: "audio loop" },
      { value: "Redis", label: "session state" },
      { value: "Tool-use", label: "turn control" },
    ],
    link: "https://github.com/MahanteshPatil1214",
    linkLabel: "View Mahantesh Patil's repositories on GitHub",
    image: "/data/Callora.png",
  },
];

export const focusPoints = [
  {
    index: "01",
    title: "Technical discipline",
    body: "Clean domain boundaries, explicit failure states, and observability that survives production. Low latency is a design decision, not an afterthought.",
  },
  {
    index: "02",
    title: "Product thinking",
    body: "Scope, trade-offs, and interface decisions made from the user's side of the system. The last 10% is where the product becomes legible.",
  },
];

export const principles = [
  "Clean boundaries",
  "Low latency",
  "Verifiable outcomes",
];
