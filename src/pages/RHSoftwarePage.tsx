import { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Globe, Smartphone, Code2, Sparkles, Zap, Shield, Users, ArrowRight, ChevronRight } from "lucide-react";

const RHScene3D = lazy(() => import("@/components/rh/RHScene3D"));

const services = [
  {
    icon: Brain,
    title: "AI Development",
    desc: "Custom AI solutions, machine learning models, NLP engines, and intelligent automation that transform your business operations.",
    color: "from-purple-500 to-violet-600",
    glow: "rgba(139, 92, 246, 0.3)",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "High-performance, SEO-optimized websites and web applications built with cutting-edge frameworks and stunning design.",
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6, 182, 212, 0.3)",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Native and cross-platform mobile applications for iOS and Android with beautiful UI/UX and robust architecture.",
    color: "from-blue-500 to-indigo-600",
    glow: "rgba(59, 130, 246, 0.3)",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    desc: "Enterprise-grade custom software, ERP systems, CRM platforms, and scalable cloud solutions for modern businesses.",
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16, 185, 129, 0.3)",
  },
];

const features = [
  { icon: Sparkles, title: "Innovation-Driven", desc: "We push boundaries with cutting-edge technology" },
  { icon: Zap, title: "Scalable Architecture", desc: "Built to grow with your business needs" },
  { icon: Brain, title: "Future-Ready AI", desc: "AI-first approach for intelligent solutions" },
  { icon: Shield, title: "Human-Centered Design", desc: "Beautiful, intuitive interfaces users love" },
];

const portfolioItems = [
  { title: "AI-Powered Analytics Dashboard", category: "AI / Web", tech: "React, Python, TensorFlow" },
  { title: "E-Commerce Mobile App", category: "Mobile App", tech: "React Native, Node.js" },
  { title: "Hospital Management System", category: "Software", tech: "Next.js, PostgreSQL" },
  { title: "Smart Inventory Platform", category: "SaaS", tech: "Vue.js, Go, Redis" },
  { title: "Learning Management System", category: "EdTech", tech: "React, Django, AWS" },
  { title: "Fleet Tracking Solution", category: "IoT / Web", tech: "React, Node.js, MQTT" },
];

const RHSoftwarePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <Suspense fallback={null}>
          <RHScene3D />
        </Suspense>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-[1]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" /> Next-Generation Technology Company
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight max-w-5xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Engineering the Future with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">
                AI & Digital Innovation
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-2xl mt-8 leading-relaxed">
              RH Software builds intelligent solutions that transform businesses through AI, web, mobile, and software technologies.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/rhsoftware/contact"
                className="group px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
              >
                Start Your Project <ArrowRight className="inline w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/rhsoftware/services"
                className="px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* KINETIC MARQUEE */}
      <section className="py-16 overflow-hidden border-y border-white/5">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {["YOUR IDEAS. OUR TECHNOLOGY.", "AI. APPS. SOFTWARE.", "BUILT FOR THE FUTURE.", "DESIGN. DEVELOP. DEPLOY.", "YOUR IDEAS. OUR TECHNOLOGY.", "AI. APPS. SOFTWARE.", "BUILT FOR THE FUTURE.", "DESIGN. DEVELOP. DEPLOY."].map((text, i) => (
            <span key={i} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white/[0.04] select-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="What We Build"
            title="Intelligent Solutions for the Modern Era"
            desc="From AI-powered platforms to stunning mobile apps, we engineer digital experiences that drive growth."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR MAKERS */}
      <section className="py-32 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <MakersSection />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Why RH Software"
            title="Technology That Drives Results"
            desc="We combine innovation with engineering excellence to deliver solutions that matter."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-32 px-6 md:px-10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Our Work" title="Selected Projects" desc="A glimpse of what we've built for businesses across industries." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {portfolioItems.map((item, i) => (
              <PortfolioCard key={item.title} item={item} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/rhsoftware/portfolio" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium">
              View Full Portfolio <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Ready to Build{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Something Amazing?
              </span>
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
              Let's turn your vision into reality. Share your project idea and we'll craft the perfect digital solution.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/rhsoftware/contact" className="px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all hover:-translate-y-0.5">
                Start Your Project
              </Link>
              <Link to="/rhsoftware/pricing" className="px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/5 transition-all hover:-translate-y-0.5">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// Sub-components

const SectionHeader = ({ badge, title, desc }: { badge: string; title: string; desc: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
      <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-6">{badge}</span>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>{title}</h2>
      <p className="text-lg text-white/40 mt-4 max-w-2xl mx-auto">{desc}</p>
    </motion.div>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to="/rhsoftware/services" className="block group">
        <div
          className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1"
          style={{ boxShadow: `0 0 0px ${service.glow}` }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${service.glow}`; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0px ${service.glow}`; }}
        >
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
            <service.icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>{service.title}</h3>
          <p className="text-white/50 leading-relaxed">{service.desc}</p>
          <div className="mt-6 text-sm font-medium text-white/40 group-hover:text-white/70 transition-colors flex items-center gap-1">
            Learn More <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const MakersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const makers = ["Founders", "Developers", "Designers", "Enterprises"];
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-12" style={{ fontFamily: "'Outfit', sans-serif" }}>
        BUILT FOR{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">MAKERS</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {makers.map((maker, i) => (
          <motion.div
            key={maker}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-xl md:text-2xl font-bold text-white/80 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all cursor-default"
          >
            {maker}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-all">
        <feature.icon className="w-6 h-6 text-purple-300" />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{feature.title}</h3>
      <p className="text-sm text-white/40">{feature.desc}</p>
    </motion.div>
  );
};

const PortfolioCard = ({ item, index }: { item: typeof portfolioItems[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 cursor-pointer"
    >
      <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30 mb-5 overflow-hidden flex items-center justify-center">
        <Code2 className="w-12 h-12 text-white/10 group-hover:text-white/20 transition-colors" />
      </div>
      <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">{item.category}</span>
      <h3 className="text-lg font-bold mt-1 mb-2 group-hover:text-purple-300 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.title}</h3>
      <p className="text-sm text-white/40">{item.tech}</p>
    </motion.div>
  );
};

export default RHSoftwarePage;
