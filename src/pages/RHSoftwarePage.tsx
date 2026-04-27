import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Globe, Smartphone, Code2, Sparkles, ArrowRight, Database, Cpu,
  Rocket, Layers, Shield, Zap, ChevronRight, Github, Linkedin, Mail,
} from "lucide-react";

const RHHeroScene = lazy(() => import("@/components/rh/RHHeroScene"));

/* ---------------- Helpers ---------------- */

const useCountUp = (end: number, duration = 1500) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return { ref, val };
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-24 md:py-32 px-6 md:px-10 relative ${className}`}>
    <div className="max-w-7xl mx-auto relative z-10">{children}</div>
  </section>
);

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`relative rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:border-indigo-400/30 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(99,102,241,0.45)] ${className}`}
  >
    {children}
  </div>
);

/* ---------------- Page ---------------- */

const services = [
  { icon: Brain, title: "AI Development", desc: "ML models, NLP engines, intelligent automation.", grad: "from-purple-500 to-violet-600" },
  { icon: Globe, title: "Web Development", desc: "Fast, SEO-rich web platforms with modern UX.", grad: "from-cyan-500 to-blue-600" },
  { icon: Smartphone, title: "App Development", desc: "Cross-platform iOS & Android apps that scale.", grad: "from-blue-500 to-indigo-600" },
  { icon: Code2, title: "Custom Software", desc: "ERP, CRM, SaaS — engineered for your workflow.", grad: "from-emerald-500 to-teal-600" },
  { icon: Database, title: "Cloud & Infra", desc: "AWS / GCP / Azure architecture, autoscaling.", grad: "from-orange-500 to-red-600" },
  { icon: Cpu, title: "IoT Solutions", desc: "Connected devices, dashboards, edge compute.", grad: "from-pink-500 to-rose-600" },
];

const stats = [
  { label: "Projects Delivered", end: 40, suffix: "+" },
  { label: "Years of Engineering", end: 5, suffix: "+" },
  { label: "Technologies Mastered", end: 30, suffix: "+" },
  { label: "Happy Clients", end: 25, suffix: "+" },
];

const techStack = ["React", "Next.js", "Node.js", "Python", "TensorFlow", "Flutter", "PostgreSQL", "Supabase", "AWS", "Docker", "Tailwind", "TypeScript"];

const portfolioItems = [
  { title: "AI Analytics Dashboard", category: "AI / Web", grad: "from-indigo-500 to-purple-600", span: "lg:col-span-7" },
  { title: "Hospital Management System", category: "Software", grad: "from-emerald-500 to-teal-600", span: "lg:col-span-5" },
  { title: "Learning Management System", category: "EdTech", grad: "from-amber-500 to-orange-600", span: "lg:col-span-4" },
  { title: "Fleet Tracking Platform", category: "IoT / Web", grad: "from-rose-500 to-pink-600", span: "lg:col-span-4" },
  { title: "Banking AI Chatbot", category: "AI", grad: "from-blue-500 to-cyan-600", span: "lg:col-span-4" },
];

const testimonials = [
  { name: "Rajeev Singh", role: "Founder, EduNova", quote: "RH Software delivered our LMS ahead of schedule. The AI-driven test engine is a game changer." },
  { name: "Priya Mehta", role: "CTO, MediCare+", quote: "From design to deployment, an absolute pleasure. Our HMS handles 10k+ patients seamlessly." },
  { name: "Arjun Verma", role: "Director, FleetIQ", quote: "Real-time fleet tracking with zero downtime. They simply get logistics tech." },
  { name: "Sneha Kapoor", role: "PM, ShopSphere", quote: "Beautiful mobile app, blazing fast. Conversions up 38% in the first month." },
  { name: "Vikram Rao", role: "CEO, AgroTech", quote: "Their IoT dashboards transformed how we monitor 500+ field sensors." },
];

const RHSoftwarePage = () => {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* MARQUEE */}
      <section className="py-12 overflow-hidden border-y border-white/[0.05]">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            ["YOUR IDEAS · OUR TECHNOLOGY", "AI · APPS · SOFTWARE", "BUILT FOR THE FUTURE", "DESIGN · DEVELOP · DEPLOY"].map((text, i) => (
              <span
                key={`${k}-${i}`}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white/[0.05] select-none"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {text}
              </span>
            ))
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <span className="inline-block px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-5 uppercase tracking-wider">
              About RH Software
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Engineering teams that <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">ship at scale.</span>
            </h2>
            <p className="text-white/55 mt-6 leading-relaxed">
              We're a product engineering studio building AI platforms, EdTech SaaS, mobile apps, and enterprise software for ambitious founders and institutions across India. We pair design with deep engineering — from idea to launch.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Open to Projects", "Based in India", "Available Full-Time"].map((b) => (
                <span key={b} className="px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-400/25 bg-emerald-500/10 text-emerald-300">
                  ● {b}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {techStack.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/[0.08] bg-white/[0.04] text-white/70">
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-emerald-500/20 blur-3xl" />
              <GlassCard className="relative h-full rounded-[2rem] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
                <div className="text-center relative z-10 p-10">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-black mb-6 shadow-[0_0_60px_rgba(99,102,241,0.5)]">
                    RH
                  </div>
                  <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    A small team.<br />A big toolbox.
                  </p>
                  <p className="text-white/40 mt-3 text-sm">Design · Engineering · AI · Cloud</p>
                </div>
              </GlassCard>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* SKILLS BENTO */}
      <Section>
        <FadeUp className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/60 text-xs font-medium mb-5 uppercase tracking-wider">
            What We Build
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Six disciplines. <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">One studio.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.05}>
              <Link to="/rhsoftware/services">
                <GlassCard className="p-7 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center mb-5 shadow-[0_10px_30px_-10px_rgba(99,102,241,0.5)]`}>
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{s.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
                  <div className="mt-5 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${s.grad}`} style={{ width: `${75 + (i % 3) * 8}%` }} />
                  </div>
                </GlassCard>
              </Link>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* PROJECTS BENTO */}
      <Section>
        <FadeUp className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/60 text-xs font-medium mb-5 uppercase tracking-wider">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Things we've <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">put into the world.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {portfolioItems.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.06} className={`col-span-1 ${p.span}`}>
              <GlassCard className="overflow-hidden h-full min-h-[260px] flex flex-col">
                <div className={`relative flex-1 bg-gradient-to-br ${p.grad} flex items-center justify-center min-h-[160px]`}>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)"
                  }} />
                  <Code2 className="w-14 h-14 text-white/30" />
                </div>
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-indigo-300">{p.category}</span>
                  <h3 className="text-lg font-bold mt-1.5" style={{ fontFamily: "'Outfit', sans-serif" }}>{p.title}</h3>
                </div>
              </GlassCard>
            </FadeUp>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/rhsoftware/portfolio" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium">
            View Full Portfolio <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* TIMELINE */}
      <Section>
        <FadeUp className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/60 text-xs font-medium mb-5 uppercase tracking-wider">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Built brick <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">by brick.</span>
          </h2>
        </FadeUp>
        <Timeline />
      </Section>

      {/* TESTIMONIALS MARQUEE */}
      <Section className="py-16">
        <FadeUp className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Trusted by founders & institutions
          </h2>
        </FadeUp>
        <div className="overflow-hidden relative">
          <div className="flex gap-5 animate-marquee whitespace-nowrap">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="inline-block w-[340px] whitespace-normal">
                <GlassCard className="p-6 h-full">
                  <p className="text-white/80 leading-relaxed text-sm">"{t.quote}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-white/40">{t.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT CTA */}
      <Section>
        <GlassCard className="p-10 md:p-16 text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Let's build something <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">together.</span>
            </h2>
            <p className="text-white/50 mt-5 max-w-xl mx-auto">
              Share your idea — we'll come back with a roadmap and a price within 24 hours.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-9">
              <Link to="/rhsoftware/contact" className="px-7 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.45)] transition-all hover:-translate-y-0.5">
                Start a Project
              </Link>
              <Link to="/rhsoftware/pricing" className="px-7 py-3.5 rounded-xl font-semibold border border-white/15 hover:bg-white/5 transition-all hover:-translate-y-0.5">
                See Pricing
              </Link>
            </div>
            <div className="flex justify-center gap-4 mt-9 text-white/40">
              <a href="mailto:siat.sws@gmail.com" className="p-2.5 rounded-xl border border-white/[0.08] hover:text-white hover:border-indigo-400/40 transition-all"><Mail className="w-4 h-4" /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl border border-white/[0.08] hover:text-white hover:border-indigo-400/40 transition-all"><Github className="w-4 h-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl border border-white/[0.08] hover:text-white hover:border-indigo-400/40 transition-all"><Linkedin className="w-4 h-4" /></a>
            </div>
          </FadeUp>
        </GlassCard>
      </Section>
    </>
  );
};

