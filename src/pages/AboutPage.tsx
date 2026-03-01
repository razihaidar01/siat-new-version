import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Users, Award, Building2, ShieldCheck } from "lucide-react";

const AboutPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-primary uppercase tracking-wider">
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl font-display font-black text-foreground mt-4 mb-6"
          >
            Empowering Bihar Through <span className="gradient-text">Education & Technology</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            SIAT Group is Bihar's leading organization in skill development, IT solutions, educational consultancy, and government project implementation.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            { icon: Target, title: "Our Mission", text: "To bridge the gap between education and employment by providing world-class skill development, cutting-edge technology solutions, and trusted consultancy services across Bihar." },
            { icon: Eye, title: "Our Vision", text: "To be India's most impactful skill and technology organization — transforming lives through practical education, digital innovation, and institutional partnership." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card p-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">{item.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key highlights */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
            What Makes SIAT <span className="gradient-text">Different</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "10K+ Alumni", desc: "Graduates placed across India" },
              { icon: Award, title: "ISO 9001:2015", desc: "Internationally certified" },
              { icon: Building2, title: "50+ Govt. Projects", desc: "Trusted government partner" },
              { icon: ShieldCheck, title: "QR Certificates", desc: "Tamper-proof verification" },
            ].map((item) => (
              <div key={item.title} className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background text-center">
        <h2 className="text-3xl font-display font-black text-foreground mb-4">Ready to Transform Your Future?</h2>
        <p className="text-muted-foreground mb-8">Join thousands of students and businesses who trust SIAT Group.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact-us" className="btn-primary-glow">Contact Us</Link>
          <Link to="/training-institute" className="btn-outline-glow">Explore Courses</Link>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
