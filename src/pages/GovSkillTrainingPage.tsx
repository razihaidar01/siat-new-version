import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Landmark, ShieldCheck, Users, Building2 } from "lucide-react";

const faqs = [
  { q: "What government skill training programs does SIAT run?", a: "SIAT implements PMKVY, Skill India, MSME, and state government skill development programs in Bihar." },
  { q: "Is SIAT registered with the government?", a: "Yes, SIAT is registered with MSME, Skill India, and is an empaneled training partner for government skill development programs." },
  { q: "What sectors does SIAT provide government training in?", a: "Electronics, IT/ITeS, construction, beauty & wellness, healthcare, retail, and hospitality sectors." },
  { q: "How can organizations partner with SIAT for government projects?", a: "Contact us with your project requirements. We have infrastructure, certified trainers, and compliance documentation ready for partnerships." },
  { q: "Does SIAT have ISO certification for government projects?", a: "Yes, SIAT holds ISO 9001:2015 certification which is essential for government project participation." },
  { q: "What is SIAT's infrastructure capacity?", a: "SIAT has fully equipped labs, smart classrooms, computer labs, and practical training facilities that meet government project standards." },
];

const capabilities = [
  "PMKVY Training Center",
  "Skill India Registered Partner",
  "MSME Certified Organization",
  "ISO 9001:2015 Certified",
  "Fully Equipped Training Labs",
  "Certified Trainers & Assessors",
  "Placement Cell & Industry Linkage",
  "Digital Infrastructure & Smart Classes",
  "Compliance & Documentation Ready",
  "Multi-Sector Training Capability",
];

const GovSkillTrainingPage = () => {
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
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Government Skill Training <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            SIAT — Bihar's trusted government skill training partner. PMKVY, Skill India, MSME projects with proven infrastructure, certified trainers, and compliance.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">"Sarkar ka bharosemand partner — skill training aur project delivery mein!"</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Partner With Us</Link>
            <Link to="/government-projects/capability-statement" className="btn-outline-glow">Capability Statement</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose <span className="gradient-text">SIAT?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Landmark, title: "Government Approved", desc: "Registered with MSME, Skill India, PMKVY" },
              { icon: ShieldCheck, title: "ISO Certified", desc: "ISO 9001:2015 — quality assured training" },
              { icon: Users, title: "10K+ Trained", desc: "Proven track record of skill development" },
              { icon: Building2, title: "Modern Infrastructure", desc: "Fully equipped labs & smart classrooms" },
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
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Our <span className="gradient-text">Capabilities</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((c) => (<div key={c} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{c}</span></div>))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
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

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/certifications" className="btn-outline-glow !py-3 !px-5 !text-sm">Certifications</Link>
            <Link to="/infrastructure" className="btn-outline-glow !py-3 !px-5 !text-sm">Infrastructure</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default GovSkillTrainingPage;
