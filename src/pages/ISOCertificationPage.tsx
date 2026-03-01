import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ShieldCheck, FileText, Clock, Award } from "lucide-react";

const faqs = [
  { q: "What is ISO Certification?", a: "ISO (International Organization for Standardization) certification proves your organization meets international quality management standards like ISO 9001:2015." },
  { q: "Why is ISO certification important?", a: "ISO certification builds trust, improves processes, enables government tender participation, and opens doors to national and international business opportunities." },
  { q: "How long does ISO certification take?", a: "The typical ISO certification process takes 2–4 weeks including documentation, audit, and certification issuance." },
  { q: "What documents are required for ISO certification?", a: "Business registration, PAN card, GST certificate, company profile, quality policy document, and organizational structure details." },
  { q: "How much does ISO certification cost?", a: "ISO certification costs vary based on organization size and type. Contact SIAT for competitive pricing and complete support." },
  { q: "Is ISO certification valid for government tenders?", a: "Yes, ISO certification is often mandatory or gives preference in government tenders and MSME registrations." },
];

const benefits = [
  "International quality recognition",
  "Government tender eligibility",
  "Improved business credibility",
  "Better process management",
  "Customer trust & satisfaction",
  "Competitive market advantage",
  "Export business opportunities",
  "MSME scheme benefits access",
];

const ISOCertificationPage = () => {
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
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Consultancy Services</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            ISO Certification <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Get ISO 9001:2015 certification in Bihar with SIAT Consultancy. Complete documentation, audit support, and certification — fast, affordable, and hassle-free.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">"ISO certification se apne business ko international level par le jaayein!"</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Apply Now</Link>
            <Link to="/consultancy-services/msme-registration" className="btn-outline-glow">MSME Registration</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose <span className="gradient-text">SIAT for ISO?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Certified Process", desc: "Accredited ISO certification with full compliance" },
              { icon: FileText, title: "Complete Documentation", desc: "We handle all paperwork and quality manuals" },
              { icon: Clock, title: "Fast Processing", desc: "Get certified in 2–4 weeks" },
              { icon: Award, title: "Government Ready", desc: "Valid for tenders, MSME, and business growth" },
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
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Benefits of <span className="gradient-text">ISO Certification</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b) => (<div key={b} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{b}</span></div>))}
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
            <Link to="/consultancy-services/msme-registration" className="btn-outline-glow !py-3 !px-5 !text-sm">MSME Registration</Link>
            <Link to="/government-projects" className="btn-outline-glow !py-3 !px-5 !text-sm">Government Projects</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ISOCertificationPage;
