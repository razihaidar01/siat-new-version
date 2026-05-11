import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, X, ExternalLink, TrendingUp, Users, Zap, CheckCircle2 } from "lucide-react";
import { RH_IMAGES } from "@/lib/rhPlaceholders";
import { useSEO } from "@/hooks/useSEO";
import { RH_BASE_URL, rhOrganizationSchema, rhBreadcrumb } from "@/lib/rhSeo";

const FadeUp = ({ children, delay = 0, className = "" }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

type Project = {
  title: string;
  category: string;
  industry: string;
  image: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  accent: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "MediCore HMS",
    category: "SaaS",
    industry: "Healthcare",
    image: RH_IMAGES.dashboardHospital,
    challenge: "A 4-hospital chain managing patient records, billing and pharmacy on disconnected Excel and legacy software — losing hours every day.",
    solution: "Unified hospital management system with role-based modules for OPD, IPD, pharmacy, lab and billing — backed by a real-time analytics dashboard.",
    outcome: "Replaced 6 tools with one platform, reduced admin time by 70% and gave leadership live operational visibility.",
    metrics: [
      { label: "Workflows digitized", value: "15+" },
      { label: "Admin time saved", value: "-70%" },
      { label: "Daily active staff", value: "180+" },
    ],
    stack: ["Next.js", "Postgres", "Redis", "AWS", "Stripe"],
    accent: "from-[#7C3AED] to-[#22D3EE]",
    featured: true,
  },
  {
    title: "EduNova LMS",
    category: "EdTech",
    industry: "Education",
    image: RH_IMAGES.dashboardLms,
    challenge: "A regional coaching network needed to scale online classes from 200 to 10,000 concurrent learners without freezing.",
    solution: "Custom LMS with adaptive video streaming, live classes via WebRTC, assessments, and certificate engine — built on a horizontally scalable stack.",
    outcome: "Scaled to 10k+ concurrent learners with zero downtime and unlocked a new B2B revenue line.",
    metrics: [
      { label: "Concurrent learners", value: "10k+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Course completion", value: "+38%" },
    ],
    stack: ["React", "Node.js", "Mux", "Supabase", "WebRTC"],
    accent: "from-[#22D3EE] to-[#10B981]",
    featured: true,
  },
  {
    title: "FleetIQ Tracker",
    category: "IoT",
    industry: "Logistics",
    image: RH_IMAGES.pfFleet,
    challenge: "Trucking operator running a fleet of 80 vehicles with no visibility into routes, idle time or driver behavior.",
    solution: "Real-time GPS + telematics platform with route optimization, driver scoring, geofencing alerts and maintenance schedules.",
    outcome: "Cut fuel costs 22% and improved on-time delivery rate from 78% to 96%.",
    metrics: [
      { label: "Fuel savings", value: "-22%" },
      { label: "On-time deliveries", value: "96%" },
      { label: "Vehicles tracked", value: "80+" },
    ],
    stack: ["Flutter", "Mapbox", "MQTT", "Go", "TimescaleDB"],
    accent: "from-[#F59E0B] to-[#7C3AED]",
  },
  {
    title: "Banking AI Assistant",
    category: "AI",
    industry: "Finance",
    image: RH_IMAGES.pfBanking,
    challenge: "Mid-sized NBFC drowning in repetitive customer queries — 70% of agent time spent on balance, EMI, and statement requests.",
    solution: "Conversational AI agent with secure account context, transactional intent routing, and human handoff for complex queries.",
    outcome: "Resolved 64% of queries without human, reduced agent load and improved CSAT scores.",
    metrics: [
      { label: "Queries auto-resolved", value: "64%" },
      { label: "CSAT improvement", value: "+19%" },
      { label: "Agent capacity freed", value: "2.3×" },
    ],
    stack: ["LangChain", "OpenAI", "FastAPI", "Pinecone"],
    accent: "from-[#10B981] to-[#22D3EE]",
  },
  {
    title: "Lumora Analytics",
    category: "SaaS",
    industry: "Marketing",
    image: RH_IMAGES.dashboardAnalytics,
    challenge: "D2C brands stitching together 5+ tools to understand campaign ROI — none of which talked to each other.",
    solution: "Multi-source analytics platform with ETL pipelines from ad platforms + Shopify, attribution modeling, and weekly auto-insights.",
    outcome: "Customers cut reporting time from 6 hours/week to 15 minutes and surfaced spend leaks worth ₹40L+.",
    metrics: [
      { label: "Reporting time", value: "-95%" },
      { label: "Avg spend recovered", value: "₹4L/mo" },
      { label: "Brands onboarded", value: "60+" },
    ],
    stack: ["Next.js", "Python", "Postgres", "ClickHouse"],
    accent: "from-[#A78BFA] to-[#EC4899]",
  },
  {
    title: "Kasa Realty",
    category: "Web",
    industry: "Real Estate",
    image: RH_IMAGES.pfRealEstate,
    challenge: "Real estate firm losing leads to bigger portals — needed credibility, virtual tours and a serious lead engine.",
    solution: "Premium property platform with virtual 360 tours, mortgage calculator, agent matching and a CRM-integrated lead pipeline.",
    outcome: "Inbound leads tripled in 4 months; site converts 3.4× better than the industry benchmark.",
    metrics: [
      { label: "Lead growth", value: "3×" },
      { label: "Conversion rate", value: "4.8%" },
      { label: "Properties listed", value: "1,200+" },
    ],
    stack: ["Next.js", "Prisma", "Postgres", "Mapbox"],
    accent: "from-[#10B981] to-[#7C3AED]",
  },
  {
    title: "ShopSwift Mobile",
    category: "Mobile",
    industry: "E-Commerce",
    image: RH_IMAGES.mobileApp1,
    challenge: "D2C jewelry brand needed a mobile-first shopping experience with personalized recommendations and instant checkout.",
    solution: "Cross-platform shopping app with AI recommendations, push-led re-engagement, Razorpay one-tap checkout and AR try-on.",
    outcome: "App-driven revenue grew 5× in 6 months and became their highest-margin channel.",
    metrics: [
      { label: "Revenue from app", value: "5×" },
      { label: "Avg session", value: "6m 12s" },
      { label: "Repeat orders", value: "+47%" },
    ],
    stack: ["React Native", "Node.js", "MongoDB", "Razorpay"],
    accent: "from-[#EC4899] to-[#7C3AED]",
  },
  {
    title: "InventIQ",
    category: "SaaS",
    industry: "Retail Ops",
    image: RH_IMAGES.dashboardCrm,
    challenge: "Multi-warehouse retailer constantly overstocking and stocking out — pure guesswork driving purchasing.",
    solution: "Cloud inventory platform with real-time stock sync, demand forecasting, automated reorder points and supplier portal.",
    outcome: "Reduced stockouts by 68%, cut overstock holding 31%, and shortened reorder cycle to under 2 hours.",
    metrics: [
      { label: "Stockouts", value: "-68%" },
      { label: "Overstock", value: "-31%" },
      { label: "Warehouses", value: "12" },
    ],
    stack: ["Vue.js", "Go", "Redis", "AWS"],
    accent: "from-[#22D3EE] to-[#10B981]",
  },
];

