/**
 * RHBlogPostPage.tsx
 * Save to: src/pages/RHBlogPostPage.tsx
 *
 * Renders individual blog posts at /rhsoftware/blog/:slug
 * Full SEO: dynamic title, meta, schema, breadcrumbs, FAQ rich results
 */

import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar, Clock, ArrowLeft, ArrowRight,
  Tag, Share2, MessageCircle, ChevronRight,
  CheckCircle2, MapPin,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import {
  getPostBySlug,
  getRelatedPosts,
  BlogPost,
} from "@/data/blogPosts";

/* ─── City link map for "Also serving" footer ─── */
const CITY_LINKS = [
  { city: "Saharsa", slug: "saharsa" },
  { city: "Madhepura", slug: "madhepura" },
  { city: "Purnia", slug: "purnia" },
  { city: "Supaul", slug: "supaul" },
  { city: "Darbhanga", slug: "darbhanga" },
  { city: "Bhagalpur", slug: "bhagalpur" },
];

/* ─── Gradient map ─── */
const GRAD_MAP: Record<string, string> = {
  "from-primary to-primary": "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))",
  "from-primary to-primary": "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))",
  "from-primary to-primary": "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))",
  "from-primary to-primary": "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))",
  "from-primary to-primary": "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))",
  "from-primary to-primary": "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))",
  "from-primary to-primary": "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))",
  "from-primary to-primary": "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))",
  "from-primary to-primary": "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))",
};

const getGrad = (grad: string) =>
  GRAD_MAP[grad] || "linear-gradient(135deg, var(--rh-elevated), var(--rh-accent))";

/* ══════════════════════════════════════════════════════ */

const RHBlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  /* Redirect to blog list if post not found */
  if (!post) return <Navigate to="/rhsoftware/blog" replace />;

  return <PostContent post={post} />;
};

