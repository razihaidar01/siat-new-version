import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Shield, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const certs = [
  { title: "ISO 9001:2015", desc: "International quality management certification — globally recognized standard for excellence in education and training." },
  { title: "NSDC Registration", desc: "National Skill Development Corporation registered training partner for government skill programs." },
  { title: "Skill India Partner", desc: "Official partner under Skill India Mission for vocational training and skill development." },
  { title: "Bihar Skill Development Mission", desc: "Empanelled with Bihar government for state-level skill training programs." },
];

const CertificationsPage = () => (
  <>
    <SEOHead title="Certifications – SIAT Bihar" description="SIAT's ISO 9001:2015 certification, NSDC registration, and government empanelments. Internationally recognized training certificates." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Our <span className="gradient-text">Certifications</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT ke certifications aur accreditations — quality aur credibility ka proof.
        </motion.p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {certs.map((c) => (
            <div key={c.title} className="glass-card p-6">
              <Award className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display font-bold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding text-center" style={{ background: "var(--gradient-section)" }}>
      <h2 className="text-2xl font-display font-bold text-foreground mb-4">Verify Our Certificates</h2>
      <p className="text-muted-foreground mb-6">SIAT ke students ko diye gaye certificates ko online verify karein.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/verify-certificate" className="btn-primary-glow !py-3 !px-5 !text-sm">Verify Certificate</Link>
        <Link to="/about-us" className="btn-outline-glow !py-3 !px-5 !text-sm">About SIAT</Link>
      </div>
    </section>
  </>
);

export default CertificationsPage;
