import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Smartphone, Award, Users, Briefcase } from "lucide-react";

const faqs = [
  { q: "What is the duration of the Mobile Repairing Course?", a: "The course is available in 3-month and 6-month formats depending on the level — basic, advanced, or comprehensive." },
  { q: "Do I need prior experience to join?", a: "No prior experience is required. Our course starts from the basics and gradually moves to advanced chip-level repairs." },
  { q: "Is placement support provided?", a: "Yes, SIAT provides dedicated placement support connecting graduates with mobile repair shops, service centers, and companies across Bihar and India." },
  { q: "What certification will I receive?", a: "You will receive an ISO-verified certificate with QR code verification that employers can authenticate online." },
  { q: "Can I start my own business after the course?", a: "Absolutely! Many of our alumni have successfully started their own mobile repair shops within months of completing the course." },
  { q: "What is the course fee?", a: "Course fees vary based on duration and level. Please contact us or visit our Course Fees page for detailed pricing." },
];

const MobileRepairingPage = () => {
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

      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Training Institute</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            Mobile Repairing Course <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn professional mobile phone repairing from Bihar's leading training institute. Practical, hands-on training with placement support and QR-verified certification.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Enroll Now</Link>
            <Link to="/training-institute/course-fees" className="btn-outline-glow">View Fees</Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
            Why Choose SIAT for <span className="gradient-text">Mobile Repairing?</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "Hands-On Training", desc: "Practice on real smartphones in our fully equipped lab" },
              { icon: Award, title: "ISO Certified", desc: "QR-verified certificate recognized by employers" },
              { icon: Users, title: "Expert Trainers", desc: "Learn from certified professionals with industry experience" },
              { icon: Briefcase, title: "Placement Support", desc: "Dedicated placement cell for job assistance" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card-hover p-6 text-center"
              >
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

      {/* Course Content */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
            Course <span className="gradient-text">Curriculum</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Smartphone hardware identification",
              "Chip-level soldering & desoldering",
              "Software flashing & unlocking",
              "Touch screen & display replacement",
              "Battery & charging circuit repair",
              "Camera & speaker troubleshooting",
              "Water damage repair techniques",
              "Business setup & customer management",
              "Latest iPhone & Android repair",
              "Micro-soldering advanced techniques",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 glass-card p-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-background">
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

      {/* Internal Links CTA */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Explore More</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/training-institute/placement-support" className="btn-outline-glow !py-3 !px-5 !text-sm">Placement Support</Link>
            <Link to="/student-testimonials" className="btn-outline-glow !py-3 !px-5 !text-sm">Student Testimonials</Link>
            <Link to="/verify-certificate" className="btn-outline-glow !py-3 !px-5 !text-sm">Verify Certificate</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileRepairingPage;