/* ------------------------------------------------------------------ */
const Hero = ({ count }: { count: number }) => (
  <section className="pt-10 md:pt-16 pb-12 px-6 md:px-10">
    <div className="max-w-7xl mx-auto">
      <FadeUp>
        <span className="rh-eyebrow"><span className="dot" />Selected work</span>
      </FadeUp>
      <FadeUp delay={0.06}>
        <h1 className="mt-5 text-[40px] md:text-[64px] leading-[1.02] font-semibold tracking-[-0.03em] max-w-4xl">
          Real products,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#22D3EE]">
            real outcomes.
          </span>
        </h1>
      </FadeUp>
      <FadeUp delay={0.12}>
        <p className="mt-6 text-[16px] md:text-[17px] rh-text-muted max-w-2xl leading-relaxed">
          {count}+ shipped products across SaaS, AI, mobile, healthcare, fintech and logistics.
          Each one built to move a business metric.
        </p>
      </FadeUp>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
const FeaturedCard = ({ p, onOpen }: { p: Project; onOpen: () => void }) => (
  <FadeUp className="group">
    <button
      onClick={onOpen}
      className="text-left w-full rh-surface rh-card-hover overflow-hidden block"
    >
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-25 mix-blend-overlay`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-[#07070A]/40 to-transparent" />
        <div className="absolute top-5 left-5 flex gap-2">
          <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.18em] text-white">
            {p.industry}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[10px] uppercase tracking-[0.18em] text-[#C4B5FD]">
            Featured
          </span>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-[24px] md:text-[32px] font-semibold tracking-tight text-white">{p.title}</h3>
          <p className="text-[14px] text-white/70 mt-2 max-w-xl line-clamp-2">{p.outcome}</p>
        </div>
      </div>
      <div className="p-6 grid grid-cols-3 gap-4 border-t border-white/[0.06]">
        {p.metrics.map((m) => (
          <div key={m.label}>
            <div className="text-[20px] md:text-[22px] font-semibold tracking-tight">{m.value}</div>
            <div className="text-[11px] rh-text-dim mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
    </button>
  </FadeUp>
);

const GridCard = ({ p, onOpen }: { p: Project; onOpen: () => void }) => (
  <FadeUp className="group">
    <button
      onClick={onOpen}
      className="text-left w-full rh-surface rh-card-hover overflow-hidden block h-full flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-20 mix-blend-overlay`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070A]/85 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.18em] text-white">
          {p.industry}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-[17px] font-semibold tracking-tight">{p.title}</h3>
        <p className="text-[13px] rh-text-muted mt-1.5 line-clamp-2">{p.outcome}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-white/60 font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  </FadeUp>
);

