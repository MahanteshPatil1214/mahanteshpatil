import { keylo } from "@/app/data/case-studies/keylo";
import { veridoc } from "@/app/data/case-studies/veridoc";
import Link from "next/link";
import { basePath } from "@/app/lib/constants";
import type { Metadata } from "next";

type CaseStudy = typeof keylo | typeof veridoc;
const caseStudies: Record<string, CaseStudy> = {
  keylo,
  "veridoc-ai": veridoc,
};

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) {
    return {
      title: `Case Study | Mahantesh Patil`,
      description: "Case studies and engineering records by Mahantesh Patil.",
    };
  }
  return {
    title: `${study.title} — Case Study | Mahantesh Patil`,
    description: `Engineering deep dive into ${study.title}: STAR approach, system design, tradeoffs, and decisions.`,
    openGraph: {
      title: `${study.title} — Case Study | Mahantesh Patil`,
      description: `Deep dive into ${study.title}: STAR approach, system design diagrams, tradeoffs & solutions, and engineering decisions.`,
      type: "website",
      images: [
        {
          url: `${basePath}${study.image}`,
          width: 1200,
          height: 630,
          alt: `${study.title} case study`,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
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
          <p className="mt-4 text-neutral-400">
            The project page you&rsquo;re looking for doesn&rsquo;t exist yet.
          </p>
        </div>
      </section>
    );
  }

  const s = study as any;

  const isKeylo = s.id === "keylo";
  const isVeridoc = s.id === "veridoc-ai";

  // Shared tech groups for Keylo
  const keyloTechGroups = [
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

  const keyloMetrics = [
    { value: "229", label: "Pytest Tests Passing", desc: "Unit, integration, security & AI tool mocks" },
    { value: "120+", label: "API Routes", desc: "Structured across 19 backend domain modules" },
    { value: "0", label: "Double-Booking Incidents", desc: "Concurrent-request verified via atomic locks" },
    { value: "3", label: "Portal Layouts", desc: "Dedicated surfaces for Buyer, Sales Executive, Admin" },
  ];

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
            {s.year} · {s.role}
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none">
            {s.title}.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl">
            {s.summary}
          </p>
          <a
            href={s.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#E25C38] text-[#ECEEDF] px-6 py-3 text-sm font-mono font-bold uppercase tracking-wider border border-[#E25C38]/30 hover:bg-[#E25C38]/90 hover:border-[#E25C38] transition-colors"
            aria-label={s.githubLabel}
          >
            <span>GitHub Repository</span>
            <span aria-hidden="true">→</span>
          </a>
        </header>

        {/* Quick Info Bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 mb-16">
          {[
            { label: "Year", value: s.year },
            { label: "Role", value: s.role },
            { label: "Discipline", value: isKeylo ? "AI · Real Estate" : "AI · Document Intelligence" },
            { label: "Problem", value: s.problemStatement.length > 40 ? s.problemStatement.slice(0, 40) + "…" : s.problemStatement },
          ].map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
                {spec.label}
              </dt>
              <dd className="text-sm text-[#ECEEDF]">{spec.value}</dd>
            </div>
          ))}
        </section>

        {isKeylo ? (
          <>
            {/* Keylo Impact & Metrics Grid */}
            <section aria-labelledby="metrics-title" className="mb-16">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-px h-5 bg-[#E25C38]"></span>
                <h2 id="metrics-title" className="text-2xl font-black text-white uppercase tracking-tighter">
                  Impact & Metrics
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {keyloMetrics.map((m: any) => (
                  <div
                    key={m.value}
                    className="max-w-full overflow-hidden bg-neutral-900/40 border border-white/5 rounded-xl p-6 hover:border-[#E25C38]/40 transition-colors"
                  >
                    <p className="text-[clamp(1.5rem,6vw,4rem)] md:text-[clamp(1.75rem,7vw,4.5rem)] font-mono font-bold text-white mb-1 overflow-hidden overflow-wrap-anywhere">
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

            {/* Keylo Categorized Tech Stack */}
            <section aria-labelledby="stack-title" className="mb-16 bg-neutral-900/20 border border-white/5 rounded-xl p-8 md:p-12">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-px h-5 bg-[#E25C38]"></span>
                <h2 id="stack-title" className="text-2xl font-black text-white uppercase tracking-tighter">
                  Tech Stack
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyloTechGroups.map((group: any) => (
                  <div key={group.title} className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#E25C38] font-bold">
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item: any) => (
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

            {/* Keylo STAR Approach */}
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
          </>
        ) : (
          <>
            {/* VeriDoc Impact & Metrics Grid */}
            <section aria-labelledby="metrics-title" className="mb-16">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-px h-5 bg-[#E25C38]"></span>
                <h2 id="metrics-title" className="text-2xl font-black text-white uppercase tracking-tighter">
                  Impact & Metrics
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {s.star.result.metrics.map((m: any) => (
                  <div
                    key={m.value}
                    className="max-w-full overflow-hidden bg-neutral-900/40 border border-white/5 rounded-xl p-6 hover:border-[#E25C38]/40 transition-colors"
                  >
                    <p className="text-[clamp(1.5rem,6vw,4rem)] md:text-[clamp(1.75rem,7vw,4.5rem)] font-mono font-bold text-white mb-1 overflow-hidden overflow-wrap-anywhere">
                      {m.value}
                    </p>
                    <p className="text-sm font-mono text-[#E25C38] uppercase tracking-wider mb-2">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* VeriDoc Categorized Tech Stack */}
            <section aria-labelledby="stack-title" className="mb-16 bg-neutral-900/20 border border-white/5 rounded-xl p-8 md:p-12">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-px h-5 bg-[#E25C38]"></span>
                <h2 id="stack-title" className="text-2xl font-black text-white uppercase tracking-tighter">
                  Tech Stack
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {s.techStack.map((group: any) => (
                  <div key={group.layer} className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#E25C38] font-bold">
                      {group.layer}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item: any) => (
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

            {/* VeriDoc STAR Approach */}
            <section aria-labelledby="star-title" className="mb-16">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-px h-5 bg-[#E25C38]"></span>
                <h2 id="star-title" className="text-2xl font-black text-white uppercase tracking-tighter">
                  STAR Approach
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Situation Card */}
                <div className="bg-neutral-900/30 border border-white/5 rounded-xl p-6 md:p-8">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-[#E25C38] font-bold mb-6">
                    Situation
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {s.star.situation}
                  </p>
                </div>

                {/* Task Card */}
                <div className="bg-neutral-900/30 border border-white/5 rounded-xl p-6 md:p-8">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-[#E25C38] font-bold mb-6">
                    Task
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-3">
                    <strong className="text-white">Role:</strong> {s.star.task.role}
                  </p>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    <strong className="text-white">Goal:</strong> {s.star.task.goal}
                  </p>
                </div>

                {/* Action Card */}
                <div className="bg-neutral-900/30 border border-white/5 rounded-xl p-6 md:p-8 col-span-2 lg:col-span-2">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-[#E25C38] font-bold mb-6">
                    Action
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                    {s.star.action.architecture}
                  </p>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#E25C38] font-bold mb-2">
                    Backend Packages
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {s.star.action.backendPackages.map((p: any) => (
                      <div
                        key={p.name}
                        className="bg-[#0C0D0E]/50 border border-white/5 rounded-lg p-4"
                      >
                        <span className="text-xs font-mono text-[#E25C38] uppercase tracking-wider block mb-1">
                          {p.name}
                        </span>
                        <p className="text-xs text-neutral-400 leading-relaxed">{p.responsibility}</p>
                      </div>
                    ))}
                  </div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#E25C38] font-bold mb-2">
                    Key Capabilities
                  </h4>
                  <ul className="space-y-3 text-neutral-300 text-sm leading-relaxed">
                    {s.star.action.capabilities.map((c: any, i: any) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#E25C38] font-bold mt-0.5">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Result Card */}
                <div className="bg-neutral-900/30 border border-white/5 rounded-xl p-6 md:p-8 col-span-2 lg:col-span-2">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-[#E25C38] font-bold mb-6">
                    Result
                  </h3>
                  <div className="space-y-4">
                    {s.star.result.highlights.map((h: any, i: any) => (
                      <div key={i} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
                        <span className="text-[#E25C38] font-bold mt-0.5">✓</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* System Design & Data Flow */}
        <section aria-labelledby="system-title" className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="system-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              System Design & Data Flow
            </h2>
          </div>
          <p className="text-neutral-300 text-sm leading-relaxed max-w-3xl mb-8">
            {s.systemDesign.intro}
          </p>
          <div className="space-y-8">
            {s.systemDesign.diagrams.map((d: any, i: any) => (
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
                {s.systemDesign.diagramNote}
              </p>
            </div>
          </div>
        </section>

        {/* Tradeoffs & Solutions */}
        <section aria-labelledby="tradeoffs-title" className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="tradeoffs-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              Tradeoffs & Solutions
            </h2>
          </div>
          <div className="space-y-4">
            {s.tradeoffs.map((t: any, i: any) => (
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

        {/* Components */}
        <section aria-labelledby="components-title" className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="components-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              Components
            </h2>
          </div>
          <div className="space-y-4">
            {s.components.map((c: any, i: any) => (
              <div key={i} className="bg-neutral-900/30 border border-white/5 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="text-sm font-mono font-bold text-white">
                    {c.name}
                  </h3>
                  <span className="text-xs font-mono text-[#E25C38] uppercase tracking-wider">
                    {c.purpose || c.responsibility}
                  </span>
                </div>
                <ul className="space-y-2 text-neutral-300 text-sm leading-relaxed">
                  {Array.isArray(c.responsibilities)
                    ? c.responsibilities.map((r: any, j: any) => (
                        <li key={j} className="flex items-start gap-2 pl-4">
                          <span className="text-[#E25C38] font-bold mt-0.5">•</span>
                          <span>{r}</span>
                        </li>
                      ))
                    : c.responsibility ? (
                        <li key={0} className="flex items-start gap-2 pl-4">
                          <span className="text-[#E25C38] font-bold mt-0.5">•</span>
                          <span>{c.responsibility}</span>
                        </li>
                      ) : null}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons Learned */}
        <section aria-labelledby="lessons-title" className="mb-24">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-px h-5 bg-[#E25C38]"></span>
            <h2 id="lessons-title" className="text-2xl font-black text-white uppercase tracking-tighter">
              Lessons Learned
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {s.lessons.map((l: any, i: any) => {
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
