export type Tradeoff = {
  decision: string;
  options: string;
  chosen: string;
  why: string;
};

export type Component = {
  name: string;
  responsibility: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type KeyloCaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  summary: string;
  problemStatement: string;
  liveLink?: string;
  githubLink: string;
  githubLabel: string;
  image: string;
  techStack: Array<{ layer: string; technology: string; purpose: string }>;
  star: {
    situation: {
      context: string;
      stats: Array<{ label: string; value: string }>;
      outcomes: Array<{ label: string; value: string }>;
    };
    task: {
      role: string;
      goal: string;
      bullets: string[];
    };
    action: {
      architecture: string;
      backendModules: Array<{ name: string; description: string }>;
      capabilities: string[];
      engineeringDecisions: string[];
    };
    result: {
      metrics: Metric[];
      note: string;
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

export const keylo: KeyloCaseStudy = {
  id: "keylo",
  title: "Keylo",
  subtitle: "Conversational real-estate sales & site-visit automation",
  year: "2025",
  role: "Sole Full-Stack Engineer",
  summary:
    "A conversational AI platform that helps real-estate developers respond to buyer enquiries instantly, answer questions using approved project fact sheets, and book site visits — with multilingual AI assistance and role-based sales workflows.",
  problemStatement:
    "Real estate developer's AI lead-response and site-visit booking assistant",
  liveLink: undefined,
  githubLink: "https://github.com/MahanteshPatil1214/KEYLO",
  githubLabel: "View Keylo on GitHub",
  image: "/data/Keylo.png",
  techStack: [
    { layer: "Frontend", technology: "React 19.3 · TypeScript · Vite 8.x", purpose: "Responsive, type-safe web application" },
    { layer: "Styling", technology: "Tailwind CSS 4.x", purpose: "Utility-first design system, semantic design tokens" },
    { layer: "UI libraries", technology: "Lucide · Framer Motion · React Hook Form · Zod · TanStack Query", purpose: "Icons, animation, forms, validation, data fetching" },
    { layer: "Backend", technology: "Python 3.12 / 3.13 · FastAPI 0.136", purpose: "Async REST API and business logic" },
    { layer: "ORM / Migrations", technology: "SQLAlchemy 2.0 · Pydantic v2 · Alembic", purpose: "Database mapping, validation, version-controlled schema" },
    { layer: "Database", technology: "SQLite (dev) · PostgreSQL 16 (prod via Docker)", purpose: "Normalized relational schema with foreign keys and constraints" },
    { layer: "Authentication", technology: "JWT (HS256) · Argon2", purpose: "Stateless sessions, role-based access control" },
    { layer: "AI / LLM", technology: "Groq API (openai/gpt-oss-120b)", purpose: "Fast, fact-grounded multilingual chat with controlled tool calls" },
    { layer: "Testing", technology: "Pytest · Playwright / Puppeteer", purpose: "Unit, integration, security, and headless browser verification" },
    { layer: "Containerization", technology: "Docker Compose", purpose: "Reproducible PostgreSQL + backend + frontend stack" },
  ],
  star: {
    situation: {
      context:
        "A residential real-estate developer receives roughly 3,000 leads per month from property portals, social-media ads, the website, and a hoarding phone number. Leads were landing in inboxes and spreadsheets, and follow-up was delayed.",
      stats: [
        { label: "Median first response time", value: "14 hours" },
        { label: "Leads not reached within 48 hours", value: "35%" },
        { label: "Lead-to-site-visit rate", value: "6%" },
      ],
      outcomes: [
        { label: "First response time", value: "Under 5 minutes" },
        { label: "Unreached in 48 hours", value: "Under 5%" },
        { label: "Lead-to-visit rate", value: "6% → 8% within three months" },
      ],
    },
    task: {
      role:
        "Sole full-stack developer responsible for design, implementation, and delivery of the MVP.",
      goal:
        "Build an AI-powered lead-response and site-visit booking assistant (not a full CRM).",
      bullets: [
        "Capture leads and retain their source.",
        "Assist buyers through fact-grounded AI conversations in English, Hindi, and Gujarati.",
        "Collect buyer budget and requirements.",
        "Check real availability and book site visits safely (no double-booking).",
        "Hand serious buyers to a named sales executive with chat context and an AI-generated summary.",
        "Provide basic source and conversion analytics.",
      ],
    },
    action: {
      architecture:
        "Modular monolith — one FastAPI application, one relational database (SQLite in dev, PostgreSQL in production/Docker), with business capabilities organized into independent domain modules and clear boundaries between API routes, services, and data access. Microservices were rejected for the MVP to keep deployment manageable and avoid distributed-transaction overhead.",
      backendModules: [
        { name: "auth", description: "JWT sign-in, token handling, refresh-token revocation (JTI revocation list)" },
        { name: "users", description: "Profiles, roles (ADMIN, SALES_EXECUTIVE, BUYER), access rules" },
        { name: "projects + project_facts", description: "Projects and approved, publishable RERA fact sheets" },
        { name: "leads", description: "Lead intake, source tags, duplicate checks, assignment, status, DPDP consent/opt-out" },
        { name: "conversations + messages", description: "Conversation lifecycle and message history" },
        { name: "ai_assistant", description: "Groq provider adapter, fact-grounded system prompts, tool definitions, backend validation" },
        { name: "bookings", description: "Visit slots, availability, transactional booking, cancellation, visit outcomes" },
        { name: "handoffs", description: "Named executive assignment, AI-generated conversation summary, status tracking" },
        { name: "notifications", description: "In-app notifications and 24h / 2h visit reminders" },
        { name: "dashboard", description: "Aggregated operational and source metrics (conversion funnel, CPL, CPV)" },
        { name: "follow_ups, settings", description: "Follow-up scheduling and system configuration" },
      ],
      capabilities: [
        "Multilingual conversational AI strictly grounded in approved project fact sheets, with pricing-restriction guards (no price quoting, no guessing — offers handoff when a fact is missing).",
        "Sales Executive workspace: real-time lead queues, priority-tiered follow-ups (Due Today / Overdue / Upcoming), AI-to-human handoffs.",
        "Site Visit Lifecycle Automation: self-serve calendar booking, project-level capacity enforcement, automated 24h and 2h reminders, visit status management (Confirmed / Completed / Cancelled / No-Show).",
        "Executive Admin Console: live conversion-funnel KPIs, SVG spline trend charts, RERA fact-sheet moderation, immutable audit log.",
        "Role-Based Access Control (RBAC) with strict data isolation across roles.",
        "Marketing spend attribution: source-level tracking (Google Ads, Meta Ads, Portals, Referrals) with automatic CPL and CPV calculations.",
        "DPDP consent capture at registration plus a buyer opt-out mechanism that halts all contact for opted-out leads.",
      ],
      engineeringDecisions: [
        "Provider abstraction around Groq so another LLM provider can be swapped in without rewriting conversation logic.",
        "Backend-validated tool calls — the model never executes actions directly; availability and booking are revalidated transactionally in the backend.",
        "Alembic migrations for all schema changes; no manual DDL.",
        "JWT refresh-token revocation for server-side session control.",
        "Three distinct portal layouts (Buyer /buyer, Sales /sales, Admin /admin) with role-based redirection after login.",
      ],
    },
    result: {
      metrics: [
        { value: "229", label: "Pytest unit/integration/security/AI tests passing" },
        { value: "120+", label: "API routes across 19 backend modules" },
        { value: "0", label: "Double-booking incidents (concurrent-request verified)" },
        { value: "3", label: "Portal layouts (Buyer, Sales, Admin)" },
      ],
      note:
        "Brief targets (first response < 5 min; unreached-in-48h < 5%; lead-to-visit 6% → 8%) are goals from the brief, not claimed production results. A demo environment with an idempotent seed script populates a realistic 1-month Ahmedabad environment (45 buyers, 3 projects, 125 leads, visit slots, bookings, follow-ups, marketing spend).",
    },
  },
  systemDesign: {
    title: "System Design & Data Flow",
    intro:
      "Keylo is organized as a modular monolith with three portal layouts — Buyer, Sales Executive, and Admin — all backed by a single FastAPI application and relational database. The diagrams below show the system architecture and the three primary data flows.",
    diagrams: [
      {
        src: "/data/Keylo/system_architecture_overview.png",
        alt: "Keylo system architecture overview",
        caption: "System architecture overview — modular monolith with FastAPI, SQLAlchemy/Alembic, Groq LLM adapter, and PostgreSQL/SQLite storage.",
      },
      {
        src: "/data/Keylo/flow1_buyer_enquiry_to_ai_conversation.png",
        alt: "Buyer enquiry to AI conversation flow",
        caption: "Flow 1 — Buyer enquiry to AI conversation: lead intake, multilingual fact-grounded chat, and response.",
      },
      {
        src: "/data/Keylo/flow2_site_visit_booking.png",
        alt: "Site visit booking flow",
        caption: "Flow 2 — Site visit booking: availability check, transactional slot booking, and 24h/2h reminders.",
      },
      {
        src: "/data/Keylo/flow3_human_handoff.png",
        alt: "Human handoff flow",
        caption: "Flow 3 — Human handoff: AI-to-sales-executive escalation with conversation summary and context transfer.",
      },
    ],
    diagramNote:
      "Diagrams sourced from data/Keylo/. All flows enforce backend validation — the AI model never executes actions directly; availability and booking are revalidated transactionally.",
  },
  tradeoffs: [
    {
      decision: "Architectural style",
      options: "Microservices vs. modular monolith",
      chosen: "Modular monolith",
      why:
        "Single team, shared database, simpler local testing and deployment; clear module boundaries allow future extraction if scale justifies it.",
    },
    {
      decision: "Database (dev vs prod)",
      options: "Single database everywhere vs. SQLite dev / PostgreSQL prod",
      chosen: "SQLite dev / PostgreSQL prod",
      why:
        "Fast local iteration with SQLite; production-grade PostgreSQL via Docker Compose; Alembic abstracts dialect differences.",
    },
    {
      decision: "LLM provider",
      options: "Groq, OpenAI, Anthropic, self-hosted",
      chosen: "Groq (openai/gpt-oss-120b) via provider abstraction",
      why:
        "Ultra-low latency (~200ms) critical for real-time chat; free tier sufficient for prototype; abstraction lets us swap providers without rewriting conversation logic.",
    },
    {
      decision: "Chat transport",
      options: "REST polling vs. WebSockets",
      chosen: "REST polling (MVP)",
      why:
        "Sufficient at demo scale; avoids WebSocket infrastructure complexity; WebSockets documented as a post-MVP item.",
    },
    {
      decision: "Notification delivery",
      options: "Real email/SMS vs. in-app + mock logging",
      chosen: "In-app notifications stored; mock/logged delivery",
      why:
        "Brief does not require an external provider; keeps MVP scope focused; email/SMS can be plugged into the existing notifications table later.",
    },
    {
      decision: "AI tool execution",
      options: "Model calls tools directly vs. backend-validated tool calls",
      chosen: "Backend-validated tool calls",
      why:
        "Prevents the model from bypassing booking validation or authorization; ensures transactional capacity enforcement and double-booking prevention.",
    },
    {
      decision: "Frontend framework",
      options: "Next.js vs. React + Vite",
      chosen: "React 19 + Vite + TypeScript",
      why:
        "Vite provides fast HMR and lean builds; no server-side rendering needed for this dashboard-heavy app; TypeScript adds safety across portals.",
    },
    {
      decision: "Styling",
      options: "CSS modules / plain CSS vs. Tailwind CSS",
      chosen: "Tailwind CSS 4.x",
      why:
        "Utility-first, consistent design tokens across three portals, small CSS bundle, rapid UI iteration.",
    },
    {
      decision: "Schema changes",
      options: "Manual SQL vs. Alembic migrations",
      chosen: "Alembic",
      why:
        "Version-controlled, reproducible schema evolution across dev and prod environments.",
    },
    {
      decision: "Authentication",
      options: "Server-side sessions vs. JWT",
      chosen: "JWT (HS256) + refresh tokens",
      why:
        "Stateless, simple to scale, supports role-based claims and server-side revocation via JTI list.",
    },
    {
      decision: "AI answers",
      options: "General knowledge vs. fact-grounded only",
      chosen: "Fact-grounded only (approved RERA fact sheets)",
      why:
        "Prevents hallucination and price quoting; if a fact is missing, the AI offers a handoff instead of guessing.",
    },
  ],
  components: [
    { name: "Buyer Portal", responsibility: "Enquiry, multilingual AI chat, project facts, visit booking, profile & DPDP opt-out" },
    { name: "Sales Workspace", responsibility: "Lead queue, priority follow-ups, visit calendar, handoff detail with conversation summary" },
    { name: "Admin Console", responsibility: "User & role management, project/fact-sheet CRUD, visit-slot management, analytics KPIs, audit log" },
    { name: "Auth Module", responsibility: "JWT issuance/validation, password hashing (Argon2), refresh-token revocation" },
    { name: "AI Assistant Module", responsibility: "Groq provider adapter, fact-grounded prompts, tool definitions, safety guards" },
    { name: "Bookings Module", responsibility: "Slot generation, availability checks, transactional booking, cancellation, outcomes" },
    { name: "Dashboard Module", responsibility: "Live aggregation of leads, conversions, response time, CPL/CPV by source" },
    { name: "Database", responsibility: "users, roles, projects, project_facts, leads, conversations, messages, visit_slots, bookings, handoffs, notifications, follow_ups, marketing_spends, audit_logs, system_settings" },
  ],
  lessons: [
    "Modular monolith = right call for a solo MVP. Keeping one deployable unit with strict module boundaries gave us velocity without the operational overhead of microservices, while leaving a clean path to extract modules later.",
    "Never trust frontend availability for bookings. The backend must revalidate slot capacity transactionally at booking time. Relying on an earlier frontend response risks double-booking under concurrent requests.",
    "Fact-grounded prompting needs hard guardrails. Instructing the model to 'use only approved facts' is necessary but insufficient; we also added backend tool validation, no-price-quoting rules, and a mandatory handoff fallback when a fact is missing.",
    "Provider abstraction pays off early. Wrapping Groq behind a small adapter meant the conversation and business logic never touched the provider directly, making future model swaps low-risk.",
    "Capture consent once, respect opt-out everywhere. Capturing DPDP consent at registration (rather than on every login) reduces buyer friction, while the opted_out flag on leads centrally blocks all contact channels.",
    "Concurrency needs explicit handling. SQLite shared-cache quirks and stale snapshots surfaced during concurrent lead-creation tests; disabling the SQLAlchemy C extension in tests and calling session.expire_all() resolved them.",
    "Label assumptions explicitly. Marking every assumption with [ASSUMPTION] kept honest boundaries between what the brief required and what we inferred for the implementation.",
    "Test per module, not at the end. Adding Pytest tests alongside each module caught regressions early (booking concurrency, DPDP opt-out, AI tool mocking) and gave confidence before integration.",
  ],
};
