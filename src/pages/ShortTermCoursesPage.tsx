import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Zap, Award, Briefcase, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const courses = [
  { title: "Basic Mobile Repair", duration: "1 Month", desc: "Screen replacement, battery change, software issues — basic repairs seekhein." },
  { title: "Basic AC Service", duration: "1 Month", desc: "AC gas refilling, basic servicing aur cleaning ka practical training." },
  { title: "Computer Basics + Tally", duration: "2 Months", desc: "MS Office, internet, email aur Tally accounting software seekhein." },
  { title: "CCTV Installation", duration: "1 Month", desc: "CCTV camera fitting, wiring, DVR/NVR configuration ka complete course." },
  { title: "Electrical Wiring", duration: "1 Month", desc: "Domestic aur commercial electrical wiring, safety practices seekhein." },
  { title: "Solar Panel Installation", duration: "1 Month", desc: "Solar panel fitting, inverter connection aur maintenance training." },
];

const faqs = [
  { q: "Short-term courses ki duration kitni hoti hai?", a: "Short-term courses 1 se 3 mahine ke hote hain, depending on the course type." },
  { q: "Kya short-term courses mein bhi certificate milta hai?", a: "Haan, har course ke completion par ISO-verified certificate diya jaata hai." },
  { q: "In courses ke baad job mil sakti hai?", a: "Bilkul! Short-term courses specifically job-oriented hain. Placement support bhi milta hai." },
  { q: "Fees kitni hai short-term courses ki?", a: "Short-term course fees ₹3,000 se ₹15,000 ke beech hoti hai, course ke hisaab se." },
];

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const ShortTermCoursesPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <SEOHead title="Short Term Job Courses in Bihar – SIAT" description="Quick 1-6 month job-oriented courses in Bihar. Mobile repairing, AC repairing, laptop repair & CCTV training at SIAT Saharsa." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Short Term Job Courses <span className="gradient-text">in Bihar</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Kam samay mein job-ready banein! SIAT ke short-term skill courses se 1-3 mahine mein apna career start karein. Practical training, certificate, aur placement support.
          </motion.p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Enroll Now</Link>
            <Link to="/training-institute/course-fees" className="btn-outline-glow">View Fees</Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ icon: Clock, v: "1-3 Months", l: "Course Duration" }, { icon: Zap, v: "100%", l: "Practical Training" }, { icon: Award, v: "ISO Certified", l: "Certificate" }, { icon: Briefcase, v: "95%", l: "Placement Rate" }].map((s) => (
            <div key={s.l}><s.icon className="w-8 h-8 text-primary mx-auto mb-2" /><div className="text-xl font-display font-bold text-foreground">{s.v}</div><div className="text-sm text-muted-foreground">{s.l}</div></div>
          ))}
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Available <span className="gradient-text">Short-Term Courses</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card-hover p-6">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{c.duration}</span>
                <h3 className="font-display font-bold text-foreground mt-3 mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Short-Term Courses — Jaldi Seekhein, Jaldi Kamayein</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Agar aapke paas lambe courses karne ka time nahi hai, toh SIAT ke short-term job courses aapke liye perfect hain. Ye courses 1 se 3 mahine mein complete hote hain aur aapko directly employable skills dete hain.</p>
            <p>Har course mein 80% practical training hoti hai — aap real equipment par kaam karte hain, real problems solve karte hain. Course complete hone par ISO-verified certificate milta hai aur hamare placement cell se job dhundhne mein madad milti hai.</p>
            <p>10th pass, 12th pass, ya graduate — koi bhi in courses mein admission le sakta hai. Koi age limit nahi hai. Flexible batch timings available hain — morning, afternoon, aur evening batches.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">FAQs</h2>
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

export default ShortTermCoursesPage;
