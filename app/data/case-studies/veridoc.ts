export type Tradeoff = {
  decision: string;
  options: string;
  chosen: string;
  why: string;
};

export type Component = {
  name: string;
  purpose: string;
  responsibilities: string[];
};

export type TechGroup = {
  layer: string;
  items: string[];
};

export type VeridocCaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  summary: string;
  problemStatement: string;
  githubLink: string;
  githubLabel: string;
  image: string;
  techStack: TechGroup[];
  star: {
    situation: string;
    task: {
      role: string;
      goal: string;
    };
    action: {
      architecture: string;
      backendPackages: Array<{ name: string; responsibility: string }>;
      capabilities: string[];
      engineeringDecisions: string[];
    };
    result: {
      metrics: Array<{ value: string; label: string }>;
      highlights: string[];
    };
  };
  systemDesign: {
    title: string;
    intro: string;
    diagrams: Array<{
      src: string;
      alt: string;
      caption: string;
    }>;
    diagramNote: string;
  };
  tradeoffs: Tradeoff[];
  components: Component[];
  lessons: string[];
};

export const veridoc: VeridocCaseStudy = {
  id: "veridoc-ai",
  title: "VeriDoc AI",
  subtitle: "Evidence-Grounded Document Intelligence & RAG",
  year: "2026",
  role: "Full-Stack / AI Engineer",
  summary:
    "A privacy-first, local-development RAG system that lets users upload PDFs, ask natural-language questions, and receive answers grounded strictly in their source documents — with inline, page-level citations and an explicit refusal when no supporting evidence exists.",
  problemStatement:
    "Enterprise LLMs hallucinate because they are treated as knowledge bases. Users need trustworthy document Q&A where every answer is backed by verifiable evidence from their own uploaded PDFs — and where the system says 'I couldn't find that' instead of guessing.",
  githubLink: "https://github.com/MahanteshPatil1214/VeriDoc-AI",
  githubLabel: "View VeriDoc AI on GitHub",
  image: "/data/Veridoc.png",
  techStack: [
    {
      layer: "Frontend",
      items: [
        "React 19",
        "TypeScript 5",
        "Vite",
        "Tailwind CSS",
        "TanStack Query",
        "Zustand",
        "React Router",
        "Server-Sent Events (SSE)",
      ],
    },
    {
      layer: "Backend",
      items: [
        "Java 21",
        "Spring Boot 3.4",
        "Spring AI",
        "Spring Security (JWT)",
        "Spring Data JPA",
        "Hibernate",
        "Bean Validation",
        "Flyway",
        "Spring Boot Actuator",
        "Micrometer",
        "Apache Tika",
      ],
    },
    {
      layer: "Database & Vectors",
      items: [
        "PostgreSQL 17",
        "pgvector (HNSW)",
        "PostgreSQL tsvector + GIN (full-text / BM25)",
        "Flyway migrations",
      ],
    },
    {
      layer: "Caching & Rate Limiting",
      items: ["Redis 7 Alpine (rate-limit counters only, noeviction, no persistence)"],
    },
    {
      layer: "AI Providers",
      items: [
        "Google Gemini (gemini-embedding-001, 768-dim) — embeddings",
        "Groq (openai/gpt-oss-120b or LLaMA) — chat / grounded answers & query rewriting",
        "Both API keys backend-only; never exposed to the browser",
      ],
    },
    {
      layer: "DevOps & Quality",
      items: [
        "Docker Compose",
        "Nginx (reverse proxy, CORS elimination)",
        "GitHub Actions CI",
        "Testcontainers (pgvector)",
        "Maven",
      ],
    },
  ],
  star: {
    situation:
      "Enterprise RAG systems commonly hallucinate because the LLM answers from parametric memory instead of retrieved evidence. Users need a document-intelligence platform where answers are strictly grounded in uploaded PDFs, carry page-level citations, and the system explicitly refuses when evidence is missing — all with multi-tenant isolation, streaming chat, and production-grade security.",
    task: {
      role: "Full-Stack / AI Engineer (backend & integration lead)",
      goal:
        "Build a production-quality RAG application that treats the LLM strictly as a reasoning/synthesis engine over verified document evidence.",
    },
    action: {
      architecture:
        "Designed and built a modular monolith with backend packages by aggregate (auth, document, conversation, rag, security, monitoring, common), each following API → Application → Domain → Infrastructure layering.",
      backendPackages: [
        { name: "auth", responsibility: "Registration, login, refresh, /me; JWT access + rotating refresh tokens" },
        { name: "document", responsibility: "Upload, validation, listing, status, delete/retry; ingestion pipeline" },
        { name: "ingestion", responsibility: "PDF extraction (Apache Tika), token-aware chunking, duplicate SHA-256 detection" },
        { name: "conversation", responsibility: "Threads, attach/detach documents, message history, multi-doc chat" },
        { name: "rag", responsibility: "Retrieval, prompt assembly, LLM calls, citations, admin debugger" },
        { name: "security", responsibility: "JWT filter, current-user resolution, rate limiting, error taxonomy" },
        { name: "monitoring", responsibility: "Actuator health/readiness/metrics, structured logging, correlation IDs" },
      ],
      capabilities: [
        "Hybrid retrieval: pgvector cosine (<=>) + tsvector BM25, merged & re-ranked, relevance-threshold filtered.",
        "Grounded generation via Groq; embeddings via Google Gemini (768-dim, pinned to pgvector index).",
        "Streaming answers via SSE (token* → citations → done/error events).",
        "Inline citation pills resolved against actual retrieved evidence; invalid markers never create sources.",
        "Soft-delete with DELETED status; delete listener prunes chunks/versions so vector data never outlives its document.",
        "JWT with token_version; password change rotates and revokes refresh tokens.",
        "Redis-backed rate limiting on login, upload, chat, and processing.",
      ],
      engineeringDecisions: [
        "Modular monolith over microservices — avoid unnecessary microservices; low operational overhead, simple deploys, clear module boundaries.",
        "PostgreSQL + pgvector over SQLite — native vector/HNSW support, concurrency, row-level ownership filtering, multi-tenant readiness.",
        "Groq for chat (ultra-low latency) + Google Gemini for embeddings (768-dim).",
        "REST for CRUD resources; SSE (not WebSockets) for streaming chat answers.",
        "JWT (access + rotating refresh) over session cookies; keys backend-only.",
        "Flyway for versioned schema; no Hibernate auto-DDL in production.",
      ],
    },
    result: {
      metrics: [
        { value: "130+", label: "Backend unit tests" },
        { value: "Testcontainers", label: "pgvector integration tests" },
        { value: "0", label: "Frontend AI key exposure" },
        { value: "SSE", label: "Streaming chat protocol" },
      ],
      highlights: [
        "Verifiable citations and explicit no-evidence refusal — core hallucination guardrail.",
        "Owner-isolated multi-tenancy enforced in SQL; no existence leakage (404 for foreign resources).",
        "Local-first Docker Compose stack (PostgreSQL + pgvector, Redis, backend, frontend) with CI on GitHub Actions.",
        "Complete API surface across auth, documents, conversations, chat/streaming, RAG debug, feedback, and monitoring.",
      ],
    },
  },
  systemDesign: {
    title: "System Design & Data Flow",
    intro:
      "VeriDoc AI is a modular monolith where the LLM is strictly a reasoning engine over retrieved document evidence. The diagram below shows the streaming RAG pipeline and how citations flow from retrieved chunks back to the user.",
    diagrams: [
      {
        src: "/data/veridoc/streaming_and_citations_flow.png",
        alt: "VeriDoc AI streaming and citations flow",
        caption: "Streaming RAG pipeline: user query → hybrid retrieval (pgvector + tsvector) → grounded prompt assembly → Groq LLM → SSE stream with inline citation pills → done/error events.",
      },
    ],
    diagramNote:
      "Diagram sourced from data/veridoc/. All AI provider keys remain backend-only; the frontend calls only the backend API over SSE.",
  },
  tradeoffs: [
    {
      decision: "Architecture style",
      options: "Microservices vs Monolith",
      chosen: "Modular Monolith",
      why:
        "Engineering principle: avoid unnecessary microservices. Single deployable, clear package boundaries, no network latency/service-discovery complexity.",
    },
    {
      decision: "Database",
      options: "SQLite vs PostgreSQL",
      chosen: "PostgreSQL + pgvector",
      why:
        "Native vector/HNSW indexing, concurrency, row-level owner filtering, multi-tenant readiness; pgvector is unavailable in SQLite.",
    },
    {
      decision: "LLM (chat) provider",
      options: "Groq vs OpenAI",
      chosen: "Groq",
      why:
        "Ultra-low-latency token generation for streaming answers; OpenAI-compatible via Spring AI.",
    },
    {
      decision: "Embeddings provider",
      options: "Google Gemini vs others",
      chosen: "Google Gemini (gemini-embedding-001, 768-dim)",
      why:
        "High-dimensional embeddings; pgvector index pinned to this embedding space/dimension.",
    },
    {
      decision: "Real-time streaming",
      options: "SSE vs WebSockets",
      chosen: "SSE",
      why:
        "Simple GET with Authorization header, easy reconnect/backpressure, pairs naturally with REST; no persistent socket state.",
    },
    {
      decision: "Auth",
      options: "Session cookies vs JWT",
      chosen: "JWT (access + rotating refresh)",
      why:
        "Stateless access tokens suit the SPA; refresh tokens in Redis are revocable on password change via token_version.",
    },
    {
      decision: "API keys",
      options: "Frontend vs Backend",
      chosen: "Backend-only",
      why:
        "Groq and Gemini keys never reach the browser; frontend calls only the backend API.",
    },
    {
      decision: "Caching / rate limit",
      options: "In-memory vs Redis",
      chosen: "Redis",
      why:
        "Shared rate-limit counters across instances; noeviction, counters only (no persistence).",
    },
    {
      decision: "Schema management",
      options: "Hibernate auto-DDL vs Flyway",
      chosen: "Flyway",
      why:
        "Version-controlled, reproducible schema; no production auto-DDL.",
    },
  ],
  components: [
    {
      name: "Frontend SPA",
      purpose: "React 19 + TypeScript chat workspace",
      responsibilities: [
        "Sidebar (chats, documents, settings)",
        "Chat pane with streaming + citations",
        "Documents drawer (drag-drop upload, live status polling, attach/detach)",
        "Hand-rolled Markdown renderer",
        "SSE client via fetch",
      ],
    },
    {
      name: "Auth",
      purpose: "Authentication & authorization",
      responsibilities: [
        "Registration, login, refresh, /me",
        "JWT access + rotating refresh tokens",
        "Role-based access",
        "Owner isolation",
      ],
    },
    {
      name: "Document",
      purpose: "Document management & ingestion",
      responsibilities: [
        "Upload, validation (extension, MIME, magic bytes, size, page caps)",
        "Listing, status polling, delete/retry",
        "Ingestion pipeline orchestration",
      ],
    },
    {
      name: "Ingestion",
      purpose: "PDF processing pipeline",
      responsibilities: [
        "Apache Tika extraction",
        "Text normalization, page/section detection",
        "Token-aware chunking",
        "SHA-256 duplicate detection",
        "Batch embedding",
      ],
    },
    {
      name: "Conversation",
      purpose: "Multi-turn chat threads",
      responsibilities: [
        "Create/rename/delete conversations",
        "Attach/detach documents",
        "Message history, multi-document chat",
        "Context window management",
      ],
    },
    {
      name: "RAG",
      purpose: "Retrieval & grounded generation",
      responsibilities: [
        "Hybrid retrieval (pgvector + tsvector)",
        "Query rewriting",
        "Grounded prompt assembly",
        "Groq LLM calls",
        "Citation resolution",
        "No-evidence refusal",
        "RAG debugger",
      ],
    },
    {
      name: "AI Providers",
      purpose: "LLM & embedding services",
      responsibilities: [
        "Groq for chat (grounded answers, rewriting)",
        "Google Gemini for 768-dim embeddings",
        "Both backend-only",
      ],
    },
    {
      name: "Database",
      purpose: "Source of truth",
      responsibilities: [
        "PostgreSQL 17 + pgvector",
        "Users, documents, versions, chunks (vector(768)), conversations, messages, citations, feedback",
        "Flyway migrations",
      ],
    },
    {
      name: "Cache / Rate Limit",
      purpose: "Redis 7",
      responsibilities: [
        "Rate-limit counters for login, upload, chat, processing",
        "Session verification support",
      ],
    },
    {
      name: "Monitoring",
      purpose: "Observability",
      responsibilities: [
        "Spring Boot Actuator health/readiness/metrics",
        "Micrometer",
        "Structured logging, correlation IDs",
      ],
    },
  ],
  lessons: [
    "Refusal is a product feature, not a failure. The core tenet is 'if the answer cannot be proven by the uploaded documents, the system must refuse rather than guess.' Building an explicit no-evidence refusal (and citation validation against actual retrieved chunks) proved more valuable than forcing a plausible answer every time.",
    "Keep AI credentials backend-only. Groq and Gemini API keys never reach the browser. The frontend calls only the backend API, so provider keys stay in backend environment variables and are never shipped in client-side bundles.",
    "A modular monolith beats microservices for a small team. One deployable with clear package boundaries (auth, document, ingestion, conversation, rag, security, monitoring) avoided network latency, service discovery, and distributed-tracing complexity while keeping concerns separated.",
    "Enforce multi-tenant isolation in SQL, not just in application code. Every retrieval and access query filters by the authenticated owner directly in SQL; foreign resources surface as 404 NOT FOUND (no existence leakage). Application-layer checks alone are not enough for user data isolation.",
    "Hybrid retrieval beats semantic-only search. Combining pgvector HNSW cosine similarity with PostgreSQL tsvector full-text search (BM25-equivalent ranking), then merging and re-ranking candidates, gives better relevance than either vector or keyword search alone.",
    "Treat retrieved content as evidence, not instructions. Prompt injection protection starts with the rule that document text is untrusted data — never executable instructions. System instructions must always override content inside PDFs.",
    "Delete must cascade to vectors — soft delete isn't enough. When a document is marked DELETED, an application listener prunes derived chunks and versions so vector data never outlives its document. Late ingestion pipeline steps are no-ops once deleted, so a failed/resurrected step cannot un-delete data.",
    "Test system boundaries with real dependencies. Testcontainers against a real pgvector container, plus deterministic chat/embedding stubs, covered the critical boundaries: auth, ownership isolation, file security, document lifecycle (delete/retry), chat/streaming contract, prompt injection, query rewriting, and the RAG evaluation gate.",
  ],
};
