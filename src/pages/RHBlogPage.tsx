import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Clock, ArrowRight } from "lucide-react";
import { RH_IMAGES } from "@/lib/rhPlaceholders";

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

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured?: boolean;
};

const posts: Post[] = [
  {
    slug: "shipping-ai-without-vendor-lockin",
    title: "Shipping AI products without vendor lock-in",
    excerpt: "How we architect LLM-powered features that survive model swaps, price hikes, and silent provider changes.",
    category: "AI",
    date: "May 4, 2026",
    readTime: "9 min",
    author: "Rishabh K.",
    image: RH_IMAGES.blogAi,
    featured: true,
  },
  {
    slug: "scaling-saas-from-100-to-10k-users",
    title: "Scaling a SaaS from 100 to 10,000 users without a rewrite",
    excerpt: "The five architectural decisions we make at week one that hold up well past product-market fit.",
    category: "Engineering",
    date: "April 28, 2026",
    readTime: "11 min",
    author: "Aman P.",
    image: RH_IMAGES.blogSaas,
  },
  {
    slug: "performance-budget-real-devices",
    title: "Designing a performance budget for real devices, not lab tests",
    excerpt: "Lab scores lie. Here's the field-data approach we use to keep our products feeling fast on a 4-year-old phone.",
    category: "Performance",
    date: "April 18, 2026",
    readTime: "7 min",
    author: "Riya S.",
    image: RH_IMAGES.blogPerformance,
  },
  {
    slug: "react-native-vs-flutter-2026",
    title: "React Native vs Flutter in 2026: an opinionated guide",
    excerpt: "Both are great. The honest answer to which one you should pick depends on three questions most teams skip.",
    category: "Mobile",
    date: "April 6, 2026",
    readTime: "8 min",
    author: "Aman P.",
    image: RH_IMAGES.blogMobile,
  },
  {
    slug: "edge-rendering-decision-tree",
    title: "Edge rendering: a practical decision tree",
    excerpt: "When edge actually pays off — and when it just adds operational pain for negligible wins.",
    category: "Web",
    date: "March 25, 2026",
    readTime: "6 min",
    author: "Rishabh K.",
    image: RH_IMAGES.blogWeb,
  },
  {
    slug: "modern-design-systems-shipping",
    title: "Modern design systems that actually ship",
    excerpt: "Why most design systems die in Figma — and the lightweight setup we use to keep ours alive in production.",
    category: "Design",
    date: "March 14, 2026",
    readTime: "10 min",
    author: "Riya S.",
    image: RH_IMAGES.blogUxSystems,
  },
  {
    slug: "devops-for-three-engineer-startups",
    title: "DevOps for three-engineer startups",
    excerpt: "The minimum-viable platform setup that won't slow you down — or wake you up at 3am.",
    category: "DevOps",
    date: "March 2, 2026",
    readTime: "9 min",
    author: "Aman P.",
    image: RH_IMAGES.blogDevops,
  },
  {
    slug: "architecting-multi-tenant-postgres",
    title: "Architecting multi-tenant Postgres without regrets",
    excerpt: "Schema-per-tenant, RLS, or shared schema? A founder-friendly walk-through of the real tradeoffs.",
    category: "Engineering",
    date: "February 19, 2026",
    readTime: "12 min",
    author: "Rishabh K.",
    image: RH_IMAGES.blogArchitecture,
  },
];

const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

/* ------------------------------------------------------------------ */
const Hero = () => (
  <section className="pt-10 md:pt-16 pb-10 px-6 md:px-10">
    <div className="max-w-7xl mx-auto">
      <FadeUp>
        <span className="rh-eyebrow"><span className="dot" />Engineering insights</span>
      </FadeUp>
      <FadeUp delay={0.06}>
        <h1 className="mt-5 text-[40px] md:text-[64px] leading-[1.02] font-semibold tracking-[-0.03em] max-w-4xl">
          Field notes from{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#22D3EE]">
            building real products.
          </span>
        </h1>
      </FadeUp>
      <FadeUp delay={0.12}>
        <p className="mt-6 text-[16px] md:text-[17px] rh-text-muted max-w-2xl leading-relaxed">
          Practical writing on engineering, design, and the trade-offs we live with daily.
          No filler. No clickbait.
        </p>
      </FadeUp>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
const FeaturedPost = ({ p }: { p: Post }) => (
  <FadeUp>
    <article className="group rh-surface rh-card-hover overflow-hidden grid md:grid-cols-2 cursor-pointer">
      <div className="relative h-64 md:h-full overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0D0D12] via-transparent to-transparent" />
        <span className="absolute top-5 left-5 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.18em] text-white">
          Featured · {p.category}
        </span>
      </div>
      <div className="p-7 md:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-3 text-[12px] rh-text-dim">
          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {p.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {p.readTime}</span>
        </div>
        <h2 className="text-[26px] md:text-[34px] font-semibold tracking-tight mt-4 leading-tight group-hover:text-[#C4B5FD] transition-colors">
          {p.title}
        </h2>
        <p className="rh-text-muted mt-4 text-[15px] leading-relaxed">{p.excerpt}</p>
        <div className="mt-7 flex items-center justify-between">
          <span className="text-[13px] text-white/65">By {p.author}</span>
          <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#C4B5FD] group-hover:text-white transition-colors">
            Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  </FadeUp>
);

/* ------------------------------------------------------------------ */
const PostCard = ({ p, i }: { p: Post; i: number }) => (
  <FadeUp delay={i * 0.04} className="group">
    <article className="rh-surface rh-card-hover overflow-hidden h-full flex flex-col cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12]/80 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.18em] text-white">
          {p.category}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[11px] rh-text-dim">
          <Calendar className="w-3 h-3" /> {p.date}
          <span>·</span>
          <Clock className="w-3 h-3" /> {p.readTime}
        </div>
        <h3 className="text-[17px] font-semibold tracking-tight mt-3 leading-snug group-hover:text-[#C4B5FD] transition-colors">
          {p.title}
        </h3>
        <p className="rh-text-muted text-[13.5px] mt-2.5 leading-relaxed line-clamp-2 flex-1">{p.excerpt}</p>
        <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between">
          <span className="text-[12px] text-white/55">{p.author}</span>
          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#C4B5FD] group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </article>
  </FadeUp>
);

/* ------------------------------------------------------------------ */
const RHBlogPage = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <>
      <Hero />

      <section className="px-6 md:px-10 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                  filter === c
                    ? "bg-white text-[#07070A]"
                    : "border border-white/[0.1] bg-white/[0.03] text-white/65 hover:text-white hover:border-white/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {featured && (
            <div className="mb-8">
              <FeaturedPost p={featured} />
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto rh-surface p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-50"
               style={{ background: "radial-gradient(600px 280px at 50% 0%, rgba(124,58,237,0.25), transparent 70%)" }} />
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight">
            Building something interesting?
          </h2>
          <p className="rh-text-muted mt-4 max-w-xl mx-auto">
            We'd love to hear about it. Book a free 30-minute call with our engineering team.
          </p>
          <div className="mt-7 flex justify-center">
            <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
              Book a call <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RHBlogPage;
