import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X, Sparkles, ArrowUpRight, ChevronDown, MessageCircle, Building2, Rocket, Layers } from "lucide-react";
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

const plans = [
  {
    name: "Launch",
    icon: Rocket,
    price: "₹14,999",
    period: "starting",
    desc: "For early-stage founders validating an idea fast.",
    forWho: "Startups · Solo founders · Small businesses",
    cta: "Start with Launch",
    features: {
      included: [
        "Premium landing or marketing site",
        "Mobile-first responsive design",
        "On-page SEO setup",
        "Analytics + lead capture",
        "1 round of revisions",
        "1 month post-launch support",
      ],
      excluded: ["Custom backend", "Mobile apps", "Dedicated team"],
    },
    accent: "from-[#22D3EE] to-[#10B981]",
  },
  {
    name: "Scale",
    icon: Layers,
    price: "₹49,999",
    period: "starting",
    desc: "For growing teams shipping a real product.",
    forWho: "Funded startups · Growing SaaS · Agencies",
    cta: "Choose Scale",
    popular: true,
    features: {
      included: [
        "Full custom web application",
        "Admin dashboard + auth",
        "Database + API design",
        "3rd-party integrations",
        "Advanced SEO + performance",
        "Unlimited revisions in scope",
        "3 months priority support",
        "Weekly demo sprints",
      ],
      excluded: ["Native mobile apps (add-on)", "On-call SRE"],
    },
    accent: "from-[#7C3AED] to-[#A78BFA]",
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    period: "engagement",
    desc: "Architected for serious products at serious scale.",
    forWho: "Enterprise · Funded SaaS · Long-term partnerships",
    cta: "Talk to engineering",
    features: {
      included: [
        "Multi-tenant SaaS architecture",
        "AI / ML integration",
        "Native iOS + Android apps",
        "Dedicated cross-functional team",
        "Cloud infrastructure + DevOps",
        "SOC-ready security review",
        "SLA-backed uptime",
        "Quarterly roadmap planning",
      ],
      excluded: [],
    },
    accent: "from-[#F59E0B] to-[#7C3AED]",
  },
];

const compareRows = [
  { label: "Discovery workshop",        l: true, s: true,  e: "Extended" },
  { label: "Custom design system",      l: false, s: true, e: true },
  { label: "Backend / database",        l: false, s: true, e: true },
  { label: "Mobile apps (iOS+Android)", l: false, s: "Add-on", e: true },
  { label: "AI / ML integration",       l: false, s: "Add-on", e: true },
  { label: "Dedicated team",            l: false, s: false, e: true },
  { label: "SLA + uptime guarantee",    l: false, s: false, e: true },
  { label: "Source code ownership",     l: true, s: true, e: true },
] as const;

const faqs = [
  { q: "Do you charge by project or by hour?", a: "Most engagements are fixed-price after a paid discovery sprint. Long-term Enterprise partners often switch to monthly retainers." },
  { q: "How long does a typical project take?", a: "Launch projects ship in 2–3 weeks. Scale builds run 6–10 weeks. Enterprise programs are sized after a discovery workshop." },
  { q: "Do I own the code?", a: "Yes. You own 100% of the source code, design files and infrastructure. We hand over a complete repo and docs at launch." },
  { q: "Can you sign an NDA?", a: "Absolutely. We sign mutual NDAs before any sensitive scoping conversation — just request one in your first message." },
  { q: "What happens after launch?", a: "Every plan includes a support window. After that, you can move to a monthly retainer or pay per change-set — your call." },
  { q: "Do you work with founders outside India?", a: "Yes. We have shipped products for teams in the UK, US, UAE and Singapore. Async-first with weekly live syncs." },
];

