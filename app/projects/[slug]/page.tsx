import { keylo } from "@/app/data/case-studies/keylo";
import Link from "next/link";
import { basePath } from "@/app/lib/constants";
import type { Metadata } from "next";

export function generateStaticParams() {
  return [{ slug: keylo.id }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const isKeylo = slug === keylo.id;
  return {
    title: isKeylo ? `Keylo — Case Study | Mahantesh Patil` : `Case Study | Mahantesh Patil`,
    description: isKeylo
      ? "A conversational AI platform for real-estate sales and site-visit automation — STAR approach, system design, tradeoffs, and engineering decisions behind Keylo."
      : "Case studies and engineering records by Mahantesh Patil.",
    openGraph: isKeylo
      ? {
          title: `Keylo — Case Study | Mahantesh Patil`,
          description: "Deep dive into Keylo: STAR approach, system design diagrams, tradeoffs & solutions, and engineering decisions.",
          type: "website",
          images: [{ url: `${basePath}/data/Keylo.png`, width: 1200, height: 630, alt: "Keylo case study" }],
        }
      : undefined,
  };
}

const techGroups = [
  {
    title: "Frontend",
    items: ["React 19", "TypeScript", "Vite 8", "Tailwind CSS 4", "Lucide", "Framer Motion", "TanStack Query", "Zod"],
  },
  {
    title: "Backend",
    items: ["Python 3.12", "FastAPI 0.136", "SQLAlchemy 2.0", "Pydantic v2", "Alembic", "Argon2", "Pytest"],
  },
  {
    title: "Database & Infrastructure",
    items: ["SQLite (Dev)", "PostgreSQL 16 (Prod)", "Docker Compose"],
  },
  {
    title: "AI & Inference",
    items: ["Groq API (GPT-OSS-120B)", "Backend-Validated Tool Calls", "Fact Grounding"],
  },
];

const metrics = [
  { value: "229", label: "Pytest Tests Passing", desc: "Unit, integration, security & AI tool mocks" },
  { value: "120+", label: "API Routes", desc: "Structured across 19 backend domain modules" },
  { value: "0", label: "Double-Booking Incidents", desc: "Concurrent-request verified via atomic locks" },
  { value: "3", label: "Portal Layouts", desc: "Dedicated surfaces for Buyer, Sales Executive, Admin" },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== keylo.id) {
    return (
      <section className="bg-[#0C0D0E] text-[#ECEEDF] min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`${basePath}/`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-[#E25C38] transition-colors mb-8"
            aria-label="Back to portfolio"
          >
            <span aria-hidden="true">←</span> Back to portfolio
          </Link>
          <h1 className="text-4xl font-black text-white">Case study not found</h1>
          <p className="mt-4 text-neutral-400">The project page you&rsquo;re looking for doesn&rsquo;t exist yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0C0D0E] text-[#ECEEDF] min-h-screen py-12 md:py-20">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-40 h-16 backdrop-blur-md bg-[#0C0D0E]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <Link
            href={`${basePath}/`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-[#E25C38] transition-colors"
            aria-label="Back to portfolio"
          >
            <span aria-hidden="true">←</span> Back to portfolio
          </Link>
          <span className="text-xs font-mono text-[#E25C38] uppercase tracking-wider">Case Study // 01</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <header className="space-y-6 pt-6 pb-16 border-b border-white/5 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E25C38]/10 border border-[#E25C38]/20 text-[#E25C38] text-xs font-mono uppercase tracking-wider">
            2025 · SOLE FULL-STACK ENGINEER
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none">
            Keylo.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl">
            {keylo.summary}
          </p>
          <a
            href={keylo.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#E25C38] text-[#ECEEDF] px-6 py-3 text-sm font-mono font-bold uppercase tracking-wider border border-[#E25C38]/30 hover:bg-[#E25C38]/90 hover:border-[#E25C38] transition-colors"
            aria-label={keylo.githubLabel}
          >
            <span>GitHub Repository</span>
            <span aria-hidden="true">→</span>
          </a>
        </header>

        {/* Quick Info Bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 mb-16">
          {[
            { label: "Discipline", value: "AI · Real Estate" },
            { label: "Domain", value: "PropTech / Sales Automation" },
            { label: "Architecture", value: "Modular Monolith" },
            { label: "AI Stack", value: "Groq · GPT-OSS-120B" },
          ].map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
                {spec.label}
              </dt>
              <dd className="text-sm text-[#ECEEDF]">{spec.value}</dd>
            </div>
          ))}
        </section>

        {/* Impact & Metrics Grid */}
        <section aria-labelledby="metrics-title" className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="metrics-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              Impact & Metrics
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div
                key={m.value}
                className="bg-neutral-900/40 border border-white/5 rounded-xl p-6 hover:border-[#E25C38]/40 transition-colors"
              >
                <p className="text-4xl md:text-5xl font-mono font-bold text-white mb-1">
                  {m.value}
                </p>
                <p className="text-sm font-mono text-[#E25C38] uppercase tracking-wider mb-2">
                  {m.label}
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categorized Tech Stack */}
        <section aria-labelledby="stack-title" className="mb-16 bg-neutral-900/20 border border-white/5 rounded-xl p-8 md:p-12">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="stack-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              Tech Stack
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#E25C38] font-bold">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex px-3 py-1 text-xs font-mono rounded-md bg-white/[0.04] border border-white/10 text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Design & Data Flow */}
        <section aria-labelledby="system-title" className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="system-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              System Design & Data Flow
            </h2>
          </div>
          <p className="text-neutral-300 text-sm leading-relaxed max-w-3xl mb-8">
            Keylo is organized as a modular monolith with three portal layouts — Buyer,
            Sales Executive, and Admin — all backed by a single FastAPI application
            and relational database. The diagrams below show the system architecture
            and the three primary data flows.
          </p>
          <div className="space-y-8">
            {keylo.systemDesign.diagrams.map((d, i) => (
              <div key={i} className="bg-neutral-900/30 border border-white/5 rounded-xl overflow-hidden">
                <img
                  src={`${basePath}${d.src}`}
                  alt={d.alt}
                  className="w-full h-auto max-h-[480px] object-contain bg-[#0C0D0E] block mx-auto"
                  loading="lazy"
                />
                <div className="p-4 border-t border-white/5">
                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                    Figure {i + 1}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {d.caption}
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider leading-relaxed">
                {keylo.systemDesign.diagramNote}
              </p>
            </div>
          </div>
        </section>

        {/* Context, Role & STAR Scope */}
        <section aria-labelledby="star-title" className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="star-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              STAR Approach
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Problem Card */}
            <div className="bg-neutral-900/30 border border-white/5 rounded-xl p-6 md:p-8">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#E25C38] font-bold mb-6">
                Problem Context
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-neutral-500 font-mono text-xs">3,000</span>
                  <span className="text-neutral-300 text-sm leading-relaxed">
                    leads per month from portals, social ads, website, and hoarding phone number
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neutral-500 font-mono text-xs">14 hrs</span>
                  <span className="text-neutral-300 text-sm leading-relaxed">
                    median first response time — landing in inboxes and spreadsheets
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neutral-500 font-mono text-xs">35%</span>
                  <span className="text-neutral-300 text-sm leading-relaxed">
                    leads not reached within 48 hours
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neutral-500 font-mono text-xs">6%</span>
                  <span className="text-neutral-300 text-sm leading-relaxed">
                    lead-to-site-visit conversion rate
                  </span>
                </div>
              </div>
            </div>

            {/* Goals & Scope Card */}
            <div className="bg-neutral-900/30 border border-white/5 rounded-xl p-6 md:p-8">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#E25C38] font-bold mb-6">
                Goals & Scope
              </h3>
              <ul className="space-y-4">
                {keylo.star.task.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
                    <span className="text-[#E25C38] font-bold mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Architectural Tradeoffs */}
        <section aria-labelledby="tradeoffs-title" className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="tradeoffs-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              Tradeoffs & Solutions
            </h2>
          </div>
          <div className="space-y-4">
            {keylo.tradeoffs.map((t, i) => (
              <div key={i} className="bg-neutral-900/30 border border-white/5 rounded-xl p-6 hover:border-[#E25C38]/40 transition-colors">
                <div className="flex items-start gap-4 mb-3">
                  <span className="font-mono uppercase font-bold text-white text-xs leading-none">
                    {t.decision}
                  </span>
                  <span className="flex-1 border-l border-white/5 pl-4 text-xs text-neutral-500 leading-relaxed">
                    {t.options}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#E25C38]/10 text-[#E25C38] border border-[#E25C38]/20">
                    {t.chosen}
                  </span>
                  <span className="flex-1 text-neutral-300 text-sm leading-relaxed">
                    <strong className="text-white font-medium">Why:</strong> {t.why}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Production Lessons Learned */}
        <section aria-labelledby="lessons-title" className="mb-24">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="lessons-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              Lessons Learned
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keylo.lessons.map((l, i) => {
              const num = (i + 1).toString().padStart(2, "0");
              const firstPeriod = l.indexOf(". ");
              const headline =
                firstPeriod > -1 ? l.slice(0, firstPeriod + 1) : l;
              const explanation =
                firstPeriod > -1 ? l.slice(firstPeriod + 2) : "";
              return (
                <div key={i} className="bg-neutral-900/30 border border-white/5 rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      {num}
                    </span>
                    <h3 className="text-base font-semibold text-white leading-tight">
                      {headline}
                    </h3>
                  </div>
                  {explanation && (
                    <p className="text-sm text-neutral-400 leading-relaxed">{explanation}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
