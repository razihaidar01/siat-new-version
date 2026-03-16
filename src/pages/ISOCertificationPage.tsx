import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ShieldCheck, FileText, Clock, Award, Star, Building2, Globe } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const iafCertifications = [
  { code: "ISO 9001:2015", name: "Quality Management System", desc: "Most popular — mandatory for most government tenders & business credibility." },
  { code: "ISO 14001:2015", name: "Environmental Management System", desc: "For organizations committed to environmental responsibility." },
  { code: "ISO 45001:2018", name: "Occupational Health & Safety", desc: "Workplace safety management — required by many industries." },
  { code: "ISO 27001:2022", name: "Information Security Management", desc: "For IT companies, software firms & data-handling organizations." },
  { code: "ISO 22000:2018", name: "Food Safety Management", desc: "For food manufacturers, restaurants, and food supply chains." },
  { code: "ISO 13485:2016", name: "Medical Devices Quality", desc: "For medical device manufacturers and healthcare suppliers." },
  { code: "ISO 50001:2018", name: "Energy Management System", desc: "For energy-intensive industries to optimize energy use." },
  { code: "ISO 20000-1:2018", name: "IT Service Management", desc: "For IT service providers and software companies." },
];

const nonIafCertifications = [
  { code: "CE Marking", name: "European Conformity", desc: "Required for products sold in European markets." },
  { code: "GMP Certification", name: "Good Manufacturing Practice", desc: "For pharmaceutical, food & cosmetic manufacturers." },
  { code: "HACCP", name: "Hazard Analysis Critical Control", desc: "Food safety system for processing & manufacturing units." },
  { code: "SA 8000", name: "Social Accountability", desc: "Ethical workplace standards certification." },
  { code: "ISO/IEC 17025", name: "Testing & Calibration Labs", desc: "For laboratories requiring accreditation." },
  { code: "FSSC 22000", name: "Food Safety System Certification", desc: "Advanced food safety for large food producers." },
];

const process = [
  { step: "01", title: "Free Consultation", desc: "Contact SIAT — we assess your organization and recommend the right ISO standard." },
  { step: "02", title: "Documentation", desc: "We prepare all required quality manuals, procedures, and policy documents for you." },
  { step: "03", title: "Gap Analysis", desc: "We identify gaps in your current processes and help implement improvements." },
  { step: "04", title: "Internal Audit", desc: "Pre-certification audit to ensure full compliance before the official audit." },
  { step: "05", title: "Certification Audit", desc: "Official audit by accredited certification body — we support you throughout." },
  { step: "06", title: "Certificate Issued", desc: "Receive your ISO certificate valid for 3 years with annual surveillance audits." },
];