/* ─── Separated so hooks are not conditionally called ─── */
const PostContent = ({ post }: { post: BlogPost }) => {
  const related = getRelatedPosts(post.slug, post.categorySlug, 3);

  /* ── Dynamic SEO ── */
  useSEO({
    title: post.metaTitle,
    description: post.metaDescription,
    canonical: `https://www.siat.in/rhsoftware/blog/${post.slug}`,
    keywords: post.keywords,
    schema: [
      /* Article schema */
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.metaDescription,
        "image": "https://www.siat.in/og-image.png",
        "datePublished": post.dateISO,
        "dateModified": post.dateISO,
        "author": {
          "@type": "Organization",
          "name": post.author,
          "url": "https://www.siat.in/rhsoftware",
        },
        "publisher": {
          "@type": "Organization",
          "name": "SIAT (RH Software)",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.siat.in/favicon.png",
          },
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.siat.in/rhsoftware/blog/${post.slug}`,
        },
        "keywords": post.keywords,
        "articleSection": post.category,
        "inLanguage": post.slug.includes("hindi") || post.content.intro.match(/[\u0900-\u097F]/) ? "hi-IN" : "en-IN",
      },
      /* BreadcrumbList */
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.siat.in" },
          { "@type": "ListItem", "position": 2, "name": "RH Software", "item": "https://www.siat.in/rhsoftware" },
          { "@type": "ListItem", "position": 3, "name": "Blog", "item": "https://www.siat.in/rhsoftware/blog" },
          { "@type": "ListItem", "position": 4, "name": post.title, "item": `https://www.siat.in/rhsoftware/blog/${post.slug}` },
        ],
      },
      /* FAQ schema — gets extra SERP space */
      ...(post.faqs?.length
        ? [{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faqs.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          }]
        : []),
    ],
  });

  const shareUrl = `https://www.siat.in/rhsoftware/blog/${post.slug}`;

  return (
    <div className="min-h-screen" >

      {/* ─── HERO BANNER ─── */}
      <div
        className="relative px-6 md:px-10 rh-detail-intro"
      >
        {/* subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-foreground/60 text-xs mb-6 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/rhsoftware" className="hover:text-foreground transition-colors">RH Software</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/rhsoftware/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground/80 truncate max-w-[200px]">{post.category}</span>
          </nav>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/15 border border-foreground/20 text-foreground text-xs font-semibold mb-5 backdrop-blur-sm">
            <Tag className="w-3 h-3" />
            {post.category}
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {post.title}
          </motion.h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-foreground/70 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground/90">{post.author}</span>
              <span>·</span>
              <span>{post.authorRole}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-foreground/10 border border-foreground/15 text-foreground/70 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── ARTICLE BODY ─── */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-14">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">

          {/* Main content */}
          <article>

            {/* Excerpt / intro box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-md border border-primary/20 bg-primary/5 p-6 mb-10"
            >
              <p className="text-foreground/75 text-lg leading-relaxed">
                {post.content.intro}
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-10">
              {post.content.sections.map((section, i) => (
                <motion.section
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  <h2
                    className="text-xl md:text-2xl font-bold text-foreground mb-3"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {section.heading}
                  </h2>
                  <p className="text-foreground/65 leading-relaxed text-base">
                    {section.body}
                  </p>
                </motion.section>
              ))}
            </div>

            {/* Conclusion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-md border border-primary/20 bg-primary/5 p-6"
            >
              <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Conclusion
              </h3>
              <p className="text-foreground/70 leading-relaxed">{post.content.conclusion}</p>
            </motion.div>

            {/* CTA Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-8 rounded-md p-8 text-center"
              style={{ background: getGrad(post.grad) }}
            >
              <p className="text-foreground/80 text-sm mb-2 uppercase tracking-widest font-semibold">
                Ready to get started?
              </p>
              <h3
                className="text-2xl font-extrabold text-foreground mb-5"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {post.content.cta}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/rhsoftware/contact"
                  className="px-6 py-3 bg-foreground text-primary font-bold rounded-md hover:bg-primary transition-colors text-sm"
                >
                  Get Free Quote
                </Link>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-foreground font-bold rounded-md hover:bg-primary transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Now
                </a>
              </div>
            </motion.div>

            {/* FAQs */}
            {post.faqs?.length > 0 && (
              <div className="mt-12">
                <h2
                  className="text-2xl font-extrabold text-foreground mb-6"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  अक्सर पूछे जाने वाले सवाल (FAQs)
                </h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-md border border-foreground/[0.08] bg-foreground/[0.03] p-5"
                    >
                      <h3 className="font-bold text-foreground mb-2 text-sm">❓ {faq.q}</h3>
                      <p className="text-foreground/60 text-sm leading-relaxed">✅ {faq.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* City links — SEO internal linking */}
            {post.relatedCities && post.relatedCities.length > 0 && (
              <div className="mt-10 rounded-md border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                <p className="text-foreground/50 text-xs uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> We serve these cities
                </p>
                <div className="flex flex-wrap gap-2">
                  {CITY_LINKS.map(({ city, slug }) => (
                    <Link
                      key={slug}
                      to={`/bihar/${slug}/website-developer`}
                      className="px-3 py-1.5 rounded-full text-xs border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-foreground/40 text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share:
              </span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/30 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/30 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </article>

          {/* ─── SIDEBAR ─── */}
          <aside className="hidden lg:block space-y-6">

            {/* Quick CTA */}
            <div
              className="rounded-md p-6 text-foreground"
              style={{ background: getGrad(post.grad) }}
            >
              <h3 className="font-extrabold text-lg mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Free Consultation
              </h3>
              <p className="text-foreground/80 text-sm mb-4">
                Get expert advice for your project in Bihar. Response in 2 hours.
              </p>
              <Link
                to="/rhsoftware/contact"
                className="block text-center py-2.5 bg-foreground text-primary font-bold rounded-md text-sm hover:bg-primary transition-colors"
              >
                Get Free Quote →
              </Link>
            </div>

            {/* City services box */}
            <div className="rounded-md border border-foreground/[0.06] bg-foreground/[0.03] p-5">
              <h3 className="font-bold text-foreground text-sm mb-4">Services by City</h3>
              <div className="space-y-2">
                {CITY_LINKS.map(({ city, slug }) => (
                  <Link
                    key={slug}
                    to={`/bihar/${slug}/website-developer`}
                    className="flex items-center justify-between py-1.5 text-foreground/60 hover:text-primary text-xs transition-colors"
                  >
                    <span>Website Dev in {city}</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="rounded-md border border-foreground/[0.06] bg-foreground/[0.03] p-5">
                <h3 className="font-bold text-foreground text-sm mb-4">Related Posts</h3>
                <div className="space-y-3">
                  {related.map((rp) => (
                    <Link
                      key={rp.slug}
                      to={`/rhsoftware/blog/${rp.slug}`}
                      className="block group"
                    >
                      <div
                        className="h-1.5 rounded-full mb-2 w-8"
                        style={{ background: getGrad(rp.grad) }}
                      />
                      <p className="text-foreground/70 group-hover:text-foreground text-xs leading-snug transition-colors">
                        {rp.title}
                      </p>
                      <p className="text-foreground/30 text-[10px] mt-1">{rp.date} · {rp.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ─── RELATED POSTS (mobile + extra) ─── */}
      {related.length > 0 && (
        <section className="border-t border-foreground/[0.06] py-14 px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-xl font-extrabold text-foreground mb-8"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              More from {post.category}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((rp, i) => (
                <motion.div
                  key={rp.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/rhsoftware/blog/${rp.slug}`}
                    className="group block rounded-md border border-foreground/[0.06] bg-foreground/[0.03] overflow-hidden hover:border-primary/30 transition-all"
                  >
                    <div
                      className="h-20"
                      style={{ background: getGrad(rp.grad) }}
                    />
                    <div className="p-5">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                        {rp.category}
                      </span>
                      <h3 className="text-foreground group-hover:text-primary font-bold text-sm mt-1.5 leading-snug transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="text-foreground/40 text-xs mt-2">
                        {rp.date} · {rp.readTime}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Back to blog */}
            <div className="text-center mt-10">
              <Link
                to="/rhsoftware/blog"
                className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors text-sm font-semibold"
              >
                <ArrowLeft className="w-4 h-4" /> Back to all posts
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default RHBlogPostPage;
