import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, FileCheck, Users, Award, Shield, Landmark, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const projects = [
  { icon: Users, title: "Government Skill Training", desc: "Bihar sarkar ke saath partnership mein skill development programs.", href: "/government-projects/government-skill-training-bihar" },
  { icon: Award, title: "PMKVY Training Center", desc: "Pradhan Mantri Kaushal Vikas Yojana ka registered training center.", href: "/government-projects/pmkvy-training-center-bihar" },
  { icon: Building2, title: "MSME Education Tender", desc: "MSME sector mein education tender participation aur compliance.", href: "/government-projects/msme-education-tender" },
  { icon: Shield, title: "Skill India Training Partner", desc: "Skill India mission ka registered training partner.", href: "/government-projects/skill-india-training-partner" },
  { icon: Landmark, title: "CSR Education Projects", desc: "Corporate Social Responsibility ke through education initiatives.", href: "/government-projects/csr-education-projects" },
];

const faqs = [
  { q: "SIAT government projects mein kaise kaam karta hai?", a: "SIAT Bihar government, Skill India Mission, aur PMKVY ke saath registered training partner hai. Hum government-funded skill development programs run karte hain." },
  { q: "Kya SIAT empanelled hai?", a: "Haan, SIAT multiple government bodies ke saath empanelled hai — details hamare Empanelment page par available hain." },
  { q: "CSR projects ke liye kaise partner karein?", a: "Companies SIAT ke saath CSR education projects ke liye partner kar sakti hain. Humse contact karein proposal ke liye." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const GovernmentProjectsPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <SEOHead title="Government Skill Training Projects – SIAT Bihar" description="SIAT is Bihar's trusted government skill training partner. PMKVY, Skill India, CSR projects with proven track record." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Government Skill Training & <span className="gradient-text">Project Implementation</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            SIAT Bihar sarkar ka bharosemand skill training aur project implementation partner hai. PMKVY, Skill India aur CSR projects mein proven track record.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Partner With Us</Link>
            <Link to="/government-projects/capability-statement" className="btn-outline-glow">Capability Statement</Link>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Our <span className="gradient-text">Government Initiatives</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Link to={p.href} className="block glass-card-hover p-6 h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><p.icon className="w-6 h-6 text-primary" /></div>
                  <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                  <span className="text-xs text-primary font-medium flex items-center gap-1">Details <ArrowRight className="w-3 h-3" /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">SIAT — Bihar Sarkar Ka Bharosemand Partner</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>SIAT 10+ saalon se Bihar mein government skill development programs successfully implement kar raha hai. Hamare paas experienced team, modern infrastructure aur proven methodology hai jo government projects ko time par aur quality ke saath deliver karti hai.</p>
            <p>Hum PMKVY (Pradhan Mantri Kaushal Vikas Yojana), Skill India Mission, aur various state government schemes ke under training programs conduct karte hain. Hamare training centers mein hazaron candidates ko successfully trained aur certified kiya gaya hai.</p>
            <p>Companies aur organizations jo CSR (Corporate Social Responsibility) ke through education aur skill development mein invest karna chahti hain, wo SIAT ke saath partner kar sakti hain. Hum end-to-end project management — planning se execution tak — handle karte hain.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/government-projects/empanelment" className="btn-outline-glow !py-3 !px-5 !text-sm">Empanelment Details</Link>
            <Link to="/government-projects/capability-statement" className="btn-outline-glow !py-3 !px-5 !text-sm">Capability Statement</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
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
    </>
  );
};

export default GovernmentProjectsPage;
