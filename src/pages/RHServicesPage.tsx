import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Globe, Smartphone, Code2, Database, Cpu,
  ArrowRight, ArrowUpRight, CheckCircle2, Sparkles,
} from "lucide-react";
import { RH_IMAGES } from "@/lib/rhPlaceholders";
import { useSEO } from "@/hooks/useSEO";
import {
  RH_BASE_URL, rhOrganizationSchema, rhBreadcrumb, rhServiceSchema,
} from "@/lib/rhSeo";

/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
type Service = {
  icon: any;
  title: string;
  tagline: string;
  desc: string;
  outcomes: string[];
  stack: string[];
  image: string;
  accent: string;
};

const allServices: Service[] = [
  {
    icon: Globe,
    title: "Web Development",
    tagline: "Marketing sites · Web apps · Dashboards",
    desc: "We engineer high-performance, SEO-optimized web products with modern stacks. From landing pages that convert to multi-tenant dashboards built to scale.",
    outcomes: ["Sub-1s LCP on real devices", "SEO-ready out of the box", "Component-driven design system"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "Supabase"],
    image: RH_IMAGES.dashboardSaas,
    accent: "from-[#7C3AED] to-[#22D3EE]",
  },
  {
    icon: Smartphone,
    title: "App Development",
    tagline: "iOS · Android · Cross-platform",
    desc: "Native-feeling mobile products with offline-first thinking, fluid 60fps animations, and rock-solid release pipelines for both stores.",
    outcomes: ["60fps fluid UI", "Offline-first sync", "App Store submission handled"],
    stack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    image: RH_IMAGES.mobileApp1,
    accent: "from-[#22D3EE] to-[#10B981]",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    tagline: "RAG · Agents · Computer Vision",
    desc: "Bespoke ML wired into your business — RAG over private data, multi-step agents, NLP pipelines and CV systems that ship to production.",
    outcomes: ["Domain-tuned LLM workflows", "Vector retrieval at scale", "Hallucination guardrails"],
    stack: ["OpenAI", "LangChain", "PyTorch", "FastAPI", "Pinecone"],
    image: RH_IMAGES.dashboardAnalytics,
    accent: "from-[#A78BFA] to-[#7C3AED]",
  },
  {
    icon: Code2,
    title: "SaaS Engineering",
    tagline: "Multi-tenant · Billing · RBAC",
    desc: "Production-grade SaaS with multi-tenancy, billing, role-based access, observability and CI/CD baked in from day one.",
    outcomes: ["Stripe billing integrated", "RLS-secured tenants", "p95 < 200ms APIs"],
    stack: ["Postgres", "Stripe", "Redis", "Docker", "AWS"],
    image: RH_IMAGES.dashboardCrm,
    accent: "from-[#10B981] to-[#22D3EE]",
  },
  {
    icon: Database,
    title: "Cloud & Infrastructure",
    tagline: "AWS · GCP · Azure",
    desc: "Reliable cloud architecture, infra-as-code, autoscaling and observability for systems your customers depend on.",
    outcomes: ["99.9% uptime SLO", "Cost-tuned infra (-40%)", "One-click rollbacks"],
    stack: ["AWS", "Terraform", "Kubernetes", "Datadog", "Cloudflare"],
    image: RH_IMAGES.serverRoom,
    accent: "from-[#F59E0B] to-[#EF4444]",
  },
  {
    icon: Cpu,
    title: "IoT & Embedded",
    tagline: "Connected devices · Edge",
    desc: "End-to-end IoT — firmware, gateways, cloud ingestion and real-time dashboards for sensors, fleets and smart systems.",
    outcomes: ["Real-time MQTT pipelines", "Edge inference", "Fleet-grade dashboards"],
    stack: ["MQTT", "ESP32", "Node.js", "TimescaleDB", "Mapbox"],
    image: RH_IMAGES.architecture,
    accent: "from-[#EC4899] to-[#7C3AED]",
  },
];

