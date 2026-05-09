import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Brain, Code2, Database, Globe,
  Smartphone, Zap, Workflow, LayoutGrid, Terminal,
  CheckCircle2, Quote, Activity,
} from "lucide-react";

/* ============================================================
   Small primitives
   ============================================================ */

const FadeUp = ({
  children, delay = 0, className = "", y = 24,
}: { children: React.ReactNode; delay?: number; className?: string; y?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Section = ({
  children, className = "", id,
}: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-20 md:py-28 px-6 md:px-10 relative ${className}`}>
    <div className="max-w-7xl mx-auto relative z-10">{children}</div>
  </section>
);

const SectionHead = ({
  eyebrow, title, accent, sub,
}: { eyebrow: string; title: string; accent?: string; sub?: string }) => (
  <FadeUp className="max-w-2xl mb-14">
    <span className="rh-eyebrow"><span className="dot" />{eyebrow}</span>
    <h2 className="text-[34px] md:text-[44px] leading-[1.05] font-semibold mt-5">
      {title}{" "}
      {accent && (
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#22D3EE]">
          {accent}
        </span>
      )}
    </h2>
    {sub && <p className="rh-text-muted mt-4 text-[15px] leading-relaxed max-w-xl">{sub}</p>}
  </FadeUp>
);

/* ============================================================
   HERO — Bento composition
   ============================================================ */

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative pt-10 md:pt-16 pb-16 md:pb-24 px-6 md:px-10">
      {/* Soft hero aurora — single, restrained layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(800px 380px at 20% 10%, rgba(124,58,237,0.22), transparent 65%), radial-gradient(700px 320px at 85% 30%, rgba(34,211,238,0.10), transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div style={{ y }} className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-6">
            <FadeUp>
              <span className="rh-eyebrow">
                <span className="dot" />
                Engineering Studio · Available for projects
              </span>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h1 className="mt-6 text-[42px] md:text-[64px] leading-[1.02] font-semibold tracking-[-0.03em]">
                Software that{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#C4B5FD] to-[#22D3EE]">
                  scales businesses
                </span>{" "}
                <span className="rh-text-dim italic font-normal">— not just websites.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="mt-6 text-[16px] md:text-[17px] leading-relaxed rh-text-muted max-w-[560px]">
                We're a product engineering studio shipping production-grade SaaS,
                AI systems, mobile apps, and internal automation for ambitious
                teams across India and beyond.
              </p>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-primary">
                  See our work <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/rhsoftware/contact" className="rh-btn rh-btn-ghost">
                  Book a strategy call
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { k: "40+", v: "Products shipped" },
                  { k: "10k+", v: "End users served" },
                  { k: "99.9%", v: "Uptime delivered" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="text-[24px] md:text-[28px] font-semibold tracking-tight text-white">{s.k}</div>
                    <div className="text-[12px] rh-text-dim mt-0.5 leading-tight">{s.v}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — Bento mockup composition */}
          <div className="lg:col-span-6">
            <BentoMockups />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* Realistic faux product mockups (no images, all CSS) */
const BentoMockups = () => {
  return (
    <FadeUp delay={0.1} y={36}>
      <div className="relative grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 aspect-[1/1] md:aspect-[5/4]">
        {/* Dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rh-surface col-span-6 row-span-4 p-4 md:p-5 overflow-hidden relative"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="text-[10px] rh-text-dim font-mono">app.rhsoftware.io</div>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[11px] rh-text-dim uppercase tracking-wider">Monthly Revenue</div>
              <div className="text-[26px] md:text-[32px] font-semibold mt-1 tracking-tight">₹ 18,42,500</div>
            </div>
            <div className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 font-medium">
              ▲ 24.6%
            </div>
          </div>

          {/* Sparkline */}
          <svg viewBox="0 0 300 80" className="w-full h-20 mt-4">
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,60 C30,55 50,30 80,35 C110,40 130,15 160,20 C190,25 215,55 240,40 C265,25 285,30 300,18 L300,80 L0,80 Z"
              fill="url(#g1)"
            />
            <path
              d="M0,60 C30,55 50,30 80,35 C110,40 130,15 160,20 C190,25 215,55 240,40 C265,25 285,30 300,18"
              fill="none" stroke="#A78BFA" strokeWidth="1.5"
            />
          </svg>

          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { l: "Active users", v: "8,412" },
              { l: "Conversion", v: "4.8%" },
              { l: "MRR growth", v: "+12.1%" },
            ].map((m) => (
              <div key={m.l} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                <div className="text-[10px] rh-text-dim">{m.l}</div>
                <div className="text-[13px] font-semibold mt-0.5">{m.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile app mock */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="rh-surface col-span-3 row-span-2 p-3 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 to-transparent" />
          <div className="relative flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-[11px] rh-text-dim">Mobile SDK</div>
              <div className="text-[13px] font-semibold">v3.4 shipped</div>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5">
            {[40, 70, 55, 85, 60, 90].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-white/[0.08]" style={{ height: 4 + h / 4 }} />
            ))}
          </div>
        </motion.div>

        {/* Code chip */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="rh-surface col-span-3 row-span-2 p-3 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="text-[11px] rh-text-dim font-mono">deploy.sh</span>
          </div>
          <pre className="rh-code text-[11px] leading-[1.5] m-0">
{`$ rh deploy --prod
`}<span className="tk-com">→ build · 12.4s</span>{`
`}<span className="tk-com">→ tests · 142 ✓</span>{`
`}<span className="tk-str">✓ live in 28s</span>
          </pre>
        </motion.div>
      </div>
    </FadeUp>
  );
};

/* ============================================================
   TRUST STRIP
   ============================================================ */

const Trust = () => {
  const items = [
    "Reduced manual ops by 70%",
    "Scaled to 10k+ users",
    "Improved booking speed 3×",
    "Zero downtime in 18 months",
    "Cut cloud spend by 42%",
  ];
  return (
    <section className="py-10 border-y border-white/[0.05] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-[11px] rh-text-dim uppercase tracking-[0.18em] mb-6 text-center">
          Outcomes we've delivered for clients
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {items.map((i) => (
            <div key={i} className="flex items-center gap-2 text-[13px] text-white/70">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {i}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SERVICES BENTO
   ============================================================ */

const services = [
  { icon: Globe, title: "Web Development", desc: "Marketing sites, web apps & dashboards engineered for speed and SEO.", span: "md:col-span-2" },
  { icon: Smartphone, title: "App Development", desc: "Native-feeling iOS & Android products with real offline-first thinking.", span: "" },
  { icon: Brain, title: "AI Development", desc: "RAG, agents, NLP pipelines, and bespoke ML — wired into your workflow.", span: "" },
  { icon: Database, title: "SaaS Engineering", desc: "Multi-tenant architecture, billing, RBAC, observability — production-grade.", span: "md:col-span-2" },
  { icon: Workflow, title: "Business Automation", desc: "Internal tools, integrations and workflow engines that remove drudgery.", span: "" },
  { icon: LayoutGrid, title: "UI/UX Systems", desc: "Design systems, prototypes, and product experiences that users actually keep.", span: "" },
];

const Services = () => (
  <Section id="services">
    <SectionHead eyebrow="What we build" title="Six disciplines." accent="One team." sub="No outsourced black box. Strategy, design and engineering live in the same room." />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {services.map((s, i) => (
        <FadeUp key={s.title} delay={i * 0.04} className={s.span}>
          <div className="rh-surface rh-card-hover p-6 h-full">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
              <s.icon className="w-4.5 h-4.5 text-[#A78BFA]" strokeWidth={1.7} />
            </div>
            <h3 className="text-[18px] font-semibold tracking-tight">{s.title}</h3>
            <p className="text-[14px] rh-text-muted mt-2 leading-relaxed">{s.desc}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

/* ============================================================
   FEATURED PORTFOLIO
   ============================================================ */

const projects = [
  {
    title: "Hospital Management System",
    category: "Healthcare SaaS",
    outcome: "Digitized 15+ operational workflows",
    stack: ["Next.js", "Postgres", "Redis", "AWS"],
    tone: "from-[#7C3AED] to-[#22D3EE]",
  },
  {
    title: "EduNova LMS",
    category: "EdTech Platform",
    outcome: "Scaled to 10,000 concurrent learners",
    stack: ["React", "Node", "Mux", "Supabase"],
    tone: "from-[#22D3EE] to-[#10B981]",
  },
  {
    title: "FleetIQ Tracker",
    category: "Logistics IoT",
    outcome: "Real-time tracking, 99.9% uptime",
    stack: ["Flutter", "Mapbox", "MQTT", "Go"],
    tone: "from-[#F59E0B] to-[#7C3AED]",
  },
  {
    title: "Banking AI Assistant",
    category: "Conversational AI",
    outcome: "Resolved 64% queries without human",
    stack: ["LangChain", "GPT", "FastAPI"],
    tone: "from-[#10B981] to-[#22D3EE]",
  },
];

const ProjectCard = ({ p }: { p: typeof projects[number] }) => (
  <FadeUp>
    <div className="rh-surface rh-card-hover overflow-hidden h-full flex flex-col">
      {/* Visual */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${p.tone} opacity-30`} />
        <div className="absolute inset-0" style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black 50%, transparent 90%)",
        }} />
        {/* Faux app window */}
        <div className="absolute left-6 right-6 bottom-6 rh-surface-elevated p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 rounded bg-white/10 w-2/3" />
            <div className="h-2 rounded bg-white/[0.06] w-full" />
            <div className="h-2 rounded bg-white/[0.06] w-5/6" />
          </div>
        </div>
      </div>
      {/* Meta */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[11px] rh-text-dim uppercase tracking-[0.18em]">{p.category}</div>
        <h3 className="text-[20px] font-semibold mt-2 tracking-tight">{p.title}</h3>
        <p className="text-[13.5px] rh-text-muted mt-2">{p.outcome}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((t) => (
            <span key={t} className="text-[11px] px-2 py-1 rounded-md border border-white/[0.08] bg-white/[0.03] text-white/70">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </FadeUp>
);

const Portfolio = () => (
  <Section>
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
      <SectionHead eyebrow="Selected work" title="Real products." accent="Real outcomes." />
      <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost self-start md:self-auto">
        View all <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
    </div>
  </Section>
);

/* ============================================================
   PROCESS TIMELINE
   ============================================================ */

const steps = [
  { n: "01", t: "Discovery", d: "Workshops, audits, and clear problem framing." },
  { n: "02", t: "Strategy", d: "Architecture, roadmap, and measurable success." },
  { n: "03", t: "Design", d: "Systems-led product design and prototypes." },
  { n: "04", t: "Development", d: "Sprint-shipped, tested, reviewed code." },
  { n: "05", t: "Launch", d: "CI/CD, observability, and a confident go-live." },
  { n: "06", t: "Scale", d: "Performance, hiring support, and roadmap evolution." },
];

const Process = () => (
  <Section>
    <SectionHead eyebrow="How we work" title="A process built for" accent="shipping." />
    <div className="relative">
      <div className="absolute left-0 right-0 top-9 hidden lg:block h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
        {steps.map((s, i) => (
          <FadeUp key={s.n} delay={i * 0.05}>
            <div className="relative">
              <div className="relative w-9 h-9 rounded-full bg-[#0D0D12] border border-white/[0.12] flex items-center justify-center text-[12px] font-semibold text-[#A78BFA] mx-auto lg:mx-0">
                {s.n}
              </div>
              <div className="mt-5">
                <h4 className="text-[15px] font-semibold">{s.t}</h4>
                <p className="text-[13px] rh-text-muted mt-1.5 leading-relaxed">{s.d}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </Section>
);

/* ============================================================
   ENGINEERING PROOF
   ============================================================ */

const EngineeringProof = () => (
  <Section>
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      <FadeUp>
        <div className="h-full">
          <span className="rh-eyebrow"><span className="dot" />Engineering proof</span>
          <h2 className="text-[34px] md:text-[42px] font-semibold mt-5 tracking-tight leading-[1.1]">
            We write the kind of code we'd{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] to-[#22D3EE]">trust on call.</span>
          </h2>
          <p className="rh-text-muted mt-5 text-[15px] leading-relaxed max-w-lg">
            Typed end-to-end. Tested where it counts. Observable in production.
            Reviewed by humans before it touches your users.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 max-w-md">
            {[
              { k: "TypeScript-first", icon: Code2 },
              { k: "Tested & reviewed", icon: CheckCircle2 },
              { k: "Observable", icon: Activity },
              { k: "Performance-budgeted", icon: Zap },
            ].map(({ k, icon: I }) => (
              <div key={k} className="rh-surface p-3 flex items-center gap-2.5">
                <I className="w-4 h-4 text-[#A78BFA]" strokeWidth={1.8} />
                <span className="text-[13px] text-white/80">{k}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="rh-surface-elevated overflow-hidden">
          {/* Editor header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span className="text-[11px] rh-text-dim font-mono">api/checkout.ts</span>
          </div>
          <pre
            className="rh-code px-5 py-5 m-0 overflow-x-auto"
            dangerouslySetInnerHTML={{
              __html: `<span class="tk-com">// idempotent + typed end-to-end</span>
<span class="tk-key">export const</span> <span class="tk-fn">createCheckout</span> = <span class="tk-fn">handler</span>({
  schema: z.object({
    cartId: z.<span class="tk-fn">string</span>().<span class="tk-fn">uuid</span>(),
    plan:   z.<span class="tk-fn">enum</span>([<span class="tk-str">"starter"</span>, <span class="tk-str">"pro"</span>, <span class="tk-str">"enterprise"</span>]),
  }),
  rateLimit: { perMinute: <span class="tk-num">30</span> },
  <span class="tk-key">async</span> <span class="tk-fn">run</span>({ input, ctx }) {
    <span class="tk-key">const</span> session = <span class="tk-key">await</span> billing.<span class="tk-fn">checkout</span>(input);
    log.<span class="tk-fn">info</span>(<span class="tk-str">"checkout.created"</span>, { id: session.id });
    <span class="tk-key">return</span> { url: session.url };
  },
});`,
            }}
          />
          {/* Faux terminal */}
          <div className="border-t border-white/[0.06] px-5 py-4 bg-black/40">
            <div className="rh-code text-[12px]">
              <div className="rh-text-dim">$ pnpm test --filter checkout</div>
              <div className="text-emerald-300 mt-1">✓ 24 passed · 0 failed · 1.2s</div>
              <div className="rh-text-dim mt-2">$ rh deploy --prod</div>
              <div className="text-emerald-300 mt-1">✓ live · checkout.api · region: ap-south-1</div>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </Section>
);

/* ============================================================
   FOUNDER NOTE
   ============================================================ */

const Founder = () => (
  <Section>
    <FadeUp>
      <div className="rh-surface p-8 md:p-12 grid md:grid-cols-[160px_1fr] gap-8 items-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden mx-auto md:mx-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#A78BFA] to-[#22D3EE]" />
          <div className="absolute inset-0 flex items-center justify-center text-[44px] font-semibold text-white/95"
               style={{ fontFamily: "var(--rh-font-display)" }}>
            RH
          </div>
        </div>
        <div>
          <Quote className="w-6 h-6 text-[#A78BFA]/60" />
          <p className="text-[18px] md:text-[20px] leading-relaxed mt-4 text-white/85">
            I started RH Software because most agencies hand over a polished demo
            and disappear. We're built differently — small, senior, and accountable
            to outcomes long after launch. If you want a partner who treats your
            product like our own, you'll feel that on day one.
          </p>
          <div className="mt-5 flex items-center gap-2 text-[13px]">
            <span className="font-semibold text-white">Founder</span>
            <span className="rh-text-dim">· RH Software, a SIAT engineering studio</span>
          </div>
        </div>
      </div>
    </FadeUp>
  </Section>
);

/* ============================================================
   PRICING TEASER
   ============================================================ */

const tiers = [
  { name: "Starter", price: "₹ 60k+", desc: "Marketing sites, MVPs, landing systems.", features: ["Up to 2 weeks", "Design + dev", "1 round of revisions"] },
  { name: "Growth", price: "₹ 2.5L+", desc: "Web apps, SaaS MVPs, internal tools.", features: ["6–8 week build", "Auth, DB, payments", "30-day post-launch"], highlight: true },
  { name: "Enterprise", price: "Custom", desc: "Long-term product partnerships.", features: ["Dedicated team", "Custom architecture", "SLAs & on-call"] },
];

const Pricing = () => (
  <Section>
    <SectionHead eyebrow="Engagements" title="Built for the stage" accent="you're at." />
    <div className="grid md:grid-cols-3 gap-5">
      {tiers.map((t) => (
        <FadeUp key={t.name}>
          <div className={`rh-surface rh-card-hover p-7 h-full relative ${t.highlight ? "ring-1 ring-[#7C3AED]/40" : ""}`}>
            {t.highlight && (
              <span className="absolute -top-3 left-7 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#7C3AED] text-white">
                Recommended
              </span>
            )}
            <div className="text-[14px] rh-text-muted">{t.name}</div>
            <div className="text-[32px] font-semibold mt-1.5 tracking-tight">{t.price}</div>
            <p className="text-[13.5px] rh-text-muted mt-2 leading-relaxed">{t.desc}</p>
            <ul className="mt-6 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[13.5px] text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link to="/rhsoftware/contact" className={`mt-7 rh-btn w-full justify-center ${t.highlight ? "rh-btn-primary" : "rh-btn-ghost"}`}>
              {t.name === "Enterprise" ? "Book consultation" : "Start a project"}
            </Link>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

/* ============================================================
   CTA BAND
   ============================================================ */

const CTABand = () => (
  <Section>
    <FadeUp>
      <div className="relative rh-surface-elevated overflow-hidden p-10 md:p-16 text-center">
        <div aria-hidden className="absolute inset-0 opacity-60"
          style={{ background: "radial-gradient(600px 240px at 50% 0%, rgba(124,58,237,0.25), transparent 70%)" }} />
        <div className="relative">
          <h2 className="text-[34px] md:text-[52px] font-semibold tracking-tight leading-[1.05]">
            Have an idea worth building?{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] to-[#22D3EE]">Let's talk.</span>
          </h2>
          <p className="rh-text-muted mt-5 max-w-xl mx-auto text-[15px]">
            Tell us where you are. We'll come back with a roadmap, a price, and a clear next step — usually within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">Book a strategy call</Link>
            <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">See our work</Link>
          </div>
        </div>
      </div>
    </FadeUp>
  </Section>
);

/* ============================================================
   PAGE
   ============================================================ */

const RHSoftwarePage = () => {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <Portfolio />
      <Process />
      <EngineeringProof />
      <Founder />
      <Pricing />
      <CTABand />
    </>
  );
};

export default RHSoftwarePage;
