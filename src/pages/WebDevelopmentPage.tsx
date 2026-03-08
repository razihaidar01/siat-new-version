import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Globe, Code, Palette, Rocket, ShieldCheck, Zap } from "lucide-react";

const faqs = [
  { q: "What types of websites does RH Software build?", a: "We build business websites, e-commerce stores, portfolio sites, educational platforms, government portals, and custom web applications." },
  { q: "How much does a website cost?", a: "Website pricing starts from ₹15,000 for basic sites. E-commerce and custom web apps range from ₹50,000–₹5,00,000+ depending on features." },
  { q: "How long does it take to build a website?", a: "A basic website takes 1–2 weeks. E-commerce sites take 3–4 weeks. Complex web applications can take 2–3 months." },
  { q: "Do you provide hosting and maintenance?", a: "Yes, we provide hosting, SSL certificates, domain management, and ongoing maintenance packages for all our clients." },
  { q: "Will my website be mobile-responsive?", a: "Absolutely. All our websites are fully responsive and optimized for mobile, tablet, and desktop devices." },
  { q: "Do you provide SEO services?", a: "Yes, every website we build includes basic on-page SEO. We also offer advanced SEO packages for better Google rankings." },
];

const services = [
  "Business & Corporate Websites",
  "E-commerce Development (Shopify, WooCommerce)",
  "Custom Web Application Development",
  "Educational & LMS Platforms",
  "Government & Institutional Portals",
  "Landing Pages & Lead Generation Sites",
  "Progressive Web Apps (PWA)",
  "API Integration & Backend Development",
  "Website Redesign & Migration",
  "SEO & Performance Optimization",
];

const technologies = ["React", "Next.js", "Node.js", "WordPress", "Shopify", "Python", "PostgreSQL", "AWS", "Firebase", "Tailwind CSS"];

const WebDevelopmentPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">RH Software</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Website Development Company <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            RH Software — Bihar's leading website development company. Professional, responsive, SEO-friendly websites for businesses, startups, and government organizations.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">"Apne business ko online le jaayein — professional website banwayein RH Software se!"</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Get a Quote</Link>
            <Link to="/rhsoftware/portfolio" className="btn-outline-glow">View Portfolio</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose <span className="gradient-text">RH Software?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: "SEO Optimized", desc: "Google pe rank karein — SEO-friendly website development" },
              { icon: Palette, title: "Modern Design", desc: "Premium UI/UX design — professional aur engaging" },
              { icon: Rocket, title: "Fast & Responsive", desc: "Lightning-fast websites — mobile-first approach" },
              { icon: ShieldCheck, title: "Secure & Reliable", desc: "SSL, security audits, aur 99.9% uptime guarantee" },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><item.icon className="w-6 h-6 text-primary" /></div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Our <span className="gradient-text">Services</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{s}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-black text-foreground mb-8">Technologies We <span className="gradient-text">Use</span></h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {technologies.map((t) => (
              <span key={t} className="px-5 py-2.5 rounded-full bg-primary/10 text-primary font-medium text-sm">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="glass-card p-6 group cursor-pointer">
                <summary className="font-display font-bold text-foreground list-none flex items-center justify-between">{faq.q}<span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span></summary>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Explore More</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/rh-software/portfolio" className="btn-outline-glow !py-3 !px-5 !text-sm">Our Portfolio</Link>
            <Link to="/rh-software/app-development-company-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">App Development</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebDevelopmentPage;
