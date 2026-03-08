import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Camera, Award, Briefcase, Wifi, Shield } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const faqs = [
  { q: "What is the duration of the CCTV Installation course?", a: "The course is 2–3 months covering analog, IP cameras, DVR/NVR configuration, and networking." },
  { q: "Do I need any prior experience?", a: "No prior experience required. We teach from basics including networking, cable management, and system configuration." },
  { q: "What types of CCTV systems are covered?", a: "Analog cameras, IP cameras, PTZ cameras, DVR/NVR systems, PoE switches, and cloud-based surveillance solutions." },
  { q: "What is the earning potential?", a: "CCTV technicians earn ₹15,000–₹30,000 in employment. Independent installers can earn ₹40,000+ per month with regular projects." },
  { q: "Is placement support available?", a: "Yes, SIAT connects graduates with security companies, IT firms, and government projects requiring CCTV installation." },
  { q: "Can I start my own CCTV business?", a: "Absolutely! Many of our graduates run successful CCTV installation businesses. We provide business setup guidance as part of the course." },
];

const curriculum = [
  "CCTV system fundamentals & types",
  "Analog vs IP camera technology",
  "DVR & NVR configuration",
  "Network cable crimping & management",
  "PoE switch & network setup",
  "PTZ camera installation & programming",
  "Remote viewing & mobile app setup",
  "Cloud-based surveillance systems",
  "Troubleshooting & maintenance",
  "Site survey & project estimation",
];

const CCTVInstallationPage = () => {
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
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            CCTV Installation Training <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Professional CCTV installation and surveillance training at SIAT, Saharsa. Learn IP cameras, DVR/NVR setup, networking — become a certified CCTV technician.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">"CCTV expert banein — har ghar, office, aur dukaan mein demand hai!"</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Enroll Now</Link>
            <Link to="/training-institute/course-fees" className="btn-outline-glow">View Fees</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose SIAT for <span className="gradient-text">CCTV Training?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Camera, title: "Live Installation", desc: "Practice on real CCTV systems and equipment" },
              { icon: Wifi, title: "IP & Networking", desc: "Learn IP cameras, PoE, and network configuration" },
              { icon: Award, title: "ISO Certified", desc: "QR-verified certificate for professional credibility" },
              { icon: Shield, title: "Security Expert", desc: "Complete surveillance system design & deployment" },
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
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Course <span className="gradient-text">Curriculum</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {curriculum.map((item) => (
              <div key={item} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{item}</span></div>
            ))}
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
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Explore More</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/training-institute/placement-support" className="btn-outline-glow !py-3 !px-5 !text-sm">Placement Support</Link>
            <Link to="/verify-certificate" className="btn-outline-glow !py-3 !px-5 !text-sm">Verify Certificate</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CCTVInstallationPage;
