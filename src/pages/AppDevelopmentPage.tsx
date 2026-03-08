import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Smartphone, Layers, Rocket, ShieldCheck } from "lucide-react";

const faqs = [
  { q: "What platforms do you develop apps for?", a: "We build apps for Android, iOS, and cross-platform (React Native, Flutter). We also develop Progressive Web Apps (PWA)." },
  { q: "How much does app development cost?", a: "App development starts from ₹50,000 for basic apps. Feature-rich apps with backend, payments, etc., range from ₹1,50,000–₹10,00,000+." },
  { q: "How long does it take to develop an app?", a: "A basic app takes 4–6 weeks. Complex apps with backend, authentication, and third-party integrations take 3–6 months." },
  { q: "Do you provide app maintenance after launch?", a: "Yes, we offer ongoing maintenance, bug fixes, feature updates, and server management packages." },
  { q: "Can you convert my website into a mobile app?", a: "Yes, we can create native or hybrid mobile apps from existing websites with optimized user experience." },
  { q: "Do you help with app store publishing?", a: "Absolutely. We handle the complete submission process for Google Play Store and Apple App Store." },
];

const services = [
  "Android App Development",
  "iOS App Development",
  "Cross-Platform (React Native / Flutter)",
  "E-commerce Mobile Apps",
  "Education & LMS Apps",
  "On-Demand Service Apps",
  "Healthcare & Booking Apps",
  "UI/UX Design & Prototyping",
  "API & Backend Development",
  "App Store Optimization (ASO)",
];

const AppDevelopmentPage = () => {
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
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">RH Software</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
            App Development Company <span className="gradient-text">in Bihar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            RH Software — Bihar's trusted app development company. Android, iOS & cross-platform apps for startups, businesses, and government organizations.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">"Apna idea app mein badlein — startup ho ya business, sab ke liye solutions!"</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Get a Quote</Link>
            <Link to="/rhsoftware/portfolio" className="btn-outline-glow">View Portfolio</Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">Why Choose <span className="gradient-text">RH Software?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "Native & Cross-Platform", desc: "Android, iOS, React Native, Flutter" },
              { icon: Layers, title: "Full-Stack", desc: "Frontend, backend, database, APIs — complete solution" },
              { icon: Rocket, title: "Fast Delivery", desc: "Agile development — on-time project delivery" },
              { icon: ShieldCheck, title: "Post-Launch Support", desc: "Maintenance, updates, aur scaling support" },
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
            <Link to="/rhsoftware/website-development-company-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">Website Development</Link>
            <Link to="/rhsoftware/ai-development-company-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">AI Development</Link>
            <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppDevelopmentPage;
