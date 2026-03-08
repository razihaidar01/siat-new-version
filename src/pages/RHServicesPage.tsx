import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Globe, Smartphone, Code2, Database, Cpu, ChevronRight } from "lucide-react";

const allServices = [
  {
    icon: Brain, title: "Artificial Intelligence", color: "from-purple-500 to-violet-600",
    desc: "Custom AI models, machine learning pipelines, NLP engines, computer vision, and intelligent automation systems.",
    features: ["Custom ML Models", "Natural Language Processing", "Computer Vision", "Predictive Analytics", "AI Chatbots", "Recommendation Engines"],
  },
  {
    icon: Globe, title: "Website Development & Design", color: "from-cyan-500 to-blue-600",
    desc: "High-performance, SEO-optimized websites built with modern frameworks. From landing pages to complex web applications.",
    features: ["React / Next.js Apps", "E-Commerce Platforms", "CMS Development", "Landing Pages", "SEO Optimization", "Performance Tuning"],
  },
  {
    icon: Smartphone, title: "App Development", color: "from-blue-500 to-indigo-600",
    desc: "Native and cross-platform mobile applications with stunning design and seamless performance.",
    features: ["iOS & Android Apps", "React Native", "Flutter Development", "App Store Optimization", "Push Notifications", "In-App Payments"],
  },
  {
    icon: Code2, title: "Software Engineering", color: "from-emerald-500 to-teal-600",
    desc: "Enterprise-grade custom software solutions for complex business operations and workflows.",
    features: ["ERP Systems", "CRM Platforms", "SaaS Products", "API Development", "Cloud Architecture", "DevOps & CI/CD"],
  },
  {
    icon: Database, title: "Cloud & Infrastructure", color: "from-orange-500 to-red-600",
    desc: "Scalable cloud architecture, database design, and infrastructure management for mission-critical applications.",
    features: ["AWS / GCP / Azure", "Database Design", "Microservices", "Load Balancing", "Auto Scaling", "Monitoring"],
  },
  {
    icon: Cpu, title: "IoT & Embedded Systems", color: "from-pink-500 to-rose-600",
    desc: "Connected device solutions, IoT platforms, and embedded software for smart systems.",
    features: ["IoT Platforms", "Sensor Integration", "Real-time Dashboards", "Edge Computing", "MQTT / WebSocket", "Fleet Management"],
  },
];

const RHServicesPage = () => {
  return (
    <>
      <section className="py-32 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-6">Our Services</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              What We <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Build</span>
            </h1>
            <p className="text-lg text-white/40 mt-4 max-w-2xl mx-auto">End-to-end digital solutions powered by innovation and engineering excellence.</p>
          </motion.div>

          <div className="space-y-8">
            {allServices.map((s, i) => (
              <ServiceBlock key={s.title} service={s} index={i} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-20">
            <Link to="/rhsoftware/contact" className="px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all inline-block">
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const ServiceBlock = ({ service, index }: { service: typeof allServices[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="p-8 md:p-10 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
            <service.icon className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{service.title}</h2>
          <p className="text-white/50 leading-relaxed">{service.desc}</p>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-3">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                <ChevronRight className="w-3 h-3 text-purple-400 flex-shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RHServicesPage;