const faqs = [
  { q: "What is the difference between IAF and non-IAF ISO certification?", a: "IAF (International Accreditation Forum) certified ISO is internationally recognized and accepted worldwide. Non-IAF ISO is still valid for many domestic purposes but may not be accepted for international business or some government tenders. SIAT provides both — we guide you on which is best for your needs." },
  { q: "Which ISO certificate is best for government tenders in Bihar?", a: "ISO 9001:2015 is the most commonly required for government tenders. For specific projects, ISO 14001 (environment) or ISO 45001 (safety) may also be required. SIAT helps you get the exact certification needed for your tender." },
  { q: "How long does ISO certification take?", a: "Typically 2–4 weeks for the complete process including documentation, audit, and certificate issuance. SIAT's experienced team ensures the fastest possible turnaround." },
  { q: "Can a small business or startup get ISO certification?", a: "Yes! ISO certification is available for businesses of all sizes — from small shops to large corporations. SIAT specializes in helping small and medium businesses in Bihar get certified affordably." },
  { q: "Is ISO certification valid for MSME registration?", a: "Yes, ISO 9001:2015 certification significantly strengthens your MSME profile and is beneficial for MSME schemes, government subsidies, and tender eligibility." },
  { q: "What documents are needed for ISO certification?", a: "Business registration certificate, PAN card, GST certificate, company profile, list of employees, and basic quality policy. SIAT helps prepare all documentation from scratch." },
  { q: "How much does ISO certification cost in Bihar?", a: "Cost depends on the type of ISO, organization size, and certification body. SIAT offers the most competitive pricing in Bihar with complete end-to-end support. Contact us for a free quote." },
  { q: "Can I get multiple ISO certifications?", a: "Yes, many organizations get integrated management systems combining ISO 9001 + ISO 14001 + ISO 45001 together. SIAT provides bundled certification packages at discounted rates." },
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
      <SEOHead
        title="ISO Certification in Bihar — All Types IAF & Non-IAF | SIAT"
        description="Get ISO 9001, ISO 14001, ISO 45001, ISO 27001 and all types of ISO certification in Bihar. Both IAF and non-IAF accredited. Fast, affordable ISO certification in Saharsa, Bihar by SIAT Consultancy."
        canonical="https://www.siat.in/consultancy-services/iso-certification-bihar"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Consultancy Services</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            ISO Certification <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
            Get <strong>any ISO certification</strong> — IAF accredited & non-IAF both available. ISO 9001, ISO 14001, ISO 45001, ISO 27001, ISO 22000 and more. Fast processing, complete documentation support, lowest price in Bihar.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">"Har tarah ki ISO certification — ek jagah se, SIAT ke saath!"</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Get Free Consultation</Link>
            <Link to="/consultancy-services/msme-registration" className="btn-outline-glow">MSME Registration</Link>
          </div>
        </div>
      </section>

      {/* IAF vs Non-IAF Banner */}
      <section className="py-8 bg-primary">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6 text-white text-center">
          <div className="flex items-center justify-center gap-3">
            <Globe className="w-8 h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="font-display font-black text-lg">IAF Accredited ISO</div>
              <div className="text-white/80 text-sm">Internationally recognized — valid worldwide & all government tenders</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Building2 className="w-8 h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="font-display font-black text-lg">Non-IAF ISO</div>
              <div className="text-white/80 text-sm">Valid for domestic business, MSME, and local tenders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SIAT */}
      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose <span className="gradient-text">SIAT for ISO?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "IAF & Non-IAF Both", desc: "We provide both internationally accredited and non-IAF certifications based on your requirement" },
              { icon: FileText, title: "Complete Documentation", desc: "We handle all paperwork, quality manuals, and policy documents from scratch" },
              { icon: Clock, title: "Fast 2–4 Weeks", desc: "Quick processing with experienced consultants guiding you at every step" },
              { icon: Award, title: "All Industries", desc: "Manufacturing, IT, food, healthcare, education, construction — we cover all sectors" },
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

      {/* IAF Certifications */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Globe className="w-4 h-4" /> IAF Accredited Certifications
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
              Internationally <span className="gradient-text">Recognized ISO</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Valid for international business, export, and all government tenders across India</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {iafCertifications.map((cert, i) => (
              <motion.div key={cert.code} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }} className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-primary font-display font-black text-sm">{cert.code}</span>
                </div>
                <h3 className="font-display font-bold text-foreground text-sm mb-2">{cert.name}</h3>
                <p className="text-xs text-muted-foreground">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-IAF Certifications */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4" /> Non-IAF Certifications
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
              Specialized <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Industry-specific certifications for domestic business growth and compliance</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {nonIafCertifications.map((cert, i) => (
              <motion.div key={cert.code} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }} className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-accent font-display font-black text-sm">{cert.code}</span>
                </div>
                <h3 className="font-display font-bold text-foreground text-sm mb-2">{cert.name}</h3>
                <p className="text-xs text-muted-foreground">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
            Our <span className="gradient-text">Certification Process</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card p-6">
                <div className="text-4xl font-display font-black text-primary/20 mb-3">{p.step}</div>
                <h3 className="font-display font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="glass-card p-6 group cursor-pointer">
                <summary className="font-display font-bold text-foreground list-none flex items-center justify-between">{faq.q}<span className="text-primary group-open:rotate-45 transition-transform text-xl flex-shrink-0 ml-4">+</span></summary>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-black text-foreground mb-4">Ready to Get <span className="gradient-text">ISO Certified?</span></h2>
          <p className="text-muted-foreground mb-8">Contact SIAT today for a free consultation. We'll help you choose the right ISO certification for your business and handle the entire process.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Get Free Consultation</Link>
            <Link to="/consultancy-services/msme-registration" className="btn-outline-glow">MSME Registration</Link>
            <Link to="/government-projects" className="btn-outline-glow">Government Projects</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ISOCertificationPage;