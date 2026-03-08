import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Smartphone, Wind, Laptop, Camera, Award, Users, Briefcase, BookOpen, CheckCircle } from "lucide-react";

const courses = [
  { icon: Smartphone, title: "Mobile Repairing Course", desc: "Basic se advanced chip-level repair seekhein — Bihar ka sabse popular technical course.", href: "/training-institute/mobile-repairing-course-bihar", duration: "3-6 Months" },
  { icon: Wind, title: "AC Repairing Course", desc: "Split AC, window AC, inverter AC — installation aur repairing ki complete training.", href: "/training-institute/ac-repairing-course-bihar", duration: "3-6 Months" },
  { icon: Laptop, title: "Laptop Repairing Course", desc: "Hardware aur software dono — motherboard repair, data recovery, OS installation.", href: "/training-institute/laptop-repairing-course-bihar", duration: "3-6 Months" },
  { icon: Camera, title: "CCTV Installation Training", desc: "CCTV camera fitting, configuration, networking aur troubleshooting seekhein.", href: "/training-institute/cctv-installation-training-bihar", duration: "1-3 Months" },
];

const stats = [
  { value: "5000+", label: "Students Trained" },
  { value: "95%", label: "Placement Rate" },
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Industry Partners" },
];

const faqs = [
  { q: "SIAT mein kaunse courses available hain?", a: "SIAT mein Mobile Repairing, AC Repairing, Laptop Repairing, CCTV Installation, aur short-term job-oriented courses available hain. Sabhi courses practical training ke saath aate hain." },
  { q: "Kya placement support milta hai?", a: "Haan, SIAT ka dedicated placement cell hai jo course complete hone ke baad students ko jobs dhundhne mein madad karta hai. Hamare alumni puri India mein kaam kar rahe hain." },
  { q: "Course ki fees kitni hai?", a: "Course fees course type aur duration ke hisaab se alag hoti hai. Details ke liye Course Fees page dekhein ya humse contact karein." },
  { q: "Kya koi prior experience chahiye?", a: "Nahi, koi prior experience ki zaroorat nahi hai. Hamare courses bilkul basics se shuru hote hain." },
  { q: "Certificate milta hai kya?", a: "Haan, SIAT ISO-verified certificate deta hai jismein QR code hota hai — employer online verify kar sakte hain." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const TrainingInstitutePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">SIAT Training Institute</span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Bihar's Leading <span className="gradient-text">Technical Training Institute</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Bihar ka sabse bharosemand technical training institute — practical learning, modern labs, experienced faculty aur 95% placement support ke saath. Saharsa se puri India mein career banayein!
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Admission Inquiry</Link>
            <Link to="/training-institute/course-fees" className="btn-outline-glow">View Course Fees</Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary/5 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-black text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-4">Our <span className="gradient-text">Courses</span></h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Practical, job-oriented courses jo aapko industry-ready banayen. Har course mein hands-on training aur real-world projects included hain.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link to={c.href} className="block glass-card-hover p-6 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{c.title}</h3>
                      <span className="text-xs text-primary font-medium">{c.duration}</span>
                      <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SIAT */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose <span className="gradient-text">SIAT?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "ISO Certified", desc: "ISO-verified certificates with QR code authentication" },
              { icon: Users, title: "Expert Faculty", desc: "Industry-experienced trainers with practical knowledge" },
              { icon: Briefcase, title: "Placement Support", desc: "Dedicated placement cell with 95% success rate" },
              { icon: BookOpen, title: "Modern Labs", desc: "State-of-the-art labs with latest equipment" },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} className="glass-card p-6 text-center">
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

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto prose-custom">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">SIAT — Bihar Ka Sabse Bharosemand Technical Training Institute</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>SIAT (Saharsa Institute of Advanced Technology) Bihar ka premier technical training institute hai jo 10+ saalon se students ko industry-ready skills de raha hai. Hamare courses specially design kiye gaye hain taaki students ko practical knowledge milein aur wo apna career jaldi se jaldi start kar sakein.</p>
            <p>Hamare institute mein modern labs hain jahan students latest equipment par hands-on practice karte hain. Mobile repairing se lekar CCTV installation tak, har course mein real-world projects shamil hain jo students ko professional environment ke liye tayyar karte hain.</p>
            <p>SIAT ka placement cell active hai aur hamare alumni puri India mein — Delhi, Mumbai, Bangalore, Hyderabad aur Bihar ke andar — successful careers bana rahe hain. Kuch alumni ne apna khud ka business bhi start kiya hai aur achha kama rahe hain.</p>
            <p>Agar aap Bihar mein best technical training dhundh rahe hain — chahein aap 10th pass hon ya graduate — SIAT aapke liye sahi choice hai. Affordable fees, flexible timings, aur dedicated support ke saath hum aapka career build karne mein madad karenge.</p>
          </div>
        </div>
      </section>

      {/* Short-term courses CTA */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Short-Term Job Courses Bhi Available Hain!</h2>
          <p className="text-muted-foreground mb-6">Kam samay mein job-ready banein — 1 se 3 mahine ke short-term skill courses.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/training-institute/short-term-job-courses-bihar" className="btn-primary-glow !py-3 !px-5 !text-sm">Short Term Courses</Link>
            <Link to="/training-institute/placement-support" className="btn-outline-glow !py-3 !px-5 !text-sm">Placement Support</Link>
            <Link to="/training-institute/student-testimonials" className="btn-outline-glow !py-3 !px-5 !text-sm">Student Reviews</Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
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
    </>
  );
};

export default TrainingInstitutePage;
