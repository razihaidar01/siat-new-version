import RHCinematicHero from "@/components/rh/RHCinematicHero";
/**
 * RHBlogPage.tsx — COMPLETE REPLACEMENT
 * File: src/pages/RHBlogPage.tsx
 *
 * WHAT WAS WRONG:
 * - Hardcoded posts had zero SEO keywords (titles like "Shipping AI without vendor lock-in")
 * - Not importing from blogPosts.ts which has 12 real Bihar SEO posts
 * - Categories didn't include "Certification" for ISO/MSME posts
 *
 * WHAT'S FIXED:
 * - Merges hardcoded design posts WITH real SEO posts from blogPosts.ts
 * - SEO posts shown FIRST (they have Bihar keywords Google needs)
 * - All 12 SEO posts visible and clickable
 * - Proper categories including Certification
 */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Clock, ArrowRight, MapPin } from "lucide-react";
import { RH_IMAGES } from "@/lib/rhPlaceholders";
import { useSEO } from "@/hooks/useSEO";
import { RH_BASE_URL, rhOrganizationSchema, rhBreadcrumb } from "@/lib/rhSeo";
import { blogPosts } from "@/data/blogPosts";

const FadeUp = ({ children, delay = 0, className = "" }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

/* ── Unified post type ── */
type Post = {
  slug: string; title: string; excerpt: string; category: string;
  date: string; readTime: string; author: string; image?: string;
  featured?: boolean; isSEO?: boolean; grad?: string; keywords?: string;
};

/* ── Gradient map for SEO posts ── */
const GRAD_BG: Record<string, string> = {};

/* ── Convert blogPosts to unified Post type ── */
const seoPosts: Post[] = blogPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  date: p.date,
  readTime: p.readTime,
  author: p.author,
  grad: p.grad,
  keywords: p.keywords,
  isSEO: true,
  featured: p.slug === "best-website-developer-saharsa-bihar",
}));

/* ── Original tech posts (keep design/engineering content too) ── */
const techPosts: Post[] = [
  { slug: "shipping-ai-without-vendor-lockin", title: "Shipping AI products without vendor lock-in",
    excerpt: "How we architect LLM-powered features that survive model swaps, price hikes, and silent provider changes.",
    category: "Engineering", date: "May 4, 2026", readTime: "9 min", author: "RH Software Team", image: RH_IMAGES.blogAi },
  { slug: "scaling-saas-from-100-to-10k-users", title: "Scaling a SaaS from 100 to 10,000 users without a rewrite",
    excerpt: "The five architectural decisions we make at week one that hold up well past product-market fit.",
    category: "Engineering", date: "April 28, 2026", readTime: "11 min", author: "RH Software Team", image: RH_IMAGES.blogSaas },
  { slug: "react-native-vs-flutter-2026", title: "React Native vs Flutter in 2026: an opinionated guide",
    excerpt: "Both are great. The honest answer to which one you should pick depends on three questions most teams skip.",
    category: "Mobile", date: "April 6, 2026", readTime: "8 min", author: "RH Software Team", image: RH_IMAGES.blogMobile },
  { slug: "performance-budget-real-devices", title: "Designing a performance budget for real devices, not lab tests",
    excerpt: "Lab scores lie. Here's the field-data approach we use to keep our products feeling fast on a 4-year-old phone.",
    category: "Web Development", date: "April 18, 2026", readTime: "7 min", author: "RH Software Team", image: RH_IMAGES.blogPerformance },
  { slug: "modern-design-systems-shipping", title: "Modern design systems that actually ship",
    excerpt: "Why most design systems die in Figma — and the lightweight setup we use to keep ours alive in production.",
    category: "Engineering", date: "March 14, 2026", readTime: "10 min", author: "RH Software Team", image: RH_IMAGES.blogUxSystems },
  { slug: "devops-for-three-engineer-startups", title: "DevOps for three-engineer startups",
    excerpt: "The minimum-viable platform setup that won't slow you down — or wake you up at 3am.",
    category: "Engineering", date: "March 2, 2026", readTime: "9 min", author: "RH Software Team", image: RH_IMAGES.blogDevops },
];

