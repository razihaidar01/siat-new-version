import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Globe, Smartphone,
  Palette, Rocket, ShieldCheck, Zap, LayoutGrid, Terminal,
  Code2, Activity, Quote, Eye, TrendingUp, Server, Layers,
} from "lucide-react";
import RHCinematicHero from "@/components/rh/RHCinematicHero";
import SEOHead from "@/components/SEOHead";
import {
  rhOrganizationSchema,
  rhLocalBusinessSchema,
  rhBreadcrumb,
  rhFaqSchema,
  RH_BASE_URL,
} from "@/lib/rhSeo";
import raziHaidarImg from "@/assets/razi-haidar-founder.jpg";

/* ============================================================
   Small primitives
   ============================================================ */
const FadeUp = ({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) => {
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
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section
    id={id}
    className={`py-20 md:py-28 px-6 md:px-10 relative ${className}`}
  >
    <div className="max-w-7xl mx-auto relative z-10">{children}</div>
  </section>
);

const SectionHead = ({
  eyebrow,
  title,
  accent,
  sub,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
}) => (
  <FadeUp className="max-w-2xl mb-14">
    <span className="rh-eyebrow">
      <span className="dot" />
      {eyebrow}
    </span>
    <h2 className="text-[34px] md:text-[44px] leading-[1.05] font-semibold mt-5">
      {title}{" "}
      {accent && (
        <span className="text-primary from-primary via-primary to-primary">
          {accent}
        </span>
      )}
    </h2>
    {sub && (
      <p className="rh-text-muted mt-4 text-[15px] leading-relaxed max-w-xl">
        {sub}
      </p>
    )}
  </FadeUp>
);

/* ============================================================
   HERO — Website‑focused Bento composition
   ============================================================ */
const Hero = () => (
  <>
    <RHCinematicHero chapter="02 / WEBSITE ENGINEERING" eyebrow="RH Software · Available for projects" title={<>
                Websites that{" "}
                <span className="text-primary from-foreground via-primary to-primary">
                  grow your business
                </span>{" "}
                <span className="rh-text-dim italic font-normal">
                  — not just look good.
                </span>
              </>} description="We design and develop SEO‑optimized, lightning‑fast websites that convert visitors into customers. Every project includes mobile‑first design, performance budgets, and at‑launch search visibility.">
      <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact-us"
                  className="rh-btn rh-btn-primary"
                >
                  Get a free quote <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/rhsoftware/portfolio"
                  className="rh-btn rh-btn-ghost"
                >
                  View our websites
                </Link>
              </div>
      <div className="rh-hero-stats">{[{ k: "40+", v: "Websites launched" },
                  { k: "98+", v: "Avg. PageSpeed score" },
                  { k: "₹15k", v: "Starting price" },
                ].map((s) => <div key={s.v}><strong>{s.k}</strong><span>{s.v}</span></div>)}</div>
    </RHCinematicHero>
    <Section>          {/* RIGHT — Website‑themed Bento mockups */}
          <div className="max-w-3xl mx-auto">
            <FadeUp delay={0.1} y={36}>
              <div className="relative grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 aspect-[1/1] md:aspect-[5/4]">
                {/* Dashboard card — website analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="rh-surface col-span-6 row-span-4 p-4 md:p-5 overflow-hidden relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                    <div className="text-[10px] rh-text-dim font-mono">
                      yourbusiness.in
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[11px] rh-text-dim uppercase tracking-wider">
                        Monthly Organic Traffic
                      </div>
                      <div className="text-[26px] md:text-[32px] font-semibold mt-1 tracking-tight">
                        14,280
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] text-primary font-medium">
                      ▲ 38.4%
                    </div>
                  </div>

                  {/* Sparkline */}
                  <svg viewBox="0 0 300 80" className="w-full h-20 mt-4">
                    <defs>
                      <linearGradient
                        id="g1"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="var(--rh-accent)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="var(--rh-accent)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,60 C30,55 50,30 80,35 C110,40 130,15 160,20 C190,25 215,55 240,40 C265,25 285,30 300,18 L300,80 L0,80 Z"
                      fill="url(#g1)"
                    />
                    <path
                      d="M0,60 C30,55 50,30 80,35 C110,40 130,15 160,20 C190,25 215,55 240,40 C265,25 285,30 300,18"
                      fill="none"
                      stroke="var(--rh-accent-light)"
                      strokeWidth="1.5"
                    />
                  </svg>

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[
                      { l: "Bounce rate", v: "23%" },
                      { l: "Avg. session", v: "4m 12s" },
                      { l: "Goal conv.", v: "7.4%" },
                    ].map((m) => (
                      <div
                        key={m.l}
                        className="rounded-lg border border-foreground/[0.06] bg-foreground/[0.02] p-2.5"
                      >
                        <div className="text-[10px] rh-text-dim">{m.l}</div>
                        <div className="text-[13px] font-semibold mt-0.5">
                          {m.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Mobile mock */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="rh-surface col-span-3 row-span-2 p-3 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  <div className="relative flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <div className="text-[11px] rh-text-dim">
                        Mobile UX
                      </div>
                      <div className="text-[13px] font-semibold">
                        60fps · 0.2s LCP
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    {[40, 70, 55, 85, 60, 90].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-foreground/[0.08]"
                        style={{ height: 4 + h / 4 }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* SEO chip */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="rh-surface col-span-3 row-span-2 p-3 relative overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] rh-text-dim font-mono">
                      lighthouse.json
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">
                        98
                      </div>
                      <div className="text-[10px] rh-text-dim">Perf</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">
                        100
                      </div>
                      <div className="text-[10px] rh-text-dim">SEO</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-primary">
                        100
                      </div>
                      <div className="text-[10px] rh-text-dim">A11y</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
</Section>
  </>
);

/* ============================================================
   TRUST STRIP — website outcomes
   ============================================================ */
const Trust = () => {
  const items = [
    "Average load time under 1.2s",
    "Mobile score 98+ (Lighthouse)",
    "Organic traffic doubled in 3 months",
    "Conversion rate improved 40%",
    "Zero downtime in 12 months",
    "Google Page 1 for target keywords",
  ];
  return (
    <section className="py-10 border-y border-foreground/[0.05] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-[11px] rh-text-dim uppercase tracking-[0.18em] mb-6 text-center">
          Websites we deliver — real results
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {items.map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[13px] text-foreground/70"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              {i}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SERVICES BENTO — website‑specific
   ============================================================ */
const servicesList = [
  {
    icon: Globe,
    title: "Business Websites",
    desc: "Premium corporate sites that rank on Google and convert visitors into leads.",
    span: "md:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Mobile‑First Design",
    desc: "Every pixel engineered for phone, tablet, and desktop — 60fps animations.",
    span: "",
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    desc: "Design systems and prototypes that align with your brand identity.",
    span: "",
  },
  {
    icon: Rocket,
    title: "E‑commerce",
    desc: "Shopify, WooCommerce, or custom carts — secure, fast, and scalable.",
    span: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    desc: "Core Web Vitals under budget: LCP < 1.5s, CLS < 0.05, TTI under 2s.",
    span: "",
  },
  {
    icon: ShieldCheck,
    title: "SEO & Security",
    desc: "On‑page SEO, SSL, monitoring, and routine audits baked into every project.",
    span: "",
  },
];

const Services = () => (
  <Section id="services">
    <SectionHead
      eyebrow="What we build"
      title="Website services."
      accent="One team."
      sub="From landing pages to full‑fledged e‑commerce — strategy, design, and development sit together."
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {servicesList.map((s, i) => (
        <FadeUp key={s.title} delay={i * 0.04} className={s.span}>
          <div className="rh-surface rh-card-hover p-6 h-full">
            <div className="w-10 h-10 rounded-md bg-foreground/[0.04] border border-foreground/[0.08] flex items-center justify-center mb-5">
              <s.icon
                className="w-5 h-5 text-primary"
                strokeWidth={1.7}
              />
            </div>
            <h3 className="text-[18px] font-semibold tracking-tight">
              {s.title}
            </h3>
            <p className="text-[14px] rh-text-muted mt-2 leading-relaxed">
              {s.desc}
            </p>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

/* ============================================================
   FEATURED WEBSITE PORTFOLIO
   ============================================================ */
const projects = [
  {
    title: "Mahi Hospital",
    category: "Healthcare Website",
    outcome: "Online appointment scheduling, 60% fewer phone calls",
    stack: ["Next.js", "Prismic", "Postgres", "Vercel"],
    tone: "from-primary to-primary",
  },
  {
    title: "EduNova LMS",
    category: "EdTech Platform",
    outcome: "Course marketplace for 5,000+ students",
    stack: ["React", "Node", "Strapi", "AWS"],
    tone: "from-primary to-primary",
  },
  {
    title: "Bihar Crafts",
    category: "E‑commerce",
    outcome: "Handicraft store with UPI payments & shipping",
    stack: ["WooCommerce", "PHP", "MySQL", "Cloudflare"],
    tone: "from-primary to-primary",
  },
  {
    title: "Shiksha Suvidha",
    category: "Government Portal",
    outcome: "Scholarship applications process 2× faster",
    stack: ["Angular", "Java", "Oracle", "GCP"],
    tone: "from-primary to-primary",
  },
];

const ProjectCard = ({ p }: { p: (typeof projects)[number] }) => (
  <FadeUp>
    <div className="rh-surface rh-card-hover overflow-hidden h-full flex flex-col">
      {/* Visual */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${p.tone} opacity-30`}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, black 50%, transparent 90%)",
          }}
        />
        {/* Faux app window */}
        <div className="absolute left-6 right-6 bottom-6 rh-surface-elevated p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-foreground/20" />
            <span className="w-2 h-2 rounded-full bg-foreground/20" />
            <span className="w-2 h-2 rounded-full bg-foreground/20" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 rounded bg-foreground/10 w-2/3" />
            <div className="h-2 rounded bg-foreground/[0.06] w-full" />
            <div className="h-2 rounded bg-foreground/[0.06] w-5/6" />
          </div>
        </div>
      </div>
      {/* Meta */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[11px] rh-text-dim uppercase tracking-[0.18em]">
          {p.category}
        </div>
        <h3 className="text-[20px] font-semibold mt-2 tracking-tight">
          {p.title}
        </h3>
        <p className="text-[13.5px] rh-text-muted mt-2">{p.outcome}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-1 rounded-md border border-foreground/[0.08] bg-foreground/[0.03] text-foreground/70"
            >
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
      <SectionHead
        eyebrow="Selected work"
        title="Websites that deliver."
        accent="Real results."
      />
      <Link
        to="/rhsoftware/portfolio"
        className="rh-btn rh-btn-ghost self-start md:self-auto"
      >
        View all websites <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((p) => (
        <ProjectCard key={p.title} p={p} />
      ))}
    </div>
  </Section>
);

/* ============================================================
   PROCESS TIMELINE
   ============================================================ */
const steps = [
  { n: "01", t: "Discovery", d: "Understand your goals, audience, and content strategy." },
  { n: "02", t: "Design", d: "Wireframes to pixel‑perfect UI — reviewed with you." },
  { n: "03", t: "Development", d: "Clean, performant code with modern frameworks." },
  { n: "04", t: "SEO & Content", d: "On‑page SEO, metadata, and copy integration." },
  { n: "05", t: "Testing & Launch", d: "Cross‑browser, mobile, speed tests — then a confident go‑live." },
  { n: "06", t: "Support", d: "Hosting, maintenance, and continuous improvement." },
];

const Process = () => (
  <Section>
    <SectionHead
      eyebrow="How we work"
      title="Website process built for"
      accent="shipping."
    />
    <div className="relative">
      <div className="absolute left-0 right-0 top-9 hidden lg:block h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
        {steps.map((s, i) => (
          <FadeUp key={s.n} delay={i * 0.05}>
            <div className="relative">
              <div className="relative w-9 h-9 rounded-full bg-background border border-foreground/[0.12] flex items-center justify-center text-[12px] font-semibold text-primary mx-auto lg:mx-0">
                {s.n}
              </div>
              <div className="mt-5">
                <h4 className="text-[15px] font-semibold">{s.t}</h4>
                <p className="text-[13px] rh-text-muted mt-1.5 leading-relaxed">
                  {s.d}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </Section>
);

/* ============================================================
   ENGINEERING PROOF — website‑specific code & metrics
   ============================================================ */
const EngineeringProof = () => (
  <Section>
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      <FadeUp>
        <div className="h-full">
          <span className="rh-eyebrow">
            <span className="dot" />
            Engineering proof
          </span>
          <h2 className="text-[34px] md:text-[42px] font-semibold mt-5 tracking-tight leading-[1.1]">
            The code that powers your{" "}
            <span className="text-primary from-primary to-primary">
              website.
            </span>
          </h2>
          <p className="rh-text-muted mt-5 text-[15px] leading-relaxed max-w-lg">
            Every website we deliver passes Core Web Vitals with flying colours.
            Semantic HTML, lazy loading, efficient CSS — your Lighthouse scores
            stay in the green.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 max-w-md">
            {[
              { k: "Semantic HTML", icon: Code2 },
              { k: "Accessible (a11y)", icon: Eye },
              { k: "Optimised assets", icon: Zap },
              { k: "Edge‑caching", icon: Server },
            ].map(({ k, icon: I }) => (
              <div
                key={k}
                className="rh-surface p-3 flex items-center gap-2.5"
              >
                <I className="w-4 h-4 text-primary" strokeWidth={1.8} />
                <span className="text-[13px] text-foreground/80">{k}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="rh-surface-elevated overflow-hidden">
          {/* Editor header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/[0.06]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>
            <span className="text-[11px] rh-text-dim font-mono">
              head.html
            </span>
          </div>
          <pre className="rh-code px-5 py-5 m-0 overflow-x-auto">
            {`<meta name="description" content="..." />
<link rel="preload" href="/fonts/..." as="font" crossorigin>
<style>
  @font-face { ... }
  body { font-display: swap; }
</style>
<script type="application/ld+json">
  { ... }
</script>`}
          </pre>
          {/* Faux terminal */}
          <div className="border-t border-foreground/[0.06] px-5 py-4 bg-background/40">
            <div className="rh-code text-[12px]">
              <div className="rh-text-dim">$ lighthouse https://yourbusiness.in</div>
              <div className="mt-2 flex gap-3 text-primary">
                <span>Performance 98</span>
                <span>Accessibility 100</span>
                <span>SEO 100</span>
              </div>
              <div className="rh-text-dim mt-2">$ curl -I https://yourbusiness.in</div>
              <div className="text-primary mt-1">
                HTTP/2 200 · cache‑control: public,max‑age=31536000
              </div>
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
      <div className="rh-unframed p-8 md:p-12 grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-center">
        <div className="relative w-44 h-56 md:w-[220px] md:h-[280px] rounded-md overflow-hidden mx-auto md:mx-0 ring-1 ring-foreground/10">
          <img
            src={raziHaidarImg}
            alt="Razi Haidar — Founder & CEO of RH Software (by SIAT), Bihar"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-[14px] font-semibold text-foreground leading-tight">
              Razi Haidar
            </div>
            <div className="text-[11px] text-foreground/70">Founder & CEO</div>
          </div>
        </div>
        <div>
          <Quote className="w-6 h-6 text-primary/60" />
          <p className="text-[18px] md:text-[20px] leading-relaxed mt-4 text-foreground/85">
            I started this studio because small businesses in Bihar deserve the
            same quality of web presence as big‑city brands. We write clean
            code, optimise every kilobyte, and hand over a website that you can
            be proud of — without breaking the bank.
          </p>
          <div className="mt-5 flex items-center gap-2 text-[13px] flex-wrap">
            <span className="font-semibold text-foreground">Razi Haidar</span>
            <span className="rh-text-dim">
              · Founder & CEO, RH Software (a SIAT engineering studio)
            </span>
          </div>
        </div>
      </div>
    </FadeUp>
  </Section>
);

/* ============================================================
   PRICING TEASER — website tiers
   ============================================================ */
const tiers = [
  {
    name: "Starter",
    price: "₹ 15k+",
    desc: "Perfect for small businesses, portfolios, and landing pages.",
    features: [
      "1–2 weeks delivery",
      "5‑page responsive site",
      "Basic on‑page SEO",
      "SSL & hosting setup",
    ],
  },
  {
    name: "Business",
    price: "₹ 30k+",
    desc: "For growing companies that need CMS, blog, and lead capture.",
    features: [
      "2–4 weeks delivery",
      "Custom design & CMS",
      "Advanced SEO",
      "Analytics & forms",
    ],
    highlight: true,
  },
  {
    name: "E‑commerce",
    price: "₹ 75k+",
    desc: "Online stores with payment gateway, inventory, and shipping.",
    features: [
      "4–6 weeks delivery",
      "200+ products support",
      "Payment & shipping",
      "Order management",
    ],
  },
];

const Pricing = () => (
  <Section>
    <SectionHead
      eyebrow="Engagements"
      title="Website pricing for every"
      accent="stage."
    />
    <div className="grid md:grid-cols-3 gap-5">
      {tiers.map((t) => (
        <FadeUp key={t.name}>
          <div
            className={`rh-surface rh-card-hover p-7 h-full relative ${
              t.highlight ? "ring-1 ring-primary/40" : ""
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-7 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-primary text-foreground">
                Most popular
              </span>
            )}
            <div className="text-[14px] rh-text-muted">{t.name}</div>
            <div className="text-[32px] font-semibold mt-1.5 tracking-tight">
              {t.price}
            </div>
            <p className="text-[13.5px] rh-text-muted mt-2 leading-relaxed">
              {t.desc}
            </p>
            <ul className="mt-6 space-y-2.5">
              {t.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-[13.5px] text-foreground/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />{" "}
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/contact-us"
              className={`mt-7 rh-btn w-full justify-center ${
                t.highlight ? "rh-btn-primary" : "rh-btn-ghost"
              }`}
            >
              {t.name === "E‑commerce" ? "Book consultation" : "Get a quote"}
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
      <div className="relative rh-unframed overflow-hidden p-10 md:p-16 text-center">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(600px 240px at 50% 0%, hsl(var(--primary) / 0.25), transparent 70%)",
          }}
        />
        <div className="relative">
          <h2 className="text-[34px] md:text-[52px] font-semibold tracking-tight leading-[1.05]">
            Need a website that actually brings customers?{" "}
            <span className="text-primary from-primary to-primary">
              Let's build it.
            </span>
          </h2>
          <p className="rh-text-muted mt-5 max-w-xl mx-auto text-[15px]">
            Tell us about your business and we'll return a roadmap, a price, and
            a prototype — within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contact-us" className="rh-btn rh-btn-primary">
              Book a free consultation
            </Link>
            <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">
              See our work
            </Link>
          </div>
        </div>
      </div>
    </FadeUp>
  </Section>
);

/* ============================================================
   PAGE
   ============================================================ */
const WebDevelopmentPage = () => {
  return (
    <>
      <SEOHead
        title="Best Website Development Company in Bihar | RH Software (SIAT) | Saharsa, Madhepura, Purnia"
        description="RH Software (SIAT) – Best website development company in Bihar. We build fast, SEO-optimized, mobile-friendly websites for businesses in Saharsa, Madhepura, Purnia, Supaul & all Bihar. Starting ₹15,000. Free quote!"
        canonical={`${RH_BASE_URL}/rhsoftware/website-development-company-bihar`}
        keywords="website development company bihar, best website developer saharsa, website designer madhepura, web development purnia, website company supaul, professional website bihar, e-commerce website bihar, वेबसाइट डेवलपमेंट बिहार"
        schema={[
          rhOrganizationSchema,
          rhLocalBusinessSchema,
          rhBreadcrumb([
            { name: "Home", url: RH_BASE_URL },
            { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
            {
              name: "Website Development Bihar",
              url: `${RH_BASE_URL}/rhsoftware/website-development-company-bihar`,
            },
          ]),
          rhFaqSchema([
            {
              q: "Best website development company in Bihar?",
              a: "RH Software by SIAT is Bihar's best website development company, serving Saharsa, Madhepura, Purnia, Supaul and all Bihar districts with professional, SEO-optimized websites.",
            },
            {
              q: "Website banane ka kharcha kitna hai Bihar mein?",
              a: "RH Software mein website ₹15,000 se shuru hoti hai. Basic websites ₹15,000-30,000, business websites ₹30,000-1,00,000, e-commerce ₹75,000 se upar.",
            },
            {
              q: "How long to build website in Bihar?",
              a: "Basic website: 1-2 weeks. Business website: 2-4 weeks. E-commerce: 4-6 weeks. All with mobile-responsive design and basic SEO included.",
            },
          ]),
        ]}
      />

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

export default WebDevelopmentPage;
