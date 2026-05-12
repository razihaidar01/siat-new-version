import SEOHead from "@/components/SEOHead";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, GraduationCap, FileText, Users, Award } from "lucide-react";

const faqs = [
  { q: "What is the eligibility for MBBS admission in Bihar?", a: "Candidates must have passed 12th with Physics, Chemistry, Biology (PCB) with minimum 50% marks and a valid NEET score." },
  { q: "How does SIAT help with MBBS admission?", a: "We provide complete counseling — NEET guidance, college selection, documentation, Bihar Student Credit Card support, and admission process management." },
  { q: "What is the MBBS fee structure in Bihar?", a: "Government medical colleges charge ₹5,000–₹50,000/year. Private colleges range from ₹5,00,000–₹25,00,000/year depending on the institution." },
  { q: "Can I get MBBS admission through Bihar Student Credit Card?", a: "Yes, Bihar Student Credit Card provides up to ₹4 lakh for education. SIAT helps with the complete application process." },
  { q: "Which are the best medical colleges in Bihar?", a: "Top colleges include PMCH Patna, NMCH Patna, DMCH Darbhanga, ANMMCH Gaya, and several private medical colleges." },
  { q: "What documents are required for MBBS admission?", a: "NEET scorecard, 10th & 12th marksheets, caste certificate, domicile certificate, Aadhar card, passport photos, and category certificates if applicable." },
  { q: "Is there a management quota for MBBS?", a: "Private medical colleges have management quota seats. SIAT can guide you through the process and documentation." },
  { q: "When does the MBBS admission process start?", a: "NEET exams are usually in May. Counseling starts in August-September. Contact SIAT early for the best guidance." },
];

const services = [
  "NEET preparation guidance",
  "College selection & comparison",
  "Admission counseling process",
  "Documentation & verification",
  "Bihar Student Credit Card support",
  "Government & private college admissions",
  "Fee structure analysis",
  "Hostel & accommodation assistance",
  "Post-admission support",
  "Career counseling for medical students",
];

const MBBSAdmissionPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <SEOHead
        title="MBBS Admission in Bihar 2025 | Best Medical College Guidance | SIAT"
        description="Get expert MBBS admission guidance in Bihar. SIAT helps with NEET counseling, best medical college selection, Bihar Student Credit Card for MBBS, documentation. PMCH, NMCH, DMCH admissions."
        canonical="https://www.siat.in/consultancy-services/mbbs-admission-bihar"
        keywords="MBBS admission bihar, NEET counseling bihar, best medical college bihar, MBBS fee bihar, PMCH admission, Bihar Student Credit Card MBBS, medical college saharsa, MBBS guidance patna"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Consultancy Services</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            MBBS Admission <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Complete MBBS admission guidance in Bihar — NEET counseling, college selection, documentation, and Bihar Student Credit Card support from SIAT Consultancy.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">"Doctor banna hai? SIAT se paayein complete admission guidance — NEET se admission tak!"</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Get Counseling</Link>
            <Link to="/consultancy-services/best-college-in-bihar" className="btn-outline-glow">Best Colleges</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose <span className="gradient-text">SIAT for MBBS Admission?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Expert Counselors", desc: "Experienced team guiding 500+ students annually" },
              { icon: FileText, title: "Complete Process", desc: "NEET to admission — every step managed" },
              { icon: Users, title: "College Network", desc: "Partnerships with top Bihar medical colleges" },
              { icon: Award, title: "Proven Results", desc: "95% success rate in admission counseling" },
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
            {services.map((s) => (<div key={s} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{s}</span></div>))}
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
            <Link to="/consultancy-services/btech-admission-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">B.Tech Admission</Link>
            <Link to="/consultancy-services/iso-certification-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">ISO Certification</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MBBSAdmissionPage;