/* ── All posts: SEO posts first ── */
const allPosts: Post[] = [...seoPosts, ...techPosts];

const allCategories = ["All", "Web Development", "Mobile", "AI", "Certification", "Engineering"];

/* ─────────────────────────────────── */
const Hero = () => (
  <RHCinematicHero chapter="05 / JOURNAL" eyebrow="Bihar Tech Insights & Guides"
    title={<> Guides for <span className="rh-cinematic-title-line">Bihar businesses.</span></>}
    description="Practical guides on websites, apps, AI, ISO certification, MSME registration and more \u2014 written for businesses in Saharsa, Madhepura, Purnia, Supaul and all of Bihar." />
);

/* ─── SEO Post Card (for Bihar keyword posts) ─── */
const SEOPostCard = ({ p, i, featured = false }: { p: Post; i: number; featured?: boolean }) => (
  <FadeUp delay={i * 0.04}>
    <Link to={`/rhsoftware/blog/${p.slug}`} className="block group">
      <article className={`rh-surface rh-card-hover overflow-hidden h-full flex flex-col cursor-pointer ${featured ? "md:flex-row" : ""}`}>
        {/* Gradient header */}
        <div
          className={`relative overflow-hidden flex-shrink-0 ${featured ? "md:w-2/5 min-h-[200px]" : "h-40"}`}
          style={{ background: GRAD_BG[p.grad || ""] || "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))" }}
        >
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "linear-gradient(hsl(var(--foreground) / 0.15) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground) / 0.15) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-foreground/15 backdrop-blur-md border border-foreground/20 text-[10px] uppercase tracking-[0.15em] text-foreground font-medium">
            {p.category}
          </span>
          {/* Bihar badge */}
          <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] text-foreground/70">
            <MapPin className="w-2.5 h-2.5" /> Bihar
          </span>
        </div>
        <div className={`p-5 flex-1 flex flex-col ${featured ? "md:p-8 justify-center" : ""}`}>
          <div className="flex items-center gap-2 text-[11px] rh-text-dim mb-2">
            <Calendar className="w-3 h-3" /> {p.date}
            <span>·</span>
            <Clock className="w-3 h-3" /> {p.readTime}
          </div>
          <h2 className={`font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors ${featured ? "text-[22px] md:text-[28px]" : "text-[16px]"}`}>
            {p.title}
          </h2>
          <p className="rh-text-muted text-[13px] mt-2 leading-relaxed line-clamp-2 flex-1">{p.excerpt}</p>
          <div className="mt-4 pt-3 border-t border-foreground/[0.05] flex items-center justify-between">
            <span className="text-[11px] text-foreground/50">{p.author}</span>
            <span className="flex items-center gap-1 text-[12px] font-medium text-primary group-hover:text-foreground transition-colors">
              Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  </FadeUp>
);

/* ─── Tech Post Card (for engineering posts) ─── */
const TechPostCard = ({ p, i }: { p: Post; i: number }) => (
  <FadeUp delay={i * 0.04} className="group">
    <Link to={`/rhsoftware/blog/${p.slug}`}>
      <article className="rh-surface rh-card-hover overflow-hidden h-full flex flex-col cursor-pointer">
        <div className="relative h-44 overflow-hidden">
          <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-foreground/10 backdrop-blur-md border border-foreground/15 text-[10px] uppercase tracking-[0.15em] text-foreground">
            {p.category}
          </span>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-[11px] rh-text-dim">
            <Calendar className="w-3 h-3" /> {p.date} · <Clock className="w-3 h-3" /> {p.readTime}
          </div>
          <h3 className="text-[16px] font-semibold tracking-tight mt-2.5 leading-snug group-hover:text-primary transition-colors">
            {p.title}
          </h3>
          <p className="rh-text-muted text-[13px] mt-2 leading-relaxed line-clamp-2 flex-1">{p.excerpt}</p>
          <div className="mt-4 pt-3 border-t border-foreground/[0.05] flex items-center justify-between">
            <span className="text-[12px] text-foreground/50">{p.author}</span>
            <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </article>
    </Link>
  </FadeUp>
);