/* ------------------------------------------------------------------ */
const Hero = () => (
  <section className="pt-10 md:pt-16 pb-12 px-6 md:px-10">
    <div className="max-w-7xl mx-auto text-center">
      <FadeUp>
        <span className="rh-eyebrow"><span className="dot" />Pricing</span>
      </FadeUp>
      <FadeUp delay={0.06}>
        <h1 className="mt-5 text-[40px] md:text-[64px] leading-[1.02] font-semibold tracking-[-0.03em] mx-auto max-w-3xl">
          Honest pricing,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#22D3EE]">
            engineered to scale.
          </span>
        </h1>
      </FadeUp>
      <FadeUp delay={0.12}>
        <p className="mt-5 text-[16px] md:text-[17px] rh-text-muted max-w-2xl mx-auto leading-relaxed">
          Three engagement models. No hidden fees. Pick the one that matches your stage —
          we'll only recommend up if your roadmap genuinely needs it.
        </p>
      </FadeUp>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
const PlanCard = ({ p }: { p: typeof plans[number] }) => (
  <FadeUp className={p.popular ? "md:-mt-4" : ""}>
    <div className={`relative h-full rh-surface p-7 md:p-8 transition-all duration-500 ${
      p.popular ? "border-[#7C3AED]/40 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.5)]" : ""
    }`}>
      {p.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-[10px] font-bold uppercase tracking-[0.16em] flex items-center gap-1 shadow-[0_8px_25px_rgba(124,58,237,0.5)]">
          <Sparkles className="w-3 h-3" /> Most Popular
        </div>
      )}
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center mb-5 opacity-90`}>
        <p.icon className="w-5 h-5 text-white" strokeWidth={1.8} />
      </div>
      <h3 className="text-[22px] font-semibold tracking-tight">{p.name}</h3>
      <p className="text-[13.5px] rh-text-muted mt-2 leading-relaxed">{p.desc}</p>
      <div className="mt-5 mb-1 flex items-baseline gap-2">
        <span className="text-[36px] md:text-[42px] font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{p.price}</span>
        <span className="text-[12px] rh-text-dim">{p.period}</span>
      </div>
      <div className="text-[11px] uppercase tracking-[0.16em] rh-text-dim mt-4 mb-3">For</div>
      <p className="text-[13px] text-white/75">{p.forWho}</p>

      <Link
        to="/rhsoftware/contact"
        className={`block mt-7 text-center py-3.5 rounded-xl font-semibold text-[14px] transition-all hover:-translate-y-0.5 ${
          p.popular
            ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:shadow-[0_18px_40px_-14px_rgba(124,58,237,0.85)] text-white"
            : "border border-white/[0.12] hover:bg-white/[0.05] hover:border-white/25 text-white"
        }`}
      >
        {p.cta}
      </Link>

      <div className="rh-divider-x my-7" />

      <div className="space-y-2.5">
        {p.features.included.map((f) => (
          <div key={f} className="flex items-start gap-2.5 text-[13.5px] text-white/80">
            <span className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-2.5 h-2.5 text-emerald-300" />
            </span>
            {f}
          </div>
        ))}
        {p.features.excluded.map((f) => (
          <div key={f} className="flex items-start gap-2.5 text-[13.5px] text-white/35">
            <span className="w-4 h-4 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
              <X className="w-2.5 h-2.5 text-white/40" />
            </span>
            {f}
          </div>
        ))}
      </div>
    </div>
  </FadeUp>
);

/* ------------------------------------------------------------------ */
const ComparisonTable = () => (
  <section className="py-20 px-6 md:px-10">
    <div className="max-w-6xl mx-auto">
      <FadeUp className="text-center mb-12">
        <span className="rh-eyebrow"><span className="dot" />Compare plans</span>
        <h2 className="text-[30px] md:text-[40px] font-semibold mt-5 tracking-tight">What's in each tier</h2>
      </FadeUp>
      <FadeUp>
        <div className="rh-surface overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/[0.06] text-[12px] uppercase tracking-[0.16em] rh-text-dim">
            <div>Capability</div>
            <div className="text-center">Launch</div>
            <div className="text-center text-[#C4B5FD]">Scale</div>
            <div className="text-center">Enterprise</div>
          </div>
          {compareRows.map((r) => (
            <div key={r.label} className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/[0.04] text-[14px] items-center hover:bg-white/[0.02] transition-colors">
              <div className="text-white/85">{r.label}</div>
              {[r.l, r.s, r.e].map((v, i) => (
                <div key={i} className="text-center">
                  {v === true ? (
                    <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                  ) : v === false ? (
                    <X className="w-4 h-4 text-white/25 mx-auto" />
                  ) : (
                    <span className="text-[12px] px-2 py-0.5 rounded-md bg-[#7C3AED]/15 border border-[#7C3AED]/25 text-[#C4B5FD]">{v}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
const FAQItem = ({ f, open, onToggle }: any) => (
  <div className="rh-surface overflow-hidden">
    <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 p-6 text-left">
      <span className="text-[15px] md:text-[16px] font-medium text-white">{f.q}</span>
      <ChevronDown className={`w-4 h-4 rh-text-dim shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
    </button>
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-6 text-[14px] rh-text-muted leading-relaxed">{f.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQs = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <FadeUp className="text-center mb-12">
          <span className="rh-eyebrow"><span className="dot" />FAQs</span>
          <h2 className="text-[30px] md:text-[40px] font-semibold mt-5 tracking-tight">Common questions</h2>
        </FadeUp>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FadeUp key={f.q} delay={i * 0.04}>
              <FAQItem f={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
const EnterpriseBand = () => (
  <section className="py-16 px-6 md:px-10">
    <div className="max-w-6xl mx-auto rh-surface p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60"
           style={{ background: "radial-gradient(700px 320px at 0% 50%, rgba(124,58,237,0.20), transparent 70%)" }} />
      <div>
        <span className="rh-eyebrow"><span className="dot" />Enterprise</span>
        <h2 className="text-[30px] md:text-[40px] font-semibold mt-5 tracking-tight leading-tight">
          Engineering partnerships built on outcomes.
        </h2>
        <p className="rh-text-muted mt-4 text-[15px] leading-relaxed">
          Multi-quarter engagements with a dedicated team, SLA-backed uptime, and a roadmap aligned to
          your business KPIs. We sit inside your sprints — not outside them.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
            Talk to engineering <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">
            See enterprise work
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { v: "8+ wks", l: "Avg engagement" },
          { v: "99.9%", l: "Uptime SLO" },
          { v: "24/7", l: "Incident response" },
          { v: "1:1", l: "Founder access" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
            <MessageCircle className="w-4 h-4 text-[#A78BFA] mb-3" />
            <div className="text-[24px] font-semibold tracking-tight">{s.v}</div>
            <div className="text-[11px] rh-text-dim mt-1 uppercase tracking-[0.18em]">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
const RHPricingPage = () => {
  useSEO({
    title: "Pricing | RH Software — Web, App & SaaS Development Cost in Bihar",
    description:
      "Transparent pricing for website, mobile app and SaaS development across Bihar. Launch from ₹60k, Scale plan ₹2.5L+, custom Enterprise engagements. Trusted by clients in Patna, Saharsa, Madhepura, Purnia & all Bihar.",
    keywords: "website cost bihar, app development cost patna, software pricing bihar, RH Software pricing, software development cost saharsa",
    canonical: `${RH_BASE_URL}/rhsoftware/pricing`,
    schema: [
      rhOrganizationSchema,
      rhBreadcrumb([
        { name: "Home", url: RH_BASE_URL },
        { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
        { name: "Pricing", url: `${RH_BASE_URL}/rhsoftware/pricing` },
      ]),
    ],
  });

  return (
    <>
      <Hero />
      <section className="px-6 md:px-10 pb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p) => <PlanCard key={p.name} p={p} />)}
        </div>
      </section>
      <ComparisonTable />
      <EnterpriseBand />
      <FAQs />
    </>
  );
};

export default RHPricingPage;