/* ---------------- Hero ---------------- */

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textBlur = useTransform(scrollYProgress, [0, 0.6], [0, 8]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setParallax({ x: (e.clientX - cx) / 60, y: (e.clientY - cy) / 60 });
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  const floatingCards = [
    { label: "Projects Built", end: 40, pos: "top-[10%] left-[2%]", depth: 1 },
    { label: "Years Experience", end: 5, pos: "top-[14%] right-[2%]", depth: -1.2 },
    { label: "Technologies", end: 30, pos: "bottom-[20%] left-[4%]", depth: 1.4 },
    { label: "Happy Clients", end: 25, pos: "bottom-[16%] right-[4%]", depth: -1 },
  ];

  return (
    <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden px-6 md:px-10">
      {/* 3D Scene Background */}
      {!reducedMotion && (
        <Suspense fallback={null}>
          <RHHeroScene />
        </Suspense>
      )}

      {/* Vignette to keep text readable over 3D scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(2,4,8,0.7) 75%, rgba(2,4,8,0.95) 100%), linear-gradient(180deg, rgba(2,4,8,0.4) 0%, transparent 30%, transparent 70%, rgba(2,4,8,0.6) 100%)",
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto w-full relative z-10 py-20"
        style={{ y: textY, opacity: textOpacity, filter: useTransform(textBlur, (v) => `blur(${v}px)`) }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/25 bg-indigo-500/10 backdrop-blur-xl text-indigo-200 text-xs font-medium mb-7 shadow-[0_0_30px_rgba(99,102,241,0.25)]">
            <Sparkles className="w-3.5 h-3.5" /> AI · Web · Mobile · Software · Cloud
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-[6.2rem] font-black leading-[1.02] tracking-tight max-w-5xl drop-shadow-[0_8px_40px_rgba(99,102,241,0.35)]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            We Build Things{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-300 to-purple-400 animate-gradient-x">
              That Scale.
            </span>
          </h1>

          <p className="text-base md:text-xl text-white/70 max-w-2xl mt-7 leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            Full-Stack Engineering · EdTech SaaS · AI Products · Built in India for the world.
          </p>

          <div className="flex flex-wrap gap-3 mt-9">
            <Link
              to="/rhsoftware/portfolio"
              className="group px-7 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:-translate-y-0.5"
            >
              See Our Work <ArrowRight className="inline w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/rhsoftware/contact"
              className="px-7 py-3.5 rounded-xl font-semibold border border-white/20 bg-white/[0.03] backdrop-blur-xl text-white/90 hover:text-white hover:border-white/40 hover:bg-white/[0.08] transition-all hover:-translate-y-0.5"
            >
              Hire Us
            </Link>
          </div>
        </motion.div>

        {/* Floating stat cards */}
        <div className="hidden lg:block">
          {floatingCards.map((c, i) => (
            <FloatingStat key={c.label} {...c} parallax={parallax} index={i} />
          ))}
        </div>

        {/* Mobile stats */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-12">
          {stats.map((s) => (
            <StatPill key={s.label} label={s.label} end={s.end} suffix={s.suffix} />
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1.5 h-3 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const FloatingStat = ({
  label, end, pos, depth, parallax, index,
}: { label: string; end: number; pos: string; depth: number; parallax: { x: number; y: number }; index: number }) => {
  const { ref, val } = useCountUp(end);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + index * 0.12, duration: 0.7 }}
      style={{
        transform: `translate(${parallax.x * depth}px, ${parallax.y * depth}px)`,
      }}
      className={`absolute ${pos}`}
    >
      <div
        className="rounded-2xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-2xl px-5 py-4 shadow-[0_20px_60px_-20px_rgba(99,102,241,0.45)]"
        style={{ animation: `float 6s ease-in-out ${index * 0.5}s infinite` }}
      >
        <p className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <span ref={ref}>{val}</span>+
        </p>
        <p className="text-xs text-white/50 mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

const StatPill = ({ label, end, suffix }: { label: string; end: number; suffix: string }) => {
  const { ref, val } = useCountUp(end);
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-4">
      <p className="text-2xl font-black" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <span ref={ref}>{val}</span>{suffix}
      </p>
      <p className="text-xs text-white/50 mt-0.5">{label}</p>
    </div>
  );
};

/* ---------------- Timeline ---------------- */

const timelineEntries = [
  {
    year: "2024 — Now",
    title: "RH Software · Studio Era",
    role: "Building EdTech SaaS, AI tools, and enterprise apps for clients across India.",
    icon: Rocket,
    color: "from-indigo-500 to-purple-500",
  },
  {
    year: "2023",
    title: "EduCore Platform Launch",
    role: "Multi-tenant LMS supporting 500+ institutes, 2L+ students, live classes, payments.",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2022",
    title: "AI Products & Cloud",
    role: "Shipped chatbots, recommendation engines, and cloud-native deployments.",
    icon: Brain,
    color: "from-emerald-500 to-cyan-500",
  },
  {
    year: "2021",
    title: "Foundations",
    role: "First freelance projects in web & mobile. Set the bar for craft and delivery.",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
  },
];

const Timeline = () => (
  <div className="relative max-w-3xl mx-auto">
    <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-purple-500/30 to-transparent" />
    <div className="space-y-10">
      {timelineEntries.map((entry, i) => (
        <FadeUp key={entry.year} delay={i * 0.08}>
          <div className={`relative flex md:items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
            <div className="flex-shrink-0 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${entry.color} flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.4)]`}>
                <entry.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <GlassCard className="p-6 flex-1 md:w-[44%]">
              <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">{entry.year}</span>
              <h4 className="text-lg font-bold mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{entry.title}</h4>
              <p className="text-sm text-white/55 mt-2 leading-relaxed">{entry.role}</p>
            </GlassCard>
          </div>
        </FadeUp>
      ))}
    </div>
  </div>
);

export default RHSoftwarePage;
