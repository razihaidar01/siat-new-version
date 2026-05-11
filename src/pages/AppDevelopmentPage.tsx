import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Smartphone,
  Layers, Rocket, ShieldCheck, Zap, LayoutGrid, Terminal,
  Code2, Activity, Quote, Eye, TrendingUp, Server, Apple,
  Play, Box, Palette, Globe,
} from "lucide-react";
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
  <section id={id} className={`py-20 md:py-28 px-6 md:px-10 relative ${className}`}>
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
   HERO — App‑focused Bento composition
   ============================================================ */
const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative pt-10 md:pt-16 pb-16 md:pb-24 px-6 md:px-10">
      {/* Soft hero aurora */}
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
                <span className="dot" /> App Studio · Available for projects
              </span>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h1 className="mt-6 text-[42px] md:text-[64px] leading-[1.02] font-semibold tracking-[-0.03em]">
                Apps that{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#C4B5FD] to-[#22D3EE]">
                  people actually use
                </span>{" "}
                <span className="rh-text-dim italic font-normal">— not just download.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="mt-6 text-[16px] md:text-[17px] leading-relaxed rh-text-muted max-w-[560px]">
                Native iOS, Android, and cross‑platform apps engineered for performance,
                offline‑first reliability, and delightful user experiences. From MVP to
                App Store, we ship exactly what your business needs.
              </p>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/contact-us" className="rh-btn rh-btn-primary">
                  Discuss your app <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">
                  View our work
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { k: "35+", v: "Apps shipped" },
                  { k: "4.8★", v: "Average rating" },
                  { k: "₹20k", v: "Starting price" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="text-[24px] md:text-[28px] font-semibold tracking-tight text-white">{s.k}</div>
                    <div className="text-[12px] rh-text-dim mt-0.5 leading-tight">{s.v}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — App‑themed Bento mockups */}
          <div className="lg:col-span-6">
            <FadeUp delay={0.1} y={36}>
              <div className="relative grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 aspect-[1/1] md:aspect-[5/4]">
                {/* Phone frame */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="rh-surface col-span-2 row-span-4 p-3 relative overflow-hidden rounded-2xl border border-white/[0.06]"
                >
                  <div className="flex flex-col items-center gap-1.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="h-2 rounded bg-white/10 w-2/3" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 rounded bg-[#7C3AED]/30 w-full" />
                    <div className="h-2 rounded bg-white/[0.06] w-full" />
                    <div className="h-2 rounded bg-white/[0.06] w-5/6" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-12 rounded-lg bg-white/[0.04] border border-white/[0.05]" />
                    ))}
                  </div>
                </motion.div>

                {/* App stats card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="rh-surface col-span-4 row-span-2 p-4 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] flex items-center justify-center">
                        <TrendingUp className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <div className="text-[11px] rh-text-dim">Downloads</div>
                        <div className="text-[16px] font-semibold">24,500</div>
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300 font-medium">
                      ▲ 22% MoM
                    </div>
                  </div>
                  <div className="mt-3 flex gap-1">
                    {[80, 55, 70, 40, 65, 90, 60].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-white/[0.08]" style={{ height: `${h / 3}px` }} />
                    ))}
                  </div>
                </motion.div>

                {/* Cross‑platform chip */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="rh-surface col-span-2 row-span-2 p-3 relative overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Apple className="w-3.5 h-3.5 text-white/60" />
                    <Play className="w-3.5 h-3.5 text-white/60" />
                  </div>
                  <div className="text-[11px] rh-text-dim">iOS + Android</div>
                  <div className="text-[13px] font-semibold mt-0.5">React Native</div>
                  <div className="text-[10px] rh-text-dim mt-1">Single codebase · 60fps</div>
                </motion.div>

                {/* App Store badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="rh-surface col-span-4 row-span-2 p-3 flex items-center justify-center"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                      <Rocket className="w-3.5 h-3.5 text-[#A78BFA]" />
                    </div>
                    <div>
                      <div className="text-[11px] rh-text-dim">Last deploy</div>
                      <div className="text-[13px] font-semibold">v2.7 · 3 days ago</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   TRUST STRIP — app outcomes
   ============================================================ */
const Trust = () => {
  const items = [
    "4.8★ average app store rating",
    "60% faster booking flows",
    "Sub‑2s cold start on low‑end devices",
    "99.9% API uptime",
    "Offline‑first architecture",
    "App Store approved in 1st attempt",
  ];
  return (
    <section className="py-10 border-y border-white/[0.05] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-[11px] rh-text-dim uppercase tracking-[0.18em] mb-6 text-center">
          Apps we deliver — real impact
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {items.map((i) => (
            <div key={i} className="flex items-center gap-2 text-[13px] text-white/70">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {i}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SERVICES BENTO — app‑specific
   ============================================================ */
const servicesList = [
  { icon: Smartphone, title: "iOS & Android Native", desc: "Swift/Kotlin apps with platform‑perfect UI and hardware integration.", span: "md:col-span-2" },
  { icon: Layers, title: "Cross‑Platform", desc: "React Native & Flutter apps that share 90%+ code without sacrificing feel.", span: "" },
  { icon: Palette, title: "UI/UX Prototyping", desc: "Interactive prototypes tested with real users before a single line of code.", span: "" },
  { icon: Rocket, title: "MVP to Scale", desc: "Lean MVPs that validate fast, then scale to millions of users incrementally.", span: "md:col-span-2" },
  { icon: ShieldCheck, title: "App Store Deployment", desc: "Full submission handling for Apple App Store & Google Play, including ASO.", span: "" },
  { icon: Globe, title: "Offline‑First & Sync", desc: "Local databases & background sync so your app works even on patchy networks.", span: "" },
];

const Services = () => (
  <Section id="services">
    <SectionHead eyebrow="What we build" title="App services." accent="One studio." sub="From concept to store, our team stays with you." />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {servicesList.map((s, i) => (
        <FadeUp key={s.title} delay={i * 0.04} className={s.span}>
          <div className="rh-surface rh-card-hover p-6 h-full">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
              <s.icon className="w-5 h-5 text-[#A78BFA]" strokeWidth={1.7} />
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
   FEATURED APP PORTFOLIO
   ============================================================ */
const projects = [
  {
    title: "FleetIQ Tracker",
    category: "Logistics IoT",
    outcome: "Real‑time GPS, 99.9% uptime, 5k+ drivers",
    stack: ["Flutter", "Mapbox", "MQTT", "Go"],
    tone: "from-[#7C3AED] to-[#22D3EE]",
  },
  {
    title: "MediConsult",
    category: "Healthcare App",
    outcome: "Telemedicine platform, 15k+ consultations",
    stack: ["React Native", "WebRTC", "Node", "AWS"],
    tone: "from-[#22D3EE] to-[#10B981]",
  },
  {
    title: "BazaarLocal",
    category: "E‑commerce App",
    outcome: "Hyperlocal marketplace, 2k+ shops onboarded",
    stack: ["Flutter", "Firebase", "Razorpay", "GCP"],
    tone: "from-[#F59E0B] to-[#7C3AED]",
  },
  {
    title: "StudyCircle",
    category: "EdTech App",
    outcome: "Live classrooms, 10k concurrent users",
    stack: ["React Native", "Mux", "Supabase", "Vercel"],
    tone: "from-[#10B981] to-[#22D3EE]",
  },
];

const ProjectCard = ({ p }: { p: (typeof projects)[number] }) => (
  <FadeUp>
    <div className="rh-surface rh-card-hover overflow-hidden h-full flex flex-col">
      {/* Visual */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${p.tone} opacity-30`} />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black 50%, transparent 90%)",
        }} />
        {/* Faux phone screen */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-32 h-48 rounded-2xl border border-white/10 bg-black/40 p-2">
          <div className="w-full h-4 bg-white/[0.06] rounded mb-1" />
          <div className="w-full h-2 bg-white/[0.06] rounded mb-0.5" />
          <div className="w-2/3 h-2 bg-white/[0.06] rounded" />
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
      <SectionHead eyebrow="Selected work" title="Apps that deliver." accent="Real outcomes." />
      <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost self-start md:self-auto">
        View all apps <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
    </div>
  </Section>
);

/* ============================================================
   PROCESS TIMELINE (app‑specific)
   ============================================================ */
const steps = [
  { n: "01", t: "Idea & Scoping", d: "Define features, user flows, and tech stack." },
  { n: "02", t: "Wireframes", d: "Low‑fi prototypes to lock interaction design." },
  { n: "03", t: "UI Design", d: "High‑fidelity screens aligned with your brand." },
  { n: "04", t: "Development", d: "Sprint‑based coding with weekly demos." },
  { n: "05", t: "Testing", d: "QA on real devices, performance audits." },
  { n: "06", t: "Launch & Support", d: "Store submission, monitoring, and updates." },
];

const Process = () => (
  <Section>
    <SectionHead eyebrow="How we work" title="A process built for" accent="shipping apps." />
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
   ENGINEERING PROOF — app code & metrics
   ============================================================ */
const EngineeringProof = () => (
  <Section>
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      <FadeUp>
        <div className="h-full">
          <span className="rh-eyebrow"><span className="dot" />Engineering proof</span>
          <h2 className="text-[34px] md:text-[42px] font-semibold mt-5 tracking-tight leading-[1.1]">
            The code behind your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] to-[#22D3EE]">app.</span>
          </h2>
          <p className="rh-text-muted mt-5 text-[15px] leading-relaxed max-w-lg">
            Every app we build is type‑safe, thoroughly tested, and designed for offline use.
            Cold start under 2 seconds, even on ₹8,000 Android phones.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 max-w-md">
            {[
              { k: "Offline‑first", icon: Globe },
              { k: "Code sharing 90%+", icon: Code2 },
              { k: "CI/CD pipelines", icon: Activity },
              { k: "Real‑device tested", icon: Smartphone },
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
            <span className="text-[11px] rh-text-dim font-mono">App.tsx</span>
          </div>
          <pre className="rh-code px-5 py-5 m-0 overflow-x-auto">
{`<QueryClientProvider client={queryClient}>
  <OfflineBanner />
  <TabNavigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Orders" component={Orders} />
  </TabNavigator>
</QueryClientProvider>`}
          </pre>
          {/* Faux terminal */}
          <div className="border-t border-white/[0.06] px-5 py-4 bg-black/40">
            <div className="rh-code text-[12px]">
              <div className="rh-text-dim">$ npx react-native run-ios</div>
              <div className="text-emerald-300 mt-1">✓ Metro bundler ready</div>
              <div className="rh-text-dim mt-2">$ eas submit --platform all</div>
              <div className="text-emerald-300 mt-1">✓ iOS and Android builds submitted</div>
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
      <div className="rh-surface p-8 md:p-12 grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-center">
        <div className="relative w-44 h-56 md:w-[220px] md:h-[280px] rounded-2xl overflow-hidden mx-auto md:mx-0 ring-1 ring-white/10">
          <img
            src={raziHaidarImg}
            alt="Razi Haidar — Founder & CEO of RH Software (by SIAT), Bihar"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-[14px] font-semibold text-white leading-tight">Razi Haidar</div>
            <div className="text-[11px] text-white/70">Founder & CEO</div>
          </div>
        </div>
        <div>
          <Quote className="w-6 h-6 text-[#A78BFA]/60" />
          <p className="text-[18px] md:text-[20px] leading-relaxed mt-4 text-white/85">
            We build apps that work offline, feel native, and scale effortlessly.
            Whether you need a simple MVP or a full‑featured product, our team delivers
            the same quality startups in Bangalore expect — right here from Bihar.
          </p>
          <div className="mt-5 flex items-center gap-2 text-[13px] flex-wrap">
            <span className="font-semibold text-white">Razi Haidar</span>
            <span className="rh-text-dim">· Founder & CEO, RH Software (a SIAT engineering studio)</span>
          </div>
        </div>
      </div>
    </FadeUp>
  </Section>
);

/* ============================================================
   PRICING TEASER — app tiers
   ============================================================ */
const tiers = [
  {
    name: "MVP",
    price: "₹ 20k+",
    desc: "Single‑platform app to validate your idea quickly.",
    features: ["4‑6 weeks", "1 platform (iOS or Android)", "Basic backend", "App store submission"],
  },
  {
    name: "Business",
    price: "₹ 75k+",
    desc: "Full‑featured cross‑platform app with payment & login.",
    features: ["8‑12 weeks", "iOS + Android", "Authentication, APIs", "Push notifications", "Analytics"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Complex products with offline sync, real‑time, and custom hardware.",
    features: ["Dedicated team", "Scalable architecture", "CI/CD pipeline", "SLAs & maintenance"],
  },
];

const Pricing = () => (
  <Section>
    <SectionHead eyebrow="Engagements" title="App pricing for every" accent="stage." />
    <div className="grid md:grid-cols-3 gap-5">
      {tiers.map((t) => (
        <FadeUp key={t.name}>
          <div className={`rh-surface rh-card-hover p-7 h-full relative ${t.highlight ? "ring-1 ring-[#7C3AED]/40" : ""}`}>
            {t.highlight && (
              <span className="absolute -top-3 left-7 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#7C3AED] text-white">
                Most popular
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
            <Link to="/contact-us" className={`mt-7 rh-btn w-full justify-center ${t.highlight ? "rh-btn-primary" : "rh-btn-ghost"}`}>
              {t.name === "Enterprise" ? "Book consultation" : "Get a quote"}
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
            Ready to turn your idea into an app?{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] to-[#22D3EE]">Let's talk.</span>
          </h2>
          <p className="rh-text-muted mt-5 max-w-xl mx-auto text-[15px]">
            We'll sketch a roadmap, estimate timelines, and show you comparable work — usually within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contact-us" className="rh-btn rh-btn-primary">Book a free consultation</Link>
            <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">View portfolio</Link>
          </div>
        </div>
      </div>
    </FadeUp>
  </Section>
);

/* ============================================================
   PAGE
   ============================================================ */
const AppDevelopmentPage = () => {
  return (
    <>
      <SEOHead
        title="Best App Development Company in Bihar | RH Software (SIAT) | iOS & Android"
        description="RH Software (SIAT) – Best mobile app development company in Bihar. iOS & Android apps for businesses in Saharsa, Madhepura, Purnia, Supaul & all Bihar. React Native & Flutter experts. Starting ₹20,000!"
        canonical={`${RH_BASE_URL}/rhsoftware/app-development-company-bihar`}
        keywords="app development company bihar, mobile app developer saharsa, app developer madhepura, android app purnia, iOS app developer bihar, React Native Bihar, Flutter app development bihar, ऐप डेवलपर बिहार"
        schema={[
          rhOrganizationSchema,
          rhLocalBusinessSchema,
          rhBreadcrumb([
            { name: "Home", url: RH_BASE_URL },
            { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
            { name: "App Development Bihar", url: `${RH_BASE_URL}/rhsoftware/app-development-company-bihar` },
          ]),
          rhFaqSchema([
            { q: "Best app developer in Bihar?", a: "RH Software by SIAT is Bihar's best app development company. We build iOS and Android apps using React Native and Flutter for businesses across all Bihar districts." },
            { q: "App banane ka kharcha Bihar mein?", a: "Basic Android app ₹20,000 se shuru. iOS+Android app ₹40,000+. Enterprise apps custom pricing. 1 year support included." },
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

export default AppDevelopmentPage;
