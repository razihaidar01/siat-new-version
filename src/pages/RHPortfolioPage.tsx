import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink, X } from "lucide-react";

const projects = [
  { title: "AI-Powered Analytics Dashboard", category: "AI / Web", tech: ["React", "Python", "TensorFlow", "PostgreSQL"], desc: "Real-time analytics platform with predictive insights powered by machine learning models for a Fortune 500 company.", grad: "from-indigo-500 to-purple-600" },
  { title: "E-Commerce Mobile App", category: "Mobile", tech: ["React Native", "Node.js", "MongoDB", "Stripe"], desc: "Cross-platform shopping app with AI-powered recommendations, push notifications, and seamless payment integration.", grad: "from-rose-500 to-pink-600" },
  { title: "Hospital Management System", category: "Software", tech: ["Next.js", "PostgreSQL", "Redis", "Docker"], desc: "Comprehensive HMS managing patient records, appointments, billing, and pharmacy inventory for a hospital chain.", grad: "from-emerald-500 to-teal-600" },
  { title: "Smart Inventory Platform", category: "SaaS", tech: ["Vue.js", "Go", "Redis", "AWS"], desc: "Cloud-based inventory management with real-time tracking, automated reordering, and multi-warehouse support.", grad: "from-blue-500 to-cyan-600" },
  { title: "Learning Management System", category: "EdTech", tech: ["React", "Django", "AWS", "WebRTC"], desc: "Interactive LMS with live classes, assessments, progress tracking, and certificate generation.", grad: "from-amber-500 to-orange-600" },
  { title: "Fleet Tracking Solution", category: "IoT", tech: ["React", "Node.js", "MQTT", "MapboxGL"], desc: "Real-time fleet management with GPS tracking, route optimization, driver analytics, and maintenance alerts.", grad: "from-violet-500 to-fuchsia-600" },
  { title: "Banking Chatbot", category: "AI", tech: ["Python", "NLP", "React", "GCP"], desc: "Intelligent conversational AI for a banking app handling customer queries, transactions, and account management.", grad: "from-cyan-500 to-blue-600" },
  { title: "Real Estate Platform", category: "Web", tech: ["Next.js", "Prisma", "PostgreSQL", "Mapbox"], desc: "Property listing and management platform with virtual tours, mortgage calculator, and agent matching.", grad: "from-emerald-500 to-cyan-500" },
];

const RHPortfolioPage = () => {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="py-28 md:py-32 px-6 md:px-10 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3.5 py-1.5 rounded-full border border-indigo-400/25 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6 uppercase tracking-wider">
              Selected Work
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">Portfolio</span>
            </h1>
            <p className="text-base md:text-lg text-white/50 mt-5 max-w-xl mx-auto">Projects we've delivered across industries.</p>
          </motion.div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === c
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-[0_0_25px_rgba(99,102,241,0.4)]"
                    : "border border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                onClick={() => setSelected(item)}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl hover:border-indigo-400/40 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_25px_60px_-20px_rgba(99,102,241,0.4)] transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className={`relative aspect-video bg-gradient-to-br ${item.grad} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)"
                  }} />
                  <Code2 className="w-14 h-14 text-white/30 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-indigo-300">{item.category}</span>
                  <h3 className="text-lg font-bold mt-1.5 mb-3 group-hover:text-indigo-200 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.06] text-white/55">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-2xl border border-white/[0.1] bg-[#0a0d18]/95 backdrop-blur-2xl p-8 relative shadow-[0_30px_80px_-20px_rgba(99,102,241,0.5)]"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${selected.grad} mb-6 flex items-center justify-center`}>
                <Code2 className="w-16 h-16 text-white/30" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-indigo-300">{selected.category}</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{selected.title}</h2>
              <p className="text-white/60 leading-relaxed mb-6">{selected.desc}</p>
              <h4 className="text-sm font-semibold text-white/65 mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {selected.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-200 text-sm">{t}</span>
                ))}
              </div>
              <a href="/rhsoftware/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold text-sm hover:shadow-[0_0_30px_rgba(99,102,241,0.45)] transition-all">
                Build Something Similar <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RHPortfolioPage;