/* ─────────────────────────────────── */
const RHBlogPage = () => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? allPosts
    : allPosts.filter((p) => p.category === filter || p.category.toLowerCase().includes(filter.toLowerCase()));

  const featuredSEO = filtered.find((p) => p.isSEO && p.featured) || filtered.find((p) => p.isSEO);
  const restSEO = filtered.filter((p) => p.isSEO && p !== featuredSEO);
  const techFiltered = filtered.filter((p) => !p.isSEO);

  useSEO({
    title: "Blog | RH Software – Website, App, AI & Business Guides for Bihar",
    description: "Practical guides for Bihar businesses: website development, app development, AI, ISO certification, MSME registration, trademark. RH Software (SIAT) writes for Saharsa, Madhepura, Purnia, Supaul & all Bihar.",
    keywords: "RH Software blog, website development guide bihar, app development blog, ISO certification guide bihar, MSME registration guide, AI development bihar, software company blog saharsa",
    canonical: `${RH_BASE_URL}/rhsoftware/blog`,
    schema: [
      rhOrganizationSchema,
      rhBreadcrumb([
        { name: "Home", url: RH_BASE_URL },
        { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
        { name: "Blog", url: `${RH_BASE_URL}/rhsoftware/blog` },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "RH Software Blog – Bihar Tech & Business Guides",
        url: `${RH_BASE_URL}/rhsoftware/blog`,
        description: "Practical guides for Bihar businesses on websites, apps, AI, ISO certification and more.",
        publisher: { "@id": `${RH_BASE_URL}/rhsoftware#organization` },
        blogPost: seoPosts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${RH_BASE_URL}/rhsoftware/blog/${p.slug}`,
          datePublished: p.date,
          author: { "@type": "Organization", name: "RH Software" },
        })),
      },
    ],
  });

  return (
    <>
      <Hero />

      {/* Category filter */}
      <section className="px-6 md:px-10 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {allCategories.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                  filter === c
                    ? "bg-foreground text-background"
                    : "border border-foreground/[0.1] bg-foreground/[0.03] text-foreground/65 hover:text-foreground hover:border-foreground/20"
                }`}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured SEO post */}
          {featuredSEO && (
            <div className="mb-8">
              <SEOPostCard p={featuredSEO} i={0} featured />
            </div>
          )}

          {/* Rest of SEO posts grid */}
          {restSEO.length > 0 && (
            <>
              <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 mb-5 flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Bihar Business Guides
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                {restSEO.map((p, i) => <SEOPostCard key={p.slug} p={p} i={i} />)}
              </div>
            </>
          )}

          {/* Tech posts */}
          {techFiltered.length > 0 && (
            <>
              <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 mb-5">Engineering Insights</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {techFiltered.map((p, i) => <TechPostCard key={p.slug} p={p} i={i} />)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto rh-surface p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-50"
            style={{ background: "radial-gradient(600px 280px at 50% 0%, hsl(var(--primary) / 0.25), transparent 70%)" }} />
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight">
            Ready to build your Bihar business online?
          </h2>
          <p className="rh-text-muted mt-4 max-w-xl mx-auto">
            Free consultation with RH Software team. Website, app, AI or certification — we help Bihar businesses grow.
          </p>
          <div className="mt-7 flex justify-center gap-4 flex-wrap">
            <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
              Get Free Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/bihar/saharsa/website-development" className="rh-btn border border-foreground/15 text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-all px-5 py-2.5 rounded-md text-sm font-medium">
              City Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RHBlogPage;
