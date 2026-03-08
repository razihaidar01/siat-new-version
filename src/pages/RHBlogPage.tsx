import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  { title: "How AI is Transforming Small Businesses in Bihar", category: "AI", date: "March 2026", excerpt: "Discover how artificial intelligence is revolutionizing local businesses — from predictive analytics to automated customer service." },
  { title: "The Future of Mobile App Development in 2026", category: "Mobile", date: "March 2026", excerpt: "Cross-platform frameworks, AI integration, and the rise of super-apps — what's shaping mobile development this year." },
  { title: "Why Every Business Needs a Digital Presence", category: "Web", date: "February 2026", excerpt: "From credibility to customer acquisition — the ROI of investing in professional website development." },
  { title: "Building Scalable SaaS Products: A Technical Guide", category: "Software", date: "February 2026", excerpt: "Architecture patterns, tech stack choices, and scaling strategies for successful SaaS applications." },
  { title: "Machine Learning for E-Commerce: Practical Applications", category: "AI", date: "January 2026", excerpt: "Recommendation engines, dynamic pricing, fraud detection — ML use cases that drive e-commerce growth." },
  { title: "React Native vs Flutter: Which to Choose in 2026", category: "Mobile", date: "January 2026", excerpt: "A comprehensive comparison of the two leading cross-platform mobile development frameworks." },
];

const RHBlogPage = () => {
  return (
    <section className="py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Tech <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">Blog</span>
          </h1>
          <p className="text-lg text-white/40 mt-4 max-w-xl mx-auto">Insights, tutorials, and tech news from the RH Software team.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">{post.category}</span>
              <h3 className="text-lg font-bold mt-2 mb-3 group-hover:text-purple-300 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>{post.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/30 flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="text-sm text-white/40 group-hover:text-purple-400 transition-colors flex items-center gap-1">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RHBlogPage;
