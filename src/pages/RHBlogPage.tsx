import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  { title: "How AI is Transforming Small Businesses in Bihar", category: "AI", date: "March 2026", excerpt: "Discover how artificial intelligence is revolutionizing local businesses — from predictive analytics to automated customer service.", grad: "from-purple-500 to-violet-600" },
  { title: "The Future of Mobile App Development in 2026", category: "Mobile", date: "March 2026", excerpt: "Cross-platform frameworks, AI integration, and the rise of super-apps — what's shaping mobile development this year.", grad: "from-blue-500 to-indigo-600" },
  { title: "Why Every Business Needs a Digital Presence", category: "Web", date: "February 2026", excerpt: "From credibility to customer acquisition — the ROI of investing in professional website development.", grad: "from-cyan-500 to-blue-600" },
  { title: "Building Scalable SaaS Products: A Technical Guide", category: "Software", date: "February 2026", excerpt: "Architecture patterns, tech stack choices, and scaling strategies for successful SaaS applications.", grad: "from-emerald-500 to-teal-600" },
  { title: "Machine Learning for E-Commerce: Practical Applications", category: "AI", date: "January 2026", excerpt: "Recommendation engines, dynamic pricing, fraud detection — ML use cases that drive e-commerce growth.", grad: "from-amber-500 to-orange-600" },
  { title: "React Native vs Flutter: Which to Choose in 2026", category: "Mobile", date: "January 2026", excerpt: "A comprehensive comparison of the two leading cross-platform mobile development frameworks.", grad: "from-rose-500 to-pink-600" },
];

const RHBlogPage = () => {
  return (
    <section className="py-28 md:py-32 px-6 md:px-10 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full border border-indigo-400/25 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6 uppercase tracking-wider">
            Insights
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Tech <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300">Blog.</span>
          </h1>
          <p className="text-base md:text-lg text-white/50 mt-5 max-w-xl mx-auto">
            Insights, tutorials, and tech news from the RH Software team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl hover:border-indigo-400/30 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_25px_60px_-20px_rgba(99,102,241,0.4)] transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className={`aspect-[16/9] bg-gradient-to-br ${post.grad} relative`}>
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)"
                }} />
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-indigo-300">{post.category}</span>
                <h3 className="text-lg font-bold mt-2 mb-3 group-hover:text-indigo-200 transition-colors leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>{post.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <span className="text-xs text-white/40 flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="text-sm text-white/55 group-hover:text-indigo-300 transition-colors flex items-center gap-1 font-medium">
                    Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RHBlogPage;
