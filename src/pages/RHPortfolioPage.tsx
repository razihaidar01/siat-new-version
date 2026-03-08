import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink, X } from "lucide-react";

const projects = [
  { title: "AI-Powered Analytics Dashboard", category: "AI / Web", tech: ["React", "Python", "TensorFlow", "PostgreSQL"], desc: "Real-time analytics platform with predictive insights powered by machine learning models for a Fortune 500 company." },
  { title: "E-Commerce Mobile App", category: "Mobile", tech: ["React Native", "Node.js", "MongoDB", "Stripe"], desc: "Cross-platform shopping app with AI-powered recommendations, push notifications, and seamless payment integration." },
  { title: "Hospital Management System", category: "Software", tech: ["Next.js", "PostgreSQL", "Redis", "Docker"], desc: "Comprehensive HMS managing patient records, appointments, billing, and pharmacy inventory for a hospital chain." },
  { title: "Smart Inventory Platform", category: "SaaS", tech: ["Vue.js", "Go", "Redis", "AWS"], desc: "Cloud-based inventory management with real-time tracking, automated reordering, and multi-warehouse support." },
  { title: "Learning Management System", category: "EdTech", tech: ["React", "Django", "AWS", "WebRTC"], desc: "Interactive LMS with live classes, assessments, progress tracking, and certificate generation." },
  { title: "Fleet Tracking Solution", category: "IoT", tech: ["React", "Node.js", "MQTT", "MapboxGL"], desc: "Real-time fleet management with GPS tracking, route optimization, driver analytics, and maintenance alerts." },
  { title: "Banking Chatbot", category: "AI", tech: ["Python", "NLP", "React", "GCP"], desc: "Intelligent conversational AI for a banking app handling customer queries, transactions, and account management." },
  { title: "Real Estate Platform", category: "Web", tech: ["Next.js", "Prisma", "PostgreSQL", "Mapbox"], desc: "Property listing and management platform with virtual tours, mortgage calculator, and agent matching." },
];

const RHPortfolioPage = () => {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Portfolio</span>
            </h1>
            <p className="text-lg text-white/40 mt-4 max-w-xl mx-auto">Projects we've delivered across industries.</p>
          </motion.div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? "bg-purple-500 text-white" : "border border-white/10 text-white/50 hover:text-white hover:border-white/20"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelected(item)}
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30 mb-5 flex items-center justify-center">
                  <Code2 className="w-12 h-12 text-white/10 group-hover:text-white/20 transition-colors" />
                </div>
                <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">{item.category}</span>
                <h3 className="text-lg font-bold mt-1 mb-2 group-hover:text-purple-300 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/40">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen detail */}
      {selected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="max-w-2xl w-full rounded-2xl border border-white/10 bg-white/[0.05] p-8 relative">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">{selected.category}</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{selected.title}</h2>
            <p className="text-white/50 leading-relaxed mb-6">{selected.desc}</p>
            <h4 className="text-sm font-semibold text-white/60 mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {selected.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-300 text-sm">{t}</span>
              ))}
            </div>
            <a href="/rh-software/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold text-sm">
              Build Something Similar <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default RHPortfolioPage;
