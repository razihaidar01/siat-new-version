import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Wind, Award, Users, Briefcase, Thermometer, Wrench, Zap } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const faqs = [
  { q: "What is the duration of the AC Repairing Course?", a: "The course is available in 3-month (basic) and 6-month (advanced) formats covering split AC, window AC, and inverter technology." },
  { q: "Do I need any prior technical knowledge?", a: "No prior experience is needed. We start from basics — electrical fundamentals, refrigeration cycle, and gradually move to advanced diagnostics." },
  { q: "What types of AC systems are covered?", a: "We cover Split AC, Window AC, Cassette AC, Tower AC, Inverter AC technology, and VRF/VRV systems for commercial applications." },
  { q: "Is there placement support after the course?", a: "Yes, SIAT provides dedicated placement support connecting graduates with AC service companies, dealers, and maintenance firms across Bihar and India." },
  { q: "What certification will I receive?", a: "You will receive an ISO-verified certificate with QR code verification that employers and clients can authenticate online." },
  { q: "Can I start my own AC service business?", a: "Absolutely! Many graduates start their own AC installation and servicing business within months. We also provide business setup guidance." },
  { q: "What is the earning potential after this course?", a: "AC technicians in Bihar earn ₹15,000–₹35,000 per month in employment. Self-employed technicians can earn ₹40,000+ during peak summer season." },
  { q: "What tools and equipment are provided during training?", a: "All tools including manifold gauges, vacuum pump, flaring tools, brazing equipment, and digital multimeters are provided during training." },
];

const curriculum = [
  "Electrical fundamentals & safety",
  "Refrigeration cycle & thermodynamics",
  "Split AC installation & commissioning",
  "Window AC servicing & repair",
  "Inverter AC technology & troubleshooting",
  "Gas charging (R22, R32, R410A)",
  "PCB board repair & replacement",
  "Compressor testing & replacement",
  "Copper pipe brazing & flaring",
  "VRF/VRV commercial systems",
  "Preventive maintenance procedures",
  "Business setup & customer management",
];

const ACRepairingPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            AC Repairing Course <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Bihar's most comprehensive AC repairing and installation training program. Learn split AC, window AC, inverter technology with hands-on practical training at SIAT, Saharsa.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">
            "AC technician banein — Bihar mein demand bahut hai, kamai bhi shandar!"
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Enroll Now</Link>
            <Link to="/training-institute/course-fees" className="btn-outline-glow">View Fees</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
            Why Choose SIAT for <span className="gradient-text">AC Repairing?</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wind, title: "Real AC Units", desc: "Practice on actual split and window AC units in our lab" },
              { icon: Award, title: "ISO Certified", desc: "QR-verified certificate recognized across India" },
              { icon: Thermometer, title: "All AC Types", desc: "Split, window, cassette, inverter — complete coverage" },
              { icon: Briefcase, title: "High Demand", desc: "AC technicians earn ₹25,000–₹40,000+ per month" },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
            Course <span className="gradient-text">Curriculum</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {curriculum.map((item) => (
              <div key={item} className="flex items-center gap-3 glass-card p-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-6">
            Career Scope: <span className="gradient-text">AC Technician in Bihar</span>
          </h2>
          <div className="glass-card p-8 md:p-10 space-y-4 text-muted-foreground leading-relaxed">
            <p>Bihar mein AC ki demand har saal badh rahi hai. Ghar ho ya office, hospital ho ya showroom — AC installation aur maintenance ki zaroorat har jagah hai. Trained AC technicians ki bahut kami hai Bihar mein, isliye yeh ek high-demand, high-earning career hai.</p>
            <p>SIAT ka AC Repairing Course aapko industry-ready banaata hai. Hamare graduates Bihar ke alawa Delhi, Mumbai, Bangalore, aur Gulf countries mein bhi successfully kaam kar rahe hain. Course complete karne ke baad aap employment le sakte hain ya apna khud ka AC service business start kar sakte hain.</p>
            <p>Summer season mein AC technicians ki demand 3x badh jaati hai, aur experienced technicians ₹40,000 se zyada monthly kama rahe hain. SIAT ki practical training aur placement support ke saath, aapka career guaranteed hai.</p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="glass-card p-6 group cursor-pointer">
                <summary className="font-display font-bold text-foreground list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
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
            <Link to="/training-institute/placement-support" className="btn-outline-glow !py-3 !px-5 !text-sm">Placement Support</Link>
            <Link to="/training-institute/student-testimonials" className="btn-outline-glow !py-3 !px-5 !text-sm">Student Testimonials</Link>
            <Link to="/verify-certificate" className="btn-outline-glow !py-3 !px-5 !text-sm">Verify Certificate</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ACRepairingPage;
