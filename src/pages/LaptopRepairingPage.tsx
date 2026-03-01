import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Laptop, Award, Users, Briefcase, Cpu, HardDrive, Monitor } from "lucide-react";

const faqs = [
  { q: "What is the duration of the Laptop Repairing Course?", a: "The course is available in 4-month (basic) and 6-month (advanced) formats covering hardware, software, and chip-level repair." },
  { q: "Do I need prior computer knowledge?", a: "Basic computer knowledge is helpful but not mandatory. We teach everything from fundamentals to advanced chip-level repairs." },
  { q: "What brands of laptops are covered?", a: "We cover all major brands — HP, Dell, Lenovo, Asus, Acer, Apple MacBook, and more. Training includes both Windows and macOS systems." },
  { q: "Is chip-level repair covered in this course?", a: "Yes, our advanced module includes BGA rework, SMD soldering, motherboard troubleshooting, and chip-level component replacement." },
  { q: "What is the earning potential?", a: "Laptop repair technicians earn ₹18,000–₹40,000 per month. Experienced professionals or business owners can earn ₹50,000+ monthly." },
  { q: "Will I get placement after the course?", a: "Yes, SIAT provides placement support connecting graduates with service centers, IT companies, and repair businesses across India." },
];

const curriculum = [
  "Laptop hardware identification & disassembly",
  "Motherboard component analysis",
  "BGA rework & SMD soldering",
  "Power section troubleshooting",
  "Display & backlight repair",
  "Keyboard & trackpad replacement",
  "Hard drive & SSD data recovery",
  "OS installation (Windows, Linux, macOS)",
  "BIOS programming & password reset",
  "Virus removal & system optimization",
  "Networking & WiFi troubleshooting",
  "Business setup & pricing strategy",
];

const LaptopRepairingPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Laptop Repairing Institute <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Bihar's best laptop repairing course — hardware, software, and chip-level repair training with placement support and QR-verified certification at SIAT, Saharsa.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">"Laptop repair ka expert banein — high-demand skill, high-income career!"</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Enroll Now</Link>
            <Link to="/training-institute/course-fees" className="btn-outline-glow">View Fees</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose SIAT for <span className="gradient-text">Laptop Repairing?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Laptop, title: "Hands-On Training", desc: "Practice on real laptops — HP, Dell, Lenovo, MacBook" },
              { icon: Cpu, title: "Chip-Level Repair", desc: "BGA rework, SMD soldering, motherboard diagnostics" },
              { icon: Award, title: "ISO Certified", desc: "QR-verified certificate recognized by employers" },
              { icon: Briefcase, title: "Placement Support", desc: "Job assistance at service centers & IT companies" },
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

export default LaptopRepairingPage;