/* ------------------------------------------------------------------ */
const CaseStudyModal = ({ p, onClose }: { p: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-2xl flex items-start md:items-center justify-center p-4 md:p-6 overflow-y-auto"
  >
    <motion.div
      initial={{ scale: 0.96, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.96, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="max-w-4xl w-full rh-surface-elevated relative my-6"
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.1]">
        <X className="w-4 h-4" />
      </button>

      <div className="relative h-64 md:h-80 rounded-t-[20px] overflow-hidden">
        <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-30 mix-blend-overlay`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.18em] text-white">{p.industry}</span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.18em] text-white">{p.category}</span>
          </div>
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-white">{p.title}</h2>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-7">
        <div className="grid md:grid-cols-3 gap-4">
          {p.metrics.map((m, i) => {
            const Icon = [TrendingUp, Users, Zap][i] || TrendingUp;
            return (
              <div key={m.label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <Icon className="w-4 h-4 text-[#A78BFA] mb-2" />
                <div className="text-[22px] font-semibold tracking-tight">{m.value}</div>
                <div className="text-[11px] rh-text-dim mt-0.5">{m.label}</div>
              </div>
            );
          })}
        </div>

        {[
          { h: "Challenge", b: p.challenge },
          { h: "Solution", b: p.solution },
          { h: "Outcome", b: p.outcome },
        ].map((s) => (
          <div key={s.h}>
            <div className="text-[11px] uppercase tracking-[0.18em] rh-text-dim mb-2">{s.h}</div>
            <p className="text-[15px] text-white/85 leading-relaxed">{s.b}</p>
          </div>
        ))}

        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] rh-text-dim mb-3">Tech stack</div>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span key={t} className="text-[12px] px-2.5 py-1 rounded-md border border-[#7C3AED]/20 bg-[#7C3AED]/10 text-[#C4B5FD] font-mono">{t}</span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-3">
          <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
            Build something similar <ExternalLink className="w-4 h-4" />
          </Link>
          <Link to="/rhsoftware/pricing" className="rh-btn rh-btn-ghost">
            View pricing
          </Link>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

/* ------------------------------------------------------------------ */
const RHPortfolioPage = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  useSEO({
    title: "Portfolio | RH Software — Bihar's Top Web, App & SaaS Projects",
    description:
      "Explore real-world projects shipped by RH Software (by SIAT) — hospital management, EdTech, fintech, logistics IoT and SaaS platforms built for clients across Patna, Saharsa, Madhepura, Purnia and all Bihar.",
    keywords: "RH Software portfolio, software case studies bihar, web app projects bihar, SaaS projects patna, hospital management software bihar",
    canonical: `${RH_BASE_URL}/rhsoftware/portfolio`,
    schema: [
      rhOrganizationSchema,
      rhBreadcrumb([
        { name: "Home", url: RH_BASE_URL },
        { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
        { name: "Portfolio", url: `${RH_BASE_URL}/rhsoftware/portfolio` },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "RH Software Portfolio",
        url: `${RH_BASE_URL}/rhsoftware/portfolio`,
        hasPart: projects.map((p) => ({
          "@type": "CreativeWork",
          name: p.title,
          about: p.category,
        })),
      },
    ],
  });

  return (
    <>
      <Hero count={projects.length} />

      <section className="px-6 md:px-10 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                  filter === c
                    ? "bg-white text-[#07070A]"
                    : "border border-white/[0.1] bg-white/[0.03] text-white/65 hover:text-white hover:border-white/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {featured.map((p) => (
                <FeaturedCard key={p.title} p={p} onOpen={() => setSelected(p)} />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((p) => (
                <GridCard key={p.title} p={p} onOpen={() => setSelected(p)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-16 px-6 md:px-10 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          {[
            { v: "40+", l: "Products shipped" },
            { v: "12", l: "Industries served" },
            { v: "10k+", l: "End users impacted" },
            { v: "99.9%", l: "Average uptime" },
          ].map((s) => (
            <FadeUp key={s.l}>
              <div className="text-[28px] md:text-[34px] font-semibold tracking-tight">{s.v}</div>
              <div className="text-[12px] rh-text-dim mt-1 uppercase tracking-[0.18em]">{s.l}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto rh-surface p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-50"
               style={{ background: "radial-gradient(600px 280px at 50% 0%, rgba(124,58,237,0.25), transparent 70%)" }} />
          <h2 className="text-[30px] md:text-[42px] font-semibold tracking-tight">Your project belongs here.</h2>
          <p className="rh-text-muted mt-4 max-w-xl mx-auto">
            Tell us what you're building. We'll respond within a few hours with concrete next steps.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
              Start a project <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/rhsoftware/services" className="rh-btn rh-btn-ghost">
              Explore services
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] rh-text-dim">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Free 30-min discovery</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Fixed-price proposals</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> NDA on request</span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <CaseStudyModal p={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
};

export default RHPortfolioPage;
