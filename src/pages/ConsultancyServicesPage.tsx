import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, FileCheck, Building, Stethoscope, BookOpen, Award, Users, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const services = [
  { icon: Stethoscope, title: "MBBS Admission", desc: "Top medical colleges mein admission guidance — India aur abroad dono options available.", href: "/consultancy-services/mbbs-admission-bihar" },
  { icon: GraduationCap, title: "B.Tech Admission", desc: "Bihar ke best engineering colleges mein admission support aur counseling.", href: "/consultancy-services/btech-admission-bihar" },
  { icon: BookOpen, title: "BCA College Admission", desc: "Computer application mein career banayein — best BCA colleges ki guidance.", href: "/consultancy-services/bca-college-bihar" },
  { icon: Building, title: "Nursing College Admission", desc: "Bihar ke top nursing colleges mein admission — ANM, GNM, B.Sc Nursing.", href: "/consultancy-services/nursing-college-bihar" },
  { icon: FileCheck, title: "ISO Certification", desc: "ISO 9001, 14001, 45001 certification — business credibility badhayein.", href: "/consultancy-services/iso-certification-bihar" },
  { icon: Award, title: "MSME Registration", desc: "MSME/Udyam registration se government benefits aur tender eligibility paayein.", href: "/consultancy-services/msme-registration" },
];

const faqs = [
  { q: "SIAT Consultancy kya services deta hai?", a: "SIAT education consultancy (MBBS, B.Tech, BCA, Nursing admissions), ISO certification, MSME registration, aur career guidance services provide karta hai." },
  { q: "Kya abroad MBBS admission mein madad milti hai?", a: "Haan, SIAT Russia, Ukraine, Philippines, Kyrgyzstan aur other countries mein MBBS admission guidance deta hai — NMC/MCI approved colleges mein." },
  { q: "ISO certification kitne time mein milta hai?", a: "ISO certification process typically 2-4 weeks mein complete ho jaata hai, documentation readiness par depend karta hai." },
  { q: "Consultancy fees kitni hai?", a: "Fees service ke type par depend karti hai. Humse contact karein free consultation ke liye." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const ConsultancyServicesPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <SEOHead title="Education & Business Consultancy Services – SIAT Bihar" description="SIAT consultancy provides education admission guidance, ISO certification, MSME registration, and career counseling in Bihar." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">SIAT Consultancy</span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Education & Business <span className="gradient-text">Consultancy Services</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Education admission guidance, ISO certification, MSME registration aur career counseling — SIAT Consultancy ke saath apne goals achieve karein.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Free Consultation</Link>
            <Link to="/consultancy-services/mbbs-admission-bihar" className="btn-outline-glow">MBBS Admission</Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Our <span className="gradient-text">Services</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Link to={s.href} className="block glass-card-hover p-6 h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                  <span className="text-xs text-primary font-medium flex items-center gap-1">Learn More <ArrowRight className="w-3 h-3" /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission After 12th CTA */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-black text-foreground mb-4">12th Ke Baad <span className="gradient-text">Kya Karein?</span></h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">12th pass karne ke baad sahi career path choose karna bahut zaroori hai. SIAT aapko best options dikhata hai — medical, engineering, BCA, nursing, ya skill-based courses.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/consultancy-services/admission-after-12th-bihar" className="btn-primary-glow !py-3 !px-5">Admission After 12th</Link>
            <Link to="/consultancy-services/bihar-student-credit-card-admission" className="btn-outline-glow !py-3 !px-5">Student Credit Card</Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">SIAT Consultancy — Bihar Ka Trusted Education & Business Consultant</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>SIAT Consultancy Bihar mein education admission aur business compliance services ka trusted name hai. Hum students ko unke dream college mein admission dilane mein madad karte hain — chahein MBBS ho, B.Tech ho, BCA ho ya Nursing.</p>
            <p>Business owners ke liye hum ISO certification, MSME/Udyam registration, aur other compliance services provide karte hain jo business credibility aur government tender eligibility badhati hain.</p>
            <p>Hamare experienced counselors har student aur business owner ko personalized guidance dete hain. Hum sirf admission ya registration nahi karwate — pura process samjhate hain aur har step par support dete hain.</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
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
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/consultancy-services/best-college-in-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">Best Colleges</Link>
            <Link to="/consultancy-services/iso-certification-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">ISO Certification</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConsultancyServicesPage;
