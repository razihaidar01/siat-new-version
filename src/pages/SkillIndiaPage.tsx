import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Award, Users, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const SkillIndiaPage = () => (
  <>
    <SEOHead title="Skill India Training Partner – SIAT Bihar" description="SIAT is an authorized Skill India training partner in Bihar. Government-certified skill development programs." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Skill India <span className="gradient-text">Training Partner</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT — Skill India Mission ka registered training partner. Quality skill development training with NSDC certification aur placement support.
        </motion.p>
        <Link to="/contact-us" className="btn-primary-glow">Partner With Us</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Our Role in <span className="gradient-text">Skill India</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Registered Partner", desc: "NSDC ke saath officially registered training partner." },
            { icon: Award, title: "NSDC Certification", desc: "Nationally recognized certificates for all trainees." },
            { icon: Users, title: "5000+ Trained", desc: "Hazaron candidates ko successfully skilled kiya." },
          ].map((item) => (
            <div key={item.title} className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><item.icon className="w-6 h-6 text-primary" /></div>
              <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Skill India Mission — SIAT Ka Contribution</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Skill India Mission Bharat Sarkar ka ek ambitious program hai jiska goal hai desh ke youth ko employable skills dena. SIAT is mission ka proud training partner hai Bihar mein.</p>
          <p>Hum multiple sectors mein training deliver karte hain — IT, electronics, healthcare, aur more. Hamare training programs NSQF (National Skills Qualifications Framework) ke standards ke according design kiye gaye hain.</p>
          <p>Har trainee ko course completion par NSDC ka nationally recognized certificate milta hai. Hamare placement cell trained candidates ko relevant industries mein connect karta hai.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/government-projects/pmkvy-training-center-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">PMKVY Center</Link>
        <Link to="/government-projects" className="btn-outline-glow !py-3 !px-5 !text-sm">All Projects</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default SkillIndiaPage;
