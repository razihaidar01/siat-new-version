import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Globe, Smartphone, Code2, Database, Cpu, ChevronRight, ArrowRight } from "lucide-react";

const allServices = [
  {
    icon: Brain, title: "Artificial Intelligence", grad: "from-purple-500 to-violet-600",
    desc: "Custom AI models, machine learning pipelines, NLP engines, computer vision, and intelligent automation systems.",
    features: ["Custom ML Models", "Natural Language Processing", "Computer Vision", "Predictive Analytics", "AI Chatbots", "Recommendation Engines"],
  },
  {
    icon: Globe, title: "Website Development & Design", grad: "from-cyan-500 to-blue-600",
    desc: "High-performance, SEO-optimized websites built with modern frameworks. From landing pages to complex web applications.",
    features: ["React / Next.js Apps", "E-Commerce Platforms", "CMS Development", "Landing Pages", "SEO Optimization", "Performance Tuning"],
  },
  {
    icon: Smartphone, title: "App Development", grad: "from-blue-500 to-indigo-600",
    desc: "Native and cross-platform mobile applications with stunning design and seamless performance.",
    features: ["iOS & Android Apps", "React Native", "Flutter Development", "App Store Optimization", "Push Notifications", "In-App Payments"],
  },
  {
    icon: Code2, title: "Software Engineering", grad: "from-emerald-500 to-teal-600",
    desc: "Enterprise-grade custom software solutions for complex business operations and workflows.",
    features: ["ERP Systems", "CRM Platforms", "SaaS Products", "API Development", "Cloud Architecture", "DevOps & CI/CD"],
  },
  {
    icon: Database, title: "Cloud & Infrastructure", grad: "from-orange-500 to-red-600",
    desc: "Scalable cloud architecture, database design, and infrastructure management for mission-critical applications.",
    features: ["AWS / GCP / Azure", "Database Design", "Microservices", "Load Balancing", "Auto Scaling", "Monitoring"],
  },
  {
    icon: Cpu, title: "IoT & Embedded Systems", grad: "from-pink-500 to-rose-600",
    desc: "Connected device solutions, IoT platforms, and embedded software for smart systems.",
    features: ["IoT Platforms", "Sensor Integration", "Real-time Dashboards", "Edge Computing", "MQTT / WebSocket", "Fleet Management"],
  },
];

const RHServicesPage = () => {
  return (
    <section className="py-28 md:py-32 px-6 md:px-10 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full border border-indigo-400/25 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6 uppercase tracking-wider">
            Our Services
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Six disciplines.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">One studio.</span>
          </h1>
          <p className="text-base md:text-lg text-white/50 mt-5 max-w-2xl mx-auto">
            End-to-end digital solutions powered by innovation and engineering excellence.
          </p>
        </motion.div>

        <div className="space-y-6">
          {allServices.map((s, i) => (
            <ServiceBlock key={s.title} service={s} index={i} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-20">
          <Link to="/rhsoftware/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.45)] transition-all hover:-translate-y-0.5">
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceBlock = ({ service, index }: { service: typeof allServices[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl hover:border-indigo-400/30 hover:bg-white/[0.06] transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.grad} flex items-center justify-center mb-5 shadow-[0_15px_40px_-10px_rgba(99,102,241,0.5)]`}>
            <service.icon className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{service.title}</h2>
          <p className="text-white/55 leading-relaxed">{service.desc}</p>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-3">
            {service.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-white/65">
                <ChevronRight className="w-3 h-3 text-indigo-400 flex-shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RHServicesPage;