/* ------------------------------------------------------------------ */
const Hero = () => (
  <section className="pt-10 md:pt-16 pb-12 px-6 md:px-10 relative">
    <div className="max-w-7xl mx-auto">
      <FadeUp>
        <span className="rh-eyebrow"><span className="dot" />Our services</span>
      </FadeUp>
      <FadeUp delay={0.06}>
        <h1 className="mt-5 text-[40px] md:text-[64px] leading-[1.02] font-semibold tracking-[-0.03em] max-w-4xl">
          Six engineering disciplines.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#22D3EE]">
            One studio shipping outcomes.
          </span>
        </h1>
      </FadeUp>
      <FadeUp delay={0.12}>
        <p className="mt-6 text-[16px] md:text-[17px] rh-text-muted max-w-2xl leading-relaxed">
          Strategy, design and engineering live in the same room. No outsourced black box —
          you talk to the people building your product.
        </p>
      </FadeUp>
      <FadeUp delay={0.18}>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
            Book a strategy call <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">
            See our work
          </Link>
        </div>
      </FadeUp>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
const ServiceBlock = ({ s, i }: { s: Service; i: number }) => {
  const reversed = i % 2 === 1;
  return (
    <FadeUp className="group">
      <div
        className={`grid md:grid-cols-12 gap-6 md:gap-10 items-center rh-surface p-6 md:p-8 ${
          reversed ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Visual */}
        <div className="md:col-span-6 relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-[16/10]">
          <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-25 z-10 mix-blend-overlay`} />
          <img
            src={s.image}
            alt={s.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070A]/80 via-transparent to-transparent z-20" />
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center">
              <s.icon className="w-4 h-4 text-white" strokeWidth={1.8} />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/85 font-medium">
              {s.tagline}
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="md:col-span-6">
          <h2 className="text-[26px] md:text-[32px] font-semibold tracking-tight">{s.title}</h2>
          <p className="rh-text-muted mt-3 leading-relaxed text-[15px]">{s.desc}</p>

          <div className="mt-6 space-y-2.5">
            {s.outcomes.map((o) => (
              <div key={o} className="flex items-start gap-2.5 text-[14px] text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                {o}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {s.stack.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-1 rounded-md border border-white/[0.08] bg-white/[0.03] text-white/65 font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          <Link
            to="/rhsoftware/contact"
            className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#C4B5FD] hover:text-white transition-colors"
          >
            Discuss your {s.title.toLowerCase()} project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </FadeUp>
  );
};

/* ------------------------------------------------------------------ */
const ProcessStrip = () => {
  const steps = [
    { n: "01", t: "Discovery call", d: "Free 30-min scoping conversation." },
    { n: "02", t: "Proposal & roadmap", d: "Written scope, timeline, fixed price." },
    { n: "03", t: "Design + build sprints", d: "Weekly demos, transparent progress." },
    { n: "04", t: "Launch & support", d: "CI/CD, monitoring, handover docs." },
  ];
  return (
    <section className="py-20 md:py-24 px-6 md:px-10 relative">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="max-w-2xl mb-12">
          <span className="rh-eyebrow"><span className="dot" />How we engage</span>
          <h2 className="text-[30px] md:text-[40px] font-semibold mt-5 tracking-tight">
            From first call to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] to-[#22D3EE]">
              shipped product.
            </span>
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.05}>
              <div className="rh-surface p-6 h-full">
                <div className="text-[11px] font-mono rh-text-dim">{s.n}</div>
                <div className="text-[17px] font-semibold mt-2 tracking-tight">{s.t}</div>
                <div className="text-[13.5px] rh-text-muted mt-2 leading-relaxed">{s.d}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
const CTABand = () => (
  <section className="py-20 px-6 md:px-10">
    <div className="max-w-5xl mx-auto rh-surface p-10 md:p-14 text-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50"
           style={{ background: "radial-gradient(600px 280px at 50% 0%, rgba(124,58,237,0.25), transparent 70%)" }} />
      <Sparkles className="w-6 h-6 text-[#A78BFA] mx-auto mb-4" />
      <h2 className="text-[30px] md:text-[42px] font-semibold tracking-tight">
        Have a project in mind?
      </h2>
      <p className="rh-text-muted mt-4 max-w-xl mx-auto">
        Book a free 30-minute strategy call. We'll review your idea, suggest the right
        architecture, and give you an honest go/no-go.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
          Book a strategy call <ArrowUpRight className="w-4 h-4" />
        </Link>
        <Link to="/rhsoftware/pricing" className="rh-btn rh-btn-ghost">
          View pricing
        </Link>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
const RHServicesPage = () => {
  useSEO({
    title: "Web, App & AI Development Services in Bihar | RH Software (by SIAT)",
    description:
      "End-to-end software services in Bihar — website development, mobile app development, AI/ML, SaaS engineering, automation and UI/UX. Serving Patna, Saharsa, Madhepura, Purnia, Supaul, Darbhanga and all Bihar.",
    keywords:
      "website development bihar, app development patna, AI development company bihar, software development services saharsa, mobile app developer madhepura, SaaS development bihar, वेबसाइट डेवलपमेंट बिहार",
    canonical: `${RH_BASE_URL}/rhsoftware/services`,
    schema: [
      rhOrganizationSchema,
      rhBreadcrumb([
        { name: "Home", url: RH_BASE_URL },
        { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
        { name: "Services", url: `${RH_BASE_URL}/rhsoftware/services` },
      ]),
      rhServiceSchema(
        "Website Development",
        "Custom websites, landing pages and marketing sites engineered for speed and SEO across Bihar.",
        `${RH_BASE_URL}/rhsoftware/services#web`,
      ),
      rhServiceSchema(
        "Mobile App Development",
        "Native-feeling iOS & Android apps for startups and enterprises in Patna, Saharsa, Madhepura and across Bihar.",
        `${RH_BASE_URL}/rhsoftware/services#app`,
      ),
      rhServiceSchema(
        "AI Development",
        "RAG, LLM agents, NLP pipelines and bespoke ML solutions wired into real business workflows.",
        `${RH_BASE_URL}/rhsoftware/services#ai`,
      ),
    ],
  });

  return (
    <>
      <Hero />
      <section className="px-6 md:px-10 pb-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {allServices.map((s, i) => <ServiceBlock key={s.title} s={s} i={i} />)}
        </div>
      </section>
      <ProcessStrip />
      <CTABand />
    </>
  );
};

export default RHServicesPage;
