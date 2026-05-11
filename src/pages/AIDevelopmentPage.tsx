import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Brain,
  Bot, BarChart3, Cog, Zap, Code2, Activity, Quote,
  Eye, TrendingUp, Server, Layers, Globe, Workflow,
  MessageSquare, Sparkles, Cpu,
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
   HERO — AI‑focused Bento composition
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
                <span className="dot" /> AI Studio · Available for projects
              </span>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h1 className="mt-6 text-[42px] md:text-[64px] leading-[1.02] font-semibold tracking-[-0.03em]">
                AI that{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#C4B5FD] to-[#22D3EE]">
                  works for your business
                </span>{" "}
                <span className="rh-text-dim italic font-normal">— not just a buzzword.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="mt-6 text-[16px] md:text-[17px] leading-relaxed rh-text-muted max-w-[560px]">
                From NLP chatbots to predictive analytics pipelines, we build custom
                AI systems that slice operational costs, automate mundane workflows,
                and surface insights you never knew you had.
              </p>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/contact-us" className="rh-btn rh-btn-primary">
                  Explore your AI use‑case <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">
                  See our AI work
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { k: "20+", v: "AI systems deployed" },
                  { k: "60%", v: "Avg. cost reduction" },
                  { k: "₹1L", v: "Starting price" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="text-[24px] md:text-[28px] font-semibold tracking-tight text-white">{s.k}</div>
                    <div className="text-[12px] rh-text-dim mt-0.5 leading-tight">{s.v}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — AI‑themed Bento mockups */}
          <div className="lg:col-span-6">
            <FadeUp delay={0.1} y={36}>
              <div className="relative grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 aspect-[1/1] md:aspect-[5/4]">
                {/* Chatbot mock */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="rh-surface col-span-4 row-span-3 p-4 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-[11px] rh-text-dim">AI Assistant</div>
                        <div className="text-[13px] font-semibold">Online</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">Active</span>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/[0.06] flex-shrink-0" />
                      <div className="bg-white/[0.04] rounded-xl rounded-tl-none px-3 py-2 text-[11px] rh-text-muted w-2/3">
                        How can I track my order?
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="bg-[#7C3AED]/20 rounded-xl rounded-tr-none px-3 py-2 text-[11px] text-white/80 w-2/3">
                        Sure! Your order #1932 is out for delivery and will arrive by 6 PM today.
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#7C3AED]/30 flex-shrink-0" />
                    </div>
                  </div>
                </motion.div>

                {/* NLP / Text extraction card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="rh-surface col-span-2 row-span-3 p-3 relative overflow-hidden flex flex-col items-center justify-center text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-2">
                    <MessageSquare className="w-5 h-5 text-[#A78BFA]" strokeWidth={1.7} />
                  </div>
                  <div className="text-[11px] rh-text-dim">NLP</div>
                  <div className="text-[13px] font-semibold mt-0.5">Sentiment Analysis</div>
                  <div className="mt-2 flex gap-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300">92%</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.04] text-white/60">Accuracy</span>
                  </div>
                </motion.div>

                {/* Automation chip + code snippet */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="rh-surface col-span-6 row-span-3 p-4 relative overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Workflow className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span className="text-[11px] rh-text-dim font-mono">automate.py</span>
                  </div>
                  <pre className="rh-code text-[11px] leading-[1.5] m-0">
{`from rh_ai import Pipeline

pipeline = Pipeline("invoice_ocr")
pipeline.add(OCR(model="indic"))
pipeline.add(Classifier("gst_category"))

output = pipeline.run("invoice.pdf")
# → extracted: ₹2,45,000
# → category: Office Supplies`}
                  </pre>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-emerald-300">Processed 1,203 docs today</span>
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
   TRUST STRIP — AI outcomes
   ============================================================ */
const Trust = () => {
  const items = [
    "60% drop in manual data entry",
    "3× faster customer query resolution",
    "Saved ₹12L/year through automation",
    "99.2% invoice OCR accuracy",
    "15% revenue uplift via recommendations",
    "Under 500ms API response time",
  ];
  return (
    <section className="py-10 border-y border-white/[0.05] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-[11px] rh-text-dim uppercase tracking-[0.18em] mb-6 text-center">
          AI that's already delivering
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
   SERVICES BENTO — AI‑specific
   ============================================================ */
const servicesList = [
  { icon: Bot, title: "Chatbot & Virtual Assistant", desc: "GPT‑powered chatbots that understand intent and complete tasks.", span: "md:col-span-2" },
  { icon: Brain, title: "Machine Learning Models", desc: "Custom models for classification, forecasting, anomaly detection.", span: "" },
  { icon: MessageSquare, title: "Natural Language Processing", desc: "Sentiment analysis, entity extraction, multilingual support.", span: "" },
  { icon: Sparkles, title: "Recommendation Systems", desc: "Product/content recommenders that lift revenue 15‑30%.", span: "md:col-span-2" },
  { icon: Cpu, title: "Computer Vision", desc: "Object detection, OCR, visual inspection for manufacturing & logistics.", span: "" },
  { icon: Workflow, title: "Process Automation", desc: "End‑to‑end RPA with AI decision points — cut ops cost by 60%.", span: "" },
];

const Services = () => (
  <Section id="services">
    <SectionHead eyebrow="What we build" title="AI capabilities." accent="One team." sub="From proof‑of‑concept to production, we handle the entire AI lifecycle." />
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
   FEATURED AI PORTFOLIO
   ============================================================ */
const projects = [
  {
    title: "Banking AI Assistant",
    category: "Conversational AI",
    outcome: "Resolved 64% queries without human, 24/7",
    stack: ["LangChain", "GPT‑4", "FastAPI", "Redis"],
    tone: "from-[#7C3AED] to-[#22D3EE]",
  },
  {
    title: "Invoice OCR Pipeline",
    category: "Document AI",
    outcome: "1,200+ invoices/day, 99.2% accuracy",
    stack: ["PaddleOCR", "PyTorch", "FastAPI", "PostgreSQL"],
    tone: "from-[#22D3EE] to-[#10B981]",
  },
  {
    title: "E‑commerce Recommender",
    category: "Recommendation Engine",
    outcome: "15% revenue lift, 22% higher AOV",
    stack: ["TensorFlow", "BigQuery", "Node.js", "Redis"],
    tone: "from-[#F59E0B] to-[#7C3AED]",
  },
  {
    title: "Quality Inspection Vision",
    category: "Computer Vision",
    outcome: "Reduced defects by 34%, real‑time alerts",
    stack: ["YOLOv8", "OpenCV", "Python", "AWS IoT"],
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
        {/* Faux AI console */}
        <div className="absolute left-4 right-4 bottom-4 rh-surface-elevated p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] rh-text-dim font-mono">live · inference</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 rounded bg-white/20 w-3/4" />
            <div className="h-1.5 rounded bg-white/[0.06] w-full" />
            <div className="h-1.5 rounded bg-white/[0.06] w-1/2" />
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
      <SectionHead eyebrow="Selected work" title="AI that delivers." accent="Real numbers." />
      <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost self-start md:self-auto">
        View all projects <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
    </div>
  </Section>
);

/* ============================================================
   PROCESS TIMELINE (AI‑specific)
   ============================================================ */
const steps = [
  { n: "01", t: "Discovery", d: "Identify automation opportunities and data readiness." },
  { n: "02", t: "Data Pipeline", d: "Collect, clean, and label data for model training." },
  { n: "03", t: "Model Dev", d: "Prototype, train, evaluate — iterated weekly." },
  { n: "04", t: "Integration", d: "Wrap in APIs / micro‑services, test with real data." },
  { n: "05", t: "Deploy & Monitor", d: "CI/CD, drift detection, ongoing observability." },
  { n: "06", t: "Iterate", d: "Feedback loops and periodic model re‑training." },
];

const Process = () => (
  <Section>
    <SectionHead eyebrow="How we work" title="AI process built for" accent="reliability." />
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
   ENGINEERING PROOF — AI code & metrics
   ============================================================ */
const EngineeringProof = () => (
  <Section>
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      <FadeUp>
        <div className="h-full">
          <span className="rh-eyebrow"><span className="dot" />Engineering proof</span>
          <h2 className="text-[34px] md:text-[42px] font-semibold mt-5 tracking-tight leading-[1.1]">
            The code that powers your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] to-[#22D3EE]">intelligence.</span>
          </h2>
          <p className="rh-text-muted mt-5 text-[15px] leading-relaxed max-w-lg">
            Every AI system we ship comes with reproducible training pipelines,
            type‑safe APIs, drift detection, and human‑in‑the‑loop validation.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 max-w-md">
            {[
              { k: "Model versioned", icon: Code2 },
              { k: "API ≤ 500ms p99", icon: Zap },
              { k: "Drift alerts", icon: Activity },
              { k: "Cloud / on‑prem", icon: Server },
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
            <span className="text-[11px] rh-text-dim font-mono">train.py</span>
          </div>
          <pre className="rh-code px-5 py-5 m-0 overflow-x-auto">
{`from rh_ai import Trainer, Dataset

trainer = Trainer("sentiment-v3")
dataset = Dataset.from_s3("siat-data/customer-chats")

results = trainer.fine_tune(
  model="indic-bert",
  dataset=dataset,
  epochs=3,
  output="gs://models/sent-v3"
)
# val_accuracy: 0.954
# f1_score: 0.948`}
          </pre>
          {/* Faux terminal */}
          <div className="border-t border-white/[0.06] px-5 py-4 bg-black/40">
            <div className="rh-code text-[12px]">
              <div className="rh-text-dim">$ rh ai deploy sentiment-v3</div>
              <div className="text-emerald-300 mt-1">✓ API endpoint ready · inference: 120ms avg</div>
              <div className="rh-text-dim mt-2">$ rh ai monitor sentiment-v3</div>
              <div className="text-emerald-300 mt-1">✓ drift_score: 0.02 (healthy) · requests_today: 8,412</div>
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
            AI isn't magic — it's engineering. We make it accessible for businesses
            in Bihar and beyond. Whether you need a chatbot or a full‑blown
            recommendation engine, we deliver systems that pay for themselves
            in months.
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
   PRICING TEASER — AI tiers
   ============================================================ */
const tiers = [
  {
    name: "Starter AI",
    price: "₹ 1L+",
    desc: "Perfect for first‑time automation: chatbots, simple OCR, basic analytics.",
    features: ["2‑4 weeks", "Chatbot / OCR / basic ML", "API integration", "30‑day support"],
  },
  {
    name: "Business AI",
    price: "₹ 3L+",
    desc: "Custom NLP, recommendation engines, and smart automation pipelines.",
    features: ["4‑12 weeks", "Custom model training", "Real‑time APIs", "Dashboard & monitoring"],
    highlight: true,
  },
  {
    name: "Enterprise AI",
    price: "Custom",
    desc: "End‑to‑end AI‑driven transformation, computer vision, and bespoke infrastructure.",
    features: ["Dedicated AI team", "On‑prem or cloud", "CI/CD for ML", "SLAs & drift management"],
  },
];

const Pricing = () => (
  <Section>
    <SectionHead eyebrow="Engagements" title="AI pricing for every" accent="ambition." />
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
              {t.name === "Enterprise AI" ? "Book consultation" : "Get a quote"}
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
            Ready to make your business AI‑first?{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] to-[#22D3EE]">Let's talk.</span>
          </h2>
          <p className="rh-text-muted mt-5 max-w-xl mx-auto text-[15px]">
            We'll map your workflow, identify quick wins, and show you a working prototype — often within 2 weeks.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contact-us" className="rh-btn rh-btn-primary">Book a free AI consultation</Link>
            <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">View AI case studies</Link>
          </div>
        </div>
      </div>
    </FadeUp>
  </Section>
);

/* ============================================================
   PAGE
   ============================================================ */
const AIDevelopmentPage = () => {
  return (
    <>
      <SEOHead
        title="Best AI Development Company in Bihar | Machine Learning & Chatbot | RH Software SIAT"
        description="RH Software (SIAT) – Best AI development company in Bihar. We build AI chatbots, ML models, automation systems for businesses in Saharsa, Madhepura, Purnia & all Bihar. Transform your business with AI!"
        canonical={`${RH_BASE_URL}/rhsoftware/ai-development-company-bihar`}
        keywords="AI development company bihar, machine learning bihar, AI chatbot saharsa, artificial intelligence madhepura, AI developer purnia bihar, automation software bihar, AI solutions bihar, आर्टिफिशियल इंटेलिजेंस बिहार"
        schema={[
          rhOrganizationSchema,
          rhLocalBusinessSchema,
          rhBreadcrumb([
            { name: "Home", url: RH_BASE_URL },
            { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
            { name: "AI Development Bihar", url: `${RH_BASE_URL}/rhsoftware/ai-development-company-bihar` },
          ]),
          rhFaqSchema([
            { q: "Best AI developer in Bihar?", a: "RH Software by SIAT is Bihar's leading AI development company. We build chatbots, recommendation systems, and ML models for businesses across Bihar." },
            { q: "AI se business ko kya faida Bihar mein?", a: "AI se customer service automate hoti hai, sales badhti hai, aur costs kam hoti hai. RH Software Bihar ke businesses ke liye affordable AI solutions banata hai." },
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

export default AIDevelopmentPage;
